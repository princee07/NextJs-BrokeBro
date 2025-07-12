import { NextRequest, NextResponse } from 'next/server';

// Admin email addresses
const ADMIN_EMAILS = [
    'prince1362005@gmail.com',
    'lavanya.varshney2104@gmail.com',
    'vrindabindal1212@gmail.com'
];

export async function POST(request: NextRequest) {
    try {
        const { email } = await request.json();

        // Validate if email is in admin list
        if (ADMIN_EMAILS.includes(email)) {
            const response = NextResponse.json({
                success: true,
                message: 'Admin access granted automatically',
                adminEmail: email
            });

            // Set admin authentication cookie
            response.cookies.set('admin-auth', 'authenticated', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60 * 24 * 7 // 7 days
            });

            // Store admin email in cookie for verification
            response.cookies.set('admin-email', email, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60 * 24 * 7 // 7 days
            });

            return response;
        } else {
            return NextResponse.json(
                { success: false, message: 'Email not authorized for admin access' },
                { status: 403 }
            );
        }
    } catch (error) {
        return NextResponse.json(
            { success: false, message: 'Server error' },
            { status: 500 }
        );
    }
}
