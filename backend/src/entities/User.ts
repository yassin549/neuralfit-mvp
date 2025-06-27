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
    onDelete: 'CASCADE',
  })
  refreshTokens!: RefreshToken[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.password) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
  }

  async comparePassword(attempt: string): Promise<boolean> {
    if (!this.password) return false;
    return await bcrypt.compare(attempt, this.password);
  }

  toJSON() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = this;
    return rest;
  }
}

