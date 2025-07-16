"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, X, CheckCircle } from 'lucide-react';
import { useUserVerification } from '@/hooks/useUserVerification';
import { useStudentVerification } from '@/hooks/useStudentVerification';
import StudentVerification from '@/components/auth/StudentVerification';
import { useRouter } from 'next/navigation';

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
    const { loading, isVerified: isUserVerified, verificationId, verificationDate, ...userVerification } = useUserVerification();
    const isLoggedIn = !!userVerification && userVerification.hasOwnProperty('isVerified') && !loading && verificationId !== null;
    const router = useRouter();

    // If user is verified or gate is disabled, render children normally
    if (isVerified || disabled) {
        return <>{children}</>;
    }

    // Handler for click
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!isLoggedIn) {
            router.push('/signup');
        } else {
            router.push('/student-verification');
        }
    };

    // Render children with click handler, no overlay
    return (
        <div className={className} onClick={handleClick} style={{ cursor: 'pointer' }}>
            {children}
        </div>
    );
}
