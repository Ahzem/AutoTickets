// src/services/qrCodeService.ts
import QRCode from 'qrcode';

interface QRCodeData {
  fullName: string;
  email: string;
  contactNumber: string;
  registrationDate: string;
}

export const generateQRCode = async (data: QRCodeData): Promise<string> => {
  try {
    return await QRCode.toDataURL(JSON.stringify(data));
  } catch (error) {
    throw new Error(`Failed to generate QR code: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};