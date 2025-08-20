import React from 'react';
import { Shield, Crown, Star, Sparkles, Skull, Lightning, Target, Crosshair, Flame, Atom, Brain, Zap } from 'lucide-react';
import { teamMembers } from '../data/teamMembers';
import Footer from './Footer';

interface TeamMembersProps {
  onNavigate: (page: string) => void;
  addNotification: (notification: any) => void;
}

const TeamMembers: React.FC<TeamMembersProps> = ({ onNavigate, addNotification }) => {
  const handleMemberClick = (memberName: string) => {
    addNotification({
      type: 'success',
      title: 'Hacker Elite',
      message: `🔥 Profil de guerre de ${memberName} déployé 🔥`,
      duration: 3000
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative z-10 particle-effect">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <div className="relative inline-block mb-6">
            <h1 className="text-6xl font-black bg-gradient-to-r from-violet-400 via-rose-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent animate-gradient-x glitch-text" data-text="CYBER WARRIORS ELITE">
              💀 CYBER WARRIORS ELITE 💀
            </h1>
            <div className="absolute -top-4 -right-8 animate-bounce-glow">
              <Skull className="h-10 w-10 text-violet-400 animate-quantum-flicker" />
            </div>
            <div className="absolute -bottom-2 -left-8 animate-float">
              <Lightning className="h-8 w-8 text-yellow-400 animate-pulse" />
            </div>
          </div>
          <p className="text-2xl text-slate-300 max-w-4xl mx-auto font-bold">
            <span className="bg-gradient-to-r from-red-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-x">
              🔥 RENCONTREZ LES LÉGENDES QUI DOMINENT LE CYBERESPACE 🔥
            </span>
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group bg-white/10 backdrop-blur-xl rounded-3xl p-10 border border-white/20 hover:border-white/40 transition-all duration-500 transform hover:scale-110 hover:bg-white/15 cursor-pointer cyber-card-glow animate-cyber-pulse particle-effect"
              onClick={() => handleMemberClick(member.name)}
            >
              <div className="flex items-center mb-8">
                <div className={`flex items-center justify-center w-20 h-20 rounded-2xl mr-6 group-hover:scale-125 transition-transform duration-300 neon-border ${
                  member.role === 'Chef' 
                    ? 'bg-gradient-to-br from-amber-500/30 to-amber-600/30 animate-bounce-glow' 
                    : 'bg-gradient-to-br from-violet-500/30 to-violet-600/30 animate-cyber-pulse'
                }`}>
                  {member.role === 'Chef' ? (
                    <Crown className="h-10 w-10 text-amber-400 animate-quantum-flicker" />
                  ) : (
                    <Skull className="h-10 w-10 text-violet-400 animate-quantum-flicker" />
                  )}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3 animate-hologram">{member.name}</h3>
                  <span className={`text-base px-4 py-2 rounded-full font-bold neon-border ${
                    member.role === 'Chef' 
                      ? 'bg-amber-500/30 text-amber-300 border border-amber-500/40 animate-bounce-glow' 
                      : 'bg-violet-500/30 text-violet-300 border border-violet-500/40 animate-cyber-pulse'
                  }`}>
                    {member.role === 'Chef' ? '👑 COMMANDANT SUPRÊME' : '💀 GUERRIER ELITE'}
                  </span>
                </div>
              </div>
              
              <div className="mb-6">
                <span className="text-base text-slate-400 font-bold">🎯 Spécialité de guerre: </span>
                <span className="text-emerald-400 font-bold text-lg animate-rainbow-text">{member.specialty}</span>
              </div>
              
              <div className="bg-white/10 rounded-2xl p-6 border border-white/20 cyber-card-glow">
                <div className="flex items-center space-x-2 mb-3">
                  <Brain className="h-5 w-5 text-cyan-400 animate-pulse" />
                  <span className="text-cyan-300 font-bold text-sm">💭 CITATION DE GUERRE</span>
                </div>
                <p className="text-slate-300 text-base italic leading-relaxed font-medium">
                  "{member.quote}"
                </p>
              </div>
              
              {/* Effets visuels supplémentaires */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {member.role === 'Chef' ? (
                  <Flame className="h-6 w-6 text-orange-400 animate-bounce" />
                ) : (
                  <Zap className="h-6 w-6 text-purple-400 animate-pulse" />
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* Section statistiques de l'équipe */}
        <div className="mt-20 bg-white/10 backdrop-blur-xl rounded-3xl p-10 border border-white/20 cyber-card-glow particle-effect">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-black text-white mb-4 flex items-center justify-center space-x-3">
              <Target className="h-10 w-10 text-red-400 animate-spin-slow" />
              <span className="bg-gradient-to-r from-red-400 to-purple-400 bg-clip-text text-transparent">
                🏆 STATISTIQUES DE DOMINATION
              </span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center bg-red-500/10 rounded-2xl p-6 border border-red-500/30 animate-cyber-pulse">
              <div className="text-4xl font-black text-red-400 mb-2 animate-quantum-flicker">22</div>
              <div className="text-red-300 font-bold">💀 HACKERS ELITE</div>
            </div>
            <div className="text-center bg-purple-500/10 rounded-2xl p-6 border border-purple-500/30 animate-cyber-pulse">
              <div className="text-4xl font-black text-purple-400 mb-2 animate-quantum-flicker">100+</div>
              <div className="text-purple-300 font-bold">🏆 CTF DOMINÉS</div>
            </div>
            <div className="text-center bg-cyan-500/10 rounded-2xl p-6 border border-cyan-500/30 animate-cyber-pulse">
              <div className="text-4xl font-black text-cyan-400 mb-2 animate-quantum-flicker">1337+</div>
              <div className="text-cyan-300 font-bold">🎯 VULNÉRABILITÉS</div>
            </div>
            <div className="text-center bg-green-500/10 rounded-2xl p-6 border border-green-500/30 animate-cyber-pulse">
              <div className="text-4xl font-black text-green-400 mb-2 animate-quantum-flicker">∞</div>
              <div className="text-green-300 font-bold">🔥 NIVEAU DE SKILL</div>
            </div>
          </div>
        </div>
      </div>
      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default TeamMembers;