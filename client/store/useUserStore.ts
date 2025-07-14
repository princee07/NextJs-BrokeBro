import { create } from 'zustand';

interface UserState {
  coins: number;
  referrals: number;
  isVerified: boolean;
  verificationId: string | null;
  verificationDate: string | null;
  isLoggedIn: boolean;
  setCoins: (coins: number) => void;
  setReferrals: (referrals: number) => void;
  setVerified: (isVerified: boolean) => void;
  setVerificationId: (verificationId: string | null) => void;
  setVerificationDate: (verificationDate: string | null) => void;
  setLoggedIn: (isLoggedIn: boolean) => void;
}

export const useUserStore = create<UserState>((set) => ({
  coins: 0,
  referrals: 0,
  isVerified: false,
  verificationId: null,
  verificationDate: null,
  isLoggedIn: false,
  setCoins: (coins) => set({ coins }),
  setReferrals: (referrals) => set({ referrals }),
  setVerified: (isVerified) => set({ isVerified }),
  setVerificationId: (verificationId) => set({ verificationId }),
  setVerificationDate: (verificationDate) => set({ verificationDate }),
  setLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
}));