import { HttpException } from '@nestjs/common';
import { Response, NextFunction } from 'express';

export class ApiError extends HttpException {
  constructor(
    public message: string,
    public status: number = 500,
    public details?: any
  ) {
    super({
      message,
      details,
      timestamp: new Date().toISOString(),
    }, status);
  }

  public getResponse() {
    return {
      message: this.message,
      details: this.details,
      timestamp: new Date().toISOString(),
    };
  }
}

export const handleError = (error: Error | ApiError, res: Response, next: NextFunction) => {
  if (error instanceof ApiError) {
    return res.status(error.status).json(error.getResponse());
  }
  
  return next(error);
};
