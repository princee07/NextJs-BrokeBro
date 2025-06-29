"use client"

import { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const TopBrands = () => {
  // Define brand data
  const topBrands = [
    // Row 1
    [
      { id: 1, name: 'Amazon', logo: '/assets/logos/amazon.png', discount: '15% Off' },
      { id: 2, name: 'Apple', logo: '/assets/logos/apple.png', discount: '8% Off' },
      { id: 3, name: 'HP', logo: '/assets/logos/hp.png', discount: '22% Off' },
      { id: 4, name: 'Microsoft', logo: '/assets/logos/microsoft.png', discount: '10% Off' },
      { id: 5, name: 'Snapdeal', logo: '/assets/logos/snapdeal.png', discount: '18% Off' },
      { id: 6, name: 'Dell', logo: '/assets/logos/dell.png', discount: '25% Off' },
      { id: 7, name: 'Lenovo', logo: '/assets/logos/lenovo.png', discount: '20% Off' },
      { id: 8, name: 'Asus', logo: '/assets/logos/asus.png', discount: '17% Off' },
    ],
    // Row 2
    [
      { id: 9, name: 'Myntra', logo: '/assets/logos/myntra.png', discount: '30% Off' },
      { id: 10, name: 'Flipkart', logo: '/assets/logos/flipkart.png', discount: '12% Off' },
      { id: 11, name: 'Ajio', logo: '/assets/logos/ajio.png', discount: '35% Off' },
      { id: 12, name: 'Soxytoes', logo: '/assets/logos/soxytoes.png', discount: '10% Off' },
      { id: 13, name: 'nike', logo: '/assets/logos/nike.png', discount: '25% Off' },
      { id: 14, name: 'myntra', logo: '/assets/logos/myntra.png', discount: '40% Off' },
      { id: 15, name: 'autodesk', logo: '/assets/logos/autodesk.png', discount: '15% Off' },
      { id: 16, name: 'kfc', logo: '/assets/logos/kfc.png', discount: '22% Off' },
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
            <div className="absolute inset-y-0 left-0 w-20 z-10 bg-gradient-to-r from-black to-transparent"></div>
            <div className="absolute inset-y-0 right-0 w-20 z-10 bg-gradient-to-l from-black to-transparent"></div>
            
            <motion.div 
              className="flex space-x-6 py-2"
              animate={{ x: [0, -1920] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 50,
                  ease: "linear",
                }
              }}
            >
              {/* Double the items for seamless loop */}
              {[...topBrands[0], ...topBrands[0]].map((brand, index) => (
                <Link href={`/brands/${brand.name.toLowerCase()}`} key={index} className="relative group">
                  <motion.div
                    whileHover={{ 
                      y: -10,
                      boxShadow: "0 10px 30px -10px rgba(249, 115, 22, 0.4)"
                    }}
                    className="w-44 h-24 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden border border-gray-800 relative"
                  >
                    {/* Brand logo */}
                    <div className="relative w-32 h-20 flex items-center justify-center bg-white rounded-lg shadow border border-gray-200">
                      <Image
                        src={brand.logo}
                        alt={brand.name}
                        fill
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                    
                    {/* Brand name */}
                    <p className="text-white font-medium mt-2">{brand.name}</p>
                    
                    {/* Discount badge */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      className="absolute top-2 right-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full"
                    >
                      {brand.discount}
                    </motion.div>
                  </motion.div>
                </Link>
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
            <div className="absolute inset-y-0 left-0 w-20 z-10 bg-gradient-to-r from-black to-transparent"></div>
            <div className="absolute inset-y-0 right-0 w-20 z-10 bg-gradient-to-l from-black to-transparent"></div>
            
            <motion.div 
              className="flex space-x-6 py-2"
              animate={{ x: [-1920, 0] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 50,
                  ease: "linear",
                }
              }}
            >
              {/* Double the items for seamless loop */}
              {[...topBrands[1], ...topBrands[1]].map((brand, index) => (
                <Link href={`/brands/${brand.name.toLowerCase()}`} key={index} className="relative group">
                  <motion.div
                    whileHover={{ 
                      y: -10,
                      boxShadow: "0 10px 30px -10px rgba(249, 115, 22, 0.4)"
                    }}
                    className="w-44 h-24 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden border border-gray-800 relative"
                  >
                    {/* Brand logo */}
                    <div className="relative w-32 h-20 flex items-center justify-center bg-white rounded-lg shadow border border-gray-200">
                      <Image
                        src={brand.logo}
                        alt={brand.name}
                        fill
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                    
                    {/* Brand name */}
                    <p className="text-white font-medium mt-2">{brand.name}</p>
                    
                    {/* Discount badge */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      className="absolute top-2 right-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full"
                    >
                      {brand.discount}
                    </motion.div>
                  </motion.div>
                </Link>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* CTA button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 flex justify-center"
        >
          <Link href="/brands">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-medium rounded-full shadow-lg hover:shadow-orange-500/20 transition-all"
            >
              View All Brand Deals
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default TopBrands;