"use client"

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import ModalAd from '../ModalAd';
import Modal from '../ui/Modal';

// Pop sound path
const popSoundPath = '/assets/sounds/pop.mp4';

const Hero = () => {
  const [typedText, setTypedText] = useState('');
  const [currentDealIndex, setCurrentDealIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [showAd, setShowAd] = useState(false);
  const [adIndex, setAdIndex] = useState(0);
  const adTimeout = useRef<NodeJS.Timeout | null>(null);
  const [showBrandModal, setShowBrandModal] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<any>(null);

  // Text to type out
  const fullText = "STUDENT DISCOUNTS UNLOCKED";

  // Deal headings that will appear sequentially
  const dealHeadings = [
    "Save 50% on Software Subscriptions",
    "Get 30% Off Tech Purchases"
  ];

  // Ad data
  const ads = [
    {
      imageUrl: "https://soxytoes.com/cdn/shop/files/Theme_1A_Website.png?v=1697116566&width=2000",
      linkUrl: "https://www.myunidays.com/IN/en-IN"
    },
    {
      imageUrl: "https://soxytoes.com/cdn/shop/files/Theme_3_Website.png?v=1697116591&width=2000",
      linkUrl: "https://www.udemy.com/"
    },
    {
      imageUrl: "https://soxytoes.com/cdn/shop/files/Theme_2A_Website.png?v=1697116587&width=2000",
      linkUrl: "https://www.adidas.com/"
    }
  ];

  // Typing effect
  useEffect(() => {
    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.substring(0, typedText.length + 1));
      }, 75);

      return () => clearTimeout(timeout);
    } else {
      const resetTimeout = setTimeout(() => {
        setTypedText('');
      }, 3000);

      return () => clearTimeout(resetTimeout);
    }
  }, [typedText, fullText]);

  // Blinking cursor effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // Rotate through deal headings
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDealIndex(prev => (prev + 1) % dealHeadings.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Show ad with sound after full page load
  useEffect(() => {
    const handleLoad = () => {
      setShowAd(true);
      const audio = new Audio(popSoundPath);
      audio.play();
    };
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }
    return () => window.removeEventListener('load', handleLoad);
  }, []);

  // Auto-advance ads every 4 seconds
  useEffect(() => {
    if (!showAd) return;
    adTimeout.current = setTimeout(() => {
      setAdIndex((prev) => (prev + 1) % ads.length);
      const audio = new Audio(popSoundPath);
      audio.play();
    }, 4000);
    return () => { if (adTimeout.current) clearTimeout(adTimeout.current); };
  }, [adIndex, showAd]);

  const brandCards = [
    {
      name: 'lenovo',
      logo: '/assets/images/figma.png',
      gradient: 'from-blue-400 to-teal-300',
      slug: 'autodesk',
      discount: '60% OFF'
    },
    {
      name: 'GoIbibo',
      logo: '/assets/images/goibibo.png',
      gradient: 'from-orange-500 to-red-400',
      slug: 'goibibo',
      discount: '₹1000 OFF'
    },
    {
      name: 'Unity',
      logo: '/assets/images/unity.png',
      gradient: 'from-gray-700 to-gray-900',
      slug: 'unity',
      discount: '50% OFF'
    },
    {
      name: 'KFC',
      logo: '/assets/images/kfc.png',
      gradient: 'from-red-600 to-red-700',
      slug: 'kfc',
      discount: '30% OFF'
    }
  ];

  // Duplicate cards for smooth infinite scrolling
  const column1Cards = [...brandCards.slice(0, 2), ...brandCards.slice(0, 2)];
  const column2Cards = [...brandCards.slice(2), ...brandCards.slice(2)];

  // Ensure only the animated right-side ModalAd is rendered. Remove all other modal ads.
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Only the animated ModalAd at right side, large, swipe/fade animation. No other modal ads anywhere. */}
      <AnimatePresence mode="wait">
        {showAd && (
          <motion.div
            key={adIndex}
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30, opacity: { duration: 0.3 } }}
            className="fixed top-24 right-0 z-50 w-[420px] h-[180px] max-w-full flex items-center"
            style={{ boxShadow: '0 8px 32px 0 rgba(0,0,0,0.25)' }}
          >
            <ModalAd
              key={ads[adIndex].imageUrl}
              imageUrl={ads[adIndex].imageUrl}
              linkUrl={ads[adIndex].linkUrl}
              className="w-full h-full"
              onClose={() => {
                setShowAd(false);
                const audio = new Audio(popSoundPath);
                audio.play();
              }}
            />
            {/* Next/Prev controls */}
            <button
              onClick={() => {
                setAdIndex((adIndex - 1 + ads.length) % ads.length);
                const audio = new Audio(popSoundPath); audio.play();
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full p-1 z-10"
              aria-label="Previous ad"
            >
              &#8592;
            </button>
            <button
              onClick={() => {
                setAdIndex((adIndex + 1) % ads.length);
                const audio = new Audio(popSoundPath); audio.play();
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full p-1 z-10"
              aria-label="Next ad"
            >
              &#8594;
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-black to-black"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        {/* Animated gradient blobs */}
        <motion.div
          className="absolute top-10 left-10 w-72 h-72 bg-purple-700/20 rounded-full filter blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div
          className="absolute top-20 right-20 w-96 h-96 bg-orange-500/10 rounded-full filter blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 2
          }}
        />
      </div>

      {/* Content Container */}
      <div className="container mx-auto px-4 pb-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center">
          {/* Hero Text Content - WITH FIXED SPACING */}
          <div className="w-full lg:w-1/2 mb-10 lg:mb-0 lg:sticky lg:top-32 mt-56">
            {/* Fixed height container for main heading */}
            <div className="h-[130px] md:h-[150px]">
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                {/* Main heading with REDUCED font size */}
                <div className="flex items-center">
                  <h1 className="text-4xl md:text-6xl font-extrabold">
                    <span className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent inline-block">
                      {typedText}
                      <span className={`inline-block w-1 h-10 bg-orange-400 ml-1 align-middle ${showCursor ? 'opacity-100' : 'opacity-0'}`}></span>
                    </span>
                  </h1>
                </div>
              </motion.div>
            </div>

            {/* Deal headings with spacing to prevent overlap */}
            <div className="mt-8">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentDealIndex}
                  className="text-xl md:text-2xl text-gray-300 font-medium"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {dealHeadings[currentDealIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Description with good spacing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-10"
            >
              <p className="text-xl text-gray-300 max-w-xl leading-relaxed">
                <span className="font-semibold text-orange-400">College is expensive enough.</span> We've partnered with top brands to bring you
                exclusive student discounts that make a difference.
              </p>

              {/* Feature list */}
              <ul className="mt-6 space-y-3">
                {[
                  "Verified with your student ID or .edu email",
                  "Exclusive deals not available to the public"
                ].map((feature, index) => (
                  <motion.li
                    key={feature}
                    className="flex items-center text-gray-300"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 + (index * 0.15) }}
                  >
                    <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-full p-1 mr-3 shadow-md shadow-orange-500/20">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    {feature}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              className="mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.3 }}
            >
              <Link href="/auth/signup">
                <motion.div
                  className="relative inline-block bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white font-bold text-lg py-4 px-8 rounded-full transition-all duration-300 overflow-hidden hover:shadow-lg hover:shadow-orange-600/20"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="flex items-center relative z-10">
                    Get Student Discounts
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </motion.div>
              </Link>
            </motion.div>
          </div>

          {/* Vertical Sliding Columns */}
          <div className="w-full lg:w-1/2 pl-0 lg:pl-6 mt-44">
            <div className="grid grid-cols-2 gap-3 h-[500px] md:h-[650px] overflow-hidden rounded-2xl">
              {/* Left Column - Sliding Downward */}
              <div className="relative h-full overflow-hidden">
                <motion.div
                  className="absolute top-0 left-0 w-full"
                  animate={{
                    y: [0, -1500] // Move upward
                  }}
                  transition={{
                    duration: 30,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "linear"
                  }}
                >
                  {column1Cards.map((brand, index) => (
                    <div
                      key={`col1-${index}`}
                      onClick={() => { setSelectedBrand(brand); setShowBrandModal(true); }}
                      className={`relative ${index === 0 ? '' : 'mt-3'} h-[250px] rounded-2xl overflow-hidden group cursor-pointer`}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${brand.gradient}`}></div>
                      {/* Student Discount Badge */}
                      <div className="absolute top-4 left-0 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-1 px-4 rounded-r-full shadow-lg transform -translate-x-1 group-hover:translate-x-0 transition-transform duration-300">
                        <span className="text-sm">STUDENT DEAL</span>
                      </div>
                      <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white font-bold py-1 px-3 rounded-full shadow-lg">
                        <span className="text-sm">{brand.discount}</span>
                      </div>
                      <div className="relative h-full flex items-center justify-center p-6">
                        <Image
                          src={brand.logo}
                          alt={brand.name}
                          width={300}
                          height={400}
                          style={{ objectFit: 'contain', maxWidth: '100%', maxHeight: '65%', marginTop: '32px' }}
                          className="transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                      <div className="absolute bottom-0 w-full bg-black/60 backdrop-blur-sm p-4">
                        <p className="text-white font-semibold">{brand.name} Student Deals</p>
                      </div>
                    </div>
                  ))}
                </motion.div>

                {/* Clone for seamless looping */}
                <motion.div
                  className="absolute top-0 left-0 w-full"
                  initial={{ y: 1500 }}
                  animate={{
                    y: [1500, 0]
                  }}
                  transition={{
                    duration: 30,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "linear"
                  }}
                >
                  {column1Cards.map((brand, index) => (
                    <div
                      key={`col1-clone-${index}`}
                      onClick={() => { setSelectedBrand(brand); setShowBrandModal(true); }}
                      className={`relative ${index === 0 ? '' : 'mt-3'} h-[250px] rounded-2xl overflow-hidden group cursor-pointer`}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${brand.gradient}`}></div>
                      {/* Student Discount Badge */}
                      <div className="absolute top-4 left-0 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-1 px-4 rounded-r-full shadow-lg transform -translate-x-1 group-hover:translate-x-0 transition-transform duration-300">
                        <span className="text-sm">STUDENT DEAL</span>
                      </div>
                      <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white font-bold py-1 px-3 rounded-full shadow-lg">
                        <span className="text-sm">{brand.discount}</span>
                      </div>
                      <div className="relative h-full flex items-center justify-center p-6">
                        <Image
                          src={brand.logo}
                          alt={brand.name}
                          width={300}
                          height={400}
                          style={{ objectFit: 'contain', maxWidth: '100%', maxHeight: '65%', marginTop: '32px' }}
                          className="transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                      <div className="absolute bottom-0 w-full bg-black/60 backdrop-blur-sm p-4">
                        <p className="text-white font-semibold">{brand.name} Student Deals</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Right Column */}
              <div className="relative h-full overflow-hidden">
                <motion.div
                  className="absolute top-0 left-0 w-full"
                  animate={{
                    y: [0, 1500]
                  }}
                  transition={{
                    duration: 28,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "linear"
                  }}
                >
                  {column2Cards.map((brand, index) => (
                    <div
                      key={`col2-${index}`}
                      onClick={() => { setSelectedBrand(brand); setShowBrandModal(true); }}
                      className={`relative ${index === 0 ? '' : 'mt-3'} h-[250px] rounded-2xl overflow-hidden group cursor-pointer`}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${brand.gradient}`}></div>
                      <div className="absolute top-4 left-0 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-1 px-4 rounded-r-full shadow-lg transform -translate-x-1 group-hover:translate-x-0 transition-transform duration-300">
                        <span className="text-sm">STUDENT DEAL</span>
                      </div>
                      <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white font-bold py-1 px-3 rounded-full shadow-lg">
                        <span className="text-sm">{brand.discount}</span>
                      </div>
                      <div className="relative h-full flex items-center justify-center p-6">
                        <Image
                          src={brand.logo}
                          alt={brand.name}
                          width={300}
                          height={400}
                          style={{ objectFit: 'contain', maxWidth: '100%', maxHeight: '65%', marginTop: '32px' }}
                          className="transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                      <div className="absolute bottom-0 w-full bg-black/60 backdrop-blur-sm p-4">
                        <p className="text-white font-semibold">{brand.name} Student Deals</p>
                      </div>
                    </div>
                  ))}
                </motion.div>

                {/* Clone for seamless looping */}
                <motion.div
                  className="absolute top-0 left-0 w-full"
                  initial={{ y: -1500 }}
                  animate={{
                    y: [-1500, 0]
                  }}
                  transition={{
                    duration: 28,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "linear"
                  }}
                >
                  {column2Cards.map((brand, index) => (
                    <div
                      key={`col2-clone-${index}`}
                      onClick={() => { setSelectedBrand(brand); setShowBrandModal(true); }}
                      className={`relative ${index === 0 ? '' : 'mt-3'} h-[250px] rounded-2xl overflow-hidden group cursor-pointer`}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${brand.gradient}`}></div>
                      <div className="absolute top-4 left-0 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-1 px-4 rounded-r-full shadow-lg transform -translate-x-1 group-hover:translate-x-0 transition-transform duration-300">
                        <span className="text-sm">STUDENT DEAL</span>
                      </div>
                      <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white font-bold py-1 px-3 rounded-full shadow-lg">
                        <span className="text-sm">{brand.discount}</span>
                      </div>
                      <div className="relative h-full flex items-center justify-center p-6">
                        <Image
                          src={brand.logo}
                          alt={brand.name}
                          width={300}
                          height={400}
                          style={{ objectFit: 'contain', maxWidth: '100%', maxHeight: '65%', marginTop: '32px' }}
                          className="transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                      <div className="absolute bottom-0 w-full bg-black/60 backdrop-blur-sm p-4">
                        <p className="text-white font-semibold">{brand.name} Student Deals</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for brand card */}
      <Modal isOpen={showBrandModal} onClose={() => setShowBrandModal(false)}>
        {selectedBrand && (
          <div className="flex flex-col items-center text-center p-4">
            {/* Brand logo in a rounded rectangle */}
            <div className="w-full max-w-xs h-24 bg-white rounded-xl flex items-center justify-center mb-4 shadow-lg">
              <Image src={selectedBrand.logo} alt={selectedBrand.name} width={160} height={80} style={{ objectFit: 'contain', width: '100%', height: '80px' }} />
            </div>
            <h2 className="text-2xl font-extrabold mb-1 text-gray-100 drop-shadow">{selectedBrand.name} Student Discount</h2>
            <p className="text-lg font-semibold text-pink-400 mb-2">{selectedBrand.discount}</p>
            <div className="w-full border-b border-gray-700 my-3"></div>
            {/* Rating row */}
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-gray-300 text-sm mr-2">Rate this offer:</span>
              <button className="text-2xl hover:scale-110 transition-transform">👎</button>
              <button className="text-2xl hover:scale-110 transition-transform">👍</button>
            </div>
            <p className="mb-4 text-gray-300 text-sm">Enter this code in the promotional code area during checkout to benefit from the student discount.</p>
            {/* Reveal code button with animation */}
            <RevealCodeButton />
            <a href="#" className="mt-5 inline-block bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-bold py-2 px-6 rounded-full shadow-lg transition-all duration-200">Visit {selectedBrand.name} website</a>
          </div>
        )}
      </Modal>
    </div>
  );
};

const RevealCodeButton = () => {
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);
  const code = "STUDENT10";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch (e) {
      // fallback or error
    }
  };

  return (
    <div className="relative flex flex-col items-center">
      <button
        className={`relative bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg shadow-md transition-all duration-300 mb-2 overflow-hidden focus:outline-none`}
        onClick={() => setRevealed(true)}
        disabled={revealed}
        style={{ minWidth: 160 }}
      >
        {revealed ? (
          <span className="tracking-widest text-2xl animate-pulse flex items-center gap-2">
            {code}
            <button
              onClick={handleCopy}
              className="ml-2 text-base bg-white/20 hover:bg-white/40 rounded px-2 py-1 text-white border border-white/30 transition"
              style={{ lineHeight: 1 }}
              tabIndex={0}
              type="button"
            >
              📋
            </button>
          </span>
        ) : (
          <span>Reveal code</span>
        )}
      </button>
      {copied && (
        <span className="absolute top-full mt-1 text-green-400 text-xs font-semibold bg-black/80 px-2 py-1 rounded shadow">Copied!</span>
      )}
    </div>
  );
};

export default Hero;