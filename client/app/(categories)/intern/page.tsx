"use client";
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import RecommendedInternships from '@/components/sections/RecommendedInternships';
import HiredInterns from '@/components/sections/HiredInterns';
import DotPattern from '@/components/ui/DotPattern';
import TopCompanies from '@/components/sections/TopCompanies';

const DecorativeElements = () => (
  <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
    <DotPattern className="absolute bottom-[10%] right-[2%] opacity-50 hidden md:block" style={{ transform: 'rotate(180deg)' }} />
    {/* Animated Rope - Hidden on mobile */}
    <svg className="absolute top-0 left-0 w-full h-full opacity-20 blowing-rope hidden lg:block" fill="none" viewBox="0 0 1440 900">
      <path
        d="M -50,100 C 200,400 600,-100 800,300 S 1200,800 1500,700"
        stroke="#A78BFA"
        strokeWidth="2"
      />
      <circle cx="100" cy="155" r="5" fill="#A78BFA" />
      <circle cx="800" cy="300" r="5" fill="#A78BFA" />
    </svg>
    {/* Purple Square - Smaller on mobile */}
    <div
      className="absolute top-1/2 left-[10%] w-4 h-4 md:w-8 md:h-8 border-2 md:border-4 border-purple-500 rounded-md opacity-30 hidden sm:block"
      style={{ transform: 'rotate(25deg)' }}
    />

    {/* Pink Solid Circle - Smaller on mobile */}
    <div className="absolute bottom-[10%] left-[8%] w-3 h-3 md:w-6 md:h-6 bg-pink-500 rounded-full opacity-40 hidden sm:block" />

    {/* Pink Dot Grid - Hidden on mobile */}
    <div
      className="absolute top-[20%] right-[12%] hidden md:grid md:grid-cols-4 gap-1 md:gap-2 opacity-30"
      style={{ transform: 'rotate(-12deg)' }}
    >
      {Array.from({ length: 16 }).map((_, i) => (
        <div key={i} className="w-1 h-1 md:w-2 md:h-2 bg-pink-500 rounded-full" />
      ))}
    </div>

    {/* Yellow Squiggle - Smaller on mobile */}
    <svg
      className="absolute top-[60%] right-[15%] w-10 h-5 md:w-20 md:h-10 text-yellow-400 opacity-30 hidden sm:block"
      style={{ transform: 'rotate(12deg)' }}
      fill="none"
      viewBox="0 0 80 40"
    >
      <path
        d="M0,20 C20,0 30,40 50,20 S70,0 80,20"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>

    {/* Pink Arc - Hidden on mobile */}
    <svg
      className="absolute bottom-[15%] right-[10%] w-12 h-6 md:w-16 md:h-8 text-pink-400 opacity-30 hidden md:block"
      style={{ transform: 'rotate(-20deg)' }}
      fill="none"
      viewBox="0 0 60 30"
    >
      <path
        d="M0,30 A30,30 0 0,1 60,30"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>

    {/* Green Hollow Circle - Hidden on mobile */}
    <div className="absolute top-[40%] left-[25%] w-3 h-3 md:w-4 md:h-4 rounded-full border-2 border-green-400 opacity-40 hidden sm:block" />

    {/* Left Side Additions - Hidden on mobile */}
    <div className="absolute top-[10%] left-[15%] w-2 h-2 md:w-3 md:h-3 bg-yellow-400 rounded-full opacity-30 hidden sm:block" />
    <svg className="absolute top-[70%] left-[5%] w-8 h-8 md:w-16 md:h-16 text-teal-400 opacity-30 hidden md:block" style={{ transform: 'rotate(10deg)' }} fill="none" viewBox="0 0 60 60">
      <path d="M0 10 L20 30 L0 50" stroke="currentColor" strokeWidth="3" />
    </svg>
    <div className="absolute bottom-[20%] left-[15%] w-0 h-0 border-l-[5px] border-l-transparent border-b-[7px] border-b-orange-500 border-r-[5px] border-r-transparent md:border-l-[10px] md:border-b-[15px] md:border-r-[10px] opacity-30 hidden sm:block" style={{ transform: 'rotate(-30deg)' }} />

    {/* Right Side Additions - Hidden on mobile */}
    <div className="absolute top-[10%] right-[5%] w-6 h-6 md:w-12 md:h-12 rounded-full border-2 border-cyan-400 opacity-20 hidden md:block" />
    <svg className="absolute top-[55%] right-[8%] w-4 h-4 md:w-8 md:h-8 text-red-500 opacity-30 hidden sm:block" style={{ transform: 'rotate(45deg)' }} fill="none" viewBox="0 0 32 32">
      <path d="M16 0 V32 M0 16 H32" stroke="currentColor" strokeWidth="4" />
    </svg>
    <svg className="absolute bottom-[30%] right-[5%] w-10 h-5 md:w-20 md:h-10 text-gray-500 opacity-20 hidden md:block" style={{ transform: 'rotate(10deg)' }} fill="none" viewBox="0 0 80 40">
      <path d="M0,20 Q20,0 40,20 T80,20" stroke="currentColor" strokeWidth="2" />
    </svg>
  </div>
);

// Simple Intersection Observer hook for scroll animation
function useScrollFadeIn(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.style.transitionDelay = `${delay}ms`;
          node.classList.add('is-visible');
          observer.unobserve(node); // Animate only once
        }
      },
      { threshold: 0.1 }
    );

    node.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-1000');
    observer.observe(node);

    return () => observer.disconnect();
  }, [delay]);

  return ref;
}

const animationStyles = `
@keyframes pulse-blink {
  0%, 100% {
    opacity: 0.8;
    transform: scale(1);
  }
  50% {
    opacity: 0.3;
    transform: scale(0.9);
  }
}
.pulse-blink-dot {
  animation: pulse-blink 3s ease-in-out infinite;
}

@keyframes rope-blow {
  0% {
    transform: translate(0, 0) rotate(0deg);
  }
  50% {
    transform: translate(10px, -10px) rotate(0.5deg);
  }
  100% {
    transform: translate(0, 0) rotate(0deg);
  }
}
.blowing-rope {
  animation: rope-blow 15s ease-in-out infinite;
}

@keyframes float {
  0% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-12px) scale(1.05); }
  100% { transform: translateY(0) scale(1); }
}
.floating { animation: float 4s ease-in-out infinite; }
.floating2 { animation: float 5s ease-in-out infinite; animation-delay: 1s; }
.floating3 { animation: float 6s ease-in-out infinite; animation-delay: 2s; }

/* Scroll-triggered animation styles */
.fade-in-up {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}
.fade-in-up.is-visible {
    opacity: 1;
    transform: translateY(0);
}
`;


export default function InternshipPage() {
  const heroRef = useScrollFadeIn(0);
  const heroImageRef = useScrollFadeIn(200);
  const featuresRef = useScrollFadeIn(400);
  const categoriesRef = useScrollFadeIn(200);
  const recommendedRef = useScrollFadeIn(400);
  const hiredRef = useScrollFadeIn(600);

  const [headingIndex, setHeadingIndex] = useState(0);
  const headings = [
    "Find Your Dream Internship",
    "Unlock Top-Tier Opportunities",
    "Kickstart Your Career",
  ];

  // Scroll to Recommended Internships
  const handleExploreClick = () => {
    if (recommendedRef.current) {
      recommendedRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setHeadingIndex(prevIndex => (prevIndex + 1) % headings.length);
    }, 4000); // Change heading every 4 seconds

    return () => clearInterval(interval);
  }, [headings.length]);

  return (
    <main className="w-full min-h-screen bg-[#FAFAF6] relative overflow-x-hidden text-black mt-[100px] md:mt-[140px]">
      <style>{animationStyles}</style>
      <DecorativeElements />
      {/* Background Gradient */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white via-[#FAFAF6]/80 to-white z-0" />

      {/* Removed pt-32, replaced with pt-0 */}
      <div className="pt-0 relative z-10">
        {/* Hero Section */}
        <section ref={heroRef} className="relative w-full flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto pt-6 md:pt-12 pb-8 md:pb-12 px-4 md:px-8 fade-in-up bg-[#FAFAF6] rounded-none md:rounded-3xl">

          <div className="absolute top-1/2 -left-20 -translate-y-1/2 hidden lg:block">
            <DotPattern className="opacity-50" />
            <svg
              className="absolute -bottom-8 -right-16 w-24 h-12 text-blue-400 opacity-30"
              style={{ transform: 'rotate(-15deg) scaleX(-1)' }}
              fill="none"
              viewBox="0 0 100 50"
            >
              <path
                d="M0,25 Q25,0 50,25 T100,25"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Animated rope for Hero Section - Hidden on mobile */}
          <svg className="absolute -top-1/4 left-0 w-full h-[150%] opacity-10 blowing-rope hidden lg:block" style={{ animationDelay: '1s' }} fill="none" viewBox="0 0 1000 600">
            <path
              d="M -100,250 C 200,50 400,500 700,300 S 1100,100 1200,400"
              stroke="#FBBF24"
              strokeWidth="2"
            />
            <circle cx="700" cy="300" r="5" fill="#FBBF24" />
          </svg>

          {/* Left Content */}
          <div className="flex-1 flex flex-col items-start gap-4 md:gap-6 z-10 max-w-xl pl-2 md:pl-6 lg:pl-16 order-2 md:order-1">
            <div className="relative h-16 md:h-20 lg:h-24 w-full">
              {headings.map((text, index) => (
                <h1
                  key={index}
                  className={`absolute w-full text-2xl md:text-4xl lg:text-5xl font-extrabold text-black leading-tight transition-all duration-700 ease-in-out ${headingIndex === index ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5 pointer-events-none'
                    }`}
                >
                  {text}
                </h1>
              ))}
            </div>
            <p className="text-gray-800 text-sm md:text-base lg:text-lg max-w-md">
              Unlock exclusive internship opportunities with top companies and kickstart your career. Your future starts here with BrokeBro.
            </p>
            <button className="px-5 md:px-7 py-2 md:py-3 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold shadow-lg hover:shadow-orange-500/50 transition-all text-sm md:text-base" onClick={handleExploreClick}>
              Explore Internships
            </button>
            <div className="flex items-center gap-2 md:gap-3 mt-1 md:mt-2">
              <div className="flex -space-x-1 md:-space-x-2">
                <Image src="/assets/images/hero-internship.png" alt="Student 1" width={24} height={24} className="md:w-8 md:h-8 rounded-full border-2 border-white/50" />
                <Image src="/assets/images/hero-internship.png" alt="Student 2" width={24} height={24} className="md:w-8 md:h-8 rounded-full border-2 border-white/50" />
                <Image src="/assets/images/hero-internship.png" alt="Student 3" width={24} height={24} className="md:w-8 md:h-8 rounded-full border-2 border-white/50" />
              </div>
              <span className="text-xs md:text-sm text-gray-800 font-semibold">Trusted by 1,000+ Students</span>
            </div>
          </div>

          {/* Right Content: Hero Image */}
          <div ref={heroImageRef} className="flex-1 flex items-center justify-center relative mt-4 md:mt-0 min-w-[280px] md:min-w-[320px] min-h-[300px] md:min-h-[400px] fade-in-up pr-2 md:pr-10 lg:pr-40 order-1 md:order-2">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 w-[240px] md:w-[280px] h-[280px] md:h-[340px]">
              <div className="w-full h-full bg-purple-200/30 rounded-t-full" />
            </div>
            <div className="absolute top-4 md:top-8 left-4 md:left-8 w-6 md:w-10 h-6 md:h-10 floating text-[#FF6B6B] hidden sm:block"> <svg viewBox="0 0 100 100" fill="currentColor"> <path d="M80.2,46.2c-2.2-2-5.1-3.2-8.3-3.2c-3.2,0-6.1,1.1-8.3,3.2c-4.6,4.2-4.6,11.1,0,15.3l2.4,2.2c0.9,0.8,2.2,0.8,3.1,0l3.1-3.1 c0.9-0.8,0.9-2.2,0-3.1l-2.4-2.2c-1.3-1.2-1.3-3.1,0-4.3c1.3-1.2,3.3-1.2,4.6,0l2.4,2.2c0.9,0.8,2.2,0.8,3.1,0l3.1-3.1 C84.8,57.3,84.8,50.4,80.2,46.2z" /> </svg> </div>
            <div className="absolute top-12 md:top-20 right-4 md:right-8 w-4 md:w-6 h-4 md:h-6 floating2 text-purple-400 hidden sm:block"> <svg viewBox="0 0 100 100" fill="currentColor"><path d="M99.6,41.9c-0.1-2.1-0.3-4.3-0.6-6.4c-1.2-8.9-4.8-17.2-10.2-24.2C80.7,2.2,70,0,59.3,0c-11.4,0-21.9,2.7-30.8,7.4 c-12.2,6.5-20.9,17.4-24.5,30.3c-2.3,8.3-2.6,17.1-1.6,25.7C5.8,85.6,22.9,99.5,41.9,99.9c2.1,0.1,4.3,0.3,6.4,0.6 c8.9,1.2,17.2,4.8,24.2,10.2c9,7.4,18.7,11.3,28.7,11.3c2.9,0,5.7-0.2,8.4-0.6c11-1.6,20.4-5.6,28.1-11.5 C128.8,91.8,118.9,59.3,99.6,41.9z" /></svg></div>
            <div className="absolute bottom-4 md:bottom-8 left-8 md:left-12 w-6 md:w-10 h-6 md:h-10 floating3 bg-purple-200 rounded-lg -rotate-45 hidden sm:block" />

            <div className="relative z-10 w-60 md:w-72 lg:w-96 flex justify-center items-end">
              <Image
                src="/assets/images/hero-internship.png"
                alt="BrokeBro Internship"
                width={320}
                height={428}
                className="object-contain w-full h-full md:w-[384px] md:h-[512px]"
                priority
              />
            </div>

            <div className="absolute -right-2 md:-right-8 bottom-4 md:bottom-8 bg-white/80 backdrop-blur-md rounded-xl md:rounded-2xl shadow-lg px-3 md:px-6 py-2 md:py-4 flex flex-col items-center gap-1 border border-black/10 z-20 w-28 md:w-40">
              <div className="w-12 md:w-20 h-12 md:h-20 rounded-t-full overflow-hidden bg-blue-200/50">
                <Image src="/assets/images/hero-internship.png" alt="Top Student" width={60} height={60} className="md:w-[80px] md:h-[80px] object-cover" />
              </div>
              <span className="text-lg md:text-2xl font-bold text-black mt-1 md:mt-2">99%</span>
              <span className="text-[10px] md:text-xs text-gray-800 text-center">Success Rate</span>
            </div>
          </div>
        </section>



        {/* Recommended Internships Section */}
        <div ref={recommendedRef} className="fade-in-up">
          <RecommendedInternships />
          <TopCompanies />
        </div>

        {/* Hired Interns Section */}
        <div ref={hiredRef} className="fade-in-up">
          <HiredInterns />
        </div>

        {/* Features Section */}
        <section ref={featuresRef} className="w-full max-w-5xl mx-auto flex flex-col items-center justify-between gap-4 md:gap-5 my-8 md:my-16 px-4 md:px-0 fade-in-up">
          <h2 className="w-full text-2xl md:text-3xl lg:text-4xl font-extrabold text-black mb-4 md:mb-8 text-center px-2">Why Choose BrokeBro Internships?</h2>
          
          {/* Mobile: Stack vertically, Desktop: 3 columns */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-5 w-full">
            <div className="flex items-center gap-3 md:gap-4 border border-black/10 rounded-xl md:rounded-2xl shadow-md px-4 md:px-6 py-3 md:py-4 w-full md:w-1/3 bg-white">
              <span className="bg-purple-100 rounded-lg md:rounded-xl p-2 md:p-3 flex-shrink-0">
                <svg width="20" height="20" className="md:w-6 md:h-6" viewBox="0 0 24 24" fill="#A78BFA">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </span>
              <div className="flex-1 min-w-0">
                <span className="text-base md:text-lg font-bold text-black block">Exclusive Access</span>
                <span className="text-xs md:text-sm text-gray-700 mt-0.5 md:mt-1 block">Get access to top-tier companies.</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3 md:gap-4 border border-black/10 rounded-xl md:rounded-2xl shadow-md px-4 md:px-6 py-3 md:py-4 w-full md:w-1/3 bg-white">
              <span className="bg-blue-100 rounded-lg md:rounded-xl p-2 md:p-3 flex-shrink-0">
                <svg width="20" height="20" className="md:w-6 md:h-6" viewBox="0 0 24 24" fill="#60A5FA">
                  <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8 12.5v-9l6 4.5-6 4.5z" />
                </svg>
              </span>
              <div className="flex-1 min-w-0">
                <span className="text-base md:text-lg font-bold text-black block">Career Guidance</span>
                <span className="text-xs md:text-sm text-gray-700 mt-0.5 md:mt-1 block">Mentorship from industry experts.</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3 md:gap-4 border border-black/10 rounded-xl md:rounded-2xl shadow-md px-4 md:px-6 py-3 md:py-4 w-full md:w-1/3 bg-white">
              <span className="bg-orange-100 rounded-lg md:rounded-xl p-2 md:p-3 flex-shrink-0">
                <svg width="20" height="20" className="md:w-6 md:h-6" viewBox="0 0 24 24" fill="#FBBF24">
                  <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
                  <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                </svg>
              </span>
              <div className="flex-1 min-w-0">
                <span className="text-base md:text-lg font-bold text-black block">Top Companies</span>
                <span className="text-xs md:text-sm text-gray-700 mt-0.5 md:mt-1 block">Work with the best in the industry.</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}