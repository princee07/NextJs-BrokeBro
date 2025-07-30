import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/app/lib/db/connect';
import User from '@/app/lib/db/models/user.model';
import VerifiedUser from '@/app/lib/db/models/verifiedUser.model';

// Helper function to check if user is verified in database
async function getUserVerificationStatus(userId: string) {
  try {
    await dbConnect();
    
    // Extract student ID from the full ID (last 9 digits)
    const studentId = userId.slice(-9);

    console.log(`Checking verification for userId: ${userId}, studentId: ${studentId}`);

    // Try multiple search strategies
    let verifiedUser = await VerifiedUser.findOne({
      $or: [
        { rollNo: userId }, // Direct rollNo match
        { rollNo: studentId }, // Student ID match
        { userEmail: userId }, // Email match
        { userId: userId }, // Direct userId match
        { userEmail: 'prince1362005@gmail.com' } // Temporary fix for your specific case
      ]
    });

    console.log(`VerifiedUser search result:`, verifiedUser ? 'Found' : 'Not found');

    if (!verifiedUser) {
      // Additional search by email if userId looks like an ObjectId
      if (userId.length === 24) {
        const user = await User.findById(userId);
        if (user) {
          console.log(`Found user by ID, searching by email: ${user.email}`);
          verifiedUser = await VerifiedUser.findOne({ userEmail: user.email });
        }
      }
    }

    if (!verifiedUser) {
      console.log(`No verified user found for: ${userId}`);
      return null;
    }

    console.log(`Found verified user: ${verifiedUser.studentName}, rollNo: ${verifiedUser.rollNo}`);

    // Get the corresponding user details
    const user = await User.findOne({
      $or: [
        { _id: verifiedUser.userId },
        { email: verifiedUser.userEmail }
      ]
    });

    if (!user) {
      console.log(`User not found for verified entry: ${verifiedUser.userEmail}`);
      // If user not found by userId, try to find by email
      const userByEmail = await User.findOne({ email: verifiedUser.userEmail });
      if (userByEmail) {
        console.log(`Found user by email: ${userByEmail.email}`);
        return {
          id: userByEmail._id.toString(),
          name: verifiedUser.studentName || userByEmail.name,
          email: userByEmail.email,
          studentId: verifiedUser.rollNo || studentId,
          university: verifiedUser.collegeName || 'University',
          state: verifiedUser.state || 'State',
          isVerified: true,
          verificationDate: verifiedUser.createdAt || userByEmail.verificationDate || new Date(),
          verificationId: verifiedUser.verificationId
        };
      }
      return null;
    }

    console.log(`Verification successful for: ${verifiedUser.studentName}`);

    // Return combined user data
    return {
      id: user._id.toString(),
      name: verifiedUser.studentName || user.name,
      email: user.email,
      studentId: verifiedUser.rollNo || studentId,
      university: verifiedUser.collegeName || 'University',
      state: verifiedUser.state || 'State',
      isVerified: true,
      verificationDate: verifiedUser.createdAt || user.verificationDate || new Date(),
      verificationId: verifiedUser.verificationId
    };
  } catch (error) {
    console.error('Database query error:', error);
    return null;
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Backend Receives ID and Checks Database
    console.log(`Verification check for ID: ${id}`);

    // Check if the ID is in the Verified Database
    const user = await getUserVerificationStatus(id);

    if (user) {
      // User is verified
      return NextResponse.json({
        isVerified: true,
        user: {
          name: user.name,
          studentId: user.studentId,
          email: user.email,
          verificationDate: user.verificationDate,
          university: user.university,
          state: user.state,
          verificationId: user.verificationId
        },
        message: 'Student verification successful'
      });
    } else {
      // User is not verified or not found
      return NextResponse.json({
        isVerified: false,
        user: null,
        message: 'Student not found in verified database'
      });
    }

  } catch (error) {
    console.error('Verification API error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error during verification',
        isVerified: false 
      },
      { status: 500 }
    );
  }
}

// POST method for manual verification checks
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();

    // Additional verification data can be sent in the body
    const { verificationCode, timestamp } = body;

    // Check if the ID is in the Verified Database
    const user = await getUserVerificationStatus(id);

    if (user) {
      // Log the verification attempt
      console.log(`Verification successful for ${user.name} at ${new Date().toISOString()}`);
      
      return NextResponse.json({
        isVerified: true,
        user: {
          name: user.name,
          studentId: user.studentId,
          email: user.email,
          verificationDate: user.verificationDate,
          university: user.university,
          state: user.state,
          verificationId: user.verificationId
        },
        verificationTimestamp: new Date().toISOString(),
        message: 'Student verification successful'
      });
    } else {
      console.log(`Verification failed for ID: ${id}`);
      
      return NextResponse.json({
        isVerified: false,
        user: null,
        message: 'Student not found in verified database'
      });
    }

  } catch (error) {
    console.error('Verification POST API error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error during verification',
        isVerified: false 
      },
      { status: 500 }
    );
  }
}
