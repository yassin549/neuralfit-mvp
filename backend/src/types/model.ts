// Model types for AI model responses and related structures

export const _ = {};

export interface ModelResponse {
  response: string;
  conversationId?: string;
  messages?: Array<{
    sender: 'user' | 'ai';
    text: string;
    timestamp: string;
  }>;
  [key: string]: any; // Allow flexibility for additional fields
}

// Add any additional model-related types here as needed
