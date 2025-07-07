import { NextRequest, NextResponse } from 'next/server';
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import dbConnect from "@/app/lib/db/connect";
import User from "@/app/lib/db/models/user.model";

export async function POST(request: NextRequest) {
    try {
        // Check if user is authenticated
        const { getUser } = getKindeServerSession();
        const kindeUser = await getUser();

        if (!kindeUser) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { internshipId, internshipTitle } = body;

        if (!internshipId || !internshipTitle) {
            return NextResponse.json({
                error: 'Missing required fields: internshipId and internshipTitle'
            }, { status: 400 });
        }

        // Connect to database
        await dbConnect();

        // Find user in database
        const user = await User.findOne({ email: kindeUser.email });
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Check if user has uploaded a resume
        if (!user.resumeFileName || !user.resumeFilePath) {
            return NextResponse.json({
                error: 'Please upload your resume before applying'
            }, { status: 400 });
        }

        // TODO: Here you would typically:
        // 1. Save the application to a database table (applications)
        // 2. Send notification emails
        // 3. Update application statistics
        // 4. Award coins to the user for applying

        // For now, we'll just simulate a successful application
        console.log(`User ${user.email} applied to ${internshipTitle} (ID: ${internshipId})`);

        // Optionally award coins for applying
        await User.findByIdAndUpdate(user._id, {
            coins: (user.coins || 0) + 5 // Award 5 coins for applying
        });

        return NextResponse.json({
            success: true,
            message: 'Application submitted successfully',
            data: {
                appliedAt: new Date().toISOString(),
                internshipId,
                internshipTitle,
                coinsAwarded: 5
            }
        });

    } catch (error) {
        console.error('Application submission error:', error);
        return NextResponse.json({
            error: 'Failed to submit application'
        }, { status: 500 });
    }
}
