"use client";

import React, { useEffect, useState } from "react";
import { Search, ShoppingCart, Heart, Eye, ArrowRight, Zap, Shield, Truck } from "lucide-react";
import VerificationGate from '@/components/ui/VerificationGate';
import Modal from '@/components/ui/Modal';
import Image from 'next/image';
import RevealCodeButton from '@/components/ui/RevealCodeButton';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useUserVerification } from '@/hooks/useUserVerification';
import { useRouter } from 'next/navigation';
type Product = {
  id: string;
  title: string;
  description: string;
  originalPrice: number;
  currentPrice: number;
  discount: string;
  image: string;
  imageClass: string;
  category: string;
  duration: string;
};

const initialProducts: Product[] = [
  {
    id: "1",
    title: "Go Ibibo",
    description:
      "Students are eligible to avail 10% discount on base fares for all Economy Class and Economy Flexi bookings.",
    originalPrice: 899,
    currentPrice: 494,
    discount: "45% OFF",
    imageClass: "",
    image: "https://vectorseek.com/wp-content/uploads/2023/09/Goibibo-Logo-Vector.svg-.png",
    category: "Beach Destinations",
    duration: "Week (4-7 days)",
  },
  {
    id: "2",
    title: "IndiGo Airlines",
    description:
      "10% off + 10kg extra baggage",
    originalPrice: 1299,
    currentPrice: 584,
    discount: "55% OFF",
    imageClass: "bg-gradient-to-br from-green-400 to-teal-600",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQ-kLKzM2sjd7pKVOjmaETC2tEDkZjlokSigLroQYAoW0PiHlQ-8wwvfDrB7KEprB2tvg&usqp=CAU",
    category: "Mountain Retreats",
    duration: "Extended (8+ days)",
  },
  {
    id: "3",
    title: "SpiceJet Airlines",
    description:
      "Students belonging to a recognized university will get up to 10% discount on base fare",
    originalPrice: 799,
    currentPrice: 519,
    discount: "35% OFF",
    imageClass: "bg-gradient-to-br from-yellow-400 to-orange-600",
    image: "/assets/logos/SpiceJet_logo.png",
    category: "City Breaks",
    duration: "Weekend (2-3 days)",
  },
  {
    id: "4",
    title: "Air India",
    description:
    "Students can enjoy up to 25%* off on Air India flights!",
    originalPrice: 1899,
    currentPrice: 759,
    discount: "60% OFF",
    imageClass: "bg-gradient-to-br from-purple-400 to-indigo-600",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f7/Air_India.svg",
    category: "Luxury Travel",
    duration: "Extended (8+ days)",
  },
];

const categories = [
  "All Categories",
  "Beach Destinations",
  "Mountain Retreats",
  "City Breaks",
  "Adventure Tours",
  "Luxury Travel",
];

const priceRanges = ["Price Range", "Under $500", "$500 - $1000", "$1000+"];
const durations = [
  "Duration",
  "Weekend (2-3 days)",
  "Week (4-7 days)",
  "Extended (8+ days)",
];

const HeroSection: React.FC = () => (
  <section className="py-16 mt-40 bg-gradient-to-br from-gray-900 via-black to-gray-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h1 className="text-5xl lg:text-7xl font-bold leading-tight bg-gradient-to-r from-orange-400 via-pink-500 to-orange-400 bg-clip-text text-transparent">
            EXPLORE <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-orange-400 bg-clip-text text-transparent">THE WORLD WITH US</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-lg">
            Search for the cheapest airline tickets to any destination around the globe. Track and compare the best deals for flights, hotels, and complete vacation packages.
          </p>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center space-x-2 text-gray-300 hover:text-orange-400 transition-colors">
              <Truck className="w-6 h-6 text-orange-400" />
              <span>Best Price Guarantee</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-300 hover:text-orange-400 transition-colors">
              <Shield className="w-6 h-6 text-orange-400" />
              <span>24/7 Support</span>
            </div>
          </div>
          <button className="bg-gradient-to-r from-orange-500 to-pink-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-orange-600 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-orange-500/25">
            Discover Deals Now
          </button>
        </div>
        <div className="relative w-[450px] h-[450px] min-w-[250px] min-h-[250px] rounded-full overflow-hidden border-4 border-orange-500 shadow-lg shadow-orange-500/50 animate-[pulse_2s_infinite]">
          <img
            src="https://images.pexels.com/photos/2187634/pexels-photo-2187634.jpeg?auto=compress&w=800&q=80"
            alt="Aerial photography of cliff near ocean"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      </div>
    </div>
  </section>
);

