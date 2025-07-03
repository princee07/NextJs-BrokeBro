import { NextResponse } from 'next/server';
import { getUserReferralData, processReferral } from '@/app/lib/actions/referral.actions';

export async function GET() {
    try {
        const result = await getUserReferralData();
        return NextResponse.json({
            success: result.success,
            data: result.data,
            environment: {
                NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
                NODE_ENV: process.env.NODE_ENV,
            }
        });
    } catch (error) {
        console.error('Test API error:', error);
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { referralCode } = await request.json();

        if (!referralCode) {
            return NextResponse.json({
                success: false,
                error: 'Referral code is required'
            }, { status: 400 });
        }

        console.log('Testing referral processing with code:', referralCode);
        const result = await processReferral(referralCode);

        return NextResponse.json({
            success: result.success,
            message: result.message,
            coinsAwarded: result.coinsAwarded,
            referrerCoins: result.referrerCoins
        });
    } catch (error) {
        console.error('Test referral processing error:', error);
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}