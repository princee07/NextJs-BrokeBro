"use client"

import React, { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import Link from "next/link";
import Image from 'next/image';

interface BannerAdProps {
  imageUrl?: string;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  bgColor?: string;
  onClose?: () => void;
  fullWidthImage?: boolean;
}

const BannerAd: React.FC<BannerAdProps> = ({
  imageUrl,
  title,
  description,
  ctaText,
  ctaLink,
  bgColor = "bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-700",
  onClose,
  fullWidthImage = false,
}) => {
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
    if (onClose) onClose();
  };

  if (!visible) return null;

  return (
    <div
      className={`relative w-full h-full flex items-center justify-center px-0 md:px-0 py-0 md:py-0 shadow-lg ${fullWidthImage ? "" : "rounded-lg"
        } ${bgColor} text-white mb-4 animate-fadeIn overflow-hidden`}
      style={{ minHeight: 180 }}
    >
      {fullWidthImage && imageUrl && (
        <Image
          src={imageUrl}
          alt="Banner Ad"
          fill
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{ minHeight: 180 }}
          priority
        />
      )}
      {/* Only show close button, remove all other content */}
      <button
        onClick={handleClose}
        className="absolute top-3 right-3 p-2 rounded-full bg-black/40 hover:bg-black/60 transition z-20"
        aria-label="Close banner ad"
      >
        <MdClose className="text-xl md:text-2xl text-white" />
      </button>
    </div>
  );
};

export default BannerAd;