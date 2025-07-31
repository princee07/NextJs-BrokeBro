"use client";
import React, { useState } from "react";
import { useUserVerification } from "../../../../../hooks/useUserVerification";
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { useParams } from "next/navigation";
import { motion } from 'framer-motion';

// Dummy data for demonstration; in real app, fetch by slug
const flightDeals = {
    indigo: {
        img: "/assets/flight/13.png",
        brand: "IndiGo",
        discount: "15% Off",
        code: "INDIGO15",
        color: "bg-blue-500",
        description: "Save 15% on all IndiGo flights booked via BrokeBro!",
    },
    airindia: {
        img: "/assets/flight/11.png",
        brand: "AirIndia",
        discount: "10% Off",
        code: "AIRINDIA10",
        color: "bg-red-500",
        description: "Get 10% off on AirIndia tickets. Limited time offer!",
    },
    spicejet: {
        img: "/assets/flight/12.png",
        brand: "SpiceJet",
        discount: "20% Off",
        code: "SPICE20",
        color: "bg-purple-600",
        description: "Fly with SpiceJet and enjoy 20% discount exclusively.",
    },
    goibibo: {
        img: "/assets/flight/11.png",
        brand: "Goibibo",
        discount: "18% Off",
        code: "GOIBIBO18",
        color: "bg-orange-500",
        description: "Book via Goibibo and get 18% off instantly!",
    },
};

const FlightDealPage = () => {
    const params = useParams();
    const { flightSlug } = params;
    const [showCode, setShowCode] = useState(false);
    const [copied, setCopied] = useState(false);
    const { isVerified, loading } = useUserVerification();
    const { isAuthenticated } = useKindeBrowserClient();

    const deal = flightDeals[flightSlug as keyof typeof flightDeals];
    if (!deal) {
        return <div className="p-10 text-center text-xl">Flight deal not found.</div>;
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(deal.code);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    // Suggested items (other deals)
    const suggested = Object.entries(flightDeals)
        .filter(([slug]) => slug !== flightSlug)
        .map(([slug, d]) => ({ slug, ...d }));

    return (
        <section className="pt-44 pb-12 bg-gray-50 min-h-screen">
            <div className="max-w-5xl mx-auto flex flex-col gap-8">
                {/* Top Brand Info Row */}
                <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-lg p-8 gap-8 items-center md:items-start">
                    {/* Flight Image - Larger with Zoom */}
                    <div className="flex-shrink-0 flex justify-center items-center overflow-hidden">
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="relative"
                        >
                            <img src={deal.img} alt={deal.brand} className="rounded-3xl object-contain bg-gray-100 shadow-xl w-[320px] h-[320px] md:w-[260px] md:h-[260px]" />
                        </motion.div>
                    </div>
                    {/* Flight Info */}
                    <div className="flex flex-col flex-1 justify-center">
                        <h1 className="text-4xl font-bold mb-2 text-gray-900">{deal.brand} Flight Deal</h1>
                        <div className="mb-2">
                            <span className="block text-gray-700 font-semibold">About {deal.brand}:</span>
                            <span className="block text-gray-800 text-base">{deal.description}</span>
                        </div>
                        <div className="mb-1">
                            <span className="block text-gray-700 font-semibold">Offer:</span>
                            <span className="block text-gray-800">{deal.discount}</span>
                        </div>
                    </div>
                </div>
                {/* Coupon Modal */}
                <div className="bg-white rounded-xl shadow p-6 flex-1 flex flex-col items-center md:items-start">
                    <div className="mb-4 w-full">
                        <span className="block text-gray-700 font-semibold">Discount Offers:</span>
                        <span className="block text-green-600 font-bold">{deal.discount} on {deal.brand} flights</span>
                        {!showCode ? (
                            <>
                                {/* Verification Banner for Unverified Users */}
                                {isAuthenticated && !isVerified && !loading && (
                                    <div className="w-full flex flex-col items-center justify-center py-2 bg-yellow-50 border border-yellow-300 mb-2 rounded-lg">
                                        <span className="text-red-600 font-semibold mb-2 text-center">Please verify your account to reveal the coupon code.</span>
                                        <a
                                            href="/student-verification"
                                            className="inline-block px-6 py-2 bg-gradient-to-r from-orange-400 to-pink-400 text-white rounded-lg font-semibold hover:from-orange-500 hover:to-pink-500 transition"
                                        >
                                            Verify Now
                                        </a>
                                    </div>
                                )}
                                <button
                                    className={`mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition cursor-pointer ${(!isAuthenticated || !isVerified) ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    onClick={() => (isAuthenticated && isVerified) && setShowCode(true)}
                                    disabled={!isAuthenticated || !isVerified || loading}
                                >
                                    Reveal Coupon Code
                                </button>
                                {(!isAuthenticated || !isVerified) && !loading && (
                                    <div className="text-red-500 text-sm mt-2 text-center max-w-xs">
                                        {!isAuthenticated ? 'Please log in to reveal the coupon code.' : 'Please verify your account to reveal the coupon code.'}
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="mt-4 w-full flex items-center justify-between bg-gray-200 py-2 px-4 rounded border border-orange-400">
                                <span className="text-lg font-bold text-orange-700">{deal.code}</span>
                                <button
                                    className="ml-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-1 px-3 rounded transition cursor-pointer"
                                    onClick={handleCopy}
                                >
                                    {copied ? 'Copied!' : 'Copy Code'}
                                </button>
                            </div>
                        )}
                        
                        {/* Terms & Conditions */}
                        <div className="mt-4 w-full">
                            <h3 className="font-bold text-gray-700 mb-1">Terms & Conditions:</h3>
                            <ul className="text-gray-500 text-xs list-disc pl-5 space-y-1">
                                <li>Coupon valid for a limited time only.</li>
                                <li>Applicable only on select flights/routes.</li>
                                <li>Cannot be combined with other offers.</li>
                                <li>See airline website for full details.</li>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* Suggestions */}
                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-2 text-gray-900">You may also like</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {suggested.map((item) => (
                            <a
                                key={item.slug}
                                href={`/lifestyle/flight/${item.slug}`}
                                className="flex flex-col items-center bg-white rounded-xl shadow p-4 hover:scale-105 transition cursor-pointer"
                            >
                                <img src={item.img} alt={item.brand} className="h-20 w-auto object-contain mb-2" />
                                <div className="font-semibold text-center text-[#222]">{item.brand}</div>
                                <div className="text-xs text-center text-gray-500">{item.discount}</div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FlightDealPage;