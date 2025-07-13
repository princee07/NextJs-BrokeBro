import React, { useState } from 'react';
import { markCodeAsRevealed } from '@/utils/codeExpiry';
interface RevealCodeButtonProps {
  code: string;
  isRevealed?: boolean;
  brandSlug?: string;
  userId?: string;
  codeType?: 'fixed' | 'expiring';
}

const RevealCodeButton: React.FC<RevealCodeButtonProps> = ({ code, isRevealed = false, 
  brandSlug, 
  userId, 
  codeType }) => {
    const [revealed, setRevealed] = useState(isRevealed);
    const [copied, setCopied] = useState(false);

      const handleReveal = () => {
    if (!revealed) {
      setRevealed(true);
      
      // Mark as revealed in localStorage for expiring codes
      if (codeType === 'expiring' && brandSlug && userId) {
        markCodeAsRevealed(brandSlug, userId);
      }
    }
  };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 1200);
        } catch (e) {
            // fallback or error
        }
    };

    return (
        <div className="relative flex flex-col items-center">
         
                {!revealed ? (
        <button
          onClick={handleReveal}
          className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-200 transform hover:scale-105"
        >
          Reveal code
        </button>
          ) : (
        <div className="bg-gray-800 border-2 border-dashed border-gray-600 rounded-lg p-4">
          <div className="text-center">
            <p className="text-gray-400 text-sm mb-2">Your discount code:</p>
            <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white font-mono text-xl font-bold py-2 px-4 rounded-lg tracking-wider">
              {code}
            </div>
            {codeType === 'expiring' && (
              <p className="text-red-400 text-xs mt-2">
                ⚠️ This code can only be revealed once and expires after 24 hours
              </p>
            )}
          </div>
        </div>
      )}
    </div>        
    );
};

export default RevealCodeButton;
