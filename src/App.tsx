import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Shield, Eye, EyeOff, Lock, Crown, Flag } from 'lucide-react';

interface Command {
  input: string;
  output: string[];
  timestamp: Date;
}

const App: React.FC = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Command[]>([]);
  const [currentPath, setCurrentPath] = useState('/home/user');
  const [showPassword, setShowPassword] = useState(false);
  const [flagInput, setFlagInput] = useState('');
  const [masterFlagInput, setMasterFlagInput] = useState('');
  const [foundFlags, setFoundFlags] = useState<string[]>([]);
  const [foundMasterFlags, setFoundMasterFlags] = useState<string[]>([]);
  const [showMasterValidator, setShowMasterValidator] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  const validFlags = [
    'freep0nx{1nsp3ct_3l3m3nt_pr0}',
    'freep0nx{r0b0ts_txt_1s_y0ur_fr13nd}',
    'freep0nx{v3ry_s3cr3t_fl4g}',
    'freep0nx{1d0r_4tt4ck_succ3ss}'
  ];

  const masterFlags = [
    'freep0nx{r00t_pr1v3sc_m4st3r}',
    'freep0nx{h1dd3n_s3rv1c3_d1sc0v3ry}',
    'freep0nx{c0nf1g_f1l3_l34k}',
    'freep0nx{d33p_w3b_s3cr3ts}'
  ];

  const fileSystem = {
    '/': {
      type: 'directory',
      contents: ['home', 'etc', 'var', 'usr', 'opt', 'root', 'tmp']
    },
    '/home': {
      type: 'directory',
      contents: ['user']
    },
    '/home/user': {
      type: 'directory',
      contents: ['documents', 'downloads', '.bashrc', '.ssh']
    },
    '/home/user/documents': {
      type: 'directory',
      contents: ['notes.txt', 'backup.tar.gz']
    },
    '/home/user/downloads': {
      type: 'directory',
      contents: ['exploit.py', 'wordlist.txt']
    },
    '/home/user/.ssh': {
      type: 'directory',
      contents: ['id_rsa', 'known_hosts', 'config']
    },
    '/etc': {
      type: 'directory',
      contents: ['passwd', 'shadow', 'hosts', 'crontab', 'services']
    },
    '/etc/passwd': {
      type: 'file',
      content: `root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
bin:x:2:2:bin:/bin:/usr/sbin/nologin
sys:x:3:3:sys:/dev:/usr/sbin/nologin
sync:x:4:65534:sync:/bin:/bin/sync
games:x:5:60:games:/usr/games:/usr/sbin/nologin
man:x:6:12:man:/var/cache/man:/usr/sbin/nologin
lp:x:7:7:lp:/var/spool/lpd:/usr/sbin/nologin
mail:x:8:8:mail:/var/mail:/usr/sbin/nologin
news:x:9:9:news:/var/spool/news:/usr/sbin/nologin
user:x:1000:1000:user:/home/user:/bin/bash
service:x:1001:1001:service:/home/service:/bin/bash`
    },
    '/etc/shadow': {
      type: 'file',
      content: 'cat: /etc/shadow: Permission denied'
    },
    '/etc/crontab': {
      type: 'file',
      content: `# /etc/crontab: system-wide crontab
SHELL=/bin/sh
PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin

# m h dom mon dow user  command
17 *    * * *   root    cd / && run-parts --report /etc/cron.hourly
25 6    * * *   root    test -x /usr/sbin/anacron || ( cd / && run-parts --report /etc/cron.daily )
47 6    * * 7   root    test -x /usr/sbin/anacron || ( cd / && run-parts --report /etc/cron.weekly )
52 6    1 * *   root    test -x /usr/sbin/anacron || ( cd / && run-parts --report /etc/cron.monthly )
*/5 *   * * *   root    /usr/local/bin/backup.sh > /dev/null 2>&1
0 2     * * *   service /home/service/cleanup.sh`
    },
    '/var': {
      type: 'directory',
      contents: ['log', 'www', 'lib', 'tmp']
    },
    '/var/log': {
      type: 'directory',
      contents: ['auth.log', 'syslog', 'apache2']
    },
    '/var/www': {
      type: 'directory',
      contents: ['html', 'backup']
    },
    '/var/www/backup': {
      type: 'directory',
      contents: ['config.bak', 'database.sql']
    },
    '/var/www/backup/config.bak': {
      type: 'file',
      content: `# Database Configuration
DB_HOST=localhost
DB_USER=admin
DB_PASS=sup3r_s3cr3t_p4ssw0rd
DB_NAME=production

# API Keys
API_SECRET=freep0nx{c0nf1g_f1l3_l34k}
JWT_SECRET=very_secret_key_here

# Admin Panel
ADMIN_USER=administrator
ADMIN_PASS=4dm1n_p4ss_2024`
    },
    '/usr': {
      type: 'directory',
      contents: ['bin', 'local', 'share']
    },
    '/usr/local': {
      type: 'directory',
      contents: ['bin']
    },
    '/usr/local/bin': {
      type: 'directory',
      contents: ['backup.sh', 'service_check.py']
    },
    '/usr/local/bin/backup.sh': {
      type: 'file',
      content: `#!/bin/bash
# Backup script - runs as root via cron
# freep0nx{r00t_pr1v3sc_m4st3r}

if [ "$EUID" -eq 0 ]; then
    echo "Running backup as root..."
    tar -czf /var/backups/system_$(date +%Y%m%d).tar.gz /etc /home
    chmod 600 /var/backups/system_*.tar.gz
else
    echo "This script must be run as root"
    exit 1
fi`
    },
    '/opt': {
      type: 'directory',
      contents: ['hidden_service']
    },
    '/opt/hidden_service': {
      type: 'directory',
      contents: ['config.json', 'service.py', '.env']
    },
    '/opt/hidden_service/.env': {
      type: 'file',
      content: `# Hidden Service Configuration
SERVICE_PORT=8080
SECRET_KEY=freep0nx{h1dd3n_s3rv1c3_d1sc0v3ry}
DEBUG=false
ADMIN_TOKEN=hidden_admin_token_2024`
    },
    '/root': {
      type: 'directory',
      contents: ['Permission denied']
    },
    '/tmp': {
      type: 'directory',
      contents: ['.hidden_data']
    },
    '/tmp/.hidden_data': {
      type: 'file',
      content: `Deep web access logs:
- Tor hidden service: 3g2upl4pq6kufc4m.onion
- Access key: freep0nx{d33p_w3b_s3cr3ts}
- Last accessed: 2024-01-15 03:42:17`
    }
  };

  const executeCommand = (cmd: string): string[] => {
    const parts = cmd.trim().split(' ');
    const command = parts[0];
    const args = parts.slice(1);

    switch (command) {
      case 'ls':
        const path = args[0] || currentPath;
        const targetPath = path.startsWith('/') ? path : `${currentPath}/${path}`;
        const normalizedPath = targetPath.replace(/\/+/g, '/').replace(/\/$/, '') || '/';
        
        if (fileSystem[normalizedPath]?.type === 'directory') {
          if (normalizedPath === '/root' && currentPath !== '/root') {
            return ['ls: cannot open directory \'/root\': Permission denied'];
          }
          return fileSystem[normalizedPath].contents || [];
        }
        return [`ls: cannot access '${path}': No such file or directory`];

      case 'cd':
        const newPath = args[0] || '/home/user';
        const targetDir = newPath.startsWith('/') ? newPath : `${currentPath}/${newPath}`;
        const normalizedDir = targetDir.replace(/\/+/g, '/').replace(/\/$/, '') || '/';
        
        if (normalizedDir === '/root' && currentPath !== '/root') {
          return ['cd: /root: Permission denied'];
        }
        
        if (fileSystem[normalizedDir]?.type === 'directory') {
          setCurrentPath(normalizedDir);
          return [`Changed directory to ${normalizedDir}`];
        }
        return [`cd: ${newPath}: No such file or directory`];

      case 'pwd':
        return [currentPath];

      case 'cat':
        if (!args[0]) return ['cat: missing file operand'];
        const filePath = args[0].startsWith('/') ? args[0] : `${currentPath}/${args[0]}`;
        const normalizedFile = filePath.replace(/\/+/g, '/');
        
        if (fileSystem[normalizedFile]?.type === 'file') {
          return fileSystem[normalizedFile].content.split('\n');
        }
        return [`cat: ${args[0]}: No such file or directory`];

      case 'sudo':
        if (args[0] === 'cat' && args[1] === '/usr/local/bin/backup.sh') {
          return fileSystem['/usr/local/bin/backup.sh'].content.split('\n');
        }
        if (args[0] === 'ls' && args[1] === '/root') {
          return ['flag.txt', '.bash_history', 'admin_notes.txt'];
        }
        if (args[0] === 'cat' && args[1] === '/root/flag.txt') {
          return ['freep0nx{r00t_pr1v3sc_m4st3r}'];
        }
        return ['sudo: command not found or permission denied'];

      case 'find':
        if (args.includes('-name') && args.includes('*.env')) {
          return ['/opt/hidden_service/.env'];
        }
        if (args.includes('-name') && args.includes('*secret*')) {
          return ['/var/www/backup/config.bak', '/opt/hidden_service/.env'];
        }
        if (args.includes('-perm') && args.includes('4755')) {
          return ['/usr/local/bin/backup.sh'];
        }
        return ['find: no results found'];

      case 'ps':
        return [
          'PID TTY          TIME CMD',
          '1234 pts/0    00:00:01 bash',
          '5678 pts/0    00:00:00 hidden_service',
          '9012 pts/0    00:00:00 ps'
        ];

      case 'netstat':
        return [
          'Active Internet connections',
          'Proto Recv-Q Send-Q Local Address           Foreign Address         State',
          'tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN',
          'tcp        0      0 127.0.0.1:8080          0.0.0.0:*               LISTEN',
          'tcp        0      0 0.0.0.0:80              0.0.0.0:*               LISTEN'
        ];

      case 'whoami':
        return ['user'];

      case 'id':
        return ['uid=1000(user) gid=1000(user) groups=1000(user),4(adm),24(cdrom),27(sudo)'];

      case 'clear':
        setHistory([]);
        return [];

      case 'help':
        return [
          'Available commands:',
          'ls [path] - list directory contents',
          'cd [path] - change directory',
          'pwd - print working directory',
          'cat [file] - display file contents',
          'sudo [command] - execute command as root',
          'find [options] - search for files',
          'ps - show running processes',
          'netstat - show network connections',
          'whoami - show current user',
          'id - show user and group IDs',
          'clear - clear terminal',
          'help - show this help message'
        ];

      default:
        return [`${command}: command not found`];
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const output = executeCommand(input);
    const newCommand: Command = {
      input,
      output,
      timestamp: new Date()
    };

    setHistory(prev => [...prev, newCommand]);
    setInput('');
  };

  const validateFlag = () => {
    if (validFlags.includes(flagInput)) {
      if (!foundFlags.includes(flagInput)) {
        setFoundFlags(prev => [...prev, flagInput]);
      }
      setFlagInput('');
    }
  };

  const validateMasterFlag = () => {
    if (masterFlags.includes(masterFlagInput)) {
      if (!foundMasterFlags.includes(masterFlagInput)) {
        setFoundMasterFlags(prev => [...prev, masterFlagInput]);
      }
      setMasterFlagInput('');
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      {/* Header */}
      <header className="bg-black/50 backdrop-blur-sm border-b border-purple-500/30">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8 text-purple-400" />
              <h1 className="text-2xl font-bold text-white">Team freep0nx</h1>
              <span className="text-purple-300 text-sm">Elite CTF Team</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-green-400 text-sm">
                Flags: {foundFlags.length}/{validFlags.length}
              </div>
              <div className="text-yellow-400 text-sm">
                Master: {foundMasterFlags.length}/{masterFlags.length}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Terminal */}
          <div className="bg-black/80 backdrop-blur-sm rounded-lg border border-green-500/30 overflow-hidden">
            <div className="bg-green-500/20 px-4 py-2 border-b border-green-500/30">
              <div className="flex items-center space-x-2">
                <Terminal className="w-4 h-4 text-green-400" />
                <span className="text-green-400 font-mono text-sm">freep0nx@terminal</span>
              </div>
            </div>
            
            <div 
              ref={terminalRef}
              className="h-96 overflow-y-auto p-4 font-mono text-sm"
            >
              {history.map((cmd, index) => (
                <div key={index} className="mb-2">
                  <div className="text-green-400">
                    <span className="text-purple-400">user@freep0nx</span>
                    <span className="text-white">:</span>
                    <span className="text-blue-400">{currentPath}</span>
                    <span className="text-white">$ {cmd.input}</span>
                  </div>
                  {cmd.output.map((line, lineIndex) => (
                    <div key={lineIndex} className="text-gray-300 ml-2">
                      {line}
                    </div>
                  ))}
                </div>
              ))}
              
              <form onSubmit={handleSubmit} className="flex items-center">
                <span className="text-purple-400">user@freep0nx</span>
                <span className="text-white">:</span>
                <span className="text-blue-400">{currentPath}</span>
                <span className="text-white">$ </span>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-transparent text-green-400 outline-none ml-1"
                  autoFocus
                />
              </form>
            </div>
          </div>

          {/* Challenge Info */}
          <div className="space-y-6">
            <div className="bg-black/60 backdrop-blur-sm rounded-lg border border-purple-500/30 p-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <Flag className="w-5 h-5 mr-2 text-purple-400" />
                CTF Challenges
              </h2>
              <div className="space-y-3 text-gray-300">
                <div className="flex items-center justify-between">
                  <span>🔍 Source Code Analysis</span>
                  <span className={foundFlags.includes('freep0nx{1nsp3ct_3l3m3nt_pr0}') ? 'text-green-400' : 'text-gray-500'}>
                    {foundFlags.includes('freep0nx{1nsp3ct_3l3m3nt_pr0}') ? '✓' : '○'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>🤖 Web Crawling</span>
                  <span className={foundFlags.includes('freep0nx{r0b0ts_txt_1s_y0ur_fr13nd}') ? 'text-green-400' : 'text-gray-500'}>
                    {foundFlags.includes('freep0nx{r0b0ts_txt_1s_y0ur_fr13nd}') ? '✓' : '○'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>📁 Directory Traversal</span>
                  <span className={foundFlags.includes('freep0nx{v3ry_s3cr3t_fl4g}') ? 'text-green-400' : 'text-gray-500'}>
                    {foundFlags.includes('freep0nx{v3ry_s3cr3t_fl4g}') ? '✓' : '○'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>🔐 Access Control</span>
                  <span className={foundFlags.includes('freep0nx{1d0r_4tt4ck_succ3ss}') ? 'text-green-400' : 'text-gray-500'}>
                    {foundFlags.includes('freep0nx{1d0r_4tt4ck_succ3ss}') ? '✓' : '○'}
                  </span>
                </div>
              </div>
            </div>

            {/* Flag Validator */}
            <div className="bg-black/60 backdrop-blur-sm rounded-lg border border-green-500/30 p-6">
              <h3 className="text-lg font-bold text-white mb-4">Flag Validator</h3>
              <div className="flex space-x-2">
                <div className="relative flex-1">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={flagInput}
                    onChange={(e) => setFlagInput(e.target.value)}
                    placeholder="Enter flag here..."
                    className="w-full bg-gray-800/50 border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-400 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <button
                  onClick={validateFlag}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors"
                >
                  Submit
                </button>
              </div>
              
              {foundFlags.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-green-400 font-semibold mb-2">Found Flags:</h4>
                  <div className="space-y-1">
                    {foundFlags.map((flag, index) => (
                      <div key={index} className="text-green-300 font-mono text-sm bg-green-900/20 px-2 py-1 rounded">
                        {flag}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Terminal Hints */}
            <div className="bg-black/60 backdrop-blur-sm rounded-lg border border-blue-500/30 p-6">
              <h3 className="text-lg font-bold text-white mb-4">Terminal Hints</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <p>• Use <code className="bg-gray-800 px-1 rounded">ls</code> to list files and directories</p>
                <p>• Use <code className="bg-gray-800 px-1 rounded">cd</code> to navigate directories</p>
                <p>• Use <code className="bg-gray-800 px-1 rounded">cat</code> to read file contents</p>
                <p>• Try <code className="bg-gray-800 px-1 rounded">find</code> to search for files</p>
                <p>• Some commands may require elevated privileges...</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Master Flag Validator - Hidden at bottom */}
      <div className="mt-16 pb-8">
        <div className="container mx-auto px-6">
          <div className="text-center mb-4">
            <button
              onClick={() => setShowMasterValidator(!showMasterValidator)}
              className="text-gray-600 hover:text-gray-400 text-xs transition-colors"
            >
              {showMasterValidator ? '▼' : '▶'} Advanced Challenges
            </button>
          </div>
          
          {showMasterValidator && (
            <div className="max-w-md mx-auto bg-black/80 backdrop-blur-sm rounded-lg border border-yellow-500/30 p-6">
              <h3 className="text-lg font-bold text-yellow-400 mb-4 flex items-center justify-center">
                <Crown className="w-5 h-5 mr-2" />
                Master Flag Validator
              </h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Root Privesc</span>
                    <span className={foundMasterFlags.includes('freep0nx{r00t_pr1v3sc_m4st3r}') ? 'text-green-400' : 'text-gray-600'}>
                      {foundMasterFlags.includes('freep0nx{r00t_pr1v3sc_m4st3r}') ? '✓' : '○'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Service Discovery</span>
                    <span className={foundMasterFlags.includes('freep0nx{h1dd3n_s3rv1c3_d1sc0v3ry}') ? 'text-green-400' : 'text-gray-600'}>
                      {foundMasterFlags.includes('freep0nx{h1dd3n_s3rv1c3_d1sc0v3ry}') ? '✓' : '○'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Config Leak</span>
                    <span className={foundMasterFlags.includes('freep0nx{c0nf1g_f1l3_l34k}') ? 'text-green-400' : 'text-gray-600'}>
                      {foundMasterFlags.includes('freep0nx{c0nf1g_f1l3_l34k}') ? '✓' : '○'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Deep Web</span>
                    <span className={foundMasterFlags.includes('freep0nx{d33p_w3b_s3cr3ts}') ? 'text-green-400' : 'text-gray-600'}>
                      {foundMasterFlags.includes('freep0nx{d33p_w3b_s3cr3ts}') ? '✓' : '○'}
                    </span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <input
                    type="password"
                    value={masterFlagInput}
                    onChange={(e) => setMasterFlagInput(e.target.value)}
                    placeholder="Master flag..."
                    className="flex-1 bg-gray-800/50 border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-400 text-sm"
                  />
                  <button
                    onClick={validateMasterFlag}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded transition-colors text-sm"
                  >
                    <Lock className="w-4 h-4" />
                  </button>
                </div>

                {foundMasterFlags.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-yellow-400 font-semibold mb-2 text-sm">Master Flags:</h4>
                    <div className="space-y-1">
                      {foundMasterFlags.map((flag, index) => (
                        <div key={index} className="text-yellow-300 font-mono text-xs bg-yellow-900/20 px-2 py-1 rounded">
                          {flag}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {foundMasterFlags.length === masterFlags.length && (
                  <div className="text-center text-yellow-400 font-bold text-sm">
                    🏆 MASTER HACKER ACHIEVED! 🏆
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;