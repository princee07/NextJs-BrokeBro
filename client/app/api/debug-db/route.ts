import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/app/lib/db/connect';
import User from '@/app/lib/db/models/user.model';
import VerifiedUser from '@/app/lib/db/models/verifiedUser.model';

// Debug API to check what's actually in the database
export async function GET() {
  try {
    await dbConnect();

    // Get all users
    const allUsers = await User.find({}).select('_id name email isVerified verificationDate');
    
    // Get all verified users
    const allVerifiedUsers = await VerifiedUser.find({}).select('userId userEmail studentName rollNo collegeName state verificationId');

    // Check specific test users
    const johnUser = await User.findOne({ email: 'john.doe@university.edu' });
    const johnVerified = await VerifiedUser.findOne({ userEmail: 'john.doe@university.edu' });

    return NextResponse.json({
      success: true,
      debug: {
        totalUsers: allUsers.length,
        totalVerifiedUsers: allVerifiedUsers.length,
        allUsers: allUsers,
        allVerifiedUsers: allVerifiedUsers,
        johnDoeCheck: {
          userExists: !!johnUser,
          userDetails: johnUser ? {
            id: johnUser._id.toString(),
            name: johnUser.name,
            email: johnUser.email,
            isVerified: johnUser.isVerified
          } : null,
          verifiedExists: !!johnVerified,
          verifiedDetails: johnVerified ? {
            userId: johnVerified.userId,
            userEmail: johnVerified.userEmail,
            rollNo: johnVerified.rollNo,
            studentName: johnVerified.studentName
          } : null
        },
        testQueries: {
          // Test the exact queries used in verification
          queryByRollNo: await VerifiedUser.findOne({ rollNo: '123456789' }),
          queryByEmail: await VerifiedUser.findOne({ userEmail: 'john.doe@university.edu' }),
        }
      }
    });

  } catch (error) {
    console.error('Debug API error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
  }
}
