import { internships } from '@/lib/internship-data';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { MapPin, Calendar, Users, BarChart2, CheckCircle, Award, Briefcase, Share2, Bookmark } from 'lucide-react';

// Use 'any' for the props to bypass strict type errors
export default function InternshipDetailPage(props: any) {
  const { params } = props;
  const internship = internships.find((i) => i.slug === params.slug);

  if (!internship) {
    notFound();
  }

  return (
    <main className="bg-gradient-to-b from-[#0d1117] to-[#010409] min-h-screen pt-56 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-3 lg:gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 bg-[#161b22] p-6 rounded-lg shadow-lg border border-gray-800">
                    {/* Header */}
                    <div className="flex items-start gap-6">
                        <div className="w-24 h-24 bg-[#0d1117] rounded-lg flex items-center justify-center shadow-md border border-gray-800">
                            <Image src={internship.logo} alt={internship.company} width={72} height={72} className="rounded-md" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-100">{internship.title}</h1>
                            <div className="flex items-center flex-wrap gap-x-4 gap-y-2 mt-2 text-gray-400">
                                <div className="flex items-center gap-2">
                                    <Briefcase className="w-5 h-5 text-gray-500" />
                                    <span>{internship.company}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-5 h-5 text-gray-500" />
                                    <span>{internship.location}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                                <Calendar className="w-4 h-4" />
                                <span>Updated On: {internship.updatedOn}</span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Tabs */}
                    <div className="mt-8 border-b border-gray-800">
                        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                            <a href="#" className="border-blue-500 text-blue-500 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">Job Details</a>
                            <a href="#" className="border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-700 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">Dates & Deadlines</a>
                            <a href="#" className="border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-700 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">Reviews</a>
                            <a href="#" className="border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-700 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">FAQs & Discussions</a>
                        </nav>
                    </div>

                    {/* Details Content */}
                    <div className="mt-8 prose prose-invert max-w-none prose-li:my-1 text-gray-300">
                        <h2 className="!text-xl !font-bold !text-gray-200">Key Responsibilities:</h2>
                        <ul>
                            {internship.responsibilities.map((resp, index) => <li key={index}>{resp}</li>)}
                        </ul>
                        {internship.skills.length > 0 && <>
                          <h2 className="!text-xl !font-bold !text-gray-200 mt-6">Skills and Qualifications:</h2>
                          <ul>
                              {internship.skills.map((skill, index) => <li key={index}>{skill}</li>)}
                          </ul>
                        </>}
                        {internship.coreSkills.length > 0 && <>
                           <h2 className="!text-xl !font-bold !text-gray-200 mt-6">Core Skills:</h2>
                          <ul>
                              {internship.coreSkills.map((skill, index) => <li key={index}>{skill}</li>)}
                          </ul>
                        </>}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="mt-12 lg:mt-0">
                    <div className="space-y-6">
                        {/* User Info Card */}
                        <div className="bg-[#161b22] p-4 rounded-lg shadow-lg border border-gray-800">
                           <div className='flex justify-between items-center mb-4'>
                             <p className='text-sm font-medium text-gray-300'>prince1362005@gmail.com</p>
                             <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900/50 text-green-300'>
                               <CheckCircle className='w-4 h-4 mr-1.5' /> Eligible
                             </span>
                           </div>
                           <div className='flex justify-between items-center mb-4'>
                              <button className='p-2 rounded-lg hover:bg-gray-800/60'><Bookmark className='w-5 h-5 text-gray-400'/></button>
                              <button className='p-2 rounded-lg hover:bg-gray-800/60'><Share2 className='w-5 h-5 text-gray-400'/></button>
                           </div>
                           <button className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg">Quick Apply</button>
                           <a href="/resume-builder/templates" className="w-full block mt-4 bg-gradient-to-r from-orange-500 to-amber-600 text-white font-bold py-3 rounded-lg text-center hover:from-orange-600 hover:to-amber-700 transition-all duration-300 shadow-md hover:shadow-orange-500/20">Build Resume with AI</a>
                        </div>
                        {/* Stats Card */}
                        <div className="bg-[#161b22] p-4 rounded-lg shadow-lg border border-gray-800 text-center">
                            <div className="flex justify-around">
                                <div className="text-center">
                                    <div className="flex items-center justify-center gap-2 text-gray-400"><Users className="w-5 h-5"/> Applied</div>
                                    <p className="font-bold text-2xl text-gray-100 mt-1">{internship.applied}</p>
                                </div>
                                <div className="text-center">
                                    <div className="flex items-center justify-center gap-2 text-gray-400"><BarChart2 className="w-5 h-5"/> Impressions</div>
                                    <p className="font-bold text-2xl text-gray-100 mt-1">{internship.views?.toLocaleString()}</p>
                                </div>
                            </div>
                            <div className="relative my-4">
                               <div className='h-2 w-full bg-gray-700 rounded-full overflow-hidden'>
                                   <div className='h-full bg-green-500' style={{width: `${(internship.applied!/internship.views!)*100}%`}}></div>
                               </div>
                            </div>
                            <div className="mx-auto mt-4 inline-block">
                                <span className="font-bold text-6xl text-gray-200">{internship.daysLeft}</span>
                                <p className="text-gray-400 font-medium">Days Left</p>
                            </div>
                        </div>

                        {/* Eligibility Card */}
                        <div className="bg-[#161b22] p-4 rounded-lg shadow-lg border border-gray-800">
                           <h3 className="font-bold text-lg text-gray-200">Eligibility</h3>
                           <ul className="mt-3 text-gray-300 space-y-2">
                               {internship.eligibility.map((e, i) => (
                                <li key={i} className="flex items-center gap-3">
                                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" /> 
                                  <span>{e}</span>
                                </li>
                               ))}
                           </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
  )
} 