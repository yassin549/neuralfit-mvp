import { AppDataSource } from '../config/database.js';
import { User } from '../entities/User.js';
import { RefreshToken } from '../entities/RefreshToken.js';
import jwt from 'jsonwebtoken';
import { env } from '../config/constants.js';
import { randomBytes } from 'crypto';

export default class AuthService {
  private userRepository = AppDataSource.getRepository(User);
  private refreshTokenRepository = AppDataSource.getRepository(RefreshToken);

  async register(userData: { email: string; password: string; fullName: string }, ipAddress: string) {
    const existingUser = await this.userRepository.findOne({ where: { email: userData.email } });
    if (existingUser) {
      throw new Error('Email already in use');
    }

    const user = new User();
    user.email = userData.email;
    user.password = userData.password;
    user.fullName = userData.fullName;

    await this.userRepository.save(user);

    const accessToken = this.generateAccessToken(user);
    const refreshToken = await this.createRefreshToken(user, ipAddress);

    const { password, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, accessToken, refreshToken: refreshToken.token };
  }

  async login(email: string, password: string, ipAddress: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const accessToken = this.generateAccessToken(user);
    const refreshToken = await this.createRefreshToken(user, ipAddress);

    const { password: _, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, accessToken, refreshToken: refreshToken.token };
  }

  private generateAccessToken(user: User): string {
    return jwt.sign(
      { userId: user.id },
      env.JWT_SECRET,
      { expiresIn: env.JWT_ACCESS_EXPIRES_IN }
    );
  }

  private async createRefreshToken(user: User, ipAddress: string): Promise<RefreshToken> {
    const token = randomBytes(40).toString('hex');

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // Default to 7 days

    const refreshToken = this.refreshTokenRepository.create({
      token,
      user,
      expiresAt,
      createdByIp: ipAddress,
    });

    await this.refreshTokenRepository.save(refreshToken);
    return refreshToken;
  }

  async refreshToken(token: string, ipAddress: string) {
    const refreshToken = await this.refreshTokenRepository.findOne({
      where: { token },
      relations: ['user'],
    });

    if (!refreshToken || !refreshToken.isActive()) {
      if (refreshToken) {
        await this.revokeRefreshToken(refreshToken, ipAddress, 'Attempted use of inactive token');
      }
      throw new Error('Invalid or expired refresh token');
    }

    const { user } = refreshToken;

    const newRefreshToken = await this.createRefreshToken(user, ipAddress);
    await this.revokeRefreshToken(refreshToken, ipAddress, `Replaced by new token: ${newRefreshToken.token}`);

    const newAccessToken = this.generateAccessToken(user);

    const { password, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, accessToken: newAccessToken, refreshToken: newRefreshToken.token };
  }

  async revokeRefreshToken(token: string | RefreshToken, ipAddress: string, reason?: string) {
    let refreshTokenInstance: RefreshToken | null;

    if (typeof token === 'string') {
      refreshTokenInstance = await this.refreshTokenRepository.findOneBy({ token });
    } else {
      refreshTokenInstance = token;
    }

    if (!refreshTokenInstance) {
      throw new Error('Token not found');
    }

    refreshTokenInstance.revokedAt = new Date();
    refreshTokenInstance.revokedByIp = ipAddress;
    refreshTokenInstance.isRevoked = true;
    refreshTokenInstance.replacedByToken = reason;

    await this.refreshTokenRepository.save(refreshTokenInstance);
  }

  async validateUser(payload: { userId: string }): Promise<User | null> {
    return this.userRepository.findOne({
      where: { id: payload.userId },
      select: ['id', 'email', 'fullName', 'role', 'isVerified', 'createdAt'],
    });
  }
}

