import { Request, Response } from 'express';
import { AppDataSource } from '../config/database.js';
import { User } from '../entities/User.js';
import { AuthenticatedRequest } from '../middleware/auth.middleware.js';

const userRepository = AppDataSource.getRepository(User);

// Get all users (admin only)
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await userRepository.find({
      select: ['id', 'email', 'fullName', 'role', 'createdAt'],
    });
    res.json({ users });
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user by ID
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await userRepository.findOne({
      where: { id: req.params.id },
      select: ['id', 'email', 'fullName', 'role', 'createdAt'],
    });

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json({ user });
  } catch (error) {
    console.error('Get user by ID error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user profile
export const updateUserProfile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { fullName, username, bio, avatarUrl } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ message: 'Authentication required' });
      return;
    }

    const user = await userRepository.findOne({ where: { id: userId } });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Check for username uniqueness if it's being changed
    if (username && username !== user.username) {
      const existingUser = await userRepository.findOne({ where: { username } });
      if (existingUser && existingUser.id !== userId) {
        res.status(400).json({ message: 'Username is already taken' });
        return;
      }
    }

    // Update fields that are provided
    user.fullName = fullName ?? user.fullName;
    user.username = username ?? user.username;
    user.bio = bio ?? user.bio;
    user.avatarUrl = avatarUrl ?? user.avatarUrl;

    await userRepository.save(user);

    const { password, ...userData } = user;
    res.json({ user: userData });
  } catch (error: any) {
    console.error('Update user profile error:', error);
    // Handle potential unique constraint violation on email if it were updatable here
    if (error.code === '23505') { // PostgreSQL unique violation
      res.status(400).json({ message: 'A user with this username or email already exists.' });
      return;
    }
    res.status(500).json({ message: 'Server error while updating profile' });
  }
};

// Get public user profile by username
export const getPublicUserProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username } = req.params;
    const user = await userRepository.findOne({
      where: { username },
      select: ['id', 'username', 'fullName', 'bio', 'avatarUrl', 'createdAt'],
    });

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json({ user });
  } catch (error) {
    console.error('Get public user profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete user
export const deleteUser = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;

    const user = await userRepository.findOne({ where: { id: userId } });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    await userRepository.remove(user);

    res.clearCookie('accessToken');
    res.clearCookie('refreshToken', { path: '/api/auth/refresh-token' });

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

