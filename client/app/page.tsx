import Image from "next/image";
import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";

import Hero from '@/components/sections/Hero';
import OfferSlider from '@/components/sections/OfferSlider';
 import ExploreProducts from '@/components/sections/ExploreProduct';
 import TopBrands from '@/components/sections/TopBrands';
 import OrbitTestimonials from '@/components/sections/OrbitTestimonials';


export default function Home() {
  return (
    <>
    <h1>This is Kinde App</h1>
    <RegisterLink>Sign Up</RegisterLink>
    <LoginLink>Login</LoginLink>
  
    
      <Hero />
      <OfferSlider />
      <TopBrands/>
      <ExploreProducts/>
       <OrbitTestimonials/>
    

    </>
  );
}