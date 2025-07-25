import React from 'react';
import Image from 'next/image';

export default function GymBanner() {
    return (
        <section className="w-full flex flex-wrap justify-center gap-8 py-8 px-4 bg-gray-100">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-8 w-full">
                <div className="bg-yellow-400 rounded-xl overflow-hidden shadow-lg flex items-center justify-center p-4" style={{ minWidth: 520, minHeight: 260 }}>
                    <Image src="/assets/gym/nutrabay/banner1.png" alt="Max Protein Banner" width={520} height={260} className="object-contain" />
                </div>
                <div className="bg-gray-100 rounded-xl overflow-hidden shadow-lg flex items-center justify-center p-4" style={{ minWidth: 520, minHeight: 260 }}>
                    <Image src="/assets/gym/nutrabay/banner2.png" alt="Big Muscles Banner" width={520} height={260} className="object-contain" />
                </div>
            </div>
            <div className="w-full flex justify-center mt-8">
                <button
                    className="px-8 py-3 bg-yellow-400 text-black rounded-lg font-semibold shadow cursor-pointer text-lg hover:bg-yellow-500 transition-colors"
                >
                    Get Discount
                </button>
            </div>
        </section>
    );
}
