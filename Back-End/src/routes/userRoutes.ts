// src/routes/userRoutes.ts
import express, { Router, Request, Response, NextFunction } from 'express';
import { register, login } from '../controllers/authController';
import * as userController from '../controllers/userController';
import auth from '../middleware/auth';
import { IUserDocument } from '../models/User';

// Define the extended request type
export interface RequestWithUser extends Request {
  user: IUserDocument;  // Make it required, not optional
}

const router: Router = express.Router();

// Auth routes (no auth middleware)
router.post('/register', register);
router.post('/login', login);

// Protected user routes with type assertion middleware
router.get(
  '/profile', 
  auth,
  (req: Request, res: Response, next: NextFunction) => {
    userController.getProfile(req as RequestWithUser, res);
  }
);

router.patch(
  '/profile',
  auth,
  (req: Request, res: Response, next: NextFunction) => {
    userController.updateProfile(req as RequestWithUser, res);
  }
);

router.delete(
  '/profile',
  auth,
  (req: Request, res: Response, next: NextFunction) => {
    userController.deleteProfile(req as RequestWithUser, res);
  }
);

router.post(
  '/change-password',
  auth,
  (req: Request, res: Response, next: NextFunction) => {
    userController.changePassword(req as RequestWithUser & { body: { currentPassword: string; newPassword: string } }, res);
  }
);

// Admin routes
router.get('/users', auth, userController.getAllUsers);
router.get('/users/:id', auth, userController.getUserById);

export default router;