"use client"

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const SitemapPage = () => {
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

    const sitemapSections = [
        {
            title: "Main Pages",
            icon: "🏠",
            color: "from-blue-500 to-cyan-600",
            links: [
                { name: "Home", url: "/", description: "Welcome to BrokeBro" },
                { name: "Dashboard", url: "/dashboard", description: "Your personalized dashboard" },
                { name: "Events", url: "/events", description: "Upcoming tech events" },
                { name: "Internships", url: "/internships", description: "Find your perfect internship" }
            ]
        },
        {
            title: "Shop Categories",
            icon: "🛍️",
            color: "from-green-500 to-emerald-600",
            links: [
                { name: "Laptops", url: "/laptops", description: "Premium laptops for students" },
                { name: "Gaming", url: "/gaming", description: "Gaming laptops and accessories" },
                { name: "Accessories", url: "/accessories", description: "Tech accessories and peripherals" },
                { name: "Monitors", url: "/monitors", description: "High-quality displays" },
                { name: "Tablets", url: "/tablets", description: "iPads and Android tablets" },
                { name: "Special Deals", url: "/special-deals", description: "Limited-time offers" }
            ]
        },
        {
            title: "Category Pages",
            icon: "📂",
            color: "from-purple-500 to-pink-600",
            links: [
                { name: "Technology", url: "/technology", description: "Latest tech trends" },
                { name: "Fashion", url: "/fashion", description: "Student fashion deals" },
                { name: "Lifestyle", url: "/lifestyle", description: "Lifestyle products" },
                { name: "Intern Resources", url: "/intern", description: "Internship resources" }
            ]
        },
        {
            title: "User Account",
            icon: "👤",
            color: "from-orange-500 to-red-600",
            links: [
                { name: "Profile", url: "/profile", description: "Manage your profile" },
                { name: "Favourites", url: "/favourites", description: "Your saved items" },
                { name: "Settings", url: "/settings", description: "Account settings" }
            ]
        },
        {
            title: "Authentication",
            icon: "🔐",
            color: "from-indigo-500 to-purple-600",
            links: [
                { name: "Login", url: "/login", description: "Sign in to your account" },
                { name: "Sign Up", url: "/signup", description: "Create a new account" },
                { name: "Reset Password", url: "/reset-password", description: "Reset your password" },
                { name: "Verification Success", url: "/verification-success", description: "Email verification" }
            ]
        },
        {
            title: "Company",
            icon: "🏢",
            color: "from-teal-500 to-cyan-600",
            links: [
                { name: "About Us", url: "/about", description: "Learn about BrokeBro" },
                { name: "Careers", url: "/careers", description: "Join our team" },
                { name: "Blog", url: "/blog", description: "Tech news and insights" },
                { name: "Press", url: "/press", description: "Media resources" },
                { name: "Student Verification", url: "/student-verification", description: "Verify student status" }
            ]
        },
        {
            title: "Support & Help",
            icon: "❓",
            color: "from-yellow-500 to-orange-600",
            links: [
                { name: "FAQ", url: "/faq", description: "Frequently asked questions" },
                { name: "Shipping Info", url: "/shipping", description: "Shipping information" },
                { name: "Returns & Refunds", url: "/returns", description: "Return policy" },
                { name: "Warranty", url: "/warranty", description: "Warranty information" }
            ]
        },
        {
            title: "Legal",
            icon: "⚖️",
            color: "from-gray-500 to-gray-600",
            links: [
                { name: "Terms of Service", url: "/terms-of-service", description: "Terms and conditions" },
                { name: "Privacy Policy", url: "/privacy-policy", description: "Privacy information" },
                { name: "Cookie Settings", url: "/cookie-settings", description: "Manage cookies" }
            ]
        },
        {
            title: "Tools & Resources",
            icon: "🛠️",
            color: "from-rose-500 to-pink-600",
            links: [
                { name: "Resume Builder", url: "/resume-builder", description: "Build your resume" },
                { name: "Resume Templates", url: "/resume-builder/templates", description: "Resume templates" },
                { name: "Generate Resume", url: "/resume-builder/generate", description: "AI resume generation" }
            ]
        }
    ];

    const quickStats = [
        { number: "50+", label: "Total Pages" },
        { number: "9", label: "Main Categories" },
        { number: "25+", label: "Product Pages" },
        { number: "10+", label: "Support Pages" }
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
                        🗺️
                    </motion.div>
                    <motion.h1
                        variants={itemVariants}
                        className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
                    >
                        Sitemap
                    </motion.h1>
                    <motion.p
                        variants={itemVariants}
                        className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
                    >
                        Navigate through all pages and sections of BrokeBro. Find exactly what you're looking for with our comprehensive site structure.
                    </motion.p>
                </motion.div>

                {/* Quick Stats */}
                <motion.div
                    variants={containerVariants}
                    className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
                >
                    {quickStats.map((stat, index) => (
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

                {/* Sitemap Sections */}
                <motion.div
                    variants={containerVariants}
                    className="space-y-12"
                >
                    {sitemapSections.map((section, sectionIndex) => (
                        <motion.div
                            key={section.title}
                            variants={itemVariants}
                            className="bg-gray-900/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-800"
                        >
                            <div className="flex items-center mb-6">
                                <motion.div
                                    className={`w-12 h-12 rounded-full bg-gradient-to-r ${section.color} flex items-center justify-center text-2xl mr-4`}
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                >
                                    {section.icon}
                                </motion.div>
                                <h2 className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${section.color} bg-clip-text text-transparent`}>
                                    {section.title}
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {section.links.map((link, linkIndex) => (
                                    <motion.div
                                        key={link.name}
                                        whileHover={{ scale: 1.02, x: 5 }}
                                        className="group"
                                    >
                                        <Link
                                            href={link.url}
                                            className="block p-4 bg-gray-800/30 hover:bg-gray-800/50 rounded-xl border border-gray-700/50 hover:border-gray-600 transition-all"
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors">
                                                    {link.name}
                                                </h3>
                                                <motion.span
                                                    className="text-gray-500 group-hover:text-blue-400 transition-colors"
                                                    animate={{ x: [0, 3, 0] }}
                                                    transition={{ duration: 1.5, repeat: Infinity, delay: linkIndex * 0.1 }}
                                                >
                                                    →
                                                </motion.span>
                                            </div>
                                            <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                                                {link.description}
                                            </p>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Search Sitemap */}
                <motion.div
                    variants={itemVariants}
                    className="mt-16 bg-gradient-to-r from-blue-900/50 to-purple-900/50 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/30 text-center"
                >
                    <div className="text-4xl mb-4">🔍</div>
                    <h3 className="text-2xl font-bold mb-4 text-white">
                        Can't Find What You're Looking For?
                    </h3>
                    <p className="text-gray-400 mb-6">
                        Use our search functionality or contact support to help you navigate to the right page.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <input
                            type="text"
                            placeholder="Search pages..."
                            className="flex-1 px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all"
                        >
                            Search
                        </motion.button>
                    </div>
                </motion.div>

                {/* Navigation Help */}
                <motion.div
                    variants={itemVariants}
                    className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 text-center">
                        <div className="text-3xl mb-3">📞</div>
                        <h4 className="font-bold text-white mb-2">Need Help?</h4>
                        <p className="text-gray-400 text-sm mb-4">Contact our support team for assistance</p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all text-sm"
                        >
                            Contact Support
                        </motion.button>
                    </div>

                    <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 text-center">
                        <div className="text-3xl mb-3">📚</div>
                        <h4 className="font-bold text-white mb-2">User Guide</h4>
                        <p className="text-gray-400 text-sm mb-4">Learn how to navigate our platform</p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all text-sm"
                        >
                            View Guide
                        </motion.button>
                    </div>

                    <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 text-center">
                        <div className="text-3xl mb-3">❓</div>
                        <h4 className="font-bold text-white mb-2">FAQ</h4>
                        <p className="text-gray-400 text-sm mb-4">Find answers to common questions</p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all text-sm"
                        >
                            <Link href="/faq">View FAQ</Link>
                        </motion.button>
                    </div>
                </motion.div>

                {/* Footer Note */}
                <motion.div
                    variants={itemVariants}
                    className="mt-16 text-center text-gray-500 text-sm"
                >
                    <p>Last updated: December 2024 | This sitemap is automatically updated as we add new pages</p>
                </motion.div>
            </div>
        </div>
    );
};

export default SitemapPage;
