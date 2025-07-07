"use client";

import { CheckCircle2, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { useStudentVerification } from '@/hooks/useStudentVerification';

interface ProfileVerificationBadgeProps {
    size?: 'sm' | 'md' | 'lg';
    variant?: 'overlay' | 'inline';
    className?: string;
    showLabel?: boolean;
}

export default function ProfileVerificationBadge({
    size = 'md',
    variant = 'overlay',
    className = '',
    showLabel = false
}: ProfileVerificationBadgeProps) {
    const { isVerified } = useStudentVerification();

    // Don't render if user is not verified
    if (!isVerified) {
        return null;
    }

    const sizeClasses = {
        sm: variant === 'overlay' ? 'w-6 h-6' : 'w-5 h-5',
        md: variant === 'overlay' ? 'w-8 h-8' : 'w-6 h-6',
        lg: variant === 'overlay' ? 'w-10 h-10' : 'w-8 h-8'
    };

    const iconSizes = {
        sm: 'w-3 h-3',
        md: 'w-4 h-4',
        lg: 'w-5 h-5'
    };

    const positionClasses = variant === 'overlay' ? {
        sm: 'absolute -bottom-1 -right-1',
        md: 'absolute -bottom-1 -right-1',
        lg: 'absolute -bottom-2 -right-2'
    } : {};

    const baseClasses = `
        ${variant === 'overlay' ? positionClasses[size] : ''}
        ${sizeClasses[size]}
        bg-gradient-to-br from-green-400 to-emerald-500
        rounded-full
        flex items-center justify-center
        border-3 border-white
        shadow-lg shadow-green-500/30
        ${className}
    `;

    if (variant === 'inline' && showLabel) {
        return (
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 15,
                    delay: 0.3
                }}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full text-white font-semibold text-sm shadow-lg"
            >
                <Shield className={iconSizes[size]} />
                <span>Verified Student</span>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
                type: "spring",
                stiffness: 500,
                damping: 15,
                delay: 0.3
            }}
            className={baseClasses}
            title="Verified Student"
        >
            <CheckCircle2 className={`${iconSizes[size]} text-white`} />

            {/* Pulse animation for extra attention */}
            <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-30"></div>
        </motion.div>
    );
}
