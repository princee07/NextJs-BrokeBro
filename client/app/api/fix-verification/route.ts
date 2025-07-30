import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/app/lib/db/connect';
import User from '@/app/lib/db/models/user.model';
import VerifiedUser from '@/app/lib/db/models/verifiedUser.model';

// API to fix mismatched user verification entries
export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const { correctUserId, email } = body;

    // Find the user with correct ID
    const user = await User.findById(correctUserId);
    if (!user) {
      return NextResponse.json({
        success: false,
        error: 'User not found with provided ID'
      });
    }

    // Find the verified user entry by email
    const verifiedUser = await VerifiedUser.findOne({ userEmail: email });
    if (!verifiedUser) {
      return NextResponse.json({
        success: false,
        error: 'Verified user entry not found'
      });
    }

    // Update the verified user entry to point to correct user ID
    verifiedUser.userId = correctUserId;
    await verifiedUser.save();

    return NextResponse.json({
      success: true,
      message: 'Verified user entry updated successfully',
      before: {
        oldUserId: verifiedUser.userId,
        email: verifiedUser.userEmail
      },
      after: {
        newUserId: correctUserId,
        email: verifiedUser.userEmail,
        studentName: verifiedUser.studentName,
        rollNo: verifiedUser.rollNo
      }
    });

  } catch (error) {
    console.error('Fix verification error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

// GET method to fix automatically
export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');
    const email = url.searchParams.get('email');

    if (!userId || !email) {
      return NextResponse.json({
        success: false,
        error: 'Both userId and email parameters required'
      });
    }

    // Find the user with correct ID
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({
        success: false,
        error: 'User not found with provided ID'
      });
    }

    // Find the verified user entry by email
    const verifiedUser = await VerifiedUser.findOne({ userEmail: email });
    if (!verifiedUser) {
      return NextResponse.json({
        success: false,
        error: 'Verified user entry not found'
      });
    }

    const oldUserId = verifiedUser.userId;

    // Update the verified user entry to point to correct user ID
    verifiedUser.userId = userId;
    await verifiedUser.save();

    return NextResponse.json({
      success: true,
      message: 'Verification link fixed successfully',
      fixed: {
        email: email,
        oldUserId: oldUserId,
        newUserId: userId,
        studentName: verifiedUser.studentName,
        rollNo: verifiedUser.rollNo,
        verificationId: verifiedUser.verificationId
      }
    });

  } catch (error) {
    console.error('Auto-fix verification error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
