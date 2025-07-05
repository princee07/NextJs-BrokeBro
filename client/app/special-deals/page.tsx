"use client"

import React from 'react';
import { motion } from 'framer-motion';

const SpecialDealsPage = () => {
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

    const dealCategories = [
        {
            title: "Flash Sales",
            description: "Limited-time offers on premium tech",
            icon: "⚡",
            color: "from-yellow-500 to-orange-600",
            timeLeft: "2h 45m",
            savings: "Up to 60% off"
        },
        {
            title: "Bundle Deals",
            description: "Complete setups at unbeatable prices",
            icon: "📦",
            color: "from-blue-500 to-cyan-600",
            timeLeft: "3 days",
            savings: "Save $200+"
        },
        {
            title: "Student Exclusive",
            description: "Extra discounts for verified students",
            icon: "🎓",
            color: "from-purple-500 to-pink-600",
            timeLeft: "Always",
            savings: "Extra 15% off"
        },
        {
            title: "Clearance",
            description: "Last chance on previous gen products",
            icon: "🏷️",
            color: "from-red-500 to-pink-600",
            timeLeft: "While stocks last",
            savings: "Up to 70% off"
        }
    ];

    const flashDeals = [
        {
            name: "MacBook Air M2",
            originalPrice: "$1,199",
            dealPrice: "$899",
            discount: "25%",
            timeLeft: "2:45:32",
            image: "💻",
            sold: 47,
            total: 100,
            category: "Laptops"
        },
        {
            name: "AirPods Pro 2",
            originalPrice: "$249",
            dealPrice: "$179",
            discount: "28%",
            timeLeft: "2:45:32",
            image: "🎧",
            sold: 83,
            total: 150,
            category: "Audio"
        },
        {
            name: "iPad Pro 11\"",
            originalPrice: "$799",
            dealPrice: "$599",
            discount: "25%",
            timeLeft: "2:45:32",
            image: "📱",
            sold: 31,
            total: 75,
            category: "Tablets"
        },
        {
            name: "Gaming Monitor 27\"",
            originalPrice: "$399",
            dealPrice: "$249",
            discount: "38%",
            timeLeft: "2:45:32",
            image: "🖥️",
            sold: 22,
            total: 50,
            category: "Monitors"
        }
    ];

    const bundleDeals = [
        {
            name: "Complete Gaming Setup",
            items: ["Gaming Laptop", "Gaming Mouse", "Headset", "Mousepad"],
            originalPrice: "$1,599",
            bundlePrice: "$1,199",
            savings: "$400",
            image: "🎮"
        },
        {
            name: "Student Productivity Pack",
            items: ["Laptop", "Wireless Mouse", "Keyboard", "Laptop Stand"],
            originalPrice: "$899",
            bundlePrice: "$649",
            savings: "$250",
            image: "📚"
        },
        {
            name: "Creative Professional Kit",
            items: ["iPad Pro", "Apple Pencil", "Magic Keyboard", "USB-C Hub"],
            originalPrice: "$1,299",
            bundlePrice: "$999",
            savings: "$300",
            image: "🎨"
        }
    ];

    const exclusiveOffers = [
        {
            title: "First-Time Buyer",
            description: "Extra 10% off your first order",
            code: "WELCOME10",
            icon: "🎉"
        },
        {
            title: "Newsletter Subscriber",
            description: "5% off + early access to deals",
            code: "NEWSLETTER5",
            icon: "📧"
        },
        {
            title: "Student Verification",
            description: "Permanent 15% student discount",
            code: "STUDENT15",
            icon: "🎓"
        },
        {
            title: "Referral Bonus",
            description: "$25 credit for each referral",
            code: "REFER25",
            icon: "👥"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden pt-20">
            {/* Enhanced Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-20 blur-3xl bg-gradient-to-r from-yellow-500 to-orange-600"
                    animate={{
                        scale: [1, 1.3, 1],
                        rotate: [0, 360],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
                <motion.div
                    className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-20 blur-3xl bg-gradient-to-r from-purple-600 to-pink-600"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        rotate: [360, 0],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />

                {/* Deal particles */}
                {[...Array(25)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-yellow-400/30"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            fontSize: `${12 + Math.random() * 8}px`,
                        }}
                        animate={{
                            y: [-20, -80, -20],
                            opacity: [0, 0.7, 0],
                            rotate: [0, 360],
                        }}
                        transition={{
                            duration: 4 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    >
                        {["💰", "⚡", "🔥", "💎", "🎯"][Math.floor(Math.random() * 5)]}
                    </motion.div>
                ))}
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
                        <motion.span
                            animate={{
                                scale: [1, 1.2, 1],
                                textShadow: [
                                    "0 0 20px #fbbf24",
                                    "0 0 40px #fbbf24, 0 0 60px #fbbf24",
                                    "0 0 20px #fbbf24",
                                ],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                            }}
                        >
                            🔥
                        </motion.span>
                    </motion.div>
                    <motion.h1
                        variants={itemVariants}
                        className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent"
                    >
                        Special Deals
                    </motion.h1>
                    <motion.p
                        variants={itemVariants}
                        className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
                    >
                        Unbeatable offers on premium tech products - flash sales, bundle deals, and exclusive student discounts all in one place!
                    </motion.p>
                </motion.div>

                {/* Deal Categories */}
                <motion.div
                    variants={containerVariants}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
                >
                    {dealCategories.map((category, index) => (
                        <motion.div
                            key={category.title}
                            variants={itemVariants}
                            whileHover={{ scale: 1.05, y: -5 }}
                            className={`p-6 rounded-2xl bg-gradient-to-br ${category.color} bg-opacity-10 border border-gray-800 backdrop-blur-sm hover:bg-opacity-20 transition-all cursor-pointer group relative overflow-hidden`}
                        >
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
                                animate={{
                                    background: [
                                        "linear-gradient(45deg, rgba(251, 191, 36, 0.1), rgba(249, 115, 22, 0.1))",
                                        "linear-gradient(45deg, rgba(249, 115, 22, 0.1), rgba(239, 68, 68, 0.1))",
                                        "linear-gradient(45deg, rgba(251, 191, 36, 0.1), rgba(249, 115, 22, 0.1))",
                                    ],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                }}
                            />
                            <div className="relative z-10">
                                <motion.div
                                    className="text-4xl mb-4"
                                    animate={{
                                        rotate: [0, 10, -10, 0],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                    }}
                                >
                                    {category.icon}
                                </motion.div>
                                <h3 className="text-xl font-bold mb-2 text-white">
                                    {category.title}
                                </h3>
                                <p className="text-gray-400 text-sm mb-3">
                                    {category.description}
                                </p>
                                <div className="space-y-1">
                                    <div className="text-xs text-yellow-400 font-bold">
                                        {category.savings}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        {category.timeLeft}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Flash Sales */}
                <motion.div
                    variants={containerVariants}
                    className="mb-16"
                >
                    <motion.div
                        variants={itemVariants}
                        className="flex items-center justify-center mb-8"
                    >
                        <motion.div
                            className="text-3xl mr-4"
                            animate={{
                                scale: [1, 1.2, 1],
                            }}
                            transition={{
                                duration: 1,
                                repeat: Infinity,
                            }}
                        >
                            ⚡
                        </motion.div>
                        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                            Flash Sales - Ending Soon!
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {flashDeals.map((deal, index) => (
                            <motion.div
                                key={deal.name}
                                variants={itemVariants}
                                whileHover={{ scale: 1.02, y: -5 }}
                                className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 hover:border-yellow-500/50 transition-all group relative overflow-hidden"
                            >
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity"
                                />

                                <div className="relative z-10">
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full font-bold">
                                            {deal.discount} OFF
                                        </span>
                                        <motion.div
                                            className="text-xs bg-gray-800/80 text-yellow-400 px-2 py-1 rounded-full font-mono"
                                            animate={{
                                                backgroundColor: ["rgba(31, 41, 55, 0.8)", "rgba(220, 38, 38, 0.8)", "rgba(31, 41, 55, 0.8)"],
                                            }}
                                            transition={{
                                                duration: 1,
                                                repeat: Infinity,
                                            }}
                                        >
                                            {deal.timeLeft}
                                        </motion.div>
                                    </div>

                                    <div className="text-4xl text-center mb-4 group-hover:scale-110 transition-transform">
                                        {deal.image}
                                    </div>

                                    <h3 className="text-lg font-bold mb-2 text-white group-hover:text-yellow-400 transition-colors">
                                        {deal.name}
                                    </h3>
                                    <p className="text-gray-400 text-sm mb-3">{deal.category}</p>

                                    <div className="flex items-center mb-4">
                                        <span className="text-2xl font-bold text-green-400">{deal.dealPrice}</span>
                                        <span className="text-gray-500 line-through ml-2">{deal.originalPrice}</span>
                                    </div>

                                    <div className="mb-4">
                                        <div className="flex justify-between text-xs text-gray-400 mb-1">
                                            <span>Sold: {deal.sold}/{deal.total}</span>
                                            <span>{Math.round((deal.sold / deal.total) * 100)}%</span>
                                        </div>
                                        <div className="w-full bg-gray-700 rounded-full h-2">
                                            <motion.div
                                                className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full"
                                                initial={{ width: 0 }}
                                                animate={{ width: `${(deal.sold / deal.total) * 100}%` }}
                                                transition={{ duration: 1.5, delay: index * 0.2 }}
                                            />
                                        </div>
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-full py-2 bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white font-semibold rounded-xl transition-all"
                                    >
                                        Grab Deal
                                    </motion.button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Bundle Deals */}
                <motion.div
                    variants={containerVariants}
                    className="mb-16"
                >
                    <motion.h2
                        variants={itemVariants}
                        className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent"
                    >
                        📦 Bundle Deals - Save More Together
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {bundleDeals.map((bundle, index) => (
                            <motion.div
                                key={bundle.name}
                                variants={itemVariants}
                                whileHover={{ scale: 1.02, y: -5 }}
                                className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 hover:border-blue-500/50 transition-all group"
                            >
                                <div className="text-5xl text-center mb-4 group-hover:scale-110 transition-transform">
                                    {bundle.image}
                                </div>

                                <h3 className="text-xl font-bold mb-4 text-white group-hover:text-blue-400 transition-colors text-center">
                                    {bundle.name}
                                </h3>

                                <div className="space-y-2 mb-4">
                                    {bundle.items.map((item, i) => (
                                        <div key={i} className="flex items-center text-sm text-gray-400">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                                            {item}
                                        </div>
                                    ))}
                                </div>

                                <div className="text-center mb-6">
                                    <div className="text-gray-500 line-through">{bundle.originalPrice}</div>
                                    <div className="text-2xl font-bold text-green-400">{bundle.bundlePrice}</div>
                                    <div className="text-yellow-400 font-bold">Save {bundle.savings}</div>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-semibold rounded-xl transition-all"
                                >
                                    Get Bundle
                                </motion.button>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Exclusive Offers */}
                <motion.div
                    variants={containerVariants}
                    className="mb-16"
                >
                    <motion.h2
                        variants={itemVariants}
                        className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"
                    >
                        Exclusive Offers & Codes
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {exclusiveOffers.map((offer, index) => (
                            <motion.div
                                key={offer.title}
                                variants={itemVariants}
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-purple-500/50 transition-all group text-center"
                            >
                                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">
                                    {offer.icon}
                                </div>
                                <h3 className="text-lg font-bold mb-2 text-white group-hover:text-purple-400 transition-colors">
                                    {offer.title}
                                </h3>
                                <p className="text-gray-400 text-sm mb-4">
                                    {offer.description}
                                </p>
                                <div className="bg-gray-800/50 rounded-lg p-2 border-2 border-dashed border-gray-600 group-hover:border-purple-500/50 transition-colors">
                                    <span className="text-purple-400 font-mono font-bold">{offer.code}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Deal Alert Signup */}
                <motion.div
                    variants={itemVariants}
                    className="bg-gradient-to-r from-orange-900/50 to-red-900/50 backdrop-blur-sm rounded-2xl p-8 border border-orange-500/30 text-center"
                >
                    <div className="text-4xl mb-4">🚨</div>
                    <h3 className="text-2xl font-bold mb-4 text-white">
                        Never Miss a Deal Again
                    </h3>
                    <p className="text-gray-400 mb-6">
                        Get instant notifications for flash sales, exclusive offers, and limited-time deals straight to your inbox!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold rounded-xl transition-all"
                        >
                            Get Alerts
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default SpecialDealsPage;
