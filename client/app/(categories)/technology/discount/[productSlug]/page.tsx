"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import featuredProducts, { Product } from '../../featuredProducts';
import { useUserVerification } from '@/hooks/useUserVerification';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';

const ProductDiscountPage = () => {
    const params = useParams();
    // params.productSlug is the dynamic slug from the URL
    const { productSlug } = params;
    // Find the product by slug
    const product = featuredProducts.find((p: Product) =>
        p.name.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9\-]/g, '').toLowerCase() === productSlug
    );

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-orange-50 to-pink-50">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-orange-600 mb-2">Product Not Found</h1>
                    <p className="text-gray-500">Sorry, we couldn't find the discount for this product.</p>
                </div>
            </div>
        );
    }

    // Coupon reveal state
    const [isRevealed, setIsRevealed] = useState(false);
    const [copied, setCopied] = useState(false);
    const { isVerified, loading } = useUserVerification();
    const { isAuthenticated } = useKindeBrowserClient();

    // Suggest 4 other products (excluding current)
    const suggestions = featuredProducts.filter((p: Product) => p !== product).slice(0, 4);

    // Coupon code logic
    const couponCode = product.name.replace(/\s+/g, '').replace(/[^A-Za-z0-9]/g, '').toUpperCase().slice(0, 8) + '10';

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
        <div className="min-h-screen bg-[#faf9f6] flex flex-col items-center pt-40 pb-10 px-2">
            <div className="max-w-4xl w-full flex flex-col gap-8 items-center justify-center">
                {/* Brand About & Description */}
                <div className="flex flex-col md:flex-row bg-[#fcfcfa] rounded-2xl shadow-xl p-8 gap-8 items-center justify-center w-full">
                    <div className="flex-shrink-0 flex justify-center items-center overflow-hidden">
                        <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-44 h-32 object-contain mb-3 rounded-lg" />
                    </div>
                    <div className="flex flex-col flex-1 justify-center items-center md:items-start">
                        <h1 className="text-3xl font-extrabold text-[#39396a] mb-1 text-center md:text-left">{product.name}</h1>
                        <div className="mb-2">
                            <span className="block text-gray-700 font-semibold">About {product.name}:</span>
                            <span className="block text-gray-800 text-base">{product.description || 'No description available.'}</span>
                        </div>
                    </div>
                </div>
                {/* Discount Offer & Coupon Modal */}
                <div className="bg-white rounded-xl shadow p-6 flex-1 flex flex-col items-center justify-center md:items-start w-full">
                    <div className="mb-4 w-full flex flex-col items-center">
                        <span className="block text-gray-700 font-semibold">Discount Offer:</span>
                        <span className="block font-bold text-[#a78bfa] px-4 py-2 rounded-lg mb-2">{product.isSale && product.discount ? `${product.discount}% Off Sitewide*` : 'Exclusive Student Offer*'}</span>
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
                                    className={`bg-[#a78bfa] hover:bg-[#7c3aed] text-white font-bold text-lg px-8 py-3 rounded-lg mb-3 transition-all ${(!isAuthenticated || !isVerified) ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    onClick={() => (isAuthenticated && isVerified) && setIsRevealed(true)}
                                    disabled={!isAuthenticated || !isVerified || loading}
                                >
                                    Reveal Coupon Code
                                </button>
                                {(!isAuthenticated || !isVerified) && !loading && (
                                    <p className="text-red-500 font-medium mb-2">{!isAuthenticated ? 'Please log in to reveal the coupon code.' : 'Please verify your account to reveal the coupon code.'}</p>
                                )}
                            </>
                        ) : (
                            <div className="flex flex-col items-center w-full">
                                <div className="bg-black text-white font-mono text-2xl font-bold py-3 px-8 rounded-lg tracking-wider mb-2 select-all flex items-center justify-between w-full max-w-xs">
                                    <span>{couponCode}</span>
                                    <button
                                        onClick={handleCopy}
                                        className={`ml-4 px-3 py-1 rounded bg-gray-800 text-white text-sm font-semibold border border-gray-700 hover:bg-gray-700 transition-all ${copied ? 'bg-green-600 border-green-700' : ''}`}
                                        title="Copy code"
                                    >
                                        {copied ? 'Copied!' : 'Copy'}
                                    </button>
                                </div>
                            </div>
                        )}
                        <div className="mt-3 text-left w-full max-w-md mx-auto">
                            <h3 className="font-bold text-gray-700 mb-1">Terms &amp; Conditions:</h3>
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
                <div className="w-full md:w-[500px] flex flex-col items-center">
                    <h2 className="text-lg font-bold text-[#39396a] mb-3 text-center">You may also like</h2>
                    <div className="grid grid-cols-2 gap-x-10 gap-y-8 w-full">
                        {suggestions.map((s) => {
                            const sSlug = s.name.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9\-]/g, '').toLowerCase();
                            return (
                                <a
                                    key={s.name}
                                    href={`/technology/discount/${sSlug}`}
                                    className="bg-white rounded-xl shadow p-6 flex flex-col items-center hover:shadow-lg transition-all border border-gray-100 min-w-[200px]"
                                >
                                    <img src={s.image || "/placeholder.svg"} alt={s.name} className="w-32 h-20 object-contain mb-4 rounded" />
                                    <div className="font-bold text-[#39396a] text-lg text-center mb-2">{s.name}</div>
                                    <div className="text-gray-500 text-sm text-center">
                                        {s.isSale && s.discount ? `Flat ${s.discount}% Off` : s.description || 'Student offer'}
                                    </div>
                                </a>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDiscountPage;
