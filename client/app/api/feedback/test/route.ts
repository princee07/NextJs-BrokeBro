import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'API is working!',
    timestamp: new Date().toISOString(),
    endpoint: '/api/feedback/test'
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    console.log('=== TEST FEEDBACK RECEIVED ===');
    console.log('Test data:', body);
    console.log('============================');
    
    return NextResponse.json({
      success: true,
      message: 'Test feedback received successfully',
      receivedData: body,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Test endpoint error:', error);
    return NextResponse.json(
      { error: 'Test failed', details: error },
      { status: 500 }
    );
  }
}
