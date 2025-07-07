import { NextRequest, NextResponse } from 'next/server';

// Admin email addresses - in production, store these in environment variables or database
const ADMIN_EMAILS = [
    'prince1362005@gmail.com', // Primary admin
    process.env.ADMIN_EMAIL, // Additional admin emails can be added via env vars
].filter(Boolean); // Remove any undefined values

export async function POST(request: NextRequest) {
    try {
        const { email } = await request.json();

        // Validate if email is in admin list
        if (ADMIN_EMAILS.includes(email)) {
            // In production, you would:
            // 1. Integrate with Google OAuth
            // 2. Verify email ownership through email verification
            // 3. Generate a JWT token
            // 4. Set secure HTTP-only cookies
            // 5. Implement proper session management

            const response = NextResponse.json({
                success: true,
                message: 'Admin access granted',
                adminEmail: email
            });

            // Set admin authentication cookie
            response.cookies.set('admin-auth', 'authenticated', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60 * 24 // 24 hours
            });

            // Store admin email in cookie for verification
            response.cookies.set('admin-email', email, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 60 * 60 * 24 // 24 hours
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
