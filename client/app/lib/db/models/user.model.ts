import mongoose, { Schema, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface IUser extends Document {
  name: string;
  email: string;
  image?: string;
  referralCode: string;
  coins: number;
  referredBy?: string;
  resumeFileName?: string;
  resumeFilePath?: string;
  resumeUploadDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  // Verification fields
  isVerified?: boolean;
  verificationDate?: Date;
  verificationId?: string;
  // QR code data for ID card
  qrCodeData?: {
    studentId: string;
    name: string;
    generatedAt: string;
    uniqueCode: string;
  };
  // ...add other fields as needed
}

const UserSchema: Schema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image: { type: String },
  referralCode: {
    type: String,
    unique: true,
    default: () => uuidv4().slice(0, 8),
    required: true
  },
  coins: { type: Number, default: 0 },
  referredBy: { type: String, default: null },
  resumeFileName: { type: String, default: null },
  resumeFilePath: { type: String, default: null },
  resumeUploadDate: { type: Date, default: null },
  // Verification fields
  isVerified: { type: Boolean, default: false },
  verificationDate: { type: Date, default: null },
  verificationId: { type: String, default: null },
  // QR code data for ID card
  qrCodeData: {
    type: Object,
    default: null,
  },
  // ...add other fields as needed
}, {
  timestamps: true, // This adds createdAt and updatedAt automatically
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
