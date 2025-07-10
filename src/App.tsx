import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Users, Shield, Zap, Github, ExternalLink, ChevronRight, Lock, Code, Search, Flag, CheckCircle, User, FileText, Folder, ArrowLeft, Crown, Star, Trophy, Sparkles, AlertTriangle, Key } from 'lucide-react';

const createFlag = (a: string, b: string, c: string, d?: string, e?: string): string => {
  const base = String.fromCharCode(102, 114, 101, 101, 112, 48, 110, 120, 123); // freep0nx{
  const end = String.fromCharCode(125); // }
  return base + a + b + c + (d || '') + (e || '') + end;
};

const getHiddenFlag = (type: number): string => {
  const patterns = [
    [String.fromCharCode(114, 48, 98, 48, 116, 115, 95), String.fromCharCode(116, 120, 116, 95, 49, 115, 95), String.fromCharCode(121, 48, 117, 114, 95), String.fromCharCode(102, 114, 49, 51, 110, 100)],
    [String.fromCharCode(120, 115, 115, 95), String.fromCharCode(118, 117, 108, 110, 95), String.fromCharCode(102, 48, 117, 110, 100)],
    [String.fromCharCode(53, 113, 108, 95), String.fromCharCode(49, 110, 106, 51, 99, 116, 49, 48, 110, 95), String.fromCharCode(109, 52, 115, 116, 51, 114)],
    [String.fromCharCode(49, 110, 115, 112, 51, 99, 116, 95), String.fromCharCode(51, 108, 51, 109, 51, 110, 116, 95), String.fromCharCode(112, 114, 48)],
    [String.fromCharCode(104, 49, 100, 100, 51, 110, 95), String.fromCharCode(102, 49, 108, 51, 95), String.fromCharCode(102, 48, 117, 110, 100)],
    [String.fromCharCode(99, 48, 48, 107, 49, 51, 95), String.fromCharCode(52, 100, 109, 49, 110, 95), String.fromCharCode(112, 48, 119, 51, 114)],
    [String.fromCharCode(98, 52, 115, 51, 54, 52, 95), String.fromCharCode(114, 48, 48, 116, 95), String.fromCharCode(112, 119, 110, 51, 100)],
    [String.fromCharCode(49, 100, 48, 114, 95), String.fromCharCode(118, 117, 108, 110, 95), String.fromCharCode(102, 48, 117, 110, 100)]
  ];
  const p = patterns[type];
  return createFlag(p[0], p[1], p[2], p[3], p[4]);
};

interface Command {
  input: string;
  output: string[];
}

interface Member {
  rank: string;
  pseudo: string;
  speciality: string;
  description?: string;
}

interface Flag {
  id: string;
  flag: string;
  found: boolean;
}

interface SearchResult {
  title: string;
  description: string;
  url: string;
}

interface FileSystemItem {
  name: string;
  type: 'file' | 'dir';
  content?: string;
  owner?: string;
  permissions?: string;
  size?: string;
}

interface TerminalState {
  currentDir: string;
  files: { [key: string]: FileSystemItem[] };
  foundHiddenFlag: boolean;
  hasCheckedSudo: boolean;
}

const teamMembers: Member[] = [
  { rank: "Chef", pseudo: "45exile", speciality: "reverse", description: "Le boss du reverse engineering" },
  { rank: "Membre", pseudo: "Loutre", speciality: "web (xss)", description: "Expert en vulnérabilités web" },
  { rank: "Membre", pseudo: "Ognon", speciality: "web, Active Directory", description: "Spécialiste AD et web" },
  { rank: "Membre", pseudo: "Ssor", speciality: "web", description: "Ninja du développement web" },
  { rank: "Membre", pseudo: "Tisco", speciality: "web, réseau", description: "Maître des réseaux" },
  { rank: "Membre", pseudo: "vorstag34", speciality: "goat ultime il sait tout faire", description: "Le couteau suisse ultime" },
  { rank: "Membre", pseudo: "bloman", speciality: "boot2root, couteau suisse", description: "Expert en escalade de privilèges" },
  { rank: "Membre", pseudo: "H4ldir", speciality: "forensic, osint", description: "Sherlock Holmes du numérique" },
  { rank: "Membre", pseudo: "Shor", speciality: "web, pwn", description: "Pwner professionnel" },
  { rank: "Membre", pseudo: "z3d", speciality: "web, crypto", description: "Cryptographe en herbe" },
  { rank: "Membre", pseudo: "toby", speciality: "rev, crypto, c'est un crack", description: "Le crack du reverse" },
  { rank: "Membre", pseudo: "paw", speciality: "web, pwn", description: "Chasseur de bugs" },
  { rank: "Membre", pseudo: "Kuzamyy", speciality: "web, couteau suisse", description: "Polyvalent et efficace" },
  { rank: "Membre", pseudo: "Blossom", speciality: "forensic, crypto", description: "Génie du forensic" },
  { rank: "Membre", pseudo: "Prox", speciality: "osint, stégano", description: "Challmaker osint/stégano de père en fils. A déjà trouvé une faille sur l'infra de 42 !" },
  { rank: "Membre", pseudo: "Farmer", speciality: "osint, stégano, réseau", description: "Un fantôme, mais il a un potentiel effrayant" },
  { rank: "Membre", pseudo: "Astral", speciality: "réseau, web", description: "Son niveau sur valo est impressionnant." },
  { rank: "Membre", pseudo: "Kaiimos", speciality: "débutant", description: "Passioné, gros potentiel" },
  { rank: "Membre", pseudo: "Zeleph", speciality: "réseau, animé, foo", description: "Rookie motivé par les animés" }
];

// Secret member for IDOR vulnerability
const secretMember: Member = {
  rank: "Fondateur Secret",
  pseudo: "Gh0st_Admin",
  speciality: "Shadow Operations",
  description: `Membre fondateur secret de freep0nx. ${getHiddenFlag(7)}`
};

const hiddenFlags: Flag[] = [
  { id: "robots", flag: getHiddenFlag(0), found: false },
  { id: "xss", flag: getHiddenFlag(1), found: false },
  { id: "sqli", flag: getHiddenFlag(2), found: false },
  { id: "source", flag: getHiddenFlag(3), found: false },
  { id: "privesc", flag: getHiddenFlag(4), found: false },
  { id: "cookie", flag: getHiddenFlag(5), found: false },
  { id: "base64", flag: getHiddenFlag(6), found: false },
  { id: "idor", flag: getHiddenFlag(7), found: false }
];

// Simple SQL injection validation - back to basics
const validateSQLPayload = (input: string): boolean => {
  const normalizedInput = input.toLowerCase().replace(/\s+/g, ' ');
  return normalizedInput.includes("' or 1=1") || normalizedInput.includes("'or 1=1") || normalizedInput.includes("' or '1'='1");
};

