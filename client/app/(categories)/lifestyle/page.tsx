
"use client";
import React from "react";
import { useRouter } from "next/navigation";
import DreamDestinationSection from "./DreamDestinationSection";

const LifestyleHero = () => (
  <section className="relative w-full min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-[#5B5BF6] to-[#7F5CFF] overflow-hidden pb-0">
    <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-between px-6 py-16 mx-auto">
      {/* Left: Text */}
      <div className="flex-1 text-left z-10">
        <h1 className="text-2xl md:text-5xl font-extrabold text-white leading-tight mb-6 drop-shadow-lg mt-18">
          Discover, Experience & Live<br />
          Your Best Life with<br />
          <span className="text-yellow-300">BrokeBro</span>
        </h1>

      </div>
      {/* Right: Image/Decor */}
      <div className="flex-1 flex items-center justify-center relative mt-10 md:mt-0">
        <img
          src="/assets/lifestyle/hero.png"
          alt="Travel Lifestyle"
          className="w-[340px] md:w-[420px] h-auto z-10 drop-shadow-2xl"
        />
        {/* Decorative elements (optional) */}
        <div className="absolute left-0 top-0 w-40 h-40 bg-white/10 rounded-full blur-2xl -z-1" />
        <div className="absolute right-0 bottom-0 w-32 h-32 bg-white/20 rounded-full blur-2xl -z-1" />
      </div>
    </div>
    {/* Curved SVG at the bottom */}
    <div className="absolute left-0 right-0 bottom-0 w-full overflow-hidden leading-none">
      <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-[80px] md:h-[120px]">
        <path d="M0,40 C360,120 1080,0 1440,80 L1440,120 L0,120 Z" fill="#F9F9F6" />
      </svg>
    </div>
  </section>
);


const LifestylePage = () => {
  return (
    <main className="bg-[#F9F9F6] min-h-screen w-full">
      <LifestyleHero />

      {/* Example: Light theme section below hero */}
      <section className="w-full py-12 px-4 md:px-0 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-[#3D375A] mb-8 text-center">Top Flight Deals</h2>
          <FlightDealsSection />
        </div>
      </section>
      {/* Add more light theme sections as needed */}
    </main>
  );
};

const flightDeals = [
  {
    slug: "indigo",
    img: "/assets/flight/13.png",
    alt: "IndiGo",
    discount: "15% Off",
    discountColor: "bg-blue-500",
    brand: "IndiGo",
  },
  {
    slug: "airindia",
    img: "/assets/flight/11.png",
    alt: "AirIndia",
    discount: "10% Off",
    discountColor: "bg-red-500",
    brand: "AirIndia",
  },
  {
    slug: "spicejet",
    img: "/assets/flight/12.png",
    alt: "SpiceJet",
    discount: "20% Off",
    discountColor: "bg-purple-600",
    brand: "SpiceJet",
  },
  {
    slug: "goibibo",
    img: "/assets/flight/11.png",
    alt: "GoIbibo",
    discount: "18% Off",
    discountColor: "bg-orange-500",
    brand: "Goibibo",
  },
];

function FlightDealsSection() {
  const router = useRouter();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {flightDeals.map((deal) => (
        <div
          key={deal.slug}
          className="relative bg-[#F9F9F6] rounded-2xl shadow-lg p-0 flex flex-col items-center overflow-hidden group min-h-[270px] cursor-pointer hover:shadow-xl transition-shadow duration-300"
          onClick={() => router.push(`/lifestyle/flight/${deal.slug}`)}
        >
          <img
            src={deal.img}
            alt={deal.alt}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className={`absolute top-3 left-3 ${deal.discountColor} text-white text-xs font-bold px-3 py-1 rounded-full shadow`}>
            {deal.discount}
          </div>
          <div className="w-full p-4 flex flex-col items-center">
            <div className="font-semibold text-[#222] text-center text-lg">{deal.brand}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default LifestylePage;
