"use client";

import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface VerifiedBadgeProps {
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    showTooltip?: boolean;
}

export default function VerifiedBadge({
    size = 'sm',
    className = '',
    showTooltip = true
}: VerifiedBadgeProps) {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-6 h-6',
        lg: 'w-8 h-8'
    };

    const iconSizes = {
        sm: 'w-2.5 h-2.5',
        md: 'w-4 h-4',
        lg: 'w-5 h-5'
    };

    // Position classes for overlay positioning
    const positionClasses = {
        sm: 'absolute -bottom-0.5 -right-0.5',
        md: 'absolute -bottom-1 -right-1',
        lg: 'absolute -bottom-1 -right-1'
    };

    return (
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
                type: "spring",
                stiffness: 500,
                damping: 15,
                delay: 0.2
            }}
            className={`${positionClasses[size]} ${sizeClasses[size]} bg-green-500 rounded-full flex items-center justify-center border-2 border-white shadow-lg z-10 group ${className}`}
        >
            <CheckCircle className={`${iconSizes[size]} text-white`} />

            {showTooltip && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-20 pointer-events-none">
                    <div className="text-center">
                        <div className="font-semibold text-green-400">✓ Verified Student</div>
                        <div className="text-xs text-gray-300">Eligible for student discounts</div>
                    </div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                </div>
            )}
        </motion.div>
    );
}
