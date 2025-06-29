import { Response, NextFunction } from 'express';

export class ApiError extends Error {
  constructor(
    public message: string,
    public status: number = 500,
    public details?: any
  ) {
    super(message);
    this.name = 'ApiError';
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
  if (error instanceof Error) {
    return res.status(500).json({
      message: 'Internal Server Error',
      timestamp: new Date().toISOString()
    });
  }
  next(error);
};
