"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

import {
  FaHeart,
  FaRegHeart,
  FaShoppingBag,
  FaStar,
  FaFilter,
  FaSearch,
  FaTags,
  FaFire,
  FaArrowRight,
  FaPlay,
  FaGem,
  FaCrown,
  FaGift,
  FaEye
} from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import { MdOutlineGridView, MdOutlineViewList, MdTrendingUp } from 'react-icons/md';
import { HiOutlineHeart, HiHeart } from 'react-icons/hi';
import VerificationProtectedLink from '@/components/ui/VerificationProtectedLink';
import { GiClothes, GiArmoredPants, GiWatch, GiLipstick, GiHoodie } from 'react-icons/gi';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useUserVerification } from '@/hooks/useUserVerification';
import Modal from '@/components/ui/Modal';
import { useRouter } from 'next/navigation';

// Full static data from JSON files
const staticFashionCategories = [
  {
    id: "ethnic",
    name: "Ethnic Elegance",
    description: "Traditional meets contemporary",
    image: "/assets/biba/336x280.jpg",
    url: "https://track.vcommission.com/click?campaign_id=12553&pub_id=120422",
    brand: "Biba",
    brandLogo: "/assets/afiliate/biba.png",
    gradient: "from-amber-600 via-orange-500 to-red-500",
    icon: "FaCrown",
    products: 150,
    discount: "Up to 60% OFF",
    tag: "Festive Special",
    code: "BIBA60",
    codeType: "fixed"
  },
  {
    id: "denim",
    name: "Premium Denim",
    description: "Iconic American style",
    image: "/assets/levis/300x300.png",
    url: "https://track.vcommission.com/click?campaign_id=11501&pub_id=120422",
    brand: "Levis",
    brandLogo: "/assets/afiliate/levis.png",
    gradient: "from-blue-600 via-indigo-500 to-purple-600",
    icon: "FaGem",
    products: 89,
    discount: "Up to 40% OFF",
    tag: "Classic Fit",
    code: "LEVIS40",
    codeType: "fixed"
  },
  {
    id: "accessories",
    name: "Luxury Accessories",
    description: "Complete your perfect look",
    image: "/assets/fastrack/Fastrack_CPS_Fastrack_Wrist_Takeover_Sale_50%_OFF_on_100+_styles_250x250.jpeg",
    url: "https://track.vcommission.com/click?campaign_id=10742&pub_id=120422",
    brand: "Fastrack",
    brandLogo: "/assets/afiliate/fastrack.png",
    gradient: "from-pink-600 via-rose-500 to-red-500",
    icon: "HiSparkles",
    products: 76,
    discount: "Up to 50% OFF",
    tag: "Limited Edition",
    code: "FASTRACK50",
    codeType: "fixed"
  },
  {
    id: "beauty",
    name: "Beauty Essentials",
    description: "Professional makeup collection",
    image: "/assets/banners/swissbeauty.png",
    url: "https://track.vcommission.com/click?campaign_id=12372&pub_id=120422",
    brand: "Swiss Beauty",
    brandLogo: "/assets/afiliate/swissbeauty.png",
    gradient: "from-purple-600 via-pink-500 to-rose-500",
    icon: "FaGift",
    products: 120,
    discount: "Up to 55% OFF",
    tag: "Pro Collection",
    code: "SWISS55",
    codeType: "fixed"
  },
  {
    id: "lifestyle",
    name: "Lifestyle Hub",
    description: "Curated modern essentials",
    image: "/assets/salty/250x250.jpg",
    url: "https://track.vcommission.com/click?campaign_id=11241&pub_id=120422",
    brand: "Salty",
    brandLogo: "/assets/afiliate/salty.png",
    gradient: "from-green-600 via-teal-500 to-cyan-500",
    icon: "FaFire",
    products: 95,
    discount: "Up to 45% OFF",
    tag: "Trendy",
    code: "SALTY45",
    codeType: "fixed"
  },
  {
    id: "premium",
    name: "Premium Selection",
    description: "Luxury brands, exclusive deals",
    image: "/assets/lakme/image2.png",
    url: "#",
    brand: "Lakme",
    brandLogo: "/assets/lakme/logo.png",
    gradient: "from-gray-800 via-gray-600 to-gray-900",
    icon: "FaEye",
    products: 67,
    discount: "Up to 70% OFF",
    tag: "Exclusive",
    code: "LAKME70",
    codeType: "fixed"
  },
  {
    id: "shoes",
    name: "Sneaker Street",
    description: "Latest sneaker drops and classics",
    image: "/assets/nike/image.png",
    url: "#",
    brand: "Nike",
    brandLogo: "/assets/afiliate/nike.png",
    gradient: "from-gray-700 via-gray-900 to-black",
    icon: "FaGem",
    products: 60,
    discount: "Up to 25% OFF",
    tag: "Sports",
    code: "NIKE25",
    codeType: "fixed"
  }
];

