# Click Tracking System Documentation

## Overview
This comprehensive click tracking system monitors user interactions across the BrokeBro platform, providing detailed analytics for administrators and personal statistics for users. Every card click is tracked and stored with full context about the user, card type, and interaction details.

## Features

### 🎯 User Click Tracking
- **Unique tracking per user**: Each authenticated user's clicks are tracked individually
- **Card type categorization**: Tracks different card types (hero, category, product, etc.)
- **Rich metadata**: Stores card details, timestamps, user agent, and session information
- **Real-time tracking**: Instant click registration without affecting user experience

### 📊 Admin Analytics Dashboard
- **Comprehensive analytics**: Total clicks, unique users, click trends over time
- **Excel export functionality**: Download detailed reports with filters
- **Most clicked cards**: Identify popular content and user preferences
- **User behavior insights**: See which users are most active
- **Filterable data**: Filter by date range, card type, or specific users

### 👤 User Personal Dashboard
- **Personal activity tracking**: Users can view their own click history
- **Interaction summary**: Breakdown by card types and preferences
- **Recent activity**: Timeline of recent clicks with full details
- **Privacy-focused**: Users only see their own data

## Technical Implementation

### Database Schema
```typescript
interface IClickTracker {
  userId: string;           // Kinde user ID
  userEmail: string;        // User email for identification
  userName?: string;        // Display name
  cardType: string;         // hero, category, product, mens-fashion, etc.
  cardIdentifier: string;   // Unique identifier for the specific card
  cardData: {              // Rich metadata about the clicked card
    title?: string;
    subtitle?: string;
    image?: string;
    label?: string;
    type?: string;
    brand?: string;
    price?: string;
    category?: string;
  };
  clickedAt: Date;         // Timestamp of click
  sessionId?: string;      // Browser session identifier
  userAgent?: string;      // Browser/device information
  ipAddress?: string;      // IP address (for security/analytics)
  pageUrl?: string;        // Source page URL
}
```

### API Endpoints

#### User Endpoints
- `POST /api/track-click` - Track a new click
- `GET /api/track-click` - Get user's click history

#### Admin Endpoints
- `GET /api/admin/click-analytics` - Download Excel export
- `POST /api/admin/click-analytics` - Get analytics dashboard data

### Components

#### Click Tracking Hook
```typescript
const { trackClick } = useClickTracker();

// Usage in components
const handleCardClick = () => {
  trackClick('hero', 'banner-special-offer', {
    title: 'Special Offer',
    category: 'fashion',
    type: 'banner'
  });
};
```

#### Updated Components
- ✅ **Fashion Hero Cards**: All hero section cards track clicks
- ✅ **Category Section**: Fashion category images track clicks
- ✅ **Product Section**: Brand/product cards track clicks
- ✅ **Admin Dashboard**: Full analytics interface
- ✅ **User Dashboard**: Personal activity viewer

## Usage Instructions

### For Users
1. **Browse normally**: All tracking happens automatically when you click cards
2. **View your activity**: Go to `/activity` to see your personal click statistics
3. **Privacy**: Only you can see your own activity data

### For Administrators
1. **Access analytics**: Go to `/admin/click-analytics`
2. **View real-time data**: See total clicks, top users, most popular cards
3. **Export to Excel**: 
   - Use date filters to export specific time ranges
   - Filter by card type for focused analysis
   - Include/exclude specific users
4. **Monitor trends**: Track user engagement over time

### Excel Export Features
- **Summary sheet**: Total clicks, unique users, date range, card type breakdown
- **Detailed data**: Complete click records with all metadata
- **Auto-formatted columns**: Properly sized columns for easy reading
- **Timestamp formatting**: Human-readable dates and times

## Privacy & Security

### User Privacy
- Users can only access their own click data
- No personal data is exposed to other users
- All tracking requires user authentication

### Admin Security
- Admin access restricted to authorized emails only
- Secure session management with HTTP-only cookies
- Protected API endpoints with authentication checks

### Data Protection
- IP addresses stored for security analysis only
- User agent strings for browser compatibility insights
- Session IDs for tracking user sessions (not personal identification)

## Installation & Setup

### 1. Database Models
The click tracking model is automatically created when the app starts. Ensure MongoDB connection is configured.

### 2. Dependencies
```bash
npm install xlsx  # Already included for Excel export
```

### 3. Environment Variables
No additional environment variables required - uses existing Kinde auth and admin email configuration.

### 4. Component Integration
```typescript
// In any card component
import { useClickTracker } from "@/hooks/useClickTracker";

const { trackClick } = useClickTracker();

// On card click
onClick={() => trackClick('card-type', 'unique-identifier', cardMetadata)}
```

## Analytics Insights

### Key Metrics Tracked
- **Total Clicks**: Overall platform engagement
- **Unique Users**: Active user base size
- **Clicks per User**: Average engagement level
- **Card Type Distribution**: Most popular content types
- **Time-based Trends**: Peak usage times and patterns
- **User Retention**: Repeat engagement patterns

### Business Intelligence
- **Content Performance**: Identify most engaging cards and content
- **User Preferences**: Understand what users interact with most
- **Platform Usage**: Monitor overall platform engagement
- **A/B Testing Support**: Compare different card designs/content
- **User Journey Analysis**: Track user interaction patterns

## Future Enhancements

### Planned Features
- **Heatmap visualization**: Visual representation of click patterns
- **Real-time dashboard**: Live updates without refresh
- **Advanced filtering**: More sophisticated data filtering options
- **Click-through tracking**: Follow user journeys across pages
- **Conversion analytics**: Track clicks that lead to actions
- **Performance metrics**: Page load impact analysis

### Technical Improvements
- **Data aggregation**: Pre-computed analytics for faster loading
- **Caching layer**: Redis caching for frequently accessed data
- **Data archiving**: Automatic archiving of old click data
- **API rate limiting**: Prevent abuse of tracking endpoints
- **Enhanced error handling**: More robust error recovery

## Troubleshooting

### Common Issues

#### Clicks Not Being Tracked
- Ensure user is authenticated (logged in)
- Check browser console for errors
- Verify network connectivity
- Check if ad blockers are interfering

#### Admin Dashboard Not Loading
- Verify admin email is in authorized list
- Check authentication cookies
- Ensure MongoDB connection is working
- Check server logs for errors

#### Excel Export Failing
- Verify admin permissions
- Check if date filters are valid
- Ensure sufficient server memory for large exports
- Try reducing the date range

### Debug Mode
Enable debug logging in development:
```javascript
// In useClickTracker hook
console.log('Click tracked:', { cardType, cardIdentifier, cardData });
```

## Support
For technical support or feature requests, contact the development team or create an issue in the project repository.

---

**Version**: 1.0.0  
**Last Updated**: January 2025  
**Compatibility**: Next.js 14+, MongoDB, Kinde Auth
