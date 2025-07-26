"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import featuredProducts, { Product } from '../../featuredProducts';
import VerificationGate from '@/components/ui/VerificationGate';

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
    // Simulate user state: set to true for demo, replace with real logic
    const [isLoggedIn, setIsLoggedIn] = useState(true); // true for demo
    const [isVerified, setIsVerified] = useState(true); // true for demo
    const [copied, setCopied] = useState(false);

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
            <div className="max-w-3xl w-full flex flex-col md:flex-row gap-6 scale-90 md:scale-95">
                {/* Main Card */}
                <div className="flex-1 bg-[#fcfcfa] rounded-2xl shadow-xl p-6 flex flex-col items-center">
                    <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-44 h-32 object-contain mb-3 rounded-lg" />
                    <h1 className="text-2xl font-extrabold text-[#39396a] mb-1 text-center">{product.name}</h1>
                    <p className="text-base font-semibold text-[#39396a] mb-3 text-center">{product.isSale && product.discount ? `${product.discount}% Off Sitewide*` : 'Exclusive Student Offer*'}</p>
                    {!isRevealed ? (
                        <>
                            <button
                                className="bg-[#a78bfa] hover:bg-[#7c3aed] text-white font-bold text-lg px-8 py-3 rounded-lg mb-3 transition-all"
                                onClick={() => (isLoggedIn && isVerified) ? setIsRevealed(true) : null}
                                disabled={!(isLoggedIn && isVerified)}
                            >
                                Reveal Coupon Code
                            </button>
                            {!(isLoggedIn && isVerified) && (
                                <p className="text-red-500 font-medium mb-2">Please log in and verify to reveal the coupon code.</p>
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
                {/* Suggestions */}
                <div className="w-full md:w-[320px]">
                    <h2 className="text-lg font-bold text-[#39396a] mb-3">You may also like</h2>
                    <div className="grid grid-cols-2 gap-6">
                        {suggestions.map((s) => {
                            const sSlug = s.name.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9\-]/g, '').toLowerCase();
                            return (
                                <a
                                    key={s.name}
                                    href={`/technology/discount/${sSlug}`}
                                    className="bg-white rounded-xl shadow p-4 flex flex-col items-center hover:shadow-lg transition-all border border-gray-100"
                                >
                                    <img src={s.image || "/placeholder.svg"} alt={s.name} className="w-28 h-16 object-contain mb-2 rounded" />
                                    <div className="font-bold text-[#39396a] text-lg text-center">{s.name}</div>
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
