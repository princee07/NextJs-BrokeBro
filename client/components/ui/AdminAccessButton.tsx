"use client";

import { motion } from 'framer-motion';
import { Shield, Settings } from 'lucide-react';
import Link from 'next/link';
import { useAdminCheck } from '@/hooks/useAdminCheck';

interface AdminAccessButtonProps {
    className?: string;
    variant?: 'button' | 'link';
    userEmail?: string; // Add user email prop
}

export default function AdminAccessButton({
    className = '',
    variant = 'button',
    userEmail
}: AdminAccessButtonProps) {
    const { isAdmin, isLoading } = useAdminCheck(userEmail);

    // Don't show anything if not admin or still loading
    if (isLoading || !isAdmin) {
        return null;
    }

    if (variant === 'link') {
        return (
            <Link href="/admin/login">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`inline-flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white text-sm font-medium rounded-lg transition-all cursor-pointer ${className}`}
                >
                    <Shield className="w-4 h-4" />
                    Admin Panel
                </motion.div>
            </Link>
        );
    }

    return (
        <Link href="/admin/login">
            <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-semibold rounded-lg transition-all ${className}`}
            >
                <Settings className="w-4 h-4" />
                Admin Panel
            </motion.button>
        </Link>
    );
}
