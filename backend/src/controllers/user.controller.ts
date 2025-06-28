import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../config/database.js';
import { User, SafeUserData } from '../entities/User.js';
import { AuthenticatedRequest } from '../middleware/auth.middleware.js';
import { ApiError } from '../utils/errorHandler.js';
import { HttpStatus } from '../utils/httpStatus.js';

const userRepository = AppDataSource.getRepository(User);

// Get all users (admin only)
export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users = await userRepository.find({
      select: ['id', 'email', 'fullName', 'role', 'createdAt'],
    });
    res.json({ users });
  } catch (error) {
    console.error('Get all users error:', error);
    throw new ApiError('Failed to fetch users', HttpStatus.INTERNAL_SERVER_ERROR, error);
  }
};

// Get user by ID
export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await userRepository.findOne({
      where: { id: req.params.id },
      select: ['id', 'email', 'fullName', 'role', 'createdAt'],
    });

    if (!user) {
      throw new ApiError('User not found', HttpStatus.NOT_FOUND);
    }

    res.json({ user });
  } catch (error) {
    console.error('Get user error:', error);
    throw new ApiError('Failed to fetch user', HttpStatus.INTERNAL_SERVER_ERROR, error);
  }
};

// Update user profile
export const updateUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { fullName, email } = req.body;
    const authReq = req as AuthenticatedRequest;

    if (!fullName && !email) {
      throw new ApiError('No fields to update', HttpStatus.BAD_REQUEST);
    }

    const user = await userRepository.findOne({
      where: { id: authReq.user?.id },
      select: ['id', 'email', 'fullName'],
    });

    if (!user) {
      throw new ApiError('User not found', HttpStatus.NOT_FOUND);
    }

    if (email) user.email = email;
    if (fullName) user.fullName = fullName;

    await userRepository.save(user);
    res.json({ message: 'Profile updated successfully', user: user.toSafeUser() });
  } catch (error) {
    console.error('Update profile error:', error);
    throw new ApiError('Failed to update profile', HttpStatus.INTERNAL_SERVER_ERROR, error);
  }
};

// Get public user profile by username
export const getPublicUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { username } = req.params;
    const user = await userRepository.findOne({
      where: { username },
      select: ['id', 'username', 'fullName', 'createdAt'],
    });

    if (!user) {
      throw new ApiError('User not found', HttpStatus.NOT_FOUND);
    }

    res.json({ user });
  } catch (error) {
    console.error('Get public profile error:', error);
    throw new ApiError('Failed to fetch profile', HttpStatus.INTERNAL_SERVER_ERROR, error);
  }
};

// Delete user
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authReq = req as AuthenticatedRequest;
    const user = await userRepository.findOne({
      where: { id: authReq.user?.id },
      select: ['id'],
    });

    if (!user) {
      throw new ApiError('User not found', HttpStatus.NOT_FOUND);
    }

    await userRepository.remove(user);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    throw new ApiError('Failed to delete user', HttpStatus.INTERNAL_SERVER_ERROR, error);
  }
};
