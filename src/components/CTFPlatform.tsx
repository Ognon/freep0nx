import React, { useState, useEffect } from 'react';
import { Shield, Download, Flag, CheckCircle, AlertCircle, Info, Sparkles, Trophy, Skull, Lightning, Target, Crosshair, Zap, Flame, Atom, Brain } from 'lucide-react';
import { challenges } from '../data/challenges';
import { Challenge } from '../types';
import Footer from './Footer';

interface CTFPlatformProps {
  onNavigate: (page: string) => void;
  addNotification: (notification: any) => void;
}

const CTFPlatform: React.FC<CTFPlatformProps> = ({ onNavigate, addNotification }) => {
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [flagInput, setFlagInput] = useState('');
  const [solvedChallenges, setSolvedChallenges] = useState<Set<string>>(new Set());
  const [totalPoints, setTotalPoints] = useState(0);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [hackingMode, setHackingMode] = useState(false);
  const [cyberAlert, setCyberAlert] = useState(false);

  useEffect(() => {
    // Mode hacking aléatoire
    const hackingTimer = setInterval(() => {
      setHackingMode(prev => !prev);
      setCyberAlert(Math.random() > 0.8);
    }, 2000);
    
    return () => clearInterval(hackingTimer);
  }, []);

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
        
        addNotification({
          type: 'success',
          title: 'Flag validé !',
          message: `🔥 PWNED! +${selectedChallenge.points} points de domination 🔥`,
          duration: 5000
        });
      } else {
        addNotification({
          type: 'info',
          title: 'Flag déjà validé',
          message: 'Ce challenge a déjà été résolu',
          duration: 3000
        });
      }
      setFlagInput('');
    } else {
      addNotification({
        type: 'error',
        title: 'Flag incorrect',
        message: '💀 Échec! Le système résiste... Réessayez! 💀',
        duration: 4000
      });
    }

  };

  const handleDownload = (filename: string) => {
    // Create a temporary link element to trigger download
    const link = document.createElement('a');
    link.href = `/freep0nx/${filename}`;
    link.download = filename;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show success message
    addNotification({
      type: 'success',
      title: 'Téléchargement',
      message: `🎯 ${filename} infiltré avec succès 🎯`,
      duration: 3000
    });
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
      case 'reverse': return 'bg-violet-500/20 text-violet-300 border-violet-500/40 animate-pulse';
      case 'misc': return 'bg-violet-500/20 text-violet-300 border-violet-500/40 animate-pulse';
      case 'web': return 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30';
      case 'crypto': return 'bg-amber-500/10 text-amber-300 border-amber-500/30';
      case 'osint': return 'bg-rose-500/10 text-rose-300 border-rose-500/30';
      case 'steganography': return 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30';
      default: return 'bg-slate-500/10 text-slate-300 border-slate-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative z-10 particle-effect">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <div className="relative inline-block mb-6">
            <h1 className="text-6xl font-black bg-gradient-to-r from-rose-400 via-violet-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent animate-gradient-x glitch-text" data-text="CYBER WARFARE ARENA">
              🔥 CYBER WARFARE ARENA 🔥
            </h1>
            <div className="absolute -top-4 -right-8 animate-bounce-glow">
              <Skull className="h-10 w-10 text-rose-400 animate-quantum-flicker" />
            </div>
            <div className="absolute -bottom-2 -left-8 animate-float">
              <Lightning className="h-8 w-8 text-yellow-400 animate-pulse" />
            </div>
          </div>
          <p className="text-2xl text-slate-300 font-bold">
            <span className="bg-gradient-to-r from-red-400 to-purple-400 bg-clip-text text-transparent animate-gradient-x">
              💀 ZONE DE COMBAT CYBER - PROUVEZ VOTRE VALEUR ! 💀
            </span>
          </p>
          
          {/* Cyber Status */}
          <div className={`mt-8 inline-flex items-center space-x-4 bg-black/80 backdrop-blur-xl border border-red-400/50 rounded-2xl px-8 py-4 shadow-2xl shadow-red-500/20 cyber-border ${cyberAlert ? 'animate-shake-intense' : ''}`}>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 ${hackingMode ? 'bg-red-400' : 'bg-green-400'} rounded-full animate-pulse shadow-lg`}></div>
              <span className={`font-mono text-sm font-bold ${hackingMode ? 'text-red-300 animate-rainbow-text' : 'text-green-300'}`}>
                {hackingMode ? 'COMBAT MODE' : 'READY TO HACK'}
              </span>
            </div>
            <div className="w-px h-6 bg-red-400/30"></div>
            <div className="flex items-center space-x-2">
              <Target className="h-4 w-4 text-red-400 animate-spin-slow" />
              <span className="text-red-300 font-mono text-sm font-bold">TARGET ACQUIRED</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Challenges List */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center space-x-3">
              <Crosshair className="h-8 w-8 text-red-400 animate-spin-slow" />
              <span className="bg-gradient-to-r from-red-400 to-purple-400 bg-clip-text text-transparent">
                🎯 MISSIONS DE DESTRUCTION 🎯
              </span>
            </h2>
            {challenges.map((challenge) => (
              <div
                key={challenge.id}
                className={`group bg-white/10 backdrop-blur-xl rounded-3xl p-8 border cursor-pointer transition-all duration-500 transform hover:scale-110 cyber-card-glow particle-effect ${
                  selectedChallenge?.id === challenge.id 
                    ? 'border-rose-500/70 bg-rose-500/20 shadow-lg shadow-rose-500/30 animate-cyber-pulse' 
                    : 'border-white/20 hover:border-white/40 hover:bg-white/15'
                }`}
                onClick={() => setSelectedChallenge(challenge)}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <h3 className="text-xl font-bold text-white group-hover:text-rose-300 transition-colors animate-hologram">
                      {challenge.title}
                    </h3>
                    <span className="text-amber-400 font-bold text-sm bg-amber-500/20 px-3 py-2 rounded-full border border-amber-500/40 animate-bounce-glow">
                      +{challenge.points}pts
                    </span>
                    {solvedChallenges.has(challenge.id) && (
                      <CheckCircle className="h-6 w-6 text-emerald-400 animate-quantum-flicker" />
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm px-4 py-2 rounded-full border font-medium ${getCategoryColor(challenge.category)}`}>
                      {challenge.category}
                    </span>
                    <span className={`text-sm px-4 py-2 rounded-full border font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                      {challenge.difficulty}
                    </span>
                  </div>
                </div>
                <p className="text-slate-300 text-base leading-relaxed">{challenge.description}</p>
              </div>
            ))}
          </div>

          {/* Challenge Details */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-10 border border-white/20 sticky top-8 cyber-card-glow particle-effect">
            {selectedChallenge ? (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-bold text-white animate-hologram">{selectedChallenge.title}</h2>
                  {solvedChallenges.has(selectedChallenge.id) && (
                    <div className="flex items-center space-x-2 bg-emerald-500/20 px-4 py-2 rounded-full border border-emerald-500/40 animate-bounce-glow">
                      <CheckCircle className="h-6 w-6 text-emerald-400 animate-quantum-flicker" />
                      <span className="text-emerald-300 text-base font-medium">🏆 PWNED</span>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center space-x-4 mb-8">
                  <span className={`text-base px-6 py-3 rounded-full border font-medium ${getCategoryColor(selectedChallenge.category)} neon-border`}>
                    {selectedChallenge.category}
                  </span>
                  <span className={`text-base px-6 py-3 rounded-full border font-medium ${getDifficultyColor(selectedChallenge.difficulty)} neon-border`}>
                    {selectedChallenge.difficulty}
                  </span>
                </div>

                <div className="bg-white/10 rounded-2xl p-8 mb-8 border border-white/20 cyber-card-glow">
                  <p className="text-slate-300 leading-relaxed text-lg">{selectedChallenge.description}</p>
                </div>

                {selectedChallenge.hint && (
                  <div className="bg-cyan-500/20 border border-cyan-500/40 rounded-2xl p-8 mb-8 neon-border animate-cyber-pulse">
                    <div className="flex items-center space-x-3 mb-4">
                      <Brain className="h-6 w-6 text-cyan-400 animate-quantum-flicker" />
                      <span className="text-cyan-300 font-semibold text-lg">💡 INDICE STRATÉGIQUE</span>
                    </div>
                    <p className="text-cyan-200 leading-relaxed text-lg">{selectedChallenge.hint}</p>
                  </div>
                )}

                {selectedChallenge.files && selectedChallenge.files.length > 0 && (
                  <div className="mb-10">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
                      <Download className="h-6 w-6 text-emerald-400 animate-bounce" />
                      <span>🎯 ARSENAL DE GUERRE</span>
                    </h3>
                    <div className="space-y-4">
                      {selectedChallenge.files.map((file, index) => (
                        <button
                          key={index}
                          onClick={() => handleDownload(file)}
                          className="flex items-center space-x-4 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-6 py-4 rounded-xl hover:bg-emerald-500/30 transition-all duration-300 w-full group neon-border animate-cyber-pulse"
                        >
                          <Download className="h-6 w-6 group-hover:scale-125 transition-transform animate-bounce" />
                          <span className="font-medium text-lg">{file}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <label className="block text-lg font-semibold text-slate-300 mb-4 flex items-center space-x-2">
                      <Flag className="h-6 w-6 text-rose-400 animate-pulse" />
                      <span>🚩 SAISISSEZ VOTRE BUTIN</span>
                    </label>
                    <input
                      type="text"
                      value={flagInput}
                      onChange={(e) => setFlagInput(e.target.value)}
                      placeholder="freep0nx{...}"
                      className="w-full bg-white/10 border border-white/30 rounded-xl px-6 py-4 text-white placeholder-slate-400 focus:outline-none focus:border-rose-400/70 focus:ring-2 focus:ring-rose-400/30 transition-all duration-300 text-lg cyber-border"
                    />
                  </div>
                  <button
                    onClick={handleFlagSubmit}
                    disabled={!flagInput.trim()}
                    className="w-full bg-gradient-to-r from-rose-500 via-purple-500 to-violet-500 hover:from-rose-400 hover:via-purple-400 hover:to-violet-400 disabled:from-slate-600/50 disabled:to-slate-700/50 text-white px-8 py-5 rounded-xl font-black text-xl transition-all duration-300 transform hover:scale-110 disabled:transform-none flex items-center justify-center space-x-3 shadow-lg hover:shadow-rose-500/50 neon-border animate-cyber-pulse"
                  >
                    <Flame className="h-6 w-6 animate-quantum-flicker" />
                    <span>💥 LANCER L'ATTAQUE</span>
                    <Zap className="h-6 w-6 animate-bounce" />
                  </button>
                </div>

                {message && (
                  <div className={`mt-8 p-6 rounded-xl border flex items-center space-x-4 ${
                    message.type === 'success' 
                      ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300 animate-bounce-glow' 
                      : 'bg-rose-500/20 border-rose-500/40 text-rose-300 animate-shake-intense'
                  } neon-border`}>
                    {message.type === 'success' ? (
                      <CheckCircle className="h-6 w-6 animate-quantum-flicker" />
                    ) : (
                      <AlertCircle className="h-6 w-6 animate-pulse" />
                    )}
                    <span className="font-medium text-lg">{message.text}</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-20">
                <Target className="h-20 w-20 text-slate-500 mx-auto mb-8 animate-spin-slow" />
                <p className="text-slate-400 text-2xl font-bold">
                  🎯 Choisissez votre mission de destruction 🎯
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Progress */}
        <div className="mt-20 bg-white/10 backdrop-blur-xl rounded-3xl p-10 border border-white/20 cyber-card-glow particle-effect">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold text-white flex items-center space-x-3">
              <Trophy className="h-8 w-8 text-amber-400 animate-bounce-glow" />
              <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                🏆 DOMINATION TOTALE
              </span>
            </h3>
            <div className="flex items-center space-x-6">
              <div className="text-amber-400 font-black text-4xl animate-quantum-flicker">{totalPoints}</div>
              <div className="text-slate-400 text-xl">/ {challenges.reduce((sum, c) => sum + c.points, 0)} points max</div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center space-x-6">
              <span className="text-slate-400 text-lg font-medium w-32">Missions:</span>
              <div className="flex-1 bg-slate-700/50 rounded-full h-4 border border-violet-500/30">
                <div 
                  className="bg-gradient-to-r from-violet-500 via-purple-500 to-rose-500 h-4 rounded-full transition-all duration-500 animate-gradient-x"
                  style={{ width: `${(solvedChallenges.size / challenges.length) * 100}%` }}
                />
              </div>
              <span className="text-white font-bold text-lg min-w-[80px] text-right animate-hologram">
                {solvedChallenges.size}/{challenges.length}
              </span>
            </div>
            
            <div className="flex items-center space-x-6">
              <span className="text-slate-400 text-lg font-medium w-32">Domination:</span>
              <div className="flex-1 bg-slate-700/50 rounded-full h-4 border border-amber-500/30">
                <div 
                  className="bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 h-4 rounded-full transition-all duration-500 animate-gradient-x"
                  style={{ width: `${(totalPoints / challenges.reduce((sum, c) => sum + c.points, 0)) * 100}%` }}
                />
              </div>
              <span className="text-white font-bold text-lg min-w-[80px] text-right animate-hologram">
                {Math.round((totalPoints / challenges.reduce((sum, c) => sum + c.points, 0)) * 100)}%
              </span>
            </div>
          </div>
        </div>
      </div>
      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default CTFPlatform;