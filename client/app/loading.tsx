import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="flex flex-col items-center">
        {/* Loading video only */}
        <video
          src="/assets/loading.mp4"
          autoPlay
          loop
          muted
          className="w-40 h-40 object-contain mb-6 rounded-lg shadow-lg"
        />
        {/* No loading text, only video is shown while loading */}
      </div>
    </div>
  );
}
