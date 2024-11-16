// src/routes/registrationRoutes.ts
import express, { Router } from 'express';
import multer from 'multer';
import { register } from '../controllers/registrationController';

const router: Router = express.Router();

// Configure multer
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { 
    fileSize: 5 * 1024 * 1024 // 5MB
  }
});

// Define types for file upload
declare global {
  namespace Express {
    interface Request {
      file?: Multer.File
    }
  }
}

// Registration route with file upload
router.post('/register', upload.single('paymentProof'), register);

export default router;