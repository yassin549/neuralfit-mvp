import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service.js';
import { env } from '../config/constants.js';

import { ApiError } from '../utils/errorHandler.js';
import { User } from '../entities/User.js';

const authService = AuthService.getInstance();

const setTokenCookies = (res: Response, accessToken: string, refreshToken: string): void => {
  // Set access token cookie (short-lived)
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: env.COOKIE_SECURE,
    sameSite: env.COOKIE_SAME_SITE as 'lax' | 'strict' | 'none',
    maxAge: 15 * 60 * 1000 // 15 minutes
  });

  // Set refresh token cookie (long-lived)
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: env.COOKIE_SECURE,
    sameSite: env.COOKIE_SAME_SITE as 'lax' | 'strict' | 'none',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });
};

export class AuthController {
  private constructor() {}

  public static getInstance(): AuthController {
    return new AuthController();
  }

  public async register(req: Request, res: Response): Promise<void> {
    try {
      const { email, password, fullName } = req.body;
      const ipAddress = req.ip || req.socket.remoteAddress || '';

      if (!email || !password || !fullName) {
        throw new ApiError('Please provide all required fields', 400);
      }

      const { user, accessToken, refreshToken } = await authService.register(
        { email, password, fullName },
        ipAddress
      );

      setTokenCookies(res, accessToken, refreshToken);
      res.status(201).json({ user: user.toSafeUser() });
    } catch (error: any) {
      console.error('Registration error:', error);
      res.status(error instanceof ApiError ? error.status : 500).json({
        message: error.message || 'Registration failed'
      });
    }
  }

  public async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const ipAddress = req.ip || req.socket.remoteAddress || '';

      if (!email || !password) {
        throw new ApiError('Please provide email and password', 400);
      }

      const { user, accessToken, refreshToken } = await authService.login(email, password, ipAddress);

      setTokenCookies(res, accessToken, refreshToken);
      res.json({ user: user.toSafeUser() });
    } catch (error: any) {
      console.error('Login error:', error);
      res.status(error instanceof ApiError ? error.status : 500).json({
        message: error.message || 'Login failed'
      });
    }
  }

  public async getCurrentUser(req: Request, res: Response): Promise<void> {
    try {
      const user = req.user;
      res.json({ user });
    } catch (error) {
      console.error('Get current user error:', error);
      res.status(500).json({ message: 'Failed to get current user' });
    }
  }

  public async logout(req: Request, res: Response): Promise<void> {
    try {
      const refreshToken = req.cookies?.refreshToken;
      const ipAddress = req.ip || req.socket.remoteAddress || '';

      if (refreshToken) {
        try {
          await authService.logout(refreshToken, ipAddress);
        } catch (error) {
          console.warn('Failed to revoke refresh token on logout:', error);
        }
      }

      res.clearCookie('accessToken');
      res.clearCookie('refreshToken');

      res.json({ message: 'Logged out successfully' });
    } catch (error) {
      console.error('Logout error:', error);
      res.status(500).json({ message: 'Server error during logout' });
    }
  }

  public async refreshToken(req: Request, res: Response): Promise<void> {
    try {
      const oldRefreshToken = req.cookies?.refreshToken;
      const ipAddress = req.ip || req.socket.remoteAddress || '';

      if (!oldRefreshToken) {
        throw new ApiError('No refresh token provided', 401);
      }

      const { user, accessToken, refreshToken: newRefreshToken } = await authService.refreshToken(
        oldRefreshToken,
        ipAddress
      );

      setTokenCookies(res, accessToken, newRefreshToken);
      res.json({ user: user.toSafeUser() });
    } catch (error: any) {
      console.error('Refresh token error:', error);
      res.status(error instanceof ApiError ? error.status : 500).json({
        message: error.message || 'Refresh token failed'
      });
    }
  }
}

export const authController = AuthController.getInstance();
