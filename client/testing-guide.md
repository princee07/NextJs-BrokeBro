## Testing with Your Real Users

### Method 1: Check if Users Exist in Database
1. Open MongoDB Compass or your database viewer
2. Check the `users` collection for existing users
3. Check the `verifiedusers` collection for verified entries
4. Use actual user IDs/emails for testing

### Method 2: Add Your Real User for Testing
Create a verified entry for yourself:

```javascript
// In MongoDB shell or via API
const user = await User.findOne({ email: "your-email@example.com" });
if (user) {
  const verifiedUser = new VerifiedUser({
    userId: user._id.toString(),
    userEmail: "your-email@example.com",
    studentName: "Your Name",
    collegeName: "Your University",
    rollNo: "your-student-id",
    state: "Your State",
    verificationId: `VER_${Date.now()}_REAL`,
    verificationDuration: 168 // 1 week
  });
  await verifiedUser.save();
}
```

### Method 3: Test Different User ID Formats
Your verification system accepts multiple formats:
- Full user ID: `user123456789`
- Student ID only: `123456789`
- Email address: `john.doe@university.edu`

### Method 4: Test QR Code Generation
1. Visit your profile page
2. Check that QR code contains: `{domain}/verify/{your-actual-user-id}`
3. Use QR scanner app to verify the URL is correct
4. Test that scanning redirects to the right verification page

## Database Verification
Check your MongoDB collections:

### Users Collection
```javascript
db.users.find({ isVerified: true })
```

### VerifiedUsers Collection  
```javascript
db.verifiedusers.find({})
```

### Check Specific User
```javascript
db.users.findOne({ email: "john.doe@university.edu" })
db.verifiedusers.findOne({ userEmail: "john.doe@university.edu" })
```

## Quick Tests Summary

✅ **API Test:** `curl http://localhost:3000/api/verify/123456789`
✅ **Page Test:** `http://localhost:3000/verify/123456789`  
✅ **Interactive Test:** `http://localhost:3000/test-verify`
✅ **Setup Test:** `http://localhost:3000/api/setup-test-users`
✅ **Profile QR:** `http://localhost:3000/profile`

## Expected Results

### For VERIFIED Users:
- API returns `"isVerified": true`
- Page shows green success with user details
- QR codes redirect to verification success

### For NON-VERIFIED Users:
- API returns `"isVerified": false`
- Page shows red error with helpful message
- QR codes redirect to verification failure

## Troubleshooting

### If tests fail:
1. Check MongoDB connection is working
2. Verify test users were created successfully
3. Check console logs for database errors
4. Ensure required fields are present in database

### Common Issues:
- **Connection Error:** Check MONGODB_URI environment variable
- **User Not Found:** Ensure test data was populated
- **Validation Error:** Check all required fields are present
- **QR Code Issues:** Verify URL generation is correct
