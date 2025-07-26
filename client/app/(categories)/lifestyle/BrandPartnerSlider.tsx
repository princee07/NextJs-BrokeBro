import React from "react";


const sliderLogos = [
    { src: "/assets/brands/image.png", alt: "Axon" },
    { src: "/assets/brands/image2.png", alt: "Jetstar" },
    { src: "/assets/brands/image3.png", alt: "Expedia" },
    { src: "/assets/brands/image4.png", alt: "Qantas" },
    { src: "/assets/brands/image.png", alt: "Atlas" },
     { src: "/assets/brands/image2.png", alt: "Jetstar" },
    { src: "/assets/brands/image3.png", alt: "Expedia" },
    { src: "/assets/brands/image4.png", alt: "Qantas" },
];

const BrandPartnerSlider = () => (
    <section className="w-full bg-white py-6">
        <div className="relative overflow-hidden">
            <div
                className="flex items-center gap-10 px-4 animate-scroll-slider"
                style={{ width: 'max-content', minWidth: '100%' }}
            >
                {/* Duplicate logos for seamless loop */}
                {[...sliderLogos, ...sliderLogos].map((logo, idx) => (
                    <img
                        key={idx}
                        src={logo.src}
                        alt={logo.alt}
                        className="h-10 w-auto grayscale hover:grayscale-0 transition"
                        draggable={false}
                    />
                ))}
            </div>
            <style>{`
        @keyframes scroll-slider {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll-slider {
          animation: scroll-slider 18s linear infinite;
        }
      `}</style>
        </div>
    </section>
);

export default BrandPartnerSlider;
