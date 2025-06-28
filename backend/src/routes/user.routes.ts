import { Router, Request, Response as ExpressResponse, NextFunction } from 'express';
import { AuthenticatedRequest } from '../middleware/auth.middleware.js';
import * as userController from '../controllers/user.controller.js';
import { auth, authorize } from '../middleware/auth.middleware.js';
import { handleError } from '../utils/errorHandler.js';

const router = Router();

// @route   GET /api/users/profile/:username
// @desc    Get public user profile
// @access  Public
router.get('/profile/:username', (req: Request, res: ExpressResponse, next: NextFunction) => {
  userController.getPublicUserProfile(req, res, next).catch(error => handleError(error, res, next));
});

// Apply auth middleware to all subsequent routes
router.use(auth);

// @route   GET /api/users
// @desc    Get all users (admin only)
// @access  Private/Admin
router.get('/', (req: Request, res: ExpressResponse, next: NextFunction) => {
  authorize(['admin'])(req, res, (error) => {
    if (error) return handleError(error, res, next);
    userController.getAllUsers(req as AuthenticatedRequest, res, next).catch(error => handleError(error, res, next));
  });
});

// @route   GET /api/users/:id
// @desc    Get user by ID
// @access  Private
router.get('/:id', (req: Request, res: ExpressResponse, next: NextFunction) => {
  userController.getUserById(req as AuthenticatedRequest, res, next).catch(error => handleError(error, res, next));
});

// @route   PUT /api/users/profile
// @desc    Update current user profile
// @access  Private
router.put('/profile', (req: Request, res: ExpressResponse, next: NextFunction) => {
  userController.updateUserProfile(req as AuthenticatedRequest, res, next).catch(error => handleError(error, res, next));
});

// @route   DELETE /api/users/profile
// @desc    Delete current user
// @access  Private
router.delete('/profile', (req: Request, res: ExpressResponse, next: NextFunction) => {
  userController.deleteUser(req as AuthenticatedRequest, res, next).catch(error => handleError(error, res, next));
});

export default router;
