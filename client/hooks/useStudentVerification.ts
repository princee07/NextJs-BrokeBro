"use client";

import { useState, useEffect } from 'react';
import { useUserStore } from '@/store/useUserStore';

interface VerificationState {
    isVerified: boolean;
    verificationDate: string | null;
    verificationId: string | null;
}

export function useStudentVerification() {
    const [verificationState, setVerificationState] = useState<VerificationState>({
        isVerified: false,
        verificationDate: null,
        verificationId: null,
    });
    const {
        setVerified,
        setVerificationId,
        setVerificationDate
    } = useUserStore();

    // Load verification status from localStorage on mount and listen for changes
    useEffect(() => {
        const syncVerificationState = () => {
            const isVerified = localStorage.getItem('studentVerified') === 'true';
            const verificationDate = localStorage.getItem('verificationDate');
            const verificationId = localStorage.getItem('verificationId');
            setVerificationState({
                isVerified,
                verificationDate,
                verificationId,
            });
            setVerified(isVerified);
            setVerificationId(verificationId);
            setVerificationDate(verificationDate);
        };

        syncVerificationState();

        // Listen for localStorage changes (cross-tab and in-tab)
        const handleStorage = (event: StorageEvent) => {
            if (event.key === 'studentVerified' || event.key === 'verificationDate' || event.key === 'verificationId') {
                syncVerificationState();
            }
        };
        window.addEventListener('storage', handleStorage);

        // Also listen for custom event in same tab (for in-app updates)
        const handleCustom = () => syncVerificationState();
        window.addEventListener('studentVerificationChanged', handleCustom);

        return () => {
            window.removeEventListener('storage', handleStorage);
            window.removeEventListener('studentVerificationChanged', handleCustom);
        };
    }, []);

    // Update verification status
    const updateVerificationStatus = (
        verified: boolean,
        verificationId?: string
    ) => {
        const now = new Date().toISOString();

        setVerificationState({
            isVerified: verified,
            verificationDate: verified ? now : null,
            verificationId: verified ? verificationId || null : null,
        });

        // Update localStorage
        if (verified) {
            localStorage.setItem('studentVerified', 'true');
            localStorage.setItem('verificationDate', now);
            if (verificationId) {
                localStorage.setItem('verificationId', verificationId);
            }
        } else {
            localStorage.removeItem('studentVerified');
            localStorage.removeItem('verificationDate');
            localStorage.removeItem('verificationId');
        }
        // Dispatch custom event for in-app listeners
        window.dispatchEvent(new Event('studentVerificationChanged'));
    };

    // Clear verification status
    const clearVerification = () => {
        updateVerificationStatus(false);
    };

    // Check if verification is expired (optional - for annual renewal)
    const isVerificationExpired = () => {
        if (!verificationState.verificationDate) return false;

        const verificationDate = new Date(verificationState.verificationDate);
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

        return verificationDate < oneYearAgo;
    };

    return {
        ...verificationState,
        updateVerificationStatus,
        clearVerification,
        isVerificationExpired: isVerificationExpired(),
    };
}
