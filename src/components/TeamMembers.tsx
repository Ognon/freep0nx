import React from 'react';
import { Shield, Crown, Star, Sparkles } from 'lucide-react';
import { teamMembers } from '../data/teamMembers';

interface TeamMembersProps {
  onNavigate: (page: string) => void;
}

const TeamMembers: React.FC<TeamMembersProps> = ({ onNavigate }) => {
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
                className="px-4 py-2 rounded-xl text-violet-300 bg-violet-500/10 border border-violet-500/20 hover:bg-violet-500/20 transition-all duration-300"
              >
                Équipe
              </button>
              <button
                onClick={() => onNavigate('ctf')}
                className="px-4 py-2 rounded-xl text-slate-300 hover:text-rose-300 hover:bg-rose-500/10 transition-all duration-300"
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
            <h1 className="text-5xl font-black bg-gradient-to-r from-violet-400 via-rose-400 to-emerald-400 bg-clip-text text-transparent">
              Notre Équipe
            </h1>
            <div className="absolute -top-2 -right-6">
              <Sparkles className="h-6 w-6 text-violet-400 animate-pulse" />
            </div>
          </div>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Rencontrez les experts passionnés qui forment l'équipe freep0nx
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 transform hover:scale-105 hover:bg-white/10"
            >
              <div className="flex items-center mb-6">
                <div className={`flex items-center justify-center w-16 h-16 rounded-2xl mr-5 group-hover:scale-110 transition-transform duration-300 ${
                  member.role === 'Chef' 
                    ? 'bg-gradient-to-br from-amber-500/20 to-amber-600/20' 
                    : 'bg-gradient-to-br from-violet-500/20 to-violet-600/20'
                }`}>
                  {member.role === 'Chef' ? (
                    <Crown className="h-8 w-8 text-amber-400" />
                  ) : (
                    <Star className="h-8 w-8 text-violet-400" />
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                  <span className={`text-sm px-3 py-1 rounded-full font-medium ${
                    member.role === 'Chef' 
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' 
                      : 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
                  }`}>
                    {member.role}
                  </span>
                </div>
              </div>
              
              <div className="mb-4">
                <span className="text-sm text-slate-400 font-medium">Spécialité: </span>
                <span className="text-emerald-400 font-semibold">{member.specialty}</span>
              </div>
              
              <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                <p className="text-slate-300 text-sm italic leading-relaxed">
                  "{member.quote}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamMembers;