"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedEyes from '../ui/AnimatedEyes';
import { LoginLink, RegisterLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  
  const { isAuthenticated } = useKindeAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navCategories = [
    { name: 'INTERNSHIPS', path: '/categories/intern' },
    { name: 'FASHION & BEAUTY', path: '/categories/fashion' },
    { name: 'TRAVEL AND LIFESTYLE', path: '/categories/lifestyle' },
    { name: 'TECHNOLOGY', path: '/categories/technology' },
    { name: 'FREEBIES FOR ALL', path: '/freebies' },
  ];

  return (
    <header className="fixed w-full z-50 flex flex-col">
      {/* Main Navbar */}
      <nav 
        className={`w-full transition-all duration-500 relative ${
          scrolled 
            ? 'py-0 bg-black/90 backdrop-blur-md shadow-lg shadow-orange-900/10' 
            : 'py-0 bg-black'
        }`}
        style={{ height: '70px' }} // Fixed height for navbar
      >
        <div className="container mx-auto px-4 h-full">
          <div className="flex justify-between items-center h-full">
            {/* Logo with absolute positioning to prevent affecting navbar height */}
            <Link href="/" className="relative h-full flex items-center">
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="relative h-20 w-56  " style={{ marginBottom: '-5px' }}>
                  <Image 
                    src="/assets/images/broke-bro.png" 
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

            {/* Enhanced Nav Links - Desktop (Icons Removed) */}
            <div className="hidden lg:flex items-center justify-center space-x-1 mx-auto">
              <div className="relative flex items-center space-x-1 p-1 rounded-full bg-black/60">
                {/* Highlight background that follows the active item */}
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
                
                {/* Actual navigation links */}
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
                      <div className={`relative px-4 py-2 rounded-full transition-all duration-300 ${
                        activeCategory === category.name 
                          ? 'text-white' 
                          : 'text-gray-300 hover:text-white'
                      }`}>
                        {/* Text with gradient on hover */}
                        <span className={`text-sm font-medium ${
                          hoveredCategory === category.name 
                            ? 'bg-gradient-to-r from-orange-300 to-pink-300 text-transparent bg-clip-text'
                            : ''
                        }`}>
                          {category.name}
                        </span>
                        
                        {/* Bottom highlight line with animation */}
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
            
            {/* Authentication Buttons with Hover Effects */}
            <div className="flex items-center space-x-3">
              {isAuthenticated ? (
                <LogoutLink className="px-6 py-2 rounded-full bg-gradient-to-r from-orange-500 to-pink-600 text-white font-semibold text-sm hover:shadow-lg hover:shadow-orange-600/20 transition-all duration-300">
                  Logout
                </LogoutLink>
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
              className={`absolute inset-0 rounded-full transition-all duration-500 ${
                searchFocused 
                  ? 'bg-gradient-to-r from-orange-600/10 to-pink-600/10 blur-md' 
                  : 'bg-black/0'
              }`} 
            />
            
            {/* Search bar container with gradient borders */}
            <div className={`relative bg-gradient-to-r p-[1.5px] rounded-full overflow-hidden ${
              searchFocused 
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
      
      {/* Mobile Menu with Animations (Icons Removed) */}
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
              ))}
              
              <div className="mt-6 pb-4 px-4 grid grid-cols-2 gap-3">
                {isAuthenticated ? (
                  <LogoutLink
                    className="block text-center py-2 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold text-sm hover:from-orange-600 hover:to-orange-700 transition-colors duration-300"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Logout
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
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;