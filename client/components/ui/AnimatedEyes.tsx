"use client"

import React, { useRef, useEffect, useState } from 'react';

interface AnimatedEyesProps {
  className?: string;
}

const AnimatedEyes: React.FC<AnimatedEyesProps> = ({ className = '' }) => {
  const eyesContainerRef = useRef<HTMLDivElement>(null);
  const leftPupilRef = useRef<HTMLDivElement>(null);
  const rightPupilRef = useRef<HTMLDivElement>(null);
  
  // Enhanced mouse tracking with increased movement range
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const leftPupil = leftPupilRef.current;
      const rightPupil = rightPupilRef.current;
      
      if (leftPupil && rightPupil && eyesContainerRef.current) {
        // Apply movement to left pupil
        const leftEyeRect = leftPupil.parentElement?.getBoundingClientRect();
        if (leftEyeRect) {
          const eyeCenterX = leftEyeRect.left + leftEyeRect.width / 2;
          const eyeCenterY = leftEyeRect.top + leftEyeRect.height / 2;
          
          // Calculate angle between mouse and eye center
          const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX);
          
          // INCREASED movement radius for more dramatic rotation
          const maxMove = 6; // Increased from 3 to 6
          const moveX = Math.cos(angle) * maxMove;
          const moveY = Math.sin(angle) * maxMove;
          
          // Add smoother transition for natural movement
          leftPupil.style.transition = "transform 0.15s ease-out";
          leftPupil.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
        
        // Apply movement to right pupil
        const rightEyeRect = rightPupil.parentElement?.getBoundingClientRect();
        if (rightEyeRect) {
          const eyeCenterX = rightEyeRect.left + rightEyeRect.width / 2;
          const eyeCenterY = rightEyeRect.top + rightEyeRect.height / 2;
          
          const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX);
          
          // INCREASED movement radius for more dramatic rotation
          const maxMove = 6; // Increased from 3 to 6
          const moveX = Math.cos(angle) * maxMove;
          const moveY = Math.sin(angle) * maxMove;
          
          // Add smoother transition for natural movement
          rightPupil.style.transition = "transform 0.15s ease-out";
          rightPupil.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
      }
    };
    
    // Add quick reset when mouse leaves viewport
    const handleMouseLeave = () => {
      if (leftPupilRef.current && rightPupilRef.current) {
        leftPupilRef.current.style.transform = 'translate(0px, 0px)';
        rightPupilRef.current.style.transform = 'translate(0px, 0px)';
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Random blinking effect
  const [blinkLeft, setBlinkLeft] = useState(false);
  const [blinkRight, setBlinkRight] = useState(false);
  
  useEffect(() => {
    const blinkRandomEye = () => {
      const randomEye = Math.random() > 0.5 ? 'left' : 'right';
      
      if (randomEye === 'left') {
        setBlinkLeft(true);
        setTimeout(() => setBlinkLeft(false), 150);
      } else {
        setBlinkRight(true);
        setTimeout(() => setBlinkRight(false), 150);
      }
      
      // Schedule next blink
      const nextBlink = 3000 + Math.random() * 4000;
      setTimeout(blinkRandomEye, nextBlink);
    };
    
    // Start blinking after initial delay
    const initialDelay = 2000 + Math.random() * 2000;
    const timerId = setTimeout(blinkRandomEye, initialDelay);
    
    return () => clearTimeout(timerId);
  }, []);

  return (
    <div 
      ref={eyesContainerRef}
      className={`flex items-center ${className}`}
    >
      {/* Left Eye */}
      <div className="relative w-10 h-10 rounded-full overflow-hidden flex items-center justify-center">
        {/* Split background - top orange, bottom white */}
        <div className="absolute inset-0 bg-gradient-to-b from-orange-500 from-50% to-white to-50%"></div>
        
        {/* Pupil - Increased size for better visibility and movement */}
        <div 
          ref={leftPupilRef}
          className={`absolute w-5 h-5 bg-black rounded-full z-10 ${
            blinkLeft ? 'opacity-0 transition-opacity duration-100' : ''
          }`}
        >
          {/* Add reflection dot for more realism */}
          <div className="absolute top-1 left-1 w-1 h-1 bg-white/40 rounded-full"></div>
        </div>
      </div>
      
      {/* Spacing between eyes */}
      <div className="w-2"></div>
      
      {/* Right Eye */}
      <div className="relative w-10 h-10 rounded-full overflow-hidden flex items-center justify-center">
        {/* Split background - top orange, bottom white */}
        <div className="absolute inset-0 bg-gradient-to-b from-orange-500 from-50% to-white to-50%"></div>
        
        {/* Pupil - Increased size for better visibility and movement */}
        <div 
          ref={rightPupilRef}
          className={`absolute w-5 h-5 bg-black rounded-full z-10 ${
            blinkRight ? 'opacity-0 transition-opacity duration-100' : ''
          }`}
        >
          {/* Add reflection dot for more realism */}
          <div className="absolute top-1 left-1 w-1 h-1 bg-white/40 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedEyes;