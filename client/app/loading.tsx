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
          className="w-full max-w-xl h-auto aspect-video object-contain mb-6 rounded-2xl shadow-2xl"
        />
        {/* No loading text, only video is shown while loading */}
      </div>
    </div>
  );
}
