import { Request, Response } from 'express';

import aiService from '../ai/ai.service.js';

const chat = async (req: Request, res: Response): Promise<void> => {
    try {
        const { message, conversationId } = req.body;
        const userId = req.user?.id;

        if (!message) {
            res.status(400).json({ error: 'Message is required' });
            return;
        }

        if (!userId) {
            res.status(401).json({ error: 'User not authenticated' });
            return;
        }

        const result = await aiService.chat(userId, message, conversationId);

        res.json({
            conversationId: result.conversationId,
            response: result.response,
            messages: result.messages,
        });
    } catch (error) {
        console.error('Chat error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const createConversation = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title } = req.body;
        const userId = req.user?.id;

        if (!userId) {
            res.status(401).json({ error: 'User not authenticated' });
            return;
        }

        const conversation = await aiService.createConversation(userId, title);
        res.status(201).json(conversation);
    } catch (error) {
        console.error('Create conversation error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getConversation = async (req: Request, res: Response): Promise<void> => {
    try {
        const { conversationId } = req.params;
        const userId = req.user?.id;

        if (!userId) {
            res.status(401).json({ error: 'User not authenticated' });
            return;
        }

        const conversation = await aiService.getConversation(conversationId);
        if (!conversation) {
            res.status(404).json({ error: 'Conversation not found' });
            return;
        }

        if (conversation.userId !== userId) {
            res.status(403).json({ error: 'Access denied' });
            return;
        }

        res.json(conversation);
    } catch (error) {
        console.error('Get conversation error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const listConversations = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            res.status(401).json({ error: 'User not authenticated' });
            return;
        }

        const conversations = await aiService.getUserConversations(userId);
        res.json(
            conversations.map((conv) => ({
                id: conv.id,
                title: conv.title,
                createdAt: conv.createdAt.toISOString(),
                updatedAt: conv.updatedAt.toISOString(),
                messageCount: conv.messages.length
            }))
        );
    } catch (error) {
        console.error('List conversations error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const status = async (req: Request, res: Response): Promise<void> => {
    try {
        const isReady = aiService.isReady();
        res.json({
            status: isReady ? 'operational' : 'initializing',
            ready: isReady,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Status check error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export default {
    chat,
    createConversation,
    getConversation,
    listConversations,
    status
};
