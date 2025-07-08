"use client"
import type React from "react"
import { useState, useEffect } from "react"
import { ShoppingCart, Heart, Star, Eye, ArrowRight, Zap, Shield, Truck } from "lucide-react"
import VerificationGate from '@/components/ui/VerificationGate';

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
      id: 8,
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? "text-orange-400 fill-current" : "text-gray-500"}`}
      />
    ))
  }

  return (
    <div className="min-h-screen  mt-35 bg-gradient-to-br from-gray-900 via-black to-gray-800">
      {/* Hero Section */}
      <div className="relative h-screen overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-pink-600 rounded-full px-4 py-2 text-sm font-medium backdrop-blur-sm">
                    <Zap className="w-4 h-4 text-white" />
                    <span className="text-white">{heroSlides[currentSlide].subtitle}</span>
                  </div>
                  <h1 className="text-5xl lg:text-7xl font-bold leading-tight bg-gradient-to-r from-orange-400 via-pink-500 to-orange-400 bg-clip-text text-transparent">
                    {heroSlides[currentSlide].title}
                  </h1>
                  <p className="text-xl lg:text-2xl bg-gradient-to-r from-orange-300 to-pink-400 bg-clip-text text-transparent max-w-lg">
                    {heroSlides[currentSlide].description}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="bg-gradient-to-r from-orange-500 to-pink-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-orange-600 hover:to-pink-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-orange-500/25">
                    <span>{heroSlides[currentSlide].cta}</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <button className="border-2 border-orange-500 bg-gradient-to-r from-orange-500 to-pink-600 bg-clip-text text-transparent px-8 py-4 rounded-full font-semibold text-lg hover:bg-gradient-to-r hover:from-orange-500 hover:to-pink-600 hover:text-white hover:bg-clip-border transition-all duration-300">
                    Learn More
                  </button>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-8 pt-8">
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

              {/* Right Content - Hero Product Cards */}
              <div className="relative">
                <div className="grid grid-cols-2 gap-4 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  {featuredProducts.slice(0, 4).map((product, index) => (
                    <div
                      key={product.id}
                      className={`bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-3xl hover:border-orange-500/50 backdrop-blur-sm ${index % 2 === 0 ? "translate-y-4" : "-translate-y-4"
                        }`}
                      style={{
                        animationDelay: `${index * 0.1}s`,
                      }}
                    >
                      <div className="relative group">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                        className="w-full h-auto" // Remove fixed height and other classes
                        />

                        {/* Badges */}
                        <div className="absolute top-2 left-2 flex flex-col gap-1">
                        
                       
                        </div>

                        {/* Quick Actions */}
                        <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <button className="p-2 bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-gradient-to-r hover:from-orange-500 hover:to-pink-600 transition-all">
                            <Heart className="w-4 h-4 text-gray-300 hover:text-white" />
                          </button>
                          <button className="p-2 bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-gradient-to-r hover:from-orange-500 hover:to-pink-600 transition-all">
                            <Eye className="w-4 h-4 text-gray-300 hover:text-white" />
                          </button>
                        </div>

                        {/* Quick Add to Cart */}
                        <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <button className="w-full bg-gradient-to-r from-orange-500 to-pink-600 text-white py-2 px-3 rounded-lg text-xs font-medium hover:from-orange-600 hover:to-pink-700 transition-all flex items-center justify-center space-x-1">
                            <ShoppingCart className="w-3 h-3" />
                            <span>Add to Cart</span>
                          </button>
                        </div>
                      </div>

                      <div className="p-3">
                        <h3 className="font-semibold bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent text-sm mb-1 line-clamp-2">
                          {product.name}
                        </h3>

                        <div>{product.description}</div>

                        <div className="flex items-center justify-between">
                        
                        </div>
                      </div>
                    </div>
                  ))}
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
      <div className="py-20 bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-400 via-pink-500 to-orange-400 bg-clip-text text-transparent mb-4">
              Featured Products
            </h2>
            <p className="text-xl bg-gradient-to-r from-orange-300 to-pink-400 bg-clip-text text-transparent max-w-2xl mx-auto">
              Discover our hand-picked selection of premium tech products
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <VerificationGate key={product.id}>
                <div
                  className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl hover:border-orange-500/50 transition-all duration-300 transform hover:-translate-y-2 backdrop-blur-sm"
                  onMouseEnter={() => setHoveredCard(product.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />

                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {product.isNew && (
                        <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm px-3 py-1 rounded-full font-medium">
                          NEW
                        </span>
                      )}
                      {product.isSale && (
                        <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm px-3 py-1 rounded-full font-medium">
                          -{product.discount}% OFF
                        </span>
                      )}
                    </div>

                    {/* Quick Actions */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                      <button className="p-3 bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-gradient-to-r hover:from-orange-500 hover:to-pink-600 transition-all opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                        <Heart className="w-5 h-5 text-gray-300 hover:text-white" />
                      </button>
                      <button className="p-3 bg-gray-800/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-gradient-to-r hover:from-orange-500 hover:to-pink-600 transition-all opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300 delay-75">
                        <Eye className="w-5 h-5 text-gray-300 hover:text-white" />
                      </button>
                    </div>

                    {/* Overlay CTA */}
                    <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                      <button className="bg-gradient-to-r from-orange-500 to-pink-600 text-white px-6 py-3 rounded-full font-semibold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex items-center space-x-2 shadow-lg">
                        <ShoppingCart className="w-5 h-5" />
                        <span>Quick Add</span>
                      </button>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent mb-2 group-hover:from-orange-300 group-hover:to-pink-400 transition-all">
                      {product.name}
                    </h3>

                    <div className="flex items-center gap-2 mb-4">
                   
                   
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                       
                      </div>

                    </div> 
                     <p className="text-base text-gray-300 mb-4 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>            
                        <button className="w-full bg-gradient-to-r from-orange-500 to-pink-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-orange-600 hover:to-pink-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-orange-500/25">
                      <ShoppingCart className="w-5 h-5" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </VerificationGate>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EcommerceHero