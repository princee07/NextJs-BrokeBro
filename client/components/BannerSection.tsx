"use client";

import React from "react";
import BannerAd from "./BannerAd";

const bannerAds = [
	{
		imageUrl: "/assets/banners/Biba.png",
		title: "Biba Festive Sale",
		description: "Flat 30% off on ethnic wear for students.",
		ctaText: "Shop Biba",
		ctaLink: "https://www.biba.in/",
	},
	{
		imageUrl: "/assets/banners/clove.png",
		title: "Clove Exclusive",
		description: "Get 20% off on all Clove products.",
		ctaText: "Shop Clove",
		ctaLink: "https://www.clove.com/",
	},
	{
		imageUrl: "/assets/banners/glued.png",
		title: "Glued Gaming Arena",
		description: "Special student entry offers at Glued.",
		ctaText: "Book Now",
		ctaLink: "https://www.glued.in/",
	},
	{
		imageUrl: "/assets/banners/hkvitals.png",
		title: "HK Vitals Health",
		description: "Up to 25% off on supplements for students.",
		ctaText: "Explore HK Vitals",
		ctaLink: "https://www.hkvitals.com/",
	},
	{
		imageUrl: "/assets/banners/jewelry.png",
		title: "Jewelry Bonanza",
		description: "Flat 15% off on select jewelry brands.",
		ctaText: "Shop Jewelry",
		ctaLink: "https://www.jewelry.com/",
	},
	{
		imageUrl: "/assets/banners/soxytoes.png",
		title: "Soxytoes Socks",
		description: "Buy 2 get 1 free on Soxytoes socks.",
		ctaText: "Shop Soxytoes",
		ctaLink: "https://soxytoes.com/",
	},
	{
		imageUrl: "/assets/banners/swissbeauty.png",
		title: "Swiss Beauty",
		description: "Exclusive 18% off for students on Swiss Beauty.",
		ctaText: "Shop Swiss Beauty",
		ctaLink: "https://www.swissbeauty.in/",
	},
];

const BannerSection = () => {
	return (
		<section className="w-full py-6 md:py-10 bg-black/95 relative overflow-hidden backdrop-blur-sm shadow-xl">
			<div className="absolute inset-0">
				<div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black"></div>
				<div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
				<div className="absolute bottom-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
				<div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-20 blur-2xl bg-gradient-to-br from-purple-700 to-pink-600"></div>
				<div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full opacity-10 blur-3xl bg-gradient-to-br from-blue-700 to-teal-500"></div>
			</div>
			<div className="container mx-auto px-4 flex flex-col gap-6 relative z-10">
				{bannerAds.map((ad, idx) => (
					<BannerAd
						key={idx}
						imageUrl={ad.imageUrl}
						title={ad.title}
						description={ad.description}
						ctaText={ad.ctaText}
						ctaLink={ad.ctaLink}
						bgColor="bg-transparent"
						fullWidthImage
					/>
				))}
			</div>
		</section>
	);
};

export default BannerSection;