const staticFeaturedCollections = [
  {
    id: 1,
    title: "Biba Festive Collection",
    subtitle: "Celebrate in style",
    description: "Handcrafted ethnic wear for special occasions",
    image: "/assets/biba/336x280.jpg",
    url: "https://track.vcommission.com/click?campaign_id=12553&pub_id=120422",
    price: "Starting at ₹1,299",
    originalPrice: "₹2,999",
    badge: "Festive Special",
    rating: 4.8,
    reviews: 2845,
    code: "BIBA60",
    codeType: "fixed",
    brand: "Biba",
    logo: "/assets/afiliate/biba.png",
    discount: "Up to 60% OFF"
  },
  {
    id: 2,
    title: "Levis Premium Denim",
    subtitle: "Iconic American style",
    description: "Classic fits reimagined for modern wardrobes",
    image: "/assets/levis/336x280.jpg",
    url: "https://track.vcommission.com/click?campaign_id=11501&pub_id=120422",
    price: "Starting at ₹2,499",
    originalPrice: "₹4,999",
    badge: "Classic Collection",
    rating: 4.7,
    reviews: 1892,
    code: "LEVIS40",
    codeType: "fixed",
    brand: "Levis",
    logo: "/assets/afiliate/levis.png",
    discount: "Up to 40% OFF"
  },
  {
    id: 3,
    title: "Swiss Beauty Pro",
    subtitle: "Professional makeup",
    description: "Studio-quality cosmetics for everyday glamour",
    image: "/assets/banners/swissbeauty.png",
    url: "https://track.vcommission.com/click?campaign_id=12372&pub_id=120422",
    price: "Starting at ₹599",
    originalPrice: "₹1,299",
    badge: "Beauty Expert",
    rating: 4.9,
    reviews: 3247,
    code: "SWISS55",
    codeType: "fixed",
    brand: "Swiss Beauty",
    logo: "/assets/afiliate/swissbeauty.png",
    discount: "Up to 55% OFF"
  }
];

