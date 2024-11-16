// src/middleware/auth.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { RequestWithUser } from '../routes/userRoutes';

const auth = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const authHeader = req.header('Authorization');
      if (!authHeader) {
        throw new Error('No authorization header');
      }
  
      const token = authHeader.replace('Bearer ', '');
      if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not configured');
      }
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as { userId: string };
      const user = await User.findOne({ _id: decoded.userId });
  
      if (!user) {
        throw new Error('User not found');
      }
  
      Object.assign(req, { user });
      next();
    } catch (error) {
      res.status(401).json({ 
        success: false,
        message: error instanceof Error ? error.message : 'Please authenticate'
      });
    }
  };

export default auth;