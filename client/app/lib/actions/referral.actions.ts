"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import dbConnect from "../db/connect";
import User from "../db/models/user.model";
import { v4 as uuidv4 } from 'uuid';

// This server action is called from the client to process a referral.
export async function processReferral(referralCode: string): Promise<{ success: boolean }> {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
      // Should not happen if called from a logged-in state, but good to check.
      return { success: false };
    }

    await dbConnect();
    const dbUser = await User.findOne({ email: user.email });

    if (dbUser) {
      // User already exists in our database, so they are not "new".
      return { success: true }; // Still success, as we don't want to show an error.
    }

    // Find the user who referred them.
    const referrer = await User.findOne({ referralCode });

    let referredBy = null;
    let initialCoins = 0;

    if (referrer) {
      // Award coins to the referrer.
      referrer.coins = (referrer.coins || 0) + 10;
      await referrer.save();

      // Set the starting coins for the new user.
      referredBy = referrer._id;
      initialCoins = 10;
    }

    // Create the new user in our database.
    await User.create({
      name: `${user.given_name} ${user.family_name}`,
      email: user.email,
      image: user.picture,
      coins: initialCoins,
      referredBy,
      referralCode: uuidv4().slice(0, 8),
    });
    
    return { success: true };
  } catch (error) {
    console.error("Error processing referral:", error);
    return { success: false };
  }
} 