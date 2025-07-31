import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../lib/db/connect';
import Feedback from '../../lib/db/models/feedback.model';

interface FeedbackData {
  type: 'bug' | 'suggestion' | 'general' | 'rating';
  message: string;
  rating?: number;
  email?: string;
  page: string;
  timestamp: Date;
  userAgent: string;
}

export async function POST(request: NextRequest) {
  try {
    // Connect to database
    await dbConnect();

    const feedbackData: FeedbackData = await request.json();

    // Validate required fields
    if (!feedbackData.type || !feedbackData.message || !feedbackData.page) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get client IP address
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown';

    // Create feedback document
    const feedback = new Feedback({
      type: feedbackData.type,
      message: feedbackData.message,
      rating: feedbackData.rating,
      email: feedbackData.email,
      page: feedbackData.page,
      timestamp: new Date(),
      userAgent: feedbackData.userAgent,
      ipAddress: ip
    });

    // Save to database
    const savedFeedback = await feedback.save();

    console.log('=== FEEDBACK SAVED TO DATABASE ===');
    console.log('Feedback ID:', savedFeedback._id);
    console.log('Type:', savedFeedback.type);
    console.log('Page:', savedFeedback.page);
    console.log('Priority:', savedFeedback.priority);
    console.log('Timestamp:', savedFeedback.timestamp);
    console.log('Has Email:', !!savedFeedback.email);
    console.log('Rating:', savedFeedback.rating);
    console.log('=================================');

    // Optional: Send notifications based on feedback type and priority
    // if (savedFeedback.type === 'bug' || savedFeedback.priority === 'urgent') {
    //   await sendSlackNotification({
    //     channel: '#bugs',
    //     message: `🐛 New ${savedFeedback.type} report from ${savedFeedback.page}: ${savedFeedback.message}`
    //   });
    // }

    // Optional: Send email notification for important feedback
    // if (savedFeedback.email && savedFeedback.rating && savedFeedback.rating <= 2) {
    //   await sendEmailNotification({
    //     to: 'support@brokebro.com',
    //     subject: 'Low Rating Feedback Received',
    //     body: `User rated ${savedFeedback.rating} stars on ${savedFeedback.page}`
    //   });
    // }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Feedback submitted successfully',
        id: savedFeedback._id.toString(),
        priority: savedFeedback.priority
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error processing feedback:', error);
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET method to retrieve feedback (for admin dashboard)
export async function GET(request: NextRequest) {
  try {
    // Connect to database
    await dbConnect();
    
    const url = new URL(request.url);
    const page = url.searchParams.get('page');
    const type = url.searchParams.get('type');
    const limit = parseInt(url.searchParams.get('limit') || '50');
    const skip = parseInt(url.searchParams.get('skip') || '0');
    const resolved = url.searchParams.get('resolved');

    // Build filter query
    const filter: any = {};
    if (page) filter.page = page;
    if (type) filter.type = type;
    if (resolved !== null && resolved !== undefined) {
      filter.isResolved = resolved === 'true';
    }

    // Query feedback from database
    const feedback = await Feedback.find(filter)
      .sort({ createdAt: -1 }) // Most recent first
      .limit(limit)
      .skip(skip)
      .lean(); // Return plain objects for better performance

    // Get total count for pagination
    const totalCount = await Feedback.countDocuments(filter);

    // Get basic stats
    const statsData = await Feedback.aggregate([
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 },
          avgRating: { $avg: '$rating' },
          unresolved: {
            $sum: { $cond: [{ $eq: ['$isResolved', false] }, 1, 0] }
          }
        }
      }
    ]);

    console.log(`=== FEEDBACK RETRIEVAL ===`);
    console.log(`Found ${feedback.length} feedback items`);
    console.log(`Total: ${totalCount}, Limit: ${limit}, Skip: ${skip}`);
    console.log(`Filters:`, filter);
    console.log(`========================`);

    return NextResponse.json({
      success: true,
      feedback,
      pagination: {
        total: totalCount,
        limit,
        skip,
        hasMore: skip + limit < totalCount
      },
      stats: statsData,
      filters: { page, type, resolved }
    });

  } catch (error) {
    console.error('Error retrieving feedback:', error);
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
