"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    Users,
    LayoutDashboard,
    Settings,
    LogOut,
    Menu,
    X,
    Shield,
    BarChart3,
    FileText,
    Bell
} from 'lucide-react';

interface AdminLayoutProps {
    children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            // Call logout API
            await fetch('/api/admin/auth/logout', {
                method: 'POST',
                credentials: 'include',
            });

            // Clear local storage
            localStorage.removeItem('adminAuthenticated');

            // Redirect to login
            router.push('/admin/login');
        } catch (error) {
            console.error('Logout error:', error);
            // Force logout even if API fails
            localStorage.removeItem('adminAuthenticated');
            router.push('/admin/login');
        }
    };

    const navigation = [
        {
            name: 'Dashboard',
            href: '/admin',
            icon: LayoutDashboard,
            current: pathname === '/admin'
        },
        {
            name: 'Verification Requests',
            href: '/admin/verification',
            icon: Users,
            current: pathname === '/admin/verification'
        },
        {
            name: 'Analytics',
            href: '/admin/analytics',
            icon: BarChart3,
            current: pathname === '/admin/analytics'
        },
        {
            name: 'Reports',
            href: '/admin/reports',
            icon: FileText,
            current: pathname === '/admin/reports'
        },
        {
            name: 'Settings',
            href: '/admin/settings',
            icon: Settings,
            current: pathname === '/admin/settings'
        }
    ];

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Mobile sidebar backdrop */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 border-r border-gray-700 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                {/* Sidebar header */}
                <div className="flex items-center justify-between h-16 px-6 border-b border-gray-700">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-amber-600 rounded-lg flex items-center justify-center">
                            <Shield className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-white">Admin Panel</span>
                    </div>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden w-6 h-6 text-gray-400 hover:text-white"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-6 space-y-2">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${item.current
                                ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                }`}
                            onClick={() => setSidebarOpen(false)}
                        >
                            <item.icon className="w-5 h-5" />
                            {item.name}
                        </Link>
                    ))}
                </nav>

                {/* Sidebar footer */}
                <div className="border-t border-gray-700 p-4">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-amber-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-medium">A</span>
                        </div>
                        <div>
                            <p className="text-white font-medium">Admin User</p>
                            <p className="text-gray-400 text-sm">admin@brokebro.com</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white transition-colors w-full"
                    >
                        <LogOut className="w-5 h-5" />
                        Sign Out
                    </button>
                </div>
            </div>

            {/* Main content */}
            <div className="lg:ml-64">
                {/* Top navigation */}
                <div className="bg-gray-900 border-b border-gray-700 h-16 flex items-center justify-between px-6">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="lg:hidden w-6 h-6 text-gray-400 hover:text-white"
                    >
                        <Menu className="w-6 h-6" />
                    </button>

                    <div className="flex items-center gap-4">
                        {/* Notifications */}
                        <button className="relative w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                            <Bell className="w-5 h-5" />
                            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                        </button>

                        {/* User menu */}
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-amber-600 rounded-full flex items-center justify-center">
                                <span className="text-white font-medium text-sm">A</span>
                            </div>
                            <span className="text-white font-medium hidden sm:block">Admin</span>
                        </div>
                    </div>
                </div>

                {/* Page content */}
                <main className="flex-1">
                    {children}
                </main>
            </div>
        </div>
    );
}
