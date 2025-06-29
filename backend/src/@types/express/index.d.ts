// This file extends the Express Request interface to include a 'user' property.

import type { SafeUserData } from '../../types/user.js';

declare global {
  namespace Express {
    interface Request {
      user?: SafeUserData;
    }
  }
}
