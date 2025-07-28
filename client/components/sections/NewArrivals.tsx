import { useRef } from "react";
import Image from "next/image";

const newArrivals = [
    {
        title: "Lakme Salon Discount",
        brand: "Lakme Salon",
        description: "For anyone to use • Online • Study & Stationery",
        image: "/assets/newarrivals/lakmesalon.jpg",
        logo: "/assets/newarrivals/lakmelogo.png",
        badge: "Only on brokeBro",
    },
    {
        title: "soxytoes Discount",
        brand: "soxytoes",
        description: "For students only ",
        image: "/assets/newarrivals/soxytoes.jpg",
        logo: "/assets/newarrivals/soxytoes-logo.png",
        badge: null,
    },
    {
        title: "lakme Discount",
        brand: "Lakme",
        description: "For students • Online • Beauty & Personal Care",
        image: "/assets/newarrivals/lakme.png",
        logo: "/assets/newarrivals/lakmelogo.png",
        badge: "Student Exclusive",
    },
    {
        title: "salty Discount",
        brand: "Salty",
        description: "For students & educators • Online • Fashion",
        image: "/assets/newarrivals/salty-card.png",
        logo: "/assets/newarrivals/salty-logo.png",
        badge: null,
    },
    {
        title: "Nike Discount",
        brand: "Nike",
        description: "For students only • Online • Fashion",
        image: "/assets/newarrivals/nike-card.png",
        logo: "/assets/newarrivals/nike-logo.png",
        badge: "Limited Time",
    },
   
];


export default function NewArrivals() {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollAmount = clientWidth * 0.8;
            scrollRef.current.scrollTo({
                left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    return (
        <section className="w-full bg-white pt-4 pb-8 mt-14">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">New Arrivals</h2>
                    <div className="flex gap-2">
                        <button
                            aria-label="Scroll left"
                            className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center shadow"
                            onClick={() => scroll('left')}
                        >
                            <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </button>
                        <button
                            aria-label="Scroll right"
                            className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center shadow"
                            onClick={() => scroll('right')}
                        >
                            <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </button>
                    </div>
                </div>
                <div
                    ref={scrollRef}
                    className="flex gap-6 overflow-x-auto scrollbar-hide pb-2"
                    style={{ scrollSnapType: 'x mandatory' }}
                >
                    {newArrivals.map((item, idx) => (
                        <div
                            key={idx}
                            className="min-w-[340px] max-w-xs bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 flex flex-col flex-shrink-0"
                            style={{ scrollSnapAlign: 'start' }}
                        >
                            <div className="relative w-full h-48">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover object-center"
                                    sizes="340px"
                                    priority={idx === 0}
                                />
                                {item.badge && (
                                    <span className="absolute top-2 left-2 bg-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                                        {item.badge}
                                    </span>
                                )}
                                <div className="absolute bottom-2 left-2">
                                    <Image
                                        src={item.logo}
                                        alt={item.brand + ' logo'}
                                        width={48}
                                        height={48}
                                        className="bg-white rounded shadow p-1"
                                    />
                                </div>
                            </div>
                            <div className="flex-1 p-4 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 leading-tight mb-1">{item.title}</h3>
                                    <div className="text-gray-600 text-sm font-semibold mb-2">{item.brand}</div>
                                    <div className="text-gray-500 text-xs mb-4">{item.description}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
