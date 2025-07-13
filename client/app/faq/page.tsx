"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from "lucide-react";
import { useState } from "react";

export default function FAQPage() {
    const [openFAQ, setOpenFAQ] = useState<number | null>(null);
    const [contactForm, setContactForm] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });
    const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const faqs = [
        {
            question: "How do I verify my student status?",
            answer: "To verify your student status, go to our Student Verification page and upload a current student ID, enrollment letter, or class schedule. Our team reviews documents within 1-2 business days."
        },
        {
            question: "What discounts are available to students?",
            answer: "Verified students get access to exclusive discounts from 200+ brands including technology (up to 50% off), fashion (up to 70% off), food delivery, software subscriptions, and entertainment services."
        },
        {
            question: "How long does my student verification last?",
            answer: "Student verification is valid for one academic year. You'll receive a reminder email before expiration to re-verify your status and continue enjoying student discounts."
        },
        {
            question: "Can I use multiple discount codes on the same purchase?",
            answer: "This depends on the specific brand's policy. Most retailers allow only one discount code per purchase, but some may allow stacking with their own promotions. Check the terms for each deal."
        },
        {
            question: "What should I do if a discount code doesn't work?",
            answer: "First, check if the code has expired or if you've met all requirements. If it still doesn't work, contact our support team with the code and retailer name, and we'll help resolve the issue within 24 hours."
        },
        {
            question: "Are BrokeBro's services free for students?",
            answer: "Yes! BrokeBro is completely free for students. We earn commission from partner brands when you make purchases, which allows us to provide our platform and deals at no cost to you."
        },
        {
            question: "How do you find these deals?",
            answer: "Our team works directly with brands to negotiate exclusive student discounts. We also monitor public promotions and verify all deals before posting them on our platform."
        },
        {
            question: "Can I suggest a brand for partnership?",
            answer: "Absolutely! We love hearing from our community. Send us your brand suggestions through our contact form, and we'll reach out to explore partnership opportunities."
        },
        {
            question: "Is my personal information safe?",
            answer: "Yes, we take privacy seriously. We use industry-standard encryption and never sell your personal information. Your data is only used to verify student status and provide personalized deals."
        },
        {
            question: "How do I delete my account?",
            answer: "You can delete your account anytime from your profile settings. All your personal data will be permanently removed within 30 days, as outlined in our Privacy Policy."
        }
    ];

    const contactMethods = [
        {
            icon: Mail,
            title: "Email Support",
            description: "Get help via email",
            contact: "brokebroindia@gmail.com",
            hours: "24/7 response within 6 hours"
        },
        {
            icon: Phone,
            title: "Phone Support",
            description: "Talk to our team",
            contact: "+91 76699 55109",
            hours: "Mon-Fri, 9 AM - 6 PM IST"
        }
    ];

    const handleContactSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus("loading");
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(contactForm),
            });
            if (res.ok) {
                setFormStatus("success");
                setContactForm({ name: "", email: "", subject: "", message: "" });
            } else {
                setFormStatus("error");
            }
        } catch {
            setFormStatus("error");
        }
    };

    return (
        <main className="min-h-screen pt-32 pb-10 px-4 max-w-3xl mx-auto">
            {/* Hero Section */}
            <section className="py-20 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <motion.h1
                        className="text-5xl md:text-6xl font-bold text-white mb-6"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        Frequently Asked{" "}
                        <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">
                            Questions
                        </span>
                    </motion.h1>
                    <motion.p
                        className="text-xl text-gray-300 max-w-3xl mx-auto mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Find answers to common questions about BrokeBro, student verification, and our discount platform.
                    </motion.p>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                className="bg-[#161b22] border border-gray-800 rounded-xl overflow-hidden"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <motion.button
                                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-800/50 transition-colors"
                                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                                    whileHover={{ backgroundColor: "rgba(31, 41, 55, 0.5)" }}
                                >
                                    <h3 className="text-lg font-semibold text-white">{faq.question}</h3>
                                    <motion.div
                                        animate={{ rotate: openFAQ === index ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </motion.div>
                                </motion.button>
                                <motion.div
                                    initial={false}
                                    animate={{
                                        height: openFAQ === index ? "auto" : 0,
                                        opacity: openFAQ === index ? 1 : 0
                                    }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden"
                                >
                                    <div className="px-6 pb-4">
                                        <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Methods */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <motion.h2
                        className="text-4xl font-bold text-white text-center mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        Still Need Help?
                    </motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        {contactMethods.map((method, index) => (
                            <motion.div
                                key={method.title}
                                className="bg-[#161b22] p-6 rounded-xl border border-gray-800 text-center hover:border-orange-500/50 transition-all"
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <method.icon className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-white mb-2">{method.title}</h3>
                                <p className="text-gray-400 mb-4">{method.description}</p>
                                <div className="text-orange-400 font-semibold mb-2">{method.contact}</div>
                                <div className="text-sm text-gray-500">{method.hours}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form */}
            <section className="py-16 px-4">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        className="bg-[#161b22] p-8 rounded-2xl border border-gray-800"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl font-bold text-white text-center mb-8">Send us a Message</h2>
                        <form onSubmit={handleContactSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-white font-semibold mb-2">Name</label>
                                    <input
                                        type="text"
                                        value={contactForm.name}
                                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        placeholder="Your full name"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-white font-semibold mb-2">Email</label>
                                    <input
                                        type="email"
                                        value={contactForm.email}
                                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        placeholder="your.email@example.com"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-white font-semibold mb-2">Subject</label>
                                <input
                                    type="text"
                                    value={contactForm.subject}
                                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    placeholder="Brief description of your inquiry"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-white font-semibold mb-2">Message</label>
                                <textarea
                                    value={contactForm.message}
                                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                                    rows={6}
                                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                                    placeholder="Tell us more about your question or issue..."
                                    required
                                />
                            </div>
                            <motion.button
                                type="submit"
                                className="w-full px-8 py-3 bg-gradient-to-r from-orange-500 to-amber-600 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-amber-700 transition-all flex items-center justify-center gap-2"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Send className="w-5 h-5" />
                                Send Message
                            </motion.button>
                            {formStatus === "success" && (
                                <div className="text-green-400 font-semibold text-center">Thank you! Your message has been sent to brokebroindia@gmail.com.</div>
                            )}
                            {formStatus === "error" && (
                                <div className="text-red-400 font-semibold text-center">Sorry, there was a problem sending your message. Please try again later.</div>
                            )}
                        </form>
                    </motion.div>
                </div>
            </section>

            {/* Quick Links */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <motion.h2
                        className="text-3xl font-bold text-white mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        Quick Links
                    </motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                            { title: "Student Verification Guide", link: "/student-verification" },
                            { title: "Privacy Policy", link: "/privacy" },
                            { title: "Terms of Service", link: "/terms" }
                        ].map((item, index) => (
                            <motion.a
                                key={item.title}
                                href={item.link}
                                className="block bg-[#161b22] p-4 rounded-lg border border-gray-800 hover:border-orange-500/50 transition-all"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <span className="text-orange-400 font-semibold">{item.title}</span>
                            </motion.a>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
