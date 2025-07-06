import { NextRequest, NextResponse } from 'next/server';
import { getAllVerifications, getVerificationStats } from '@/lib/db/verifications';

export async function GET(request: NextRequest) {
    try {
        // Check admin authentication
        const adminAuth = request.cookies.get('admin-auth');
        if (!adminAuth || adminAuth.value !== 'authenticated') {
            return NextResponse.json(
                { success: false, message: 'Unauthorized access' },
                { status: 401 }
            );
        }

        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');

        // Get all verifications from database
        const allVerifications = await getAllVerifications();

        // Filter by status if provided
        let filteredVerifications = allVerifications;
        if (status && status !== 'all') {
            filteredVerifications = allVerifications.filter(v => v.status === status);
        }

        // Sort by submission date (newest first)
        filteredVerifications.sort((a, b) =>
            new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
        );

        // Apply pagination
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedVerifications = filteredVerifications.slice(startIndex, endIndex);

        // Get statistics
        const stats = await getVerificationStats();

        return NextResponse.json({
            success: true,
            verifications: paginatedVerifications,
            pagination: {
                page,
                limit,
                total: filteredVerifications.length,
                totalPages: Math.ceil(filteredVerifications.length / limit)
            },
            stats
        });

    } catch (error) {
        console.error('Admin verifications fetch error:', error);
        return NextResponse.json({
            success: false,
            error: 'Failed to fetch verification requests'
        }, { status: 500 });
    }
}
