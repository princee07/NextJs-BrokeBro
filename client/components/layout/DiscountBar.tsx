"use client"

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const blackGrayGradient = 'from-black via-gray-800 to-gray-900';

const DiscountBar = () => {
  return (
    <div
      className={`fixed top-0 left-0 w-full z-[100] bg-gradient-to-r ${blackGrayGradient} text-white text-sm md:text-base font-bold flex items-center justify-center h-8 md:h-10 cursor-pointer select-none shadow-lg shadow-black/10`}
      style={{ letterSpacing: '0.02em' }}
      role="banner"
      tabIndex={0}
      aria-label="Discount announcement bar"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <motion.span
        className="flex items-center gap-8 whitespace-nowrap"
        initial={{ x: '100%' }}
        animate={{ x: '-100%' }}
        transition={{
          repeat: Infinity,
          repeatType: 'loop',
          duration: 32,
          ease: 'linear',
        }}
      >
        <img src="/assets/images/indian-flag.png" alt="Indian Flag" className="inline-block w-6 h-4 rounded-sm mr-2 border border-white/30 shadow" style={{marginBottom: '-2px'}} />
        <span className="flex items-center gap-2">
          <span role="img" aria-label="party">🎉</span>
          <span className="font-extrabold text-white tracking-widest">BrokeBro</span>
          <span className="ml-2">| Use Code <span className="mx-1 text-yellow-200 drop-shadow">LOVE10</span> to get 10% extra OFF</span>
          <span role="img" aria-label="star-struck">🤩</span>
        </span>
        <span className="flex items-center gap-2">
          <span role="img" aria-label="fire">🔥</span>
          <span>Flat 50% OFF on Student Subscriptions</span>
        </span>
        <span className="flex items-center gap-2">
          <span role="img" aria-label="gift">🎁</span>
          <span>Special Cashback on First Order</span>
        </span>
        <span className="flex items-center gap-2">
          <span role="img" aria-label="rocket">🚀</span>
          <span>Refer a friend &amp; earn rewards!</span>
        </span>
      </motion.span>
    </div>
  );
};

export default DiscountBar; 