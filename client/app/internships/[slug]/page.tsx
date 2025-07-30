
"use client";

import React from 'react';
import { internships } from '@/lib/internship-data';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { MapPin, Calendar, Users, BarChart2, CheckCircle, Award, Briefcase, Share2, Bookmark } from 'lucide-react';
import ApplicationActions from '@/components/ui/ApplicationActions';

// Use 'any' for the props to bypass strict type errors
export default function InternshipDetailPage(props: any) {
    const params = React.use(props.params) as { slug: string };
    const internship = internships.find((i) => i.slug === params.slug);
    const [activeTab, setActiveTab] = React.useState('Job Details');

    if (!internship) {
        notFound();
    }

    // Tab content renderers
    const renderTabContent = () => {
        switch (activeTab) {
            case 'Job Details':
                return (
                    <div className="mt-8 prose max-w-none prose-li:my-1 text-black">
                        <h2 className="!text-xl !font-bold !text-black">Key Responsibilities:</h2>
                        <ul>
                            {internship.responsibilities.map((resp, index) => <li key={index}>{resp}</li>)}
                        </ul>
                        {internship.skills.length > 0 && <>
                            <h2 className="!text-xl !font-bold !text-black mt-6">Skills and Qualifications:</h2>
                            <ul>
                                {internship.skills.map((skill, index) => <li key={index}>{skill}</li>)}
                            </ul>
                        </>}
                        {internship.coreSkills.length > 0 && <>
                            <h2 className="!text-xl !font-bold !text-black mt-6">Core Skills:</h2>
                            <ul>
                                {internship.coreSkills.map((skill, index) => <li key={index}>{skill}</li>)}
                            </ul>
                        </>}
                    </div>
                );
            case 'Dates & Deadlines':
                return (
                    <div className="mt-8 text-black">
                        <h2 className="!text-xl !font-bold !text-black mb-2">Dates & Deadlines</h2>
                        <ul>
                            <li>Application Deadline: <span className="font-semibold">{internship.updatedOn}</span></li>
                            <li>Days Left: <span className="font-semibold">{internship.daysLeft}</span></li>
                        </ul>
                    </div>
                );
            case 'Reviews':
                return (
                    <div className="mt-8 text-black">
                        <h2 className="!text-xl !font-bold !text-black mb-2">Reviews</h2>
                        <p>No reviews available yet.</p>
                    </div>
                );
            case 'FAQs & Discussions':
                return (
                    <div className="mt-8 text-black">
                        <h2 className="!text-xl !font-bold !text-black mb-2">FAQs & Discussions</h2>
                        <p>No FAQs or discussions available yet.</p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <main className="bg-gradient-to-b from-[#FAFAF6] to-[#F9F9F6] min-h-screen mt-[140px] pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:grid lg:grid-cols-3 lg:gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 bg-[#FAFAF6] p-6 rounded-lg shadow-md border border-gray-200">
                        {/* Header */}
                        <div className="flex items-start gap-6">
                            <div className="w-24 h-24 bg-[#F3F4F6] rounded-lg flex items-center justify-center shadow-sm border border-gray-200">
                                <Image src={internship.logo} alt={internship.company} width={72} height={72} className="rounded-md" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-black">{internship.title}</h1>
                                <div className="flex items-center flex-wrap gap-x-4 gap-y-2 mt-2 text-gray-800">
                                    <div className="flex items-center gap-2">
                                        <Briefcase className="w-5 h-5 text-gray-400" />
                                        <span>{internship.company}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-5 h-5 text-gray-400" />
                                        <span>{internship.location}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 mt-2 text-sm text-gray-700">
                                    <Calendar className="w-4 h-4" />
                                    <span>Updated On: {internship.updatedOn}</span>
                                </div>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="mt-8 border-b border-gray-200">
                            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                                {['Job Details', 'Dates & Deadlines', 'Reviews', 'FAQs & Discussions'].map(tab => (
                                    <button
                                        key={tab}
                                        type="button"
                                        onClick={() => setActiveTab(tab)}
                                        className={
                                            (activeTab === tab
                                                ? 'border-blue-500 text-blue-600 bg-blue-50'
                                                : 'border-transparent text-gray-500 hover:text-blue-600 hover:border-blue-200') +
                                            ' whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm focus:outline-none'
                                        }
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </nav>
                        </div>

                        {/* Tab Content */}
                        {renderTabContent()}
                    </div>

                    {/* Sidebar */}
                    <div className="mt-12 lg:mt-0">
                        <div className="space-y-6">
                            {/* User Info Card */}
                            <div className="bg-[#FAFAF6] p-4 rounded-lg shadow-md border border-gray-200">
                                <div className='flex justify-between items-center mb-4'>
                                    <p className='text-sm font-medium text-black'>Student Dashboard</p>
                                    <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700'>
                                        <CheckCircle className='w-4 h-4 mr-1.5 text-green-500' /> Eligible
                                    </span>
                                </div>
                                <div className='flex justify-between items-center mb-4'>
                                    <button className='p-2 rounded-lg hover:bg-gray-100'><Bookmark className='w-5 h-5 text-gray-400' /></button>
                                    <button className='p-2 rounded-lg hover:bg-gray-100'><Share2 className='w-5 h-5 text-gray-400' /></button>
                                </div>

                                {/* Application Actions */}
                                <ApplicationActions
                                    internshipTitle={internship.title}
                                    internshipId={internship.slug}
                                />
                            </div>
                            {/* Stats Card */}
                            <div className="bg-[#FAFAF6] p-4 rounded-lg shadow-md border border-gray-200 text-center">
                                <div className="flex justify-around">
                                    <div className="text-center">
                                        <div className="flex items-center justify-center gap-2 text-gray-800"><Users className="w-5 h-5" /> Applied</div>
                                        <p className="font-bold text-2xl text-black mt-1">{internship.applied}</p>
                                    </div>
                                    <div className="text-center">
                                        <div className="flex items-center justify-center gap-2 text-gray-800"><BarChart2 className="w-5 h-5" /> Impressions</div>
                                        <p className="font-bold text-2xl text-black mt-1">{internship.views?.toLocaleString()}</p>
                                    </div>
                                </div>
                                <div className="relative my-4">
                                    <div className='h-2 w-full bg-gray-200 rounded-full overflow-hidden'>
                                        <div className='h-full bg-green-400' style={{ width: `${(internship.applied! / internship.views!) * 100}%` }}></div>
                                    </div>
                                </div>
                                <div className="mx-auto mt-4 inline-block">
                                    <span className="font-bold text-6xl text-black">{internship.daysLeft}</span>
                                    <p className="text-gray-700 font-medium">Days Left</p>
                                </div>
                            </div>

                            {/* Eligibility Card */}
                            <div className="bg-[#FAFAF6] p-4 rounded-lg shadow-md border border-gray-200">
                                <h3 className="font-bold text-lg text-black">Eligibility</h3>
                                <ul className="mt-3 text-gray-900 space-y-2">
                                    {internship.eligibility.map((e, i) => (
                                        <li key={i} className="flex items-center gap-3">
                                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
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