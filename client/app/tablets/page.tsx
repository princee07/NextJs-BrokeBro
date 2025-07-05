"use client"

import React from 'react';
import { motion } from 'framer-motion';

const TabletsPage = () => {
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

    const tabletCategories = [
        {
            title: "iPad Series",
            description: "Apple's premium tablet lineup",
            icon: "📱",
            color: "from-blue-500 to-cyan-600",
            models: ["iPad Pro", "iPad Air", "iPad", "iPad mini"]
        },
        {
            title: "Android Tablets",
            description: "Versatile Android-powered devices",
            icon: "🤖",
            color: "from-green-500 to-emerald-600",
            models: ["Galaxy Tab", "Pixel Tablet", "Fire HD", "Lenovo Tab"]
        },
        {
            title: "2-in-1 Devices",
            description: "Tablet and laptop in one",
            icon: "🔄",
            color: "from-purple-500 to-pink-600",
            models: ["Surface Pro", "Galaxy Book", "Yoga Tab", "ThinkPad X1"]
        },
        {
            title: "Drawing Tablets",
            description: "Professional creative tools",
            icon: "🎨",
            color: "from-orange-500 to-red-600",
            models: ["Wacom", "Huion", "XP-Pen", "Gaomon"]
        }
    ];

    const featuredTablets = [
        {
            name: "iPad Pro 12.9\" (6th gen)",
            brand: "Apple",
            price: "$999",
            originalPrice: "$1,199",
            discount: "17%",
            image: "📱",
            storage: "128GB",
            screen: "12.9\" Liquid Retina XDR",
            chip: "M2",
            features: ["Face ID", "Apple Pencil Support", "Magic Keyboard", "5G Option"]
        },
        {
            name: "Galaxy Tab S9 Ultra",
            brand: "Samsung",
            price: "$899",
            originalPrice: "$1,199",
            discount: "25%",
            image: "📟",
            storage: "256GB",
            screen: "14.6\" Dynamic AMOLED",
            chip: "Snapdragon 8 Gen 2",
            features: ["S Pen Included", "DeX Mode", "120Hz Display", "IP68 Rating"]
        },
        {
            name: "Surface Pro 9",
            brand: "Microsoft",
            price: "$799",
            originalPrice: "$999",
            discount: "20%",
            image: "💻",
            storage: "256GB",
            screen: "13\" PixelSense",
            chip: "Intel i5",
            features: ["Windows 11", "Type Cover", "Surface Pen", "Thunderbolt 4"]
        }
    ];

    const tabletUseCases = [
        {
            title: "Digital Art & Design",
            description: "Create stunning artwork with pressure-sensitive stylus support",
            icon: "🎨",
            apps: ["Procreate", "Adobe Fresco", "Clip Studio", "ArtRage"]
        },
        {
            title: "Note-Taking & Study",
            description: "Transform your study sessions with digital notebooks",
            icon: "📝",
            apps: ["GoodNotes", "Notability", "OneNote", "Notion"]
        },
        {
            title: "Media & Entertainment",
            description: "Stream, read, and game with stunning displays",
            icon: "🎬",
            apps: ["Netflix", "YouTube", "Kindle", "Apple Arcade"]
        },
        {
            title: "Productivity & Work",
            description: "Mobile office with full desktop apps",
            icon: "💼",
            apps: ["Office 365", "Photoshop", "Zoom", "Slack"]
        }
    ];

    const accessories = [
        { name: "Apple Pencil 2nd Gen", price: "$99", icon: "✏️" },
        { name: "Magic Keyboard", price: "$299", icon: "⌨️" },
        { name: "S Pen Pro", price: "$79", icon: "🖊️" },
        { name: "Surface Pen", price: "$89", icon: "🖋️" }
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
                        📱
                    </motion.div>
                    <motion.h1
                        variants={itemVariants}
                        className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent"
                    >
                        Tablets
                    </motion.h1>
                    <motion.p
                        variants={itemVariants}
                        className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
                    >
                        Discover the perfect tablet for creativity, productivity, and entertainment - from iPads to Surface devices, all with student discounts.
                    </motion.p>
                </motion.div>

                {/* Tablet Categories */}
                <motion.div
                    variants={containerVariants}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
                >
                    {tabletCategories.map((category, index) => (
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
                                {category.models.map((model, i) => (
                                    <div key={i} className="text-xs text-gray-500 flex items-center">
                                        <div className="w-1 h-1 bg-cyan-500 rounded-full mr-2"></div>
                                        {model}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Featured Tablets */}
                <motion.div
                    variants={containerVariants}
                    className="mb-16"
                >
                    <motion.h2
                        variants={itemVariants}
                        className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
                    >
                        Featured Tablets
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredTablets.map((tablet, index) => (
                            <motion.div
                                key={tablet.name}
                                variants={itemVariants}
                                whileHover={{ scale: 1.02, y: -5 }}
                                className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 hover:border-cyan-500/50 transition-all group"
                            >
                                <div className="relative mb-6">
                                    <motion.div
                                        className="text-6xl text-center mb-4"
                                        animate={{
                                            rotateY: [0, 5, -5, 0],
                                        }}
                                        transition={{
                                            duration: 4,
                                            repeat: Infinity,
                                        }}
                                    >
                                        {tablet.image}
                                    </motion.div>
                                    <div className="absolute top-0 right-0 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                                        -{tablet.discount}
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-cyan-400 transition-colors">
                                    {tablet.name}
                                </h3>
                                <p className="text-gray-400 mb-4">{tablet.brand}</p>

                                <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                                    <div>
                                        <span className="text-gray-500">Storage:</span>
                                        <span className="text-white ml-2">{tablet.storage}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Chip:</span>
                                        <span className="text-white ml-2">{tablet.chip}</span>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <span className="text-gray-500 text-sm">Screen:</span>
                                    <span className="text-white ml-2 text-sm">{tablet.screen}</span>
                                </div>

                                <div className="flex items-center mb-4">
                                    <span className="text-2xl font-bold text-green-400">{tablet.price}</span>
                                    <span className="text-gray-500 line-through ml-2">{tablet.originalPrice}</span>
                                </div>

                                <div className="space-y-2 mb-6">
                                    {tablet.features.slice(0, 3).map((feature, i) => (
                                        <div key={i} className="flex items-center text-sm text-gray-400">
                                            <div className="w-2 h-2 bg-cyan-500 rounded-full mr-3"></div>
                                            {feature}
                                        </div>
                                    ))}
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-xl transition-all"
                                >
                                    View Details
                                </motion.button>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Use Cases */}
                <motion.div
                    variants={containerVariants}
                    className="mb-16"
                >
                    <motion.h2
                        variants={itemVariants}
                        className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
                    >
                        Perfect For Every Need
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {tabletUseCases.map((useCase, index) => (
                            <motion.div
                                key={useCase.title}
                                variants={itemVariants}
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-blue-500/50 transition-all group"
                            >
                                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                                    {useCase.icon}
                                </div>
                                <h3 className="text-lg font-bold mb-2 text-white group-hover:text-blue-400 transition-colors">
                                    {useCase.title}
                                </h3>
                                <p className="text-gray-400 text-sm mb-4">
                                    {useCase.description}
                                </p>
                                <div className="space-y-1">
                                    {useCase.apps.map((app, i) => (
                                        <div key={i} className="text-xs text-gray-500 flex items-center">
                                            <div className="w-1 h-1 bg-blue-500 rounded-full mr-2"></div>
                                            {app}
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Accessories */}
                <motion.div
                    variants={containerVariants}
                    className="mb-16"
                >
                    <motion.h2
                        variants={itemVariants}
                        className="text-2xl md:text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"
                    >
                        Essential Accessories
                    </motion.h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {accessories.map((accessory, index) => (
                            <motion.div
                                key={accessory.name}
                                variants={itemVariants}
                                whileHover={{ scale: 1.05, y: -3 }}
                                className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 border border-gray-800 hover:border-purple-500/50 transition-all group text-center"
                            >
                                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                                    {accessory.icon}
                                </div>
                                <h3 className="text-sm font-bold mb-1 text-white group-hover:text-purple-400 transition-colors">
                                    {accessory.name}
                                </h3>
                                <p className="text-lg font-bold text-green-400">
                                    {accessory.price}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Student Creative Suite Banner */}
                <motion.div
                    variants={itemVariants}
                    className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/30 text-center"
                >
                    <div className="text-4xl mb-4">🎓</div>
                    <h3 className="text-2xl font-bold mb-4 text-white">
                        Student Creative Suite Included
                    </h3>
                    <p className="text-gray-400 mb-6">
                        Get free access to premium creative apps like Procreate, GoodNotes, and Adobe Creative Cloud for Students with your tablet purchase!
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center mb-6">
                        {["🎨 Procreate", "📝 GoodNotes", "📐 Adobe CC", "📚 Notability"].map((app, i) => (
                            <motion.div
                                key={i}
                                className="bg-gray-800/50 px-4 py-2 rounded-lg text-sm"
                                whileHover={{ scale: 1.05 }}
                            >
                                {app}
                            </motion.div>
                        ))}
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-semibold rounded-xl transition-all"
                    >
                        Claim Student Benefits
                    </motion.button>
                </motion.div>
            </div>
        </div>
    );
};

export default TabletsPage;
