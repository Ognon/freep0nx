import React, { useState, useEffect, useRef } from 'react';
import { Shield, Terminal as TerminalIcon } from 'lucide-react';
import { TerminalLine } from '../types';

interface TerminalProps {
  onNavigate: (page: string) => void;
}

const Terminal: React.FC<TerminalProps> = ({ onNavigate }) => {
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      type: 'output',
      content: 'freep0nx Terminal v1.0.0',
      timestamp: new Date().toLocaleTimeString()
    },
    {
      type: 'output',
      content: 'Type "help" for available commands',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  const commands = {
    help: () => [
      'Available commands:',
      '  help     - Show this help message',
      '  whoami   - Show current user',
      '  ls       - List files',
      '  cat      - Display file content',
      '  find     - Search for files',
      '  grep     - Search in files',
      '  ps       - Show running processes',
      '  history  - Show command history',
      '  env      - Show environment variables',
      '  neofetch - System information',
      '  sudo     - Execute as root (if you dare)',
      '  clear    - Clear terminal',
      '  exit     - Exit terminal'
    ],
    whoami: () => ['freep0nx-hacker'],
    ls: () => [
      'total 8',
      'drwxr-xr-x 2 freep0nx freep0nx 4096 Jan 15 2024 challenges/',
      'drwxr-xr-x 2 freep0nx freep0nx 4096 Jan 15 2024 .hidden/',
      'drwxr-xr-x 2 freep0nx freep0nx 4096 Jan 15 2024 tools/',
      '-rw-r--r-- 1 freep0nx freep0nx  128 Jan 15 2024 readme.md',
      '-rwx------ 1 freep0nx freep0nx   89 Jan 15 2024 .bashrc',
      '-rw-r--r-- 1 freep0nx freep0nx  128 Jan 15 2024 readme.md'
    ],
    cat: (args: string[]) => {
      if (args.length === 0) return ['cat: missing operand'];
      const file = args[0];
      switch (file) {
        case 'flag.txt':
          return ['freep0nx{t3rm1n4l_m4st3r_2024}'];
        case 'readme.md':
          return [
            '# freep0nx CTF Team',
            'Welcome to our terminal interface!',
            'This is a demo terminal for fun.',
            'Real challenges are on the CTF platform.'
          ];
        case '.bashrc':
          return [
            '# ~/.bashrc: executed by bash(1) for non-login shells',
            'export PATH=$PATH:/usr/local/bin',
            'alias ll="ls -la"',
            'alias la="ls -A"',
            '# Secret: The real treasure is in /etc/secret.conf'
          ];
        case '/etc/passwd':
          return [
            'root:x:0:0:root:/root:/bin/bash',
            'freep0nx:x:1000:1000:freep0nx hacker:/home/freep0nx:/bin/bash',
            'admin:x:1001:1001:admin:/home/admin:/bin/bash'
          ];
        case '/etc/secret.conf':
          return [
            '# Configuration secrète',
            'SECRET_KEY=freep0nx{t3rm1n4l_m4st3r_2024}',
            'DEBUG=false'
          ];
        case '/var/log/hack.log':
          return [
            '[2024-01-15 14:32:10] Tentative de connexion root',
            '[2024-01-15 14:32:15] Accès refusé',
            '[2024-01-15 14:33:01] Flag trouvé: freep0nx{t3rm1n4l_m4st3r_2024}'
          ];
        default:
          return [`cat: ${file}: No such file or directory`];
      }
    },
    find: (args: string[]) => {
      const query = args.join(' ');
      if (query.includes('flag') || query.includes('*.txt')) {
        return [
          './flag.txt',
          '/etc/secret.conf',
          '/var/log/hack.log'
        ];
      }
      return ['find: no matches found'];
    },
    grep: (args: string[]) => {
      if (args.length < 2) return ['grep: missing operand'];
      const pattern = args[0];
      const file = args[1];
      
      if (pattern === 'freep0nx' && file === '/etc/secret.conf') {
        return ['SECRET_KEY=freep0nx{t3rm1n4l_m4st3r_2024}'];
      } else if (pattern === 'flag' || pattern === 'Flag') {
        return [
          '/etc/secret.conf:SECRET_KEY=freep0nx{t3rm1n4l_m4st3r_2024}',
          '/var/log/hack.log:Flag trouvé: freep0nx{t3rm1n4l_m4st3r_2024}'
        ];
      }
      return [`grep: no matches found for '${pattern}'`];
    },
    ps: () => [
      'PID TTY      TIME CMD',
      '1234 pts/0   00:00:01 bash',
      '5678 pts/0   00:00:00 ctf-platform',
      '9012 pts/0   00:00:00 exploit.py',
      '3456 pts/0   00:00:00 netcat',
      '7890 pts/0   00:00:00 keylogger'
    ],
    history: () => [
      '1  whoami',
      '2  ls -la',
      '3  cat /etc/passwd',
      '4  find / -name "*flag*"',
      '5  grep -r "freep0nx" /etc/',
      '6  cat /etc/secret.conf',
      '7  history'
    ],
    env: () => [
      'USER=freep0nx',
      'HOME=/home/freep0nx',
      'PATH=/usr/local/bin:/usr/bin:/bin',
      'SHELL=/bin/bash',
      'SECRET_FLAG=freep0nx{t3rm1n4l_m4st3r_2024}',
      'TERM=xterm-256color'
    ],
    sudo: (args: string[]) => {
      const cmd = args.join(' ');
      if (cmd === 'cat /etc/shadow') {
        return [
          'root:$6$randomsalt$hashedpassword:18000:0:99999:7:::',
          'freep0nx:$6$anothersalt$anotherhash:18000:0:99999:7:::',
          '# Flag caché: freep0nx{t3rm1n4l_m4st3r_2024}'
        ];
      }
      return [`sudo: ${cmd}: command not found`];
    },
    neofetch: () => [
      '                    freep0nx@ctf-server',
      '                    ─────────────────────',
      '       ▄▄▄▄▄▄▄      OS: Kali Linux 2024.1',
      '      ████▀▀▀████    Kernel: 6.1.0-kali7-amd64',
      '     ███       ███   Uptime: 1337 days',
      '    ███  ▄▄▄▄▄  ███  Packages: 3142 (apt)',
      '   ████ ██████ ████  Shell: zsh 5.9',
      '  █████ ██████ █████ Terminal: freep0nx-term',
      ' ██████ ██████ ██████ CPU: Intel i9-13900K',
      '███████ ████ ███████ Memory: 1337MB / 32768MB',
      '███████      ███████',
      '███████      ███████',
      ' ██████      ██████ ',
      '  █████      █████  ',
      '   ████      ████   ',
      '    ███      ███    ',
      '     ██      ██     '
    ],
    clear: () => {
      setLines([]);
      return [];
    },
    exit: () => {
      setTimeout(() => onNavigate('home'), 1000);
      return ['Goodbye! Returning to home...'];
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  const handleCommand = (command: string) => {
    const [cmd, ...args] = command.trim().split(' ');
    
    // Add command to history
    setLines(prev => [...prev, {
      type: 'command',
      content: `freep0nx@ctf-server:~$ ${command}`,
      timestamp: new Date().toLocaleTimeString()
    }]);

    if (cmd === 'clear') {
      setLines([]);
      return;
    }

    // Execute command
    let output: string[] = [];
    if (cmd in commands) {
      const commandFunc = commands[cmd as keyof typeof commands];
      if (typeof commandFunc === 'function') {
        output = commandFunc(args);
      }
    } else if (cmd === '') {
      output = [];
    } else {
      output = [`bash: ${cmd}: command not found`];
    }

    // Add output to terminal
    if (output.length > 0) {
      setLines(prev => [...prev, ...output.map(line => ({
        type: 'output' as const,
        content: line,
        timestamp: new Date().toLocaleTimeString()
      }))]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(currentInput);
      setCurrentInput('');
    }
  };

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
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 mb-4">
            freep0nx Terminal
          </h1>
          <p className="text-xl text-gray-300">
            Interface de terminal interactive pour le fun !
          </p>
        </div>

        <div className="bg-black/80 backdrop-blur-sm rounded-xl border border-green-500/30 overflow-hidden">
          {/* Terminal Header */}
          <div className="bg-gray-800/50 px-4 py-2 border-b border-green-500/30 flex items-center space-x-2">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="flex items-center space-x-2 text-green-400">
              <TerminalIcon className="h-4 w-4" />
              <span className="text-sm">freep0nx@ctf-server:~</span>
            </div>
          </div>

          {/* Terminal Content */}
          <div 
            ref={terminalRef}
            className="h-96 p-4 overflow-y-auto font-mono text-sm bg-black/50"
          >
            {lines.map((line, index) => (
              <div key={index} className={`mb-1 ${
                line.type === 'command' ? 'text-green-400' : 
                line.type === 'error' ? 'text-red-400' : 
                'text-gray-300'
              }`}>
                {line.content}
              </div>
            ))}
            
            {/* Input Line */}
            <div className="flex items-center text-green-400">
              <span className="mr-2">freep0nx@ctf-server:~$</span>
              <input
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 bg-transparent outline-none text-green-400"
                placeholder="Tapez une commande..."
                autoFocus
              />
              <span className="ml-1 animate-pulse">█</span>
            </div>
          </div>
        </div>

        {/* Terminal Info */}
        <div className="mt-8 bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-green-500/30">
          <h3 className="text-lg font-semibold text-white mb-4">Commandes disponibles</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <code className="text-green-400">help</code> - Affiche l'aide
            </div>
            <div>
              <code className="text-green-400">whoami</code> - Utilisateur actuel
            </div>
            <div>
              <code className="text-green-400">ls</code> - Liste les fichiers
            </div>
            <div>
              <code className="text-green-400">cat [file]</code> - Affiche un fichier
            </div>
            <div>
              <code className="text-green-400">ps</code> - Processus en cours
            </div>
            <div>
              <code className="text-green-400">neofetch</code> - Informations système
            </div>
            <div>
              <code className="text-green-400">clear</code> - Nettoie le terminal
            </div>
            <div>
              <code className="text-green-400">exit</code> - Quitte le terminal
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terminal;