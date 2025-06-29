import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/errorHandler.js';
import { jwtService } from '../services/jwt.service.js';
import { User } from '../entities/User.js';
import type { SafeUserData } from '../types/user.js';
import { AppDataSource } from '../config/database.js';



export const auth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const accessToken = req.cookies?.accessToken;

    if (!accessToken) {
      throw new ApiError('No access token provided', 401);
    }

    const decoded = await jwtService.verifyAccessToken(accessToken);
    const userId = decoded.sub;

    const user = await AppDataSource.manager.findOne(User, {
      where: { id: userId },
      select: ['id', 'email', 'fullName', 'role', 'isVerified', 'createdAt', 'updatedAt'],
    });

    if (!user) {
      throw new ApiError('User not found', 401);
    }

    const safeUser: SafeUserData = {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      isVerified: user.isVerified,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    };

    req.user = safeUser;
    next();
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      throw new ApiError('Access token expired', 401);
    }
    throw error;
  }
};

export const authorize = (roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = req.user as SafeUserData;

      if (!user) {
        throw new ApiError('User not authenticated', 401);
      }

      if (!roles.includes(user.role)) {
        throw new ApiError('Unauthorized', 403);
      }

      next();
    } catch (error: any) {
      throw error;
    }
  };
};
