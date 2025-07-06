"use client"

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

// Category data based on available assets
const categories = [
  'All',
  'Fashion',
  'Tech',
  'Beauty',
  'Lifestyle',
  'Gaming',
  'Health',
  'Accessories',
];

// Enhanced products with real brand images and better categorization
const products = [
  {
    id: 1,
    name: 'Myntra Fashion Collection',
    category: 'Fashion',
    price: '₹999 - ₹4,999',
    originalPrice: '₹2,999 - ₹7,999',
    discount: '30% OFF',
    image: '/assets/images/myntra.png',
    brandLogo: '/assets/logos/myntra.png',
    color: ['bg-pink-200', 'bg-white', 'bg-gray-200'],
    size: 'large',
    featured: true,
    badge: 'Trending'
  },
  {
    id: 2,
    name: 'Apple MacBook Pro',
    category: 'Tech',
    price: '₹1,29,900',
    originalPrice: '₹1,49,900',
    discount: '13% OFF',
    image: '/assets/logos/apple.png',
    brandLogo: '/assets/logos/apple.png',
    color: ['bg-gray-800', 'bg-gray-600'],
    size: 'medium',
    badge: 'Student Special'
  },
  {
    id: 3,
    name: 'Swiss Beauty Makeup Kit',
    category: 'Beauty',
    price: '₹599',
    originalPrice: '₹899',
    discount: '33% OFF',
    image: '/assets/banners/swissbeauty.png',
    brandLogo: '/assets/images/swissbeauty.png',
    color: ['bg-pink-100', 'bg-rose-200'],
    size: 'small'
  },
  {
    id: 4,
    name: 'Dell Inspiron Laptop',
    category: 'Tech',
    price: '₹45,990',
    originalPrice: '₹65,990',
    discount: '30% OFF',
    image: '/assets/laptops/laptopbanner.png',
    brandLogo: '/assets/logos/dell.png',
    color: ['bg-blue-200', 'bg-gray-200'],
    size: 'large',
    featured: true,
    badge: 'Best Seller'
  },
  {
    id: 5,
    name: 'Nike Athletic Wear',
    category: 'Fashion',
    price: '₹2,499',
    originalPrice: '₹3,999',
    discount: '37% OFF',
    image: '/assets/images/nike1.jpg',
    brandLogo: '/assets/logos/nike.png',
    color: ['bg-orange-200', 'bg-black', 'bg-white'],
    size: 'medium',
    badge: 'Sports Special'
  },
  {
    id: 6,
    name: 'Soxytoes Premium Socks',
    category: 'Accessories',
    price: '₹299',
    originalPrice: '₹499',
    discount: '40% OFF',
    image: '/assets/banners/soxytoes.png',
    brandLogo: '/assets/logos/soxytoes.png',
    color: ['bg-red-200', 'bg-blue-200', 'bg-green-200'],
    size: 'small'
  },
  {
    id: 7,
    name: 'HP Pavilion Gaming Laptop',
    category: 'Gaming',
    price: '₹67,990',
    originalPrice: '₹89,990',
    discount: '24% OFF',
    image: '/assets/laptops/laptopbanner.png',
    brandLogo: '/assets/logos/hp.png',
    color: ['bg-green-200', 'bg-black'],
    size: 'medium',
    badge: 'Gaming Pro'
  },
  {
    id: 8,
    name: 'Lakme Cosmetics',
    category: 'Beauty',
    price: '₹449',
    originalPrice: '₹699',
    discount: '36% OFF',
    image: '/assets/images/lakme.png',
    brandLogo: '/assets/images/lakme.png',
    color: ['bg-purple-200', 'bg-pink-200'],
    size: 'small'
  },
  {
    id: 9,
    name: 'Microsoft Office Suite',
    category: 'Tech',
    price: '₹4,899',
    originalPrice: '₹8,999',
    discount: '46% OFF',
    image: '/assets/images/msoffice.jpg',
    brandLogo: '/assets/logos/microsoft.png',
    color: ['bg-blue-500', 'bg-orange-500'],
    size: 'small',
    badge: 'Student License'
  },
  {
    id: 10,
    name: 'Lenovo ThinkPad Series',
    category: 'Tech',
    price: '₹52,990',
    originalPrice: '₹74,990',
    discount: '29% OFF',
    image: '/assets/laptops/laptopbanner.png',
    brandLogo: '/assets/logos/lenovo.png',
    color: ['bg-red-200', 'bg-black'],
    size: 'medium',
    badge: 'Professional'
  }
];

