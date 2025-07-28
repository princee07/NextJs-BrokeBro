"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { allBrands } from "../brandData";
import { useUserVerification } from "@/hooks/useUserVerification";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

const BrandPage: React.FC = () => {
    const { brandSlug } = useParams();
    const brand = allBrands.find(b => b.slug === brandSlug);
    const [showCode, setShowCode] = useState(false);
    const [copied, setCopied] = useState(false);
    const { isVerified, loading } = useUserVerification();
    const { isAuthenticated } = useKindeBrowserClient();

    if (!brand) return <div className="text-center py-20 text-2xl">Brand not found.</div>;

    const handleCopy = () => {
        navigator.clipboard.writeText(brand.code);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    // Suggest other brands (exclude current)
    const suggestions = allBrands.filter(b => b.slug !== brand.slug).slice(0, 4);

    return (
        <div className="min-h-screen flex flex-col items-center bg-[#F9F9F6] py-16 px-4" style={{ marginTop: '7rem' }}>
            <div className="flex flex-col md:flex-row w-full max-w-6xl gap-10 items-start justify-center">
                {/* Left: Brand Info */}
                <div className="bg-white rounded-2xl shadow-lg p-8 max-w-lg w-full flex flex-col items-center mb-8">
                    <img src={brand.image} alt={brand.brand} className="h-32 w-auto object-contain mb-6" />
                    <h1 className="text-3xl font-bold mb-2 text-[#3D375A]">{brand.brand}</h1>
                    <div className="text-lg mb-4 text-[#222] text-center">{brand.offer}</div>
                    {!showCode ? (
                        <>
                            <button
                                className={`bg-[#6C1AFF] text-white px-6 py-3 rounded-lg font-bold text-lg mb-4 hover:bg-[#4B0FBF] transition ${(!isAuthenticated || !isVerified) ? 'opacity-50 cursor-not-allowed' : ''}`}
                                onClick={() => (isAuthenticated && isVerified) && setShowCode(true)}
                                disabled={!isAuthenticated || !isVerified || loading}
                            >
                                Reveal Coupon Code
                            </button>
                            {(!isAuthenticated || !isVerified) && !loading && (
                                <div className="text-sm text-red-500 mb-2 text-center max-w-xs">
                                    {!isAuthenticated ? 'Please log in to reveal the coupon code.' : 'Please verify your account to reveal the coupon code.'}
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-2xl font-mono bg-[#F3F4F6] px-4 py-2 rounded-lg border border-[#e0e0e0] text-black">{brand.code}</span>
                            <button
                                className="bg-[#FF6C6C] text-white px-3 py-2 rounded-lg font-semibold hover:bg-[#e04a4a] transition"
                                onClick={handleCopy}
                            >
                                {copied ? "Copied!" : "Copy"}
                            </button>
                        </div>
                    )}
                    <div className="text-xs text-gray-500 text-left w-full mt-2">
                        <strong>Terms & Conditions:</strong>
                        <ul className="list-disc ml-5 mt-1">
                            <li>Coupon valid for a limited time only.</li>
                            <li>Applicable only on select products/categories.</li>
                            <li>Cannot be combined with other offers.</li>
                            <li>See brand website for full details.</li>
                        </ul>
                    </div>
                </div>
                {/* Right: Suggestions */}
                <div className="w-full md:w-1/2">
                    <h2 className="text-xl font-bold mb-4 text-[#3D375A]">You may also like</h2>
                    <div className="grid grid-cols-2 gap-6">
                        {suggestions.map(s => (
                            <a
                                key={s.slug}
                                href={`/fashion/brand/${s.slug}`}
                                className="flex flex-col items-center bg-white rounded-xl shadow p-4 hover:scale-105 transition cursor-pointer"
                            >
                                <img src={s.image} alt={s.brand} className="h-20 w-auto object-contain mb-2" />
                                <div className="font-semibold text-center text-[#222]">{s.brand}</div>
                                <div className="text-xs text-center text-gray-500">{s.offer}</div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BrandPage;
