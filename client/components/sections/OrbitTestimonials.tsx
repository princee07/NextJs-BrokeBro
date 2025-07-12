"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TESTIMONIALS = [
  {
    name: 'Lavanya',
    img: '/assets/people/Lavanya.jpeg',
    text: 'BrokeBro saved me ₹15,000 this semester! Perfect for student budgets with amazing deals.',
  },
  {
    name: 'Mohit',
    img: '/assets/people/mohit .jpg',
    text: 'Found my laptop 40% cheaper here! Great variety of tech products and brands.',
  },
  {
    name: 'Prince',
    img: '/assets/people/prince.jpg',
    text: 'Great deals and instant discounts! The UI is super clean and easy to navigate.',
  },
  {
    name: 'Prachi',
    img: '/assets/people/prachi.jpg',
    text: 'Great experience, very useful for saving money.',
  },
];

const SLIDE_DURATION = 5000; // 5 seconds per testimonial

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % TESTIMONIALS.length);
    }, SLIDE_DURATION);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full py-16 bg-gradient-to-br from-pink-300 via-purple-400 to-blue-400 dark:from-[#181824] dark:via-[#232946] dark:to-[#1a1a2e] transition-colors duration-500">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12 drop-shadow-lg">
          What Our Users Say
        </h2>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <div className="bg-white/80 dark:bg-[#232946]/80 rounded-2xl shadow-lg p-8 w-full max-w-2xl min-h-[120px] flex items-start">
              <div className="flex items-start gap-6 w-full">
                <img
                  src={TESTIMONIALS[currentIndex].img}
                  alt={TESTIMONIALS[currentIndex].name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-white dark:border-gray-600"
                />
                <div className="flex-1">
                  <p className="text-gray-800 dark:text-gray-200 text-lg font-medium">
                    "{TESTIMONIALS[currentIndex].text}"
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                    — {TESTIMONIALS[currentIndex].name}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="flex justify-center gap-2 mt-6">
          {TESTIMONIALS.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? 'bg-white' : 'bg-white/50'
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}