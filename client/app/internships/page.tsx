import { internships } from '@/lib/internship-data';
import Image from 'next/image';
import Link from 'next/link';

export default function InternshipsPage() {
  return (
    <main className="bg-gradient-to-b from-[#0d1118] to-[#010409] min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-100 mb-10">Internships</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {internships.map((internship) => (
            <Link key={internship.id} href={`/internships/${internship.slug}`} className="block">
              <div className="bg-[#161b22] p-6 rounded-lg shadow-lg border border-gray-800 flex flex-col items-center hover:scale-105 transition-transform duration-200">
                <div className="w-20 h-20 bg-[#0d1117] rounded-lg flex items-center justify-center shadow-md border border-gray-800 mb-4">
                  <Image src={internship.logo} alt={internship.company} width={64} height={64} className="rounded-md" />
                </div>
                <h2 className="text-xl font-bold text-gray-100 text-center">{internship.title}</h2>
                <p className="text-gray-400 mt-2 text-center">{internship.company}</p>
                <p className="text-gray-500 mt-1 text-center">{internship.location}</p>
                <div className="flex flex-wrap gap-2 mt-4 justify-center">
                  {internship.tags.map((tag, i) => (
                    <span key={i} className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">{tag}</span>
                  ))}
                </div>
                <div className="mt-4 text-sm text-gray-400">Updated: {internship.updatedOn}</div>
                <div className="mt-1 text-sm text-gray-400">Days Left: {internship.daysLeft}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
} 