const mockSearchResults: SearchResult[] = [
  { title: "Web Security Basics", description: "Learn the fundamentals of web security", url: "/security-basics" },
  { title: "CTF Writeups", description: "Collection of CTF challenge solutions", url: "/writeups" },
  { title: "Team freep0nx", description: "Elite CTF team profile and achievements", url: "/team" },
  { title: "XSS", description: "Hmmmm...", url: "/alert" },
  { title: "Hacking Tools", description: "Essential tools for penetration testing", url: "/tools" },
  { title: "Admin Panel", description: "🔒 Restricted access - Admin login required", url: "/admin" }
];

const funnyCommands: { [key: string]: string[] } = {
  "hack": [
    "Initializing hack sequence...",
    "Bypassing firewall... SUCCESS",
    "Accessing mainframe... GRANTED",
    "Downloading secrets... 100%",
    "HACK COMPLETE! 🎉"
  ],
  "scan": [
    "Scanning network...",
    "192.168.1.1 - VULNERABLE",
    "192.168.1.10 - PROTECTED",
    "192.168.1.42 - HONEYPOT DETECTED",
    "Scan complete. 3 hosts found."
  ],
  "zeleph": [
    "Initializing hack sequence...",
    "Critical Error: Kawaii overload detected",
    "ERROR 404: Skills not found",
    "Critical Error: Kawaii overload detected",
    "Zeleph-sama has left the server in shame..."
  ],
  "exploit": [
    "Searching for exploits...",
    "Found CVE-2024-FAKE",
    "Payload crafted...",
    "Exploit launched... BOOM! 💥",
    "Root access acquired!"
  ],
  "freep0nx": [
    "Loading team freep0nx data...",
    "Rank: Elite CTF Team",
    "Members: 19 skilled hackers",
    "Specialty: Breaking everything",
    "Status: LEGENDARY 🔥"
  ],
  "matrix": [
    "Wake up, Neo...",
    "The Matrix has you...",
    "Follow the white rabbit...",
    "There is no spoon."
  ],
  "help": [
    "Available commands:",
    "• hack - Start hacking sequence",
    "• scan - Scan network", 
    "• exploit - Launch exploit",
    "• freep0nx - Team info",
    "• matrix - Enter the matrix",
    "• whoami - Identity check",
    "• ls [-l] [-a] - List files",
    "• cat <file> - Read file content",
    "• cd <dir> - Change directory",
    "• pwd - Print working directory",
    "• sudo -l - Check sudo permissions",
    "• sudo <command> - Run as root",
    "• file <file> - Check file type",
    "• find <name> - Search for files",
    "• clear - Clear terminal"
  ],
  "whoami": [
    "You are: hacker",
    "Privilege: user",
    "Group: freep0nx",
    "Status: DANGEROUS 🚨"
  ]
};

