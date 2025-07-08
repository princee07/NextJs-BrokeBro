"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function OurStoryPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };
  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden pt-48 pb-20">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-20 blur-3xl bg-gradient-to-r from-orange-400 to-pink-500"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-20 blur-3xl bg-gradient-to-r from-pink-500 to-orange-400"
          animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </div>
      <div className="relative z-10 max-w-3xl mx-auto px-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="text-center mb-12"
        >
          <motion.div variants={itemVariants} className="flex justify-center mb-6">
            <Image src="/assets/images/broke-bro.png" alt="BrokeBro Logo" width={120} height={120} className="rounded-full shadow-lg bg-white/10 p-2" />
          </motion.div>
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-orange-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"
          >
            Our Story
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-300 max-w-2xl mx-auto mb-6"
          >
            Ever said <span className="bg-orange-500/20 px-2 rounded font-semibold">"I'm broke"</span>? Yeah... same. <span className="inline-block animate-bounce">😅</span> BrokeBro was born out of late-night cravings, empty wallets, and the legendary phrase every Indian student lives by — <span className="italic text-orange-400 font-bold">Bhai, discount mil sakta hai kya?</span> <span className="inline-block animate-bounce">🤝</span>
          </motion.p>
        </motion.div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-8"
        >
          <motion.div variants={itemVariants} className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-orange-400/20 shadow-lg">
            <p className="text-lg text-gray-200 mb-2">
              We're a bunch of <span className="bg-orange-500/20 px-2 rounded font-semibold">broke students</span> (read: jugaadu geniuses) who were constantly hunting for student discounts — only to realize, most brands do offer them, but verifying you're a legit student? That was a bigger exam than your semester finals. <span className="inline-block animate-bounce">📝</span>
            </p>
            <p className="text-lg text-gray-200 mb-2">
              So, we made a platform <span className="bg-pink-500/20 px-2 rounded font-semibold">by students, for students</span> — to make sure every Indian student gets the perks they actually deserve. Because let's face it — being a student should be a <span className="bg-blue-500/20 px-2 rounded font-semibold">privilege, not a punishment</span>. <span className="inline-block animate-bounce">🎓</span>
            </p>
          </motion.div>
          <motion.div variants={itemVariants} className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-pink-400/20 shadow-lg">
            <p className="text-lg text-gray-200 mb-2">
              We're the <span className="bg-orange-500/20 px-2 rounded font-semibold">bridge between your college ID and your wishlist</span>. <span className="inline-block animate-bounce">🌉</span>
            </p>
            <p className="text-lg text-gray-200 mb-2">
              One quick verification → <span className="bg-pink-500/20 px-2 rounded font-semibold">Unlimited legit student deals</span>. <span className="inline-block animate-bounce">✨</span>
            </p>
            <p className="text-lg text-gray-200 mb-2">
              No shady hacks. No begging for codes. Just pure, <span className="bg-blue-500/20 px-2 rounded font-semibold">verified, student-powered savings</span>. <span className="inline-block animate-bounce">💸</span>
            </p>
          </motion.div>
          <motion.div variants={itemVariants} className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-blue-400/20 shadow-lg">
            <p className="text-lg text-gray-200 mb-2">
              Because when you say, <span className="italic text-orange-400 font-bold">Bro, I'm broke</span>, we say, <span className="italic text-pink-400 font-bold">Chill bro, we got you.</span> <span className="inline-block animate-bounce">😎</span>
            </p>
            <p className="text-lg text-gray-200 mb-2">
              We're not just a website. We're your <span className="bg-orange-500/20 px-2 rounded font-semibold">campus buddy</span>. Your <span className="bg-pink-500/20 px-2 rounded font-semibold">group chat homie</span>. That one friend who knows all the deals. <span className="inline-block animate-bounce">👥</span>
            </p>
            <p className="text-lg text-gray-200 mb-2">
              And we've built the whole experience to be as smooth, savage, and scroll-worthy as your IG feed. <span className="inline-block animate-bounce">📱</span>
            </p>
          </motion.div>
          <motion.div variants={itemVariants} className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-purple-400/20 shadow-lg">
            <p className="text-lg text-gray-200 mb-2">
              <span className="bg-orange-500/20 px-2 rounded font-semibold">Everything.</span> <span className="inline-block animate-bounce">💯</span>
            </p>
            <p className="text-lg text-gray-200 mb-2">
              While others are out there being corporate and confusing, we're out here being <span className="bg-pink-500/20 px-2 rounded font-semibold">Gen Z AF</span> — simple, relatable, and vibing with the exact chaos you live in. <span className="inline-block animate-bounce">🔥</span>
            </p>
            <p className="text-lg text-gray-200 mb-2">
              BrokeBro isn't just about discounts — it's about making student life <span className="bg-blue-500/20 px-2 rounded font-semibold">fun, rewarding, and just a little less broke</span>. <span className="inline-block animate-bounce">✨</span>
            </p>
          </motion.div>
        </motion.div>
        <div className="flex justify-center mt-10">
          <a href="/signup" className="px-8 py-4 rounded-2xl font-extrabold text-lg bg-gradient-to-r from-orange-400 via-pink-400 to-blue-400 text-white shadow-lg hover:scale-105 transition-transform duration-300">
            Join the Gang <span className="inline-block animate-bounce">🎯</span>
          </a>
        </div>
      </div>
    </div>
  );
}
