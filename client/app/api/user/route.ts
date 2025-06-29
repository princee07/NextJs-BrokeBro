import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/app/lib/db/connect';
import User from '@/app/lib/db/models/user.model';

// POST /api/user/referral - handle referral code on signup
export async function POST(req: NextRequest) {
    await dbConnect();
    const { name, email, image, referralCode } = await req.json();

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
        return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    // Generate a unique referral code for the new user
    const newReferralCode = Math.random().toString(36).substring(2, 10) + Date.now().toString(36);

    // Handle referral logic
    let referredBy = null;
    if (referralCode) {
        const referrer = await User.findOne({ referralCode });
        if (referrer) {
            // Credit 10 coins to referrer
            referrer.coins += 10;
            await referrer.save();
            referredBy = referrer._id;
        }
    }

    // Create new user with 10 coins if referred, else 0
    user = new User({
        name,
        email,
        image,
        referralCode: newReferralCode,
        coins: referralCode ? 10 : 0,
        referredBy,
    });
    await user.save();

    return NextResponse.json({ message: 'User created', user });
}

// GET /api/user/coins - get current user's coin balance and referral code
export async function GET(req: NextRequest) {
    await dbConnect();
    const email = req.nextUrl.searchParams.get('email');
    if (!email) {
        return NextResponse.json({ error: 'Email required' }, { status: 400 });
    }
    let user = await User.findOne({ email });
    if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    // If user does not have a referralCode, generate and save one
    if (!user.referralCode) {
        user.referralCode = Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
        await user.save();
    }
    return NextResponse.json({ coins: user.coins, user: { referralCode: user.referralCode } });
}
