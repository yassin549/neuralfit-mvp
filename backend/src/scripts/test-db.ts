import 'reflect-metadata';
import { AppDataSource } from '../config/database.js';

console.log('Attempting to initialize database connection...');

AppDataSource.initialize()
  .then(() => {
    console.log('✅ Database connection successful!');
    const entities = AppDataSource.options.entities;
    console.log('🔎 Found entities:', entities ? (entities as any[]).map(e => (e as any).name || e) : 'None');
    return AppDataSource.destroy();
  })
  .then(() => {
    console.log('🔌 Database connection closed.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Database connection failed:');
    console.error(error);
    process.exit(1);
  });
