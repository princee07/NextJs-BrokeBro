"use client";
import React from "react";
import Link from "next/link";
import { womensFashion } from "./data/womensFashionData";

const WomensFashionSection: React.FC = () => {
    return (
        <div className="w-full my-12 bg-gradient-to-br from-[#FFF0F6] to-[#FFFCF7] py-8 px-0 relative">
            {/* Decorative modal3 image on right side */}
            <img src="/assets/fashion/modal3.png" alt="Modal 3" className="absolute right-0 top-1/2 transform -translate-y-1/2 w-80 h-80 object-contain z-10" />
            <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-6 text-[#3D375A]">Women's Fashion</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {womensFashion.map((product, idx) => (
                        <Link
                            key={idx}
                            href={`/fashion/brand/${product.brand.toLowerCase().replace(/\s+/g, "-")}`}
                            className="flex flex-col items-center justify-center p-6 rounded-2xl bg-[#FFFCF7] shadow-md transition-transform duration-200 hover:scale-105 cursor-pointer min-h-[210px] min-w-[240px] no-underline"
                        >
                            <img
                                src={product.image}
                                alt={product.brand}
                                className="h-32 w-auto object-contain mb-4"
                                style={{ maxHeight: 128 }}
                            />
                            <div className="font-bold text-2xl text-center mb-2 text-[#222]">{product.brand}</div>
                            <div className="text-base text-center font-medium text-[#222]">{product.offer}</div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WomensFashionSection;
