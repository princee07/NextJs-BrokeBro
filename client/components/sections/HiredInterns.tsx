"use client"
import Image from 'next/image';
import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight, Linkedin, Twitter } from 'lucide-react';

const hiredInterns = [
  {
    name: 'Priya Sharma',
    university: 'IIT Bombay',
    company: 'Google',
    role: 'Software Engineer Intern',
    avatar: '/assets/images/hero-internship.png', 
    companyLogo: '/assets/logos/google.svg',
    linkedinUrl: '#',
    twitterUrl: '#',
  },
  {
    name: 'Rahul Verma',
    university: 'BITS Pilani',
    company: 'Microsoft',
    role: 'Data Science Intern',
    avatar: '/assets/images/hero-internship.png',
    companyLogo: '/assets/logos/microsoft.svg',
    linkedinUrl: '#',
    twitterUrl: '#',
  },
  {
    name: 'Anjali Mehta',
    university: 'Delhi Technological University',
    company: 'Amazon',
    role: 'Cloud Engineering Intern',
    avatar: '/assets/images/hero-internship.png',
    companyLogo: '/assets/logos/amazon.svg',
    linkedinUrl: '#',
    twitterUrl: '#',
  },
   {
    name: 'Rohan Gupta',
    university: 'NIT Trichy',
    company: 'Tesla',
    role: 'Mechanical Engineer Intern',
    avatar: '/assets/images/hero-internship.png',
    companyLogo: '/assets/logos/tesla.svg',
    linkedinUrl: '#',
    twitterUrl: '#',
  },
    {
    name: 'Sunita Williams',
    university: 'Stanford University',
    company: 'Netflix',
    role: 'Frontend Developer Intern',
    avatar: '/assets/images/hero-internship.png',
    companyLogo: '/assets/logos/netflix.svg',
    linkedinUrl: '#',
    twitterUrl: '#',
  },
];

const HiredInterns = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 3000, stopOnInteraction: true })]);

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
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
                <div className="flex -ml-4">
                {hiredInterns.map((intern, index) => (
                    <div key={index} className="flex-grow-0 flex-shrink-0 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 pl-4 py-4">
                        <div  className="bg-[#161b22] border border-gray-800 rounded-xl overflow-hidden shadow-lg h-full flex flex-col">
                        <div className="p-6 flex flex-col items-center text-center flex-grow">
                            <div className="w-full flex justify-end mb-4">
                                <div className="w-12 h-12 flex items-center justify-center bg-white rounded-full">
                                    <Image src={intern.companyLogo} alt={`${intern.company} logo`} width={32} height={32} className="object-contain" />
                                </div>
                            </div>

                            <Image
                                src={intern.avatar}
                                alt={intern.name}
                                width={80}
                                height={80}
                                className="w-20 h-20 rounded-full border-4 border-orange-400"
                            />
                            <h3 className="text-xl font-bold text-white mt-4">{intern.name}</h3>
                            <p className="text-sm text-gray-400">{intern.university}</p>
                            
                            <div className="mt-4 text-center">
                                <p className="text-base text-gray-300">
                                    Hired as <span className="font-bold text-orange-400 block">{intern.role}</span> at <span className="font-bold text-white">{intern.company}</span>
                                </p>
                            </div>
                            
                            <div className="flex-grow" />

                            <div className="flex items-center gap-4 mt-6">
                                <a href={intern.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
                                    <Linkedin size={20} />
                                </a>
                                <a href={intern.twitterUrl} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
                                    <Twitter size={20} />
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