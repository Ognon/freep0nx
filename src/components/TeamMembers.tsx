import React from 'react';
import { Shield, Crown, Star } from 'lucide-react';
import { teamMembers } from '../data/teamMembers';

interface TeamMembersProps {
  onNavigate: (page: string) => void;
}

const TeamMembers: React.FC<TeamMembersProps> = ({ onNavigate }) => {
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
            Notre Équipe
          </h1>
          <p className="text-xl text-gray-300">
            Rencontrez les experts qui forment l'équipe freep0nx
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg mr-4">
                  {member.role === 'Chef' ? (
                    <Crown className="h-6 w-6 text-white" />
                  ) : (
                    <Star className="h-6 w-6 text-white" />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                  <span className={`text-sm px-2 py-1 rounded-full ${
                    member.role === 'Chef' 
                      ? 'bg-yellow-600/20 text-yellow-400 border border-yellow-500/30' 
                      : 'bg-purple-600/20 text-purple-400 border border-purple-500/30'
                  }`}>
                    {member.role}
                  </span>
                </div>
              </div>
              
              <div className="mb-3">
                <span className="text-sm text-gray-400">Spécialité: </span>
                <span className="text-cyan-400 font-medium">{member.specialty}</span>
              </div>
              
              <p className="text-gray-300 text-sm italic leading-relaxed">
                "{member.quote}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamMembers;