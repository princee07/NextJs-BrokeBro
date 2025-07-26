
"use client";
import React from "react";
import CategorySection from "./CategorySection";
import ProductSection from "./ProductSection";
import MensFashionSection from "./MensFashionSection";
import WomensFashionSection from "./WomensFashionSection";
import BeautySection from "./BeautySection";

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
    image: "/assets/fashion/levis.png",
    colSpan: "col-span-1",
    rowSpan: "row-span-2",
  },
  {
    type: "image",
    image: "/assets/fashion/shoes1.png",
    alt: "Adidas Originals LXCON 94 trainers in white",
    bg: "bg-white",
    colSpan: "col-span-1",
    rowSpan: "row-span-1",
  },
  {
    type: "image",
    image: "/assets/fashion/shoes2.png",
    alt: "Lightweight super skinny joggers in light khaki",
    bg: "bg-white",
    colSpan: "col-span-1",
    rowSpan: "row-span-1",
  },
  {
    type: "image",
    image: "/assets/fashion/scarf.png",
    alt: "Scarf Model",
    bg: "bg-white",
    colSpan: "col-span-1",
    rowSpan: "row-span-1",
  },
  {
    type: "image",
    image: "/assets/fashion/shoes3.png",
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
    image: "/assets/fashion/textures.png",
    colSpan: "col-span-1",
    rowSpan: "row-span-1",
  },
];

const FashionHero: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FFFCF7] w-full flex flex-col items-center">
      <div className="mt-36 flex flex-col items-center py-8 w-full">
        <div className="w-full max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-5 auto-rows-[140px] md:auto-rows-[180px]">
          {heroCards.map((card, idx) => {
            if (card.type === "banner") {
              return (
                <div key={idx} className={`rounded-2xl flex items-center justify-center font-extrabold text-2xl md:text-3xl ${card.bg} ${card.textColor} ${card.colSpan} ${card.rowSpan} relative overflow-hidden shadow-lg`}>
                  {card.icon && (
                    <span className="absolute left-4 top-4 text-3xl">⚡</span>
                  )}
                  <span className="z-10">{card.text}</span>
                  {card.icon && (
                    <span className="absolute right-4 bottom-4 text-3xl">⚡</span>
                  )}
                </div>
              );
            }
            if (card.type === "card") {
              return (
                <div key={idx} className={`rounded-2xl flex flex-col justify-between p-4 ${card.bg} ${card.textColor} ${card.colSpan} ${card.rowSpan} shadow-lg relative overflow-hidden`}>
                  <div>
                    <div className="font-bold text-lg md:text-xl mb-1">{card.title}</div>
                    <div className="text-sm md:text-base opacity-70">{card.subtitle}</div>
                  </div>
                  {card.image && (
                    <img src={card.image} alt={card.title} className="absolute right-2 bottom-2 w-20 h-20 md:w-24 md:h-24 object-contain" />
                  )}
                </div>
              );
            }
            if (card.type === "image") {
              return (
                <div key={idx} className={`rounded-2xl flex items-center justify-center ${card.bg} ${card.colSpan} ${card.rowSpan} shadow-lg overflow-hidden`}>
                  <img src={card.image} alt={card.alt} className="w-full h-full object-contain" />
                </div>
              );
            }
            return null;
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
