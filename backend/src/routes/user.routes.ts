import { Router } from 'express';
import * as userController from '../controllers/user.controller.js';
import { auth, authorize } from '../middleware/auth.middleware.js';

const router = Router();

// @route   GET /api/users/profile/:username
// @desc    Get public user profile
// @access  Public
router.get('/profile/:username', userController.getPublicUserProfile);

// Apply auth middleware to all subsequent routes
router.use(auth);

// @route   GET /api/users
// @desc    Get all users (admin only)
// @access  Private/Admin
router.get('/', authorize(['admin']), userController.getAllUsers);

// @route   GET /api/users/:id
// @desc    Get user by ID
// @access  Private
router.get('/:id', userController.getUserById);

// @route   PUT /api/users/profile
// @desc    Update current user profile
// @access  Private
router.put('/profile', userController.updateUserProfile);

// @route   DELETE /api/users/profile
// @desc    Delete current user
// @access  Private
router.delete('/profile', userController.deleteUser);

export default router;

