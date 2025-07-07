"use client";
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart, FaTshirt, FaShoePrints, FaTags, FaRunning, FaFire } from 'react-icons/fa';
import { MdOutlineCategory } from 'react-icons/md';
import { motion, RepeatType } from 'framer-motion';
import VerificationProtectedLink from '@/components/ui/VerificationProtectedLink';
import VerificationGate from '@/components/ui/VerificationGate';

const sidebarCategories = [
  { name: 'New in', icon: <FaFire className="text-orange-400" />, key: 'newin' },
  { name: 'Clothing', icon: <FaTshirt className="text-blue-400" />, key: 'clothing' },
  { name: 'Shoes', icon: <FaShoePrints className="text-pink-400" />, key: 'shoes' },
  { name: 'Accessories', icon: <FaTags className="text-green-400" />, key: 'accessories' },
  { name: 'ActiveWear', icon: <FaRunning className="text-purple-400" />, key: 'activewear' },
  { name: 'Outlet', icon: <MdOutlineCategory className="text-gray-400" />, key: 'outlet' },
];

const banners = [
  {
    title: 'BIBA FASHION',
    subtitle: 'Exclusive ethnic wear collection',
    img: '/assets/banners/Biba.png',
    bg: 'bg-yellow-100',
    url: 'https://track.vcommission.com/click?campaign_id=12553&pub_id=120422'
  },
  {
    title: 'LEVIS PREMIUM',
    subtitle: 'Classic denim & casual wear',
    img: '/assets/levis/336x280.jpg',
    bg: 'bg-blue-100',
    url: 'https://track.vcommission.com/click?campaign_id=11501&pub_id=120422'
  },
  {
    title: 'FASTRACK WATCHES',
    subtitle: 'Style that speaks volumes',
    img: '/assets/fastrack/Fastrack_CPS_Fastrack_Wrist_Takeover_Sale_50%_OFF_on_100+_styles_300x250.jpeg',
    bg: 'bg-red-100',
  },
  {
    title: 'SAMSUNG DEVICES',
    subtitle: 'Latest technology at your fingertips',
    img: '/assets/samsung/Samsung_CPS_Get_Galaxy_S23_FE_avil_benefits_upto_Rs.14399_300x250.jpg',
    bg: 'bg-gray-100',
    url: 'https://track.vcommission.com/click?campaign_id=10211&pub_id=120422'
  },
  {
    title: 'SALTY LIFESTYLE',
    subtitle: 'Trendy accessories for modern living',
    img: '/assets/salty/300x300.jpg',
    bg: 'bg-green-100',
    url: 'https://track.vcommission.com/click?campaign_id=11241&pub_id=120422'
  },
  {
    title: 'CLOVE HEALTHCARE',
    subtitle: 'Premium health & wellness products',
    img: '/assets/clove/336x280d.jpg',
    bg: 'bg-purple-100',
    url: 'https://track.vcommission.com/click?campaign_id=12131&pub_id=120422'
  },
  {
    title: 'SWISS BEAUTY',
    subtitle: 'Beauty products at best prices',
    img: '/assets/banners/swissbeauty.png',
    bg: 'bg-pink-100',
    url: 'https://track.vcommission.com/click?campaign_id=12372&pub_id=120422'
  },
  {
    title: 'LAKME COSMETICS',
    subtitle: 'Professional beauty essentials',
    img: '/assets/lakme/image.png',
    bg: 'bg-rose-100',
  },
  {
    title: 'MOGLIX TOOLS',
    subtitle: 'Professional tools & equipment',
    img: '/assets/moglix/480x320.jpg',
    bg: 'bg-orange-100',
    url: 'https://track.vcommission.com/click?campaign_id=10351&pub_id=120422'
  },
  {
    title: 'SOXYTOES FASHION',
    subtitle: 'Comfort meets style',
    img: '/assets/banners/soxytoes.png',
    bg: 'bg-indigo-100',
  },
];

