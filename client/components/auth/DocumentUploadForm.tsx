"use client";

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
    Upload,
    FileText,
    Mail,
    ArrowRight,
    ArrowLeft,
    CheckCircle,
    AlertCircle,
    X,
    CreditCard,
    IdCard
} from 'lucide-react';
import { DocumentUpload } from '@/types/verification';

interface DocumentUploadFormProps {
    initialData: DocumentUpload;
    onSubmit: (data: DocumentUpload) => void;
    onBack: () => void;
    isSubmitting: boolean;
}

export default function DocumentUploadForm({
    initialData,
    onSubmit,
    onBack,
    isSubmitting
}: DocumentUploadFormProps) {
    const [formData, setFormData] = useState<DocumentUpload>(initialData);
    const [errors, setErrors] = useState<string>('');
    const [dragActive, setDragActive] = useState(false);

    const idCardRef = useRef<HTMLInputElement>(null);
    const feeReceiptRef = useRef<HTMLInputElement>(null);

    const handleMethodChange = (method: 'document' | 'email') => {
        setFormData(prev => ({
            ...prev,
            uploadMethod: method,
            studentIdCard: undefined,
            feeReceipt: undefined,
            studentEmail: ''
        }));
        setErrors('');
    };

    const handleFileUpload = (file: File, type: 'studentIdCard' | 'feeReceipt') => {
        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            setErrors('File size must be less than 5MB');
            return;
        }

        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
        if (!allowedTypes.includes(file.type)) {
            setErrors('Please upload only JPG, PNG, or PDF files');
            return;
        }

        setFormData(prev => ({ ...prev, [type]: file }));
        setErrors('');
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent, type: 'studentIdCard' | 'feeReceipt') => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileUpload(e.dataTransfer.files[0], type);
        }
    };

    const validateForm = (): boolean => {
        if (formData.uploadMethod === 'document') {
            if (!formData.studentIdCard && !formData.feeReceipt) {
                setErrors('Please upload at least one document (Student ID Card or Fee Receipt)');
                return false;
            }
        } else if (formData.uploadMethod === 'email') {
            if (!formData.studentEmail) {
                setErrors('Please enter your student email address');
                return false;
            }

            // Validate email format and ensure it's a student email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.studentEmail)) {
                setErrors('Please enter a valid email address');
                return false;
            }

            // Check for common student email domains
            const studentDomains = ['.edu', '.ac.', 'student', 'scholars'];
            const isStudentEmail = studentDomains.some(domain =>
                formData.studentEmail!.toLowerCase().includes(domain)
            );

            if (!isStudentEmail) {
                setErrors('Please use your official student email address (usually contains .edu, .ac, or student)');
                return false;
            }
        }

        return true;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit(formData);
        }
    };

    const removeFile = (type: 'studentIdCard' | 'feeReceipt') => {
        setFormData(prev => ({ ...prev, [type]: undefined }));
    };

    const FileUploadArea = ({
        type,
        title,
        icon: Icon,
        description
    }: {
        type: 'studentIdCard' | 'feeReceipt';
        title: string;
        icon: any;
        description: string;
    }) => {
        const file = formData[type];
        const inputRef = type === 'studentIdCard' ? idCardRef : feeReceiptRef;

        return (
            <div className="space-y-3">
                <div className="flex items-center gap-2">
                    <Icon className="w-5 h-5 text-purple-500" />
                    <h4 className="text-black font-medium">{title}</h4>
                </div>

                {file ? (
                    <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-green-600" />
                                <div>
                                    <p className="text-green-700 font-medium">{file.name}</p>
                                    <p className="text-gray-600 text-sm">
                                        {(file.size / 1024 / 1024).toFixed(2)} MB
                                    </p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => removeFile(type)}
                                className="text-gray-500 hover:text-red-600 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div
                        className={`border-2 border-dashed rounded-lg p-6 text-center transition-all cursor-pointer shadow-sm ${dragActive
                                ? 'border-purple-500 bg-purple-50'
                                : 'border-gray-300 hover:border-purple-500 hover:bg-purple-50'
                            }`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={(e) => handleDrop(e, type)}
                        onClick={() => inputRef.current?.click()}
                    >
                        <Upload className="w-8 h-8 text-gray-500 mx-auto mb-3" />
                        <p className="text-black font-medium mb-1">
                            Click to upload or drag and drop
                        </p>
                        <p className="text-gray-600 text-sm">{description}</p>
                        <p className="text-gray-500 text-xs mt-2">
                            JPG, PNG, or PDF (max 5MB)
                        </p>
                    </div>
                )}

                <input
                    ref={inputRef}
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], type)}
                    className="hidden"
                />
            </div>
        );
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
        >
            <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Upload className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-black mb-2">Document Verification</h3>
                <p className="text-gray-600">
                    Upload your student documents or use your student email for verification
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Upload Method Selection */}
                <div className="space-y-4">
                    <h4 className="text-black font-medium">Choose Verification Method</h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button
                            type="button"
                            onClick={() => handleMethodChange('document')}
                            className={`p-4 rounded-lg border-2 transition-all text-left shadow-sm ${formData.uploadMethod === 'document'
                                    ? 'border-purple-500 bg-purple-50'
                                    : 'border-gray-300 hover:border-gray-400 bg-white'
                                }`}
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <FileText className="w-5 h-5 text-purple-500" />
                                <span className="text-black font-medium">Upload Documents</span>
                            </div>
                            <p className="text-gray-600 text-sm">
                                Upload your student ID card or fee receipt
                            </p>
                        </button>

                        <button
                            type="button"
                            onClick={() => handleMethodChange('email')}
                            className={`p-4 rounded-lg border-2 transition-all text-left shadow-sm ${formData.uploadMethod === 'email'
                                    ? 'border-purple-500 bg-purple-50'
                                    : 'border-gray-300 hover:border-gray-400 bg-white'
                                }`}
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <Mail className="w-5 h-5 text-purple-500" />
                                <span className="text-black font-medium">Student Email</span>
                            </div>
                            <p className="text-gray-600 text-sm">
                                Use your official student email address
                            </p>
                        </button>
                    </div>
                </div>

                {/* Document Upload */}
                {formData.uploadMethod === 'document' && (
                    <div className="space-y-6">
                        <FileUploadArea
                            type="studentIdCard"
                            title="Student ID Card"
                            icon={IdCard}
                            description="Upload a clear photo of your student ID card"
                        />

                        <div className="text-center">
                            <span className="text-gray-600 bg-gray-200 px-3 py-1 rounded-full text-sm">
                                OR
                            </span>
                        </div>

                        <FileUploadArea
                            type="feeReceipt"
                            title="Recent Fee Receipt"
                            icon={CreditCard}
                            description="Upload your recent fee receipt or enrollment document"
                        />
                    </div>
                )}

                {/* Email Verification */}
                {formData.uploadMethod === 'email' && (
                    <div className="space-y-3">
                        <label className="block text-sm font-medium text-gray-700">
                            Student Email Address
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-500" />
                            </div>
                            <input
                                type="email"
                                value={formData.studentEmail || ''}
                                onChange={(e) => setFormData(prev => ({ ...prev, studentEmail: e.target.value }))}
                                placeholder="Enter your official student email"
                                className="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-300 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all shadow-sm"
                            />
                        </div>
                        <p className="text-gray-600 text-sm">
                            Use your official student email (usually ends with .edu, .ac., or contains 'student')
                        </p>
                    </div>
                )}

                {/* Error Message */}
                {errors && (
                    <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-red-50 border-2 border-red-300 rounded-lg p-4 shadow-sm"
                    >
                        <div className="flex items-center gap-3">
                            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                            <p className="text-red-700">{errors}</p>
                        </div>
                    </motion.div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-4">
                    <motion.button
                        type="button"
                        onClick={onBack}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 bg-gray-200 hover:bg-gray-300 text-black font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-sm"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back
                    </motion.button>

                    <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                        className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                    >
                        {isSubmitting ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Submitting...
                            </>
                        ) : (
                            <>
                                Submit for Verification
                                <ArrowRight className="w-5 h-5" />
                            </>
                        )}
                    </motion.button>
                </div>
            </form>

            {/* Info Box */}
            <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4 shadow-sm">
                <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                        <Upload className="w-3 h-3 text-white" />
                    </div>
                    <div>
                        <h4 className="text-purple-700 font-medium mb-1">Document Security</h4>
                        <p className="text-gray-600 text-sm">
                            Your documents are encrypted and stored securely. They will only be used for
                            verification purposes and will be deleted after the verification process is complete.
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
