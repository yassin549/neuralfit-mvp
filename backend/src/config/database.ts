import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../entities/User.js';
import { RefreshToken } from '../entities/RefreshToken.js';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  synchronize: false,
  logging: process.env.NODE_ENV === 'development',
  entities: [User, RefreshToken],
  migrations: [],
  migrationsRun: false,
});

});

