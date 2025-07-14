"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, X, CheckCircle } from 'lucide-react';
import { useUserVerification } from '@/hooks/useUserVerification';
import { useStudentVerification } from '@/hooks/useStudentVerification';
import StudentVerification from '@/components/auth/StudentVerification';

interface VerificationGateProps {
    children: React.ReactNode;
    className?: string;
    disabled?: boolean;
}

export default function VerificationGate({
    children,
    className = '',
    disabled = false
}: VerificationGateProps) {
    const { isVerified } = useStudentVerification();
    const [showVerificationModal, setShowVerificationModal] = useState(false);

    // If user is verified or gate is disabled, render children normally
    if (isVerified || disabled) {
        return <>{children}</>;
    }

    // Handle click on unverified content
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setShowVerificationModal(true);
    };

    return (
        <>
            {/* Wrapper that captures clicks and shows verification prompt */}
            <div
                onClick={handleClick}
                className={`relative cursor-pointer ${className}`}
            >
                {children}
            </div>

            {/* Student Verification Modal */}
            <AnimatePresence>
                {showVerificationModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[110] flex items-center justify-center p-4 pt-40"
                        onClick={() => setShowVerificationModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{ duration: 0.3 }}
                            className="relative bg-gradient-to-br from-gray-900 to-black border border-orange-500/20 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close button */}
                            <button
                                onClick={() => setShowVerificationModal(false)}
                                className="absolute top-6 right-6 w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center z-20 transition-colors"
                            >
                                <X className="w-5 h-5 text-gray-400" />
                            </button>

                            {/* Header */}
                            <div className="p-8 pb-0">
                                <div className="flex items-center gap-4 mb-6">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                        className="w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-600 rounded-full flex items-center justify-center"
                                    >
                                        <Shield className="w-8 h-8 text-white" />
                                    </motion.div>

                                    <div>
                                        <h2 className="text-3xl font-bold text-white mb-2">
                                            Student Verification Required
                                        </h2>
                                        <p className="text-gray-400 leading-relaxed">
                                            Unlock exclusive student deals and discounts by verifying your student status.
                                        </p>
                                    </div>
                                </div>

                                {/* Benefits */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                    {[
                                        'Access exclusive student-only deals',
                                        'Get up to 60% off on premium brands',
                                        'Verified student badge on profile',
                                        'Priority access to limited offers'
                                    ].map((benefit, index) => (
                                        <motion.div
                                            key={benefit}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.3 + (index * 0.1) }}
                                            className="flex items-center gap-3 text-sm text-gray-300"
                                        >
                                            <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                                            <span>{benefit}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Verification Component */}
                            <div className="px-8 pb-8">
                                {!isVerified && (
                                    <StudentVerification
                                        isOpen={showVerificationModal}
                                        onClose={() => setShowVerificationModal(false)}
                                        onVerificationComplete={() => setShowVerificationModal(false)}
                                    />
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
