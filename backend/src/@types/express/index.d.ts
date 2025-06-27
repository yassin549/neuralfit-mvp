// This file extends the Express Request interface to include a 'user' property.

declare global {
  namespace Express {
    interface Request {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      user?: any; 
    }
  }
}
