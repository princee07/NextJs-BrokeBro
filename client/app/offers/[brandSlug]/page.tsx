"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { offers } from '@/data/offers';
import { useUserVerification } from '@/hooks/useUserVerification';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { motion } from 'framer-motion';

const OfferPage = () => {
    const params = useParams();
    const { brandSlug } = params;
    
    // Helper to create a slug from brand name
    const slugify = (str: string) =>
        str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    
    // Find the offer by slug
    const offer = offers.find((o: any) => slugify(o.brand) === brandSlug);

    if (!offer) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-orange-50 to-pink-50">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-orange-600 mb-2">Offer Not Found</h1>
                    <p className="text-gray-500">Sorry, we couldn't find this offer.</p>
                </div>
            </div>
        );
    }

    // Coupon reveal state
    const [isRevealed, setIsRevealed] = useState(false);
    const [copied, setCopied] = useState(false);
    const { isVerified, loading } = useUserVerification();
    const { isAuthenticated } = useKindeBrowserClient();

    // Suggest 4 other offers (excluding current)
    const suggestions = offers.filter((o: any) => o !== offer).slice(0, 4);

    // Generate coupon code from brand name
    const generateCouponCode = (brand: string) => {
        let codePrefix = brand.replace(/\s+/g, '').replace(/[^A-Za-z0-9]/g, '').toUpperCase();
        if (codePrefix.length < 4) codePrefix = codePrefix.padEnd(4, 'X');
        else if (codePrefix.length > 8) codePrefix = codePrefix.slice(0, 8);
        return `${codePrefix}15`;
    };

    const couponCode = generateCouponCode(offer.brand);

    // Copy handler
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(couponCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch {
            setCopied(false);
        }
    };

    return (
        <section className="pt-44 pb-12 bg-gray-50 min-h-screen">
            <div className="max-w-5xl mx-auto flex flex-col gap-8">
                {/* Top Brand Info Row */}
                <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-lg p-8 gap-8 items-center md:items-start">
                    {/* Product Image - Larger with Zoom */}
                    <div className="flex-shrink-0 flex justify-center items-center overflow-hidden">
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="relative"
                        >
                            <img src={offer.image} alt={offer.title} className="rounded-3xl object-contain bg-gray-100 shadow-xl w-[320px] h-[320px] md:w-[260px] md:h-[260px]" />
                        </motion.div>
                    </div>
                    {/* Product Info */}
                    <div className="flex flex-col flex-1 justify-center">
                        <h1 className="text-4xl font-bold mb-2 text-gray-900">{offer.brand}</h1>
                        <div className="mb-2">
                            <span className="block text-gray-700 font-semibold">About {offer.brand}:</span>
                            <span className="block text-gray-800 text-base">{offer.description || 'No description available.'}</span>
                        </div>
                        <div className="mb-1">
                            <span className="block text-gray-700 font-semibold">Offer:</span>
                            <span className="block text-gray-800">{offer.title}</span>
                        </div>
                        {offer.badge && (
                            <div className="mb-1">
                                <span className="block text-gray-700 font-semibold">Special:</span>
                                <span className="block text-purple-600 font-bold text-sm">{offer.badge}</span>
                            </div>
                        )}
                    </div>
                </div>
                {/* Coupon Modal */}
                <div className="bg-white rounded-xl shadow p-6 flex-1 flex flex-col items-center md:items-start">
                    <div className="mb-4 w-full">
                        <span className="block text-gray-700 font-semibold">Discount Offers:</span>
                        <span className="block text-green-600 font-bold">Get exclusive student discount on {offer.brand}!</span>
                        {!isRevealed ? (
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
                                    onClick={() => (isAuthenticated && isVerified) && setIsRevealed(true)}
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
                                <span className="text-lg font-bold text-orange-700">{couponCode}</span>
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
                                <li>Applicable only on select products/categories.</li>
                                <li>Cannot be combined with other offers.</li>
                                <li>See brand website for full details.</li>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* Suggestions */}
                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-2 text-gray-900">You may also like</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {suggestions.map((s: any) => {
                            const sSlug = slugify(s.brand);

                            return (
                                <a
                                    key={s.brand}
                                    href={`/offers/${sSlug}`}
                                    className="flex flex-col items-center bg-white rounded-xl shadow p-4 hover:scale-105 transition cursor-pointer"
                                >
                                    <img
                                        src={s.image}
                                        alt={s.title}
                                        className="h-20 w-auto object-contain mb-2"
                                    />
                                    <div className="font-semibold text-center text-[#222]">{s.brand}</div>
                                    <div className="text-xs text-center text-gray-500">{s.title}</div>
                                </a>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OfferPage;
