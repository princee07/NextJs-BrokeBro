"use client";

import { useState, useEffect } from 'react';

interface AdminStatus {
    isAdmin: boolean;
    isLoading: boolean;
    adminEmail?: string;
}

// Admin email addresses
const ADMIN_EMAILS = [
    'prince1362005@gmail.com',
    // Add more admin emails here if needed
];

export function useAdminCheck(userEmail?: string): AdminStatus {
    const [adminStatus, setAdminStatus] = useState<AdminStatus>({
        isAdmin: false,
        isLoading: true,
    });

    useEffect(() => {
        checkAdminStatus(userEmail);
    }, [userEmail]);

    const checkAdminStatus = async (currentUserEmail?: string) => {
        try {
            // First check if user is authenticated as admin
            const authResponse = await fetch('/api/admin/auth/verify', {
                credentials: 'include',
            });

            if (authResponse.ok) {
                const authData = await authResponse.json();
                if (authData.authenticated && authData.adminEmail) {
                    setAdminStatus({
                        isAdmin: true,
                        isLoading: false,
                        adminEmail: authData.adminEmail,
                    });
                    return;
                }
            }

            // Check if the provided user email is in admin list
            const isUserAdmin = currentUserEmail && ADMIN_EMAILS.includes(currentUserEmail);

            setAdminStatus({
                isAdmin: isUserAdmin || false,
                isLoading: false,
                adminEmail: isUserAdmin ? currentUserEmail : undefined,
            });
        } catch (error) {
            console.error('Error checking admin status:', error);
            setAdminStatus({
                isAdmin: false,
                isLoading: false,
            });
        }
    };

    return adminStatus;
}

// Helper function to get current user's email from Kinde auth or admin session
function getCurrentUserEmail(): string | null {
    // First check if admin is already authenticated
    const adminEmail = localStorage.getItem('adminEmail');
    if (adminEmail) {
        return adminEmail;
    }

    // For Kinde authentication, you would typically get this from the user prop
    // Since we're in a hook, we'll need to pass the user email from the component
    // For now, we'll return null and let the component pass the user email
    return null;
}

// Hook to check if a specific email is an admin
export function isEmailAdmin(email: string): boolean {
    return ADMIN_EMAILS.includes(email);
}
