"use client"

import React from 'react';
import { motion } from 'framer-motion';

const WarrantyPage = () => {
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

    const warrantyTypes = [
        {
            title: "Manufacturer Warranty",
            description: "Standard warranty provided by the original manufacturer",
            icon: "🏭",
            color: "from-blue-500 to-cyan-600",
            coverage: ["Defects in materials", "Manufacturing defects", "Normal wear exclusions", "Proof of purchase required"],
            duration: "1-3 years typically"
        },
        {
            title: "Extended Warranty",
            description: "Additional protection beyond manufacturer warranty",
            icon: "🛡️",
            color: "from-green-500 to-emerald-600",
            coverage: ["Extended coverage period", "Accidental damage", "Liquid damage", "Unlimited repairs"],
            duration: "1-4 additional years"
        },
        {
            title: "Student Protection Plan",
            description: "Special warranty program designed for students",
            icon: "🎓",
            color: "from-purple-500 to-pink-600",
            coverage: ["Theft protection", "Accidental damage", "Worldwide coverage", "Fast replacement"],
            duration: "Academic year coverage"
        },
        {
            title: "Premium Care",
            description: "Comprehensive protection with premium services",
            icon: "💎",
            color: "from-orange-500 to-red-600",
            coverage: ["24/7 tech support", "On-site repairs", "Data recovery", "Loaner devices"],
            duration: "Up to 5 years"
        }
    ];

    const warrantySteps = [
        {
            step: "1",
            title: "Purchase Registration",
            description: "Register your product within 30 days of purchase to activate warranty coverage."
        },
        {
            step: "2",
            title: "Issue Reporting",
            description: "Contact our support team or file a claim online when you experience an issue."
        },
        {
            step: "3",
            title: "Diagnosis & Assessment",
            description: "Our technicians will diagnose the problem and determine warranty coverage."
        },
        {
            step: "4",
            title: "Repair or Replacement",
            description: "We'll repair your device or provide a replacement based on warranty terms."
        }
    ];

    const commonQuestions = [
        {
            question: "What's covered under warranty?",
            answer: "Warranty typically covers manufacturing defects, hardware failures, and defective components. It does not cover physical damage, liquid damage, or software issues unless specified."
        },
        {
            question: "How do I check my warranty status?",
            answer: "You can check your warranty status by entering your product serial number on our warranty checker tool or by logging into your account."
        },
        {
            question: "What if my warranty has expired?",
            answer: "Even after warranty expiration, we offer repair services at competitive rates. You may also be eligible for trade-in programs or upgrade discounts."
        },
        {
            question: "Can I transfer my warranty?",
            answer: "Some warranties are transferable to new owners. Check your specific warranty terms or contact support for transfer procedures."
        }
    ];

    const supportChannels = [
        {
            title: "Online Support",
            description: "Submit warranty claims and track repair status online",
            icon: "💻",
            availability: "24/7"
        },
        {
            title: "Phone Support",
            description: "Speak directly with warranty specialists",
            icon: "📞",
            availability: "9 AM - 9 PM EST"
        },
        {
            title: "Live Chat",
            description: "Get instant help with warranty questions",
            icon: "💬",
            availability: "9 AM - 6 PM EST"
        },
        {
            title: "Email Support",
            description: "Detailed warranty assistance via email",
            icon: "📧",
            availability: "24-48h response"
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
                        🛡️
                    </motion.div>
                    <motion.h1
                        variants={itemVariants}
                        className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent"
                    >
                        Warranty Information
                    </motion.h1>
                    <motion.p
                        variants={itemVariants}
                        className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
                    >
                        Comprehensive warranty coverage and protection plans to keep your tech investments secure. Learn about our warranty types, claim processes, and support options.
                    </motion.p>
                </motion.div>

                {/* Warranty Types */}
                <motion.div
                    variants={containerVariants}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
                >
                    {warrantyTypes.map((warranty, index) => (
                        <motion.div
                            key={warranty.title}
                            variants={itemVariants}
                            whileHover={{ scale: 1.05, y: -5 }}
                            className={`p-6 rounded-2xl bg-gradient-to-br ${warranty.color} bg-opacity-10 border border-gray-800 backdrop-blur-sm hover:bg-opacity-20 transition-all cursor-pointer group`}
                        >
                            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                                {warranty.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-white">
                                {warranty.title}
                            </h3>
                            <p className="text-gray-400 text-sm mb-4">
                                {warranty.description}
                            </p>
                            <div className="mb-4">
                                <div className="text-xs text-green-400 font-bold mb-2">{warranty.duration}</div>
                                <div className="space-y-1">
                                    {warranty.coverage.slice(0, 3).map((item, i) => (
                                        <div key={i} className="text-xs text-gray-500 flex items-center">
                                            <div className="w-1 h-1 bg-green-500 rounded-full mr-2"></div>
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Warranty Process */}
                <motion.div
                    variants={containerVariants}
                    className="mb-16"
                >
                    <motion.h2
                        variants={itemVariants}
                        className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
                    >
                        How Warranty Claims Work
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {warrantySteps.map((step, index) => (
                            <motion.div
                                key={step.step}
                                variants={itemVariants}
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 text-center group relative"
                            >
                                <motion.div
                                    className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mb-4 mx-auto group-hover:scale-110 transition-transform"
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    {step.step}
                                </motion.div>
                                <h3 className="text-lg font-bold mb-3 text-white group-hover:text-blue-400 transition-colors">
                                    {step.title}
                                </h3>
                                <p className="text-gray-400 text-sm">
                                    {step.description}
                                </p>

                                {/* Connecting line */}
                                {index < warrantySteps.length - 1 && (
                                    <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 opacity-50"></div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Warranty Checker Tool */}
                <motion.div
                    variants={itemVariants}
                    className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/30 mb-16"
                >
                    <div className="text-center mb-8">
                        <div className="text-4xl mb-4">🔍</div>
                        <h3 className="text-2xl font-bold mb-4 text-white">
                            Check Your Warranty Status
                        </h3>
                        <p className="text-gray-400 mb-6">
                            Enter your product serial number or order number to check warranty coverage and claim history.
                        </p>
                    </div>

                    <div className="max-w-md mx-auto">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <input
                                type="text"
                                placeholder="Enter serial number or order ID"
                                className="flex-1 px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all"
                            >
                                Check Status
                            </motion.button>
                        </div>
                    </div>
                </motion.div>

                {/* Support Channels */}
                <motion.div
                    variants={containerVariants}
                    className="mb-16"
                >
                    <motion.h2
                        variants={itemVariants}
                        className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent"
                    >
                        Warranty Support Channels
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {supportChannels.map((channel, index) => (
                            <motion.div
                                key={channel.title}
                                variants={itemVariants}
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 hover:border-green-500/50 transition-all group text-center"
                            >
                                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                                    {channel.icon}
                                </div>
                                <h3 className="text-lg font-bold mb-2 text-white group-hover:text-green-400 transition-colors">
                                    {channel.title}
                                </h3>
                                <p className="text-gray-400 text-sm mb-3">
                                    {channel.description}
                                </p>
                                <div className="text-xs text-green-400 font-semibold">
                                    {channel.availability}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Common Questions */}
                <motion.div
                    variants={containerVariants}
                    className="mb-16"
                >
                    <motion.h2
                        variants={itemVariants}
                        className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"
                    >
                        Warranty FAQs
                    </motion.h2>

                    <div className="space-y-6">
                        {commonQuestions.map((faq, index) => (
                            <motion.div
                                key={faq.question}
                                variants={itemVariants}
                                whileHover={{ scale: 1.01, x: 5 }}
                                className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 hover:border-purple-500/50 transition-all group"
                            >
                                <h3 className="text-lg font-bold mb-3 text-white group-hover:text-purple-400 transition-colors">
                                    {faq.question}
                                </h3>
                                <p className="text-gray-400 leading-relaxed">
                                    {faq.answer}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Extended Warranty Offer */}
                <motion.div
                    variants={itemVariants}
                    className="bg-gradient-to-r from-green-900/50 to-blue-900/50 backdrop-blur-sm rounded-2xl p-8 border border-green-500/30 text-center"
                >
                    <div className="text-4xl mb-4">⭐</div>
                    <h3 className="text-2xl font-bold mb-4 text-white">
                        Upgrade to Extended Warranty
                    </h3>
                    <p className="text-gray-400 mb-6">
                        Get additional years of coverage, accidental damage protection, and priority support with our extended warranty plans.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center mb-6">
                        {["🛡️ Accidental Damage", "⚡ Fast Repairs", "🌍 Worldwide Coverage", "📞 Priority Support"].map((feature, i) => (
                            <div key={i} className="bg-gray-800/50 px-4 py-2 rounded-lg text-sm">
                                {feature}
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-3 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold rounded-xl transition-all"
                        >
                            View Plans
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-3 bg-gray-800/50 hover:bg-gray-700/50 text-white font-semibold rounded-xl transition-all border border-gray-600 hover:border-gray-500"
                        >
                            Learn More
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default WarrantyPage;
