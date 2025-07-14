"use client"
import { Inter } from "next/font/google";
import "./styles/global.css";
import NavbarWrapper from "@/components/layout/NavbarWrapper";
import Footer from "@/components/layout/Footer";
import ReferralProcessor from "@/components/auth/ReferralProcessor";
import { useUserVerification } from '@/hooks/useUserVerification';
import { useState, useEffect } from 'react';
import StudentVerification from '@/components/auth/StudentVerification';
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";

import { Analytics } from "@vercel/analytics/next"
import Script from "next/script";
const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { isVerified, loading, verificationId, user, isAuthenticated } = useUserVerification();
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [activeCoupon, setActiveCoupon] = useState('STUDENT2025');

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (e.button !== 0) return;
      let el = e.target as HTMLElement;
      while (el && el !== document.body) {
        // If user clicks a card/brand, show verification/coupon modal only if authenticated
        if (
          el.classList.contains('card') ||
          el.classList.contains('product-card')
        ) {
          e.preventDefault();
          e.stopPropagation();
          if (!loading) {
            if (!verificationId) {
              // Let KindeAuth handle login/signup as normal
              return;
            } else if (!isVerified) {
              setShowVerificationModal(true);
            } else {
              setShowCouponModal(true);
            }
          }
          return;
        }
        el = el.parentElement as HTMLElement;
      }
    };
    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, [isVerified, loading, verificationId]);

  useEffect(() => {
    // If redirected from Kinde and user is still undefined, reload to fetch session
    if (!user && typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.has('code') || params.has('state')) {
        window.location.reload();
      }
    }
    // No redirect after login/signup; user stays on landing page
  }, [user, isAuthenticated]);

  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-M844TQKBMV"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-M844TQKBMV');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <ReferralProcessor />
        <NavbarWrapper />
        <main>{children}</main>
        <Footer />
        <Analytics />
        {/* Coupon Modal */}
        {showCouponModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="bg-white rounded-lg p-8 shadow-xl flex flex-col items-center">
              <h2 className="text-2xl font-bold mb-4 text-green-600">Your Coupon Code</h2>
              <div className="text-3xl font-mono bg-green-100 text-green-700 px-6 py-3 rounded-lg mb-4">{activeCoupon}</div>
              <button className="mt-2 px-4 py-2 bg-green-600 text-white rounded" onClick={() => setShowCouponModal(false)}>Close</button>
            </div>
          </div>
        )}
        {/* Student Verification Modal */}
        {showVerificationModal && (
          <StudentVerification isOpen={true} onClose={() => setShowVerificationModal(false)} />
        )}
        {/* Login/Signup handled by KindeAuth buttons as before */}
      </body>
    </html>
  );
}