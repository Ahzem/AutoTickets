// src/models/User.ts
import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';
import { IUser, IOccupation, IAddress } from '../types/types';

export interface IUserDocument extends IUser, Document {
  _id: string;
}

export interface IUserModel extends IUserDocument {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const addressSchema = new Schema<IAddress>({
  street: String,
  city: String,
  state: String,
  zipCode: String,
});

const occupationSchema = new Schema<IOccupation>({
  student: {
    university: String,
    course: String,
    year: String,
  },
  employee: {
    company: String,
    position: String,
    experience: String,
  },
  owner: {
    companyName: String,
    industry: String,
    employeeCount: String,
  },
}, { _id: false });

const userSchema = new Schema<IUserModel>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contactNumber: { type: String, required: true },
  type: { type: String, required: true },
  gender: { type: String, required: true },
  occupation: { type: occupationSchema, required: false },
  tShirtSize: String,
  mealPreferences: String,
  address: { type: addressSchema, required: false },
  createdAt: { type: Date, default: Date.now },
});

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export default model<IUserModel>('User', userSchema);