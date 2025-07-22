"use server";

import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";
import dbConnect from "../db/connect";
import User from "../db/models/user.model";
import { v4 as uuidv4 } from 'uuid';

export async function handleUserCreation({
  user,
  referralCode,
}: {
  user: KindeUser;
  referralCode?: string | null;
}) {
  await dbConnect();

  // Check if user already exists in our DB
  const dbUser = await User.findOne({ email: user.email });
  if (dbUser) {
    return; // User already exists, no action needed.
  }

  let referredBy = null;
  let initialCoins = 0;

  if (referralCode) {
    const referrer = await User.findOne({ referralCode });

    if (referrer) {
      // Award coins to the referrer
      referrer.coins = (referrer.coins || 0) + 10;
      await referrer.save();

      // Set initial state for the new user
      referredBy = referrer._id;
      initialCoins = 10;
    }
  }

  // Generate unique QR code data
  const uniqueCode = uuidv4();
  const qrCodeData = {
    studentId: user.id || uuidv4(),
    name: `${user.given_name} ${user.family_name}`.trim(),
    generatedAt: new Date().toISOString(),
    uniqueCode,
  };

  // Create the new user in our database
  await User.create({
    name: `${user.given_name} ${user.family_name}`,
    email: user.email,
    image: user.picture,
    coins: initialCoins,
    referredBy,
    referralCode: uuidv4().slice(0, 8), // Generate unique referral code
    qrCodeData,
  });
} 