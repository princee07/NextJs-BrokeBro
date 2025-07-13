"use client";

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Shield } from 'lucide-react';

interface AdminAuthProviderProps {
    children: React.ReactNode;
}

// Admin email addresses
const ADMIN_EMAILS = [
    'prince1362005@gmail.com',
    'lavanya.varshney2104@gmail.com',
    'vrindabindal1212@gmail.com'
];

export default function AdminAuthProvider({ children }: AdminAuthProviderProps) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const { user, isAuthenticated: kindeAuth, isLoading } = useKindeBrowserClient();
    const router = useRouter();
    const pathname = usePathname(); useEffect(() => {
        // Check if user is authenticated
        const checkAuth = async () => {
            if (isLoading) return;

            try {
                // Check if user is authenticated with Kinde and has admin email
                if (kindeAuth && user?.email && ADMIN_EMAILS.includes(user.email)) {
                    setIsAuthenticated(true);

                    // Set admin cookies for API authentication
                    await fetch('/api/admin/auth/auto-login', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email: user.email }),
                        credentials: 'include'
                    });

                    return;
                }

                // If not authenticated or not admin, check existing admin session
                const response = await fetch('/api/admin/auth/verify', {
                    method: 'GET',
                    credentials: 'include',
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data.authenticated) {
                        setIsAuthenticated(true);
                        return;
                    }
                }

                // Not authenticated
                setIsAuthenticated(false);
                if (pathname !== '/') {
                    router.push('/');
                }
            } catch (error) {
                console.error('Auth verification failed:', error);
                setIsAuthenticated(false);
                if (pathname !== '/') {
                    router.push('/');
                }
            }
        };

        checkAuth();
    }, [kindeAuth, user, isLoading, pathname, router]);

    // Show loading while checking authentication
    if (isAuthenticated === null || isLoading) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="flex items-center gap-3">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                    <span className="text-lg">Verifying admin access...</span>
                </div>
            </div>
        );
    }

    // Show access denied if not authenticated
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-center">
                    <Shield className="w-16 h-16 text-red-400 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-white mb-2">Admin Access Required</h1>
                    <p className="text-gray-400 mb-4">You need to be logged in with an authorized admin email</p>
                    <button
                        onClick={() => router.push('/')}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition-colors"
                    >
                        Go to Home
                    </button>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
