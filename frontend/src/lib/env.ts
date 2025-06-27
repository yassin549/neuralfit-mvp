import { z } from 'zod';

// Define the schema for environment variables
const envSchema = z.object({
  // Next.js
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  NEXT_PUBLIC_APP_URL: z.string().url().default('http://localhost:3006'),
  NEXT_PUBLIC_API_URL: z.string().url().default('http://localhost:3001/api'),
  
  // Authentication
  NEXTAUTH_SECRET: z.string().min(32, 'NEXTAUTH_SECRET must be at least 32 characters'),
  NEXTAUTH_URL: z.string().url().default('http://localhost:3006'),
  
  // Database
  DATABASE_URL: z.string().url(),
  
  // Email
  EMAIL_FROM: z.string().default('NeuralFit <noreply@neuralfit.com>'),
  
  // OAuth Providers
  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),
  GITHUB_CLIENT_ID: z.string().optional(),
  GITHUB_CLIENT_SECRET: z.string().optional(),
  
  // Feature Flags
  NEXT_PUBLIC_ENABLE_EMAIL_VERIFICATION: z
    .string()
    .default('false')
    .transform((val) => val === 'true'),
  NEXT_PUBLIC_ENABLE_ANALYTICS: z
    .string()
    .default('false')
    .transform((val) => val === 'true'),
  
  // Monitoring
  NEXT_PUBLIC_SENTRY_DSN: z.string().optional(),
  SENTRY_AUTH_TOKEN: z.string().optional(),
});

// Validate environment variables
const _env = envSchema.safeParse(process.env);

// Throw error if validation fails
if (!_env.success) {
  console.error('❌ Invalid environment variables:', _env.error.format());
  throw new Error('Invalid environment variables');
}

// Export validated environment variables
export const env = _env.data;
