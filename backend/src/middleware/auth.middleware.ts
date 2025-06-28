import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/constants.js';
import { AppDataSource } from '../config/database.js';
import { User, SafeUserData } from '../entities/User.js';
import { ApiError } from '../utils/errorHandler.js';
import { HttpStatus } from '../utils/httpStatus.js';

const userRepository = AppDataSource.getRepository(User);

// Define a custom request type that includes the user property
export interface AuthenticatedRequest extends Request {
  user?: SafeUserData;
}

export const auth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.cookies?.accessToken || req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new ApiError('No token, authorization denied', HttpStatus.UNAUTHORIZED);
    }

    const decoded = jwt.verify(token, env.JWT_SECRET) as { userId: string };
    const user = await userRepository.findOne({ where: { id: decoded.userId } });

    if (!user) {
      throw new ApiError('User not found for token', HttpStatus.UNAUTHORIZED);
    }

    (req as AuthenticatedRequest).user = user.toSafeUser();
    next();
  } catch (error) {
    console.error('Auth error:', error);
    throw new ApiError('Invalid token', HttpStatus.UNAUTHORIZED);
  }
};

export const authorize = (roles: string[]) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const authReq = req as AuthenticatedRequest;
    if (!authReq.user) {
      throw new ApiError('Not authenticated', HttpStatus.UNAUTHORIZED);
    }

    if (!roles.includes(authReq.user.role)) {
      throw new ApiError('Unauthorized', HttpStatus.FORBIDDEN);
    }

    next();
  };
};
