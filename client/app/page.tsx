"use client";
import Image from "next/image";
import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";

import Hero from '@/components/sections/Hero';
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

  return (
    <>
      <Hero />

      {/* Show verified message if user is verified */}
      {!loading && isVerified && (
        <div className="flex items-center justify-center my-6">
          <div className="bg-green-600/90 text-white px-6 py-3 rounded-lg shadow flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-white" />
            <span className="font-semibold">You are verified now! Enjoy exclusive student benefits.</span>
          </div>
        </div>
      )}

      <OfferSlider />
      <TopBrands />
      <ExploreProducts />
      <OrbitTestimonials />

      {/* Development Test Controls */}
      <VerificationTestControls />
    </>
  );
}