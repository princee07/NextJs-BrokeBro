"use client";

import { useState } from 'react';
import { useUserVerification } from '@/hooks/useUserVerification';
import StudentVerification from '@/components/auth/StudentVerification';
import { motion } from 'framer-motion';
import { ShieldCheck, AlertCircle } from 'lucide-react';

interface VerificationProtectedLinkProps {
    href?: string;
    onClick?: () => void;
    children: React.ReactNode;
    className?: string;
    requireVerification?: boolean;
    showTooltip?: boolean;
}


export default function VerificationProtectedLink({
    href,
    onClick,
    children,
    className = '',
    requireVerification = true,
    showTooltip = true
}: VerificationProtectedLinkProps) {
    const { isVerified } = useUserVerification();
    const [showVerificationModal, setShowVerificationModal] = useState(false);
    const [showTooltipState, setShowTooltipState] = useState(false);

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!requireVerification || isVerified) {
            // User is verified or verification not required
            if (href) {
                window.open(href, '_blank', 'noopener,noreferrer');
            } else if (onClick) {
                onClick();
            }
        } else {
            // User is not verified, show verification modal
            setShowVerificationModal(true);
        }
    };

    const handleVerificationComplete = (verified: boolean) => {
        if (verified) {
            localStorage.setItem('studentVerified', 'true');
            localStorage.setItem('verificationDate', new Date().toISOString());
        }
        setShowVerificationModal(false);
        if (verified) {
            // After verification, proceed with the original action
            setTimeout(() => {
                if (href) {
                    window.open(href, '_blank', 'noopener,noreferrer');
                } else if (onClick) {
                    onClick();
                }
            }, 500);
        }
    };

    return (
        <>
            <div
                className={`relative ${className}`}
                onMouseEnter={() => setShowTooltipState(true)}
                onMouseLeave={() => setShowTooltipState(false)}
            >
                <motion.div
                    onClick={handleClick}
                    className="cursor-pointer w-full h-full"
                    whileHover={{ scale: requireVerification && !isVerified ? 1.02 : 1.05 }}
                    whileTap={{ scale: 0.98 }}
                >
                    {children}
                </motion.div>

                {/* Verification Required Overlay */}
                {requireVerification && !isVerified && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 shadow-lg"
                        >
                            <ShieldCheck className="w-4 h-4" />
                            Verify to Access
                        </motion.div>
                    </div>
                )}

                {/* Tooltip */}
                {showTooltip && showTooltipState && requireVerification && !isVerified && (
                    <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap z-50 border border-gray-700"
                    >
                        <AlertCircle className="w-3 h-3 inline mr-1" />
                        Student verification required for discounts
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                    </motion.div>
                )}
            </div>

            {/* Student Verification Modal */}
            <StudentVerification
                isOpen={showVerificationModal}
                onClose={() => setShowVerificationModal(false)}
                onVerificationComplete={handleVerificationComplete}
            />
        </>
    );
}
