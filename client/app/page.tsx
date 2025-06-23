
import Hero from '@/components/sections/Hero';
import OfferSlider from '@/components/sections/OfferSlider';
 import ExploreProducts from '@/components/sections/ExploreProduct';
 import TopBrands from '@/components/sections/TopBrands';
 import WoodenBlocks3D from '@/components/sections/WoodenBlocks3D';
// import DiscountCategories from '@/components/sections/DiscountCategories';

export default function Home() {
  return (
    <>
      <Hero />
      <OfferSlider />
      <ExploreProducts/>
      <TopBrands/>
        <WoodenBlocks3D/>
        {/* <DiscountCategories/> */}

    </>
  );
}