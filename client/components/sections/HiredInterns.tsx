"use client"
import Image from 'next/image';
import React, { useCallback, useState, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight, Linkedin, Twitter, Clock } from 'lucide-react';

const hiredInterns = [
  {
    name: 'Prince ',
    university: 'Sdiet',
    company: 'BrokeBro ',
    role: 'Full Stack Developer Intern',
    avatar: '/assets/people/prince.jpg',
    companyLogo: '/assets/internpage/brokebro.png',
    hiredDate: '2025-4-15',
    linkedinUrl: 'https://www.linkedin.com/in/princee07/',
    twitterUrl: '#',
  },
  {
    name: 'Mohit Sharma',
    university: 'Amity University',
    company: 'Pick n Treat',
    role: 'MERN Stack Developer Intern',
    avatar: '/assets/people/mohit .jpg',
    companyLogo: '/assets/internpage/pnt.png',
    hiredDate: '2024-11-20',
    linkedinUrl: '#',
    twitterUrl: '#',
  },
  {
    name: 'Lavanya Patel',
    university: 'BPIT , Delhi',
    company: 'Urban pulse innovation',
    role: 'Software Development Intern',
    avatar: '/assets/people/Lavanya.jpeg',
    companyLogo: '/assets/internpage/upi.jpg',
    hiredDate: '2025-01-08',
    linkedinUrl: '#',
    twitterUrl: '#',
  },
  {
    name: 'Arjun Singh',
    university: 'Manipal Institute of Technology',
    company: 'CIIS Institute',
    role: 'Research & Development Intern',
    avatar: '/assets/people/prince.jpg',
    companyLogo: '/assets/internpage/ciis.jpg',
    hiredDate: '2025-3-23',
    linkedinUrl: '#',
    twitterUrl: '#',
  },
  {
    name: 'Lavanya Varshney',
    university: 'Vellore Institute of Technology',
    company: 'PNT Analytics',
    role: 'Data Analytics Intern',
    avatar: '/assets/people/Lavanya.jpeg',
    companyLogo: '/assets/internpage/pnt.png',
    hiredDate: '2025-02-12',
    linkedinUrl: '#',
    twitterUrl: '#',
  },
];

const HiredInterns = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 3000, stopOnInteraction: true })]);
  const [currentTime, setCurrentTime] = useState(new Date());

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  // Update time every minute for dynamic display
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const getTimeSinceHired = (hiredDate: string) => {
    const hired = new Date(hiredDate);
    const diffTime = Math.abs(currentTime.getTime() - hired.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 30) {
      return `${diffDays} days ago`;
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `${months} month${months > 1 ? 's' : ''} ago`;
    } else {
      const years = Math.floor(diffDays / 365);
      return `${years} year${years > 1 ? 's' : ''} ago`;
    }
  };
  return (
    <section className="py-20 bg-gradient-to-br from-white via-purple-50 to-orange-50 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="pointer-events-none select-none">
        {/* Dots top left */}
        <div className="absolute top-8 left-8 z-0 opacity-30">
          <svg width="60" height="24" fill="none"><g><circle cx="8" cy="8" r="3" fill="#A78BFA" /><circle cx="28" cy="8" r="3" fill="#A78BFA" /><circle cx="48" cy="8" r="3" fill="#A78BFA" /><circle cx="18" cy="18" r="3" fill="#FBBF24" /><circle cx="38" cy="18" r="3" fill="#FBBF24" /></g></svg>
        </div>
        {/* Squiggle bottom right */}
        <div className="absolute bottom-8 right-8 z-0 opacity-20">
          <svg width="80" height="32" fill="none"><path d="M0,16 Q20,0 40,16 T80,16" stroke="#F472B6" strokeWidth="4" strokeLinecap="round" /></svg>
        </div>
        {/* Hollow circle mid left */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 z-0">
          <div className="w-8 h-8 border-2 border-cyan-400 rounded-full opacity-20" />
        </div>
        {/* Small yellow dot bottom left */}
        <div className="absolute bottom-12 left-16 w-3 h-3 bg-yellow-300 rounded-full opacity-30" />
        {/* Pink arc top right */}
        <div className="absolute top-10 right-24 z-0 opacity-20">
          <svg width="48" height="24" fill="none"><path d="M0,24 A24,24 0 0,1 48,24" stroke="#F472B6" strokeWidth="4" strokeLinecap="round" /></svg>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-black sm:text-4xl">
            Our Success Stories
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            See where our talented interns have landed.
          </p>
        </div>
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4">
              {hiredInterns.map((intern, index) => {
                const cardBg = [
                  'bg-gradient-to-br from-purple-100 via-white to-pink-100',
                  'bg-gradient-to-br from-orange-100 via-white to-yellow-100',
                  'bg-gradient-to-br from-blue-100 via-white to-cyan-100',
                  'bg-gradient-to-br from-green-100 via-white to-lime-100',
                  'bg-gradient-to-br from-pink-100 via-white to-fuchsia-100',
                ];
                const bgClass = cardBg[index % cardBg.length];
                return (
                  <div key={index} className="flex-grow-0 flex-shrink-0 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                    <div className={`${bgClass} border border-gray-200 rounded-xl overflow-hidden shadow-md h-auto mx-2`}>
                      <div className="p-5 flex flex-col items-center text-center">
                        <div className="w-full flex justify-end mb-3">
                          <div className="w-14 h-14 flex items-center justify-center bg-gray-100 rounded-full border border-gray-200">
                            <Image src={intern.companyLogo} alt={`${intern.company} logo`} width={40} height={40} className="object-contain" />
                          </div>
                        </div>

                        <Image
                          src={intern.avatar}
                          alt={intern.name}
                          width={100}
                          height={100}
                          className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-orange-300 object-cover"
                        />
                        <h3 className="text-lg font-bold text-gray-900 mt-3">{intern.name}</h3>
                        <p className="text-xs text-gray-500 mb-3">{intern.university}</p>

                        <div className="text-center mb-3">
                          <p className="text-sm text-gray-700">
                            Hired as <span className="font-bold text-orange-500 block text-sm">{intern.role}</span>
                            at <span className="font-bold text-gray-900">{intern.company}</span>
                          </p>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full mb-4">
                          <Clock size={14} className="text-orange-400" />
                          <span>Hired {getTimeSinceHired(intern.hiredDate)}</span>
                        </div>

                        <div className="flex items-center gap-3">
                          <a href={intern.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors">
                            <Linkedin size={18} />
                          </a>
                          <a href={intern.twitterUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">
                            <Twitter size={18} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 flex justify-between w-full left-0">
            <button onClick={scrollPrev} className="-ml-6 bg-black hover:bg-gray-800 text-white rounded-full p-2 focus:outline-none z-10 transition-colors shadow-lg">
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button onClick={scrollNext} className="-mr-6 bg-black hover:bg-gray-800 text-white rounded-full p-2 focus:outline-none z-10 transition-colors shadow-lg">
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>
        </div >
      </div >
    </section >
  );
};

export default HiredInterns; 