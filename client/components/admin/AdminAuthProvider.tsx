"use client";

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Shield } from 'lucide-react';

interface AdminAuthProviderProps {
    children: React.ReactNode;
}

export default function AdminAuthProvider({ children }: AdminAuthProviderProps) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        // Check if user is authenticated
        const checkAuth = async () => {
            // Skip auth check for login page
            if (pathname === '/admin/login') {
                setIsAuthenticated(true);
                return;
            }

            try {
                // Verify authentication with server
                const response = await fetch('/api/admin/auth/verify', {
                    method: 'GET',
                    credentials: 'include', // Include cookies
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data.authenticated) {
                        setIsAuthenticated(true);
                        localStorage.setItem('adminAuthenticated', 'true');
                    } else {
                        setIsAuthenticated(false);
                        localStorage.removeItem('adminAuthenticated');
                        router.push('/admin/login');
                    }
                } else {
                    setIsAuthenticated(false);
                    localStorage.removeItem('adminAuthenticated');
                    router.push('/admin/login');
                }
            } catch (error) {
                console.error('Auth verification failed:', error);
                setIsAuthenticated(false);
                localStorage.removeItem('adminAuthenticated');
                router.push('/admin/login');
            }
        };

        checkAuth();
    }, [pathname, router]);

    // Show loading while checking authentication
    if (isAuthenticated === null) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="flex items-center gap-3">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                    <span className="text-lg">Verifying access...</span>
                </div>
            </div>
        );
    }

    // Show access denied if not authenticated (this shouldn't show as user gets redirected)
    if (!isAuthenticated && pathname !== '/admin/login') {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-center">
                    <Shield className="w-16 h-16 text-red-400 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-white mb-2">Access Denied</h1>
                    <p className="text-gray-400 mb-4">You need admin credentials to access this page</p>
                    <button
                        onClick={() => router.push('/admin/login')}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition-colors"
                    >
                        Go to Login
                    </button>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
