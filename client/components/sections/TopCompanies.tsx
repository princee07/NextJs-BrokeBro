"use client";

import React, { useRef } from "react";
import Image from "next/image";

const companies = [
  { name: "BrokeBro ", logo: "/assets/internpage/brokebro.png" },
  { name: "Pick n Treat", logo: "/assets/internpage/pnt.png" },
  { name: "Urban pusle innovation pvt.ltd", logo: "/assets/internpage/upi.jpg" },
  { name: "CIIS ", logo: "/assets/internpage/ciis.jpg" },
  { name: "BrokeBro Tech", logo: "/assets/internpage/brokebro.png" },
  // Removed duplicate: { name: "Pick n Treat", logo: "/assets/internpage/pnt.png" },
];

const TopCompanies = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  return (
    <section className="py-16 bg-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="pointer-events-none select-none">
        {/* Dots top left */}
        <div className="absolute top-6 left-8 z-0 opacity-30">
          <svg width="60" height="24" fill="none"><g><circle cx="8" cy="8" r="3" fill="#A78BFA" /><circle cx="28" cy="8" r="3" fill="#A78BFA" /><circle cx="48" cy="8" r="3" fill="#A78BFA" /><circle cx="18" cy="18" r="3" fill="#FBBF24" /><circle cx="38" cy="18" r="3" fill="#FBBF24" /></g></svg>
        </div>
        {/* Squiggle bottom right */}
        <div className="absolute bottom-6 right-8 z-0 opacity-20">
          <svg width="80" height="32" fill="none"><path d="M0,16 Q20,0 40,16 T80,16" stroke="#F472B6" strokeWidth="4" strokeLinecap="round" /></svg>
        </div>
        {/* Hollow circle mid left */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 z-0">
          <div className="w-8 h-8 border-2 border-cyan-400 rounded-full opacity-20" />
        </div>
        {/* Small yellow dot bottom left */}
        <div className="absolute bottom-12 left-20 w-3 h-3 bg-yellow-300 rounded-full opacity-30" />
        {/* Pink arc top right */}
        <div className="absolute top-8 right-24 z-0 opacity-20">
          <svg width="48" height="24" fill="none"><path d="M0,24 A24,24 0 0,1 48,24" stroke="#F472B6" strokeWidth="4" strokeLinecap="round" /></svg>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-3xl font-extrabold text-center mb-2 text-black">
          Top Companies Listing on BrokeBro
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Find jobs and internships with the best companies on BrokeBro.
        </p>
        <div className="overflow-x-auto no-scrollbar scroll-smooth px-2 sm:px-4 md:px-8">
          <div
            ref={scrollRef}
            className="flex gap-4 sm:gap-6 md:gap-8 py-2 min-w-full"
          >
            {companies.map((company) => (
              <div
                key={company.name}
                className="flex-shrink-0 flex flex-col items-center bg-white border border-gray-200 rounded-2xl shadow-md p-4 sm:p-6 w-40 sm:w-48 md:w-56 h-32 justify-center transition-transform hover:scale-105 mx-auto"
                style={{ minWidth: '10rem', maxWidth: '14rem' }}
              >
                <div className="w-20 sm:w-28 h-10 sm:h-14 flex items-center justify-center mb-2">
                  <Image
                    src={company.logo}
                    alt={company.name}
                    width={112}
                    height={56}
                    className="object-contain max-h-14"
                  />
                </div>
                <span className="font-semibold text-gray-800 text-center text-base mt-1">
                  {company.name}
                </span>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
      </div>
    </section>
  );
};

export default TopCompanies; 