import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showText?: boolean;
  textColor?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  className = '',
  showText = false,
  textColor = 'text-slate-900'
}) => {
  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Exact Vector Emblem of the official Hoài Ngô (吴) Monogram from Logo image */}
      <div 
        className={`${sizeMap[size]} rounded-2xl bg-gradient-to-br from-[#e00202] via-[#b80000] to-[#780000] p-1.5 flex items-center justify-center shadow-md shadow-red-800/25 shrink-0 select-none transition-transform group-hover:scale-105`}
        title="Tiếng Trung Hoài Ngô"
      >
        <svg 
          viewBox="0 0 200 200" 
          className="w-full h-full"
          aria-label="Logo Tiếng Trung Hoài Ngô"
        >
          {/* Top Outer Arc: Starts at left (9 o'clock / 180°), sweeps clockwise over the top and down past 3 o'clock to connect with horizontal line at (167.5, 115) */}
          <path
            d="M 31 100 A 69 69 0 1 1 167.5 115"
            fill="none"
            stroke="#ffffff"
            strokeWidth="11"
            strokeLinecap="butt"
          />

          {/* Bottom Outer Arc: Starts at the left end of the horizontal line (32.5, 115), curves down past 6 o'clock up to ~4:15 o'clock (159, 137), leaving the bottom-right gap */}
          <path
            d="M 32.5 115 A 69 69 0 0 0 159 137"
            fill="none"
            stroke="#ffffff"
            strokeWidth="11"
            strokeLinecap="butt"
          />

          {/* Main Long Horizontal Bar: Crosses horizontally through the center connecting left and right boundaries */}
          <line
            x1="32.5"
            y1="115"
            x2="167.5"
            y2="115"
            stroke="#ffffff"
            strokeWidth="11"
            strokeLinecap="butt"
          />

          {/* Top '口' (Kou Box) */}
          <rect
            x="65"
            y="56"
            width="70"
            height="24"
            fill="none"
            stroke="#ffffff"
            strokeWidth="10"
            strokeLinejoin="miter"
          />

          {/* Intermediate Horizontal Bar under '口' */}
          <line
            x1="58"
            y1="93"
            x2="142"
            y2="93"
            stroke="#ffffff"
            strokeWidth="10"
            strokeLinecap="butt"
          />

          {/* Vertical Stem connecting intermediate bar to the main horizontal line */}
          <line
            x1="100"
            y1="93"
            x2="100"
            y2="115"
            stroke="#ffffff"
            strokeWidth="10"
            strokeLinecap="butt"
          />

          {/* Left Diagonal Leg (pie) */}
          <line
            x1="100"
            y1="115"
            x2="63"
            y2="152"
            stroke="#ffffff"
            strokeWidth="10"
            strokeLinecap="butt"
          />

          {/* Right Diagonal Leg (na) */}
          <line
            x1="100"
            y1="115"
            x2="137"
            y2="152"
            stroke="#ffffff"
            strokeWidth="10"
            strokeLinecap="butt"
          />
        </svg>
      </div>

      {showText && (
        <div className="leading-tight">
          <div className="flex items-center gap-1.5">
            <span className={`font-extrabold text-lg sm:text-xl tracking-tight ${textColor}`}>
              Tiếng Trung <span className="text-red-600">Hoài Ngô</span>
            </span>
            <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 bg-red-50 text-red-600 rounded-md border border-red-200/80">
              HSK 3.0
            </span>
          </div>
          <p className="text-[11px] text-slate-400 font-medium">Học Tiếng Trung Trực Tuyến</p>
        </div>
      )}
    </div>
  );
};
