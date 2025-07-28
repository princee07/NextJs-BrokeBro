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
        <div className="min-h-screen bg-gray-50 text-black">
            {/* Hero Section */}
            <section className="relative overflow-hidden pt-40 pb-20 px-4 md:px-8 lg:px-12 bg-gray-50">
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

                            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
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
                                    className="border border-gray-300 hover:border-gray-400 text-black font-semibold py-4 px-8 rounded-lg transition-all duration-200"
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
                            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-600 rounded-full flex items-center justify-center shadow-md">
                                        <GraduationCap className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-black">Quick Verification</h3>
                                        <p className="text-gray-600">3 simple steps</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 p-4 bg-blue-100 border-2 border-blue-300 rounded-lg hover:bg-blue-200 transition-colors">
                                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm">1</div>
                                        <span className="text-gray-800 font-medium">Enter student information</span>
                                    </div>

                                    <div className="flex items-center gap-3 p-4 bg-purple-100 border-2 border-purple-300 rounded-lg hover:bg-purple-200 transition-colors">
                                        <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm">2</div>
                                        <span className="text-gray-800 font-medium">Upload documents or use student email</span>
                                    </div>

                                    <div className="flex items-center gap-3 p-4 bg-green-100 border-2 border-green-300 rounded-lg hover:bg-green-200 transition-colors">
                                        <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm">3</div>
                                        <span className="text-gray-800 font-medium">Get approved within 24 hours</span>
                                    </div>
                                </div>

                                <div className="mt-6 pt-6 border-t border-gray-300">
                                    <div className="flex items-center gap-3 p-4 bg-green-100 border-2 border-green-300 rounded-lg">
                                        <CheckCircle className="w-5 h-5 text-green-600" />
                                        <span className="text-green-800 font-semibold">Get verified student badge</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-20 px-4 md:px-8 lg:px-12 bg-gray-50">
                <div className="container mx-auto max-w-6xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                            Why Verify Your Student Status?
                        </h2>
                        <p className="text-gray-800 text-lg max-w-2xl mx-auto">
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
                                className="bg-white rounded-xl p-6 border-2 border-gray-300 hover:border-gray-500 hover:shadow-xl hover:bg-gray-50 transition-all duration-300 shadow-lg"
                            >
                                <div className={`w-12 h-12 bg-gradient-to-r ${benefit.color} rounded-lg flex items-center justify-center mb-4 shadow-lg`}>
                                    <benefit.icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-black font-bold mb-2 text-lg">{benefit.title}</h3>
                                <p className="text-gray-800 text-sm leading-relaxed">{benefit.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 md:px-8 lg:px-12 bg-gray-50">
                <div className="container mx-auto max-w-4xl text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="bg-white rounded-2xl p-12 border border-gray-200 shadow-lg"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
                            Ready to Start Saving?
                        </h2>
                        <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
                            Verification processed within 24 hours. Start unlocking exclusive student discounts today!
                        </p>

                        <motion.button
                            onClick={() => setShowVerification(true)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 mx-auto shadow-lg hover:shadow-xl"
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
