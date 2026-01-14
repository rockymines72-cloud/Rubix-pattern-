
import React from 'react';

interface CubeVisualProps {
  size?: number;
  className?: string;
  colors?: string[];
}

const CubeVisual: React.FC<CubeVisualProps> = ({ size = 200, className = '', colors = ['bg-blue-500', 'bg-red-500', 'bg-green-500', 'bg-orange-500', 'bg-white', 'bg-yellow-400'] }) => {
  const halfSize = size / 2;
  
  // A simplified 3D cube for visual flair
  return (
    <div className={`relative perspective-[1000px] ${className}`} style={{ width: size, height: size }}>
      <div 
        className="relative w-full h-full preserve-3d cube-animation"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front */}
        <div 
          className={`absolute inset-0 border-2 border-slate-900 grid grid-cols-3 ${colors[0]}`}
          style={{ transform: `translateZ(${halfSize}px)` }}
        >
          {Array(9).fill(0).map((_, i) => <div key={i} className="border border-slate-900 opacity-30" />)}
        </div>
        {/* Back */}
        <div 
          className={`absolute inset-0 border-2 border-slate-900 grid grid-cols-3 ${colors[1]}`}
          style={{ transform: `rotateY(180deg) translateZ(${halfSize}px)` }}
        >
          {Array(9).fill(0).map((_, i) => <div key={i} className="border border-slate-900 opacity-30" />)}
        </div>
        {/* Right */}
        <div 
          className={`absolute inset-0 border-2 border-slate-900 grid grid-cols-3 ${colors[2]}`}
          style={{ transform: `rotateY(90deg) translateZ(${halfSize}px)` }}
        >
          {Array(9).fill(0).map((_, i) => <div key={i} className="border border-slate-900 opacity-30" />)}
        </div>
        {/* Left */}
        <div 
          className={`absolute inset-0 border-2 border-slate-900 grid grid-cols-3 ${colors[3]}`}
          style={{ transform: `rotateY(-90deg) translateZ(${halfSize}px)` }}
        >
          {Array(9).fill(0).map((_, i) => <div key={i} className="border border-slate-900 opacity-30" />)}
        </div>
        {/* Top */}
        <div 
          className={`absolute inset-0 border-2 border-slate-900 grid grid-cols-3 ${colors[4]}`}
          style={{ transform: `rotateX(90deg) translateZ(${halfSize}px)` }}
        >
          {Array(9).fill(0).map((_, i) => <div key={i} className="border border-slate-900 opacity-30" />)}
        </div>
        {/* Bottom */}
        <div 
          className={`absolute inset-0 border-2 border-slate-900 grid grid-cols-3 ${colors[5]}`}
          style={{ transform: `rotateX(-90deg) translateZ(${halfSize}px)` }}
        >
          {Array(9).fill(0).map((_, i) => <div key={i} className="border border-slate-900 opacity-30" />)}
        </div>
      </div>
    </div>
  );
};

export default CubeVisual;
