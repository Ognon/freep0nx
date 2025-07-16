import React, { useState, useEffect } from 'react';
import { Trophy, Star, Award, Medal, Crown, Zap, Target, Shield } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface AchievementSystemProps {
  addNotification: (notification: any) => void;
}

const AchievementSystem: React.FC<AchievementSystemProps> = ({ addNotification }) => {
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: 'first-flag',
      title: 'Premier Flag',
      description: 'Résoudre votre premier challenge',
      icon: Flag,
      color: 'emerald',
      unlocked: false,
      progress: 0,
      maxProgress: 1,
      rarity: 'common'
    },
    {
      id: 'speed-demon',
      title: 'Démon de Vitesse',
      description: 'Résoudre 3 challenges en moins de 10 minutes',
      icon: Zap,
      color: 'amber',
      unlocked: false,
      progress: 0,
      maxProgress: 3,
      rarity: 'rare'
    },
    {
      id: 'crypto-master',
      title: 'Maître Crypto',
      description: 'Résoudre tous les challenges de cryptographie',
      icon: Shield,
      color: 'violet',
      unlocked: false,
      progress: 0,
      maxProgress: 3,
      rarity: 'epic'
    },
    {
      id: 'terminal-hacker',
      title: 'Hacker Terminal',
      description: 'Utiliser 20 commandes différentes dans le terminal',
      icon: Terminal,
      color: 'cyan',
      unlocked: false,
      progress: 0,
      maxProgress: 20,
      rarity: 'rare'
    },
    {
      id: 'perfectionist',
      title: 'Perfectionniste',
      description: 'Résoudre tous les challenges disponibles',
      icon: Crown,
      color: 'rose',
      unlocked: false,
      progress: 0,
      maxProgress: 8,
      rarity: 'legendary'
    }
  ]);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Load achievements from localStorage
    const saved = localStorage.getItem('freep0nx-achievements');
    if (saved) {
      setAchievements(JSON.parse(saved));
    }
  }, []);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'from-slate-500 to-slate-600';
      case 'rare': return 'from-blue-500 to-blue-600';
      case 'epic': return 'from-purple-500 to-purple-600';
      case 'legendary': return 'from-amber-500 to-amber-600';
      default: return 'from-slate-500 to-slate-600';
    }
  };

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <div className="fixed top-32 right-4 z-40">
      <div className={`bg-slate-900/95 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-2xl transition-all duration-500 ${
        isVisible ? 'w-80' : 'w-16'
      }`}>
        <button
          onClick={() => setIsVisible(!isVisible)}
          className="w-full p-4 flex items-center justify-center hover:bg-slate-800/50 rounded-2xl transition-all duration-300"
        >
          <Trophy className="h-6 w-6 text-amber-400" />
          {isVisible && (
            <span className="ml-3 text-white font-medium">Succès ({unlockedCount}/{achievements.length})</span>
          )}
        </button>

        {isVisible && (
          <div className="p-4 pt-0 max-h-96 overflow-y-auto space-y-3 animate-in slide-in-from-right duration-300">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-3 rounded-xl border transition-all duration-300 ${
                  achievement.unlocked
                    ? `bg-gradient-to-r ${getRarityColor(achievement.rarity)}/20 border-${achievement.color}-500/30`
                    : 'bg-slate-800/50 border-slate-700/50'
                }`}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <achievement.icon className={`h-5 w-5 ${
                    achievement.unlocked ? `text-${achievement.color}-400` : 'text-slate-500'
                  }`} />
                  <div className="flex-1">
                    <h4 className={`font-semibold text-sm ${
                      achievement.unlocked ? 'text-white' : 'text-slate-400'
                    }`}>
                      {achievement.title}
                    </h4>
                    <p className="text-xs text-slate-400">{achievement.description}</p>
                  </div>
                  {achievement.unlocked && (
                    <Star className="h-4 w-4 text-amber-400" />
                  )}
                </div>
                
                <div className="w-full bg-slate-700/50 rounded-full h-1.5">
                  <div 
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      achievement.unlocked 
                        ? `bg-gradient-to-r ${getRarityColor(achievement.rarity)}`
                        : 'bg-slate-600'
                    }`}
                    style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                  />
                </div>
                
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs text-slate-400">
                    {achievement.progress}/{achievement.maxProgress}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    achievement.rarity === 'legendary' ? 'bg-amber-500/20 text-amber-300' :
                    achievement.rarity === 'epic' ? 'bg-purple-500/20 text-purple-300' :
                    achievement.rarity === 'rare' ? 'bg-blue-500/20 text-blue-300' :
                    'bg-slate-500/20 text-slate-300'
                  }`}>
                    {achievement.rarity}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AchievementSystem;