const dotenv = require('dotenv');

try {
  // Load environment variables from .env file
  const result = dotenv.config();

  // Check for errors during .env file loading
  if (result.error) {
    // Re-throw the error to be caught by the outer catch block
    throw result.error;
  }
} catch (error) {
  console.error('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
  console.error('!!!  FATAL: ERROR LOADING .env FILE  !!!');
  console.error('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
  console.error(error); // Log the actual error
  process.exit(1);
}

// Validate that all required environment variables are set
const requiredEnv = [
  'DB_HOST',
  'DB_PORT',
  'DB_USERNAME',
  'DB_PASSWORD',
  'DB_NAME',
  'JWT_SECRET',
  'JWT_REFRESH_SECRET',
];

const missingEnv = requiredEnv.filter((v) => !process.env[v]);

if (missingEnv.length > 0) {
  console.error('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
  console.error('!!!    FATAL: MISSING ENV VARIABLES        !!!');
  console.error(`!!!    Missing: ${missingEnv.join(', ')}`);
  console.error('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
  process.exit(1);
}

console.log('Environment variables loaded and validated successfully.');
