# Vercel Deployment Guide

## Required Environment Variables

Set these environment variables in your Vercel dashboard:

### **Kinde Authentication**
```
KINDE_CLIENT_ID=your_kinde_client_id
KINDE_CLIENT_SECRET=your_kinde_client_secret
KINDE_ISSUER_URL=https://your-domain.kinde.com
KINDE_SITE_URL=https://your-vercel-app.vercel.app
KINDE_POST_LOGOUT_REDIRECT_URL=https://your-vercel-app.vercel.app
KINDE_POST_LOGIN_REDIRECT_URL=https://your-vercel-app.vercel.app/dashboard
```

### **Database (MongoDB)**
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
```

### **Email Service (Gmail SMTP)**
```
BROKEBRO_MAIL_USER=connect@brokebro.in
BROKEBRO_MAIL_PASS=your_gmail_app_password
```

### **NextAuth Secret**
```
NEXTAUTH_SECRET=your_random_secret_key
NEXTAUTH_URL=https://your-vercel-app.vercel.app
```

## Admin Access

### **Authorized Admin Emails**
- prince1362005@gmail.com
- lavanya.varshney2104@gmail.com
- vrindabindal1212@gmail.com

### **Admin Panel Access**
1. Go to your deployed site: `https://your-app.vercel.app`
2. Click **Login** and authenticate with Kinde using one of the authorized emails
3. Once logged in, access the admin panel at: `https://your-app.vercel.app/admin`

## Post-Deployment Checklist

✅ **Environment Variables Set**
- [ ] Kinde authentication variables configured
- [ ] MongoDB connection string added
- [ ] Email SMTP credentials configured
- [ ] NextAuth secret generated

✅ **Admin Access Tested**
- [ ] Login with authorized admin email works
- [ ] Admin panel loads correctly
- [ ] Verification management functional
- [ ] Email notifications working

✅ **Student Verification Flow**
- [ ] Student verification form works
- [ ] File uploads functional (if using cloud storage)
- [ ] Email notifications sent to students
- [ ] Admin notifications sent on new requests

## Security Notes

🔒 **Production Security**
- Development bypasses have been removed
- All admin routes require proper Kinde authentication
- Admin emails are hardcoded and verified
- API endpoints have proper authentication checks

## Support

If you encounter issues:
1. Check Vercel logs for errors
2. Verify all environment variables are set
3. Test Kinde authentication setup
4. Confirm MongoDB connection
