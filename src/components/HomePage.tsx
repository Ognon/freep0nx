<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Freep0nx Platform</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@400;500;700&display=swap');
        
        body {
            font-family: 'Share Tech Mono', monospace;
            color: #00ff41;
            background-color: #000;
            overflow-x: hidden;
        }
        
        h1, h2, h3, h4, h5, h6 {
            font-family: 'Orbitron', sans-serif;
        }
        
        /* Matrix background effect */
        .matrix-bg {
            background: #000;
            position: relative;
            overflow: hidden;
        }
        
        .matrix-bg::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(transparent 90%, rgba(0, 255, 65, 0.1) 100%);
            animation: matrixRain 20s linear infinite;
            opacity: 0.2;
            pointer-events: none;
        }
        
        @keyframes matrixRain {
            0% { background-position: 0 0; }
            100% { background-position: 0 100%; }
        }
        
        /* Grid pattern */
        .grid-pattern {
            background-image: 
                linear-gradient(rgba(0, 255, 65, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 255, 65, 0.1) 1px, transparent 1px);
            background-size: 40px 40px;
        }
        
        /* Glitch effect */
        .glitch-overlay {
            background: linear-gradient(45deg, #ff00cc, #00ffcc, #ffcc00, #cc00ff);
            opacity: 0;
            animation: glitch 10s infinite;
            mix-blend-mode: overlay;
            pointer-events: none;
        }
        
        @keyframes glitch {
            0%, 100% { opacity: 0.01; }
            5%, 95% { opacity: 0.02; }
            10%, 90% { opacity: 0.03; }
            15%, 85% { opacity: 0.01; }
            20%, 80% { opacity: 0.02; }
            25%, 75% { opacity: 0; }
            30%, 70% { opacity: 0.01; }
            35%, 65% { opacity: 0.03; }
            40%, 60% { opacity: 0.02; }
            45%, 55% { opacity: 0.01; }
            50% { opacity: 0.03; }
        }
        
        /* Cyberpunk button styles */
        .cyber-button {
            background: #000;
            color: #00ff41;
            border: 1px solid #00ff41;
            padding: 10px 20px;
            position: relative;
            overflow: hidden;
            transition: all 0.3s;
            box-shadow: 0 0 10px rgba(0, 255, 65, 0.5);
        }
        
        .cyber-button:hover {
            background: #00ff41;
            color: #000;
            box-shadow: 0 0 20px rgba(0, 255, 65, 0.8);
        }
        
        .cyber-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: all 0.5s;
        }
        
        .cyber-button:hover::before {
            left: 100%;
        }
        
        /* Terminal styling */
        .terminal {
            background: rgba(0, 20, 0, 0.8);
            border: 1px solid #00ff41;
            border-radius: 5px;
            box-shadow: 0 0 15px rgba(0, 255, 65, 0.5);
            padding: 20px;
            font-family: 'Share Tech Mono', monospace;
            color: #00ff41;
            overflow: auto;
            max-width: 800px;
            margin: 0 auto;
        }
        
        .terminal-input {
            background: transparent;
            border: none;
            color: #00ff41;
            font-family: 'Share Tech Mono', monospace;
            width: 100%;
            outline: none;
            caret-color: #00ff41;
        }
        
        .terminal-input::placeholder {
            color: rgba(0, 255, 65, 0.5);
        }
        
        /* Notification styles */
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.8);
            border: 1px solid #00ff41;
            border-radius: 5px;
            padding: 15px;
            color: #00ff41;
            font-family: 'Share Tech Mono', monospace;
            z-index: 1000;
            box-shadow: 0 0 15px rgba(0, 255, 65, 0.5);
            max-width: 300px;
        }
        
        /* Matrix rain animation */
        @keyframes matrixRain {
            from { background-position: 0 0; }
            to { background-position: 0 100vh; }
        }
        
        .matrix-rain {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(transparent 80%, rgba(0, 255, 65, 0.1) 90%, transparent 95%);
            animation: matrixRain 5s linear infinite;
            opacity: 0.1;
        }
        
        /* Cyber grid */
        .cyber-grid {
            background-image: 
                linear-gradient(rgba(0, 255, 65, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0, 255, 65, 0.1) 1px, transparent 1px);
            background-size: 50px 50px;
            background-position: center center;
        }
        
        /* Glitch text effect */
        .glitch-text {
            position: relative;
            display: inline-block;
        }
        
        .glitch-text::before,
        .glitch-text::after {
            content: attr(data-text);
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
        
        .glitch-text::before {
            animation: glitch-animation 2s infinite linear alternate-reverse;
            color: #ff00cc;
            z-index: -1;
            clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
        }
        
        .glitch-text::after {
            animation: glitch-animation 2.5s infinite linear alternate-reverse;
            color: #00ffcc;
            z-index: -2;
            clip-path: polygon(0 60%, 100% 60%, 100% 100%, 0 100%);
        }
        
        @keyframes glitch-animation {
            0% { transform: translate(0); }
            20% { transform: translate(-5px, 5px); }
            40% { transform: translate(-5px, -5px); }
            60% { transform: translate(5px, 5px); }
            80% { transform: translate(5px, -5px); }
            100% { transform: translate(0); }
        }
        
        /* Cyber border */
        .cyber-border {
            border: 1px solid #00ff41;
            box-shadow: 0 0 10px rgba(0, 255, 65, 0.5), inset 0 0 10px rgba(0, 255, 65, 0.3);
        }
        
        /* Cyber card with glow effect */
        .cyber-card {
            background: rgba(0, 0, 0, 0.7);
            border: 1px solid rgba(0, 255, 65, 0.3);
            border-radius: 10px;
            padding: 20px;
            position: relative;
            overflow: hidden;
        }
        
        .cyber-card-glow {
            box-shadow: 0 0 15px rgba(0, 255, 65, 0.3);
        }
        
        .cyber-card-glow:hover {
            box-shadow: 0 0 25px rgba(0, 255, 65, 0.5);
        }
        
        /* Neon border */
        .neon-border {
            border: 1px solid #00ff41;
            box-shadow: 
                0 0 5px #00ff41,
                0 0 10px #00ff41,
                0 0 15px #00ff41,
                0 0 20px #00ff41;
        }
        
        /* Custom animations */
        @keyframes cyber-pulse {
            0%, 100% { opacity: 0.7; }
            50% { opacity: 1; }
        }
        
        .animate-cyber-pulse {
            animation: cyber-pulse 2s infinite;
        }
        
        @keyframes shake-intense {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
            20%, 40%, 60%, 80% { transform: translateX(10px); }
        }
        
        .animate-shake-intense {
            animation: shake-intense 0.5s infinite;
        }
        
        @keyframes quantum-flicker {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.3; }
        }
        
        .animate-quantum-flicker {
            animation: quantum-flicker 1s infinite;
        }
        
        @keyframes rainbow-text {
            0% { color: #ff0000; }
            14% { color: #ff7f00; }
            28% { color: #ffff00; }
            42% { color: #00ff00; }
            57% { color: #0000ff; }
            71% { color: #4b0082; }
            85% { color: #9400d3; }
            100% { color: #ff0000; }
        }
        
        .animate-rainbow-text {
            animation: rainbow-text 5s infinite;
        }
        
        @keyframes hologram {
            0%, 100% { 
                text-shadow: 
                    0 0 5px #00ff41,
                    0 0 10px #00ff41,
                    0 0 15px #00ff41,
                    0 0 20px #00ff41;
            }
            50% { 
                text-shadow: 
                    0 0 10px #00ff41,
                    0 0 20px #00ff41,
                    0 0 30px #00ff41,
                    0 0 40px #00ff41;
            }
        }
        
        .animate-hologram {
            animation: hologram 2s infinite;
        }
        
        @keyframes gradient-x {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        
        .animate-gradient-x {
            animation: gradient-x 3s ease infinite;
            background-size: 200% 200%;
        }
        
        @keyframes bounce-glow {
            0%, 100% { 
                transform: translateY(0);
                box-shadow: 0 0 10px rgba(0, 255, 65, 0.5);
            }
            50% { 
                transform: translateY(-10px);
                box-shadow: 0 0 20px rgba(0, 255, 65, 0.8);
            }
        }
        
        .animate-bounce-glow {
            animation: bounce-glow 2s infinite;
        }
        
        @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        
        .animate-spin-slow {
            animation: spin-slow 10s linear infinite;
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
        
        .animate-float {
            animation: float 3s ease-in-out infinite;
        }
        
        @keyframes data-stream {
            0% { background-position: 0 0; }
            100% { background-position: 0 100%; }
        }
        
        .animate-data-stream {
            animation: data-stream 5s linear infinite;
            background: linear-gradient(transparent, rgba(0, 255, 65, 0.1) 50%, transparent);
            background-size: 100% 10px;
        }
        
        /* Floating orbs */
        .floating-orb {
            animation: float 6s ease-in-out infinite;
        }
        
        .floating-orb-reverse {
            animation: float 8s ease-in-out infinite reverse;
        }
        
        /* Particle effect */
        .particle-effect::before {
            content: '';
            position: absolute;
            top: -10px;
            left: -10px;
            right: -10px;
            bottom: -10px;
            background: radial-gradient(circle at 50% 50%, rgba(0, 255, 65, 0.1), transparent 70%);
            z-index: -1;
            opacity: 0;
            transition: opacity 0.3s;
        }
        
        .particle-effect:hover::before {
            opacity: 1;
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
            .cyber-card {
                padding: 15px;
            }
            
            h1 {
                font-size: 3rem !important;
            }
            
            h2 {
                font-size: 2.5rem !important;
            }
        }
    </style>
</head>
<body class="bg-black text-green-400">
    <div id="root"></div>
    
    <script type="text/babel">
        // Ici on va simuler les imports manquants avec des composants de base
        const { useState, useEffect } = React;
        
        // Composants Lucide React simplifiés (simulation)
        const Users = () => <span>👥</span>;
        const Shield = () => <span>🛡️</span>;
        const Terminal = () => <span>💻</span>;
        const Award = () => <span>🏆</span>;
        const ChevronRight = () => <span>➡️</span>;
        const Sparkles = () => <span>✨</span>;
        const Zap = () => <span>⚡</span>;
        const Target = () => <span>🎯</span>;
        const Code = () => <span>👨‍💻</span>;
        const Lock = () => <span>🔒</span>;
        const Eye = () => <span>👁️</span>;
        const Cpu = () => <span>💾</span>;
        const Globe = () => <span>🌐</span>;
        const Star = () => <span>⭐</span>;
        const Trophy = () => <span>🏆</span>;
        const Flame = () => <span>🔥</span>;
        const Rocket = () => <span>🚀</span>;
        const Clock = () => <span>⏰</span>;
        const Activity = () => <span>📊</span>;
        const Wifi = () => <span>📶</span>;
        const Database = () => <span>🗄️</span>;
        const Brain = () => <span>🧠</span>;
        const Crosshair = () => <span>🎯</span>;
        const Skull = () => <span>💀</span>;
        const Lightning = () => <span>⚡</span>;
        const Atom = () => <span>⚛️</span>;
        const Hexagon = () => <span>⬢</span>;
        
        // Composant Footer simplifié
        const Footer = ({ onNavigate }) => {
            return (
                <footer className="relative z-10 py-12 px-4 text-center border-t border-green-400/30 mt-20">
                    <div className="max-w-7xl mx-auto">
                        <p className="text-lg mb-6">
                            <span className="text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text font-bold">
                                🏴‍☠️ FREEP0NX - DOMINATING THE CYBERSPACE SINCE 2023 🏴‍☠️
                            </span>
                        </p>
                        <div className="flex flex-wrap justify-center gap-6 mb-8">
                            <button onClick={() => onNavigate('home')} className="cyber-button">ACCUEIL</button>
                            <button onClick={() => onNavigate('team')} className="cyber-button">ÉQUIPE</button>
                            <button onClick={() => onNavigate('ctf')} className="cyber-button">CTF</button>
                            <button onClick={() => onNavigate('terminal')} className="cyber-button">TERMINAL</button>
                        </div>
                        <p className="text-sm text-green-400/70">
                            © 2023 FREEP0NX - Tous droits reverse-engineerés 🔧
                        </p>
                    </div>
                </footer>
            );
        };
        
        // Composant HomePage
        const HomePage = ({ onNavigate, addNotification }) => {
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
                const animateCounter = (target, key) => {
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

        // Composant App principal pour la démo
        const App = () => {
            const [currentPage, setCurrentPage] = useState('home');
            const [notifications, setNotifications] = useState([]);
            
            const addNotification = (notification) => {
                const id = Date.now();
                setNotifications(prev => [...prev, { ...notification, id }]);
                
                if (notification.duration) {
                    setTimeout(() => {
                        removeNotification(id);
                    }, notification.duration);
                }
            };
            
            const removeNotification = (id) => {
                setNotifications(prev => prev.filter(n => n.id !== id));
            };
            
            return (
                <div>
                    <HomePage onNavigate={setCurrentPage} addNotification={addNotification} />
                    
                    <div className="fixed top-4 right-4 z-50 space-y-2">
                        {notifications.map(notification => (
                            <div key={notification.id} className="notification cyber-border">
                                <div className="font-bold">{notification.title}</div>
                                <div>{notification.message}</div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        };

        // Rendu de l'application
        ReactDOM.render(<App />, document.getElementById('root'));
    </script>
</body>
</html>