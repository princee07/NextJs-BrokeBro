"use client";
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function InternshipHero() {
  return (
    <section className="w-full min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-white via-[#f6f8fc] to-[#e9eaf3] relative overflow-hidden py-8 md:py-0">
      <div className="max-w-7xl w-full flex flex-col md:flex-row items-center justify-between gap-10 px-6 md:px-12">
        {/* Left Side: Text Content */}
        <motion.div
          className="flex-1 flex flex-col items-start gap-6 z-10"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Investing in <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Knowledge and<br />Your Future</span>
          </h1>
          <p className="text-gray-500 text-base md:text-lg max-w-lg">
            Our e-learning programs have been developed to be a vehicle of delivering multimedia learning solutions for your business.
          </p>
          <div className="flex items-center gap-6 mt-2">
            <motion.a
              href="#contact"
              className="px-7 py-3 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 text-white font-semibold shadow-lg hover:from-purple-500 hover:to-blue-600 transition-all text-base"
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.97 }}
            >
              Contact
            </motion.a>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-gray-900">50+</span>
              <span className="text-xs text-gray-500">Career Courses</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-gray-900">1M+</span>
              <span className="text-xs text-gray-500">Our Students</span>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Image & Floating Cards */}
        <div className="flex-1 flex items-center justify-center relative min-h-[400px]">
          {/* Abstract Background */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-0"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
          >
            <svg width="420" height="420" viewBox="0 0 420 420" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="210" cy="210" r="180" fill="#e0e7ff" fillOpacity="0.4" />
              <circle cx="210" cy="210" r="140" fill="#c7d2fe" fillOpacity="0.3" />
              <circle cx="210" cy="210" r="100" fill="#a5b4fc" fillOpacity="0.2" />
            </svg>
          </motion.div>
          {/* Student Image */}
          <motion.div
            className="relative z-10"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
          >
            <Image
              src="/assets/images/hero-internship.png" // Replace with your actual image
              alt="Student"
              width={320}
              height={400}
              className="rounded-2xl shadow-2xl object-cover bg-white"
              priority
            />
          </motion.div>
          {/* Floating Stat Badge */}
          <motion.div
            className="absolute top-8 left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-lg px-5 py-3 flex items-center gap-2 z-20 border border-gray-100"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
          >
            <span className="block w-3 h-3 rounded-full bg-red-400"></span>
            <span className="font-bold text-gray-800">175K</span>
            <span className="text-xs text-gray-500">Awarded Students</span>
          </motion.div>
          {/* Floating Chart Card */}
          <motion.div
            className="absolute bottom-8 right-8 bg-white rounded-2xl shadow-xl px-6 py-4 z-20 border border-gray-100"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 1 }}
          >
            <span className="font-semibold text-gray-700 text-sm mb-2 block">Learning Chart</span>
            {/* Simple bar chart mockup */}
            <div className="flex items-end gap-1 h-16">
              <div className="w-3 h-6 bg-blue-400 rounded"></div>
              <div className="w-3 h-10 bg-purple-400 rounded"></div>
              <div className="w-3 h-12 bg-orange-400 rounded"></div>
              <div className="w-3 h-8 bg-green-400 rounded"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 