"use client";

import React, { useRef } from "react";
import Image from "next/image";

const companies = [
  { name: "BrokeBro ", logo: "/assets/internpage/brokebro.png" },
  { name: "Pick n Treat", logo: "/assets/internpage/pnt.png" },
  { name: "Urban pusle innovation pvt.ltd", logo: "/assets/internpage/upi.jpg" },
  { name: "CIIS ", logo: "/assets/internpage/ciis.jpg" },
  { name: "BrokeBro Tech", logo: "/assets/internpage/brokebro.png" },
  { name: "Pick n Treat", logo: "/assets/internpage/pnt.png" },
];

const TopCompanies = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  return (
    <section className="py-16 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-center mb-2 text-white dark:text-white">
          Top Companies Listing on BrokeBro
        </h2>
        <p className="text-center text-gray-400 mb-8">
          Find jobs and internships with the best companies on BrokeBro.
        </p>
        <div className="overflow-x-auto no-scrollbar scroll-smooth">
          <div
            ref={scrollRef}
            className="flex gap-8 py-2 px-2 min-w-full"
          >
            {companies.map((company) => (
              <div
                key={company.name}
                className="flex-shrink-0 flex flex-col items-center bg-gradient-to-br from-[#181c24] to-[#23263a] border border-purple-700/30 rounded-2xl shadow-lg shadow-purple-900/30 p-6 w-48 h-32 justify-center transition-transform hover:scale-105"
              >
                <div className="w-28 h-14 flex items-center justify-center mb-2">
                  <Image
                    src={company.logo}
                    alt={company.name}
                    width={112}
                    height={56}
                    className="object-contain max-h-14"
                  />
                </div>
                <span className="font-semibold text-white text-center text-base mt-1">
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