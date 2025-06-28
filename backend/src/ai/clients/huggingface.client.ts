import axios from 'axios';
import { MODEL_CONFIG } from '../models/model.config.js';
import { env } from '../../../config/constants';

export class HuggingFaceClient {
  private static instance: HuggingFaceClient;
  private readonly client: any;
  private readonly baseUrl: string;

  private constructor() {
    this.client = axios.create({
      baseURL: MODEL_CONFIG.modelUrl,
      timeout: 30000, // 30 seconds
    });
  }

  public static getInstance(): HuggingFaceClient {
    if (!HuggingFaceClient.instance) {
      HuggingFaceClient.instance = new HuggingFaceClient();
    }
    return HuggingFaceClient.instance;
  }

  public async generateText(prompt: string, options: {
    maxNewTokens?: number;
    temperature?: number;
    topP?: number;
  } = {}): Promise<string> {
    try {
      const response = await this.client.post('/generate', {
        message: prompt,
        max_new_tokens: options.maxNewTokens || MODEL_CONFIG.maxNewTokens,
        temperature: options.temperature || MODEL_CONFIG.temperature,
        top_p: options.topP || MODEL_CONFIG.topP,
      });

      return response.data.text;
    } catch (error) {
      console.error('❌ Hugging Face API error:', error);
      throw error;
    }
  }

  public async healthCheck(): Promise<boolean> {
    try {
      const response = await this.client.get('/');
      return response.status === 200;
    } catch (error) {
      console.error('❌ Hugging Face health check failed:', error);
      return false;
    }
  }
}
