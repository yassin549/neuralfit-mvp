import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import aiService from './ai/ai.service.js';
import { AppDataSource } from './config/database.js';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import chatRoutes from './routes/chat.routes.js';
import { ApiError } from './utils/errorHandler.js';

const main = async () => {
  try {
    await AppDataSource.initialize();
    console.log('Database connected successfully');

    const app = express();

    // Middleware
    const corsOrigins = process.env.CORS_ORIGIN 
      ? process.env.CORS_ORIGIN.split(',').map(origin => origin.trim())
      : ['http://localhost:3000', 'http://localhost:3006'];
      
    app.use(
      cors({
        origin: corsOrigins,
        credentials: true,
      })
    );
    app.use(express.json());
    app.use(cookieParser());

    // API Routes
    app.use('/api/auth', authRoutes);
    app.use('/api/users', userRoutes);
    app.use('/api/chat', chatRoutes);

    // Root route
    app.get('/', (req: Request, res: Response) => {
      res.status(200).json({ message: 'Welcome to the NeuralFit API' });
    });

    // Global Error Handler
    app.use((err: Error | ApiError, req: Request, res: Response, next: NextFunction) => {
      if (err instanceof Error) {
        console.error(err.stack);
      }
      
      if (err instanceof ApiError) {
        return res.status(err.status).json(err.getResponse());
      }
      
      // Default error response
      return res.status(500).json({
        message: 'Internal Server Error',
        details: process.env.NODE_ENV === 'development' ? err.message : undefined,
        timestamp: new Date().toISOString()
      });
    });

    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to initialize application:', error);
    process.exit(1);
  }
};

main();

