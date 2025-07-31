import dbConnect from '../app/lib/db/connect';
import Feedback from '../app/lib/db/models/feedback.model';

async function testFeedbackDB() {
  try {
    console.log('🔗 Connecting to database...');
    await dbConnect();
    console.log('✅ Database connected successfully');

    // Test creating a feedback entry
    const testFeedback = new Feedback({
      type: 'general',
      message: 'This is a test feedback entry from the database integration script',
      page: '/test',
      timestamp: new Date(),
      userAgent: 'Test Script',
      priority: 'low'
    });

    const saved = await testFeedback.save();
    console.log('✅ Test feedback created:', saved._id);

    // Test retrieving feedback
    const allFeedback = await Feedback.find().limit(5).sort({ createdAt: -1 });
    console.log('✅ Retrieved feedback count:', allFeedback.length);

    // Test stats aggregation
    const stats = await Feedback.aggregate([
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
    console.log('✅ Feedback stats:', stats);

    console.log('🎉 Database integration test completed successfully!');
  } catch (error) {
    console.error('❌ Database test failed:', error);
  }
}

// Run the test
testFeedbackDB();
