import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { RefreshToken } from './RefreshToken.js';

// Type for user data without sensitive fields
export interface SafeUserData {
  id: string;
  email: string;
  fullName: string;
  username?: string;
  bio?: string;
  avatarUrl?: string;
  role: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  refreshTokens: RefreshToken[];
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar', { unique: true })
  email!: string;

  @Column('text')
  password!: string;

  @Column('varchar')
  fullName!: string;

  @Column('varchar', { unique: true, nullable: true })
  username?: string;

  @Column('text', { nullable: true })
  bio?: string;

  @Column('varchar', { nullable: true })
  avatarUrl?: string;

  @Column('varchar', { default: 'user' })
  role!: string;

  @Column('boolean', { default: false })
  isVerified!: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;

  @OneToMany(() => RefreshToken, (refreshToken: RefreshToken) => refreshToken.user, {
    cascade: true,
    orphanedRowAction: 'delete'
  })
  refreshTokens!: RefreshToken[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  async comparePassword(candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
  }

  toJSON(): SafeUserData {
    return {
      id: this.id,
      email: this.email,
      fullName: this.fullName,
      username: this.username,
      bio: this.bio,
      avatarUrl: this.avatarUrl,
      role: this.role,
      isVerified: this.isVerified,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      refreshTokens: this.refreshTokens,
    };
  }

  toSafeUser(): SafeUserData {
    const { password, ...safeUser } = this;
    return safeUser;
  }
}
