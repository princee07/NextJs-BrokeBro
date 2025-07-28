import { NextRequest, NextResponse } from 'next/server';
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import dbConnect from '@/app/lib/db/connect';
import ClickTracker from '@/app/lib/db/models/clickTracker.model';
import User from '@/app/lib/db/models/user.model';

export async function POST(request: NextRequest) {
    try {
        // Check if user is authenticated
        const { getUser } = getKindeServerSession();
        const kindeUser = await getUser();

        if (!kindeUser) {
            return NextResponse.json(
                { success: false, message: 'User authentication required' },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { cardType, cardIdentifier, cardData } = body;

        if (!cardType || !cardIdentifier) {
            return NextResponse.json(
                { success: false, message: 'Card type and identifier are required' },
                { status: 400 }
            );
        }

        await dbConnect();

        // Get user details from database
        const user = await User.findOne({ email: kindeUser.email });

        // Create click record
        const clickRecord = new ClickTracker({
            userId: kindeUser.id,
            userEmail: kindeUser.email,
            userName: user?.name || kindeUser.given_name + ' ' + kindeUser.family_name || 'Unknown',
            cardType,
            cardIdentifier,
            cardData: cardData || {},
            clickedAt: new Date(),
            sessionId: request.headers.get('x-session-id') || undefined,
            userAgent: request.headers.get('user-agent') || undefined,
            ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || undefined,
            pageUrl: request.headers.get('referer') || undefined,
        });

        await clickRecord.save();

        return NextResponse.json({
            success: true,
            message: 'Click tracked successfully',
            clickId: clickRecord._id
        });

    } catch (error) {
        console.error('Error tracking click:', error);
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    try {
        // Check if user is authenticated
        const { getUser } = getKindeServerSession();
        const kindeUser = await getUser();

        if (!kindeUser) {
            return NextResponse.json(
                { success: false, message: 'User authentication required' },
                { status: 401 }
            );
        }

        const { searchParams } = new URL(request.url);
        const cardType = searchParams.get('cardType');
        const limit = parseInt(searchParams.get('limit') || '10');
        const offset = parseInt(searchParams.get('offset') || '0');

        await dbConnect();

        // Build query
        const query: any = { userId: kindeUser.id };
        if (cardType) {
            query.cardType = cardType;
        }

        // Get user's clicks
        const clicks = await ClickTracker.find(query)
            .sort({ clickedAt: -1 })
            .limit(limit)
            .skip(offset)
            .lean();

        // Get total count
        const totalClicks = await ClickTracker.countDocuments(query);

        // Get clicks by card type
        const clicksByType = await ClickTracker.aggregate([
            { $match: { userId: kindeUser.id } },
            { $group: { _id: '$cardType', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);

        return NextResponse.json({
            success: true,
            data: {
                clicks,
                totalClicks,
                clicksByType,
                pagination: {
                    limit,
                    offset,
                    hasMore: totalClicks > offset + limit
                }
            }
        });

    } catch (error) {
        console.error('Error fetching clicks:', error);
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        );
    }
}
