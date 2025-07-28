import mongoose, { Schema, Document } from 'mongoose';

export interface IClickTracker extends Document {
  userId: string;
  userEmail: string;
  userName?: string;
  cardType: string; // 'hero', 'category', 'product', 'mens-fashion', 'womens-fashion', 'beauty'
  cardIdentifier: string; // unique identifier for the card (title, image name, or index)
  cardData: {
    title?: string;
    subtitle?: string;
    image?: string;
    label?: string;
    type?: string;
    brand?: string;
    price?: string;
    category?: string;
  };
  clickedAt: Date;
  sessionId?: string;
  userAgent?: string;
  ipAddress?: string;
  pageUrl?: string;
}

const ClickTrackerSchema: Schema = new Schema<IClickTracker>({
  userId: { type: String, required: true, index: true },
  userEmail: { type: String, required: true, index: true },
  userName: { type: String },
  cardType: { type: String, required: true, index: true },
  cardIdentifier: { type: String, required: true },
  cardData: {
    title: { type: String },
    subtitle: { type: String },
    image: { type: String },
    label: { type: String },
    type: { type: String },
    brand: { type: String },
    price: { type: String },
    category: { type: String },
  },
  clickedAt: { type: Date, default: Date.now, index: true },
  sessionId: { type: String },
  userAgent: { type: String },
  ipAddress: { type: String },
  pageUrl: { type: String },
}, {
  timestamps: true
});

// Create compound indexes for efficient queries
ClickTrackerSchema.index({ userId: 1, cardType: 1 });
ClickTrackerSchema.index({ cardType: 1, clickedAt: -1 });
ClickTrackerSchema.index({ userEmail: 1, clickedAt: -1 });

export default mongoose.models.ClickTracker || mongoose.model<IClickTracker>('ClickTracker', ClickTrackerSchema);
