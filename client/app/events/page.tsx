"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import Modal from '../../components/ui/Modal';

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
      price: name === 'isFree' && checked ? 'FREE' : prev.price,
    }));
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-gray-200 text-gray-900 ">
      {/* Hero Section */}
      <div className="relative w-full h-[380px] flex items-center justify-center mb-8">
        <Image
          src="/assets/event.png"
          alt="Event Hero"
          fill
          className="object-cover object-center"
          priority
          onError={(e) => {
            e.currentTarget.src = '/assets/images/broke-bro.png';
          }}
        />
      
      </div>

      {/* Verification Banner for Unverified Users */}
      {/*
        Example usage:
        Show this block only if user is logged in but not verified.
        Replace the condition below with your actual auth/verification logic.
      */}
      {/*
      {isLoggedIn && !isVerified && (
        <div className="w-full flex flex-col items-center justify-center py-4 bg-yellow-50 border-b border-yellow-300 mb-6">
          <span className="text-red-600 font-semibold mb-2">Please verify your account to access all features.</span>
          <a
            href="/student-verification"
            className="inline-block px-6 py-2 bg-gradient-to-r from-orange-400 to-pink-400 text-white rounded-lg font-semibold hover:from-orange-500 hover:to-pink-500 transition"
          >
            Verify Now
          </a>
        </div>
      )}
      */}
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
            className="w-full px-4 py-2 rounded bg-gray-100 text-gray-900 focus:outline-none border border-gray-300"
            required
          />
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            value={form.title}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded bg-gray-100 text-gray-900 focus:outline-none border border-gray-300"
            required
          />
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded bg-gray-100 text-gray-900 focus:outline-none border border-gray-300"
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded bg-gray-100 text-gray-900 focus:outline-none border border-gray-300"
            required
          />
          <div>
            <label className="block mb-1 text-sm">Event Image <span className="text-red-500">*</span></label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 rounded bg-gray-100 text-gray-900 focus:outline-none border border-gray-300"
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
              className="w-full px-4 py-2 rounded bg-gray-100 text-gray-900 focus:outline-none border border-gray-300"
              required
            />
          )}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-400 to-pink-400 text-white py-2 rounded-lg font-semibold hover:from-orange-500 hover:to-pink-500 transition"
          >
            Create Event
          </button>
        </form>
      </Modal>

      {/* Modal for Registration */}
      <Modal isOpen={registerModalOpen} onClose={() => setRegisterModalOpen(false)}>
        <h2 className="text-xl font-bold mb-4">Register for Event</h2>
        {registerSuccess ? (
          <div className="text-green-600 text-center font-semibold py-8 animate-bounce">Registration Successful!</div>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              value={registerName}
              onChange={e => setRegisterName(e.target.value)}
              className="w-full px-4 py-2 rounded bg-gray-100 text-gray-900 focus:outline-none border border-gray-300"
              required
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-400 to-pink-400 text-white py-2 rounded-lg font-semibold hover:from-orange-500 hover:to-pink-500 transition"
            >
              Register
            </button>
          </form>
        )}
      </Modal>

      {/* Modal for Dance Competition Details */}
      <Modal isOpen={danceModalOpen} onClose={() => setDanceModalOpen(false)}>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-center mb-2 bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">BrokeBro 1-Minute Dance Challenge</h2>
          <div className="text-center text-gray-900">College Edition – Show your best moves!</div>
          <div className="text-left text-gray-900">
            <div className="font-bold mb-1">🏆 Prizes</div>
            <div>🥇 Solo: ₹3,000 + Merch</div>
            <div>🥇 Group: ₹5,000 + Merch</div>
            <div className="mb-2">🧾 E-certificates for all valid entries</div>
            <div className="font-bold mb-1">📅 Important Dates</div>
            <div>Submit by: 6 Aug</div>
            <div>Voting 10-15 Aug</div>
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
            className="block w-full bg-gradient-to-r from-orange-400 to-pink-400 text-white py-2 rounded-lg font-semibold text-center hover:from-orange-500 hover:to-pink-500 transition"
          >
            Click here to Register
          </a>
        </div>
      </Modal>

      {/* Filter/Search Bar removed */}

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
                  className="bg-white rounded-lg shadow-lg overflow-hidden flex md:flex-row flex-col group hover:shadow-xl hover:shadow-orange-400/30 transition-all border border-gray-200 min-h-[320px] md:min-h-[280px]"
                >
                  <div className="relative w-full md:w-2/5 h-64 md:h-auto">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-300 rounded-l-lg"
                    />
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-orange-400 to-pink-400 text-xs px-3 py-1 rounded-full font-semibold text-white shadow">
                      {event.isFree ? 'FREE' : event.price}
                    </div>
                  </div>
                  <div className="p-8 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-semibold mb-3 flex items-center gap-2">
                        {event.title}
                        {regCount > 0 && (
                          <span className="ml-2 bg-green-400 text-xs px-2 py-0.5 rounded-full animate-pulse text-white">
                            {regCount} Registered
                          </span>
                        )}
                      </h3>
                      <div className="flex items-center text-gray-500 text-base mb-4">
                        <span className="mr-2">
                          {event.date ? new Date(event.date).toLocaleDateString() : ''}
                        </span>
                        •
                        <span className="ml-2">{event.location}</span>
                      </div>
                      <div className="text-base text-gray-500 mb-4">Host: {event.hostName || 'TBD'}</div>
                    </div>
                    <div className="mt-6">
                      {isHost ? (
                        <button
                          className="w-auto px-6 py-3 bg-gradient-to-r from-orange-200 to-pink-200 text-gray-500 rounded-lg font-semibold text-base opacity-60 cursor-not-allowed"
                          disabled
                        >
                          You are the Host
                        </button>
                      ) : isUserRegistered ? (
                        <button
                          className="w-auto px-6 py-3 bg-gradient-to-r from-orange-200 to-pink-200 text-gray-500 rounded-lg font-semibold text-base opacity-60 cursor-not-allowed"
                          disabled
                        >
                          Registered
                        </button>
                      ) : event.title === 'Dance Competition' ? (
                        <button
                          className="w-auto px-6 py-3 bg-gradient-to-r from-orange-400 to-pink-400 text-white rounded-lg font-semibold text-base hover:from-orange-500 hover:to-pink-500 transition cursor-pointer"
                          onClick={() => setDanceModalOpen(true)}
                        >
                          Register
                        </button>
                      ) : (
                        <a
                          href="https://forms.gle/KGuZFDbTqwWPhtYQ7"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-auto px-6 py-3 bg-gradient-to-r from-orange-400 to-pink-400 text-white rounded-lg font-semibold text-base hover:from-orange-500 hover:to-pink-500 transition cursor-pointer"
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