const newInProducts = [
  { name: 'Biba Ethnic Collection', price: '$99', oldPrice: '$150', img: '/assets/biba/336x280.jpg' },
  { name: 'Levis Premium Denim', price: '$89', oldPrice: '$120', img: '/assets/levis/300x300.png' },
  { name: 'Fastrack Trendy Watches', price: '$65', oldPrice: '$90', img: '/assets/fastrack/Fastrack_CPS_Fastrack_Wrist_Takeover_Sale_50%_OFF_on_100+_styles_250x250.jpeg' },
  { name: 'Samsung Latest Devices', price: '$299', oldPrice: '$399', img: '/assets/samsung/Samsung_CPS_Get_Galaxy_S23_FE_avil_benefits_upto_Rs.14399_250x250.jpg' },
  { name: 'Salty Lifestyle Accessories', price: '$35', oldPrice: '$50', img: '/assets/salty/250x250.jpg' },
  { name: 'Swiss Beauty Essentials', price: '$49', oldPrice: '$70', img: '/assets/banners/swissbeauty.png' },
  { name: 'Lakme Beauty Kit', price: '$65', oldPrice: '$90', img: '/assets/lakme/image2.png' },
  { name: 'Clove Healthcare Products', price: '$55', oldPrice: '$75', img: '/assets/clove/300x250-h.jpg' },
];

const sportsWear = [
  { name: 'Dri-FIT Get Fit', img: '/assets/images/sportswear-1.png', price: '$45' },
  { name: 'Indy-Sports Bra', img: '/assets/images/sportswear-2.png', price: '$30' },
  { name: 'Sportswear Essential', img: '/assets/images/sportswear-3.png', price: '$38' },
  { name: 'Jordan Court-To-Runway', img: '/assets/images/sportswear-4.png', price: '$60' },
];

const genderTabs = [
  { label: 'Women', key: 'women' },
  { label: 'Men', key: 'men' },
];

const blobVariants = {
  animate: {
    scale: [1, 1.1, 1],
    y: [0, 30, 0],
    x: [0, -20, 0],
    transition: { duration: 12, repeat: Infinity, repeatType: 'reverse' as RepeatType }
  }
};

