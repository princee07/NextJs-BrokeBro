import mongoose, { Schema, Document } from 'mongoose';

export interface IFeedback extends Document {
  type: 'bug' | 'suggestion' | 'general' | 'rating';
  message: string;
  rating?: number;
  email?: string;
  page: string;
  timestamp: Date;
  userAgent: string;
  ipAddress?: string;
  isResolved?: boolean;
  adminNotes?: string;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: Date;
  updatedAt: Date;
}

const FeedbackSchema: Schema = new Schema<IFeedback>({
  type: {
    type: String,
    enum: ['bug', 'suggestion', 'general', 'rating'],
    required: true
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: function(this: IFeedback) {
      return this.type === 'rating';
    }
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    validate: {
      validator: function(email: string) {
        if (!email) return true; // Optional field
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      },
      message: 'Invalid email format'
    }
  },
  page: {
    type: String,
    required: true,
    trim: true
  },
  timestamp: {
    type: Date,
    required: true,
    default: Date.now
  },
  userAgent: {
    type: String,
    required: true
  },
  ipAddress: {
    type: String,
    trim: true
  },
  isResolved: {
    type: Boolean,
    default: false
  },
  adminNotes: {
    type: String,
    trim: true
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: function(this: IFeedback) {
      if (this.type === 'bug') return 'medium';
      if (this.type === 'rating' && this.rating && this.rating <= 2) return 'high';
      return 'low';
    }
  }
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
FeedbackSchema.index({ type: 1, createdAt: -1 });
FeedbackSchema.index({ isResolved: 1, priority: -1 });
FeedbackSchema.index({ page: 1, createdAt: -1 });
FeedbackSchema.index({ email: 1 });

// Virtual for feedback age
FeedbackSchema.virtual('feedbackAge').get(function(this: IFeedback) {
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - this.createdAt.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
});

// Static method to get feedback stats
FeedbackSchema.statics.getStats = async function() {
  return await this.aggregate([
    {
      $group: {
        _id: '$type',
        count: { $sum: 1 },
        avgRating: { $avg: '$rating' },
        unresolved: {
          $sum: { $cond: [{ $eq: ['$isResolved', false] }, 1, 0] }
        }
      }
    }
  ]);
};

const Feedback = mongoose.models.Feedback || mongoose.model<IFeedback>('Feedback', FeedbackSchema);

export default Feedback;
