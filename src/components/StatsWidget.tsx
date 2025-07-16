import React, { useState, useEffect } from 'react';
import { TrendingUp, Users, Flag, Terminal, Activity, Zap } from 'lucide-react';

interface StatsWidgetProps {
  addNotification: (notification: any) => void;
}

const StatsWidget: React.FC<StatsWidgetProps> = ({ addNotification }) => {
  const [stats, setStats] = useState({
    activeUsers: 0,
    solvedChallenges: 0,
    totalAttempts: 0,
    uptime: 0
  });

  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Simulate real-time stats
    const interval = setInterval(() => {
      setStats(prev => ({
        activeUsers: Math.floor(Math.random() * 50) + 20,
        solvedChallenges: Math.floor(Math.random() * 100) + 150,
        totalAttempts: Math.floor(Math.random() * 500) + 1000,
        uptime: prev.uptime + 1
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const formatUptime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const handleStatsClick = () => {
    setIsExpanded(!isExpanded);
    addNotification({
      type: 'info',
      title: 'Statistiques',
      message: isExpanded ? 'Widget réduit' : 'Widget étendu',
      duration: 1500
    });
  };

  return (
    <div className="fixed bottom-4 left-4 z-40">
      <div className={`bg-slate-900/95 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-2xl transition-all duration-500 ${
        isExpanded ? 'w-80' : 'w-16'
      }`}>
        <button
          onClick={handleStatsClick}
          className="w-full p-4 flex items-center justify-center hover:bg-slate-800/50 rounded-2xl transition-all duration-300"
        >
          <Activity className="h-6 w-6 text-emerald-400" />
          {isExpanded && (
            <span className="ml-3 text-white font-medium">Statistiques Live</span>
          )}
        </button>

        {isExpanded && (
          <div className="p-4 pt-0 space-y-3 animate-in slide-in-from-bottom duration-300">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-emerald-500/10 rounded-xl p-3 border border-emerald-500/20">
                <div className="flex items-center space-x-2 mb-1">
                  <Users className="h-4 w-4 text-emerald-400" />
                  <span className="text-xs text-emerald-300">Utilisateurs</span>
                </div>
                <div className="text-lg font-bold text-emerald-400">{stats.activeUsers}</div>
              </div>

              <div className="bg-violet-500/10 rounded-xl p-3 border border-violet-500/20">
                <div className="flex items-center space-x-2 mb-1">
                  <Flag className="h-4 w-4 text-violet-400" />
                  <span className="text-xs text-violet-300">Résolus</span>
                </div>
                <div className="text-lg font-bold text-violet-400">{stats.solvedChallenges}</div>
              </div>

              <div className="bg-cyan-500/10 rounded-xl p-3 border border-cyan-500/20">
                <div className="flex items-center space-x-2 mb-1">
                  <TrendingUp className="h-4 w-4 text-cyan-400" />
                  <span className="text-xs text-cyan-300">Tentatives</span>
                </div>
                <div className="text-lg font-bold text-cyan-400">{stats.totalAttempts}</div>
              </div>

              <div className="bg-rose-500/10 rounded-xl p-3 border border-rose-500/20">
                <div className="flex items-center space-x-2 mb-1">
                  <Zap className="h-4 w-4 text-rose-400" />
                  <span className="text-xs text-rose-300">Uptime</span>
                </div>
                <div className="text-sm font-bold text-rose-400">{formatUptime(stats.uptime)}</div>
              </div>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-400">Activité système</span>
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">CPU</span>
                  <span className="text-emerald-400">23%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-1">
                  <div className="bg-emerald-400 h-1 rounded-full w-1/4 transition-all duration-500"></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsWidget;