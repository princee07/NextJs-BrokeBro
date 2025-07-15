import { create } from 'zustand';

interface CouponState {
    codes: Record<string, { code: string; expiresAt: number | null; isVariable: boolean }>;
    revealCoupon: (brand: string, isVariable: boolean, fixedCode?: string) => string;
    getCoupon: (brand: string) => { code: string; expiresAt: number | null; isVariable: boolean } | undefined;
    resetCoupon: (brand: string) => void;
}

function generateVariableCode(brand: string) {
    // Simple random code generator
    return (
        brand.replace(/\s+/g, '').slice(0, 6).toUpperCase() +
        Math.random().toString(36).substring(2, 6).toUpperCase()
    );
}

export const useCouponStore = create<CouponState>((set, get) => ({
    codes: {},
    revealCoupon: (brand, isVariable, fixedCode) => {
        const now = Date.now();
        let code = fixedCode || '';
        let expiresAt: number | null = null;
        if (isVariable) {
            code = generateVariableCode(brand);
            expiresAt = now + 24 * 60 * 60 * 1000; // 24 hours
        }
        set((state) => ({
            codes: {
                ...state.codes,
                [brand]: { code, expiresAt, isVariable },
            },
        }));
        return code;
    },
    getCoupon: (brand) => get().codes[brand],
    resetCoupon: (brand) => {
        set((state) => {
            const newCodes = { ...state.codes };
            delete newCodes[brand];
            return { codes: newCodes };
        });
    },
}));
