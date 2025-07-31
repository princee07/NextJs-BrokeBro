"use client";
import React from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useUserVerification } from '@/hooks/useUserVerification';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { motion } from 'framer-motion';

// Dummy data for demonstration
interface GymDetail {
    name: string;
    image: string; // Main page image (e.g., card image)
    slugImage: string; // Slug page image
    location: string;
    address: string;
    about: string;
    reviews: { user: string; comment: string }[];
    mapEmbed: string;
    discount?: string;
    couponCode?: string;
}

const gymDetails: { [key: string]: GymDetail } = {
    'anytime-fitness': {
        name: 'Anytime Fitness',
        image: '/assets/gym/anytime.png', // Main page image
        slugImage: '/assets/gym/anytimefitness.png', // Slug page image
        location: 'Delhi',
        address: 'Green Park, Safdarjung, Basant Kunj, Patel Nagar',
        about: 'Anytime Fitness is a global leader in 24/7 fitness, offering state-of-the-art equipment, certified trainers, and a welcoming environment for all fitness levels. Members enjoy access to personalized training programs, group classes, and modern amenities designed to help you achieve your health goals. With a focus on convenience and community, Anytime Fitness empowers you to work out on your schedule and stay motivated every step of the way.',
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
        image: '/assets/gym/HR.png', // Main page image
        slugImage: '/assets/gym/hr.jpg', // Slug page image
        location: 'Delhi',
        address: '2/11,Basement, Main, Road, near Metro Station Patel Nagar, opp. Pillar no.189, Block 2, East Patel Nagar, Patel Nagar, New Delhi, Delhi 110008',
        about: 'HR 7 is known for its vibrant community and modern facilities. The gym offers a wide range of equipment, group classes, and personal training options to help members reach their fitness goals. Located conveniently near the metro station, HR 7 is perfect for those seeking a motivating and supportive environment.',
        reviews: [
            { user: 'Amit', comment: 'Awesome vibe and community.' },
        ],
        mapEmbed: 'https://maps.google.com/maps?q=East+Patel+Nagar+New+Delhi&t=&z=13&ie=UTF8&iwloc=&output=embed',
        couponCode: 'HR7FIT',
        discount: `Monthly- 3500,
Quarter- 1 month extra,
6 months- 2 months extra,
12 months- 20k or 3 months extra`,

    },
    'muscle-junkie': {
        name: 'Muscle Junkie',
        image: '/assets/gym/musclejunkie.png', // Main page image
        slugImage: '/assets/gym/musclejun.png', // Slug page image
        location: 'Delhi',
        address: 'Patel Nagar',
        about: 'Muscle Junkie specializes in strength training and bodybuilding, offering top-notch equipment and expert trainers. The gym is popular among fitness enthusiasts for its energetic atmosphere and commitment to helping members achieve their muscle-building goals.',
        reviews: [
            { user: 'Simran', comment: 'Best trainers in Patel Nagar.' },
        ],
        mapEmbed: 'https://maps.google.com/maps?q=Patel+Nagar+New+Delhi&t=&z=13&ie=UTF8&iwloc=&output=embed',
        couponCode: 'MJUNKIE',
        discount: `3 months- 12k - 8k,
6 months- 18k - 14k,
12 months- 22k - 18k`,
    },
    'pro-ultimate': {
        name: 'Pro Ultimate Gym',
        image: '/assets/gym/proultimate.png', // Main page image
        slugImage: '/assets/gym/proul.png', // Slug page image
        location: 'Delhi',
        address: 'N0. 340, Basai Darapur Rd, opp. Metro Pillar, Kailash Park, Basai Dara pur, Ramesh Nagar, New Delhi, Delhi, 110015',
        about: 'Pro Ultimate Gym offers a comprehensive fitness experience with advanced equipment, certified trainers, and a variety of workout programs. The gym is dedicated to providing a clean, safe, and motivating environment for all members.',
        reviews: [
            { user: 'Ramesh', comment: 'Great location and equipment.' },
        ],
        mapEmbed: 'https://maps.google.com/maps?q=Basai+Darapur+New+Delhi&t=&z=13&ie=UTF8&iwloc=&output=embed',
        discount: '26k Actual Price - 20k on BB (12 months)',
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
            <div className="max-w-5xl mx-auto flex flex-col gap-8">
                {/* Top Brand Info Row (no map) */}
                <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-lg p-8 gap-8 items-center md:items-start">
                    {/* Brand Image - Larger with Zoom (using slugImage) */}
                    <div className="flex-shrink-0 flex justify-center items-center overflow-hidden">
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="relative"
                        >
                            <Image src={gym.slugImage} alt={gym.name} width={320} height={320} className="rounded-3xl object-contain bg-gray-100 shadow-xl w-[320px] h-[320px] md:w-[260px] md:h-[260px]" />
                        </motion.div>
                    </div>
                    {/* Brand Info */}
                    <div className="flex flex-col flex-1 justify-center">
                        <h1 className="text-4xl font-bold mb-2 text-gray-900">{gym.name}</h1>
                        <div className="mb-2">
                            <span className="block text-gray-700 font-semibold">About {gym.name}:</span>
                            <span className="block text-gray-800 text-base">{gym.about}</span>
                        </div>
                        <div className="mb-1">
                            <span className="block text-gray-700 font-semibold">Location:</span>
                            <span className="block text-gray-800">{gym.location}</span>
                        </div>
                        <div className="mb-1">
                            <span className="block text-gray-700 font-semibold">Address:</span>
                            <span className="block text-gray-800 text-base">{gym.address}</span>
                        </div>
                    </div>
                </div>
                {/* Coupon Modal */}
                <div className="bg-white rounded-xl shadow p-6 flex-1 flex flex-col items-center md:items-start">
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
                </div>
                {/* Map at the bottom (always visible) */}
                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-2 text-gray-900">View on Map</h2>
                    <div className="bg-gray-100 rounded-lg overflow-hidden" style={{ height: '260px' }}>
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
        </section>
    );
}