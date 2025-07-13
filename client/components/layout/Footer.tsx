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
      className="bg-gradient-to-r from-black via-black/95 to-black/90 text-gray-300 border-t border-orange-500/30 pt-12 pb-8 px-6 mt-12 shadow-[0_-4px_32px_0_rgba(255,115,22,0.07)]"
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Logo & Description */}
        <div className="flex flex-col items-start md:items-start md:col-span-2 mb-8 md:mb-0">
          <Link href="/" className="mb-4 block">
            <img src="/assets/images/brokebro.png" alt="BrokeBro Logo" className="h-12 w-auto" style={{objectFit:'contain'}} />
          </Link>
          <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
            BrokeBro is India's student-first platform for internships, deals, and career resources. Empowering students to hustle, save, and grow smarter every day.
          </p>
        </div>
        {/* Footer Links */}
        <div className="md:col-span-3 md:col-start-3 grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* About Us */}
          <div>
            <h3 className="text-lg font-semibold text-orange-400 mb-4 uppercase tracking-wide">About Us</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about"><span className="hover:text-orange-300 transition-colors">About</span></Link></li>
              <li><Link href="/team"><span className="hover:text-orange-300 transition-colors">Team</span></Link></li>
              <li><Link href="/careers"><span className="hover:text-orange-300 transition-colors">Careers</span></Link></li>
              <li><Link href="/press"><span className="hover:text-orange-300 transition-colors">Press Kit</span></Link></li>
            </ul>
          </div>
          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold text-orange-400 mb-4 uppercase tracking-wide">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/blog"><span className="hover:text-orange-300 transition-colors">Blog</span></Link></li>
              <li><Link href="/faq"><span className="hover:text-orange-300 transition-colors">Help Center</span></Link></li>
              <li><Link href="/contact"><span className="hover:text-orange-300 transition-colors">Contact Us</span></Link></li>
              <li><Link href="/faq"><span className="hover:text-orange-300 transition-colors">FAQ</span></Link></li>
            </ul>
          </div>
          {/* Connect */}
          <div>
            <h3 className="text-lg font-semibold text-orange-400 mb-4 uppercase tracking-wide">Connect</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="https://discord.gg/n5FjFfp5" target="_blank" rel="noopener noreferrer" className="hover:text-orange-300 transition-colors">Discord</a></li>
              <li><a href="https://x.com/BrooBroke42743" target="_blank" rel="noopener noreferrer" className="hover:text-orange-300 transition-colors">Twitter</a></li>
              <li><a href="https://www.instagram.com/brokebroofficial" target="_blank" rel="noopener noreferrer" className="hover:text-orange-300 transition-colors">Instagram</a></li>
              <li><a href="https://www.linkedin.com/company/brokebro/" target="_blank" rel="noopener noreferrer" className="hover:text-orange-300 transition-colors">LinkedIn</a></li>
            </ul>
            <div className="flex space-x-4 mt-4">
              <a href="https://x.com/BrooBroke42743" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-orange-400 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 5.924c-.793.352-1.646.59-2.54.698a4.48 4.48 0 001.965-2.475 8.94 8.94 0 01-2.828 1.082A4.48 4.48 0 0016.11 4c-2.48 0-4.49 2.01-4.49 4.49 0 .352.04.695.116 1.022C7.728 9.37 4.1 7.6 1.67 4.905a4.48 4.48 0 00-.61 2.26c0 1.56.795 2.94 2.01 3.75a4.48 4.48 0 01-2.034-.563v.057c0 2.18 1.55 4 3.6 4.42-.377.103-.775.158-1.185.158-.29 0-.57-.028-.845-.08.57 1.78 2.23 3.08 4.2 3.12A8.98 8.98 0 012 19.54a12.7 12.7 0 006.88 2.02c8.26 0 12.78-6.84 12.78-12.78 0-.195-.004-.39-.013-.583A9.1 9.1 0 0024 4.59a8.98 8.98 0 01-2.54.698z" /></svg>
              </a>
              <a href="https://www.instagram.com/brokebroofficial" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-orange-400 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5a4.25 4.25 0 004.25-4.25v-8.5A4.25 4.25 0 0016.25 3.5h-8.5zm4.25 2.25a5.25 5.25 0 110 10.5 5.25 5.25 0 010-10.5zm0 1.5a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5zm6.25 1.25a1 1 0 110 2 1 1 0 010-2z" /></svg>
              </a>
              <a href="https://www.linkedin.com/company/brokebro/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-orange-400 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm15.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.88v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z" /></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      <motion.div
        className="text-center text-gray-400 text-sm mt-10 border-t border-orange-500/20 pt-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <p>
          © 2025{" "}
          <span className="text-orange-400 font-semibold">BrokeBro</span>. All rights reserved.
          Designed with <span className="text-pink-400">❤️</span> for students.
        </p>
      </motion.div>
    </motion.footer>
  );
}