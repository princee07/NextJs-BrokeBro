"use client";

import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import VerificationModal from "@/components/auth/VerificationModal";
// Import referral logic from Navbar
import { getUserReferralData } from "@/app/lib/actions/referral.actions";

const CampusAmbassadorPage = () => {
    const campusAmbassadors = [
        {
            name: "Lavanya Varshney",
            college: "BPIT delhi",
            image: "/assets/people/Lavanya.jpeg",
            bio: "Organized 10+ events, passionate about student networking."
        },
        {
            name: "Mohit luthra",
            college: "Amity Noida",
            image: "/assets/people/mohit.jpg",
            bio: " Marketing specialist."
        },
        {
            name: "Prachi Garg",
            college: "BPIT",
            image: "/assets/people/prachi.jpg",
            bio: "Tech Enthusiast , Developer."
        },
        {
            name: "Prince",
            college: "SDIET",
            image: "/assets/people/prince.jpg",
            bio: "Techn Enthusiast."
        }
    ];

    const [selectedAmbassador, setSelectedAmbassador] = useState(campusAmbassadors[0]);

    // Referral Modal State and Logic (copied from Navbar)
    const [showReferralModal, setShowReferralModal] = useState(false);
    const [referralCode, setReferralCode] = useState("");
    const [referralUrl, setReferralUrl] = useState("");
    const [referralLoading, setReferralLoading] = useState(false);

    const fetchReferralData = async () => {
        setReferralLoading(true);
        try {
            const referralResult = await getUserReferralData();
            if (referralResult.success && referralResult.data) {
                setReferralCode(referralResult.data.referralCode);
                setReferralUrl(referralResult.data.referralUrl);
            }
        } catch (error) {
            // fallback: do nothing
        } finally {
            setReferralLoading(false);
        }
    };

    const handleOpenReferralModal = () => {
        setShowReferralModal(true);
        fetchReferralData();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex flex-col items-center justify-center py-12 px-2">
            <div className="w-full max-w-7xl mx-auto">
                {/* Hero Section */}
                <section className="relative rounded-3xl shadow-2xl overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800 px-4 md:px-16 py-12 flex flex-col items-center justify-center mt-16">
                    <div className="absolute inset-0 z-0">
                        <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-gradient-to-br from-purple-700 to-pink-600 opacity-30 blur-2xl"></div>
                        <div className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-gradient-to-br from-blue-700 to-teal-500 opacity-20 blur-3xl"></div>
                    </div>
                    <div className="relative z-10 flex flex-col items-center w-full">
                        <h1 className="text-4xl md:text-6xl font-extrabold text-white text-center mb-4 drop-shadow-lg tracking-tight">Find Your Tribe,<br />Build Your Network.</h1>
                        {/* Featured Campus Ambassador below heading */}
                        <div className="w-full flex flex-col items-center justify-center gap-6 bg-black/60 rounded-xl p-6 shadow-lg mt-8 mb-8">
                            <h2 className="text-xl font-bold text-pink-400 mb-6 text-center">Campus Ambassadors</h2>
                            {/* Big circles in a single row */}
                            <div className="flex flex-row gap-8 justify-center items-center w-full flex-wrap">
                                {campusAmbassadors.map((amb, idx) => (
                                    <button key={amb.name} onClick={() => setSelectedAmbassador(amb)} className={`w-32 h-32 rounded-full border-4 ${selectedAmbassador.name === amb.name ? 'border-pink-400' : 'border-gray-700'} overflow-hidden focus:outline-none transition-all duration-200 bg-gradient-to-tr from-pink-500 via-orange-400 to-emerald-400 shadow-md`}>
                                        <img src={amb.image} alt={amb.name} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                            {/* Selected ambassador details below circles */}
                            <div className="flex flex-col items-center mt-6">
                                <div className="text-lg font-semibold text-white">{selectedAmbassador.name}</div>
                                <div className="text-sm text-emerald-300 mb-2">{selectedAmbassador.college}</div>
                                <div className="text-gray-300 text-center text-sm mb-2">{selectedAmbassador.bio}</div>
                                {/* Refer & Earn Button - yellow, money-like, with coin icon */}
                                <button
                                    className="mt-4 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black font-bold py-3 px-8 rounded-full shadow-lg transition-colors text-lg flex items-center gap-2 border-2 border-yellow-500"
                                    onClick={handleOpenReferralModal}
                                >
                                    {/* Coin/Money Icon */}
                                    <svg className="w-6 h-6 text-yellow-700" fill="currentColor" viewBox="0 0 24 24">
                                        <circle cx="12" cy="12" r="10" fill="#FFD700" />
                                        <text x="12" y="16" textAnchor="middle" fontSize="12" fill="#B8860B" fontWeight="bold">₹</text>
                                    </svg>
                                    Refer & Earn
                                </button>
                            </div>
                        </div>
                        {/* Events Cards Section - below the form */}

                        <p className="text-lg md:text-2xl text-gray-200 text-center mb-6 max-w-2xl">Connect with like-minded students for fun, friendships, and future opportunities.</p>
                        {/* Referral Modal (copied from Navbar) */}
                        {showReferralModal && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
                                <div className="bg-black rounded-lg p-8 w-[500px] border border-orange-500/30 shadow-lg relative">
                                    <button
                                        className="absolute top-3 right-4 text-gray-400 hover:text-white text-2xl"
                                        onClick={() => setShowReferralModal(false)}
                                    >
                                        &times;
                                    </button>
                                    <h2 className="text-2xl font-bold text-orange-400 mb-4">Refer & Earn</h2>
                                    <p className="text-gray-300 mb-6 text-base">
                                        Share your referral link with friends.<br />
                                        Both of you get <span className="text-amber-300 font-semibold">10 coins</span>!
                                    </p>
                                    {/* Referral Code Display */}
                                    <div className="mb-4">
                                        <div className="text-gray-400 text-sm mb-2">Your Referral Code</div>
                                        <div className="flex items-center gap-3">
                                            <code className="bg-gray-800 text-orange-400 px-3 py-2 rounded font-mono text-lg flex-1">
                                                {referralLoading ? (
                                                    <div className="animate-pulse bg-gray-600 h-6 rounded w-24"></div>
                                                ) : (
                                                    referralCode || 'Loading...'
                                                )}
                                            </code>
                                            <button
                                                onClick={() => {
                                                    if (referralCode && typeof window !== 'undefined') {
                                                        navigator.clipboard.writeText(referralCode);
                                                    }
                                                }}
                                                disabled={!referralCode || referralLoading}
                                                className={`p-2 rounded transition-colors ${!referralCode || referralLoading
                                                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                                    : 'bg-orange-500 hover:bg-orange-600 text-white'
                                                    }`}
                                                title="Copy Code"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    {/* Referral URL Display */}
                                    <div className="mb-6">
                                        <div className="text-gray-400 text-sm mb-2">Your Referral Link</div>
                                        <div className="space-y-3">
                                            {/* URL Display Box */}
                                            <div className="bg-gray-800 rounded-lg p-3 border border-gray-600">
                                                <div className="text-white text-sm break-all font-mono leading-relaxed">
                                                    {referralLoading ? (
                                                        <div className="space-y-2">
                                                            <div className="animate-pulse bg-gray-600 h-4 rounded w-full"></div>
                                                            <div className="animate-pulse bg-gray-600 h-4 rounded w-3/4"></div>
                                                        </div>
                                                    ) : (
                                                        referralUrl || `${typeof window !== 'undefined' ? window.location.origin : ''}/signup?ref=${referralCode}` || 'Loading...'
                                                    )}
                                                </div>
                                            </div>
                                            {/* Action Buttons */}
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => {
                                                        if (typeof window !== 'undefined') {
                                                            const urlToCopy = referralUrl || `${window.location.origin}/signup?ref=${referralCode}`;
                                                            navigator.clipboard.writeText(urlToCopy);
                                                        }
                                                    }}
                                                    disabled={referralLoading || (!referralUrl && !referralCode)}
                                                    className={`flex-1 py-2 px-4 rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-2 ${referralLoading || (!referralUrl && !referralCode)
                                                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                                        : 'bg-orange-500 hover:bg-orange-600 text-white'
                                                        }`}
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                    </svg>
                                                    {referralLoading ? 'Loading...' : 'Copy Link'}
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        const url = referralUrl || `${typeof window !== 'undefined' ? window.location.origin : ''}/signup?ref=${referralCode}`;
                                                        const message = `🎉 Join BrokeBro with my referral link and we both get 10 coins! 💰\n\n${url}\n\nGet amazing student discounts and deals! 🎓`;
                                                        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
                                                        window.open(whatsappUrl, '_blank');
                                                    }}
                                                    disabled={referralLoading || (!referralUrl && !referralCode)}
                                                    className={`py-2 px-4 rounded-lg transition-colors text-sm font-medium flex items-center gap-2 ${referralLoading || (!referralUrl && !referralCode)
                                                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                                        : 'bg-green-600 hover:bg-green-700 text-white'
                                                        }`}
                                                >
                                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487.5-.669.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                                                    </svg>
                                                    WhatsApp
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Debug Info (can be removed later) */}
                                    <div className="text-xs text-gray-500 mt-4 p-2 bg-gray-900 rounded">
                                        <div>Code: {referralCode || 'Not loaded'}</div>
                                        <div>URL: {referralUrl || 'Not loaded'}</div>
                                        <div>Fallback: {`${typeof window !== 'undefined' ? window.location.origin : ''}/signup?ref=${referralCode}`}</div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="flex flex-col md:flex-row gap-8 mb-8 justify-center w-full">
                            <form
                                className="w-full md:w-[900px] bg-black/80 rounded-3xl p-12 shadow-2xl flex flex-col gap-6 border-2 border-emerald-500"
                                onSubmit={e => {
                                    e.preventDefault();
                                    const form = e.target as typeof e.target & {
                                        name: { value: string };
                                        email: { value: string };
                                        phone: { value: string };
                                        college: { value: string };
                                        linkedin: { value: string };
                                        instagram: { value: string };
                                        skills: { value: string };
                                        achievements: { value: string };
                                        experience: { value: string };
                                        motivation: { value: string };
                                    };
                                    const name = form.name.value;
                                    const email = form.email.value;
                                    const phone = form.phone.value;
                                    const college = form.college.value;
                                    const linkedin = form.linkedin.value;
                                    const instagram = form.instagram.value;
                                    const skills = form.skills.value;
                                    const achievements = form.achievements.value;
                                    const experience = form.experience.value;
                                    const motivation = form.motivation.value;
                                    const subject = encodeURIComponent('Campus Ambassador Application');
                                    const body = encodeURIComponent(
                                        `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nCollege: ${college}\nLinkedIn: ${linkedin}\nInstagram: ${instagram}\nSkills: ${skills}\nAchievements: ${achievements}\nExperience: ${experience}\nMotivation: ${motivation}`
                                    );
                                    window.location.href = `mailto:brokebrooindia@gmail.com?subject=${subject}&body=${body}`;
                                }}
                            >
                                <h2 className="text-3xl font-extrabold text-emerald-400 mb-4 text-center tracking-tight">Become a Campus Ambassador</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="flex flex-col gap-4">
                                        <label className="text-gray-200 font-semibold">Full Name
                                            <input type="text" name="name" required className="mt-1 w-full px-4 py-2 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Your Name" />
                                        </label>
                                        <label className="text-gray-200 font-semibold">Email
                                            <input type="email" name="email" required className="mt-1 w-full px-4 py-2 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="you@email.com" />
                                        </label>
                                        <label className="text-gray-200 font-semibold">Phone Number
                                            <input type="tel" name="phone" required className="mt-1 w-full px-4 py-2 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500" placeholder="Your Phone Number" />
                                        </label>
                                        <label className="text-gray-200 font-semibold">College Name
                                            <input type="text" name="college" required className="mt-1 w-full px-4 py-2 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Your College" />
                                        </label>
                                        <label className="text-gray-200 font-semibold">LinkedIn Profile
                                            <input type="url" name="linkedin" className="mt-1 w-full px-4 py-2 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="LinkedIn URL" />
                                        </label>
                                        <label className="text-gray-200 font-semibold">Instagram Profile
                                            <input type="url" name="instagram" className="mt-1 w-full px-4 py-2 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500" placeholder="Instagram URL" />
                                        </label>
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        <label className="text-gray-200 font-semibold">Skills (comma separated)
                                            <input type="text" name="skills" className="mt-1 w-full px-4 py-2 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="e.g. Marketing, Coding, Leadership" />
                                        </label>
                                        <label className="text-gray-200 font-semibold">Achievements
                                            <textarea name="achievements" className="mt-1 w-full px-4 py-2 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500" rows={2} placeholder="Awards, recognitions, etc." />
                                        </label>
                                        <label className="text-gray-200 font-semibold">Share your experience or achievements
                                            <textarea name="experience" required className="mt-1 w-full px-4 py-2 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500" rows={3} placeholder="Tell us about your leadership, event, or social experience" />
                                        </label>
                                        <label className="text-gray-200 font-semibold">Why do you want to be a Campus Ambassador?
                                            <textarea name="motivation" required className="mt-1 w-full px-4 py-2 rounded-lg bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500" rows={2} placeholder="Share your motivation" />
                                        </label>
                                    </div>
                                </div>
                                <button type="submit" className="mt-8 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors text-lg mx-auto">
                                    Submit Application
                                </button>
                            </form>
                        </div>
                    </div>
                </section>
                <div className="w-full mt-10 mb-8">
                    <h2 className="text-2xl font-bold text-orange-400 mb-6 text-center">What's New: Upcoming Events</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
                        {/* Example event cards - replace with dynamic data if available */}
                        {[

                            {
                                title: 'Dance Competiton 2025',
                                desc: 'Join the biggest dance competition of the year! Showcase your talent and win exciting prizes.',
                                date: '2023-10-05',
                                location: 'BrokeBro Venue',
                                price: 'FREE',
                                image: '/assets/dance/image.png',
                                isFree: true,
                            },

                        ].map((event, idx) => (
                            <div key={idx} className="bg-black/80 rounded-2xl shadow-xl border border-orange-500/30 overflow-hidden flex flex-col">
                                <div className="h-40 w-full relative">
                                    <img src={event.image} alt={event.title} className="object-cover w-full h-full" />
                                </div>
                                <div className="p-6 flex flex-col flex-1">
                                    <h3 className="text-xl font-bold text-orange-400 mb-2">{event.title}</h3>
                                    <div className="text-sm text-emerald-300 mb-2">{event.date}</div>
                                    <p className="text-gray-200 mb-4 flex-1">{event.desc}</p>
                                    <button
                                        className="mt-auto bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                                        onClick={() => window.open('https://www.brokebro.in/events', '_blank')}
                                    >
                                        Register Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Info Section */}
                <section className="mt-10 bg-black/80 rounded-2xl p-8 shadow-xl">
                    <h2 className="text-3xl font-extrabold text-emerald-400 mb-6 text-center flex items-center justify-center gap-2">
                        <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3" /></svg>
                        Why Join BrokeBro Campus Ambassador?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <div className="flex flex-col gap-6">
                            <div className="flex items-start gap-4">
                                <span className="bg-emerald-500/20 p-3 rounded-full">
                                    <svg className="w-6 h-6 text-emerald-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 14.93V17a1 1 0 11-2 0v-.07A8.001 8.001 0 014.07 13H7a1 1 0 110 2H4.07A8.001 8.001 0 0111 4.07V7a1 1 0 112 0V4.07A8.001 8.001 0 0119.93 11H17a1 1 0 110-2h2.93A8.001 8.001 0 0113 19.93z" /></svg>
                                </span>
                                <div>
                                    <span className="font-bold text-emerald-300">Leadership Experience</span>
                                    <div className="text-gray-200">Organize and promote BrokeBro events, lead campus initiatives, and build your leadership portfolio.</div>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <span className="bg-yellow-500/20 p-3 rounded-full">
                                    <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                                </span>
                                <div>
                                    <span className="font-bold text-yellow-300">Exclusive Rewards</span>
                                    <div className="text-gray-200">Get access to swag, certificates, and special ambassador-only perks.</div>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <span className="bg-pink-500/20 p-3 rounded-full">
                                    <svg className="w-6 h-6 text-pink-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
                                </span>
                                <div>
                                    <span className="font-bold text-pink-300">Networking</span>
                                    <div className="text-gray-200">Connect with top recruiters, industry leaders, and fellow ambassadors across India.</div>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <span className="bg-blue-500/20 p-3 rounded-full">
                                    <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14H7v-2h5v2zm5-4H7v-2h10v2zm0-4H7V7h10v2z" /></svg>
                                </span>
                                <div>
                                    <span className="font-bold text-blue-300">Resume Boost</span>
                                    <div className="text-gray-200">Stand out with real-world experience and BrokeBro credentials on your CV.</div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-6">
                            <div className="flex items-start gap-4">
                                <span className="bg-orange-500/20 p-3 rounded-full">
                                    <svg className="w-6 h-6 text-orange-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 14.93V17a1 1 0 11-2 0v-.07A8.001 8.001 0 014.07 13H7a1 1 0 110 2H4.07A8.001 8.001 0 0111 4.07V7a1 1 0 112 0V4.07A8.001 8.001 0 0119.93 11H17a1 1 0 110-2h2.93A8.001 8.001 0 0113 19.93z" /></svg>
                                </span>
                                <div>
                                    <span className="font-bold text-orange-300">Social Impact</span>
                                    <div className="text-gray-200">Help students access exclusive deals, discounts, and opportunities for growth.</div>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <span className="bg-green-500/20 p-3 rounded-full">
                                    <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c2.54 0 4.71 1.61 5.5 4.09C13.79 4.61 15.96 3 18.5 3 21.58 3 24 5.42 24 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
                                </span>
                                <div>
                                    <span className="font-bold text-green-300">Fun & Friendships</span>
                                    <div className="text-gray-200">Make lifelong friends, enjoy exclusive events, and be part of a vibrant student community.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h2 className="text-3xl font-extrabold text-pink-400 mb-6 text-center flex items-center justify-center gap-2">
                        <svg className="w-8 h-8 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 01-8 0" /></svg>
                        What You'll Do as an Ambassador
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="flex flex-col gap-6">
                            <div className="flex items-start gap-4">
                                <span className="bg-blue-500/20 p-3 rounded-full">
                                    <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 14.93V17a1 1 0 11-2 0v-.07A8.001 8.001 0 014.07 13H7a1 1 0 110 2H4.07A8.001 8.001 0 0111 4.07V7a1 1 0 112 0V4.07A8.001 8.001 0 0119.93 11H17a1 1 0 110-2h2.93A8.001 8.001 0 0113 19.93z" /></svg>
                                </span>
                                <div>
                                    <span className="font-bold text-blue-300">Promote BrokeBro</span>
                                    <div className="text-gray-200">Spread the word on campus and social media, and help more students discover BrokeBro.</div>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <span className="bg-orange-500/20 p-3 rounded-full">
                                    <svg className="w-6 h-6 text-orange-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                                </span>
                                <div>
                                    <span className="font-bold text-orange-300">Host Events & Contests</span>
                                    <div className="text-gray-200">Organize fun activities, workshops, and competitions for your campus community.</div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-6">
                            <div className="flex items-start gap-4">
                                <span className="bg-pink-500/20 p-3 rounded-full">
                                    <svg className="w-6 h-6 text-pink-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
                                </span>
                                <div>
                                    <span className="font-bold text-pink-300">Share Feedback & Ideas</span>
                                    <div className="text-gray-200">Collaborate with BrokeBro to improve the platform and bring new opportunities to students.</div>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <span className="bg-green-500/20 p-3 rounded-full">
                                    <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c2.54 0 4.71 1.61 5.5 4.09C13.79 4.61 15.96 3 18.5 3 21.58 3 24 5.42 24 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
                                </span>
                                <div>
                                    <span className="font-bold text-green-300">Help Students</span>
                                    <div className="text-gray-200">Guide peers to access exclusive deals, offers, and resources for their growth.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default CampusAmbassadorPage;
