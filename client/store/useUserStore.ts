import { create } from 'zustand';

interface UserState {
  coins: number;
  referrals: number;
  setCoins: (coins: number) => void;
  setReferrals: (referrals: number) => void;
}

export const useUserStore = create<UserState>((set) => ({
  coins: 0,
  referrals: 0,
  setCoins: (coins) => set({ coins }),
  setReferrals: (referrals) => set({ referrals }),
}));