"use client";

import React from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { allBrands } from "../brandData";
import { useUserVerification } from "@/hooks/useUserVerification";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { motion } from "framer-motion";

const BrandPage: React.FC = () => {
    const { brandSlug } = useParams();
    const brand = allBrands.find(b => b.slug === brandSlug);
    const [showCoupon, setShowCoupon] = React.useState(false);
    const [copied, setCopied] = React.useState(false);
    const { isVerified, loading } = useUserVerification();
    const { isAuthenticated } = useKindeBrowserClient();

    if (!brand) return <div className="p-8 text-center">Brand not found.</div>;

    // Suggest other brands (exclude current)
    const suggestions = allBrands.filter(b => b.slug !== brandSlug).slice(0, 4);

    return (
        <section className="pt-44 pb-12 bg-gray-50 min-h-screen">
            <div className="max-w-5xl mx-auto flex flex-col gap-8">
                {/* Top Brand Info Row */}
                <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-lg p-8 gap-8 items-center md:items-start">
                    {/* Brand Image - Larger with Zoom */}
                    <div className="flex-shrink-0 flex justify-center items-center overflow-hidden">
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="relative"
                        >
                            <Image src={brand.image} alt={brand.brand} width={320} height={320} className="rounded-3xl object-contain bg-gray-100 shadow-xl w-[320px] h-[320px] md:w-[260px] md:h-[260px]" />
                        </motion.div>
                    </div>
                    {/* Brand Info */}
                    <div className="flex flex-col flex-1 justify-center">
                        <h1 className="text-4xl font-bold mb-2 text-gray-900">{brand.brand}</h1>
                        <div className="mb-2">
                            <span className="block text-gray-700 font-semibold">About {brand.brand}:</span>
                            <span className="block text-gray-800 text-base">{brand.about || "No about info available."}</span>
                        </div>
                        <div className="mb-1">
                            <span className="block text-gray-700 font-semibold">Offer:</span>
                            <span className="block text-gray-800">{brand.offer}</span>
                        </div>
                    </div>
                </div>
                {/* Coupon Modal */}
                <div className="bg-white rounded-xl shadow p-6 flex-1 flex flex-col items-center md:items-start">
                    <div className="mb-4 w-full">
                        <span className="block text-gray-700 font-semibold">Discount Offers:</span>
                        <span className="block text-green-600 font-bold">{brand.discount ? brand.discount : "Get up to 20% off on membership!"}</span>
                        {!showCoupon ? (
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
                                    className={`mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition cursor-pointer ${(!isAuthenticated || !isVerified) ? "opacity-50 cursor-not-allowed" : ""}`}
                                    onClick={() => (isAuthenticated && isVerified) && setShowCoupon(true)}
                                    disabled={!isAuthenticated || !isVerified || loading}
                                >
                                    Reveal Coupon Code
                                </button>
                                {(!isAuthenticated || !isVerified) && !loading && (
                                    <div className="text-red-500 text-sm mt-2 text-center max-w-xs">
                                        {!isAuthenticated ? "Please log in to reveal the coupon code." : "Please verify your account to reveal the coupon code."}
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="mt-4 w-full flex items-center justify-between bg-gray-200 py-2 px-4 rounded border border-orange-400">
                                <span className="text-lg font-bold text-orange-700">{brand.code || "COUPON2025"}</span>
                                <button
                                    className="ml-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-1 px-3 rounded transition cursor-pointer"
                                    onClick={() => {
                                        navigator.clipboard.writeText(brand.code || "COUPON2025");
                                        setCopied(true);
                                        setTimeout(() => setCopied(false), 1500);
                                    }}
                                >
                                    {copied ? "Copied!" : "Copy Code"}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                {/* Suggestions */}
                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-2 text-gray-900">You may also like</h2>
                    <div className="grid grid-cols-2 gap-6">
                        {suggestions.map(s => (
                            <a
                                key={s.slug}
                                href={`/fashion/brand/${s.slug}`}
                                className="flex flex-col items-center bg-white rounded-xl shadow p-4 hover:scale-105 transition cursor-pointer"
                            >
                                <Image src={s.image} alt={s.brand} width={80} height={80} className="h-20 w-auto object-contain mb-2" />
                                <div className="font-semibold text-center text-[#222]">{s.brand}</div>
                                <div className="text-xs text-center text-gray-500">{s.offer}</div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BrandPage;