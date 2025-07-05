"use client";

import { useState, useEffect } from 'react';
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

interface UserData {
    name: string;
    email: string;
    coins: number;
    referralCode: string;
    image?: string;
    hasResume: boolean;
    resumeFileName?: string;
    resumeUploadDate?: string;
}

interface UseUserDataReturn {
    userData: UserData | null;
    loading: boolean;
    error: string | null;
    refetchUserData: () => Promise<void>;
}

export function useUserData(): UseUserDataReturn {
    const { user, isAuthenticated, isLoading } = useKindeBrowserClient();
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchUserData = async () => {
        if (!isAuthenticated || !user?.email) {
            setUserData(null);
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const response = await fetch(`/api/user?email=${encodeURIComponent(user.email)}`);

            if (!response.ok) {
                throw new Error(`Failed to fetch user data: ${response.statusText}`);
            }

            const data = await response.json();

            if (data.success) {
                setUserData(data.user);
            } else {
                throw new Error(data.error || 'Failed to fetch user data');
            }
        } catch (err) {
            console.error('Error fetching user data:', err);
            setError(err instanceof Error ? err.message : 'Failed to fetch user data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!isLoading) {
            fetchUserData();
        }
    }, [isAuthenticated, user?.email, isLoading]);

    return {
        userData,
        loading: loading || Boolean(isLoading),
        error,
        refetchUserData: fetchUserData
    };
}
