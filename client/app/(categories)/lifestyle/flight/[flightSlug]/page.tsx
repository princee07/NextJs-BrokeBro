"use client";
import React, { useState } from "react";
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

    const deal = flightDeals[flightSlug as keyof typeof flightDeals];
    if (!deal) {
        return <div className="p-10 text-center text-xl">Flight deal not found.</div>;
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(deal.code);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <main className="min-h-screen bg-[#F9F9F6] flex flex-col items-center justify-center py-12 px-4">
            <div className="max-w-lg w-full bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center relative">
                <img src={deal.img} alt={deal.brand} className="w-48 h-48 object-cover rounded-2xl mb-6 shadow-lg" />
                <div className={`absolute top-6 left-6 ${deal.color} text-white text-xs font-bold px-4 py-2 rounded-full shadow`}>{deal.discount}</div>
                <h1 className="text-3xl font-extrabold text-[#3D375A] mb-2 text-center">{deal.brand} Flight Deal</h1>
                <p className="text-[#555] text-center mb-6">{deal.description}</p>
                <div className="flex flex-col items-center gap-3 w-full">
                    <button
                        className="bg-gradient-to-r from-[#5B5BF6] to-[#7F5CFF] text-white font-bold py-3 px-8 rounded-xl text-lg shadow hover:from-[#7F5CFF] hover:to-[#5B5BF6] transition"
                        onClick={() => setShowCode((v) => !v)}
                    >
                        {showCode ? "Hide Discount Code" : "Reveal Discount Code"}
                    </button>
                    {showCode && (
                        <div className="flex items-center gap-2 mt-2">
                            <span className="font-mono text-lg bg-gray-100 px-4 py-2 rounded-lg border border-gray-300">{deal.code}</span>
                            <button
                                className="ml-2 px-3 py-2 bg-[#F9F9F6] border border-gray-300 rounded-lg text-sm hover:bg-gray-200 transition"
                                onClick={handleCopy}
                            >
                                {copied ? "Copied!" : "Copy"}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};

export default FlightDealPage;
