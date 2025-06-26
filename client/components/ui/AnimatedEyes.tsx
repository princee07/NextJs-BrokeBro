"use client"

import React, { useState, useEffect } from 'react';

const AnimatedEyes = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <>
      <style>{`
        @keyframes blink {
          0%, 90%, 100% {
            transform: scaleY(1);
          }
          95% {
            transform: scaleY(0.1);
          }
        }
        .blinking-eye-lid {
          animation: blink 4s infinite;
        }
      `}</style>
      <div
        className="fixed top-0 left-0 z-50 pointer-events-none"
        style={{ transform: `translate(${position.x - 25}px, ${position.y - 15}px)` }}
      >
        <div className="flex items-center">
          {/* Left Eye */}
          <div className="relative w-12 h-12 bg-white rounded-full border-2 border-black flex items-center justify-center">
            <div className="absolute top-0 w-full h-1/2 bg-orange-500 rounded-t-full blinking-eye-lid" />
            <div className="relative w-4 h-4 bg-black rounded-full" />
            <div className="absolute bottom-1 w-6 h-3 border-b-2 border-l-2 border-r-2 border-black rounded-b-full" style={{transform: "rotate(180deg)"}}/>
          </div>
          {/* Right Eye */}
          <div className="relative w-12 h-12 bg-white rounded-full border-2 border-black flex items-center justify-center -ml-1">
            <div className="absolute top-0 w-full h-1/2 bg-orange-500 rounded-t-full blinking-eye-lid" />
            <div className="relative w-4 h-4 bg-black rounded-full" />
             <div className="absolute bottom-1 w-6 h-3 border-b-2 border-l-2 border-r-2 border-black rounded-b-full" style={{transform: "rotate(180deg)"}}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnimatedEyes;