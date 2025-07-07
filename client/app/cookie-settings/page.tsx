"use client"

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const CookieSettingsPage = () => {
    const [cookiePreferences, setCookiePreferences] = useState({
        essential: true, // Always enabled
        analytics: true,
        marketing: false,
        personalization: true,
        social: false
    });

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

    const cookieTypes = [
        {
            id: 'essential',
            title: 'Essential Cookies',
            description: 'These cookies are necessary for the website to function and cannot be switched off. They are usually only set in response to actions made by you.',
            icon: '🔒',
            required: true,
            examples: ['Authentication', 'Security', 'Form submissions', 'Shopping cart'],
            retention: 'Session/1 year'
        },
        {
            id: 'analytics',
            title: 'Analytics Cookies',
            description: 'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.',
            icon: '📊',
            required: false,
            examples: ['Google Analytics', 'Page views', 'User behavior', 'Performance metrics'],
            retention: '2 years'
        },
        {
            id: 'marketing',
            title: 'Marketing Cookies',
            description: 'These cookies track visitors across websites to display relevant advertisements and measure campaign effectiveness.',
            icon: '📢',
            required: false,
            examples: ['Ad targeting', 'Retargeting', 'Campaign tracking', 'Social media pixels'],
            retention: '1 year'
        },
        {
            id: 'personalization',
            title: 'Personalization Cookies',
            description: 'These cookies allow us to remember your preferences and provide customized content and features.',
            icon: '🎯',
            required: false,
            examples: ['Language preferences', 'Theme settings', 'Saved preferences', 'Recommended content'],
            retention: '1 year'
        },
        {
            id: 'social',
            title: 'Social Media Cookies',
            description: 'These cookies enable social media features and allow you to share content from our website.',
            icon: '📱',
            required: false,
            examples: ['Social sharing', 'Login with social', 'Embedded content', 'Social widgets'],
            retention: '1 year'
        }
    ];

    const handleCookieToggle = (cookieId: string) => {
        if (cookieId === 'essential') return; // Essential cookies cannot be disabled

        setCookiePreferences(prev => ({
            ...prev,
            [cookieId]: !prev[cookieId as keyof typeof prev]
        }));
    };

    const handleAcceptAll = () => {
        setCookiePreferences({
            essential: true,
            analytics: true,
            marketing: true,
            personalization: true,
            social: true
        });
    };

    const handleRejectAll = () => {
        setCookiePreferences({
            essential: true,
            analytics: false,
            marketing: false,
            personalization: false,
            social: false
        });
    };

    const handleSavePreferences = () => {
        // Here you would save the preferences to localStorage or send to server
        console.log('Saving cookie preferences:', cookiePreferences);
        // Show success message
    };

    const cookieInfo = [
        {
            title: 'What are cookies?',
            description: 'Cookies are small text files that are placed on your computer or mobile device when you visit a website.',
            icon: '🍪'
        },
        {
            title: 'Why do we use cookies?',
            description: 'We use cookies to improve your experience, remember your preferences, and analyze how our website is used.',
            icon: '❓'
        },
        {
            title: 'Managing cookies',
            description: 'You can control and delete cookies through your browser settings or using our cookie preference center.',
            icon: '⚙️'
        },
        {
            title: 'Third-party cookies',
            description: 'Some cookies are set by third-party services that appear on our pages, such as analytics or advertising services.',
            icon: '🤝'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden pt-20">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-20 blur-3xl bg-gradient-to-r from-orange-500 to-yellow-600"
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
                        🍪
                    </motion.div>
                    <motion.h1
                        variants={itemVariants}
                        className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-orange-400 via-yellow-500 to-orange-500 bg-clip-text text-transparent"
                    >
                        Cookie Settings
                    </motion.h1>
                    <motion.p
                        variants={itemVariants}
                        className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
                    >
                        Manage your cookie preferences and learn how we use cookies to improve your experience on BrokeBro.
                    </motion.p>
                </motion.div>

                {/* Cookie Information Cards */}
                <motion.div
                    variants={containerVariants}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
                >
                    {cookieInfo.map((info, index) => (
                        <motion.div
                            key={info.title}
                            variants={itemVariants}
                            whileHover={{ scale: 1.05, y: -5 }}
                            className="p-6 rounded-2xl bg-gray-900/50 border border-gray-800 backdrop-blur-sm hover:border-orange-500/50 transition-all group"
                        >
                            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                                {info.icon}
                            </div>
                            <h3 className="text-lg font-bold mb-2 text-white group-hover:text-orange-400 transition-colors">
                                {info.title}
                            </h3>
                            <p className="text-gray-400 text-sm">
                                {info.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Cookie Preferences */}
                <motion.div
                    variants={containerVariants}
                    className="mb-16"
                >
                    <motion.h2
                        variants={itemVariants}
                        className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent"
                    >
                        Customize Your Cookie Preferences
                    </motion.h2>

                    <div className="space-y-6">
                        {cookieTypes.map((cookie, index) => (
                            <motion.div
                                key={cookie.id}
                                variants={itemVariants}
                                whileHover={{ scale: 1.01, x: 5 }}
                                className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 hover:border-orange-500/30 transition-all group"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center space-x-4">
                                        <div className="text-3xl group-hover:scale-110 transition-transform">
                                            {cookie.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors">
                                                {cookie.title}
                                            </h3>
                                            {cookie.required && (
                                                <span className="text-xs bg-orange-500/20 text-orange-300 px-2 py-1 rounded-full font-medium">
                                                    Required
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <motion.label
                                        className="relative inline-flex items-center cursor-pointer"
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={cookiePreferences[cookie.id as keyof typeof cookiePreferences]}
                                            onChange={() => handleCookieToggle(cookie.id)}
                                            disabled={cookie.required}
                                            className="sr-only peer"
                                        />
                                        <div className={`relative w-11 h-6 rounded-full peer transition-colors ${cookiePreferences[cookie.id as keyof typeof cookiePreferences]
                                            ? 'bg-gradient-to-r from-orange-500 to-yellow-500'
                                            : 'bg-gray-600'
                                            } ${cookie.required ? 'opacity-50' : ''}`}>
                                            <div className={`absolute top-[2px] left-[2px] bg-white rounded-full h-5 w-5 transition-transform ${cookiePreferences[cookie.id as keyof typeof cookiePreferences] ? 'translate-x-5' : 'translate-x-0'
                                                }`}></div>
                                        </div>
                                    </motion.label>
                                </div>

                                <p className="text-gray-400 mb-4 leading-relaxed">
                                    {cookie.description}
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-300 mb-2">Examples:</h4>
                                        <div className="space-y-1">
                                            {cookie.examples.map((example, i) => (
                                                <div key={i} className="flex items-center text-xs text-gray-500">
                                                    <div className="w-1 h-1 bg-orange-500 rounded-full mr-2"></div>
                                                    {example}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-300 mb-2">Retention:</h4>
                                        <div className="text-xs text-orange-400 font-medium">
                                            {cookie.retention}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                    variants={itemVariants}
                    className="bg-gradient-to-r from-orange-900/50 to-yellow-900/50 backdrop-blur-sm rounded-2xl p-8 border border-orange-500/30 text-center mb-16"
                >
                    <div className="text-4xl mb-4">⚙️</div>
                    <h3 className="text-2xl font-bold mb-4 text-white">
                        Save Your Preferences
                    </h3>
                    <p className="text-gray-400 mb-6">
                        Choose how you want to manage cookies on BrokeBro. Your preferences will be saved and applied across all pages.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <motion.button
                            onClick={handleAcceptAll}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all"
                        >
                            Accept All Cookies
                        </motion.button>

                        <motion.button
                            onClick={handleSavePreferences}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-3 bg-gradient-to-r from-orange-500 to-yellow-600 hover:from-orange-600 hover:to-yellow-700 text-white font-semibold rounded-xl transition-all"
                        >
                            Save Preferences
                        </motion.button>

                        <motion.button
                            onClick={handleRejectAll}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-3 bg-gray-800/50 hover:bg-gray-700/50 text-white font-semibold rounded-xl transition-all border border-gray-600 hover:border-gray-500"
                        >
                            Reject All (except essential)
                        </motion.button>
                    </div>
                </motion.div>

                {/* Browser Settings */}
                <motion.div
                    variants={itemVariants}
                    className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/30"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div>
                            <div className="text-4xl mb-4">🌐</div>
                            <h3 className="text-2xl font-bold mb-4 text-white">
                                Browser Cookie Settings
                            </h3>
                            <p className="text-gray-400 mb-6">
                                You can also manage cookies directly through your browser settings. Most browsers allow you to block or delete cookies.
                            </p>
                            <div className="space-y-3">
                                <div className="flex items-center text-sm text-gray-300">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                                    Chrome: Settings → Privacy & Security → Cookies
                                </div>
                                <div className="flex items-center text-sm text-gray-300">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                                    Firefox: Settings → Privacy & Security
                                </div>
                                <div className="flex items-center text-sm text-gray-300">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                                    Safari: Preferences → Privacy
                                </div>
                                <div className="flex items-center text-sm text-gray-300">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                                    Edge: Settings → Cookies and site permissions
                                </div>
                            </div>
                        </div>

                        <div className="text-center">
                            <motion.div
                                className="bg-gray-800/50 rounded-xl p-6"
                                animate={{
                                    scale: [1, 1.02, 1],
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                }}
                            >
                                <div className="text-6xl mb-4">🛠️</div>
                                <h4 className="text-lg font-bold text-white mb-2">Need Help?</h4>
                                <p className="text-gray-400 text-sm mb-4">
                                    Contact our support team if you need assistance with cookie settings.
                                </p>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all text-sm"
                                >
                                    Get Help
                                </motion.button>
                            </motion.div>
                        </div>
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
                            href="/terms-of-service"
                            whileHover={{ scale: 1.05 }}
                            className="px-6 py-3 bg-gray-800/50 hover:bg-gray-700/50 text-white rounded-xl transition-all border border-gray-600 hover:border-gray-500"
                        >
                            Terms of Service
                        </motion.a>
                        <motion.a
                            href="/faq"
                            whileHover={{ scale: 1.05 }}
                            className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl transition-all"
                        >
                            FAQ
                        </motion.a>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default CookieSettingsPage;
