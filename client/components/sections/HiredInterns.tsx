"use client"
import Image from 'next/image';
import React, { useCallback, useState, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight, Linkedin, Twitter, Clock } from 'lucide-react';

const hiredInterns = [
  {
    name: 'Prince Kumar',
    university: 'Indian Institute of Technology',
    company: 'BrokeBro Tech',
    role: 'Full Stack Developer Intern',
    avatar: '/assets/people/prince.jpg',
    companyLogo: '/assets/internpage/brokebro.png',
    hiredDate: '2025-4-15',
    linkedinUrl: '#',
    twitterUrl: '#',
  },
  {
    name: 'Mohit Sharma',
    university: 'Delhi Technological University',
    company: 'PNT Solutions',
    role: 'MERN Stack Developer Intern',
    avatar: '/assets/people/mohit .jpg',
    companyLogo: '/assets/internpage/pnt.png',
    hiredDate: '2024-11-20',
    linkedinUrl: '#',
    twitterUrl: '#',
  },
  {
    name: 'Lavanya Patel',
    university: 'National Institute of Technology',
    company: 'UPI Technologies',
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
    hiredDate: '2024-10-30',
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
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Our Success Stories
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            See where our talented interns have landed.
          </p>
        </div>
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4">
              {hiredInterns.map((intern, index) => (
                <div key={index} className="flex-grow-0 flex-shrink-0 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <div className="bg-[#161b22] border border-gray-800 rounded-xl overflow-hidden shadow-lg h-auto mx-2">
                    <div className="p-5 flex flex-col items-center text-center">
                      <div className="w-full flex justify-end mb-3">
                        <div className="w-14 h-14 flex items-center justify-center bg-white rounded-full">
                          <Image src={intern.companyLogo} alt={`${intern.company} logo`} width={40} height={40} className="object-contain" />
                        </div>
                      </div>

                      <Image
                        src={intern.avatar}
                        alt={intern.name}
                        width={100}
                        height={100}
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-orange-400 object-cover"
                      />
                      <h3 className="text-lg font-bold text-white mt-3">{intern.name}</h3>
                      <p className="text-xs text-gray-400 mb-3">{intern.university}</p>

                      <div className="text-center mb-3">
                        <p className="text-sm text-gray-300">
                          Hired as <span className="font-bold text-orange-400 block text-sm">{intern.role}</span> 
                          at <span className="font-bold text-white">{intern.company}</span>
                        </p>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-gray-400 bg-gray-800/50 px-3 py-1.5 rounded-full mb-4">
                        <Clock size={14} className="text-orange-400" />
                        <span>Hired {getTimeSinceHired(intern.hiredDate)}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <a href={intern.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
                          <Linkedin size={18} />
                        </a>
                        <a href={intern.twitterUrl} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
                          <Twitter size={18} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 flex justify-between w-full left-0">
            <button onClick={scrollPrev} className="-ml-6 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 focus:outline-none z-10 transition-colors">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button onClick={scrollNext} className="-mr-6 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 focus:outline-none z-10 transition-colors">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HiredInterns; 