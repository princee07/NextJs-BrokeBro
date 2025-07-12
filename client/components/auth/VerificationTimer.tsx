"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Clock,
    CheckCircle,
    XCircle,
    ArrowLeft,
    RefreshCw,
    User,
    Mail,
    Phone,
    Shield
} from 'lucide-react';
import { StudentFormData } from '@/types/verification';

interface VerificationTimerProps {
    verificationId: string;
    studentData: StudentFormData;
    onComplete: (isApproved: boolean) => void;
    onBack: () => void;
}

export default function VerificationTimer({
    verificationId,
    studentData,
    onComplete,
    onBack
}: VerificationTimerProps) {
    const [status, setStatus] = useState<'waiting' | 'checking' | 'approved' | 'rejected'>('waiting');
    const [isPolling, setIsPolling] = useState(true);

    // Calculate progress percentage (we'll use a simple animation instead of timer)
    const progressPercentage = 15; // Static progress for visual appeal

    // Check verification status from server
    const checkVerificationStatus = async () => {
        try {
            const response = await fetch(`/api/student-verification/status?id=${verificationId}`);
            if (response.ok) {
                const data = await response.json();
                if (data.success && data.verification) {
                    const newStatus = data.verification.status;

                    if (newStatus === 'approved') {
                        setStatus('approved');
                        setIsPolling(false);
                        setTimeout(() => onComplete(true), 3000);
                    } else if (newStatus === 'rejected') {
                        setStatus('rejected');
                        setIsPolling(false);
                        setTimeout(() => onComplete(false), 3000);
                    } else if (newStatus === 'under_review') {
                        setStatus('checking');
                    } else {
                        setStatus('waiting');
                    }
                }
            }
        } catch (error) {
            console.error('Error checking verification status:', error);
        }
    };

    // Poll verification status every 3 seconds
    useEffect(() => {
        if (!isPolling) return;

        const statusInterval = setInterval(() => {
            checkVerificationStatus();
        }, 3000);

        // Check immediately on mount
        checkVerificationStatus();

        return () => clearInterval(statusInterval);
    }, [isPolling, verificationId]);

    // Manual refresh function
    const handleRefresh = async () => {
        setStatus('checking');
        await checkVerificationStatus();
    };

    const getStatusIcon = () => {
        switch (status) {
            case 'waiting':
                return <Clock className="w-8 h-8 text-orange-400" />;
            case 'checking':
                return <RefreshCw className="w-8 h-8 text-blue-400 animate-spin" />;
            case 'approved':
                return <CheckCircle className="w-8 h-8 text-green-400" />;
            case 'rejected':
                return <XCircle className="w-8 h-8 text-red-400" />;
        }
    };

    const getStatusMessage = () => {
        switch (status) {
            case 'waiting':
                return {
                    title: 'Verification in Progress',
                    message: 'Our admin team is reviewing your documents. Please wait while we verify your student status.'
                };
            case 'checking':
                return {
                    title: 'Admin is Checking',
                    message: 'An admin is currently reviewing your submission. This should only take a moment.'
                };
            case 'approved':
                return {
                    title: 'Verification Successful!',
                    message: 'Congratulations! Your student status has been verified. You now have access to exclusive student benefits.'
                };
            case 'rejected':
                return {
                    title: 'Verification Failed',
                    message: 'We were unable to verify your student status. Please check your documents and try again, or contact support for assistance.'
                };
        }
    };

    const statusInfo = getStatusMessage();

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
        >
            <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    {getStatusIcon()}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{statusInfo.title}</h3>
                <p className="text-gray-400">{statusInfo.message}</p>
            </div>

            {/* Timer Display */}
            {status !== 'approved' && status !== 'rejected' && (
                <div className="bg-gray-800 rounded-2xl p-6 text-center">
                    <div className="relative w-32 h-32 mx-auto mb-4">
                        {/* Status icon */}
                        <div className="w-32 h-32 bg-gradient-to-r from-orange-500 to-amber-600 rounded-full flex items-center justify-center">
                            {getStatusIcon()}
                        </div>
                    </div>

                    <h4 className="text-white font-semibold mb-2">Verification Submitted</h4>
                    <p className="text-gray-400 text-sm">
                        Verification typically processed within 24 hours. You'll be notified once it's complete.
                    </p>
                </div>
            )}

            {/* Submitted Information Summary */}
            <div className="bg-gray-800 rounded-xl p-6">
                <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-blue-400" />
                    Submitted Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p className="text-gray-400 text-sm">Student Name</p>
                        <p className="text-white font-medium">{studentData.studentName}</p>
                    </div>
                    <div>
                        <p className="text-gray-400 text-sm">College</p>
                        <p className="text-white font-medium">{studentData.collegeName}</p>
                    </div>
                    <div>
                        <p className="text-gray-400 text-sm">Roll Number</p>
                        <p className="text-white font-medium">{studentData.rollNo}</p>
                    </div>
                    <div>
                        <p className="text-gray-400 text-sm">State</p>
                        <p className="text-white font-medium">{studentData.state}</p>
                    </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-700">
                    <p className="text-gray-400 text-sm">Verification ID</p>
                    <p className="text-white font-mono text-sm">{verificationId}</p>
                </div>
            </div>

            {/* Status Updates */}
            <div className="space-y-3">
                <h4 className="text-white font-semibold">Verification Status</h4>

                <div className="space-y-2">
                    <div className="flex items-center gap-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <div>
                            <p className="text-green-400 font-medium">Documents Submitted</p>
                            <p className="text-gray-400 text-sm">Your verification request has been received</p>
                        </div>
                    </div>

                    <div className={`flex items-center gap-3 p-3 rounded-lg border ${status === 'checking'
                        ? 'bg-blue-500/10 border-blue-500/20'
                        : 'bg-gray-800/50 border-gray-700'
                        }`}>
                        <RefreshCw className={`w-5 h-5 ${status === 'checking' ? 'text-blue-400 animate-spin' : 'text-gray-500'
                            }`} />
                        <div>
                            <p className={`font-medium ${status === 'checking' ? 'text-blue-400' : 'text-gray-500'
                                }`}>
                                Admin Review
                            </p>
                            <p className="text-gray-400 text-sm">
                                {status === 'checking' ? 'Currently being reviewed' : 'Waiting for admin review'}
                            </p>
                        </div>
                    </div>

                    <div className={`flex items-center gap-3 p-3 rounded-lg border ${status === 'approved'
                        ? 'bg-green-500/10 border-green-500/20'
                        : status === 'rejected'
                            ? 'bg-red-500/10 border-red-500/20'
                            : 'bg-gray-800/50 border-gray-700'
                        }`}>
                        {status === 'approved' ? (
                            <CheckCircle className="w-5 h-5 text-green-400" />
                        ) : status === 'rejected' ? (
                            <XCircle className="w-5 h-5 text-red-400" />
                        ) : (
                            <Clock className="w-5 h-5 text-gray-500" />
                        )}
                        <div>
                            <p className={`font-medium ${status === 'approved' ? 'text-green-400' :
                                status === 'rejected' ? 'text-red-400' : 'text-gray-500'
                                }`}>
                                Verification Complete
                            </p>
                            <p className="text-gray-400 text-sm">
                                {status === 'approved' ? 'Verification successful' :
                                    status === 'rejected' ? 'Verification failed' : 'Pending completion'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
                {status !== 'approved' && status !== 'rejected' && (
                    <>
                        <motion.button
                            type="button"
                            onClick={onBack}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Back to Documents
                        </motion.button>

                        <motion.button
                            type="button"
                            onClick={handleRefresh}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 flex items-center gap-2"
                        >
                            <RefreshCw className="w-5 h-5" />
                            Refresh
                        </motion.button>
                    </>
                )}
            </div>

            {/* Help Section */}
            <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
                <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Shield className="w-3 h-3 text-white" />
                    </div>
                    <div>
                        <h4 className="text-orange-400 font-medium mb-1">Need Help?</h4>
                        <p className="text-gray-400 text-sm mb-2">
                            If your verification is taking longer than expected or if you encounter any issues:
                        </p>
                        <div className="space-y-1 text-gray-400 text-sm">
                            <p>• Contact our support team at support@brokebro.com</p>
                            <p>• Call us at +91-XXXX-XXXX (Mon-Sat, 9 AM - 6 PM)</p>
                            <p>• Use your verification ID: {verificationId}</p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
