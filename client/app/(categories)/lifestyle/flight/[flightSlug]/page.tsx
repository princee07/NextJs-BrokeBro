"use client";
import React, { useState } from "react";
import { useUserVerification } from "../../../../../hooks/useUserVerification";
import { useParams } from "next/navigation";

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
    const { isVerified, loading: verificationLoading } = useUserVerification();

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
        <main className="min-h-screen bg-[#F9F9F6] w-full flex flex-col items-center pt-38 pb-10 px-2 md:px-0">
            <div className="max-w-6xl w-full flex flex-col md:flex-row gap-8 items-start justify-center">
                {/* Main Deal Card */}
                <div className="flex-1 max-w-xl w-full bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center relative mb-8 md:mb-0">
                    <img src={deal.img} alt={deal.brand} className="w-48 h-48 object-cover rounded-2xl mb-6 shadow-lg" />
                    <div className={`absolute top-6 left-6 ${deal.color} text-white text-xs font-bold px-4 py-2 rounded-full shadow`}>{deal.discount}</div>
                    <h1 className="text-3xl font-extrabold text-[#3D375A] mb-2 text-center">{deal.brand} Flight Deal</h1>
                    <p className="text-[#555] text-center mb-6">{deal.description}</p>
                    <div className="flex flex-col items-center gap-3 w-full">
                        {!showCode ? (
                            <>
                                <button
                                    className="bg-gradient-to-r from-[#5B5BF6] to-[#7F5CFF] text-white font-bold py-3 px-8 rounded-xl text-lg shadow hover:from-[#7F5CFF] hover:to-[#5B5BF6] transition disabled:opacity-60 disabled:cursor-not-allowed"
                                    onClick={() => isVerified && setShowCode(true)}
                                    disabled={verificationLoading || !isVerified}
                                >
                                    Reveal Coupon Code
                                </button>
                                {!verificationLoading && !isVerified && (
                                    <div className="text-red-500 text-sm mt-2">Please log in and verify your account to reveal the coupon code.</div>
                                )}
                            </>
                        ) : (
                            <div className="flex items-center gap-2 mt-2">
                                <span className="font-mono text-lg bg-gray-100 px-4 py-2 rounded-lg border border-gray-300 text-black">{deal.code}</span>
                                <button
                                    className="ml-2 px-3 py-2 bg-[#F9F9F6] border border-gray-300 rounded-lg text-sm hover:bg-gray-200 transition text-black"
                                    onClick={handleCopy}
                                >
                                    {copied ? <span className="text-black">Copied!</span> : <span className="text-black">Copy</span>}
                                </button>
                            </div>
                        )}
                    </div>
                    {/* Terms & Conditions */}
                    <div className="mt-8 w-full">
                        <h3 className="font-semibold text-gray-700 mb-2">Terms & Conditions:</h3>
                        <ul className="text-gray-500 text-sm list-disc pl-5 space-y-1">
                            <li>Coupon valid for a limited time only.</li>
                            <li>Applicable only on select flights/routes.</li>
                            <li>Cannot be combined with other offers.</li>
                            <li>See airline website for full details.</li>
                        </ul>
                    </div>
                </div>
                {/* Suggested Items */}
                <div className="w-full md:w-[340px] flex flex-col">
                    <h2 className="text-xl font-bold text-[#3D375A] mb-4">You may also like</h2>
                    <div className="grid grid-cols-1 gap-4">
                        {suggested.map((item) => (
                            <a
                                key={item.slug}
                                href={`/lifestyle/flight/${item.slug}`}
                                className="bg-white rounded-2xl shadow p-4 flex items-center gap-4 hover:shadow-lg transition group border border-gray-100"
                            >
                                <img src={item.img} alt={item.brand} className="w-16 h-16 object-cover rounded-xl" />
                                <div className="flex flex-col flex-1">
                                    <span className="font-semibold text-[#3D375A] text-base group-hover:underline">{item.brand}</span>
                                    <span className="text-xs text-gray-500 mt-1">{item.discount} | <span className="capitalize">{item.brand}</span></span>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default FlightDealPage;
