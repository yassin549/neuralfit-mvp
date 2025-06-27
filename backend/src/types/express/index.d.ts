import { User } from '../../entities/User.js';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: string;
      };
      token?: string;
    }
  }
}

export {};
