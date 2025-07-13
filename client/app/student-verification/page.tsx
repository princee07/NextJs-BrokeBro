"use client";

import { motion } from "framer-motion";
import { GraduationCap, Shield, CheckCircle, Upload, Users, Award, Star } from "lucide-react";
import { useState } from "react";
import StudentVerification from "@/components/auth/StudentVerification";

export default function StudentVerificationPage() {
    const [showVerification, setShowVerification] = useState(false);
    const [isVerified, setIsVerified] = useState(false);

    const benefits = [
        {
            icon: Award,
            title: "Exclusive Discounts",
            description: "Access student-only deals up to 70% off on popular brands like Samsung, Biba, and more",
            color: "from-orange-500 to-amber-500"
        },
        {
            icon: Shield,
            title: "Verified Status",
            description: "Get a verified student badge on your profile and unlock premium features",
            color: "from-green-500 to-emerald-500"
        },
        {
            icon: Users,
            title: "Student Community",
            description: "Connect with other verified students and share exclusive deals and offers",
            color: "from-blue-500 to-cyan-500"
        },
        {
            icon: GraduationCap,
            title: "Extended Access",
            description: "Keep your benefits until graduation with annual verification renewal",
            color: "from-purple-500 to-violet-500"
        },
    ];

    const handleVerificationComplete = (verified: boolean) => {
        setIsVerified(verified);
        setShowVerification(false);

        if (verified) {
            // Show success message or redirect
            alert("Congratulations! Your student status has been verified successfully!");
        }
    };

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Hero Section */}
            <section className="relative overflow-hidden pt-40 pb-20 px-4 md:px-8 lg:px-12">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-2 mb-6">
                                <Star className="w-4 h-4 text-orange-400" />
                                <span className="text-orange-400 text-sm font-medium">Student Exclusive</span>
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                                Verify Your<br />
                                <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">
                                    Student Status
                                </span>
                            </h1>

                            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                                Unlock exclusive student discounts and benefits across top brands.
                                Quick 3-step verification process completed within 24 hours.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <motion.button
                                    onClick={() => setShowVerification(true)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                                >
                                    <GraduationCap className="w-5 h-5" />
                                    Start Verification
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="border border-gray-600 hover:border-gray-500 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200"
                                >
                                    Learn More
                                </motion.button>
                            </div>
                        </motion.div>

                        {/* Right Content - Verification Preview */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="relative"
                        >
                            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-600 rounded-full flex items-center justify-center">
                                        <GraduationCap className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white">Quick Verification</h3>
                                        <p className="text-gray-400">3 simple steps</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                                        <span className="text-white">Enter student information</span>
                                    </div>

                                    <div className="flex items-center gap-3 p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                                        <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                                        <span className="text-white">Upload documents or use student email</span>
                                    </div>

                                    <div className="flex items-center gap-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                                        <span className="text-white">Get approved within 24 hours</span>
                                    </div>
                                </div>

                                <div className="mt-6 pt-6 border-t border-gray-700">
                                    <div className="flex items-center gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-400" />
                                        <span className="text-green-400 font-medium">Get verified student badge</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-20 px-4 md:px-8 lg:px-12 bg-gray-900/50">
                <div className="container mx-auto max-w-6xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Why Verify Your Student Status?
                        </h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            Join thousands of verified students who are already saving big on their favorite brands
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {benefits.map((benefit, index) => (
                            <motion.div
                                key={benefit.title}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-colors"
                            >
                                <div className={`w-12 h-12 bg-gradient-to-r ${benefit.color} rounded-lg flex items-center justify-center mb-4`}>
                                    <benefit.icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-white font-semibold mb-2">{benefit.title}</h3>
                                <p className="text-gray-400 text-sm">{benefit.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 md:px-8 lg:px-12">
                <div className="container mx-auto max-w-4xl text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            Ready to Start Saving?
                        </h2>
                        <p className="text-gray-400 text-lg mb-8">
                            Verification processed within 24 hours. Start unlocking exclusive student discounts today!
                        </p>

                        <motion.button
                            onClick={() => setShowVerification(true)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 mx-auto"
                        >
                            <GraduationCap className="w-5 h-5" />
                            Verify Student Status
                        </motion.button>
                    </motion.div>
                </div>
            </section>

            {/* Student Verification Modal */}
            <StudentVerification
                isOpen={showVerification}
                onClose={() => setShowVerification(false)}
                onVerificationComplete={handleVerificationComplete}
            />
        </div>
    );
}
