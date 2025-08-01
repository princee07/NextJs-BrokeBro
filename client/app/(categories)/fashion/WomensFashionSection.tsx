"use client";
import React from "react";
import Link from "next/link";
import { womensFashion } from "./data/womensFashionData";

const WomensFashionSection: React.FC = () => {
    return (
        <div className="w-full max-w-6xl mx-auto my-8 md:my-12 px-4 md:px-0" style={{ marginTop: '4rem', marginBottom: '4rem' }}>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-center mb-4 md:mb-6 text-[#3D375A]">Women's Fashion</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                {womensFashion.map((product, idx) => (
                    <Link
                        key={idx}
                        href={`/fashion/brand/${product.brand.toLowerCase().replace(/\s+/g, "-")}`}
                        className="flex flex-col items-center justify-center p-4 md:p-6 rounded-xl md:rounded-2xl bg-[#FFFCF7] shadow-md transition-transform duration-200 hover:scale-105 cursor-pointer min-h-[180px] md:min-h-[210px] w-full no-underline"
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
    );
};

export default WomensFashionSection;
