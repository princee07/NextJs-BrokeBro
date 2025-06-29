"use client";

import React from "react";
import { MdClose } from "react-icons/md";

interface ModalAdProps {
    imageUrl: string;
    linkUrl?: string;
    onClose?: () => void;
    className?: string; // Allow custom className for positioning
}

const ModalAd: React.FC<ModalAdProps> = ({ imageUrl, linkUrl, onClose, className = "absolute left-1/2 -translate-x-1/2 mt-2 z-50" }) => {
    return (
        <div className={className + " flex items-center justify-center"}>
            <div className="relative bg-white rounded-lg shadow-lg overflow-hidden max-w-xs md:max-w-md w-full border border-gray-200">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white z-10"
                    aria-label="Close modal ad"
                >
                    <MdClose className="text-xl" />
                </button>
                {linkUrl ? (
                    <a href={linkUrl} target="_blank" rel="noopener noreferrer">
                        <img src={imageUrl} alt="Ad" className="block w-full h-auto max-h-48 object-contain" />
                    </a>
                ) : (
                    <img src={imageUrl} alt="Ad" className="block w-full h-auto max-h-48 object-contain" />
                )}
            </div>
        </div>
    );
};

export default ModalAd;