// Complete filesystem structure
const createFileSystem = (): { [key: string]: FileSystemItem[] } => ({
  '/': [
    { name: 'bin', type: 'dir', permissions: 'drwxr-xr-x', owner: 'root', size: '4096' },
    { name: 'boot', type: 'dir', permissions: 'drwxr-xr-x', owner: 'root', size: '4096' },
    { name: 'dev', type: 'dir', permissions: 'drwxr-xr-x', owner: 'root', size: '4096' },
    { name: 'etc', type: 'dir', permissions: 'drwxr-xr-x', owner: 'root', size: '4096' },
    { name: 'home', type: 'dir', permissions: 'drwxr-xr-x', owner: 'root', size: '4096' },
    { name: 'lib', type: 'dir', permissions: 'drwxr-xr-x', owner: 'root', size: '4096' },
    { name: 'opt', type: 'dir', permissions: 'drwxr-xr-x', owner: 'root', size: '4096' },
    { name: 'proc', type: 'dir', permissions: 'drwxr-xr-x', owner: 'root', size: '4096' },
    { name: 'root', type: 'dir', permissions: 'drwx------', owner: 'root', size: '4096' },
    { name: 'tmp', type: 'dir', permissions: 'drwxrwxrwt', owner: 'root', size: '4096' },
    { name: 'usr', type: 'dir', permissions: 'drwxr-xr-x', owner: 'root', size: '4096' },
    { name: 'var', type: 'dir', permissions: 'drwxr-xr-x', owner: 'root', size: '4096' }
  ],
  '/home': [
    { name: 'hacker', type: 'dir', permissions: 'drwxr-xr-x', owner: 'hacker', size: '4096' },
    { name: 'admin', type: 'dir', permissions: 'drwx------', owner: 'root', size: '4096' }
  ],
  '/home/hacker': [
    { name: 'documents', type: 'dir', permissions: 'drwxr-xr-x', owner: 'hacker', size: '4096' },
    { name: 'downloads', type: 'dir', permissions: 'drwxr-xr-x', owner: 'hacker', size: '4096' },
    { name: 'scripts', type: 'dir', permissions: 'drwxr-xr-x', owner: 'hacker', size: '4096' },
    { name: 'notes.txt', type: 'file', permissions: '-rw-r--r--', owner: 'hacker', size: '156', content: 'Remember to check hidden files with ls -a\nAlso try checking /etc/passwd for users\nLook for interesting directories...' },
    { name: 'todo.txt', type: 'file', permissions: '-rw-r--r--', owner: 'hacker', size: '89', content: 'TODO:\n- Finish CTF challenge\n- Check root permissions\n- Find hidden files\n- Explore /opt directory' },
    { name: '.flag.txt', type: 'file', permissions: '-rw-------', owner: 'hacker', size: '32', content: getHiddenFlag(4) },
    { name: '.bashrc', type: 'file', permissions: '-rw-r--r--', owner: 'hacker', size: '3526', content: '# ~/.bashrc: executed by bash(1) for non-login shells.\nexport PATH=$PATH:/opt/tools' },
    { name: '.bash_history', type: 'file', permissions: '-rw-------', owner: 'hacker', size: '2048', content: 'ls -la\ncd /opt\nsudo -l\nfind / -name "*.txt" 2>/dev/null\ncat /etc/passwd' }
  ],
  '/home/hacker/documents': [
    { name: 'readme.txt', type: 'file', permissions: '-rw-r--r--', owner: 'hacker', size: '45', content: 'Welcome to the freep0nx CTF challenge!\nGood luck finding all the flags!' },
    { name: 'hints.txt', type: 'file', permissions: '-rw-r--r--', owner: 'hacker', size: '78', content: 'Look for hidden files and check your privileges...\nSome directories might contain secrets.\nTry /opt for tools!' },
    { name: 'ctf_notes.txt', type: 'file', permissions: '-rw-r--r--', owner: 'hacker', size: '234', content: 'CTF Notes:\n- robots.txt often contains secrets\n- Check source code for hidden comments\n- SQL injection: try \' OR 1=1--\n- Look for admin panels' },
    { name: '.root.txt', type: 'file', permissions: '-rw-------', owner: 'root', size: '13', content: 'Permission denied' }
  ],
  '/home/hacker/downloads': [
    { name: 'tools.zip', type: 'file', permissions: '-rw-r--r--', owner: 'hacker', size: '1024', content: 'Binary file (use file command to inspect)' },
    { name: 'exploit.py', type: 'file', permissions: '-rwxr-xr-x', owner: 'hacker', size: '512', content: '#!/usr/bin/env python3\n# Exploit script template\nprint("Exploit framework loaded...")' },
    { name: '.zeleph.txt', type: 'file', permissions: '-rw-------', owner: 'hacker', size: '12', content: 'NANI ?!?!' }
  ],
  '/home/hacker/scripts': [
    { name: 'scan.sh', type: 'file', permissions: '-rwxr-xr-x', owner: 'hacker', size: '256', content: '#!/bin/bash\necho "Network scanner v1.0"\nnmap -sS $1' },
    { name: 'backup.sh', type: 'file', permissions: '-rwxr-xr-x', owner: 'hacker', size: '128', content: '#!/bin/bash\ntar -czf backup.tar.gz /home/hacker/documents/' }
  ],
  '/etc': [
    { name: 'passwd', type: 'file', permissions: '-rw-r--r--', owner: 'root', size: '1024', content: 'root:x:0:0:root:/root:/bin/bash\nhacker:x:1000:1000:hacker:/home/hacker:/bin/bash\nadmin:x:1001:1001:admin:/home/admin:/bin/bash' },
    { name: 'shadow', type: 'file', permissions: '-rw-------', owner: 'root', size: '512', content: 'Permission denied' },
    { name: 'hosts', type: 'file', permissions: '-rw-r--r--', owner: 'root', size: '158', content: '127.0.0.1\tlocalhost\n127.0.1.1\tfreep0nx-ctf\n192.168.1.100\tadmin.freep0nx.local' },
    { name: 'crontab', type: 'file', permissions: '-rw-r--r--', owner: 'root', size: '256', content: '# System crontab\n0 2 * * * root /opt/backup/daily.sh' }
  ],
  '/opt': [
    { name: 'tools', type: 'dir', permissions: 'drwxr-xr-x', owner: 'root', size: '4096' },
    { name: 'backup', type: 'dir', permissions: 'drwxr-xr-x', owner: 'root', size: '4096' },
    { name: 'secrets', type: 'dir', permissions: 'drwx------', owner: 'root', size: '4096' }
  ],
  '/opt/tools': [
    { name: 'nmap', type: 'file', permissions: '-rwxr-xr-x', owner: 'root', size: '2048', content: 'Network exploration tool and security scanner' },
    { name: 'sqlmap', type: 'file', permissions: '-rwxr-xr-x', owner: 'root', size: '4096', content: 'Automatic SQL injection tool' },
    { name: 'burpsuite', type: 'file', permissions: '-rwxr-xr-x', owner: 'root', size: '8192', content: 'Web application security testing platform' }
  ],
  '/opt/backup': [
    { name: 'daily.sh', type: 'file', permissions: '-rwxr-xr-x', owner: 'root', size: '512', content: '#!/bin/bash\n# Daily backup script\necho "Running daily backup..."' },
    { name: 'logs', type: 'dir', permissions: 'drwxr-xr-x', owner: 'root', size: '4096' }
  ],
  '/opt/secrets': [
    { name: 'admin.key', type: 'file', permissions: '-rw-------', owner: 'root', size: '2048', content: 'Permission denied' }
  ],
  '/tmp': [
    { name: 'temp.txt', type: 'file', permissions: '-rw-rw-rw-', owner: 'hacker', size: '0', content: '' }
  ],
  '/var': [
    { name: 'log', type: 'dir', permissions: 'drwxr-xr-x', owner: 'root', size: '4096' },
    { name: 'www', type: 'dir', permissions: 'drwxr-xr-x', owner: 'root', size: '4096' }
  ],
  '/var/log': [
    { name: 'auth.log', type: 'file', permissions: '-rw-r-----', owner: 'root', size: '4096', content: 'Permission denied' },
    { name: 'access.log', type: 'file', permissions: '-rw-r--r--', owner: 'root', size: '2048', content: '192.168.1.10 - - [01/Jan/2024:12:00:00] "GET /admin/ HTTP/1.1" 200 1234' }
  ]
});

