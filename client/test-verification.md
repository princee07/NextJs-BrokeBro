# Testing the Verification System

## Current Test Users

### User 1 - John Doe (VERIFIED)
- **Student ID:** 123456789
- **Full ID:** user123456789
- **Email:** john.doe@university.edu
- **Status:** ✅ VERIFIED

### User 2 - Jane Smith (VERIFIED)  
- **Student ID:** 987654321
- **Full ID:** user987654321
- **Email:** jane.smith@college.edu
- **Status:** ✅ VERIFIED

## Testing Method

### 1. QR Code Testing
1. Go to your profile page: `http://localhost:3000/profile`
2. Make sure your user ID matches one of the test IDs above
3. Scan the QR code or click the "Test verification page" link
4. Should redirect to: `http://localhost:3000/verify/{your-id}`

### 2. Direct URL Testing
Visit these URLs directly in your browser:

**VERIFIED Users (Should show green success page):**
- http://localhost:3000/verify/user123456789
- http://localhost:3000/verify/user987654321  
- http://localhost:3000/verify/123456789
- http://localhost:3000/verify/987654321

**NON-VERIFIED Users (Should show red error page):**
- http://localhost:3000/verify/invaliduser
- http://localhost:3000/verify/999999999
- http://localhost:3000/verify/notfound

### 3. API Testing (Using curl or Postman)

**GET Request - Check Verification:**
```bash
curl http://localhost:3000/api/verify/user123456789
curl http://localhost:3000/api/verify/987654321
```

**Expected Response for VERIFIED user:**
```json
{
  "isVerified": true,
  "user": {
    "name": "John Doe",
    "studentId": "123456789",
    "email": "john.doe@university.edu",
    "verificationDate": "2024-01-15",
    "university": "Sample University"
  },
  "message": "Student verification successful"
}
```

**POST Request - Manual Verification:**
```bash
curl -X POST http://localhost:3000/api/verify/user123456789 \
  -H "Content-Type: application/json" \
  -d '{"verificationCode": "test", "timestamp": "2024-01-01"}'
```

### 4. Profile Page Testing
1. Update your user object in profileClient.tsx to match a test user
2. Temporary test - change your user ID to match test data:

```javascript
// In profileClient.tsx, temporarily modify for testing:
const testUser = {
  id: 'user123456789', // or 'user987654321'
  given_name: 'John',  // or 'Jane'
  family_name: 'Doe', // or 'Smith'
  email: 'john.doe@university.edu' // or 'jane.smith@college.edu'
};
```

## Expected Results

### ✅ VERIFIED User Pages Should Show:
- Green header with checkmark
- "Verified by BrokeBro" title
- User details (name, ID, email)
- Green verification badge
- BrokeBro logo
- Scan timestamp

### ❌ NON-VERIFIED User Pages Should Show:  
- Red header with warning icon
- "Not Verified by BrokeBro" title
- Error message about ID not in database
- Possible reasons for failure
- Link to start verification process
- Scan timestamp

## Adding More Test Users

To add more test users, edit the `mockVerifiedUsers` array in:
`app/api/verify/[id]/route.ts`

```javascript
const mockVerifiedUsers = [
  // Add new users here
  {
    id: 'user555555555',
    studentId: '555555555', 
    name: 'Your Name',
    email: 'your.email@university.edu',
    isVerified: true,
    verificationDate: '2024-07-30',
    university: 'Your University'
  }
];
```

## Debugging Tips

1. **Check Browser Console:** Look for any JavaScript errors
2. **Check Network Tab:** Verify API calls are working
3. **Check Server Console:** Look for backend logs
4. **Test with Real User IDs:** Use actual user IDs from your auth system

## Integration with Real Database

When ready for production, replace the mock data with real database queries:

```javascript
// Replace mockVerifiedUsers with actual database call
const user = await db.users.findOne({
  where: {
    OR: [
      { studentId: studentId },
      { id: id }
    ],
    isVerified: true
  }
});
```
