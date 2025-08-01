"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import AnimatedEyes from "../ui/AnimatedEyes";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [dropdownHovered, setDropdownHovered] = useState(false);
  const brandsList = [
    "Nike", "Adidas", "Biba", "Levis", "Fastrack", "Swiss Beauty", "Salty", "Lakme", "Puma", "Apple", "Dell", "HP", "Asus"
  ];
  const router = useRouter();

  // Enhanced search logic
  const handleSearch = () => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return;

    // Route for 'clothes' or fashion keywords
    if (["clothes", "fashion", "beauty", "apparel"].some(word => query.includes(word))) {
      router.push("/fashion");
      return;
    }
    // Route for 'laptop' or tech keywords
    if (["laptop", "tech", "technology", "tablet", "monitor"].some(word => query.includes(word))) {
      router.push("/explore-products");
      return;
    }
    // Route for top brands (example brands, add more as needed)
    const brands = ["nike", "adidas", "biba", "levis", "fastrack", "swiss beauty", "salty", "lakme", "puma", "apple", "dell", "hp", "asus"];
    if (brands.some(brand => query.includes(brand))) {
      router.push("/top-brands");
      return;
    }
    // Default: go to search results page
    router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
  };

  return (
    <div className="relative w-full max-w-2xl group z-50">
      {/* Brand suggestions dropdown */}
      {(searchFocused || dropdownHovered) && (
        <div
          className="absolute top-full left-0 w-full bg-black border border-orange-500/30 rounded-b-xl shadow-lg z-50"
          onMouseEnter={() => setDropdownHovered(true)}
          onMouseLeave={() => setDropdownHovered(false)}
        >
          <div className="py-2 px-4 text-orange-400 font-semibold text-sm">Popular Brands</div>
          <ul>
            {brandsList.filter(b => b.toLowerCase().includes(searchQuery.toLowerCase())).map((brand) => (
              <li
                key={brand}
                className="px-4 py-2 cursor-pointer hover:bg-orange-500/10 text-black text-sm"
                onClick={() => {
                  setSearchQuery(brand);
                  setSearchFocused(false);
                  setDropdownHovered(false);
                }}
                tabIndex={0}
                onKeyDown={e => {
                  if (e.key === "Enter") {
                    setSearchQuery(brand);
                    setSearchFocused(false);
                    setDropdownHovered(false);
                  }
                }}
              >
                {brand}
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* Background animation effect */}
      <div
        className={`absolute inset-0 rounded-full transition-all duration-500 ${searchFocused
          ? "bg-gradient-to-r from-orange-600/10 to-pink-600/10 blur-md"
          : "bg-black/0"
          }`}
      />
      {/* Search bar container with gradient borders */}
      <div className={`relative bg-gradient-to-r p-[1.5px] rounded-full overflow-hidden ${searchFocused
        ? "from-orange-500 via-orange-400 to-pink-600"
        : "from-orange-500/50 to-orange-600/50"
        } transition-all duration-300`}>
        <div className="relative flex items-center bg-black rounded-full overflow-hidden">
          {/* Search icon */}
          <div className="absolute left-2 z-10 cursor-pointer flex items-center justify-center h-full w-8" onClick={handleSearch} tabIndex={0} role="button" aria-label="Search">
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 ${searchFocused ? "text-orange-500" : "text-gray-400"} transition-colors duration-300 pointer-events-none`}
              animate={{
                scale: searchFocused ? [1, 1.2, 1] : 1
              }}
              transition={{ duration: 0.3 }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </motion.svg>
          </div>
          {/* Search input */}
          <input
            type="text"
            placeholder="Search brands, deals, categories"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => {
              // Only close if not hovering dropdown
              setTimeout(() => {
                if (!dropdownHovered) setSearchFocused(false);
              }, 100);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            className="w-full bg-transparent py-3 pl-10 pr-16 text-black placeholder-gray-400 focus:outline-none focus:placeholder-gray-300"
          />
          {/* Animated Eyes removed for now to ensure search bar works */}
          {/* <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <AnimatedEyes />
          </div> */}
        </div>
      </div>
      {/* Pulse effect on focus */}
      <motion.div
        className="absolute inset-0 rounded-full opacity-0"
        animate={{
          opacity: searchFocused ? [0, 0.1, 0] : 0,
          scale: searchFocused ? [0.95, 1.05] : 1
        }}
        transition={{
          duration: 1.5,
          repeat: searchFocused ? Infinity : 0,
          repeatType: "loop"
        }}
        style={{
          boxShadow: "0 0 20px 5px rgba(249, 115, 22, 0.3)",
          background: "radial-gradient(circle, rgba(249,115,22,0.3) 0%, rgba(0,0,0,0) 70%)"
        }}
      />
      {/* Place AnimatedEyes outside the search bar for now */}
      {/* <div className="flex justify-center mt-2"><AnimatedEyes /></div> */}
    </div>
  );
};

export default SearchBar;
