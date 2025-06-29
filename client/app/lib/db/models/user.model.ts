import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  image?: string;
  referralCode: string;
  coins: number;
  referredBy?: string;
  // ...add other fields as needed
}

const UserSchema: Schema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image: { type: String },
  referralCode: { type: String, unique: true },
  coins: { type: Number, default: 0 },
  referredBy: { type: String, default: null },
  // ...add other fields as needed
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
