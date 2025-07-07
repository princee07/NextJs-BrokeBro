// Production storage for verification requests
// This is a temporary solution - replace with a real database in production

interface MemoryStorage {
    verifications: any[];
}

// Global storage that persists during the server session
declare global {
    var __verification_storage: MemoryStorage | undefined;
}

// Initialize storage if it doesn't exist
function initializeStorage(): MemoryStorage {
    if (!global.__verification_storage) {
        console.log('💾 Initializing global memory storage...');
        global.__verification_storage = {
            verifications: []
        };
    }
    return global.__verification_storage;
}

export const productionStorage = initializeStorage();

// Add a verification to memory storage
export function addVerificationToMemory(verification: any) {
    console.log('🔵 Adding verification to memory storage:', verification.id);
    console.log('🔵 Verification data:', JSON.stringify(verification, null, 2));
    productionStorage.verifications.push(verification);
    console.log('🔵 Total verifications in memory after add:', productionStorage.verifications.length);
    console.log('🔵 All verification IDs:', productionStorage.verifications.map(v => v.id));
}

// Get all verifications from memory storage
export function getVerificationsFromMemory() {
    console.log('🟢 Retrieving verifications from memory, count:', productionStorage.verifications.length);
    console.log('🟢 All verification IDs:', productionStorage.verifications.map(v => v.id));
    return productionStorage.verifications;
}

// Clear all verifications (for testing)
export function clearMemoryStorage() {
    productionStorage.verifications = [];
    console.log('Memory storage cleared');
}
