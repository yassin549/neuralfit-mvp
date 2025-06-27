export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export interface ChatMessage extends Omit<Message, 'id' | 'timestamp'> {
  // Inherits role and content from Message
}
