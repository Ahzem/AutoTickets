// src/services/emailService.ts
import nodemailer, { Transporter } from 'nodemailer';
import { getEmailTemplate } from '../utils/emailTemplates';

const transporter: Transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

interface EmailData {
  from: string;
  to: string;
  subject: string;
  html: string;
}

export const sendConfirmationEmail = async (
  fullName: string,
  email: string,
  contactNumber: string,
  qrCode: string
): Promise<void> => {
  try {
    if (!process.env.EMAIL_USER) {
      throw new Error('Email configuration missing');
    }

    const emailData: EmailData = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Event Registration Confirmation',
      html: getEmailTemplate(fullName, email, contactNumber, qrCode),
    };

    await transporter.sendMail(emailData);
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    throw new Error('Failed to send confirmation email');
  }
};