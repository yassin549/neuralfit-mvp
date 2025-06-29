import { Router, Request, Response, NextFunction } from 'express';
import { auth } from '../middleware/auth.middleware.js';
import chatController from '../controllers/chat.controller.js';

const router = Router();

// Public routes
router.get('/status', chatController.status);

// Conversation management
router.post('/conversations', auth, chatController.createConversation);
router.get('/conversations', auth, chatController.listConversations);
router.get('/conversations/:conversationId', auth, chatController.getConversation);

// Chat interaction
router.post('/chat', auth, chatController.chat);

export default router;