// Enhanced promotional banners
const promotions = [
  {
    id: 'promo1',
    title: 'Fashion Week Sale',
    subtitle: 'Up to 50% off on fashion brands like Myntra & Nike.',
    color: 'bg-gradient-to-r from-purple-600/20 to-pink-600/20',
    textColor: 'text-purple-400',
    size: 'large',
    image: '/assets/images/myntra.png',
    category: 'Fashion'
  },
  {
    id: 'promo2',
    title: 'Laptop Mega Sale',
    subtitle: 'Premium laptops for students with extended warranty.',
    color: 'bg-gradient-to-r from-blue-600/20 to-cyan-600/20',
    textColor: 'text-blue-400',
    size: 'large',
    image: '/assets/laptops/laptopbanner.png',
    category: 'Tech'
  },
  {
    id: 'promo3',
    title: 'Beauty Essentials',
    subtitle: 'Premium cosmetics at student-friendly prices.',
    color: 'bg-gradient-to-r from-pink-600/20 to-rose-600/20',
    textColor: 'text-pink-400',
    size: 'medium',
    image: '/assets/images/lakme.png',
    category: 'Beauty'
  }
];

export default function ExploreProducts() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  // Handle scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Filter products based on selected category
  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(product => product.category === selectedCategory);

  // Enhanced banner images for different categories - Only banners, no logos
  const categoryBanners: { [key: string]: string[] } = {
    'Fashion': ['/assets/images/myntra.png', '/assets/images/nike1.jpg', '/assets/banners/Biba.png'],
    'Tech': ['/assets/laptops/laptopbanner.png', '/assets/images/msoffice.jpg', '/assets/images/realme.jpg'],
    'Beauty': ['/assets/banners/swissbeauty.png', '/assets/images/lakme.png', '/assets/images/MARScosmetics.png'],
    'Gaming': ['/assets/laptops/laptopbanner.png', '/assets/banners/glued.png', '/assets/images/gamepalacio.png'],
    'Accessories': ['/assets/banners/soxytoes.png', '/assets/banners/jewelry.png', '/assets/images/justlilthings.png'],
    'Health': ['/assets/banners/hkvitals.png', '/assets/banners/clove.png'],
    'Lifestyle': ['/assets/banners/Biba.png', '/assets/banners/jewelry.png', '/assets/images/kfc.png', '/assets/images/goibibo.png', '/assets/images/spicejet.jpg']
  };

  const getCurrentBanners = () => {
    if (selectedCategory === 'All') {
      return Object.values(categoryBanners).flat();
    }
    return categoryBanners[selectedCategory] || ['/assets/laptops/laptopbanner.png'];
  };

  const [bannerIndex, setBannerIndex] = useState(0);
  const [isManual, setIsManual] = useState(false);

  // Auto-rotate banner every 4 seconds
  useEffect(() => {
    const currentBanners = getCurrentBanners();
    const interval = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % currentBanners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [selectedCategory]);

  // Reset banner index when category changes
  useEffect(() => {
    setBannerIndex(0);
  }, [selectedCategory]);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-black py-20 px-4 md:px-8 lg:px-12 overflow-hidden"
    >
      <div className="container mx-auto max-w-7xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            EXPLORE<br />
            <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">
              PRODUCTS
            </span>
          </h2>
          <p className="text-gray-400 max-w-md">
            Discover our wide range of tech products with exclusive student discounts. From gaming laptops to accessories, we've got you covered.
          </p>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-10 flex flex-wrap items-center gap-2 md:gap-4"
        >
          {categories.map((category, index) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm transition-all ${selectedCategory === category
                ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Simple Banner Showcase */}
          <motion.div
            key={bannerIndex}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="col-span-1 md:col-span-2 lg:col-span-3 rounded-2xl overflow-hidden h-[300px] md:h-[350px] transition-all duration-1000 ease-in-out"
            style={{
              backgroundImage: `url(${getCurrentBanners()[bannerIndex]})`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundColor: '#111827'
            }}
          >
          </motion.div>

          {/* Enhanced Product Cards */}
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
              className={`group rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700/50 hover:border-orange-500/50 transition-all duration-300 ${product.size === 'large' ? 'col-span-1 md:col-span-2' : ''
                } ${product.size === 'medium' ? 'row-span-1' : ''}`}
            >
              <div className="p-5 h-full flex flex-col relative">
                {/* Badge */}
                {product.badge && (
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-3 py-1 bg-gradient-to-r from-orange-500 to-amber-600 rounded-full text-xs font-medium text-white">
                      {product.badge}
                    </span>
                  </div>
                )}

                {/* Brand Logo */}
                {product.brandLogo && (
                  <div className="absolute top-3 right-3 z-10">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <Image
                        src={product.brandLogo}
                        alt={`${product.category} brand`}
                        width={24}
                        height={24}
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-start mb-4 mt-8">
                  <div>
                    <span className="text-xs text-orange-400 font-medium uppercase tracking-wide">
                      {product.category}
                    </span>
                    <h3 className="text-white font-semibold text-lg leading-tight mt-1">
                      {product.name}
                    </h3>
                  </div>
                  <div className="flex space-x-1">
                    {product.color.map((color, idx) => (
                      <div key={idx} className={`w-3 h-3 rounded-full ${color} border border-gray-600`}></div>
                    ))}
                  </div>
                </div>

                {/* Product Image */}
                <div className="relative flex-grow flex items-center justify-center p-4 mb-4 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl">
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    className={`relative w-full ${product.size === 'large' ? 'h-48' : 'h-32'}`}
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      style={{ objectFit: "contain" }}
                      className="drop-shadow-lg group-hover:drop-shadow-2xl transition-all duration-300"
                    />
                  </motion.div>
                </div>

                {/* Price and Discount */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-lg">{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-gray-500 line-through text-sm">{product.originalPrice}</span>
                    )}
                    {product.discount && (
                      <span className="px-2 py-1 bg-green-500/20 border border-green-500/30 rounded text-green-400 text-xs font-medium">
                        {product.discount}
                      </span>
                    )}
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-gray-400 text-xs">(4.5)</span>
                    </div>

                    <Link href={`/product/${product.id}`}>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-amber-600 flex items-center justify-center hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-white">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Enhanced Secondary Promo Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.5, delay: 0.6 + (filteredProducts.length * 0.1) }}
            className="relative col-span-1 md:col-span-2 rounded-2xl overflow-hidden h-[280px] bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 border border-blue-500/30"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10" />

            <div className="absolute inset-0 flex items-center justify-between p-6 z-20">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex-1"
              >
                <div className="mb-3">
                  <span className="inline-block px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-400 text-sm font-medium">
                    Limited Time
                  </span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">Laptop Special</h3>
                <p className="text-blue-200 mb-4 max-w-sm">
                  Premium laptops with student discounts. Dell, HP, Lenovo - all brands available!
                </p>
                <div className="flex gap-3">
                  <Link href="/laptops">
                    <button className="px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white text-sm font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300">
                      Shop Laptops
                    </button>
                  </Link>
                  <button className="px-5 py-2 border border-blue-500/50 rounded-full text-blue-300 hover:border-blue-400 hover:text-blue-200 transition-all">
                    View All Deals
                  </button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.8 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="hidden md:block absolute right-0 top-0 w-64 h-full"
              >
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <Image
                    src="/assets/laptops/laptopbanner.png"
                    alt="Laptop Promotion"
                    fill
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                    className="drop-shadow-xl opacity-80"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent via-blue-900/30 to-blue-900/60" />
                </div>
              </motion.div>
            </div>

            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-4 right-4 w-20 h-20 bg-blue-500 rounded-full blur-xl animate-pulse" />
              <div className="absolute bottom-8 left-8 w-16 h-16 bg-purple-500 rounded-full blur-xl animate-pulse delay-1000" />
              <div className="absolute top-1/2 right-1/3 w-12 h-12 bg-pink-500 rounded-full blur-xl animate-pulse delay-2000" />
            </div>
          </motion.div>

          {/* View all button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, delay: 0.7 + (filteredProducts.length * 0.1) }}
            className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center mt-8"
          >
            <Link href="/products">
              <button className="group relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium text-orange-500 border border-orange-500 rounded-full hover:text-white">
                <span className="absolute inset-0 w-full h-0 transition-all duration-300 ease-out bg-gradient-to-r from-orange-500 to-amber-500 group-hover:h-full"></span>
                <span className="relative flex items-center">
                  View All Products
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}