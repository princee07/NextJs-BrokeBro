"use client";
import Image from 'next/image';
import { useState } from 'react';
import { FaHeart, FaRegHeart, FaTshirt, FaShoePrints, FaTags, FaRunning, FaFire } from 'react-icons/fa';
import { MdOutlineCategory } from 'react-icons/md';
import { motion, RepeatType } from 'framer-motion';

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
    title: 'GET UP TO 50%',
    subtitle: 'For the holiday season',
    img: '/assets/images/fashion-hero-1.png',
    bg: 'bg-yellow-100',
  },
  {
    title: 'GET UP TO 30% OFF SHIRTS',
    img: '/assets/images/fashion-hero-2.png',
    bg: 'bg-blue-100',
  },
];

const newInProducts = [
  { name: 'Nike React Art3mis', price: '$99', oldPrice: '$150', img: '/assets/images/fashion-hero-3.png' },
  { name: 'Blazer Mid Vintage 77', price: '$249', oldPrice: '$300', img: '/assets/images/fashion-hero-4.png' },
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
  banners: { title: string; subtitle: string; img: string; bg: string }[];
  gallery?: { img: string; alt: string }[];
  products: { name: string; price: string; oldPrice?: string; img: string }[];
}> = {
  newin: {
    banners: [
      {
        title: 'New Arrivals',
        subtitle: 'Latest fashion just for you',
        img: '/assets/images/fashion-hero-1.png',
        bg: 'bg-yellow-100',
      },
      {
        title: 'Fresh Styles',
        subtitle: 'Handpicked for you',
        img: '/assets/images/fashion-hero-2.png',
        bg: 'bg-blue-100',
      },
    ],
    gallery: [
      { img: '/assets/images/fashion-hero-3.png', alt: 'Gallery 1' },
      { img: '/assets/images/fashion-hero-4.png', alt: 'Gallery 2' },
    ],
    products: newInProducts,
  },
  clothing: {
    banners: [
      {
        title: 'Clothing Brands',
        subtitle: 'Trendy outfits from top brands',
        img: '/assets/images/fashion-hero-2.png',
        bg: 'bg-blue-100',
      },
      {
        title: 'Premium Fabrics',
        subtitle: 'Feel the difference',
        img: '/assets/images/fashion-hero-1.png',
        bg: 'bg-pink-100',
      },
    ],
    gallery: [
      { img: '/assets/images/fashion-hero-3.png', alt: 'Clothing Gallery 1' },
      { img: '/assets/images/fashion-hero-4.png', alt: 'Clothing Gallery 2' },
    ],
    products: [
      { name: 'Zara Classic Tee', price: '$39', oldPrice: '$49', img: '/assets/images/fashion-hero-3.png' },
      { name: 'H&M Denim Jacket', price: '$89', oldPrice: '$120', img: '/assets/images/fashion-hero-4.png' },
    ],
  },
  shoes: {
    banners: [
      {
        title: 'Shoe Collection',
        subtitle: 'Step up your style',
        img: '/assets/images/sportswear-1.png',
        bg: 'bg-pink-100',
      },
      {
        title: 'Sneaker Drops',
        subtitle: 'Latest releases',
        img: '/assets/images/sportswear-2.png',
        bg: 'bg-yellow-100',
      },
    ],
    gallery: [
      { img: '/assets/images/sportswear-3.png', alt: 'Shoes Gallery 1' },
      { img: '/assets/images/sportswear-4.png', alt: 'Shoes Gallery 2' },
    ],
    products: [
      { name: 'Nike Air Max', price: '$120', oldPrice: '$150', img: '/assets/images/sportswear-1.png' },
      { name: 'Adidas Superstar', price: '$99', oldPrice: '$130', img: '/assets/images/sportswear-2.png' },
    ],
  },
  accessories: {
    banners: [
      {
        title: 'Accessories',
        subtitle: 'Complete your look',
        img: '/assets/images/glasses.png',
        bg: 'bg-green-100',
      },
      {
        title: 'Watches & More',
        subtitle: 'Style in every detail',
        img: '/assets/images/fashion-hero-1.png',
        bg: 'bg-blue-100',
      },
    ],
    gallery: [
      { img: '/assets/images/glasses.png', alt: 'Accessories Gallery 1' },
      { img: '/assets/images/fashion-hero-2.png', alt: 'Accessories Gallery 2' },
    ],
    products: [
      { name: 'Ray-Ban Sunglasses', price: '$150', oldPrice: '$200', img: '/assets/images/glasses.png' },
      { name: 'Fossil Watch', price: '$199', oldPrice: '$250', img: '/assets/images/fashion-hero-1.png' },
    ],
  },
  activewear: {
    banners: [
      {
        title: 'ActiveWear',
        subtitle: 'Gear up for action',
        img: '/assets/images/sportswear-3.png',
        bg: 'bg-purple-100',
      },
      {
        title: 'Performance Gear',
        subtitle: 'Move with confidence',
        img: '/assets/images/sportswear-4.png',
        bg: 'bg-pink-100',
      },
    ],
    gallery: [
      { img: '/assets/images/sportswear-1.png', alt: 'Activewear Gallery 1' },
      { img: '/assets/images/sportswear-2.png', alt: 'Activewear Gallery 2' },
    ],
    products: sportsWear,
  },
  outlet: {
    banners: [
      {
        title: 'Outlet Deals',
        subtitle: 'Best prices, limited time',
        img: '/assets/images/fashion-hero-4.png',
        bg: 'bg-gray-100',
      },
      {
        title: 'Clearance',
        subtitle: 'Last chance offers',
        img: '/assets/images/fashion-hero-3.png',
        bg: 'bg-yellow-100',
      },
    ],
    gallery: [
      { img: '/assets/images/sportswear-4.png', alt: 'Outlet Gallery 1' },
      { img: '/assets/images/fashion-hero-2.png', alt: 'Outlet Gallery 2' },
    ],
    products: [
      { name: 'Clearance Tee', price: '$19', oldPrice: '$39', img: '/assets/images/fashion-hero-3.png' },
      { name: 'Outlet Sneakers', price: '$49', oldPrice: '$99', img: '/assets/images/sportswear-4.png' },
    ],
  },
};

