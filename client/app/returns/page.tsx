"use client";

import { motion } from "framer-motion";
import { RotateCcw, Package, CreditCard, Clock, CheckCircle, AlertTriangle } from "lucide-react";

export default function ReturnsPage() {
    const returnProcess = [
        {
            step: 1,
            title: "Request Return",
            description: "Log into your account and request a return within 30 days",
            icon: RotateCcw
        },
        {
            step: 2,
            title: "Pack Item",
            description: "Pack the item in original packaging with all accessories",
            icon: Package
        },
        {
            step: 3,
            title: "Ship Back",
            description: "Use our prepaid return label to send the item back",
            icon: Clock
        },
        {
            step: 4,
            title: "Get Refund",
            description: "Receive your refund within 5-7 business days",
            icon: CreditCard
        }
    ];

    const returnPolicies = [
        {
            category: "Electronics",
            returnWindow: "30 days",
            condition: "Original packaging required",
            restockingFee: "None",
            icon: "📱"
        },
        {
            category: "Clothing & Accessories",
            returnWindow: "60 days",
            condition: "Tags attached, unworn",
            restockingFee: "None",
            icon: "👕"
        },
        {
            category: "Books & Media",
            returnWindow: "30 days",
            condition: "Unopened condition",
            restockingFee: "None",
            icon: "📚"
        },
        {
            category: "Software",
            returnWindow: "14 days",
            condition: "Unopened, unused license",
            restockingFee: "None",
            icon: "💾"
        }
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
                        Returns &{" "}
                        <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">
                            Refunds
                        </span>
                    </motion.h1>
                    <motion.p
                        className="text-xl text-gray-300 max-w-3xl mx-auto mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Easy returns and hassle-free refunds. Your satisfaction is our priority.
                    </motion.p>
                </div>
            </section>

            {/* Return Process */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <motion.h2
                        className="text-4xl font-bold text-white text-center mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        How to Return an Item
                    </motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {returnProcess.map((step, index) => (
                            <motion.div
                                key={step.step}
                                className="bg-[#161b22] p-6 rounded-xl border border-gray-800 text-center hover:border-orange-500/50 transition-all"
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <step.icon className="w-8 h-8 text-white" />
                                </div>
                                <div className="text-sm text-orange-400 font-semibold mb-2">STEP {step.step}</div>
                                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                                <p className="text-gray-400">{step.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Return Policies by Category */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <motion.h2
                        className="text-4xl font-bold text-white text-center mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        Return Policies by Category
                    </motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {returnPolicies.map((policy, index) => (
                            <motion.div
                                key={policy.category}
                                className="bg-[#161b22] p-6 rounded-xl border border-gray-800 hover:border-orange-500/50 transition-all"
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                whileHover={{ scale: 1.02 }}
                            >
                                <div className="flex items-center mb-4">
                                    <div className="text-2xl mr-3">{policy.icon}</div>
                                    <h3 className="text-xl font-bold text-white">{policy.category}</h3>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Return Window:</span>
                                        <span className="text-green-400 font-semibold">{policy.returnWindow}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Condition:</span>
                                        <span className="text-white">{policy.condition}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Restocking Fee:</span>
                                        <span className="text-green-400 font-semibold">{policy.restockingFee}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Return Request Form */}
            <section className="py-16 px-4">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        className="bg-[#161b22] p-8 rounded-2xl border border-gray-800"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl font-bold text-white text-center mb-8">Start a Return Request</h2>
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-white font-semibold mb-2">Order Number</label>
                                    <input
                                        type="text"
                                        placeholder="e.g., ORD-123456"
                                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-white font-semibold mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        placeholder="your.email@example.com"
                                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-white font-semibold mb-2">Item to Return</label>
                                <select className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500">
                                    <option value="">Select an item</option>
                                    <option value="laptop">MacBook Pro 13" - Silver</option>
                                    <option value="headphones">Sony WH-1000XM4 Headphones</option>
                                    <option value="phone">iPhone 15 Pro - 256GB</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-white font-semibold mb-2">Reason for Return</label>
                                <select className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500">
                                    <option value="">Select a reason</option>
                                    <option value="defective">Defective/Damaged</option>
                                    <option value="wrong-item">Wrong item received</option>
                                    <option value="not-as-described">Not as described</option>
                                    <option value="changed-mind">Changed my mind</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-white font-semibold mb-2">Additional Comments</label>
                                <textarea
                                    rows={4}
                                    placeholder="Please provide additional details about your return..."
                                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                                />
                            </div>
                            <motion.button
                                type="submit"
                                className="w-full px-8 py-3 bg-gradient-to-r from-orange-500 to-amber-600 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-amber-700 transition-all"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Submit Return Request
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </section>

            {/* Important Notes */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <motion.div
                            className="bg-[#161b22] p-6 rounded-xl border border-gray-800"
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <CheckCircle className="w-8 h-8 text-green-500 mb-4" />
                            <h3 className="text-xl font-bold text-white mb-4">What's Included</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li>• Free return shipping labels</li>
                                <li>• Full refund to original payment method</li>
                                <li>• No restocking fees on most items</li>
                                <li>• Exchange options available</li>
                                <li>• 24/7 customer support</li>
                            </ul>
                        </motion.div>
                        <motion.div
                            className="bg-[#161b22] p-6 rounded-xl border border-gray-800"
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <AlertTriangle className="w-8 h-8 text-yellow-500 mb-4" />
                            <h3 className="text-xl font-bold text-white mb-4">Important Notes</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li>• Returns must be initiated within policy window</li>
                                <li>• Items must be in original condition</li>
                                <li>• Personalized items cannot be returned</li>
                                <li>• Digital products are non-returnable</li>
                                <li>• Return shipping address will be provided</li>
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Contact Support */}
            <section className="py-16 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        className="bg-[#161b22] p-8 rounded-2xl border border-gray-800"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl font-bold text-white mb-4">Need Help with Your Return?</h2>
                        <p className="text-gray-300 mb-6">
                            Our customer support team is here to help you with any questions about returns or refunds.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <motion.button
                                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-600 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-amber-700 transition-all"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Live Chat Support
                            </motion.button>
                            <motion.button
                                className="px-6 py-3 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 transition-all"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Email Us
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
