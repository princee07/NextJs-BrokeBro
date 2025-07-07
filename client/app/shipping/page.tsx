"use client";

import { motion } from "framer-motion";
import { Truck, Clock, MapPin, Package, ShieldCheck, AlertCircle } from "lucide-react";

export default function ShippingPage() {
    const shippingOptions = [
        {
            name: "Standard Shipping",
            price: "Free",
            duration: "5-7 business days",
            description: "Free shipping on orders over $50",
            icon: Truck
        },
        {
            name: "Express Shipping",
            price: "$9.99",
            duration: "2-3 business days",
            description: "Faster delivery for urgent orders",
            icon: Clock
        },
        {
            name: "Overnight Shipping",
            price: "$19.99",
            duration: "1 business day",
            description: "Next day delivery by 6 PM",
            icon: Package
        }
    ];

    const trackingSteps = [
        { status: "Order Confirmed", description: "Your order has been placed and confirmed" },
        { status: "Processing", description: "We're preparing your items for shipment" },
        { status: "Shipped", description: "Your order is on its way to you" },
        { status: "Out for Delivery", description: "Your package is out for delivery" },
        { status: "Delivered", description: "Your order has been delivered" }
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
                        Shipping{" "}
                        <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">
                            Information
                        </span>
                    </motion.h1>
                    <motion.p
                        className="text-xl text-gray-300 max-w-3xl mx-auto mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Learn about our shipping options, delivery times, and tracking information for your orders.
                    </motion.p>
                </div>
            </section>

            {/* Shipping Options */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <motion.h2
                        className="text-4xl font-bold text-white text-center mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        Shipping Options
                    </motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {shippingOptions.map((option, index) => (
                            <motion.div
                                key={option.name}
                                className="bg-[#161b22] p-6 rounded-xl border border-gray-800 hover:border-orange-500/50 transition-all"
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <option.icon className="w-12 h-12 text-orange-500 mb-4" />
                                <h3 className="text-xl font-bold text-white mb-2">{option.name}</h3>
                                <div className="text-2xl font-bold text-orange-400 mb-2">{option.price}</div>
                                <div className="text-gray-300 mb-4">{option.duration}</div>
                                <p className="text-gray-400">{option.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tracking Information */}
            <section className="py-16 px-4">
                <div className="max-w-4xl mx-auto">
                    <motion.h2
                        className="text-4xl font-bold text-white text-center mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        Order Tracking
                    </motion.h2>
                    <motion.div
                        className="bg-[#161b22] p-8 rounded-2xl border border-gray-800"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="space-y-6">
                            {trackingSteps.map((step, index) => (
                                <div key={step.status} className="flex items-center">
                                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                                        {index + 1}
                                    </div>
                                    <div>
                                        <h4 className="text-white font-semibold">{step.status}</h4>
                                        <p className="text-gray-400">{step.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 p-4 bg-gray-800/50 rounded-lg">
                            <h4 className="text-white font-semibold mb-2">Track Your Order</h4>
                            <p className="text-gray-400 mb-4">Enter your tracking number to see real-time updates:</p>
                            <div className="flex gap-4">
                                <input
                                    type="text"
                                    placeholder="Enter tracking number"
                                    className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                />
                                <motion.button
                                    className="px-6 py-2 bg-gradient-to-r from-orange-500 to-amber-600 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-amber-700 transition-all"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Track
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Important Information */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <motion.h2
                        className="text-4xl font-bold text-white text-center mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        Important Shipping Information
                    </motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <motion.div
                            className="bg-[#161b22] p-6 rounded-xl border border-gray-800"
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <ShieldCheck className="w-8 h-8 text-green-500 mb-4" />
                            <h3 className="text-xl font-bold text-white mb-4">Delivery Guarantee</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li>• Safe and secure packaging</li>
                                <li>• Insurance on all shipments</li>
                                <li>• Signature required for orders over $200</li>
                                <li>• Email notifications at every step</li>
                                <li>• Customer support for delivery issues</li>
                            </ul>
                        </motion.div>
                        <motion.div
                            className="bg-[#161b22] p-6 rounded-xl border border-gray-800"
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <AlertCircle className="w-8 h-8 text-yellow-500 mb-4" />
                            <h3 className="text-xl font-bold text-white mb-4">Shipping Restrictions</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li>• Currently shipping within the US only</li>
                                <li>• PO Box delivery available for most items</li>
                                <li>• Some items require ground shipping only</li>
                                <li>• Military APO/FPO addresses supported</li>
                                <li>• Additional fees may apply for remote areas</li>
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 px-4">
                <div className="max-w-4xl mx-auto">
                    <motion.h2
                        className="text-4xl font-bold text-white text-center mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        Shipping FAQ
                    </motion.h2>
                    <div className="space-y-6">
                        {[
                            {
                                question: "Do you offer free shipping?",
                                answer: "Yes! We offer free standard shipping on all orders over $50. Orders under $50 have a flat shipping rate of $5.99."
                            },
                            {
                                question: "Can I change my shipping address after placing an order?",
                                answer: "You can change your shipping address within 2 hours of placing your order. After that, please contact customer support immediately."
                            },
                            {
                                question: "What happens if my package is lost or damaged?",
                                answer: "All shipments are insured. If your package is lost or damaged, contact us immediately and we'll send a replacement or provide a full refund."
                            },
                            {
                                question: "Do you ship internationally?",
                                answer: "Currently, we only ship within the United States. We're working on expanding international shipping options."
                            }
                        ].map((faq, index) => (
                            <motion.div
                                key={index}
                                className="bg-[#161b22] p-6 rounded-xl border border-gray-800"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <h4 className="text-lg font-semibold text-white mb-3">{faq.question}</h4>
                                <p className="text-gray-400">{faq.answer}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
