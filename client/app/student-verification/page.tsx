"use client";

import { motion } from "framer-motion";
import { GraduationCap, Shield, CheckCircle, Upload, Users, Award } from "lucide-react";
import { useState } from "react";

export default function StudentVerificationPage() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        email: "",
        schoolName: "",
        studentId: "",
        graduationYear: "",
        major: "",
    });

    const benefits = [
        {
            icon: Award,
            title: "Exclusive Discounts",
            description: "Access student-only deals up to 70% off on popular brands"
        },
        {
            icon: Shield,
            title: "Verified Status",
            description: "Get a verified student badge on your profile"
        },
        {
            icon: Users,
            title: "Student Community",
            description: "Connect with other verified students and share deals"
        },
        {
            icon: GraduationCap,
            title: "Extended Access",
            description: "Keep your benefits until graduation with annual verification"
        },
    ];

    const steps = [
        {
            title: "Personal Information",
            description: "Basic details and school information"
        },
        {
            title: "Upload Documents",
            description: "Student ID or enrollment verification"
        },
        {
            title: "Verification",
            description: "We'll verify your student status"
        },
        {
            title: "Complete",
            description: "Start saving with student discounts!"
        },
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleNext = () => {
        if (step < 4) setStep(step + 1);
    };

    const handlePrevious = () => {
        if (step > 1) setStep(step - 1);
    };

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
                        Student{" "}
                        <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">
                            Verification
                        </span>
                    </motion.h1>
                    <motion.p
                        className="text-xl text-gray-300 max-w-3xl mx-auto mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Verify your student status to unlock exclusive discounts and deals available only to verified students.
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
                        Why Verify Your Student Status?
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

            {/* Verification Form */}
            <section className="py-16 px-4">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        className="bg-[#161b22] p-8 rounded-2xl border border-gray-800"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Step Indicator */}
                        <div className="flex items-center justify-between mb-8">
                            {steps.map((stepItem, index) => (
                                <div key={index} className="flex items-center">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step > index + 1 ? 'bg-green-500' : step === index + 1 ? 'bg-orange-500' : 'bg-gray-600'
                                        }`}>
                                        {step > index + 1 ? (
                                            <CheckCircle className="w-5 h-5 text-white" />
                                        ) : (
                                            <span className="text-white font-semibold">{index + 1}</span>
                                        )}
                                    </div>
                                    <div className="ml-3 hidden md:block">
                                        <h4 className="text-white font-semibold">{stepItem.title}</h4>
                                        <p className="text-gray-400 text-sm">{stepItem.description}</p>
                                    </div>
                                    {index < steps.length - 1 && (
                                        <div className={`hidden md:block w-16 h-0.5 mx-4 ${step > index + 1 ? 'bg-green-500' : 'bg-gray-600'
                                            }`}></div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Form Content */}
                        <div className="min-h-96">
                            {step === 1 && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="space-y-6"
                                >
                                    <h3 className="text-2xl font-bold text-white mb-6">Personal Information</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-white font-semibold mb-2">Email Address</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                placeholder="your.email@university.edu"
                                                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-white font-semibold mb-2">School Name</label>
                                            <input
                                                type="text"
                                                name="schoolName"
                                                value={formData.schoolName}
                                                onChange={handleInputChange}
                                                placeholder="University of Example"
                                                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-white font-semibold mb-2">Student ID</label>
                                            <input
                                                type="text"
                                                name="studentId"
                                                value={formData.studentId}
                                                onChange={handleInputChange}
                                                placeholder="123456789"
                                                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-white font-semibold mb-2">Expected Graduation</label>
                                            <select
                                                name="graduationYear"
                                                value={formData.graduationYear}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                                            >
                                                <option value="">Select Year</option>
                                                <option value="2025">2025</option>
                                                <option value="2026">2026</option>
                                                <option value="2027">2027</option>
                                                <option value="2028">2028</option>
                                                <option value="2029">2029</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-white font-semibold mb-2">Major/Field of Study</label>
                                        <input
                                            type="text"
                                            name="major"
                                            value={formData.major}
                                            onChange={handleInputChange}
                                            placeholder="Computer Science"
                                            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        />
                                    </div>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="space-y-6"
                                >
                                    <h3 className="text-2xl font-bold text-white mb-6">Upload Documents</h3>
                                    <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-orange-500 transition-colors">
                                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                        <h4 className="text-white font-semibold mb-2">Upload Student ID or Enrollment Letter</h4>
                                        <p className="text-gray-400 mb-4">Supported formats: PDF, JPG, PNG (Max 5MB)</p>
                                        <motion.button
                                            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-600 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-amber-700 transition-all"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            Choose File
                                        </motion.button>
                                    </div>
                                    <div className="bg-gray-800/50 p-4 rounded-lg">
                                        <h4 className="text-white font-semibold mb-2">Acceptable Documents:</h4>
                                        <ul className="text-gray-400 space-y-1">
                                            <li>• Current student ID card (both sides)</li>
                                            <li>• Official enrollment letter</li>
                                            <li>• Current class schedule</li>
                                            <li>• Transcript (unofficial is fine)</li>
                                        </ul>
                                    </div>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="text-center space-y-6"
                                >
                                    <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto">
                                        <Shield className="w-8 h-8 text-orange-500" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white">Verification in Progress</h3>
                                    <p className="text-gray-400">
                                        We're reviewing your documents. This usually takes 1-2 business days.
                                        We'll send you an email once your verification is complete.
                                    </p>
                                    <div className="bg-gray-800/50 p-4 rounded-lg">
                                        <h4 className="text-white font-semibold mb-2">What happens next?</h4>
                                        <ul className="text-gray-400 space-y-2 text-left">
                                            <li>• Our team will review your submitted documents</li>
                                            <li>• You'll receive an email confirmation within 48 hours</li>
                                            <li>• Once verified, you'll have access to all student discounts</li>
                                            <li>• Your verification status will be updated on your profile</li>
                                        </ul>
                                    </div>
                                </motion.div>
                            )}

                            {step === 4 && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="text-center space-y-6"
                                >
                                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                                        <CheckCircle className="w-8 h-8 text-green-500" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white">Verification Complete!</h3>
                                    <p className="text-gray-400">
                                        Congratulations! Your student status has been verified. You now have access to exclusive student discounts.
                                    </p>
                                    <motion.button
                                        className="px-8 py-3 bg-gradient-to-r from-orange-500 to-amber-600 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-amber-700 transition-all"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        Start Browsing Deals
                                    </motion.button>
                                </motion.div>
                            )}
                        </div>

                        {/* Navigation Buttons */}
                        {step < 4 && (
                            <div className="flex justify-between mt-8">
                                <motion.button
                                    onClick={handlePrevious}
                                    disabled={step === 1}
                                    className="px-6 py-3 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    whileHover={{ scale: step === 1 ? 1 : 1.05 }}
                                    whileTap={{ scale: step === 1 ? 1 : 0.95 }}
                                >
                                    Previous
                                </motion.button>
                                <motion.button
                                    onClick={handleNext}
                                    className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-600 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-amber-700 transition-all"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {step === 3 ? 'Complete' : 'Next'}
                                </motion.button>
                            </div>
                        )}
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
