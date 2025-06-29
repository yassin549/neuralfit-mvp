import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';

import { ApiError } from '../utils/errorHandler.js';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const bcrypt = require('bcryptjs');
import type { SafeUserData } from '../types/user.js';
import type { RefreshToken } from './RefreshToken.js';



@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar', { unique: true })
  email!: string;

  @Column('varchar')
  password!: string;

  @Column('varchar')
  fullName!: string;

  @Column('varchar', { default: 'user' })
  role: 'user' | 'admin' | 'trainer' = 'user';

  @Column('boolean', { default: false })
  isVerified = false;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt?: Date;

  @OneToMany('RefreshToken', (refreshToken: RefreshToken) => refreshToken.user, { cascade: true, onDelete: 'CASCADE' })
  refreshTokens!: RefreshToken[];

  async hashPassword(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async validatePassword(password: string): Promise<boolean> {
    if (!this.password) {
      throw new ApiError('User has no password', 400);
    }
    return bcrypt.compare(password, this.password);
  }

  toSafeUser(): SafeUserData {
    return {
      id: this.id,
      email: this.email,
      fullName: this.fullName,
      role: this.role,
      isVerified: this.isVerified,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    };
  }

  toJSON(): SafeUserData {
    return this.toSafeUser();
  }
}
