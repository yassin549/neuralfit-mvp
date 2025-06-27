import { Router } from 'express';
import * as chatController from '../controllers/chat.controller.js';
import { auth } from '../middleware/auth.middleware.js';

console.log('LOADING CHAT.ROUTES.TS - AUTH MIDDLEWARE IS DISABLED');
const router = Router();

// Public routes
router.get('/status', chatController.status);

// Protected routes (require authentication)
// router.use(auth);

// Conversation management
router.post('/conversations', chatController.createConversation);
router.get('/conversations', chatController.listConversations);
router.get('/conversations/:conversationId', chatController.getConversation);

// Chat interaction
router.post('/chat', chatController.chat);

export default router;

