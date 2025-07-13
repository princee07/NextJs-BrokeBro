import mongoose, { Schema, Document } from 'mongoose';
import { VerificationStatus } from '@/types/verification';

export interface IVerification extends Document {
    id: string;
    userId: string;
    userEmail?: string;
    status: string;
    submittedAt: Date;
    reviewedAt?: Date;
    adminNotes?: string;
    studentData: {
        studentName: string;
        collegeName: string;
        rollNo: string;
        state: string;
    };
    documents?: {
        idCardUrl?: string;
        feeReceiptUrl?: string;
        studentEmail?: string;
    };
}

const VerificationSchema: Schema = new Schema({
    id: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    userEmail: { type: String },
    status: { type: String, required: true },
    submittedAt: { type: Date, required: true },
    reviewedAt: { type: Date },
    adminNotes: { type: String },
    studentData: {
        studentName: { type: String, required: true },
        collegeName: { type: String, required: true },
        rollNo: { type: String, required: true },
        state: { type: String, required: true },
    },
    documents: {
        idCardUrl: { type: String },
        feeReceiptUrl: { type: String },
        studentEmail: { type: String },
    },
});

export default mongoose.models.Verification || mongoose.model<IVerification>('Verification', VerificationSchema);
