"use client";

import { motion } from "framer-motion";
import { Calendar, User, Tag, Clock } from "lucide-react";
import Image from "next/image";

export default function BlogPage() {
    const blogPosts = [
        {
            id: 1,
            title: "10 Ways to Save Money as a College Student in 2025",
            excerpt: "Discover practical tips and strategies to stretch your budget and make the most of student discounts.",
            author: "Sarah Johnson",
            date: "January 15, 2025",
            category: "Money Tips",
            readTime: "5 min read",
            image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&h=400&fit=crop",
            featured: true,
        },
        {
            id: 2,
            title: "The Ultimate Guide to Student Technology Discounts",
            excerpt: "Everything you need to know about getting discounts on laptops, software, and tech gadgets.",
            author: "Alex Chen",
            date: "January 12, 2025",
            category: "Technology",
            readTime: "8 min read",
            image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&h=400&fit=crop",
            featured: false,
        },
        {
            id: 3,
            title: "Best Food Delivery Apps for Students on a Budget",
            excerpt: "Compare the top food delivery platforms and learn how to maximize your savings with promo codes.",
            author: "Emily Davis",
            date: "January 10, 2025",
            category: "Food & Dining",
            readTime: "6 min read",
            image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=400&fit=crop",
            featured: false,
        },
        {
            id: 4,
            title: "How to Build a Professional Wardrobe on a Student Budget",
            excerpt: "Look professional without breaking the bank - fashion tips for students entering the workforce.",
            author: "Raj Patel",
            date: "January 8, 2025",
            category: "Fashion",
            readTime: "7 min read",
            image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop",
            featured: false,
        },
        {
            id: 5,
            title: "Student Mental Health: Free and Affordable Resources",
            excerpt: "A comprehensive guide to mental health resources available to students at little to no cost.",
            author: "Dr. Lisa Thompson",
            date: "January 5, 2025",
            category: "Health & Wellness",
            readTime: "10 min read",
            image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop",
            featured: false,
        },
        {
            id: 6,
            title: "Maximizing Your Internship Applications with AI Resume Builders",
            excerpt: "Learn how to create standout resumes using AI tools and land your dream internship.",
            author: "Mike Rodriguez",
            date: "January 3, 2025",
            category: "Career",
            readTime: "9 min read",
            image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
            featured: false,
        },
    ];

    const categories = ["All", "Money Tips", "Technology", "Food & Dining", "Fashion", "Health & Wellness", "Career"];

    return (
        <main className="bg-gradient-to-b from-[#0d1117] to-[#010409] min-h-screen pt-32">
            {/* Hero Section */}
            <section className="py-20 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <motion.h1
                        className="text-5xl md:text-6xl font-bold text-white mb-6"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        BrokeBro{" "}
                        <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">
                            Blog
                        </span>
                    </motion.h1>
                    <motion.p
                        className="text-xl text-gray-300 max-w-3xl mx-auto mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Tips, guides, and insights to help you save money and make the most of your student experience.
                    </motion.p>
                </div>
            </section>

            {/* Featured Post */}
            {blogPosts.filter(post => post.featured).map(post => (
                <section key={post.id} className="py-16 px-4">
                    <div className="max-w-6xl mx-auto">
                        <motion.div
                            className="bg-[#161b22] rounded-2xl border border-gray-800 overflow-hidden hover:border-orange-500/50 transition-all"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="md:flex">
                                <div className="md:w-1/2">
                                    <div className="relative h-64 md:h-full">
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className="px-3 py-1 bg-orange-500 text-white rounded-full text-sm font-semibold">
                                                Featured
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="md:w-1/2 p-8">
                                    <div className="flex items-center gap-4 mb-4">
                                        <span className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full text-sm font-semibold">
                                            {post.category}
                                        </span>
                                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                                            <Clock className="w-4 h-4" />
                                            {post.readTime}
                                        </div>
                                    </div>
                                    <h2 className="text-3xl font-bold text-white mb-4">{post.title}</h2>
                                    <p className="text-gray-300 mb-6 text-lg">{post.excerpt}</p>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4 text-gray-400">
                                            <div className="flex items-center gap-2">
                                                <User className="w-4 h-4" />
                                                {post.author}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4" />
                                                {post.date}
                                            </div>
                                        </div>
                                        <motion.button
                                            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-600 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-amber-700 transition-all"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            Read More
                                        </motion.button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>
            ))}

            {/* Category Filter */}
            <section className="py-8 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-wrap justify-center gap-4">
                        {categories.map((category, index) => (
                            <motion.button
                                key={category}
                                className="px-6 py-3 bg-[#161b22] border border-gray-800 text-gray-300 rounded-lg hover:border-orange-500/50 hover:text-orange-400 transition-all"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                            >
                                {category}
                            </motion.button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Blog Posts Grid */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogPosts.filter(post => !post.featured).map((post, index) => (
                            <motion.article
                                key={post.id}
                                className="bg-[#161b22] rounded-xl border border-gray-800 overflow-hidden hover:border-orange-500/50 transition-all"
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <div className="relative h-48">
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full text-sm font-semibold">
                                            {post.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
                                        <Clock className="w-4 h-4" />
                                        {post.readTime}
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">{post.title}</h3>
                                    <p className="text-gray-300 mb-4 line-clamp-3">{post.excerpt}</p>
                                    <div className="flex items-center justify-between text-sm text-gray-400">
                                        <div className="flex items-center gap-2">
                                            <User className="w-4 h-4" />
                                            {post.author}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4" />
                                            {post.date}
                                        </div>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter Signup */}
            <section className="py-16 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        className="bg-[#161b22] p-8 rounded-2xl border border-gray-800"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
                        <p className="text-gray-300 mb-6">
                            Get the latest money-saving tips and student deals delivered to your inbox weekly.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                            <motion.button
                                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-600 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-amber-700 transition-all"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Subscribe
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
