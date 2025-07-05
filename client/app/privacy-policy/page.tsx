"use client"

import React from 'react';
import { motion } from 'framer-motion';

const PrivacyPolicyPage = () => {
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

    const privacySections = [
        {
            title: "1. Information We Collect",
            content: "We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us. This includes your name, email address, phone number, payment information, and student verification documents. We also automatically collect certain information about your device and how you interact with our services."
        },
        {
            title: "2. How We Use Your Information",
            content: "We use the information we collect to provide, maintain, and improve our services, process transactions, verify student status for discounts, send you updates and promotional materials, respond to your comments and questions, and protect against fraud and abuse."
        },
        {
            title: "3. Information Sharing and Disclosure",
            content: "We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy. We may share your information with service providers who assist us in operating our platform, conducting business, or serving users."
        },
        {
            title: "4. Student Verification Data",
            content: "For student discount verification, we may collect and verify your enrollment status with educational institutions. This information is used solely for verification purposes and is handled with the highest level of security and confidentiality."
        },
        {
            title: "5. Data Security",
            content: "We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes encryption, secure servers, and regular security audits. However, no method of transmission over the internet is 100% secure."
        },
        {
            title: "6. Cookies and Tracking Technologies",
            content: "We use cookies and similar tracking technologies to track activity on our service and hold certain information. Cookies are files with small amounts of data that may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or indicate when a cookie is being sent."
        },
        {
            title: "7. Your Rights and Choices",
            content: "You have the right to access, update, or delete your personal information. You can also opt out of receiving promotional communications from us. If you are a resident of the European Union, you have additional rights under GDPR, including the right to data portability and the right to restrict processing."
        },
        {
            title: "8. Children's Privacy",
            content: "Our service is not intended for children under 13 years of age. We do not knowingly collect personally identifiable information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us."
        },
        {
            title: "9. International Data Transfers",
            content: "Your information may be transferred to and maintained on computers located outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ from those of your jurisdiction."
        },
        {
            title: "10. Changes to This Privacy Policy",
            content: "We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the 'effective date' at the top of this Privacy Policy. We encourage you to review this Privacy Policy periodically for any changes."
        }
    ];

    const dataTypes = [
        {
            title: "Personal Information",
            description: "Name, email, phone number, address",
            icon: "👤",
            retention: "Account lifetime"
        },
        {
            title: "Student Verification",
            description: "School enrollment, student ID, transcripts",
            icon: "🎓",
            retention: "2 years after graduation"
        },
        {
            title: "Usage Data",
            description: "Site interactions, preferences, history",
            icon: "📊",
            retention: "3 years"
        },
        {
            title: "Payment Information",
            description: "Credit card details, billing address",
            icon: "💳",
            retention: "As required by law"
        }
    ];

    const yourRights = [
        {
            title: "Access Your Data",
            description: "Request a copy of your personal information",
            icon: "👁️"
        },
        {
            title: "Update Information",
            description: "Correct or update your personal details",
            icon: "✏️"
        },
        {
            title: "Delete Account",
            description: "Request deletion of your account and data",
            icon: "🗑️"
        },
        {
            title: "Data Portability",
            description: "Download your data in a portable format",
            icon: "📦"
        },
        {
            title: "Opt-Out",
            description: "Unsubscribe from marketing communications",
            icon: "🔕"
        },
        {
            title: "Restrict Processing",
            description: "Limit how we use your information",
            icon: "🚫"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden pt-20">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-20 blur-3xl bg-gradient-to-r from-green-500 to-blue-600"
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
                        🔒
                    </motion.div>
                    <motion.h1
                        variants={itemVariants}
                        className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent"
                    >
                        Privacy Policy
                    </motion.h1>
                    <motion.p
                        variants={itemVariants}
                        className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
                    >
                        Your privacy is our priority. Learn how we collect, use, and protect your personal information when you use BrokeBro's services.
                    </motion.p>
                    <motion.div
                        variants={itemVariants}
                        className="mt-6 text-sm text-gray-500"
                    >
                        Last updated: December 2024 | Effective: December 1, 2024
                    </motion.div>
                </motion.div>

                {/* Data Types We Collect */}
                <motion.div
                    variants={containerVariants}
                    className="mb-16"
                >
                    <motion.h2
                        variants={itemVariants}
                        className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent"
                    >
                        Data We Collect
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {dataTypes.map((type, index) => (
                            <motion.div
                                key={type.title}
                                variants={itemVariants}
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="p-6 rounded-2xl bg-gray-900/50 border border-gray-800 backdrop-blur-sm hover:border-green-500/50 transition-all group"
                            >
                                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                                    {type.icon}
                                </div>
                                <h3 className="text-lg font-bold mb-2 text-white group-hover:text-green-400 transition-colors">
                                    {type.title}
                                </h3>
                                <p className="text-gray-400 text-sm mb-3">
                                    {type.description}
                                </p>
                                <div className="text-xs text-green-400 font-semibold">
                                    Retained: {type.retention}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Your Rights */}
                <motion.div
                    variants={containerVariants}
                    className="mb-16"
                >
                    <motion.h2
                        variants={itemVariants}
                        className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
                    >
                        Your Privacy Rights
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {yourRights.map((right, index) => (
                            <motion.div
                                key={right.title}
                                variants={itemVariants}
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="p-6 rounded-2xl bg-gray-900/50 border border-gray-800 backdrop-blur-sm hover:border-blue-500/50 transition-all group text-center"
                            >
                                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                                    {right.icon}
                                </div>
                                <h3 className="text-lg font-bold mb-2 text-white group-hover:text-blue-400 transition-colors">
                                    {right.title}
                                </h3>
                                <p className="text-gray-400 text-sm">
                                    {right.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Privacy Policy Content */}
                <motion.div
                    variants={containerVariants}
                    className="mb-16"
                >
                    <motion.h2
                        variants={itemVariants}
                        className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"
                    >
                        Complete Privacy Policy
                    </motion.h2>

                    <div className="space-y-8">
                        {privacySections.map((section, index) => (
                            <motion.div
                                key={section.title}
                                variants={itemVariants}
                                whileHover={{ scale: 1.01, x: 5 }}
                                className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 hover:border-purple-500/30 transition-all group"
                            >
                                <h3 className="text-xl font-bold mb-4 text-white group-hover:text-purple-400 transition-colors">
                                    {section.title}
                                </h3>
                                <p className="text-gray-400 leading-relaxed text-justify">
                                    {section.content}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Data Security Banner */}
                <motion.div
                    variants={itemVariants}
                    className="bg-gradient-to-r from-green-900/50 to-blue-900/50 backdrop-blur-sm rounded-2xl p-8 border border-green-500/30 mb-16"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div>
                            <div className="text-4xl mb-4">🛡️</div>
                            <h3 className="text-2xl font-bold mb-4 text-white">
                                Advanced Data Security
                            </h3>
                            <p className="text-gray-400 mb-6">
                                We use industry-leading security measures to protect your personal information, including end-to-end encryption, secure servers, and regular security audits.
                            </p>
                            <div className="space-y-3">
                                <div className="flex items-center text-sm text-gray-300">
                                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                                    256-bit SSL Encryption
                                </div>
                                <div className="flex items-center text-sm text-gray-300">
                                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                                    SOC 2 Type II Compliant
                                </div>
                                <div className="flex items-center text-sm text-gray-300">
                                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                                    GDPR & CCPA Compliant
                                </div>
                                <div className="flex items-center text-sm text-gray-300">
                                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                                    Regular Security Audits
                                </div>
                            </div>
                        </div>

                        <div className="text-center">
                            <motion.div
                                className="grid grid-cols-2 gap-4"
                                animate={{
                                    scale: [1, 1.02, 1],
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                }}
                            >
                                {["🔐", "🛡️", "🔒", "🛡️"].map((icon, i) => (
                                    <motion.div
                                        key={i}
                                        className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 text-center"
                                        animate={{
                                            rotate: [0, 2, -2, 0],
                                        }}
                                        transition={{
                                            duration: 3,
                                            repeat: Infinity,
                                            delay: i * 0.5,
                                        }}
                                    >
                                        <div className="text-2xl">{icon}</div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                {/* Contact and Preferences */}
                <motion.div
                    variants={itemVariants}
                    className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/30 text-center"
                >
                    <div className="text-4xl mb-4">⚙️</div>
                    <h3 className="text-2xl font-bold mb-4 text-white">
                        Manage Your Privacy Settings
                    </h3>
                    <p className="text-gray-400 mb-6">
                        Update your privacy preferences, manage your data, or exercise your privacy rights through our user-friendly privacy center.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all"
                        >
                            Privacy Center
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-3 bg-gray-800/50 hover:bg-gray-700/50 text-white font-semibold rounded-xl transition-all border border-gray-600 hover:border-gray-500"
                        >
                            Contact Privacy Team
                        </motion.button>
                    </div>
                    <div className="mt-6 text-sm text-gray-500">
                        <p>For privacy inquiries: privacy@brokebro.com</p>
                    </div>
                </motion.div>

                {/* Navigation Links */}
                <motion.div
                    variants={itemVariants}
                    className="mt-16 text-center"
                >
                    <div className="flex flex-wrap gap-4 justify-center">
                        <motion.a
                            href="/terms-of-service"
                            whileHover={{ scale: 1.05 }}
                            className="px-6 py-3 bg-gray-800/50 hover:bg-gray-700/50 text-white rounded-xl transition-all border border-gray-600 hover:border-gray-500"
                        >
                            Terms of Service
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

export default PrivacyPolicyPage;
