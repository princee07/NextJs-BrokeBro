"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import GymProductsSection from './gym-products';
import GymPartnersSection from './gym-partners';
import GymBanner from './Banner';
export default function GymHeroSection() {
    // Banner images
    const banners = [
        '/assets/gym/anytime.png',
        '/assets/gym/HR.png',
        '/assets/gym/musclejunkie.png',
        '/assets/gym/proultimate.png',
    ];
    const [current, setCurrent] = useState(0);
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % banners.length);
        }, 3500);
        return () => clearInterval(timer);
    }, [banners.length]);

    return (
        <main className="min-h-screen bg-white mt-25">
            <section className="relative py-0 bg-black text-white mt-40 w-full max-w-none mb-0" style={{ padding: 0, margin: 0 }}>
                <div className="relative w-full h-[320px] z-10">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current}
                            initial={{ x: 100, opacity: 0 }}
                            animate={{ x: 0, opacity: 0.6 }}
                            exit={{ x: -100, opacity: 0 }}
                            transition={{ duration: 0.7, ease: "easeInOut" }}
                            className="w-full h-full absolute"
                        >
                            <Image
                                src={banners[current]}
                                alt={`Gym banner ${current + 1}`}
                                layout="fill"
                                objectFit="cover"
                                className="transition-opacity duration-700"
                                priority
                            />
                        </motion.div>
                    </AnimatePresence>
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-20 text-center px-4">
                        {/* ...existing hero heading and content... */}
                    </div>
                    <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center z-30 text-center px-4">
                        <div className="inline-block bg-yellow-400 text-black font-bold px-5 py-2 rounded mb-4 shadow-lg">EXCLUSIVE OFFER: UP TO 50% OFF</div>
                        <button className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-2 rounded shadow transition">Shop Now</button>
                    </div>
                </div>
            </section>
            {/* Brand Info Section */}
            <section className="flex flex-wrap justify-center items-center gap-8 py-10 px-4">
                <div className="flex justify-center items-center gap-12 w-full">
                    <Image src="/assets/gym/nutrabay/image.png" alt="Nutrabay Product" width={400} height={400} />
                    <Image src="/assets/gym/nutrabay/image3.png" alt="Athlab Product" width={400} height={400} />
                    <Image src="/assets/gym/nutrabay/image2.png" alt="Authentic Product" width={400} height={400} />
                </div>
            </section>

            <GymPartnersSection />
            <GymProductsSection />
            <GymBanner />
        </main>
    );
}
