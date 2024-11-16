import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

interface RegisterRequest {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  contactNumber: string;
  type: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

export const register = async (req: Request<{}, {}, RegisterRequest>, res: Response): Promise<void> => {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not configured');
    }

    const { email, firstName, lastName, password, contactNumber, type } = req.body;

    if (!email || !firstName || !lastName || !password || !contactNumber || !type) {
      res.status(400).json({
        success: false,
        message: 'Missing required fields',
      });
      return;
    }

    const emailExists = await User.findOne({ email });
    if (emailExists) {
      res.status(400).json({
        success: false,
        message: 'Email already registered',
      });
      return;
    }

    const user = new User(req.body);
    await user.save();

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Registration failed',
    });
  }
};

export const login = async (req: Request<{}, {}, LoginRequest>, res: Response): Promise<void> => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        res.status(400).json({ message: 'User not found' });
        return;
      }
  
      const isValid = await bcrypt.compare(req.body.password, user.password);
      if (!isValid) {
        res.status(400).json({ message: 'Invalid password' });
        return;
      }
  
      if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not configured');
      }
  
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );
  
      // Safe way to remove password
      const userObject = user.toObject();
      const { password: _, ...userWithoutPassword } = userObject;
  
      res.json({
        success: true,
        token,
        user: userWithoutPassword
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Login failed'
      });
    }
  };