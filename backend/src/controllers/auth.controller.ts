import { Request, Response } from 'express';
import AuthService from '../services/auth.service.js';
import { env } from '../config/constants.js';
import { AuthenticatedRequest } from '../middleware/auth.middleware.js';

const authService = new AuthService();

const setTokenCookies = (res: Response, accessToken: string, refreshToken: string): void => {
  // Set access token cookie (short-lived)
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: env.COOKIE_SECURE,
    sameSite: env.COOKIE_SAME_SITE as 'lax' | 'strict' | 'none',
    maxAge: 15 * 60 * 1000, // 15 minutes
  });

  // Set refresh token cookie (longer-lived)
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: env.COOKIE_SECURE,
    sameSite: env.COOKIE_SAME_SITE as 'lax' | 'strict' | 'none',
    path: '/api/auth/refresh-token',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

// Register a new user
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, fullName } = req.body;
    const ipAddress = req.ip || req.socket.remoteAddress || '';

    if (!email || !password || !fullName) {
      res.status(400).json({ message: 'Please provide all required fields' });
      return;
    }

    const { user, accessToken, refreshToken } = await authService.register(
      { email, password, fullName },
      ipAddress
    );

    setTokenCookies(res, accessToken, refreshToken);

    res.status(201).json({ user });
  } catch (error: any) {
    console.error('Registration error:', error);
    res.status(400).json({ message: error.message || 'Registration failed' });
  }
};

// Login user
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const ipAddress = req.ip || req.socket.remoteAddress || '';

    if (!email || !password) {
      res.status(400).json({ message: 'Please provide email and password' });
      return;
    }

    const { user, accessToken, refreshToken } = await authService.login(email, password, ipAddress);

    setTokenCookies(res, accessToken, refreshToken);

    res.json({ user });
  } catch (error: any) {
    console.error('Login error:', error);
    res.status(401).json({ message: error.message || 'Invalid credentials' });
  }
};

// Get current user
export const getCurrentUser = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    res.json({ user: req.user });
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({ message: 'Failed to get current user' });
  }
};

// Logout user
export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    const ipAddress = req.ip || req.socket.remoteAddress || '';

    if (refreshToken) {
      try {
        await authService.revokeRefreshToken(refreshToken, ipAddress, 'User logged out');
      } catch (error) {
        console.warn('Failed to revoke refresh token on logout:', error);
      }
    }

    res.clearCookie('accessToken');
    res.clearCookie('refreshToken', { path: '/api/auth/refresh-token' });

    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'Server error during logout' });
  }
};

// Refresh access token
export const refreshToken = async (req: Request, res: Response): Promise<void> => {
  try {
    const oldRefreshToken = req.cookies?.refreshToken;
    const ipAddress = req.ip || req.socket.remoteAddress || '';

    if (!oldRefreshToken) {
      res.status(401).json({ message: 'No refresh token provided' });
      return;
    }

    const { user, accessToken, refreshToken: newRefreshToken } = await authService.refreshToken(
      oldRefreshToken,
      ipAddress
    );

    setTokenCookies(res, accessToken, newRefreshToken);

    res.json({ user });
  } catch (error: any) {
    console.error('Refresh token error:', error);

    res.clearCookie('refreshToken', { path: '/api/auth/refresh-token' });

    res.status(401).json({
      message: error.message || 'Invalid refresh token',
      requiresReauthentication: true,
    });
  }
};

