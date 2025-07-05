"use client";

import { useState } from 'react';
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { CheckCircle, Upload, Building } from 'lucide-react';
import ResumeUpload from '@/components/ui/ResumeUpload';
import { useUserData } from '@/app/lib/hooks/useUserData';

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
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [applicationSuccess, setApplicationSuccess] = useState(false);
    const [isApplying, setIsApplying] = useState(false);

    const handleUploadSuccess = (file: File, url: string) => {
        setUploadSuccess(true);
        setUploadError(null);
        // Clear success message after 3 seconds
        setTimeout(() => {
            setUploadSuccess(false);
        }, 3000);
    };

    const handleUploadError = (error: string) => {
        setUploadError(error);
        setUploadSuccess(false);
        // Clear error message after 5 seconds
        setTimeout(() => {
            setUploadError(null);
        }, 5000);
    };

    const handleUploadComplete = async () => {
        // Refresh user data to get updated resume status
        await refetchUserData();
    };

    const handleQuickApply = async () => {
        setIsApplying(true);

        try {
            const response = await fetch('/api/apply', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    internshipId: internshipId,
                    internshipTitle: internshipTitle
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to submit application');
            }

            setApplicationSuccess(true);

            // Refresh user data to update coins
            await refetchUserData();

            // Clear success message after 5 seconds
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

    // Show loading state while checking auth and user data
    if (authLoading || userLoading) {
        return (
            <div className={`space-y-3 ${className}`}>
                <div className="w-full bg-gray-700 animate-pulse h-12 rounded-lg"></div>
                <div className="w-full bg-gray-700 animate-pulse h-12 rounded-lg"></div>
                <div className="w-full bg-gray-700 animate-pulse h-12 rounded-lg"></div>
            </div>
        );
    }

    // Show login prompt if not authenticated
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
            {/* Error message */}
            {uploadError && (
                <div className="p-3 bg-red-900/50 border border-red-600 rounded-lg">
                    <p className="text-red-300 text-sm">{uploadError}</p>
                </div>
            )}

            {/* Success message */}
            {uploadSuccess && (
                <div className="p-3 bg-green-900/50 border border-green-600 rounded-lg">
                    <p className="text-green-300 text-sm">Resume uploaded successfully!</p>
                </div>
            )}

            {/* Application success message */}
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

            {/* Conditional rendering based on resume status */}
            {userData?.hasResume ? (
                <>
                    {/* Quick Apply - only show if user has uploaded resume */}
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

                    {/* Upload Resume option (for updating existing resume) */}
                    <ResumeUpload
                        onUploadSuccess={handleUploadSuccess}
                        onUploadError={handleUploadError}
                        onUploadComplete={handleUploadComplete}
                        className="w-full"
                    />

                    {/* Build Resume with AI */}
                    <a
                        href="/resume-builder/templates"
                        className="w-full block bg-gradient-to-r from-orange-500 to-amber-600 text-white font-bold py-3 rounded-lg text-center hover:from-orange-600 hover:to-amber-700 transition-all duration-300 shadow-md hover:shadow-orange-500/20 flex items-center justify-center gap-2"
                    >
                        <Building className="w-5 h-5" />
                        Build Resume with AI
                    </a>

                    {/* Resume status info */}
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
                    {/* Upload Resume - primary action when no resume */}
                    <ResumeUpload
                        onUploadSuccess={handleUploadSuccess}
                        onUploadError={handleUploadError}
                        onUploadComplete={handleUploadComplete}
                        className="w-full"
                    />

                    {/* Build Resume with AI */}
                    <a
                        href="/resume-builder/templates"
                        className="w-full block bg-gradient-to-r from-orange-500 to-amber-600 text-white font-bold py-3 rounded-lg text-center hover:from-orange-600 hover:to-amber-700 transition-all duration-300 shadow-md hover:shadow-orange-500/20 flex items-center justify-center gap-2"
                    >
                        <Building className="w-5 h-5" />
                        Build Resume with AI
                    </a>

                    {/* Info message */}
                    <div className="p-3 bg-yellow-900/30 border border-yellow-600 rounded-lg">
                        <p className="text-yellow-300 text-sm">
                            Upload your resume or build one with AI to enable Quick Apply for internships.
                        </p>
                    </div>
                </>
            )}
        </div>
    );
}
