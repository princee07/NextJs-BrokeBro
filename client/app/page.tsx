import Image from "next/image";
import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";

import Hero from '@/components/sections/Hero';
import BannerSection from '@/components/sections/BannerSection';
import OfferSlider from '@/components/sections/OfferSlider';
import ExploreProducts from '@/components/sections/ExploreProduct';
import TopBrands from '@/components/sections/TopBrands';
import OrbitTestimonials from '@/components/sections/OrbitTestimonials';
import Footer from "@/components/layout/Footer";
import VerificationTestControls from '@/components/ui/VerificationTestControls';
import AdminAccessButton from '@/components/ui/AdminAccessButton';

export default function Home() {
  return (
    <>
      <Hero />
      <BannerSection />
      <OfferSlider />
      <TopBrands />
      <ExploreProducts />
      <OrbitTestimonials />

      {/* Development Test Controls */}
      <VerificationTestControls />

      {/* Admin Access (only visible to authorized emails) */}
      <div className="fixed bottom-4 right-20 z-40">
        <AdminAccessButton />
      </div>
    </>
  );
}