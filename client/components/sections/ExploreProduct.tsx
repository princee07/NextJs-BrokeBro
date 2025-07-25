"use client"

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import VerificationProtectedLink from '@/components/ui/VerificationProtectedLink';
import VerificationGate from '@/components/ui/VerificationGate';
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useRouter } from "next/navigation";
import { useUserVerification } from '@/hooks/useUserVerification';
import Modal from '../ui/Modal';
import { getDailyCouponCode } from '@/utils/couponCode';

// Category data based on available assets
const categories = [
  'All',
  'Fashion',
  'Tech',
  'Beauty',
  'Lifestyle',
  'Gaming',
  'Health',
  'Gym',
];

// Enhanced products with real brand images and better categorization
const products = [
  {
    id: 1,
    name: 'Giva Fashion Collection',
    category: 'Fashion',
    price: '₹999 - ₹4,999',
    originalPrice: '₹2,999 - ₹7,999',
    discount: '30% OFF',
    image: '/assets/jiva/get Disocunt.png',
    brandLogo: '/assets/logos/jiva.png',
    color: ['bg-pink-200', 'bg-white', 'bg-gray-200'],
    size: 'large',
    featured: true,
    badge: 'Trending',
    code: 'GIVA30',
  },
  {
    id: 2,
    name: 'Apple MacBook Pro',
    category: 'Tech',
    price: '₹1,29,900',
    originalPrice: '₹1,49,900',
    discount: '13% OFF',
    image: '/assets/exploreproduct/id2.png',
    brandLogo: '/assets/exploreproduct/id2.png',
    color: ['bg-gray-800', 'bg-gray-600'],
    size: 'medium',
    badge: 'Student Special',
    code: 'APPLE10',
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
    size: 'small',
    code: 'SWISSBEAUTY20',
  },
  {
    id: 4,
    name: 'Glued supercharged',
    category: 'Gaming',
    price: '₹45,990',
    originalPrice: '₹65,990',
    discount: '30% OFF',
    image: '/assets/exploreproduct/glued.png',
    brandLogo: '/assets/exploreproduct/glued.png',
    color: ['bg-blue-200', 'bg-gray-200'],
    size: 'large',
    featured: true,
    badge: 'Best Seller',
    code: 'Brokebro20',
  },
  {
    id: 5,
    name: 'Nike Athletic Wear',
    category: 'Fashion',
    price: '₹2,499',
    originalPrice: '₹3,999',
    discount: '37% OFF',
    image: '/assets/exploreproduct/nike.png', // updated to use new nike product image
    brandLogo: '/assets/logos/nike.png',
    color: ['bg-orange-200', 'bg-black', 'bg-white'],
    size: 'medium',
    badge: 'Sports Special',
    code: 'NIKE20',
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
    size: 'small',
    code: 'SOXYTOES15',
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
    badge: 'Gaming Pro',
    code: 'HPGAMING20',
  },
  {
    id: 8,
    name: 'Lakme Cosmetics',
    category: 'Beauty',
    price: '₹449',
    originalPrice: '₹699',
    discount: '36% OFF',
    image: '/assets/exploreproduct/lakme.png',
    brandLogo: '/assets/images/lakme.png',
    color: ['bg-purple-200', 'bg-pink-200'],
    size: 'small',
    code: 'LAKME20',
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
    badge: 'Student License',
    code: 'MSOFFICE20',
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
    badge: 'Professional',
    code: 'LENOVO15',
  },
  {
    id: 11,
    name: 'Levis Denim Collection',
    category: 'Fashion',
    price: '₹1,799 - ₹5,999',
    originalPrice: '₹2,499 - ₹7,999',
    discount: '28% OFF',
    image: '/assets/exploreproduct/levis.png',
    brandLogo: '/assets/levis/300x300.png',
    color: ['bg-blue-200', 'bg-white', 'bg-indigo-200'],
    size: 'medium',
    badge: 'Classic Denim',
    code: 'LEVIS20',
  },
  {
    id: 12,
    name: 'Fastrack Watches',
    category: 'Fashion',
    price: '₹999 - ₹3,499',
    originalPrice: '₹1,499 - ₹4,999',
    discount: '30% OFF',
    image: '/assets/exploreproduct/fastrack.png',
    brandLogo: '/assets/fastrack/logo.png',
    color: ['bg-gray-900', 'bg-yellow-200', 'bg-white'],
    size: 'small',
    badge: 'Trendy Picks',
    code: 'FASTRACK20',
  }
];