// Add category-specific data
const categoryLayouts: Record<string, {
  banners: { title: string; subtitle: string; img: string; bg: string; url?: string }[];
  gallery?: { img: string; alt: string }[];
  products: { name: string; price: string; oldPrice?: string; img: string }[];
}> = {
  newin: {
    banners: [
      {
        title: 'Biba New Arrivals',
        subtitle: 'Latest ethnic fashion collection',
        img: '/assets/biba/300x2500.jpg',
        bg: 'bg-yellow-100',
        url: 'https://track.vcommission.com/click?campaign_id=12553&pub_id=120422'
      },
      {
        title: 'Fresh Tech Styles',
        subtitle: 'Samsung latest releases',
        img: '/assets/samsung/24318_KV_Ultra_Banner_300x250.jpg',
        bg: 'bg-blue-100',
        url: 'https://track.vcommission.com/click?campaign_id=10211&pub_id=120422'
      },
    ],
    gallery: [
      { img: '/assets/biba/250x250.jpg', alt: 'Biba Fashion' },
      { img: '/assets/levis/300x300.jpg', alt: 'Levis Collection' },
      { img: '/assets/fastrack/Fastrack_CPS_Fastrack_Wrist_Takeover_Sale_50%_OFF_on_100+_styles_250x200.jpeg', alt: 'Fastrack Watches' },
      { img: '/assets/samsung/Samsung_CPS_Get_Galaxy_S23_FE_avil_benefits_upto_Rs.14399_200x200.jpg', alt: 'Samsung Devices' },
      { img: '/assets/salty/200x200.jpg', alt: 'Salty Accessories' },
      { img: '/assets/lakme/image.png', alt: 'Lakme Cosmetics' },
      { img: '/assets/clove/250x250-a.jpg', alt: 'Clove Healthcare' },
      { img: '/assets/moglix/250x250.jpg', alt: 'Moglix Tools' },
    ],
    products: newInProducts,
  },
  clothing: {
    banners: [
      {
        title: 'Biba Ethnic Wear',
        subtitle: 'Traditional meets contemporary',
        img: '/assets/banners/Biba.png',
        bg: 'bg-yellow-100',
        url: 'https://track.vcommission.com/click?campaign_id=12553&pub_id=120422'
      },
      {
        title: 'Levis Premium Denim',
        subtitle: 'Classic fits, modern style',
        img: '/assets/levis/336x280.jpg',
        bg: 'bg-blue-100',
        url: 'https://track.vcommission.com/click?campaign_id=11501&pub_id=120422'
      },
    ],
    gallery: [
      { img: '/assets/biba/336x280.jpg', alt: 'Biba Ethnic Collection' },
      { img: '/assets/levis/300x300.png', alt: 'Levis Denim' },
      { img: '/assets/levis/250x250.jpg', alt: 'Levis Casual' },
      { img: '/assets/biba/200x200.jpg', alt: 'Biba Traditional' },
      { img: '/assets/salty/300x300.jpg', alt: 'Salty Fashion' },
      { img: '/assets/banners/soxytoes.png', alt: 'Soxytoes Collection' },
    ],
    products: [
      { name: 'Biba Ethnic Kurta Set', price: '$89', oldPrice: '$120', img: '/assets/biba/250x250.jpg' },
      { name: 'Levis Classic Jeans', price: '$79', oldPrice: '$99', img: '/assets/levis/300x300.jpg' },
      { name: 'Levis Casual Shirt', price: '$65', oldPrice: '$85', img: '/assets/levis/200x200.jpg' },
      { name: 'Salty Fashion Tee', price: '$39', oldPrice: '$49', img: '/assets/salty/250x250.jpg' },
    ],
  },
  shoes: {
    banners: [
      {
        title: 'Fastrack Footwear',
        subtitle: 'Step up your style game',
        img: '/assets/fastrack/Fastrack_CPS_Fastrack_Wrist_Takeover_Sale_50%_OFF_on_100+_styles_300x250.jpeg',
        bg: 'bg-red-100',
      },
      {
        title: 'Samsung Wearables',
        subtitle: 'Smart shoes and accessories',
        img: '/assets/samsung/24318_KV_Ultra_Banner_250x250.jpg',
        bg: 'bg-gray-100',
        url: 'https://track.vcommission.com/click?campaign_id=10211&pub_id=120422'
      },
    ],
    gallery: [
      { img: '/assets/fastrack/Fastrack_CPS_Fastrack_Wrist_Takeover_Sale_50%_OFF_on_100+_styles_250x250.jpeg', alt: 'Fastrack Shoes' },
      { img: '/assets/salty/300x300.jpg', alt: 'Salty Footwear' },
      { img: '/assets/samsung/Samsung_CPS_Get_Galaxy_S23_FE_avil_benefits_upto_Rs.14399_250x250.jpg', alt: 'Smart Accessories' },
      { img: '/assets/levis/250x250.jpg', alt: 'Levis Casual Shoes' },
    ],
    products: [
      { name: 'Fastrack Casual Shoes', price: '$120', oldPrice: '$150', img: '/assets/fastrack/Fastrack_CPS_Fastrack_Wrist_Takeover_Sale_50%_OFF_on_100+_styles_250x200.jpeg' },
      { name: 'Salty Sport Shoes', price: '$99', oldPrice: '$130', img: '/assets/salty/250x250.jpg' },
      { name: 'Samsung Smart Watch', price: '$199', oldPrice: '$249', img: '/assets/samsung/Samsung_CPS_Get_Galaxy_S23_FE_avil_benefits_upto_Rs.14399_200x200.jpg' },
      { name: 'Levis Canvas Shoes', price: '$89', oldPrice: '$110', img: '/assets/levis/200x200.jpg' },
    ],
  },
  accessories: {
    banners: [
      {
        title: 'Fastrack Accessories',
        subtitle: 'Complete your look',
        img: '/assets/fastrack/Fastrack_CPS_Fastrack_Wrist_Takeover_Sale_50%_OFF_on_100+_styles_300x250.jpeg',
        bg: 'bg-red-100',
      },
      {
        title: 'Salty Lifestyle',
        subtitle: 'Style in every detail',
        img: '/assets/salty/300x300.jpg',
        bg: 'bg-green-100',
        url: 'https://track.vcommission.com/click?campaign_id=11241&pub_id=120422'
      },
    ],
    gallery: [
      { img: '/assets/fastrack/Fastrack_CPS_Fastrack_Wrist_Takeover_Sale_50%_OFF_on_100+_styles_250x250.jpeg', alt: 'Fastrack Watches' },
      { img: '/assets/salty/250x250.jpg', alt: 'Salty Accessories' },
      { img: '/assets/banners/jewelry.png', alt: 'Jewelry Collection' },
      { img: '/assets/banners/soxytoes.png', alt: 'Soxytoes Accessories' },
      { img: '/assets/samsung/24318_KV_Ultra_Banner_200x200.jpg', alt: 'Samsung Accessories' },
      { img: '/assets/clove/300x300-a.jpg', alt: 'Health Accessories' },
    ],
    products: [
      { name: 'Fastrack Premium Watch', price: '$150', oldPrice: '$200', img: '/assets/fastrack/Fastrack_CPS_Fastrack_Wrist_Takeover_Sale_50%_OFF_on_100+_styles_250x250.jpeg' },
      { name: 'Salty Fashion Bag', price: '$89', oldPrice: '$120', img: '/assets/salty/200x200.jpg' },
      { name: 'Samsung Galaxy Buds', price: '$129', oldPrice: '$159', img: '/assets/samsung/24318_KV_Ultra_Banner_160x600.jpg' },
      { name: 'Jewelry Collection', price: '$45', oldPrice: '$60', img: '/assets/banners/jewelry.png' },
    ],
  },
  activewear: {
    banners: [
      {
        title: 'Samsung ActiveWear',
        subtitle: 'Tech-enabled fitness gear',
        img: '/assets/samsung/24318_KV_Ultra_Banner_300x600.jpg',
        bg: 'bg-gray-100',
        url: 'https://track.vcommission.com/click?campaign_id=10211&pub_id=120422'
      },
      {
        title: 'Salty Sport Collection',
        subtitle: 'Move with confidence',
        img: '/assets/salty/468x60.jpg',
        bg: 'bg-green-100',
        url: 'https://track.vcommission.com/click?campaign_id=11241&pub_id=120422'
      },
    ],
    gallery: [
      { img: '/assets/samsung/Samsung_CPS_Get_Galaxy_S23_FE_avil_benefits_upto_Rs.14399_300x250.jpg', alt: 'Samsung Fitness Tech' },
      { img: '/assets/salty/160x600.jpg', alt: 'Salty Activewear' },
      { img: '/assets/clove/300x300-t.jpg', alt: 'Health & Fitness' },
      { img: '/assets/fastrack/Fastrack_CPS_Fastrack_Wrist_Takeover_Sale_50%_OFF_on_100+_styles_250x200.jpeg', alt: 'Fitness Watches' },
    ],
    products: [
      { name: 'Samsung Galaxy Watch', price: '$249', oldPrice: '$299', img: '/assets/samsung/24318_KV_Ultra_Banner_250x250.jpg' },
      { name: 'Salty Sport Gear', price: '$79', oldPrice: '$99', img: '/assets/salty/300x300.jpg' },
      { name: 'Fastrack Fitness Watch', price: '$129', oldPrice: '$159', img: '/assets/fastrack/Fastrack_CPS_Fastrack_Wrist_Takeover_Sale_50%_OFF_on_100+_styles_250x250.jpeg' },
      { name: 'Clove Health Monitor', price: '$89', oldPrice: '$119', img: '/assets/clove/250x250-h.jpg' },
    ],
  },
  outlet: {
    banners: [
      {
        title: 'Outlet Deals',
        subtitle: 'Best prices on top brands',
        img: '/assets/moglix/360x240.jpg',
        bg: 'bg-orange-100',
        url: 'https://track.vcommission.com/click?campaign_id=10351&pub_id=120422'
      },
      {
        title: 'Clearance Sale',
        subtitle: 'Limited time offers',
        img: '/assets/clove/336x280-h.jpg',
        bg: 'bg-purple-100',
        url: 'https://track.vcommission.com/click?campaign_id=12131&pub_id=120422'
      },
    ],
    gallery: [
      { img: '/assets/moglix/300x250.jpg', alt: 'Moglix Outlet' },
      { img: '/assets/clove/300x250-d.jpg', alt: 'Clove Clearance' },
      { img: '/assets/salty/200x200.jpg', alt: 'Salty Outlet' },
      { img: '/assets/levis/200x200.jpg', alt: 'Levis Sale' },
    ],
    products: [
      { name: 'Moglix Tool Set', price: '$49', oldPrice: '$99', img: '/assets/moglix/200x200.jpg' },
      { name: 'Clove Health Kit', price: '$39', oldPrice: '$79', img: '/assets/clove/200x200-a.jpg' },
      { name: 'Salty Clearance Items', price: '$19', oldPrice: '$39', img: '/assets/salty/200x200.jpg' },
      { name: 'Levis Outlet Jeans', price: '$59', oldPrice: '$99', img: '/assets/levis/200x200.jpg' },
    ],
  },
};

