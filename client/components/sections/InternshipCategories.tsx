"use client"

import React, { useRef } from 'react'
import { Users, Code, Megaphone, Settings, IndianRupee, ChevronLeft, ChevronRight } from 'lucide-react'

const categories = [
  { name: 'Human resources', icon: Users, color: 'text-pink-400', bgColor: 'bg-pink-400/10' },
  { name: 'Software Development', icon: Code, color: 'text-purple-400', bgColor: 'bg-purple-400/10' },
  { name: 'Marketing', icon: Megaphone, color: 'text-blue-400', bgColor: 'bg-blue-400/10' },
  { name: 'Operations', icon: Settings, color: 'text-green-400', bgColor: 'bg-green-400/10' },
  { name: 'Finance', icon: IndianRupee, color: 'text-orange-400', bgColor: 'bg-orange-400/10' },
]

const InternshipCategories = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      const amount = dir === 'left' ? -200 : 200;
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
            <div className="flex-shrink-0">
                <h2 className="text-xl font-bold text-white">Internships<br/>Category</h2>
            </div>
            <div className="relative flex-1">
              <button onClick={() => scroll('left')} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 shadow transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto pb-4 no-scrollbar scroll-smooth"
                style={{ scrollbarWidth: 'none' }}
              >
                {categories.map((category) => (
                  <div key={category.name} className="flex-shrink-0 flex items-center gap-4 bg-gray-800/50 border border-gray-700/80 rounded-xl p-4 w-60 hover:bg-gray-700/50 transition-colors cursor-pointer">
                    <div className={`p-3 rounded-full ${category.bgColor}`}>
                      <category.icon className={`w-6 h-6 ${category.color}`} />
                    </div>
                    <span className="font-semibold text-white">{category.name}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => scroll('right')} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 shadow transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
              <style>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
              `}</style>
            </div>
        </div>
      </div>
    </section>
  )
}

export default InternshipCategories 