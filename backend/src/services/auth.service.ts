import { AppDataSource } from '../config/database.js';
import { User } from '../entities/User.js';
import { RefreshToken } from '../entities/RefreshToken.js';
import { ApiError } from '../utils/errorHandler.js';
import { jwtService } from './jwt.service.js';
import { userService } from './user.service.js';
import { env } from '../config/constants.js';

export class AuthService {
  private static instance: AuthService;
  private constructor() {}

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  public async register(userInput: Partial<User>, ipAddress: string): Promise<{ user: User; accessToken: string; refreshToken: string }> {
    try {
      // Validate required fields
      if (!userInput.email || !userInput.password || !userInput.fullName) {
        throw new ApiError('Missing required fields', 400);
      }

      // Check if user already exists
      const existingUser = await userService.findByEmail(userInput.email);
      if (existingUser) {
        throw new ApiError('Email already registered', 400);
      }

      // Create user
      const user = await userService.create({
        ...userInput,
        role: 'user',
        isVerified: false
      });

      // Generate tokens
      const [accessToken, refreshToken] = await Promise.all([
        jwtService.generateAccessToken(user),
        jwtService.generateRefreshToken(user)
      ]);

      // Store refresh token
      const refreshTokenEntity = new RefreshToken();
      refreshTokenEntity.token = refreshToken;
      refreshTokenEntity.userId = user.id;
      refreshTokenEntity.ipAddress = ipAddress;
      refreshTokenEntity.userAgent = 'NeuralFit/1.0';
      await AppDataSource.manager.save(refreshTokenEntity);

      return { user, accessToken, refreshToken };
    } catch (error) {
      throw error;
    }
  }

  public async login(email: string, password: string, ipAddress: string): Promise<{ user: User; accessToken: string; refreshToken: string }> {
    try {
      // Find user
      const user = await userService.findByEmail(email);
      if (!user) {
        throw new ApiError('User not found', 401);
      }

      // Validate password
      const isValid = await user.validatePassword(password);
      if (!isValid) {
        throw new ApiError('Invalid credentials', 401);
      }

      // Generate tokens
      const [accessToken, refreshToken] = await Promise.all([
        jwtService.generateAccessToken(user),
        jwtService.generateRefreshToken(user)
      ]);

      // Store refresh token
      const refreshTokenEntity = new RefreshToken();
      refreshTokenEntity.token = refreshToken;
      refreshTokenEntity.userId = user.id;
      refreshTokenEntity.ipAddress = ipAddress;
      refreshTokenEntity.userAgent = 'NeuralFit/1.0';
      await AppDataSource.manager.save(refreshTokenEntity);

      return { user, accessToken, refreshToken };
    } catch (error) {
      throw error;
    }
  }

  public async refreshToken(oldRefreshToken: string, ipAddress: string): Promise<{ user: User; accessToken: string; refreshToken: string }> {
    try {
      // Verify refresh token
      const decoded = await jwtService.verifyRefreshToken(oldRefreshToken);
      const userId = decoded.sub;

      // Find and validate refresh token
      const refreshToken = await AppDataSource.manager.findOne(RefreshToken, {
        where: { token: oldRefreshToken, userId, isRevoked: false },
        relations: ['user']
      });

      if (!refreshToken) {
        throw new ApiError('Invalid refresh token', 401);
      }

      // Generate new tokens
      const [accessToken, newRefreshToken] = await Promise.all([
        jwtService.generateAccessToken(refreshToken.user),
        jwtService.generateRefreshToken(refreshToken.user)
      ]);

      // Revoke old refresh token
      refreshToken.isRevoked = true;
      refreshToken.revokedAt = new Date();
      refreshToken.revokedByIp = ipAddress;
      refreshToken.replacedByToken = newRefreshToken;
      await AppDataSource.manager.save(refreshToken);

      // Store new refresh token
      const newRefreshTokenEntity = new RefreshToken();
      newRefreshTokenEntity.token = newRefreshToken;
      newRefreshTokenEntity.userId = userId;
      newRefreshTokenEntity.ipAddress = ipAddress;
      newRefreshTokenEntity.userAgent = 'NeuralFit/1.0';
      await AppDataSource.manager.save(newRefreshTokenEntity);

      return { user: refreshToken.user, accessToken, refreshToken: newRefreshToken };
    } catch (error) {
      throw error;
    }
  }

  public async logout(refreshToken: string, ipAddress: string): Promise<void> {
    try {
      const token = await AppDataSource.manager.findOne(RefreshToken, {
        where: { token: refreshToken, isRevoked: false }
      });

      if (token) {
        token.isRevoked = true;
        token.revokedAt = new Date();
        token.revokedByIp = ipAddress;
        token.replacedByToken = 'User logged out';
        await AppDataSource.manager.save(token);
      }
    } catch (error) {
      throw error;
    }
  }
}

