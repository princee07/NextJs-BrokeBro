import React from 'react';

interface DotPatternProps {
  className?: string;
  style?: React.CSSProperties;
}

const DotPattern: React.FC<DotPatternProps> = ({ className, style }) => {
  const dotStyle = "absolute w-2 h-2 bg-gradient-to-br from-fuchsia-500 to-cyan-500 rounded-full filter blur-[1px]";
  const gap = 16; // spacing in pixels

  const dots = [];
  // Column 1
  for (let i = 0; i < 5; i++) {
    dots.push({ top: i * gap, left: 0 * gap });
  }
  // Column 2
  for (let i = 0; i < 5; i++) {
    dots.push({ top: (i + 0.5) * gap, left: 1.2 * gap });
  }
  // Column 3
  for (let i = 0; i < 5; i++) {
    dots.push({ top: i * gap, left: 2.4 * gap });
  }

  return (
    <div
      className={`relative ${className || ''}`}
      style={{
        width: `${2.4 * gap + 8}px`,
        height: `${4.5 * gap + 8}px`,
        ...style
      }}
    >
      {dots.map((dot, i) => (
        <div
          key={i}
          className={`${dotStyle} pulse-blink-dot`}
          style={{
            top: `${dot.top}px`,
            left: `${dot.left}px`,
            animationDelay: `${(i % 5) * 0.2 + (Math.floor(i / 5) * 0.3)}s`
          }}
        ></div>
      ))}
    </div>
  );
};

export default DotPattern; 