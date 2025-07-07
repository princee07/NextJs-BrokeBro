"use client"

import React from 'react';
import { motion } from 'framer-motion';

const MonitorsPage = () => {
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

    const monitorCategories = [
        {
            title: "Gaming Monitors",
            description: "High refresh rate displays for competitive gaming",
            icon: "🎮",
            color: "from-red-500 to-orange-600",
            specs: ["144Hz+", "1ms Response", "G-Sync/FreeSync", "Curved"]
        },
        {
            title: "4K Monitors",
            description: "Ultra-high resolution for professional work",
            icon: "🖥️",
            color: "from-blue-500 to-cyan-600",
            specs: ["3840x2160", "HDR Support", "Color Accurate", "Large Screen"]
        },
        {
            title: "Ultrawide",
            description: "Immersive widescreen experience",
            icon: "📺",
            color: "from-purple-500 to-pink-600",
            specs: ["21:9 Ratio", "34\"+", "Multitasking", "Cinematic"]
        },
        {
            title: "Portable",
            description: "Compact monitors for on-the-go productivity",
            icon: "📱",
            color: "from-green-500 to-emerald-600",
            specs: ["USB-C", "Lightweight", "Battery", "Touch"]
        }
    ];

    const featuredMonitors = [
        {
            name: "ROG Swift PG279QM",
            brand: "ASUS",
            price: "$599",
            originalPrice: "$799",
            discount: "25%",
            image: "🖥️",
            size: "27\"",
            resolution: "2560x1440",
            refreshRate: "240Hz",
            panel: "IPS",
            features: ["G-Sync", "HDR400", "1ms Response", "165% sRGB"]
        },
        {
            name: "LG 27UP850-W",
            brand: "LG",
            price: "$399",
            originalPrice: "$549",
            discount: "27%",
            image: "💻",
            size: "27\"",
            resolution: "3840x2160",
            refreshRate: "60Hz",
            panel: "IPS",
            features: ["4K UHD", "HDR400", "USB-C 90W", "99% sRGB"]
        },
        {
            name: "Samsung Odyssey G7",
            brand: "Samsung",
            price: "$499",
            originalPrice: "$699",
            discount: "29%",
            image: "🎯",
            size: "32\"",
            resolution: "2560x1440",
            refreshRate: "240Hz",
            panel: "VA",
            features: ["1000R Curve", "G-Sync", "HDR600", "1ms Response"]
        }
    ];

    const monitorSpecs = [
        { name: "Screen Size", options: ["24\"", "27\"", "32\"", "34\"+"] },
        { name: "Resolution", options: ["1080p", "1440p", "4K", "Ultrawide"] },
        { name: "Refresh Rate", options: ["60Hz", "144Hz", "240Hz", "360Hz"] },
        { name: "Panel Type", options: ["IPS", "VA", "TN", "OLED"] }
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
                        🖥️
                    </motion.div>
                    <motion.h1
                        variants={itemVariants}
                        className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
                    >
                        Monitors
                    </motion.h1>
                    <motion.p
                        variants={itemVariants}
                        className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
                    >
                        Upgrade your visual experience with premium monitors - from 4K displays to high-refresh gaming screens, all with exclusive student pricing.
                    </motion.p>
                </motion.div>

                {/* Monitor Categories */}
                <motion.div
                    variants={containerVariants}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
                >
                    {monitorCategories.map((category, index) => (
                        <motion.div
                            key={category.title}
                            variants={itemVariants}
                            whileHover={{ scale: 1.05, y: -5 }}
                            className={`p-6 rounded-2xl bg-gradient-to-br ${category.color} bg-opacity-10 border border-gray-800 backdrop-blur-sm hover:bg-opacity-20 transition-all cursor-pointer group`}
                        >
                            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                                {category.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-white">
                                {category.title}
                            </h3>
                            <p className="text-gray-400 text-sm mb-4">
                                {category.description}
                            </p>
                            <div className="space-y-1">
                                {category.specs.map((spec, i) => (
                                    <div key={i} className="text-xs text-gray-500 flex items-center">
                                        <div className="w-1 h-1 bg-blue-500 rounded-full mr-2"></div>
                                        {spec}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Monitor Specifications Filters */}
                <motion.div
                    variants={containerVariants}
                    className="mb-16"
                >
                    <motion.h2
                        variants={itemVariants}
                        className="text-2xl md:text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
                    >
                        Find Your Perfect Monitor
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {monitorSpecs.map((spec, index) => (
                            <motion.div
                                key={spec.name}
                                variants={itemVariants}
                                className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-800"
                            >
                                <h3 className="text-lg font-bold mb-3 text-white">{spec.name}</h3>
                                <div className="space-y-2">
                                    {spec.options.map((option, i) => (
                                        <motion.button
                                            key={option}
                                            whileHover={{ scale: 1.02, x: 5 }}
                                            className="w-full text-left px-3 py-2 bg-gray-800/50 rounded-lg text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 transition-all text-sm"
                                        >
                                            {option}
                                        </motion.button>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Featured Monitors */}
                <motion.div
                    variants={containerVariants}
                    className="mb-16"
                >
                    <motion.h2
                        variants={itemVariants}
                        className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
                    >
                        Featured Gaming Monitors
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredMonitors.map((monitor, index) => (
                            <motion.div
                                key={monitor.name}
                                variants={itemVariants}
                                whileHover={{ scale: 1.02, y: -5 }}
                                className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 hover:border-blue-500/50 transition-all group"
                            >
                                <div className="relative mb-6">
                                    <div className="text-6xl text-center mb-4 group-hover:scale-110 transition-transform">
                                        {monitor.image}
                                    </div>
                                    <div className="absolute top-0 right-0 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                                        -{monitor.discount}
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-blue-400 transition-colors">
                                    {monitor.name}
                                </h3>
                                <p className="text-gray-400 mb-4">{monitor.brand}</p>

                                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                                    <div>
                                        <span className="text-gray-500">Size:</span>
                                        <span className="text-white ml-2">{monitor.size}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Panel:</span>
                                        <span className="text-white ml-2">{monitor.panel}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Resolution:</span>
                                        <span className="text-white ml-2">{monitor.resolution}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Refresh:</span>
                                        <span className="text-white ml-2">{monitor.refreshRate}</span>
                                    </div>
                                </div>

                                <div className="flex items-center mb-4">
                                    <span className="text-2xl font-bold text-green-400">{monitor.price}</span>
                                    <span className="text-gray-500 line-through ml-2">{monitor.originalPrice}</span>
                                </div>

                                <div className="space-y-2 mb-6">
                                    {monitor.features.map((feature, i) => (
                                        <div key={i} className="flex items-center text-sm text-gray-400">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                                            {feature}
                                        </div>
                                    ))}
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all"
                                >
                                    View Details
                                </motion.button>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Monitor Setup Guide */}
                <motion.div
                    variants={itemVariants}
                    className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/30 mb-16"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div>
                            <div className="text-4xl mb-4">🎯</div>
                            <h3 className="text-2xl font-bold mb-4 text-white">
                                Perfect Monitor Setup Guide
                            </h3>
                            <p className="text-gray-400 mb-6">
                                Not sure which monitor is right for you? Our expert guide helps you choose based on your specific needs and budget.
                            </p>
                            <div className="space-y-3">
                                <div className="flex items-center text-sm text-gray-300">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                                    Gaming vs Professional Use Cases
                                </div>
                                <div className="flex items-center text-sm text-gray-300">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                                    Size and Resolution Recommendations
                                </div>
                                <div className="flex items-center text-sm text-gray-300">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                                    Multi-Monitor Setup Tips
                                </div>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="mt-6 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all"
                            >
                                Get Setup Guide
                            </motion.button>
                        </div>

                        <div className="relative">
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
                                {["🎮", "💼", "🎨", "📊"].map((icon, i) => (
                                    <motion.div
                                        key={i}
                                        className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 text-center"
                                        animate={{
                                            rotate: [0, 2, -2, 0],
                                        }}
                                        transition={{
                                            duration: 3,
                                            repeat: Infinity,
                                            delay: i * 0.5,
                                        }}
                                    >
                                        <div className="text-3xl mb-2">{icon}</div>
                                        <div className="text-xs text-gray-400">
                                            {["Gaming", "Work", "Creative", "Data"][i]}
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                {/* Student Discount Banner */}
                <motion.div
                    variants={itemVariants}
                    className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/30 text-center"
                >
                    <div className="text-4xl mb-4">🎓</div>
                    <h3 className="text-2xl font-bold mb-4 text-white">
                        Student Monitor Deals
                    </h3>
                    <p className="text-gray-400 mb-6">
                        Get verified as a student and unlock exclusive monitor discounts up to 30% off retail prices!
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold rounded-xl transition-all"
                    >
                        Verify Student Status
                    </motion.button>
                </motion.div>
            </div>
        </div>
    );
};

export default MonitorsPage;
