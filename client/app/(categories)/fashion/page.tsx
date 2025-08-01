
"use client";
import React from "react";
import Image from "next/image";
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
    <div className="min-h-screen bg-[#FFFCF7] w-full flex flex-col items-center mt-[120px] md:mt-[140px] relative overflow-x-hidden">
      {/* Decorative Elements - Left Side - Hidden on mobile */}
      <svg className="absolute left-0 top-16 w-16 h-16 md:w-24 md:h-24 text-pink-300 opacity-40 hidden sm:block" fill="none" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" />
      </svg>
      <div className="absolute left-4 md:left-8 top-32 md:top-40 w-6 h-6 md:w-8 md:h-8 bg-yellow-300 rounded-full opacity-30 hidden sm:block" />
      <svg className="absolute left-8 md:left-16 top-56 md:top-72 w-12 h-6 md:w-16 md:h-8 text-purple-300 opacity-30 hidden sm:block" fill="none" viewBox="0 0 60 30">
        <path d="M0,30 A30,30 0 0,1 60,30" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      </svg>

      {/* Bag images on left side - Responsive sizing and positioning */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 z-20 hidden lg:block" style={{ width: '18vw', maxWidth: 200 }}>
        <Image
          src="/assets/fashion/bags.png"
          alt="Bag"
          width={200}
          height={200}
          style={{ width: '100%', height: 'auto', aspectRatio: '1/1' }}
          sizes="(max-width: 1024px) 120px, 18vw"
          priority
        />
      </div>
      <div
        className="absolute left-1 md:left-2 top-40 md:top-58 z-30 hidden lg:block"
        style={{
          width: 'clamp(100px, 18vw, 220px)',
          maxWidth: '220px',
          minWidth: '100px',
          aspectRatio: '4/5',
        }}
      >
        <Image
          src="/assets/fashion/bags.png"
          alt="Modal 1"
          width={220}
          height={275}
          style={{ width: '100%', height: 'auto', aspectRatio: '4/5' }}
          sizes="(max-width: 600px) 100px, (max-width: 1024px) 140px, 18vw"
          priority
        />
      </div>

      {/* Decorative Elements - Right Side - Hidden on mobile */}
      <svg className="absolute right-0 top-20 md:top-24 w-16 h-16 md:w-20 md:h-20 text-blue-200 opacity-30 hidden sm:block" fill="none" viewBox="0 0 80 80">
        <rect x="10" y="10" width="60" height="60" rx="16" stroke="currentColor" strokeWidth="6" />
      </svg>
      <div className="absolute right-4 md:right-8 top-48 md:top-56 w-4 h-4 md:w-6 md:h-6 bg-pink-400 rounded-full opacity-30 hidden sm:block" />
      <svg className="absolute right-8 md:right-16 top-64 md:top-80 w-10 h-10 md:w-12 md:h-12 text-green-300 opacity-30 hidden sm:block" fill="none" viewBox="0 0 48 48">
        <polygon points="24,4 44,44 4,44" stroke="currentColor" strokeWidth="4" fill="none" />
      </svg>

      {/* Right side images - Responsive sizing and positioning */}
      <div className="absolute right-0 top-2/3 -translate-y-1/2 z-10 hidden lg:block" style={{ width: 'clamp(80px, 18vw, 200px)', aspectRatio: '1/1' }}>
        <Image
          src="/assets/fashion/modal2.png"
          alt="Element"
          width={200}
          height={200}
          style={{ width: '100%', height: 'auto', aspectRatio: '1/1' }}
          sizes="(max-width: 600px) 80px, (max-width: 1024px) 120px, 18vw"
          priority
        />
      </div>
      {/* <div className="absolute right-16 md:right-32 top-24 md:top-32 z-30 hidden lg:block" style={{ width: 'clamp(100px, 25vw, 300px)', aspectRatio: '1/1' }}>
        <Image
          src="/assets/fashion/modal2.png"
          alt="Modal 2"
          width={300}
          height={300}
          style={{ width: '100%', height: 'auto', aspectRatio: '1/1' }}
          sizes="(max-width: 600px) 100px, (max-width: 1024px) 180px, 25vw"
          priority
        />
      </div> */}
      <div className="absolute right-4 md:right-10 top-2/3 z-20 opacity-80 hidden lg:block" style={{ width: 'clamp(60px, 15vw, 160px)', aspectRatio: '1/1' }}>
        <Image
          src="/assets/fashion/modal2.png"
          alt="Modal 2"
          width={160}
          height={160}
          style={{ width: '100%', height: 'auto', aspectRatio: '1/1' }}
          sizes="(max-width: 600px) 60px, (max-width: 1024px) 100px, 15vw"
          priority
        />
      </div>
      <div className="absolute left-1/2 top-1/2 z-10 opacity-60 hidden lg:block" style={{ width: 'clamp(40px, 10vw, 120px)', aspectRatio: '1/1' }}>
        <Image
          src="/assets/fashion/modal2.png"
          alt="Modal 2"
          width={120}
          height={120}
          style={{ width: '100%', height: 'auto', aspectRatio: '1/1' }}
          sizes="(max-width: 600px) 40px, (max-width: 1024px) 80px, 10vw"
          priority
        />
      </div>

      <div className="flex flex-col items-center py-4 md:py-8 w-full px-2 md:px-4">
        <div className="w-full max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-5 auto-rows-[120px] md:auto-rows-[140px] lg:auto-rows-[180px]">
          {heroCards.map((card, idx) => {
            // Use card.image for all types, fallback to a default ad image if missing
            const bgImage = card.image || '/assets/fashion/ad-default.png';
            return (
              <div
                key={idx}
                className={`group rounded-xl md:rounded-2xl relative overflow-hidden shadow-lg cursor-pointer transition-transform hover:scale-105 flex items-center justify-center ${card.colSpan} ${card.rowSpan}`}
                style={{ background: `url('${bgImage}') center/cover no-repeat` }}
                onClick={() => handleCardClick(card, idx)}
              >
                <div className="absolute inset-0 bg-black/10" />
                <div className="relative z-10 w-full h-full flex flex-col justify-center items-center p-2 md:p-4">
                  {/* Overlay text/icons for each card type */}
                  {card.type === 'banner' && (
                    <>
                      {card.icon && <span className="absolute left-2 md:left-4 top-2 md:top-4 text-xl md:text-3xl">⚡</span>}
                      <span className="font-extrabold text-lg md:text-2xl lg:text-3xl text-black text-center drop-shadow-lg group-hover:opacity-100 opacity-0 transition-opacity duration-300">{card.text}</span>
                      {card.icon && <span className="absolute right-2 md:right-4 bottom-2 md:bottom-4 text-xl md:text-3xl">⚡</span>}
                    </>
                  )}
                  {card.type === 'card' && (
                    <>
                      <div className="font-bold text-sm md:text-lg lg:text-xl mb-1 text-black drop-shadow-lg text-center w-full group-hover:opacity-100 opacity-0 transition-opacity duration-300">{card.title}</div>
                      <div className="text-xs md:text-sm lg:text-base text-black text-center w-full group-hover:opacity-100 opacity-0 transition-opacity duration-300">{card.subtitle}</div>
                    </>
                  )}
                  {card.type === 'image' && card.alt && (
                    <span className="text-black font-semibold text-sm md:text-lg text-center drop-shadow-lg w-full group-hover:opacity-100 opacity-0 transition-opacity duration-300">{card.alt}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>


      </div>
      <CategorySection />
      <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-center mt-4 mb-6 md:mb-8 text-[#3D375A] px-4">Our Products</h2>
      <ProductSection />
      <div id="mens-fashion-section">
        <MensFashionSection />
      </div>
      <div id="womengallerysection" className="w-full max-w-6xl mx-auto my-8 md:my-12 px-4 md:px-0" style={{ marginTop: '4rem', marginBottom: '4rem' }}>
        <WomensFashionSection />
      </div>
      <div id="beauty-section">
        <BeautySection />
      </div>
    </div>
  );
};

export default FashionHero;
