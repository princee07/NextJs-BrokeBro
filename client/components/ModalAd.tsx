"use client";

import React, { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { ShieldCheck } from "lucide-react";
import { useStudentVerification } from "@/hooks/useStudentVerification";
import StudentVerification from "@/components/auth/StudentVerification";

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
    const [showVerificationModal, setShowVerificationModal] = useState(false);
    const [pendingUrl, setPendingUrl] = useState<string>('');

    const { isVerified, updateVerificationStatus } = useStudentVerification();

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

    const handleAdClick = (e: React.MouseEvent, url: string) => {
        e.preventDefault();

        if (!isVerified) {
            // User is not verified, show verification modal
            setPendingUrl(url);
            setShowVerificationModal(true);
        } else {
            // User is verified, proceed to the link
            window.open(url, '_blank', 'noopener,noreferrer');
        }
    };

    const handleVerificationComplete = (verified: boolean) => {
        updateVerificationStatus(verified);
        setShowVerificationModal(false);

        if (verified && pendingUrl) {
            // After verification, proceed with the original action
            setTimeout(() => {
                window.open(pendingUrl, '_blank', 'noopener,noreferrer');
                setPendingUrl('');
            }, 500);
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
                    className="absolute top-1 right-1 p-1 rounded-full bg-black/50 hover:bg-black/70 text-white z-20 transition-colors"
                    aria-label="Close modal ad"
                >
                    <MdClose className="text-sm" />
                </button>

                {/* Ad content */}
                {currentAd.linkUrl && currentAd.linkUrl !== '#' ? (
                    <div
                        onClick={(e) => handleAdClick(e, currentAd.linkUrl)}
                        className="block cursor-pointer relative group"
                    >
                        <div className="relative">
                            <img
                                src={currentAd.imageUrl}
                                alt={currentAd.title}
                                className="block w-full h-24 md:h-28 object-cover group-hover:scale-105 transition-transform duration-300"
                            />

                            {/* Verification Status Overlay */}
                            {!isVerified && (
                                <div className="absolute top-2 right-2 bg-orange-500/90 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                                    <ShieldCheck className="w-3 h-3" />
                                    Verify to Access
                                </div>
                            )}

                            {isVerified && (
                                <div className="absolute top-2 right-2 bg-green-500/90 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                                    <ShieldCheck className="w-3 h-3" />
                                    Verified
                                </div>
                            )}

                            {/* Overlay with title and description */}
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-2">
                                <h3 className="text-white font-bold text-sm mb-0.5">{currentAd.title}</h3>
                                <p className="text-white/90 text-xs">{currentAd.description}</p>
                                <div className="text-white/70 text-xs mt-1">
                                    {isVerified ? 'Click to shop →' : 'Verify student status to access →'}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="relative">
                        <img
                            src={currentAd.imageUrl}
                            alt={currentAd.title}
                            className="block w-full h-24 md:h-28 object-cover"
                        />
                        {/* Overlay with title and description */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-2">
                            <h3 className="text-white font-bold text-sm mb-0.5">{currentAd.title}</h3>
                            <p className="text-white/90 text-xs">{currentAd.description}</p>
                        </div>
                    </div>
                )}

                {/* Ad indicators */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1 z-10">
                    {modalAds.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentAdIndex(index)}
                            className={`w-2 h-2 rounded-full transition-all ${index === currentAdIndex ? 'bg-white' : 'bg-white/50'
                                }`}
                            aria-label={`Go to ad ${index + 1}`}
                        />
                    ))}
                </div>
            </div>

            {/* Student Verification Modal */}
            <StudentVerification
                isOpen={showVerificationModal}
                onClose={() => setShowVerificationModal(false)}
                onVerificationComplete={handleVerificationComplete}
            />
        </div>
    );
};

export default ModalAd;
