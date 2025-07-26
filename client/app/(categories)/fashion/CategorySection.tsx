"use client";
import React from "react";

const categories = [
    {
        label: "Women Gallery",
        bg: "bg-[#3D375A]",
        text: "text-white",
        image: "/assets/fashion/category1.png",
    },
    {
        label: "Fashion",
        bg: "bg-[#5ED6F7]",
        text: "text-black",
        image: "/assets/fashion/category2.png",
    },
    {
        label: "Fashion",
        bg: "bg-[#FF6C6C]",
        text: "text-white",
        image: "/assets/fashion/category3.png",
    },
    {
        label: "Fashion",
        bg: "bg-[#F7D86C]",
        text: "text-black",
        image: "/assets/fashion/category4.png",
    },
];

const CategorySection: React.FC = () => {
    return (
        <div className="w-full bg-[#F3F4F6] py-2 mb-10 flex justify-center">
            <div className="max-w-6xl w-full flex flex-row justify-center items-center gap-0 rounded-3xl">
                {categories.map((cat, idx) => (
                    <div key={idx} className="flex items-center justify-center" style={{ minWidth: 400, maxWidth: 600, marginLeft: '-16px', marginRight: '-16px' }}>
                        <img
                            src={cat.image}
                            alt={cat.label}
                            className="h-[400px] w-[500px] object-contain cursor-pointer transition-transform duration-300 hover:scale-105"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategorySection;
