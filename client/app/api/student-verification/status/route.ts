import { NextRequest, NextResponse } from 'next/server';
import { getVerificationById, updateVerificationStatus } from '@/lib/db/verifications';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const verificationId = searchParams.get('id');

        if (!verificationId) {
            return NextResponse.json(
                { success: false, message: 'Verification ID is required' },
                { status: 400 }
            );
        }

        // Get verification from database
        const verification = await getVerificationById(verificationId);

        if (!verification) {
            return NextResponse.json(
                { success: false, message: 'Verification not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            verification,
        });

    } catch (error) {
        console.error('Verification status check error:', error);
        return NextResponse.json(
            {
                success: false,
                message: 'Failed to check verification status'
            },
            { status: 500 }
        );
    }
}

// Admin endpoint to update verification status
export async function PUT(request: NextRequest) {
    try {
        // Check admin authentication
        const adminAuth = request.cookies.get('admin-auth');
        if (!adminAuth || adminAuth.value !== 'authenticated') {
            return NextResponse.json(
                { success: false, message: 'Unauthorized access' },
                { status: 401 }
            );
        }

        const { verificationId, status, adminNotes } = await request.json();

        // Validate required fields
        if (!verificationId || !status) {
            return NextResponse.json(
                { success: false, message: 'Verification ID and status are required' },
                { status: 400 }
            );
        }

        // Validate status values
        if (!['approved', 'rejected', 'under_review'].includes(status)) {
            return NextResponse.json(
                { success: false, message: 'Invalid status value' },
                { status: 400 }
            );
        }

        // Update verification status in database
        const updated = await updateVerificationStatus(verificationId, status, adminNotes);

        if (!updated) {
            return NextResponse.json(
                { success: false, message: 'Verification not found or update failed' },
                { status: 404 }
            );
        }

        console.log(`Admin updated verification ${verificationId} to ${status}`);
        // In production, this would update your database

        return NextResponse.json({
            success: true,
            message: 'Verification status updated successfully',
            data: {
                verificationId,
                status,
                adminNotes,
                reviewedAt: new Date().toISOString()
            }
        });

    } catch (error) {
        console.error('Admin verification update error:', error);
        return NextResponse.json(
            {
                success: false,
                message: 'Failed to update verification status'
            },
            { status: 500 }
        );
    }
}

// Also support PATCH for compatibility
export async function PATCH(request: NextRequest) {
    return PUT(request);
}
