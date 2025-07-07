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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <footer ref={footerRef} className="bg-gradient-to-b from-gray-900 via-black to-gray-900 relative overflow-hidden pt-20 pb-6">
      {/* Enhanced Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 opacity-80 shadow-lg shadow-orange-500/20"></div>

      {/* Floating orbs with animation */}
      <motion.div
        className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-20 blur-3xl bg-gradient-to-r from-orange-500 to-pink-600"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      ></motion.div>
      <motion.div
        className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-20 blur-3xl bg-gradient-to-r from-purple-600 to-orange-500"
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      ></motion.div>

      {/* Additional floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-orange-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -60, -20],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Newsletter Section */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="mb-16 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 md:p-10 shadow-xl border border-gray-800 backdrop-blur-sm relative overflow-hidden"
        >
          {/* Newsletter background effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-purple-600/5"></div>
          <motion.div
            className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-400/20 to-transparent rounded-full blur-2xl"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
          ></motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10">
            <motion.div variants={itemVariants} className="">
              <motion.h3
                className="text-3xl md:text-4xl font-bold text-white mb-2"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Stay Updated for{" "}
                <span className="bg-gradient-to-r from-orange-400 via-amber-500 to-orange-600 bg-clip-text text-transparent animate-pulse">
                  Exclusive Deals
                </span>
              </motion.h3>
              <motion.p
                className="text-gray-400 mb-6 text-lg"
                variants={itemVariants}
              >
                Subscribe to our newsletter for exclusive student discounts, tech tips, and new arrival alerts.
              </motion.p>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-gradient-to-r from-green-900/40 to-emerald-900/40 text-green-300 px-6 py-4 rounded-xl flex items-center border border-green-600/30 backdrop-blur-sm"
                >
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-3"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </motion.svg>
                  <span className="font-semibold">Thank you for subscribing! Check your inbox.</span>
                </motion.div>
              ) : (
                <motion.form
                  onSubmit={handleSubmit}
                  className="relative"
                  variants={itemVariants}
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-grow relative group">
                      <motion.input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        className="w-full px-6 py-4 rounded-xl bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent backdrop-blur-sm transition-all group-hover:bg-gray-800/70"
                        whileFocus={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-500/20 to-amber-500/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                    </div>
                    <motion.button
                      type="submit"
                      className="px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-orange-500/25 relative overflow-hidden group"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="relative z-10">Subscribe</span>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.6 }}
                      ></motion.div>
                    </motion.button>
                  </div>
                  <motion.div
                    className="mt-4 flex items-center group cursor-pointer"
                    whileHover={{ x: 5 }}
                    onClick={() => setIsStudent(!isStudent)}
                  >
                    <motion.input
                      type="checkbox"
                      id="isStudent"
                      checked={isStudent}
                      onChange={() => setIsStudent(!isStudent)}
                      className="w-5 h-5 rounded border-gray-700 text-orange-500 focus:ring-orange-500 cursor-pointer"
                      whileHover={{ scale: 1.1 }}
                    />
                    <label htmlFor="isStudent" className="ml-3 text-gray-400 group-hover:text-gray-300 transition-colors cursor-pointer">
                      I'm a student (Get extra discounts 🎓)
                    </label>
                  </motion.div>
                </motion.form>
              )}
            </motion.div>

            <motion.div
              className="hidden md:flex justify-center items-center"
              variants={itemVariants}
            >
              <motion.div
                className="relative h-48 w-48"
                animate={{
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {/* Glowing orb effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-orange-400/30 to-purple-600/30 rounded-full blur-xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                ></motion.div>
                {/* Newsletter illustration placeholder */}
                <div className="relative z-10 w-full h-full bg-gradient-to-br from-orange-500/20 to-purple-600/20 rounded-full flex items-center justify-center border border-orange-500/30">
                  <motion.div
                    className="text-6xl"
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  >
                    📧
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-16"
        >
          {/* Brand Column */}
          <motion.div className="lg:col-span-2" variants={itemVariants}>
            <motion.div
              className="flex items-center mb-6 group cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center shadow-lg group-hover:shadow-orange-500/25"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-white font-bold text-xl">B</span>
              </motion.div>
              <h3 className="ml-3 text-2xl font-bold text-white group-hover:text-orange-400 transition-colors">BrokeBro</h3>
            </motion.div>
            <motion.p
              className="text-gray-400 mb-8 text-lg leading-relaxed"
              variants={itemVariants}
            >
              Your one-stop destination for affordable tech products with exclusive student discounts. We believe in making quality technology accessible to everyone.
            </motion.p>
            <motion.div
              className="flex space-x-4"
              variants={itemVariants}
            >
              {[
                {
                  icon: "M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z",
                  color: "hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-600",
                  href: "https://instagram.com/brokebrotech"
                },
                {
                  icon: "M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z",
                  color: "hover:bg-blue-700",
                  href: "https://linkedin.com/company/brokebrotech"
                },
                {
                  icon: "M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z",
                  color: "hover:bg-indigo-600",
                  href: "https://discord.gg/brokebrotech"
                }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-11 h-11 rounded-full bg-gray-800/50 backdrop-blur-sm flex items-center justify-center text-gray-400 ${social.color} hover:text-white transition-all border border-gray-700/50 hover:border-transparent hover:scale-110 hover:shadow-lg`}
                  whileHover={{ y: -3, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d={social.icon} />
                  </svg>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <motion.h4
              className="text-white font-bold text-lg mb-6 relative"
              whileHover={{ x: 5 }}
            >
              Shop
              <motion.div
                className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-orange-500 to-amber-500"
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              ></motion.div>
            </motion.h4>
            <ul className="space-y-3">
              {['Laptops', 'Gaming', 'Accessories', 'Monitors', 'Tablets', 'Special Deals'].map((item, index) => (
                <motion.li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace(' ', '-')}`}
                    className="text-gray-400 hover:text-orange-500 transition-all duration-300 flex items-center group"
                  >
                    <motion.span
                      whileHover={{ x: 5 }}
                      className="group-hover:text-orange-400"
                    >
                      {item}
                    </motion.span>
                    <motion.span
                      className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={{ x: -10 }}
                      whileHover={{ x: 0 }}
                    >
                      →
                    </motion.span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Company Links */}
          <motion.div variants={itemVariants}>
            <motion.h4
              className="text-white font-bold text-lg mb-6 relative"
              whileHover={{ x: 5 }}
            >
              Company
              <motion.div
                className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-orange-500 to-amber-500"
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              ></motion.div>
            </motion.h4>
            <ul className="space-y-3">
              {[
                { name: 'About Us', href: '/about' },
                { name: 'Careers', href: '/careers' },
                { name: 'Blog', href: '/blog' },
                { name: 'Student Verification', href: '/student-verification' },
                { name: 'Press', href: '/press' }
              ].map((item) => (
                <motion.li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-orange-500 transition-all duration-300 flex items-center group"
                  >
                    <motion.span
                      whileHover={{ x: 5 }}
                      className="group-hover:text-orange-400"
                    >
                      {item.name}
                    </motion.span>
                    <motion.span
                      className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={{ x: -10 }}
                      whileHover={{ x: 0 }}
                    >
                      →
                    </motion.span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact & Support */}
          <motion.div variants={itemVariants}>
            <motion.h4
              className="text-white font-bold text-lg mb-6 relative"
              whileHover={{ x: 5 }}
            >
              Contact & Help
              <motion.div
                className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-orange-500 to-amber-500"
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              ></motion.div>
            </motion.h4>
            <ul className="space-y-4">
              <motion.li
                className="flex items-start group cursor-pointer"
                whileHover={{ x: 5 }}
              >
                <motion.div
                  className="mt-1 mr-3 w-6 h-6 bg-gray-800/50 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0 border border-gray-700/50 group-hover:border-orange-500/50 group-hover:bg-orange-500/10"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </motion.div>
                <span className="text-gray-400 group-hover:text-orange-400 transition-colors">support@brokebro.com</span>
              </motion.li>
              <motion.li
                className="flex items-start group cursor-pointer"
                whileHover={{ x: 5 }}
              >
                <motion.div
                  className="mt-1 mr-3 w-6 h-6 bg-gray-800/50 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0 border border-gray-700/50 group-hover:border-orange-500/50 group-hover:bg-orange-500/10"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </motion.div>
                <span className="text-gray-400 group-hover:text-orange-400 transition-colors">+91 7669955109</span>
              </motion.li>
              {['FAQ'].map((item) => (
                <motion.li key={item}>
                  <Link
                    href={`/${item.toLowerCase().replace(' ', '-').replace('&', 'and')}`}
                    className="text-gray-400 hover:text-orange-500 transition-all duration-300 flex items-center group"
                  >
                    <motion.span
                      whileHover={{ x: 5 }}
                      className="group-hover:text-orange-400"
                    >
                      {item}
                    </motion.span>
                    <motion.span
                      className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={{ x: -10 }}
                      whileHover={{ x: 0 }}
                    >
                      →
                    </motion.span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>



        {/* Bottom Footer */}
        <motion.div
          className="pt-8 border-t border-gray-800/50 backdrop-blur-sm"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.p
              className="text-gray-500 text-sm mb-4 md:mb-0"
              variants={itemVariants}
              whileHover={{ color: "#f97316" }}
            >
              © {new Date().getFullYear()} BrokeBro. All rights reserved. Made with ❤️ for students
            </motion.p>
            <motion.div
              className="flex flex-wrap gap-x-6 gap-y-2"
              variants={itemVariants}
            >
              {['Terms of Service', 'Privacy Policy', 'Cookie Settings', 'Sitemap'].map((item) => (
                <motion.div key={item} whileHover={{ y: -2 }}>
                  <Link
                    href={`/${item.toLowerCase().replace(' ', '-')}`}
                    className="text-gray-500 text-sm hover:text-orange-500 transition-all duration-300 relative group"
                  >
                    {item}
                    <motion.div
                      className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"
                    ></motion.div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Payment methods */}
          <motion.div
            className="mt-8 flex flex-wrap justify-center md:justify-start gap-4"
            variants={itemVariants}
          >
            {[1, 2, 3, 4, 5].map((i) => (
              <motion.div
                key={i}
                className="h-8 w-12 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700/50 flex items-center justify-center"
                whileHover={{ scale: 1.05, borderColor: "#f97316" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-6 h-4 bg-gradient-to-r from-orange-500/30 to-amber-500/30 rounded"></div>
              </motion.div>
            ))}
            <motion.span
              className="text-gray-600 text-xs self-center ml-3 flex items-center"
              whileHover={{ color: "#f97316" }}
            >
              <motion.div
                className="w-2 h-2 bg-green-500 rounded-full mr-2"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              ></motion.div>
              Secure payment methods
            </motion.span>
          </motion.div>
        </motion.div>
      </div>

      {/* Student verification floating button */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 1, duration: 0.5, type: "spring", stiffness: 200 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Link href="/student-verification">
          <motion.button
            whileHover={{ scale: 1.05, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-3 px-6 py-4 bg-gradient-to-r from-orange-500 to-amber-600 rounded-full text-white shadow-xl hover:shadow-orange-500/30 transition-all relative overflow-hidden group"
            animate={{
              boxShadow: [
                "0 10px 30px rgba(249, 115, 22, 0.3)",
                "0 10px 40px rgba(249, 115, 22, 0.5)",
                "0 10px 30px rgba(249, 115, 22, 0.3)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            {/* Background shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
              }}
            ></motion.div>

            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
            </motion.svg>
            <span className="text-sm font-semibold relative z-10">Student Verification</span>

            {/* Pulsing dot indicator */}
            <motion.div
              className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [1, 0.7, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
            ></motion.div>
          </motion.button>
        </Link>
      </motion.div>
    </footer>
  );
};

export default Footer;