import dbConnect from '@/app/lib/db/connect';
import User from '@/app/lib/db/models/user.model';
import VerifiedUser from '@/app/lib/db/models/verifiedUser.model';



export async function populateTestVerifiedUsers() {
  try {
    await dbConnect();

    // Test users to create
    const testUsers = [
      {
        name: 'John Doe',
        email: 'john.doe@university.edu',
        studentName: 'John Doe',
        collegeName: 'Sample University',
        rollNo: '123456789',
        state: 'California'
      },
      {
        name: 'Jane Smith',
        email: 'jane.smith@college.edu',
        studentName: 'Jane Smith',
        collegeName: 'Sample College',
        rollNo: '987654321',
        state: 'New York'
      },
      {
        name: 'Demo Student',
        email: 'demo@brokebro.com',
        studentName: 'Demo Student',
        collegeName: 'BrokeBro University',
        rollNo: 'demo123',
        state: 'Demo State'
      }
    ];

    console.log('Creating test verified users...');

    for (const userData of testUsers) {
      // Check if user already exists
      let user = await User.findOne({ email: userData.email });
      
      if (!user) {
        // Create user in User collection
        user = new User({
          name: userData.name,
          email: userData.email,
          isVerified: true,
          verificationDate: new Date(),
          coins: 100 // Give them some coins
        });
        await user.save();
        console.log(`Created user: ${userData.name}`);
      } else {
        // Update existing user to be verified
        user.isVerified = true;
        user.verificationDate = new Date();
        await user.save();
        console.log(`Updated existing user: ${userData.name}`);
      }

      // Check if verified user entry already exists
      const existingVerified = await VerifiedUser.findOne({ 
        userEmail: userData.email 
      });

      if (!existingVerified) {
        // Create verified user entry
        const verifiedUser = new VerifiedUser({
          userId: user._id.toString(),
          userEmail: userData.email,
          studentName: userData.studentName,
          collegeName: userData.collegeName,
          rollNo: userData.rollNo,
          state: userData.state,
          verificationId: `VER_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
          verificationDuration: 24 // Duration in hours (24 hours = 1 day)
        });
        await verifiedUser.save();
        console.log(`Created verified user entry: ${userData.studentName}`);
      } else {
        console.log(`Verified user entry already exists: ${userData.studentName}`);
      }
    }

    console.log('✅ Test verified users populated successfully!');
    return { success: true, message: 'Test users created' };

  } catch (error) {
    console.error('❌ Error populating test users:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// API endpoint to trigger population (call once)
export async function GET() {
  try {
    const result = await populateTestVerifiedUsers();
    return Response.json(result);
  } catch (error) {
    return Response.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
}
