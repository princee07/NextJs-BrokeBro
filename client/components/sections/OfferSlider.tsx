"use client"

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useAnimation, useMotionValue } from 'framer-motion';
import { MdArrowForward, MdNewReleases } from "react-icons/md";
import { IoMdCheckmarkCircleOutline, IoMdTime } from "react-icons/io";
import { BiSolidOffer, BiRightArrowAlt, BiLeftArrowAlt } from "react-icons/bi";
import { HiClock, HiStar, HiLightningBolt } from "react-icons/hi";
import { FaUserGraduate, FaGift, FaRegClock } from "react-icons/fa";
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';

const OfferSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // For drag functionality
  const x = useMotionValue(0);
  const controls = useAnimation();

  // Check if component is in view
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  // Check if mobile on component mount
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  // Replace offers with BrokeBro events, hackathons, webinars
  const offers = [
    {
      icon: <MdNewReleases className="text-orange-200 text-3xl" />,
      preTitle: "HACKATHON",
      title: "BrokeBro Hackathon 2025",
      subtitle: "Win prizes, internships & swag!",
      detailText: "Registration opens Aug 10, 2025",
      buttonText: "ENROLLMENT",
      bgColorClass: "from-orange-600 via-pink-600 to-purple-700",
      bgStyle: "ripple",
      type: "hackathon"
    },
    {
      icon: <FaUserGraduate className="text-emerald-200 text-3xl" />,
      preTitle: "EVENT",
      title: "Campus Ambassador Program",
      subtitle: "Lead your college, get exclusive perks!",
      detailText: "Apply by July 20, 2025",
      buttonText: "ENROLLMENT",
      bgColorClass: "from-emerald-600 via-teal-500 to-cyan-500",
      bgStyle: "dots",
      type: "event"
    },


    {
      icon: <HiStar className="text-pink-200 text-3xl" />,
      preTitle: "COMPETITION",
      title: "BrokeBro Dance Competition",
      subtitle: "Show your moves, win cash & fame!",
      detailText: "Entries open till Aug 30, 2025",
      buttonText: "ENROLLMENT",
      bgColorClass: "from-pink-600 via-orange-400 to-yellow-400",
      bgStyle: "pulse",
      type: "dance-competition"
    },
  ];

  // Auto advance slides if not hovering and in view
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (!isHovering && inView) {
      // Reset progress
      setProgress(0);

      // Progress animation
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) return 0;
          return prev + 0.5;
        });
      }, 20);

      // Slide change
      interval = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % offers.length);
        setProgress(0);
      }, 4000);

      return () => {
        clearInterval(interval);
        clearInterval(progressInterval);
      };
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isHovering, offers.length, inView]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, offers.length]);

  // Manual navigation
  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
    setProgress(0);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % offers.length);
    setProgress(0);
  }, [offers.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + offers.length) % offers.length);
    setProgress(0);
  }, [offers.length]);

  // Handle drag to swipe (for mobile especially)
  const handleDragEnd = useCallback((event: any, info: any) => {
    const threshold = 100;
    const velocity = 0.5;

    if (info.offset.x > threshold || info.velocity.x > velocity) {
      // Swiped right - go to previous
      prevSlide();
    } else if (info.offset.x < -threshold || info.velocity.x < -velocity) {
      // Swiped left - go to next
      nextSlide();
    } else {
      // Return to current
      controls.start({ x: 0 });
    }
  }, [controls, nextSlide, prevSlide]);

  // Get background pattern based on style with enhanced animations
  const getBackgroundPattern = (style: string) => {
    switch (style) {
      case 'ripple':
        return (
          <div className="absolute inset-0 opacity-20 overflow-hidden">
            <motion.div
              className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/30"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute bottom-5 left-1/4 w-24 h-24 rounded-full bg-white/20"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.15, 0.25, 0.15],
              }}
              transition={{
                duration: 4.5,
                delay: 0.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute top-1/4 right-1/4 w-16 h-16 rounded-full bg-white/15"
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 5,
                delay: 1,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        );
      case 'wave':
        return (
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-12 bg-white/10 rounded-full"
                style={{
                  width: '150%',
                  bottom: `${15 + i * 12}px`,
                  opacity: 0.1 + (i * 0.05),
                }}
                animate={{
                  x: [-300, 800],
                  y: [0, i * 5],
                }}
                transition={{
                  duration: 8 + i,
                  repeat: Infinity,
                  repeatType: 'loop',
                  ease: "easeInOut",
                  delay: i * 0.5
                }}
              />
            ))}
          </div>
        );
      case 'dots':
        return (
          <div className="absolute inset-0 opacity-20">
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 md:w-3 md:h-3 rounded-full bg-white/40"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 2 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        );
      case 'shine':
        return (
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute -inset-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
              animate={{
                x: ['-100%', '200%']
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: 'loop',
                ease: "easeInOut",
                repeatDelay: 2
              }}
            />
            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                  'radial-gradient(circle at 70% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
                  'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)'
                ]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        );
      case 'pulse':
        return (
          <div className="absolute inset-0">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
                rotate: [0, 5, 0]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-l from-white/5 to-transparent rounded-full"
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.1, 0.15, 0.1],
                rotate: [0, -5, 0]
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white/20 rounded-full"
                style={{
                  top: `${20 + Math.random() * 60}%`,
                  left: `${20 + Math.random() * 60}%`,
                }}
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="w-full py-4 sm:py-6 md:py-12 bg-white relative overflow-hidden backdrop-blur-sm shadow-xl"
      ref={ref}
    >
      {/* Enhanced background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-white via-gray-100 to-white"></div>
        <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        <div className="absolute bottom-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

        {/* Abstract geometric shapes in background */}
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-20 blur-2xl bg-gradient-to-br from-purple-700 to-pink-600"></div>
        <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full opacity-10 blur-3xl bg-gradient-to-br from-blue-700 to-teal-500"></div>
      </div>

      <div className="container mx-auto px-4" ref={containerRef}>
        {/* Header for offer section */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <HiLightningBolt className="text-orange-500 text-xl" />
            <h3 className="text-white font-bold text-lg">Hot Offers</h3>
          </div>

          {/* Navigation arrows for desktop */}
          <div className="hidden md:flex space-x-3">
            <motion.button
              onClick={prevSlide}
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Previous offer"
            >
              <BiLeftArrowAlt className="text-xl" />
            </motion.button>
            <motion.button
              onClick={nextSlide}
              className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Next offer"
            >
              <BiRightArrowAlt className="text-xl" />
            </motion.button>
          </div>
        </div>

        <div
          className="relative w-full h-40 sm:h-48 md:h-36 overflow-hidden rounded-xl shadow-2xl flex flex-col sm:flex-row"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Glass effect border */}
          <div className="absolute inset-0 rounded-xl border border-white/10 pointer-events-none"></div>

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10">
            <motion.div
              className="h-full bg-white/50"
              style={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>

          <motion.div
            drag={isMobile ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            onDragEnd={handleDragEnd}
            className="absolute inset-0"
          >
            <AnimatePresence mode="wait">
              {offers.map((offer, index) => (
                currentSlide === index && (
                  <motion.div
                    key={index}
                    className={`absolute inset-0 bg-gradient-to-r ${offer.bgColorClass} flex items-center justify-between p-4 md:p-6 overflow-hidden`}
                    initial={{ x: 300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -300, opacity: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 100,
                      damping: 20
                    }}
                  >
                    {/* Background patterns */}
                    {getBackgroundPattern(offer.bgStyle)}

                    {/* Offer content with enhanced layout */}
                    <div className="flex items-center space-x-4 z-10">
                      <div className="hidden md:flex flex-shrink-0 items-center justify-center w-16 h-16 rounded-full bg-black/30 backdrop-blur-md shadow-lg border border-white/20">
                        {offer.icon}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <p className="text-sm md:text-base font-semibold text-white/90 tracking-wide">{offer.preTitle}</p>
                          <motion.div
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                          >
                            <MdNewReleases className="text-yellow-300 text-sm" />
                          </motion.div>
                        </div>
                        <h3 className="text-xl md:text-3xl font-extrabold text-white tracking-wide">
                          {offer.title}
                        </h3>
                        <p className="text-sm md:text-base font-medium text-white/90">{offer.subtitle}</p>

                        {/* Detail text with icon */}
                        <div className="flex items-center mt-1 text-xs md:text-sm text-white/70">
                          <FaRegClock className="mr-1" />
                          {offer.detailText}
                        </div>
                      </div>
                    </div>

                    {/* CTA Button with enhanced effects */}
                    <div className="flex-shrink-0 z-10">
                      {offer.type === "event" ? (
                        <Link href="/campus-ambassador" passHref legacyBehavior>
                          <a className="relative bg-white text-gray-900 px-4 py-2 md:px-6 md:py-3 rounded-lg font-bold text-sm md:text-base flex items-center space-x-1 shadow-lg overflow-hidden group">
                            {/* Button background animation */}
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-white via-gray-100 to-white opacity-0 group-hover:opacity-100"
                              animate={{ x: ['-100%', '100%'] }}
                              transition={{ repeat: Infinity, repeatType: "loop", duration: 1.5, ease: "easeInOut" }}
                            />
                            <span className="relative z-10">{offer.buttonText}</span>
                            <motion.span
                              className="relative z-10"
                              animate={{ x: [0, 5, 0] }}
                              transition={{ repeat: Infinity, duration: 1.5, repeatType: "loop" }}
                            >
                              <MdArrowForward className="ml-2" />
                            </motion.span>
                          </a>
                        </Link>
                      ) : offer.type === "dance-competition" ? (
                        <a
                          href="https://www.brokebro.in/events"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative bg-white text-gray-900 px-4 py-2 md:px-6 md:py-3 rounded-lg font-bold text-sm md:text-base flex items-center space-x-1 shadow-lg overflow-hidden group"
                        >
                          {/* Button background animation */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-white via-gray-100 to-white opacity-0 group-hover:opacity-100"
                            animate={{ x: ['-100%', '100%'] }}
                            transition={{ repeat: Infinity, repeatType: "loop", duration: 1.5, ease: "easeInOut" }}
                          />
                          <span className="relative z-10">{offer.buttonText}</span>
                          <motion.span
                            className="relative z-10"
                            animate={{ x: [0, 5, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5, repeatType: "loop" }}
                          >
                            <MdArrowForward className="ml-2" />
                          </motion.span>
                        </a>
                      ) : offer.type === "hackathon" ? (
                        <button
                          className="relative bg-white text-gray-900 px-4 py-2 md:px-6 md:py-3 rounded-lg font-bold text-sm md:text-base flex items-center space-x-1 shadow-lg overflow-hidden group"
                          onClick={() => setShowToast(true)}
                        >
                          {/* Button background animation */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-white via-gray-100 to-white opacity-0 group-hover:opacity-100"
                            animate={{ x: ['-100%', '100%'] }}
                            transition={{ repeat: Infinity, repeatType: "loop", duration: 1.5, ease: "easeInOut" }}
                          />
                          <span className="relative z-10">{offer.buttonText}</span>
                          <motion.span
                            className="relative z-10"
                            animate={{ x: [0, 5, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5, repeatType: "loop" }}
                          >
                            <MdArrowForward className="ml-2" />
                          </motion.span>
                        </button>
                      ) : (
                        <button
                          className="relative bg-white text-gray-900 px-4 py-2 md:px-6 md:py-3 rounded-lg font-bold text-sm md:text-base flex items-center space-x-1 shadow-lg overflow-hidden group"
                          onClick={() => setShowToast(true)}
                        >
                          {/* Button background animation */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-white via-gray-100 to-white opacity-0 group-hover:opacity-100"
                            animate={{ x: ['-100%', '100%'] }}
                            transition={{ repeat: Infinity, repeatType: "loop", duration: 1.5, ease: "easeInOut" }}
                          />
                          <span className="relative z-10">{offer.buttonText}</span>
                          <motion.span
                            className="relative z-10"
                            animate={{ x: [0, 5, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5, repeatType: "loop" }}
                          >
                            <MdArrowForward className="ml-2" />
                          </motion.span>
                        </button>
                      )}
                    </div>

                    {/* Success icon with enhanced animation */}
                    <motion.div
                      className="absolute -top-1 -right-1 md:top-3 md:right-3 text-white z-10"
                      initial={{ opacity: 0, y: 10, rotate: -20 }}
                      animate={{ opacity: 1, y: 0, rotate: 0 }}
                      transition={{ delay: 0.5, type: "spring" }}
                    >
                      <IoMdCheckmarkCircleOutline className="text-xl md:text-2xl" />
                    </motion.div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Enhanced indicators with animations */}
        <div className="flex justify-center items-center mt-4 space-x-3">
          {offers.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className={`relative h-3 transition-all duration-300 rounded-full ${currentSlide === index ? `w-6 bg-white` : `w-3 bg-gray-500`
                }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Go to slide ${index + 1}`}
            >
              {currentSlide === index && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-white/50"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeInOut"
                  }}
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Helpful text below */}
        <div className="flex justify-center mt-2">
          <p className="text-gray-400 text-xs flex items-center">
            <IoMdTime className="mr-1" />
            Swipe or use arrow keys to navigate offers
          </p>
        </div>

        {/* Toast for ENROLLMENT button */}
        {showToast && (
          <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 bg-black/90 text-white px-6 py-3 rounded-full shadow-lg border border-orange-500 animate-fade-in-out">
            Wait, coming soon!
          </div>
        )}
      </div>
    </div>
  );
};

export default OfferSlider;