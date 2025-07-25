import { VerificationStatus } from '@/types/verification';
import { promises as fs } from 'fs';
import path from 'path';
import { addVerificationToMemory, getVerificationsFromMemory } from './memory-storage';
import dbConnect from '@/app/lib/db/connect';
import VerificationModel from '@/app/lib/db/models/verification.model';

// Path to store verification data (in production, use a real database)
const DATA_DIR = path.join(process.cwd(), 'data');
const VERIFICATIONS_FILE = path.join(DATA_DIR, 'verifications.json');

// Ensure data directory exists
async function ensureDataDir() {
    try {
        await fs.access(DATA_DIR);
    } catch {
        await fs.mkdir(DATA_DIR, { recursive: true });
    }
}

// Ensure verifications file exists
async function ensureVerificationsFile() {
    await ensureDataDir();
    try {
        await fs.access(VERIFICATIONS_FILE);
    } catch {
        await fs.writeFile(VERIFICATIONS_FILE, JSON.stringify([], null, 2));
    }
}

// Get all verifications
export async function getAllVerifications(): Promise<VerificationStatus[]> {
    try {
        // Check if we're in a production environment
        const isProduction = process.env.NODE_ENV === 'production';
        const isVercel = process.env.VERCEL === '1';
        const isReadOnlyFS = process.env.VERCEL_ENV || process.env.RENDER || process.env.NETLIFY;

        console.log('🔍 Environment check:', {
            NODE_ENV: process.env.NODE_ENV,
            VERCEL: process.env.VERCEL,
            VERCEL_ENV: process.env.VERCEL_ENV,
            isProduction,
            isVercel,
            isReadOnlyFS
        });

        if (isVercel || isProduction || isReadOnlyFS) {
            // In production, use MongoDB
            await dbConnect();
            const docs = await VerificationModel.find({}).lean();
            return docs.map((v: any) => ({
                ...v,
                submittedAt: new Date(v.submittedAt),
                reviewedAt: v.reviewedAt ? new Date(v.reviewedAt) : undefined,
            }));
        }

        // Development/local environment - use file system
        await ensureVerificationsFile();
        const data = await fs.readFile(VERIFICATIONS_FILE, 'utf-8');
        const verifications = JSON.parse(data);

        // Convert string dates back to Date objects
        return verifications.map((v: any) => ({
            ...v,
            submittedAt: new Date(v.submittedAt),
            reviewedAt: v.reviewedAt ? new Date(v.reviewedAt) : undefined,
        }));
    } catch (error) {
        console.error('Error reading verifications:', error);
        return [];
    }
}

// Save a new verification
export async function saveVerification(verification: VerificationStatus): Promise<void> {
    try {
        console.log('🚀 Attempting to save verification...');

        // For production environments that don't support file system writes,
        // you can implement alternative storage here:
        // - Database (PostgreSQL, MongoDB, etc.)
        // - Cloud storage (Firebase, Supabase, etc.)
        // - External API

        // Check if we're in a production environment with read-only filesystem
        const isProduction = process.env.NODE_ENV === 'production';
        const isVercel = process.env.VERCEL === '1';
        const isReadOnlyFS = process.env.VERCEL_ENV || process.env.RENDER || process.env.NETLIFY;

        console.log('🔍 Save environment check:', {
            NODE_ENV: process.env.NODE_ENV,
            VERCEL: process.env.VERCEL,
            VERCEL_ENV: process.env.VERCEL_ENV,
            isProduction,
            isVercel,
            isReadOnlyFS
        });

        if (isVercel || isProduction || isReadOnlyFS) {
            // In production, save to MongoDB
            await dbConnect();
            await VerificationModel.create(verification);
            console.log('🟠 Successfully added to MongoDB');
            return;
        }

        // Development/local environment - use file system
        const verifications = await getAllVerifications();
        verifications.push(verification);
        await fs.writeFile(VERIFICATIONS_FILE, JSON.stringify(verifications, null, 2));
    } catch (error) {
        console.error('Error saving verification:', error);
        throw error;
    }
}

// Update verification status
export async function updateVerificationStatus(
    verificationId: string,
    status: 'approved' | 'rejected' | 'under_review',
    adminNotes?: string
): Promise<boolean> {
    try {
        console.log('🟣 Updating verification status:', { verificationId, status, adminNotes });

        const isProduction = process.env.NODE_ENV === 'production';
        const isVercel = process.env.VERCEL === '1';
        const isReadOnlyFS = process.env.VERCEL_ENV || process.env.RENDER || process.env.NETLIFY;

        if (isVercel || isProduction || isReadOnlyFS) {
            // In production, update in MongoDB
            await dbConnect();
            const result = await VerificationModel.findOneAndUpdate(
                { id: verificationId },
                { status, reviewedAt: new Date(), adminNotes },
                { new: true }
            );
            if (!result) {
                console.log('🟣 Verification not found in MongoDB:', verificationId);
                return false;
            }
            console.log('🟣 Updated verification in MongoDB:', verificationId, 'to status:', status);
            return true;
        }

        // Development/local environment - use file system
        const verifications = await getAllVerifications();
        const index = verifications.findIndex(v => v.id === verificationId);

        if (index === -1) {
            return false;
        }

        verifications[index] = {
            ...verifications[index],
            status,
            reviewedAt: new Date(),
            adminNotes,
        };

        await fs.writeFile(VERIFICATIONS_FILE, JSON.stringify(verifications, null, 2));
        return true;
    } catch (error) {
        console.error('Error updating verification:', error);
        return false;
    }
}

// Get verification by ID
export async function getVerificationById(id: string): Promise<VerificationStatus | null> {
    try {
        const verifications = await getAllVerifications();
        return verifications.find(v => v.id === id) || null;
    } catch (error) {
        console.error('Error getting verification by ID:', error);
        return null;
    }
}

// Get verification statistics
export async function getVerificationStats() {
    try {
        const verifications = await getAllVerifications();

        const stats = {
            total: verifications.length,
            pending: verifications.filter(v => v.status === 'pending').length,
            under_review: verifications.filter(v => v.status === 'under_review').length,
            approved: verifications.filter(v => v.status === 'approved').length,
            rejected: verifications.filter(v => v.status === 'rejected').length,
        };

        return stats;
    } catch (error) {
        console.error('Error getting verification stats:', error);
        return {
            total: 0,
            pending: 0,
            under_review: 0,
            approved: 0,
            rejected: 0,
        };
    }
}
