// Environment configuration
export const env = {
  // Server
  NODE_ENV: process.env.NODE_ENV || 'production',
  PORT: process.env.PORT || '3001',
  FRONTEND_URL: process.env.FRONTEND_URL || 'https://neuralfit-gdpj1fcn.livekit.cloud',
  
  // JWT
  JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key-needs-to-be-very-strong-and-secure',
  JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  JWT_REFRESH_COOKIE_NAME: process.env.JWT_REFRESH_COOKIE_NAME || 'refreshToken',
  
  // Database
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://postgres.ykvmmeundylyizhtmmwn:[Azerty03041973@]@aws-0-us-west-1.pooler.supabase.com:6543/postgres',
  
  // Cookies
  COOKIE_SECURE: process.env.NODE_ENV === 'production',
  COOKIE_HTTP_ONLY: true,
  COOKIE_SAME_SITE: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  
  // Rate limiting
  RATE_LIMIT_WINDOW_MS: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10),
  RATE_LIMIT_MAX: parseInt(process.env.RATE_LIMIT_MAX || '100', 10),
  
  // AI Model Configuration
  HUGGINGFACE_SPACE_URL: process.env.HUGGINGFACE_SPACE_URL,
  MODEL_PATH: process.env.MODEL_PATH || './models/MentaLLaMA-chat-7B',
  MODEL_REPO: process.env.MODEL_REPO || 'Felladrin/mentallama-chat-7b',
  AI_DEVICE: process.env.AI_DEVICE || 'cpu',
  
  // AI Parameters
  AI_MAX_NEW_TOKENS: parseInt(process.env.AI_MAX_NEW_TOKENS || '2048', 10),
  AI_TEMPERATURE: parseFloat(process.env.AI_TEMPERATURE || '0.7'),
  AI_TOP_P: parseFloat(process.env.AI_TOP_P || '0.9'),
  AI_REPETITION_PENALTY: parseFloat(process.env.AI_REPETITION_PENALTY || '1.1'),
  AI_MAX_CONTEXT_LENGTH: parseInt(process.env.AI_MAX_CONTEXT_LENGTH || '4096', 10)
} as const;
  AI_MAX_CONTEXT_LENGTH: parseInt(process.env.AI_MAX_CONTEXT_LENGTH || '4096', 10),
  AI_MAX_NEW_TOKENS: parseInt(process.env.AI_MAX_NEW_TOKENS || '200', 10),
  AI_TEMPERATURE: parseFloat(process.env.AI_TEMPERATURE || '0.7'),
  AI_TOP_P: parseFloat(process.env.AI_TOP_P || '0.9'),
  AI_REPETITION_PENALTY: parseFloat(process.env.AI_REPETITION_PENALTY || '1.2'),
  AI_DO_SAMPLE: process.env.AI_DO_SAMPLE !== 'false',
  AI_TOP_K: parseInt(process.env.AI_TOP_K || '50', 10)
};

// JWT Secret - In production, use a strong secret key from environment variables
export const JWT_SECRET = env.JWT_SECRET;

// Token expiration
export const TOKEN_EXPIRATION = '7d';

// CORS configuration
export const CORS_OPTIONS = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
};

// Rate limiting configuration
export const RATE_LIMIT = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
};
