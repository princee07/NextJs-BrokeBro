"use client";

import React, { useState, useEffect } from "react";
import { useUserStore } from '@/store/useUserStore';
import { useUserVerification } from '@/hooks/useUserVerification';
import StudentVerification from '@/components/auth/StudentVerification';

const bannerAds = [
	{
		imageUrl: "/assets/banners/Biba.png",
		title: "Biba Fashion Sale",
		description: "Trendy ethnic wear with exclusive student discounts up to 40% off.",
		ctaText: "Shop Now",
		ctaLink: "https://www.biba.in",
	},
	{
		imageUrl: "/assets/banners/soxytoes.png",
		title: "Soxytoes Comfort",
		description: "Premium socks and comfort wear with 20% student discount.",
		ctaText: "Get Discount",
		ctaLink: "https://soxytoes.com",
	},
	{
		imageUrl: "/assets/banners/swissbeauty.png",
		title: "Swiss Beauty",
		description: "Professional makeup and beauty products at student-friendly prices.",
		ctaText: "Explore",
		ctaLink: "https://www.swissbeauty.in",
	},
	{
		imageUrl: "/assets/banners/clove.png",
		title: "Clove Dental",
		description: "Affordable dental care and oral health solutions for students.",
		ctaText: "Book Now",
		ctaLink: "https://clove.co.in",
	},
	{
		imageUrl: "/assets/banners/hkvitals.png",
		title: "HK Vitals Wellness",
		description: "Health supplements and wellness products with student offers.",
		ctaText: "Shop Health",
		ctaLink: "https://www.hkvitals.com",
	},
	{
		imageUrl: "/assets/banners/jewelry.png",
		title: "Premium Jewelry",
		description: "Elegant jewelry collection with special student pricing and deals.",
		ctaText: "View Collection",
		ctaLink: "#",
	},
	{
		imageUrl: "/assets/banners/glued.png",
		title: "Glued Tech",
		description: "Latest tech gadgets and accessories with exclusive student discounts.",
		ctaText: "Discover",
		ctaLink: "https://glued.in",
	},
];


const BannerSection = () => {
	const [current, setCurrent] = useState(0);
	const [showVerificationModal, setShowVerificationModal] = useState(false);
	const isLoggedIn = useUserStore((state) => state.isLoggedIn);
	const { isVerified } = useUserVerification();
	const SIGNUP_URL = "https://brokebro.kinde.com/auth/cx/_:nav&m:register&psid:0198098f4886f8128ed90644dc82ce2c&state:v1_c30d040703023ec39763be7ee5d368d288014e81edde51afea729e9fcdc83bded66eeb85979bf82f855dfe6d4b5a45699e833b5f353f052de6f3b2da4d90327e109e666a452e21086adc6a4bc3a6406ca4777d6696aeb5ca230baa9596ec09ae498278194289681f946120df643138146277d8233b27a09367d61de2633d5fc3e3d313b1c2b34368f260906490cb7e1f530ed9c125bc4bfc8b";

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrent((prev) => (prev + 1) % bannerAds.length);
		}, 4000);
		return () => clearInterval(interval);
	}, []);

	// Handler for Get Discount and similar CTA buttons
	const handleBannerClick = (ad: typeof bannerAds[number]) => {
		if (ad.ctaText && ad.ctaText.toLowerCase().includes('discount')) {
			if (!isLoggedIn) {
				window.location.href = SIGNUP_URL;
				return;
			}
			if (!isVerified) {
				setShowVerificationModal(true);
				return;
			}
		}
		// Only open link if verified or not a discount CTA
		window.open(ad.ctaLink, '_blank', 'noopener,noreferrer');
	};

	return (
		<>
			<section className="w-screen max-w-none py-0 md:py-0 bg-black/95 relative overflow-hidden backdrop-blur-sm shadow-xl min-h-[140px] md:min-h-[220px] flex items-center justify-center">
				<div className="absolute inset-0 pointer-events-none">
					<div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black"></div>
					<div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
					<div className="absolute bottom-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
					<div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-20 blur-2xl bg-gradient-to-br from-purple-700 to-pink-600"></div>
					<div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full opacity-10 blur-3xl bg-gradient-to-br from-blue-700 to-teal-500"></div>
				</div>
				<div className="relative w-screen max-w-none flex flex-col gap-6 z-10 min-h-[140px] md:min-h-[220px] justify-center items-center">
					{bannerAds.map((ad, idx) => (
						<div
							key={idx}
							className={`absolute left-0 top-0 w-screen h-full transition-opacity duration-700 ${current === idx ? "opacity-100 z-10" : "opacity-0 z-0"}`}
						>
							<div className="w-full h-full flex items-center justify-center bg-transparent">
								<div className="flex items-center gap-8 px-8 md:px-16 max-w-7xl mx-auto">
									<div className="flex-1 text-center md:text-left">
										<h2 className="text-2xl md:text-4xl font-bold text-white mb-2">
											{ad.title}
										</h2>
										<p className="text-gray-300 text-sm md:text-lg mb-4">
											{ad.description}
										</p>
										{ad.ctaText && ad.ctaText.toLowerCase().includes('discount') ? (
											<button
												onClick={() => handleBannerClick(ad)}
												className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition-colors font-medium"
											>
												{ad.ctaText}
											</button>
										) : (
											<a
												href={ad.ctaLink}
												target="_blank"
												rel="noopener noreferrer"
												className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition-colors font-medium"
											>
												{ad.ctaText}
											</a>
										)}
									</div>
									{ad.imageUrl && (
										<div className="hidden md:block flex-shrink-0">
											<img
												src={ad.imageUrl}
												alt={ad.title}
												className="w-32 h-32 object-contain rounded-lg"
											/>
										</div>
									)}
								</div>
							</div>
						</div>
					))}
					{/* Indicators */}
					<div className="flex justify-center mt-4 space-x-2 relative z-20">
						{bannerAds.map((_, idx) => (
							<button
								key={idx}
								onClick={() => setCurrent(idx)}
								className={`w-3 h-3 rounded-full ${current === idx ? "bg-white" : "bg-gray-500"} transition-all`}
								aria-label={`Go to banner ${idx + 1}`}
							/>
						))}
					</div>
				</div>
			</section>
			<StudentVerification
				isOpen={showVerificationModal}
				onClose={() => setShowVerificationModal(false)}
				onVerificationComplete={() => setShowVerificationModal(false)}
			/>
		</>
	);
};

export default BannerSection;