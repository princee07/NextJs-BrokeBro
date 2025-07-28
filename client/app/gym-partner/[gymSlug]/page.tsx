
"use client";
import React from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useUserVerification } from '@/hooks/useUserVerification';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';

// Dummy data for demonstration
interface GymDetail {
    name: string;
    image: string;
    location: string;
    address: string;
    reviews: { user: string; comment: string }[];
    mapEmbed: string;
    discount?: string;
    couponCode?: string;
}

const gymDetails: { [key: string]: GymDetail } = {
    'anytime-fitness': {
        name: 'Anytime Fitness',
        image: '/assets/gym/anytime.png',
        location: 'Delhi',
        address: 'Green Park, Safdarjung, Basant Kunj, Patel Nagar',
        reviews: [
            { user: 'Rahul', comment: 'Great equipment and trainers!' },
            { user: 'Priya', comment: 'Clean and spacious gym.' },
        ],
        mapEmbed: 'https://maps.google.com/maps?q=Green+Park+Safdarjung+Basant+Kunj+Patel+Nagar+Delhi&t=&z=12&ie=UTF8&iwloc=&output=embed',
        discount: '28k AP- 24k BB (12 months)',
        couponCode: 'ANY28K24K',
    },
    'hr-7': {
        name: 'HR 7',
        image: '/assets/gym/HR.png',
        location: 'Delhi',
        address: '2/11,Basement, Main, Road, near Metro Station Patel Nagar, opp. Pillar no.189, Block 2, East Patel Nagar, Patel Nagar, New Delhi, Delhi 110008',
        reviews: [
            { user: 'Amit', comment: 'Awesome vibe and community.' },
        ],
        mapEmbed: 'https://maps.google.com/maps?q=East+Patel+Nagar+New+Delhi&t=&z=13&ie=UTF8&iwloc=&output=embed',
        couponCode: 'HR7FIT',
    },
    'muscle-junkie': {
        name: 'Muscle Junkie',
        image: '/assets/gym/musclejunkie.png',
        location: 'Delhi',
        address: 'patel nagaar',
        reviews: [
            { user: 'Simran', comment: 'Best trainers in Patel Nagar.' },
        ],
        mapEmbed: 'https://maps.google.com/maps?q=Patel+Nagar+New+Delhi&t=&z=13&ie=UTF8&iwloc=&output=embed',
        couponCode: 'MJUNKIE',
    },
    'pro-ultimate': {
        name: 'Pro Ultimate Gym',
        image: '/assets/gym/proultimate.png',
        location: 'Delhi',
        address: 'N0. 340, Basai Darapur Rd, opp. Metro Pillar, Kailash Park, Basai Dara pur, Ramesh Nagar, New Delhi, Delhi, 110015',
        reviews: [
            { user: 'Ramesh', comment: 'Great location and equipment.' },
        ],
        mapEmbed: 'https://maps.google.com/maps?q=Basai+Darapur+New+Delhi&t=&z=13&ie=UTF8&iwloc=&output=embed',
        couponCode: 'PROULTIMATE',
    },
    // Add more gyms as needed
};

export default function GymPartnerDetail() {
    const { gymSlug } = useParams<{ gymSlug: string }>();
    const gym: GymDetail | undefined = gymDetails[gymSlug];
    if (!gym) {
        return <div className="p-8 text-center">Gym partner not found.</div>;
    }
    const { isVerified, loading } = useUserVerification();
    const { isAuthenticated } = useKindeBrowserClient();
    const [showCoupon, setShowCoupon] = React.useState(false);
    const [copied, setCopied] = React.useState(false);
    return (
        <section className="pt-44 pb-12 bg-gray-50 min-h-screen">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8">
                {/* Left Sidebar */}
                <aside className="bg-white rounded-xl shadow p-6 flex-1 md:max-w-xs flex flex-col items-center md:items-start">
                    <Image src={gym.image} alt={gym.name} width={340} height={180} className="rounded-lg mb-4" />
                    <h1 className="text-2xl font-bold mb-2 text-gray-900 text-center md:text-left">{gym.name}</h1>
                    <div className="mb-2 w-full">
                        <span className="block text-gray-700 font-semibold">Location:</span>
                        <span className="block text-gray-800">{gym.location}</span>
                    </div>
                    <div className="mb-2 w-full">
                        <span className="block text-gray-700 font-semibold">Address:</span>
                        <span className="block text-gray-800 text-sm">{gym.address}</span>
                    </div>
                    <div className="mb-4 w-full">
                        <span className="block text-gray-700 font-semibold">Discount Offers:</span>
                        <span className="block text-green-600 font-bold">{gym.discount ? gym.discount : 'Get up to 20% off on membership!'}</span>
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
                                    className={`mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition cursor-pointer ${(!isAuthenticated || !isVerified) ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    onClick={() => (isAuthenticated && isVerified) && setShowCoupon(true)}
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
                                <span className="text-lg font-bold text-orange-700">{gym.couponCode || 'COUPON2025'}</span>
                                <button
                                    className="ml-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-1 px-3 rounded transition cursor-pointer"
                                    onClick={() => {
                                        navigator.clipboard.writeText(gym.couponCode || 'COUPON2025');
                                        setCopied(true);
                                        setTimeout(() => setCopied(false), 1500);
                                    }}
                                >
                                    {copied ? 'Copied!' : 'Copy Code'}
                                </button>
                            </div>
                        )}
                    </div>
                </aside>
                {/* Right Map */}
                <div className="flex-1 flex flex-col">
                    <h2 className="text-xl font-semibold mb-2 text-gray-900">View on Map</h2>
                    <div className="bg-gray-100 rounded-lg overflow-hidden mb-8" style={{ height: '260px' }}>
                        <iframe
                            src={gym.mapEmbed}
                            width="100%"
                            height="260"
                            style={{ border: 0 }}
                            allowFullScreen={false}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Gym Location"
                        ></iframe>
                    </div>
                </div>
            </div>
            {/* Reviews section removed as requested */}
        </section>
    );
}
