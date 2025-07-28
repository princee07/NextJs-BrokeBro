"use client"

import React, { useRef, useEffect, useState } from 'react';

interface AnimatedEyesProps {
  className?: string;
  size?: 'sm' | 'md';
}

const AnimatedEyes: React.FC<AnimatedEyesProps> = ({ className = '', size = 'md' }) => {
  const eyesContainerRef = useRef<HTMLDivElement>(null);
  const leftPupilRef = useRef<HTMLDivElement>(null);
  const rightPupilRef = useRef<HTMLDivElement>(null);

  // Define size-specific styles with circular eyes and reduced spacing
  const sizeStyles = size === 'sm' ? {
    container: 'w-13.5 h-6.5', // Adjusted container width to account for reduced spacing
    eye: 'w-6.5 h-6.5', // Equal width and height for circular eyes
    pupil: 'w-3.25 h-3.25', // Proportional pupil size, circular
    reflection: 'w-1.6 h-1.6', // Proportional reflection dot, circular
    spacing: 'w-1', // Reduced spacing between eyes
    maxMove: 6.5, // Movement range consistent with previous size
  } : {
    container: 'w-18.5 h-9', // Adjusted container width to account for reduced spacing
    eye: 'w-9 h-9', // Equal width and height for circular eyes
    pupil: 'w-4.5 h-4.5', // Proportional pupil size, circular
    reflection: 'w-2.25 h-2.25', // Proportional reflection dot, circular
    spacing: 'w-1', // Reduced spacing between eyes
    maxMove: 9, // Movement range consistent with previous size
  };

  // Enhanced mouse tracking
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

          // Use size-specific movement radius
          const moveX = Math.cos(angle) * sizeStyles.maxMove;
          const moveY = Math.sin(angle) * sizeStyles.maxMove;

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

          // Use size-specific movement radius
          const moveX = Math.cos(angle) * sizeStyles.maxMove;
          const moveY = Math.sin(angle) * sizeStyles.maxMove;

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
  }, [sizeStyles.maxMove]);

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
      className={`flex items-center ${sizeStyles.container} ${className}`}
    >
      {/* Left Eye */}
      <div className={`relative ${sizeStyles.eye} rounded-full overflow-hidden flex items-center justify-center border border-black`}>
        {/* Split background - top orange, bottom white */}
        <div className="absolute inset-0 bg-gradient-to-b from-orange-500 from-50% to-white to-50%"></div>

        {/* Pupil */}
        <div
          ref={leftPupilRef}
          className={`absolute ${sizeStyles.pupil} bg-black rounded-full z-10 ${
            blinkLeft ? 'opacity-0 transition-opacity duration-100' : ''
          }`}
        >
          {/* Reflection dot */}
          <div className={`absolute top-[15%] left-[15%] ${sizeStyles.reflection} bg-white/40 rounded-full`}></div>
        </div>
      </div>

      {/* Spacing between eyes */}
      <div className={sizeStyles.spacing}></div>

      {/* Right Eye */}
      <div className={`relative ${sizeStyles.eye} rounded-full overflow-hidden flex items-center justify-center border border-black`}>
        {/* Split background - top orange, bottom white */}
        <div className="absolute inset-0 bg-gradient-to-b from-orange-500 from-50% to-white to-50%"></div>

        {/* Pupil */}
        <div
          ref={rightPupilRef}
          className={`absolute ${sizeStyles.pupil} bg-black rounded-full z-10 ${
            blinkRight ? 'opacity-0 transition-opacity duration-100' : ''
          }`}
        >
          {/* Reflection dot */}
          <div className={`absolute top-[15%] left-[15%] ${sizeStyles.reflection} bg-white/40 rounded-full`}></div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedEyes;