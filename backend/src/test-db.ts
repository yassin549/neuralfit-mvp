// Must be the first import to load environment variables
import './config/env';

// Import the actual AppDataSource from the application's config
import { AppDataSource } from './config/database.js';

async function testConnection() {
  try {
    console.log('Attempting to connect to the database...');
    // Initialize the data source
    await AppDataSource.initialize();
    console.log('✅ Database connection successful!');

    // Test a simple query
    const result = await AppDataSource.query('SELECT version();');
    console.log('📊 Database version:', result[0].version);

    // Close the connection
    await AppDataSource.destroy();
    console.log('🔌 Connection closed.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database connection failed:');
    console.error(error);
    process.exit(1);
  }
}

testConnection();


