"use client";
import { notFound } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { useParams } from "next/navigation";
import { offers } from "@/data/offers";
import { useUserVerification } from "@/hooks/useUserVerification";

function slugify(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function BrandCouponPage() {
  const params = useParams();
  const brandSlug = params.brandSlug as string;
  
  const offer = offers.find(
    (o) => slugify(o.brand) === brandSlug
  );

  const { isVerified, loading: verificationLoading } = useUserVerification();
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!offer) return notFound();

  const handleReveal = () => setRevealed(true);
  const handleCopy = () => {
    if (offer.coupon) {
      navigator.clipboard.writeText(offer.coupon);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafaf7] flex flex-col items-center justify-center py-10 px-2">
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-8">
        {/* Left: Main Offer */}
        <div className="flex-1 flex flex-col items-center">
          <div className="w-full flex flex-col items-center">
            <div className="relative w-64 h-40 mb-4 rounded-xl overflow-hidden">
              <Image src={offer.image} alt={offer.title} fill className="object-cover object-center" />
              <span className="absolute inset-0 flex items-center justify-center text-white text-3xl font-bold bg-black/40">{offer.brand.toUpperCase()}</span>
            </div>
            <h2 className="text-3xl font-extrabold text-gray-800 mb-2 text-center">{offer.brand.toUpperCase()}</h2>
            <div className="text-xl font-semibold text-gray-700 mb-2">{offer.discount}</div>
            {!isVerified ? (
              <div className="mb-4 w-full flex flex-col items-center">
                {/* Verification Banner for Unverified Users */}
                <div className="w-full flex flex-col items-center justify-center py-2 bg-yellow-50 border border-yellow-300 mb-2 rounded-lg">
                  <span className="text-red-600 font-semibold mb-2 text-center">Please verify your account to reveal the coupon code.</span>
                  <a
                    href="/student-verification"
                    className="inline-block px-6 py-2 bg-gradient-to-r from-orange-400 to-pink-400 text-white rounded-lg font-semibold hover:from-orange-500 hover:to-pink-500 transition"
                  >
                    Verify Now
                  </a>
                </div>
                <button
                  className="bg-purple-300 text-white text-lg font-bold px-8 py-3 rounded-xl mb-2 cursor-not-allowed opacity-60"
                  disabled
                >
                  Reveal Coupon Code
                </button>
                <div className="text-red-500 text-base font-medium">Please log in and verify your account to reveal the coupon code.</div>
              </div>
            ) : !revealed ? (
              <button
                className="bg-purple-500 hover:bg-purple-600 text-white text-lg font-bold px-8 py-3 rounded-xl mb-4 transition-all"
                onClick={handleReveal}
              >
                Reveal Coupon Code
              </button>
            ) : (
              <div className="flex flex-col items-center mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-mono bg-gray-100 px-4 py-2 rounded-lg border border-gray-300 select-all text-black">{offer.coupon || "N/A"}</span>
                  <button
                    className="ml-2 px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold text-sm transition-all"
                    onClick={handleCopy}
                  >
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>
            )}
            <div className="text-left w-full max-w-xs mx-auto">
              <div className="font-bold text-gray-700 mb-1">Terms & Conditions:</div>
              <ul className="text-gray-600 text-sm list-disc pl-5">
                {(offer.terms || []).map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        {/* Right: You may also like */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="text-2xl font-bold text-gray-700 mb-2">You may also like</div>
          <div className="grid grid-cols-2 gap-4">
            {offers.filter(o => o.brand !== offer.brand).slice(0, 4).map((o, i) => (
              <div key={i} className="bg-white rounded-xl shadow p-4 flex flex-col items-center border border-gray-200">
                <div className="relative w-28 h-16 mb-2 flex items-center justify-center">
                  {o.image ? (
                    <Image src={o.image} alt={o.brand} fill className="object-contain object-center" />
                  ) : (
                    <span className="text-gray-400">No Image</span>
                  )}
                </div>
                <div className="font-bold text-gray-800 text-lg text-center">{o.brand.toUpperCase()}</div>
                <div className="text-gray-600 text-sm text-center">{o.discount || o.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
