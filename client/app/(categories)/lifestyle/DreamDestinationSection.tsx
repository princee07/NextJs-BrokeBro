import React from "react";

const destinations = [
    {
        image: "/assets/lifestyle/destination1.jpg",
        name: "Bali, Indonesia",
        discount: "20% Off"
    },
    {
        image: "/assets/lifestyle/destination2.jpg",
        name: "Santorini, Greece",
        discount: "15% Off"
    },
    {
        image: "/assets/lifestyle/destination3.jpg",
        name: "Paris, France",
        discount: "10% Off"
    },
    {
        image: "/assets/lifestyle/destination4.jpg",
        name: "Maldives",
        discount: "25% Off"
    }
];

const DreamDestinationSection = () => (
    <section className="w-full py-12 px-4 md:px-0 bg-white">
        <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-[#3D375A] mb-8 text-center">Find Your Dream Destination</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {destinations.map((dest, idx) => (
                    <div key={idx} className="relative bg-[#F9F9F6] rounded-xl shadow p-0 flex flex-col items-center overflow-hidden group">
                        <img src={dest.image} alt={dest.name} className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300" />
                        <div className="absolute top-3 left-3 bg-yellow-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow">{dest.discount}</div>
                        <div className="w-full p-4 flex flex-col items-center">
                            <div className="font-semibold text-[#222] text-center text-lg">{dest.name}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default DreamDestinationSection;
