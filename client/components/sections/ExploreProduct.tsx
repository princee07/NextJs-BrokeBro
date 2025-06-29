"use client"

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

// Mock product data with placeholder images
const products = [
  {
    id: 1,
    name: 'soxytoes',
    category: 'Genz shocks',
    price: '₹142,990',
    image: 'https://soxytoes.com/cdn/shop/files/Theme_1A_Website.png?v=1697116566&width=2000',
    color: ['bg-slate-600', 'bg-white'],
    size: 'large',
    featured: true
  },
  {
    id: 2,
    name: 'Logitech MX Master 3',
    category: 'Accessories',
    price: '₹9,999',
    image: '/product-mouse-1.png',
    color: ['bg-gray-700', 'bg-gray-500'],
    size: 'small'
  },
  {
    id: 3,
    name: 'Dell XPS 13',
    category: 'Laptops',
    price: '₹112,990',
    image: '/product-laptop-2.png',
    color: ['bg-blue-400', 'bg-gray-800'],
    size: 'medium'
  },
  {
    id: 4,
    name: 'Sony WH-1000XM4',
    category: 'Audio',
    price: '₹29,990',
    image: '/product-headphone-1.png',
    color: ['bg-black', 'bg-amber-500'],
    size: 'small'
  },
  {
    id: 5,
    name: 'iPad Pro 12.9"',
    category: 'Tablets',
    price: '₹109,990',
    image: '/product-tablet-1.png',
    color: ['bg-gray-200', 'bg-gray-600'],
    size: 'medium',
    featured: true
  },
  {
    id: 6,
    name: 'Razer BlackShark V2 Pro',
    category: 'Gaming',
    price: '₹14,999',
    image: '/product-headphone-2.png',
    color: ['bg-green-500', 'bg-gray-900'],
    size: 'small'
  }
];

// Mock promotion data
const promotions = [
  {
    id: 'promo1',
    title: 'Game On',
    subtitle: 'Student discount on gaming laptops',
    color: 'bg-orange-500/20',
    textColor: 'text-orange-500',
    size: 'large',
    image: 'https://soxytoes.com/cdn/shop/files/Theme_1A_Website.png?v=1697116566&width=2000'
  },
  {
    id: 'promo2',
    title: 'Summer Break',
    subtitle: 'Special deals on accessories',
    color: 'bg-blue-500/20',
    textColor: 'text-blue-400',
    size: 'medium',
    image: '/summer-promo.png' // Use placeholder image
  }
];

// Category data
const categories = [
  'All',
  'Laptops',
  'Gaming',
  'Accessories',
  'Audio',
  'Monitors',
  'Tablets'
];

export default function ExploreProducts() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  // Handle scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the section is visible
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Filter products based on selected category
  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <section 
      ref={sectionRef}
      className="w-full bg-black py-20 px-4 md:px-8 lg:px-12 overflow-hidden"
    >
      <div className="container mx-auto max-w-7xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            EXPLORE<br />
            <span className="bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">
              PRODUCTS
            </span>
          </h2>
          <p className="text-gray-400 max-w-md">
            Discover our wide range of tech products with exclusive student discounts. From gaming laptops to accessories, we've got you covered.
          </p>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-10 flex flex-wrap items-center gap-2 md:gap-4"
        >
          {categories.map((category, index) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Promotional Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative col-span-1 md:col-span-2 rounded-2xl overflow-hidden h-[240px] bg-gradient-to-r from-gray-900 to-gray-800"
          >
            <div className="absolute inset-0 flex flex-col justify-center p-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <h3 className="text-3xl font-bold text-white mb-2">Game Like Never Before</h3>
                <p className="text-gray-300 mb-4">Student discounts on gaming laptops & accessories</p>
                <Link href="/gaming">
                  <button className="px-6 py-2 bg-gradient-to-r from-orange-500 to-amber-600 rounded-full text-white text-sm font-medium hover:shadow-lg hover:shadow-orange-500/20 transition-all">
                    View All
                  </button>
                </Link>
              </motion.div>
            </div>
            
            {/* Promotional image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, x: 40 }}
              animate={inView ? { opacity: 1, scale: 1, x: 0 } : { opacity: 0, scale: 0.9, x: 40 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="absolute right-0 bottom-0 h-full w-1/2"
            >
              <div className="relative h-full w-full">
                <Image 
                  src="/gamer-promo.png" 
                  alt="Gaming Promotion"
                  fill
                  style={{ objectFit: "contain", objectPosition: "right bottom" }}
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Products */}
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
              className={`rounded-2xl overflow-hidden bg-gray-900 ${
                product.size === 'large' ? 'col-span-1 md:col-span-2' : ''
              } ${product.size === 'medium' ? 'row-span-1' : ''}`}
            >
              <div className="p-4 h-full flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="text-sm text-gray-400">{product.category}</span>
                    <h3 className="text-white font-medium">{product.name}</h3>
                  </div>
                  <div className="flex space-x-1">
                    {product.color.map((color, idx) => (
                      <div key={idx} className={`w-3 h-3 rounded-full ${color}`}></div>
                    ))}
                  </div>
                </div>
                
                <div className="relative flex-grow flex items-center justify-center p-4 mb-3">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`relative w-full ${product.id === 1 ? 'h-72' : 'h-40'}`}
                  >
                    <Image 
                      src={product.image} 
                      alt={product.name}
                      fill
                      style={{ objectFit: "contain" }}
                    />
                  </motion.div>
                </div>
                
                <div className="flex justify-between items-center mt-auto">
                  <span className="font-bold text-white">{product.price}</span>
                  <Link href={`/product/${product.id}`}>
                    <button className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-500 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Second promo card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.5, delay: 0.5 + (filteredProducts.length * 0.1) }}
            className="relative col-span-1 rounded-2xl overflow-hidden h-[220px] bg-blue-500/20"
          >
            <div className="absolute inset-0 flex flex-col justify-center p-6">
              <h3 className="text-2xl font-bold text-white mb-2">Summer Break Deal</h3>
              <p className="text-blue-300 mb-4">Extra 10% off on accessories</p>
              <Link href="/deals">
                <button className="px-5 py-2 bg-blue-600 rounded-full text-white text-sm font-medium hover:bg-blue-700 transition-all">
                  Shop Now
                </button>
              </Link>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute right-2 bottom-0 h-32 w-32"
            >
              <div className="relative h-full w-full">
                <Image 
                  src="/accessory-promo.png" 
                  alt="Accessory Promotion"
                  fill
                  style={{ objectFit: "contain", objectPosition: "right bottom" }}
                />
              </div>
            </motion.div>
          </motion.div>
          
          {/* View all button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, delay: 0.7 + (filteredProducts.length * 0.1) }}
            className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center mt-8"
          >
            <Link href="/products">
              <button className="group relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium text-orange-500 border border-orange-500 rounded-full hover:text-white">
                <span className="absolute inset-0 w-full h-0 transition-all duration-300 ease-out bg-gradient-to-r from-orange-500 to-amber-500 group-hover:h-full"></span>
                <span className="relative flex items-center">
                  View All Products
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}