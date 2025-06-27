import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../middleware/auth.middleware.js';
import aiService from '../ai/ai.service.js';

export const chat = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const { message, conversationId } = req.body;
        const userId = req.user?.id ?? 'anonymous';

        if (!message) {
            res.status(400).json({ error: 'Message is required' });
            return;
        }

        const result = await aiService.chat(userId, message, conversationId);

        res.json({
            conversationId: result.conversationId,
            response: result.response,
            messages: result.messages,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error('❌ Chat error:', error);
        res.status(500).json({
            error: 'An error occurred while processing your request',
            details: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};

export const createConversation = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user?.id ?? 'anonymous';
        const { title } = req.body;

        const conversation = await aiService.createConversation(userId, title);

        res.status(201).json({
            conversationId: conversation.id,
            title: conversation.title,
            createdAt: conversation.createdAt.toISOString(),
        });
    } catch (error) {
        console.error('❌ Create conversation error:', error);
        res.status(500).json({
            error: 'Failed to create conversation',
            details: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};

export const getConversation = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const { conversationId } = req.params;
        const userId = req.user?.id ?? 'anonymous';

        const conversation = await aiService.getConversation(conversationId);

        if (!conversation) {
            res.status(404).json({ error: 'Conversation not found' });
            return;
        }

        if (conversation.userId !== userId) {
            res.status(403).json({ error: 'Access denied' });
            return;
        }

        res.json({
            id: conversation.id,
            title: conversation.title,
            messages: conversation.messages,
            createdAt: conversation.createdAt.toISOString(),
            updatedAt: conversation.updatedAt.toISOString(),
        });
    } catch (error) {
        console.error('❌ Get conversation error:', error);
        res.status(500).json({
            error: 'Failed to retrieve conversation',
            details: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};

export const listConversations = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const userId = req.user?.id ?? 'anonymous';

        const conversations = await aiService.getUserConversations(userId);

        res.json(
            conversations.map((conv) => ({
                id: conv.id,
                title: conv.title,
                preview:
                    conv.messages.length > 0
                        ? conv.messages[conv.messages.length - 1].content.substring(0, 100)
                        : 'No messages yet',
                updatedAt: conv.updatedAt.toISOString(),
            }))
        );
    } catch (error) {
        console.error('❌ List conversations error:', error);
        res.status(500).json({
            error: 'Failed to retrieve conversations',
            details: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};

export const status = async (req: Request, res: Response): Promise<void> => {
    try {
        const isReady = aiService.isReady();

        res.json({
            status: isReady ? 'operational' : 'initializing',
            model: 'MentaLLaMA-chat-7B',
            ready: isReady,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        console.error('❌ Status check error:', error);
        res.status(500).json({
            status: 'error',
            error: 'Service unavailable',
            details: error instanceof Error ? error.message : 'Unknown error',
        });
    }
};

