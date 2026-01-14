
import React, { useState, useEffect } from 'react';
import { Pattern } from '../types';
import { explainAlgorithm } from '../services/geminiService';
import CubeSimulator from './CubeSimulator';

interface PatternModalProps {
  pattern: Pattern | null;
  onClose: () => void;
}

const PatternModal: React.FC<PatternModalProps> = ({ pattern, onClose }) => {
  const [explanation, setExplanation] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'explanation' | 'simulator'>('simulator');

  useEffect(() => {
    if (pattern) {
      setLoading(true);
      explainAlgorithm(pattern.algorithm, pattern.name)
        .then(res => setExplanation(res || 'No explanation available.'))
        .catch(() => setExplanation('Failed to load explanation.'))
        .finally(() => setLoading(false));
      setActiveTab('simulator'); // Default to simulator for visual impact
    }
  }, [pattern]);

  if (!pattern) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md transition-all">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-4xl max-h-[95vh] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
          <div>
            <h2 className="text-3xl font-black text-white tracking-tight">{pattern.name}</h2>
            <div className="flex gap-3 mt-1">
              <span className="text-blue-400 text-xs font-bold uppercase tracking-widest px-2 py-0.5 bg-blue-500/10 rounded">{pattern.size}</span>
              <span className={`text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded ${
                pattern.difficulty === 'Easy' ? 'bg-green-500/10 text-green-500' :
                pattern.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-500' :
                'bg-red-500/10 text-red-500'
              }`}>{pattern.difficulty}</span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-3 hover:bg-slate-800 rounded-2xl transition-all text-slate-500 hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-900/80">
          <button 
            onClick={() => setActiveTab('simulator')}
            className={`flex-1 py-4 text-sm font-bold uppercase tracking-widest transition-all border-b-2 ${
              activeTab === 'simulator' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-500 hover:text-slate-300'
            }`}
          >
            Move Simulator
          </button>
          <button 
            onClick={() => setActiveTab('explanation')}
            className={`flex-1 py-4 text-sm font-bold uppercase tracking-widest transition-all border-b-2 ${
              activeTab === 'explanation' ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-500 hover:text-slate-300'
            }`}
          >
            AI Strategy Guide
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          {activeTab === 'simulator' ? (
            <div className="animate-in fade-in zoom-in duration-300">
               <CubeSimulator algorithm={pattern.algorithm} size={pattern.size} />
               <div className="mt-8 bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                  <h4 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">Pattern Summary</h4>
                  <p className="text-slate-300 leading-relaxed text-lg">{pattern.description}</p>
               </div>
            </div>
          ) : (
            <div className="space-y-8 animate-in slide-in-from-right duration-300">
              <div className="bg-slate-950 p-6 rounded-2xl border border-blue-500/20 shadow-inner">
                <h3 className="text-blue-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-3">Full Sequence</h3>
                <div className="font-mono text-2xl md:text-3xl font-bold text-white break-words tracking-tighter">
                  {pattern.algorithm}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-white text-xl font-bold flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1z" />
                    </svg>
                  </div>
                  Execution Breakdown
                </h3>
                
                {loading ? (
                  <div className="flex flex-col items-center justify-center py-20 space-y-6">
                    <div className="relative">
                      <div className="w-16 h-16 border-4 border-blue-500/20 rounded-full"></div>
                      <div className="absolute inset-0 w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                    <div className="text-center">
                      <p className="text-white font-bold text-lg">Consulting Sensei...</p>
                      <p className="text-slate-500 text-sm">Decoding movement logic</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-slate-300 text-lg leading-relaxed whitespace-pre-wrap bg-slate-950/50 p-8 rounded-3xl border border-slate-800 shadow-inner">
                    {explanation}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="p-6 bg-slate-900 border-t border-slate-800 flex justify-between items-center">
          <div className="text-slate-500 text-xs font-medium">
            Step through with the controls or hit play to automate.
          </div>
          <button 
            onClick={onClose}
            className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl transition-all font-bold tracking-tight border border-slate-700 active:scale-95"
          >
            Done Explorer
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatternModal;
