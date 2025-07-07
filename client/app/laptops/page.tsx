"use client"

import React from 'react';
import { motion } from 'framer-motion';

const LaptopsPage = () => {
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

    const laptopCategories = [
        {
            title: "Gaming Laptops",
            description: "High-performance laptops for gaming enthusiasts",
            icon: "🎮",
            color: "from-red-500 to-purple-600"
        },
        {
            title: "Ultrabooks",
            description: "Thin, lightweight laptops for professionals",
            icon: "💼",
            color: "from-blue-500 to-cyan-600"
        },
        {
            title: "Student Laptops",
            description: "Affordable options perfect for students",
            icon: "🎓",
            color: "from-green-500 to-emerald-600"
        },
        {
            title: "Workstations",
            description: "Powerful machines for creative professionals",
            icon: "🎨",
            color: "from-orange-500 to-amber-600"
        }
    ];

    const featuredLaptops = [
        {
            name: "MacBook Air M2",
            brand: "Apple",
            price: "$1,199",
            originalPrice: "$1,299",
            discount: "8%",
            image: "💻",
            specs: ["M2 Chip", "8GB RAM", "256GB SSD", "13.6\" Display"]
        },
        {
            name: "ThinkPad X1 Carbon",
            brand: "Lenovo",
            price: "$1,099",
            originalPrice: "$1,399",
            discount: "21%",
            image: "💻",
            specs: ["Intel i7", "16GB RAM", "512GB SSD", "14\" Display"]
        },
        {
            name: "ROG Strix G15",
            brand: "ASUS",
            price: "$899",
            originalPrice: "$1,199",
            discount: "25%",
            image: "💻",
            specs: ["AMD Ryzen 7", "16GB RAM", "1TB SSD", "RTX 3060"]
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
                        💻
                    </motion.div>
                    <motion.h1
                        variants={itemVariants}
                        className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
                    >
                        Laptops
                    </motion.h1>
                    <motion.p
                        variants={itemVariants}
                        className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
                    >
                        Discover powerful laptops for every need - from gaming beasts to ultraportable workhorses, all with exclusive student discounts.
                    </motion.p>
                </motion.div>

                {/* Categories Grid */}
                <motion.div
                    variants={containerVariants}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
                >
                    {laptopCategories.map((category, index) => (
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
                            <p className="text-gray-400 text-sm">
                                {category.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Featured Laptops */}
                <motion.div
                    variants={containerVariants}
                    className="mb-16"
                >
                    <motion.h2
                        variants={itemVariants}
                        className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
                    >
                        Featured Laptops
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredLaptops.map((laptop, index) => (
                            <motion.div
                                key={laptop.name}
                                variants={itemVariants}
                                whileHover={{ scale: 1.02, y: -5 }}
                                className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 hover:border-blue-500/50 transition-all group"
                            >
                                <div className="relative mb-4">
                                    <div className="text-6xl text-center mb-4 group-hover:scale-110 transition-transform">
                                        {laptop.image}
                                    </div>
                                    <div className="absolute top-0 right-0 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                                        -{laptop.discount}
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-blue-400 transition-colors">
                                    {laptop.name}
                                </h3>
                                <p className="text-gray-400 mb-4">{laptop.brand}</p>

                                <div className="flex items-center mb-4">
                                    <span className="text-2xl font-bold text-green-400">{laptop.price}</span>
                                    <span className="text-gray-500 line-through ml-2">{laptop.originalPrice}</span>
                                </div>

                                <div className="space-y-2 mb-6">
                                    {laptop.specs.map((spec, i) => (
                                        <div key={i} className="flex items-center text-sm text-gray-400">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                                            {spec}
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

                {/* Student Discount Banner */}
                <motion.div
                    variants={itemVariants}
                    className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/30 text-center"
                >
                    <div className="text-4xl mb-4">🎓</div>
                    <h3 className="text-2xl font-bold mb-4 text-white">
                        Student Discount Available
                    </h3>
                    <p className="text-gray-400 mb-6">
                        Verify your student status and get an additional 10% off on all laptops!
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all"
                    >
                        Verify Student Status
                    </motion.button>
                </motion.div>
            </div>
        </div>
    );
};

export default LaptopsPage;
