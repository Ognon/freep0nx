import React, { useState, useEffect, useRef } from 'react';
import { Shield, Terminal as TerminalIcon, Cpu, HardDrive, Wifi, Activity, Zap, Lock, Eye, Code, Search, FileText, Folder, ChevronRight, Play, Pause, RotateCcw, Skull, CloudLightning as Lightning, Target, Crosshair, Brain, Atom } from 'lucide-react';
import { TerminalLine } from '../types';
import Footer from './Footer';

interface TerminalProps {
  onNavigate: (page: string) => void;
  addNotification: (notification: any) => void;
}

const Terminal: React.FC<TerminalProps> = ({ onNavigate, addNotification }) => {
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      type: 'output',
      content: '╔═══════════════════════════════════════════════════════════════════╗',
      timestamp: new Date().toLocaleTimeString()
    },
    {
      type: 'output',
      content: '║                 🔥 freep0nx CYBER WARFARE v3.0 🔥             ║',
      timestamp: new Date().toLocaleTimeString()
    },
    {
      type: 'output',
      content: '║            💀 ULTIMATE PENETRATION TESTING SUITE 💀          ║',
      timestamp: new Date().toLocaleTimeString()
    },
    {
      type: 'output',
      content: '╚═══════════════════════════════════════════════════════════════════╝',
      timestamp: new Date().toLocaleTimeString()
    },
    {
      type: 'output',
      content: '',
      timestamp: new Date().toLocaleTimeString()
    },
    {
      type: 'output',
      content: '🚀 CYBER WARFARE SYSTEM INITIALIZED',
      timestamp: new Date().toLocaleTimeString()
    },
    {
      type: 'output',
      content: '🔐 ADVANCED HACKING MODULES LOADED',
      timestamp: new Date().toLocaleTimeString()
    },
    {
      type: 'output',
      content: '⚡ READY FOR TOTAL DOMINATION',
      timestamp: new Date().toLocaleTimeString()
    },
    {
      type: 'output',
      content: '',
      timestamp: new Date().toLocaleTimeString()
    },
    {
      type: 'output',
      content: '💀 Type "help" for warfare commands or "tutorial" for combat training 💀',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  
  const [currentInput, setCurrentInput] = useState('');
  const [currentPath, setCurrentPath] = useState('/home/freep0nx');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [hackingMode, setHackingMode] = useState(false);
  const [cyberAlert, setCyberAlert] = useState(false);
  const [systemStats, setSystemStats] = useState({
    cpu: 15,
    memory: 45,
    network: 95,
    processes: 128
  });
  
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Mode hacking aléatoire
    const hackingTimer = setInterval(() => {
      setHackingMode(prev => !prev);
      setCyberAlert(Math.random() > 0.7);
    }, 2500);
    
    return () => clearInterval(hackingTimer);
  }, []);

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
      content: '🏁 freep0nx{t3rm1n4l_w4rf4r3_m4st3r_2024} 🏁'
    },
    '/home/freep0nx/.bashrc': {
      type: 'file',
      content: `# ~/.bashrc: executed by bash(1) for non-login shells
export PATH=$PATH:/usr/local/bin:/opt/tools
alias ll="ls -la"
alias la="ls -A"
alias hack="echo 'Welcome to the matrix...'"
# Hidden flag: freep0nx{b4shrc_h1dd3n_s3cr3t}`
    },
    '/home/freep0nx/Scripts': {
      type: 'directory',
      children: ['exploit.py', 'scanner.sh', 'backdoor.c', 'keylogger.py']
    },
    '/home/freep0nx/Scripts/exploit.py': {
      type: 'file',
      content: `#!/usr/bin/env python3
# ULTIMATE CYBER WARFARE FRAMEWORK
# freep0nx Team - 2024

import socket, sys, time

def exploit_target(host, port):
    print(f"🎯 Targeting {host}:{port}")
    print("🔍 Scanning for vulnerabilities...")
    time.sleep(1)
    print("✅ Buffer overflow detected!")
    print("💥 Exploiting target...")
    print("🚀 Shell access gained!")
    print("🏁 Flag: freep0nx{3xpl01t_w4rf4r3_m4st3r}")
    
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
      content: `# CONFIGURATION ULTRA SECRÈTE DU SYSTÈME
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
[2024-01-15 14:32:15] ⚠️  CYBER ATTACK DETECTED
[2024-01-15 14:33:01] 🚨 MASSIVE BREACH ATTEMPT
[2024-01-15 14:33:45] 💀 Backdoor installation detected
[2024-01-15 14:34:12] 🏁 Flag discovered: freep0nx{l0g_4n4lys1s_m4st3r}
[2024-01-15 14:35:00] 🔐 TOTAL SYSTEM DOMINATION ACHIEVED`
    }
  };

  const commands = {
    help: () => [
      '╔═══════════════════════════════════════════════════════════════════╗',
      '║                    🔥 CYBER WARFARE ARSENAL 🔥                    ║',
      '╠═══════════════════════════════════════════════════════════════════╣',
      '║ 📁 FILESYSTEM INFILTRATION                                        ║',
      '║   ls [-la]     - List directory contents                     ║',
      '║   cd <dir>     - Change directory                            ║',
      '║   pwd          - Show current directory                      ║',
      '║   cat <file>   - Display file content                        ║',
      '║   find <query> - Search for files                            ║',
      '║   tree         - Show directory tree                         ║',
      '║                                                               ║',
      '║ 🔍 CYBER RECONNAISSANCE                                           ║',
      '║   nmap <host>  - Advanced network scanner                    ║',
      '║   whois <host> - Target intelligence gathering               ║',
      '║   dig <domain> - DNS warfare tool                            ║',
      '║   ping <host>  - Network infiltration test                   ║',
      '║                                                               ║',
      '║ ⚔️  CYBER WARFARE WEAPONS                                         ║',
      '║   exploit      - Launch ultimate exploitation framework      ║',
      '║   sqlmap       - SQL injection warfare tool                 ║',
      '║   metasploit   - Nuclear exploitation framework             ║',
      '║   burp         - Web application destruction suite          ║',
      '║                                                               ║',
      '║ 🔐 TOTAL DOMINATION TOOLS                                         ║',
      '║   backdoor     - Install stealth backdoor                   ║',
      '║   keylog       - Deploy advanced keylogger                  ║',
      '║   privesc      - Ultimate privilege escalation              ║',
      '║   persistence  - Maintain eternal system access             ║',
      '║                                                               ║',
      '║ 📊 BATTLEFIELD MONITORING                                         ║',
      '║   ps           - Show active processes                       ║',
      '║   top          - Real-time system surveillance               ║',
      '║   netstat      - Network connection analysis                 ║',
      '║   history      - Combat command history                      ║',
      '║                                                               ║',
      '║ 🎮 SPECIAL OPERATIONS                                             ║',
      '║   matrix       - Enter the cyber matrix                     ║',
      '║   tutorial     - Combat training program                    ║',
      '║   clear        - Clear battlefield                           ║',
      '║   exit         - Retreat from combat zone                   ║',
      '╚═══════════════════════════════════════════════════════════════════╝'
    ],

    whoami: () => ['💀 freep0nx-cyber-warrior 💀'],
    
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
        `🔍 Initiating CYBER WARFARE scan on ${target}`,
        '',
        'PORT     STATE SERVICE',
        '22/tcp   open  ssh',
        '80/tcp   open  http',
        '443/tcp  open  https',
        '3306/tcp open  mysql',
        '8080/tcp open  http-proxy',
        '',
        '🎯 TOTAL DOMINATION SCAN COMPLETED. 5 ports PWNED',
        '⚠️  CRITICAL VULNERABILITIES DETECTED - READY FOR EXPLOITATION',
        '🏁 Hidden flag: freep0nx{nm4p_sc4nn3r}'
      ];
    },

    exploit: () => [
      '🚀 LAUNCHING ULTIMATE CYBER WARFARE FRAMEWORK...',
      '',
      '╔═══════════════════════════════════════════╗',
      '║        💀 DESTRUCTION MENU 💀             ║',
      '╠═══════════════════════════════════════════╣',
      '║ [1] Nuclear Buffer Overflow               ║',
      '║ [2] Advanced SQL Injection Warfare       ║',
      '║ [3] XSS Payload Mass Destruction         ║',
      '║ [4] Stealth Reverse Shell Deployment     ║',
      '║ [5] Ultimate Privilege Escalation        ║',
      '╚═══════════════════════════════════════════╝',
      '',
      '💥 EXECUTING NUCLEAR BUFFER OVERFLOW...',
      '📡 PAYLOAD DEPLOYED WITH MAXIMUM DESTRUCTION',
      '🎯 TARGET COMPLETELY ANNIHILATED!',
      '🏁 VICTORY FLAG: freep0nx{3xpl01t_w4rf4r3_fr4m3w0rk}'
    ],

    backdoor: () => [
      '🔧 DEPLOYING STEALTH BACKDOOR SYSTEM...',
      '',
      '📝 CREATING UNDETECTABLE BACKDOOR SCRIPT...',
      '🔐 SETTING UP MILITARY-GRADE ENCRYPTION...',
      '📡 ESTABLISHING COMMAND & CONTROL CONNECTION...',
      '⚙️  CONFIGURING PERSISTENT AUTO-START...',
      '🎭 ACTIVATING STEALTH MODE...',
      '',
      '✅ BACKDOOR SUCCESSFULLY DEPLOYED!',
      '🌐 STEALTH LISTENER ACTIVE ON PORT 4444',
      '🏁 MASTER ACCESS CODE: freep0nx{b4ckd00r_d0m1n4t10n}'
    ],

    keylog: () => [
      '⌨️  DEPLOYING ADVANCED KEYLOGGER WARFARE...',
      '',
      '🎯 TARGET: ALL USER SESSIONS',
      '📊 CAPTURE RATE: 100% TOTAL DOMINATION',
      '🔒 ENCRYPTION: MILITARY-GRADE AES-256',
      '📡 DATA EXFILTRATION: MAXIMUM STEALTH MODE',
      '',
      '📝 INTERCEPTED KEYSTROKES:',
      '  > admin_password_ultra_secret',
      '  > root@freep0nx-warfare.com',
      '  > freep0nx{k3yl0gg3r_w4rf4r3_4ct1v3}',
      '',
      '✅ KEYLOGGER ACTIVE AND COMPLETELY INVISIBLE'
    ],

    sqlmap: () => [
      '💉 SQLMap - ULTIMATE SQL WARFARE WEAPON',
      '',
      '🎯 TARGET: http://enemy-fortress.com/admin.php',
      '🔍 TESTING ALL PARAMETERS FOR TOTAL DESTRUCTION',
      '',
      '⚡ CRITICAL INJECTION FOUND: COMPLETE DATABASE ACCESS',
      '📊 DATABASE: MySQL 8.0 - TOTALLY COMPROMISED',
      '🗃️  TABLES DISCOVERED: users, admin, secrets, flags',
      '',
      '💾 EXTRACTING ALL SENSITIVE DATA...',
      '┌─────────────────────────────────────────┐',
      '│ CLASSIFIED FLAG DATA                    │',
      '├─────────────────────────────────────────┤',
      '│ freep0nx{sql_1nj3ct10n_w4rf4r3}        │',
      '└─────────────────────────────────────────┘'
    ],

    metasploit: () => [
      '🎯 METASPLOIT NUCLEAR WARFARE CONSOLE',
      '',
      'msf6 > use exploit/multi/handler',
      'msf6 exploit(multi/handler) > set payload windows/meterpreter/reverse_tcp',
      'msf6 exploit(multi/handler) > set LHOST 192.168.1.100',
      'msf6 exploit(multi/handler) > set LPORT 4444',
      'msf6 exploit(multi/handler) > exploit',
      '',
      '🚀 NUCLEAR REVERSE TCP HANDLER DEPLOYED',
      '📡 SENDING DESTRUCTION PAYLOAD (999999 bytes)',
      '⚡ METERPRETER SESSION ESTABLISHED - TOTAL CONTROL',
      '',
      'meterpreter > sysinfo',
      'Computer        : TARGET-FORTRESS',
      'OS              : Windows 11 Pro - COMPROMISED',
      'Architecture    : x64',
      'System Language : en_US',
      'Domain          : ENEMY-NETWORK',
      'Logged On Users : 5 - ALL PWNED',
      '',
      'meterpreter > search -f flag.txt',
      'Found 10 results...',
      '    c:\\Users\\admin\\Desktop\\ultra_secret_flag.txt',
      '',
      'meterpreter > cat c:\\Users\\admin\\Desktop\\ultra_secret_flag.txt',
      '🏁 freep0nx{m3t4spl01t_t0t4l_d0m1n4t10n}'
    ],

    ps: () => [
      '💀 ACTIVE WARFARE PROCESSES 💀',
      '',
      'PID   TTY      TIME     WEAPON',
      '1337  pts/0    00:00:01 cyber-warfare-shell',
      '2048  pts/0    00:00:00 nuclear-exploit.py',
      '4096  pts/0    00:00:00 stealth-keylogger',
      '8192  pts/0    00:00:00 persistent-backdoor',
      '1024  pts/0    00:00:00 advanced-nmap',
      '2056  pts/0    00:00:00 sqlmap-warfare',
      '4104  pts/0    00:00:00 metasploit-nuclear',
      '8208  pts/0    00:00:00 burpsuite-destroyer'
    ],

    top: () => [
      '🖥️  CYBER WARFARE SYSTEM MONITOR',
      '',
      'Tasks: 256 total, 128 HACKING, 128 sleeping',
      'CPU usage: 95.4% WARFARE, 4.6% system, 0% idle',
      'Memory: 32768MB total, 30000MB WEAPONS, 2768MB free',
      'Swap: 8192MB total, 4096MB EXPLOITS, 4096MB free',
      '',
      'PID  USER     CPU% MEM%  TIME+    WARFARE WEAPON',
      '1337 freep0nx 45.2 28.4  2:42.33  nuclear-exploit.py',
      '2048 freep0nx 32.8 16.2  1:38.21  stealth-keylogger',
      '4096 freep0nx 18.9 14.1  0:55.67  persistent-backdoor',
      '8192 freep0nx 16.3 13.8  0:49.45  advanced-nmap'
    ],

    netstat: () => [
      '🌐 ACTIVE CYBER WARFARE CONNECTIONS',
      '',
      'Proto Local Address      Foreign Address     Status',
      'tcp   0.0.0.0:22         0.0.0.0:*          BACKDOOR_ACTIVE',
      'tcp   0.0.0.0:80         0.0.0.0:*          COMPROMISED',
      'tcp   0.0.0.0:443        0.0.0.0:*          PWNED',
      'tcp   192.168.1.100:4444 192.168.1.50:1337 TOTAL_CONTROL',
      'tcp   192.168.1.100:8080 192.168.1.75:2048 DOMINATED',
      '',
      '⚠️  MULTIPLE BACKDOOR CONNECTIONS ACTIVE',
      '🏁 NETWORK DOMINATION FLAG: freep0nx{n3tw0rk_w4rf4r3_m4st3r}'
    ],

    history: () => [
      '💀 CYBER WARFARE COMMAND HISTORY 💀',
      '',
      '1  whoami # Identified as cyber-warrior',
      '2  ls -la # Reconnaissance complete',
      '3  cd /etc # Infiltrated system configs',
      '4  cat passwd # User database compromised',
      '5  find / -name "*flag*" # Flag hunting mission',
      '6  nmap 192.168.1.1 # Network domination scan',
      '7  exploit # Nuclear payload deployed',
      '8  backdoor # Persistent access established',
      '9  keylog # Surveillance system active',
      '10 history # Mission log reviewed'
    ],

    matrix: () => {
      const matrixChars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン💀🔥⚡💥🎯';
      const lines: string[] = [];
      
      for (let i = 0; i < 25; i++) {
        let line = '';
        for (let j = 0; j < 80; j++) {
          line += matrixChars[Math.floor(Math.random() * matrixChars.length)];
        }
        lines.push(line);
      }
      
      return [
        '🔴 ENTERING THE CYBER WARFARE MATRIX...',
        '',
        ...lines,
        '',
        '💊 YOU CHOSE THE PATH OF TOTAL DOMINATION',
        '🏁 MATRIX WARFARE FLAG: freep0nx{w3lc0m3_t0_th3_w4rf4r3_m4tr1x}'
      ];
    },

    tutorial: () => [
      '🎓 FREEP0NX CYBER WARFARE TRAINING',
      '',
      '📚 COMBAT LESSON 1: Battlefield Navigation',
      '   • Use "ls" to scout enemy files',
      '   • Use "cd" to infiltrate directories',
      '   • Use "pwd" to confirm your position',
      '',
      '📚 COMBAT LESSON 2: Intelligence Gathering',
      '   • Use "cat filename" to extract intel',
      '   • Use "find query" to hunt for secrets',
      '   • Use "tree" to map enemy territory',
      '',
      '📚 COMBAT LESSON 3: Warfare Weapons',
      '   • Use "nmap host" for network domination',
      '   • Use "exploit" for total destruction',
      '   • Use "backdoor" for eternal control',
      '',
      '🎯 MISSION: Infiltrate /etc/secret.conf for classified intel!',
      '🏁 TRAINING COMPLETE FLAG: freep0nx{w4rf4r3_tr41n1ng_c0mpl3t3}'
    ],

    clear: () => {
      setLines([]);
      return [];
    },

    exit: () => {
      setTimeout(() => onNavigate('home'), 1000);
      addNotification({
        type: 'info',
        title: 'Terminal fermé',
        message: '💀 Retrait du champ de bataille... 💀',
        duration: 2000
      });
      return ['👋 Goodbye! Returning to home...'];
    }
  };

  // Mise à jour des stats système
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemStats({
        cpu: Math.floor(Math.random() * 30) + 70, // High CPU for warfare
        memory: Math.floor(Math.random() * 20) + 75, // High memory usage
        network: Math.floor(Math.random() * 10) + 90, // High network activity
        processes: Math.floor(Math.random() * 50) + 100 // Many processes
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

  // Maintenir le focus quand on clique dans le terminal
  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

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
      // Garder le focus après clear
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 50);
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
    
    // Remettre le focus automatiquement après chaque commande
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
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

  const quickCommands = ['ls -la', 'cat flag.txt', 'nmap 192.168.1.1', 'exploit', 'backdoor', 'matrix'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative z-10 particle-effect">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-black bg-gradient-to-r from-rose-400 via-violet-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent animate-gradient-x glitch-text" data-text="CYBER WARFARE TERMINAL">
            💀 CYBER WARFARE TERMINAL 💀
          </h1>
          <p className="text-2xl text-slate-300 font-bold">
            <span className="bg-gradient-to-r from-red-400 to-purple-400 bg-clip-text text-transparent animate-gradient-x">
              🔥 INTERFACE DE DOMINATION TOTALE 🔥
            </span>
          </p>
          
          {/* Cyber Status */}
          <div className={`mt-8 inline-flex items-center space-x-4 bg-black/80 backdrop-blur-xl border border-red-400/50 rounded-2xl px-8 py-4 shadow-2xl shadow-red-500/20 cyber-border ${cyberAlert ? 'animate-shake-intense' : ''}`}>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 ${hackingMode ? 'bg-red-400' : 'bg-green-400'} rounded-full animate-pulse shadow-lg`}></div>
              <span className={`font-mono text-sm font-bold ${hackingMode ? 'text-red-300 animate-rainbow-text' : 'text-green-300'}`}>
                {hackingMode ? 'WARFARE ACTIVE' : 'READY FOR BATTLE'}
              </span>
            </div>
            <div className="w-px h-6 bg-red-400/30"></div>
            <div className="flex items-center space-x-2">
              <Skull className="h-4 w-4 text-red-400 animate-quantum-flicker" />
              <span className="text-red-300 font-mono text-sm font-bold">DESTRUCTION MODE</span>
            </div>
          </div>
        </div>

        {/* System Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-emerald-500/30 cyber-card-glow animate-cyber-pulse">
            <div className="flex items-center space-x-4">
              <Cpu className="h-8 w-8 text-emerald-400 animate-quantum-flicker" />
              <div>
                <div className="text-base text-slate-400">CPU WARFARE</div>
                <div className="text-xl font-bold text-emerald-400">{systemStats.cpu}%</div>
              </div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/30 cyber-card-glow animate-cyber-pulse">
            <div className="flex items-center space-x-4">
              <HardDrive className="h-8 w-8 text-cyan-400 animate-quantum-flicker" />
              <div>
                <div className="text-base text-slate-400">MEMORY USAGE</div>
                <div className="text-xl font-bold text-cyan-400">{systemStats.memory}%</div>
              </div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-violet-500/30 cyber-card-glow animate-cyber-pulse">
            <div className="flex items-center space-x-4">
              <Wifi className="h-8 w-8 text-violet-400 animate-quantum-flicker" />
              <div>
                <div className="text-base text-slate-400">NETWORK ATTACK</div>
                <div className="text-xl font-bold text-violet-400">{systemStats.network}%</div>
              </div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-rose-500/30 cyber-card-glow animate-cyber-pulse">
            <div className="flex items-center space-x-4">
              <Activity className="h-8 w-8 text-rose-400 animate-quantum-flicker" />
              <div>
                <div className="text-base text-slate-400">ACTIVE WEAPONS</div>
                <div className="text-xl font-bold text-rose-400">{systemStats.processes}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Terminal Container */}
        <div className="bg-black/95 backdrop-blur-xl rounded-3xl border border-emerald-500/40 overflow-hidden shadow-2xl shadow-emerald-500/20 cyber-card-glow particle-effect">
          {/* Terminal Header */}
          <div className="bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 px-8 py-6 border-b border-emerald-500/40 flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex space-x-2">
                <div className="w-4 h-4 bg-rose-500 rounded-full hover:bg-rose-400 transition-colors cursor-pointer animate-pulse"></div>
                <div className="w-4 h-4 bg-amber-500 rounded-full hover:bg-amber-400 transition-colors cursor-pointer animate-pulse"></div>
                <div className="w-4 h-4 bg-emerald-500 rounded-full hover:bg-emerald-400 transition-colors cursor-pointer animate-pulse"></div>
              </div>
              <div className="flex items-center space-x-4 text-emerald-400">
                <Skull className="h-6 w-6 animate-quantum-flicker" />
                <span className="text-base font-medium animate-hologram">💀 freep0nx-warfare@terminal:{currentPath} 💀</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {isProcessing && (
                <div className="flex items-center space-x-3 text-amber-400">
                  <div className="w-3 h-3 bg-amber-400 rounded-full animate-quantum-flicker"></div>
                  <span className="text-sm font-bold">EXECUTING WARFARE...</span>
                </div>
              )}
              <div className="text-sm text-slate-400 font-mono">
                {lines.length} lines
              </div>
            </div>
          </div>

          {/* Terminal Content */}
          <div 
            ref={terminalRef}
            className="h-[700px] p-8 overflow-y-auto font-mono text-base bg-black/60 scrollbar-thin scrollbar-thumb-emerald-500/50 scrollbar-track-transparent cursor-text"
            onClick={handleTerminalClick}
          >
            {lines.map((line, index) => (
              <div key={index} className={`mb-2 leading-relaxed ${
                line.type === 'command' ? 'text-emerald-400 font-bold animate-hologram' : 
                line.type === 'error' ? 'text-rose-400 animate-shake-intense' : 
                'text-slate-300 animate-quantum-flicker'
              }`}>
                {line.content}
              </div>
            ))}
            
            {/* Input Line */}
            <div className="flex items-center text-emerald-400 mt-4">
              <span className="mr-3 flex items-center space-x-2">
                <Crosshair className="h-5 w-5 animate-spin-slow" />
                <span className="font-bold">💀 freep0nx-warfare@terminal:{currentPath}$</span>
              </span>
              <input
                ref={inputRef}
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyDown={handleKeyPress}
                className="flex-1 bg-transparent outline-none text-emerald-400 placeholder-emerald-400/50 caret-emerald-400 font-bold"
                placeholder="Entrez votre commande de guerre..."
                disabled={isProcessing}
                autoFocus
              />
              <span className="ml-2 animate-quantum-flicker text-emerald-400 text-xl">█</span>
            </div>
          </div>

          {/* Quick Commands */}
          <div className="bg-white/10 border-t border-emerald-500/40 p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-bold text-slate-300 flex items-center space-x-2">
                <Lightning className="h-6 w-6 text-yellow-400 animate-bounce" />
                <span>🎯 ARSENAL RAPIDE:</span>
              </span>
              <div className="flex items-center space-x-3 text-sm text-slate-400">
                <Target className="h-5 w-5 animate-spin-slow" />
                <span className="font-bold">Cliquez pour lancer l'attaque</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              {quickCommands.map((cmd, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentInput(cmd);
                    // Focus automatique après avoir cliqué sur une commande rapide
                    setTimeout(() => {
                      if (inputRef.current) {
                        inputRef.current.focus();
                      }
                    }, 50);
                  }}
                  className="px-4 py-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-lg hover:bg-emerald-500/30 transition-all duration-300 text-base font-mono font-bold neon-border animate-cyber-pulse"
                >
                  {cmd}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Terminal Guide */}
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 cyber-card-glow particle-effect">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
              <Brain className="h-7 w-7 text-emerald-400 animate-quantum-flicker" />
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                🔥 ARMES DE DESTRUCTION
              </span>
            </h3>
            <div className="space-y-4 text-base">
              <div className="flex items-center space-x-4">
                <code className="text-emerald-400 font-bold bg-emerald-500/20 px-3 py-2 rounded neon-border">help</code>
                <span className="text-slate-300 font-medium">Arsenal de guerre complet</span>
              </div>
              <div className="flex items-center space-x-4">
                <code className="text-cyan-400 font-bold bg-cyan-500/20 px-3 py-2 rounded neon-border">exploit</code>
                <span className="text-slate-300 font-medium">Lancement d'attaque nucléaire</span>
              </div>
              <div className="flex items-center space-x-4">
                <code className="text-violet-400 font-bold bg-violet-500/20 px-3 py-2 rounded neon-border">backdoor</code>
                <span className="text-slate-300 font-medium">Installation de contrôle permanent</span>
              </div>
              <div className="flex items-center space-x-4">
                <code className="text-rose-400 font-bold bg-rose-500/20 px-3 py-2 rounded neon-border">matrix</code>
                <span className="text-slate-300 font-medium">Entrée dans la matrice de guerre</span>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 cyber-card-glow particle-effect">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
              <Target className="h-7 w-7 text-violet-400 animate-spin-slow" />
              <span className="bg-gradient-to-r from-violet-400 to-rose-400 bg-clip-text text-transparent">
                🎯 MISSION DE DOMINATION
              </span>
            </h3>
            <div className="space-y-4 text-base">
              <div className="flex items-center space-x-3 text-slate-300">
                <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                <span>Infiltrez les fichiers avec <code className="text-emerald-400 font-bold">cat</code></span>
              </div>
              <div className="flex items-center space-x-3 text-slate-300">
                <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
                <span>Traquez les secrets avec <code className="text-cyan-400 font-bold">find</code></span>
              </div>
              <div className="flex items-center space-x-3 text-slate-300">
                <div className="w-3 h-3 bg-violet-400 rounded-full animate-pulse"></div>
                <span>Déployez <code className="text-violet-400 font-bold">nmap</code> pour la reconnaissance</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-300">
                <div className="w-3 h-3 bg-rose-400 rounded-full animate-pulse"></div>
                <span>Analysez les logs de guerre dans <code className="text-rose-400 font-bold">/var/log/</code></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer onNavigate={onNavigate} />
    </div>
  );
};

export default Terminal;