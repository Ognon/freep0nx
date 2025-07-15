import React, { useState, useEffect, useRef } from 'react';
import { Shield, Terminal as TerminalIcon, Cpu, HardDrive, Wifi, Activity, Zap, Lock, Eye, Code, Search, FileText, Folder, ChevronRight, Play, Pause, RotateCcw } from 'lucide-react';
import { TerminalLine } from '../types';

interface TerminalProps {
  onNavigate: (page: string) => void;
}

const Terminal: React.FC<TerminalProps> = ({ onNavigate }) => {
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      type: 'output',
      content: '╔══════════════════════════════════════════════════════════════╗',
      timestamp: new Date().toLocaleTimeString()
    },
    {
      type: 'output',
      content: '║                    freep0nx Terminal v2.0                    ║',
      timestamp: new Date().toLocaleTimeString()
    },
    {
      type: 'output',
      content: '║              Advanced Penetration Testing Suite             ║',
      timestamp: new Date().toLocaleTimeString()
    },
    {
      type: 'output',
      content: '╚══════════════════════════════════════════════════════════════╝',
      timestamp: new Date().toLocaleTimeString()
    },
    {
      type: 'output',
      content: '',
      timestamp: new Date().toLocaleTimeString()
    },
    {
      type: 'output',
      content: '🚀 System initialized successfully',
      timestamp: new Date().toLocaleTimeString()
    },
    {
      type: 'output',
      content: '🔐 Security modules loaded',
      timestamp: new Date().toLocaleTimeString()
    },
    {
      type: 'output',
      content: '⚡ Ready for hacking operations',
      timestamp: new Date().toLocaleTimeString()
    },
    {
      type: 'output',
      content: '',
      timestamp: new Date().toLocaleTimeString()
    },
    {
      type: 'output',
      content: 'Type "help" for available commands or "tutorial" for guided tour',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  
  const [currentInput, setCurrentInput] = useState('');
  const [currentPath, setCurrentPath] = useState('/home/freep0nx');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [systemStats, setSystemStats] = useState({
    cpu: 23,
    memory: 67,
    network: 89,
    processes: 42
  });
  
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Système de fichiers virtuel
  const fileSystem: { [key: string]: any } = {
    '/': {
      type: 'directory',
      children: ['home', 'etc', 'var', 'tmp', 'root', 'usr', 'opt']
    },
    '/home': {
      type: 'directory',
      children: ['freep0nx', 'admin', 'guest']
    },
    '/home/freep0nx': {
      type: 'directory',
      children: ['Documents', 'Downloads', 'Scripts', '.hidden', 'flag.txt', '.bashrc', 'tools']
    },
    '/home/freep0nx/flag.txt': {
      type: 'file',
      content: '🏁 freep0nx{t3rm1n4l_m4st3r_2024} 🏁'
    },
    '/home/freep0nx/.bashrc': {
      type: 'file',
      content: `# ~/.bashrc: executed by bash(1) for non-login shells
export PATH=$PATH:/usr/local/bin:/opt/tools
alias ll="ls -la"
alias la="ls -A"
alias hack="echo 'Welcome to the matrix...'"
# Hidden flag: freep0nx{b4shrc_s3cr3t}`
    },
    '/home/freep0nx/Scripts': {
      type: 'directory',
      children: ['exploit.py', 'scanner.sh', 'backdoor.c', 'keylogger.py']
    },
    '/home/freep0nx/Scripts/exploit.py': {
      type: 'file',
      content: `#!/usr/bin/env python3
# Advanced Exploitation Framework
# freep0nx Team - 2024

import socket, sys, time

def exploit_target(host, port):
    print(f"🎯 Targeting {host}:{port}")
    print("🔍 Scanning for vulnerabilities...")
    time.sleep(1)
    print("✅ Buffer overflow detected!")
    print("💥 Exploiting target...")
    print("🚀 Shell access gained!")
    print("🏁 Flag: freep0nx{3xpl01t_m4st3r}")
    
if __name__ == "__main__":
    exploit_target("192.168.1.100", 80)`
    },
    '/etc': {
      type: 'directory',
      children: ['passwd', 'shadow', 'hosts', 'secret.conf']
    },
    '/etc/passwd': {
      type: 'file',
      content: `root:x:0:0:root:/root:/bin/bash
freep0nx:x:1000:1000:freep0nx hacker:/home/freep0nx:/bin/bash
admin:x:1001:1001:admin:/home/admin:/bin/bash
guest:x:1002:1002:guest:/home/guest:/bin/bash`
    },
    '/etc/secret.conf': {
      type: 'file',
      content: `# Configuration secrète du système
SECRET_KEY=freep0nx{c0nf1g_h4ck3r}
API_TOKEN=sk-proj-abc123def456
DATABASE_URL=postgresql://user:pass@localhost/ctf
DEBUG_MODE=true
ADMIN_PASSWORD=sup3r_s3cr3t_p4ss`
    },
    '/var': {
      type: 'directory',
      children: ['log', 'www', 'tmp']
    },
    '/var/log': {
      type: 'directory',
      children: ['auth.log', 'hack.log', 'system.log']
    },
    '/var/log/hack.log': {
      type: 'file',
      content: `[2024-01-15 14:32:10] 🔍 Port scan initiated from 192.168.1.50
[2024-01-15 14:32:15] ⚠️  Suspicious login attempt detected
[2024-01-15 14:33:01] 🚨 Unauthorized access attempt blocked
[2024-01-15 14:33:45] 💀 Backdoor installation detected
[2024-01-15 14:34:12] 🏁 Flag discovered: freep0nx{l0g_4n4lys1s}
[2024-01-15 14:35:00] 🔐 System compromised successfully`
    }
  };

  const commands = {
    help: () => [
      '╔═══════════════════════════════════════════════════════════════╗',
      '║                        COMMAND REFERENCE                      ║',
      '╠═══════════════════════════════════════════════════════════════╣',
      '║ 📁 FILE SYSTEM                                               ║',
      '║   ls [-la]     - List directory contents                     ║',
      '║   cd <dir>     - Change directory                            ║',
      '║   pwd          - Show current directory                      ║',
      '║   cat <file>   - Display file content                        ║',
      '║   find <query> - Search for files                            ║',
      '║   tree         - Show directory tree                         ║',
      '║                                                               ║',
      '║ 🔍 RECONNAISSANCE                                             ║',
      '║   nmap <host>  - Network port scanner                        ║',
      '║   whois <host> - Domain information lookup                   ║',
      '║   dig <domain> - DNS lookup tool                             ║',
      '║   ping <host>  - Network connectivity test                   ║',
      '║                                                               ║',
      '║ ⚔️  EXPLOITATION                                              ║',
      '║   exploit      - Launch exploitation framework               ║',
      '║   sqlmap       - SQL injection testing tool                 ║',
      '║   metasploit   - Advanced exploitation framework            ║',
      '║   burp         - Web application security testing           ║',
      '║                                                               ║',
      '║ 🔐 POST-EXPLOITATION                                          ║',
      '║   backdoor     - Install persistent backdoor                ║',
      '║   keylog       - Start keylogger                             ║',
      '║   privesc      - Privilege escalation toolkit               ║',
      '║   persistence  - Maintain system access                     ║',
      '║                                                               ║',
      '║ 📊 MONITORING                                                 ║',
      '║   ps           - Show running processes                      ║',
      '║   top          - Real-time system monitor                    ║',
      '║   netstat      - Network connections                         ║',
      '║   history      - Command history                             ║',
      '║                                                               ║',
      '║ 🎮 UTILITIES                                                  ║',
      '║   matrix       - Enter the matrix                            ║',
      '║   tutorial     - Interactive tutorial                        ║',
      '║   clear        - Clear terminal                              ║',
      '║   exit         - Exit terminal                               ║',
      '╚═══════════════════════════════════════════════════════════════╝'
    ],

    whoami: () => ['freep0nx-hacker'],
    
    pwd: () => [currentPath],

    ls: (args: string[]) => {
      const showHidden = args.includes('-a') || args.includes('-la');
      const longFormat = args.includes('-l') || args.includes('-la');
      
      const currentDir = fileSystem[currentPath];
      if (!currentDir || currentDir.type !== 'directory') {
        return ['ls: cannot access directory'];
      }

      let files = currentDir.children || [];
      if (!showHidden) {
        files = files.filter((f: string) => !f.startsWith('.'));
      }

      if (longFormat) {
        const result = ['total ' + files.length];
        files.forEach((file: string) => {
          const fullPath = currentPath === '/' ? `/${file}` : `${currentPath}/${file}`;
          const item = fileSystem[fullPath];
          const isDir = item && item.type === 'directory';
          const permissions = isDir ? 'drwxr-xr-x' : '-rw-r--r--';
          const size = isDir ? '4096' : '1024';
          const date = 'Jan 15 2024';
          result.push(`${permissions} 1 freep0nx freep0nx ${size} ${date} ${file}`);
        });
        return result;
      }

      return files.length > 0 ? [files.join('  ')] : ['Directory is empty'];
    },

    cd: (args: string[]) => {
      if (args.length === 0) {
        setCurrentPath('/home/freep0nx');
        return [];
      }

      let newPath = args[0];
      if (newPath === '..') {
        const pathParts = currentPath.split('/').filter(p => p);
        pathParts.pop();
        newPath = '/' + pathParts.join('/');
        if (newPath === '/') newPath = '/';
      } else if (newPath === '/') {
        newPath = '/';
      } else if (!newPath.startsWith('/')) {
        newPath = currentPath === '/' ? `/${newPath}` : `${currentPath}/${newPath}`;
      }

      if (fileSystem[newPath] && fileSystem[newPath].type === 'directory') {
        setCurrentPath(newPath);
        return [];
      } else {
        return [`cd: ${args[0]}: No such file or directory`];
      }
    },

    cat: (args: string[]) => {
      if (args.length === 0) return ['cat: missing operand'];
      
      let filePath = args[0];
      if (!filePath.startsWith('/')) {
        filePath = currentPath === '/' ? `/${filePath}` : `${currentPath}/${filePath}`;
      }

      const file = fileSystem[filePath];
      if (!file) {
        return [`cat: ${args[0]}: No such file or directory`];
      }
      if (file.type !== 'file') {
        return [`cat: ${args[0]}: Is a directory`];
      }

      return file.content.split('\n');
    },

    find: (args: string[]) => {
      const query = args.join(' ').toLowerCase();
      const results: string[] = [];
      
      const searchInPath = (path: string) => {
        const item = fileSystem[path];
        if (!item) return;
        
        if (path.toLowerCase().includes(query) || 
            (item.content && item.content.toLowerCase().includes(query))) {
          results.push(path);
        }
        
        if (item.type === 'directory' && item.children) {
          item.children.forEach((child: string) => {
            const childPath = path === '/' ? `/${child}` : `${path}/${child}`;
            searchInPath(childPath);
          });
        }
      };

      searchInPath('/');
      return results.length > 0 ? results : ['No files found'];
    },

    tree: () => {
      const result: string[] = [];
      
      const buildTree = (path: string, prefix: string = '') => {
        const item = fileSystem[path];
        if (!item) return;
        
        const name = path === '/' ? '/' : path.split('/').pop() || '';
        result.push(prefix + (item.type === 'directory' ? '📁 ' : '📄 ') + name);
        
        if (item.type === 'directory' && item.children) {
          item.children.forEach((child: string, index: number) => {
            const childPath = path === '/' ? `/${child}` : `${path}/${child}`;
            const isLast = index === item.children.length - 1;
            const newPrefix = prefix + (isLast ? '└── ' : '├── ');
            buildTree(childPath, newPrefix);
          });
        }
      };

      buildTree(currentPath);
      return result;
    },

    nmap: (args: string[]) => {
      const target = args[0] || '192.168.1.1';
      return [
        `🔍 Starting Nmap scan on ${target}`,
        '',
        'PORT     STATE SERVICE',
        '22/tcp   open  ssh',
        '80/tcp   open  http',
        '443/tcp  open  https',
        '3306/tcp open  mysql',
        '8080/tcp open  http-proxy',
        '',
        '🎯 Scan completed. 5 ports open',
        '⚠️  Potential vulnerabilities detected on port 80',
        '🏁 Hidden flag: freep0nx{nm4p_sc4nn3r}'
      ];
    },

    exploit: () => [
      '🚀 Launching Exploitation Framework...',
      '',
      '╔═══════════════════════════════════════╗',
      '║        EXPLOITATION MENU              ║',
      '╠═══════════════════════════════════════╣',
      '║ [1] Buffer Overflow Exploit           ║',
      '║ [2] SQL Injection Attack              ║',
      '║ [3] XSS Payload Generator             ║',
      '║ [4] Reverse Shell Creator             ║',
      '║ [5] Privilege Escalation              ║',
      '╚═══════════════════════════════════════╝',
      '',
      '💥 Executing buffer overflow...',
      '📡 Payload sent successfully',
      '🎯 Target compromised!',
      '🏁 Flag captured: freep0nx{3xpl01t_fr4m3w0rk}'
    ],

    backdoor: () => [
      '🔧 Installing persistent backdoor...',
      '',
      '📝 Creating backdoor script...',
      '🔐 Setting up encryption...',
      '📡 Establishing C&C connection...',
      '⚙️  Configuring auto-start...',
      '🎭 Hiding from detection...',
      '',
      '✅ Backdoor installed successfully!',
      '🌐 Listening on port 4444',
      '🏁 Access code: freep0nx{b4ckd00r_1nst4ll3d}'
    ],

    keylog: () => [
      '⌨️  Starting advanced keylogger...',
      '',
      '🎯 Target: Current user session',
      '📊 Capture rate: 100%',
      '🔒 Encryption: AES-256',
      '📡 Exfiltration: Enabled',
      '',
      '📝 Captured keystrokes:',
      '  > password123',
      '  > admin@freep0nx.com',
      '  > freep0nx{k3yl0gg3r_4ct1v3}',
      '',
      '✅ Keylogger active and hidden'
    ],

    sqlmap: () => [
      '💉 SQLMap - Automatic SQL Injection Tool',
      '',
      '🎯 Target: http://vulnerable-site.com/login.php',
      '🔍 Testing parameter: username',
      '',
      '⚡ Injection found: Boolean-based blind',
      '📊 Database: MySQL 5.7.32',
      '🗃️  Tables discovered: users, admin, flags',
      '',
      '💾 Dumping table: flags',
      '┌─────────────────────────────────────┐',
      '│ flag_value                          │',
      '├─────────────────────────────────────┤',
      '│ freep0nx{sql_1nj3ct10n_m4st3r}     │',
      '└─────────────────────────────────────┘'
    ],

    metasploit: () => [
      '🎯 Metasploit Framework Console',
      '',
      'msf6 > use exploit/multi/handler',
      'msf6 exploit(multi/handler) > set payload windows/meterpreter/reverse_tcp',
      'msf6 exploit(multi/handler) > set LHOST 192.168.1.100',
      'msf6 exploit(multi/handler) > set LPORT 4444',
      'msf6 exploit(multi/handler) > exploit',
      '',
      '🚀 Started reverse TCP handler on 192.168.1.100:4444',
      '📡 Sending stage (175174 bytes) to 192.168.1.50',
      '⚡ Meterpreter session 1 opened',
      '',
      'meterpreter > sysinfo',
      'Computer        : VICTIM-PC',
      'OS              : Windows 10',
      'Architecture    : x64',
      'System Language : en_US',
      'Domain          : WORKGROUP',
      'Logged On Users : 2',
      '',
      'meterpreter > search -f flag.txt',
      'Found 1 result...',
      '    c:\\Users\\victim\\Desktop\\flag.txt (32 bytes)',
      '',
      'meterpreter > cat c:\\Users\\victim\\Desktop\\flag.txt',
      '🏁 freep0nx{m3t4spl01t_pwn3d}'
    ],

    ps: () => [
      'PID   TTY      TIME     CMD',
      '1234  pts/0    00:00:01 bash',
      '2345  pts/0    00:00:00 exploit.py',
      '3456  pts/0    00:00:00 keylogger',
      '4567  pts/0    00:00:00 backdoor',
      '5678  pts/0    00:00:00 nmap',
      '6789  pts/0    00:00:00 sqlmap',
      '7890  pts/0    00:00:00 metasploit',
      '8901  pts/0    00:00:00 burpsuite'
    ],

    top: () => [
      '🖥️  System Monitor - freep0nx Terminal',
      '',
      'Tasks: 127 total, 3 running, 124 sleeping',
      'CPU usage: 23.4% user, 12.1% system, 64.5% idle',
      'Memory: 8192MB total, 5461MB used, 2731MB free',
      'Swap: 2048MB total, 0MB used, 2048MB free',
      '',
      'PID  USER     CPU% MEM%  TIME+    COMMAND',
      '1337 freep0nx 15.2  8.4  0:42.33  exploit.py',
      '2048 freep0nx 12.8  6.2  0:38.21  keylogger',
      '4096 freep0nx  8.9  4.1  0:25.67  backdoor',
      '8192 freep0nx  6.3  3.8  0:19.45  nmap'
    ],

    netstat: () => [
      '🌐 Active Network Connections',
      '',
      'Proto Local Address      Foreign Address     State',
      'tcp   0.0.0.0:22         0.0.0.0:*          LISTEN',
      'tcp   0.0.0.0:80         0.0.0.0:*          LISTEN',
      'tcp   0.0.0.0:443        0.0.0.0:*          LISTEN',
      'tcp   192.168.1.100:4444 192.168.1.50:1337 ESTABLISHED',
      'tcp   192.168.1.100:8080 192.168.1.75:2048 ESTABLISHED',
      '',
      '⚠️  Suspicious connection detected on port 4444',
      '🏁 Connection flag: freep0nx{n3tw0rk_4n4lys1s}'
    ],

    history: () => [
      '1  whoami',
      '2  ls -la',
      '3  cd /etc',
      '4  cat passwd',
      '5  find / -name "*flag*"',
      '6  nmap 192.168.1.1',
      '7  exploit',
      '8  backdoor',
      '9  keylog',
      '10 history'
    ],

    matrix: () => {
      const matrixChars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
      const lines: string[] = [];
      
      for (let i = 0; i < 20; i++) {
        let line = '';
        for (let j = 0; j < 60; j++) {
          line += matrixChars[Math.floor(Math.random() * matrixChars.length)];
        }
        lines.push(line);
      }
      
      return [
        '🔴 Entering the Matrix...',
        '',
        ...lines,
        '',
        '💊 You took the red pill',
        '🏁 Matrix flag: freep0nx{w3lc0m3_t0_th3_m4tr1x}'
      ];
    },

    tutorial: () => [
      '🎓 freep0nx Terminal Tutorial',
      '',
      '📚 Lesson 1: Basic Navigation',
      '   • Use "ls" to list files',
      '   • Use "cd" to change directories',
      '   • Use "pwd" to see current location',
      '',
      '📚 Lesson 2: File Operations',
      '   • Use "cat filename" to read files',
      '   • Use "find query" to search',
      '   • Use "tree" to see directory structure',
      '',
      '📚 Lesson 3: Hacking Tools',
      '   • Use "nmap host" to scan networks',
      '   • Use "exploit" for penetration testing',
      '   • Use "backdoor" for persistence',
      '',
      '🎯 Try exploring /etc/secret.conf for hidden flags!',
      '🏁 Tutorial flag: freep0nx{tut0r1al_c0mpl3t3}'
    ],

    clear: () => {
      setLines([]);
      return [];
    },

    exit: () => {
      setTimeout(() => onNavigate('home'), 1000);
      return ['👋 Goodbye! Returning to home...'];
    }
  };

  // Mise à jour des stats système
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemStats({
        cpu: Math.floor(Math.random() * 40) + 20,
        memory: Math.floor(Math.random() * 30) + 50,
        network: Math.floor(Math.random() * 20) + 70,
        processes: Math.floor(Math.random() * 10) + 35
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleCommand = async (command: string) => {
    const [cmd, ...args] = command.trim().split(' ');
    
    // Ajouter à l'historique
    if (command.trim()) {
      setCommandHistory(prev => [...prev, command]);
      setHistoryIndex(-1);
    }
    
    // Ajouter la commande aux lignes
    setLines(prev => [...prev, {
      type: 'command',
      content: `freep0nx@terminal:${currentPath}$ ${command}`,
      timestamp: new Date().toLocaleTimeString()
    }]);

    if (cmd === 'clear') {
      setLines([]);
      return;
    }

    setIsProcessing(true);
    
    // Simuler un délai de traitement
    await new Promise(resolve => setTimeout(resolve, 300));

    // Exécuter la commande
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

    // Ajouter la sortie
    if (output.length > 0) {
      setLines(prev => [...prev, ...output.map(line => ({
        type: 'output' as const,
        content: line,
        timestamp: new Date().toLocaleTimeString()
      }))]);
    }

    setIsProcessing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(currentInput);
      setCurrentInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setCurrentInput('');
        } else {
          setHistoryIndex(newIndex);
          setCurrentInput(commandHistory[newIndex]);
        }
      }
    }
  };

  const quickCommands = ['ls -la', 'cat flag.txt', 'nmap 192.168.1.1', 'exploit', 'find flag'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-white/5 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
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
                className="px-4 py-2 rounded-xl text-slate-300 hover:text-violet-300 hover:bg-violet-500/10 transition-all duration-300"
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
                className="px-4 py-2 rounded-xl text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all duration-300"
              >
                Terminal
              </button>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-black bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent mb-4">
            Advanced Terminal
          </h1>
          <p className="text-xl text-slate-300">
            Interface de hacking professionnel - Explorez le système !
          </p>
        </div>

        {/* System Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-emerald-500/20">
            <div className="flex items-center space-x-3">
              <Cpu className="h-6 w-6 text-emerald-400" />
              <div>
                <div className="text-sm text-slate-400">CPU</div>
                <div className="text-lg font-bold text-emerald-400">{systemStats.cpu}%</div>
              </div>
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-cyan-500/20">
            <div className="flex items-center space-x-3">
              <HardDrive className="h-6 w-6 text-cyan-400" />
              <div>
                <div className="text-sm text-slate-400">Memory</div>
                <div className="text-lg font-bold text-cyan-400">{systemStats.memory}%</div>
              </div>
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-violet-500/20">
            <div className="flex items-center space-x-3">
              <Wifi className="h-6 w-6 text-violet-400" />
              <div>
                <div className="text-sm text-slate-400">Network</div>
                <div className="text-lg font-bold text-violet-400">{systemStats.network}%</div>
              </div>
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-rose-500/20">
            <div className="flex items-center space-x-3">
              <Activity className="h-6 w-6 text-rose-400" />
              <div>
                <div className="text-sm text-slate-400">Processes</div>
                <div className="text-lg font-bold text-rose-400">{systemStats.processes}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Terminal Container */}
        <div className="bg-black/90 backdrop-blur-xl rounded-3xl border border-emerald-500/30 overflow-hidden shadow-2xl shadow-emerald-500/10">
          {/* Terminal Header */}
          <div className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 px-6 py-4 border-b border-emerald-500/30 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-rose-500 rounded-full hover:bg-rose-400 transition-colors cursor-pointer"></div>
                <div className="w-3 h-3 bg-amber-500 rounded-full hover:bg-amber-400 transition-colors cursor-pointer"></div>
                <div className="w-3 h-3 bg-emerald-500 rounded-full hover:bg-emerald-400 transition-colors cursor-pointer"></div>
              </div>
              <div className="flex items-center space-x-3 text-emerald-400">
                <TerminalIcon className="h-5 w-5" />
                <span className="text-sm font-medium">freep0nx@terminal:{currentPath}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {isProcessing && (
                <div className="flex items-center space-x-2 text-amber-400">
                  <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                  <span className="text-xs">Processing...</span>
                </div>
              )}
              <div className="text-xs text-slate-400">
                {lines.length} lines
              </div>
            </div>
          </div>

          {/* Terminal Content */}
          <div 
            ref={terminalRef}
            className="h-[600px] p-6 overflow-y-auto font-mono text-sm bg-black/50 scrollbar-thin scrollbar-thumb-emerald-500/30 scrollbar-track-transparent"
          >
            {lines.map((line, index) => (
              <div key={index} className={`mb-1 leading-relaxed ${
                line.type === 'command' ? 'text-emerald-400 font-medium' : 
                line.type === 'error' ? 'text-rose-400' : 
                'text-slate-300'
              }`}>
                {line.content}
              </div>
            ))}
            
            {/* Input Line */}
            <div className="flex items-center text-emerald-400 mt-2">
              <span className="mr-2 flex items-center space-x-1">
                <ChevronRight className="h-4 w-4" />
                <span>freep0nx@terminal:{currentPath}$</span>
              </span>
              <input
                ref={inputRef}
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyDown={handleKeyPress}
                className="flex-1 bg-transparent outline-none text-emerald-400 placeholder-emerald-400/50"
                placeholder="Tapez une commande..."
                disabled={isProcessing}
              />
              <span className="ml-1 animate-pulse text-emerald-400">█</span>
            </div>
          </div>

          {/* Quick Commands */}
          <div className="bg-white/5 border-t border-emerald-500/30 p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-slate-300">Commandes rapides:</span>
              <div className="flex items-center space-x-2 text-xs text-slate-400">
                <Zap className="h-4 w-4" />
                <span>Cliquez pour exécuter</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {quickCommands.map((cmd, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentInput(cmd);
                    if (inputRef.current) inputRef.current.focus();
                  }}
                  className="px-3 py-1 bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 rounded-lg hover:bg-emerald-500/20 transition-all duration-300 text-sm font-mono"
                >
                  {cmd}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Terminal Guide */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
              <Code className="h-5 w-5 text-emerald-400" />
              <span>Commandes Essentielles</span>
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-3">
                <code className="text-emerald-400 font-medium bg-emerald-500/10 px-2 py-1 rounded">help</code>
                <span className="text-slate-300">Guide complet des commandes</span>
              </div>
              <div className="flex items-center space-x-3">
                <code className="text-cyan-400 font-medium bg-cyan-500/10 px-2 py-1 rounded">ls -la</code>
                <span className="text-slate-300">Liste détaillée des fichiers</span>
              </div>
              <div className="flex items-center space-x-3">
                <code className="text-violet-400 font-medium bg-violet-500/10 px-2 py-1 rounded">find flag</code>
                <span className="text-slate-300">Rechercher des flags cachés</span>
              </div>
              <div className="flex items-center space-x-3">
                <code className="text-rose-400 font-medium bg-rose-500/10 px-2 py-1 rounded">exploit</code>
                <span className="text-slate-300">Lancer des attaques</span>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
              <Search className="h-5 w-5 text-violet-400" />
              <span>Chasse aux Flags</span>
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2 text-slate-300">
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                <span>Explorez les fichiers système avec <code className="text-emerald-400">cat</code></span>
              </div>
              <div className="flex items-center space-x-2 text-slate-300">
                <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                <span>Utilisez <code className="text-cyan-400">find</code> pour localiser les flags</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-300">
                <div className="w-2 h-2 bg-violet-400 rounded-full"></div>
                <span>Lancez des outils de hacking pour découvrir des secrets</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-300">
                <div className="w-2 h-2 bg-rose-400 rounded-full"></div>
                <span>Consultez les logs dans <code className="text-rose-400">/var/log/</code></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terminal;