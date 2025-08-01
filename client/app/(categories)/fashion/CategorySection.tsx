"use client";
import React from "react";
import { useClickTracker } from "@/hooks/useClickTracker";

const categories = [
    {
        label: "shoes",
        bg: "bg-[#3D375A]",
        text: "text-white",
        image: "/assets/fashion/category1.png",
    },
    {
        label: "women gallery",
        bg: "bg-[#5ED6F7]",
        text: "text-black",
        image: "/assets/fashion/category2.png",
    },
    {
        label: "men style",
        bg: "bg-[#FF6C6C]",
        text: "text-white",
        image: "/assets/fashion/category3.png",
    },
    {
        label: "Beauty",
        bg: "bg-[#F7D86C]",
        text: "text-black",
        image: "/assets/fashion/category4.png",
    },
];

const CategorySection: React.FC = () => {
    const { trackClick } = useClickTracker();

    const handleCategoryClick = (category: any, index: number) => {
        const lowerLabel = category.label.toLowerCase();
        // Scroll to BeautySection if label is 'beauty'
        if (lowerLabel === 'beauty') {
            const section = document.getElementById('beauty-section');
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
            return;
        }
        // Scroll to Women Gallery section if label is exactly 'women gallery'
        if (lowerLabel === 'women gallery') {
            const section = document.getElementById('womengallerysection');
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
            return;
        }
        // Scroll to MensFashionSection if label is 'shoes' or 'men style'
        if (lowerLabel === 'shoes' || lowerLabel === 'men style') {
            const section = document.getElementById('mens-fashion-section');
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
            return;
        }
        // If no scroll, always track click
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
        <div className="w-full bg-[#F3F4F6] py-2 md:py-2 mb-6 md:mb-10 flex justify-center overflow-x-hidden">
            <div className="max-w-6xl w-full px-2 md:px-0">
                {/* Mobile View - Vertical Stack */}
                <div className="flex flex-col gap-2 md:hidden">
                    {categories.map((cat, idx) => (
                        <div key={idx} className="flex items-center justify-center w-full">
                            <img
                                src={cat.image}
                                alt={cat.label}
                                className="h-[200px] w-full max-w-[300px] object-contain cursor-pointer transition-transform duration-300 hover:scale-105 rounded-lg"
                                onClick={() => handleCategoryClick(cat, idx)}
                            />
                        </div>
                    ))}
                </div>

                {/* Desktop View - Horizontal Overlap */}
                <div className="hidden md:flex flex-row justify-center items-center gap-0 rounded-3xl">
                    {categories.map((cat, idx) => (
                        <div
                            key={idx}
                            className="flex items-center justify-center"
                            style={{
                                minWidth: 300,
                                maxWidth: 500,
                                marginLeft: idx > 0 ? '-16px' : '0px',
                                marginRight: idx < categories.length - 1 ? '-16px' : '0px'
                            }}
                        >
                            <img
                                src={cat.image}
                                alt={cat.label}
                                className="h-[300px] md:h-[350px] lg:h-[400px] w-[350px] md:w-[400px] lg:w-[500px] object-contain cursor-pointer transition-transform duration-300 hover:scale-105"
                                onClick={() => handleCategoryClick(cat, idx)}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategorySection;
