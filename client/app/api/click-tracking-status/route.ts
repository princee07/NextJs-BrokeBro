import { NextRequest, NextResponse } from 'next/server';
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function GET(request: NextRequest) {
    try {
        // Check if user is authenticated
        const { getUser } = getKindeServerSession();
        const kindeUser = await getUser();

        const debugInfo = {
            timestamp: new Date().toISOString(),
            userAuthenticated: !!kindeUser,
            userEmail: kindeUser?.email || 'Not authenticated',
            isAdmin: kindeUser?.email && [
                'prince1362005@gmail.com',
                'lavanya.varshney2104@gmail.com',
                'vrindabindal1212@gmail.com',
            ].includes(kindeUser.email),
            requestUrl: request.url,
            userAgent: request.headers.get('user-agent'),
            cookies: {
                adminAuth: request.cookies.get('admin-auth')?.value || 'Not set',
                adminEmail: request.cookies.get('admin-email')?.value || 'Not set',
            },
            environment: process.env.NODE_ENV || 'development',
        };

        return NextResponse.json({
            success: true,
            message: 'Click tracking system status',
            debug: debugInfo,
            systemStatus: {
                clickTrackingAvailable: true,
                analyticsAvailable: true,
                excelExportAvailable: true,
            }
        });

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'System check failed',
            error: error instanceof Error ? error.message : 'Unknown error',
            timestamp: new Date().toISOString(),
        }, { status: 500 });
    }
}
