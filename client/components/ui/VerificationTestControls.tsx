"use client";

import { useUserVerification } from '@/hooks/useUserVerification';
import { motion } from 'framer-motion';
import { Shield, ShieldCheck, RotateCcw, Settings } from 'lucide-react';
import Link from 'next/link';

export default function VerificationTestControls() {
    const { isVerified } = useUserVerification();

    const testVerify = () => {
        localStorage.setItem('studentVerified', 'true');
        localStorage.setItem('verificationDate', new Date().toISOString());
        localStorage.setItem('verificationId', 'test-verification-123');
        window.location.reload();
    };

    const clearVerification = () => {
        localStorage.removeItem('studentVerified');
        localStorage.removeItem('verificationDate');
        localStorage.removeItem('verificationId');
        window.location.reload();
    };

    return (
        <div className="fixed bottom-4 right-4 z-50 bg-gray-900/90 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
            <div className="flex flex-col gap-3">
                {/* Verification Status */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        {isVerified ? (
                            <ShieldCheck className="w-5 h-5 text-green-400" />
                        ) : (
                            <Shield className="w-5 h-5 text-gray-400" />
                        )}
                        <span className={`text-sm font-medium ${isVerified ? 'text-green-400' : 'text-gray-400'}`}>
                            {isVerified ? 'Verified' : 'Not Verified'}
                        </span>
                    </div>

                    <div className="flex gap-2">
                        {!isVerified && (
                            <motion.button
                                onClick={testVerify}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-xs rounded-md transition-colors"
                            >
                                Test Verify
                            </motion.button>
                        )}

                        {isVerified && (
                            <motion.button
                                onClick={clearVerification}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white text-xs rounded-md transition-colors flex items-center gap-1"
                            >
                                <RotateCcw className="w-3 h-3" />
                                Reset
                            </motion.button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
