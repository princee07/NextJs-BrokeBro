"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Users, Target, Award, Zap } from "lucide-react";

export default function AboutPage() {
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

    const stats = [
        { label: "Happy Students", value: "50K+", icon: Users },
        { label: "Brand Partners", value: "200+", icon: Target },
        { label: "Money Saved", value: "$2M+", icon: Award },
        { label: "Daily Deals", value: "100+", icon: Zap },
    ];

    const team = [
        {
            name: "Alex Chen",
            role: "Co-Founder & CEO",
            image: "https://randomuser.me/api/portraits/men/32.jpg",
            bio: "Former tech executive passionate about making education affordable."
        },
        {
            name: "Sarah Johnson",
            role: "Co-Founder & CTO",
            image: "https://randomuser.me/api/portraits/women/44.jpg",
            bio: "Full-stack developer with 8+ years experience in e-commerce."
        },
        {
            name: "Raj Patel",
            role: "Head of Partnerships",
            image: "https://randomuser.me/api/portraits/men/65.jpg",
            bio: "Expert in building strategic relationships with major brands."
        },
        {
            name: "Emily Davis",
            role: "Head of Marketing",
            image: "https://randomuser.me/api/portraits/women/68.jpg",
            bio: "Digital marketing specialist focused on student engagement."
        },
    ];

    return (
        <main className="bg-gradient-to-b from-[#0d1117] to-[#010409] min-h-screen pt-20">
            {/* Hero Section */}
            <section className="py-20 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <motion.h1
                        className="text-5xl md:text-6xl font-bold text-white mb-6"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        About{" "}
                        <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">
                            BrokeBro
                        </span>
                    </motion.h1>
                    <motion.p
                        className="text-xl text-gray-300 max-w-3xl mx-auto mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        We're on a mission to make quality products and services accessible to every student through exclusive discounts and deals.
                    </motion.p>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        className="grid grid-cols-2 md:grid-cols-4 gap-8"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                className="bg-[#161b22] p-6 rounded-xl border border-gray-800 text-center hover:border-orange-500/50 transition-all"
                                variants={itemVariants}
                                whileHover={{ scale: 1.05 }}
                            >
                                <stat.icon className="w-8 h-8 text-orange-500 mx-auto mb-4" />
                                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                                <div className="text-gray-400">{stat.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-16 px-4">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        className="bg-[#161b22] p-8 md:p-12 rounded-2xl border border-gray-800"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
                        <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                            <p>
                                BrokeBro was born out of a simple frustration: as students, we were tired of paying full price for everything while living on tight budgets. We knew there had to be a better way to access the products and services we needed without breaking the bank.
                            </p>
                            <p>
                                Founded in 2023 by a team of passionate students and recent graduates, BrokeBro started as a small project to help fellow students save money. What began as a simple discount aggregator has evolved into a comprehensive platform serving over 50,000 students across the country.
                            </p>
                            <p>
                                Today, we partner with hundreds of brands to bring exclusive student discounts on everything from technology and fashion to food and entertainment. Our mission remains the same: making student life more affordable, one deal at a time.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <motion.h2
                        className="text-4xl font-bold text-white text-center mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        Meet Our Team
                    </motion.h2>
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {team.map((member, index) => (
                            <motion.div
                                key={member.name}
                                className="bg-[#161b22] p-6 rounded-xl border border-gray-800 text-center hover:border-orange-500/50 transition-all"
                                variants={itemVariants}
                                whileHover={{ scale: 1.05 }}
                            >
                                <div className="w-24 h-24 mx-auto mb-4 relative">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        className="rounded-full object-cover"
                                    />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                                <p className="text-orange-400 font-semibold mb-3">{member.role}</p>
                                <p className="text-gray-400 text-sm">{member.bio}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-16 px-4">
                <div className="max-w-4xl mx-auto">
                    <motion.h2
                        className="text-4xl font-bold text-white text-center mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        Our Values
                    </motion.h2>
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <motion.div
                            className="text-center"
                            variants={itemVariants}
                        >
                            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Student-First</h3>
                            <p className="text-gray-400">Everything we do is designed with students in mind, from our user experience to our partnership negotiations.</p>
                        </motion.div>
                        <motion.div
                            className="text-center"
                            variants={itemVariants}
                        >
                            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Target className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Transparency</h3>
                            <p className="text-gray-400">No hidden fees, no fine print tricks. We believe in clear, honest communication about every deal.</p>
                        </motion.div>
                        <motion.div
                            className="text-center"
                            variants={itemVariants}
                        >
                            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Award className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Quality</h3>
                            <p className="text-gray-400">We only partner with reputable brands and verify every deal to ensure you get the best value.</p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
