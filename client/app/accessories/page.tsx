"use client"

import React from 'react';
import { motion } from 'framer-motion';

const AccessoriesPage = () => {
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

    const accessoryCategories = [
        {
            title: "Audio",
            description: "Headphones, speakers, and sound systems",
            icon: "🎧",
            color: "from-blue-500 to-cyan-600",
            items: ["Headphones", "Earbuds", "Speakers", "Microphones"]
        },
        {
            title: "Input Devices",
            description: "Keyboards, mice, and controllers",
            icon: "⌨️",
            color: "from-purple-500 to-pink-600",
            items: ["Keyboards", "Mice", "Controllers", "Drawing Tablets"]
        },
        {
            title: "Storage",
            description: "External drives and memory solutions",
            icon: "💾",
            color: "from-green-500 to-emerald-600",
            items: ["External HDDs", "SSDs", "USB Drives", "Memory Cards"]
        },
        {
            title: "Connectivity",
            description: "Cables, adapters, and networking",
            icon: "🔌",
            color: "from-orange-500 to-red-600",
            items: ["USB-C Hubs", "Cables", "Adapters", "Wireless Chargers"]
        }
    ];

    const featuredAccessories = [
        {
            name: "AirPods Pro (2nd gen)",
            brand: "Apple",
            price: "$199",
            originalPrice: "$249",
            discount: "20%",
            image: "🎧",
            rating: 4.8,
            features: ["Active Noise Cancellation", "Spatial Audio", "H2 Chip", "6hrs Battery"]
        },
        {
            name: "MX Master 3S",
            brand: "Logitech",
            price: "$89",
            originalPrice: "$109",
            discount: "18%",
            image: "🖱️",
            rating: 4.9,
            features: ["8K DPI Sensor", "70-day Battery", "Multi-device", "Silent Clicks"]
        },
        {
            name: "WH-1000XM5",
            brand: "Sony",
            price: "$299",
            originalPrice: "$399",
            discount: "25%",
            image: "🎵",
            rating: 4.7,
            features: ["Industry-leading ANC", "30hrs Battery", "Hi-Res Audio", "Multipoint"]
        },
        {
            name: "Portable SSD T7",
            brand: "Samsung",
            price: "$79",
            originalPrice: "$109",
            discount: "27%",
            image: "💿",
            rating: 4.6,
            features: ["1TB Storage", "1,050 MB/s", "USB 3.2", "Compact Design"]
        }
    ];

    const popularBrands = [
        { name: "Apple", logo: "🍎", specialty: "Premium Ecosystem" },
        { name: "Sony", logo: "📺", specialty: "Audio Excellence" },
        { name: "Logitech", logo: "🖥️", specialty: "PC Peripherals" },
        { name: "Samsung", logo: "📱", specialty: "Storage Solutions" },
        { name: "Anker", logo: "🔋", specialty: "Charging & Cables" },
        { name: "Razer", logo: "🐍", specialty: "Gaming Gear" }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden pt-20">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-20 blur-3xl bg-gradient-to-r from-cyan-500 to-blue-600"
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
                        🔧
                    </motion.div>
                    <motion.h1
                        variants={itemVariants}
                        className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent"
                    >
                        Accessories
                    </motion.h1>
                    <motion.p
                        variants={itemVariants}
                        className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
                    >
                        Complete your tech setup with premium accessories - from wireless earbuds to gaming peripherals, all at student-friendly prices.
                    </motion.p>
                </motion.div>

                {/* Categories Grid */}
                <motion.div
                    variants={containerVariants}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
                >
                    {accessoryCategories.map((category, index) => (
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
                                {category.items.map((item, i) => (
                                    <div key={i} className="text-xs text-gray-500 flex items-center">
                                        <div className="w-1 h-1 bg-cyan-500 rounded-full mr-2"></div>
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Featured Accessories */}
                <motion.div
                    variants={containerVariants}
                    className="mb-16"
                >
                    <motion.h2
                        variants={itemVariants}
                        className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
                    >
                        Featured Accessories
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {featuredAccessories.map((accessory, index) => (
                            <motion.div
                                key={accessory.name}
                                variants={itemVariants}
                                whileHover={{ scale: 1.02, y: -5 }}
                                className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 hover:border-cyan-500/50 transition-all group"
                            >
                                <div className="relative mb-4">
                                    <div className="text-5xl text-center mb-4 group-hover:scale-110 transition-transform">
                                        {accessory.image}
                                    </div>
                                    <div className="absolute top-0 right-0 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-2 py-1 rounded-full text-xs font-bold">
                                        -{accessory.discount}
                                    </div>
                                </div>

                                <h3 className="text-lg font-bold mb-1 text-white group-hover:text-cyan-400 transition-colors">
                                    {accessory.name}
                                </h3>
                                <p className="text-gray-400 text-sm mb-2">{accessory.brand}</p>

                                <div className="flex items-center mb-3">
                                    <div className="flex text-yellow-400 text-sm mr-2">
                                        {"★".repeat(Math.floor(accessory.rating))}
                                    </div>
                                    <span className="text-gray-500 text-sm">({accessory.rating})</span>
                                </div>

                                <div className="flex items-center mb-4">
                                    <span className="text-xl font-bold text-green-400">{accessory.price}</span>
                                    <span className="text-gray-500 line-through ml-2 text-sm">{accessory.originalPrice}</span>
                                </div>

                                <div className="space-y-1 mb-4">
                                    {accessory.features.slice(0, 2).map((feature, i) => (
                                        <div key={i} className="flex items-center text-xs text-gray-400">
                                            <div className="w-1 h-1 bg-cyan-500 rounded-full mr-2"></div>
                                            {feature}
                                        </div>
                                    ))}
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-full py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-xl transition-all text-sm"
                                >
                                    Add to Cart
                                </motion.button>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Popular Brands */}
                <motion.div
                    variants={containerVariants}
                    className="mb-16"
                >
                    <motion.h2
                        variants={itemVariants}
                        className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
                    >
                        Popular Brands
                    </motion.h2>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {popularBrands.map((brand, index) => (
                            <motion.div
                                key={brand.name}
                                variants={itemVariants}
                                whileHover={{ scale: 1.05, y: -3 }}
                                className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-800 hover:border-blue-500/50 transition-all group text-center"
                            >
                                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                                    {brand.logo}
                                </div>
                                <h3 className="text-sm font-bold mb-1 text-white group-hover:text-blue-400 transition-colors">
                                    {brand.name}
                                </h3>
                                <p className="text-xs text-gray-500">
                                    {brand.specialty}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Bundle Deals Banner */}
                <motion.div
                    variants={itemVariants}
                    className="bg-gradient-to-r from-cyan-900/50 to-blue-900/50 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/30 text-center"
                >
                    <div className="text-4xl mb-4">📦</div>
                    <h3 className="text-2xl font-bold mb-4 text-white">
                        Bundle Deals Available
                    </h3>
                    <p className="text-gray-400 mb-6">
                        Mix and match accessories to create your perfect tech bundle and save even more!
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center mb-6">
                        {["🎧 + 🖱️", "⌨️ + 🖱️", "💾 + 🔌", "🎵 + 🔋"].map((bundle, i) => (
                            <div key={i} className="bg-gray-800/50 px-4 py-2 rounded-lg text-sm">
                                {bundle} = Extra 15% Off
                            </div>
                        ))}
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-xl transition-all"
                    >
                        Create Bundle
                    </motion.button>
                </motion.div>
            </div>
        </div>
    );
};

export default AccessoriesPage;
