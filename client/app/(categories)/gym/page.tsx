"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import GymProductsSection from "./gym-products";
import GymPartnersSection from "./gym-partners";
import GymBanner from "./Banner";

export default function GymHeroSection() {
    const banners = [
        "/assets/gym/anytime.png",
        "/assets/gym/HR.png",
        "/assets/gym/musclejunkie.png",
        "/assets/gym/proultimate.png",
    ];

    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % banners.length);
        }, 3500);
        return () => clearInterval(timer);
    }, [banners.length]);

    return (
        <main className="min-h-screen bg-white w-full mt-[140px]">
            {/* HERO SECTION */}
            <section className="relative py-0 pt-0 bg-black text-white w-full max-w-none mt-0">
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
                    <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center z-30 text-center px-4">
                        <div className="inline-block bg-yellow-400 text-black font-bold px-3 md:px-5 py-2 rounded mb-4 shadow-lg text-sm md:text-base">
                            EXCLUSIVE OFFER: UP TO 50% OFF
                        </div>
                        <button className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-4 md:px-6 py-2 rounded shadow transition text-sm md:text-base">
                            Shop Now
                        </button>
                    </div>
                </div>
            </section>

            {/* BRAND INFO SECTION */}
            <section className="w-full px-2 md:px-6 py-15">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 sm:gap-y-2 gap-x-0 md:gap-x-6 place-items-center">
                    <div className="w-full max-w-[400px] flex items-center justify-center">
                        <Image
                            src="/assets/gym/nutrabay/image.png"
                            alt="Nutrabay Product"
                            width={400}
                            height={400}
                            className="w-full h-auto object-contain"
                        />
                    </div>
                    <div className="w-full max-w-[400px] flex items-center justify-center">
                        <Image
                            src="/assets/gym/nutrabay/image3.png"
                            alt="Athlab Product"
                            width={400}
                            height={400}
                            className="w-full h-auto object-contain"
                        />
                    </div>
                    <div className="w-full max-w-[400px] flex items-center justify-center">
                        <Image
                            src="/assets/gym/nutrabay/image2.png"
                            alt="Authentic Product"
                            width={400}
                            height={400}
                            className="w-full h-auto object-contain"
                        />
                    </div>
                </div>
            </section>

            {/* OTHER SECTIONS */}
            <GymPartnersSection />
            <GymProductsSection />
            <GymBanner />
        </main>
    );
}
