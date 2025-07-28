"use client";

import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { RegisterLink, LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
const LOGOUT_REDIRECT_URL = "https://www.brokebro.in/";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedEyes from "../ui/AnimatedEyes";
import { useRouter, usePathname } from "next/navigation";
import VerificationModal from "../auth/VerificationModal";
import NavbarUserMenu from "./NavbarUserMenu";
import VerifiedBadge from "../ui/VerifiedBadge";
import { useStudentVerification } from "@/hooks/useStudentVerification";
import { getUserReferralData } from "@/app/lib/actions/referral.actions";
import {
  HiOutlineBriefcase,
  HiOutlineSparkles,
  HiOutlineGlobeAlt,
  HiOutlineDesktopComputer,
  HiOutlineCalendar,
} from "react-icons/hi";

export default function NavbarClient({ user }: { user: any }) {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [coins, setCoins] = useState<number | null>(null);
  const [showReferralModal, setShowReferralModal] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const [referralUrl, setReferralUrl] = useState("");
  const [referralLoading, setReferralLoading] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const navLinksRef = useRef<HTMLDivElement>(null);
  const { isVerified } = useStudentVerification();

  const navCategories = [
    { name: "INTERNSHIPS", path: "/intern", icon: <HiOutlineBriefcase className="w-5 h-5" /> },
    { name: "FASHION & BEAUTY", path: "/fashion", icon: <HiOutlineSparkles className="w-5 h-5" /> },
    { name: "TRAVEL", path: "/lifestyle", icon: <HiOutlineGlobeAlt className="w-5 h-5" /> },
    { name: "GYM", path: "/gym", icon: <span className="w-5 h-5">🏋️</span> },
    {
      name: "TECHNOLOGY",
      path: "/technology",
      icon: <HiOutlineDesktopComputer className="w-5 h-5" />,
      dropdown: [{ name: "Gaming", path: "/categories/technology/gaming" }],
    },
    { name: "EVENTS", path: "/events", icon: <HiOutlineCalendar className="w-5 h-5" /> },
  ];

  const resetNavState = () => {
    setActiveCategory(null);
    setHoveredCategory(null);
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
  };

  useEffect(() => {
    resetNavState();
  }, [pathname]);

  useEffect(() => {
    setIsHydrated(true);
    console.log("user", user);
  }, [user]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);
      if (currentScrollY > lastScrollY.current && currentScrollY > 60) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    async function fetchCoins() {
      if (user?.email) {
        try {
          const referralResult = await getUserReferralData();
          if (referralResult.success && referralResult.data) {
            setReferralCode(referralResult.data.referralCode);
            setReferralUrl(referralResult.data.referralUrl);
            setCoins(referralResult.data.coins);
          } else {
            const res = await fetch(`/api/user?email=${user.email}`);
            const data = await res.json();
            setCoins(data.coins ?? 0);
          }
        } catch (error) {
          console.error("Failed to fetch user data:", error);
          setCoins(0);
        }
      }
    }
    fetchCoins();
  }, [user]);

  const refreshUserData = async () => {
    if (!user?.email) return;
    try {
      const referralResult = await getUserReferralData();
      if (referralResult.success && referralResult.data) {
        setReferralCode(referralResult.data.referralCode);
        setReferralUrl(referralResult.data.referralUrl);
        setCoins(referralResult.data.coins);
      } else {
        const res = await fetch(`/api/user?email=${user.email}`);
        const data = await res.json();
        setCoins(data.coins ?? 0);
      }
    } catch (error) {
      console.error("Failed to refresh user data:", error);
    }
  };

  useEffect(() => {
    const handleReferralProcessed = () => {
      refreshUserData();
    };
    window.addEventListener("referralProcessed", handleReferralProcessed);
    window.addEventListener("focus", refreshUserData);
    return () => {
      window.removeEventListener("referralProcessed", handleReferralProcessed);
      window.removeEventListener("focus", refreshUserData);
    };
  }, [user]);

  useEffect(() => {
    if (!user?.email) return;
    const interval = setInterval(() => {
      refreshUserData();
    }, 10000);
    return () => clearInterval(interval);
  }, [user]);

  const fetchReferralData = async () => {
    if (!user?.email) return;
    setReferralLoading(true);
    try {
      const referralResult = await getUserReferralData();
      if (referralResult.success && referralResult.data) {
        setReferralCode(referralResult.data.referralCode);
        setReferralUrl(referralResult.data.referralUrl);
      }
    } catch (error) {
      console.error("Error fetching referral data for modal:", error);
    } finally {
      setReferralLoading(false);
    }
  };

  const handleOpenReferralModal = () => {
    setShowReferralModal(true);
    fetchReferralData();
  };

  const handleSmartSearch = (query: string) => {
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
  };

  return (
    <header
      className={`w-full z-50 bg-black border-b border-gray-200 transition-transform duration-500 ${showNavbar ? "translate-y-0" : "-translate-y-full"}`}
      style={{ position: 'sticky', top: 0 }}
    >
      {/* Top Row: Logo, Country, Search, Auth */}
      <div className="flex items-center justify-between px-6 py-3 max-w-7xl mx-auto" ref={navContainerRef}>
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 select-none" onClick={resetNavState} prefetch={false}>
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
                style={{ objectFit: "contain", objectPosition: "left center" }}
                priority
              />
            </div>
          </motion.div>
        </Link>
        {/* Search Bar */}
        <div className="flex-1 flex justify-center mx-6">
          <div className="w-full max-w-xl relative">
            <input
              type="text"
              className="w-full bg-black border border-gray-700 rounded-full py-2 pl-10 pr-16 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-200 shadow-sm"
              placeholder="Brands, items or categories"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && searchQuery.trim()) {
                  handleSmartSearch(searchQuery.trim());
                }
              }}
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none flex items-center">
              <AnimatedEyes className="text-white" />
            </div>
          </div>
        </div>
        {/* Auth Buttons */}
        <div className="flex items-center gap-3" ref={dropdownRef}>
          {isHydrated ? (
            user ? (
              <>
                <span className="text-black bg-white px-2 py-1 rounded hidden md:block">Hi, {user?.given_name}</span>
                <div style={{ position: 'relative' }}>
                  <NavbarUserMenu
                    user={{
                      name: `${user?.given_name || ""} ${user?.family_name || ""}`.trim() || "User",
                      email: user?.email || "",
                      avatar: user?.picture,
                    }}
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  />
                  {profileDropdownOpen && typeof window !== 'undefined' &&
                    (require('react-dom').createPortal(
                      <motion.div
                        className="fixed right-6 top-[70px] w-64 bg-white backdrop-blur-md rounded-lg border border-orange-500/20 shadow-lg shadow-orange-500/10 z-[99999]"
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                      >
                        {/* ...existing code for dropdown content... */}
                        <div className="p-4 border-b border-gray-200">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center text-white font-semibold">
                              {user?.given_name?.charAt(0)?.toUpperCase() || 'U'}
                            </div>
                            <div className="flex-1">
                              <p className="font-semibold text-gray-900 text-sm">
                                {`${user?.given_name || ""} ${user?.family_name || ""}`.trim() || "User"}
                              </p>
                              <p className="text-xs text-gray-600 truncate">{user?.email}</p>
                            </div>
                            {isVerified && <VerifiedBadge size="sm" />}
                          </div>
                        </div>
                        <div className="p-2">
                          <div className="px-3 py-2 mb-2 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-amber-800">Your Coins</span>
                              <span className="text-lg font-bold text-amber-600">
                                {coins !== null ? coins : '...'}
                              </span>
                            </div>
                          </div>
                          <Link
                            href="/profile"
                            className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-orange-50 rounded-lg transition-colors"
                            onClick={() => setProfileDropdownOpen(false)}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            Profile
                          </Link>
                          <Link
                            href="/settings"
                            className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-orange-50 rounded-lg transition-colors"
                            onClick={() => setProfileDropdownOpen(false)}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Settings
                          </Link>
                          <Link
                            href="/favourites"
                            className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-orange-50 rounded-lg transition-colors"
                            onClick={() => setProfileDropdownOpen(false)}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            Favourites
                          </Link>
                          <button
                            onClick={() => {
                              setProfileDropdownOpen(false);
                              handleOpenReferralModal();
                            }}
                            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-orange-50 rounded-lg transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                            </svg>
                            Refer & Earn
                            <span className="ml-auto text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                              10 coins
                            </span>
                          </button>
                          {!isVerified && (
                            <button
                              onClick={() => {
                                setProfileDropdownOpen(false);
                                setShowVerificationModal(true);
                              }}
                              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              Verify Student Status
                              <span className="ml-auto text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                                New
                              </span>
                            </button>
                          )}
                          <hr className="my-2 border-gray-200" />
                          <LogoutLink
                            postLogoutRedirectURL={LOGOUT_REDIRECT_URL}
                            className="flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            Logout
                          </LogoutLink>
                        </div>
                      </motion.div>,
                      document.body
                    ))}
                </div>
              </>
            ) : (
              <>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <LoginLink>
                    <span className="text-base font-medium text-orange-500 hover:underline cursor-pointer">Login</span>
                  </LoginLink>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <RegisterLink>
                    <span className="px-6 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold text-base transition-all">
                      Register
                    </span>
                  </RegisterLink>
                </motion.div>
              </>
            )
          ) : (
            <div className="flex items-center gap-3">
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
              animate={{ rotate: mobileMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {mobileMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-orange-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-orange-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* Second Row: Nav Links */}
      {/* Desktop Nav Links */}
      <nav className="w-full bg-white border-t border-gray-200" ref={navLinksRef}>
        <div className="flex items-center justify-center gap-8 px-8 py-2 max-w-7xl mx-auto">
          {navCategories.map((category, index) => {
            const dropdownRef = useRef<HTMLDivElement>(null);
            useEffect(() => {
              if (dropdownRef.current && (hoveredCategory === category.name || activeCategory === category.name)) {
                const el = document.getElementById(`nav-${category.name}`);
                if (el) {
                  const rect = el.getBoundingClientRect();
                  dropdownRef.current.style.left = `${rect.left}px`;
                  dropdownRef.current.style.top = `${rect.bottom + 8}px`;
                }
              }
            }, [hoveredCategory, activeCategory]);

            return (
              <motion.div
                key={index}
                id={`nav-${category.name}`}
                onMouseEnter={() => setHoveredCategory(category.name)}
                onMouseLeave={() => setHoveredCategory(null)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <Link
                  href={category.path}
                  className={`text-base font-extrabold tracking-wide uppercase text-black hover:text-orange-400 transition-colors ${activeCategory === category.name ? "text-orange-400" : ""} hidden md:block`}
                  style={{ fontFamily: 'Inter, Segoe UI, Arial, sans-serif' }}
                  onClick={resetNavState}
                  prefetch={false}
                >
                  {category.name}
                  {(hoveredCategory === category.name || activeCategory === category.name) && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full w-3/5" />
                  )}
                </Link>
                {category.dropdown && (hoveredCategory === category.name || activeCategory === category.name) && (
                  <div
                    ref={dropdownRef}
                    className="fixed min-w-[160px] bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-[2000]"
                  >
                    {category.dropdown.map((item, i) => (
                      <Link
                        key={i}
                        href={item.path}
                        className="block px-4 py-2 text-sm text-gray-200 hover:bg-orange-500/80 hover:text-white rounded-lg"
                        onClick={resetNavState}
                        prefetch={false}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </nav>

      {/* Mobile Menu with Animations */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 md:hidden bg-gradient-to-b from-black/95 to-black backdrop-blur-lg w-full h-full z-[9999] shadow-lg overflow-y-auto"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "100%", opacity: 1 }}
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
                    onClick={resetNavState}
                    prefetch={false}
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-orange-400">{category.icon}</span>
                      <span className="font-medium">{category.name}</span>
                    </span>
                  </Link>
                  {category.dropdown && (
                    <div className="pl-8">
                      {category.dropdown.map((item, i) => (
                        <Link
                          key={i}
                          href={item.path}
                          className="block py-2 px-4 text-sm text-gray-200 hover:bg-orange-500/10 hover:text-white rounded-lg"
                          onClick={resetNavState}
                          prefetch={false}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
              <div className="mt-4 mb-4 px-2">
                <div className="bg-gradient-to-r from-black via-black/95 to-black/90 py-2 px-2 border-b border-orange-500/20 shadow-md rounded-xl">
                  <div className="flex flex-col items-center justify-center relative">
                    <div className="relative w-full group z-50">
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
                            className="w-full bg-transparent py-3 pl-10 pr-16 text-white placeholder-gray-400 focus:outline-none focus:placeholder-gray-300"
                          />
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none z-20 flex items-center">
                            <AnimatedEyes />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 pb-4 px-4 grid grid-cols-2 gap-3">
                {isHydrated ? (
                  user ? (
                    <>
                      <Link
                        href="/profile"
                        className="block text-center py-2 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold text-sm hover:from-orange-600 hover:to-orange-700 transition-colors duration-300"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Profile
                      </Link>
                      <LogoutLink
                        postLogoutRedirectURL={LOGOUT_REDIRECT_URL}
                        className="block text-center py-2 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold text-sm hover:from-orange-600 hover:to-orange-700 transition-colors duration-300"
                      >
                        Logout
                      </LogoutLink>
                    </>
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

      {/* Referral Modal */}
      {showReferralModal && (
        <div className="fixed inset-0 z-50 flex justify-center bg-black/70" style={{ alignItems: "flex-start" }}>
          <div className="bg-black rounded-lg p-8 w-[500px] border border-orange-500/30 shadow-lg relative mt-16">
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
            <div className="mb-4">
              <div className="text-gray-400 text-sm mb-2">Your Referral Code</div>
              <div className="flex items-center gap-3">
                <code className="bg-gray-800 text-orange-400 px-3 py-2 rounded font-mono text-lg flex-1">
                  {referralLoading ? (
                    <div className="animate-pulse bg-gray-600 h-6 rounded w-24"></div>
                  ) : (
                    referralCode || "Loading..."
                  )}
                </code>
                <button
                  onClick={() => {
                    if (referralCode && typeof window !== "undefined") {
                      navigator.clipboard.writeText(referralCode);
                    }
                  }}
                  disabled={!referralCode || referralLoading}
                  className={`p-2 rounded transition-colors ${!referralCode || referralLoading
                    ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                    : "bg-orange-500 hover:bg-orange-600 text-white"
                    }`}
                  title="Copy Code"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
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
                      referralUrl || `${typeof window !== "undefined" ? window.location.origin : ""}/signup?ref=${referralCode}` || "Loading..."
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      if (typeof window !== "undefined") {
                        const urlToCopy = referralUrl || `${window.location.origin}/signup?ref=${referralCode}`;
                        navigator.clipboard.writeText(urlToCopy);
                      }
                    }}
                    disabled={referralLoading || (!referralUrl && !referralCode)}
                    className={`flex-1 py-2 px-4 rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-2 ${referralLoading || (!referralUrl && !referralCode)
                      ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                      : "bg-orange-500 hover:bg-orange-600 text-white"
                      }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                    {referralLoading ? "Loading..." : "Copy Link"}
                  </button>
                  <button
                    onClick={() => {
                      const url = referralUrl || `${typeof window !== "undefined" ? window.location.origin : ""}/signup?ref=${referralCode}`;
                      const message = `🎉 Join BrokeBro with my referral link and we both get 10 coins! 💰\n\n${url}\n\nGet amazing student discounts and deals! 🎓`;
                      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
                      window.open(whatsappUrl, "_blank");
                    }}
                    disabled={referralLoading || (!referralUrl && !referralCode)}
                    className={`py-2 px-4 rounded-lg transition-colors text-sm font-medium flex items-center gap-2 ${referralLoading || (!referralUrl && !referralCode)
                      ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700 text-white"
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
            <div className="text-xs text-gray-500 mt-4 p-2 bg-gray-900 rounded">
              <div>Code: {referralCode || "Not loaded"}</div>
              <div>URL: {referralUrl || "Not loaded"}</div>
              <div>
                Fallback: {`${typeof window !== "undefined" ? window.location.origin : ""}/signup?ref=${referralCode}`}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Verification Modal */}
      <VerificationModal isOpen={showVerificationModal} onClose={() => setShowVerificationModal(false)} />
    </header>
  );
}