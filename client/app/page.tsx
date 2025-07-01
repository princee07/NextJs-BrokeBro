import Image from "next/image";
import { RegisterLink, LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";

import Hero from '@/components/sections/Hero';
import BannerSection from '@/components/sections/BannerSection';
import OfferSlider from '@/components/sections/OfferSlider';
import ExploreProducts from '@/components/sections/ExploreProduct';
import TopBrands from '@/components/sections/TopBrands';
import OrbitTestimonials from '@/components/sections/OrbitTestimonials';
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>

      <Hero />
      <BannerSection />
      <OfferSlider />
      <TopBrands />
      <ExploreProducts />
      <OrbitTestimonials />
    
    </>
  );
}