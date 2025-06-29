import { env } from '../../config/constants.js';
import { ModelConfig } from '../types/model.types.js';

export const MODEL_CONFIG: ModelConfig = {
  modelName: 'MentaLLaMA-chat-7B',
  modelPath: env.MODEL_PATH || '',
  modelUrl: env.HUGGINGFACE_SPACE_URL || 'https://yassinkhoualdi-neuralfit.hf.space',
  maxNewTokens: env.AI_MAX_NEW_TOKENS,
  temperature: env.AI_TEMPERATURE,
  topP: env.AI_TOP_P,
  repetitionPenalty: env.AI_REPETITION_PENALTY,
  maxContextLength: env.AI_MAX_CONTEXT_LENGTH,
  safetySettings: {
    enableModeration: true,
    maxResponseTime: 30, // seconds
    maxRetries: 3,
  },
  systemPrompt: `You are a compassionate and professional AI therapist named NeuralFit. Your role is to provide supportive, 
  non-judgmental, and evidence-based responses to help users with their mental well-being. Be empathetic, 
  validate their feelings, and provide practical guidance when appropriate. Always maintain professional 
  boundaries and know when to recommend seeking help from a licensed professional.`,
  device: env.AI_DEVICE?.toLowerCase() === 'cuda' ? 'cuda' : 'cpu',
  quantized: false as const
} as const;
