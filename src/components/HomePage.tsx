import React, { useState, useEffect } from 'react';
import { Users, Shield, Terminal, Award, ChevronRight, Sparkles, Zap, Target, Code, Lock, Eye, Cpu, Globe, Star, Trophy, Flame, Rocket, Clock, Activity, Wifi, Database, Brain, Crosshair, Skull, CloudLightning as Lightning, Atom, Hexagon } from 'lucide-react';
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
  const [hackingMode, setHackingMode] = useState(false);
  const [matrixRain, setMatrixRain] = useState(false);
  const [cyberAlert, setCyberAlert] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Activer le mode hacking aléatoirement
    const hackingTimer = setInterval(() => {
      setHackingMode(prev => !prev);
      setMatrixRain(Math.random() > 0.7);
      setCyberAlert(Math.random() > 0.8);
    }, 3000);
    
    return () => clearInterval(hackingTimer);
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

    setTimeout(() => animateCounter(1337, 'vulnerabilities'), 500);
    setTimeout(() => animateCounter(100, 'ctfs'), 700);
    setTimeout(() => animateCounter(22, 'members'), 900);
    setTimeout(() => animateCounter(9999, 'flags'), 1100);
  }, []);

  const handleCTFClick = () => {
    onNavigate('ctf');
    addNotification({
      type: 'success',
      title: 'Plateforme CTF',
      message: '🔥 Prêt à hacker le monde ? 🔥',
      duration: 3000
    });
  };

  const handleTeamClick = () => {
    onNavigate('team');
    addNotification({
      type: 'info',
      title: 'Équipe freep0nx',
      message: '👨‍💻 Découvrez nos hackers d\'élite 👨‍💻',
      duration: 3000
    });
  };

  const achievements = [
    { icon: Trophy, title: "Champion CTF", desc: "1er place aux CTF nationaux", color: "from-yellow-400 to-orange-500" },
    { icon: Target, title: "Bug Hunter", desc: "500+ vulnérabilités découvertes", color: "from-red-400 to-pink-500" },
    { icon: Shield, title: "Cyber Defense", desc: "Experts en sécurité défensive", color: "from-blue-400 to-cyan-500" },
    { icon: Rocket, title: "0-Day Hunter", desc: "Découverte de failles critiques", color: "from-purple-400 to-violet-500" },
    { icon: Skull, title: "Black Hat Elite", desc: "Maîtres de l'art du hacking", color: "from-gray-400 to-black" },
    { icon: Lightning, title: "Speed Hacker", desc: "Records de vitesse en CTF", color: "from-yellow-300 to-red-500" },
    { icon: Brain, title: "AI Hacker", desc: "Experts en IA et ML hacking", color: "from-green-400 to-blue-500" },
    { icon: Atom, title: "Quantum Breaker", desc: "Pionniers du quantum hacking", color: "from-purple-500 to-pink-500" }
  ];

  const specialties = [
    { icon: Shield, title: "Reverse Engineering", desc: "Désassemblage de binaires, analyse de malwares et ingénierie inverse avancée", color: "from-purple-500/30 to-pink-500/30", textColor: "text-purple-400", borderColor: "border-purple-500/40", hoverBorder: "hover:border-purple-400/80", bgColor: "bg-purple-500/10", level: "EXPERT LEVEL", levelIcon: Code },
    { icon: Globe, title: "Web Exploitation", desc: "XSS, injection SQL, CSRF et vulnérabilités web avancées", color: "from-cyan-500/30 to-blue-500/30", textColor: "text-cyan-400", borderColor: "border-cyan-500/40", hoverBorder: "hover:border-cyan-400/80", bgColor: "bg-cyan-500/10", level: "MASTER LEVEL", levelIcon: Target },
    { icon: Eye, title: "OSINT", desc: "Recherche d'informations, investigations et reconnaissance avancée", color: "from-red-500/30 to-orange-500/30", textColor: "text-red-400", borderColor: "border-red-500/40", hoverBorder: "hover:border-red-400/80", bgColor: "bg-red-500/10", level: "ELITE LEVEL", levelIcon: Zap },
    { icon: Lock, title: "Cryptographie", desc: "Chiffrement, déchiffrement, cryptanalyse et algorithmes avancés", color: "from-yellow-500/30 to-orange-500/30", textColor: "text-yellow-400", borderColor: "border-yellow-500/40", hoverBorder: "hover:border-yellow-400/80", bgColor: "bg-yellow-500/10", level: "LEGENDARY", levelIcon: Star },
    { icon: Database, title: "Forensic Digital", desc: "Analyse de preuves numériques et investigation post-incident", color: "from-green-500/30 to-emerald-500/30", textColor: "text-green-400", borderColor: "border-green-500/40", hoverBorder: "hover:border-green-400/80", bgColor: "bg-green-500/10", level: "GODLIKE", levelIcon: Hexagon },
    { icon: Wifi, title: "Network Hacking", desc: "Pentesting réseau, WiFi cracking et infrastructure compromise", color: "from-indigo-500/30 to-purple-500/30", textColor: "text-indigo-400", borderColor: "border-indigo-500/40", hoverBorder: "hover:border-indigo-400/80", bgColor: "bg-indigo-500/10", level: "ULTIMATE", levelIcon: Crosshair }
  ];

  return (
    <div className="min-h-screen relative bg-black">
      {/* Floating Matrix Characters */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="matrix-rain absolute inset-0"></div>
      </div>

      {/* Matrix Rain Effect conditionnel */}
      {matrixRain && (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-5 animate-data-stream opacity-60"></div>
      )}

      {/* Cyber Grid Overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="cyber-grid absolute inset-0 opacity-30"></div>
      </div>

      {/* Hero Section with enhanced styling */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 z-10">
        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-r from-purple-500/40 to-pink-500/40 rounded-full blur-3xl animate-cyber-pulse floating-orb"></div>
        <div className="absolute top-40 right-20 w-48 h-48 bg-gradient-to-r from-cyan-500/40 to-blue-500/40 rounded-full blur-3xl animate-cyber-pulse delay-1000 floating-orb-reverse"></div>
        <div className="absolute bottom-40 left-20 w-44 h-44 bg-gradient-to-r from-green-500/40 to-emerald-500/40 rounded-full blur-3xl animate-cyber-pulse delay-2000 floating-orb"></div>
        <div className="absolute top-1/2 right-10 w-36 h-36 bg-gradient-to-r from-red-500/40 to-orange-500/40 rounded-full blur-3xl animate-cyber-pulse delay-3000 floating-orb-reverse"></div>

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
              <Activity className={`h-4 w-4 text-purple-400 ${hackingMode ? 'animate-bounce' : 'animate-pulse'}`} />
              <span className={`text-purple-300 font-mono text-sm font-bold ${hackingMode ? 'animate-rainbow-text' : ''}`}>
                {hackingMode ? 'HACKING ACTIVE' : 'STANDBY MODE'}
              </span>
            </div>
          </div>

          {/* Glitch Warning */}
          <div className={`mb-6 text-red-400 font-mono text-sm ${cyberAlert ? 'animate-shake-intense' : 'animate-pulse'}`}>
            <span className="glitch-text-small">
              {cyberAlert ? '🚨 CYBER ATTACK IN PROGRESS 🚨' : '⚠️ UNAUTHORIZED ACCESS DETECTED ⚠️'}
            </span>
          </div>

          {/* Main title with enhanced glitch effect */}
          <div className="relative mb-12">
            <h1 className="text-8xl md:text-9xl font-black mb-6 relative select-none animate-hologram">
              <span 
                className="glitch-text bg-gradient-to-r from-cyan-400 via-purple-500 via-pink-500 via-yellow-400 to-green-400 bg-clip-text text-transparent drop-shadow-2xl animate-gradient-x"
                data-text="freep0nx"
              >
                freep0nx
              </span>
            </h1>
            <div className="absolute -top-6 -right-12 animate-bounce-glow">
              <Flame className="h-20 w-20 text-orange-500 drop-shadow-lg animate-quantum-flicker" />
            </div>
            <div className="absolute -bottom-4 -left-8 animate-spin-slow animate-cyber-pulse">
              <Shield className="h-16 w-16 text-cyan-400 opacity-80" />
            </div>
            <div className="absolute top-1/2 -right-20 animate-float">
              <Skull className="h-12 w-12 text-red-500 animate-pulse" />
            </div>
            <div className="absolute bottom-0 -left-16 animate-bounce">
              <Lightning className="h-14 w-14 text-yellow-400 animate-quantum-flicker" />
            </div>
          </div>
          
          <div className="mb-16">
            <div className="mb-6">
              <p className="text-4xl md:text-5xl font-black mb-4">
                <span className="bg-gradient-to-r from-red-400 via-yellow-400 via-green-400 via-cyan-400 via-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent animate-gradient-x">
                  ⚡ ULTIMATE CYBER WARFARE TEAM ⚡
                </span>
              </p>
              <div className="flex justify-center items-center space-x-4 mb-4">
                <div className="h-px w-32 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse"></div>
                <div className="text-cyan-400 font-mono text-sm animate-rainbow-text cyber-border px-4 py-2 rounded-lg">
                  [ TOP SECRET - LEVEL ∞ ]
                </div>
                <div className="h-px w-32 bg-gradient-to-l from-transparent via-cyan-400 to-transparent animate-pulse"></div>
              </div>
            </div>
            <p className="text-2xl text-gray-300 max-w-5xl mx-auto leading-relaxed backdrop-blur-sm bg-black/30 rounded-3xl p-8 border border-white/20 cyber-card-glow particle-effect">
              <span className="font-bold text-3xl bg-gradient-to-r from-red-400 to-yellow-400 bg-clip-text text-transparent">
                🏴‍☠️ HACKERS D'ÉLITE MONDIALE 🏴‍☠️
              </span>
              <br /><br />
              Équipe CTF légendaire spécialisée dans la cybersécurité offensive extrême, l'exploitation de vulnérabilités 0-day, 
              le reverse engineering avancé et les défis techniques impossibles. 
              <span className="text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text font-bold animate-gradient-x"> 
                🔥 NOUS DOMINONS LE CYBERESPACE ! 🔥
              </span>
            </p>
          </div>
          
          {/* Enhanced Action buttons */}
          <div className="flex flex-wrap justify-center gap-8 mb-20">
            <button
              onClick={handleCTFClick}
              className="group relative overflow-hidden bg-gradient-to-r from-purple-600 via-pink-600 via-red-600 to-orange-600 hover:from-purple-500 hover:via-pink-500 hover:via-red-500 hover:to-orange-500 text-white px-12 py-6 rounded-3xl font-black text-2xl transition-all duration-500 transform hover:scale-115 shadow-2xl hover:shadow-purple-500/70 cyber-button neon-border animate-cyber-pulse"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 via-red-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-x"></div>
              <div className="relative flex items-center space-x-4">
                <Crosshair className="h-8 w-8 animate-spin-slow animate-cyber-pulse" />
                <span className="tracking-wider">🎯 LANCER L'ASSAUT CYBER</span>
                <ChevronRight className="h-7 w-7 group-hover:translate-x-4 transition-transform duration-300 animate-bounce" />
              </div>
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-400/30 to-pink-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
            </button>
            
            <button
              onClick={handleTeamClick}
              className="group relative overflow-hidden bg-black/80 hover:bg-black/95 backdrop-blur-xl border-3 border-cyan-400/70 hover:border-cyan-300 text-white px-12 py-6 rounded-3xl font-black text-2xl transition-all duration-500 transform hover:scale-115 shadow-2xl hover:shadow-cyan-500/70 cyber-button neon-border animate-cyber-pulse"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-x"></div>
              <div className="relative flex items-center space-x-4">
                <Users className="h-8 w-8 text-cyan-400 group-hover:animate-bounce animate-cyber-pulse" />
                <span className="tracking-wider">👥 RENCONTRER LES HACKERS</span>
                <Sparkles className="h-7 w-7 text-cyan-400 group-hover:rotate-180 transition-transform duration-700 animate-quantum-flicker" />
              </div>
            </button>
          </div>

          {/* Enhanced animated counters */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-20">
            <div className="group bg-black/50 backdrop-blur-xl border border-red-500/50 rounded-3xl p-10 hover:border-red-400/80 transition-all duration-500 hover:scale-115 hover:rotate-2 cyber-card cyber-card-glow animate-cyber-pulse">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-x"></div>
              <div className="relative">
                <div className="text-6xl font-black text-red-400 mb-4 animate-quantum-flicker">{counters.vulnerabilities}+</div>
                <div className="text-red-300 font-bold text-xl">💀 Vulnérabilités</div>
                <div className="text-sm text-red-200/80 mt-3 font-mono animate-rainbow-text">PWNED</div>
              </div>
            </div>
            <div className="group bg-black/50 backdrop-blur-xl border border-purple-500/50 rounded-3xl p-10 hover:border-purple-400/80 transition-all duration-500 hover:scale-115 hover:-rotate-2 cyber-card cyber-card-glow animate-cyber-pulse">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-x"></div>
              <div className="relative">
                <div className="text-6xl font-black text-purple-400 mb-4 animate-quantum-flicker">{counters.ctfs}+</div>
                <div className="text-purple-300 font-bold text-xl">🏆 CTF Dominés</div>
                <div className="text-sm text-purple-200/80 mt-3 font-mono animate-rainbow-text">CONQUERED</div>
              </div>
            </div>
            <div className="group bg-black/50 backdrop-blur-xl border border-cyan-500/50 rounded-3xl p-10 hover:border-cyan-400/80 transition-all duration-500 hover:scale-115 hover:rotate-2 cyber-card cyber-card-glow animate-cyber-pulse">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-x"></div>
              <div className="relative">
                <div className="text-6xl font-black text-cyan-400 mb-4 animate-quantum-flicker">{counters.members}</div>
                <div className="text-cyan-300 font-bold text-xl">👨‍💻 Hackers Légendaires</div>
                <div className="text-sm text-cyan-200/80 mt-3 font-mono animate-rainbow-text">ELITE</div>
              </div>
            </div>
            <div className="group bg-black/50 backdrop-blur-xl border border-green-500/50 rounded-3xl p-10 hover:border-green-400/80 transition-all duration-500 hover:scale-115 hover:-rotate-2 cyber-card cyber-card-glow animate-cyber-pulse">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-x"></div>
              <div className="relative">
                <div className="text-6xl font-black text-green-400 mb-4 animate-quantum-flicker">{counters.flags}</div>
                <div className="text-green-300 font-bold text-xl">🚩 Flags Annihilés</div>
                <div className="text-sm text-green-200/80 mt-3 font-mono animate-rainbow-text">DESTROYED</div>
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
            <div className="text-cyan-400 font-mono text-sm animate-rainbow-text cyber-border px-4 py-2 rounded-lg">[ ACCESSING CLASSIFIED DATA ]</div>
            <div className="h-px w-32 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
          </div>
        </div>
      </div>

      {/* Enhanced Specialties Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="mb-8">
              <span className="text-red-400 font-mono text-sm animate-shake-intense cyber-border px-4 py-2 rounded-lg">🔥 CLASSIFIED INTEL 🔥</span>
            </div>
            <h2 className="text-6xl md:text-7xl font-black mb-8">
              <span className="glitch-text bg-gradient-to-r from-red-400 via-yellow-400 via-green-400 to-cyan-400 bg-clip-text text-transparent" data-text="NOS SPÉCIALITÉS">
                🔥 NOS SPÉCIALITÉS 🔥
              </span>
            </h2>
            <p className="text-2xl text-gray-300 font-bold">
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                🎯 Domaines de domination absolue 🎯
              </span>
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {specialties.map((specialty, index) => (
            <div key={index} className={`group relative bg-black/70 backdrop-blur-xl rounded-3xl p-12 border ${specialty.borderColor} ${specialty.hoverBorder} transition-all duration-700 transform hover:scale-115 hover:rotate-3 cyber-card-glow animate-cyber-pulse particle-effect`}>
              <div className={`absolute inset-0 bg-gradient-to-br ${specialty.color} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-gradient-x`}></div>
              <div className="relative">
                <div className={`flex items-center justify-center w-28 h-28 bg-gradient-to-br ${specialty.color} rounded-3xl mb-10 group-hover:scale-130 transition-transform duration-500 shadow-2xl animate-cyber-pulse`}>
                  <specialty.icon className={`h-14 w-14 ${specialty.textColor} animate-quantum-flicker`} />
                </div>
                <h3 className={`text-3xl font-black text-white mb-6 group-hover:${specialty.textColor} transition-colors animate-hologram`}>
                  {specialty.title}
                </h3>
                <p className="text-gray-300 leading-relaxed mb-8 text-lg">
                  {specialty.desc}
                </p>
                <div className={`flex items-center ${specialty.textColor} text-sm font-bold ${specialty.bgColor} rounded-full px-6 py-3 border ${specialty.borderColor} neon-border animate-bounce-glow`}>
                  <specialty.levelIcon className="h-6 w-6 mr-3 animate-spin-slow" />
                  <span className="animate-rainbow-text">{specialty.level}</span>
                </div>
              </div>
            </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Achievements Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="mb-8">
              <span className="text-yellow-400 font-mono text-sm animate-bounce-glow cyber-border px-4 py-2 rounded-lg">🏆 HALL OF LEGENDS 🏆</span>
            </div>
            <h2 className="text-6xl md:text-7xl font-black mb-8">
              <span className="glitch-text bg-gradient-to-r from-yellow-400 via-red-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-x" data-text="ACHIEVEMENTS">
                ⚡ LEGENDARY ACHIEVEMENTS ⚡
              </span>
            </h2>
            <p className="text-2xl text-gray-300 font-bold">
              <span className="bg-gradient-to-r from-yellow-400 to-red-400 bg-clip-text text-transparent">
                🎖️ Nos exploits légendaires dans le cyberespace 🎖️
              </span>
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {achievements.map((achievement, index) => (
              <div key={index} className="group relative bg-black/70 backdrop-blur-xl rounded-3xl p-12 border border-white/30 hover:border-white/70 transition-all duration-700 transform hover:scale-115 hover:rotate-2 cyber-card-glow animate-cyber-pulse particle-effect">
                <div className={`absolute inset-0 bg-gradient-to-br ${achievement.color} opacity-20 group-hover:opacity-50 rounded-3xl transition-opacity duration-700 animate-gradient-x`}></div>
                <div className="relative text-center">
                  <div className={`inline-flex items-center justify-center w-28 h-28 bg-gradient-to-br ${achievement.color} rounded-3xl mb-10 group-hover:scale-130 transition-transform duration-500 shadow-2xl animate-cyber-pulse neon-border`}>
                    <achievement.icon className="h-14 w-14 text-white animate-quantum-flicker" />
                  </div>
                  <h3 className="text-3xl font-black text-white mb-6 group-hover:text-yellow-300 transition-colors animate-hologram">
                    {achievement.title}
                  </h3>
                  <p className="text-gray-300 text-xl leading-relaxed">{achievement.desc}</p>
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