// Enhanced promotional banners
const promotions = [
  {
    id: 'promo1',
    title: 'Fashion Week Sale',
    subtitle: 'Up to 50% off on fashion brands like Jiva & Nike.',
    color: 'bg-gradient-to-r from-purple-600/20 to-pink-600/20',
    textColor: 'text-purple-400',
    size: 'large',
    image: '/assets/jiva/id1.png', // updated to use jivaposter for banner
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
  const sectionRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated, isLoading } = useKindeBrowserClient();
  const { isVerified, refetch: refetchVerification, loading: verificationLoading } = useUserVerification();
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const router = useRouter();
  const [showSignupModal, setShowSignupModal] = useState(false);
  // Glued coupon code expiration state
  const today = new Date().toISOString().slice(0, 10);
  const expiredKey = `glued_coupon_expired_${today}`;
  const [gluedExpired, setGluedExpired] = useState(false);
  // Rating state for coupon modal
  const [rating, setRating] = useState<null | 'up' | 'down'>(null);
  useEffect(() => {
    setGluedExpired(localStorage.getItem(expiredKey) === 'true');
  }, [expiredKey, showCouponModal]);
  // Reset rating when modal opens
  useEffect(() => {
    if (showCouponModal) setRating(null);
  }, [showCouponModal]);

  // Handler for card click
  const handleCardClick = async (product: any) => {
    if (isLoading || verificationLoading) return;
    // Always refetch verification status before checking
    await refetchVerification();
    if (!isAuthenticated) {
      router.push('/signup');
      return;
    }
    if (!isVerified) {
      router.push('/student-verification');
      return;
    }
    setSelectedProduct(product);
    setShowCouponModal(true);
  };

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

    // Listen for scroll-to-explore-products event
    const handleScrollToExplore = () => {
      sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    window.addEventListener('scroll-to-explore-products', handleScrollToExplore);

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      window.removeEventListener('scroll-to-explore-products', handleScrollToExplore);
    };
  }, []);

  // Filter products based on selected category
  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(product => product.category === selectedCategory);

  // Banner images prioritizing /assets/banners/ folder for better rotation
  const categoryBanners: { [key: string]: Array<{ image: string, url?: string, brand?: string }> } = {
    'All': [
      { image: '/assets/banners/jiva.png', brand: 'Jiva Fashion' },
      { image: '/assets/jiva/jivaposter.png', brand: 'Jiva Fashion' },
      { image: '/assets/jiva/jiva.png', brand: 'Jiva Fashion' },
      { image: '/assets/banners/nike.png', brand: 'Nike' },
      { image: '/assets/banners/nike2.png', brand: 'Nike' },
      { image: '/assets/banners/samsung.png', brand: 'Samsung Tech' }, // updated Samsung banner
      // Primary banner images from banners folder
      { image: '/assets/banners/Biba.png', url: 'https://track.vcommission.com/click?campaign_id=12553&pub_id=120422', brand: 'Biba Fashion' },
      { image: '/assets/banners/samsung.jpg', url: 'https://track.vcommission.com/click?campaign_id=10211&pub_id=120422', brand: 'Samsung Tech' },
      { image: '/assets/banners/swissbeauty.png', url: 'https://track.vcommission.com/click?campaign_id=12372&pub_id=120422', brand: 'Swiss Beauty' },
      { image: '/assets/banners/moglix.jpg', url: 'https://track.vcommission.com/click?campaign_id=10351&pub_id=120422', brand: 'Moglix Tools' },
      { image: '/assets/banners/clove.png', url: 'https://track.vcommission.com/click?campaign_id=12131&pub_id=120422', brand: 'Clove Health' },
      { image: '/assets/banners/soxytoes.png', brand: 'Soxytoes' },
      { image: '/assets/banners/jewelry.png', brand: 'Jewelry Collection' },
      { image: '/assets/banners/glued.png', brand: 'Glued Gaming' },
      { image: '/assets/banners/hkvitals.png', brand: 'HK Vitals' }
    ],
    'Fashion': [
      { image: '/assets/banners/jiva.png', brand: 'Jiva Fashion' },
      { image: '/assets/jiva/jivaposter.png', brand: 'Jiva Fashion' },
      { image: '/assets/jiva/jiva.png', brand: 'Jiva Fashion' },
      { image: '/assets/banners/nike.png', brand: 'Nike' },
      { image: '/assets/banners/nike2.png', brand: 'Nike' },
      { image: '/assets/banners/Biba.png', url: 'https://track.vcommission.com/click?campaign_id=12553&pub_id=120422', brand: 'Biba' },
      { image: '/assets/banners/soxytoes.png', brand: 'Soxytoes' },
      { image: '/assets/banners/jewelry.png', brand: 'Jewelry' },
      { image: '/assets/biba/336x280.jpg', url: 'https://track.vcommission.com/click?campaign_id=12553&pub_id=120422', brand: 'Biba Collection' },
      { image: '/assets/banners/fastrack.png', url: 'https://track.vcommission.com/click?campaign_id=11501&pub_id=120422', brand: 'Levis' }
    ],
    'Tech': [
      { image: '/assets/banners/samsung.png', brand: 'Samsung' }, // updated Samsung banner
      { image: '/assets/banners/moglix.jpg', url: 'https://track.vcommission.com/click?campaign_id=10351&pub_id=120422', brand: 'Moglix' },
      { image: '/assets/laptops/laptopbanner.png', brand: 'Laptops' },
      { image: '/assets/samsung/24318_KV_Ultra_Banner_336x280.jpg', url: 'https://track.vcommission.com/click?campaign_id=10211&pub_id=120422', brand: 'Samsung Galaxy' },
      { image: '/assets/moglix/336x280.jpg', url: 'https://track.vcommission.com/click?campaign_id=10351&pub_id=120422', brand: 'Moglix Tools' }
    ],
    'Beauty': [
      { image: '/assets/banners/swissbeauty.png', url: 'https://track.vcommission.com/click?campaign_id=12372&pub_id=120422', brand: 'Swiss Beauty' },
      { image: '/assets/lakme/image.png', brand: 'Lakme' },
      { image: '/assets/lakme/image2.png', brand: 'Lakme Collection' },
      { image: '/assets/images/MARScosmetics.png', brand: 'MARS Cosmetics' }
    ],
    'Gaming': [
      { image: '/assets/banners/glued.png', brand: 'Glued Gaming' },
      { image: '/assets/banners/samsung.jpg', url: 'https://track.vcommission.com/click?campaign_id=10211&pub_id=120422', brand: 'Samsung Gaming' },
      { image: '/assets/laptops/laptopbanner.png', brand: 'Gaming Laptops' },
      { image: '/assets/samsung/24318_KV_Ultra_Banner_300x250.jpg', url: 'https://track.vcommission.com/click?campaign_id=10211&pub_id=120422', brand: 'Samsung Gaming Devices' }
    ],
    'Accessories': [
      { image: '/assets/banners/soxytoes.png', brand: 'Soxytoes' },
      { image: '/assets/banners/jewelry.png', brand: 'Jewelry' },
      { image: '/assets/salty/image.png', url: 'https://track.vcommission.com/click?campaign_id=11241&pub_id=120422', brand: 'Salty' },
      { image: '/assets/banners/fastrack.png', brand: 'Fastrack' }
    ],
    'Health': [
      { image: '/assets/banners/hkvitals.png', brand: 'HK Vitals' },
      { image: '/assets/banners/clove.png', url: 'https://track.vcommission.com/click?campaign_id=12131&pub_id=120422', brand: 'Clove' },
      { image: '/assets/clove/336x280d.jpg', url: 'https://track.vcommission.com/click?campaign_id=12131&pub_id=120422', brand: 'Clove Healthcare' },
      { image: '/assets/clove/300x300-t.jpg', url: 'https://track.vcommission.com/click?campaign_id=12131&pub_id=120422', brand: 'Clove Premium' }
    ],
    'Lifestyle': [
      { image: '/assets/banners/Biba.png', url: 'https://track.vcommission.com/click?campaign_id=12553&pub_id=120422', brand: 'Biba Lifestyle' },
      { image: '/assets/banners/jewelry.png', brand: 'Jewelry Lifestyle' },
      { image: '/assets/banners/soxytoes.png', brand: 'Soxytoes Lifestyle' },
      { image: '/assets/banners/levis.png', url: 'https://track.vcommission.com/click?campaign_id=11501&pub_id=120422', brand: 'Levis' },
      { image: '/assets/salty/image.png', url: 'https://track.vcommission.com/click?campaign_id=11241&pub_id=120422', brand: 'Salty Lifestyle' }
    ]
  };

  const getCurrentBanners = () => {
    if (selectedCategory === 'All') {
      return Object.values(categoryBanners).flat();
    }
    return categoryBanners[selectedCategory] || [{ image: '/assets/laptops/laptopbanner.png' }];
  };

  const [bannerIndex, setBannerIndex] = useState(0);
  const [isManual, setIsManual] = useState(false);

  // Auto-rotate banner every 3 seconds with proper cleanup
  useEffect(() => {
    const currentBanners = getCurrentBanners();
    if (currentBanners.length <= 1) return; // Don't rotate if only one banner

    const interval = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % currentBanners.length);
    }, 3000); // Reduced to 3 seconds for better visibility of rotation

    return () => clearInterval(interval);
  }, [selectedCategory, getCurrentBanners().length]);
  // Reset banner index when category changes
  useEffect(() => {
    setBannerIndex(0);
    setIsManual(false);
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
          {/* Enhanced Banner Showcase - Full Coverage */}
          <motion.div
            key={bannerIndex}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="col-span-1 md:col-span-2 lg:col-span-3 rounded-2xl overflow-hidden h-[160px] md:h-[200px] lg:h-[260px] transition-all duration-1000 ease-in-out relative group"
          >
            {getCurrentBanners()[bannerIndex]?.url ? (
              // Clickable banner with affiliate link - Protected by verification
              <VerificationProtectedLink
                href={getCurrentBanners()[bannerIndex].url}
                className="block w-full h-full"
                requireVerification={true}
              >
                <div className="w-full h-full cursor-pointer hover:scale-105 transition-transform duration-300 relative">
                  <Image
                    src={getCurrentBanners()[bannerIndex].image}
                    alt={getCurrentBanners()[bannerIndex].brand || 'Product Banner'}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw"
                    priority
                  />
                  {/* Gradient overlay for better readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                  {/* Brand info overlay */}
                  <div className="absolute bottom-6 left-6 z-10">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <h3 className="text-white font-bold text-xl mb-1">
                        {getCurrentBanners()[bannerIndex].brand || 'Premium Brand'}
                      </h3>
                      <p className="text-white/80 text-sm">Exclusive deals for students</p>
                    </div>
                  </div>

                  {/* Hover overlay for clickable banners */}
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-white/90 px-6 py-3 rounded-full text-black font-medium text-lg backdrop-blur-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      🛒 Shop {getCurrentBanners()[bannerIndex].brand || 'Now'}
                    </div>
                  </div>

                  {/* Click indicator */}
                  <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium opacity-90">
                    Verify & Shop
                  </div>
                </div>
              </VerificationProtectedLink>
            ) : (
              // Non-clickable banner
              <div className="w-full h-full relative">
                <Image
                  src={getCurrentBanners()[bannerIndex].image}
                  alt={getCurrentBanners()[bannerIndex].brand || 'Product Banner'}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw"
                  priority
                />
                {/* Gradient overlay for better readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                {/* Brand info overlay */}
                <div className="absolute bottom-6 left-6 z-10">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <h3 className="text-white font-bold text-xl mb-1">
                      {getCurrentBanners()[bannerIndex].brand || 'Premium Brand'}
                    </h3>
                    <p className="text-white/80 text-sm">Quality products for students</p>
                  </div>
                </div>
              </div>
            )}            {/* Banner navigation dots - Show current position */}
            <div className="absolute bottom-4 right-6 flex gap-2">
              {getCurrentBanners().slice(0, Math.min(getCurrentBanners().length, 8)).map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setBannerIndex(index);
                    setIsManual(true);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${index === bannerIndex % getCurrentBanners().length
                    ? 'bg-orange-500 w-6'
                    : 'bg-white/50 hover:bg-white/70'
                    }`}
                />
              ))}
              {getCurrentBanners().length > 8 && (
                <div className="text-white/60 text-xs ml-2 flex items-center">
                  +{getCurrentBanners().length - 8}
                </div>
              )}
            </div>
          </motion.div>

          {/* Enhanced Product Cards with Better Layout */}
          {filteredProducts.map((product, index) => (
            <VerificationGate key={product.id}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
                className={`group rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700/50 hover:border-orange-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/10 ${product.size === 'large' ? 'col-span-1 md:col-span-2 h-[400px]' : product.id === 2 ? 'h-[420px]' : 'h-[350px]'} ${product.size === 'medium' ? 'row-span-1' : ''}`}
                onClick={() => handleCardClick(product)}
                style={{ cursor: 'pointer' }}
              >
                <div className="p-6 h-full flex flex-col relative">
                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-3 py-1 bg-gradient-to-r from-orange-500 to-amber-600 rounded-full text-xs font-medium text-white shadow-lg">
                        {product.badge}
                      </span>
                    </div>
                  )}

                  {/* Brand Logo */}
                  {product.brandLogo && (
                    <div className="absolute top-4 right-4 z-10">
                      <div className={`bg-white rounded-full flex items-center justify-center shadow-lg ${[5, 8, 11].includes(product.id) ? 'w-20 h-20 p-2' : 'w-12 h-12'}`}>
                        <Image
                          src={product.brandLogo}
                          alt={`${product.category} brand`}
                          width={[5, 8, 11].includes(product.id) ? 60 : 28}
                          height={[5, 8, 11].includes(product.id) ? 60 : 28}
                          style={{ objectFit: 'contain' }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between items-start mb-6 mt-12">
                    <div className="flex-1">
                      <span className="text-xs text-orange-400 font-medium uppercase tracking-wide">
                        {product.category}
                      </span>
                      <h3 className="text-white font-bold text-xl leading-tight mt-2">
                        {product.name}
                      </h3>
                    </div>
                    <div className="flex space-x-1 ml-4">
                      {product.color.map((color, idx) => (
                        <div key={idx} className={`w-4 h-4 rounded-full ${color} border-2 border-gray-600 shadow-sm`}></div>
                      ))}
                    </div>
                  </div>

                  {/* Product Image - Enhanced (Less Zoom for 5,8,11,12) */}
                  <div className={`relative flex-grow flex items-center justify-center mb-6 rounded-xl p-0 transition-all duration-300 w-full overflow-hidden ${product.id === 5 ? 'h-[480px] md:h-[520px] lg:h-[560px]' : product.id === 8 ? 'h-[400px] md:h-[440px] lg:h-[480px]' : [2, 11].includes(product.id) ? 'h-[320px] md:h-[350px] lg:h-[380px]' : 'h-full'}`}>
                    <motion.div
                      whileHover={{ scale: 1.08, rotate: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 10 }}
                      className="absolute inset-0 w-full h-full z-0"
                    >
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        style={{ objectFit: 'cover', background: 'white' }}
                        className={`rounded-xl ${[5, 8, 11, 12].includes(product.id) ? 'scale-100' : 'scale-110'}`}
                      />
                    </motion.div>
                  </div>

                  {/* Price and Discount - Enhanced */}
                  {/* Removed price, originalPrice, and discount display for all product cards as requested */}

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-gray-400 text-sm font-medium">(4.5)</span>
                    </div>

                    <button
                      onClick={() => handleCardClick(product)}
                      className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-amber-600 flex items-center justify-center hover:shadow-xl hover:shadow-orange-500/30 transition-all duration-300"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            </VerificationGate>
          ))}

          {/* Enhanced Secondary Promo Card with Full Coverage */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.5, delay: 0.6 + (filteredProducts.length * 0.1) }}
            className="relative col-span-1 md:col-span-2 rounded-2xl overflow-hidden h-[320px] bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 border border-blue-500/30 group"
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src="/assets/laptops/laptopbanner.png"
                alt="Laptop Promotion"
                fill
                className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />
            </div>

            <div className="absolute inset-0 flex items-center justify-between p-8 z-20">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex-1 max-w-md"
              >
                <div className="mb-4">
                  <span className="inline-flex items-center px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-400 text-sm font-medium backdrop-blur-sm">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></span>
                    Limited Time Offer
                  </span>
                </div>
                <h3 className="text-4xl font-bold text-white mb-3">Student Laptop Sale</h3>
                <p className="text-blue-100 mb-6 text-lg leading-relaxed">
                  Premium laptops with exclusive student discounts. Dell, HP, Lenovo & more brands available with extended warranty!
                </p>
                <div className="flex gap-4">
                  <VerificationProtectedLink
                    href="/laptops"
                    requireVerification={true}
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-medium hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300"
                    >
                      Shop Now
                    </motion.button>
                  </VerificationProtectedLink>
                  <VerificationProtectedLink
                    href="/special-deals"
                    requireVerification={true}
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 border border-blue-500/50 rounded-full text-blue-300 hover:border-blue-400 hover:text-blue-200 hover:bg-blue-500/10 transition-all duration-300"
                    >
                      View All Deals
                    </motion.button>
                  </VerificationProtectedLink>
                </div>
              </motion.div>

              {/* Floating elements */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.8 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="hidden md:block absolute right-8 top-8"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                  <div className="text-2xl font-bold text-white">Up to 40%</div>
                  <div className="text-blue-200 text-sm">Student Discount</div>
                </div>
              </motion.div>
            </div>

            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-8 right-16 w-24 h-24 bg-blue-500 rounded-full blur-2xl animate-pulse" />
              <div className="absolute bottom-12 left-12 w-20 h-20 bg-purple-500 rounded-full blur-2xl animate-pulse delay-1000" />
              <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-pink-500 rounded-full blur-2xl animate-pulse delay-2000" />
            </div>
          </motion.div>

          {/* View all button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, delay: 0.7 + (filteredProducts.length * 0.1) }}
            className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center mt-8"
          >
            <VerificationProtectedLink
              href="/products"
              requireVerification={true}
            >
              <button className="group relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium text-orange-500 border border-orange-500 rounded-full hover:text-white">
                <span className="absolute inset-0 w-full h-0 transition-all duration-300 ease-out bg-gradient-to-r from-orange-500 to-amber-500 group-hover:h-full"></span>
                <span className="relative flex items-center">
                  View All Products
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </button>
            </VerificationProtectedLink>
          </motion.div>
        </div>
      </div>
      {/* Coupon Modal */}
      <Modal isOpen={showCouponModal} onClose={() => setShowCouponModal(false)}>
        {selectedProduct && (
          <div className="flex flex-col items-center text-center p-4">
            <div className="w-full max-w-xs h-40 bg-white rounded-xl flex items-center justify-center mb-4 shadow-lg">
              <Image src={selectedProduct.image} alt={selectedProduct.name} width={120} height={120} style={{ objectFit: 'contain', width: '100%', height: '120px' }} />
            </div>
            <h2 className="text-2xl font-extrabold mb-1 text-gray-100 drop-shadow">{selectedProduct.name} Student Discount</h2>
            <p className="text-lg font-semibold text-pink-400 mb-2">{selectedProduct.discount}</p>
            <div className="w-full border-b border-gray-700 my-3"></div>
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-gray-300 text-sm mr-2">Rate this offer:</span>
              <button
                className={`text-2xl transition-transform ${rating === 'down' ? 'scale-125 text-red-500' : 'hover:scale-110'}`}
                aria-label="Dislike"
                onClick={() => setRating('down')}
              >👎</button>
              <button
                className={`text-2xl transition-transform ${rating === 'up' ? 'scale-125 text-green-500' : 'hover:scale-110'}`}
                aria-label="Like"
                onClick={() => setRating('up')}
              >👍</button>
            </div>
            <p className="text-gray-400 text-sm mb-2">Enter this code in the promotional code area during checkout to benefit from the student discount.</p>
            <div className="flex flex-col items-center gap-2 mb-4">
              <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white font-mono text-xl font-bold py-2 px-4 rounded-lg tracking-wider">
                {/* Show daily-changing coupon code for Glued product, else show static code */}
                {selectedProduct.id === 4
                  ? getDailyCouponCode(selectedProduct.id, selectedProduct.code)
                  : selectedProduct.code}
              </div>
              {selectedProduct.id === 4 ? (
                <>
                  <button
                    className={`mt-1 px-3 py-1 bg-gray-800 text-white rounded text-sm font-medium border border-gray-600 ${gluedExpired ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-700'}`}
                    onClick={() => {
                      if (gluedExpired) return;
                      const code = getDailyCouponCode(selectedProduct.id, selectedProduct.code);
                      navigator.clipboard.writeText(code);
                      localStorage.setItem(expiredKey, 'true');
                      setGluedExpired(true);
                    }}
                    disabled={gluedExpired}
                  >
                    {gluedExpired ? 'Code Expired' : 'Copy Code'}
                  </button>
                  {gluedExpired && (
                    <div className="text-xs text-gray-400 mt-1">A new coupon code will be available after 24 hours.</div>
                  )}
                </>
              ) : (
                <button
                  className="mt-1 px-3 py-1 bg-gray-800 text-white rounded hover:bg-gray-700 text-sm font-medium border border-gray-600"
                  onClick={() => {
                    const code = selectedProduct.code;
                    navigator.clipboard.writeText(code);
                  }}
                >
                  Copy Code
                </button>
              )}
            </div>
            <a href="#" className="mt-5 inline-block bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-bold py-2 px-6 rounded-full shadow-lg transition-all duration-200">
              Visit {selectedProduct.name} website
            </a>
          </div>
        )}
      </Modal>
    </section>
  );
}
