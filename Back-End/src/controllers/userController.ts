// src/controllers/userController.ts
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User, { IUserDocument } from '../models/User';

interface RequestWithUser extends Request {
  user: IUserDocument;
}

interface PasswordUpdateRequest {
  currentPassword: string;
  newPassword: string;
}

export const getProfile = async (req: RequestWithUser, res: Response): Promise<void> => {
    try {
      const userObject = req.user.toObject();
      const { password: _, ...userWithoutPassword } = userObject;
      
      res.json({
        success: true,
        user: userWithoutPassword
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Error retrieving profile'
      });
    }
  };

export const updateProfile = async (req: RequestWithUser , res: Response): Promise<void> => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    'firstName',
    'lastName',
    'contactNumber',
    'gender',
    'tShirtSize',
    'mealPreferences',
    'address',
    'occupation'
  ];

  try {
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));
    if (!isValidOperation) {
      res.status(400).json({
        success: false,
        message: 'Invalid updates'
      });
      return;
    }

    updates.forEach(update => {
      if (update in req.body) {
        (req.user as any)[update] = req.body[update];
      }
    });
    await req.user.save();

    res.json({
      success: true,
      user: req.user
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : 'Error updating profile'
    });
  }
};

export const deleteProfile = async (req: RequestWithUser, res: Response): Promise<void> => {
  try {
    await User.findByIdAndDelete(req.user._id);
    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Error deleting profile'
    });
  }
};

export const changePassword = async (req: RequestWithUser & { body: PasswordUpdateRequest }, res: Response): Promise<void> => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      res.status(400).json({
        success: false,
        message: 'Please provide both current and new password'
      });
      return;
    }

    const isMatch = await bcrypt.compare(currentPassword, req.user.password);
    if (!isMatch) {
      res.status(400).json({
        success: false,
        message: 'Current password is incorrect'
      });
      return;
    }

    req.user.password = newPassword;
    await req.user.save();

    res.json({
      success: true,
      message: 'Password updated successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : 'Error changing password'
    });
  }
};

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find({})
      .select('-password')
      .sort({ createdAt: -1 });
      
    res.json({
      success: true,
      users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Error retrieving users'
    });
  }
};

export const getUserById = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found'
      });
      return;
    }

    res.json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Error retrieving user'
    });
  }
};