type FilterBarProps = {
  category: string;
  setCategory: (val: string) => void;
  price: string;
  setPrice: (val: string) => void;
  duration: string;
  setDuration: (val: string) => void;
  filterProducts: () => void;
  productCount: number;
};

const FilterBar: React.FC<FilterBarProps> = ({
  category,
  setCategory,
  price,
  setPrice,
  duration,
  setDuration,
  filterProducts,
  productCount,
}) => (
  <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-4 mb-8 shadow-lg">
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex flex-wrap gap-4">
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            filterProducts();
          }}
          className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-full text-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
            filterProducts();
          }}
          className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-full text-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          {priceRanges.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
        <select
          value={duration}
          onChange={(e) => {
            setDuration(e.target.value);
            filterProducts();
          }}
          className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-full text-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          {durations.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>
      <div className="text-sm text-gray-400">
        Showing <span>{productCount}</span> deals
      </div>
    </div>
  </div>
);

type ProductCardProps = {
  product: Product;
  added: boolean;
  handleAddToCart: (id: string) => void;
};

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  added,
  handleAddToCart,
}) => {
  const { isAuthenticated, isLoading } = useKindeBrowserClient();
  const { isVerified } = useUserVerification();
  const router = useRouter();
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // 3-stage click handler
  const handleGetDiscount = () => {
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
    <>
      <div className="product-card bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl hover:border-orange-500/50 transition-all duration-300 transform hover:-translate-y-2">
        <div className="relative h-48 overflow-hidden">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            className="w-full h-48 object-contain"
          />
          <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm px-3 py-1 rounded-full font-medium">
            {product.discount}
          </div>
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            <button className="p-2 bg-gray-800/80 rounded-full shadow-lg hover:bg-gradient-to-r hover:from-orange-500 hover:to-pink-600 transition-all opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 duration-300">
              <Heart className="w-5 h-5 text-gray-300 hover:text-white" />
            </button>
            <button className="p-2 bg-gray-800/80 rounded-full shadow-lg hover:bg-gradient-to-r hover:from-orange-500 hover:to-pink-600 transition-all opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 duration-300 delay-75">
              <Eye className="w-5 h-5 text-gray-300 hover:text-white" />
            </button>
          </div>
          <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
            <button
              onClick={handleGetDiscount}
              className={`bg-gradient-to-r ${added ? "from-green-500 to-emerald-500" : "from-orange-500 to-pink-600"} text-white px-6 py-3 rounded-full font-semibold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex items-center space-x-2 shadow-lg`}
            >
              <ShoppingCart className="w-5 h-5" />
              <span>{added ? "Added! ✓" : "Get Discount"}</span>
            </button>
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent mb-2">
            {product.title}
          </h3>
          <p className="text-sm text-gray-400 mb-4 line-clamp-2">{product.description}</p>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
            </div>
          </div>
          <button
            onClick={handleGetDiscount}
            className={`w-full bg-gradient-to-r ${added ? "from-green-500 to-emerald-500" : "from-orange-500 to-pink-600"} text-white py-3 px-4 rounded-xl font-semibold hover:from-orange-600 hover:to-pink-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-orange-500/25`}
          >
            <ShoppingCart className="w-5 h-5" />
            <span>{added ? "Added! ✓" : "Get Discount"}</span>
          </button>
        </div>
      </div>
      {/* Coupon Modal */}
      <Modal isOpen={showCouponModal} onClose={() => setShowCouponModal(false)}>
        {selectedProduct && (
          <div className="flex flex-col items-center text-center p-4">
            <div className="w-full max-w-xs h-40 bg-white rounded-xl flex items-center justify-center mb-4 shadow-lg">
              <img src={selectedProduct.image} alt={selectedProduct.title} style={{ objectFit: 'contain', width: '100%', height: '120px' }} />
            </div>
            <h2 className="text-2xl font-extrabold mb-1 text-gray-100 drop-shadow">{selectedProduct.title} Student Discount</h2>
            <p className="text-lg font-semibold text-pink-400 mb-2">Exclusive Travel Deal</p>
            <div className="w-full border-b border-gray-700 my-3"></div>
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-gray-300 text-sm mr-2">Rate this offer:</span>
              <button className="text-2xl hover:scale-110 transition-transform">👎</button>
              <button className="text-2xl hover:scale-110 transition-transform">👍</button>
            </div>
            <p className="text-gray-400 text-sm mb-2">Enter this code in the promotional code area during checkout to benefit from the student discount.</p>
            <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white font-mono text-xl font-bold py-2 px-4 rounded-lg tracking-wider mb-4">
              TRAVELSTUDENT10
            </div>
            <a href="#" className="mt-5 inline-block bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-bold py-2 px-6 rounded-full shadow-lg transition-all duration-200">
              Visit {selectedProduct.title} website
            </a>
          </div>
        )}
      </Modal>
    </>
  );
};

const ProductsSection: React.FC<{
  products: Product[];
  added: { [id: string]: boolean };
  handleAddToCart: (id: string) => void;
  category: string;
  setCategory: (val: string) => void;
  price: string;
  setPrice: (val: string) => void;
  duration: string;
  setDuration: (val: string) => void;
  filterProducts: () => void;
  productCount: number;
}> = ({
  products,
  added,
  handleAddToCart,
  category,
  setCategory,
  price,
  setPrice,
  duration,
  setDuration,
  filterProducts,
  productCount,
}) => (
  <section className="py-16 bg-gradient-to-b from-black via-gray-900 to-black" id="products">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-400 via-pink-500 to-orange-400 bg-clip-text text-transparent mb-4">
          Featured Travel Deals
        </h2>
        <p className="text-xl bg-gradient-to-r from-orange-300 to-pink-400 bg-clip-text text-transparent max-w-2xl mx-auto">
          Discover our hand-picked selection of premium travel experiences
        </p>
      </div>
      <FilterBar
        category={category}
        setCategory={setCategory}
        price={price}
        setPrice={setPrice}
        duration={duration}
        setDuration={setDuration}
        filterProducts={filterProducts}         // <-- add this
        productCount={productCount}             // <-- and this
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 justify-items-center">
        {products.map((p) => (
          <VerificationGate key={p.id}>
            <ProductCard
              product={p}
              added={!!added[p.id]}
              handleAddToCart={handleAddToCart}
            />
          </VerificationGate>
        ))}
      </div>
    </div>
  </section>
);

export default function LifestylePage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [productCount, setProductCount] = useState(initialProducts.length);
  const [added, setAdded] = useState<{ [id: string]: boolean }>({});
  const [category, setCategory] = useState(categories[0]);
  const [price, setPrice] = useState(priceRanges[0]);
  const [duration, setDuration] = useState(durations[0]);
const [showProductModal, setShowProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [productCodeData, setProductCodeData] = useState<any>(null);
   // Add product click handler with debugging
 const userId=""
  useEffect(() => {
    const interval = setInterval(() => {
      setProducts((prev) =>
        prev.map((p) => {
          const variation = Math.floor(Math.random() * 50) - 25;
          return {
            ...p,
            currentPrice: Math.max(p.currentPrice + variation, 299),
          };
        })
      );
    }, 45000);
    return () => clearInterval(interval);
  }, []);

  const filterProducts = () => {
    let filtered = initialProducts;
    if (category !== "All Categories") {
      filtered = filtered.filter((p) => p.category === category);
    }
    if (price !== "Price Range") {
      if (price === "Under $500") {
        filtered = filtered.filter((p) => p.currentPrice < 500);
      } else if (price === "$500 - $1000") {
        filtered = filtered.filter((p) => p.currentPrice >= 500 && p.currentPrice <= 1000);
      } else if (price === "$1000+") {
        filtered = filtered.filter((p) => p.currentPrice > 1000);
      }
    }
    if (duration !== "Duration") {
      filtered = filtered.filter((p) => p.duration === duration);
    }
    setProducts(filtered);
    setProductCount(filtered.length);

    document.querySelectorAll<HTMLElement>(".product-card").forEach((card) => {
      card.style.transform = "scale(0.95)";
      card.style.opacity = "0.7";
      setTimeout(() => {
        card.style.transform = "scale(1)";
        card.style.opacity = "1";
      }, 200);
    });
  };

  const handleAddToCart = (id: string) => {
    setAdded((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setAdded((prev) => ({ ...prev, [id]: false }));
    }, 2000);
  };

  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>(".product-card");
    const enter = function (this: HTMLElement) {
      this.style.transform = "translateY(-12px)";
    };
    const leave = function (this: HTMLElement) {
      this.style.transform = "translateY(0)";
    };
    cards.forEach((card) => {
      card.addEventListener("mouseenter", enter);
      card.addEventListener("mouseleave", leave);
    });
    return () => {
      cards.forEach((card) => {
        card.removeEventListener("mouseenter", enter);
        card.removeEventListener("mouseleave", leave);
      });
    };
  }, [products]);
