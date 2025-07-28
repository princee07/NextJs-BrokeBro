"use client";
import React from "react";
import Link from "next/link";
import { useClickTracker } from "@/hooks/useClickTracker";

// Example product data, replace with real data as needed
const products = [
    {
        brand: "AJIO",
        image: "/assets/fashion/ajio.png",
        offer: "Flat 15% Off order value of 999 INR"
    },
    {
        brand: "NIKE",
        image: "/assets/fashion/nike.png",
        offer: "Flat 20% Off on adidas college drops"
    },
    {
        brand: "FAST TRACK",
        image: "/assets/fashion/fastrack.png",
        offer: "Flat 20% Off on adidas college drops"
    },
    {
        brand: "DENIM",
        image: "/assets/fashion/denim.png",
        offer: "12% off"
    },
    {
        brand: "LEVIS",
        image: "/assets/fashion/Levis.png",
        offer: "22% Off"
    },
    {
        brand: "BIBA",
        image: "/assets/fashion/biba.png",
        offer: "22% Off"
    },
    {
        brand: "LAKME SALON",
        image: "/assets/fashion/lakmesalon.png",
        offer: "15% Off"
    },
    {
        brand: "Salty",
        image: "/assets/fashion/salty.png",
        offer: "15% Off Sitewide*"
    },
    {
        brand: "SWISS BEAUTY",
        image: "/assets/fashion/swissbeauty.png",
        offer: "15% Off Sitewide*"
    }
];

const ProductSection: React.FC = () => {
    const { trackClick } = useClickTracker();

    const handleProductClick = (product: any, index: number) => {
        trackClick('product', `product-${product.brand}-${index}`, {
            // Basic product info
            brand: product.brand,
            image: product.image,
            offer: product.offer,
            title: product.brand,
            type: 'product',
            category: 'fashion',
            
            // Additional product details
            productId: `prod_${product.brand.toLowerCase().replace(/\s+/g, '_')}_${index}`,
            position: `grid_position_${index}`,
            availability: 'In Stock',
            
            // Extract discount from offer text
            discount: product.offer.includes('%') ? 
                product.offer.match(/(\d+)%/)?.[1] + '%' : 'N/A',
            
            // Product tags based on brand
            tags: [
                'fashion',
                'brand',
                product.brand.toLowerCase(),
                ...(product.brand.includes('BEAUTY') ? ['beauty', 'cosmetics'] : []),
                ...(product.brand.includes('NIKE') || product.brand.includes('FAST TRACK') ? ['sports', 'accessories'] : []),
                ...(product.brand.includes('LEVIS') || product.brand.includes('DENIM') ? ['clothing', 'apparel'] : [])
            ],
            
            // Card styling info
            colSpan: 'col-span-1',
            rowSpan: 'row-span-1',
            bg: 'bg-white',
            textColor: 'text-black'
        });
    };

    return (
        <div className="w-full bg-[#F9F9F6] py-8 mb-12">
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {products.map((product, idx) => (
                    <Link
                        key={idx}
                        href={`/fashion/brand/${product.brand.toLowerCase().replace(/\s+/g, "-")}`}
                        className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white shadow-md transition-transform duration-200 hover:scale-105 cursor-pointer min-h-[210px] min-w-[240px] no-underline"
                        onClick={() => handleProductClick(product, idx)}
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

export default ProductSection;
