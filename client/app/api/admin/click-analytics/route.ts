import { NextRequest, NextResponse } from 'next/server';
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import dbConnect from '@/app/lib/db/connect';
import ClickTracker from '@/app/lib/db/models/clickTracker.model';
import * as XLSX from 'xlsx';

// Admin email addresses - should match your admin system
const ADMIN_EMAILS = [
    'prince1362005@gmail.com',
    'lavanya.varshney2104@gmail.com',
    'vrindabindal1212@gmail.com',
];

// Helper functions for user agent parsing
function extractBrowser(userAgent: string): string {
    if (userAgent.includes('Chrome')) return 'Chrome';
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) return 'Safari';
    if (userAgent.includes('Edge')) return 'Edge';
    if (userAgent.includes('Opera')) return 'Opera';
    return 'Unknown';
}

function extractOS(userAgent: string): string {
    if (userAgent.includes('Windows')) return 'Windows';
    if (userAgent.includes('Mac OS')) return 'macOS';
    if (userAgent.includes('Linux')) return 'Linux';
    if (userAgent.includes('Android')) return 'Android';
    if (userAgent.includes('iOS')) return 'iOS';
    return 'Unknown';
}

function extractDeviceType(userAgent: string): string {
    if (userAgent.includes('Mobile')) return 'Mobile';
    if (userAgent.includes('Tablet')) return 'Tablet';
    return 'Desktop';
}

function isMobileDevice(userAgent: string): boolean {
    return /Mobile|Android|iPhone|iPad/.test(userAgent);
}

function extractDomain(url: string): string {
    try {
        return new URL(url).hostname;
    } catch {
        return 'Unknown';
    }
}

