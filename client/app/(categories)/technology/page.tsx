"use client"
import type React from "react"
import { useState, useEffect } from "react"
import { ShoppingCart, Heart, Star, Eye, ArrowRight, Zap, Shield, Truck } from "lucide-react"
import VerificationGate from '@/components/ui/VerificationGate';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useUserVerification } from '@/hooks/useUserVerification';
import { useRouter } from 'next/navigation';
import Modal from '@/components/ui/Modal';

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviews: number
  isNew?: boolean
  isSale?: boolean
  discount?: number
  description?: string
  code?:string
  codeType?: string // 'fixed' or 'percentage'
}

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

  const featuredProducts: Product[] = [
    {
      id: 1,
      name: "Canva Pro Subscription",
      price: 89.99,
      originalPrice: 129.99,
      image: '/assets/logos/canva-logo.png',
      rating: 4.8,
      reviews: 2847,
      isNew: true,
      isSale: true,
      discount: 31,
      description: "Unlock premium features with Canva Pro for stunning designs.",
      code: "CANVA10",
      codeType: "fixed",
    },
    {
      id: 2,
      name: "Grammarly Premium",
      price: 199.99,
      originalPrice: 249.99,
      image: "/assets/logos/grammarly.png",
      rating: 4.6,
      reviews: 1923,
      isSale: true,
      discount: 20,
      description: "25% off Grammarly premium for students",
      code: "GRAMMARLY20",
      codeType: "fixed",
    },
    {
      id: 3,
      name: "Notion Pro Plan",
      price: 59.99,
      image: "/assets/logos/notion (1).png",
      rating: 4.9,
      reviews: 956,
      isNew: true,
      description: "Unlock 100% off on your Notion's workspace.",
      code: "NOTION100",
      codeType: "fixed",
    },
    {
      id: 4,
      name: "Microsoft Office 365",
      price: 34.99,
      originalPrice: 49.99,
      image: "/assets/logos/microsoft.png",
      rating: 4.5,
      reviews: 743,
      isSale: true,
      discount: 30,
      description: "Get a 3-month free trial on Microsoft 365 Personal, then 50% off.",
      code: "OFFICE36550",
      codeType: "fixed",
    },
    {
      id: 5,
      name: "HP Laptop",
      price: 79.99,
      originalPrice: 99.99,
      image: "https://logos-world.net/wp-content/uploads/2020/12/Hewlett-Packard-Logo-2009.png",
      rating: 4.7,
      reviews: 1456,
      isSale: true,
      discount: 20,
      description: "Get exclusive student offers on hp laptops",
      code: "HPSTUDENT20",
      codeType: "fixed",
    },
    {
      id: 6,
      name: "Figma Professional",
      price: 49.99,
      image: "/assets/logos/figma.png",
      rating: 4.8,
      reviews: 892,
      isNew: true,
      description: "Free figma Education plan to students and educators",
      code: "FIGMAEDU",
      codeType: "fixed",
    },
    {
      id: 7,
      name: "Dell",
      price: 49.99,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV6j9ncPmKx_M7HFjWoRe5xp_IhRm4Fdyw7w&s",
      rating: 4.8,
      reviews: 892,
      isNew: true,
      description: "Unlock special deals for students, parents, and education staff with exclusive vouchers",
      code: "DELLSTUDENT",
      codeType: "fixed",
    },
    {
      id: 8,
      name: "Lenovo",
      price: 49.99,
      image: "https://w7.pngwing.com/pngs/631/322/png-transparent-lenovo-logo-laptop-lenovo-thinkpad-thinkpad-x1-carbon-intel-dell-lenovo-logo-electronics-text-rectangle.png",
      rating: 4.8,
      reviews: 892,
      isNew: true,
      description: "Upto 55% off on student laptop",
      code: "LENOVO55",
      codeType: "fixed",
    },
     {
      id: 9,
      name: "Apple MacBook Pro",
      price: 49.99,
      image: "https://images.seeklogo.com/logo-png/42/1/apple-logo-png_seeklogo-427436.png",
      rating: 4.8,
      reviews: 892,
      isNew: true,
      description: "Save up to ₹10000 on select Mac or iPad with education pricing.",
      code: "APPLEEDU",
      codeType: "fixed",
    }    
    ]

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
    { label: 'Gym' },
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
  } else if (activeFilter === 'Gym') {
    filteredProducts = featuredProducts.filter(p =>
      p.name.toLowerCase().includes('gym')
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
<div className="min-h-screen mt-35 bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* Hero Section */}
      <div className="relative min-h-[80vh] overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black mt-4">
        {/* Animated Circles and Creative Elements */}
        <div className="pointer-events-none select-none">
          {/* Large animated circle top left */}
          <div className="absolute top-[-60px] left-[-60px] w-48 h-48 bg-gradient-to-br from-orange-400/30 to-pink-500/20 rounded-full blur-2xl animate-pulse" style={{animationDuration:'4s'}} />
          {/* Small pulsing circle top right */}
          <div className="absolute top-16 right-24 w-10 h-10 bg-pink-400/60 rounded-full blur-sm animate-ping" style={{animationDuration:'2.5s'}} />
          {/* Hollow animated circle bottom left */}
          <div className="absolute bottom-24 left-20 w-16 h-16 border-4 border-orange-400/60 rounded-full animate-spin-slow" style={{animationDuration:'8s'}} />
          {/* Bouncing dot bottom right */}
          <div className="absolute bottom-16 right-16 w-6 h-6 bg-gradient-to-br from-pink-500 to-orange-400 rounded-full animate-bounce" />
          {/* Creative SVG squiggle */}
          <svg className="absolute top-32 left-1/2 -translate-x-1/2 w-32 h-8 opacity-40" viewBox="0 0 128 32" fill="none"><path d="M0 16 Q32 0 64 16 T128 16" stroke="#F472B6" strokeWidth="4" fill="none"/></svg>
        </div>
        {/* Background Image */}
        <img
          src="https://i.pinimg.com/1200x/5d/46/76/5d46761d4f358e389108f2d6fe1eff80.jpg"
          alt="Tech Hero Background"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-20 z-0"
          style={{ filter: 'brightness(0.3)' }}
        />
        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-16">
      {/* Custom Animations */}
      <style>{`
        @keyframes spin-slow { 0% { transform: rotate(0deg);} 100% { transform: rotate(360deg);} }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
      `}</style>
          {/* Main Hero Banner */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
            {/* Left Large Banner - Auto-changing Banner */}
            {/* Main Hero Banner - Auto-changing Banner */}
            <div className="lg:col-span-8 rounded-2xl p-0 text-white relative overflow-hidden min-h-[380px] flex flex-col justify-end" style={{background: 'none'}}>
              {/* Auto-changing Banner Image */}
              <div className="absolute inset-0 w-full h-full z-0">
                {heroBanners.map((banner, i) => (
                  <img
                    key={banner.src}
                    src={banner.src}
                    alt={banner.alt}
                    className={`w-full h-full object-contain object-center absolute inset-0 transition-opacity duration-700 ${i === bannerIndex ? 'opacity-100' : 'opacity-0'}`}
                    style={{ borderRadius: '1rem', transitionProperty: 'opacity' }}
                    aria-hidden={i !== bannerIndex}
                  />
                ))}
              </div>
              {/* Optional: Dots for navigation */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {heroBanners.map((b, i) => (
                  <button
                    key={b.src}
                    className={`w-3 h-3 rounded-full ${i === bannerIndex ? 'bg-orange-400' : 'bg-white/40'} border border-white/30 transition-all`}
                    onClick={() => setBannerIndex(i)}
                    aria-label={`Show banner ${i + 1}`}
                    style={{ outline: 'none', border: 'none' }}
                  />
                ))}
              </div>
            </div>

            {/* Right Side Banners */}
            <div className="lg:col-span-4 space-y-6">
              {/* Top Right Banner - iPad Pro */}
              <div className="bg-gradient-to-r from-purple-600 to-indigo-700 rounded-2xl p-6 text-white relative h-28">
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
                <div className="relative z-10">
                  <p className="text-xs font-medium opacity-90">Top Offer</p>
                  <h3 className="text-xl font-bold">iPad Pro 2024</h3>
                  <p className="text-sm opacity-80">Discount 30% Off Product</p>
                </div>
                <div className="absolute top-4 right-4">
                  <img 
                    src="/assets/logos/apple-logo.png" 
                    alt="iPad" 
                    className="w-12 h-12 object-contain opacity-80"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.seeklogo.com/logo-png/42/1/apple-logo-png_seeklogo-427436.png";
                    }}
                  />
                </div>
              </div>

              {/* Bottom Right Banner - Gaming */}
              <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl p-6 text-white relative h-28">
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full -ml-8 -mb-8"></div>
                <div className="relative z-10">
                  <p className="text-xs font-medium opacity-90">Gamepad</p>
                  <h3 className="text-xl font-bold">Xbox Controller</h3>
                  <p className="text-sm opacity-80">Best Gadget Of The Week</p>
                </div>
                <div className="absolute top-4 right-4">
                  <Shield className="w-12 h-12 opacity-80" />
                </div>
              </div>
            </div>
          </div>

          {/* Product Categories Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            {[
              { name: "MacBook Pro", icon: "💻", category: "Laptops" },
              { name: "Studio Pro", icon: "🎧", category: "Headphones" },
              { name: "iPhone 15", icon: "📱", category: "Smartphones" },
              { name: "Surface Audi Pro", icon: "🎵", category: "Audio" },
              { name: "Gameboy Console", icon: "🎮", category: "Gaming" },
              { name: "Camera Vision", icon: "📷", category: "Cameras" },
              { name: "Hacktech PC", icon: "🖥", category: "Desktops" },
              { name: "Nexus Electronics", icon: "⌚", category: "Wearables" }
            ].map((item, index) => (
              <div key={index} className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center text-white hover:bg-white/30 transition-all duration-300 cursor-pointer group">
                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                <h4 className="font-semibold text-sm mb-1">{item.name}</h4>
                <p className="text-xs opacity-80">{item.category}</p>
              </div>
            ))}
          </div>

          {/* CTA Section */}
      
        </div>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-500/5 to-pink-600/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-500/5 to-orange-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
      </div>

      {/* Featured Products Section */}
      {/* Search Bar */}
   

      <div className="py-20 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full filter blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-6 mt-2">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-2">
              Featured Products
            </h2>
            <p className="text-base text-gray-300 max-w-2xl mx-auto leading-relaxed mb-6">
              Discover our hand-picked selection of premium tech products with exclusive student discounts
            </p>
            {/* Modern Filter Bar - styled as filter pills with spacing */}
            {/* Filter Bar with working filter logic */}
            <div className="flex justify-center items-center gap-3 mt-6 mb-8">
              <div className="flex bg-white/10 rounded-full px-2 py-1 shadow-lg border border-white/10">
                {filterOptions.map(opt => (
                  <button
                    key={opt.label}
                    className={`px-5 py-2 rounded-full font-semibold text-sm focus:outline-none transition-all mx-1 ${activeFilter === opt.label ? 'bg-white text-gray-900 shadow font-bold' : 'text-white/80 hover:bg-white/20'}`}
                    onClick={() => setActiveFilter(opt.label)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 ml-3">
                <button className="w-9 h-9 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-gray-300 hover:bg-white/20 transition-all">
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/></svg>
                </button>
                <button className="w-9 h-9 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-gray-300 hover:bg-white/20 transition-all">
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="4" rx="2"/><rect x="3" y="10" width="18" height="4" rx="2"/><rect x="3" y="16" width="18" height="4" rx="2"/></svg>
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => {
              // Fill missing content
              const description = product.description && product.description.trim().length > 0
                ? product.description
                : product.isSale && product.discount
                  ? `Get ${product.discount}% off on this product for students!`
                  : 'Exclusive student discount available!';
              return (
                <VerificationGate key={product.id}>
                  <div
                    className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700/50 rounded-3xl shadow-2xl overflow-hidden group hover:shadow-2xl hover:border-orange-500/60 backdrop-blur-sm transition-all duration-500 transform hover:-translate-y-2 hover:scale-110 animate-fade-in-up flex flex-col h-full"
                    onMouseEnter={() => setHoveredCard(product.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    style={{
                      animationDelay: `${index * 0.1}s`,
                    }}
                  >
                    <div className="relative overflow-hidden">
                      <div className="aspect-w-16 aspect-h-12 bg-gradient-to-br from-gray-700 to-gray-800">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>

                      {/* Enhanced Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
                        {product.isNew && (
                          <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs px-2 py-1 rounded-full font-bold shadow-lg backdrop-blur-sm border border-green-400/30">
                            <span className="inline-block w-1.5 h-1.5 bg-white rounded-full mr-1 animate-pulse"></span>
                            NEW
                          </span>
                        )}
                        {product.isSale && (
                          <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full font-bold shadow-lg backdrop-blur-sm border border-red-400/30">
                            🔥 {product.discount}% OFF
                          </span>
                        )}
                      </div>

                      {/* Professional Quick Actions */}
                      <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
                        <button className="p-2 bg-gray-900/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-gradient-to-r hover:from-orange-500 hover:to-pink-600 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                          <Heart className="w-4 h-4 text-gray-300 hover:text-white" />
                        </button>
                        <button className="p-2 bg-gray-900/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-gradient-to-r hover:from-orange-500 hover:to-pink-600 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300 delay-75">
                          <Eye className="w-4 h-4 text-gray-300 hover:text-white" />
                        </button>
                      </div>

                      {/* Premium Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                      
                      {/* Removed duplicate Get Discount button over image */}
                    </div>

                    <div className="p-4 flex flex-col flex-1 justify-between">
                      <div>
                        <h3 className="text-lg font-bold bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent mb-2 group-hover:from-orange-300 group-hover:to-pink-400 transition-all leading-tight">
                          {product.name}
                        </h3>

                        <p className="text-xs text-gray-300 mb-3 line-clamp-2 leading-relaxed min-h-[32px]">
                          {description}
                        </p>
                      </div>
                      <div className="mt-auto">
                        <button
                          className="w-full bg-gradient-to-r from-orange-500 to-pink-600 text-white py-2 px-4 rounded-xl font-bold text-sm hover:from-orange-600 hover:to-pink-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-md hover:shadow-orange-500/30 transform hover:scale-105"
                          onClick={() => handleGetDiscount(product)}
                        >
                          <ShoppingCart className="w-4 h-4" />
                          <span>Get Student Discount</span>
                        </button>
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
    </div>
  )
}

export default EcommerceHero