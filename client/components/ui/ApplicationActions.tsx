"use client";

import { useState } from 'react';
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { CheckCircle } from 'lucide-react';
import { useUserData } from '@/app/lib/hooks/useUserData';
import UploadForm from '../form';


interface ApplicationActionsProps {
    internshipTitle?: string;
    internshipId?: string;
    className?: string;
}

export default function ApplicationActions({
    internshipTitle = "this internship",
    internshipId = "unknown",
    className = ""
}: ApplicationActionsProps) {
    const { isAuthenticated, isLoading: authLoading } = useKindeBrowserClient();
    const { userData, loading: userLoading, refetchUserData } = useUserData();
    const [applicationSuccess, setApplicationSuccess] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [isApplying, setIsApplying] = useState(false);

    const handleQuickApply = async () => {
        setIsApplying(true);

        try {
            const response = await fetch('/api/apply', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    internshipId,
                    internshipTitle
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to submit application');
            }

            setApplicationSuccess(true);
            await refetchUserData();

            setTimeout(() => {
                setApplicationSuccess(false);
            }, 5000);

        } catch (error) {
            console.error('Application failed:', error);
            setUploadError(error instanceof Error ? error.message : 'Failed to submit application. Please try again.');
        } finally {
            setIsApplying(false);
        }
    };

    if (authLoading || userLoading) {
        return (
            <div className={`space-y-3 ${className}`}>
                <div className="w-full bg-gray-700 animate-pulse h-12 rounded-lg"></div>
                <div className="w-full bg-gray-700 animate-pulse h-12 rounded-lg"></div>
                <div className="w-full bg-gray-700 animate-pulse h-12 rounded-lg"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className={`space-y-3 ${className}`}>
                <div className="p-4 bg-blue-900/30 border border-blue-600 rounded-lg text-center">
                    <p className="text-blue-300 mb-3">Please log in to apply for internships</p>
                    <a
                        href="/api/auth/login"
                        className="inline-block w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-all duration-300"
                    >
                        Log In
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className={`space-y-3 ${className}`}>
            {uploadError && (
                <div className="p-3 bg-red-900/50 border border-red-600 rounded-lg">
                    <p className="text-red-300 text-sm">{uploadError}</p>
                </div>
            )}

            {applicationSuccess && (
                <div className="p-4 bg-green-900/50 border border-green-600 rounded-lg">
                    <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <p className="text-green-300 font-semibold">
                            Application Submitted Successfully!
                        </p>
                    </div>
                    <p className="text-green-400 text-sm mt-1">
                        You have successfully applied to {internshipTitle}. We'll notify you about further updates.
                    </p>
                </div>
            )}

            {userData?.hasResume ? (
                <>
                    <button
                        onClick={handleQuickApply}
                        disabled={isApplying || applicationSuccess}
                        className={`w-full font-bold py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 ${applicationSuccess
                                ? 'bg-green-600 text-white cursor-not-allowed'
                                : isApplying
                                    ? 'bg-blue-500 text-white cursor-not-allowed'
                                    : 'bg-blue-600 text-white hover:bg-blue-700'
                            }`}
                    >
                        {isApplying ? (
                            <>
                                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                                Applying...
                            </>
                        ) : applicationSuccess ? (
                            <>
                                <CheckCircle className="w-5 h-5" />
                                Applied Successfully
                            </>
                        ) : (
                            <>
                                <CheckCircle className="w-5 h-5" />
                                Quick Apply
                            </>
                        )}
                    </button>

                    <div className="p-3 bg-green-900/20 border border-green-600 rounded-lg">
                        <div className="flex items-center gap-2 text-green-300">
                            <CheckCircle className="w-4 h-4" />
                            <span className="text-sm">
                                Resume uploaded: {userData.resumeFileName}
                            </span>
                        </div>
                        {userData.resumeUploadDate && (
                            <p className="text-xs text-green-400 mt-1">
                                Uploaded on: {new Date(userData.resumeUploadDate).toLocaleDateString()}
                            </p>
                        )}
                    </div>
                </>
            ) : (
                <>
                    <UploadForm />

                    <div className="p-3 bg-yellow-900/30 border border-yellow-600 rounded-lg">
                        <p className="text-yellow-300 text-sm">
                            Upload your resume to enable Quick Apply for internships.
                        </p>
                    </div>
                </>
            )}
        </div>
    );
}
