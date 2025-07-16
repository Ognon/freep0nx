import React from 'react';
import { Shield, Crown, Star, Sparkles } from 'lucide-react';
import { teamMembers } from '../data/teamMembers';
import Footer from './Footer';

interface TeamMembersProps {
  onNavigate: (page: string) => void;
  addNotification: (notification: any) => void;
}

const TeamMembers: React.FC<TeamMembersProps> = ({ onNavigate, addNotification }) => {
  const handleMemberClick = (memberName: string) => {
    addNotification({
      type: 'info',
      title: 'Membre sélectionné',
      message: `Profil de ${memberName} affiché`,
      duration: 2000
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative z-10">
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
              className="group bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-white/20 transition-all duration-500 transform hover:scale-105 hover:bg-white/10 cursor-pointer"
              onClick={() => handleMemberClick(member.name)}
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
      <Footer />
    </div>
  );
};

export default TeamMembers;