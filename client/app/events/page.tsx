"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Image from 'next/image';
import Modal from '../../components/ui/Modal';
import { useUserVerification } from '@/hooks/useUserVerification';
const initialEvents = [
  {
    id: 1,
    title: 'Dance Competition',
    date: '2023-10-05',
    location: 'BrokeBro Venue',
    price: 'FREE',
    image: '/assets/dance/image.png',
    isFree: true,
    hostName: '',
  },
];

export default function EventsPage() {
  const [events, setEvents] = useState(initialEvents);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    title: '',
    date: '',
    location: '',
    price: '',
    image: '',
    isFree: false,
    hostName: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [registerName, setRegisterName] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [registerEventId, setRegisterEventId] = useState<number | null>(null);
  const [registrations, setRegistrations] = useState<{ [eventId: number]: string[] }>({});
  const [danceModalOpen, setDanceModalOpen] = useState(false);
  const router = useRouter();
  const { isAuthenticated, isLoading } = useKindeBrowserClient();
  const { isVerified: userIsVerified } = useUserVerification();

  const router = useRouter();
  // Search/filter state
  const [searchText, setSearchText] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
      price: name === 'isFree' && checked ? 'FREE' : prev.price,
    }));
  };
  const handleEventClick = (event: typeof initialEvents[0]) => {

    if (isLoading) return; // Don't do anything while loading auth state
    if (!isAuthenticated) {
      router.push('/signup');
      return;
    }
    if (!userIsVerified) {
      router.push('/student-verification');
      return;
    }
    // You can open a modal, show details, or do anything else here
    console.log(`Clicked on event: ${event.title}`);
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setImageFile(file);
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      setForm(prev => ({ ...prev, image: url }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.date || !form.location || !form.image || !form.hostName) return;
    setEvents(prev => [
      {
        id: prev.length + 1,
        ...form,
        price: form.isFree ? 'FREE' : form.price,
        image: form.image,
        hostName: form.hostName,
      },
      ...prev,
    ]);
    setForm({ title: '', date: '', location: '', price: '', image: '', isFree: false, hostName: '' });
    setImageFile(null);
    setImagePreview(null);
    setModalOpen(false);
  };

  const handleDelete = (id: number) => {
    setEvents(prev => prev.filter(event => event.id !== id));
    setRegistrations(prev => {
      const newRegs = { ...prev };
      delete newRegs[id];
      return newRegs;
    });
  };

  const openRegisterModal = (eventId: number) => {
    setRegisterEventId(eventId);
    setRegisterModalOpen(true);
    setRegisterName('');
    setRegisterSuccess(false);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerEventId || !registerName) return;
    setRegistrations(prev => {
      const prevRegs = prev[registerEventId] || [];
      if (prevRegs.includes(registerName)) return prev;
      return {
        ...prev,
        [registerEventId]: [...prevRegs, registerName],
      };
    });
    setRegisterSuccess(true);
    setTimeout(() => {
      setRegisterModalOpen(false);
      setRegisterSuccess(false);
    }, 1200);
  };

  const isRegistered = (eventId: number) => {
    return registerEventId && registrations[eventId]?.includes(registerName);
  };
  // 3-stage click handler


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white pt-32">
      {/* Hero Section */}
      <div className="relative w-full h-[380px] flex items-center justify-center mb-8">
        <Image
          src="/assets/events/events.jpg"
          alt="Event Hero"
          fill
          className="object-cover object-center opacity-80"
          priority
          onError={(e) => {
            e.currentTarget.src = '/assets/images/broke-bro.png';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
        <div className="relative z-10 text-center bg-black/30 rounded-lg p-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 tracking-tight drop-shadow-lg bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
            MADE FOR THOSE WHO DO
          </h1>
          <p className="text-lg text-gray-100 drop-shadow">Discover and book the best events around you</p>
        </div>
      </div>

      {/* Modal for Event Creation */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <h2 className="text-xl font-bold mb-4">Host an Event</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="hostName"
            placeholder="Your Name (Host)"
            value={form.hostName}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded bg-gray-800 text-white focus:outline-none"
            required
          />
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            value={form.title}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded bg-gray-800 text-white focus:outline-none"
            required
          />
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded bg-gray-800 text-white focus:outline-none"
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded bg-gray-800 text-white focus:outline-none"
            required
          />
          <div>
            <label className="block mb-1 text-sm">Event Image <span className="text-red-500">*</span></label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 rounded bg-gray-800 text-white focus:outline-none"
              required
            />
            {imagePreview && (
              <img src={imagePreview} alt="Preview" className="mt-2 rounded-lg max-h-40 mx-auto" />
            )}
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isFree"
              checked={form.isFree}
              onChange={handleInputChange}
              id="isFree"
            />
            <label htmlFor="isFree" className="text-sm">Free Event</label>
          </div>
          {!form.isFree && (
            <input
              type="text"
              name="price"
              placeholder="Price (e.g. $10.00)"
              value={form.price}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded bg-gray-800 text-white focus:outline-none"
              required
            />
          )}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-2 rounded-lg font-semibold hover:from-orange-600 hover:to-pink-600 transition"
          >
            Create Event
          </button>
        </form>
      </Modal>

      {/* Modal for Registration */}
      <Modal isOpen={registerModalOpen} onClose={() => setRegisterModalOpen(false)}>
        <h2 className="text-xl font-bold mb-4">Register for Event</h2>
        {registerSuccess ? (
          <div className="text-green-400 text-center font-semibold py-8 animate-bounce">Registration Successful!</div>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              value={registerName}
              onChange={e => setRegisterName(e.target.value)}
              className="w-full px-4 py-2 rounded bg-gray-800 text-white focus:outline-none"
              required
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-2 rounded-lg font-semibold hover:from-orange-600 hover:to-pink-600 transition"
            >
              Register
            </button>
          </form>
        )}
      </Modal>

      {/* Modal for Dance Competition Details */}
      {isAuthenticated && <Modal isOpen={danceModalOpen} onClose={() => setDanceModalOpen(false)}>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-center mb-2 bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">BrokeBro 1-Minute Dance Challenge</h2>
          <div className="text-center text-white">College Edition – Show your best moves!</div>
          <div className="text-left text-white">
            <div className="font-bold mb-1">🏆 Prizes</div>
            <div>🥇 Solo: ₹3,000 + Merch</div>
            <div>🥇 Group: ₹5,000 + Merch</div>
            <div className="mb-2">🧾 E-certificates for all valid entries</div>
            <div className="font-bold mb-1">📅 Important Dates</div>
            <div>Submit by: 6 Aug</div>
            <div>Voting: 1-15 Aug</div>
            <div className="mb-2">Results: 15 Aug, 6 PM</div>
            <div className="font-bold mb-1">✅ What to Do</div>
            <div>Upload a 60-sec dance video (MP4/MOV, ≤100MB)</div>
            <div>Or share a Google Drive link (set to public)</div>
            <div>No bot likes – real votes only!</div>
          </div>
          <a
            href="https://forms.gle/KGuZFDbTqwWPhtYQ7"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-2 rounded-lg font-semibold text-center hover:from-orange-600 hover:to-pink-600 transition"
          >
            Click here to Register
          </a>
        </div>
      </Modal>}

      {/* Filter/Search Bar */}
      <div className="container mx-auto px-4 mb-12">
        <form
          className="bg-black rounded-2xl shadow-2xl flex flex-col md:flex-row items-center justify-between p-6 md:space-x-6 space-y-3 md:space-y-0 border-2 border-orange-500"
          onSubmit={e => e.preventDefault()}
        >
          <div className="flex items-center w-full md:w-1/3 bg-gray-900 rounded-lg px-3 py-2 border-2 border-transparent focus-within:border-orange-500 transition-all">
            <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search events..."
              className="bg-transparent text-white px-2 py-1 w-full focus:outline-none placeholder-gray-400"
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
            />
          </div>
          <div className="flex items-center w-full md:w-1/4 bg-gray-900 rounded-lg px-3 py-2 border-2 border-transparent focus-within:border-orange-500 transition-all">
            <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" />
            </svg>
            <input
              type="text"
              placeholder="Location"
              className="bg-transparent text-white px-2 py-1 w-full focus:outline-none placeholder-gray-400"
              value={searchLocation}
              onChange={e => setSearchLocation(e.target.value)}
            />
          </div>
          <div className="flex items-center w-full md:w-1/4 bg-gray-900 rounded-lg px-3 py-2 border-2 border-transparent focus-within:border-orange-500 transition-all">
            <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
            <input
              type="date"
              className="bg-transparent text-white px-2 py-1 w-full focus:outline-none placeholder-gray-400 rounded-lg"
              value={searchDate}
              onChange={e => setSearchDate(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-8 py-2 rounded-xl font-bold shadow-lg hover:from-orange-600 hover:to-pink-600 transition flex items-center gap-2"
            onClick={e => {}}
            tabIndex={-1}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z" />
            </svg>
            Search
          </button>
        </form>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-8">
        {/* Events List */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">Upcoming Events</h2>
          <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto">
            {events.map(event => {
              const regCount = registrations[event.id]?.length || 0;
              const isUserRegistered = registrations[event.id]?.includes(registerName);
              const isHost = event.hostName && event.hostName.trim().length > 0 && event.hostName === registerName && registerName.trim().length > 0;
              return (
                <div
                  key={event.id}
                  className="bg-gray-900 rounded-lg shadow-lg overflow-hidden flex md:flex-row flex-col group hover:shadow-xl hover:shadow-orange-500/30 transition-all border border-gray-800 min-h-[320px] md:min-h-[280px]"
                  onClick={() => handleEventClick(event)}
                >
                  <div className="relative w-full md:w-2/5 h-64 md:h-auto">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-300 rounded-l-lg"
                    />
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-pink-500 text-xs px-3 py-1 rounded-full font-semibold">
                      {event.isFree ? 'FREE' : event.price}
                    </div>
                  </div>
                  <div className="p-8 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-semibold mb-3 flex items-center gap-2">
                        {event.title}
                        {regCount > 0 && (
                          <span className="ml-2 bg-green-600 text-xs px-2 py-0.5 rounded-full animate-pulse">
                            {regCount} Registered
                          </span>
                        )}
                      </h3>
                      <div className="flex items-center text-gray-400 text-base mb-4">
                        <span className="mr-2">
                          {event.date ? new Date(event.date).toLocaleDateString() : ''}
                        </span>
                        •
                        <span className="ml-2">{event.location}</span>
                      </div>
                      <div className="text-base text-gray-400 mb-4">Host: {event.hostName || 'TBD'}</div>
                    </div>
                    <div className="mt-6">
                      {isHost ? (
                        <button
                          className="w-auto px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg font-semibold text-base opacity-60 cursor-not-allowed"
                          disabled
                        >
                          You are the Host
                        </button>
                      ) : isUserRegistered ? (
                        <button
                          className="w-auto px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg font-semibold text-base opacity-60 cursor-not-allowed"
                          disabled
                        >
                          Registered
                        </button>
                      ) : event.title === 'Dance Competition' ? (
                        <button
                          className="w-auto px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg font-semibold text-base hover:from-orange-600 hover:to-pink-600 transition"
                          onClick={() => {
                            if (isLoading) return;
                            if (!isAuthenticated) {
                              router.push('/signup');
                              return;
                            }
                            setDanceModalOpen(true);
                          }}
                        >
                          Register
                        </button>
                      ) : (
                        <button
                          className="w-auto px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg font-semibold text-base hover:from-orange-600 hover:to-pink-600 transition"
                          onClick={() => {
                            if (isLoading) return;
                            if (!isAuthenticated) {
                              router.push('/signup');
                              return;
                            }
                            window.open('https://forms.gle/KGuZFDbTqwWPhtYQ7', '_blank');
                          }}
                        >
                          Register
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            {events
              .filter(event => {
                // Filter by search text (title)
                if (searchText && !event.title.toLowerCase().includes(searchText.toLowerCase())) return false;
                // Filter by location
                if (searchLocation && !event.location.toLowerCase().includes(searchLocation.toLowerCase())) return false;
                // Filter by date (YYYY-MM-DD)
                if (searchDate && event.date !== searchDate) return false;
                return true;
              })
              .map(event => {
                const regCount = registrations[event.id]?.length || 0;
                const isUserRegistered = registrations[event.id]?.includes(registerName);
                const isHost = event.hostName && event.hostName.trim().length > 0 && event.hostName === registerName && registerName.trim().length > 0;
                return (
                  <div
                    key={event.id}
                    className="bg-gray-900 rounded-lg shadow-lg overflow-hidden flex md:flex-row flex-col group hover:shadow-xl hover:shadow-orange-500/30 transition-all border border-gray-800 min-h-[320px] md:min-h-[280px]"
                    onClick={() => handleEventClick(event)}
                  >
                    <div className="relative w-full md:w-2/5 h-64 md:h-auto">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-300 rounded-l-lg"
                      />
                      <div className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-pink-500 text-xs px-3 py-1 rounded-full font-semibold">
                        {event.isFree ? 'FREE' : event.price}
                      </div>
                    </div>
                    <div className="p-8 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-2xl font-semibold mb-3 flex items-center gap-2">
                          {event.title}
                          {regCount > 0 && (
                            <span className="ml-2 bg-green-600 text-xs px-2 py-0.5 rounded-full animate-pulse">
                              {regCount} Registered
                            </span>
                          )}
                        </h3>
                        <div className="flex items-center text-gray-400 text-base mb-4">
                          <span className="mr-2">
                            {event.date ? new Date(event.date).toLocaleDateString() : ''}
                          </span>
                          •
                          <span className="ml-2">{event.location}</span>
                        </div>
                        <div className="text-base text-gray-400 mb-4">Host: {event.hostName || 'TBD'}</div>
                      </div>
                      <div className="mt-6">
                        {isHost ? (
                          <button
                            className="w-auto px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg font-semibold text-base opacity-60 cursor-not-allowed"
                            disabled
                          >
                            You are the Host
                          </button>
                        ) : isUserRegistered ? (
                          <button
                            className="w-auto px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg font-semibold text-base opacity-60 cursor-not-allowed"
                            disabled
                          >
                            Registered
                          </button>
                        ) : event.title === 'Dance Competition' ? (
                          <button
                            className="w-auto px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg font-semibold text-base hover:from-orange-600 hover:to-pink-600 transition"
                            onClick={e => { e.stopPropagation(); setDanceModalOpen(true); }}
                          >
                            Register
                          </button>
                        ) : (
                          <a
                            href="https://forms.gle/KGuZFDbTqwWPhtYQ7"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-auto px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg font-semibold text-base hover:from-orange-600 hover:to-pink-600 transition"
                            onClick={e => e.stopPropagation()}
                          >
                            Register
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
