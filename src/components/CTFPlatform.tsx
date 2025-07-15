import React, { useState, useEffect } from 'react';
import { Shield, Download, Flag, CheckCircle, AlertCircle, Info, Sparkles, Trophy } from 'lucide-react';
import { challenges } from '../data/challenges';
import { Challenge } from '../types';

interface CTFPlatformProps {
  onNavigate: (page: string) => void;
}

const CTFPlatform: React.FC<CTFPlatformProps> = ({ onNavigate }) => {
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [flagInput, setFlagInput] = useState('');
  const [solvedChallenges, setSolvedChallenges] = useState<Set<string>>(new Set());
  const [totalPoints, setTotalPoints] = useState(0);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    // Load solved challenges from localStorage
    const saved = localStorage.getItem('freep0nx-solved-challenges');
    const savedPoints = localStorage.getItem('freep0nx-total-points');
    if (saved) {
      setSolvedChallenges(new Set(JSON.parse(saved)));
    }
    if (savedPoints) {
      setTotalPoints(parseInt(savedPoints));
    }
  }, []);

  const handleFlagSubmit = () => {
    if (!selectedChallenge) return;

    if (flagInput.trim() === selectedChallenge.flag) {
      const newSolved = new Set(solvedChallenges);
      if (!newSolved.has(selectedChallenge.id)) {
        newSolved.add(selectedChallenge.id);
        setSolvedChallenges(newSolved);
        localStorage.setItem('freep0nx-solved-challenges', JSON.stringify([...newSolved]));
        
        const newPoints = totalPoints + selectedChallenge.points;
        setTotalPoints(newPoints);
        localStorage.setItem('freep0nx-total-points', newPoints.toString());
        
        setMessage({ type: 'success', text: `Bravo ! Flag validé ! +${selectedChallenge.points} points` });
      } else {
        setMessage({ type: 'success', text: 'Flag déjà validé !' });
      }
      setFlagInput('');
    } else {
      setMessage({ type: 'error', text: 'Flag incorrect, essayez encore !' });
    }

    setTimeout(() => setMessage(null), 3000);
  };

  const handleDownload = (filename: string) => {
    // Create a temporary link element to trigger download
    const link = document.createElement('a');
    link.href = `/${filename}`;
    link.download = filename;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show success message
    setMessage({ type: 'success', text: `Téléchargement de ${filename} démarré !` });
    setTimeout(() => setMessage(null), 2000);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-emerald-300 border-emerald-500/30 bg-emerald-500/10';
      case 'medium': return 'text-amber-300 border-amber-500/30 bg-amber-500/10';
      case 'hard': return 'text-rose-300 border-rose-500/30 bg-rose-500/10';
      default: return 'text-slate-300 border-slate-500/30 bg-slate-500/10';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'reverse': return 'bg-violet-500/10 text-violet-300 border-violet-500/30';
      case 'web': return 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30';
      case 'crypto': return 'bg-amber-500/10 text-amber-300 border-amber-500/30';
      case 'osint': return 'bg-rose-500/10 text-rose-300 border-rose-500/30';
      case 'steganography': return 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30';
      default: return 'bg-slate-500/10 text-slate-300 border-slate-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-white/5 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Shield className="h-8 w-8 text-emerald-400" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                freep0nx
              </h1>
            </div>
            <nav className="hidden md:flex space-x-1">
              <button
                onClick={() => onNavigate('home')}
                className="px-4 py-2 rounded-xl text-slate-300 hover:text-emerald-300 hover:bg-emerald-500/10 transition-all duration-300"
              >
                Accueil
              </button>
              <button
                onClick={() => onNavigate('team')}
                className="px-4 py-2 rounded-xl text-slate-300 hover:text-violet-300 hover:bg-violet-500/10 transition-all duration-300"
              >
                Équipe
              </button>
              <button
                onClick={() => onNavigate('ctf')}
                className="px-4 py-2 rounded-xl text-rose-300 bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 transition-all duration-300"
              >
                CTF Platform
              </button>
              <button
                onClick={() => onNavigate('terminal')}
                className="px-4 py-2 rounded-xl text-slate-300 hover:text-emerald-300 hover:bg-emerald-500/10 transition-all duration-300"
              >
                Terminal
              </button>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <div className="relative inline-block mb-6">
            <h1 className="text-5xl font-black bg-gradient-to-r from-rose-400 via-violet-400 to-emerald-400 bg-clip-text text-transparent">
              CTF Platform
            </h1>
            <div className="absolute -top-2 -right-6">
              <Trophy className="h-6 w-6 text-rose-400 animate-pulse" />
            </div>
          </div>
          <p className="text-xl text-slate-300">
            Challenges de cybersécurité - Testez vos compétences !
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Challenges List */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-8">Challenges Disponibles</h2>
            {challenges.map((challenge) => (
              <div
                key={challenge.id}
                className={`group bg-white/5 backdrop-blur-xl rounded-3xl p-6 border cursor-pointer transition-all duration-500 transform hover:scale-105 ${
                  selectedChallenge?.id === challenge.id 
                    ? 'border-rose-500/50 bg-rose-500/10 shadow-lg shadow-rose-500/20' 
                    : 'border-white/10 hover:border-white/20 hover:bg-white/10'
                }`}
                onClick={() => setSelectedChallenge(challenge)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <h3 className="text-lg font-bold text-white group-hover:text-rose-300 transition-colors">
                      {challenge.title}
                    </h3>
                    <span className="text-amber-400 font-bold text-sm bg-amber-500/10 px-2 py-1 rounded-full border border-amber-500/30">
                      +{challenge.points}pts
                    </span>
                    {solvedChallenges.has(challenge.id) && (
                      <CheckCircle className="h-5 w-5 text-emerald-400" />
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs px-3 py-1 rounded-full border font-medium ${getCategoryColor(challenge.category)}`}>
                      {challenge.category}
                    </span>
                    <span className={`text-xs px-3 py-1 rounded-full border font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                      {challenge.difficulty}
                    </span>
                  </div>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed break-all">{challenge.description}</p>
              </div>
            ))}
          </div>

          {/* Challenge Details */}
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 sticky top-8">
            {selectedChallenge ? (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">{selectedChallenge.title}</h2>
                  {solvedChallenges.has(selectedChallenge.id) && (
                    <div className="flex items-center space-x-2 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
                      <CheckCircle className="h-5 w-5 text-emerald-400" />
                      <span className="text-emerald-300 text-sm font-medium">Résolu</span>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center space-x-3 mb-6">
                  <span className={`text-sm px-4 py-2 rounded-full border font-medium ${getCategoryColor(selectedChallenge.category)}`}>
                    {selectedChallenge.category}
                  </span>
                  <span className={`text-sm px-4 py-2 rounded-full border font-medium ${getDifficultyColor(selectedChallenge.difficulty)}`}>
                    {selectedChallenge.difficulty}
                  </span>
                </div>

                <div className="bg-white/5 rounded-2xl p-6 mb-6 border border-white/10">
                  <p className="text-slate-300 leading-relaxed">{selectedChallenge.description}</p>
                </div>

                {selectedChallenge.hint && (
                  <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-2xl p-6 mb-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <Info className="h-5 w-5 text-cyan-400" />
                      <span className="text-cyan-300 font-semibold">Indice</span>
                    </div>
                    <p className="text-cyan-200 leading-relaxed">{selectedChallenge.hint}</p>
                  </div>
                )}

                {selectedChallenge.files && selectedChallenge.files.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-lg font-bold text-white mb-4">Fichiers à télécharger</h3>
                    <div className="space-y-3">
                      {selectedChallenge.files.map((file, index) => (
                        <button
                          key={index}
                          onClick={() => handleDownload(file)}
                          className="flex items-center space-x-3 bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 px-4 py-3 rounded-xl hover:bg-emerald-500/20 transition-all duration-300 w-full group"
                        >
                          <Download className="h-5 w-5 group-hover:scale-110 transition-transform" />
                          <span className="font-medium">{file}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-3">
                      Entrez votre flag
                    </label>
                    <input
                      type="text"
                      value={flagInput}
                      onChange={(e) => setFlagInput(e.target.value)}
                      placeholder="freep0nx{...}"
                      className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-rose-400/50 focus:ring-2 focus:ring-rose-400/20 transition-all duration-300"
                    />
                  </div>
                  <button
                    onClick={handleFlagSubmit}
                    disabled={!flagInput.trim()}
                    className="w-full bg-gradient-to-r from-rose-500/80 to-violet-500/80 hover:from-rose-500 hover:to-violet-500 disabled:from-slate-600/50 disabled:to-slate-700/50 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:transform-none flex items-center justify-center space-x-2 shadow-lg hover:shadow-rose-500/25"
                  >
                    <Flag className="h-5 w-5" />
                    <span>Valider le Flag</span>
                  </button>
                </div>

                {message && (
                  <div className={`mt-6 p-4 rounded-xl border flex items-center space-x-3 ${
                    message.type === 'success' 
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' 
                      : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                  }`}>
                    {message.type === 'success' ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <AlertCircle className="h-5 w-5" />
                    )}
                    <span className="font-medium">{message.text}</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-16">
                <Flag className="h-16 w-16 text-slate-500 mx-auto mb-6" />
                <p className="text-slate-400 text-lg">Sélectionnez un challenge pour commencer</p>
              </div>
            )}
          </div>
        </div>

        {/* Progress */}
        <div className="mt-16 bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white flex items-center space-x-2">
              <Trophy className="h-6 w-6 text-amber-400" />
              <span>Progression</span>
            </h3>
            <div className="flex items-center space-x-4">
              <div className="text-amber-400 font-black text-2xl">{totalPoints}</div>
              <div className="text-slate-400">/ {challenges.reduce((sum, c) => sum + c.points, 0)} points max</div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <span className="text-slate-400 text-sm font-medium w-24">Challenges:</span>
              <div className="flex-1 bg-slate-700/50 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-violet-500 to-rose-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${(solvedChallenges.size / challenges.length) * 100}%` }}
                />
              </div>
              <span className="text-white font-bold text-sm min-w-[60px] text-right">
                {solvedChallenges.size}/{challenges.length}
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-slate-400 text-sm font-medium w-24">Points:</span>
              <div className="flex-1 bg-slate-700/50 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-amber-500 to-orange-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${(totalPoints / challenges.reduce((sum, c) => sum + c.points, 0)) * 100}%` }}
                />
              </div>
              <span className="text-white font-bold text-sm min-w-[60px] text-right">
                {Math.round((totalPoints / challenges.reduce((sum, c) => sum + c.points, 0)) * 100)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTFPlatform;