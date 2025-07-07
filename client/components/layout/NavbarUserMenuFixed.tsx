"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import VerifiedBadge from '@/components/ui/VerifiedBadge';
import { useStudentVerification } from '@/hooks/useStudentVerification';

interface NavbarUserMenuProps {
    user: {
        name: string;
        email: string;
        avatar?: string;
    };
    onClick?: () => void;
    className?: string;
}

export default function NavbarUserMenu({
    user,
    onClick,
    className = ''
}: NavbarUserMenuProps) {
    const { isVerified } = useStudentVerification();

    return (
        <motion.button
            onClick={onClick}
            className={`relative focus:outline-none ${className}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            <div className="relative">
                {user.avatar ? (
                    <Image
                        src={user.avatar}
                        alt="User Avatar"
                        width={40}
                        height={40}
                        className="rounded-full border-2 border-orange-500/50 hover:border-orange-500 transition-colors duration-300"
                    />
                ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-pink-600 flex items-center justify-center text-white font-semibold">
                        {user.name.charAt(0) || 'U'}
                    </div>
                )}

                {/* Verified Badge */}
                {isVerified && (
                    <VerifiedBadge size="sm" />
                )}
            </div>
        </motion.button>
    );
}
