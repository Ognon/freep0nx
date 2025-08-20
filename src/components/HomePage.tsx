import React, { useState, useEffect } from 'react';
import { Users, Shield, Terminal, Award, ChevronRight, Sparkles, Zap, Target, Code, Lock, Eye, Cpu, Globe, Star, Trophy, Flame, Rocket, Clock, Activity } from 'lucide-react';
import Footer from './Footer';

interface HomePageProps {
  onNavigate: (page: string) => void;
  addNotification: (notification: any) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate, addNotification }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [counters, setCounters] = useState({
    vulnerabilities: 0,
    ctfs: 0,
    members: 0,
    flags: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Animate counters
    const animateCounter = (target: number, key: keyof typeof counters) => {
      let current = 0;
      const increment = target / 50;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setCounters(prev => ({ ...prev, [key]: Math.floor(current) }));
      }, 50);
    };

    setTimeout(() => animateCounter(500, 'vulnerabilities'), 500);
    setTimeout(() => animateCounter(50, 'ctfs'), 700);
    setTimeout(() => animateCounter(22, 'members'), 900);
    setTimeout(() => animateCounter(1337, 'flags'), 1100);
  }, []);

  const handleCTFClick = () => {
    onNavigate('ctf');
    addNotification({
      type: 'success',
      title: 'Plateforme CTF',
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

  const achievements = [
    { icon: Trophy, title: "Champion CTF", desc: "1er place aux CTF nationaux", color: "from-yellow-400 to-orange-500" },
    { icon: Target, title: "Bug Hunter", desc: "500+ vulnérabilités découvertes", color: "from-red-400 to-pink-500" },
    { icon: Shield, title: "Cyber Defense", desc: "Experts en sécurité défensive", color: "from-blue-400 to-cyan-500" },
    { icon: Rocket, title: "0-Day Hunter", desc: "Découverte de failles critiques", color: "from-purple-400 to-violet-500" }
  ];

  return (
    <div className="min-h-screen relative bg-black">
      {/* Floating Matrix Characters */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="matrix-rain absolute inset-0"></div>
      </div>

      {/* Cyber Grid Overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="cyber-grid absolute inset-0 opacity-30"></div>
      </div>

      {/* Hero Section with enhanced styling */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 z-10">
        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-2xl animate-pulse floating-orb"></div>
        <div className="absolute top-40 right-20 w-40 h-40 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-full blur-2xl animate-pulse delay-1000 floating-orb-reverse"></div>
        <div className="absolute bottom-40 left-20 w-36 h-36 bg-gradient-to-r from-green-500/30 to-emerald-500/30 rounded-full blur-2xl animate-pulse delay-2000 floating-orb"></div>
        <div className="absolute top-1/2 right-10 w-28 h-28 bg-gradient-to-r from-red-500/30 to-orange-500/30 rounded-full blur-2xl animate-pulse delay-3000 floating-orb-reverse"></div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          {/* Cyber Status Bar */}
          <div className="mb-8 inline-flex items-center space-x-4 bg-black/80 backdrop-blur-xl border border-cyan-400/50 rounded-2xl px-8 py-4 shadow-2xl shadow-cyan-500/20 cyber-border">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
              <span className="text-green-300 font-mono text-sm font-bold">ONLINE</span>
            </div>
            <div className="w-px h-6 bg-cyan-400/30"></div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-cyan-400" />
              <span className="text-cyan-300 font-mono text-sm font-bold">
                {currentTime.toLocaleTimeString()}
              </span>
            </div>
            <div className="w-px h-6 bg-cyan-400/30"></div>
            <div className="flex items-center space-x-2">
              <Activity className="h-4 w-4 text-purple-400 animate-pulse" />
              <span className="text-purple-300 font-mono text-sm font-bold">HACKING MODE</span>
            </div>
          </div>

          {/* Glitch Warning */}
          <div className="mb-6 text-red-400 font-mono text-sm animate-pulse">
            <span className="glitch-text-small">⚠️ UNAUTHORIZED ACCESS DETECTED ⚠️</span>
          </div>

          {/* Main title with enhanced glitch effect */}
          <div className="relative mb-12">
            <h1 className="text-8xl md:text-9xl font-black mb-6 relative select-none">
              <span 
                className="glitch-text bg-gradient-to-r from-cyan-400 via-purple-500 via-pink-500 to-green-400 bg-clip-text text-transparent drop-shadow-2xl"
                data-text="freep0nx"
              >
                freep0nx
              </span>
            </h1>
            <div className="absolute -top-6 -right-12 animate-bounce">
              <Flame className="h-16 w-16 text-orange-500 drop-shadow-lg animate-pulse" />
            </div>
            <div className="absolute -bottom-4 -left-8 animate-spin-slow">
              <Shield className="h-12 w-12 text-cyan-400 opacity-70" />
            </div>
          </div>
          
          <div className="mb-16">
            <div className="mb-6">
              <p className="text-3xl md:text-4xl font-black mb-4">
                <span className="bg-gradient-to-r from-red-400 via-yellow-400 via-green-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent animate-gradient-x">
                  ⚡ ELITE CYBER WARFARE TEAM ⚡
                </span>
              </p>
              <div className="flex justify-center items-center space-x-4 mb-4">
                <div className="h-px w-20 bg-gradient-to-r from-transparent to-cyan-400"></div>
                <div className="text-cyan-400 font-mono text-sm">[ CLASSIFIED ]</div>
                <div className="h-px w-20 bg-gradient-to-l from-transparent to-cyan-400"></div>
              </div>
            </div>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed backdrop-blur-sm bg-black/20 rounded-2xl p-6 border border-white/10">
              Équipe CTF d'élite spécialisée dans la cybersécurité offensive, l'exploitation de vulnérabilités 
              et les défis techniques les plus complexes. 
              <span className="text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text font-bold"> 
                🔥 Nous repoussons les limites du possible ! 🔥
              </span>
            </p>
          </div>
          
          {/* Enhanced Action buttons */}
          <div className="flex flex-wrap justify-center gap-8 mb-20">
            <button
              onClick={handleCTFClick}
              className="group relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-500 hover:via-pink-500 hover:to-red-500 text-white px-10 py-5 rounded-2xl font-black text-xl transition-all duration-500 transform hover:scale-110 shadow-2xl hover:shadow-purple-500/50 cyber-button"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-x"></div>
              <div className="relative flex items-center space-x-4">
                <Target className="h-7 w-7 animate-spin-slow" />
                <span className="tracking-wider">🎯 LANCER LES CHALLENGES</span>
                <ChevronRight className="h-6 w-6 group-hover:translate-x-3 transition-transform duration-300" />
              </div>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
            </button>
            
            <button
              onClick={handleTeamClick}
              className="group relative overflow-hidden bg-black/70 hover:bg-black/90 backdrop-blur-xl border-2 border-cyan-400/60 hover:border-cyan-300 text-white px-10 py-5 rounded-2xl font-black text-xl transition-all duration-500 transform hover:scale-110 shadow-2xl hover:shadow-cyan-500/50 cyber-button"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative flex items-center space-x-4">
                <Users className="h-7 w-7 text-cyan-400 group-hover:animate-pulse" />
                <span className="tracking-wider">👥 DÉCOUVRIR L'ÉQUIPE</span>
                <Sparkles className="h-6 w-6 text-cyan-400 group-hover:rotate-180 transition-transform duration-700" />
              </div>
            </button>
          </div>

          {/* Enhanced animated counters */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            <div className="group bg-black/40 backdrop-blur-xl border border-red-500/40 rounded-3xl p-8 hover:border-red-400/70 transition-all duration-500 hover:scale-110 hover:rotate-1 cyber-card">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="text-5xl font-black text-red-400 mb-3 animate-pulse">{counters.vulnerabilities}+</div>
                <div className="text-red-300 font-bold text-lg">💀 Vulnérabilités</div>
                <div className="text-xs text-red-200/70 mt-2 font-mono">DISCOVERED</div>
              </div>
            </div>
            <div className="group bg-black/40 backdrop-blur-xl border border-purple-500/40 rounded-3xl p-8 hover:border-purple-400/70 transition-all duration-500 hover:scale-110 hover:-rotate-1 cyber-card">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="text-5xl font-black text-purple-400 mb-3 animate-pulse">{counters.ctfs}+</div>
                <div className="text-purple-300 font-bold text-lg">🏆 CTF Gagnés</div>
                <div className="text-xs text-purple-200/70 mt-2 font-mono">VICTORIES</div>
              </div>
            </div>
            <div className="group bg-black/40 backdrop-blur-xl border border-cyan-500/40 rounded-3xl p-8 hover:border-cyan-400/70 transition-all duration-500 hover:scale-110 hover:rotate-1 cyber-card">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="text-5xl font-black text-cyan-400 mb-3 animate-pulse">{counters.members}</div>
                <div className="text-cyan-300 font-bold text-lg">👨‍💻 Hackers Elite</div>
                <div className="text-xs text-cyan-200/70 mt-2 font-mono">ACTIVE</div>
              </div>
            </div>
            <div className="group bg-black/40 backdrop-blur-xl border border-green-500/40 rounded-3xl p-8 hover:border-green-400/70 transition-all duration-500 hover:scale-110 hover:-rotate-1 cyber-card">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="text-5xl font-black text-green-400 mb-3 animate-pulse">{counters.flags}</div>
                <div className="text-green-300 font-bold text-lg">🚩 Flags Capturés</div>
                <div className="text-xs text-green-200/70 mt-2 font-mono">TOTAL</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cyber Divider */}
      <div className="relative z-10 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center space-x-4">
            <div className="h-px w-32 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
            <div className="text-cyan-400 font-mono text-sm animate-pulse">[ ACCESSING CLASSIFIED DATA ]</div>
            <div className="h-px w-32 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
          </div>
        </div>
      </div>

      {/* Enhanced Specialties Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="mb-8">
              <span className="text-red-400 font-mono text-sm animate-pulse">⚠️ CLASSIFIED INTEL ⚠️</span>
            </div>
            <h2 className="text-6xl md:text-7xl font-black mb-8">
              <span className="glitch-text bg-gradient-to-r from-red-400 via-yellow-400 via-green-400 to-cyan-400 bg-clip-text text-transparent" data-text="NOS SPÉCIALITÉS">
                🔥 NOS SPÉCIALITÉS 🔥
              </span>
            </h2>
            <p className="text-2xl text-gray-300 font-bold">
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Domaines d'expertise de l'équipe freep0nx
              </span>
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div className="group relative bg-black/60 backdrop-blur-xl rounded-3xl p-10 border border-purple-500/40 hover:border-purple-400/80 transition-all duration-700 transform hover:scale-110 hover:rotate-2 cyber-card-glow">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative">
                <div className="flex items-center justify-center w-24 h-24 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-3xl mb-8 group-hover:scale-125 transition-transform duration-500 shadow-2xl shadow-purple-500/30">
                  <Shield className="h-12 w-12 text-purple-400 animate-pulse" />
                </div>
                <h3 className="text-3xl font-black text-white mb-6 group-hover:text-purple-300 transition-colors">
                  🔍 Reverse Engineering
                </h3>
                <p className="text-gray-300 leading-relaxed mb-6 text-lg">
                  Désassemblage de binaires, analyse de malwares et ingénierie inverse avancée
                </p>
                <div className="flex items-center text-purple-400 text-sm font-bold bg-purple-500/10 rounded-full px-4 py-2 border border-purple-500/30">
                  <Code className="h-5 w-5 mr-2 animate-spin-slow" />
                  <span>EXPERT LEVEL</span>
                </div>
              </div>
            </div>

            <div className="group relative bg-black/60 backdrop-blur-xl rounded-3xl p-10 border border-cyan-500/40 hover:border-cyan-400/80 transition-all duration-700 transform hover:scale-110 hover:-rotate-2 cyber-card-glow">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative">
                <div className="flex items-center justify-center w-24 h-24 bg-gradient-to-br from-cyan-500/30 to-blue-500/30 rounded-3xl mb-8 group-hover:scale-125 transition-transform duration-500 shadow-2xl shadow-cyan-500/30">
                  <Globe className="h-12 w-12 text-cyan-400 animate-pulse" />
                </div>
                <h3 className="text-3xl font-black text-white mb-6 group-hover:text-cyan-300 transition-colors">
                  🌐 Web Exploitation
                </h3>
                <p className="text-gray-300 leading-relaxed mb-6 text-lg">
                  XSS, injection SQL, CSRF et vulnérabilités web avancées
                </p>
                <div className="flex items-center text-cyan-400 text-sm font-bold bg-cyan-500/10 rounded-full px-4 py-2 border border-cyan-500/30">
                  <Target className="h-5 w-5 mr-2 animate-pulse" />
                  <span>MASTER LEVEL</span>
                </div>
              </div>
            </div>

            <div className="group relative bg-black/60 backdrop-blur-xl rounded-3xl p-10 border border-red-500/40 hover:border-red-400/80 transition-all duration-700 transform hover:scale-110 hover:rotate-2 cyber-card-glow">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative">
                <div className="flex items-center justify-center w-24 h-24 bg-gradient-to-br from-red-500/30 to-orange-500/30 rounded-3xl mb-8 group-hover:scale-125 transition-transform duration-500 shadow-2xl shadow-red-500/30">
                  <Eye className="h-12 w-12 text-red-400 animate-pulse" />
                </div>
                <h3 className="text-3xl font-black text-white mb-6 group-hover:text-red-300 transition-colors">
                  🕵️ OSINT
                </h3>
                <p className="text-gray-300 leading-relaxed mb-6 text-lg">
                  Recherche d'informations, investigations et reconnaissance avancée
                </p>
                <div className="flex items-center text-red-400 text-sm font-bold bg-red-500/10 rounded-full px-4 py-2 border border-red-500/30">
                  <Zap className="h-5 w-5 mr-2 animate-bounce" />
                  <span>ELITE LEVEL</span>
                </div>
              </div>
            </div>

            <div className="group relative bg-black/60 backdrop-blur-xl rounded-3xl p-10 border border-yellow-500/40 hover:border-yellow-400/80 transition-all duration-700 transform hover:scale-110 hover:-rotate-2 cyber-card-glow">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative">
                <div className="flex items-center justify-center w-24 h-24 bg-gradient-to-br from-yellow-500/30 to-orange-500/30 rounded-3xl mb-8 group-hover:scale-125 transition-transform duration-500 shadow-2xl shadow-yellow-500/30">
                  <Lock className="h-12 w-12 text-yellow-400 animate-pulse" />
                </div>
                <h3 className="text-3xl font-black text-white mb-6 group-hover:text-yellow-300 transition-colors">
                  🔐 Cryptographie
                </h3>
                <p className="text-gray-300 leading-relaxed mb-6 text-lg">
                  Chiffrement, déchiffrement, cryptanalyse et algorithmes avancés
                </p>
                <div className="flex items-center text-yellow-400 text-sm font-bold bg-yellow-500/10 rounded-full px-4 py-2 border border-yellow-500/30">
                  <Star className="h-5 w-5 mr-2 animate-spin" />
                  <span>LEGENDARY</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Achievements Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="mb-8">
              <span className="text-yellow-400 font-mono text-sm animate-pulse">🏆 HALL OF FAME 🏆</span>
            </div>
            <h2 className="text-6xl md:text-7xl font-black mb-8">
              <span className="glitch-text bg-gradient-to-r from-yellow-400 via-red-400 to-purple-400 bg-clip-text text-transparent" data-text="ACHIEVEMENTS">
                ⚡ ACHIEVEMENTS ⚡
              </span>
            </h2>
            <p className="text-2xl text-gray-300 font-bold">
              <span className="bg-gradient-to-r from-yellow-400 to-red-400 bg-clip-text text-transparent">
                Nos accomplissements les plus prestigieux
              </span>
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {achievements.map((achievement, index) => (
              <div key={index} className="group relative bg-black/60 backdrop-blur-xl rounded-3xl p-10 border border-white/20 hover:border-white/50 transition-all duration-700 transform hover:scale-110 hover:rotate-1 cyber-card-glow">
                <div className={`absolute inset-0 bg-gradient-to-br ${achievement.color} opacity-10 group-hover:opacity-30 rounded-3xl transition-opacity duration-700`}></div>
                <div className="relative text-center">
                  <div className={`inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br ${achievement.color} rounded-3xl mb-8 group-hover:scale-125 transition-transform duration-500 shadow-2xl`}>
                    <achievement.icon className="h-12 w-12 text-white animate-pulse" />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-4 group-hover:text-yellow-300 transition-colors">
                    {achievement.title}
                  </h3>
                  <p className="text-gray-300 text-lg leading-relaxed">{achievement.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>

          {/* Main title with glitch effect */}
          <div className="relative mb-8">
            <h1 className="text-8xl md:text-9xl font-black mb-4 relative">
              <span className="glitch-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                freep0nx
              </span>
            </h1>
            <div className="absolute -top-4 -right-8 animate-bounce">
              <Flame className="h-12 w-12 text-orange-500" />
            </div>
          </div>
          
          <div className="mb-12">
            <p className="text-2xl md:text-3xl text-transparent bg-gradient-to-r from-green-400 via-cyan-400 to-purple-400 bg-clip-text font-bold mb-4">
              ELITE CYBER WARFARE TEAM
            </p>
            <p className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Équipe CTF d'élite spécialisée dans la cybersécurité offensive, l'exploitation de vulnérabilités 
              et les défis techniques les plus complexes. 
              <span className="text-cyan-400 font-semibold"> Nous repoussons les limites du possible !</span>
            </p>
          </div>
          
          {/* Action buttons with enhanced styling */}
          <div className="flex flex-wrap justify-center gap-6 mb-16">
            <button
              onClick={handleCTFClick}
              className="group relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-purple-500/50"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center space-x-3">
                <Target className="h-6 w-6" />
                <span>LANCER LES CHALLENGES</span>
                <ChevronRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
              </div>
            </button>
            
            <button
              onClick={handleTeamClick}
              className="group relative overflow-hidden bg-black/50 hover:bg-black/70 backdrop-blur-xl border-2 border-cyan-500/50 hover:border-cyan-400 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-cyan-500/50"
            >
              <div className="relative flex items-center space-x-3">
                <Users className="h-6 w-6 text-cyan-400" />
                <span>DÉCOUVRIR L'ÉQUIPE</span>
                <Sparkles className="h-5 w-5 text-cyan-400 group-hover:rotate-180 transition-transform duration-500" />
              </div>
            </button>
          </div>

          {/* Animated counters */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <div className="bg-black/30 backdrop-blur-xl border border-red-500/30 rounded-2xl p-6 hover:border-red-400/50 transition-all duration-300 hover:scale-105">
              <div className="text-4xl font-black text-red-400 mb-2">{counters.vulnerabilities}+</div>
              <div className="text-red-300 font-semibold">Vulnérabilités</div>
              <div className="text-xs text-gray-400 mt-1">Découvertes</div>
            </div>
            <div className="bg-black/30 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-6 hover:border-purple-400/50 transition-all duration-300 hover:scale-105">
              <div className="text-4xl font-black text-purple-400 mb-2">{counters.ctfs}+</div>
              <div className="text-purple-300 font-semibold">CTF Gagnés</div>
              <div className="text-xs text-gray-400 mt-1">Compétitions</div>
            </div>
            <div className="bg-black/30 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-6 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105">
              <div className="text-4xl font-black text-cyan-400 mb-2">{counters.members}</div>
              <div className="text-cyan-300 font-semibold">Hackers Elite</div>
              <div className="text-xs text-gray-400 mt-1">Membres actifs</div>
            </div>
            <div className="bg-black/30 backdrop-blur-xl border border-green-500/30 rounded-2xl p-6 hover:border-green-400/50 transition-all duration-300 hover:scale-105">
              <div className="text-4xl font-black text-green-400 mb-2">{counters.flags}</div>
              <div className="text-green-300 font-semibold">Flags Capturés</div>
              <div className="text-xs text-gray-400 mt-1">Total</div>
            </div>
          </div>
        </div>
      </section>

      {/* Specialties Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-6">
              <span className="bg-gradient-to-r from-red-400 via-yellow-400 to-green-400 bg-clip-text text-transparent">
                NOS SPÉCIALITÉS
              </span>
            </h2>
            <p className="text-xl text-gray-300">Domaines d'expertise de l'équipe freep0nx</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group relative bg-black/40 backdrop-blur-xl rounded-3xl p-8 border border-purple-500/30 hover:border-purple-400/60 transition-all duration-500 transform hover:scale-105 hover:rotate-1">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-10 w-10 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Reverse Engineering</h3>
                <p className="text-gray-300 leading-relaxed mb-4">Désassemblage de binaires, analyse de malwares et ingénierie inverse avancée</p>
                <div className="flex items-center text-purple-400 text-sm font-semibold">
                  <Code className="h-4 w-4 mr-2" />
                  <span>Expert Level</span>
                </div>
              </div>
            </div>

            <div className="group relative bg-black/40 backdrop-blur-xl rounded-3xl p-8 border border-cyan-500/30 hover:border-cyan-400/60 transition-all duration-500 transform hover:scale-105 hover:-rotate-1">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Globe className="h-10 w-10 text-cyan-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Web Exploitation</h3>
                <p className="text-gray-300 leading-relaxed mb-4">XSS, injection SQL, CSRF et vulnérabilités web avancées</p>
                <div className="flex items-center text-cyan-400 text-sm font-semibold">
                  <Target className="h-4 w-4 mr-2" />
                  <span>Master Level</span>
                </div>
              </div>
            </div>

            <div className="group relative bg-black/40 backdrop-blur-xl rounded-3xl p-8 border border-red-500/30 hover:border-red-400/60 transition-all duration-500 transform hover:scale-105 hover:rotate-1">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Eye className="h-10 w-10 text-red-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">OSINT</h3>
                <p className="text-gray-300 leading-relaxed mb-4">Recherche d'informations, investigations et reconnaissance avancée</p>
                <div className="flex items-center text-red-400 text-sm font-semibold">
                  <Zap className="h-4 w-4 mr-2" />
                  <span>Elite Level</span>
                </div>
              </div>
            </div>

            <div className="group relative bg-black/40 backdrop-blur-xl rounded-3xl p-8 border border-yellow-500/30 hover:border-yellow-400/60 transition-all duration-500 transform hover:scale-105 hover:-rotate-1">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Lock className="h-10 w-10 text-yellow-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Cryptographie</h3>
                <p className="text-gray-300 leading-relaxed mb-4">Chiffrement, déchiffrement, cryptanalyse et algorithmes avancés</p>
                <div className="flex items-center text-yellow-400 text-sm font-semibold">
                  <Star className="h-4 w-4 mr-2" />
                  <span>Legendary</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-6">
              <span className="bg-gradient-to-r from-yellow-400 via-red-400 to-purple-400 bg-clip-text text-transparent">
                ACHIEVEMENTS
              </span>
            </h2>
            <p className="text-xl text-gray-300">Nos accomplissements les plus prestigieux</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="group relative bg-black/40 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-white/30 transition-all duration-500 transform hover:scale-105">
                <div className={`absolute inset-0 bg-gradient-to-br ${achievement.color} opacity-5 group-hover:opacity-20 rounded-3xl transition-opacity duration-500`}></div>
                <div className="relative text-center">
                  <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${achievement.color} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <achievement.icon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{achievement.title}</h3>
                  <p className="text-gray-300 text-sm">{achievement.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default HomePage;