"use client";

import Hero from '@/components/sections/Hero';
import React, { useRef, useEffect } from 'react';
import { useUserVerification } from '@/hooks/useUserVerification';
import { ShieldCheck } from 'lucide-react';

import OfferSlider from '@/components/sections/OfferSlider';
import ExploreProducts from '@/components/sections/ExploreProduct';
import TopBrands from '@/components/sections/TopBrands';
import OrbitTestimonials from '@/components/sections/OrbitTestimonials';
import Footer from "@/components/layout/Footer";
import VerificationTestControls from '@/components/ui/VerificationTestControls';

export default function Home() {
  const { isVerified, loading } = useUserVerification();
  const exploreRef = useRef(null);

  useEffect(() => {
    // Send ref to Hero
    window.dispatchEvent(new CustomEvent('explore-products-ref', { detail: { ref: exploreRef.current } }));
    // Listen for scroll event
    const handler = () => {
      if (exploreRef.current) {
        (exploreRef.current as HTMLElement).scrollIntoView({ behavior: 'smooth' });
      }
    };
    window.addEventListener('scroll-to-explore-products', handler);
    return () => window.removeEventListener('scroll-to-explore-products', handler);
  }, []);

  return (
    <>
      <Hero />

      {/* Verified message removed as requested */}
      <OfferSlider />
      <TopBrands />
      <section ref={exploreRef}>
        <ExploreProducts />
      </section>

      <OrbitTestimonials />

      {/* Development Test Controls */}
      <VerificationTestControls />
    </>
  );
}