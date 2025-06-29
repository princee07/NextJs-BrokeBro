"use client";

import Image from "next/image";
import React, { useState, useEffect, useRef } from 'react';
import Link from "next/link";
import { RegisterLink, LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedEyes from '../ui/AnimatedEyes';
import { useRouter } from 'next/navigation';

// Pop sound path
const popSoundPath = '/assets/sounds/pop.mp4';

export default function NavbarClient({ user }: { user: any }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [coins, setCoins] = useState<number | null>(null);
  const [showReferralModal, setShowReferralModal] = useState(false);
  const [referralCode, setReferralCode] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    setIsHydrated(true);
    console.log("user", user);
  }, [user]);

  // Don't render auth section until hydrated to prevent flash
  const shouldShowAuth = isHydrated;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Ad URLs for swiping/fading
  // const ads = [
  //   {
  //     imageUrl: "https://soxytoes.com/cdn/shop/files/Theme_1A_Website.png?v=1697116566&width=2000",
  //     linkUrl: "https://www.myunidays.com/IN/en-IN"
  //   },
  //   {
  //     imageUrl: "https://soxytoes.com/cdn/shop/files/Theme_2A_Website.png?v=1697116587&width=2000",
  //     linkUrl: "https://www.myunidays.com/IN/en-IN"
  //   },
  //   {
  //     imageUrl: "https://soxytoes.com/cdn/shop/files/Theme_3_Website.png?v=1697116591&width=2000",
  //     linkUrl: "https://www.myunidays.com/IN/en-IN"
  //   }
  // ];

  // Auto-advance ads every 5 seconds
  // useEffect(() => {
  //   if (!showAd) return;
  //   const timer = setTimeout(() => {
  //     setAdIndex((prev) => (prev + 1) % ads.length);
  //     const audio = new Audio(popSoundPath);
  //     audio.play();
  //   }, 5000);
  //   return () => clearTimeout(timer);
  // }, [adIndex, showAd]);

  const navCategories = [
    { name: 'INTERNSHIPS', path: '/categories/intern' },
    { name: 'FASHION & BEAUTY', path: '/categories/fashion' },
    { name: 'TRAVEL AND LIFESTYLE', path: '/lifestyle' },
    { name: 'TECHNOLOGY', path: '/technology' },
    { name: 'FREEBIES FOR ALL', path: '/freebies' },
  ];

  useEffect(() => {
    async function fetchCoins() {
      if (user?.email) {
        try {
          const res = await fetch(`/api/user?email=${user.email}`);
          const data = await res.json();
          // Log the response for debugging
          console.log('API /api/user response:', data);
          setCoins(data.coins ?? 0);
          setReferralCode(data.user?.referralCode ?? '');
        } catch (err) {
          setCoins(0);
          setReferralCode('');
          console.error('Error fetching user coins/referral:', err);
        }
      }
    }
    fetchCoins();
  }, [user]);

  useEffect(() => {
    async function ensureUserExists() {
      if (user?.email) {
        try {
          // Try to fetch user from DB
          let res = await fetch(`/api/user?email=${user.email}`);
          let data = await res.json();
          if (res.status === 404 || data?.error === 'User not found') {
            // User not found, create user in DB
            const createRes = await fetch('/api/user', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                name: user.given_name || user.name || '',
                email: user.email,
                image: user.picture || '',
                referralCode: '', // You can enhance this to use referral from localStorage if needed
              })
            });
            const createData = await createRes.json();
            setCoins(createData.user?.coins ?? 0);
            setReferralCode(createData.user?.referralCode ?? '');
          } else {
            setCoins(data.coins ?? 0);
            setReferralCode(data.user?.referralCode ?? '');
          }
        } catch (err) {
          setCoins(0);
          setReferralCode('');
          console.error('Error ensuring user exists:', err);
        }
      }
    }
    ensureUserExists();
  }, [user]);

  return (
    <header className="fixed w-full z-50 flex flex-col mt-8 md:mt-10">
      {/* Main Navbar */}
      <nav
        className={`w-full transition-all duration-500 relative ${scrolled
          ? 'py-0 bg-black/90 backdrop-blur-md shadow-lg shadow-orange-900/10'
          : 'py-0 bg-black'
          }`}
        style={{ height: '70px' }}
      >
        <div className="container mx-auto px-4 h-full">
          <div className="flex justify-between items-center h-full">
            {/* Logo */}
            <Link href="/" className="relative h-full flex items-center">
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="relative h-20 w-56" style={{ marginBottom: '-5px' }}>
                  <Image
                    src="/assets/images/brokebro.png"
                    alt="BrokeBro Logo"
                    fill
                    style={{
                      objectFit: 'contain',
                      objectPosition: 'left center'
                    }}
                    priority
                  />
                </div>
              </motion.div>
            </Link>

            {/* Nav Links - Desktop */}
            <div className="hidden lg:flex items-center justify-center space-x-1 mx-auto">
              <div className="relative flex items-center space-x-1 p-1 rounded-full bg-black/60">
                {hoveredCategory && (
                  <motion.div
                    className="absolute h-full rounded-full bg-gradient-to-r from-orange-600/20 to-pink-600/20 backdrop-blur-sm"
                    layoutId="navHighlight"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 20
                    }}
                    style={{
                      width: document.getElementById(`nav-${hoveredCategory}`)?.offsetWidth,
                      left: document.getElementById(`nav-${hoveredCategory}`)?.offsetLeft,
                    }}
                  />
                )}
                {navCategories.map((category, index) => (
                  <motion.div
                    key={index}
                    id={`nav-${category.name}`}
                    onMouseEnter={() => setHoveredCategory(category.name)}
                    onMouseLeave={() => setHoveredCategory(null)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link href={category.path}>
                      <div className={`relative px-4 py-2 rounded-full transition-all duration-300 ${activeCategory === category.name
                        ? 'text-white'
                        : 'text-gray-300 hover:text-white'
                        }`}>
                        <span className={`text-sm font-medium ${hoveredCategory === category.name
                          ? 'bg-gradient-to-r from-orange-300 to-pink-300 text-transparent bg-clip-text'
                          : ''
                          }`}>
                          {category.name}
                        </span>
                        {(hoveredCategory === category.name || activeCategory === category.name) && (
                          <motion.div
                            className="absolute -bottom-1 left-0 right-0 mx-auto h-0.5 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: '60%' }}
                            transition={{ duration: 0.2 }}
                            layoutId={`underline-${category.name}`}
                          />
                        )}
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
            {/* Authentication Buttons */}

            <div className="flex items-center space-x-3">

              {shouldShowAuth ? (
                user ? (
                  <div className="relative flex items-center space-x-3" ref={dropdownRef}>
                    <span className="text-amber-50">Hi, {user?.given_name}</span>

                    {/* Profile Avatar - Clickable */}
                    <motion.button
                      onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                      className="relative focus:outline-none"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {user?.picture ? (
                        <Image
                          src={user.picture}
                          alt="User Avatar"
                          width={40}
                          height={40}
                          className="rounded-full border-2 border-orange-500/50 hover:border-orange-500 transition-colors duration-300"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-pink-600 flex items-center justify-center text-white font-semibold">
                          {user?.given_name?.charAt(0) || 'U'}
                        </div>
                      )}
                    </motion.button>

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {profileDropdownOpen && (
                        <motion.div
                          className="absolute right-0 top-full mt-2 w-64 bg-black/95 backdrop-blur-md rounded-lg border border-orange-500/20 shadow-lg shadow-orange-500/10 z-50"
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                        >
                          {/* User Info Header */}
                          <div className="p-4 border-b border-orange-500/20">
                            <div className="flex items-center space-x-3">
                              {user?.picture ? (
                                <Image
                                  src={user.picture}
                                  alt="User Avatar"
                                  width={50}
                                  height={50}
                                  className="rounded-full"
                                />
                              ) : (
                                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-pink-600 flex items-center justify-center text-white font-semibold text-lg">
                                  {user?.given_name?.charAt(0) || 'U'}
                                </div>
                              )}
                              <div>
                                <p className="text-white font-semibold">{user?.given_name} {user?.family_name}</p>
                                <p className="text-gray-400 text-sm">{user?.email}</p>
                                {coins !== null && (
                                  <div className="mt-1 flex items-center text-amber-300 text-sm font-semibold">
                                    <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" /></svg>
                                    {coins} Coins
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Refer & Earn Button */}
                          <button
                            className="w-full flex items-center justify-center px-4 py-2 text-orange-400 hover:text-white hover:bg-orange-500/10 transition-colors duration-200 font-semibold border-b border-orange-500/20"
                            onClick={() => setShowReferralModal(true)}
                          >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m4 4h-1v-4h-1m-4 4h-1v-4h-1" /></svg>
                            Refer & Earn
                          </button>

                          {/* Menu Items */}
                          <div className="py-2">
                            <Link
                              href="/profile"
                              className="flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-orange-500/10 transition-colors duration-200"
                              onClick={() => setProfileDropdownOpen(false)}
                            >
                              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                              Profile
                            </Link>

                            <Link
                              href="/favourites"
                              className="flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-orange-500/10 transition-colors duration-200"
                              onClick={() => setProfileDropdownOpen(false)}
                            >
                              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                              </svg>
                              Favourites
                            </Link>

                            <Link
                              href="/settings"
                              className="flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-orange-500/10 transition-colors duration-200"
                              onClick={() => setProfileDropdownOpen(false)}
                            >
                              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              Settings
                            </Link>
                            <div className="border-t border-orange-500/20 mt-2 pt-2">
                              <LogoutLink>
                                <div className="flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-red-500/10 transition-colors duration-200 w-full cursor-pointer">
                                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                  </svg>
                                  Logout
                                </div>
                              </LogoutLink>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <button
                        onClick={() => router.push("/login")}
                        className="px-6 py-2 rounded-full bg-gradient-to-r from-orange-500 to-pink-600 text-white font-semibold text-sm hover:shadow-lg hover:shadow-orange-600/20 transition-all duration-300"
                      >
                        Login
                      </button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <button
                        onClick={() => router.push("/signup")}
                        className="px-6 py-2 rounded-full bg-gradient-to-r from-pink-600 to-orange-500 text-white font-semibold text-sm border border-orange-400/30 hover:shadow-lg hover:shadow-pink-600/20 transition-all duration-300"
                      >
                        Sign Up
                      </button>
                    </motion.div>
                  </>
                )
              ) : (
                // Loading state - show skeleton
                <div className="flex items-center space-x-3">
                  <div className="w-16 h-8 bg-gray-700/50 rounded-full animate-pulse"></div>
                  <div className="w-16 h-8 bg-gray-700/50 rounded-full animate-pulse"></div>
                </div>
              )}
              {/* Mobile Menu Button */}
              <motion.button
                className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-orange-500/20 to-pink-600/20"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                whileTap={{ scale: 0.9 }}
              >
                <motion.div
                  animate={{
                    rotate: mobileMenuOpen ? 180 : 0
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {mobileMenuOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  )}
                </motion.div>
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      {/* Enhanced Search Bar */}
      <div className="bg-gradient-to-r from-black via-black/95 to-black/90 py-4 px-4 border-b border-orange-500/20 shadow-md">
        <div className="container mx-auto flex justify-center">
          <div className="relative w-full max-w-2xl group">
            {/* Background animation effect */}
            <div
              className={`absolute inset-0 rounded-full transition-all duration-500 ${searchFocused
                ? 'bg-gradient-to-r from-orange-600/10 to-pink-600/10 blur-md'
                : 'bg-black/0'
                }`}
            />
            {/* Search bar container with gradient borders */}
            <div className={`relative bg-gradient-to-r p-[1.5px] rounded-full overflow-hidden ${searchFocused
              ? 'from-orange-500 via-orange-400 to-pink-600'
              : 'from-orange-500/50 to-orange-600/50'
              } transition-all duration-300`}>
              <div className="relative flex items-center bg-black rounded-full overflow-hidden">
                {/* Search icon */}
                <div className="absolute left-4">
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 ${searchFocused ? 'text-orange-500' : 'text-gray-400'} transition-colors duration-300`}
                    animate={{
                      scale: searchFocused ? [1, 1.2, 1] : 1
                    }}
                    transition={{ duration: 0.3 }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </motion.svg>
                </div>
                {/* Search input */}
                <input
                  type="text"
                  placeholder="Search brands, deals, categories"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  className="w-full bg-transparent py-3 pl-12 pr-16 text-white placeholder-gray-400 focus:outline-none focus:placeholder-gray-300"
                />
                {/* Animated Eyes */}
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <AnimatedEyes />
                </div>
              </div>
            </div>
            {/* Pulse effect on focus */}
            <motion.div
              className="absolute inset-0 rounded-full opacity-0"
              animate={{
                opacity: searchFocused ? [0, 0.1, 0] : 0,
                scale: searchFocused ? [0.95, 1.05] : 1
              }}
              transition={{
                duration: 1.5,
                repeat: searchFocused ? Infinity : 0,
                repeatType: 'loop'
              }}
              style={{
                boxShadow: '0 0 20px 5px rgba(249, 115, 22, 0.3)',
                background: 'radial-gradient(circle, rgba(249,115,22,0.3) 0%, rgba(0,0,0,0) 70%)'
              }}
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu with Animations */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="lg:hidden bg-gradient-to-b from-black/95 to-black backdrop-blur-lg absolute w-full shadow-lg overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="container mx-auto px-4 py-3">
              {navCategories.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={category.path}
                    className="block py-3 px-4 text-gray-100 hover:text-white border-b border-orange-500/10 hover:bg-orange-500/5"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="flex items-center">
                      <span>{category.name}</span>
                    </div>
                  </Link>
                </motion.div>
              ))}              <div className="mt-6 pb-4 px-4 grid grid-cols-2 gap-3">
                {shouldShowAuth ? (
                  user ? (
                    <LogoutLink>
                      <div className="block text-center py-2 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold text-sm hover:from-orange-600 hover:to-orange-700 transition-colors duration-300 cursor-pointer">
                        Logout
                      </div>
                    </LogoutLink>
                  ) : (
                    <>
                      <LoginLink
                        className="block text-center py-2 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold text-sm hover:from-orange-600 hover:to-orange-700 transition-colors duration-300"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Login
                      </LoginLink>
                      <RegisterLink
                        className="block text-center py-2 rounded-lg bg-gradient-to-r from-pink-500 to-pink-600 text-white font-semibold text-sm hover:from-pink-600 hover:to-pink-700 transition-colors duration-300"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Sign Up
                      </RegisterLink>
                    </>
                  )
                ) : (
                  // Loading state for mobile
                  <div className="col-span-2 h-10 bg-gray-700/50 rounded-lg animate-pulse"></div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Referral Modal */}
      {showReferralModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-black rounded-lg p-8 w-[420px] min-h-[220px] border border-orange-500/30 shadow-lg relative">
            <button className="absolute top-3 right-4 text-gray-400 hover:text-white text-2xl" onClick={() => setShowReferralModal(false)}>&times;</button>
            <h2 className="text-2xl font-bold text-orange-400 mb-4">Refer & Earn</h2>
            <p className="text-gray-300 mb-4 text-base">Share your referral link with friends.<br />Both of you get <span className="text-amber-300 font-semibold">10 coins</span>!</p>
            <div className="bg-gray-800 rounded px-3 py-2 flex items-center mb-2">
              <span className="text-sm text-white truncate flex-1">{`${typeof window !== 'undefined' ? window.location.origin : ''}/signup?ref=${referralCode}`}</span>
              <button
                className="ml-3 px-3 py-1 bg-orange-500 text-white rounded text-sm font-semibold hover:bg-orange-600"
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    navigator.clipboard.writeText(`${window.location.origin}/signup?ref=${referralCode}`);
                  }
                }}
              >Copy</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
