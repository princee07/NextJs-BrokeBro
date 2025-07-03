"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import dbConnect from "../db/connect";
import User from "../db/models/user.model";
import { v4 as uuidv4 } from 'uuid';

// Get user's referral information
export async function getUserReferralData(): Promise<{
  success: boolean;
  data?: {
    referralCode: string;
    coins: number;
    referralUrl: string;
    totalReferrals: number;
    referralsList: Array<{
      name: string;
      email: string;
      joinedAt: Date;
      coinsEarned: number;
    }>;
  };
}> {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
      return { success: false };
    }

    await dbConnect();
    let dbUser = await User.findOne({ email: user.email });

    if (!dbUser) {
      // Create user if doesn't exist
      const newReferralCode = uuidv4().slice(0, 8);
      console.log('Creating new user with referral code:', newReferralCode);

      dbUser = await User.create({
        name: `${user.given_name} ${user.family_name}`,
        email: user.email,
        image: user.picture,
        coins: 0,
        referralCode: newReferralCode,
      });
    }

    // Ensure user has a referral code (for existing users who might not have one)
    if (!dbUser.referralCode) {
      const newReferralCode = uuidv4().slice(0, 8);
      console.log('Adding referral code to existing user:', newReferralCode);
      dbUser.referralCode = newReferralCode;
      await dbUser.save();
    }

    console.log('Final user referral code:', dbUser.referralCode);
    console.log('User object:', JSON.stringify(dbUser, null, 2));

    // Get all users referred by this user
    const referredUsers = await User.find({ referredBy: dbUser._id });

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const referralUrl = `${baseUrl}/?ref=${dbUser.referralCode}`;

    console.log('Generated referral URL:', referralUrl);
    console.log('Base URL:', baseUrl);
    console.log('User referral code for URL:', dbUser.referralCode);

    return {
      success: true,
      data: {
        referralCode: dbUser.referralCode,
        coins: dbUser.coins || 0,
        referralUrl,
        totalReferrals: referredUsers.length,
        referralsList: referredUsers.map(ref => ({
          name: ref.name,
          email: ref.email,
          joinedAt: ref.createdAt || new Date(),
          coinsEarned: 10, // Each referral gives 10 coins
        })),
      },
    };
  } catch (error) {
    console.error("Error getting user referral data:", error);
    return { success: false };
  }
}

// This server action is called from the client to process a referral.
export async function processReferral(referralCode: string): Promise<{
  success: boolean;
  message?: string;
  coinsAwarded?: number;
  referrerCoins?: number;
}> {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
      return { success: false, message: 'User not authenticated' };
    }

    await dbConnect();
    let dbUser = await User.findOne({ email: user.email });
    const referrer = await User.findOne({ referralCode });

    if (!referrer) {
      return { success: false, message: 'Invalid referral code' };
    }

    if (dbUser) {
      if (!dbUser.referredBy) {
        dbUser.referredBy = referrer._id;
        dbUser.coins = (dbUser.coins || 0) + 10;
        await dbUser.save();
        referrer.coins = (referrer.coins || 0) + 10;
        await referrer.save();
        return {
          success: true,
          message: 'Referral processed for existing user',
          coinsAwarded: 10,
          referrerCoins: referrer.coins
        };
      } else {
        return { success: true, message: 'User already referred' };
      }
    }

    // If user does not exist, create and process referral
    const newUser = await User.create({
      name: `${user.given_name} ${user.family_name}`,
      email: user.email,
      image: user.picture,
      coins: 10,
      referredBy: referrer._id,
      referralCode: uuidv4().slice(0, 8),
    });
    referrer.coins = (referrer.coins || 0) + 10;
    await referrer.save();

    return {
      success: true,
      message: 'Referral processed successfully',
      coinsAwarded: 10,
      referrerCoins: referrer.coins
    };
  } catch (error) {
    return { success: false, message: 'Error processing referral' };
  }
}