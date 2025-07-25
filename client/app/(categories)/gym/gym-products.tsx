import React from 'react';
import Image from 'next/image';

const products = [
    {
        name: 'Product 1',
        brand: 'Nutrabay',
        image: '/assets/gym/nutrabay/products/image.png',
        price: '₹999',
    },
    {
        name: 'Product 2',
        brand: 'Nutrabay',
        image: '/assets/gym/nutrabay/products/image copy.png',
        price: '₹899',
    },
    {
        name: 'Product 3',
        brand: 'Nutrabay',
        image: '/assets/gym/nutrabay/products/image copy 2.png',
        price: '₹799',
    },
    {
        name: 'Product 4',
        brand: 'Nutrabay',
        image: '/assets/gym/nutrabay/products/image copy 3.png',
        price: '₹699',
    },
    {
        name: 'Product 5',
        brand: 'Nutrabay',
        image: '/assets/gym/nutrabay/products/image copy 4.png',
        price: '₹599',
    },
    {
        name: 'Product 6',
        brand: 'Nutrabay',
        image: '/assets/gym/nutrabay/products/image copy 5.png',
        price: '₹499',
    },
    {
        name: 'Product 7',
        brand: 'Nutrabay',
        image: '/assets/gym/nutrabay/products/image copy 6.png',
        price: '₹399',
    },
    {
        name: 'Product 8',
        brand: 'Nutrabay',
        image: '/assets/gym/nutrabay/products/image copy 7.png',
        price: '₹299',
    },
    {
        name: 'Product 9',
        brand: 'Nutrabay',
        image: '/assets/gym/nutrabay/products/image copy 8.png',
        price: '₹199',
    },
];

export default function GymProductsSection() {
    return (
        <section className="py-12 bg-white">
            <h2 className="text-5xl font-bold text-black text-center mb-8">Our Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4">
                {products.map((product, idx) => (
                    <div
                        key={idx}
                        className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center transition-transform duration-200 hover:-translate-y-2 hover:shadow-2xl border border-gray-200"
                    >
                        <div className="w-48 h-48 mb-4 relative flex items-center justify-center bg-gradient-to-br from-yellow-50 to-gray-100 rounded-lg overflow-hidden">
                            <Image src={product.image} alt={product.name} layout="fill" objectFit="contain" className="rounded-lg" />
                        </div>
                        <span className="text-base text-gray-700 font-medium mb-2 tracking-wide">Brand: {product.brand}</span>
                        <button className="mt-3 px-6 py-2 bg-yellow-400 text-black rounded-lg font-semibold shadow cursor-pointer text-lg hover:bg-yellow-500 transition-colors">Get Discount</button>
                    </div>
                ))}
            </div>
        </section>
    );
}
