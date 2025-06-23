"use client"

import React, { useState, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  FaLaptopCode, FaUtensils, FaTshirt, FaPlane, 
  FaFilm, FaBookOpen, FaGamepad, FaHeadphones,
  FaApple, FaMicrosoft, FaAdobe, FaSpotify,
  FaUber, FaShoppingBag, FaFilm as FaNetflix
} from 'react-icons/fa';

// Replace SI icons with FA icons since SI might have issues
import Link from 'next/link';

const DiscountCategories = () => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: false });
  const controls = useAnimation();
  
  React.useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [inView, controls]);

  // Map of brand icons using FA icons instead of SI icons
  const brandIcons = {
    apple: FaApple,
    microsoft: FaMicrosoft,
    adobe: FaAdobe,
    spotify: FaSpotify,
    netflix: FaNetflix,
    uber: FaUber,
    shopping: FaShoppingBag,  // replacement for Nike/Airbnb
    food: FaUtensils,         // replacement for Zomato
  };

  // Categories data with vibrant styling
  const categories = [
    {
      id: 'tech',
      name: 'Tech & Electronics',
      icon: FaLaptopCode,
      description: 'Laptops, phones, gadgets & more',
      discount: 'Up to 30% OFF',
      gradient: 'from-blue-600 to-cyan-400',
      accentColor: 'rgba(59, 130, 246, 0.7)',
      bgPattern: 'circuit',
      brands: ['apple', 'microsoft'],
      slug: 'tech-electronics',
      popularDeals: 721,
      animationDirection: 'right'
    },
    {
      id: 'software',
      name: 'Software & Apps',
      icon: FaGamepad,
      description: 'Premium software & subscriptions',
      discount: 'Up to 60% OFF',
      gradient: 'from-purple-600 to-indigo-600',
      accentColor: 'rgba(124, 58, 237, 0.7)',
      bgPattern: 'dots',
      brands: ['adobe', 'spotify'],
      slug: 'software-apps',
      popularDeals: 503,
      animationDirection: 'left'
    },
    {
      id: 'food',
      name: 'Food & Beverages',
      icon: FaUtensils,
      description: 'Restaurants, cafes & food delivery',
      discount: 'Up to 25% OFF',
      gradient: 'from-red-600 to-yellow-500',
      accentColor: 'rgba(239, 68, 68, 0.7)',
      bgPattern: 'zigzag',
      brands: ['food', 'uber'],
      slug: 'food-beverages',
      popularDeals: 847,
      animationDirection: 'right'
    },
    {
      id: 'fashion',
      name: 'Fashion & Clothing',
      icon: FaTshirt,
      description: 'Apparel, shoes & accessories',
      discount: 'Up to 40% OFF',
      gradient: 'from-pink-600 to-rose-400',
      accentColor: 'rgba(236, 72, 153, 0.7)',
      bgPattern: 'triangles',
      brands: ['shopping', 'shopping'],
      slug: 'fashion-clothing',
      popularDeals: 635,
      animationDirection: 'left'
    },
    {
      id: 'entertainment',
      name: 'Entertainment',
      icon: FaFilm,
      description: 'Streaming, movies & events',
      discount: 'Up to 50% OFF',
      gradient: 'from-amber-500 to-orange-600',
      accentColor: 'rgba(245, 158, 11, 0.7)',
      bgPattern: 'waves',
      brands: ['netflix', 'spotify'],
      slug: 'entertainment',
      popularDeals: 389,
      animationDirection: 'right'
    },
    {
      id: 'travel',
      name: 'Travel & Transport',
      icon: FaPlane,
      description: 'Flights, stays & commute',
      discount: 'Up to 35% OFF',
      gradient: 'from-cyan-500 to-teal-400',
      accentColor: 'rgba(20, 184, 166, 0.7)',
      bgPattern: 'cloud',
      brands: ['uber', 'shopping'],
      slug: 'travel-transport',
      popularDeals: 412,
      animationDirection: 'left'
    },
    {
      id: 'books',
      name: 'Books & Education',
      icon: FaBookOpen,
      description: 'Textbooks, courses & learning',
      discount: 'Up to 70% OFF',
      gradient: 'from-emerald-600 to-green-500',
      accentColor: 'rgba(16, 185, 129, 0.7)',
      bgPattern: 'grid',
      brands: ['microsoft', 'adobe'],
      slug: 'books-education',
      popularDeals: 593,
      animationDirection: 'right'
    },
    {
      id: 'music',
      name: 'Music & Audio',
      icon: FaHeadphones,
      description: 'Headphones, speakers & subscriptions',
      discount: 'Up to 35% OFF',
      gradient: 'from-violet-600 to-fuchsia-500',
      accentColor: 'rgba(139, 92, 246, 0.7)',
      bgPattern: 'soundwave',
      brands: ['spotify', 'apple'],
      slug: 'music-audio',
      popularDeals: 278,
      animationDirection: 'left'
    },
  ];

  // State for hover effects
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  // Pattern generator functions for dynamic backgrounds
  const getPatternStyle = (pattern: string) => {
    switch (pattern) {
      case 'circuit':
        return {
          backgroundImage: `radial-gradient(circle at 10px 10px, rgba(255,255,255,0.12) 2px, transparent 0)`,
          backgroundSize: '20px 20px'
        };
      case 'dots':
        return {
          backgroundImage: `radial-gradient(rgba(255,255,255,0.12) 1.5px, transparent 1.5px)`,
          backgroundSize: '12px 12px'
        };
      case 'zigzag':
        return {
          backgroundImage: `linear-gradient(135deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 75%, transparent 75%)`,
          backgroundSize: '20px 20px'
        };
      case 'triangles':
        return {
          backgroundImage: `linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%), 
                            linear-gradient(-45deg, rgba(255,255,255,0.1) 25%, transparent 25%)`,
          backgroundSize: '20px 20px'
        };
      case 'waves':
        return {
          backgroundImage: `linear-gradient(to right, transparent, transparent 5px, rgba(255,255,255,0.1) 5px, rgba(255,255,255,0.1) 10px)`,
          backgroundSize: '15px 100%'
        };
      case 'cloud':
        return {
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 40%)`,
          backgroundSize: '40px 40px'
        };
      case 'grid':
        return {
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), 
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        };
      case 'soundwave':
        return {
          backgroundImage: `linear-gradient(90deg, transparent 0%, transparent 40%, rgba(255,255,255,0.12) 40%, rgba(255,255,255,0.12) 60%, transparent 60%)`,
          backgroundSize: '12px 100%'
        };
      default:
        return {};
    }
  };

  // Function to render brand icon safely
  const renderBrandIcon = (brandKey: string) => {
    const IconComponent = brandIcons[brandKey as keyof typeof brandIcons];
    
    if (IconComponent) {
      return <IconComponent size={16} />;
    }
    
    // Fallback icon if brand not found
    return <FaShoppingBag size={16} />;
  };

  return (
    <section 
      className="relative py-20 bg-black overflow-hidden"
      ref={ref}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>
      <div className="absolute inset-0">
        <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent"></div>
        <div className="absolute bottom-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent"></div>

        {/* Animated floating particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-orange-500/20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header with animated elements */}
        <motion.div
          className="mb-16 text-center"
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: -20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6 }
            }
          }}
        >
          <motion.span 
            className="text-orange-500 uppercase tracking-wider font-bold"
            animate={{
              y: [0, -5, 0],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Explore & Save
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-extrabold mt-2 mb-4">
            <span className="bg-gradient-to-r from-orange-400 to-pink-600 bg-clip-text text-transparent">
              Student Discount Categories
            </span>
          </h2>
          
          <motion.div 
            className="relative w-28 h-2 bg-gradient-to-r from-orange-500 to-pink-600 mx-auto rounded-full my-6"
            animate={{
              width: ["30%", "100%", "60%", "100%"],
            }}
            transition={{
              duration: 4,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "mirror"
            }}
          >
            <motion.div 
              className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full"
              animate={{
                left: ["0%", "100%", "0%"],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut"
              }}
            />
          </motion.div>
          
          <p className="text-gray-300 max-w-3xl mx-auto text-lg">
            Click on any category to unlock exclusive student discounts and save big on your favorite brands. 
            Our deals are updated daily!
          </p>
        </motion.div>

        {/* Categories Grid with Staggered Animation */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          initial="hidden"
          animate={controls}
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              className="group"
              variants={{
                hidden: { 
                  opacity: 0,
                  y: 50,
                  x: category.animationDirection === 'left' ? -20 : 20
                },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  x: 0,
                  transition: { 
                    type: "spring",
                    bounce: 0.4,
                    duration: 0.8
                  }
                }
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Link href={`/categories/${category.slug}`}>
                <motion.div 
                  className="relative h-80 rounded-2xl overflow-hidden cursor-pointer"
                  whileHover={{ 
                    y: -10,
                    transition: { duration: 0.3 } 
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Card Background Elements */}
                  <div 
                    className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-90`} 
                  />
                  
                  {/* Pattern overlay */}
                  <motion.div 
                    className="absolute inset-0 mix-blend-soft-light"
                    style={getPatternStyle(category.bgPattern)}
                    animate={{
                      backgroundPosition: ['0% 0%', '100% 100%'],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      repeatType: "mirror",
                      ease: "linear"
                    }}
                  />
                  
                  {/* Animated highlight effect */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-30 bg-white"
                    animate={
                      hoveredIndex === index 
                        ? {
                            opacity: [0, 0.2, 0],
                            transition: { duration: 1.5, repeat: Infinity }
                          } 
                        : {}
                    }
                  />
                  
                  {/* Discount badge */}
                  <motion.div 
                    className="absolute top-4 left-0 bg-black/80 text-white font-bold py-2 px-4 rounded-r-full backdrop-blur-sm"
                    initial={{ x: -100 }}
                    animate={{ x: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 100,
                      damping: 15,
                      delay: 0.2 + (index * 0.1)
                    }}
                    whileHover={{
                      scale: 1.05,
                      x: 3
                    }}
                  >
                    <span className="flex items-center">
                      {category.discount}
                      <motion.span
                        animate={{
                          rotate: [0, 10, 0, -10, 0],
                          scale: [1, 1.2, 1, 1.2, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 1
                        }}
                        className="ml-2"
                      >
                        🔥
                      </motion.span>
                    </span>
                  </motion.div>
                  
                  {/* Content container */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                    <div>
                      <div className="mb-4">
                        <motion.div 
                          className={`w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white text-3xl shadow-xl border border-white/20`}
                          whileHover={{
                            scale: 1.1,
                            rotate: [0, 5, 0, -5, 0],
                            transition: { duration: 0.5 }
                          }}
                        >
                          {React.createElement(category.icon)}
                        </motion.div>
                      </div>
                      
                      <motion.h3 
                        className="text-2xl font-bold text-white mb-2"
                        animate={
                          hoveredIndex === index 
                            ? { scale: 1.05, transition: { duration: 0.2 } } 
                            : { scale: 1 }
                        }
                      >
                        {category.name}
                      </motion.h3>
                      
                      <p className="text-white/80">{category.description}</p>
                    </div>
                    
                    <div>
                      {/* Popular brands for this category - FIXED */}
                      <div className="flex space-x-3 mb-3">
                        {category.brands.map((brandKey, i) => (
                          <motion.div 
                            key={i} 
                            className="w-8 h-8 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center text-white/90"
                            whileHover={{ scale: 1.2, rotate: 5 }}
                          >
                            {renderBrandIcon(brandKey)}
                          </motion.div>
                        ))}
                        <motion.div 
                          className="w-8 h-8 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center text-white/90"
                          whileHover={{ scale: 1.2 }}
                        >
                          <span className="text-xs font-bold">+{Math.floor(category.popularDeals / 100)}</span>
                        </motion.div>
                      </div>
                      
                      {/* Popular deals count with pulsing animation */}
                      <div className="flex items-center text-white/80 text-sm">
                        <motion.div
                          className="w-2 h-2 rounded-full bg-green-400 mr-2"
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.7, 1, 0.7]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <span>{category.popularDeals} active deals</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Hover button */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent py-4 flex justify-center opacity-0 translate-y-10 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.button 
                      className="rounded-full bg-white text-gray-900 font-bold py-2 px-6 flex items-center"
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 0 20px 5px rgba(255,255,255,0.3)"
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Explore Deals
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 ml-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </motion.button>
                  </motion.div>
                  
                  {/* Animated particles on hover */}
                  {hoveredIndex === index && (
                    <>
                      {[...Array(10)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 bg-white rounded-full"
                          initial={{
                            x: '50%',
                            y: '100%',
                          }}
                          animate={{
                            x: `${50 + (Math.random() * 100 - 50)}%`,
                            y: `${100 + (Math.random() * -120)}%`,
                            opacity: [1, 0],
                          }}
                          transition={{
                            duration: 1 + Math.random(),
                            repeat: Infinity,
                            delay: Math.random() * 0.5,
                          }}
                        />
                      ))}
                    </>
                  )}
                </motion.div>
              </Link>
              
              {/* Category name below (mobile friendly) */}
              <motion.div 
                className="mt-4 text-center md:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + (index * 0.1) }}
              >
                <h3 className="font-bold text-white text-lg">{category.name}</h3>
                <p className="text-gray-400 text-sm">{category.discount}</p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* View all categories button */}
        <motion.div 
          className="mt-12 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            visible: {
              opacity: 1,
              y: 0,
              transition: { delay: 0.8, duration: 0.6 }
            }
          }}
        >
          <Link href="/categories">
            <motion.button 
              className="group relative overflow-hidden rounded-full bg-gradient-to-r from-orange-500 to-pink-600 text-white px-8 py-4 font-bold text-lg shadow-lg hover:shadow-orange-500/30"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Button shine effect */}
              <motion.div 
                className="absolute inset-0 bg-white/20"
                initial={{ x: '-100%', skewX: -15 }}
                animate={{ x: '100%', skewX: -15 }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 1.5,
                  repeatDelay: 1
                }}
              />
              
              <span className="relative flex items-center">
                View All Categories
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default DiscountCategories;