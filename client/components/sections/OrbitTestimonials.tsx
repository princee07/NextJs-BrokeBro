"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AVATARS = [
  {
    name: 'Alice',
    img: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    name: 'Bob',
    img: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name: 'Carol',
    img: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
  {
    name: 'Dave',
    img: 'https://randomuser.me/api/portraits/men/85.jpg',
  },
  {
    name: 'Eve',
    img: 'https://randomuser.me/api/portraits/women/65.jpg',
  },
  {
    name: 'Frank',
    img: 'https://randomuser.me/api/portraits/men/41.jpg',
  },
];

const TESTIMONIALS = [
  {
    avatar: AVATARS[0].img,
    text: 'Was your first day welcoming?',
  },
  {
    avatar: AVATARS[1].img,
    text: 'Are your role expectations clear?',
  },
  {
    avatar: AVATARS[2].img,
    text: 'Do you have the tools you need to do your job?',
  },
  {
    avatar: AVATARS[3].img,
    text: 'Do you feel comfortable asking questions?',
  },
  {
    avatar: AVATARS[4].img,
    text: 'How would you rate your onboarding?',
  },
];

const ORBIT_DURATION = 3; // seconds

export default function OrbitTestimonials() {
  const [showTestimonials, setShowTestimonials] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowTestimonials(true), ORBIT_DURATION * 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full min-h-[450px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-pink-300 via-purple-400 to-blue-400 dark:from-[#181824] dark:via-[#232946] dark:to-[#1a1a2e] transition-colors duration-500">
      <AnimatePresence mode="wait">
        {!showTestimonials ? (
          <motion.div
            key="orbit"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {/* Central Circle */}
            <div className="absolute z-10 flex items-center justify-center">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white font-bold text-xl md:text-2xl rounded-full w-40 h-40 flex items-center justify-center shadow-xl backdrop-blur-md">
                Onboarding<br />Survey
              </div>
            </div>
            {/* Orbiting Avatars */}
            <motion.div
              className="relative w-[400px] h-[400px]"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: ORBIT_DURATION, ease: 'linear' }}
            >
              {/* Orbit Circles */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="border border-white/30 rounded-full w-full h-full absolute" />
                <div className="border border-white/20 rounded-full w-3/4 h-3/4 absolute" />
              </div>
              {AVATARS.map((avatar, i) => {
                const angle = (i / AVATARS.length) * 2 * Math.PI;
                const radius = 160;
                const x = Math.cos(angle) * radius + 200 - 32; // 32 = avatar size/2
                const y = Math.sin(angle) * radius + 200 - 32;
                return (
                  <div
                    key={avatar.name}
                    className="absolute"
                    style={{ left: x, top: y }}
                  >
                    <img
                      src={avatar.img}
                      alt={avatar.name}
                      className="w-16 h-16 rounded-full border-4 border-white shadow-lg object-cover"
                    />
                  </div>
                );
              })}
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="testimonials"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.8 }}
            className="w-full flex flex-col items-center"
          >
            <h2 className="text-white text-2xl md:text-3xl font-bold mb-8 drop-shadow-lg">Analyze key themes</h2>
            <div className="flex flex-wrap justify-center gap-6 w-full max-w-4xl">
              {TESTIMONIALS.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
                  className="bg-white/80 dark:bg-[#232946]/80 rounded-2xl shadow-xl px-6 py-4 flex items-center gap-4 min-w-[260px] max-w-[320px] backdrop-blur-md"
                >
                  <img src={t.avatar} alt="avatar" className="w-12 h-12 rounded-full object-cover border-2 border-white" />
                  <div className="text-gray-800 dark:text-gray-100 font-medium text-base">{t.text}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 