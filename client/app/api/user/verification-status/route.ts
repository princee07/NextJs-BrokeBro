import { NextRequest, NextResponse } from 'next/server';
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import dbConnect from '@/app/lib/db/connect';
import User from '@/app/lib/db/models/user.model';

export async function GET(request: NextRequest) {
    try {
        // Check if user is authenticated
        const { getUser } = getKindeServerSession();
        const kindeUser = await getUser();

        if (!kindeUser) {
            return NextResponse.json(
                { success: false, message: 'User authentication required' },
                { status: 401 }
            );
        }

        await dbConnect();

        // Find user in database
        const user = await User.findOne({ email: kindeUser.email });

        if (!user) {
            return NextResponse.json({
                success: true,
                isVerified: false,
                verificationId: null,
                verificationDate: null,
                message: 'User not found in database'
            });
        }

        // Return verification status
        return NextResponse.json({
            success: true,
            isVerified: user.isVerified || false,
            verificationId: user.verificationId || null,
            verificationDate: user.verificationDate || null,
            message: 'Verification status retrieved successfully'
        });

    } catch (error) {
        console.error('Error checking user verification status:', error);
        return NextResponse.json(
            {
                success: false,
                message: 'Failed to check verification status',
                isVerified: false,
                verificationId: null,
                verificationDate: null
            },
            { status: 500 }
        );
    }
}
