import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/app/lib/db/connect';
import User from '@/app/lib/db/models/user.model';
import VerifiedUser from '@/app/lib/db/models/verifiedUser.model';

// API to verify your real user account
export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const { userId, studentName, collegeName, rollNo, state } = body;

    // Find the user first
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({
        success: false,
        error: 'User not found'
      });
    }

    // Check if already verified
    const existingVerified = await VerifiedUser.findOne({ 
      userEmail: user.email 
    });

    if (existingVerified) {
      return NextResponse.json({
        success: false,
        error: 'User already verified',
        existingVerification: existingVerified
      });
    }

    // Create verified user entry
    const verifiedUser = new VerifiedUser({
      userId: user._id.toString(),
      userEmail: user.email,
      studentName: studentName || user.name,
      collegeName: collegeName || 'Your University',
      rollNo: rollNo || userId.slice(-9),
      state: state || 'Your State',
      verificationId: `VER_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      verificationDuration: 168 // 1 week
    });

    await verifiedUser.save();

    // Update user verification status
    user.isVerified = true;
    user.verificationDate = new Date();
    await user.save();

    return NextResponse.json({
      success: true,
      message: 'User verified successfully',
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email
      },
      verifiedUser: {
        studentName: verifiedUser.studentName,
        collegeName: verifiedUser.collegeName,
        rollNo: verifiedUser.rollNo,
        state: verifiedUser.state,
        verificationId: verifiedUser.verificationId
      }
    });

  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

// GET method to verify a user by their ID
export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({
        success: false,
        error: 'userId parameter required'
      });
    }

    // Auto-verify the user with basic info
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({
        success: false,
        error: 'User not found'
      });
    }

    // Check if already verified
    const existingVerified = await VerifiedUser.findOne({ 
      userEmail: user.email 
    });

    if (existingVerified) {
      return NextResponse.json({
        success: true,
        message: 'User already verified',
        alreadyExists: true,
        verifiedUser: existingVerified
      });
    }

    // Create verified user entry with default values
    const verifiedUser = new VerifiedUser({
      userId: user._id.toString(),
      userEmail: user.email,
      studentName: user.name,
      collegeName: 'BrokeBro University', // Default
      rollNo: userId.slice(-9), // Use last 9 chars of user ID
      state: 'Digital State', // Default
      verificationId: `VER_${Date.now()}_AUTO`,
      verificationDuration: 168 // 1 week
    });

    await verifiedUser.save();

    // Update user verification status
    user.isVerified = true;
    user.verificationDate = new Date();
    await user.save();

    return NextResponse.json({
      success: true,
      message: 'User auto-verified successfully',
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email
      },
      verifiedUser: {
        studentName: verifiedUser.studentName,
        collegeName: verifiedUser.collegeName,
        rollNo: verifiedUser.rollNo,
        state: verifiedUser.state,
        verificationId: verifiedUser.verificationId
      }
    });

  } catch (error) {
    console.error('Auto-verification error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
