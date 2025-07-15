"use client";
import { useEffect, useState } from 'react';
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

interface UserVerificationStatus {
    isVerified: boolean;
    verificationId: string | null;
    verificationDate: Date | null;
    loading: boolean;
    refetch: () => void;
}

export function useUserVerification(): UserVerificationStatus {
    const [status, setStatus] = useState<UserVerificationStatus>({
        isVerified: false,
        verificationId: null,
        verificationDate: null,
        loading: true,
        refetch: () => {}
    });

    const { user, isAuthenticated } = useKindeBrowserClient();

    const checkVerificationStatus = async () => {
        if (!isAuthenticated || !user) {
            setStatus(prev => ({
                ...prev,
                isVerified: false,
                verificationId: null,
                verificationDate: null,
                loading: false
            }));
            return;
        }

        setStatus(prev => ({ ...prev, loading: true }));

        try {
            // Check if user is verified in the database
            const response = await fetch('/api/user/verification-status', {
                method: 'GET',
                credentials: 'include',
                cache: 'no-store' // prevent caching
            });

            if (response.ok) {
                const data = await response.json();
                setStatus(prev => ({
                    ...prev,
                    isVerified: data.isVerified || false,
                    verificationId: data.verificationId || null,
                    verificationDate: data.verificationDate ? new Date(data.verificationDate) : null,
                    loading: false
                }));

                // Update localStorage to match database status
                if (data.isVerified) {
                    localStorage.setItem('studentVerified', 'true');
                    localStorage.setItem('verificationDate', data.verificationDate);
                    if (data.verificationId) {
                        localStorage.setItem('verificationId', data.verificationId);
                    }
                } else {
                    localStorage.removeItem('studentVerified');
                    localStorage.removeItem('verificationDate');
                    localStorage.removeItem('verificationId');
                }
            } else {
                // Fallback to localStorage if API fails
                const isVerified = localStorage.getItem('studentVerified') === 'true';
                const verificationDate = localStorage.getItem('verificationDate');
                const verificationId = localStorage.getItem('verificationId');

                setStatus(prev => ({
                    ...prev,
                    isVerified,
                    verificationId,
                    verificationDate: verificationDate ? new Date(verificationDate) : null,
                    loading: false
                }));
            }
        } catch (error) {
            console.error('Error checking verification status:', error);

            // Fallback to localStorage
            const isVerified = localStorage.getItem('studentVerified') === 'true';
            const verificationDate = localStorage.getItem('verificationDate');
            const verificationId = localStorage.getItem('verificationId');

            setStatus(prev => ({
                ...prev,
                isVerified,
                verificationId,
                verificationDate: verificationDate ? new Date(verificationDate) : null,
                loading: false
            }));
        }
    };

    useEffect(() => {
        checkVerificationStatus();

        // Listen for the custom event to refetch
        const handleVerificationComplete = () => checkVerificationStatus();
        window.addEventListener('verification-complete', handleVerificationComplete);
        
        // Refetch on window focus to ensure data is fresh
        window.addEventListener('focus', checkVerificationStatus);

        return () => {
            window.removeEventListener('verification-complete', handleVerificationComplete);
            window.removeEventListener('focus', checkVerificationStatus);
        }
    }, [isAuthenticated, user]);

    return { ...status, refetch: checkVerificationStatus };
}
