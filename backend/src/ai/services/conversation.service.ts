import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { MODEL_CONFIG } from '../models/model.config.js';

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

export interface Conversation {
  id: string;
  userId: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
  metadata?: Record<string, any>;
}

export class ConversationService {
  private static instance: ConversationService;
  private conversations: Map<string, Conversation> = new Map();
  private readonly MAX_CONVERSATION_AGE_MS = 1000 * 60 * 60 * 24; // 24 hours

  private constructor() {
    // Start cleanup job
    setInterval(() => this.cleanupOldConversations(), 1000 * 60 * 60); // Run hourly
  }

  public static getInstance(): ConversationService {
    if (!ConversationService.instance) {
      ConversationService.instance = new ConversationService();
    }
    return ConversationService.instance;
  }

  public async createConversation(userId: string, title: string = 'New Conversation'): Promise<Conversation> {
    const conversation: Conversation = {
      id: uuidv4(),
      userId,
      title,
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      metadata: {},
    };

    this.conversations.set(conversation.id, conversation);
    return conversation;
  }

  public async getConversation(conversationId: string): Promise<Conversation | undefined> {
    return this.conversations.get(conversationId);
  }

  public async getUserConversations(userId: string): Promise<Conversation[]> {
    return Array.from(this.conversations.values())
      .filter(conv => conv.userId === userId)
      .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
  }

  public async addMessage(
    conversationId: string, 
    role: 'user' | 'assistant' | 'system', 
    content: string
  ): Promise<Message> {
    const conversation = this.conversations.get(conversationId);
    if (!conversation) {
      throw new Error('Conversation not found');
    }

    const message: Message = {
      id: uuidv4(),
      role,
      content,
      timestamp: new Date(),
    };

    conversation.messages.push(message);
    conversation.updatedAt = new Date();

    return message;
  }

  public async generateResponse(conversationId: string, userMessage: string): Promise<Message> {
    const conversation = this.conversations.get(conversationId);
    if (!conversation) {
      throw new Error('Conversation not found');
    }

    // Add user message to conversation
    await this.addMessage(conversationId, 'user', userMessage);

    // Format the prompt with conversation history
    const prompt = this.formatPrompt(conversation.messages);

    // Define the AI server endpoint
    // Use environment variable for AI server URL, fallback to localhost in development
const AI_SERVER_URL = process.env.AI_SERVER_URL || 'http://localhost:8008/generate';

    try {
      // Call the Python AI server
      console.log('🔄 Calling AI server...');
      const response = await axios.post(AI_SERVER_URL, {
        prompt: prompt,
        max_new_tokens: MODEL_CONFIG.maxNewTokens,
        temperature: MODEL_CONFIG.temperature,
        top_p: MODEL_CONFIG.topP,
        repetition_penalty: MODEL_CONFIG.repetitionPenalty,
      });

      const assistantResponse = response.data.generated_text || "I'm sorry, I couldn't generate a response.";
      console.log('✅ AI server responded successfully.');
      
      // Add assistant response to conversation
      return this.addMessage(conversationId, 'assistant', assistantResponse);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unknown error occurred';
      console.error('❌ Error calling AI server:', message, error);
      const errorMessage = "Sorry, I'm having trouble connecting to my brain right now. Please try again later.";
      // Add error message as assistant response to conversation
      return this.addMessage(conversationId, 'assistant', errorMessage);
    }
  }

  private formatPrompt(messages: Message[]): string {
    // Start with system prompt
    let prompt = `[INST] <<SYS>>\n${MODEL_CONFIG.systemPrompt}\n<</SYS>>\n\n`;

    // Add conversation history
    messages.forEach((msg, index) => {
      const prefix = msg.role === 'assistant' ? 'Assistant: ' : 'User: ';
      prompt += `${prefix}${msg.content}`;
      
      if (index < messages.length - 1) {
        prompt += '\n\n';
      }
    });

    // Add assistant prefix for the next response
    if (messages.length > 0) {
      prompt += '\n\nAssistant: ';
    }

    return prompt;
  }

  private cleanupOldConversations(): void {
    const now = Date.now();
    let deletedCount = 0;

    for (const [id, conv] of this.conversations.entries()) {
      const conversationAge = now - conv.updatedAt.getTime();
      if (conversationAge > this.MAX_CONVERSATION_AGE_MS) {
        this.conversations.delete(id);
        deletedCount++;
      }
    }

    if (deletedCount > 0) {
      console.log(`🧹 Cleaned up ${deletedCount} old conversations`);
    }
  }
}

export const conversationService = ConversationService.getInstance();
