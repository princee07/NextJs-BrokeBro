import Image from "next/image";
import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";

import Hero from '@/components/sections/Hero';
import OfferSlider from '@/components/sections/OfferSlider';
 import ExploreProducts from '@/components/sections/ExploreProduct';
 import TopBrands from '@/components/sections/TopBrands';
 import OrbitTestimonials from '@/components/sections/OrbitTestimonials';
import NavbarClient from "@/components/layout/Navbar";

export default function Home() {
  return (
    <>

      <Hero />
      <OfferSlider />
      <TopBrands/>
      <ExploreProducts/>
       <OrbitTestimonials/>
    

    </>
  );
}
