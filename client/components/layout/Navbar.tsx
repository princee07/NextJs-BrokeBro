"use client";

import Image from "next/image";
import React, { useState, useEffect, useRef } from 'react';
import Link from "next/link";
import { RegisterLink, LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedEyes from '../ui/AnimatedEyes';
import { useRouter } from 'next/navigation';
import VerificationModal from '../auth/VerificationModal';
import NavbarUserMenu from './NavbarUserMenu';
import VerifiedBadge from '../ui/VerifiedBadge';
import { useStudentVerification } from '@/hooks/useStudentVerification';
import { getUserReferralData } from "@/app/lib/actions/referral.actions";

// Define a User type for better type safety
interface User {
  given_name?: string;
  family_name?: string;
  email?: string;
  picture?: string;
}

// Define navCategories before hooks
const navCategories = [
  { name: 'INTERNSHIPS', path: '/intern' },
  { name: 'FASHION & BEAUTY', path: '/fashion' },
  { name: 'TRAVEL & LIFESTYLE', path: '/lifestyle' },
  { name: 'TECHNOLOGY', path: '/technology' },
  { name: 'EVENTS', path: '/events' },
];

export default function NavbarClient({ user }: { user: User }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [coins, setCoins] = useState<number | null>(null);
  const [showReferralModal, setShowReferralModal] = useState(false);
  const [referralCode, setReferralCode] = useState('');
  const [referralUrl, setReferralUrl] = useState('');
  const [referralLoading, setReferralLoading] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const navLinksRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const { isVerified } = useStudentVerification();

  useEffect(() => {
    setIsHydrated(true);
    console.log("user", user);
  }, [user]);

  const shouldShowAuth = isHydrated;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const checkNavbarSpace = () => {
      if (!navLinksRef.current || !navContainerRef.current) return;

      const windowWidth = window.innerWidth;
      const containerWidth = navContainerRef.current.clientWidth;
      const logoWidth = 150;
      const authWidth = windowWidth < 1024 ? 200 : 250;
      const padding = 60;
      const availableSpace = containerWidth - logoWidth - authWidth - padding;

      const estimatedTextWidth = navCategories.reduce((total, category) => {
        return total + (category.name.length * 8) + 32;
      }, 0);

      console.log('Available Space:', availableSpace, 'Estimated Text Width:', estimatedTextWidth);

      if (windowWidth < 768) {
        // setShowIconsOnly(false); // Removed unused
      } else {
        // setShowIconsOnly(availableSpace < estimatedTextWidth); // Removed unused
      }
    };

    const initialCheck = () => setTimeout(checkNavbarSpace, 300);
    initialCheck();

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && navContainerRef.current) {
      resizeObserver = new ResizeObserver(() => setTimeout(checkNavbarSpace, 100));
      resizeObserver.observe(navContainerRef.current);
    }

    const debouncedResize = () => setTimeout(checkNavbarSpace, 100);
    window.addEventListener('resize', debouncedResize);

    return () => {
      if (resizeObserver) resizeObserver.disconnect();
      window.removeEventListener('resize', debouncedResize);
    };
  }, [navCategories]); // Added missing dependency

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    async function fetchCoins() {
      if (user?.email) {
        try {
          console.log('Fetching referral data in Navbar...');
          const referralResult = await getUserReferralData();
          console.log('Navbar referral result:', referralResult);

          if (referralResult.success && referralResult.data) {
            setReferralCode(referralResult.data.referralCode);
            setReferralUrl(referralResult.data.referralUrl);
            setCoins(referralResult.data.coins);
            console.log('Navbar - Set referral code:', referralResult.data.referralCode);
            console.log('Navbar - Set referral URL:', referralResult.data.referralUrl);
            console.log('Navbar - Set coins from referral data:', referralResult.data.coins);
          } else {
            console.error('Failed to get referral data in Navbar:', referralResult);
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

  const refreshUserData = async () => {
    if (!user?.email) return;

    try {
      console.log('Refreshing user data...');
      const referralResult = await getUserReferralData();
      if (referralResult.success && referralResult.data) {
        setReferralCode(referralResult.data.referralCode);
        setReferralUrl(referralResult.data.referralUrl);
        setCoins(referralResult.data.coins);
        console.log('Refreshed coins from referral data:', referralResult.data.coins);
        console.log('Refreshed referrals count:', referralResult.data.totalReferrals);
      } else {
        const res = await fetch(`/api/user?email=${user.email}`);
        const data = await res.json();
        setCoins(data.coins ?? 0);
        console.log('Fallback - refreshed coins from API:', data.coins);
      }
    } catch (error) {
      console.error('Failed to refresh user data:', error);
    }
  };

  useEffect(() => {
    const handleReferralProcessed = () => {
      console.log('Referral processed event received, refreshing data...');
      refreshUserData();
    };

    window.addEventListener('referralProcessed', handleReferralProcessed);
    window.addEventListener('focus', refreshUserData);

    return () => {
      window.removeEventListener('referralProcessed', handleReferralProcessed);
      window.removeEventListener('focus', refreshUserData);
    };
  }, [user, refreshUserData]); // Added missing dependency

  useEffect(() => {
    if (!user?.email) return;

    const interval = setInterval(() => {
      console.log('Auto-refreshing user data...');
      refreshUserData();
    }, 10000);

    return () => clearInterval(interval);
  }, [user, refreshUserData]); // Added missing dependency

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

  const handleOpenReferralModal = () => {
    setShowReferralModal(true);
    fetchReferralData();
  };

  function handleSmartSearch(query: string) {
    const q = query.toLowerCase();
    if (["nike", "adidas", "puma", "shoes", "sneakers", "footwear"].some(word => q.includes(word))) {
      router.push("/explore-products");
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
    router.push(`/search?query=${encodeURIComponent(query)}`);
  }

  return (
    <header className="fixed w-full z-50 flex flex-col">
      <nav
        className={`w-full transition-all duration-500 relative ${
          scrolled
            ? 'py-0 bg-black/90 backdrop-blur-md shadow-lg shadow-orange-900/10'
            : 'py-0 bg-black'
        }`}
        style={{ height: 'auto' }}
      >
        <div className="container mx-auto px-4 py-4" ref={navContainerRef}>
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between items-center h-full overflow-visible">
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

              <div className="hidden md:flex items-center justify-center space-x-2 p-2" ref={navLinksRef}>
                {navCategories.map((category, index) => (
                  <div
                    key={index}
                    id={`nav-${category.name}`}
                    onMouseEnter={() => setHoveredCategory(category.name)}
                    onMouseLeave={() => setHoveredCategory(null)}
                  >
                    <Link href={category.path}>
                     <div className={`relative px-2 py-2 rounded-full transition-all duration-300 ${
  activeCategory === category.name ? 'text-white bg-gradient-to-r from-orange-500/20 to-pink-500/20' : 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-pink-500/20'
}`}>
                        <span className="text-xs font-medium whitespace-nowrap">
                          {category.name} {/* Removed showIconsOnly condition for testing */}
                        </span>
                        {(hoveredCategory === category.name || activeCategory === category.name) && (
                          <div
                            className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full w-3/5"
                          />
                        )}
                      </div>
                    </Link>
                  </div>
                ))}
              </div>

              <div className="flex items-center space-x-3">
                {shouldShowAuth ? (
                  user ? (
                    <div className="relative flex items-center space-x-3" ref={dropdownRef}>
                      <span className="text-amber-50">Hi, {user?.given_name}</span>
                      <NavbarUserMenu
                        user={{
                          name: `${user?.given_name || ''} ${user?.family_name || ''}`.trim() || 'User',
                          email: user?.email || '',
                          avatar: user?.picture
                        }}
                        onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                      />
                      <AnimatePresence>
                        {profileDropdownOpen && (
                          <motion.div
                            className="absolute right-0 top-full mt-2 w-64 bg-black/95 backdrop-blur-md rounded-lg border border-orange-500/20 shadow-lg shadow-orange-500/10 z-50"
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                          >
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
                            <button
                              className="w-full flex items-center justify-center px-4 py-2 text-orange-400 hover:text-white hover:bg-orange-500/10 transition-colors duration-200 font-semibold border-b border-orange-500/20"
                              onClick={handleOpenReferralModal}
                            >
                              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m4 4h-1v-4h-1m-4 4h-1v-4h-1" /></svg>
                              Refer & Earn
                            </button>
                            <button
                              className="w-full flex items-center justify-center px-4 py-2 text-green-500 hover:text-white hover:bg-green-600/10 transition-colors duration-200 font-semibold border-b border-green-500/20 bg-green-500/5"
                              onClick={() => setShowVerificationModal(true)}
                            >
                              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2zm0 2c-2.21 0-4 1.79-4 4v1h8v-1c0-2.21-1.79-4-4-4z" />
                              </svg>
                              <span className="font-bold">Get Verified</span>
                            </button>
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
                        <LoginLink>
                          <div className="w-24 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500 to-pink-600 text-white font-semibold text-sm text-center hover:shadow-lg hover:shadow-orange-600/20 transition-all duration-300">
                            Login
                          </div>
                        </LoginLink>
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <RegisterLink>
                          <div className="w-24 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500 to-pink-600 text-white font-semibold text-sm text-center hover:shadow-lg hover:shadow-orange-600/20 transition-all duration-300">
                            Sign Up
                          </div>
                        </RegisterLink>
                      </motion.div>
                    </>
                  )
                ) : (
                  <div className="flex items-center space-x-3">
                    <div className="w-16 h-8 bg-gray-700/50 rounded-full animate-pulse"></div>
                    <div className="w-16 h-8 bg-gray-700/50 rounded-full animate-pulse"></div>
                  </div>
                )}
                <motion.button
                  className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-orange-500/20 to-pink-600/20"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  whileTap={{ scale: 0.9 }}
                >
                  <motion.div
                    animate={{ rotate: mobileMenuOpen ? 180 : 0 }}
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

            <div className="hidden md:flex justify-center">
              <div className="relative w-full max-w-md group z-50">
                <div className="relative bg-gradient-to-r p-[1.5px] rounded-full overflow-hidden from-orange-500/50 to-orange-600/50 transition-all duration-300">
                  <div className="relative flex items-center bg-black rounded-full overflow-hidden">
                    <div
                      className="absolute left-2 z-10 cursor-pointer flex items-center justify-center h-full w-8"
                      onClick={() => {
                        if (searchQuery.trim()) router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
                      }}
                      tabIndex={0}
                      role="button"
                      aria-label="Search"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400 transition-colors duration-300 pointer-events-none"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder="Search brands, deals, categories"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && searchQuery.trim()) {
                          handleSmartSearch(searchQuery.trim());
                        }
                      }}
                      className="w-full bg-transparent py-2 pl-10 pr-16 text-white placeholder-gray-400 focus:outline-none focus:placeholder-gray-300"
                      autoFocus={false}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none z-20 flex items-center">
                      <AnimatedEyes size="sm" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

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
              <div className="relative w-full max-w-md group z-50 mb-4">
                <div className="relative bg-gradient-to-r p-[1.5px] rounded-full overflow-hidden from-orange-500/50 to-orange-600/50 transition-all duration-300">
                  <div className="relative flex items-center bg-black rounded-full overflow-hidden">
                    <div
                      className="absolute left-2 z-10 cursor-pointer flex items-center justify-center h-full w-8"
                      onClick={() => {
                        if (searchQuery.trim()) router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
                      }}
                      tabIndex={0}
                      role="button"
                      aria-label="Search"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-400 transition-colors duration-300 pointer-events-none"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder="Search brands, deals, categories"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && searchQuery.trim()) {
                          handleSmartSearch(searchQuery.trim());
                        }
                      }}
                      className="w-full bg-transparent py-2 pl-10 pr-16 text-white placeholder-gray-400 focus:outline-none focus:placeholder-gray-300"
                      autoFocus={false}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none z-20 flex items-center">
                      <AnimatedEyes size="sm" />
                    </div>
                  </div>
                </div>
              </div>
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
                    <span className="font-medium">{category.name}</span>
                  </Link>
                </motion.div>
              ))}
              <div className="mt-6 pb-4 px-4 grid grid-cols-2 gap-3">
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
                  <div className="col-span-2 h-10 bg-gray-700/50 rounded-lg animate-pulse"></div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {showReferralModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70">
          <div className="bg-black rounded-lg p-8 w-[500px] border border-orange-500/30 shadow-lg relative">
            <button
              className="absolute top-3 right-4 text-gray-400 hover:text-white text-2xl"
              onClick={() => setShowReferralModal(false)}
            >
              ×
            </button>
            <h2 className="text-2xl font-bold text-orange-400 mb-4">Refer & Earn</h2>
            <p className="text-gray-300 mb-6 text-base">
              Share your referral link with friends.<br />
              Both of you get <span className="text-amber-300 font-semibold">10 coins</span>!
            </p>
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
                  className={`p-2 rounded transition-colors ${
                    !referralCode || referralLoading
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
            <div className="mb-6">
              <div className="text-gray-400 text-sm mb-2">Your Referral Link</div>
              <div className="space-y-3">
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
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      if (typeof window !== 'undefined') {
                        const urlToCopy = referralUrl || `${window.location.origin}/signup?ref=${referralCode}`;
                        navigator.clipboard.writeText(urlToCopy);
                      }
                    }}
                    disabled={referralLoading || (!referralUrl && !referralCode)}
                    className={`flex-1 py-2 px-4 rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-2 ${
                      referralLoading || (!referralUrl && !referralCode)
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
                    className={`py-2 px-4 rounded-lg transition-colors text-sm font-medium flex items-center gap-2 ${
                      referralLoading || (!referralUrl && !referralCode)
                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        : 'bg-green-600 hover:bg-green-700 text-white'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487.5-.669.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                    </svg>
                    WhatsApp
                  </button>
                </div>
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-4 p-2 bg-gray-900 rounded">
              <div>Code: {referralCode || 'Not loaded'}</div>
              <div>URL: {referralUrl || 'Not loaded'}</div>
              <div>Fallback: {`${typeof window !== 'undefined' ? window.location.origin : ''}/signup?ref=${referralCode}`}</div>
            </div>
          </div>
        </div>
      )}
      <VerificationModal isOpen={showVerificationModal} onClose={() => setShowVerificationModal(false)} />
    </header>
  );
}