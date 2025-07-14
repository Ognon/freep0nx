import React, { useState, useEffect } from 'react';
import { Shield, Download, Flag, CheckCircle, AlertCircle, Info } from 'lucide-react';
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
      case 'easy': return 'text-green-400 border-green-500/30 bg-green-600/20';
      case 'medium': return 'text-orange-400 border-orange-500/30 bg-orange-600/20';
      case 'hard': return 'text-red-400 border-red-500/30 bg-red-600/20';
      default: return 'text-gray-400 border-gray-500/30 bg-gray-600/20';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'reverse': return 'bg-purple-600/20 text-purple-400 border-purple-500/30';
      case 'web': return 'bg-blue-600/20 text-blue-400 border-blue-500/30';
      case 'crypto': return 'bg-yellow-600/20 text-yellow-400 border-yellow-500/30';
      case 'osint': return 'bg-pink-600/20 text-pink-400 border-pink-500/30';
      case 'steganography': return 'bg-cyan-600/20 text-cyan-400 border-cyan-500/30';
      default: return 'bg-gray-600/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-purple-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-cyan-400" />
              <h1 className="text-2xl font-bold text-white">freep0nx</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <button
                onClick={() => onNavigate('home')}
                className="text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Accueil
              </button>
              <button
                onClick={() => onNavigate('team')}
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                Équipe
              </button>
              <button
                onClick={() => onNavigate('ctf')}
                className="text-pink-400 hover:text-pink-300 transition-colors"
              >
                CTF Platform
              </button>
              <button
                onClick={() => onNavigate('terminal')}
                className="text-green-400 hover:text-green-300 transition-colors"
              >
                Terminal
              </button>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 mb-4">
            CTF Platform
          </h1>
          <p className="text-xl text-gray-300">
            Challenges de cybersécurité - Testez vos compétences !
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Challenges List */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white mb-6">Challenges Disponibles</h2>
            {challenges.map((challenge) => (
              <div
                key={challenge.id}
                className={`bg-black/30 backdrop-blur-sm rounded-xl p-6 border cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                  selectedChallenge?.id === challenge.id 
                    ? 'border-purple-400/70 bg-purple-900/20' 
                    : 'border-purple-500/30 hover:border-purple-400/50'
                }`}
                onClick={() => setSelectedChallenge(challenge)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-lg font-semibold text-white">{challenge.title}</h3>
                    <span className="text-yellow-400 font-medium text-sm">+{challenge.points}pts</span>
                    {solvedChallenges.has(challenge.id) && (
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs px-2 py-1 rounded-full border ${getCategoryColor(challenge.category)}`}>
                      {challenge.category}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full border ${getDifficultyColor(challenge.difficulty)}`}>
                      {challenge.difficulty}
                    </span>
                  </div>
                </div>
                <p className="text-gray-400 text-sm">{challenge.description}</p>
              </div>
            ))}
          </div>

          {/* Challenge Details */}
          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
            {selectedChallenge ? (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-white">{selectedChallenge.title}</h2>
                  {solvedChallenges.has(selectedChallenge.id) && (
                    <CheckCircle className="h-6 w-6 text-green-400" />
                  )}
                </div>
                
                <div className="flex items-center space-x-2 mb-4">
                  <span className={`text-sm px-3 py-1 rounded-full border ${getCategoryColor(selectedChallenge.category)}`}>
                    {selectedChallenge.category}
                  </span>
                  <span className={`text-sm px-3 py-1 rounded-full border ${getDifficultyColor(selectedChallenge.difficulty)}`}>
                    {selectedChallenge.difficulty}
                  </span>
                </div>

                <p className="text-gray-300 mb-6">{selectedChallenge.description}</p>

                {selectedChallenge.hint && (
                  <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mb-6">
                    <div className="flex items-center space-x-2 mb-2">
                      <Info className="h-5 w-5 text-blue-400" />
                      <span className="text-blue-400 font-medium">Indice</span>
                    </div>
                    <p className="text-blue-300">{selectedChallenge.hint}</p>
                  </div>
                )}

                {selectedChallenge.files && selectedChallenge.files.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-white mb-3">Fichiers à télécharger</h3>
                    <div className="space-y-2">
                      {selectedChallenge.files.map((file, index) => (
                        <button
                          key={index}
                          onClick={() => handleDownload(file)}
                          className="flex items-center space-x-2 bg-cyan-600/20 text-cyan-400 border border-cyan-500/30 px-4 py-2 rounded-lg hover:bg-cyan-600/30 transition-colors"
                        >
                          <Download className="h-4 w-4" />
                          <span>{file}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Entrez votre flag
                    </label>
                    <input
                      type="text"
                      value={flagInput}
                      onChange={(e) => setFlagInput(e.target.value)}
                      placeholder="freep0nx{...}"
                      className="w-full bg-gray-800/50 border border-purple-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-400/50 focus:ring-2 focus:ring-purple-400/20"
                    />
                  </div>
                  <button
                    onClick={handleFlagSubmit}
                    disabled={!flagInput.trim()}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 disabled:transform-none flex items-center justify-center space-x-2"
                  >
                    <Flag className="h-5 w-5" />
                    <span>Valider le Flag</span>
                  </button>
                </div>

                {message && (
                  <div className={`mt-4 p-4 rounded-lg border flex items-center space-x-2 ${
                    message.type === 'success' 
                      ? 'bg-green-600/20 border-green-500/30 text-green-400' 
                      : 'bg-red-600/20 border-red-500/30 text-red-400'
                  }`}>
                    {message.type === 'success' ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <AlertCircle className="h-5 w-5" />
                    )}
                    <span>{message.text}</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <Flag className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400">Sélectionnez un challenge pour commencer</p>
              </div>
            )}
          </div>
        </div>

        {/* Progress */}
        <div className="mt-12 bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white">Progression</h3>
            <div className="flex items-center space-x-4">
              <div className="text-yellow-400 font-bold text-lg">{totalPoints} points</div>
              <div className="text-gray-400">/ {challenges.reduce((sum, c) => sum + c.points, 0)} points max</div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-sm w-20">Challenges:</span>
              <div className="flex-1 bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(solvedChallenges.size / challenges.length) * 100}%` }}
                />
              </div>
              <span className="text-white font-medium text-sm">
                {solvedChallenges.size}/{challenges.length}
              </span>
            </div>
            
            <div className="flex-1 bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-yellow-600 to-orange-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(totalPoints / challenges.reduce((sum, c) => sum + c.points, 0)) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTFPlatform;