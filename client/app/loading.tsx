import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="flex flex-col items-center">
        <div className="relative">
          {/* Loading animation */}
          <div className="h-16 w-16 relative">
            <div className="absolute inset-0 rounded-full border-4 border-gray-800"></div>
            <div className="absolute inset-0 rounded-full border-4 border-t-4 border-t-orange-500 animate-spin"></div>
          </div>
        </div>
        <h2 className="mt-6 text-xl font-semibold text-white">
          <span className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent">
            Loading content...
          </span>
        </h2>
      </div>
    </div>
  );
}