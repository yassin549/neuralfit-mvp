import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { User } from './User.js';

@Entity('refresh_tokens')
export class RefreshToken {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('text')
  token!: string;

  @Column({ type: 'timestamp' })
  expiresAt!: Date;

  @Column('varchar', { nullable: true })
  revokedByIp?: string;

  @Column('text', { nullable: true })
  replacedByToken?: string;

  @Column({ type: 'timestamp', nullable: true })
  revokedAt?: Date;

  @Column({ type: 'boolean', default: false })
  isRevoked = false;

  @Column('varchar')
  createdByIp!: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt?: Date;

  @ManyToOne(() => User, (user: User) => user.refreshTokens, { onDelete: 'CASCADE' })
  user!: User;

  @Column('varchar')
  userId!: string;

  isExpired(): boolean {
    return this.expiresAt < new Date();
  }

  isActive(): boolean {
    return !this.revokedAt && !this.isExpired();
  }
}

