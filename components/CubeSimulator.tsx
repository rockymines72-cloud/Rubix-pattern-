
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { CubeSize } from '../types';

interface CubeSimulatorProps {
  algorithm: string;
  size: CubeSize;
}

type Face = string[][]; // Grid of colors
type CubeState = { [key: string]: Face };

const COLORS = {
  U: 'bg-white',
  D: 'bg-yellow-500',
  L: 'bg-orange-500',
  R: 'bg-red-600',
  F: 'bg-green-500',
  B: 'bg-blue-600',
};

const getInitialState = (n: number): CubeState => {
  const faces = ['U', 'D', 'L', 'R', 'F', 'B'] as const;
  const state: CubeState = {};
  faces.forEach(f => {
    state[f] = Array(n).fill(null).map(() => Array(n).fill(COLORS[f]));
  });
  return state;
};

const CubeSimulator: React.FC<CubeSimulatorProps> = ({ algorithm, size }) => {
  const n = parseInt(size.split('x')[0]);
  const [cube, setCube] = useState<CubeState>(getInitialState(n));
  const [currentStep, setCurrentStep] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(600);

  const steps = useMemo(() => {
    return algorithm
      .replace(/\([^)]*\)/g, '') 
      .split(/\s+/)
      .filter(s => s.length > 0 && /^[URLDFBurl dfbMESmes]/.test(s));
  }, [algorithm]);

  const rotateFaceGrid = (face: Face, clockwise: boolean = true) => {
    const s = face.length;
    const newFace = Array(s).fill(null).map(() => Array(s).fill(''));
    for (let r = 0; r < s; r++) {
      for (let c = 0; c < s; c++) {
        if (clockwise) newFace[c][s - 1 - r] = face[r][c];
        else newFace[s - 1 - c][r] = face[r][c];
      }
    }
    return newFace;
  };

  const applyMove = useCallback((move: string, state: CubeState): CubeState => {
    let next = JSON.parse(JSON.stringify(state));
    const isPrime = move.includes("'");
    const isDouble = move.includes("2");
    const count = isDouble ? 2 : isPrime ? 3 : 1;
    
    let baseChar = move.charAt(0);
    const isWide = move.includes('w') || (baseChar >= 'a' && baseChar <= 'z');
    const base = baseChar.toUpperCase();

    for (let i = 0; i < count; i++) {
      const cur = JSON.parse(JSON.stringify(next));
      
      if (base === 'U') {
        next.U = rotateFaceGrid(next.U);
        for (let j = 0; j < n; j++) {
          next.F[0][j] = cur.R[0][j];
          next.R[0][j] = cur.B[0][j];
          next.B[0][j] = cur.L[0][j];
          next.L[0][j] = cur.F[0][j];
        }
        if (isWide && n > 2) {
          for (let j = 0; j < n; j++) {
            next.F[1][j] = cur.R[1][j];
            next.R[1][j] = cur.B[1][j];
            next.B[1][j] = cur.L[1][j];
            next.L[1][j] = cur.F[1][j];
          }
        }
      } else if (base === 'D') {
        next.D = rotateFaceGrid(next.D);
        const l = n - 1;
        for (let j = 0; j < n; j++) {
          next.F[l][j] = cur.L[l][j];
          next.L[l][j] = cur.B[l][j];
          next.B[l][j] = cur.R[l][j];
          next.R[l][j] = cur.F[l][j];
        }
        if (isWide && n > 2) {
          for (let j = 0; j < n; j++) {
            next.F[l-1][j] = cur.L[l-1][j];
            next.L[l-1][j] = cur.B[l-1][j];
            next.B[l-1][j] = cur.R[l-1][j];
            next.R[l-1][j] = cur.F[l-1][j];
          }
        }
      } else if (base === 'R') {
        next.R = rotateFaceGrid(next.R);
        const l = n - 1;
        for (let j = 0; j < n; j++) {
          next.U[j][l] = cur.F[j][l];
          next.F[j][l] = cur.D[j][l];
          next.D[j][l] = cur.B[l - j][0];
          next.B[l - j][0] = cur.U[j][l];
        }
        if (isWide && n > 2) {
          for (let j = 0; j < n; j++) {
            next.U[j][l-1] = cur.F[j][l-1];
            next.F[j][l-1] = cur.D[j][l-1];
            next.D[j][l-1] = cur.B[l - j][1];
            next.B[l - j][1] = cur.U[j][l-1];
          }
        }
      } else if (base === 'L') {
        next.L = rotateFaceGrid(next.L);
        const l = n - 1;
        for (let j = 0; j < n; j++) {
          next.U[j][0] = cur.B[l - j][l];
          next.B[l - j][l] = cur.D[j][0];
          next.D[j][0] = cur.F[j][0];
          next.F[j][0] = cur.U[j][0];
        }
        if (isWide && n > 2) {
          for (let j = 0; j < n; j++) {
            next.U[j][1] = cur.B[l - j][l-1];
            next.B[l - j][l-1] = cur.D[j][1];
            next.D[j][1] = cur.F[j][1];
            next.F[j][1] = cur.U[j][1];
          }
        }
      } else if (base === 'F') {
        next.F = rotateFaceGrid(next.F);
        const l = n - 1;
        for (let j = 0; j < n; j++) {
          next.U[l][j] = cur.L[l - j][l];
          next.L[l - j][l] = cur.D[0][l - j];
          next.D[0][l - j] = cur.R[j][0];
          next.R[j][0] = cur.U[l][j];
        }
        if (isWide && n > 2) {
          for (let j = 0; j < n; j++) {
            next.U[l-1][j] = cur.L[l-j][l-1];
            next.L[l-j][l-1] = cur.D[1][l-j];
            next.D[1][l-j] = cur.R[j][1];
            next.R[j][1] = cur.U[l-1][j];
          }
        }
      } else if (base === 'B') {
        next.B = rotateFaceGrid(next.B);
        const l = n - 1;
        for (let j = 0; j < n; j++) {
          next.U[0][j] = cur.R[j][l];
          next.R[j][l] = cur.D[l][l - j];
          next.D[l][l - j] = cur.L[l - j][0];
          next.L[l - j][0] = cur.U[0][j];
        }
        if (isWide && n > 2) {
          for (let j = 0; j < n; j++) {
            next.U[1][j] = cur.R[j][l-1];
            next.R[j][l-1] = cur.D[l-1][l-j];
            next.D[l-1][l-j] = cur.L[l-j][1];
            next.L[l-j][1] = cur.U[1][j];
          }
        }
      } else if (base === 'M' && n >= 3) {
        const mid = Math.floor(n / 2);
        const l = n - 1;
        for (let j = 0; j < n; j++) {
          next.U[j][mid] = cur.B[l - j][l - mid];
          next.B[l - j][l - mid] = cur.D[j][mid];
          next.D[j][mid] = cur.F[j][mid];
          next.F[j][mid] = cur.U[j][mid];
        }
      } else if (base === 'E' && n >= 3) {
        const mid = Math.floor(n / 2);
        for (let j = 0; j < n; j++) {
          next.F[mid][j] = cur.L[mid][j];
          next.L[mid][j] = cur.B[mid][j];
          next.B[mid][j] = cur.R[mid][j];
          next.R[mid][j] = cur.F[mid][j];
        }
      } else if (base === 'S' && n >= 3) {
        const mid = Math.floor(n / 2);
        const l = n - 1;
        for (let j = 0; j < n; j++) {
          next.U[mid][j] = cur.L[l - j][mid];
          next.L[l - j][mid] = cur.D[l - mid][l - j];
          next.D[l - mid][l - j] = cur.R[j][l - mid];
          next.R[j][l - mid] = cur.U[mid][j];
        }
      }
    }
    return next;
  }, [n]);

  useEffect(() => {
    let timer: any;
    if (isPlaying && currentStep < steps.length - 1) {
      timer = setTimeout(() => {
        handleNext();
      }, speed);
    } else if (currentStep >= steps.length - 1) {
      setIsPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, steps, speed]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      const nextStep = currentStep + 1;
      setCube(prev => applyMove(steps[nextStep], prev));
      setCurrentStep(nextStep);
    }
  };

  const handlePrev = () => {
    if (currentStep >= 0) {
      let newState = getInitialState(n);
      for (let i = 0; i < currentStep; i++) {
        newState = applyMove(steps[i], newState);
      }
      setCube(newState);
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    setCube(getInitialState(n));
    setCurrentStep(-1);
    setIsPlaying(false);
  };

  const renderFace = (faceKey: string, gridClass: string, style?: React.CSSProperties) => (
    <div 
      className={`absolute grid ${gridClass} gap-px bg-slate-900 border-2 border-slate-900 shadow-lg`}
      style={{ 
        width: 180, 
        height: 180, 
        ...style 
      }}
    >
      {cube[faceKey].map((row, r) => 
        row.map((color, c) => (
          <div key={`${r}-${c}`} className={`w-full h-full rounded-sm ${color} transition-colors duration-300`} />
        ))
      )}
    </div>
  );

  const gridCols = n === 2 ? 'grid-cols-2' : n === 3 ? 'grid-cols-3' : n === 4 ? 'grid-cols-4' : 'grid-cols-5';
  const half = 90; // Half of face size (180/2)

  return (
    <div className="flex flex-col items-center space-y-12 bg-slate-900/40 p-10 rounded-[2.5rem] border border-slate-800 shadow-2xl">
      <div className="relative h-[300px] w-full flex items-center justify-center perspective-[1000px]">
        <div 
          className="relative w-[180px] h-[180px]"
          style={{ 
            transformStyle: 'preserve-3d', 
            transform: 'rotateX(-25deg) rotateY(-45deg)' 
          }}
        >
          {/* Front */}
          {renderFace('F', gridCols, { transform: `translateZ(${half}px)` })}
          {/* Top */}
          {renderFace('U', gridCols, { transform: `rotateX(90deg) translateZ(${half}px)` })}
          {/* Right */}
          {renderFace('R', gridCols, { transform: `rotateY(90deg) translateZ(${half}px)` })}
          {/* Left - Not visible usually but here for completeness */}
          {renderFace('L', gridCols, { transform: `rotateY(-90deg) translateZ(${half}px)`, opacity: 0.1 })}
          {/* Bottom */}
          {renderFace('D', gridCols, { transform: `rotateX(-90deg) translateZ(${half}px)`, opacity: 0.1 })}
          {/* Back */}
          {renderFace('B', gridCols, { transform: `rotateY(180deg) translateZ(${half}px)`, opacity: 0.1 })}
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2 p-5 bg-slate-950/80 rounded-2xl border border-slate-800 max-w-2xl min-h-[70px] shadow-inner">
        {steps.map((step, idx) => (
          <span 
            key={idx} 
            className={`px-3 py-1.5 rounded-lg font-mono text-sm transition-all duration-300 ${
              idx === currentStep 
                ? 'bg-blue-600 text-white scale-110 shadow-[0_0_20px_rgba(37,99,235,0.4)]' 
                : idx < currentStep 
                  ? 'text-slate-600' 
                  : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            {step}
          </span>
        ))}
        {steps.length === 0 && <span className="text-slate-600 italic">Ready to simulate...</span>}
      </div>

      <div className="flex flex-col md:flex-row items-center gap-6 w-full max-w-lg">
        <div className="flex items-center gap-3 bg-slate-800/60 p-3 rounded-2xl border border-slate-700 w-full justify-center">
          <button onClick={handleReset} className="p-2.5 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-xl transition-all" title="Reset">
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
          </button>
          
          <div className="h-6 w-px bg-slate-700 mx-1" />

          <button onClick={handlePrev} className="p-2.5 bg-slate-700 hover:bg-slate-600 rounded-xl text-white transition-all active:scale-95 disabled:opacity-30" disabled={currentStep < 0}>
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          
          <button 
            onClick={() => setIsPlaying(!isPlaying)} 
            className="px-8 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-xl text-white transition-all shadow-lg active:scale-90 flex items-center gap-2 font-bold"
          >
             {isPlaying ? (
               <><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg> Stop</>
             ) : (
               <><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg> Play</>
             )}
          </button>
          
          <button onClick={handleNext} className="p-2.5 bg-slate-700 hover:bg-slate-600 rounded-xl text-white transition-all active:scale-95 disabled:opacity-30" disabled={currentStep >= steps.length - 1}>
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>

          <div className="h-6 w-px bg-slate-700 mx-1" />

          <select 
            value={speed} 
            onChange={(e) => setSpeed(parseInt(e.target.value))}
            className="bg-slate-700/50 border border-slate-600 text-slate-200 text-xs rounded-xl px-2 py-2 outline-none cursor-pointer font-medium hover:border-blue-500 transition-colors"
          >
            <option value={1000}>Lazy</option>
            <option value={600}>Normal</option>
            <option value={300}>Swift</option>
            <option value={150}>Expert</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default CubeSimulator;
