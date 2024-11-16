// src/models/Registration.ts
import { Schema, model, Document } from 'mongoose';

export interface IRegistration {
  fullName: string;
  email: string;
  contactNumber: string;
  paymentProofUrl: string;
  qrCode: string;
  createdAt: Date;
}

export interface IRegistrationDocument extends IRegistration, Document {}

const registrationSchema = new Schema<IRegistrationDocument>({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  contactNumber: { type: String, required: true },
  paymentProofUrl: { type: String, required: true },
  qrCode: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default model<IRegistrationDocument>('Registration', registrationSchema);