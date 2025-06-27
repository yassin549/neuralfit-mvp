export const config = {
  app: {
    name: 'NeuralFit',
    description: 'Your personal AI mental health assistant',
    baseUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3006',
    environment: process.env.NODE_ENV || 'development',
  },
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
    timeout: 30000, // 30 seconds
  },
  auth: {
    secret: process.env.NEXTAUTH_SECRET || 'your-secret-key',
    jwtSecret: process.env.JWT_SECRET || 'your-jwt-secret',
    tokenExpiresIn: '7d', // 7 days
  },
  database: {
    url: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/neuralfit?schema=public',
  },
  email: {
    from: process.env.EMAIL_FROM || 'NeuralFit <noreply@neuralfit.com>',
    provider: process.env.EMAIL_PROVIDER || 'resend',
  },
  features: {
    enableEmailVerification: process.env.NEXT_PUBLIC_ENABLE_EMAIL_VERIFICATION === 'true',
    enableAnalytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
  },
  social: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
    },
  },
  sentry: {
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN || '',
    environment: process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT || 'development',
  },
} as const;

export type AppConfig = typeof config;

// Validate required environment variables in production
if (process.env.NODE_ENV === 'production') {
  const requiredEnvVars = [
    'NEXTAUTH_SECRET',
    'JWT_SECRET',
    'DATABASE_URL',
    'EMAIL_FROM',
  ];

  const missingEnvVars = requiredEnvVars.filter(
    (envVar) => !process.env[envVar]
  );

  if (missingEnvVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingEnvVars.join(', ')}`
    );
  }
}
