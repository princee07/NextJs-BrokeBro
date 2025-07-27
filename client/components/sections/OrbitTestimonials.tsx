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
    <div className="relative w-full py-16 bg-gradient-to-br from-yellow-100 via-green-100 to-blue-100 transition-colors duration-500">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 drop-shadow-lg text-black">
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
            <div className="bg-gradient-to-r from-yellow-50 via-green-50 to-blue-50 rounded-2xl shadow-lg p-8 w-full max-w-2xl min-h-[120px] flex items-start">
              <div className="flex items-start gap-6 w-full">
                <img
                  src={TESTIMONIALS[currentIndex].img}
                  alt={TESTIMONIALS[currentIndex].name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-white dark:border-gray-600"
                />
                <div className="flex-1">
                  <p className="text-gray-800 text-lg font-medium">
                    "{TESTIMONIALS[currentIndex].text}"
                  </p>
                  <p className="text-gray-600 text-sm mt-2">
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
              className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-yellow-400' : 'bg-yellow-200'
                }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}