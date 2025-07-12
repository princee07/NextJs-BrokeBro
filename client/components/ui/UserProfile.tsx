"use client";

import { useState } from 'react';
import Image from 'next/image';
import { User, Settings, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import VerifiedBadge from '../ui/VerifiedBadge';
import { useUserVerification } from '../../hooks/useUserVerification';

interface UserProfileProps {
    user: {
        name: string;
        email: string;
        avatar?: string;
    };
    className?: string;
}

export default function UserProfile({ user, className = '' }: UserProfileProps) {
    const { isVerified } = useUserVerification();
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <div className={`relative ${className}`}>
            <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
                <div className="relative">
                    {/* User Avatar */}
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-700 border-2 border-gray-600">
                        {user.avatar ? (
                            <Image
                                src={user.avatar}
                                alt={user.name}
                                width={40}
                                height={40}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <User className="w-6 h-6 text-gray-400" />
                            </div>
                        )}
                    </div>

                    {/* Verified Badge */}
                    {isVerified && (
                        <div className="absolute -bottom-0.5 -right-0.5">
                            <VerifiedBadge size="sm" showTooltip={false} />
                        </div>
                    )}
                </div>

                <div className="text-left">
                    <div className="flex items-center gap-2">
                        <p className="text-white font-medium text-sm">{user.name}</p>
                        {isVerified && (
                            <VerifiedBadge size="sm" className="flex-shrink-0" />
                        )}
                    </div>
                    <p className="text-gray-400 text-xs">{user.email}</p>
                </div>
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full right-0 mt-2 w-64 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50"
                >
                    <div className="p-4 border-b border-gray-700">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-700">
                                    {user.avatar ? (
                                        <Image
                                            src={user.avatar}
                                            alt={user.name}
                                            width={48}
                                            height={48}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <User className="w-8 h-8 text-gray-400" />
                                        </div>
                                    )}
                                </div>
                                {isVerified && (
                                    <div className="absolute -bottom-1 -right-1">
                                        <VerifiedBadge size="md" showTooltip={false} />
                                    </div>
                                )}
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <h3 className="text-white font-semibold">{user.name}</h3>
                                    {isVerified && <VerifiedBadge size="sm" />}
                                </div>
                                <p className="text-gray-400 text-sm">{user.email}</p>
                                {isVerified && (
                                    <p className="text-green-400 text-xs mt-1">✓ Verified Student</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="p-2">
                        <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-700 rounded-lg transition-colors">
                            <Settings className="w-5 h-5 text-gray-400" />
                            <span className="text-white">Settings</span>
                        </button>
                        <button className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-700 rounded-lg transition-colors">
                            <LogOut className="w-5 h-5 text-gray-400" />
                            <span className="text-white">Sign Out</span>
                        </button>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
