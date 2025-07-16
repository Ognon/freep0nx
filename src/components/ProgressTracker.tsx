import React, { useState, useEffect } from 'react';
import { TrendingUp, Target, Clock, Zap, Award, BarChart3 } from 'lucide-react';

interface ProgressData {
  totalChallenges: number;
  solvedChallenges: number;
  totalPoints: number;
  maxPoints: number;
  averageTime: number;
  streak: number;
  rank: number;
  categoryProgress: {
    [key: string]: { solved: number; total: number };
  };
}

interface ProgressTrackerProps {
  addNotification: (notification: any) => void;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ addNotification }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState<ProgressData>({
    totalChallenges: 8,
    solvedChallenges: 0,
    totalPoints: 0,
    maxPoints: 2300,
    averageTime: 0,
    streak: 0,
    rank: 42,
    categoryProgress: {
      'reverse': { solved: 0, total: 1 },
      'web': { solved: 0, total: 2 },
      'crypto': { solved: 0, total: 3 },
      'osint': { solved: 0, total: 2 },
      'steganography': { solved: 0, total: 1 }
    }
  });

  useEffect(() => {
    // Load progress from localStorage
    const savedProgress = localStorage.getItem('freep0nx-progress');
    const solvedChallenges = localStorage.getItem('freep0nx-solved-challenges');
    const totalPoints = localStorage.getItem('freep0nx-total-points');

    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }

    if (solvedChallenges && totalPoints) {
      const solved = JSON.parse(solvedChallenges);
      setProgress(prev => ({
        ...prev,
        solvedChallenges: solved.length,
        totalPoints: parseInt(totalPoints)
      }));
    }
  }, []);

  const getCompletionPercentage = () => {
    return Math.round((progress.solvedChallenges / progress.totalChallenges) * 100);
  };

  const getPointsPercentage = () => {
    return Math.round((progress.totalPoints / progress.maxPoints) * 100);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'reverse': return 'violet';
      case 'web': return 'cyan';
      case 'crypto': return 'amber';
      case 'osint': return 'rose';
      case 'steganography': return 'emerald';
      default: return 'slate';
    }
  };

  const getRankColor = () => {
    if (progress.rank <= 10) return 'text-amber-400';
    if (progress.rank <= 25) return 'text-violet-400';
    if (progress.rank <= 50) return 'text-cyan-400';
    return 'text-slate-400';
  };

  return (
    <div className="fixed bottom-4 right-96 z-40">
      <div className={`bg-slate-900/95 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-2xl transition-all duration-500 ${
        isVisible ? 'w-96' : 'w-16'
      }`}>
        <button
          onClick={() => setIsVisible(!isVisible)}
          className="w-full p-4 flex items-center justify-center hover:bg-slate-800/50 rounded-2xl transition-all duration-300"
        >
          <BarChart3 className="h-6 w-6 text-cyan-400" />
          {isVisible && (
            <span className="ml-3 text-white font-medium">Progression</span>
          )}
        </button>

        {isVisible && (
          <div className="p-4 pt-0 space-y-4 animate-in slide-in-from-right duration-300">
            {/* Overall Progress */}
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
              <h3 className="text-white font-semibold mb-3 flex items-center space-x-2">
                <Target className="h-4 w-4 text-cyan-400" />
                <span>Progression Globale</span>
              </h3>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-300">Challenges</span>
                    <span className="text-cyan-400 font-bold">{getCompletionPercentage()}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${getCompletionPercentage()}%` }}
                    />
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    {progress.solvedChallenges}/{progress.totalChallenges} résolus
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-300">Points</span>
                    <span className="text-amber-400 font-bold">{getPointsPercentage()}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-amber-500 to-orange-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${getPointsPercentage()}%` }}
                    />
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    {progress.totalPoints}/{progress.maxPoints} points
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-emerald-500/10 rounded-xl p-3 border border-emerald-500/20">
                <div className="flex items-center space-x-2 mb-1">
                  <Zap className="h-4 w-4 text-emerald-400" />
                  <span className="text-xs text-emerald-300">Série</span>
                </div>
                <div className="text-lg font-bold text-emerald-400">{progress.streak}</div>
              </div>

              <div className="bg-violet-500/10 rounded-xl p-3 border border-violet-500/20">
                <div className="flex items-center space-x-2 mb-1">
                  <Award className="h-4 w-4 text-violet-400" />
                  <span className="text-xs text-violet-300">Rang</span>
                </div>
                <div className={`text-lg font-bold ${getRankColor()}`}>#{progress.rank}</div>
              </div>
            </div>

            {/* Category Progress */}
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
              <h3 className="text-white font-semibold mb-3 flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-violet-400" />
                <span>Par Catégorie</span>
              </h3>
              
              <div className="space-y-2">
                {Object.entries(progress.categoryProgress).map(([category, data]) => {
                  const percentage = data.total > 0 ? (data.solved / data.total) * 100 : 0;
                  const color = getCategoryColor(category);
                  
                  return (
                    <div key={category}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-300 capitalize">{category}</span>
                        <span className={`text-${color}-400 font-medium`}>
                          {data.solved}/{data.total}
                        </span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-1.5">
                        <div 
                          className={`bg-${color}-500 h-1.5 rounded-full transition-all duration-500`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Time Stats */}
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="h-4 w-4 text-rose-400" />
                <span className="text-white font-semibold text-sm">Temps Moyen</span>
              </div>
              <div className="text-2xl font-bold text-rose-400">
                {progress.averageTime > 0 ? `${Math.round(progress.averageTime)}min` : '--'}
              </div>
              <div className="text-xs text-slate-400">par challenge résolu</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressTracker;