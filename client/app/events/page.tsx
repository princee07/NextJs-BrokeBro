"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import Modal from '../../components/ui/Modal';

const initialEvents = [
  {
    id: 2,
    title: 'Dance Competition',
    date: '2023-10-05',
    location: 'BrokeBro Venue',
    price: 'FREE',
    image: '/assets/images/broke-bro.png',
    isFree: true,
    hostName: '',
  },
  {
    id: 1,
    title: 'Indonesia - Korea Conference',
    date: '2023-09-18',
    location: 'Jakarta',
    price: '$10.00',
    image: '/assets/images/discount.png',
    isFree: false,
    hostName: '',
  },
  {
    id: 3,
    title: 'Dream World Wide in Jakarta',
    date: '2023-09-17',
    location: 'Jakarta',
    price: 'FREE',
    image: '/assets/images/broke-bro.png',
    isFree: true,
    hostName: '',
  },
  {
    id: 4,
    title: 'Pesta Kembang Api Terbesar',
    date: '2023-09-16',
    location: 'Jakarta',
    price: '$20.00',
    image: '/assets/images/indian-flag.png',
    isFree: false,
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

  // Registration state
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [registerName, setRegisterName] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [registerEventId, setRegisterEventId] = useState<number | null>(null);
  const [registrations, setRegistrations] = useState<{ [eventId: number]: string[] }>({});

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

  // Registration logic
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
      if (prevRegs.includes(registerName)) return prev; // Prevent duplicate registration
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

  // Helper: check if "current user" (by name) is registered for an event
  const isRegistered = (eventId: number) => {
    return registerEventId && registrations[eventId]?.includes(registerName);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white pt-32">
      {/* Hero Section */}
      <div className="relative w-full h-[380px] flex items-center justify-center mb-8">
        <Image
          src="/assets/images/discount.png"
          alt="Event Hero"
          fill
          className="object-cover object-center opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/60" />
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 tracking-tight drop-shadow-lg">MADE FOR THOSE WHO DO</h1>
          <p className="text-lg text-gray-300 drop-shadow">Discover and book the best events around you</p>
        </div>
      </div>

      {/* Register Now Button (was Host an Event) */}
      <div className="container mx-auto px-4 flex justify-end mb-4">
        <a
          href="https://forms.gle/JbwHTNQcpgUrdXwu7"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-2 rounded-lg font-semibold shadow hover:from-orange-600 hover:to-pink-600 transition flex items-center justify-center"
        >
          Register Now
        </a>
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

      {/* Filter/Search Bar */}
      <div className="container mx-auto px-4 mb-12">
        <div className="bg-gray-800 rounded-xl shadow-lg flex flex-col md:flex-row items-center justify-between p-4 md:space-x-4 space-y-2 md:space-y-0">
          <input
            type="text"
            placeholder="Looking for..."
            className="bg-gray-900 text-white px-4 py-2 rounded-lg focus:outline-none w-full md:w-1/3"
          />
          <input
            type="text"
            placeholder="Location"
            className="bg-gray-900 text-white px-4 py-2 rounded-lg focus:outline-none w-full md:w-1/4"
          />
          <input
            type="date"
            className="bg-gray-900 text-white px-4 py-2 rounded-lg focus:outline-none w-full md:w-1/4"
          />
          <button className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-2 rounded-lg font-semibold shadow hover:from-orange-600 hover:to-pink-600 transition">Search</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 flex flex-col lg:flex-row gap-8">
        {/* Events List */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-6">Upcoming Events</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {events.map(event => {
              const regCount = registrations[event.id]?.length || 0;
              const isUserRegistered = registrations[event.id]?.includes(registerName);
              // Only show 'You are the Host' if the current user is the host and the hostName is not empty and not just whitespace
              const isHost = event.hostName && event.hostName.trim().length > 0 && event.hostName === registerName && registerName.trim().length > 0;
              return (
                <div key={event.id} className="bg-gray-900 rounded-xl shadow-lg overflow-hidden relative group">
                  <div className="relative h-40 w-full">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2 bg-gradient-to-r from-orange-500 to-pink-500 text-xs px-3 py-1 rounded-full font-bold">
                      {event.isFree ? 'FREE' : event.price}
                    </div>
                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(event.id)}
                      className="absolute top-2 right-2 bg-black/60 hover:bg-red-600 text-white rounded-full p-1 transition z-10"
                      title="Delete Event"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-1 flex items-center gap-2">
                      {event.title}
                      {regCount > 0 && (
                        <span className="ml-2 bg-green-600 text-xs px-2 py-0.5 rounded-full animate-pulse">{regCount} Registered</span>
                      )}
                    </h3>
                    <div className="flex items-center text-gray-400 text-sm mb-2">
                      <span className="mr-2">{event.date ? new Date(event.date).toLocaleDateString() : ''}</span>•<span className="ml-2">{event.location}</span>
                    </div>
                    <div className="text-xs text-gray-400 mb-2">Host: {event.hostName}</div>
                    {isHost ? (
                      <button
                        className={`mt-2 w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-2 rounded-lg font-semibold opacity-60 cursor-not-allowed`}
                        disabled
                      >
                        You are the Host
                      </button>
                    ) : isUserRegistered ? (
                      <button
                        className={`mt-2 w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-2 rounded-lg font-semibold opacity-60 cursor-not-allowed`}
                        disabled
                      >
                        Registered
                      </button>
                    ) : (
                      <a
                        href="https://forms.gle/JbwHTNQcpgUrdXwu7"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 w-full block bg-gradient-to-r from-orange-500 to-pink-500 text-white py-2 rounded-lg font-semibold hover:from-orange-600 hover:to-pink-600 transition text-center"
                      >
                        Register
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* Sidebar Widget */}
        <div className="w-full lg:w-80 flex-shrink-0">
          <div className="bg-gray-900 rounded-xl shadow-lg p-6 mb-8">
            <h3 className="text-lg font-bold mb-2">Date & Time</h3>
            <p className="text-gray-400 mb-4">Saturday, Sep 14, 2019 at 20:30 PM</p>
            <button className="w-full mb-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2 rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition">Add to Calendar</button>
            <button className="w-full mb-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white py-2 rounded-lg font-semibold hover:from-orange-600 hover:to-pink-600 transition">Book Now (Free)</button>
            <button className="w-full bg-gray-800 text-gray-300 py-2 rounded-lg font-semibold mt-2">Promoter Program</button>
            <p className="text-xs text-gray-500 mt-2 text-center">No Refunds</p>
          </div>
        </div>
      </div>
    </div>
  );
}