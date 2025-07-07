"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Mail, ArrowRight, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await fetch('/api/admin/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
                credentials: 'include', // Include cookies
            });

            const data = await response.json();

            if (data.success) {
                // Store authentication status
                localStorage.setItem('adminAuthenticated', 'true');
                localStorage.setItem('adminEmail', email);
                router.push('/admin');
            } else {
                setError(data.message || 'Access denied');
            }
        } catch (error) {
            setError('Network error. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                {/* Header */}
                <div className="text-center mb-8">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4"
                    >
                        <Shield className="w-8 h-8 text-white" />
                    </motion.div>
                    <h1 className="text-3xl font-bold text-white mb-2">Admin Access</h1>
                    <p className="text-gray-400">Enter admin credentials to access the verification panel</p>
                </div>

                {/* Login Form */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-gray-900 rounded-2xl p-8 border border-gray-700"
                >
                    <form onSubmit={handleLogin} className="space-y-6">
                        {/* Email Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Admin Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                    placeholder="Enter your admin email"
                                    required
                                />
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-red-500/10 border border-red-500/20 rounded-lg p-3"
                            >
                                <p className="text-red-400 text-sm">{error}</p>
                            </motion.div>
                        )}

                        {/* Submit Button */}
                        <motion.button
                            type="submit"
                            disabled={isLoading || !email}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                    Verifying...
                                </>
                            ) : (
                                <>
                                    <ArrowRight className="w-5 h-5" />
                                    Access Admin Panel
                                </>
                            )}
                        </motion.button>
                    </form>

                    {/* Info Box */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg"
                    >
                        <div className="flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                            <div>
                                <h4 className="text-blue-400 font-medium mb-1">Authorized Access Only</h4>
                                <p className="text-gray-400 text-sm">
                                    Only pre-authorized email addresses can access the admin panel.
                                    Contact the system administrator if you need access.
                                </p>
                                <div className="mt-2 text-xs text-gray-500">
                                    Authorized: prince1362005@gmail.com
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Back to Main Site */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-center mt-6"
                >
                    <a
                        href="/"
                        className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                        ← Back to BrokeBro
                    </a>
                </motion.div>
            </motion.div>
        </div>
    );
}
