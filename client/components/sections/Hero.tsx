"use client"

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Modal from '../ui/Modal';
import RevealCodeButton from '../ui/RevealCodeButton';
import { useStudentVerification } from '@/hooks/useStudentVerification';

// Pop sound path
const popSoundPath = '/assets/sounds/pop.mp4';

const Hero = () => {
  const [typedText, setTypedText] = useState('');
  const [currentDealIndex, setCurrentDealIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  const [showBrandModal, setShowBrandModal] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<any>(null);
  const router = useRouter();
  const { isVerified } = useStudentVerification();

  // Text to type out
  const fullText = "STUDENT DISCOUNTS UNLOCKED";

  // Deal headings that will appear sequentially
  const dealHeadings = [
    "Save 50% on Software Subscriptions",
    "Get 30% Off Tech Purchases"
  ];



  // Typing effect
  useEffect(() => {
    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.substring(0, typedText.length + 1));
      }, 50);

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



  const brandCards = [
    {
      name: 'Akina',
      logo: '/assets/images/akina.png',
      gradient: 'from-white-500 to-teal-300',
      slug: 'akina',

    },
    {
      name: 'BIBA',
      logo: '/assets/images/biba.png',
      gradient: 'from-red-500 to-teal-300',
      slug: 'biba',

    },
    {
      name: 'just lil things',
      logo: '/assets/images/justlilthings.png',
      gradient: 'from-pink-400 to-teal-100',
      slug: 'just lil things',
      discount: '15% OFF'
    },
    {
      name: 'lakme',
      logo: '/assets/images/lakme.png',
      gradient: 'from-purple-400 to-teal-300',
      slug: 'lakme',

    },
    {
      name: 'soxytoes',
      logo: '/assets/images/soxytoes.png',
      gradient: 'from-orange-500 to-red-400',
      slug: 'soxytoes',
      discount: '₹1000 OFF'
    },
    {
      name: 'just lil things',
      logo: '/assets/images/justlilthings.png',
      gradient: 'from-pink-400 to-teal-100',
      slug: 'just lil things',
      discount: '15% OFF'
    },
    {
      name: 'the Ultimate RC',
      logo: '/assets/images/ultimateRC.png',
      gradient: 'from-black-500 to-red-200',
      slug: 'Ultimate Rides',
      discount: '1 + 1 free'
    },
    {
      name: 'glued',
      logo: '/assets/images/glued.png',
      gradient: 'from-orange-500 to-red-400',
      slug: 'glued',

    },
    {
      name: 'just lil things',
      logo: '/assets/images/justlilthings.png',
      gradient: 'from-pink-400 to-teal-100',
      slug: 'just lil things',
      discount: '15% OFF'
    },
    {
      name: 'gamepalacio',
      logo: '/assets/images/gamepalacio.png',
      gradient: 'from-black to-yellow-600',
      slug: 'gamepalacio',

    },
    {
      name: 'Unity',
      logo: '/assets/images/unity.png',
      gradient: 'from-gray-700 to-gray-900',
      slug: 'unity',
      discount: '20% OFF',

    },
    {
      name: 'Bhootiya store',
      logo: '/assets/logos/bhootiya.png',
      gradient: 'from-white-600 to-red-700',
      slug: 'Bhootiya store',
      discount: '20% OFF',

    }

  ];

  // Duplicate cards for smooth infinite scrolling - ensure enough cards to fill viewport + buffer
  const CARD_HEIGHT = 250;
  const CARD_MARGIN = 40;
  const NUM_CARDS = 12;
  const TOTAL_HEIGHT = CARD_HEIGHT * NUM_CARDS + CARD_MARGIN * (NUM_CARDS - 1); // 3440px
  const column1Cards = [...brandCards.slice(0, 6), ...brandCards.slice(0, 6)]; // 12 total cards
  const column2Cards = [...brandCards.slice(6), ...brandCards.slice(6)]; // 12 total cards

  // Handle brand card click - check verification first
  const handleBrandCardClick = (brand: any) => {
    if (!isVerified) {
      // Redirect to student verification page if not verified
      // After verification, user can return and click again to see the modal
      router.push('/student-verification');
    } else {
      // Open modal with discount code if user is verified
      setSelectedBrand(brand);
      setShowBrandModal(true);
    }
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">

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
          <div className="w-full lg:w-1/2 mb-10 lg:mb-0 lg:sticky lg:top-32 mt-72">
            {/* Fixed height container for main heading */}
            <div className="h-[130px] md:h-[150px]">
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                {/* Main heading with DECREASED font size */}
                <div className="flex items-center">
                  <h1 className="text-3xl md:text-5xl font-extrabold">
                    <span className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent inline-block">
                      {typedText}
                      <span className={`inline-block w-1 h-8 bg-orange-400 ml-1 align-middle ${showCursor ? 'opacity-100' : 'opacity-0'}`}></span>
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
                  className="text-lg md:text-xl text-gray-300 font-medium"
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
              className="mt-8"
            >
              <p className="text-base text-gray-300 max-w-xl leading-relaxed">
                <span className="font-semibold text-orange-400">College is expensive enough.</span> We've partnered with top brands to bring you
                exclusive student discounts that make a difference.
              </p>

              {/* Feature list */}
              <ul className="mt-4 space-y-2">
                {[
                  "Verified with your student ID or .edu email",
                  "Exclusive deals not available to the public"
                ].map((feature, index) => (
                  <motion.li
                    key={feature}
                    className="flex items-center text-gray-300 text-sm"
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
              className="mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.3 }}
            >
              <Link href="/auth/signup">
                <motion.div
                  className="relative inline-block bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white font-bold text-base py-3 px-6 rounded-full transition-all duration-300 overflow-hidden hover:shadow-lg hover:shadow-orange-600/20"
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
              {/* Left Column - Sliding Upward */}
              <div className="relative h-full overflow-hidden">
                <motion.div
                  className="absolute top-0 left-0 w-full"
                  animate={{
                    y: [0, -TOTAL_HEIGHT]
                  }}
                  transition={{
                    duration: 40,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "linear"
                  }}
                >
                  {column1Cards.map((brand, index) => (
                    <div
                      key={`col1-${index}`}
                      onClick={() => handleBrandCardClick(brand)}
                      className={`relative ${index === 0 ? '' : 'mt-10'} h-[250px] rounded-2xl overflow-hidden group cursor-pointer`}
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
                          style={{ objectFit: 'contain', maxWidth: '90%', maxHeight: '85%', marginTop: '20px' }}
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
                  animate={{
                    y: [TOTAL_HEIGHT, 0]
                  }}
                  transition={{
                    duration: 40,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "linear"
                  }}
                >
                  {column1Cards.map((brand, index) => (
                    <div
                      key={`col1-clone-${index}`}
                      onClick={() => handleBrandCardClick(brand)}
                      className={`relative ${index === 0 ? '' : 'mt-10'} h-[250px] rounded-2xl overflow-hidden group cursor-pointer`}
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
                          style={{ objectFit: 'contain', maxWidth: '90%', maxHeight: '85%', marginTop: '20px' }}
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

              {/* Right Column - Sliding Downward */}
              <div className="relative h-full overflow-hidden">
                <motion.div
                  className="absolute top-0 left-0 w-full"
                  animate={{
                    y: [0, TOTAL_HEIGHT]
                  }}
                  transition={{
                    duration: 40, // Match duration with left column
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "linear"
                  }}
                >
                  {column2Cards.map((brand, index) => (
                    <div
                      key={`col2-${index}`}
                      onClick={() => handleBrandCardClick(brand)}
                      className={`relative ${index === 0 ? '' : 'mt-10'} h-[250px] rounded-2xl overflow-hidden group cursor-pointer`}
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
                          style={{ objectFit: 'contain', maxWidth: '90%', maxHeight: '85%', marginTop: '20px' }}
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
                  animate={{
                    y: [-TOTAL_HEIGHT, 0]
                  }}
                  transition={{
                    duration: 40, // Match duration with main animation
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "linear"
                  }}
                >
                  {column2Cards.map((brand, index) => (
                    <div
                      key={`col2-clone-${index}`}
                      onClick={() => { handleBrandCardClick(brand); }}
                      className={`relative ${index === 0 ? '' : 'mt-10'} h-[250px] rounded-2xl overflow-hidden group cursor-pointer`}
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
                          style={{ objectFit: 'contain', maxWidth: '90%', maxHeight: '85%', marginTop: '20px' }}
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
            <div className="w-full max-w-xs h-40 bg-white rounded-xl flex items-center justify-center mb-4 shadow-lg">
              <Image src={selectedBrand.logo} alt={selectedBrand.name} width={240} height={120} style={{ objectFit: 'contain', width: '100%', height: '120px' }} />
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
            <RevealCodeButton code={selectedBrand.code || 'STUDENT10'} />
            <a href="#" className="mt-5 inline-block bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-bold py-2 px-6 rounded-full shadow-lg transition-all duration-200">Visit {selectedBrand.name} website</a>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Hero;
