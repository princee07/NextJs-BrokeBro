"use client";

import { useState, useEffect } from 'react';

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

    // Load verification status from localStorage on mount
    useEffect(() => {
        const isVerified = localStorage.getItem('studentVerified') === 'true';
        const verificationDate = localStorage.getItem('verificationDate');
        const verificationId = localStorage.getItem('verificationId');

        setVerificationState({
            isVerified,
            verificationDate,
            verificationId,
        });
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
