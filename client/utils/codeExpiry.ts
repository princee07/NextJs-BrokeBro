export const generateTimeBasedCode = (brandSlug: string) => {
  const timestamp = Date.now();
  const randomSuffix = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `${brandSlug.toUpperCase()}${randomSuffix}`;
};

export const getStorageKey = (brandSlug: string, userId: string) => {
  return `code_${brandSlug}_${userId}`;
};

// In client/utils/codeExpiry.ts
export const isCodeExpired = (revealTime: number) => {
  const now = Date.now();

  const twentyFourHours = 24 * 60 * 60 * 1000; // Comment this out
  return (now - revealTime) > twentyFourHours;
};

export const getTimeLeft = (revealTime: number) => {
  const now = Date.now();
  
 const twentyFourHours = 24 * 60 * 60 * 1000; // Comment this out
  const timeLeft = twentyFourHours - (now - revealTime);
  
  if (timeLeft <= 0) return null;
  
  const seconds = Math.floor(timeLeft / 1000);
  return { hours: 0, minutes: 0, seconds }; // Add seconds for testing
};

export const getOrCreateExpiringCode = (brand: any, userId: string) => {
  const storageKey = getStorageKey(brand.slug, userId);
  const storedData = localStorage.getItem(storageKey);
  
  if (storedData) {
    const { code, revealTime } = JSON.parse(storedData);
    
    // Check if code has expired
    if (!isCodeExpired(revealTime)) {
      return { code, isExpired: false, timeLeft: getTimeLeft(revealTime) };
    } else {
      // Code expired, remove from storage
      localStorage.removeItem(storageKey);
    }
  }
  
  // Generate new code
  const newCode = generateTimeBasedCode(brand.slug);
  const revealTime = Date.now();
  
  localStorage.setItem(storageKey, JSON.stringify({ 
    code: newCode, 
    revealTime 
  }));
  
  return { code: newCode, isExpired: false, timeLeft: getTimeLeft(revealTime) };
};
export const markCodeAsRevealed = (brandSlug: string, userId: string) => {
  const storageKey = getStorageKey(brandSlug, userId);
  const storedData = localStorage.getItem(storageKey);
  
  if (storedData) {
    const data = JSON.parse(storedData);
    data.isRevealed = true;
    localStorage.setItem(storageKey, JSON.stringify(data));
  }
};
// Type definitions for better TypeScript support
export interface CodeData {
  code: string;
  isExpired: boolean;
  timeLeft: { seconds: number; } | null;
}

export interface Brand {
  name: string;
  logo: string;
  gradient: string;
  slug: string;
  discount?: string;
  code?: string;
  codeType?: 'fixed' | 'expiring';
}