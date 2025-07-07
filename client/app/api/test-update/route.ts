import { NextRequest, NextResponse } from 'next/server';
import { getAllVerifications, updateVerificationStatus } from '@/lib/db/verifications';

// Test endpoint to verify the update functionality works
export async function POST(request: NextRequest) {
    try {
        const { verificationId, status } = await request.json();

        if (!verificationId || !status) {
            return NextResponse.json({
                success: false,
                error: 'Missing verificationId or status'
            }, { status: 400 });
        }

        console.log('🧪 Testing update:', { verificationId, status });

        // First, get all verifications to see what we have
        const verificationsBefore = await getAllVerifications();
        console.log('🧪 Verifications before update:', verificationsBefore.length);

        const targetVerification = verificationsBefore.find(v => v.id === verificationId);
        if (!targetVerification) {
            return NextResponse.json({
                success: false,
                error: 'Verification not found',
                availableIds: verificationsBefore.map(v => v.id)
            }, { status: 404 });
        }

        console.log('🧪 Found verification:', targetVerification.id, 'current status:', targetVerification.status);

        // Try to update
        const updateResult = await updateVerificationStatus(verificationId, status as any, 'Test update');
        console.log('🧪 Update result:', updateResult);

        // Get verifications after update
        const verificationsAfter = await getAllVerifications();
        const updatedVerification = verificationsAfter.find(v => v.id === verificationId);

        return NextResponse.json({
            success: true,
            updateResult,
            before: targetVerification,
            after: updatedVerification,
            totalVerifications: verificationsAfter.length
        });

    } catch (error) {
        console.error('🧪 Test update error:', error);
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}
