"use client";
import React from "react";
import Link from "next/link";
import { womensFashion } from "./data/womensFashionData";

const WomensFashionSection: React.FC = () => {
    return (
        <div className="w-full my-8 md:my-12 bg-gradient-to-br from-[#FFF0F6] to-[#FFFCF7] py-6 md:py-8 px-4 md:px-0 relative overflow-hidden">
            {/* Decorative modal3 image on right side - Hidden on mobile */}
            <img 
                src="/assets/fashion/modal3.png" 
                alt="Modal 3" 
                className="absolute right-0 top-1/2 transform -translate-y-1/2 w-60 h-60 md:w-80 md:h-80 object-contain z-10 hidden lg:block opacity-70" 
            />
            <div className="max-w-6xl mx-auto relative z-20">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-center mb-4 md:mb-6 text-[#3D375A]">Women's Fashion</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                    {womensFashion.map((product, idx) => (
                        <Link
                            key={idx}
                            href={`/fashion/brand/${product.brand.toLowerCase().replace(/\s+/g, "-")}`}
                            className="flex flex-col items-center justify-center p-4 md:p-6 rounded-xl md:rounded-2xl bg-[#FFFCF7] shadow-md transition-transform duration-200 hover:scale-105 cursor-pointer min-h-[180px] md:min-h-[210px] w-full no-underline relative z-30"
                        >
                            <img
                                src={product.image}
                                alt={product.brand}
                                className="h-24 md:h-32 w-auto object-contain mb-3 md:mb-4"
                                style={{ maxHeight: '6rem' }}
                            />
                            <div className="font-bold text-lg md:text-xl lg:text-2xl text-center mb-1 md:mb-2 text-[#222]">{product.brand}</div>
                            <div className="text-sm md:text-base text-center font-medium text-[#222] px-2">{product.offer}</div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};


export default WomensFashionSection;
