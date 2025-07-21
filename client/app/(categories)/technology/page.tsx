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
}

const EcommerceHero: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showCouponModal, setShowCouponModal] = useState(false);
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

  // Search bar state and filtering logic (must be after featuredProducts)
  const [searchText, setSearchText] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(featuredProducts);

  useEffect(() => {
    if (!searchText.trim()) {
      setFilteredProducts(featuredProducts);
      return;
    }
    const text = searchText.trim().toLowerCase();
    if (/^\d+$/.test(text)) {
      setFilteredProducts(
        featuredProducts.filter(
          (p) => p.discount && p.discount.toString().startsWith(text)
        )
      );
    } else {
      setFilteredProducts(
        featuredProducts.filter(
          (p) => p.name.toLowerCase().startsWith(text) || p.name.toLowerCase().includes(text)
        )
      );
    }
  }, [searchText, featuredProducts]);

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
    <div className="min-h-screen  mt-35 bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* Hero Section */}
      <div className="relative h-[70vh] overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
        {/* Background Slider */}
        <div className="absolute inset-0">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 bg-gradient-to-r ${slide.background} opacity-5 transition-opacity duration-1000 ${index === currentSlide ? "opacity-10" : "opacity-5"
                }`}
            />
          ))}
        </div>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-500/5 to-pink-600/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-500/5 to-orange-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="flex items-center justify-center">
              {/* Center Content */}
              <div className="text-center space-y-8 max-w-4xl">
                <div className="space-y-4">
                  <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-pink-600 rounded-full px-4 py-2 text-sm font-medium backdrop-blur-sm">
                    <Zap className="w-4 h-4 text-white" />
                    <span className="text-white">{heroSlides[currentSlide].subtitle}</span>
                  </div>
                  <h1 className="text-5xl lg:text-7xl font-bold leading-tight bg-gradient-to-r from-orange-400 via-pink-500 to-orange-400 bg-clip-text text-transparent">
                    {heroSlides[currentSlide].title}
                  </h1>
                  <p className="text-xl lg:text-2xl bg-gradient-to-r from-orange-300 to-pink-400 bg-clip-text text-transparent max-w-3xl mx-auto">
                    {heroSlides[currentSlide].description}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-gradient-to-r from-orange-500 to-pink-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-orange-600 hover:to-pink-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-orange-500/25">
                    <span>{heroSlides[currentSlide].cta}</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <button className="border-2 border-orange-500 bg-gradient-to-r from-orange-500 to-pink-600 bg-clip-text text-transparent px-8 py-4 rounded-full font-semibold text-lg hover:bg-gradient-to-r hover:from-orange-500 hover:to-pink-600 hover:text-white hover:bg-clip-border transition-all duration-300">
                    Learn More
                  </button>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-8 pt-8 justify-center">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-r from-orange-500 to-pink-600 rounded-full backdrop-blur-sm">
                      <Truck className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-sm font-medium bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
                      Free Shipping
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-r from-orange-500 to-pink-600 rounded-full backdrop-blur-sm">
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-sm font-medium bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
                      2 Year Warranty
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-r from-orange-500 to-pink-600 rounded-full backdrop-blur-sm">
                      <ArrowRight className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-sm font-medium bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
                      Easy Returns
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${index === currentSlide ? "bg-gradient-to-r from-orange-500 to-pink-600" : "bg-gray-600"
                }`}
            />
          ))}
        </div>
      </div>

      {/* Featured Products Section */}
      {/* Search Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 mb-2">
        <input
          type="text"
          placeholder="Search by brand or discount..."
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          className="w-full md:w-1/2 px-5 py-3 rounded-full border border-orange-400 bg-black text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-lg"
        />
        <div className="text-sm text-gray-400 mt-2">
          Showing {filteredProducts.length} deals
        </div>
      </div>

      <div className="py-20 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full filter blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500/20 to-pink-500/20 backdrop-blur-sm border border-orange-500/30 rounded-full px-6 py-3 mb-6">
              <Zap className="w-5 h-5 text-orange-400" />
              <span className="text-orange-300 font-medium">Premium Tech Collection</span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-orange-400 via-pink-500 to-orange-400 bg-clip-text text-transparent mb-6">
              Featured Products
            </h2>
            <p className="text-xl bg-gradient-to-r from-orange-300 to-pink-400 bg-clip-text text-transparent max-w-3xl mx-auto leading-relaxed">
              Discover our hand-picked selection of premium tech products with exclusive student discounts
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <VerificationGate key={product.id}>
                <div
                  className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-700/50 rounded-3xl shadow-2xl overflow-hidden group hover:shadow-3xl hover:border-orange-500/60 backdrop-blur-sm transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 animate-fade-in-up"
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
                        className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>

                    {/* Enhanced Badges */}
                    <div className="absolute top-6 left-6 flex flex-col gap-2 z-10">
                      {product.isNew && (
                        <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm px-4 py-2 rounded-full font-bold shadow-lg backdrop-blur-sm border border-green-400/30">
                          <span className="inline-block w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
                          NEW
                        </span>
                      )}
                      {product.isSale && (
                        <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm px-4 py-2 rounded-full font-bold shadow-lg backdrop-blur-sm border border-red-400/30">
                          🔥 {product.discount}% OFF
                        </span>
                      )}
                    </div>

                    {/* Professional Quick Actions */}
                    <div className="absolute top-6 right-6 flex flex-col gap-3 z-10">
                      <button className="p-3 bg-gray-900/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-gradient-to-r hover:from-orange-500 hover:to-pink-600 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                        <Heart className="w-5 h-5 text-gray-300 hover:text-white" />
                      </button>
                      <button className="p-3 bg-gray-900/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-gradient-to-r hover:from-orange-500 hover:to-pink-600 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300 delay-75">
                        <Eye className="w-5 h-5 text-gray-300 hover:text-white" />
                      </button>
                    </div>

                    {/* Premium Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                    
                    {/* Enhanced Overlay CTA */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button
                        className="bg-gradient-to-r from-orange-500 to-pink-600 text-white px-8 py-4 rounded-full font-bold text-lg opacity-0 group-hover:opacity-100 transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 flex items-center space-x-3 shadow-2xl hover:shadow-orange-500/50 hover:from-orange-600 hover:to-pink-700"
                        onClick={() => handleGetDiscount(product)}
                      >
                        <ShoppingCart className="w-6 h-6" />
                        <span>Get Discount</span>
                      </button>
                    </div>
                  </div>

                  <div className="p-8">
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent mb-4 group-hover:from-orange-300 group-hover:to-pink-400 transition-all leading-tight">
                      {product.name}
                    </h3>

                    <p className="text-base text-gray-300 mb-6 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    <button
                      className="w-full bg-gradient-to-r from-orange-500 to-pink-600 text-white py-4 px-6 rounded-2xl font-bold text-lg hover:from-orange-600 hover:to-pink-700 transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg hover:shadow-orange-500/30 transform hover:scale-105"
                      onClick={() => handleGetDiscount(product)}
                    >
                      <ShoppingCart className="w-6 h-6" />
                      <span>Get Student Discount</span>
                    </button>
                  </div>
                </div>
              </VerificationGate>
            ))}
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
              TECHSTUDENT10
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