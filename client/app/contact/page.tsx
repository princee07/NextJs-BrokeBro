import React from "react";
import Image from "next/image";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import DotPattern from "@/components/ui/DotPattern";

export default function ContactPage() {
  return (
    <main className="relative min-h-screen pt-32 pb-10 px-2 sm:px-4 flex flex-col items-center justify-start bg-gradient-to-br from-[#18181b] via-[#23272f] to-[#1a1a1a] overflow-hidden">
      {/* Decorative Dots */}
      <div className="absolute left-0 top-10 opacity-40 z-0">
        <DotPattern />
      </div>
      <div className="absolute right-0 bottom-0 opacity-30 z-0 rotate-180">
        <DotPattern />
      </div>
      {/* Hero Section */}
      <section className="relative z-10 w-full max-w-2xl flex flex-col items-center text-center mb-10">
        <div className="flex items-center justify-center mb-4">
          <Image src="/assets/images/brokebro.png" alt="BrokeBro Logo" width={56} height={56} className="rounded-full shadow-lg bg-white/10 p-2" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-orange-400 via-amber-300 to-pink-400 bg-clip-text text-transparent animate-fade-in-up">Contact Us</h1>
        <p className="mt-3 text-lg text-gray-300 animate-fade-in-up">We’d love to hear from you! Reach out for questions, feedback, or partnerships.</p>
      </section>
      {/* Contact Info Cards */}
      <section className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl mb-10">
        <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center shadow-lg">
          <span className="text-2xl mb-2">📧</span>
          <span className="text-gray-400 text-sm mb-1">Email</span>
          <a href="mailto:connect@brokebro.in" className="text-orange-300 font-semibold underline">connect@brokebro.in</a>
        </div>
        <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center shadow-lg">
          <span className="text-2xl mb-2">📞</span>
          <span className="text-gray-400 text-sm mb-1">Phone</span>
          <a href="tel:+917669955109" className="text-orange-300 font-semibold underline">+91 76699 55109</a>
        </div>
        <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center shadow-lg">
          <span className="text-2xl mb-2">📸</span>
          <span className="text-gray-400 text-sm mb-1">Instagram</span>
          <a href="https://www.instagram.com/brokebroofficial" target="_blank" rel="noopener noreferrer" className="text-orange-300 font-semibold underline">@brokebroofficial</a>
        </div>
        <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center shadow-lg">
          <span className="text-2xl mb-2">🐦</span>
          <span className="text-gray-400 text-sm mb-1">Twitter</span>
          <a href="https://x.com/BrooBroke42743" target="_blank" rel="noopener noreferrer" className="text-orange-300 font-semibold underline">@BrooBroke42743</a>
        </div>
      </section>
      {/* Glassmorphism Contact Form */}
      <section className="relative z-10 w-full max-w-xl flex flex-col items-center">
        <form className="w-full backdrop-blur-lg bg-white/10 border border-white/10 rounded-2xl shadow-2xl p-8 flex flex-col gap-5">
          <h2 className="text-2xl font-bold text-orange-300 mb-2">Send us a message</h2>
          <Input type="text" name="name" placeholder="Your Name" required className="bg-black/40 border-white/20 text-gray-100 placeholder:text-gray-400" />
          <Input type="email" name="email" placeholder="Your Email" required className="bg-black/40 border-white/20 text-gray-100 placeholder:text-gray-400" />
          <textarea name="message" placeholder="Your Message" required rows={4} className="bg-black/40 border border-white/20 rounded-md px-3 py-2 text-gray-100 placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 resize-none" />
          <Button type="submit" className="bg-gradient-to-r from-orange-400 via-amber-300 to-pink-400 text-black font-bold shadow-md hover:from-orange-500 hover:to-pink-500 transition">Send Message</Button>
        </form>
      </section>
    </main>
  );
}
