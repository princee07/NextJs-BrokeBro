import { NextRequest, NextResponse } from 'next/server';
import { saveVerification } from '@/lib/db/verifications';
import { VerificationStatus } from '@/types/verification';

// Test endpoint to manually create a verification for testing purposes
export async function POST(request: NextRequest) {
    try {
        // Create a test verification
        const testVerification: VerificationStatus = {
            id: `test-${Date.now()}`,
            userId: 'test-user-id',
            status: 'pending',
            submittedAt: new Date(),
            studentData: {
                studentName: 'Test Student',
                collegeName: 'Test College',
                rollNo: 'TEST001',
                state: 'Test State',
            },
            documents: {
                studentEmail: 'test@student.com'
            }
        };

        console.log('Creating test verification:', testVerification);

        // Save the verification
        await saveVerification(testVerification);

        return NextResponse.json({
            success: true,
            message: 'Test verification created successfully',
            verification: testVerification
        });

    } catch (error) {
        console.error('Test verification error:', error);
        return NextResponse.json({
            success: false,
            error: 'Failed to create test verification'
        }, { status: 500 });
    }
}

// GET endpoint to test memory storage retrieval
export async function GET(request: NextRequest) {
    try {
        const { getAllVerifications } = await import('@/lib/db/verifications');
        const verifications = await getAllVerifications();

        return NextResponse.json({
            success: true,
            count: verifications.length,
            verifications
        });

    } catch (error) {
        console.error('Test verification fetch error:', error);
        return NextResponse.json({
            success: false,
            error: 'Failed to fetch verifications'
        }, { status: 500 });
    }
}
