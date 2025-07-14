import React from 'react';
import { Users, Shield, Terminal, Award } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
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

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 mb-6">
            freep0nx
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Équipe CTF passionnée par la cybersécurité, l'exploration de vulnérabilités et les défis techniques. 
            Rejoignez-nous dans l'aventure !
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => onNavigate('ctf')}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Commencer les Challenges
            </button>
            <button
              onClick={() => onNavigate('team')}
              className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Voir l'Équipe
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center justify-center w-12 h-12 bg-purple-600 rounded-lg mb-4">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Reverse Engineering</h3>
            <p className="text-gray-400">Analyse de binaires et désassemblage de code</p>
          </div>

          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center justify-center w-12 h-12 bg-cyan-600 rounded-lg mb-4">
              <Terminal className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Web Exploitation</h3>
            <p className="text-gray-400">XSS, injection SQL et vulnérabilités web</p>
          </div>

          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-pink-500/30 hover:border-pink-400/50 transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center justify-center w-12 h-12 bg-pink-600 rounded-lg mb-4">
              <Users className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">OSINT</h3>
            <p className="text-gray-400">Recherche d'informations et investigations</p>
          </div>

          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-green-500/30 hover:border-green-400/50 transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center justify-center w-12 h-12 bg-green-600 rounded-lg mb-4">
              <Award className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Cryptographie</h3>
            <p className="text-gray-400">Chiffrement, déchiffrement et cryptanalyse</p>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-black/30 backdrop-blur-sm rounded-xl p-8 border border-purple-500/30">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-cyan-400 mb-2">21</div>
              <div className="text-gray-400">Membres actifs</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400 mb-2">6</div>
              <div className="text-gray-400">Challenges disponibles</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-pink-400 mb-2">∞</div>
              <div className="text-gray-400">Vulnérabilités trouvées</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400 mb-2">2024</div>
              <div className="text-gray-400">Fondée en</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;