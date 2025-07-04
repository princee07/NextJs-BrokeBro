import React, { useState } from 'react';

interface RevealCodeButtonProps {
    code: string;
}

const RevealCodeButton: React.FC<RevealCodeButtonProps> = ({ code }) => {
    const [revealed, setRevealed] = useState(false);
    const [copied, setCopied] = useState(false);

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
            <button
                className={`relative bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg shadow-md transition-all duration-300 mb-2 overflow-hidden focus:outline-none`}
                onClick={() => setRevealed(true)}
                disabled={revealed}
                style={{ minWidth: 160 }}
            >
                {revealed ? (
                    <span className="tracking-widest text-2xl animate-pulse flex items-center gap-2">
                        {code}
                        <button
                            onClick={handleCopy}
                            className="ml-2 text-base bg-white/20 hover:bg-white/40 rounded px-2 py-1 text-white border border-white/30 transition"
                            style={{ lineHeight: 1 }}
                            tabIndex={0}
                            type="button"
                        >
                            📋
                        </button>
                    </span>
                ) : (
                    <span>Reveal code</span>
                )}
            </button>
            {copied && (
                <span className="absolute top-full mt-1 text-green-400 text-xs font-semibold bg-black/80 px-2 py-1 rounded shadow">Copied!</span>
            )}
        </div>
    );
};

export default RevealCodeButton;
