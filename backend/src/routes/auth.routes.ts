import { Router, Request, Response, NextFunction } from 'express';
import * as authController from '../controllers/auth.controller.js';
import { auth } from '../middleware/auth.middleware.js';

const router = Router();

// Public routes
router.post('/register', (req: Request, res: Response, next: NextFunction) => authController.register(req, res, next));
router.post('/login', (req: Request, res: Response, next: NextFunction) => authController.login(req, res, next));
router.post('/refresh-token', (req: Request, res: Response, next: NextFunction) => authController.refreshToken(req, res, next));

// Protected routes (require authentication)
router.post('/logout', auth, (req: Request, res: Response, next: NextFunction) => authController.logout(req, res, next));
router.get('/me', auth, (req: Request, res: Response, next: NextFunction) => authController.getCurrentUser(req, res, next));

export default router;

