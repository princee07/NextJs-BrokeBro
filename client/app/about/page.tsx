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
            name: "Prince",
            role: "Developer",
            image: "/assets/people/prince.jpg",
            bio: "Core developer and builder at BrokeBro. Passionate about code, design, and making student life easier.",
            socials: {
                linkedin: "https://www.linkedin.com/in/princee07/",
                github: "https://github.com/princee07",
                instagram: "https://instagram.com/prince.brokebro"
            }
        },
        {
            name: "Mohit Luthra",
            role: "CEO & Marketing Head",
            image: "/assets/people/mohit .jpg",
            bio: "CEO and marketing lead at BrokeBro. Driving vision, growth, and brand partnerships for the student community.",
            socials: {
                linkedin: "https://www.linkedin.com/in/mohitluthra/",
                instagram: "https://instagram.com/mohit.brokebro"
            }
        },
        {
            name: "Lavanya",
            role: "Developer",
            image: "/assets/people/Lavanya.jpeg",
            bio: "Developer at BrokeBro. Loves building cool things for students and making tech accessible.",
            socials: {
                linkedin: "https://www.linkedin.com/in/lavanya-brokebro/",
                github: "https://github.com/lavanya-brokebro"
            }
        },
        {
            name: "Prachi",
            role: "Tech Lead",
            image: "/assets/people/prachi.jpg",
            bio: "Tech Lead at BrokeBro. Leading the engineering team and building robust solutions for students.",
            socials: {
                linkedin: "https://www.linkedin.com/in/prachi-brokebro/",
                instagram: "https://instagram.com/prachi.brokebro"
            }
        },
    ];

    // Social icon SVGs
    const LinkedInIcon = (props: React.SVGProps<SVGSVGElement>) => (
        <svg {...props} fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.76 1.37-1.56 2.82-1.56 3.01 0 3.57 1.98 3.57 4.56v4.77z"/></svg>
    );
    const GitHubIcon = (props: React.SVGProps<SVGSVGElement>) => (
        <svg {...props} fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.63 0-12 5.37-12 12 0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.236-3.22-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23.96-.267 1.98-.399 3-.404 1.02.005 2.04.137 3 .404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.12 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.803 5.624-5.475 5.92.43.37.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.216.694.825.576 4.765-1.587 8.2-6.086 8.2-11.384 0-6.63-5.373-12-12-12z"/></svg>
    );
    const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
        <svg {...props} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.242 1.308 3.608.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.242 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.242-1.308-3.608-.058-1.266-.069-1.646-.069-4.85s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.242-1.246 3.608-1.308 1.266-.058 1.646-.069 4.85-.069zm0-2.163c-3.259 0-3.667.012-4.947.07-1.276.058-2.687.334-3.678 1.325-.991.991-1.267 2.402-1.325 3.678-.058 1.28-.07 1.688-.07 4.947s.012 3.667.07 4.947c.058 1.276.334 2.687 1.325 3.678.991.991 2.402 1.267 3.678 1.325 1.28.058 1.688.07 4.947.07s3.667-.012 4.947-.07c1.276-.058 2.687-.334 3.678-1.325.991-.991 1.267-2.402 1.325-3.678.058-1.28.07-1.688.07-4.947s-.012-3.667-.07-4.947c-.058-1.276-.334-2.687-1.325-3.678-.991-.991-2.402-1.267-3.678-1.325-1.28-.058-1.688-.07-4.947-.07zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
    );

    return (
        <main className="bg-gradient-to-b from-[#0d1117] to-[#010409] min-h-screen pt-40">
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
                        className="bg-gradient-to-br from-[#181c24] via-[#23272f] to-[#181c24] p-10 md:p-14 rounded-3xl border border-orange-500/20 shadow-2xl relative overflow-hidden"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-500/10 rounded-full blur-2xl z-0" />
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-pink-500/10 rounded-full blur-2xl z-0" />
                        <h2 className="text-4xl font-extrabold text-white mb-8 relative z-10 tracking-tight">Our Story</h2>
                        <div className="space-y-6 text-gray-200 text-lg leading-relaxed relative z-10">
                            <p>
                                Ever said <span className="bg-orange-500/20 px-2 rounded font-semibold">"I'm broke"</span>? BrokeBro was born out of late-night cravings, empty wallets, and the legendary phrase every Indian student lives by — <span className="italic text-orange-400 font-bold">Bhai, discount mil sakta hai kya?</span>
                            </p>
                            <p>
                                We're a group of <span className="bg-orange-500/20 px-2 rounded font-semibold">resourceful students</span> who were constantly searching for student discounts — only to realize, most brands do offer them, but verifying you're a legit student was a bigger challenge than your semester finals.
                            </p>
                            <p>
                                So, we built a platform <span className="bg-pink-500/20 px-2 rounded font-semibold">by students, for students</span> — to ensure every Indian student gets the perks they deserve. Because being a student should be a <span className="bg-blue-500/20 px-2 rounded font-semibold">privilege, not a punishment</span>.
                            </p>
                            <p>
                                We're the <span className="bg-orange-500/20 px-2 rounded font-semibold">bridge between your college ID and your wishlist</span>.
                            </p>
                            <p>
                                One quick verification leads to <span className="bg-pink-500/20 px-2 rounded font-semibold">unlimited, legitimate student deals</span>.
                            </p>
                            <p>
                                No hacks. No begging for codes. Just <span className="bg-blue-500/20 px-2 rounded font-semibold">verified, student-powered savings</span>.
                            </p>
                            <p>
                                When you say, <span className="italic text-orange-400 font-bold">Bro, I'm broke</span>, we say, <span className="italic text-pink-400 font-bold">Chill bro, we got you.</span>
                            </p>
                            <p>
                                We're not just a website. We're your <span className="bg-orange-500/20 px-2 rounded font-semibold">campus buddy</span>, your <span className="bg-pink-500/20 px-2 rounded font-semibold">group chat friend</span>, and the one who knows all the deals.
                            </p>
                            <p>
                                We've built the experience to be as smooth and engaging as your favorite social feed.
                            </p>
                            <p>
                                <span className="bg-orange-500/20 px-2 rounded font-semibold">Everything you need. All in one place.</span>
                            </p>
                            <p>
                                While others are corporate and confusing, we're simple, relatable, and built for the real student experience.
                            </p>
                            <p>
                                BrokeBro isn't just about discounts — it's about making student life <span className="bg-blue-500/20 px-2 rounded font-semibold">fun, rewarding, and a little less broke</span>.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <motion.h2
                        className="text-4xl font-bold text-white text-center mb-12 cursor-pointer hover:text-orange-400 transition-colors"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        onClick={() => window.location.href = '/team'}
                        tabIndex={0}
                        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') window.location.href = '/team'; }}
                        role="button"
                        aria-label="Go to Team Page"
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
                                className="bg-[#161b22] p-6 rounded-xl border border-gray-800 text-center hover:border-orange-500/50 transition-all flex flex-col items-center"
                                variants={itemVariants}
                                whileHover={{ scale: 1.05 }}
                            >
                                <div className="w-24 h-24 mx-auto mb-4 relative">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        className="rounded-full object-cover border-4 border-orange-500/30 shadow-lg"
                                    />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-1 mt-2">{member.name}</h3>
                                <p className="text-orange-400 font-semibold mb-2">{member.role}</p>
                                <p className="text-gray-400 text-sm mb-4">{member.bio}</p>
                                <div className="flex justify-center gap-4 mt-auto">
                                    {member.socials?.linkedin && (
                                        <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-orange-400 transition-colors">
                                            <LinkedInIcon className="w-6 h-6" />
                                        </a>
                                    )}
                                    {member.socials?.github && (
                                        <a href={member.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-orange-400 transition-colors">
                                            <GitHubIcon className="w-6 h-6" />
                                        </a>
                                    )}
                                    {member.socials?.instagram && (
                                        <a href={member.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-orange-400 transition-colors">
                                            <InstagramIcon className="w-6 h-6" />
                                        </a>
                                    )}
                                </div>
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
