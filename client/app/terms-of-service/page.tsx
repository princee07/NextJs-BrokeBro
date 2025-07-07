"use client"

import React from 'react';
import { motion } from 'framer-motion';

const TermsOfServicePage = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
            },
        },
    };

    const termsSection = [
        {
            title: "1. Acceptance of Terms",
            content: "By accessing and using BrokeBro's services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service."
        },
        {
            title: "2. Account Registration",
            content: "To access certain features of our service, you must register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete."
        },
        {
            title: "3. Student Verification",
            content: "Our student discount program requires verification of your current student status. You agree to provide truthful information about your enrollment status and understand that misrepresentation may result in account termination."
        },
        {
            title: "4. Use of Service",
            content: "You may use our service for lawful purposes only. You agree not to use the service to transmit, distribute, store or destroy material in violation of any applicable law or regulation, or in a manner that will infringe the copyright, trademark, trade secret or other intellectual property rights of others."
        },
        {
            title: "5. Prohibited Activities",
            content: "You may not use our service to engage in any illegal activities, harassment, spamming, or any other activities that could harm our platform or other users. Violation of these terms may result in immediate account suspension or termination."
        },
        {
            title: "6. Pricing and Payments",
            content: "All prices displayed on our platform are subject to change without notice. We strive to provide accurate pricing information, but errors may occur. In case of pricing errors, we reserve the right to cancel orders and refund payments."
        },
        {
            title: "7. Privacy and Data Protection",
            content: "Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your information when you use our service. By using our service, you agree to the collection and use of information in accordance with our Privacy Policy."
        },
        {
            title: "8. Intellectual Property",
            content: "The service and its original content, features, and functionality are and will remain the exclusive property of BrokeBro and its licensors. The service is protected by copyright, trademark, and other laws."
        },
        {
            title: "9. Disclaimers and Limitation of Liability",
            content: "Our service is provided on an 'as is' and 'as available' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights."
        },
        {
            title: "10. Indemnification",
            content: "You agree to defend, indemnify, and hold harmless BrokeBro and its officers, directors, employees, and agents from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees)."
        },
        {
            title: "11. Termination",
            content: "We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms."
        },
        {
            title: "12. Changes to Terms",
            content: "We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect."
        }
    ];

    const keyPoints = [
        {
            title: "Account Responsibility",
            description: "You are responsible for maintaining the security of your account and all activities that occur under your account.",
            icon: "🔐"
        },
        {
            title: "Content Guidelines",
            description: "All content shared on our platform must comply with our community guidelines and applicable laws.",
            icon: "📝"
        },
        {
            title: "Student Verification",
            description: "Student discounts require valid verification and are subject to periodic re-verification.",
            icon: "🎓"
        },
        {
            title: "Dispute Resolution",
            description: "Any disputes will be resolved through binding arbitration in accordance with applicable laws.",
            icon: "⚖️"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden pt-20">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-20 blur-3xl bg-gradient-to-r from-blue-500 to-purple-600"
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
                <motion.div
                    className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-20 blur-3xl bg-gradient-to-r from-purple-600 to-pink-600"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        rotate: [360, 180, 0],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
            </div>

            <div className="container mx-auto px-4 py-20 relative z-10">
                {/* Hero Section */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="text-center mb-16"
                >
                    <motion.div
                        variants={itemVariants}
                        className="text-8xl mb-6"
                    >
                        📋
                    </motion.div>
                    <motion.h1
                        variants={itemVariants}
                        className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
                    >
                        Terms of Service
                    </motion.h1>
                    <motion.p
                        variants={itemVariants}
                        className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
                    >
                        Please read these Terms of Service carefully before using BrokeBro's platform. These terms govern your use of our services and student discount programs.
                    </motion.p>
                    <motion.div
                        variants={itemVariants}
                        className="mt-6 text-sm text-gray-500"
                    >
                        Last updated: December 2024
                    </motion.div>
                </motion.div>

                {/* Key Points Overview */}
                <motion.div
                    variants={containerVariants}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
                >
                    {keyPoints.map((point, index) => (
                        <motion.div
                            key={point.title}
                            variants={itemVariants}
                            whileHover={{ scale: 1.05, y: -5 }}
                            className="p-6 rounded-2xl bg-gray-900/50 border border-gray-800 backdrop-blur-sm hover:border-blue-500/50 transition-all group"
                        >
                            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                                {point.icon}
                            </div>
                            <h3 className="text-lg font-bold mb-2 text-white group-hover:text-blue-400 transition-colors">
                                {point.title}
                            </h3>
                            <p className="text-gray-400 text-sm">
                                {point.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Terms Content */}
                <motion.div
                    variants={containerVariants}
                    className="mb-16"
                >
                    <motion.h2
                        variants={itemVariants}
                        className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
                    >
                        Complete Terms and Conditions
                    </motion.h2>

                    <div className="space-y-8">
                        {termsSection.map((section, index) => (
                            <motion.div
                                key={section.title}
                                variants={itemVariants}
                                whileHover={{ scale: 1.01, x: 5 }}
                                className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 hover:border-blue-500/30 transition-all group"
                            >
                                <h3 className="text-xl font-bold mb-4 text-white group-hover:text-blue-400 transition-colors">
                                    {section.title}
                                </h3>
                                <p className="text-gray-400 leading-relaxed text-justify">
                                    {section.content}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Contact Information */}
                <motion.div
                    variants={itemVariants}
                    className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/30 mb-16"
                >
                    <div className="text-center">
                        <div className="text-4xl mb-4">📞</div>
                        <h3 className="text-2xl font-bold mb-4 text-white">
                            Questions About Our Terms?
                        </h3>
                        <p className="text-gray-400 mb-6">
                            If you have any questions about these Terms of Service, please contact our legal team for clarification.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <div className="flex items-center text-gray-300">
                                <span className="mr-2">📧</span>
                                <span>legal@brokebro.com</span>
                            </div>
                            <div className="flex items-center text-gray-300">
                                <span className="mr-2">📍</span>
                                <span>123 Legal St, San Francisco, CA 94102</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Agreement Section */}
                <motion.div
                    variants={itemVariants}
                    className="bg-gradient-to-r from-green-900/50 to-blue-900/50 backdrop-blur-sm rounded-2xl p-8 border border-green-500/30 text-center"
                >
                    <div className="text-4xl mb-4">✅</div>
                    <h3 className="text-2xl font-bold mb-4 text-white">
                        Agreement Confirmation
                    </h3>
                    <p className="text-gray-400 mb-6">
                        By continuing to use BrokeBro's services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
                    </p>
                    <div className="text-sm text-gray-500 space-y-2">
                        <p>• These terms are effective immediately upon your use of our service</p>
                        <p>• Continued use constitutes acceptance of any updates to these terms</p>
                        <p>• You can discontinue use at any time if you disagree with these terms</p>
                    </div>
                </motion.div>

                {/* Navigation Links */}
                <motion.div
                    variants={itemVariants}
                    className="mt-16 text-center"
                >
                    <div className="flex flex-wrap gap-4 justify-center">
                        <motion.a
                            href="/privacy-policy"
                            whileHover={{ scale: 1.05 }}
                            className="px-6 py-3 bg-gray-800/50 hover:bg-gray-700/50 text-white rounded-xl transition-all border border-gray-600 hover:border-gray-500"
                        >
                            Privacy Policy
                        </motion.a>
                        <motion.a
                            href="/cookie-settings"
                            whileHover={{ scale: 1.05 }}
                            className="px-6 py-3 bg-gray-800/50 hover:bg-gray-700/50 text-white rounded-xl transition-all border border-gray-600 hover:border-gray-500"
                        >
                            Cookie Settings
                        </motion.a>
                        <motion.a
                            href="/faq"
                            whileHover={{ scale: 1.05 }}
                            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all"
                        >
                            FAQ
                        </motion.a>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default TermsOfServicePage;
