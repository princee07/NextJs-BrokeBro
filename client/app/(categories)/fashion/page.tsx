
"use client";
import React from "react";
import CategorySection from "./CategorySection";
import ProductSection from "./ProductSection";
import MensFashionSection from "./MensFashionSection";
import WomensFashionSection from "./WomensFashionSection";
import BeautySection from "./BeautySection";
import { useClickTracker } from "@/hooks/useClickTracker";

const heroCards = [
  {
    type: "banner",
    text: "GET UP TO 50% OFF",
    bg: "bg-[#B6E3F4]",
    textColor: "text-black",
    icon: true,
    colSpan: "col-span-2",
    rowSpan: "row-span-1",
  },
  {
    type: "card",
    title: "Winter Weekends",
    subtitle: "Keep it casual",
    bg: "bg-[#E6D6F7]",
    textColor: "text-black",
    image: "/assets/fashion/ad1.png",
    colSpan: "col-span-1",
    rowSpan: "row-span-2",
  },
  {
    type: "image",
    image: "/assets/fashion/ad2.png",
    alt: "Adidas Originals LXCON 94 trainers in white",
    bg: "bg-white",
    colSpan: "col-span-1",
    rowSpan: "row-span-1",
  },
  {
    type: "image",
    image: "/assets/fashion/ad3.png",
    alt: "Lightweight super skinny joggers in light khaki",
    bg: "bg-white",
    colSpan: "col-span-1",
    rowSpan: "row-span-1",
  },
  {
    type: "image",
    image: "/assets/fashion/ad4.png",
    alt: "Scarf Model",
    bg: "bg-white",
    colSpan: "col-span-1",
    rowSpan: "row-span-1",
  },
  {
    type: "image",
    image: "/assets/fashion/nike.png",
    alt: "Sneakers",
    bg: "bg-white",
    colSpan: "col-span-1",
    rowSpan: "row-span-1",
  },
  {
    type: "card",
    title: "New-In Knitwear",
    subtitle: "Layers. On. Layers.",
    bg: "bg-[#FFF3B2]",
    textColor: "text-black",
    image: "/assets/fashion/biba.png",
    colSpan: "col-span-1",
    rowSpan: "row-span-1",
  },
  {
    type: "card",
    title: "New-Season Textures",
    subtitle: "",
    bg: "bg-[#F7C6D9]",
    textColor: "text-black",
    image: "/assets/fashion/ad5.png",
    colSpan: "col-span-1",
    rowSpan: "row-span-1",
  },
];

