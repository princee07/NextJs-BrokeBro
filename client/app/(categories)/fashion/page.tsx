"use client";
import Image from 'next/image'; // Re-enabled Image component
// import { Heart, PlayCircle, ShoppingCart, Star, Plus } from 'lucide-react'; // Icons removed to fix rendering error
import { useState } from 'react';

const heroImages = [
  "/assets/images/fashion-hero-1.png",
  "/assets/images/fashion-hero-2.png",
  "/assets/images/fashion-hero-3.png",
];

const studentDeals = [
  { id: 1, name: "Classic Hoodie", price: "$25.00", originalPrice: "$50.00", image: "/assets/images/deal-hoodie.png" },
  { id: 2, name: "Ripped Jeans", price: "$30.00", originalPrice: "$60.00", image: "/assets/images/deal-jeans.png" },
  { id: 3, name: "Graphic Tee", price: "$15.00", originalPrice: "$30.00", image: "/assets/images/deal-tee.png" },
  { id: 4, name: "Stylish Sneakers", price: "$40.00", originalPrice: "$80.00", image: "/assets/images/deal-sneakers.png" },
];

const studentBrands = [
    { id: 1, name: "Nike", logo: "/assets/images/brand-nike.png" },
    { id: 2, name: "Adidas", logo: "/assets/images/brand-adidas.png" },
    { id: 3, name: "H&M", logo: "/assets/images/brand-hm.png" },
    { id: 4, name: "Levi's", logo: "/assets/images/brand-levis.png" },
    { id: 5, name: "ASOS", logo: "/assets/images/brand-asos.png" },
];

const FashionPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + heroImages.length) % heroImages.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-indigo-900 text-white overflow-hidden">
      <div className="relative container mx-auto px-4 py-16 pt-32">
        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Side: Image and floating elements */}
          <div className="relative group">
            <div className="absolute top-1/4 -left-10 w-16 h-16 bg-blue-500 rounded-full opacity-40 animate-blob" />
            <div className="absolute top-1/2 -right-10 w-16 h-16 bg-purple-500 rounded-full opacity-40 animate-blob animation-delay-2000" />
            
            <Image
              src={heroImages[currentImageIndex]}
              alt="Fashion Model"
              width={600}
              height={800}
              className="rounded-lg object-cover z-10 relative transition-all duration-300"
              key={currentImageIndex} 
            />

            {/* Image Navigation Buttons */}
            <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-4 z-20">
              <button onClick={handlePrevImage} className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm text-white flex items-center justify-center transform opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/50">
                &#x2190;
              </button>
              <button onClick={handleNextImage} className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm text-white flex items-center justify-center transform opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/50">
                &#x2192;
              </button>
            </div>

            {/* Customer Reaction Card */}
            <div className="absolute top-20 left-0 bg-gray-800/50 backdrop-blur-md p-3 rounded-xl shadow-lg flex items-center gap-3 z-20 animate-fade-in-up">
              <div className="text-sm">
                <p className="font-bold text-white">Customer Reaction</p>
                <div className="flex items-center gap-1 text-yellow-400">
                  <span>★★★★☆</span>
                </div>
              </div>
              <div className="flex items-center justify-center w-10 h-10 bg-blue-500 rounded-full text-white shadow">
                <span>❤</span>
              </div>
            </div>
             {/* Avatars */}
            <div className="absolute bottom-16 -right-5 flex items-center p-2 bg-gray-800/50 backdrop-blur-md rounded-full shadow-lg z-20 animate-fade-in-up animation-delay-400">
               {[-20, -15, -10, 0].map((offset, i) => (
                <Image
                  key={i}
                  src={`https://i.pravatar.cc/40?img=${i + 1}`}
                  alt={`Avatar ${i + 1}`}
                  width={40}
                  height={40}
                  className="rounded-full border-2 border-gray-700"
                  style={{ marginLeft: i !== 0 ? `${offset}px` : '0' }}
                />
              ))}
              <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center border-2 border-gray-700 ml-[-10px] text-white">
                <span>+</span>
              </div>
            </div>
          </div>

          {/* Right Side: Text and CTAs */}
          <div className="relative z-10 text-center lg:text-left">
            <p className="text-indigo-400 font-semibold mb-2 flex items-center justify-center lg:justify-start gap-2">
              Trendy Collection's
              <span className="text-yellow-400">⚡️</span>
            </p>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-4">
              Let's Choose<br />your <span className="text-purple-400">Own Style</span>
            </h1>
            <p className="text-gray-300 mb-8 max-w-md mx-auto lg:mx-0">
              Take your pick of the best and newest Earthy cloth brands and top fashion products.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-indigo-600 text-white font-bold rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105">
                Add To Cart
              </button>
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 text-gray-300 font-semibold hover:text-white transition-colors">
                Play Video
              </button>
            </div>
          </div>
        </div>
      </div>

       {/* Bottom Curved Section */}
       <div className="relative h-48 md:h-64 mt-[-8rem] md:mt-[-10rem]">
         <div className="absolute bottom-0 left-0 w-full h-full bg-gray-900" style={{ clipPath: 'ellipse(100% 55% at 48% 100%)' }}></div>
         <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-4xl flex justify-around items-end gap-4 px-4">
           {/* Category Cards */}
           <div className="text-center group">
              <div className="relative w-32 h-32 md:w-40 md:h-40 bg-blue-500 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <Image src="/assets/images/winter-fashion.png" alt="Winter Fashion" layout="fill" className="object-contain p-4 drop-shadow-lg" />
              </div>
              <p className="mt-2 text-white font-bold text-sm md:text-base">Winter Fashion</p>
           </div>
           <div className="text-center group mb-8">
              <div className="relative w-32 h-32 md:w-40 md-h-40 bg-purple-500 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <Image src="/assets/images/summer-fashion.png" alt="Summer Fashion" layout="fill" className="object-contain p-4 drop-shadow-lg" />
              </div>
              <p className="mt-2 text-white font-bold text-sm md:text-base">Summer Fashion</p>
           </div>
           <div className="text-center group">
              <div className="relative w-32 h-32 md:w-40 md:h-40 bg-teal-500 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <Image src="/assets/images/man-fashion.png" alt="Man Fashion" layout="fill" className="object-contain p-4 drop-shadow-lg" />
              </div>
              <p className="mt-2 text-white font-bold text-sm md:text-base">Man Fashion</p>
           </div>
         </div>
       </div>

       {/* New Student-Focused Sections */}
       <div className="bg-gray-900 py-16">
         <div className="container mx-auto px-4">
           
           {/* Student-Exclusive Deals Section */}
           <div className="mb-16">
             <h2 className="text-3xl font-bold text-center mb-2 animate-fade-in-up">Student-Exclusive Deals</h2>
             <p className="text-center text-indigo-400 mb-8 animate-fade-in-up animation-delay-200">Up to 50% off for verified students!</p>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
               {studentDeals.map((deal, i) => (
                 <div key={deal.id} className={`bg-gray-800 rounded-lg overflow-hidden group transform transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-fade-in-up`} style={{ animationDelay: `${i * 120}ms` }}>
                   <div className="relative">
                     <Image src={deal.image} alt={deal.name} width={400} height={400} className="object-cover w-full h-64 group-hover:scale-110 transition-transform duration-300"/>
                     <div className="absolute top-2 left-2 bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded">Student Deal</div>
                   </div>
                   <div className="p-4">
                     <h3 className="font-bold">{deal.name}</h3>
                     <div className="flex items-baseline gap-2 mt-1">
                       <p className="text-xl text-purple-400 font-bold">{deal.price}</p>
                       <p className="text-sm text-gray-500 line-through">{deal.originalPrice}</p>
                     </div>
                   </div>
                 </div>
               ))}
             </div>
           </div>

           {/* Top Brands for Students Section */}
           <div>
             <h2 className="text-3xl font-bold text-center mb-8 animate-fade-in-up">Top Brands for Students</h2>
             <div className="flex flex-wrap justify-center items-center gap-8">
               {studentBrands.map((brand, i) => (
                 <div key={brand.id} className={`p-4 bg-gray-800 rounded-lg flex items-center justify-center w-32 h-20 grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110 hover:shadow-xl animate-fade-in-up`} style={{ animationDelay: `${i * 100}ms` }}>
                   <Image src={brand.logo} alt={brand.name} width={100} height={40} className="object-contain"/>
                 </div>
               ))}
             </div>
           </div>

         </div>
       </div>
    </div>
  );
};

export default FashionPage;