const FashionPage = () => {
  const [selectedGender, setSelectedGender] = useState('women');
  const [selectedCategory, setSelectedCategory] = useState('newin');
  const [favourites, setFavourites] = useState<Record<string, boolean>>({});
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleFav = (name: string) => {
    setFavourites((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  // Filter products based on search query
  const filteredProducts = categoryLayouts[selectedCategory].products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Clear search when changing categories
  useEffect(() => {
    setSearchQuery('');
  }, [selectedCategory]);

  // Auto-slide banner effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % banners.length);
    }, 4000); // Change banner every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col pt-64 relative overflow-x-hidden overflow-y-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-indigo-900 transition-colors duration-1000">
      {/* Animated pastel blobs */}
      <motion.div
        className="absolute top-[-120px] left-[-120px] w-[340px] h-[340px] bg-pink-200 rounded-full filter blur-3xl opacity-60 z-0"
        variants={blobVariants}
        animate="animate"
      />
      <motion.div
        className="absolute top-20 right-[-100px] w-[300px] h-[300px] bg-blue-200 rounded-full filter blur-3xl opacity-50 z-0"
        variants={blobVariants}
        animate="animate"
      />
      <motion.div
        className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-purple-200 rounded-full filter blur-3xl opacity-40 z-0"
        variants={blobVariants}
        animate="animate"
      />

      {/* Auto-Sliding Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full flex flex-col items-center justify-center px-2 mb-10 z-10"
      >
        <div className="w-full max-w-6xl rounded-[2.5rem] shadow-2xl relative overflow-hidden min-h-[400px]">
          {/* Background Image - Full Container */}
          <motion.div
            key={`bg-${currentBannerIndex}`}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-0"
          >
            {banners[currentBannerIndex].url ? (
              // Clickable banner with affiliate link
              <a
                href={banners[currentBannerIndex].url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-full cursor-pointer hover:scale-105 transition-transform duration-300"
              >
                <Image
                  src={banners[currentBannerIndex].img}
                  alt={banners[currentBannerIndex].title}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority
                />
                {/* Overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
                {/* Hover indicator for clickable banners */}
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm opacity-0 hover:opacity-100 transition-opacity duration-300">
                  Click to Shop
                </div>
              </a>
            ) : (
              // Non-clickable banner
              <div className="w-full h-full">
                <Image
                  src={banners[currentBannerIndex].img}
                  alt={banners[currentBannerIndex].title}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority
                />
                {/* Overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
              </div>
            )}
          </motion.div>

          {/* Content Overlay */}
          <motion.div
            key={currentBannerIndex}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 flex flex-col justify-center items-start text-left p-12 h-full min-h-[400px]"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight drop-shadow-2xl">
              {banners[currentBannerIndex].title}
            </h1>
            <div className="text-lg md:text-2xl text-white/90 font-semibold mb-6 drop-shadow-lg">
              {banners[currentBannerIndex].subtitle}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="mt-4 px-10 py-4 bg-white text-black rounded-full font-semibold shadow-xl hover:bg-gray-100 transition text-xl"
            >
              Shop now
            </motion.button>
          </motion.div>

          {/* Banner Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentBannerIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${index === currentBannerIndex
                  ? 'bg-gray-800 scale-125'
                  : 'bg-gray-400 hover:bg-gray-600'
                  }`}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Topbar: Gender tabs & search */}
      <div className="w-full flex items-center justify-center px-4 mb-8 z-10">
        <div className="flex items-center w-full max-w-xl bg-white/80 rounded-full border border-pink-300 shadow-inner px-2 py-1">
          <div className="flex gap-2 ml-2">
            {genderTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setSelectedGender(tab.key)}
                className={`px-4 py-1.5 rounded-full font-semibold text-base transition-all shadow-sm ${selectedGender === tab.key ? 'bg-pink-500/90 text-white shadow-lg' : 'bg-white/80 text-gray-700 hover:bg-pink-100'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search for items, brands and inspiration..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-700 placeholder-gray-400"
              style={{ minWidth: 0 }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 w-full max-w-7xl mx-auto mt-6 gap-10 z-10">
        {/* Sidebar */}
        <aside className="w-80 bg-gradient-to-br from-slate-900/90 via-gray-900/80 to-indigo-900/80 rounded-[2.5rem] shadow-2xl p-12 flex flex-col gap-6 h-fit sticky top-32 border border-indigo-800/40">
          <nav className="flex flex-col gap-2">
            {sidebarCategories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`flex items-center gap-4 px-7 py-5 rounded-2xl font-semibold text-xl transition-all ${selectedCategory === cat.key ? 'bg-indigo-800/60 text-indigo-100 shadow-lg' : 'text-indigo-200 hover:bg-indigo-900/40'}`}
              >
                {cat.icon}
                {cat.name}
              </button>
            ))}
          </nav>
        </aside>
        {/* Main Section */}
        <main className="flex-1 flex flex-col gap-10">
          {/* Category-specific Banners */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {categoryLayouts[selectedCategory].banners.map((banner, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i, duration: 0.7 }}
                className={`rounded-3xl p-14 flex items-center gap-12 shadow-2xl bg-gradient-to-r from-slate-800/80 via-indigo-900/80 to-gray-900/80 relative min-h-[220px] group ${banner.url ? 'cursor-pointer hover:scale-105 transition-transform duration-300' : ''}`}
              >
                {banner.url ? (
                  <VerificationProtectedLink
                    href={banner.url}
                    requireVerification={true}
                    className="absolute inset-0 z-10"
                  >
                    <div className="w-full h-full flex items-center gap-12 px-14 cursor-pointer">
                      <div>
                        <h3 className="text-2xl font-bold text-indigo-100 mb-1 drop-shadow-lg">{banner.title}</h3>
                        {banner.subtitle && <p className="text-indigo-300 text-sm font-medium drop-shadow">{banner.subtitle}</p>}
                        <div className="mt-2 text-xs text-indigo-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          Verify & Shop →
                        </div>
                      </div>
                      <div className="flex-1 flex justify-end">
                        <Image src={banner.img} alt={banner.title} width={200} height={200} className="object-contain rounded-2xl drop-shadow-2xl scale-110 bg-gray-900/40 p-2 group-hover:scale-125 transition-transform duration-300" />
                      </div>
                    </div>
                  </VerificationProtectedLink>
                ) : (
                  <>
                    <div>
                      <h3 className="text-2xl font-bold text-indigo-100 mb-1 drop-shadow-lg">{banner.title}</h3>
                      {banner.subtitle && <p className="text-indigo-300 text-sm font-medium drop-shadow">{banner.subtitle}</p>}
                    </div>
                    <div className="flex-1 flex justify-end">
                      <Image src={banner.img} alt={banner.title} width={200} height={200} className="object-contain rounded-2xl drop-shadow-2xl scale-110 bg-gray-900/40 p-2" />
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </div>
          {/* Category-specific Gallery */}
          {categoryLayouts[selectedCategory].gallery && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 my-10">
              {categoryLayouts[selectedCategory].gallery!.map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i, duration: 0.6 }}
                  className="rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-slate-900 via-gray-900 to-indigo-900 hover:scale-105 transition-transform duration-300"
                >
                  <div className="relative w-full h-48">
                    <Image
                      src={img.img}
                      alt={img.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-2 left-2 text-white text-sm font-medium drop-shadow-lg">
                      {img.alt}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
          {/* Category-specific Products */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((prod: any, i: number) => (
                <VerificationGate key={i}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.7 }}
                    className="bg-gradient-to-br from-slate-900/80 via-indigo-900/80 to-gray-900/80 rounded-2xl shadow-xl p-7 flex flex-col items-center relative group transition-all hover:scale-105 hover:shadow-2xl border border-indigo-900/40"
                  >
                    <div className="absolute top-3 right-3 cursor-pointer z-10" onClick={() => toggleFav(prod.name)}>
                      {favourites[prod.name] ? <FaHeart className="text-pink-400 text-xl drop-shadow" /> : <FaRegHeart className="text-gray-300 text-xl" />}
                    </div>
                    <Image src={prod.img} alt={prod.name} width={120} height={120} className="object-contain rounded-xl mb-2 drop-shadow-xl" />
                    <div className="text-center">
                      <h4 className="font-semibold text-indigo-100 text-base mb-1 drop-shadow">{prod.name}</h4>
                      <div className="flex items-center justify-center gap-2">
                        {prod.oldPrice && <span className="text-indigo-400/60 line-through text-sm">{prod.oldPrice}</span>}
                        <span className="text-indigo-100 font-bold text-lg">{prod.price}</span>
                      </div>
                    </div>
                  </motion.div>
                </VerificationGate>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
                <div className="text-6xl mb-4 opacity-30">🔍</div>
                <h3 className="text-2xl font-bold text-indigo-100 mb-2">No products found</h3>
                <p className="text-indigo-300">Try searching with different keywords or browse other categories</p>
              </div>
            )}
          </div>
        </main>
      </div>
      {/* Animations */}
      <style jsx global>{`
        body { background: none !important; }
        /* Hide scrollbar for fashion page only */
        .overflow-y-hidden::-webkit-scrollbar { display: none; }
        .overflow-y-hidden { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default FashionPage;
