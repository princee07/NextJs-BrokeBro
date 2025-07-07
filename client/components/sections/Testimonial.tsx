"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const testimonials = [
  {
    name: "Lavanya",
    avatar: "/assets/people/Lavanya.jpeg",
    text: "BrokeBro saved me ₹15,000 this semester! Perfect for student budgets.",
    tag: "Student",
  },
  {
    name: "Mohit",
    avatar: "/assets/people/mohit .jpg",
    text: "Amazing deals on tech products. Found my laptop 40% cheaper here!",
    tag: "Tech Enthusiast",
  },
  {
    name: "Prince",
    avatar: "/assets/people/prince.jpg",
    text: "Great variety of brands and instant discounts. Highly recommended!",
    tag: "Deal Hunter",
  },
];

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
              initial={{ opacity: 0, y: 80, rotate: -8, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ type: "spring", bounce: 0.35, duration: 0.9, delay: i * 0.18 }}
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