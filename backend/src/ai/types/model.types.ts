export interface ModelConfig {
  modelName: string;
  modelPath: string;
  modelUrl: string;
  maxNewTokens: number;
  temperature: number;
  topP: number;
  repetitionPenalty: number;
  device: 'cuda' | 'cpu';
  quantized: boolean;
  maxContextLength: number;
  safetySettings: {
    enableModeration: boolean;
    maxResponseTime: number;
    maxRetries: number;
  };
  systemPrompt: string;
}

export interface ModelResponse {
  text: string;
  tokensUsed: number;
  timeTaken: number;
  isSafe: boolean;
}

export interface ModelManager {
  initialize(): Promise<void>;
  generateResponse(prompt: string, options?: Partial<Omit<ModelConfig, 'modelName' | 'modelPath' | 'modelUrl'>>): Promise<ModelResponse>;
  isInitialized: boolean;
  dispose(): Promise<void>;
}
