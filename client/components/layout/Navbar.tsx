"use client";

import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { RegisterLink, LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
const LOGOUT_REDIRECT_URL = "https://www.brokebro.in/";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import VerificationModal from "../auth/VerificationModal";
import NavbarUserMenu from "./NavbarUserMenu";
import { useStudentVerification } from "@/hooks/useStudentVerification";
import BrandSearchBar from "../BrandSearchBar";
import { getUserReferralData } from "@/app/lib/actions/referral.actions";
import { createPortal } from "react-dom";
import {
  HiOutlineBriefcase,
  HiOutlineSparkles,
  HiOutlineGlobeAlt,
  HiOutlineDesktopComputer,
  HiOutlineCalendar,
} from "react-icons/hi";

interface KindeUser {
  id?: string;
  email?: string;
  given_name?: string;
  family_name?: string;
  picture?: string;
}

export default function NavbarClient({ user }: { user: KindeUser | null }) {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [coins, setCoins] = useState<number>(0);
  const [showReferralModal, setShowReferralModal] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const [referralUrl, setReferralUrl] = useState("");
  const [referralLoading, setReferralLoading] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, right: 0 });
  const [copySuccess, setCopySuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const navLinksRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
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
  }, []);

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
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target as Node) &&
        !userMenuRef.current?.contains(event.target as Node)
      ) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchUserData = async () => {
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
        setError(null);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setCoins(0);
        setError("Failed to load user data. Please try again.");
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [user?.email]);

  const refreshUserData = async () => {
    await fetchUserData();
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
  }, []);

  const fetchReferralData = async () => {
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

  const handleCopyCode = () => {
    if (referralCode && typeof window !== "undefined") {
      navigator.clipboard.writeText(referralCode);
      setCopySuccess("Code copied!");
      setTimeout(() => setCopySuccess(null), 2000);
    }
  };

  const handleCopyUrl = () => {
    if (typeof window !== "undefined") {
      const urlToCopy = referralUrl || `${window.location.origin}/signup?ref=${referralCode}`;
      navigator.clipboard.writeText(urlToCopy);
      setCopySuccess("Link copied!");
      setTimeout(() => setCopySuccess(null), 2000);
    }
  };

  const updateDropdownPosition = () => {
    if (userMenuRef.current) {
      const rect = userMenuRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 8,
        right: window.innerWidth - rect.right,
      });
    }
  };

  useEffect(() => {
    if (profileDropdownOpen) {
      updateDropdownPosition();
      const handleResizeOrScroll = () => updateDropdownPosition();
      window.addEventListener("resize", handleResizeOrScroll);
      window.addEventListener("scroll", handleResizeOrScroll);
      return () => {
        window.removeEventListener("resize", handleResizeOrScroll);
        window.removeEventListener("scroll", handleResizeOrScroll);
      };
    }
  }, [profileDropdownOpen]);

  const handleSmartSearch = (query: string) => {
    const q = query.toLowerCase();
    if (["nike", "adidas", "puma", "shoes", "sneakers", "footwear"].some((word) => q.includes(word))) {
      router.push("/explore-products");
      return;
    }
    if (["fashion", "beauty", "clothes", "apparel"].some((word) => q.includes(word))) {
      router.push("/categories/fashion");
      return;
    }
    if (["intern", "internship", "job", "work"].some((word) => q.includes(word))) {
      router.push("/categories/intern");
      return;
    }
    if (["lifestyle", "travel", "food", "wellness"].some((word) => q.includes(word))) {
      router.push("/categories/lifestyle");
      return;
    }
    if (["technology", "tech", "laptop", "tablet", "monitor"].some((word) => q.includes(word))) {
      router.push("/categories/technology");
      return;
    }
    if (["deal", "offer", "discount", "special"].some((word) => q.includes(word))) {
      router.push("/special-deals");
      return;
    }
    router.push(`/search?query=${encodeURIComponent(query)}`);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[1050] bg-black text-white shadow-md border-b border-gray-200 transition-transform duration-500 ${showNavbar ? "translate-y-0" : "-translate-y-full"
        }`}
    >
      <div className="flex items-center justify-between px-6 py-3 max-w-7xl mx-auto" ref={navContainerRef}>
        <Link href="/" className="flex items-center gap-2 select-none min-w-[120px] md:min-w-[150px]" onClick={resetNavState} prefetch={false}>
          <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
            <div className="relative h-[40px] w-[100px] md:h-[60px] md:w-[150px]">
              <Image
                src="/assets/images/remove.png"
                alt="BrokeBro Logo"
                fill
                sizes="(max-width: 768px) 100px, 150px"
                style={{ objectFit: "contain", objectPosition: "left center" }}
                priority
              />
            </div>
          </motion.div>
        </Link>
        <div className="w-full max-w-xs md:max-w-xl relative flex-shrink hidden md:block">
          <div className="relative">
            <BrandSearchBar
              onSelect={(brand) => handleSmartSearch(brand)}
              placeholder="Search brands, categories, deals..."
              inputClassName="text-black placeholder:text-black"
            />

            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-black">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 md:gap-3 min-w-[120px] md:min-w-0" ref={dropdownRef}>
          {isHydrated ? (
            user ? (
              <>
                <span className="text-black px-2 py-1 rounded hidden md:block">Hi, {user.given_name}</span>
                <div ref={userMenuRef}>
                  <NavbarUserMenu
                    user={{
                      name: `${user.given_name || ""} ${user.family_name || ""}`.trim() || "User",
                      email: user.email || "",
                      avatar: user.picture,
                    }}
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  />
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
          <motion.button
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-orange-500/20 to-pink-600/20 border border-orange-500/30"
            onClick={(e) => {
              e.stopPropagation();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div animate={{ rotate: mobileMenuOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
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
          {error && (
            <div className="ml-2 text-red-500 text-sm hidden md:block">
              {error}
            </div>
          )}
          {user ? (
            <span className="ml-2 px-4 py-2 rounded-lg bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 text-amber-800 font-semibold text-base hidden md:inline-flex items-center gap-2 shadow-lg">
              <span className="font-medium">Your Coins</span>
              <span className="text-lg font-bold text-amber-600">{coins}</span>
              <button
                onClick={handleOpenReferralModal}
                className="ml-2 w-7 h-7 flex items-center justify-center rounded-full bg-yellow-400 hover:bg-yellow-500 text-white text-xl font-bold border border-yellow-500 shadow"
                title="Refer & Earn"
                type="button"
              >
                +
              </button>
            </span>
          ) : (
            <button
              onClick={() => router.push(`/signup${referralCode ? `?ref=${referralCode}` : ''}`)}
              className="ml-2 px-4 py-2 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-white font-semibold text-base transition-all hidden md:inline-block shadow-lg border border-yellow-500"
              type="button"
            >
              Refer & Earn
            </button>
          )}
        </div>
      </div>

      {/* Referral Modal */}
      {showReferralModal && (
        <div className="fixed inset-0 z-50 flex justify-center bg-black/70" style={{ alignItems: "flex-start" }}>
          <div className="bg-black rounded-lg p-8 w-[500px] border border-orange-500/30 shadow-lg relative mt-16">
            <button className="absolute top-3 right-4 text-gray-400 hover:text-white text-2xl" onClick={() => setShowReferralModal(false)}>
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
                  {referralLoading ? <div className="animate-pulse bg-gray-600 h-6 rounded w-24"></div> : referralCode || "Loading..."}
                </code>
                <button
                  onClick={handleCopyCode}
                  disabled={!referralCode || referralLoading}
                  className={`p-2 rounded transition-colors ${!referralCode || referralLoading ? "bg-gray-600 text-gray-400 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600 text-white"}`}
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
                      referralUrl || `${typeof window !== "undefined" ? window.location.origin : ""}/signup?ref=${referralCode}` || "Loading..."
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleCopyUrl}
                    disabled={referralLoading || (!referralUrl && !referralCode)}
                    className={`flex-1 py-2 px-4 rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-2 ${referralLoading || (!referralUrl && !referralCode) ? "bg-gray-600 text-gray-400 cursor-not-allowed" : "bg-orange-500 hover:bg-orange-600 text-white"}`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
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
                    className={`py-2 px-4 rounded-lg transition-colors text-sm font-medium flex items-center gap-2 ${referralLoading || (!referralUrl && !referralCode) ? "bg-gray-600 text-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 text-white"}`}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487.5-.669.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                    </svg>
                    WhatsApp
                  </button>
                </div>
              </div>
            </div>
            {copySuccess && (
              <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-lg text-sm">
                {copySuccess}
              </div>
            )}
            <div className="text-xs text-gray-500 mt-4 p-2 bg-gray-900 rounded">
              <div>Code: {referralCode || "Not loaded"}</div>
              <div>URL: {referralUrl || "Not loaded"}</div>
              <div>Fallback: {`${typeof window !== "undefined" ? window.location.origin : ""}/signup?ref=${referralCode}`}</div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Links */}
      <nav className="w-full bg-[#e0e0e0] border-t border-orange-200 shadow-inner z-50" ref={navLinksRef}>
        <div className="flex items-center justify-center gap-16 px-8 py-2 max-w-7xl mx-auto">
          {navCategories.map((category, index) => (
            <Link
              key={index}
              href={category.path}
              className="text-base font-extrabold tracking-wide uppercase text-black hover:text-orange-600 hover:drop-shadow-md transition-all duration-200 hidden md:block"
              style={{ fontFamily: 'Inter, Segoe UI, Arial, sans-serif' }}
              onClick={resetNavState}
              prefetch={false}
            >
              {category.name}
            </Link>
          ))}
        </div>
      </nav>
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.aside
            className="fixed top-0 left-0 h-screen w-[80vw] max-w-xs z-[1000] bg-white shadow-2xl md:hidden flex flex-col"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="flex flex-col py-6 px-4 gap-2 h-full overflow-y-auto">
              {/* User profile info at the top of sidebar */}
              {isHydrated && user && (
                <div className="flex items-center gap-3 mb-6">
                  <img
                    src={user.picture || "/assets/images/remove.png"}
                    alt={user.given_name || "User"}
                    className="w-10 h-10 rounded-full object-cover border border-orange-300"
                  />
                  <div>
                    <div className="font-bold text-black text-base">{user.given_name || "User"}</div>
                    <div className="text-sm text-gray-600">{user.email}</div>
                  </div>
                </div>
              )}
              {navCategories.map((category, index) => (
                <Link
                  key={index}
                  href={category.path}
                  className="font-bold text-base py-3 px-2 text-black hover:text-orange-600 border-b border-gray-200 hover:bg-orange-50 rounded transition-all duration-200"
                  onClick={resetNavState}
                  prefetch={false}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
      <VerificationModal isOpen={showVerificationModal} onClose={() => setShowVerificationModal(false)} />
      {profileDropdownOpen && typeof window !== "undefined" && createPortal(
        <AnimatePresence>
          <motion.div
            ref={profileDropdownRef}
            className="fixed w-64 bg-white backdrop-blur-md rounded-lg border border-orange-500/20 shadow-lg shadow-orange-500/10"
            style={{ top: dropdownPosition.top, right: dropdownPosition.right, zIndex: 999999 }}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {/* Profile Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="relative">
                  {user?.picture ? (
                    <Image
                      src={user.picture}
                      alt={user.given_name || "User"}
                      width={40}
                      height={40}
                      className="rounded-full border-2 border-orange-500/50"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-pink-600 flex items-center justify-center text-white font-semibold">
                      {user?.given_name?.charAt(0) || 'U'}
                    </div>
                  )}
                  {isVerified && (
                    <div className="absolute -bottom-1 -right-1">
                      <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                        <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-gray-900 font-semibold">{user?.given_name || "User"}</h3>
                    {isVerified && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Verified</span>
                    )}
                  </div>
                  <p className="text-gray-500 text-sm">{user?.email}</p>
                </div>
              </div>
            </div>

            {/* Dropdown Menu Items */}
            <div className="p-2">
              <Link
                href="/profileClient"
                className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors text-gray-700"
                onClick={() => setProfileDropdownOpen(false)}
              >
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Profile</span>
              </Link>
              
              <Link
                href="/student-verification"
                className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors text-gray-700"
                onClick={() => setProfileDropdownOpen(false)}
              >
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Verification</span>
              </Link>

              <button
                onClick={() => {
                  setProfileDropdownOpen(false);
                  handleOpenReferralModal();
                }}
                className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors text-gray-700"
              >
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
                <span>Refer & Earn</span>
              </button>

              <div className="border-t border-gray-200 my-2"></div>

              <LogoutLink
                postLogoutRedirectURL={LOGOUT_REDIRECT_URL}
                className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors text-gray-700"
                onClick={() => setProfileDropdownOpen(false)}
              >
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Sign Out</span>
              </LogoutLink>
            </div>
          </motion.div>
        </AnimatePresence>,
        document.body
      )}
    </header>
  );
}