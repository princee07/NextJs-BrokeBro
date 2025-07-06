import { VerificationStatus } from '@/types/verification';
import { promises as fs } from 'fs';
import path from 'path';

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
    status: 'approved' | 'rejected',
    adminNotes?: string
): Promise<boolean> {
    try {
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
