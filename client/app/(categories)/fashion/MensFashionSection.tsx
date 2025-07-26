"use client";
import React from "react";
import Link from "next/link";
import { mensFashion } from "./data/mensFashionData";

const MensFashionSection: React.FC = () => {
    return (
        <div className="w-full max-w-6xl mx-auto my-12" style={{ marginTop: '8rem', marginBottom: '6rem' }}>
            <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-6 text-[#3D375A]">Men's Fashion</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {mensFashion.map((product, idx) => (
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
    );
};

export default MensFashionSection;
