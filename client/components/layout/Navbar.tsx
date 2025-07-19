"use client";

import Image from "next/image";
import React, { useState, useEffect, useRef } from 'react';
import Link from "next/link";
import { RegisterLink, LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
const LOGOUT_REDIRECT_URL = "https://www.brokebro.in/";
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedEyes from '../ui/AnimatedEyes';
import { useRouter } from 'next/navigation';
import Modal from '../ui/Modal';
import VerificationModal from '../auth/VerificationModal';
import BannerSection from '../sections/BannerSection';

import NavbarUserMenu from './NavbarUserMenu';
import VerifiedBadge from '../ui/VerifiedBadge';
import { useStudentVerification } from '@/hooks/useStudentVerification';
import { getUserReferralData } from "@/app/lib/actions/referral.actions";
import {
  HiOutlineBriefcase,
  HiOutlineSparkles,
  HiOutlineGlobeAlt,
  HiOutlineDesktopComputer,
  HiOutlineGift,
  HiOutlineCalendar
} from 'react-icons/hi';
import SearchBar from '../ui/SearchBar';
// Pop sound path
const popSoundPath = '/assets/sounds/pop.mp4';

export default function NavbarClient({ user }: { user: any }) {
  const [scrolled, setScrolled] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);
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
  const [referralUrl, setReferralUrl] = useState('');
  const [referralLoading, setReferralLoading] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [showIconsOnly, setShowIconsOnly] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const navLinksRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Student verification state
  const { isVerified } = useStudentVerification();

  useEffect(() => {
    setIsHydrated(true);
    console.log("user", user);
  }, [user]);

  // Don't render auth section until hydrated to prevent flash
  const shouldShowAuth = isHydrated;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);
      if (currentScrollY > lastScrollY.current && currentScrollY > 60) {
        // Scrolling down
        setShowNavbar(false);
      } else {
        // Scrolling up
        setShowNavbar(true);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Monitor navbar space and determine if we should show icons only
  useEffect(() => {
    const checkNavbarSpace = () => {
      if (!navLinksRef.current || !navContainerRef.current) return;

      const windowWidth = window.innerWidth;
      const navContainer = navContainerRef.current;

      // For very small screens (mobile), always show full text when there's space
      if (windowWidth < 768) {
        setShowIconsOnly(false);
        return;
      }

      // Simple and reliable zoom detection using devicePixelRatio and window dimensions
      // Get browser zoom level - this is more reliable than screen width comparison
      const getBrowserZoom = () => {
        // Method 1: Using outerWidth vs innerWidth (most reliable)
        if (window.outerWidth && window.innerWidth) {
          return Math.round((window.outerWidth / window.innerWidth) * 100);
        }

        // Method 2: Fallback using devicePixelRatio
        const devicePixelRatio = window.devicePixelRatio || 1;
        return Math.round(devicePixelRatio * 100);
      };

      const zoomLevel = getBrowserZoom();
      console.log('Current zoom level:', zoomLevel + '%'); // Debug log

      // Get the width of the navigation container
      const containerWidth = navContainer.clientWidth;

      // Calculate the width of other elements in the nav more accurately
      const logoWidth = 220; // Logo area with some buffer
      const searchWidth = windowWidth < 1024 ? 280 : 340; // Search area (responsive)
      const authWidth = windowWidth < 1024 ? 180 : 220; // Auth buttons area (responsive)
      const padding = 60; // Safety padding for breathing room

      // Calculate available space for navigation links
      const availableSpace = containerWidth - logoWidth - searchWidth - authWidth - padding;

      // Calculate estimated width needed for all navigation links with full text
      const estimatedTextWidth = navCategories.reduce((total, category) => {
        // Estimate: ~8px per character + 32px padding + some buffer for font weight
        return total + (category.name.length * 8) + 32;
      }, 0);

      // Calculate estimated width needed for icon-only display
      const estimatedIconWidth = navCategories.length * (48 + 8); // 48px for icon container + 8px margin

      // Primary zoom-based logic
      if (zoomLevel <= 90) {
        // At 90% zoom or lower (including 80%), show full text unless absolutely no space
        if (availableSpace < estimatedTextWidth - 150) { // Give generous tolerance
          setShowIconsOnly(true);
        } else {
          setShowIconsOnly(false);
        }
      } else if (zoomLevel >= 100) {
        // At 100% zoom or higher, prefer icons for better space utilization
        setShowIconsOnly(true);
      } else {
        // For zoom levels between 90% and 100%, use hybrid logic
        if (availableSpace < estimatedTextWidth + 50) {
          setShowIconsOnly(true);
        } else {
          setShowIconsOnly(false);
        }
      }

      // Override: If even icons don't fit, force icons anyway (they're more compact)
      if (estimatedIconWidth > availableSpace && windowWidth >= 768) {
        setShowIconsOnly(true);
      }
    };

    // Check on initial load with a delay to ensure DOM is ready
    const initialCheck = () => {
      setTimeout(checkNavbarSpace, 300);
    };

    initialCheck();

    // Create ResizeObserver to watch for container size changes
    let resizeObserver: ResizeObserver | null = null;

    if (typeof ResizeObserver !== 'undefined' && navContainerRef.current) {
      resizeObserver = new ResizeObserver(() => {
        // Debounce the resize check
        setTimeout(checkNavbarSpace, 100);
      });
      resizeObserver.observe(navContainerRef.current);
    }

    // Also listen to window resize as fallback
    const debouncedResize = () => {
      setTimeout(checkNavbarSpace, 100);
    };

    window.addEventListener('resize', debouncedResize);

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      window.removeEventListener('resize', debouncedResize);
    };
  }, [showIconsOnly]); // Add showIconsOnly as dependency for hysteresis

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
    {
      name: 'INTERNSHIPS',
      path: '/intern',
      icon: <HiOutlineBriefcase className="w-5 h-5" />
    },
    {
      name: 'FASHION & BEAUTY',
      path: '/fashion',
      icon: <HiOutlineSparkles className="w-5 h-5" />
    },
    {
      name: 'TRAVEL',
      path: '/lifestyle',
      icon: <HiOutlineGlobeAlt className="w-5 h-5" />
    },
    {
      name: 'TECHNOLOGY',
      path: '/technology',
      icon: <HiOutlineDesktopComputer className="w-5 h-5" />
    },

    {
      name: 'EVENTS',
      path: '/events',
      icon: <HiOutlineCalendar className="w-5 h-5" />
    },
  ];

  useEffect(() => {
    async function fetchCoins() {
      if (user?.email) {
        try {
          // Fetch referral data using the same function as ReferralSection
          console.log('Fetching referral data in Navbar...');
          const referralResult = await getUserReferralData();
          console.log('Navbar referral result:', referralResult);

          if (referralResult.success && referralResult.data) {
            setReferralCode(referralResult.data.referralCode);
            setReferralUrl(referralResult.data.referralUrl);
            setCoins(referralResult.data.coins); // Use coins from referral data
            console.log('Navbar - Set referral code:', referralResult.data.referralCode);
            console.log('Navbar - Set referral URL:', referralResult.data.referralUrl);
            console.log('Navbar - Set coins from referral data:', referralResult.data.coins);
          } else {
            console.error('Failed to get referral data in Navbar:', referralResult);
            // Fallback to API endpoint
            const res = await fetch(`/api/user?email=${user.email}`);
            const data = await res.json();
            setCoins(data.coins ?? 0);
            console.log('Navbar - Fallback coins from API:', data.coins);
          }
        } catch (error) {
          console.error('Failed to fetch user data:', error);
          setCoins(0);
        }
      }
    }
    fetchCoins();
  }, [user]);

  // Function to refresh user data (coins and referral info)
  const refreshUserData = async () => {
    if (!user?.email) return;

    try {
      console.log('Refreshing user data...');

      // Refresh referral data (which includes coins)
      const referralResult = await getUserReferralData();
      if (referralResult.success && referralResult.data) {
        setReferralCode(referralResult.data.referralCode);
        setReferralUrl(referralResult.data.referralUrl);
        setCoins(referralResult.data.coins); // Use coins from referral data
        console.log('Refreshed coins from referral data:', referralResult.data.coins);
        console.log('Refreshed referrals count:', referralResult.data.totalReferrals);
      } else {
        // Fallback to API endpoint if referral data fails
        const res = await fetch(`/api/user?email=${user.email}`);
        const data = await res.json();
        setCoins(data.coins ?? 0);
        console.log('Fallback - refreshed coins from API:', data.coins);
      }
    } catch (error) {
      console.error('Failed to refresh user data:', error);
    }
  };

  // Listen for referral events to refresh data
  useEffect(() => {
    const handleReferralProcessed = () => {
      console.log('Referral processed event received, refreshing data...');
      refreshUserData();
    };

    // Listen for custom event
    window.addEventListener('referralProcessed', handleReferralProcessed);

    // Also refresh data when window gains focus (user comes back to tab)
    window.addEventListener('focus', refreshUserData);

    return () => {
      window.removeEventListener('referralProcessed', handleReferralProcessed);
      window.removeEventListener('focus', refreshUserData);
    };
  }, [user]);

  // Auto-refresh every 10 seconds to catch any updates faster
  useEffect(() => {
    if (!user?.email) return;

    const interval = setInterval(() => {
      console.log('Auto-refreshing user data...');
      refreshUserData();
    }, 10000); // 10 seconds (faster updates)

    return () => clearInterval(interval);
  }, [user]);

  // Function to refetch referral data when modal opens
  const fetchReferralData = async () => {
    if (!user?.email) return;

    setReferralLoading(true);
    try {
      console.log('Refetching referral data for modal...');
      const referralResult = await getUserReferralData();
      console.log('Modal referral result:', referralResult);

      if (referralResult.success && referralResult.data) {
        setReferralCode(referralResult.data.referralCode);
        setReferralUrl(referralResult.data.referralUrl);
        console.log('Modal - Set referral code:', referralResult.data.referralCode);
        console.log('Modal - Set referral URL:', referralResult.data.referralUrl);
      } else {
        console.error('Failed to get referral data for modal:', referralResult);
      }
    } catch (error) {
      console.error('Error fetching referral data for modal:', error);
    } finally {
      setReferralLoading(false);
    }
  };

  // Fetch referral data when modal opens
  const handleOpenReferralModal = () => {
    setShowReferralModal(true);
    fetchReferralData();
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Add this function inside the NavbarClient component, before the return statement:
  function handleSmartSearch(query: string) {
    // Lowercase for matching
    const q = query.toLowerCase();
    // Example brand/category/product keywords
    if (["nike", "adidas", "puma", "shoes", "sneakers", "footwear"].some(word => q.includes(word))) {
      router.push("/explore-products"); // Redirect to explore products section for any product/brand
      return;
    }
    if (["fashion", "beauty", "clothes", "apparel"].some(word => q.includes(word))) {
      router.push("/categories/fashion");
      return;
    }
    if (["intern", "internship", "job", "work"].some(word => q.includes(word))) {
      router.push("/categories/intern");
      return;
    }
    if (["lifestyle", "travel", "food", "wellness"].some(word => q.includes(word))) {
      router.push("/categories/lifestyle");
      return;
    }
    if (["technology", "tech", "laptop", "tablet", "monitor"].some(word => q.includes(word))) {
      router.push("/categories/technology");
      return;
    }
    if (["deal", "offer", "discount", "special"].some(word => q.includes(word))) {
      router.push("/special-deals");
      return;
    }
    // Default: go to search results page
    router.push(`/search?query=${encodeURIComponent(query)}`);
  }

  return (
    <header className="fixed w-full z-50 flex flex-col transition-transform duration-500" style={{ transform: showNavbar ? 'translateY(0)' : 'translateY(-100%)' }}>
      {/* Discount Bar at the very top */}

      {/* Main Navbar */}
      <nav
        className={`w-full transition-all duration-500 relative ${scrolled
          ? 'py-0 bg-black/90 backdrop-blur-md shadow-lg shadow-orange-900/10'
          : 'py-0 bg-black'
          }`}
        style={{ height: 'auto' }}
      >
        <div className="container mx-auto px-2 py-2" ref={navContainerRef}>
          <div className="flex flex-col space-y-1">
            <div className="flex justify-between items-center h-full overflow-visible gap-2">
              <Link href="/" className="relative flex items-center">
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="relative h-[60px] w-[150px]">
                    <Image
                      src="/assets/images/brokebro.png"
                      alt="BrokeBro Logo"
                      fill
                      style={{
                        objectFit: 'contain',
                        objectPosition: 'left center',
                      }}
                      priority
                    />
                  </div>
                </motion.div>
              </Link>

              {/* Nav Links - Desktop */}
              <div className="hidden md:flex items-center justify-center space-x-1 mx-auto">
                <div className="relative flex items-center space-x-2 p-1 rounded-full bg-black/60" ref={navLinksRef}>
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
                      whileHover={{ scale: showIconsOnly ? 1.15 : 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: showIconsOnly ? 0.15 : 0.3 }}
                    >
                      <Link href={category.path}>
                        <div className={`relative px-2 py-2 rounded-full transition-all duration-300 ${activeCategory === category.name
                          ? 'text-white bg-gradient-to-r from-orange-500/20 to-pink-500/20'
                          : 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-pink-500/20'
                          }`}>
                          <span className="text-xs font-medium whitespace-nowrap">
                            {category.name}
                          </span>

                          {(hoveredCategory === category.name || activeCategory === category.name) && (
                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full w-3/5" />
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
                      <NavbarUserMenu
                        user={{
                          name: `${user?.given_name || ''} ${user?.family_name || ''}`.trim() || 'User',
                          email: user?.email || '',
                          avatar: user?.picture
                        }}
                        onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                      />

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
                                <div className="relative">
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

                                  {/* Verified Badge in Dropdown */}
                                  {isVerified && (
                                    <VerifiedBadge size="sm" />
                                  )}
                                </div>
                                <div>
                                  <p className="text-white font-semibold">{user?.given_name} {user?.family_name}</p>
                                  <p className="text-gray-400 text-sm">{user?.email}</p>
                                  {coins !== null && (
                                    <button
                                      onClick={() => {
                                        console.log('Manual refresh triggered from coins display');
                                        refreshUserData();
                                      }}
                                      className="mt-1 flex items-center text-amber-300 text-sm font-semibold hover:text-amber-200 transition-colors cursor-pointer"
                                      title="Click to refresh coins"
                                    >
                                      <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" /></svg>
                                      {coins} Coins
                                      <svg className="w-3 h-3 ml-1 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                      </svg>
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
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
                              {/* Refer & Earn Button */}
                              <button
                                className="w-full flex items-center justify-center px-4 py-2 text-orange-400 hover:text-white hover:bg-orange-500/10 transition-colors duration-200 font-semibold border-b border-orange-500/20"
                                onClick={handleOpenReferralModal}
                              >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m4 4h-1v-4h-1m-4 4h-1v-4h-1" /></svg>
                                Refer & Earn
                              </button>



                              {/* Admin Panel Option - Only for authorized emails */}
                              {user?.email === 'prince1362005@gmail.com' && (
                                <Link
                                  href="/admin/login"
                                  className="flex items-center px-4 py-3 text-orange-400 hover:text-white hover:bg-orange-500/10 transition-colors duration-200 border-t border-orange-500/20"
                                  onClick={() => setProfileDropdownOpen(false)}
                                >
                                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                  </svg>
                                  <span className="font-semibold">Admin Panel</span>
                                </Link>
                              )}

                              <div className="border-t border-orange-500/20 mt-2 pt-2">
                                <LogoutLink postLogoutRedirectURL={LOGOUT_REDIRECT_URL}>
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
                        <LoginLink>
                          <div className="px-6 py-2 rounded-full bg-gradient-to-r from-orange-500 to-pink-600 text-white font-semibold text-sm hover:shadow-lg hover:shadow-orange-600/20 transition-all duration-300">
                            Login
                          </div>
                        </LoginLink>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <RegisterLink>
                          <div className="px-6 py-2 rounded-full bg-gradient-to-r from-pink-600 to-orange-500 text-white font-semibold text-sm border border-orange-400/30 hover:shadow-lg hover:shadow-pink-600/20 transition-all duration-300">
                            Sign Up
                          </div>
                        </RegisterLink>
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
                  className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-orange-500/20 to-pink-600/20"
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
        </div>
      </nav>

      {/* --- NAVBAR SEARCH BAR --- */}
      <div className="bg-gradient-to-r from-black via-black/95 to-black/90 py-2 px-2 border-b border-orange-500/20 shadow-md">
        <div className="container mx-auto flex flex-col items-center justify-center relative">
          <div className="relative w-full max-w-2xl group z-50">
            <div className="absolute inset-0 rounded-full transition-all duration-500" />
            <div className="relative bg-gradient-to-r p-[1.5px] rounded-full overflow-hidden from-orange-500/50 to-orange-600/50 transition-all duration-300">
              <div className="relative flex items-center bg-black rounded-full overflow-hidden">
                <div className="absolute left-2 z-10 cursor-pointer flex items-center justify-center h-full w-8"
                  onClick={() => {
                    if (searchQuery.trim()) router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
                  }}
                  tabIndex={0} role="button" aria-label="Search">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 transition-colors duration-300 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search brands, deals, categories"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === "Enter" && searchQuery.trim()) {
                      handleSmartSearch(searchQuery.trim());
                    }
                  }}
                  className="w-full bg-transparent py-3 pl-10 pr-16 text-white placeholder-gray-400 focus:outline-none focus:placeholder-gray-300"
                  autoFocus={false}
                />
                {/* Animated Eyes inside search bar at the right side */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none z-20 flex items-center">
                  <AnimatedEyes />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu with Animations */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden bg-gradient-to-b from-black/95 to-black backdrop-blur-lg absolute w-full shadow-lg overflow-hidden"
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
                    className="block py-3 px-4 text-gray-100 hover:text-white border-b border-orange-500/10 hover:bg-orange-500/5 rounded-lg transition-all duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-orange-400">
                        {category.icon}
                      </div>
                      <span className="font-medium">{category.name}</span>
                    </div>
                  </Link>
                </motion.div>
              ))}              <div className="mt-6 pb-4 px-4 grid grid-cols-2 gap-3">
                {shouldShowAuth ? (
                  user ? (
                    <LogoutLink postLogoutRedirectURL={LOGOUT_REDIRECT_URL}>
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
          <div className="bg-black rounded-lg p-8 w-[500px] border border-orange-500/30 shadow-lg relative">
            <button
              className="absolute top-3 right-4 text-gray-400 hover:text-white text-2xl"
              onClick={() => setShowReferralModal(false)}
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold text-orange-400 mb-4">Refer & Earn</h2>
            <p className="text-gray-300 mb-6 text-base">
              Share your referral link with friends.<br />
              Both of you get <span className="text-amber-300 font-semibold">10 coins</span>!
            </p>

            {/* Referral Code Display */}
            <div className="mb-4">
              <div className="text-gray-400 text-sm mb-2">Your Referral Code</div>
              <div className="flex items-center gap-3">
                <code className="bg-gray-800 text-orange-400 px-3 py-2 rounded font-mono text-lg flex-1">
                  {referralLoading ? (
                    <div className="animate-pulse bg-gray-600 h-6 rounded w-24"></div>
                  ) : (
                    referralCode || 'Loading...'
                  )}
                </code>
                <button
                  onClick={() => {
                    if (referralCode && typeof window !== 'undefined') {
                      navigator.clipboard.writeText(referralCode);
                    }
                  }}
                  disabled={!referralCode || referralLoading}
                  className={`p-2 rounded transition-colors ${!referralCode || referralLoading
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-orange-500 hover:bg-orange-600 text-white'
                    }`}
                  title="Copy Code"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Referral URL Display */}
            <div className="mb-6">
              <div className="text-gray-400 text-sm mb-2">Your Referral Link</div>
              <div className="space-y-3">
                {/* URL Display Box */}
                <div className="bg-gray-800 rounded-lg p-3 border border-gray-600">
                  <div className="text-white text-sm break-all font-mono leading-relaxed">
                    {referralLoading ? (
                      <div className="space-y-2">
                        <div className="animate-pulse bg-gray-600 h-4 rounded w-full"></div>
                        <div className="animate-pulse bg-gray-600 h-4 rounded w-3/4"></div>
                      </div>
                    ) : (
                      referralUrl || `${typeof window !== 'undefined' ? window.location.origin : ''}/signup?ref=${referralCode}` || 'Loading...'
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      if (typeof window !== 'undefined') {
                        const urlToCopy = referralUrl || `${window.location.origin}/signup?ref=${referralCode}`;
                        navigator.clipboard.writeText(urlToCopy);
                      }
                    }}
                    disabled={referralLoading || (!referralUrl && !referralCode)}
                    className={`flex-1 py-2 px-4 rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-2 ${referralLoading || (!referralUrl && !referralCode)
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-orange-500 hover:bg-orange-600 text-white'
                      }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    {referralLoading ? 'Loading...' : 'Copy Link'}
                  </button>

                  <button
                    onClick={() => {
                      const url = referralUrl || `${typeof window !== 'undefined' ? window.location.origin : ''}/signup?ref=${referralCode}`;
                      const message = `🎉 Join BrokeBro with my referral link and we both get 10 coins! 💰\n\n${url}\n\nGet amazing student discounts and deals! 🎓`;
                      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
                      window.open(whatsappUrl, '_blank');
                    }}
                    disabled={referralLoading || (!referralUrl && !referralCode)}
                    className={`py-2 px-4 rounded-lg transition-colors text-sm font-medium flex items-center gap-2 ${referralLoading || (!referralUrl && !referralCode)
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-green-600 hover:bg-green-700 text-white'
                      }`}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487.5-.669.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                    </svg>
                    WhatsApp
                  </button>
                </div>
              </div>
            </div>

            {/* Debug Info (can be removed later) */}
            <div className="text-xs text-gray-500 mt-4 p-2 bg-gray-900 rounded">
              <div>Code: {referralCode || 'Not loaded'}</div>
              <div>URL: {referralUrl || 'Not loaded'}</div>
              <div>Fallback: {`${typeof window !== 'undefined' ? window.location.origin : ''}/signup?ref=${referralCode}`}</div>
            </div>
          </div>
        </div>
      )}

      {/* Verification Modal */}
      <VerificationModal isOpen={showVerificationModal} onClose={() => setShowVerificationModal(false)} />
    </header>
  );
}