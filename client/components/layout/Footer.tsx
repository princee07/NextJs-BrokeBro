"use client"

import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isStudent, setIsStudent] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, margin: "-100px 0px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Newsletter signup logic would go here
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
    setEmail('');
  };

  return (
    <footer ref={footerRef} className="bg-black relative overflow-hidden pt-20 pb-6">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 opacity-70"></div>
      
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-10 blur-3xl bg-gradient-to-r from-orange-500 to-pink-600"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-10 blur-3xl bg-gradient-to-r from-red-600 to-orange-500"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Newsletter Section */}
        <motion.div 
          initial="hidden"
          animate={controls}
          className="mb-16 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 md:p-10 shadow-xl border border-gray-800"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div className="">
              <h3 className="text-3xl font-bold text-white mb-2">
                Stay Updated for{" "}
                <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">
                  Exclusive Deals
                </span>
              </h3>
              <p className="text-gray-400 mb-4">
                Subscribe to our newsletter for exclusive student discounts, tech tips, and new arrival alerts.
              </p>
              
              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-900/30 text-green-400 px-4 py-3 rounded-md flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Thank you for subscribing!</span>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="relative">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-grow">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-medium rounded-lg transition-all shadow-lg hover:shadow-orange-500/20"
                    >
                      Subscribe
                    </button>
                  </div>
                  <div className="mt-3 flex items-center">
                    <input
                      type="checkbox"
                      id="isStudent"
                      checked={isStudent}
                      onChange={() => setIsStudent(!isStudent)}
                      className="w-4 h-4 rounded border-gray-700 text-orange-500 focus:ring-orange-500"
                    />
                    <label htmlFor="isStudent" className="ml-2 text-sm text-gray-400">
                      I'm a student (Get extra discounts)
                    </label>
                  </div>
                </form>
              )}
            </motion.div>

            <motion.div 
              className="hidden md:flex justify-center"
            >
              <div className="relative h-40 w-40">
                <Image
                  src="/newsletter-illustration.png" 
                  alt="Newsletter"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <motion.div 
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-16"
        >
          {/* Brand Column */}
          <motion.div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center">
                <span className="text-white font-bold text-xl">B</span>
              </div>
              <h3 className="ml-2 text-xl font-bold text-white">BrokeBro</h3>
            </div>
            <p className="text-gray-400 mb-6">
              Your one-stop destination for affordable tech products with exclusive student discounts. We believe in making quality technology accessible to everyone.
            </p>
            <div className="flex space-x-4">
              <motion.a 
                href="#" 
                className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-orange-500 hover:text-white transition-colors"
                whileHover={{ y: -3 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                </svg>
              </motion.a>
              <motion.a 
                href="#" 
                className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-orange-500 hover:text-white transition-colors"
                whileHover={{ y: -3 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                </svg>
              </motion.a>
              <motion.a 
                href="#" 
                className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-orange-500 hover:text-white transition-colors"
                whileHover={{ y: -3 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                </svg>
              </motion.a>
              <motion.a 
                href="#" 
                className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-orange-500 hover:text-white transition-colors"
                whileHover={{ y: -3 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z"/>
                </svg>
              </motion.a>
              <motion.a 
                href="#" 
                className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-orange-500 hover:text-white transition-colors"
                whileHover={{ y: -3 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                </svg>
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div>
            <h4 className="text-white font-bold text-lg mb-4">Shop</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/laptops" className="text-gray-400 hover:text-orange-500 transition-colors">Laptops</Link>
              </li>
              <li>
                <Link href="/gaming" className="text-gray-400 hover:text-orange-500 transition-colors">Gaming</Link>
              </li>
              <li>
                <Link href="/accessories" className="text-gray-400 hover:text-orange-500 transition-colors">Accessories</Link>
              </li>
              <li>
                <Link href="/monitors" className="text-gray-400 hover:text-orange-500 transition-colors">Monitors</Link>
              </li>
              <li>
                <Link href="/tablets" className="text-gray-400 hover:text-orange-500 transition-colors">Tablets</Link>
              </li>
              <li>
                <Link href="/deals" className="text-gray-400 hover:text-orange-500 transition-colors">Special Deals</Link>
              </li>
            </ul>
          </motion.div>

          {/* Company Links */}
          <motion.div>
            <h4 className="text-white font-bold text-lg mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-orange-500 transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-400 hover:text-orange-500 transition-colors">Careers</Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-orange-500 transition-colors">Blog</Link>
              </li>
              <li>
                <Link href="/student-verification" className="text-gray-400 hover:text-orange-500 transition-colors">Student Verification</Link>
              </li>
              <li>
                <Link href="/press" className="text-gray-400 hover:text-orange-500 transition-colors">Press</Link>
              </li>
            </ul>
          </motion.div>

          {/* Contact & Support */}
          <motion.div>
            <h4 className="text-white font-bold text-lg mb-4">Contact & Help</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="mt-1 mr-3 w-5 h-5 bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-gray-400">support@brokebro.com</span>
              </li>
              <li className="flex items-start">
                <div className="mt-1 mr-3 w-5 h-5 bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <span className="text-gray-400">+1 (800) 123-4567</span>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-orange-500 transition-colors">FAQs</Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-400 hover:text-orange-500 transition-colors">Shipping Info</Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-400 hover:text-orange-500 transition-colors">Returns & Refunds</Link>
              </li>
              <li>
                <Link href="/warranty" className="text-gray-400 hover:text-orange-500 transition-colors">Warranty</Link>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Download App Banner */}
        <motion.div
          className="w-full mb-10 p-6 bg-gray-900 rounded-xl border border-gray-800 flex flex-col md:flex-row items-center justify-between"
        >
          <div className="mb-4 md:mb-0">
            <h4 className="text-white font-bold text-lg">Download Our App</h4>
            <p className="text-gray-400 text-sm">Shop easily and track your orders on the go</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="#">
              <Image 
                src="/app-store-badge.png" 
                alt="Download on App Store"
                width={140}
                height={42}
              />
            </Link>
            <Link href="#">
              <Image 
                src="/google-play-badge.png" 
                alt="Get it on Google Play"
                width={140}
                height={42}
              />
            </Link>
          </div>
        </motion.div>

        {/* Bottom Footer */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.p 
              className="text-gray-500 text-sm mb-4 md:mb-0"
            >
              © {new Date().getFullYear()} BrokeBro. All rights reserved.
            </motion.p>
            <motion.div 
              className="flex flex-wrap gap-x-6 gap-y-2"
            >
              <Link href="/terms" className="text-gray-500 text-sm hover:text-orange-500 transition-colors">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-gray-500 text-sm hover:text-orange-500 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/cookies" className="text-gray-500 text-sm hover:text-orange-500 transition-colors">
                Cookie Settings
              </Link>
              <Link href="/sitemap" className="text-gray-500 text-sm hover:text-orange-500 transition-colors">
                Sitemap
              </Link>
            </motion.div>
          </div>
          
          {/* Payment methods */}
          <motion.div 
            className="mt-6 flex flex-wrap justify-center md:justify-start gap-3"
          >
            <div className="h-6 w-10 bg-gray-800 rounded opacity-70"></div>
            <div className="h-6 w-10 bg-gray-800 rounded opacity-70"></div>
            <div className="h-6 w-10 bg-gray-800 rounded opacity-70"></div>
            <div className="h-6 w-10 bg-gray-800 rounded opacity-70"></div>
            <div className="h-6 w-10 bg-gray-800 rounded opacity-70"></div>
            <span className="text-gray-600 text-xs self-center ml-2">
              Secure payment methods
            </span>
          </motion.div>
        </div>
      </div>

      {/* Student verification floating button */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Link href="/student-verification">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-orange-500 to-amber-600 rounded-full text-white shadow-lg hover:shadow-orange-500/25 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
            </svg>
            <span className="text-sm font-medium">Student Verification</span>
          </motion.button>
        </Link>
      </motion.div>
    </footer>
  );
};

export default Footer;