import React from 'react';
import { Users, Shield, Terminal, Award, ChevronRight, Sparkles } from 'lucide-react';
import Footer from './Footer';

interface HomePageProps {
  onNavigate: (page: string) => void;
  addNotification: (notification: any) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate, addNotification }) => {
  const handleCTFClick = () => {
    onNavigate('ctf');
    addNotification({
      type: 'success',
      title: 'CTF Platform',
      message: 'Prêt à relever les défis ?',
      duration: 3000
    });
  };

  const handleTeamClick = () => {
    onNavigate('team');
    addNotification({
      type: 'info',
      title: 'Équipe freep0nx',
      message: 'Découvrez nos experts en cybersécurité',
      duration: 3000
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative z-10">
      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-20">
          <div className="relative inline-block mb-8">
            <h1 className="text-7xl font-black bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent mb-6">
              freep0nx
            </h1>
            <div className="absolute -top-4 -right-4">
              <Sparkles className="h-8 w-8 text-emerald-400 animate-pulse" />
            </div>
          </div>
          
          <p className="text-xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Équipe CTF passionnée par la cybersécurité, l'exploration de vulnérabilités et les défis techniques. 
            <span className="text-emerald-400 font-medium"> Rejoignez-nous dans l'aventure !</span>
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <button
              onClick={handleCTFClick}
              className="group bg-gradient-to-r from-violet-500/80 to-rose-500/80 hover:from-violet-500 hover:to-rose-500 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-violet-500/25 flex items-center space-x-2"
            >
              <span>Commencer les Challenges</span>
              <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={handleTeamClick}
              className="group bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 border border-white/20 hover:border-white/30 flex items-center space-x-2"
            >
              <span>Voir l'Équipe</span>
              <Users className="h-5 w-5 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          <div className="group bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-violet-500/30 transition-all duration-500 transform hover:scale-105 hover:bg-white/10 cursor-pointer">
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-violet-500/20 to-violet-600/20 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
              <Shield className="h-8 w-8 text-violet-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Reverse Engineering</h3>
            <p className="text-slate-400 leading-relaxed">Analyse de binaires et désassemblage de code avec expertise</p>
            <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex items-center text-violet-400 text-sm">
                <span>Découvrir</span>
                <ChevronRight className="h-4 w-4 ml-1" />
              </div>
            </div>
          </div>

          <div className="group bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-emerald-500/30 transition-all duration-500 transform hover:scale-105 hover:bg-white/10 cursor-pointer">
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
              <Terminal className="h-8 w-8 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Web Exploitation</h3>
            <p className="text-slate-400 leading-relaxed">XSS, injection SQL et vulnérabilités web avancées</p>
            <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex items-center text-emerald-400 text-sm">
                <span>Explorer</span>
                <ChevronRight className="h-4 w-4 ml-1" />
              </div>
            </div>
          </div>

          <div className="group bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-rose-500/30 transition-all duration-500 transform hover:scale-105 hover:bg-white/10 cursor-pointer">
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-rose-500/20 to-rose-600/20 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
              <Users className="h-8 w-8 text-rose-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">OSINT</h3>
            <p className="text-slate-400 leading-relaxed">Recherche d'informations et investigations poussées</p>
            <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex items-center text-rose-400 text-sm">
                <span>Investiguer</span>
                <ChevronRight className="h-4 w-4 ml-1" />
              </div>
            </div>
          </div>

          <div className="group bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-amber-500/30 transition-all duration-500 transform hover:scale-105 hover:bg-white/10 cursor-pointer">
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-500/20 to-amber-600/20 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
              <Award className="h-8 w-8 text-amber-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Cryptographie</h3>
            <p className="text-slate-400 leading-relaxed">Chiffrement, déchiffrement et cryptanalyse moderne</p>
            <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex items-center text-amber-400 text-sm">
                <span>Décrypter</span>
                <ChevronRight className="h-4 w-4 ml-1" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-10 border border-white/10 hover:border-white/20 transition-all duration-500">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="text-4xl font-black text-emerald-400 mb-3 group-hover:scale-110 transition-transform duration-300 cursor-pointer">22</div>
              <div className="text-slate-400 font-medium">Membres actifs</div>
              <div className="w-full bg-slate-700/50 rounded-full h-2 mt-2">
                <div className="bg-emerald-400 h-2 rounded-full w-4/5 transition-all duration-1000"></div>
              </div>
            </div>
            <div className="group">
              <div className="text-4xl font-black text-violet-400 mb-3 group-hover:scale-110 transition-transform duration-300 cursor-pointer">8</div>
              <div className="text-slate-400 font-medium">Challenges disponibles</div>
              <div className="w-full bg-slate-700/50 rounded-full h-2 mt-2">
                <div className="bg-violet-400 h-2 rounded-full w-3/5 transition-all duration-1000"></div>
              </div>
            </div>
            <div className="group">
              <div className="text-4xl font-black text-rose-400 mb-3 group-hover:scale-110 transition-transform duration-300 cursor-pointer">∞</div>
              <div className="text-slate-400 font-medium">Vulnérabilités trouvées</div>
              <div className="w-full bg-slate-700/50 rounded-full h-2 mt-2">
                <div className="bg-rose-400 h-2 rounded-full w-full transition-all duration-1000"></div>
              </div>
            </div>
            <div className="group">
              <div className="text-4xl font-black text-amber-400 mb-3 group-hover:scale-110 transition-transform duration-300 cursor-pointer">1998</div>
              <div className="text-slate-400 font-medium">Fondée en</div>
              <div className="w-full bg-slate-700/50 rounded-full h-2 mt-2">
                <div className="bg-amber-400 h-2 rounded-full w-full transition-all duration-1000"></div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;