import { createRequire } from 'module';
import type { Algorithm, SignOptions, Secret } from 'jsonwebtoken';

const require = createRequire(import.meta.url);
const { sign, verify, decode } = require('jsonwebtoken');
import { User } from '../entities/User.js';
import { ApiError } from '../utils/errorHandler.js';
import { env } from '../config/constants.js';

interface JwtPayload {
  sub: string;
  email: string;
  role: string;
}

export class JwtService {
  private static instance: JwtService;
  private constructor() {}

  public static getInstance(): JwtService {
    if (!JwtService.instance) {
      JwtService.instance = new JwtService();
    }
    return JwtService.instance;
  }

  public async generateAccessToken(user: User): Promise<string> {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role
    };

    return sign(payload, env.JWT_ACCESS_TOKEN_SECRET as Secret, {
      expiresIn: env.JWT_ACCESS_TOKEN_EXPIRES_IN as string,
      algorithm: 'HS256' as Algorithm
    } as SignOptions);
  }

  public async generateRefreshToken(user: User): Promise<string> {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role
    };

    return sign(payload, env.JWT_REFRESH_TOKEN_SECRET as Secret, {
      expiresIn: env.JWT_REFRESH_TOKEN_EXPIRES_IN as string,
      algorithm: 'HS256' as Algorithm
    } as SignOptions);
  }

  public async verifyAccessToken(token: string): Promise<JwtPayload> {
    try {
      const decoded = verify(token, env.JWT_ACCESS_TOKEN_SECRET as Secret) as JwtPayload;
      if (!decoded.sub) {
        throw new ApiError('Invalid access token', 401);
      }
      return decoded;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new ApiError(error.message, 401);
      }
      throw new ApiError('Invalid access token', 401);
    }
  }

  public async verifyRefreshToken(token: string): Promise<JwtPayload> {
    try {
      const decoded = verify(token, env.JWT_REFRESH_TOKEN_SECRET as Secret) as JwtPayload;
      if (!decoded.sub) {
        throw new ApiError('Invalid refresh token', 401);
      }
      return decoded;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new ApiError(error.message, 401);
      }
      throw new ApiError('Invalid refresh token', 401);
    }
  }

  public decodeToken(token: string): any {
    return decode(token);
  }
}

export const jwtService = JwtService.getInstance();
