
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="relative w-48 h-24 overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-12">
          <div className="wave absolute bg-brand-teal/30 w-[200%] h-[200%] -left-1/2 rounded-[40%] animate-[wave_5s_cubic-bezier(0.36,0.45,0.63,0.53)_infinite]"></div>
          <div className="wave absolute bg-brand-purple/30 w-[200%] h-[200%] -left-1/2 rounded-[40%] animate-[wave_7s_cubic-bezier(0.36,0.45,0.63,0.53)_-.125s_infinite] opacity-70"></div>
        </div>
        <div className="ship absolute left-1/2 bottom-8 -translate-x-1/2 w-16 text-brand-gray-800 dark:text-brand-gray-100 animate-[ship_2s_ease-in-out_infinite]">
          <svg viewBox="0 0 100 100" fill="currentColor">
            <path d="M95 65 L85 65 L85 55 L75 55 L75 45 L65 45 L65 35 L35 35 L35 45 L25 45 L25 55 L15 55 L15 65 L5 65 C2 65, 2 70, 5 70 L95 70 C98 70, 98 65, 95 65 Z" />
            <rect x="30" y="55" width="10" height="10" />
            <rect x="45" y="55" width="10" height="10" />
            <rect x="60" y="55" width="10" height="10" />
          </svg>
        </div>
      </div>
       <p className="mt-4 text-lg font-semibold text-brand-gray-700 dark:text-brand-gray-300 tracking-wider">Analyzing Opportunities...</p>
      <style>{`
        @keyframes wave {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes ship {
          0% { transform: translate(-50%, 0) rotate(-2deg); }
          50% { transform: translate(-50%, -5px) rotate(2deg); }
          100% { transform: translate(-50%, 0) rotate(-2deg); }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;
