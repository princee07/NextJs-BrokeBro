import mongoose from 'mongoose';

const verifiedUserSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        index: true
    },
    userEmail: {
        type: String,
        required: true,
        index: true
    },
    studentName: {
        type: String,
        required: true
    },
    collegeName: {
        type: String,
        required: true
    },
    rollNo: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    verificationId: {
        type: String,
        required: true,
        unique: true
    },
    verifiedAt: {
        type: Date,
        default: Date.now
    },
    verificationDuration: {
        type: Number, // Duration in hours
        required: true
    }
}, {
    timestamps: true
});

// Create indexes for efficient queries
verifiedUserSchema.index({ userEmail: 1 });
verifiedUserSchema.index({ verifiedAt: -1 });
verifiedUserSchema.index({ collegeName: 1 });
verifiedUserSchema.index({ state: 1 });

const VerifiedUser = mongoose.models.VerifiedUser || mongoose.model('VerifiedUser', verifiedUserSchema);

export default VerifiedUser;
