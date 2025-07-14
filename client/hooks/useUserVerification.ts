"use client";
import { useEffect, useState } from 'react';
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

interface UserVerificationStatus {
    isVerified: boolean;
    verificationId: string | null;
    verificationDate: Date | null;
    loading: boolean;
    user?: any;
    isAuthenticated?: boolean | null;
}

export function useUserVerification(): UserVerificationStatus {
    const [status, setStatus] = useState<UserVerificationStatus>({
        isVerified: false,
        verificationId: null,
        verificationDate: null,
        loading: true
    });

    const { user, isAuthenticated } = useKindeBrowserClient();

    useEffect(() => {
        const checkVerificationStatus = async () => {
            if (!isAuthenticated || !user) {
                setStatus({
                    isVerified: false,
                    verificationId: null,
                    verificationDate: null,
                    loading: false
                });
                return;
            }

            try {
                // Check if user is verified in the database
                const response = await fetch('/api/user/verification-status', {
                    method: 'GET',
                    credentials: 'include'
                });

                if (response.ok) {
                    const data = await response.json();
                    setStatus({
                        isVerified: data.isVerified || false,
                        verificationId: data.verificationId || null,
                        verificationDate: data.verificationDate ? new Date(data.verificationDate) : null,
                        loading: false
                    });

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

                    setStatus({
                        isVerified,
                        verificationId,
                        verificationDate: verificationDate ? new Date(verificationDate) : null,
                        loading: false
                    });
                }
            } catch (error) {
                console.error('Error checking verification status:', error);

                // Fallback to localStorage
                const isVerified = localStorage.getItem('studentVerified') === 'true';
                const verificationDate = localStorage.getItem('verificationDate');
                const verificationId = localStorage.getItem('verificationId');

                setStatus({
                    isVerified,
                    verificationId,
                    verificationDate: verificationDate ? new Date(verificationDate) : null,
                    loading: false
                });
            }
        };

        checkVerificationStatus();
    }, [isAuthenticated, user]);

    return { ...status, user, isAuthenticated };
}