const staticTrendingProducts = [
  {
    id: 1,
    name: "Biba Embroidered Kurta",
    brand: "Biba",
    price: "₹1,899",
    originalPrice: "₹3,499",
    image: "/assets/biba/250x250.jpg",
    url: "https://track.vcommission.com/click?campaign_id=12553&pub_id=120422",
    rating: 4.6,
    reviews: 234,
    discount: "46% OFF",
    badge: "Bestseller",
    colors: ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4"],
    sizes: ["S", "M", "L", "XL"],
    category: "ethnic",
    code: "BIBA60",
    codeType: "fixed",
    logo: "/assets/afiliate/biba.png"
  },
  {
    id: 2,
    name: "Levis 511 Slim Fit Jeans",
    brand: "Levis",
    price: "₹2,999",
    originalPrice: "₹4,999",
    image: "/assets/levis/250x250.jpg",
    url: "https://track.vcommission.com/click?campaign_id=11501&pub_id=120422",
    rating: 4.8,
    reviews: 567,
    discount: "40% OFF",
    badge: "Premium",
    colors: ["#1a1a1a", "#4a4a4a", "#6a6a6a"],
    sizes: ["28", "30", "32", "34", "36"],
    category: "denim",
    code: "LEVIS40",
    codeType: "fixed",
    logo: "/assets/afiliate/levis.png"
  },
  {
    id: 3,
    name: "Fastrack Analog Watch",
    brand: "Fastrack",
    price: "₹1,299",
    originalPrice: "₹2,599",
    image: "/assets/fastrack/Fastrack_CPS_Fastrack_Wrist_Takeover_Sale_50%_OFF_on_100+_styles_250x250.jpeg",
    url: "https://track.vcommission.com/click?campaign_id=10742&pub_id=120422",
    rating: 4.5,
    reviews: 892,
    discount: "50% OFF",
    badge: "Limited Edition",
    colors: ["#C0392B", "#8E44AD", "#2980B9"],
    sizes: ["Free Size"],
    category: "accessories",
    code: "FASTRACK50",
    codeType: "fixed",
    logo: "/assets/afiliate/fastrack.png"
  },
  {
    id: 4,
    name: "Swiss Beauty Lipstick Set",
    brand: "Swiss Beauty",
    price: "₹899",
    originalPrice: "₹1,799",
    image: "/assets/banners/swissbeauty.png",
    url: "https://track.vcommission.com/click?campaign_id=12372&pub_id=120422",
    rating: 4.7,
    reviews: 445,
    discount: "50% OFF",
    badge: "New Arrival",
    colors: ["#E74C3C", "#F39C12", "#8E44AD", "#C0392B"],
    sizes: ["Standard"],
    category: "beauty",
    code: "SWISS55",
    codeType: "fixed",
    logo: "/assets/afiliate/swissbeauty.png"
  },
  {
    id: 5,
    name: "Salty Lifestyle Bag",
    brand: "Salty",
    price: "₹1,499",
    originalPrice: "₹2,299",
    image: "/assets/salty/250x250.jpg",
    url: "https://track.vcommission.com/click?campaign_id=11241&pub_id=120422",
    rating: 4.4,
    reviews: 178,
    discount: "35% OFF",
    badge: "Trendy",
    colors: ["#2C3E50", "#E67E22", "#27AE60"],
    sizes: ["One Size"],
    category: "lifestyle",
    code: "SALTY45",
    codeType: "fixed",
    logo: "/assets/afiliate/salty.png"
  },
  {
    id: 6,
    name: "Lakme Perfect Radiance",
    brand: "Lakme",
    price: "₹649",
    originalPrice: "₹999",
    image: "/assets/lakme/image2.png",
    url: "#",
    rating: 4.3,
    reviews: 567,
    discount: "35% OFF",
    badge: "Premium",
    colors: ["#F39C12", "#E74C3C", "#8E44AD"],
    sizes: ["Standard"],
    category: "beauty",
    code: "LAKME70",
    codeType: "fixed",
    logo: "/assets/lakme/logo.png"
  }
];

// Icon mapping for category icons
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  GiClothes,
  GiArmoredPants,
  GiWatch,
  GiLipstick,
  GiHoodie,
};
function getIconComponent(iconName: string) {
  return iconMap[iconName] || GiClothes;
}