const FashionHero: React.FC = () => {
  const { trackClick } = useClickTracker();

  const handleCardClick = (card: any, index: number) => {
    const cardIdentifier = card.type === 'banner' 
      ? `banner-${index}`
      : card.type === 'card' 
        ? `card-${card.title || index}`
        : `image-${card.alt || index}`;

    trackClick('hero', cardIdentifier, {
      // Basic card info
      title: card.title || card.text,
      subtitle: card.subtitle,
      image: card.image,
      type: card.type,
      category: 'fashion',
      
      // Card styling and layout
      bg: card.bg,
      textColor: card.textColor,
      icon: card.icon,
      colSpan: card.colSpan,
      rowSpan: card.rowSpan,
      alt: card.alt,
      
      // Position and context
      position: `hero_position_${index}`,
      cardSize: `${card.colSpan}_${card.rowSpan}`,
      
      // Additional metadata based on card type
      ...(card.type === 'banner' && {
        bannerText: card.text,
        bannerType: 'promotional',
        hasLightningIcon: card.icon,
      }),
      
      ...(card.type === 'card' && {
        cardTitle: card.title,
        cardSubtitle: card.subtitle,
        theme: card.title?.includes('Winter') ? 'seasonal' : 
               card.title?.includes('Knitwear') ? 'clothing' :
               card.title?.includes('Textures') ? 'material' : 'general'
      }),
      
      ...(card.type === 'image' && {
        imageAlt: card.alt,
        productType: card.alt?.includes('shoes') ? 'footwear' :
                    card.alt?.includes('trainers') ? 'sports' :
                    card.alt?.includes('joggers') ? 'activewear' :
                    card.alt?.includes('Scarf') ? 'accessories' : 'unknown'
      }),
      
      // Tags for categorization
      tags: [
        'hero-section',
        'fashion',
        card.type,
        ...(card.title ? [card.title.toLowerCase().replace(/\s+/g, '-')] : []),
        ...(card.alt ? [card.alt.toLowerCase().replace(/\s+/g, '-')] : [])
      ].filter(Boolean)
    });
  };

  return (
    <div className="min-h-screen bg-[#FFFCF7] w-full flex flex-col items-center mt-[140px] relative">
      {/* Bag image on left of hero section */}
      <img src="/assets/fashion/bag.png" alt="Bag" className="absolute left-0 top-1/2 transform -translate-y-1/2 w-52 h-52 object-contain z-20" />
      {/* Decorative Elements - Left Side */}
      <svg className="absolute left-0 top-16 w-24 h-24 text-pink-300 opacity-40" fill="none" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" />
      </svg>
      <div className="absolute left-8 top-40 w-8 h-8 bg-yellow-300 rounded-full opacity-30" />
      <svg className="absolute left-16 top-72 w-16 h-8 text-purple-300 opacity-30" fill="none" viewBox="0 0 60 30">
        <path d="M0,30 A30,30 0 0,1 60,30" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      </svg>
      {/* Bag image on left */}
      <img src="/assets/fashion/bag.png" alt="Bag" className="absolute left-4 top-1/2 transform -translate-y-1/2 w-52 h-52 object-contain z-10" />

      {/* Decorative Elements - Right Side */}
      <svg className="absolute right-0 top-24 w-20 h-20 text-blue-200 opacity-30" fill="none" viewBox="0 0 80 80">
        <rect x="10" y="10" width="60" height="60" rx="16" stroke="currentColor" strokeWidth="6" />
      </svg>
      <div className="absolute right-8 top-56 w-6 h-6 bg-pink-400 rounded-full opacity-30" />
      <svg className="absolute right-16 top-80 w-12 h-12 text-green-300 opacity-30" fill="none" viewBox="0 0 48 48">
        <polygon points="24,4 44,44 4,44" stroke="currentColor" strokeWidth="4" fill="none" />
      </svg>
      {/* e1 image on right */}
      <img src="/assets/fashion/e1.png" alt="Element" className="absolute right-4 top-1/2 transform -translate-y-1/2 w-52 h-52 object-contain z-10" />

      <div className=" flex flex-col items-center py-8 w-full">
        <div className="w-full max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-5 auto-rows-[140px] md:auto-rows-[180px]">
          {heroCards.map((card, idx) => {
            // Use card.image for all types, fallback to a default ad image if missing
            const bgImage = card.image || '/assets/fashion/ad-default.png';
            return (
              <div
                key={idx}
                className={`rounded-2xl relative overflow-hidden shadow-lg cursor-pointer transition-transform hover:scale-105 flex items-center justify-center ${card.colSpan} ${card.rowSpan}`}
                style={{ background: `url('${bgImage}') center/cover no-repeat` }}
                onClick={() => handleCardClick(card, idx)}
              >
                <div className="absolute inset-0 bg-black/10" />
                <div className="relative z-10 w-full h-full flex flex-col justify-center items-center p-4">
                  {/* Overlay text/icons for each card type */}
                  {card.type === 'banner' && (
                    <>
                      {card.icon && <span className="absolute left-4 top-4 text-3xl">⚡</span>}
                      <span className="font-extrabold text-2xl md:text-3xl text-black text-center drop-shadow-lg">{card.text}</span>
                      {card.icon && <span className="absolute right-4 bottom-4 text-3xl">⚡</span>}
                    </>
                  )}
                  {card.type === 'card' && (
                    <>
                      <div className="font-bold text-lg md:text-xl mb-1 text-black drop-shadow-lg text-center w-full">{card.title}</div>
                      <div className="text-sm md:text-base opacity-80 text-black text-center w-full">{card.subtitle}</div>
                    </>
                  )}
                  {card.type === 'image' && card.alt && (
                    <span className="text-black font-semibold text-lg text-center drop-shadow-lg w-full">{card.alt}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        {/* Floating Explore Button */}
        <button className="fixed bottom-8 right-8 bg-white text-[#6C1AFF] font-bold px-6 py-3 rounded-full shadow-lg flex items-center gap-2 z-50 border-2 border-[#6C1AFF] hover:bg-[#6C1AFF] hover:text-white transition-all">
          Explore <span className="ml-1">&#8594;</span>
        </button>
      </div>
      <CategorySection />
      <h2 className="text-4xl md:text-5xl font-extrabold text-center mt-4 mb-8 text-[#3D375A]">Our Products</h2>
      <ProductSection />
      <MensFashionSection />
      <WomensFashionSection />
      <BeautySection />
    </div>
  );
};

export default FashionHero;