const handleProductClick = (product: any) => {
  console.log('Product clicked:', product); // Debug log
  
  // Generate or retrieve product-specific code data
  const codeData = {
    code: `${product.name.replace(/\s+/g, '').slice(0, 8).toUpperCase()}10`,
    isExpired: false,
    timeLeft: null,
    isRevealed: false,
    codeType: 'fixed' // You can make this dynamic based on product
  };
  
  console.log('Generated code data:', codeData); // Debug log
  
  setProductCodeData(codeData);
  setSelectedProduct(product);
  setShowProductModal(true);
  
  console.log('Modal should be open now'); // Debug log
};
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <nav className="bg-gradient-to-r from-gray-900 to-black py-4 px-4 sm:px-6 lg:px-8 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-xl font-bold bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
            <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-pink-600 rounded-full" />
            TravelHub
          </div>
          <div className="hidden md:flex items-center gap-6">
            {categories.slice(1).map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className="text-gray-300 hover:bg-gradient-to-r hover:from-orange-400 hover:to-pink-500 hover:bg-clip-text hover:text-transparent transition-all duration-300"
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2">
              <Search className="w-5 h-5 text-gray-300 hover:text-orange-400 transition-colors" />
            </button>
            <button className="bg-gradient-to-r from-orange-500 to-pink-600 text-white px-4 py-2 rounded-full font-semibold text-sm hover:from-orange-600 hover:to-pink-700 transition-all duration-300">
              Book Now
            </button>
          </div>
        </div>
      </nav>
      <HeroSection />
   <ProductsSection
  products={products}
  added={added}
  handleAddToCart={handleAddToCart}
  category={category}
  setCategory={setCategory}
  price={price}
  setPrice={setPrice}
  duration={duration}
  setDuration={setDuration}
  filterProducts={filterProducts}         // <-- add this
  productCount={productCount}             // <-- and this
/>
<Modal isOpen={showProductModal} onClose={() => setShowProductModal(false)}>
  {selectedProduct && productCodeData ? (
    <div className="relative flex flex-col items-center text-center p-5 w-80 mx-auto bg-gray-900 rounded-2xl shadow-2xl">
      {/* Close Button */}
      <button
        onClick={() => setShowProductModal(false)}
        className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 hover:bg-gray-600 text-white text-lg z-10"
        aria-label="Close"
      >
        ×
      </button>
      {/* Product Image */}
      <div className="w-24 h-20 bg-white rounded-lg flex items-center justify-center mb-3 shadow">
        <Image
          src={selectedProduct.image || selectedProduct.img}
          alt={selectedProduct.name}
          width={80}
          height={60}
          className="object-contain"
        />
      </div>
      {/* Product Name */}
      <h2 className="text-base font-bold text-white mb-1">{selectedProduct.name}</h2>
      {/* Price Row */}
      <div className="flex items-center justify-center gap-2 mb-2">
        {(selectedProduct.originalPrice || selectedProduct.oldPrice) && (
          <span className="text-gray-400 line-through text-xs">
            {selectedProduct.originalPrice || selectedProduct.oldPrice}
          </span>
        )}
        <span className="text-green-400 font-bold text-sm">
          {selectedProduct.price}
        </span>
      </div>
      {/* Discount Info */}
      {(selectedProduct.originalPrice || selectedProduct.oldPrice) && (
        <p className="text-green-400 text-xs font-medium mb-2">
          Save {(() => {
            const old = parseFloat(
              (selectedProduct.originalPrice || selectedProduct.oldPrice).replace(/[^\d.]/g, '')
            );
            const current = parseFloat(
              selectedProduct.price.replace(/[^\d.]/g, '')
            );
            const savings = old - current;
            const percentage = Math.round((savings / old) * 100);
            return `₹${savings.toFixed(0)} (${percentage}% off)`;
          })()}
        </p>
      )}
      {/* Divider */}
      <div className="w-full border-b border-gray-800 my-2"></div>
      {/* Coupon Code Section */}
      <div className="w-full mb-3">
        <p className="text-gray-300 text-xs mb-2">Your student coupon code:</p>
        <RevealCodeButton
          code={productCodeData.code}
          isRevealed={productCodeData.isRevealed}
          brandSlug={selectedProduct.name.replace(/\s+/g, '').toLowerCase()}
          userId={userId}
          codeType={productCodeData.codeType}
        />
      </div>
      {/* Visit Store Button */}
      <a
        href={selectedProduct.url || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 inline-block bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold py-2 px-6 rounded-full shadow-lg transition-all duration-200 text-xs"
      >
        Visit Store
      </a>
    </div>
  ) : (
    <div className="p-4 text-white w-80 mx-auto bg-gray-900 rounded-2xl relative shadow-2xl">
      <p className="text-sm mt-4">Loading...</p>
    </div>
  )}
</Modal>
      
    </div>
  );
}