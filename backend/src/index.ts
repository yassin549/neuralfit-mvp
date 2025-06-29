import 'dotenv/config';
import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';





import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pino = require('pino');
const pinoHttp = require('pino-http');

import aiService from './ai/ai.service.js';
import { AppDataSource } from './config/database.js';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import chatRoutes from './routes/chat.routes.js';
import { ApiError } from './utils/errorHandler.js';

const main = async () => {
  try {
    const logger = pino({ level: process.env.NODE_ENV === 'production' ? 'info' : 'debug' });

    logger.info('Initializing database connection...');
    await AppDataSource.initialize();
    logger.info('Database connected successfully');

    const app = express();

    // Security headers
    

    // Gzip compression
    

    // Structured HTTP logging
    app.use(pinoHttp({ logger }));

    // CORS configuration
    const corsOrigins = process.env.CORS_ORIGIN 
      ? process.env.CORS_ORIGIN.split(',').map(origin => origin.trim())
      : ['http://localhost:3000', 'http://localhost:3006'];
    app.use(
      cors({
        origin: corsOrigins,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
      })
    );

    app.use(express.json());
    app.use(cookieParser());

    // CSRF protection
    

    // API Routes
    app.use('/api/auth', authRoutes);
    app.use('/api/users', userRoutes);
    app.use('/api/chat', chatRoutes);

    // Root route
    app.get('/', (req: Request, res: Response) => {
      res.status(200).json({ message: 'Welcome to the NeuralFit API' });
    });

    // CSRF token endpoint (for frontend to fetch token)
    app.get('/api/csrf-token', (req: Request, res: Response) => {
      res.json({ csrfToken: req.csrfToken() });
    });

    // Global Error Handler
    app.use((err: Error | ApiError, req: Request, res: Response, next: NextFunction) => {
      logger.error(err);
      if (err instanceof ApiError) {
        return res.status(err.status).json(err.getResponse());
      }
      if ('code' in err && err.code === 'EBADCSRFTOKEN') {
        return res.status(403).json({ message: 'Invalid CSRF token' });
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
      logger.info(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    // Use logger for fatal errors
    const logger = pino();
    logger.fatal({ err: error }, 'Failed to initialize application');
    process.exit(1);
  }
};

main();

