"use client"

import React from 'react';
import { motion } from 'framer-motion';

const GamingPage = () => {
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

    const gamingCategories = [
        {
            title: "Gaming Laptops",
            description: "Portable powerhouses for gaming on the go",
            icon: "🚀",
            color: "from-red-500 to-pink-600"
        },
        {
            title: "Gaming Desktops",
            description: "Ultimate performance for serious gamers",
            icon: "⚡",
            color: "from-purple-500 to-blue-600"
        },
        {
            title: "Gaming Accessories",
            description: "Keyboards, mice, headsets, and more",
            icon: "🎯",
            color: "from-green-500 to-teal-600"
        },
        {
            title: "VR Headsets",
            description: "Immersive virtual reality experiences",
            icon: "🥽",
            color: "from-orange-500 to-red-600"
        }
    ];

    const featuredProducts = [
        {
            name: "ROG Strix Scar 17",
            brand: "ASUS",
            price: "$1,899",
            originalPrice: "$2,299",
            discount: "17%",
            image: "🎮",
            specs: ["RTX 4070", "Intel i9", "32GB RAM", "1TB SSD"]
        },
        {
            name: "Alienware m15 R7",
            brand: "Dell",
            price: "$1,699",
            originalPrice: "$2,099",
            discount: "19%",
            image: "👾",
            specs: ["RTX 4060", "AMD Ryzen 9", "16GB RAM", "512GB SSD"]
        },
        {
            name: "MSI Katana GF66",
            brand: "MSI",
            price: "$999",
            originalPrice: "$1,299",
            discount: "23%",
            image: "⚔️",
            specs: ["RTX 3050 Ti", "Intel i7", "16GB RAM", "512GB SSD"]
        }
    ];

    const gamingDeals = [
        {
            title: "Gaming Keyboard",
            price: "$89",
            originalPrice: "$129",
            icon: "⌨️"
        },
        {
            title: "Gaming Mouse",
            price: "$59",
            originalPrice: "$89",
            icon: "🖱️"
        },
        {
            title: "Gaming Headset",
            price: "$99",
            originalPrice: "$149",
            icon: "🎧"
        },
        {
            title: "Gaming Chair",
            price: "$299",
            originalPrice: "$399",
            icon: "🪑"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden pt-20">
            {/* Gaming-themed Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-20 blur-3xl bg-gradient-to-r from-red-500 to-purple-600"
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

                {/* Gaming particles */}
                {[...Array(30)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-red-400/40 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [-20, -80, -20],
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0],
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    />
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
                        className="text-8xl mb-6 relative"
                    >
                        <motion.span
                            animate={{
                                textShadow: [
                                    "0 0 20px #ff0040",
                                    "0 0 40px #ff0040, 0 0 60px #ff0040",
                                    "0 0 20px #ff0040",
                                ],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                            }}
                        >
                            🎮
                        </motion.span>
                    </motion.div>
                    <motion.h1
                        variants={itemVariants}
                        className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-red-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
                    >
                        Gaming Hub
                    </motion.h1>
                    <motion.p
                        variants={itemVariants}
                        className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
                    >
                        Level up your gaming experience with cutting-edge hardware, peripherals, and exclusive student gaming discounts.
                    </motion.p>
                </motion.div>

                {/* Categories Grid */}
                <motion.div
                    variants={containerVariants}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
                >
                    {gamingCategories.map((category, index) => (
                        <motion.div
                            key={category.title}
                            variants={itemVariants}
                            whileHover={{ scale: 1.05, y: -5 }}
                            className={`p-6 rounded-2xl bg-gradient-to-br ${category.color} bg-opacity-10 border border-gray-800 backdrop-blur-sm hover:bg-opacity-20 transition-all cursor-pointer group relative overflow-hidden`}
                        >
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
                                initial={false}
                                animate={{
                                    background: [
                                        "linear-gradient(45deg, rgba(239, 68, 68, 0.1), rgba(147, 51, 234, 0.1))",
                                        "linear-gradient(45deg, rgba(147, 51, 234, 0.1), rgba(236, 72, 153, 0.1))",
                                        "linear-gradient(45deg, rgba(239, 68, 68, 0.1), rgba(147, 51, 234, 0.1))",
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
                                        rotate: [0, 5, -5, 0],
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
                                <p className="text-gray-400 text-sm">
                                    {category.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Featured Gaming Products */}
                <motion.div
                    variants={containerVariants}
                    className="mb-16"
                >
                    <motion.h2
                        variants={itemVariants}
                        className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-red-400 to-purple-500 bg-clip-text text-transparent"
                    >
                        Featured Gaming Laptops
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredProducts.map((product, index) => (
                            <motion.div
                                key={product.name}
                                variants={itemVariants}
                                whileHover={{ scale: 1.02, y: -5 }}
                                className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 hover:border-red-500/50 transition-all group relative overflow-hidden"
                            >
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity"
                                />

                                <div className="relative z-10">
                                    <div className="relative mb-4">
                                        <motion.div
                                            className="text-6xl text-center mb-4"
                                            animate={{
                                                scale: [1, 1.1, 1],
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                            }}
                                        >
                                            {product.image}
                                        </motion.div>
                                        <div className="absolute top-0 right-0 bg-gradient-to-r from-red-500 to-pink-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                                            -{product.discount}
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold mb-2 text-white group-hover:text-red-400 transition-colors">
                                        {product.name}
                                    </h3>
                                    <p className="text-gray-400 mb-4">{product.brand}</p>

                                    <div className="flex items-center mb-4">
                                        <span className="text-2xl font-bold text-green-400">{product.price}</span>
                                        <span className="text-gray-500 line-through ml-2">{product.originalPrice}</span>
                                    </div>

                                    <div className="space-y-2 mb-6">
                                        {product.specs.map((spec, i) => (
                                            <div key={i} className="flex items-center text-sm text-gray-400">
                                                <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                                                {spec}
                                            </div>
                                        ))}
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-full py-3 bg-gradient-to-r from-red-500 to-purple-600 hover:from-red-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all"
                                    >
                                        Add to Cart
                                    </motion.button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Gaming Accessories */}
                <motion.div
                    variants={containerVariants}
                    className="mb-16"
                >
                    <motion.h2
                        variants={itemVariants}
                        className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"
                    >
                        Gaming Accessories
                    </motion.h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {gamingDeals.map((deal, index) => (
                            <motion.div
                                key={deal.title}
                                variants={itemVariants}
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-800 hover:border-purple-500/50 transition-all group text-center"
                            >
                                <motion.div
                                    className="text-3xl mb-3"
                                    animate={{
                                        rotate: [0, 10, -10, 0],
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        delay: index * 0.5,
                                    }}
                                >
                                    {deal.icon}
                                </motion.div>
                                <h3 className="text-lg font-bold mb-2 text-white group-hover:text-purple-400 transition-colors">
                                    {deal.title}
                                </h3>
                                <div className="flex items-center justify-center">
                                    <span className="text-xl font-bold text-green-400">{deal.price}</span>
                                    <span className="text-gray-500 line-through ml-2 text-sm">{deal.originalPrice}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Gaming Community Banner */}
                <motion.div
                    variants={itemVariants}
                    className="bg-gradient-to-r from-red-900/50 to-purple-900/50 backdrop-blur-sm rounded-2xl p-8 border border-red-500/30 text-center relative overflow-hidden"
                >
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-purple-500/10"
                        animate={{
                            opacity: [0.1, 0.3, 0.1],
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
                                scale: [1, 1.2, 1],
                                rotate: [0, 360],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                            }}
                        >
                            🏆
                        </motion.div>
                        <h3 className="text-2xl font-bold mb-4 text-white">
                            Join the Gaming Community
                        </h3>
                        <p className="text-gray-400 mb-6">
                            Connect with fellow gamers, participate in tournaments, and get exclusive gaming deals!
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-3 bg-gradient-to-r from-red-500 to-purple-600 hover:from-red-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all"
                        >
                            Join Community
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default GamingPage;
