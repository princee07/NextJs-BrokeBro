"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin, Clock, DollarSign, Users, Rocket } from "lucide-react";

export default function CareersPage() {
    const positions = [
        {
            title: "Frontend Developer",
            department: "Engineering",
            location: "Remote / San Francisco",
            type: "Full-time",
            salary: "$80k - $120k",
            description: "Join our frontend team to build amazing user experiences for students worldwide.",
            requirements: ["3+ years React/Next.js experience", "TypeScript proficiency", "UI/UX design skills"],
        },
        {
            title: "Backend Engineer",
            department: "Engineering",
            location: "Remote / New York",
            type: "Full-time",
            salary: "$90k - $130k",
            description: "Build scalable APIs and services to power our discount platform.",
            requirements: ["Node.js/Python experience", "Database design", "Cloud platform knowledge"],
        },
        {
            title: "Product Manager",
            department: "Product",
            location: "Remote / Austin",
            type: "Full-time",
            salary: "$100k - $140k",
            description: "Drive product strategy and work with cross-functional teams to deliver value to students.",
            requirements: ["3+ years product management", "User research experience", "Data-driven mindset"],
        },
        {
            title: "Partnership Manager",
            department: "Business Development",
            location: "Remote / Chicago",
            type: "Full-time",
            salary: "$70k - $100k",
            description: "Build relationships with brands and negotiate exclusive student deals.",
            requirements: ["Sales/BD experience", "Relationship building", "Negotiation skills"],
        },
        {
            title: "Content Marketing Intern",
            department: "Marketing",
            location: "Remote",
            type: "Internship",
            salary: "$20 - $25/hour",
            description: "Create engaging content for social media and blog to reach student audiences.",
            requirements: ["Marketing/Communications student", "Social media savvy", "Creative writing skills"],
        },
        {
            title: "UX/UI Designer",
            department: "Design",
            location: "Remote / Los Angeles",
            type: "Full-time",
            salary: "$85k - $115k",
            description: "Design intuitive and beautiful experiences that make saving money delightful.",
            requirements: ["3+ years UX/UI design", "Figma proficiency", "User research experience"],
        },
    ];

    const benefits = [
        {
            icon: DollarSign,
            title: "Competitive Salary",
            description: "We offer competitive salaries and equity packages"
        },
        {
            icon: Users,
            title: "Great Team",
            description: "Work with passionate, talented people who care about students"
        },
        {
            icon: Rocket,
            title: "Growth Opportunities",
            description: "Rapid career growth in a fast-scaling startup environment"
        },
        {
            icon: Clock,
            title: "Flexible Hours",
            description: "Work-life balance with flexible hours and remote options"
        },
    ];

    return (
        <main className="min-h-screen pt-32 pb-10 px-4 max-w-3xl mx-auto">
            <h1 className="text-4xl font-extrabold text-orange-400 mb-6">Careers</h1>
            <p className="text-lg text-gray-200 mb-4">
                Want to join the BrokeBro team? We’re always looking for passionate, creative, and driven people to help us build the future of student savings. Check back soon for open positions or email us at{" "}
                <a href="mailto:careers@brokebro.com" className="text-orange-300 underline">careers@brokebro.com</a>.
            </p>

            {/* Hero Section */}
            <section className="py-20 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <motion.h1
                        className="text-5xl md:text-6xl font-bold text-white mb-6"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        Join the{" "}
                        <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">
                            BrokeBro
                        </span>{" "}
                        Team
                    </motion.h1>
                    <motion.p
                        className="text-xl text-gray-300 max-w-3xl mx-auto mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Help us build the future of student savings. Join a team that's passionate about making education more affordable for everyone.
                    </motion.p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <motion.h2
                        className="text-4xl font-bold text-white text-center mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        Why Work With Us?
                    </motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {benefits.map((benefit, index) => (
                            <motion.div
                                key={benefit.title}
                                className="bg-[#161b22] p-6 rounded-xl border border-gray-800 text-center hover:border-orange-500/50 transition-all"
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <benefit.icon className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                                <p className="text-gray-400">{benefit.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Open Positions */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <motion.h2
                        className="text-4xl font-bold text-white text-center mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        Open Positions
                    </motion.h2>
                    <div className="space-y-6">
                        {positions.map((position, index) => (
                            <motion.div
                                key={position.title}
                                className="bg-[#161b22] p-6 rounded-xl border border-gray-800 hover:border-orange-500/50 transition-all"
                                initial={{ opacity: 0, x: -40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                whileHover={{ scale: 1.02 }}
                            >
                                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                                    <div className="flex-1">
                                        <div className="flex flex-wrap items-center gap-4 mb-3">
                                            <h3 className="text-2xl font-bold text-white">{position.title}</h3>
                                            <span className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full text-sm font-semibold">
                                                {position.department}
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-6 text-gray-400 mb-4">
                                            <div className="flex items-center gap-2">
                                                <MapPin className="w-4 h-4" />
                                                <span>{position.location}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Briefcase className="w-4 h-4" />
                                                <span>{position.type}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <DollarSign className="w-4 h-4" />
                                                <span>{position.salary}</span>
                                            </div>
                                        </div>
                                        <p className="text-gray-300 mb-4">{position.description}</p>
                                        <div>
                                            <h4 className="text-white font-semibold mb-2">Requirements:</h4>
                                            <ul className="space-y-1">
                                                {position.requirements.map((req, i) => (
                                                    <li key={i} className="text-gray-400 flex items-center gap-2">
                                                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                                                        {req}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="mt-6 lg:mt-0 lg:ml-6">
                                        <motion.button
                                            className="w-full lg:w-auto px-8 py-3 bg-gradient-to-r from-orange-500 to-amber-600 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-amber-700 transition-all"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            Apply Now
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Application Process */}
            <section className="py-16 px-4">
                <div className="max-w-4xl mx-auto">
                    <motion.h2
                        className="text-4xl font-bold text-white text-center mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        Application Process
                    </motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { step: "01", title: "Apply", description: "Submit your application and resume through our careers portal." },
                            { step: "02", title: "Interview", description: "Phone/video interviews with our team to learn more about you." },
                            { step: "03", title: "Join Us", description: "Receive an offer and join our mission to help students save money!" },
                        ].map((item, index) => (
                            <motion.div
                                key={item.step}
                                className="text-center"
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                            >
                                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <span className="text-2xl font-bold text-white">{item.step}</span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                                <p className="text-gray-400">{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-16 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        className="bg-[#161b22] p-8 rounded-2xl border border-gray-800"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl font-bold text-white mb-4">Don't See Your Role?</h2>
                        <p className="text-gray-300 mb-6">
                            We're always looking for talented people to join our team. Send us your resume and tell us how you'd like to contribute to our mission.
                        </p>
                        <motion.button
                            className="px-8 py-3 bg-gradient-to-r from-orange-500 to-amber-600 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-amber-700 transition-all"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Email Us at careers@brokebro.com
                        </motion.button>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
