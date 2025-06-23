"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const testimonials = [
  {
    name: "Aarav S.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "BrokeBro helped me save so much on my college shopping! The deals are real and the site is super easy to use.",
    tag: "Student",
  },
  {
    name: "Priya M.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "I love the variety of brands and the exclusive offers. BrokeBro is my go-to for discounts!",
    tag: "Fashionista",
  },
  {
    name: "Rohan K.",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
    text: "The UI is so cool and the deals are always fresh. Highly recommended for anyone who loves saving money.",
    tag: "Techie",
  },
  {
    name: "Simran P.",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    text: "I found the best food delivery discounts here. BrokeBro is a lifesaver for students!",
    tag: "Foodie",
  },
];

const cardVariants = {
  offscreen: { opacity: 0, y: 80, rotate: -8, scale: 0.95 },
  onscreen: (i: number) => ({
    opacity: 1,
    y: 0,
    rotate: 0,
    scale: 1,
    transition: {
      type: "spring",
      bounce: 0.35,
      duration: 0.9,
      delay: i * 0.18,
    },
  }),
};

export default function Testimonial() {
  return (
    <section className="relative w-full py-24 bg-gradient-to-br from-neutral-900 via-neutral-950 to-black overflow-hidden">
      <div className="absolute left-0 top-0 w-full h-full pointer-events-none opacity-30">
        {/* BrokeBro logo watermark or neon accent */}
        <svg className="absolute text-[300px] text-orange-500 opacity-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <text x="50%" y="50%" textAnchor="middle" dy=".35em" fontSize="180" fontWeight="bold" fill="currentColor">BB</text>
        </svg>
      </div>
      <div className="relative z-10 max-w-5xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white text-center mb-12 tracking-tight drop-shadow-lg">
          What BrokeBro Users Say
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              className="relative bg-neutral-800/80 border border-orange-400/20 rounded-3xl shadow-xl p-8 w-full max-w-xs flex flex-col items-center backdrop-blur-md hover:scale-105 transition-transform duration-300"
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.4 }}
              custom={i}
              variants={cardVariants}
            >
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full p-1 shadow-lg">
                <Image
                  src={t.avatar}
                  alt={t.name}
                  width={64}
                  height={64}
                  className="rounded-full border-4 border-neutral-900"
                />
              </div>
              <div className="mt-8 text-lg text-white text-center font-medium leading-relaxed">
                “{t.text}”
              </div>
              <div className="mt-6 flex flex-col items-center">
                <span className="text-orange-400 font-bold text-lg">{t.name}</span>
                <span className="text-xs text-neutral-400">{t.tag}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}