export default function FashionPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState('all');
  
  // Modal states
  const [showBrandModal, setShowBrandModal] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<any>(null);
  const [codeData, setCodeData] = useState<any>(null);

  // Animation refs
  const heroRef = useRef(null);
  const categoriesRef = useRef(null);
  const productsRef = useRef(null);
  const newsletterRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const categoriesInView = useInView(categoriesRef, { once: true });
  const productsInView = useInView(productsRef, { once: true });
  const newsletterInView = useInView(newsletterRef, { once: true });
   const { isVerified } = useStudentVerification();
   const { isAuthenticated, isLoading } = useKindeBrowserClient();
   const { isVerified: userIsVerified } = useUserVerification();
   const [showCouponModal, setShowCouponModal] = useState(false);
   type FashionCategory = typeof staticFashionCategories[number];
   const [selectedBrand, setSelectedBrand] = useState<FashionCategory | null>(null);
   const router = useRouter();

   // 3-stage click handler
   const handleBrandClick = (brand: FashionCategory) => {
    if (isLoading) return; // Don't do anything while loading auth state
    if (!isAuthenticated) {
      router.push('/signup');
      return;
    }
    if (!userIsVerified) {
      router.push('/student-verification');
      return;
    }
    setSelectedBrand(brand);
    setShowCouponModal(true);
  };
  // Auto-rotate featured collections
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % staticFeaturedCollections.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const toggleWishlist = (productId: number) => {
    setWishlist(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  // Handle modal opening for any product/category click
  const handleProductClick = (item: any) => {
    const currentCodeData = {
      code: item.code || 'STUDENT10',
      isExpired: false,
      timeLeft: null
    };
    
    setCodeData(currentCodeData);
    setSelectedBrand({
      ...item,
      slug: item.brand?.toLowerCase() || item.name?.toLowerCase()
    });
    setShowBrandModal(true);
  };

  // Trending Products: show all products by default, and allow filtering by brand only if user selects a filter
  const filteredProducts = selectedFilter === 'all'
    ? staticTrendingProducts
    : staticTrendingProducts.filter(product =>
      product.brand.toLowerCase() === selectedFilter.toLowerCase()
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white overflow-x-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 100, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/2 right-0 w-64 h-64 bg-gradient-to-r from-green-500/15 to-teal-500/15 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10">
        {/* Hero Section with Video-like Banner */}
        <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
          <div className="absolute inset-0">
            <motion.div
              initial={{ scale: 1.1 }}
              animate={heroInView ? { scale: 1 } : { scale: 1.1 }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="w-full h-full"
            >
              <Image
                src={staticFeaturedCollections[currentSlide].image}
                alt={staticFeaturedCollections[currentSlide].title}
                fill
                className="object-cover"
                priority
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={heroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="inline-block px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full text-sm font-medium"
                  >
                    {staticFeaturedCollections[currentSlide].badge}
                  </motion.span>

                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="text-5xl lg:text-7xl font-bold leading-tight mt-4"
                  >
                    Fashion
                    <span className="block bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                      Revolution
                    </span>
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="text-xl text-gray-300 leading-relaxed max-w-lg"
                  >
                    Discover exclusive student discounts on premium fashion brands.
                    From ethnic wear to modern streetwear, find your perfect style.
                  </motion.p>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8, delay: 1 }}
                  className="flex flex-wrap gap-4"
                >
                  <motion.button
                    onClick={() => handleProductClick(staticFeaturedCollections[currentSlide])}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-semibold rounded-full shadow-2xl hover:shadow-pink-500/25 transition-all duration-300 flex items-center gap-3"
                  >
                    <FaShoppingBag className="text-lg" />
                    Get Discount Code
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold rounded-full hover:bg-white/20 transition-all duration-300 flex items-center gap-3"
                  >
                    <FaPlay className="text-sm" />
                    Watch Lookbook
                  </motion.button>
                </motion.div>

                {/* Collection Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                  className="flex items-center gap-8 pt-8"
                >
                  <div className="text-center">
                    <div className="text-3xl font-bold text-pink-400">500+</div>
                    <div className="text-sm text-gray-400">Premium Brands</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400">70%</div>
                    <div className="text-sm text-gray-400">Max Discount</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-cyan-400">24/7</div>
                    <div className="text-sm text-gray-400">Support</div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Featured Collection Card */}
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={heroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="hidden lg:block"
              >
                <div className="relative bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-2xl">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-2xl font-bold">{staticFeaturedCollections[currentSlide].title}</h3>
                        <p className="text-gray-300">{staticFeaturedCollections[currentSlide].subtitle}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaStar className="text-yellow-400" />
                        <span className="font-semibold">{staticFeaturedCollections[currentSlide].rating}</span>
                        <span className="text-gray-400 text-sm">({staticFeaturedCollections[currentSlide].reviews})</span>
                      </div>
                    </div>

                    <p className="text-gray-300">{staticFeaturedCollections[currentSlide].description}</p>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-green-400">{staticFeaturedCollections[currentSlide].price}</div>
                        <div className="text-sm text-gray-400 line-through">{staticFeaturedCollections[currentSlide].originalPrice}</div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toggleWishlist(staticFeaturedCollections[currentSlide].id)}
                        className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                      >
                        {wishlist.includes(staticFeaturedCollections[currentSlide].id) ?
                          <FaHeart className="text-red-400" /> :
                          <FaRegHeart className="text-gray-400" />
                        }
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Slide Indicators */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3">
              {staticFeaturedCollections.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide
                    ? 'bg-white scale-125'
                    : 'bg-white/40 hover:bg-white/60'
                    }`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Premium Categories Section */}
        <section ref={categoriesRef} className="py-20 px-6">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={categoriesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 1 }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Premium Collections
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Explore curated collections from top fashion brands with exclusive student discounts
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {staticFashionCategories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={categoriesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 hover:border-white/40 transition-all duration-500 hover:scale-105"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/50" />

                  {/* Background Image */}
                  <div className="relative h-64 overflow-hidden cursor-pointer" onClick={() => handleBrandClick(category)}>
                    <Image
                      src={category.image || "/assets/placeholder.png"}
                      alt={category.name}
                      fill
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "/assets/placeholder.png";
                      }}
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${category.gradient} opacity-30 group-hover:opacity-40 transition-opacity duration-500`} />
                  </div>

                  {/* Content */}
                  <div className="relative p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                          {React.createElement(getIconComponent(category.icon), { className: "text-2xl" })}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold">{category.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            {category.brandLogo && (
                              <div className="relative w-20 h-20 rounded overflow-hidden bg-white/10 backdrop-blur-sm border-4 border-white/40 shadow-2xl cursor-pointer" onClick={() => handleBrandClick(category)}>
                                <Image
                                  src={category.brandLogo}
                                  alt={`${category.brand} logo`}
                                  fill
                                  className="object-contain p-2"
                                />
                              </div>
                            )}
                            <p className="text-sm text-gray-300">{category.brand}</p>
                          </div>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full text-xs font-medium">
                        {category.tag}
                      </span>
                    </div>

                    <p className="text-gray-300">{category.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-400">
                        {category.products} products
                      </div>
                      <div className="text-lg font-bold text-green-400">
                        {category.discount}
                      </div>
                    </div>

                    <button
                      className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-green-500 to-cyan-600 hover:from-green-600 hover:to-cyan-700 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                      onClick={() => handleBrandClick(category)}
                    >
                      Get Discount
                      <FaGift className="text-sm" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Trending Products Section */}
        <section ref={productsRef} className="py-20 px-6 bg-gradient-to-r from-black/20 to-transparent">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={productsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 1 }}
              className="flex items-center justify-between mb-16"
            >
              <div>
                <h2 className="text-5xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                    Trending Now
                  </span>
                </h2>
                <p className="text-xl text-gray-300">
                  Discover what's hot in fashion this season
                </p>
              </div>

              {/* Filter Buttons */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full p-1">
                  {['all', 'Biba', 'Levis', 'Fastrack', 'Swiss Beauty', 'Salty'].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setSelectedFilter(filter)}
                      className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${selectedFilter === filter
                        ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                        }`}
                    >
                      {filter === 'all' ? 'All' : filter}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-3 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-white/20 text-white' : 'text-gray-400 hover:text-white'
                      }`}
                  >
                    <MdOutlineGridView className="text-xl" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-3 rounded-xl transition-all ${viewMode === 'list' ? 'bg-white/20 text-white' : 'text-gray-400 hover:text-white'
                      }`}
                  >
                    <MdOutlineViewList className="text-xl" />
                  </button>
                </div>
              </div>
            </motion.div>

            <div className={`grid gap-8 ${viewMode === 'grid'
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              : 'grid-cols-1'
              }`}>
              <AnimatePresence mode="wait">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={productsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`group relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl overflow-hidden hover:border-white/40 transition-all duration-500 hover:scale-105 ${viewMode === 'list' ? 'flex items-center' : ''
                      }`}
                  >
                    {/* Product Image */}
                    <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-48 h-48' : 'h-64'
                      }`}>
                      <Image
                        src={product.image || "/assets/placeholder.png"}
                        alt={product.name}
                        fill
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = "/assets/placeholder.png";
                        }}
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />

                      {/* Badges */}
                      <div className="absolute top-4 left-4 space-y-2">
                        <span className="px-3 py-1 bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs font-bold rounded-full">
                          {product.discount}
                        </span>
                        <span className="block px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-medium rounded-full">
                          {product.badge}
                        </span>
                      </div>

                      {/* Wishlist Button */}
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300"
                      >
                        {wishlist.includes(product.id) ?
                          <HiHeart className="text-red-400 text-xl" /> :
                          <HiOutlineHeart className="text-white text-xl" />
                        }
                      </button>

                      {/* Quick Actions */}
                      <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleProductClick(product)}
                            className="flex-1 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-all duration-300 text-sm font-medium">
                            Get Code
                          </button>
                          <button 
                            onClick={() => handleProductClick(product)}
                            className="flex-1 px-4 py-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-xl hover:from-pink-700 hover:to-purple-700 transition-all duration-300 text-sm font-medium">
                            Shop Now
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className={`p-6 space-y-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-purple-400 flex items-center gap-2">
                            {product.logo && (
                              <span className="inline-block w-16 h-16 relative align-middle">
                                <Image
                                  src={product.logo}
                                  alt={`${product.brand} logo`}
                                  fill
                                  className="object-contain rounded bg-white/10 shadow-lg border-2 border-white/30"
                                />
                              </span>
                            )}
                            {product.brand}
                          </span>
                          <div className="flex items-center gap-1">
                            <FaStar className="text-yellow-400 text-sm" />
                            <span className="text-sm font-medium">{product.rating}</span>
                            <span className="text-xs text-gray-400">({product.reviews})</span>
                          </div>
                        </div>

                        <h3 className="text-xl font-bold text-white">{product.name}</h3>

                        <div className="flex items-center gap-3">
                          <span className="text-2xl font-bold text-green-400">{product.price}</span>
                          <span className="text-lg text-gray-400 line-through">{product.originalPrice}</span>
                        </div>
                      </div>

                      {/* Color Options */}
                      <div className="space-y-2">
                        <p className="text-sm text-gray-400">Colors:</p>
                        <div className="flex gap-2">
                          {product.colors.map((color, colorIndex) => (
                            <div
                              key={colorIndex}
                              className="w-6 h-6 rounded-full border-2 border-white/20 cursor-pointer hover:border-white/40 transition-all"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Sizes */}
                      <div className="space-y-2">
                        <p className="text-sm text-gray-400">Sizes:</p>
                        <div className="flex gap-2 flex-wrap">
                          {product.sizes.map((size, sizeIndex) => (
                            <span
                              key={sizeIndex}
                              className="px-3 py-1 bg-white/10 border border-white/20 rounded-lg text-sm hover:bg-white/20 cursor-pointer transition-all"
                            >
                              {size}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section ref={newsletterRef} className="py-20 px-6">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={newsletterInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 1 }}
              className="relative bg-gradient-to-r from-pink-600/20 via-purple-600/20 to-cyan-600/20 backdrop-blur-xl border border-white/20 rounded-3xl p-12 text-center overflow-hidden"
            >
              {/* Background Decorations */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-400/30 to-purple-600/30 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-cyan-400/30 to-blue-600/30 rounded-full blur-3xl" />

              <div className="relative z-10 space-y-8">
                <div className="space-y-4">
                  <h2 className="text-4xl lg:text-5xl font-bold">
                    <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                      Stay In Style
                    </span>
                  </h2>
                  <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                    Subscribe to get exclusive deals, new arrivals, and fashion tips directly to your inbox.
                    Plus, get 10% off your first purchase!
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-6 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-pink-400 transition-all duration-300"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-semibold rounded-full transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <FaGift className="text-lg" />
                    Subscribe
                  </motion.button>
                </div>

                <div className="flex items-center justify-center gap-8 pt-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-pink-400">50K+</div>
                    <div className="text-sm text-gray-400">Happy Subscribers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">Daily</div>
                    <div className="text-sm text-gray-400">New Deals</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cyan-400">Exclusive</div>
                    <div className="text-sm text-gray-400">Student Offers</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
      {/* Coupon Modal */}
      <Modal isOpen={showCouponModal} onClose={() => setShowCouponModal(false)}>
        {selectedBrand && (
          <div className="flex flex-col items-center text-center p-4">
            <div className="w-full max-w-xs h-40 bg-white rounded-xl flex items-center justify-center mb-4 shadow-lg">
              <Image src={selectedBrand.brandLogo} alt={selectedBrand.brand} width={120} height={120} style={{ objectFit: 'contain', width: '100%', height: '120px' }} />
            </div>
            <h2 className="text-2xl font-extrabold mb-1 text-gray-100 drop-shadow">{selectedBrand.brand} Student Discount</h2>
            <p className="text-lg font-semibold text-pink-400 mb-2">{selectedBrand.discount}</p>
            <div className="w-full border-b border-gray-700 my-3"></div>
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-gray-300 text-sm mr-2">Rate this offer:</span>
              <button className="text-2xl hover:scale-110 transition-transform">👎</button>
              <button className="text-2xl hover:scale-110 transition-transform">👍</button>
            </div>
            <p className="text-gray-400 text-sm mb-2">Enter this code in the promotional code area during checkout to benefit from the student discount.</p>
            <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white font-mono text-xl font-bold py-2 px-4 rounded-lg tracking-wider mb-4">
              STUDENT10
            </div>
            <a href={selectedBrand.url || '#'} target="_blank" rel="noopener noreferrer" className="mt-5 inline-block bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-bold py-2 px-6 rounded-full shadow-lg transition-all duration-200">
              Visit {selectedBrand.brand} website
            </a>
          </div>
        )}
      </Modal>
    </div>
  );
}
