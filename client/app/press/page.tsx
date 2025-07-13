"use client"

import React from 'react';
import { motion } from 'framer-motion';

const PressPage = () => {
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

    const pressReleases = [
        {
            date: "January 2025",
            title: "BrokeBro Announces National Student Hackathon 2025",
            excerpt: "India's first student discount platform launches nationwide hackathon with ₹5 lakh prize pool, focusing on innovative solutions for student financial wellness.",
            category: "Event Announcement",
            readTime: "3 min read"
        },
        {
            date: "January 2025",
            title: "Save More Campaign: 100K+ Students Save Big",
            excerpt: "BrokeBro's latest campaign helps over 100,000 verified students save collectively on tech products through exclusive partnerships with 20+ brands.",
            category: "Campaign Launch",
            readTime: "2 min read"
        },

    ];



    const stats = [
        { number: "1K+", label: "Verified Students" },
        { number: "₹1L+", label: "Student Savings" },
        { number: "20+", label: "Brand Partners" },
        { number: "100%", label: "Satisfaction Rate" }
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
                        📰
                    </motion.div>
                    <motion.h1
                        variants={itemVariants}
                        className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
                    >
                        Press & Media
                    </motion.h1>
                    <motion.p
                        variants={itemVariants}
                        className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
                    >
                        India's first trusted platform for seamless student discounts. Stay updated with BrokeBro's latest news, events, hackathons, and exciting campaigns.
                    </motion.p>
                </motion.div>

                {/* Key Statistics */}
                <motion.div
                    variants={containerVariants}
                    className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            variants={itemVariants}
                            whileHover={{ scale: 1.05, y: -5 }}
                            className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 text-center group"
                        >
                            <motion.div
                                className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
                            >
                                {stat.number}
                            </motion.div>
                            <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Latest Press Releases */}
                <motion.div
                    variants={containerVariants}
                    className="mb-16"
                >
                    <motion.h2
                        variants={itemVariants}
                        className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
                    >
                        Latest News & Notifications
                    </motion.h2>

                    <div className="space-y-6">
                        {pressReleases.map((release, index) => (
                            <motion.div
                                key={release.title}
                                variants={itemVariants}
                                whileHover={{ scale: 1.02, x: 5 }}
                                className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 hover:border-blue-500/50 transition-all group"
                            >
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                                    <div className="flex items-center space-x-4 mb-2 md:mb-0">
                                        <span className="text-sm text-blue-400 font-semibold">{release.date}</span>
                                        <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-medium">
                                            {release.category}
                                        </span>
                                    </div>
                                    <span className="text-sm text-gray-500">{release.readTime}</span>
                                </div>

                                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors">
                                    {release.title}
                                </h3>

                                <p className="text-gray-400 leading-relaxed mb-4">
                                    {release.excerpt}
                                </p>

                                <motion.button
                                    whileHover={{ scale: 1.05, x: 5 }}
                                    className="text-blue-400 hover:text-blue-300 font-semibold text-sm flex items-center transition-colors"
                                >
                                    Read Full Release
                                    <motion.span
                                        className="ml-2"
                                        animate={{ x: [0, 5, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    >
                                        →
                                    </motion.span>
                                </motion.button>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Media Kit */}
                <motion.div
                    variants={containerVariants}
                    className="mb-16"
                >
                    <motion.h2
                        variants={itemVariants}
                        className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"
                    >
                        Media Kit & Resources
                    </motion.h2>

                </motion.div>

                {/* Media Contact */}
                <motion.div
                    variants={itemVariants}
                    className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/30"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div>
                            <div className="text-4xl mb-4">📞</div>
                            <h3 className="text-2xl font-bold mb-4 text-white">
                                Media Inquiries
                            </h3>
                            <p className="text-gray-400 mb-6">
                                For press inquiries, interview requests, or additional information, please contact our media relations team.
                            </p>
                            <div className="space-y-3">
                                <div className="flex items-center text-gray-300">
                                    <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center mr-3">
                                        <span className="text-xs">📧</span>
                                    </div>
                                    <span>brokebroindia@gmail.com</span>
                                </div>
                                <div className="flex items-center text-gray-300">
                                    <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center mr-3">
                                        <span className="text-xs">📱</span>
                                    </div>
                                    <span>+91 7669955109</span>
                                </div>
                                <div className="flex items-center text-gray-300">
                                    <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center mr-3">
                                        <span className="text-xs">⏰</span>
                                    </div>
                                    <span>9 AM - 6 PM IST, Mon-Fri</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-800/50 rounded-xl p-6">
                            <h4 className="text-lg font-bold mb-4 text-white">Quick Facts</h4>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Founded:</span>
                                    <span className="text-white">2025</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Headquarters:</span>
                                    <span className="text-white">ITO, Delhi</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Founder:</span>
                                    <span className="text-white">Tanuj Varshney</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Co-Founder:</span>
                                    <span className="text-white">Mohit Luthra</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Staff Size:</span>
                                    <span className="text-white">10</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Specialty:</span>
                                    <span className="text-white">Student Discounts</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

        </div>
    );
};

export default PressPage;