function App() {
  const [currentSection, setCurrentSection] = useState('home');
  const [terminalHistory, setTerminalHistory] = useState<Command[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [foundFlags, setFoundFlags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [userRole, setUserRole] = useState('user');
  const [terminalState, setTerminalState] = useState<TerminalState>({
    currentDir: '/home/hacker',
    files: createFileSystem(),
    foundHiddenFlag: false,
    hasCheckedSudo: false
  });
  const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminLoginAttempted, setAdminLoginAttempted] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Check for role cookie on mount and periodically
  useEffect(() => {
    const checkRoleCookie = () => {
      const cookies = document.cookie.split(';');
      const roleCookie = cookies.find(cookie => cookie.trim().startsWith('role='));
      if (roleCookie) {
        const role = roleCookie.split('=')[1];
        setUserRole(role);
        
        // Check for admin role flag
        if (role === 'admin' && !foundFlags.includes(getHiddenFlag(5))) {
          setFoundFlags(prev => [...prev, getHiddenFlag(5)]);
        }
      } else {
        // Set default cookie
        document.cookie = 'role=user; path=/';
        setUserRole('user');
      }
    };

    checkRoleCookie();
    const interval = setInterval(checkRoleCookie, 1000);
    return () => clearInterval(interval);
  }, [foundFlags]);

  // Check for source code flag when component mounts
  useEffect(() => {
    const checkSourceFlag = () => {
      if (document.documentElement.outerHTML.includes(getHiddenFlag(3)) && 
          !foundFlags.includes(getHiddenFlag(3))) {
        setFoundFlags(prev => [...prev, getHiddenFlag(3)]);
      }
    };
    
    // Check periodically if someone inspects the source
    const interval = setInterval(checkSourceFlag, 2000);
    return () => clearInterval(interval);
  }, [foundFlags]);

// Check for IDOR vulnerability
useEffect(() => {
  const checkIdor = () => {
    // Vérifie à la fois l'URL et le hash pour plus de compatibilité
    const query = window.location.search || window.location.hash.split('?')[1] || '';
    const urlParams = new URLSearchParams(query);
    const memberIdParam = urlParams.get('member');
    
    // Vérifie plusieurs formats possibles (nombre, string)
    if ((memberIdParam === '1' || memberIdParam === '14' || memberIdParam === '1337') && 
        !foundFlags.includes(getHiddenFlag(7))) {
      setFoundFlags(prev => [...prev, getHiddenFlag(7)]);
      
      // Force aussi l'affichage du membre secret si c'est l'ID 1
      if (memberIdParam === '1') {
        setSelectedMemberId(1);
      }
    }
  };

  // Vérifie immédiatement au chargement
  checkIdor();
  
  // Écoute aussi les changements d'URL
  const handlePopState = () => checkIdor();
  window.addEventListener('popstate', handlePopState);
  
  return () => window.removeEventListener('popstate', handlePopState);
}, [foundFlags]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate search functionality
    const filtered = mockSearchResults.filter(result => 
      result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    // Also search team members
    const memberResults = teamMembers
      .filter(member => 
        member.pseudo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.speciality.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .map(member => ({
        title: `Team Member: ${member.pseudo}`,
        description: `${member.rank} - Speciality: ${member.speciality}`,
        url: `/team/${member.pseudo.toLowerCase()}`
      }));
    
    setSearchResults([...filtered, ...memberResults]);
    setShowSearchResults(true);
    
    // Check for XSS payload - vulnerable to reflected XSS
    if (searchQuery.includes('<script>') && searchQuery.includes('alert(') && 
        !foundFlags.includes(getHiddenFlag(1))) {
      setFoundFlags(prev => [...prev, getHiddenFlag(1)]);
      // Show actual alert with flag
      setTimeout(() => {
        alert(`XSS Executed! Flag: ${getHiddenFlag(1)}`);
      }, 100);
    }
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminLoginAttempted(true);
    
    // Check for SQL injection
    if (validateSQLPayload(adminUsername) || validateSQLPayload(adminPassword)) {
      if (!foundFlags.includes(getHiddenFlag(2))) {
        setFoundFlags(prev => [...prev, getHiddenFlag(2)]);
      }
    }
  };

  const executeTerminalCommand = (command: string) => {
    const cmd = command.trim();
    const args = cmd.split(' ');
    const baseCmd = args[0].toLowerCase();
    
    if (cmd === 'clear') {
      setTerminalHistory([]);
      return;
    }

    let output: string[] = [];

    switch (baseCmd) {
      case 'ls':
        const showHidden = args.includes('-a') || args.includes('-la') || args.includes('-al');
        const showLong = args.includes('-l') || args.includes('-la') || args.includes('-al');
        const currentFiles = terminalState.files[terminalState.currentDir] || [];
        
        if (showLong) {
          output = ['total ' + currentFiles.length];
          currentFiles.forEach(file => {
            if (!showHidden && file.name.startsWith('.')) return;
            const permissions = file.permissions || (file.type === 'dir' ? 'drwxr-xr-x' : '-rw-r--r--');
            const owner = file.owner || 'hacker';
            const size = file.size || '0';
            const icon = file.type === 'dir' ? '📁' : '📄';
            output.push(`${permissions} 1 ${owner} ${owner} ${size.padStart(8)} Jan 15 12:00 ${icon} ${file.name}`);
          });
        } else {
          if (showHidden) {
            output = currentFiles.map(file => {
              const icon = file.type === 'dir' ? '📁' : '📄';
              const color = file.name.startsWith('.') ? 'hidden' : 
                           file.type === 'dir' ? 'dir' : 'file';
              return `${icon} ${file.name}${file.owner === 'root' ? ' (root)' : ''}`;
            });
          } else {
            const visibleFiles = currentFiles.filter(file => !file.name.startsWith('.'));
            output = visibleFiles.map(file => {
              const icon = file.type === 'dir' ? '📁' : '📄';
              return `${icon} ${file.name}${file.owner === 'root' ? ' (root)' : ''}`;
            });
          }
        }
        break;
        
      case 'base64':
  if (args[1]) {
    const fileName = args[1];
    const currentFiles = terminalState.files[terminalState.currentDir] || [];
    const file = currentFiles.find(f => f.name === fileName);
    
    if (file) {
      // Vérification précise des permissions UNIX
      const canRead = (file.permissions && (
        // World readable (dernier 'r' dans -rwxr-xr-x)
        file.permissions[8] === 'r' ||
        // Owner est hacker et fichier readable par owner (2ème 'r' dans -rwxr-xr-x)
        (file.owner === 'hacker' && file.permissions[1] === 'r')
      ));
      
      if (canRead) {
        const content = file.content || '';
        output = [btoa(content)];
      } else {
        output = [`base64: ${fileName}: Permission denied`];
      }
    } else {
      output = [`base64: ${fileName}: No such file or directory`];
    }
  } else {
    output = ['base64: missing file operand'];
  }
  break;
        
      case 'cat':
        if (args[1]) {
          const fileName = args[1];
          const currentFiles = terminalState.files[terminalState.currentDir] || [];
          const file = currentFiles.find(f => f.name === fileName);
          
          if (file) {
            if (file.owner === 'root' && fileName !== '.flag.txt' && terminalState.currentDir !== '/home/hacker') {
              output = [`cat: ${fileName}: Permission denied`];
            } else {
              if (fileName === '.flag.txt' && !terminalState.foundHiddenFlag) {
                setTerminalState(prev => ({ ...prev, foundHiddenFlag: true }));
                setFoundFlags(prev => [...prev, getHiddenFlag(4)]);
              }
              output = file.content ? file.content.split('\n') : ['Empty file'];
            }
          } else {
            output = [`cat: ${fileName}: No such file or directory`];
          }
        } else {
          output = ['cat: missing file operand'];
        }
        break;
        
      case 'cd':
        if (args[1]) {
          let targetDir = args[1];
          let newDir = '';
          
          if (targetDir === '..') {
            const pathParts = terminalState.currentDir.split('/').filter(p => p);
            if (pathParts.length > 0) {
              pathParts.pop();
              newDir = pathParts.length > 0 ? '/' + pathParts.join('/') : '/';
            } else {
              newDir = '/';
            }
          } else if (targetDir === '/') {
            newDir = '/';
          } else if (targetDir.startsWith('/')) {
            newDir = targetDir;
          } else {
            newDir = terminalState.currentDir === '/' ? `/${targetDir}` : `${terminalState.currentDir}/${targetDir}`;
          }
          
          if (terminalState.files[newDir]) {
            setTerminalState(prev => ({ ...prev, currentDir: newDir }));
          } else {
            output = [`cd: ${targetDir}: No such file or directory`];
          }
        } else {
          setTerminalState(prev => ({ ...prev, currentDir: '/home/hacker' }));
        }
        break;
        
      case 'pwd':
        output = [terminalState.currentDir];
        break;
        
      case 'find':
        if (args[1]) {
          const searchTerm = args[1];
          const results: string[] = [];
          
          Object.keys(terminalState.files).forEach(dir => {
            terminalState.files[dir].forEach(file => {
              if (file.name.includes(searchTerm)) {
                results.push(`${dir}/${file.name}`);
              }
            });
          });
          
          if (results.length > 0) {
            output = results;
          } else {
            output = [`find: '${searchTerm}': No such file or directory`];
          }
        } else {
          output = ['find: missing search term'];
        }
        break;
        
      case 'sudo':
  if (args[1] === 'base64' && args[2]) {
    // Pour sudo base64 <fichier>
    const fileName = args[2];
    const currentFiles = terminalState.files[terminalState.currentDir] || [];
    const file = currentFiles.find(f => f.name === fileName);
    
    if (file) {
      // Encode le contenu en base64
      const content = file.content || '';
      output = [btoa(content)];
      
      // Si c'est le fichier .root.txt, on donne le flag
      if (fileName === '.root.txt' && !foundFlags.includes(getHiddenFlag(6))) {
        setFoundFlags(prev => [...prev, getHiddenFlag(6)]);
      }
    } else {
      output = [`sudo: ${fileName}: No such file or directory`];
    }
  } else if (args[1] === '-l') {
    output = [
      "Matching Defaults entries for hacker on freep0nx:",
      "    env_reset, mail_badpass",
      "",
      "User hacker may run the following commands on freep0nx:",
      "    (root) NOPASSWD: /usr/bin/base64"
    ];
  } else {
    output = ["Usage: sudo <command>", "Try: sudo -l"];
  }
  break;
        
      case 'file':
        if (args[1]) {
          const fileName = args[1];
          const currentFiles = terminalState.files[terminalState.currentDir] || [];
          const file = currentFiles.find(f => f.name === fileName);
          
          if (file) {
            if (file.type === 'dir') {
              output = [`${fileName}: directory`];
            } else if (fileName.endsWith('.zip')) {
              output = [`${fileName}: Zip archive data`];
            } else if (fileName.endsWith('.txt')) {
              output = [`${fileName}: ASCII text`];
            } else if (fileName.endsWith('.sh')) {
              output = [`${fileName}: Bourne-Again shell script`];
            } else if (fileName.endsWith('.py')) {
              output = [`${fileName}: Python script`];
            } else {
              output = [`${fileName}: regular file`];
            }
          } else {
            output = [`file: ${fileName}: No such file or directory`];
          }
        } else {
          output = ['file: missing file operand'];
        }
        break;
        
      default:
        if (funnyCommands[cmd.toLowerCase()]) {
          output = funnyCommands[cmd.toLowerCase()];
        } else {
          output = [`Command '${command}' not found. Type 'help' for available commands.`];
        }
    }
    
    setTerminalHistory(prev => [...prev, { input: command, output }]);
    setCurrentInput('');
    
    // Scroll to bottom
    setTimeout(() => {
      terminalRef.current?.scrollTo({ top: terminalRef.current.scrollHeight, behavior: 'smooth' });
    }, 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeTerminalCommand(currentInput);
    }
  };

  const MatrixRain = () => {
    const [drops, setDrops] = useState<number[]>([]);

    useEffect(() => {
      const columns = Math.floor(window.innerWidth / 20);
      setDrops(Array(columns).fill(0));
    }, []);

    return (
      <div className="fixed inset-0 pointer-events-none opacity-5 z-0">
        {drops.map((drop, i) => (
          <div
            key={i}
            className="absolute text-green-400 text-xs font-mono animate-pulse"
            style={{
              left: `${i * 20}px`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`
            }}
          >
            {Math.random() > 0.5 ? '1' : '0'}
          </div>
        ))}
      </div>
    );
  };

  const AdminPanel = () => (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-black border-2 border-red-500/60 rounded-xl p-8 max-w-md w-full shadow-2xl shadow-red-500/30">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Lock className="w-12 h-12 text-red-400" />
          </div>
          <h2 className="text-3xl font-bold text-red-400 mb-2">Admin Panel</h2>
          <p className="text-gray-400">🔒 Restricted Access</p>
        </div>
        
        {adminLoginAttempted && validateSQLPayload(adminUsername + adminPassword) ? (
          <div className="text-center">
            <div className="bg-green-500/20 border-2 border-green-500/60 rounded-lg p-6 mb-6">
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-green-400 mb-2">SQL Injection Successful!</h3>
              <p className="text-gray-300 mb-4">Authentication bypassed</p>
              <div className="bg-black/60 border border-green-500/30 rounded-lg p-4 font-mono text-green-400">
                {getHiddenFlag(2)}
              </div>
            </div>
            <button
              onClick={() => setShowAdminPanel(false)}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-300"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleAdminLogin} className="space-y-6">
            <div>
              <label className="block text-gray-300 mb-2">Username</label>
              <input
                type="text"
                value={adminUsername}
                onChange={(e) => setAdminUsername(e.target.value)}
                className="w-full px-4 py-3 bg-black/70 border-2 border-gray-500/40 rounded-lg text-white focus:border-red-500/70 focus:outline-none transition-colors"
                placeholder="admin"
              />
            </div>
            
            <div>
              <label className="block text-gray-300 mb-2">Password</label>
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="w-full px-4 py-3 bg-black/70 border-2 border-gray-500/40 rounded-lg text-white focus:border-red-500/70 focus:outline-none transition-colors"
                placeholder="••••••••"
              />
            </div>
            
            {adminLoginAttempted && !validateSQLPayload(adminUsername + adminPassword) && (
              <div className="bg-red-500/20 border border-red-500/40 rounded-lg p-4 text-red-400 text-center">
                <AlertTriangle className="w-6 h-6 mx-auto mb-2" />
                Invalid credentials
              </div>
            )}
            
            <div className="flex space-x-4">
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition-all duration-300 transform hover:scale-105"
              >
                <Key className="w-5 h-5 inline mr-2" />
                Login
              </button>
              <button
                type="button"
                onClick={() => setShowAdminPanel(false)}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-300"
              >
                Cancel
              </button>
            </div>
            
            <div className="text-center text-sm text-gray-500">
              💡 Hint: Try SQL injection techniques
            </div>
          </form>
        )}
      </div>
    </div>
  );

  const ValidationPage = () => {
    const [submittedFlags, setSubmittedFlags] = useState<string[]>([]);
    const [flagInput, setFlagInput] = useState('');
    const [allFlagsFound, setAllFlagsFound] = useState(false);

    const handleFlagSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const flag = flagInput.trim();
      
      if (hiddenFlags.some(f => f.flag === flag) && !submittedFlags.includes(flag)) {
        const newSubmitted = [...submittedFlags, flag];
        setSubmittedFlags(newSubmitted);
        
        if (newSubmitted.length === 8) {
          setAllFlagsFound(true);
        }
      }
      
      setFlagInput('');
    };

    const EpicFinalScreen = () => (
      <div className="relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-blue-900/30 to-green-900/30 animate-pulse"></div>
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
        
        <div className="relative z-10 bg-gradient-to-br from-black/80 via-purple-900/50 to-black/80 border-4 border-gradient-to-r from-yellow-400 via-red-500 to-purple-500 rounded-2xl p-16 text-center shadow-2xl">
          {/* Crown icon with glow */}
          <div className="relative mb-8">
            <Crown className="w-32 h-32 text-yellow-400 mx-auto animate-bounce" />
            <div className="absolute inset-0 w-32 h-32 mx-auto bg-yellow-400/30 rounded-full blur-xl animate-pulse"></div>
          </div>
          
          {/* Epic title with multiple effects */}
          <div className="mb-8">
            <h3 className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-purple-500 mb-4 animate-pulse">
              🎉 LEGENDARY 🎉
            </h3>
            <div className="flex justify-center items-center space-x-4 mb-6">
              <Star className="w-8 h-8 text-yellow-400 animate-spin" />
              <Trophy className="w-12 h-12 text-gold animate-bounce" />
              <Star className="w-8 h-8 text-yellow-400 animate-spin" style={{ animationDirection: 'reverse' }} />
            </div>
          </div>
          
          {/* Achievement text */}
          <div className="space-y-6 mb-12">
            <p className="text-4xl font-bold text-white animate-pulse">
              🏆 MASTER HACKER ACHIEVED 🏆
            </p>
            <p className="text-2xl text-green-400 font-bold">
              You've conquered all 8 challenges!
            </p>
            <div className="text-6xl font-black text-red-400 mb-6 font-mono tracking-wider animate-pulse">
              ELITE STATUS UNLOCKED
            </div>
          </div>
          
          {/* Stats display */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-black/60 border-2 border-yellow-500/60 rounded-xl p-6">
              <div className="text-3xl font-bold text-yellow-400">8/8</div>
              <div className="text-sm text-gray-300">Flags Found</div>
            </div>
            <div className="bg-black/60 border-2 border-green-500/60 rounded-xl p-6">
              <div className="text-3xl font-bold text-green-400">100%</div>
              <div className="text-sm text-gray-300">Completion</div>
            </div>
            <div className="bg-black/60 border-2 border-purple-500/60 rounded-xl p-6">
              <div className="text-3xl font-bold text-purple-400">ELITE</div>
              <div className="text-sm text-gray-300">Rank</div>
            </div>
            <div className="bg-black/60 border-2 border-red-500/60 rounded-xl p-6">
              <div className="text-3xl font-bold text-red-400">∞</div>
              <div className="text-sm text-gray-300">Respect</div>
            </div>
          </div>
          
          {/* Epic message */}
          <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-2 border-cyan-500/60 rounded-xl p-8 mb-8">
            <Sparkles className="w-12 h-12 text-cyan-400 mx-auto mb-4 animate-spin" />
            <p className="text-2xl text-white font-bold mb-4">
              🎊 WELCOME TO THE FREEP0NX ELITE CIRCLE 🎊
            </p>
            <p className="text-lg text-cyan-400">
              You have proven yourself worthy of the highest honor in cybersecurity.
              Your skills in web exploitation, privilege escalation, and vulnerability discovery
              mark you as a true digital warrior.
            </p>
          </div>
          
          {/* Final call to action */}
          <div className="space-y-4">
            <p className="text-xl text-gray-300">
              Ready for the next challenge? Join us in real CTF competitions!
            </p>
            <a 
              href="https://ctftime.org/team/361758/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-12 py-6 bg-gradient-to-r from-yellow-500 via-red-500 to-purple-500 text-black font-black text-xl rounded-xl hover:scale-110 transform transition-all duration-300 shadow-2xl shadow-purple-500/50 animate-pulse"
            >
              <ExternalLink className="w-8 h-8 mr-4" />
              JOIN THE LEGEND
            </a>
          </div>
        </div>
      </div>
    );

    return (
      <div className="relative z-20 max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-400 mb-6">
            🏆 Flag Validation
          </h2>
          <p className="text-2xl text-gray-300">Submit your discovered flags here</p>
        </div>

        {allFlagsFound ? (
          <EpicFinalScreen />
        ) : (
          <div className="space-y-8">
            <div className="bg-black/70 border-2 border-yellow-500/60 rounded-xl p-8 shadow-2xl shadow-yellow-500/30">
              <form onSubmit={handleFlagSubmit} className="mb-6">
                <div className="flex space-x-4">
                  <input
                    type="text"
                    value={flagInput}
                    onChange={(e) => setFlagInput(e.target.value)}
                    placeholder="freep0nx{...}"
                    className="flex-1 bg-black/70 border-2 border-green-500/40 rounded-lg px-4 py-3 text-white focus:border-green-500/70 focus:outline-none transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-8 py-3 bg-green-500 text-black font-bold rounded-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-500/30"
                  >
                    Submit Flag
                  </button>
                </div>
              </form>
              
              <div className="text-center">
                <p className="text-lg font-bold text-white mb-4">Progress: {submittedFlags.length}/8 flags found</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Array.from({ length: 8 }, (_, i) => (
                    <div
                      key={i}
                      className={`p-4 rounded-lg border-2 ${
                        submittedFlags.length > i
                          ? 'bg-green-500/20 border-green-500/60 text-green-400'
                          : 'bg-gray-500/20 border-gray-500/60 text-gray-400'
                      }`}
                    >
                      <Flag className="w-6 h-6 mx-auto mb-2" />
                      Flag {i + 1}
                      {submittedFlags.length > i && <div className="text-xs mt-1">✓ Found</div>}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {submittedFlags.length > 0 && (
              <div className="bg-black/70 border-2 border-green-500/60 rounded-xl p-8 shadow-2xl shadow-green-500/30">
                <h3 className="text-2xl font-bold text-green-400 mb-6 flex items-center">
                  <CheckCircle className="w-8 h-8 mr-3" />
                  Submitted Flags
                </h3>
                <div className="space-y-3">
                  {submittedFlags.map((flag, index) => (
                    <div key={index} className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 font-mono text-green-400">
                      ✓ {flag}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const MemberProfile = ({ member, memberId }: { member: Member; memberId: number }) => (
    <div className="bg-black/90 border-2 border-purple-500/60 rounded-xl p-8 shadow-2xl shadow-purple-500/30 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => setSelectedMemberId(null)}
          className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Team
        </button>
        <span className="text-gray-400 font-mono">ID: {memberId}</span>
      </div>
      
      <div className="text-center">
        <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full mx-auto mb-6 flex items-center justify-center">
          <User className="w-16 h-16 text-white" />
        </div>
        
        <div className="mb-6">
          <span className={`px-6 py-3 rounded-full text-lg font-bold ${
            member.rank === 'Chef' 
              ? 'bg-red-500/20 text-red-400 border-2 border-red-500/40' 
              : member.rank === 'Fondateur Secret'
              ? 'bg-purple-500/20 text-purple-400 border-2 border-purple-500/40'
              : 'bg-blue-500/20 text-blue-400 border-2 border-blue-500/40'
          }`}>
            {member.rank}
          </span>
        </div>
        
        <h2 className="text-4xl font-bold text-white mb-4">{member.pseudo}</h2>
        <p className="text-2xl text-cyan-400 mb-6 font-semibold">{member.speciality}</p>
        
        <div className="bg-black/60 border border-gray-500/40 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-3">Description</h3>
          <p className="text-gray-300 text-lg leading-relaxed">{member.description}</p>
        </div>
        
        {member.rank === 'Fondateur Secret' && (
          <div className="mt-6 bg-gradient-to-r from-purple-900/50 to-red-900/50 border-2 border-red-500/60 rounded-xl p-6">
            <Crown className="w-12 h-12 text-yellow-400 mx-auto mb-4 animate-pulse" />
            <p className="text-red-400 font-bold text-lg">🔥 SECRET MEMBER DISCOVERED 🔥</p>
            <p className="text-gray-300 mt-2">You found the hidden founder!</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono relative overflow-hidden">
      <MatrixRain />
      
      {/* Enhanced scanlines effect */}
      <div className="fixed inset-0 pointer-events-none z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-500/3 to-transparent animate-pulse"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 0, 0.03) 2px, rgba(0, 255, 0, 0.03) 4px)',
          animation: 'scan 0.1s linear infinite'
        }}></div>
      </div>

      {/* Admin Panel Modal */}
      {showAdminPanel && <AdminPanel />}

      {/* Navigation */}
      <nav className="relative z-20 p-4 border-b border-green-500/30 bg-black/90 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Shield className="w-10 h-10 text-cyan-400" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            </div>
            <div>
              <span className="text-2xl font-bold text-white">freep0nx</span>
              <span className="text-sm text-green-400 ml-2">Elite Team</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            {['home', 'terminal', 'team', 'validate'].map((section) => (
              <button
                key={section}
                onClick={() => setCurrentSection(section)}
                className={`px-5 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                  currentSection === section
                    ? 'bg-green-500/20 text-green-400 shadow-lg shadow-green-500/20 border border-green-500/30'
                    : 'text-gray-400 hover:text-green-400 hover:bg-green-500/10'
                }`}
              >
                {section === 'home' && <Shield className="w-4 h-4 inline mr-2" />}
                {section === 'terminal' && <Terminal className="w-4 h-4 inline mr-2" />}
                {section === 'team' && <Users className="w-4 h-4 inline mr-2" />}
                {section === 'validate' && <Flag className="w-4 h-4 inline mr-2" />}
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
            
            {/* Admin button */}
            <button
              onClick={() => setShowAdminPanel(true)}
              className="px-4 py-2 bg-red-500/20 text-red-400 border border-red-500/40 rounded-lg hover:bg-red-500/30 transition-all duration-300 transform hover:scale-105"
            >
              <Lock className="w-4 h-4 inline mr-2" />
              Admin
            </button>
            
            {/* Role display */}
            <div className="flex items-center space-x-2 px-4 py-2 bg-black/60 border border-gray-500/40 rounded-lg">
              <User className="w-4 h-4 text-gray-400" />
              <span className="text-gray-400">Role:</span>
              <span className={`font-bold ${
                userRole === 'admin' ? 'text-red-400' : 
                userRole === 'zeleph' ? 'text-pink-400' : 'text-blue-400'
              }`}>
                {userRole === 'zeleph' ? 'ZELEPH ?! NANI ?!' : userRole}
              </span>
              {userRole === 'admin' && (
                <span className="text-yellow-400 font-mono text-sm ml-2 animate-pulse">
                  {getHiddenFlag(5)}
                </span>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Home Section */}
      {currentSection === 'home' && (
        <div className="relative z-20 max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <div className="mb-8">
              <h1 className="text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-cyan-400 to-purple-400 animate-pulse">
                freep0nx
              </h1>
              <div className="flex justify-center items-center space-x-4 mb-6">
                <div className="h-px bg-gradient-to-r from-transparent via-green-500 to-transparent flex-1"></div>
                <Shield className="w-8 h-8 text-cyan-400" />
                <div className="h-px bg-gradient-to-r from-transparent via-green-500 to-transparent flex-1"></div>
              </div>
              <p className="text-2xl text-gray-300 mb-8">Elite CTF Team - Breaking Systems Since Day One</p>
            </div>
            
            {/* Search functionality */}
            <div className="max-w-3xl mx-auto mb-12">
              <form onSubmit={handleSearch} className="mb-6">
                <div className="flex shadow-2xl shadow-green-500/20">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search our knowledge base... (try XSS payloads)"
                    className="flex-1 px-6 py-4 bg-black/70 border-2 border-green-500/40 rounded-l-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-500/70 transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-8 py-4 bg-green-500 text-black font-bold rounded-r-xl hover:bg-green-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-500/30"
                  >
                    <Search className="w-5 h-5" />
                  </button>
                </div>
              </form>
              
              {/* Search Results */}
              {showSearchResults && (
                <div className="bg-black/70 border-2 border-green-500/40 rounded-xl p-8 shadow-2xl shadow-green-500/20 backdrop-blur-sm">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                    <Search className="w-6 h-6 mr-3 text-green-400" />
                    Search Results for: <span className="text-green-400 ml-2" dangerouslySetInnerHTML={{__html: searchQuery}}></span>
                  </h3>
                  
                  {searchResults.length > 0 ? (
                    <div className="space-y-4">
                      {searchResults.map((result, index) => (
                        <div key={index} className="border-b border-gray-700/50 pb-4 last:border-b-0 hover:bg-green-500/5 p-3 rounded-lg transition-colors">
                          <h4 className="text-cyan-400 font-semibold text-lg">{result.title}</h4>
                          <p className="text-gray-300">{result.description}</p>
                          <span className="text-green-400 text-sm">{result.url}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400">No results found for your search query.</p>
                  )}
                  
                  <button
                    onClick={() => setShowSearchResults(false)}
                    className="mt-6 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-300 transform hover:scale-105"
                  >
                    Close Results
                  </button>
                </div>
              )}
            </div>
            
            <div className="flex justify-center space-x-6 mb-16">
              <button 
                onClick={() => setCurrentSection('terminal')}
                className="px-10 py-5 bg-gradient-to-r from-green-500 to-cyan-500 text-black font-bold rounded-xl hover:from-green-600 hover:to-cyan-600 transform hover:scale-105 transition-all duration-300 shadow-2xl shadow-green-500/40"
              >
                <Terminal className="w-6 h-6 inline mr-3" />
                Launch Terminal
              </button>
              
              <button 
                onClick={() => setCurrentSection('validate')}
                className="px-10 py-5 bg-gradient-to-r from-yellow-500 to-red-500 text-black font-bold rounded-xl hover:from-yellow-600 hover:to-red-600 transform hover:scale-105 transition-all duration-300 shadow-2xl shadow-yellow-500/40"
              >
                <Flag className="w-6 h-6 inline mr-3" />
                Submit Flags
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-black/60 border-2 border-green-500/40 rounded-xl p-8 hover:border-green-500/60 transition-all duration-300 transform hover:scale-105 shadow-xl shadow-green-500/20">
              <Zap className="w-16 h-16 text-yellow-400 mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Elite Skills</h3>
              <p className="text-gray-300">Web exploitation, reverse engineering, forensics, and more</p>
              <div className="mt-4 text-sm text-gray-500">💡 Check robots.txt for secrets</div>
            </div>
            
            <div className="bg-black/60 border-2 border-cyan-500/40 rounded-xl p-8 hover:border-cyan-500/60 transition-all duration-300 transform hover:scale-105 shadow-xl shadow-cyan-500/20">
              <Shield className="w-16 h-16 text-cyan-400 mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">CTF Champions</h3>
              <p className="text-gray-300">Competing in the world's most challenging cybersecurity contests</p>
              <div className="mt-4 text-sm text-gray-500">💡 Inspect element for hidden clues</div>
            </div>
            
            <div className="bg-black/60 border-2 border-purple-500/40 rounded-xl p-8 hover:border-purple-500/60 transition-all duration-300 transform hover:scale-105 shadow-xl shadow-purple-500/20">
              <Github className="w-16 h-16 text-purple-400 mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Open Source</h3>
              <p className="text-gray-300">Contributing to the security community through shared knowledge</p>
              <div className="mt-4 text-sm text-gray-500">💡 Try the terminal for privilege escalation</div>
            </div>
          </div>

          <div className="text-center">
            <a 
              href="https://ctftime.org/team/361758/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-orange-500 text-black font-bold rounded-xl hover:bg-orange-600 transform hover:scale-105 transition-all duration-300 shadow-2xl shadow-orange-500/40"
            >
              <ExternalLink className="w-6 h-6 mr-3" />
              View on CTFtime
            </a>
          </div>
          
          {/* Hidden flag in source code */}
          {/* freep0nx{1nsp3ct_3l3m3nt_pr0} */}
        </div>
      )}

      {/* Terminal Section */}
      {currentSection === 'terminal' && (
        <div className="relative z-20 max-w-6xl mx-auto px-4 py-8">
          <div className="bg-black/95 border-2 border-green-500/60 rounded-xl p-8 shadow-2xl shadow-green-500/30">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                <div className="w-4 h-4 bg-yellow-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>
              <span className="text-gray-400 text-sm flex items-center">
                <Terminal className="w-4 h-4 mr-2" />
                hacker@freep0nx:{terminalState.currentDir}$
              </span>
            </div>
            
            <div 
              ref={terminalRef}
              className="h-96 overflow-y-auto mb-6 p-6 bg-black/70 rounded-lg border border-green-500/30"
            >
              <div className="text-green-400 mb-2 font-bold">
                Welcome to freep0nx terminal v2.1.0
              </div>
              <div className="text-gray-400 mb-4">Type 'help' for available commands</div>
              <div className="text-yellow-400 mb-4">💡 Current directory: {terminalState.currentDir}</div>
              <div className="text-cyan-400 mb-6">🔍 Hint: Try 'ls -la' to see hidden files, explore /opt for tools</div>
              
              {terminalHistory.map((cmd, index) => (
                <div key={index} className="mb-4">
                  <div className="text-cyan-400 flex items-center">
                    <span className="text-green-400 mr-2">$</span> 
                    <span>{cmd.input}</span>
                  </div>
                  {cmd.output.map((line, lineIndex) => (
                    <div key={lineIndex} className="text-gray-300 ml-4 font-mono">
                      {line}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            
            <div className="flex items-center bg-black/50 rounded-lg p-3 border border-green-500/30">
              <span className="text-green-400 mr-3 font-bold">$</span>
              <input
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 bg-transparent text-white outline-none"
                placeholder="Enter command..."
                autoFocus
              />
            </div>
          </div>
        </div>
      )}

      {/* Team Section */}
      {currentSection === 'team' && (
        <div className="relative z-20 max-w-6xl mx-auto px-4 py-8">
          {selectedMemberId !== null ? (
            <MemberProfile 
              member={selectedMemberId === 1 ? secretMember : teamMembers[selectedMemberId - 2]} 
              memberId={selectedMemberId}
            />
          ) : (
            <>
              <div className="text-center mb-16">
                <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400 mb-6">
                  Meet the Team
                </h2>
                <div className="flex justify-center items-center space-x-4 mb-6">
                  <div className="h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent flex-1 max-w-32"></div>
                  <Users className="w-8 h-8 text-cyan-400" />
                  <div className="h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent flex-1 max-w-32"></div>
                </div>
                <p className="text-2xl text-gray-300">19 Elite Hackers United</p>
                <div className="mt-4 text-sm text-gray-500">💡 Try accessing member profiles with ?member=ID</div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {teamMembers.map((member, index) => {
                  const memberId = index + 2; // Start from ID 2
                  return (
                    <div
                      key={index}
                      className="bg-black/70 border-2 border-purple-500/40 rounded-xl p-8 hover:border-purple-500/70 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-purple-500/30 backdrop-blur-sm cursor-pointer group"
                      onClick={() => {
                        setSelectedMemberId(memberId);
                        window.history.pushState({}, '', `?member=${memberId}`);
                      }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                          member.rank === 'Chef' 
                            ? 'bg-red-500/20 text-red-400 border-2 border-red-500/40' 
                            : 'bg-blue-500/20 text-blue-400 border-2 border-blue-500/40'
                        }`}>
                          {member.rank}
                        </span>
                        <div className="flex items-center space-x-2">
                          <span className="text-gray-400 text-sm font-mono">ID: {memberId}</span>
                          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors" />
                        </div>
                      </div>
                      
                      <div className="text-center mb-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full mx-auto mb-3 flex items-center justify-center">
                          <User className="w-8 h-8 text-white" />
                        </div>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-white mb-3 text-center">{member.pseudo}</h3>
                      <p className="text-cyan-400 mb-4 font-semibold text-center">{member.speciality}</p>
                      <p className="text-gray-400 text-sm text-center">{member.description}</p>
                      
                      <div className="mt-4 text-center">
                        <span className="text-purple-400 text-sm font-semibold group-hover:text-purple-300 transition-colors">
                          Click to view profile →
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="text-center mt-12">
                <p className="text-gray-400 text-sm">
                  💡 Tip: Check out individual member profiles for more details
                </p>
              </div>
            </>
          )}
        </div>
      )}

      {/* Validation Section */}
      {currentSection === 'validate' && <ValidationPage />}

      <style jsx>{`
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
      `}</style>
    </div>
  );
}

export default App;