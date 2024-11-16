// src/controllers/registrationController.ts
import { Request, Response } from 'express';
import Registration from '../models/Registration';
import { uploadToBlob } from '../services/blobService';
import { sendConfirmationEmail } from '../services/emailService';
import { generateQRCode } from '../services/qrCodeService';

interface RegisterRequestBody {
  fullName: string;
  email: string;
  contactNumber: string;
}

interface QRCodeData {
  fullName: string;
  email: string;
  contactNumber: string;
  registrationDate: string;
}

export const register = async (
  req: Request<{}, {}, RegisterRequestBody>,
  res: Response
): Promise<void> => {
  try {
    const { fullName, email, contactNumber } = req.body;
    const file = req.file;

    if (!email || !fullName || !contactNumber || !file) {
      throw new Error('Missing required fields');
    }

    const fileUrl = await uploadToBlob(file);

    const qrData: QRCodeData = {
      fullName,
      email,
      contactNumber,
      registrationDate: new Date().toISOString(),
    };
    const qrCode = await generateQRCode(qrData);

    const registration = new Registration({
      fullName,
      email,
      contactNumber,
      paymentProofUrl: fileUrl,
      qrCode,
    });
    await registration.save();

    await sendConfirmationEmail(fullName, email, contactNumber, qrCode);

    res.json({
      success: true,
      message: 'Registration successful! Please check your email.',
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : 'Registration failed. Please try again.',
    });
  }
};