"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-gradient-to-r from-emerald-50 via-lime-50 to-emerald-50

 text-black border-t border-orange-200 pt-12 pb-8 px-6 mt-12 shadow-[0_-4px_32px_0_rgba(255,115,22,0.07)]"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Logo & Description */}
        <div className="flex flex-col items-start md:items-start md:col-span-2 mb-8 md:mb-0">
          <Link href="/" className="mb-4 block">
            <img src="/assets/images/brokebro.png" alt="BrokeBro Logo" className="h-12 w-auto" style={{ objectFit: 'contain' }} />
          </Link>
          <p className="text-sm text-gray-700 max-w-xs leading-relaxed">
            BrokeBro is India's student-first platform for internships, deals, and career resources. Empowering students to hustle, save, and grow smarter every day.
          </p>
        </div>
        {/* Footer Links */}
        <div className="md:col-span-3 md:col-start-3 grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* About Us */}
          <div>
            <h3 className="text-lg font-semibold text-orange-500 mb-4 uppercase tracking-wide">About Us</h3>
            <ul className="space-y-2 text-sm text-gray-800">
              <li><Link href="/about"><span className="hover:text-orange-500 transition-colors">About</span></Link></li>
              <li><Link href="/team"><span className="hover:text-orange-500 transition-colors">Team</span></Link></li>
              <li><Link href="/careers"><span className="hover:text-orange-500 transition-colors">Careers</span></Link></li>
              <li><Link href="/press"><span className="hover:text-orange-500 transition-colors">Press Kit</span></Link></li>
            </ul>
          </div>
          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold text-orange-500 mb-4 uppercase tracking-wide">Resources</h3>
            <ul className="space-y-2 text-sm text-gray-800">
              <li><Link href="/blog"><span className="hover:text-orange-500 transition-colors">Blog</span></Link></li>
              <li><Link href="/faq"><span className="hover:text-orange-500 transition-colors">Help Center</span></Link></li>
              <li><Link href="/contact"><span className="hover:text-orange-500 transition-colors">Contact Us</span></Link></li>
              <li><Link href="/faq"><span className="hover:text-orange-500 transition-colors">FAQ</span></Link></li>
            </ul>
          </div>
          {/* Connect */}
          <div>
            <h3 className="text-lg font-semibold text-orange-500 mb-4 uppercase tracking-wide">Connect</h3>
            <ul className="space-y-2 text-sm text-gray-800">
              <li><a href="https://discord.gg/n5FjFfp5" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 transition-colors">Discord</a></li>
              <li><a href="https://x.com/BrooBroke42743" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 transition-colors">Twitter</a></li>
              <li><a href="https://www.instagram.com/brokebroofficial" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 transition-colors">Instagram</a></li>
              <li><a href="https://www.linkedin.com/company/brokebro/" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 transition-colors">LinkedIn</a></li>
            </ul>
            <div className="flex space-x-4 mt-4 text-black">
              {/* Social Icons here (unchanged except color) */}
              {/* ... (no changes needed to SVGs unless you want to color them differently) */}
            </div>
          </div>
        </div>
      </div>
      <motion.div
        className="text-center text-gray-600 text-sm mt-10 border-t border-orange-100 pt-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <p>
          © 2025 <span className="text-orange-500 font-semibold">BrokeBro</span>. All rights reserved.
          Designed with <span className="text-pink-500">❤️</span> for students.
        </p>
      </motion.div>
    </motion.footer>
  );
}
