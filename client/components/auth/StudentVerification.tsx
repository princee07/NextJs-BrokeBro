"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User,
    GraduationCap,
    Upload,
    Clock,
    CheckCircle,
    XCircle,
    FileText,
    Mail,
    MapPin,
    IdCard
} from 'lucide-react';
import { StudentFormData, DocumentUpload, VerificationStage } from '@/types/verification';
import StudentInfoForm from '@/components/auth/StudentInfoForm';
import DocumentUploadForm from '@/components/auth/DocumentUploadForm';
import VerificationTimer from '@/components/auth/VerificationTimer';

interface StudentVerificationProps {
    isOpen?: boolean;
    onClose: () => void;
    onVerificationComplete?: (verified: boolean) => void;
    compact?: boolean;
}

export default function StudentVerification({
    isOpen = true,
    onClose,
    onVerificationComplete,
    compact = false
}: StudentVerificationProps) {
    const [currentStage, setCurrentStage] = useState<VerificationStage>(1);
    const [studentData, setStudentData] = useState<StudentFormData>({
        studentName: '',
        collegeName: '',
        rollNo: '',
        state: ''
    });
    const [documentData, setDocumentData] = useState<DocumentUpload>({
        uploadMethod: 'document'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [verificationId, setVerificationId] = useState<string>('');

    const stages = [
        {
            stage: 1,
            title: 'Student Information',
            description: 'Enter your basic details',
            icon: User,
            color: 'from-blue-500 to-blue-600'
        },
        {
            stage: 2,
            title: 'Document Upload',
            description: 'Verify your student status',
            icon: Upload,
            color: 'from-purple-500 to-purple-600'
        },
        {
            stage: 3,
            title: 'Verification Process',
            description: 'Wait for admin approval',
            icon: Clock,
            color: 'from-green-500 to-green-600'
        }
    ];

    const handleStage1Submit = (data: StudentFormData) => {
        setStudentData(data);
        setCurrentStage(2);
    };

    const handleStage2Submit = async (data: DocumentUpload) => {
        setDocumentData(data);
        setIsSubmitting(true);

        try {
            // Create FormData for API submission
            const formData = new FormData();

            // Add student data
            formData.append('studentName', studentData.studentName);
            formData.append('collegeName', studentData.collegeName);
            formData.append('rollNo', studentData.rollNo);
            formData.append('state', studentData.state);

            // Add document data
            formData.append('uploadMethod', data.uploadMethod);

            if (data.uploadMethod === 'document') {
                if (data.studentIdCard) {
                    formData.append('studentIdCard', data.studentIdCard);
                }
                if (data.feeReceipt) {
                    formData.append('feeReceipt', data.feeReceipt);
                }
            } else if (data.uploadMethod === 'email' && data.studentEmail) {
                formData.append('studentEmail', data.studentEmail);
            }

            // Submit to real API
            const response = await fetch('/api/student-verification/submit', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to submit verification');
            }

            const result = await response.json();
            setVerificationId(result.verificationId);
            setCurrentStage(3);
        } catch (error) {
            console.error('Verification submission failed:', error);
            alert('Failed to submit verification. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleVerificationComplete = (isApproved: boolean) => {
        if (onVerificationComplete) {
            onVerificationComplete(isApproved);
        }
        if (isApproved) {
            // Store verification status in localStorage
            localStorage.setItem('studentVerified', 'true');
            localStorage.setItem('verificationDate', new Date().toISOString());
            if (verificationId) {
                localStorage.setItem('verificationId', verificationId);
            }
        }
    };

    // Compact mode for inline rendering
    if (compact) {
        return (
            <div className="w-full">
                <AnimatePresence mode="wait">
                    {currentStage === 1 && (
                        <StudentInfoForm
                            key="stage1"
                            initialData={studentData}
                            onSubmit={handleStage1Submit}
                        />
                    )}

                    {currentStage === 2 && (
                        <DocumentUploadForm
                            key="stage2"
                            initialData={documentData}
                            onSubmit={handleStage2Submit}
                            onBack={() => setCurrentStage(1)}
                            isSubmitting={isSubmitting}
                        />
                    )}

                    {currentStage === 3 && (
                        <VerificationTimer
                            key="stage3"
                            verificationId={verificationId}
                            studentData={studentData}
                            onComplete={handleVerificationComplete}
                            onBack={() => setCurrentStage(2)}
                        />
                    )}
                </AnimatePresence>
            </div>
        );
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="bg-gray-900 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden border border-gray-700"
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-orange-500 to-amber-600 p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                                <GraduationCap className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white">Student Verification</h2>
                                <p className="text-white/80">Verify your student status for exclusive benefits</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                        >
                            <XCircle className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="px-6 py-4 bg-gray-800/50">
                    <div className="flex items-center justify-between mb-4">
                        {stages.map((stage, index) => (
                            <div key={stage.stage} className="flex items-center">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${currentStage >= stage.stage
                                    ? 'border-orange-500 bg-orange-500 text-white'
                                    : 'border-gray-600 bg-gray-700 text-gray-400'
                                    }`}>
                                    {currentStage > stage.stage ? (
                                        <CheckCircle className="w-5 h-5" />
                                    ) : (
                                        <stage.icon className="w-5 h-5" />
                                    )}
                                </div>
                                {index < stages.length - 1 && (
                                    <div className={`w-20 h-1 mx-2 rounded-full transition-all ${currentStage > stage.stage ? 'bg-orange-500' : 'bg-gray-600'
                                        }`} />
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="text-center">
                        <h3 className="text-white font-semibold">
                            {stages[currentStage - 1]?.title}
                        </h3>
                        <p className="text-gray-400 text-sm">
                            {stages[currentStage - 1]?.description}
                        </p>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 max-h-[60vh] overflow-y-auto">
                    <AnimatePresence mode="wait">
                        {currentStage === 1 && (
                            <StudentInfoForm
                                key="stage1"
                                initialData={studentData}
                                onSubmit={handleStage1Submit}
                            />
                        )}

                        {currentStage === 2 && (
                            <DocumentUploadForm
                                key="stage2"
                                initialData={documentData}
                                onSubmit={handleStage2Submit}
                                onBack={() => setCurrentStage(1)}
                                isSubmitting={isSubmitting}
                            />
                        )}

                        {currentStage === 3 && (
                            <VerificationTimer
                                key="stage3"
                                verificationId={verificationId}
                                studentData={studentData}
                                onComplete={handleVerificationComplete}
                                onBack={() => setCurrentStage(2)}
                            />
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
}
