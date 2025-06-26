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
    <section className="py-20 relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/20 blur-3xl rounded-full -z-10" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-400/20 blur-3xl rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex justify-center items-center gap-4">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Recommended Internships
            </h2>
            <div className="relative">
              <span className="bg-white/10 text-orange-400 text-sm font-bold px-4 py-2 rounded-full border border-orange-400/50">FOR YOU</span>
            </div>
          </div>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
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
              {internships.map((internship) => (
                <div key={internship.id} className="flex-grow-0 flex-shrink-0 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 pl-4 py-4 embla__slide">
                  <Link href={`/internships/${internship.slug}`} className="block h-full cursor-pointer">
                    <div className={`relative rounded-xl overflow-hidden p-5 bg-gradient-to-br ${internship.bgColor} h-full flex flex-col border border-white/10 hover:border-white/30 transition-all duration-300 hover:scale-105`}>
                        <div className="absolute inset-0" style={{ backgroundImage: internship.pattern, opacity: 0.6 }}></div>
                        <div className="relative">
                          <div className="flex justify-between items-start">
                              <div className="flex flex-col gap-2">
                                {internship.tags.map(tag => (
                                    <div key={tag} className="text-xs px-3 py-1 bg-black/40 text-white rounded-full self-start flex items-center gap-1.5">
                                      {tag === 'Actively Hiring' && <Zap className="w-3 h-3 text-yellow-400" />}
                                      {tag}
                                    </div>
                                ))}
                              </div>
                              <div className="w-16 h-16 bg-white/90 rounded-lg flex items-center justify-center shadow-md border border-white/20">
                                <Image src={internship.logo} alt={internship.company} width={48} height={48} className="rounded-md" />
                              </div>
                          </div>

                          <h3 className="text-lg font-bold text-white mt-4">{internship.title}</h3>
                          <p className="text-gray-300 text-sm mt-1">{internship.company}</p>

                          <div className="mt-4 space-y-2 text-sm text-gray-400">
                            {internship.applied && <div className="flex items-center"><Users className="w-4 h-4 mr-2"/> {internship.applied} Applied</div>}
                            {internship.views && <div className="flex items-center"><Eye className="w-4 h-4 mr-2"/> {internship.views} Views</div>}
                            {internship.stipend && <div className="flex items-center"><IndianRupee className="w-4 h-4 mr-2"/> {internship.stipend}</div>}
                            {internship.location && <div className="flex items-center"><MapPin className="w-4 h-4 mr-2"/> {internship.location}</div>}
                          </div>
                        </div>
                    </div>
                  </Link>
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
  )
}

export default RecommendedInternships 