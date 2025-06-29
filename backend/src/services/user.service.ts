import { User } from '../entities/User.js';
import { AppDataSource } from '../config/database.js';
import { ApiError } from '../utils/errorHandler.js';
import { SafeUserData } from '../types/user.js';

export class UserService {
  private static instance: UserService;
  private userRepository = AppDataSource.getRepository(User);
  private constructor() {}

  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  public async findById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new ApiError('User not found', 404);
    }
    return user;
  }

  public async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new ApiError('User not found', 404);
    }
    return user;
  }

  public async create(userData: Partial<User>): Promise<User> {
    const existingUser = await this.userRepository.findOne({ where: { email: userData.email } });
    if (existingUser) {
      throw new ApiError('Email already registered', 400);
    }

    const user = this.userRepository.create(userData);
    return await this.userRepository.save(user);
  }

  public async update(id: string, userData: Partial<User>): Promise<User> {
    const user = await this.findById(id);
    Object.assign(user, userData);
    return await this.userRepository.save(user);
  }

  public async delete(id: string): Promise<void> {
    const user = await this.findById(id);
    await this.userRepository.remove(user);
  }

  public async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  public async toSafeUser(user: User): Promise<SafeUserData> {
    return user.toSafeUser();
  }
}

export const userService = UserService.getInstance();
