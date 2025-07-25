import React from 'react';
import Image from 'next/image';

const gyms = [
    {
        name: 'Anytime Fitness',
        image: '/assets/gym/anytime.png',
        address: '',
    },
    {
        name: 'HR 7',
        image: '/assets/gym/HR.png',
        address: '2/11,Basement, Main, Road, near Metro Station Patel Nagar, opp. Pillar no.189, Block 2, East Patel Nagar, Patel Nagar, New Delhi, Delhi 110008',
    },
    {
        name: 'Muscle Junkie',
        image: '/assets/gym/musclejunkie.png',
        address: 'patel nagaar',
    },
    {
        name: 'Pro Ultimate',
        image: '/assets/gym/proultimate.png',
        address: 'N0. 340, Basai Darapur Rd, opp. Metro Pillar, Kailash Park, Basai Dara pur, Ramesh Nagar, New Delhi, Delhi, 110015',
    },
    // Add more gym partners as needed
];

export default function GymPartnersSection() {
    const [location, setLocation] = React.useState('All India');
    // For demo, all gyms are shown regardless of location
    return (
        <section className="py-12 bg-gray-100">
            <h2 className="text-4xl font-bold text-center mb-8 text-black">Our Gym Partners</h2>
            {/* Location filter removed as requested */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4">
                {gyms.map((gym, idx) => (
                    <a
                        key={idx}
                        href={`/gym-partner/${gym.name.replace(/\s+/g, '-').toLowerCase()}`}
                        className="bg-white rounded-xl shadow-lg flex flex-col items-center hover:shadow-2xl transition p-3 cursor-pointer no-underline"
                    >
                        <div className="w-full h-[180px] relative flex items-center justify-center">
                            <Image src={gym.image} alt={gym.name} layout="fill" objectFit="cover" className="rounded-lg" />
                        </div>
                        <h3 className="text-lg font-semibold text-center text-black mt-3">{gym.name}</h3>
                    </a>
                ))}
            </div>
        </section>
    );
}
