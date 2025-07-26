
"use client";
import React, { useState, useEffect } from "react";
import { ShoppingCart, Heart, Star, Eye, Zap, Shield, Truck } from "lucide-react";
import VerificationGate from '@/components/ui/VerificationGate';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useUserVerification } from '@/hooks/useUserVerification';
import { useRouter } from 'next/navigation';
import Modal from '@/components/ui/Modal';
import featuredProducts, { Product } from './featuredProducts';

const heroBanners = [
  { src: "/assets/technology/hp.png", alt: "HP Banner" },
  { src: "/assets/technology/canva.png", alt: "Canva Banner" },
  { src: "/assets/technology/figma.png", alt: "Figma Banner" },
];

const EcommerceHero: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [bannerIndex, setBannerIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setBannerIndex((prev) => (prev + 1) % heroBanners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);
  //const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);


  const heroSlides = [
    {
      title: "Summer Tech Sale",
      subtitle: "Up to 50% Off",
      description: "Discover amazing deals on the latest tech gadgets and accessories",
      cta: "Shop Now",
      background: "from-orange-500 to-pink-600",
    },
    {
      title: "New Arrivals",
      subtitle: "Latest Collection",
      description: "Be the first to get your hands on cutting-edge technology",
      cta: "Explore New",
      background: "from-pink-500 to-orange-600",
    },
    {
      title: "Premium Quality",
      subtitle: "Best Sellers",
      description: "Top-rated products loved by thousands of customers",
      cta: "View Best Sellers",
      background: "from-orange-600 to-pink-500",
    },
  ]

  // Filter bar state and logic
  const filterOptions = [
    { label: 'All' },
    { label: 'Skills' },
    { label: 'Laptop' },
    { label: 'Game' },
  ];
  const [activeFilter, setActiveFilter] = useState('All');
  let filteredProducts = featuredProducts;
  if (activeFilter === 'Skills') {
    filteredProducts = featuredProducts.filter(p =>
      p.name.toLowerCase().includes('notion') ||
      p.name.toLowerCase().includes('canva') ||
      p.name.toLowerCase().includes('office')
    );
  } else if (activeFilter === 'Laptop') {
    filteredProducts = featuredProducts.filter(p =>
      p.name.toLowerCase().includes('lenovo') ||
      p.name.toLowerCase().includes('dell') ||
      p.name.toLowerCase().includes('hp')
    );
  } else if (activeFilter === 'Game') {
    filteredProducts = featuredProducts.filter(p =>
      p.name.toLowerCase().includes('game')
    );
  }

  // Modal state for coupon
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productCodeData, setProductCodeData] = useState<{ code: string; isRevealed: boolean; codeType: string } | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleProductClick = (product: Product) => {
    // Generate coupon code from product name
    let codePrefix = product.name.replace(/\s+/g, '').replace(/[^A-Za-z0-9]/g, '').toUpperCase();
    if (codePrefix.length < 4) codePrefix = codePrefix.padEnd(4, 'X');
    else if (codePrefix.length > 8) codePrefix = codePrefix.slice(0, 8);
    setProductCodeData({
      code: `${codePrefix}10`,
      isRevealed: false,
      codeType: 'fixed',
    });
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? "text-orange-400 fill-current" : "text-gray-500"}`}
      />
    ))
  }

  const { isAuthenticated, isLoading } = useKindeBrowserClient();
  const { isVerified } = useUserVerification();
  const router = useRouter();

  // 3-stage click handler for deals
  const handleGetDiscount = (product: Product) => {
    if (isLoading) return;
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

  return (

    <div className="min-h-screen mt-18 bg-gradient-to-br from-white via-rose-50 to-pink-50">
      {/* New Hero Section */}
      <div className="relative w-full overflow-hidden bg-gradient-to-br from-[#6C1AFF] via-[#A259FF] to-[#6C1AFF] min-h-[340px] flex flex-col justify-end pb-0">
        {/* Hero Content Centered */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center pt-16 pb-0 px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 drop-shadow-lg">
            <span className="block">Why Pay More?</span>
            <span className="block text-5xl md:text-6xl font-black text-white mt-2 mb-1">Upgrade with BrokeBro</span>
            <span className="block text-lg md:text-xl font-semibold text-white/90 mt-2">Smart Tech. Smarter Prices.</span>
          </h1>
        </div>
        {/* Wavy SVG Divider */}
        <div className="w-full overflow-hidden -mb-1">
          <svg viewBox="0 0 1440 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-20">
            <path d="M0 60 Q360 0 720 60 T1440 60 V90 H0 V60Z" fill="#fff" />
          </svg>
        </div>
      </div>
      {/* Product Cards Row - now below the wave, not overlaying the purple */}
      <div className="w-full flex flex-col items-center pb-8 bg-white">
        <div className="flex flex-row justify-center gap-8 mt-8 mb-4 px-4 flex-wrap">
          {/* Product cards, all below the wave */}
          <div className="rounded-3xl bg-[#F7F6FB] shadow-1xl flex flex-col items-center w-40 h-40 p-2 mx-2">
            <img src="/assets/technology/image.png" alt="Watch" className="w-52 h-52 object-contain mb-2" />
          </div>
          <div className="rounded-3xl bg-[#F7F6FB] shadow-1xl flex flex-col items-center w-48 h-48 p-2 mx-2"><img src="/assets/technology/image2.jpg" alt="Offer" className="w-40 h-40 object-contain mb-2" /></div>
          <div className="rounded-3xl bg-[#F7F6FB] shadow-1xl flex flex-col items-center w-48 h-48 p-2 mx-2"><img src="/assets/technology/image3.png" alt="AirPods" className="w-40 h-40 object-contain mb-2" /></div>
          <div className="rounded-3xl bg-[#F7F6FB] shadow-1xl flex flex-col items-center w-48 h-48 p-2 mx-2"><img src="/assets/technology/image4.png" alt="Gadgets" className="w-40 h-40 object-contain mb-2" /></div>
        </div>
      </div>
      {/* Floating Explore Button */}
      <button className="fixed bottom-8 right-8 bg-white text-[#6C1AFF] font-bold px-6 py-3 rounded-full shadow-lg flex items-center gap-2 z-50 border-2 border-[#6C1AFF] hover:bg-[#6C1AFF] hover:text-white transition-all">
        Explore <span className="ml-1">&#8594;</span>
      </button>

      {/* ...existing code for featured products and the rest of the page... */}

      {/* Featured Products Section */}
      {/* Search Bar */}


      <div className="py-20 bg-gradient-to-b from-white via-orange-50 to-pink-50 relative overflow-hidden">
        {/* Light theme background decorations */}
        <div className="absolute inset-0 opacity-10 pointer-events-none select-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-orange-200 to-pink-200 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-r from-pink-200 to-orange-200 rounded-full filter blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-6 mt-2">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              Featured Products
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto leading-relaxed mb-6">
              Discover our hand-picked selection of premium tech products with exclusive student discounts
            </p>
            {/* Modern Filter Bar - styled as filter pills with spacing */}
            {/* Filter Bar with working filter logic */}
            <div className="flex justify-center items-center gap-3 mt-6 mb-8">
              <div className="flex bg-orange-100 rounded-full px-2 py-1 shadow-lg border border-orange-200">
                {filterOptions.map(opt => (
                  <button
                    key={opt.label}
                    className={`px-5 py-2 rounded-full font-semibold text-sm focus:outline-none transition-all mx-1 ${activeFilter === opt.label ? 'bg-white text-orange-600 shadow font-bold' : 'text-orange-600/80 hover:bg-white/60'}`}
                    onClick={() => setActiveFilter(opt.label)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 ml-3">
                <button className="w-9 h-9 rounded-xl bg-orange-100 border border-orange-200 flex items-center justify-center text-orange-400 hover:bg-orange-200 transition-all">
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="2" /><rect x="14" y="3" width="7" height="7" rx="2" /><rect x="14" y="14" width="7" height="7" rx="2" /><rect x="3" y="14" width="7" height="7" rx="2" /></svg>
                </button>
                <button className="w-9 h-9 rounded-xl bg-orange-100 border border-orange-200 flex items-center justify-center text-orange-400 hover:bg-orange-200 transition-all">
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="4" rx="2" /><rect x="3" y="10" width="18" height="4" rx="2" /><rect x="3" y="16" width="18" height="4" rx="2" /></svg>
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
            {filteredProducts.map((product, index) => {
              // Fill missing content
              const description = product.description && product.description.trim().length > 0
                ? product.description
                : product.isSale && product.discount
                  ? `Get ${product.discount}% off on this product for students!`
                  : 'Exclusive student discount available!';
              // Build the discount page URL for this product
              const productSlug = product.name.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9\-]/g, '').toLowerCase();
              const handleCardClick = () => {
                // Navigate to the discount page for this product
                router.push(`/technology/discount/${productSlug}`);
              };
              return (
                <VerificationGate key={product.id}>
                  <div
                    className="bg-white border border-orange-100 rounded-3xl shadow-lg overflow-hidden group hover:shadow-xl hover:border-orange-300 transition-all duration-500 transform hover:-translate-y-1 hover:scale-105 animate-fade-in-up flex flex-col h-full min-h-[320px] md:min-h-[340px] xl:min-h-[360px] p-3 md:p-5 cursor-pointer"
                    onMouseEnter={() => setHoveredCard(product.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    onClick={handleCardClick}
                    style={{
                      animationDelay: `${index * 0.1}s`,
                    }}
                  >
                    <div className="relative overflow-hidden">
                      <div className="aspect-w-16 aspect-h-12 bg-gradient-to-br from-orange-50 to-pink-50">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-40 md:h-48 object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>

                      {/* Enhanced Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
                        {product.isNew && (
                          <span className="bg-gradient-to-r from-green-200 to-emerald-200 text-green-900 text-xs px-2 py-1 rounded-full font-bold shadow border border-green-200">
                            <span className="inline-block w-1.5 h-1.5 bg-green-400 rounded-full mr-1 animate-pulse"></span>
                            NEW
                          </span>
                        )}
                        {product.isSale && (
                          <span className="bg-gradient-to-r from-orange-200 to-pink-200 text-orange-900 text-xs px-2 py-1 rounded-full font-bold shadow border border-orange-200">
                            🔥 {product.discount}% OFF
                          </span>
                        )}
                      </div>

                      {/* Professional Quick Actions */}
                      <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
                        <button className="p-2 bg-orange-50 rounded-full shadow hover:bg-orange-100 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                          <Heart className="w-4 h-4 text-orange-400 hover:text-orange-600" />
                        </button>
                        <button className="p-2 bg-orange-50 rounded-full shadow hover:bg-orange-100 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300 delay-75">
                          <Eye className="w-4 h-4 text-orange-400 hover:text-orange-600" />
                        </button>
                      </div>

                      {/* Removed duplicate Get Discount button over image */}
                    </div>

                    <div className="p-4 flex flex-col flex-1 justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-black mb-2 group-hover:text-black transition-all leading-tight">
                          {product.name}
                        </h3>

                        <p className="text-xs text-orange-900/80 mb-3 line-clamp-2 leading-relaxed min-h-[32px]">
                          {description}
                        </p>
                      </div>
                    </div>
                  </div>
                </VerificationGate>
              );
            })}
          </div>

          {/* Additional Professional Elements */}
          <div className="mt-20 text-center">
            <div className="inline-flex items-center space-x-6 bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-full px-8 py-4 border border-gray-700/50">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-green-400" />
                <span className="text-sm font-medium text-green-300">Verified Deals</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-orange-400" />
                <span className="text-sm font-medium text-orange-300">Instant Access</span>
              </div>
              <div className="flex items-center space-x-2">
                <Truck className="w-5 h-5 text-pink-400" />
                <span className="text-sm font-medium text-pink-300">Free Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Coupon Modal */}
      <Modal isOpen={showCouponModal} onClose={() => setShowCouponModal(false)}>
        {selectedProduct && (
          <div className="flex flex-col items-center text-center p-4">
            <div className="w-full max-w-xs h-40 bg-white rounded-xl flex items-center justify-center mb-4 shadow-lg">
              <img src={selectedProduct.image} alt={selectedProduct.name} style={{ objectFit: 'contain', width: '100%', height: '120px' }} />
            </div>
            <h2 className="text-2xl font-extrabold mb-1 text-gray-100 drop-shadow">{selectedProduct.name} Student Discount</h2>
            <p className="text-lg font-semibold text-pink-400 mb-2">Exclusive Tech Deal</p>
            <div className="w-full border-b border-gray-700 my-3"></div>
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-gray-300 text-sm mr-2">Rate this offer:</span>
              <button className="text-2xl hover:scale-110 transition-transform">👎</button>
              <button className="text-2xl hover:scale-110 transition-transform">👍</button>
            </div>
            <p className="text-gray-400 text-sm mb-2">Enter this code in the promotional code area during checkout to benefit from the student discount.</p>
            <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white font-mono text-xl font-bold py-2 px-4 rounded-lg tracking-wider mb-4">
              {selectedProduct.code}
            </div>
            <a href="#" className="mt-5 inline-block bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-bold py-2 px-6 rounded-full shadow-lg transition-all duration-200">
              Visit {selectedProduct.name} website
            </a>
          </div>
        )}
      </Modal>
    </div >
  )
}

export default EcommerceHero