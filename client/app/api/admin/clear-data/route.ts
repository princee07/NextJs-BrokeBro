import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const VERIFICATIONS_FILE = path.join(process.cwd(), 'data', 'verifications.json');

export async function DELETE(request: NextRequest) {
    try {
        // Check admin authentication
        const adminAuth = request.cookies.get('admin-auth');
        if (!adminAuth || adminAuth.value !== 'authenticated') {
            return NextResponse.json(
                { success: false, message: 'Unauthorized access' },
                { status: 401 }
            );
        }

        // Clear all verification data
        await fs.writeFile(VERIFICATIONS_FILE, JSON.stringify([], null, 2));

        return NextResponse.json({
            success: true,
            message: 'All verification data cleared successfully'
        });

    } catch (error) {
        console.error('Error clearing verification data:', error);
        return NextResponse.json({
            success: false,
            error: 'Failed to clear verification data'
        }, { status: 500 });
    }
}
