"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Clock, RefreshCw } from 'lucide-react';

export default function VerificationTestPage() {
    const [verificationId, setVerificationId] = useState('');
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);

    const testSubmission = async () => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('studentName', 'Test Student');
            formData.append('collegeName', 'Test University');
            formData.append('rollNo', 'TEST123');
            formData.append('state', 'Delhi');
            formData.append('uploadMethod', 'email');
            formData.append('studentEmail', 'test@student.edu');

            const response = await fetch('/api/student-verification/submit', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();
                setVerificationId(result.verificationId);
                alert(`Verification submitted! ID: ${result.verificationId}`);
            } else {
                alert('Failed to submit verification');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error submitting verification');
        } finally {
            setLoading(false);
        }
    };

    const checkStatus = async () => {
        if (!verificationId) return;

        setLoading(true);
        try {
            const response = await fetch(`/api/student-verification/status?id=${verificationId}`);
            if (response.ok) {
                const result = await response.json();
                setStatus(result.verification?.status || 'Not found');
            } else {
                setStatus('Error checking status');
            }
        } catch (error) {
            console.error('Error:', error);
            setStatus('Error checking status');
        } finally {
            setLoading(false);
        }
    };

    const getStatusIcon = () => {
        switch (status) {
            case 'pending':
                return <Clock className="w-6 h-6 text-yellow-400" />;
            case 'under_review':
                return <RefreshCw className="w-6 h-6 text-blue-400" />;
            case 'approved':
                return <CheckCircle className="w-6 h-6 text-green-400" />;
            case 'rejected':
                return <XCircle className="w-6 h-6 text-red-400" />;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold text-white mb-8">Verification System Test</h1>

                <div className="space-y-6">
                    {/* Submit Test Verification */}
                    <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
                        <h2 className="text-xl font-semibold mb-4">1. Submit Test Verification</h2>
                        <button
                            onClick={testSubmission}
                            disabled={loading}
                            className="bg-orange-600 hover:bg-orange-700 disabled:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors"
                        >
                            {loading ? 'Submitting...' : 'Submit Test Verification'}
                        </button>
                    </div>

                    {/* Verification ID Display */}
                    {verificationId && (
                        <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
                            <h2 className="text-xl font-semibold mb-4">2. Verification ID</h2>
                            <div className="bg-gray-800 rounded p-3 font-mono text-sm">
                                {verificationId}
                            </div>
                        </div>
                    )}

                    {/* Check Status */}
                    {verificationId && (
                        <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
                            <h2 className="text-xl font-semibold mb-4">3. Check Status</h2>
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={checkStatus}
                                    disabled={loading}
                                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors"
                                >
                                    {loading ? 'Checking...' : 'Check Status'}
                                </button>

                                {status && (
                                    <div className="flex items-center gap-2">
                                        {getStatusIcon()}
                                        <span className="font-medium">{status}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Instructions */}
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
                        <h3 className="text-blue-400 font-semibold mb-2">Instructions:</h3>
                        <ol className="text-gray-300 space-y-2 list-decimal list-inside">
                            <li>Click "Submit Test Verification" to create a test verification request</li>
                            <li>Copy the verification ID that appears</li>
                            <li>Go to the admin panel (/admin/login) and login with your email</li>
                            <li>Find the verification request and approve/reject it</li>
                            <li>Come back here and click "Check Status" to see the real-time update</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
}
