"use client"

import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useUserVerification } from '@/hooks/useUserVerification';
import { useRouter } from 'next/navigation';
import Modal from '../ui/Modal';

const TopBrands = () => {
  // Define brand data
  const topBrands = [
    // Row 1
    [
      { id: 1, name: 'TIMEX INDIA', logo: '/assets/afiliate/timex.png', discount: '20% Off', url: 'https://track.vcommission.com/click?campaign_id=10746&pub_id=120422' },
      { id: 2, name: 'SONATA WATCHES', logo: '/assets/afiliate/sonata.png', discount: '25% Off', url: 'https://track.vcommission.com/click?campaign_id=10743&pub_id=120422' },
      { id: 3, name: 'FASTRACK', logo: '/assets/afiliate/fastrack.png', discount: '30% Off', url: 'https://track.vcommission.com/click?campaign_id=10742&pub_id=120422' },
      { id: 4, name: 'TITAN', logo: '/assets/afiliate/titan.png', discount: '15% Off', url: 'https://track.vcommission.com/click?campaign_id=10741&pub_id=120422' },
      { id: 5, name: 'AJIO', logo: '/assets/afiliate/ajio.png', discount: '40% Off', url: 'https://track.vcommission.com/click?campaign_id=10364&pub_id=120422' },
      { id: 6, name: 'MOGLIX', logo: '/assets/afiliate/moglix.png', discount: '35% Off', url: 'https://track.vcommission.com/click?campaign_id=10351&pub_id=120422' },
      { id: 7, name: 'GONOISE', logo: '/assets/afiliate/gonoise.png', discount: '45% Off', url: 'https://track.vcommission.com/click?campaign_id=10320&pub_id=120422' },
      { id: 8, name: 'UNIQLO', logo: '/assets/afiliate/uniqlo.png', discount: '20% Off', url: 'https://track.vcommission.com/click?campaign_id=10258&pub_id=120422' },
      { id: 9, name: 'SAMSUNG', logo: '/assets/afiliate/samsung.png', discount: '25% Off', url: 'https://track.vcommission.com/click?campaign_id=10211&pub_id=120422' },
      { id: 10, name: 'MUSCLEBLAZE', logo: '/assets/afiliate/muscleblaze.png', discount: '30% Off', url: 'https://track.vcommission.com/click?campaign_id=10169&pub_id=120422' },
      { id: 11, name: 'MCAFFEINE', logo: '/assets/afiliate/mcaffeine.png', discount: '35% Off', url: 'https://track.vcommission.com/click?campaign_id=10163&pub_id=120422' },
      { id: 12, name: 'KAPIVA', logo: '/assets/afiliate/kapiva.png', discount: '25% Off', url: 'https://track.vcommission.com/click?campaign_id=10126&pub_id=120422' },
      { id: 13, name: 'HEALTH KART', logo: '/assets/afiliate/hk.png', discount: '20% Off', url: 'https://track.vcommission.com/click?campaign_id=10109&pub_id=120422' },
      { id: 14, name: 'GIVA', logo: '/assets/afiliate/giva.png', discount: '40% Off', url: 'https://track.vcommission.com/click?campaign_id=10097&pub_id=120422' },
    ],
    // Row 2
    [
      { id: 15, name: 'CLEARTRIP', logo: '/assets/afiliate/cleartrip.png', discount: '15% Off', url: 'https://track.vcommission.com/click?campaign_id=10046&pub_id=120422' },
      { id: 16, name: 'BIBA', logo: '/assets/afiliate/biba.png', discount: '50% Off', url: 'https://track.vcommission.com/click?campaign_id=12553&pub_id=120422' },
      { id: 17, name: 'SWISS BEAUTY', logo: '/assets/afiliate/swissbeauty.png', discount: '45% Off', url: 'https://track.vcommission.com/click?campaign_id=12372&pub_id=120422' },
      { id: 18, name: 'LEVIS', logo: '/assets/afiliate/levis.png', discount: '30% Off', url: 'https://track.vcommission.com/click?campaign_id=11501&pub_id=120422' },
      { id: 19, name: 'ADIDAS', logo: '/assets/afiliate/adidas.png', discount: '25% Off', url: 'https://track.vcommission.com/click?campaign_id=11355&pub_id=120422' },
      { id: 20, name: 'SALTY', logo: '/assets/afiliate/salty.png', discount: '35% Off', url: 'https://track.vcommission.com/click?campaign_id=11241&pub_id=120422' },
      { id: 21, name: 'FOXTALE', logo: '/assets/afiliate/foxtale.png', discount: '40% Off', url: 'https://track.vcommission.com/click?campaign_id=10994&pub_id=120422' },
      { id: 22, name: 'MINIMALIST', logo: '/assets/afiliate/minimalist.png', discount: '30% Off', url: 'https://track.vcommission.com/click?campaign_id=10971&pub_id=120422' },
      { id: 23, name: 'THE BODY SHOP', logo: '/assets/afiliate/thebodyshop.png', discount: '45% Off', url: 'https://track.vcommission.com/click?campaign_id=10932&pub_id=120422' },
      { id: 24, name: 'SUPERBOTTOMS', logo: '/assets/afiliate/superbottom.png', discount: '35% Off', url: 'https://track.vcommission.com/click?campaign_id=10930&pub_id=120422' },
      { id: 25, name: 'NILKAMAL', logo: '/assets/afiliate/nilkamal.png', discount: '25% Off', url: 'https://track.vcommission.com/click?campaign_id=11875&pub_id=120422' },
      { id: 26, name: 'IGP', logo: '/assets/afiliate/igp.png', discount: '20% Off', url: 'https://track.vcommission.com/click?campaign_id=11874&pub_id=120422' },
      { id: 27, name: 'BACCA BUCCI', logo: '/assets/afiliate/baccabucci.png', discount: '40% Off', url: 'https://track.vcommission.com/click?campaign_id=11641&pub_id=120422' },
    ]
  ];

  // Animation controls and ref for visibility detection
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px 0px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const { isAuthenticated, isLoading } = useKindeBrowserClient();
  const { isVerified } = useUserVerification();
  const router = useRouter();
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<any>(null);

  const handleBrandClick = (brand: any) => {
    if (isLoading) return;
    if (!isAuthenticated) {
      router.push('/signup');
      return;
    }
    if (!isVerified) {
      router.push('/student-verification');
      return;
    }
    setSelectedBrand(brand);
    setShowCouponModal(true);
  };

  return (
    <section
      ref={sectionRef}
      className="w-full py-20 bg-black/95 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-10 blur-3xl bg-gradient-to-r from-orange-500 to-pink-600"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-10 blur-3xl bg-gradient-to-r from-blue-600 to-purple-500"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            Top <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">Brands</span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-md mx-auto">
            Exclusive student discounts on leading tech and lifestyle brands
          </p>
        </motion.div>

        {/* Brand sliders */}
        <div className="mt-10 space-y-10">
          {/* Row 1 - Left to Right */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <motion.div
              className="flex space-x-6 py-2"
              animate={{ x: [0, -2000] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 60,
                  ease: "linear",
                }
              }}
            >
              {/* Double the items for seamless loop */}
              {[...topBrands[0], ...topBrands[0]].map((brand, index) => (
                <button key={index} className="relative group bg-transparent border-none p-0 m-0" onClick={() => handleBrandClick(brand)}>
                  <motion.div
                    whileHover={{
                      y: -10,
                      boxShadow: "0 10px 30px -10px rgba(249, 115, 22, 0.4)"
                    }}
                    className="w-44 h-32 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden border border-gray-800 relative p-3"
                  >
                    {/* Brand logo */}
                    <div className="relative w-28 h-16 flex items-center justify-center bg-white rounded-lg shadow border border-gray-200 mb-2">
                      <Image
                        src={brand.logo}
                        alt={brand.name}
                        fill
                        style={{ objectFit: "contain" }}
                        className="p-1"
                      />
                    </div>

                      {/* Brand name */}
                      <p className="text-white font-medium text-xs text-center">{brand.name}</p>

                    {/* Discount badge */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      className="absolute top-2 right-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full"
                    >
                      {brand.discount}
                    </motion.div>
                  </motion.div>
                </button>
              ))}
            </motion.div>
          </motion.div>

          {/* Row 2 - Right to Left */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative"
          >
            <motion.div
              className="flex space-x-6 py-2"
              animate={{ x: [-2000, 0] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 60,
                  ease: "linear",
                }
              }}
            >
              {/* Double the items for seamless loop */}
              {[...topBrands[1], ...topBrands[1]].map((brand, index) => (
                <button key={index} className="relative group bg-transparent border-none p-0 m-0" onClick={() => handleBrandClick(brand)}>
                  <motion.div
                    whileHover={{
                      y: -10,
                      boxShadow: "0 10px 30px -10px rgba(249, 115, 22, 0.4)"
                    }}
                    className="w-44 h-32 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden border border-gray-800 relative p-3"
                  >
                    {/* Brand logo */}
                    <div className="relative w-28 h-16 flex items-center justify-center bg-white rounded-lg shadow border border-gray-200 mb-2">
                      <Image
                        src={brand.logo}
                        alt={brand.name}
                        fill
                        style={{ objectFit: "contain" }}
                        className="p-1"
                      />
                    </div>

                      {/* Brand name */}
                      <p className="text-white font-medium text-xs text-center">{brand.name}</p>

                    {/* Discount badge */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      className="absolute top-2 right-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full"
                    >
                      {brand.discount}
                    </motion.div>
                  </motion.div>
                </button>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* CTA button */}
      </div>

      {/* Coupon Modal */}
      <Modal isOpen={showCouponModal} onClose={() => setShowCouponModal(false)}>
        {selectedBrand && (
          <div className="flex flex-col items-center text-center p-4">
            <div className="w-full max-w-xs h-40 bg-white rounded-xl flex items-center justify-center mb-4 shadow-lg">
            </div>
            <h2 className="text-2xl font-extrabold mb-1 text-gray-100 drop-shadow">{selectedBrand.name} Student Discount</h2>
            <p className="text-lg font-semibold text-pink-400 mb-2">{selectedBrand.discount}</p>
            <div className="w-full border-b border-gray-700 my-3"></div>
            
            <a href={selectedBrand.url || '#'} target="_blank" rel="noopener noreferrer" className="mt-5 inline-block bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-bold py-2 px-6 rounded-full shadow-lg transition-all duration-200">
              Visit {selectedBrand.name} website
            </a>
          </div>
        )}
      </Modal>
    </section>
  );
};

export default TopBrands;