import { Router, Response, Request } from 'express';
import { authController } from '../controllers/auth.controller.js';
import { auth } from '../middleware/auth.middleware.js';

const router = Router();

// Public routes
router.post('/register', authController.register.bind(authController));
router.post('/login', authController.login.bind(authController));
router.post('/refresh-token', authController.refreshToken.bind(authController));
router.post('/logout', auth, authController.logout.bind(authController));

// Protected routes
router.get('/me', auth, (req: Request, res: Response) => {authController.getCurrentUser(req, res)});

export default router;
