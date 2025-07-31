"use client"

import React, { useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import type { EmblaOptionsType } from 'embla-carousel'
import {
  Users,
  Eye,
  MapPin,
  IndianRupee,
  ChevronLeft,
  ChevronRight,
  Zap
} from 'lucide-react'
import Image from 'next/image'
import { internships } from '@/lib/internship-data'
import Link from 'next/link'
import DotPattern from '@/components/ui/DotPattern'

const RecommendedInternships = () => {
  const options: EmblaOptionsType = { loop: true }
  const [emblaRef, emblaApi] = useEmblaCarousel(options)

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

  return (
    <section className="py-12 md:py-20 relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/20 blur-3xl rounded-full -z-10" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-400/20 blur-3xl rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4">
            <h2 className="text-2xl md:text-3xl font-extrabold text-black sm:text-4xl">
              Recommended Internships
            </h2>
            <div className="relative">
              <span className="bg-white/10 text-orange-400 text-xs sm:text-sm font-bold px-3 sm:px-4 py-1 sm:py-2 rounded-full border border-orange-400/50">FOR YOU</span>
            </div>
          </div>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Looking for the best of the best? Here's the top-rated Internships by the learners' community.
          </p>
        </div>

        <div className="relative mt-12">
          <style>
            {`
              .embla__viewport::-webkit-scrollbar {
                display: none;
              }
              .embla__viewport {
                -ms-overflow-style: none;
                scrollbar-width: none;
              }
            `}
          </style>
          <div className="overflow-hidden embla__viewport" ref={emblaRef}>
            <div className="flex -ml-4">
              {internships.map((internship, idx) => {
                const gradients = [
                  'bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400',
                  'bg-gradient-to-br from-orange-400 via-yellow-300 to-pink-400',
                  'bg-gradient-to-br from-teal-400 via-cyan-300 to-blue-400',
                  'bg-gradient-to-br from-green-400 via-lime-300 to-yellow-300',
                  'bg-gradient-to-br from-fuchsia-500 via-pink-400 to-red-400',
                  'bg-gradient-to-br from-indigo-400 via-blue-300 to-purple-400',
                  'bg-gradient-to-br from-amber-400 via-orange-300 to-pink-300',
                ];
                const gradientClass = gradients[idx % gradients.length];
                return (
                  <div key={internship.id} className="flex-grow-0 flex-shrink-0 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 pl-4 py-4 embla__slide">
                    <Link href={`/internships/${internship.slug}`} className="block h-full cursor-pointer">
                      <div className="relative rounded-2xl overflow-hidden h-full flex flex-col shadow-lg border border-gray-200 bg-white transition-all duration-300 hover:scale-105">
                        {/* Top colored section with pattern and logo */}
                        <div className={`relative h-28 flex items-center justify-end p-4 overflow-hidden`}>
                          {/* Lighter colored gradient overlay */}
                          <div className={`absolute inset-0 ${gradientClass} opacity-40`} />
                          {/* Pattern overlay, more visible */}
                          {internship.pattern && (
                            <div
                              className="absolute inset-0 opacity-70"
                              style={{ backgroundImage: internship.pattern, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}
                            />
                          )}
                          {/* Subtle white overlay for extra lightness */}
                          <div className="absolute inset-0 bg-white/30" />
                          <div className="absolute top-3 left-3 flex gap-2 z-10">
                            {internship.tags.map(tag => (
                              <div key={tag} className={`text-xs px-2 py-1 rounded bg-white/80 text-gray-900 font-semibold flex items-center gap-1.5 ${tag === 'Actively Hiring' ? 'border border-yellow-400 bg-yellow-400/90 text-black' : ''}`}>
                                {tag === 'Actively Hiring' && <Zap className="w-3 h-3 text-yellow-600" />}
                                {tag}
                              </div>
                            ))}
                          </div>
                          <div className="relative z-10">
                            <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center shadow-lg border border-gray-100 ml-4" style={{ marginTop: '-2.5rem' }}>
                              <Image src={internship.logo} alt={internship.company} width={64} height={64} className="rounded-md" />
                            </div>
                          </div>
                        </div>
                        {/* Lower white section */}
                        <div className="flex-1 flex flex-col justify-between p-6 pt-4">
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-1 leading-snug">{internship.title}</h3>
                            <p className="text-gray-500 text-base mb-2">{internship.company}</p>
                          </div>
                          <div className="flex flex-col gap-2 mt-2">
                            <div className="flex items-center gap-2 text-gray-700 text-sm font-medium">
                              {internship.views && <><Eye className="w-4 h-4" /> {internship.views} Views</>}
                              {internship.applied && <><Users className="w-4 h-4 ml-4" /> {internship.applied} Applied</>}
                            </div>
                            <div className="flex items-center gap-2 text-gray-700 text-sm font-medium">
                              {internship.location && <><MapPin className="w-4 h-4" /> {internship.location}</>}
                              {internship.stipend && <><IndianRupee className="w-4 h-4 ml-4" /> {internship.stipend}</>}
                            </div>
                          </div>
                        </div>
                        {/* Arrow icon bottom right */}
                        <div className="absolute bottom-4 right-4">
                          <svg width="24" height="24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div >

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
  )
}

export default RecommendedInternships 