// Analytics helper functions
function getMostActiveDay(clicks: any[]): string {
    const dayCount = clicks.reduce((acc, click) => {
        const day = new Date(click.clickedAt).toLocaleDateString('en-US', { weekday: 'long' });
        acc[day] = (acc[day] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);
    
    const mostActive = Object.entries(dayCount).sort(([,a], [,b]) => (b as number) - (a as number))[0];
    return mostActive ? `${mostActive[0]} (${mostActive[1]} clicks)` : 'N/A';
}

function getPeakHour(clicks: any[]): string {
    const hourCount = clicks.reduce((acc, click) => {
        const hour = new Date(click.clickedAt).getHours();
        acc[hour] = (acc[hour] || 0) + 1;
        return acc;
    }, {} as Record<number, number>);
    
    const peakHour = Object.entries(hourCount).sort(([,a], [,b]) => (b as number) - (a as number))[0];
    return peakHour ? `${peakHour[0]}:00 (${peakHour[1]} clicks)` : 'N/A';
}

function getMobileDesktopRatio(clicks: any[]): string {
    const deviceCount = clicks.reduce((acc, click) => {
        const isMobile = click.userAgent ? isMobileDevice(click.userAgent) : false;
        const device = isMobile ? 'Mobile' : 'Desktop';
        acc[device] = (acc[device] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);
    
    const mobile = deviceCount['Mobile'] || 0;
    const desktop = deviceCount['Desktop'] || 0;
    const total = mobile + desktop;
    
    if (total === 0) return 'N/A';
    
    const mobilePercent = Math.round((mobile / total) * 100);
    const desktopPercent = Math.round((desktop / total) * 100);
    
    return `Mobile: ${mobilePercent}% (${mobile}) | Desktop: ${desktopPercent}% (${desktop})`;
}

function getTopBrowser(clicks: any[]): string {
    const browserCount = clicks.reduce((acc, click) => {
        const browser = click.userAgent ? extractBrowser(click.userAgent) : 'Unknown';
        acc[browser] = (acc[browser] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);
    
    const topBrowser = Object.entries(browserCount).sort(([,a], [,b]) => (b as number) - (a as number))[0];
    return topBrowser ? `${topBrowser[0]} (${topBrowser[1]} clicks)` : 'N/A';
}

// Generate product analytics data
function generateProductAnalytics(clicks: any[]) {
    const productData = clicks.reduce((acc, click) => {
        const key = click.cardData?.brand || click.cardData?.title || click.cardIdentifier;
        if (!acc[key]) {
            acc[key] = {
                productName: key,
                totalClicks: 0,
                uniqueUsers: new Set(),
                cardType: click.cardType,
                category: click.cardData?.category || 'N/A',
                lastClicked: click.clickedAt,
                avgClicksPerUser: 0,
                tags: click.cardData?.tags || [],
                price: click.cardData?.price || click.cardData?.offer || 'N/A'
            };
        }
        acc[key].totalClicks++;
        acc[key].uniqueUsers.add(click.userId);
        if (new Date(click.clickedAt) > new Date(acc[key].lastClicked)) {
            acc[key].lastClicked = click.clickedAt;
        }
        return acc;
    }, {} as Record<string, any>);

    return Object.values(productData).map((product: any) => ({
        'Product/Card Name': product.productName,
        'Total Clicks': product.totalClicks,
        'Unique Users': product.uniqueUsers.size,
        'Avg Clicks per User': Math.round((product.totalClicks / product.uniqueUsers.size) * 100) / 100,
        'Card Type': product.cardType,
        'Category': product.category,
        'Price/Offer': product.price,
        'Last Clicked': new Date(product.lastClicked).toLocaleString(),
        'Tags': Array.isArray(product.tags) ? product.tags.join(', ') : product.tags
    })).sort((a, b) => b['Total Clicks'] - a['Total Clicks']);
}

// Generate user behavior analytics
function generateUserBehaviorAnalytics(clicks: any[]) {
    const userBehavior = clicks.reduce((acc, click) => {
        if (!acc[click.userId]) {
            acc[click.userId] = {
                userId: click.userId,
                userEmail: click.userEmail,
                userName: click.userName,
                totalClicks: 0,
                cardTypes: new Set(),
                brands: new Set(),
                categories: new Set(),
                firstClick: click.clickedAt,
                lastClick: click.clickedAt,
                sessions: new Set(),
                devices: new Set()
            };
        }
        
        const user = acc[click.userId];
        user.totalClicks++;
        user.cardTypes.add(click.cardType);
        if (click.cardData?.brand) user.brands.add(click.cardData.brand);
        if (click.cardData?.category) user.categories.add(click.cardData.category);
        if (click.sessionId) user.sessions.add(click.sessionId);
        if (click.userAgent) user.devices.add(extractDeviceType(click.userAgent));
        
        if (new Date(click.clickedAt) < new Date(user.firstClick)) {
            user.firstClick = click.clickedAt;
        }
        if (new Date(click.clickedAt) > new Date(user.lastClick)) {
            user.lastClick = click.clickedAt;
        }
        
        return acc;
    }, {} as Record<string, any>);

    return Object.values(userBehavior).map((user: any) => ({
        'User Email': user.userEmail,
        'User Name': user.userName || 'N/A',
        'Total Clicks': user.totalClicks,
        'Card Types Clicked': Array.from(user.cardTypes).join(', '),
        'Brands Interacted': Array.from(user.brands).join(', ') || 'N/A',
        'Categories Explored': Array.from(user.categories).join(', ') || 'N/A',
        'Session Count': user.sessions.size,
        'Device Types': Array.from(user.devices).join(', '),
        'First Click': new Date(user.firstClick).toLocaleString(),
        'Last Click': new Date(user.lastClick).toLocaleString(),
        'Activity Span (Days)': Math.ceil((new Date(user.lastClick).getTime() - new Date(user.firstClick).getTime()) / (1000 * 60 * 60 * 24))
    })).sort((a, b) => b['Total Clicks'] - a['Total Clicks']);
}

export async function GET(request: NextRequest) {
    try {
        // Check if user is authenticated and is admin
        const { getUser } = getKindeServerSession();
        const kindeUser = await getUser();

        if (!kindeUser || !kindeUser.email || !ADMIN_EMAILS.includes(kindeUser.email)) {
            return NextResponse.json(
                { success: false, message: 'Admin access required' },
                { status: 403 }
            );
        }

        const { searchParams } = new URL(request.url);
        const format = searchParams.get('format') || 'xlsx';
        const startDate = searchParams.get('startDate');
        const endDate = searchParams.get('endDate');
        const cardType = searchParams.get('cardType');
        const userId = searchParams.get('userId');

        await dbConnect();

        // Build query
        const query: any = {};
        
        if (startDate && endDate) {
            query.clickedAt = {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            };
        }
        
        if (cardType) {
            query.cardType = cardType;
        }
        
        if (userId) {
            query.userId = userId;
        }

        // Get click data
        const clicks = await ClickTracker.find(query)
            .sort({ clickedAt: -1 })
            .lean();

        // Prepare data for Excel
        const excelData = clicks.map((click, index) => ({
            'S.No': index + 1,
            'User ID': click.userId,
            'User Email': click.userEmail,
            'User Name': click.userName || 'N/A',
            'Card Type': click.cardType,
            'Card Identifier': click.cardIdentifier,
            
            // Product/Card Details
            'Product/Card Title': click.cardData?.title || 'N/A',
            'Product/Card Subtitle': click.cardData?.subtitle || 'N/A',
            'Brand Name': click.cardData?.brand || 'N/A',
            'Product Category': click.cardData?.category || 'N/A',
            'Product Type': click.cardData?.type || 'N/A',
            'Product Label': click.cardData?.label || 'N/A',
            'Price/Offer': click.cardData?.price || click.cardData?.offer || 'N/A',
            'Image URL': click.cardData?.image || 'N/A',
            
            // Additional Product Information
            'Product Description': click.cardData?.description || 'N/A',
            'Product SKU': click.cardData?.sku || 'N/A',
            'Product ID': click.cardData?.productId || 'N/A',
            'Discount Percentage': click.cardData?.discount || 'N/A',
            'Original Price': click.cardData?.originalPrice || 'N/A',
            'Sale Price': click.cardData?.salePrice || 'N/A',
            'Product Rating': click.cardData?.rating || 'N/A',
            'Product Reviews Count': click.cardData?.reviewsCount || 'N/A',
            'Product Availability': click.cardData?.availability || 'N/A',
            'Product Size': click.cardData?.size || 'N/A',
            'Product Color': click.cardData?.color || 'N/A',
            'Product Material': click.cardData?.material || 'N/A',
            'Product Tags': Array.isArray(click.cardData?.tags) ? click.cardData.tags.join(', ') : (click.cardData?.tags || 'N/A'),
            
            // Card Specific Information
            'Card Background Color': click.cardData?.bg || 'N/A',
            'Card Text Color': click.cardData?.textColor || 'N/A',
            'Card Has Icon': click.cardData?.icon ? 'Yes' : 'No',
            'Card Position': click.cardData?.position || 'N/A',
            'Card Size': click.cardData?.colSpan || click.cardData?.rowSpan || 'N/A',
            'Alt Text': click.cardData?.alt || 'N/A',
            
            // Click Context
            'Clicked At (Date)': new Date(click.clickedAt).toLocaleDateString(),
            'Clicked At (Time)': new Date(click.clickedAt).toLocaleTimeString(),
            'Clicked At (Full Timestamp)': new Date(click.clickedAt).toLocaleString(),
            'Day of Week': new Date(click.clickedAt).toLocaleDateString('en-US', { weekday: 'long' }),
            'Month': new Date(click.clickedAt).toLocaleDateString('en-US', { month: 'long' }),
            'Hour of Day': new Date(click.clickedAt).getHours(),
            
            // Technical Details
            'Session ID': click.sessionId || 'N/A',
            'User Agent': click.userAgent || 'N/A',
            'Browser': click.userAgent ? extractBrowser(click.userAgent) : 'N/A',
            'Operating System': click.userAgent ? extractOS(click.userAgent) : 'N/A',
            'Device Type': click.userAgent ? extractDeviceType(click.userAgent) : 'N/A',
            'IP Address': click.ipAddress || 'N/A',
            'Source Page URL': click.pageUrl || 'N/A',
            'Referrer Domain': click.pageUrl ? extractDomain(click.pageUrl) : 'N/A',
            
            // Additional Metadata
            'Is Mobile': click.userAgent ? isMobileDevice(click.userAgent) ? 'Yes' : 'No' : 'N/A',
            'Click Count for User': 'N/A', // Will be calculated separately
            'First Time Clicking This Product': 'N/A', // Will be calculated separately
            'Time Since Last Click': 'N/A', // Will be calculated separately
        }));

        // Create workbook and worksheet
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(excelData);

        // Auto-size columns
        const maxWidths = excelData.reduce((widths, row) => {
            Object.keys(row).forEach((key, index) => {
                const value = String(row[key as keyof typeof row]);
                widths[index] = Math.max(widths[index] || 0, value.length, key.length);
            });
            return widths;
        }, [] as number[]);

        worksheet['!cols'] = maxWidths.map(width => ({ width: Math.min(width + 2, 50) }));

        // Add summary sheet with comprehensive analytics
        const summary = [
            { 'Metric': 'Total Clicks', 'Value': clicks.length },
            { 'Metric': 'Unique Users', 'Value': new Set(clicks.map(c => c.userId)).size },
            { 'Metric': 'Unique Products/Cards', 'Value': new Set(clicks.map(c => c.cardIdentifier)).size },
            { 'Metric': 'Export Date', 'Value': new Date().toLocaleString() },
            { 'Metric': 'Date Range', 'Value': startDate && endDate ? `${startDate} to ${endDate}` : 'All Time' },
            { 'Metric': 'Most Active Day', 'Value': getMostActiveDay(clicks) },
            { 'Metric': 'Peak Hour', 'Value': getPeakHour(clicks) },
            { 'Metric': 'Mobile vs Desktop', 'Value': getMobileDesktopRatio(clicks) },
            { 'Metric': 'Top Browser', 'Value': getTopBrowser(clicks) },
        ];

        // Add card type breakdown
        const cardTypeBreakdown = clicks.reduce((acc, click) => {
            acc[click.cardType] = (acc[click.cardType] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        Object.entries(cardTypeBreakdown).forEach(([type, count]) => {
            summary.push({ 'Metric': `${type.charAt(0).toUpperCase() + type.slice(1)} Clicks`, 'Value': count });
        });

        // Add brand breakdown
        const brandBreakdown = clicks.reduce((acc, click) => {
            const brand = click.cardData?.brand;
            if (brand && brand !== 'N/A') {
                acc[brand] = (acc[brand] || 0) + 1;
            }
            return acc;
        }, {} as Record<string, number>);

        Object.entries(brandBreakdown)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 10)
            .forEach(([brand, count]) => {
                summary.push({ 'Metric': `${brand} Brand Clicks`, 'Value': count });
            });

        // Add device type breakdown
        const deviceBreakdown = clicks.reduce((acc, click) => {
            const deviceType = click.userAgent ? extractDeviceType(click.userAgent) : 'Unknown';
            acc[deviceType] = (acc[deviceType] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        Object.entries(deviceBreakdown).forEach(([device, count]) => {
            summary.push({ 'Metric': `${device} Device Clicks`, 'Value': count });
        });

        const summarySheet = XLSX.utils.json_to_sheet(summary);
        summarySheet['!cols'] = [{ width: 30 }, { width: 50 }];

        // Create product analytics sheet
        const productAnalytics = generateProductAnalytics(clicks);
        const productSheet = XLSX.utils.json_to_sheet(productAnalytics);
        productSheet['!cols'] = [{ width: 25 }, { width: 15 }, { width: 15 }, { width: 20 }, { width: 30 }];

        // Create user behavior analytics sheet
        const userBehaviorAnalytics = generateUserBehaviorAnalytics(clicks);
        const userBehaviorSheet = XLSX.utils.json_to_sheet(userBehaviorAnalytics);
        userBehaviorSheet['!cols'] = [{ width: 30 }, { width: 15 }, { width: 20 }, { width: 25 }, { width: 20 }];

        // Add sheets to workbook
        XLSX.utils.book_append_sheet(workbook, summarySheet, 'Summary');
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Detailed Click Data');
        XLSX.utils.book_append_sheet(workbook, productSheet, 'Product Analytics');
        XLSX.utils.book_append_sheet(workbook, userBehaviorSheet, 'User Behavior');

        // Generate Excel file
        const excelBuffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

        // Set filename with timestamp
        const timestamp = new Date().toISOString().split('T')[0];
        const filename = `click-analytics-${timestamp}.xlsx`;

        // Return the Excel file
        return new NextResponse(excelBuffer, {
            status: 200,
            headers: {
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'Content-Disposition': `attachment; filename="${filename}"`,
                'Content-Length': excelBuffer.length.toString(),
            },
        });

    } catch (error) {
        console.error('Error exporting click data:', error);
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        // Check if user is authenticated and is admin
        const { getUser } = getKindeServerSession();
        const kindeUser = await getUser();

        if (!kindeUser || !kindeUser.email || !ADMIN_EMAILS.includes(kindeUser.email)) {
            return NextResponse.json(
                { success: false, message: 'Admin access required' },
                { status: 403 }
            );
        }

        await dbConnect();

        // Get aggregated analytics data
        const totalClicks = await ClickTracker.countDocuments();
        const uniqueUsers = await ClickTracker.distinct('userId');
        
        // Clicks by card type
        const clicksByType = await ClickTracker.aggregate([
            { $group: { _id: '$cardType', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);

        // Clicks by user
        const clicksByUser = await ClickTracker.aggregate([
            { 
                $group: { 
                    _id: { userId: '$userId', userEmail: '$userEmail', userName: '$userName' },
                    totalClicks: { $sum: 1 },
                    cardTypes: { $addToSet: '$cardType' },
                    lastClick: { $max: '$clickedAt' }
                } 
            },
            { $sort: { totalClicks: -1 } },
            { $limit: 100 }
        ]);

        // Clicks over time (last 30 days)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const clicksOverTime = await ClickTracker.aggregate([
            { $match: { clickedAt: { $gte: thirtyDaysAgo } } },
            {
                $group: {
                    _id: { $dateToString: { format: '%Y-%m-%d', date: '$clickedAt' } },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        // Most clicked cards
        const mostClickedCards = await ClickTracker.aggregate([
            {
                $group: {
                    _id: { cardType: '$cardType', cardIdentifier: '$cardIdentifier' },
                    count: { $sum: 1 },
                    cardData: { $first: '$cardData' },
                    lastClicked: { $max: '$clickedAt' }
                }
            },
            { $sort: { count: -1 } },
            { $limit: 20 }
        ]);

        return NextResponse.json({
            success: true,
            analytics: {
                summary: {
                    totalClicks,
                    uniqueUsers: uniqueUsers.length,
                    averageClicksPerUser: totalClicks / (uniqueUsers.length || 1),
                },
                clicksByType,
                clicksByUser,
                clicksOverTime,
                mostClickedCards,
            }
        });

    } catch (error) {
        console.error('Error fetching analytics:', error);
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        );
    }
}
