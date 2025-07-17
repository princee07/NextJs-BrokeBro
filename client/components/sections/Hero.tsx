"use client"

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Modal from '../ui/Modal';
import RevealCodeButton from '../ui/RevealCodeButton';
import { useStudentVerification } from '@/hooks/useStudentVerification';
import { getOrCreateExpiringCode } from '../../utils/codeExpiry';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useUserVerification } from '@/hooks/useUserVerification';
import { FaCheckCircle, FaShieldAlt, FaBolt, FaEnvelopeOpenText } from 'react-icons/fa';
// Pop sound path
const popSoundPath = '/assets/sounds/pop.mp4';

const Hero = () => {
  const [typedText, setTypedText] = useState('');
  const [currentDealIndex, setCurrentDealIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [codeData, setCodeData] = useState<any>(null);
  const [showBrandModal, setShowBrandModal] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<any>(null);
  //const [countdown, setCountdown] = useState<string>('');

  const router = useRouter();
  const { isVerified } = useStudentVerification();
  const { isAuthenticated, isLoading } = useKindeBrowserClient();
  const { isVerified: isUserVerified } = useUserVerification();
  console.log(`User is verified: ${isVerified}`);
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
      discount: '15% OFF',
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
      discount: '₹1000 OFF',
    },
    {
      name: 'just lil things',
      logo: '/assets/images/justlilthings.png',
      gradient: 'from-pink-400 to-teal-100',
      slug: 'just lil things',
      discount: '15% OFF',
      codeType: 'fixed', // or 'expiring'
    },
    {
      name: 'the Ultimate RC',
      logo: '/assets/images/ultimateRC.png',
      gradient: 'from-black-500 to-red-200',
      slug: 'Ultimate Rides',
      discount: '1 + 1 free',
      codeType: 'expiring',
    },
    {
      name: 'glued',
      logo: '/assets/logos/gluednew.png',
      gradient: 'from-orange-500 to-red-400',
      slug: 'glued',
      discount: undefined,
      codeType: 'expiring',
    },
    {
      name: 'just lil things',
      logo: '/assets/images/justlilthings.png',
      gradient: 'from-pink-400 to-teal-100',
      slug: 'just lil things',
      discount: '15% OFF',
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
      logo: '/assets/logos/bhutiya.png',
      gradient: 'from-white-600 to-red-700',
      slug: 'Bhootiya store',
      discount: '20% OFF',
    },
  ];

  // Duplicate cards for smooth infinite scrolling - ensure enough cards to fill viewport + buffer
  const CARD_HEIGHT = 250;
  const CARD_MARGIN = 40;
  const NUM_CARDS = 12;
  const TOTAL_HEIGHT = CARD_HEIGHT * NUM_CARDS + CARD_MARGIN * (NUM_CARDS - 1); // 3440px
  const column1Cards = [...brandCards.slice(0, 6), ...brandCards.slice(0, 6)]; // 12 total cards
  const column2Cards = [...brandCards.slice(6), ...brandCards.slice(6)]; // 12 total cards

  // ... existing useEffects
  // Add this state to track real-time countdown


  // For expiring codes (Glued, Ultimate RC), code is valid for only 1 reveal: after modal opens, mark as expired and block new code for 24h
  useEffect(() => {
    if (selectedBrand?.codeType === 'expiring' && codeData && showBrandModal) {
      const userId = "kp_3ba83e44eb4d4956b8fe252c8064da8a";
      const storageKey = `code_${selectedBrand.slug}_${userId}`;
      // Mark code as used after reveal
      if (codeData && !codeData.isExpired) {
        // Mark as expired in localStorage, and store expireAt
        const storedData = localStorage.getItem(storageKey);
        let expireAt = Date.now() + 24 * 60 * 60 * 1000;
        if (storedData) {
          const parsed = JSON.parse(storedData);
          parsed.isExpired = true;
          parsed.expireAt = expireAt;
          localStorage.setItem(storageKey, JSON.stringify(parsed));
        } else {
          // fallback: store expireAt anyway
          localStorage.setItem(storageKey, JSON.stringify({ isExpired: true, expireAt }));
        }
        // Mark as expired in state
        setCodeData((prev: any) => ({ ...prev, isExpired: true, expireAt }));
      }
    }
  }, [selectedBrand, showBrandModal]);

  // When opening modal for expiring code, block new code for 24h after reveal
  useEffect(() => {
    if (selectedBrand?.codeType === 'expiring' && showBrandModal) {
      const userId = "kp_3ba83e44eb4d4956b8fe252c8064da8a";
      const storageKey = `code_${selectedBrand.slug}_${userId}`;
      const storedData = localStorage.getItem(storageKey);
      if (storedData) {
        const parsed = JSON.parse(storedData);
        if (parsed.isExpired && parsed.expireAt) {
          const now = Date.now();
          if (now < parsed.expireAt) {
            // Block new code, show unavailable message
            setCodeData({ isExpired: true, expireAt: parsed.expireAt });
            return;
          } else {
            // 24h passed, allow new code
            localStorage.removeItem(storageKey);
            const newCodeData = getOrCreateExpiringCode(selectedBrand, userId);
            setCodeData(newCodeData);
          }
        } else if (parsed.isExpired) {
          // fallback: block for 24h from now
          const expireAt = Date.now() + 24 * 60 * 60 * 1000;
          parsed.expireAt = expireAt;
          localStorage.setItem(storageKey, JSON.stringify(parsed));
          setCodeData({ isExpired: true, expireAt });
        }
      } else {
        // No code yet, allow new code
        const newCodeData = getOrCreateExpiringCode(selectedBrand, userId);
        setCodeData(newCodeData);
      }
    }
  }, [selectedBrand, showBrandModal]);

  // Update your handleBrandCardClick function to handle expiring codes for Ultimate RC and Glued
  const handleBrandCardClick = (brand: any) => {
    if (isLoading) return;
    if (!isAuthenticated) {
      router.push('/signup');
      return;
    }
    if (!isUserVerified) {
      router.push('/student-verification');
      return;
    }
    let currentCodeData;
    const userId = "kp_3ba83e44eb4d4956b8fe252c8064da8a";
    if (brand.codeType === 'expiring') {
      const storageKey = `code_${brand.slug}_${userId}`;
      const storedData = localStorage.getItem(storageKey);
      if (storedData) {
        const parsed = JSON.parse(storedData);
        if (parsed.isExpired && parsed.expireAt) {
          const now = Date.now();
          if (now < parsed.expireAt) {
            // Block new code
            setCodeData({ isExpired: true, expireAt: parsed.expireAt });
            setSelectedBrand(brand);
            setShowBrandModal(true);
            return;
          } else {
            // 24h passed, allow new code
            localStorage.removeItem(storageKey);
            const newCodeData = getOrCreateExpiringCode(brand, userId);
            currentCodeData = newCodeData;
          }
        } else if (parsed.isExpired) {
          // fallback: block for 24h from now
          const expireAt = Date.now() + 24 * 60 * 60 * 1000;
          parsed.expireAt = expireAt;
          localStorage.setItem(storageKey, JSON.stringify(parsed));
          setCodeData({ isExpired: true, expireAt });
          setSelectedBrand(brand);
          setShowBrandModal(true);
          return;
        } else {
          // Not expired, but code exists (shouldn't happen)
          currentCodeData = parsed;
        }
      } else {
        // No code yet, generate new
        const newCodeData = getOrCreateExpiringCode(brand, userId);
        currentCodeData = newCodeData;
      }
    } else {
      // Fixed code
      currentCodeData = {
        code: brand.code || 'STUDENT10',
        isExpired: false,
        timeLeft: null,
      };
    }
    setCodeData(currentCodeData);
    setSelectedBrand(brand);
    setShowBrandModal(true);
  };

  return (
    <section className="relative w-full min-h-[70vh] flex flex-col justify-center items-center py-16 px-4 overflow-hidden pt-24 md:pt-32">
      {/* Background image */}
      <div className="absolute inset-0 w-full h-full z-0">
        <img
          src="/assets/mainhero.png"
          alt="Background crowd"
          className="w-full h-full object-contain object-center"
          style={{ filter: 'brightness(0.45)', objectFit: 'contain', objectPosition: 'center', minHeight: '100%', minWidth: '100%' }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60" />
      </div>
      <div className="relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center text-center">
        {/* Heading */}
        <h1 className="mt-24 md:mt-32 text-5xl md:text-7xl font-extrabold text-white mb-3 leading-tight drop-shadow-lg">
          <span>Unlock </span>
          <span className="text-yellow-300" style={{ fontSize: '1.5em', fontWeight: 900, letterSpacing: '1px', textShadow: '0 4px 16px #000, 0 1px 0 #fff' }}>Instant</span>
          <span> </span>
          <span>Student Discounts</span>
        </h1>
        {/* Subheading */}
        <p className="text-lg md:text-xl text-white/90 mb-6">
          One free account. 300+ brands. Real savings for real students.
        </p>
        {/* Key Benefits */}
        {/* <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-white font-medium text-base shadow">
            <FaShieldAlt className="text-green-300 text-lg" /> Verified student-only deals
          </div>
          <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-white font-medium text-base shadow">
            <FaEnvelopeOpenText className="text-blue-200 text-lg" /> No spam, no fees
          </div>
          <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-white font-medium text-base shadow">
            <FaBolt className="text-yellow-300 text-lg" /> Instant access—sign up in seconds
          </div>
        </div> */}
        {/* CTA Button */}
        <a href="/signup" className="w-full max-w-xs">
          <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-orange-900 font-bold text-lg py-4 px-8 rounded-full shadow-lg transition-all duration-300 mb-3 animate-bounce focus:outline-none">
            Start Saving Now
          </button>
        </a>
      </div>
    </section>
  );
};

export default Hero;