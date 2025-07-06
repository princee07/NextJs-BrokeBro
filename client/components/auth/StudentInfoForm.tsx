"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, GraduationCap, IdCard, MapPin, ArrowRight } from 'lucide-react';
import { StudentFormData } from '@/types/verification';

interface StudentInfoFormProps {
    initialData: StudentFormData;
    onSubmit: (data: StudentFormData) => void;
}

// Indian states for dropdown
const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
    'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli',
    'Daman and Diu', 'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep',
    'Puducherry'
];

export default function StudentInfoForm({ initialData, onSubmit }: StudentInfoFormProps) {
    const [formData, setFormData] = useState<StudentFormData>(initialData);
    const [errors, setErrors] = useState<Partial<StudentFormData>>({});

    const handleInputChange = (field: keyof StudentFormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Partial<StudentFormData> = {};

        if (!formData.studentName.trim()) {
            newErrors.studentName = 'Student name is required';
        } else if (formData.studentName.trim().length < 2) {
            newErrors.studentName = 'Name must be at least 2 characters';
        }

        if (!formData.collegeName.trim()) {
            newErrors.collegeName = 'College name is required';
        } else if (formData.collegeName.trim().length < 3) {
            newErrors.collegeName = 'College name must be at least 3 characters';
        }

        if (!formData.rollNo.trim()) {
            newErrors.rollNo = 'Roll number/Student ID is required';
        } else if (formData.rollNo.trim().length < 3) {
            newErrors.rollNo = 'Roll number must be at least 3 characters';
        }

        if (!formData.state) {
            newErrors.state = 'State is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit(formData);
        }
    };

    const inputFields = [
        {
            key: 'studentName' as keyof StudentFormData,
            label: 'Student Name',
            icon: User,
            placeholder: 'Enter your full name',
            type: 'text'
        },
        {
            key: 'collegeName' as keyof StudentFormData,
            label: 'College Name',
            icon: GraduationCap,
            placeholder: 'Enter your college/university name',
            type: 'text'
        },
        {
            key: 'rollNo' as keyof StudentFormData,
            label: 'Roll Number / Student ID',
            icon: IdCard,
            placeholder: 'Enter your roll number or student ID',
            type: 'text'
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
        >
            <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Student Information</h3>
                <p className="text-gray-400">
                    Please provide your basic student details to begin the verification process
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Input Fields */}
                {inputFields.map((field) => (
                    <div key={field.key} className="space-y-2">
                        <label className="block text-sm font-medium text-gray-300">
                            {field.label}
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <field.icon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type={field.type}
                                value={formData[field.key]}
                                onChange={(e) => handleInputChange(field.key, e.target.value)}
                                placeholder={field.placeholder}
                                className={`w-full pl-10 pr-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors[field.key]
                                        ? 'border-red-500 focus:ring-red-500'
                                        : 'border-gray-600 hover:border-gray-500'
                                    }`}
                            />
                        </div>
                        {errors[field.key] && (
                            <motion.p
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-red-400 text-sm"
                            >
                                {errors[field.key]}
                            </motion.p>
                        )}
                    </div>
                ))}

                {/* State Dropdown */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
                        State
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MapPin className="h-5 w-5 text-gray-400" />
                        </div>
                        <select
                            value={formData.state}
                            onChange={(e) => handleInputChange('state', e.target.value)}
                            className={`w-full pl-10 pr-4 py-3 bg-gray-800 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none ${errors.state
                                    ? 'border-red-500 focus:ring-red-500'
                                    : 'border-gray-600 hover:border-gray-500'
                                }`}
                        >
                            <option value="" className="text-gray-500">Select your state</option>
                            {indianStates.map((state) => (
                                <option key={state} value={state} className="text-white">
                                    {state}
                                </option>
                            ))}
                        </select>
                    </div>
                    {errors.state && (
                        <motion.p
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-red-400 text-sm"
                        >
                            {errors.state}
                        </motion.p>
                    )}
                </div>

                {/* Submit Button */}
                <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 group"
                >
                    Continue to Document Upload
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
            </form>

            {/* Info Box */}
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <User className="w-3 h-3 text-white" />
                    </div>
                    <div>
                        <h4 className="text-blue-400 font-medium mb-1">Why do we need this information?</h4>
                        <p className="text-gray-400 text-sm">
                            This information helps us verify your student status and provide you with exclusive
                            student discounts and benefits. All information is kept secure and confidential.
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
