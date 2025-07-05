"use client";

import { useState } from 'react';
import { Upload, FileText, CheckCircle, X } from 'lucide-react';

interface ResumeUploadProps {
    userId?: string;
    onUploadSuccess?: (file: File, url: string) => void;
    onUploadError?: (error: string) => void;
    onUploadComplete?: () => void; // New callback for when upload is complete
    variant?: 'button' | 'card';
    className?: string;
}

export default function ResumeUpload({
    userId,
    onUploadSuccess,
    onUploadError,
    onUploadComplete,
    variant = 'button',
    className = ''
}: ResumeUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        if (!allowedTypes.includes(file.type)) {
            const error = 'Please upload a PDF or Word document';
            onUploadError?.(error);
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            const error = 'File size must be less than 5MB';
            onUploadError?.(error);
            return;
        }

        setUploading(true);
        try {
            const formData = new FormData();
            formData.append('resume', file);
            if (userId) {
                formData.append('userId', userId);
            }

            const response = await fetch('/api/upload-resume', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Upload failed');
            }

            const result = await response.json();

            // Create a local URL for preview
            const url = URL.createObjectURL(file);
            setUploadedFile(file);

            onUploadSuccess?.(file, url);
            onUploadComplete?.(); // Notify parent component to refresh data

        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to upload resume';
            onUploadError?.(errorMessage);
        } finally {
            setUploading(false);
        }
    };

    const handleRemoveFile = () => {
        setUploadedFile(null);
        // Clear the input
        const input = document.querySelector('input[type="file"]') as HTMLInputElement;
        if (input) {
            input.value = '';
        }
    };

    if (variant === 'card') {
        return (
            <div className={`bg-[#161b22] p-4 rounded-lg shadow-lg border border-gray-800 ${className}`}>
                {!uploadedFile ? (
                    <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-orange-500 transition-colors">
                        <div className="flex flex-col items-center gap-3">
                            <Upload className="w-8 h-8 text-gray-400" />
                            <div>
                                <p className="text-white font-semibold mb-2">Upload your resume</p>
                                <p className="text-gray-400 text-sm mb-3">PDF, DOC, DOCX (Max 5MB)</p>
                                <label className="inline-block">
                                    <input
                                        type="file"
                                        accept=".pdf,.doc,.docx"
                                        onChange={handleFileUpload}
                                        className="hidden"
                                        disabled={uploading}
                                    />
                                    <span className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg cursor-pointer transition-colors inline-flex items-center gap-2">
                                        {uploading ? (
                                            <>
                                                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                                Uploading...
                                            </>
                                        ) : (
                                            <>
                                                <Upload className="w-4 h-4" />
                                                Choose File
                                            </>
                                        )}
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg">
                        <FileText className="w-8 h-8 text-green-400 flex-shrink-0" />
                        <div className="flex-1">
                            <p className="text-white font-semibold">{uploadedFile.name}</p>
                            <p className="text-gray-400 text-sm">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                            <div className="flex items-center gap-1 mt-1">
                                <CheckCircle className="w-4 h-4 text-green-400" />
                                <span className="text-green-400 text-xs">Uploaded successfully</span>
                            </div>
                        </div>
                        <button
                            onClick={handleRemoveFile}
                            className="p-1 hover:bg-gray-700 rounded-full transition-colors"
                        >
                            <X className="w-4 h-4 text-gray-400 hover:text-white" />
                        </button>
                    </div>
                )}
            </div>
        );
    }

    return (
        <label className={`block w-full ${className}`}>
            <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
                disabled={uploading}
            />
            <span className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white font-bold py-3 rounded-lg text-center hover:from-green-700 hover:to-teal-700 transition-all duration-300 shadow-md hover:shadow-green-500/20 cursor-pointer flex items-center justify-center gap-2">
                {uploading ? (
                    <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                        Uploading Resume...
                    </>
                ) : uploadedFile ? (
                    <>
                        <CheckCircle className="w-5 h-5" />
                        Resume Uploaded
                    </>
                ) : (
                    <>
                        <Upload className="w-5 h-5" />
                        Upload Resume
                    </>
                )}
            </span>
        </label>
    );
}