const FashionPage = () => {
  const [selectedGender, setSelectedGender] = useState('women');
  const [selectedCategory, setSelectedCategory] = useState('newin');
  const [favourites, setFavourites] = useState<Record<string, boolean>>({});

  const toggleFav = (name: string) => {
    setFavourites((prev) => ({ ...prev, [name]: !prev[name] }));
  };

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

      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full flex flex-col items-center justify-center px-2 mb-10 z-10"
      >
        <div className="w-full max-w-6xl rounded-[2.5rem] bg-gradient-to-r from-pink-200 via-purple-200 to-blue-100 shadow-2xl p-12 relative overflow-hidden flex flex-col md:flex-row items-center gap-8">
          {/* Decorative images left */}
          <motion.div
            className="hidden md:block absolute left-0 top-0 w-44 h-44 z-0"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Image src="/assets/images/fashion-hero-1.png" alt="Decor Left" width={176} height={176} className="object-contain opacity-80 drop-shadow-2xl" />
          </motion.div>
          {/* Main Banner Content */}
          <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4 tracking-tight" style={{ letterSpacing: '0.04em' }}>DISCOUNTS UP TO 50% FROM<br />ANSWEAR CLUB ORIGINAL GOODS</h1>
            <div className="text-lg md:text-2xl text-gray-700 font-semibold mb-2">PROMOCODE: <span className="font-bold text-black">10030</span></div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="mt-4 px-10 py-4 bg-black text-white rounded-full font-semibold shadow hover:bg-gray-800 transition text-xl"
            >Shop now</motion.button>
          </div>
          {/* Decorative images right */}
          <motion.div
            className="hidden md:block absolute right-0 top-0 w-44 h-44 z-0"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Image src="/assets/images/fashion-hero-2.png" alt="Decor Right" width={176} height={176} className="object-contain opacity-80 drop-shadow-2xl" />
          </motion.div>
          {/* Animated Glasses */}
          <motion.div
            className="absolute left-1/2 bottom-0 -translate-x-1/2 z-10"
            animate={{ y: [0, -16, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Image src="/assets/images/glasses.png" alt="Glasses" width={60} height={32} className="object-contain" />
          </motion.div>
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
          <input
            type="text"
            placeholder="Search for items, brands and inspiration..."
            className="flex-1 bg-transparent px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-400 text-gray-700 placeholder-gray-400"
            style={{ minWidth: 0 }}
          />
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
                className={`rounded-3xl p-14 flex items-center gap-12 shadow-2xl bg-gradient-to-r from-slate-800/80 via-indigo-900/80 to-gray-900/80 relative min-h-[220px]`}
              >
                <div>
                  <h3 className="text-2xl font-bold text-indigo-100 mb-1 drop-shadow-lg">{banner.title}</h3>
                  {banner.subtitle && <p className="text-indigo-300 text-sm font-medium drop-shadow">{banner.subtitle}</p>}
                </div>
                <div className="flex-1 flex justify-end">
                  <Image src={banner.img} alt={banner.title} width={200} height={200} className="object-contain rounded-2xl drop-shadow-2xl scale-110 bg-gray-900/40 p-2" />
                </div>
              </motion.div>
            ))}
          </div>
          {/* Category-specific Gallery */}
          {categoryLayouts[selectedCategory].gallery && (
            <div className="flex flex-wrap gap-10 justify-center my-10">
              {categoryLayouts[selectedCategory].gallery!.map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i, duration: 0.6 }}
                  className="rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-slate-900 via-gray-900 to-indigo-900"
                >
                  <Image src={img.img} alt={img.alt} width={320} height={220} className="object-contain bg-gray-900/40 p-2" />
                </motion.div>
              ))}
            </div>
          )}
          {/* Category-specific Products */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {categoryLayouts[selectedCategory].products.map((prod: any, i: number) => (
              <motion.div
                key={i}
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
            ))}
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
