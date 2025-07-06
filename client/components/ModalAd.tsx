"use client";

import React, { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";

interface ModalAdProps {
    onClose?: () => void;
    className?: string; // Allow custom className for positioning
}

const modalAds = [
    {
        imageUrl: "/assets/banners/Biba.png",
        linkUrl: "https://www.biba.in",
        title: "Biba Fashion Sale",
        description: "Up to 40% off on ethnic wear"
    },
    {
        imageUrl: "/assets/banners/soxytoes.png",
        linkUrl: "https://soxytoes.com",
        title: "Soxytoes Comfort",
        description: "20% student discount on premium socks"
    },
    {
        imageUrl: "/assets/banners/swissbeauty.png",
        linkUrl: "https://www.swissbeauty.in",
        title: "Swiss Beauty",
        description: "Professional makeup at student prices"
    },
    {
        imageUrl: "/assets/banners/clove.png",
        linkUrl: "https://clove.co.in",
        title: "Clove Dental",
        description: "Affordable dental care for students"
    },
    {
        imageUrl: "/assets/banners/hkvitals.png",
        linkUrl: "https://www.hkvitals.com",
        title: "HK Vitals",
        description: "Health supplements with student offers"
    },
    {
        imageUrl: "/assets/banners/jewelry.png",
        linkUrl: "#",
        title: "Premium Jewelry",
        description: "Elegant jewelry with special pricing"
    },
    {
        imageUrl: "/assets/banners/glued.png",
        linkUrl: "https://glued.in",
        title: "Glued Tech",
        description: "Latest gadgets with exclusive discounts"
    }
];

const ModalAd: React.FC<ModalAdProps> = ({ onClose, className = "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50" }) => {
    const [currentAdIndex, setCurrentAdIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentAdIndex((prevIndex) => (prevIndex + 1) % modalAds.length);
        }, 5000); // Change ad every 5 seconds

        return () => clearInterval(interval);
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        if (onClose) {
            onClose();
        }
    };

    const currentAd = modalAds[currentAdIndex];

    if (!isVisible) return null;
    return (
        <div className={className + " flex items-center justify-center"}>
            <div className="relative bg-white rounded-xl shadow-2xl overflow-hidden max-w-sm md:max-w-md w-full border border-gray-200 transform transition-all duration-300">
                {/* Close button */}
                <button
                    onClick={handleClose}
                    className="absolute top-3 right-3 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white z-20 transition-colors"
                    aria-label="Close modal ad"
                >
                    <MdClose className="text-xl" />
                </button>
                
                {/* Ad content */}
                {currentAd.linkUrl ? (
                    <a href={currentAd.linkUrl} target="_blank" rel="noopener noreferrer" className="block">
                        <div className="relative">
                            <img 
                                src={currentAd.imageUrl} 
                                alt={currentAd.title} 
                                className="block w-full h-48 md:h-56 object-cover" 
                            />
                            {/* Overlay with title and description */}
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
                                <h3 className="text-white font-bold text-lg mb-1">{currentAd.title}</h3>
                                <p className="text-white/90 text-sm">{currentAd.description}</p>
                            </div>
                        </div>
                    </a>
                ) : (
                    <div className="relative">
                        <img 
                            src={currentAd.imageUrl} 
                            alt={currentAd.title} 
                            className="block w-full h-48 md:h-56 object-cover" 
                        />
                        {/* Overlay with title and description */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
                            <h3 className="text-white font-bold text-lg mb-1">{currentAd.title}</h3>
                            <p className="text-white/90 text-sm">{currentAd.description}</p>
                        </div>
                    </div>
                )}
                
                {/* Ad indicators */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1 z-10">
                    {modalAds.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentAdIndex(index)}
                            className={`w-2 h-2 rounded-full transition-all ${
                                index === currentAdIndex ? 'bg-white' : 'bg-white/50'
                            }`}
                            aria-label={`Go to ad ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ModalAd;
