import { Router, Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../middleware/auth.middleware.js';
import * as chatController from '../controllers/chat.controller.js';
import { auth } from '../middleware/auth.middleware.js';

const router = Router();

// Public routes
router.get('/status', (req: Request, res: Response) => chatController.status(req, res));

// Protected routes (require authentication)
router.use(auth);

// Conversation management
router.post('/conversations', (req: AuthenticatedRequest, res: Response) => chatController.createConversation(req, res));
router.get('/conversations', (req: AuthenticatedRequest, res: Response) => chatController.listConversations(req, res));
router.get('/conversations/:conversationId', (req: AuthenticatedRequest, res: Response) => chatController.getConversation(req, res));

// Chat interaction
router.post('/chat', (req: AuthenticatedRequest, res: Response) => chatController.chat(req, res));

export default router;

