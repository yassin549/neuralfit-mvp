
import { conversationService, Message } from './services/conversation.service.js';
import { MODEL_CONFIG } from './models/model.config.js';
import { HuggingFaceClient } from './clients/huggingface.client.js';

export interface GenerateResponseOptions {
  temperature?: number;
  maxNewTokens?: number;
  topP?: number;
  repetitionPenalty?: number;
  systemPrompt?: string;
}

export class AIService {
  private static instance: AIService;
  private isInitialized = false;
  private initializationPromise: Promise<void> | null = null;
  private huggingFaceClient: HuggingFaceClient;

  private constructor() {
    this.huggingFaceClient = HuggingFaceClient.getInstance();
  }

  public static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  public async initialize(): Promise<void> {
    if (this.isInitialized) {
      return;
    }
    console.log('🚀 Initializing AI services...');
    
    // Check if Hugging Face Space is healthy
    const isHealthy = await this.huggingFaceClient.healthCheck();
    if (!isHealthy) {
      throw new Error('Hugging Face Space is not healthy');
    }

    this.isInitialized = true;
    console.log('✅ AI services initialized successfully.');
    return Promise.resolve();
  }

  public async createConversation(userId: string, title?: string) {
    if (!this.isInitialized) {
      await this.initialize();
    }
    return conversationService.createConversation(userId, title);
  }

  public async getConversation(conversationId: string) {
    return conversationService.getConversation(conversationId);
  }

  public async getUserConversations(userId: string) {
    return conversationService.getUserConversations(userId);
  }

  public async generateResponse(
    conversationId: string,
    message: string,
    options: GenerateResponseOptions = {}
  ): Promise<Message> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    try {
      return await conversationService.generateResponse(conversationId, message);
    } catch (error) {
      console.error('❌ Error in generateResponse:', error);
      throw new Error('Failed to generate response');
    }
  }

  public async chat(
    userId: string,
    message: string,
    conversationId?: string,
    options: GenerateResponseOptions = {}
  ) {
    if (!this.isInitialized) {
      await this.initialize();
    }

    try {
      // If no conversationId provided, create a new one
      let conversation = conversationId 
        ? await conversationService.getConversation(conversationId)
        : await conversationService.createConversation(userId);

      if (!conversation) {
        throw new Error('Failed to create or find conversation');
      }

      // Generate response
      const response = await this.generateResponse(conversation.id, message);

      return {
        conversationId: conversation.id,
        response: response.content,
        messages: conversation.messages,
      };
    } catch (error) {
      console.error('❌ Error in chat:', error);
      throw new Error('Failed to process chat message');
    }
  }

  public isReady(): boolean {
    return this.isInitialized;
  }
}

export default AIService.getInstance();
