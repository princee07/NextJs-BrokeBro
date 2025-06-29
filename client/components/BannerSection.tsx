"use client";

import React from "react";
import BannerAd from "./BannerAd";

const bannerAds = [
	{
		imageUrl:
			"https://soxytoes.com/cdn/shop/files/Theme_1A_Website.png?v=1697116566&width=2000",
		title: "Student Discounts",
		description: "Unlock exclusive student offers on top brands.",
		ctaText: "Get Started",
		ctaLink: "https://www.myunidays.com/IN/en-IN",
	},
	{
		imageUrl:
			"https://soxytoes.com/cdn/shop/files/Theme_3_Website.png?v=1697116591&width=2000",
		title: "Big Sale on Laptops!",
		description: "Up to 40% off for students. Limited time only.",
		ctaText: "Shop Now",
		ctaLink: "/categories/technology",
	},
	{
		imageUrl:
			"https://soxytoes.com/cdn/shop/files/Theme_2A_Website.png?v=1697116587&width=2000",
		title: "Refer & Earn",
		description: "Invite friends and earn exclusive rewards.",
		ctaText: "Invite Now",
		ctaLink: "/refer",
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
