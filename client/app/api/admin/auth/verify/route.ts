import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        // Check if admin is authenticated via cookie
        const adminAuth = request.cookies.get('admin-auth');
        const adminEmail = request.cookies.get('admin-email');

        if (adminAuth && adminAuth.value === 'authenticated' && adminEmail) {
            return NextResponse.json({
                success: true,
                authenticated: true,
                adminEmail: adminEmail.value,
                message: 'Admin is authenticated'
            });
        } else {
            return NextResponse.json({
                success: false,
                authenticated: false,
                message: 'Admin not authenticated'
            }, { status: 401 });
        }
    } catch (error) {
        return NextResponse.json({
            success: false,
            authenticated: false,
            message: 'Server error'
        }, { status: 500 });
    }
}
