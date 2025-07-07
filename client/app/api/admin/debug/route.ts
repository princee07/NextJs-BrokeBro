import { NextRequest, NextResponse } from 'next/server';
import { getAllVerifications } from '@/lib/db/verifications';
import { getVerificationsFromMemory } from '@/lib/db/memory-storage';

export async function GET(request: NextRequest) {
    try {
        // Environment info
        const envInfo = {
            NODE_ENV: process.env.NODE_ENV,
            VERCEL: process.env.VERCEL,
            VERCEL_ENV: process.env.VERCEL_ENV,
            timestamp: new Date().toISOString()
        };

        // Get verifications through the main function
        const allVerifications = await getAllVerifications();

        // Get verifications directly from memory
        const memoryVerifications = getVerificationsFromMemory();

        return NextResponse.json({
            success: true,
            environment: envInfo,
            verificationsFromMain: {
                count: allVerifications.length,
                data: allVerifications
            },
            verificationsFromMemory: {
                count: memoryVerifications.length,
                data: memoryVerifications
            },
            globalStorageExists: !!global.__verification_storage,
            message: 'Debug info retrieved successfully'
        });

    } catch (error) {
        console.error('Debug endpoint error:', error);
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined
        }, { status: 500 });
    }
}
