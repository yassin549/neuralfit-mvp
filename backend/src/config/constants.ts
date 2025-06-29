import dotenv from 'dotenv';
dotenv.config();

export interface EnvVars {
  // Server
  NODE_ENV: string;
  PORT: string;
  FRONTEND_URL: string;

  // Database
  DATABASE_URL: string;

  // JWT
  JWT_ACCESS_TOKEN_SECRET: string;
  JWT_ACCESS_TOKEN_EXPIRES_IN: string;
  JWT_REFRESH_TOKEN_SECRET: string;
  JWT_REFRESH_TOKEN_EXPIRES_IN: string;
  JWT_REFRESH_COOKIE_NAME: string;

  // Password
  PASSWORD_SALT_ROUNDS: number;

  // Email
  EMAIL_VERIFICATION_TOKEN_EXPIRES_IN: string;

  // Cookies
  COOKIE_SECURE: boolean;
  COOKIE_HTTP_ONLY: boolean;
  COOKIE_SAME_SITE: 'lax' | 'strict' | 'none';

  // Rate Limiting
  RATE_LIMIT_WINDOW_MS: number;
  RATE_LIMIT_MAX: number;

  // AI Model
  HUGGINGFACE_SPACE_URL: string;
  MODEL_PATH: string;
  MODEL_REPO: string;
  AI_DEVICE: 'cuda' | 'cpu';
  AI_MAX_CONTEXT_LENGTH: number;
  AI_MAX_NEW_TOKENS: number;
  AI_TEMPERATURE: number;
  AI_TOP_P: number;
  AI_REPETITION_PENALTY: number;
}

export const env: EnvVars = {
  // Server
  NODE_ENV: process.env.NODE_ENV || 'production',
  PORT: process.env.PORT || '3001',
  FRONTEND_URL: process.env.FRONTEND_URL || 'https://neuralfit-gdpj1fcn.livekit.cloud',

  // Database
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://postgres.ykvmmeundylyizhtmmwn:[Azerty03041973@]@aws-0-us-west-1.pooler.supabase.com:6543/postgres',

  // JWT
  JWT_ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET || 'your-access-token-secret',
  JWT_ACCESS_TOKEN_EXPIRES_IN: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN || '15m',
  JWT_REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_TOKEN_SECRET || 'your-refresh-token-secret',
  JWT_REFRESH_TOKEN_EXPIRES_IN: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN || '7d',
  JWT_REFRESH_COOKIE_NAME: process.env.JWT_REFRESH_COOKIE_NAME || 'refreshToken',

  // Password
  PASSWORD_SALT_ROUNDS: parseInt(process.env.PASSWORD_SALT_ROUNDS || '10'),

  // Email
  EMAIL_VERIFICATION_TOKEN_EXPIRES_IN: process.env.EMAIL_VERIFICATION_TOKEN_EXPIRES_IN || '24h',

  // Cookies
  COOKIE_SECURE: process.env.NODE_ENV === 'production',
  COOKIE_HTTP_ONLY: true,
  COOKIE_SAME_SITE: process.env.NODE_ENV === 'production' ? 'none' : 'lax',

  // Rate Limiting
  RATE_LIMIT_WINDOW_MS: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10),
  RATE_LIMIT_MAX: parseInt(process.env.RATE_LIMIT_MAX || '100', 10),

  // AI Model
  HUGGINGFACE_SPACE_URL: process.env.HUGGINGFACE_SPACE_URL || '',
  MODEL_PATH: process.env.MODEL_PATH || './models/MentaLLaMA-chat-7B',
  MODEL_REPO: process.env.MODEL_REPO || 'Felladrin/mentallama-chat-7b',
  AI_DEVICE: process.env.AI_DEVICE === 'cuda' ? 'cuda' : 'cpu',
  AI_MAX_CONTEXT_LENGTH: parseInt(process.env.AI_MAX_CONTEXT_LENGTH || '4096', 10),
  AI_MAX_NEW_TOKENS: parseInt(process.env.AI_MAX_NEW_TOKENS || '2048', 10),
  AI_TEMPERATURE: parseFloat(process.env.AI_TEMPERATURE || '0.7'),
  AI_TOP_P: parseFloat(process.env.AI_TOP_P || '0.9'),
  AI_REPETITION_PENALTY: parseFloat(process.env.AI_REPETITION_PENALTY || '1.1'),
} as const;

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
