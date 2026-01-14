
import React, { useState, useMemo } from 'react';
import { CubeSize, Pattern } from './types';
import { PATTERNS, NOTATIONS } from './constants';
import CubeVisual from './components/CubeVisual';
import PatternModal from './components/PatternModal';
import GeminiChat from './components/GeminiChat';

const App: React.FC = () => {
  const [activeSize, setActiveSize] = useState<CubeSize | 'All'>('All');
  const [selectedPattern, setSelectedPattern] = useState<Pattern | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const sizes: (CubeSize | 'All')[] = ['All', '2x2', '3x3', '4x4', '5x5'];

  const filteredPatterns = useMemo(() => {
    return PATTERNS.filter(p => {
      const sizeMatch = activeSize === 'All' || p.size === activeSize;
      const searchMatch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return sizeMatch && searchMatch;
    });
  }, [activeSize, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      {/* Hero Section */}
      <header className="relative py-20 overflow-hidden bg-gradient-to-b from-blue-900/20 to-transparent">
        <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              The Ultimate Cube Library
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight">
              Master the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Cubix.</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-xl leading-relaxed">
              Explore hundreds of stunning Rubik's Cube patterns for 2x2 up to 5x5. 
              Learn the algorithms with step-by-step guidance from our AI Sensei.
            </p>
            <div className="flex gap-4 pt-4">
              <a href="#patterns" className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold transition-all shadow-lg shadow-blue-600/20 hover:-translate-y-1">
                Explore Patterns
              </a>
              <a href="#chat" className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-full font-bold transition-all border border-slate-700">
                Ask the Sensei
              </a>
            </div>
          </div>
          
          <div className="flex-1 flex justify-center items-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full group-hover:bg-blue-500/30 transition-all"></div>
              <CubeVisual size={280} className="relative z-10" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main id="patterns" className="container mx-auto px-4 mt-12 space-y-16">
        
        {/* Pattern Explorer Controls */}
        <section className="space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-slate-800 pb-8">
            <div className="space-y-4 w-full md:w-auto">
              <h2 className="text-2xl font-bold">Pattern Library</h2>
              <div className="flex flex-wrap gap-2">
                {sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setActiveSize(size)}
                    className={`px-6 py-2 rounded-xl text-sm font-bold transition-all border ${
                      activeSize === size 
                        ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/30' 
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="relative w-full md:w-80 group">
              <input 
                type="text" 
                placeholder="Search patterns (e.g. donut, 3x3)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all group-hover:border-slate-700"
              />
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Pattern Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPatterns.length > 0 ? (
              filteredPatterns.map(pattern => (
                <div 
                  key={pattern.id}
                  className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-blue-500/50 transition-all group hover:bg-slate-900"
                >
                  <div className="flex justify-between items-start">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                      pattern.difficulty === 'Easy' ? 'bg-green-500/10 text-green-500' :
                      pattern.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-500' :
                      'bg-red-500/10 text-red-500'
                    }`}>
                      {pattern.difficulty}
                    </span>
                    <span className="text-slate-500 text-xs font-mono">{pattern.size}</span>
                  </div>
                  
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold group-hover:text-blue-400 transition-colors">{pattern.name}</h3>
                    <p className="text-slate-500 text-sm line-clamp-2">{pattern.description}</p>
                  </div>

                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-sm text-blue-300 break-all">
                    {pattern.algorithm}
                  </div>

                  <button 
                    onClick={() => setSelectedPattern(pattern)}
                    className="w-full py-2 bg-slate-800 hover:bg-blue-600 text-white rounded-xl transition-all font-semibold text-sm flex items-center justify-center gap-2 group/btn"
                  >
                    <span>Learn Move</span>
                    <svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center space-y-4">
                <div className="text-4xl">🧩</div>
                <h3 className="text-xl font-bold text-slate-400">No patterns found for "{searchQuery}"</h3>
                <p className="text-slate-500">Try a different search term or cube size.</p>
              </div>
            )}
          </div>
        </section>

        {/* Feature Sections */}
        <div className="grid md:grid-cols-2 gap-12 pt-12">
          {/* Notation Guide */}
          <section className="bg-slate-900/30 border border-slate-800 p-8 rounded-3xl space-y-6">
            <h2 className="text-2xl font-bold">Notation Primer</h2>
            <p className="text-slate-400 text-sm">New to algorithms? Here's a quick cheat sheet for the standard moves used in our library.</p>
            <div className="grid grid-cols-2 gap-3">
              {NOTATIONS.map(note => (
                <div key={note.move} className="flex items-center gap-3 p-3 bg-slate-900 border border-slate-800 rounded-xl hover:border-slate-600 transition-colors">
                  <span className="font-mono font-bold text-blue-400 w-8">{note.move}</span>
                  <span className="text-xs text-slate-400">{note.desc}</span>
                </div>
              ))}
            </div>
          </section>

          {/* AI Chatbox Section */}
          <section id="chat" className="space-y-6">
            <h2 className="text-2xl font-bold">Need Help? Ask Sensei</h2>
            <p className="text-slate-400 text-sm">Ask our AI cube master for advice on solving, finger tricks, or finding custom patterns.</p>
            <GeminiChat />
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-32 py-12 border-t border-slate-800 bg-slate-950">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-xl text-white">C</div>
            <span className="font-bold text-xl">Cubix Master</span>
          </div>
          <div className="flex gap-8 text-slate-500 text-sm">
            <a href="#" className="hover:text-blue-400 transition-colors">Library</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Notation</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-blue-400 transition-colors">About</a>
          </div>
          <p className="text-slate-600 text-xs">© 2024 Cubix Master AI. All cube rights reserved.</p>
        </div>
      </footer>

      {/* Detail Modal */}
      <PatternModal 
        pattern={selectedPattern} 
        onClose={() => setSelectedPattern(null)} 
      />
    </div>
  );
};

export default App;
