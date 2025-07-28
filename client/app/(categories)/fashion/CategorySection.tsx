"use client";
import React from "react";
import { useClickTracker } from "@/hooks/useClickTracker";

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
    const { trackClick } = useClickTracker();

    const handleCategoryClick = (category: any, index: number) => {
        trackClick('category', `category-${category.label}-${index}`, {
            // Basic category info
            label: category.label,
            image: category.image,
            category: 'fashion',
            type: 'category-image',
            
            // Category styling
            bg: category.bg,
            textColor: category.text,
            
            // Position and layout info
            position: `category_position_${index}`,
            categoryIndex: index,
            totalCategories: categories.length,
            
            // Category-specific metadata
            categoryType: category.label.includes('Women') ? 'womens' :
                         category.label.includes('Men') ? 'mens' :
                         category.label.includes('Fashion') ? 'general-fashion' : 'other',
            
            // Image details
            imageAlt: category.label,
            imageFile: category.image.split('/').pop(),
            imagePath: category.image,
            
            // Layout specifications
            width: '500px',
            height: '400px',
            minWidth: '400px',
            maxWidth: '600px',
            
            // Tags for filtering
            tags: [
                'category-section',
                'fashion',
                category.label.toLowerCase().replace(/\s+/g, '-'),
                ...(category.label.includes('Women') ? ['womens', 'gallery'] : []),
                ...(category.label.includes('Fashion') ? ['general', 'browse'] : [])
            ].filter(Boolean)
        });
    };

    return (
        <div className="w-full bg-[#F3F4F6] py-2 mb-10 flex justify-center">
            <div className="max-w-6xl w-full flex flex-row justify-center items-center gap-0 rounded-3xl">
                {categories.map((cat, idx) => (
                    <div key={idx} className="flex items-center justify-center" style={{ minWidth: 400, maxWidth: 600, marginLeft: '-16px', marginRight: '-16px' }}>
                        <img
                            src={cat.image}
                            alt={cat.label}
                            className="h-[400px] w-[500px] object-contain cursor-pointer transition-transform duration-300 hover:scale-105"
                            onClick={() => handleCategoryClick(cat, idx)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategorySection;
