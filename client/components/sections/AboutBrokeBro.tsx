import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const AboutBrokeBro = () => {
  return (
    <section className="w-full py-20 bg-[#FAFAF6] relative overflow-hidden">
      {/* Decorative animated background elements */}
      <motion.div
        className="absolute -top-24 -left-24 w-72 h-72 rounded-full opacity-20 blur-3xl bg-gradient-to-br from-orange-200 to-pink-100 z-0"
        animate={{ scale: [1, 1.1, 1], rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full opacity-20 blur-3xl bg-gradient-to-tr from-blue-100 to-purple-100 z-0"
        animate={{ scale: [1, 1.1, 1], rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      {/* Floating dots animation */}
      <motion.div
        className="absolute top-10 left-10 w-4 h-4 bg-orange-300 rounded-full opacity-50 z-0"
        animate={{ y: [0, -10, 0], opacity: [0.5, 0.7, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-4 h-4 bg-purple-300 rounded-full opacity-50 z-0"
        animate={{ y: [0, 10, 0], opacity: [0.5, 0.7, 0.5] }}
        transition={{ duration: 3.5, repeat: Infinity }}
      />

      <motion.div
        className="w-full px-0 relative z-10 flex flex-col items-center text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="mb-8 w-full flex justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative w-full max-w-4xl h-32 md:h-56">
            <Image
              src="/assets/About.png"
              alt="About BrokeBro"
              fill
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
        </motion.div>
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-black mb-3 w-full"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          About <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">BrokeBro</span>
        </motion.h2>
        <motion.p
          className="w-full max-w-xl mx-auto text-gray-700 text-base md:text-lg mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          BrokeBro is your ultimate student savings companion, designed to empower students with exclusive discounts, unbeatable deals, and a rewarding referral program. Launched with a mission to make education affordable and fun, we partner with top brands to bring you verified offers tailored for students. From fashion and tech to travel and lifestyle, BrokeBro simplifies saving while you study. Join a community of savvy students, earn coins through referrals, and unlock a world of perks—because every penny counts!
        </motion.p>
        <motion.div
          className="flex flex-wrap justify-center gap-6 mt-2 w-full"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.div
            className="bg-gradient-to-br from-orange-50 to-amber-100 rounded-xl shadow-lg p-6 w-64 border border-orange-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            whileHover={{ scale: 1.05, rotate: 2 }}
          >
            <h3 className="text-xl font-semibold text-orange-600 mb-2 flex items-center justify-center gap-2">
              <span>Exclusive Discounts</span>
              <motion.span
                className="text-2xl"
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                🎁
              </motion.span>
            </h3>
            <p className="text-gray-700 text-base">Unlock verified student deals on top brands like Nike, Adidas, and more!</p>
          </motion.div>
          <motion.div
            className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-xl shadow-lg p-6 w-64 border border-purple-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            whileHover={{ scale: 1.05, rotate: -2 }}
          >
            <h3 className="text-xl font-semibold text-purple-600 mb-2 flex items-center justify-center gap-2">
              <span>Refer & Earn</span>
              <motion.span
                className="text-2xl"
                animate={{ rotate: [0, -15, 15, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                💸
              </motion.span>
            </h3>
            <p className="text-gray-700 text-base">Invite friends, earn 10 coins each, and boost your savings!</p>
          </motion.div>
          <motion.div
            className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl shadow-lg p-6 w-64 border border-blue-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            whileHover={{ scale: 1.05, rotate: 2 }}
          >
            <h3 className="text-xl font-semibold text-blue-600 mb-2 flex items-center justify-center gap-2">
              <span>Top Brands</span>
              <motion.span
                className="text-2xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ⭐
              </motion.span>
            </h3>
            <p className="text-gray-700 text-base">Discover the best offers from your favorite brands in one spot!</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutBrokeBro;