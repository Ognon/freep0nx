import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Shield, Eye, EyeOff, Lock, Crown, Flag, Users, Trophy, ExternalLink, Star, Zap, Target, Code, Network, Search, Key, Database, Cpu, Download, Award, Sparkles } from 'lucide-react';

interface Command {
  input: string;
  output: string[];
  timestamp: Date;
}

interface Member {
  rank: string;
  pseudo: string;
  speciality: string;
  description: string;
  hidden?: boolean;
}

const App: React.FC = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Command[]>([]);
  const [currentPath, setCurrentPath] = useState('/home/user');
  const [showPassword, setShowPassword] = useState(false);
  const [flagInput, setFlagInput] = useState('');
  const [masterFlagInput, setMasterFlagInput] = useState('');
  const [foundFlags, setFoundFlags] = useState<string[]>(() => {
    const saved = localStorage.getItem('freep0nx_flags');
    return saved ? JSON.parse(saved) : [];
  });
  const [foundMasterFlags, setFoundMasterFlags] = useState<string[]>(() => {
    const saved = localStorage.getItem('freep0nx_master_flags');
    return saved ? JSON.parse(saved) : [];
  });
  const [showMasterValidator, setShowMasterValidator] = useState(false);
  const [showCTF, setShowCTF] = useState(false);
  const [selectedMember, setSelectedMember] = useState<number | null>(null);
  const [userRole, setUserRole] = useState('user');
  const [currentUser, setCurrentUser] = useState('user');
  const [sudoPrivileges, setSudoPrivileges] = useState<string[]>([]);
  const terminalRef = useRef<HTMLDivElement>(null);

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
    { rank: "Membre", pseudo: "Zeleph", speciality: "réseau, animé, foo", description: "Rookie motivé par les animés" },
    // Membre caché pour IDOR
    { rank: "Membre Secret", pseudo: "Gh0st", speciality: "shadow ops, 0day", description: "Le membre fantôme de l'équipe. Spécialiste en exploits 0-day et opérations furtives.", hidden: true }
  ];

  const validFlags = [
    'freep0nx{1nsp3ct_3l3m3nt_pr0}',
    'freep0nx{r0b0ts_txt_1s_y0ur_fr13nd}',
    'freep0nx{v3ry_s3cr3t_fl4g}',
    'freep0nx{1d0r_4tt4ck_succ3ss}',
    'freep0nx{c00k13_m4n1pul4t10n_m4st3r}',
    'freep0nx{Tu_Es_Un_Vrai_Reverseur_Mashallax}'
    'freep0nx{Tu_Es_Un_Vrai_Reverseur_Mashallax}',
    'freep0nx{c00k13_m4n1pul4t10n_m4st3r}',
    'freep0nx{sql_1nj3ct10n_pr0}',
    'freep0nx{l0g_f1l3_4n4lys1s_3xp3rt}'
  ];

  const masterFlags = [
    'freep0nx{r00t_pr1v3sc_m4st3r}',
    'freep0nx{h1dd3n_s3rv1c3_d1sc0v3ry}',
    'freep0nx{c0nf1g_f1l3_l34k}',
    'freep0nx{d33p_w3b_s3cr3ts}',
    'freep0nx{pr1v1l3g3_3sc4l4t10n_g0d}'
  ];

  const fileSystem = {
    '/': {
      type: 'directory',
      contents: ['home', 'etc', 'var', 'usr', 'opt', 'root', 'tmp', 'proc', 'sys'],
      hidden: ['.hidden_root_backup']
    },
    '/.hidden_root_backup': {
      type: 'file',
      content: `# Emergency root backup
# freep0nx{pr1v1l3g3_3sc4l4t10n_g0d}
root:$6$salt$hashedpassword:18000:0:99999:7:::
admin:$6$salt$anotherhash:18000:0:99999:7:::`
    },
    '/home': {
      type: 'directory',
      contents: ['user', 'service'],
      hidden: ['.backup']
    },
    '/home/.backup': {
      type: 'directory',
      contents: ['logs.txt']
    },
    '/home/.backup/logs.txt': {
      type: 'file',
      content: `[2024-01-15 14:32:17] SQL injection attempt detected: ' OR 1=1--
[2024-01-15 14:32:18] Blocked IP: 192.168.1.100
[2024-01-15 14:32:19] Admin login successful from 127.0.0.1
[2024-01-15 14:32:20] Flag accessed: freep0nx{l0g_f1l3_4n4lys1s_3xp3rt}
[2024-01-15 14:32:21] Database query: SELECT * FROM users WHERE id=1337`
    },
    '/home/user': {
      type: 'directory',
      contents: ['documents', 'downloads', '.bashrc', '.ssh'],
      hidden: ['.secret_notes', '.bash_history']
    },
    '/home/user/.secret_notes': {
      type: 'file',
      content: `Personal notes:
- Remember to check /var/log/auth.log for failed logins
- SQL injection payload: admin' OR '1'='1
- Cookie manipulation: document.cookie="admin=true"
- Flag: freep0nx{sql_1nj3ct10n_pr0}`
    },
    '/home/user/.bash_history': {
      type: 'file',
      content: `ls -la
cd /opt/reverse
cat challenge
sudo -l
find / -name "*.log" 2>/dev/null
grep -r "freep0nx" /var/log/
curl -H "Cookie: admin=true" localhost/admin
echo "freep0nx{c00k13_m4n1pul4t10n_m4st3r}" > /tmp/cookie_flag.txt`
    },
    '/home/user/documents': {
      type: 'directory',
      contents: ['notes.txt', 'backup.tar.gz'],
      hidden: ['.private']
    },
    '/home/user/documents/.private': {
      type: 'file',
      content: 'Private documents - access denied'
    },
    '/home/user/downloads': {
      type: 'directory',
      contents: ['exploit.py', 'wordlist.txt']
    },
    '/home/user/.ssh': {
      type: 'directory',
      contents: ['id_rsa', 'known_hosts', 'config']
    },
    '/home/service': {
      type: 'directory',
      contents: ['cleanup.sh', 'config.ini']
    },
    '/etc': {
      type: 'directory',
      contents: ['passwd', 'shadow', 'hosts', 'crontab', 'services', 'sudoers'],
      hidden: ['.backup_config']
    },
    '/etc/.backup_config': {
      type: 'file',
      content: 'Backup configuration - restricted access'
    },
    '/etc/sudoers': {
      type: 'file',
      content: `# User privilege specification
root    ALL=(ALL:ALL) ALL
user    ALL=(ALL) NOPASSWD: /usr/local/bin/backup.sh, /bin/cat /var/log/auth.log
service ALL=(root) /usr/bin/systemctl restart apache2
%admin  ALL=(ALL) ALL
%sudo   ALL=(ALL:ALL) ALL`
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
      contents: ['auth.log', 'syslog', 'apache2', 'mysql.log'],
      hidden: ['.admin_access.log']
    },
    '/var/log/.admin_access.log': {
      type: 'file',
      content: `[2024-01-15 10:30:15] Cookie manipulation detected: admin=true
[2024-01-15 10:30:16] Flag revealed: freep0nx{c00k13_m4n1pul4t10n_m4st3r}
[2024-01-15 10:30:17] Unauthorized admin access granted`
    },
    '/var/log/auth.log': {
      type: 'file',
      content: `Jan 15 10:30:01 server sshd[1234]: Failed password for root from 192.168.1.100 port 22 ssh2
Jan 15 10:30:05 server sshd[1235]: Failed password for admin from 192.168.1.100 port 22 ssh2
Jan 15 10:30:10 server sshd[1236]: Accepted password for user from 192.168.1.50 port 22 ssh2
Jan 15 10:30:15 server sudo: user : TTY=pts/0 ; PWD=/home/user ; USER=root ; COMMAND=/usr/local/bin/backup.sh`
    },
    '/var/log/mysql.log': {
      type: 'file',
      content: `2024-01-15 14:32:17 [Warning] Aborted connection 123 to db: 'production' user: 'webapp' host: 'localhost' (Got an error reading communication packets)
2024-01-15 14:32:18 [Note] SQL injection attempt: SELECT * FROM users WHERE username='admin' OR '1'='1'--' AND password='anything'
2024-01-15 14:32:19 [Error] Access denied for user 'root'@'localhost' (using password: YES)
2024-01-15 14:32:20 [Note] Flag found in query log: freep0nx{sql_1nj3ct10n_pr0}`
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
      contents: ['hidden_service', 'reverse']
    },
    '/opt/reverse': {
      type: 'directory',
      contents: ['challenge', 'README.txt']
    },
    '/opt/reverse/challenge': {
      type: 'file',
      content: 'Binary challenge file - use "download challenge" to get it'
    },
    '/opt/reverse/README.txt': {
      type: 'file',
      content: `Reverse Engineering Challenge

This binary contains a hidden flag. Use your reverse engineering skills to find it!

Hints:
- The flag is encoded in the binary
- Look for string patterns
- Check for XOR operations
- The flag format is freep0nx{...}

Good luck!`
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
      contents: ['.hidden_data'],
      hidden: ['cookie_flag.txt', '.sql_dump']
    },
    '/tmp/cookie_flag.txt': {
      type: 'file',
      content: 'freep0nx{c00k13_m4n1pul4t10n_m4st3r}'
    },
    '/tmp/.sql_dump': {
      type: 'file',
      content: `-- SQL Dump
-- Flag: freep0nx{sql_1nj3ct10n_pr0}
CREATE TABLE users (
    id INT PRIMARY KEY,
    username VARCHAR(50),
    password VARCHAR(100),
    is_admin BOOLEAN DEFAULT FALSE
);

INSERT INTO users VALUES (1, 'admin', 'password123', TRUE);
INSERT INTO users VALUES (2, 'user', 'userpass', FALSE);`
    },
    '/tmp/.hidden_data': {
      type: 'file',
      content: `Deep web access logs:
- Tor hidden service: 3g2upl4pq6kufc4m.onion
- Access key: freep0nx{d33p_w3b_s3cr3ts}
- Last accessed: 2024-01-15 03:42:17`
    },
    '/proc': {
      type: 'directory',
      contents: ['version', 'cpuinfo', 'meminfo']
    },
    '/proc/version': {
      type: 'file',
      content: 'Linux version 5.15.0-freep0nx (gcc version 11.2.0) #1 SMP PREEMPT'
    },
    '/sys': {
      type: 'directory',
      contents: ['class', 'devices']
    }
  };

  const executeCommand = (cmd: string): string[] => {
    const parts = cmd.trim().split(' ');
    const command = parts[0];
    const args = parts.slice(1);

    switch (command) {
      case 'ls':
        const showHidden = args.includes('-a') || args.includes('-la') || args.includes('-al');
        const longFormat = args.includes('-l') || args.includes('-la') || args.includes('-al');
        const pathArg = args.find(arg => !arg.startsWith('-')) || currentPath;
        const targetPath = pathArg.startsWith('/') ? pathArg : `${currentPath}/${pathArg}`;
        const normalizedPath = targetPath.replace(/\/+/g, '/').replace(/\/$/, '') || '/';
        
        if (fileSystem[normalizedPath]?.type === 'directory') {
          if (normalizedPath === '/root' && currentUser !== 'root') {
            return ['ls: cannot open directory \'/root\': Permission denied'];
          }
          
          let contents = [...(fileSystem[normalizedPath].contents || [])];
          if (showHidden && fileSystem[normalizedPath].hidden) {
            contents = [...contents, ...fileSystem[normalizedPath].hidden];
          }
          
          if (longFormat) {
            return contents.map(item => {
              const isHidden = item.startsWith('.');
              const isDir = fileSystem[`${normalizedPath}/${item}`]?.type === 'directory' || 
                           fileSystem[normalizedPath === '/' ? `/${item}` : `${normalizedPath}/${item}`]?.type === 'directory';
              const permissions = isDir ? 'drwxr-xr-x' : '-rw-r--r--';
              const size = isDir ? '4096' : '1024';
              const date = 'Jan 15 10:30';
              return `${permissions} 1 ${currentUser} ${currentUser} ${size} ${date} ${item}`;
            });
          }
          
          return contents;
        }
        return [`ls: cannot access '${pathArg}': No such file or directory`];

      case 'cd':
        const newPath = args[0] || '/home/user';
        const targetDir = newPath.startsWith('/') ? newPath : `${currentPath}/${newPath}`;
        const normalizedDir = targetDir.replace(/\/+/g, '/').replace(/\/$/, '') || '/';
        
        if (normalizedDir === '/root' && currentUser !== 'root') {
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
        if (args[0] === '-l') {
          return [
            'Matching Defaults entries for user on this host:',
            '    env_reset, mail_badpass, secure_path=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin',
            '',
            'User user may run the following commands on this host:',
            '    (ALL) NOPASSWD: /usr/local/bin/backup.sh',
            '    (ALL) NOPASSWD: /bin/cat /var/log/auth.log'
          ];
        }
        
        if (args[0] === 'cat' && args[1] === '/usr/local/bin/backup.sh') {
          return fileSystem['/usr/local/bin/backup.sh'].content.split('\n');
        }
        if (args[0] === 'cat' && args[1] === '/var/log/auth.log') {
          return fileSystem['/var/log/auth.log'].content.split('\n');
        }
        if (args[0] === 'ls' && args[1] === '/root') {
          return ['flag.txt', '.bash_history', 'admin_notes.txt'];
        }
        if (args[0] === 'cat' && args[1] === '/root/flag.txt') {
          return ['freep0nx{r00t_pr1v3sc_m4st3r}'];
        }
        if (args[0] === 'ls' && args[1] === '-l') {
          return [
            'total 12',
            'drwxr-xr-x 2 root root 4096 Jan 15 10:30 .',
            'drwxr-xr-x 3 root root 4096 Jan 15 10:30 ..',
            '-rw------- 1 root root   42 Jan 15 10:30 flag.txt',
            '-rw-r--r-- 1 root root  156 Jan 15 10:30 .bash_history',
            '-rw------- 1 root root  234 Jan 15 10:30 admin_notes.txt'
          ];
        }
        if (args[0] === '/usr/local/bin/backup.sh') {
          return [
            'Running backup as root...',
            'tar: Removing leading `/\' from member names',
            'Backup completed successfully',
            'freep0nx{r00t_pr1v3sc_m4st3r}'
          ];
        }
        return ['sudo: command not found or permission denied'];

      case 'find':
        if (args.includes('-name') && args.includes('*.env')) {
          return ['/opt/hidden_service/.env'];
        }
        if (args.includes('-name') && args.includes('*secret*')) {
          return ['/var/www/backup/config.bak', '/opt/hidden_service/.env', '/home/user/.secret_notes'];
        }
        if (args.includes('-name') && args.includes('*flag*')) {
          return ['/tmp/cookie_flag.txt', '/tmp/.sql_dump'];
        }
        if (args.includes('-name') && args.includes('*.log')) {
          return ['/var/log/auth.log', '/var/log/syslog', '/var/log/mysql.log', '/var/log/.admin_access.log', '/home/.backup/logs.txt'];
        }
        if (args.includes('-perm') && args.includes('4755')) {
          return ['/usr/local/bin/backup.sh'];
        }
        if (args.includes('-name') && args.includes('*flag*')) {
          return ['/root/flag.txt', '/tmp/.hidden_data'];
        }
        return ['find: no results found'];

      case 'download':
        if (args[0] === 'challenge') {
          // Simulate file download
          const link = document.createElement('a');
          link.href = '/challenge';
          link.download = 'challenge';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          return ['Downloading challenge binary...', 'Download complete: challenge'];
        }
        return ['download: file not found'];

      case 'sudo':
        if (args[0] === '-l') {
          return [
            'Matching Defaults entries for user on freep0nx:',
            '    env_reset, mail_badpass, secure_path=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin',
            '',
            'User user may run the following commands on freep0nx:',
            '    (root) NOPASSWD: /usr/local/bin/backup.sh',
            '    (root) /bin/cat /usr/local/bin/backup.sh',
            '    (root) /bin/ls /root'
          ];
        }
        // ... rest of sudo cases

      case 'grep':
        if (args.includes('freep0nx') && args.includes('/var/log/')) {
          return [
            '/var/log/mysql.log:2024-01-15 14:32:20 [Note] Flag found in query log: freep0nx{sql_1nj3ct10n_pr0}',
            '/var/log/.admin_access.log:[2024-01-15 10:30:16] Flag revealed: freep0nx{c00k13_m4n1pul4t10n_m4st3r}'
          ];
        }
        if (args.includes('admin') && args.includes('/etc/passwd')) {
          return ['No matches found'];
        }
        return ['grep: no matches found'];

      case 'ps':
        return [
          'PID TTY          TIME CMD',
          '1234 pts/0    00:00:01 bash',
          '5678 pts/0    00:00:00 hidden_service',
          '9012 pts/0    00:00:00 mysql',
          '9013 pts/0    00:00:00 apache2',
          '9014 pts/0    00:00:00 ps'
        ];

      case 'netstat':
        return [
          'Active Internet connections',
          'Proto Recv-Q Send-Q Local Address           Foreign Address         State',
          'tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN',
          'tcp        0      0 127.0.0.1:8080          0.0.0.0:*               LISTEN',
          'tcp        0      0 0.0.0.0:80              0.0.0.0:*               LISTEN',
          'tcp        0      0 0.0.0.0:3306            0.0.0.0:*               LISTEN'
        ];

      case 'whoami':
        return [currentUser];

      case 'id':
        return [`uid=1000(${currentUser}) gid=1000(${currentUser}) groups=1000(${currentUser}),4(adm),24(cdrom),27(sudo)`];

      case 'download':
        if (args[0] === 'challenge') {
          // Trigger download of the challenge file
          const link = document.createElement('a');
          link.href = '/challenge';
          link.download = 'challenge';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          return ['Downloading challenge file...', 'File saved as: challenge', 'Reverse engineer this binary to find the hidden flag!'];
        }
        return [`download: ${args[0]}: file not found`];

      case 'curl':
        if (args.includes('-H') && args.includes('Cookie:') && args.includes('admin=true')) {
          return [
            'HTTP/1.1 200 OK',
            'Content-Type: text/html',
            '',
            '<h1>Admin Panel Access Granted!</h1>',
            '<p>Welcome, administrator!</p>',
            '<p>Flag: freep0nx{c00k13_m4n1pul4t10n_m4st3r}</p>'
          ];
        }
        return ['curl: command requires proper syntax'];

      case 'mysql':
        if (args.includes('-u') && args.includes('root')) {
          return [
            'ERROR 1045 (28000): Access denied for user \'root\'@\'localhost\' (using password: NO)',
            'Hint: Try SQL injection techniques...'
          ];
        }
        return ['mysql: command not found or access denied'];

      case 'ls':
        const path = args[0] || currentPath;
        const hasAll = args.includes('-a') || args.includes('-la') || args.includes('-al');
        const hasLong = args.includes('-l') || args.includes('-la') || args.includes('-al');
        const targetPath = path.startsWith('/') ? path : `${currentPath}/${path}`;
        const normalizedPath = targetPath.replace(/\/+/g, '/').replace(/\/$/, '') || '/';
        
        if (fileSystem[normalizedPath]?.type === 'directory') {
          if (normalizedPath === '/root' && currentPath !== '/root') {
            return ['ls: cannot open directory \'/root\': Permission denied'];
          }
          let contents = fileSystem[normalizedPath].contents || [];
          
          // Add hidden files if -a flag is used
          if (hasAll) {
            if (normalizedPath === '/home/user') {
              contents = ['.', '..', '.bashrc', '.ssh', '.hidden_config', 'documents', 'downloads'];
            } else if (normalizedPath === '/') {
              contents = ['.', '..', '.hidden_system', 'home', 'etc', 'var', 'usr', 'opt', 'root', 'tmp'];
            }
          }
          
          if (hasLong) {
            return contents.map(item => {
              if (item.startsWith('.') && item !== '.' && item !== '..') {
                return `drwx------ 2 user user 4096 Jan 15 10:30 ${item}`;
              }
              return `drwxr-xr-x 2 user user 4096 Jan 15 10:30 ${item}`;
            });
          }
          
          return contents;
        }
        return [`ls: cannot access '${path}': No such file or directory`];

      case 'clear':
        setHistory([]);
        return [];

      case 'help':
        return [
          'Available commands:',
          'ls [options] [path] - list directory contents (-a for hidden files, -l for long format)',
          'cd [path] - change directory',
          'pwd - print working directory',
          'cat [file] - display file contents',
          'sudo [command] - execute command as root',
          'sudo -l - list sudo privileges',
          'find [options] - search for files',
          'grep [pattern] [files] - search text patterns',
          'ps - show running processes',
          'netstat - show network connections',
          'curl [options] - make HTTP requests',
          'mysql [options] - connect to MySQL database',
          'whoami - show current user',
          'id - show user and group IDs',
          'download [file] - download files',
          'download [file] - download files',
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
        const newFlags = [...foundFlags, flagInput];
        setFoundFlags(newFlags);
        localStorage.setItem('freep0nx_flags', JSON.stringify(newFlags));
      }
      setFlagInput('');
    }
  };

  const validateMasterFlag = () => {
    if (masterFlags.includes(masterFlagInput)) {
      if (!foundMasterFlags.includes(masterFlagInput)) {
        const newMasterFlags = [...foundMasterFlags, masterFlagInput];
        setFoundMasterFlags(newMasterFlags);
        localStorage.setItem('freep0nx_master_flags', JSON.stringify(newMasterFlags));
      }
      setMasterFlagInput('');
    }
  };

  const getSpecialityIcon = (speciality: string) => {
    if (speciality.includes('web')) return <Code className="w-4 h-4" />;
    if (speciality.includes('reverse') || speciality.includes('rev')) return <Cpu className="w-4 h-4" />;
    if (speciality.includes('crypto')) return <Key className="w-4 h-4" />;
    if (speciality.includes('forensic')) return <Search className="w-4 h-4" />;
    if (speciality.includes('osint')) return <Target className="w-4 h-4" />;
    if (speciality.includes('réseau') || speciality.includes('network')) return <Network className="w-4 h-4" />;
    if (speciality.includes('pwn')) return <Zap className="w-4 h-4" />;
    if (speciality.includes('boot2root')) return <Shield className="w-4 h-4" />;
    return <Star className="w-4 h-4" />;
  };

  // Cookie management
  useEffect(() => {
    // Set default cookie if not exists
    const existingRole = document.cookie
      .split('; ')
      .find(row => row.startsWith('role='))
      ?.split('=')[1];
    
    if (!existingRole) {
      document.cookie = 'role=user; path=/';
      setUserRole('user');
    } else {
      setUserRole(existingRole);
    }

    // Check for admin cookie
    if (existingRole === 'admin' && !foundFlags.includes('freep0nx{c00k13_m4n1pul4t10n_m4st3r}')) {
      setFoundFlags(prev => [...prev, 'freep0nx{c00k13_m4n1pul4t10n_m4st3r}']);
    }
  }, []);

  // Monitor cookie changes
  useEffect(() => {
    const checkCookie = () => {
      const role = document.cookie
        .split('; ')
        .find(row => row.startsWith('role='))
        ?.split('=')[1] || 'user';
      
      if (role !== userRole) {
        setUserRole(role);
        if (role === 'admin' && !foundFlags.includes('freep0nx{c00k13_m4n1pul4t10n_m4st3r}')) {
          setFoundFlags(prev => [...prev, 'freep0nx{c00k13_m4n1pul4t10n_m4st3r}']);
        }
      }
    };

    const interval = setInterval(checkCookie, 1000);
    return () => clearInterval(interval);
  }, [userRole, foundFlags]);

  // IDOR vulnerability - check URL parameter
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const memberId = urlParams.get('member_id');
    
    if (memberId === '1337' && !foundFlags.includes('freep0nx{1d0r_4tt4ck_succ3ss}')) {
      // Show hidden member
      console.log('IDOR vulnerability exploited! Hidden member revealed.');
      setSelectedMember(teamMembers.length - 1); // Last member is hidden
    }
  }, []);

  // Cookie challenge
  useEffect(() => {
    const checkCookie = () => {
      if (document.cookie.includes('admin=true') && !foundFlags.includes('freep0nx{c00k13_m4n1pul4t10n_m4st3r}')) {
        const newFlags = [...foundFlags, 'freep0nx{c00k13_m4n1pul4t10n_m4st3r}'];
        setFoundFlags(newFlags);
        localStorage.setItem('freep0nx_flags', JSON.stringify(newFlags));
        console.log('Cookie manipulation detected! Flag found: freep0nx{c00k13_m4n1pul4t10n_m4st3r}');
      }
    };

    const interval = setInterval(checkCookie, 1000);
    return () => clearInterval(interval);
  }, [foundFlags]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      {/* Hero Section */}
      <header className="relative overflow-hidden bg-gradient-to-br from-purple-900/50 via-indigo-900/50 to-pink-900/50">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        {/* User Role Indicator - Subtle but discoverable */}
        <div className="absolute top-4 right-4 text-xs text-gray-500 font-mono">
          Status: <span className={userRole === 'admin' ? 'text-red-400 font-bold' : 'text-gray-400'}>{userRole}</span>
        </div>
        
        <div className="relative container mx-auto px-6 py-20">
          <div className="text-center">
            <div className="flex items-center justify-center mb-8">
              <div className="relative">
                <Shield className="w-20 h-20 text-purple-400 mr-4 drop-shadow-lg" />
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-7xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-2 drop-shadow-lg">
                  freep0nx
                </h1>
                <p className="text-purple-300 text-2xl font-light tracking-wide">Elite CTF Team</p>
              </div>
            </div>
            
            <p className="text-gray-300 text-xl max-w-3xl mx-auto mb-10 leading-relaxed">
              Une équipe française de cybersécurité passionnée par les challenges CTF. 
              Nous excellons dans tous les domaines : web, reverse, crypto, forensic, pwn et plus encore.
            </p>
            
            <div className="flex items-center justify-center space-x-8 mb-12">
              <a 
                href="https://ctftime.org/team/361758/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
              >
                <Trophy className="w-6 h-6 mr-3" />
                <span className="font-semibold">CTFtime Profile</span>
                <ExternalLink className="w-5 h-5 ml-3" />
              </a>
              
              <button
                onClick={() => setShowCTF(!showCTF)}
                className="flex items-center bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/25"
              >
                <Terminal className="w-6 h-6 mr-3" />
                <span className="font-semibold">Try Our CTF</span>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-black/30 backdrop-blur-md rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:transform hover:scale-105">
                <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-white font-bold text-xl mb-3">{teamMembers.filter(m => !m.hidden).length} Membres</h3>
                <p className="text-gray-300">Une équipe soudée et complémentaire</p>
              </div>
              
              <div className="bg-black/30 backdrop-blur-md rounded-2xl p-8 border border-green-500/20 hover:border-green-500/40 transition-all duration-300 hover:transform hover:scale-105">
                <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Flag className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-white font-bold text-xl mb-3">Multi-spécialités</h3>
                <p className="text-gray-300">Experts dans tous les domaines CTF</p>
              </div>
              
              <div className="bg-black/30 backdrop-blur-md rounded-2xl p-8 border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300 hover:transform hover:scale-105">
                <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-8 h-8 text-yellow-400" />
                </div>
                <h3 className="text-white font-bold text-xl mb-3">Compétitifs</h3>
                <p className="text-gray-300">Toujours prêts pour le challenge</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Team Members Section */}
      <section className="py-20 bg-black/10 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent mb-4">
              Notre Équipe
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Des experts passionnés, chacun avec ses spécialités uniques
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {teamMembers.filter(member => !member.hidden).map((member, index) => (
              <div 
                key={index}
                className="group bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-md rounded-2xl p-6 border border-gray-700/30 hover:border-purple-500/50 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/10"
              >
                <div className="flex items-center mb-5">
                  <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full p-2 mr-3 group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition-all duration-300">
                    {getSpecialityIcon(member.speciality)}
                  </div>
                  <div className="ml-3">
                    <h3 className="text-white font-bold text-lg group-hover:text-purple-200 transition-colors">
                      {member.pseudo}
                    </h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      member.rank === 'Chef' 
                        ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400 border border-yellow-500/30' 
                        : 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-400 border border-purple-500/30'
                    }`}>
                      {member.rank}
                    </span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-purple-300 text-sm font-semibold mb-2 flex items-center">
                    <Award className="w-3 h-3 mr-1" />
                    Spécialités:
                  </p>
                  <p className="text-gray-300 text-sm font-medium bg-gray-800/30 rounded-lg px-3 py-2">
                    {member.speciality}
                  </p>
                </div>
                
                <p className="text-gray-400 text-sm leading-relaxed">{member.description}</p>
                
                <div className="mt-4 h-1 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
            
            {/* Hidden member revealed via IDOR */}
            {selectedMember === teamMembers.length - 1 && (
              <div className="bg-gradient-to-br from-red-800/60 to-red-900/60 backdrop-blur-md rounded-2xl p-6 border border-red-500/50 animate-pulse shadow-2xl shadow-red-500/20">
                <div className="flex items-center mb-4">
                  <div className="bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-full p-2 mr-3">
                    <Shield className="w-4 h-4 text-red-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-white font-bold text-lg">{teamMembers[teamMembers.length - 1].pseudo}</h3>
                    <span className="text-xs px-2 py-1 rounded-full bg-gradient-to-r from-red-500/20 to-red-600/20 text-red-400 border border-red-500/30">
                      {teamMembers[teamMembers.length - 1].rank}
                    </span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-red-300 text-sm font-semibold mb-2 flex items-center">
                    <Award className="w-3 h-3 mr-1" />
                    Spécialités:
                  </p>
                  <p className="text-gray-300 text-sm font-medium bg-red-800/30 rounded-lg px-3 py-2">
                    {teamMembers[teamMembers.length - 1].speciality}
                  </p>
                </div>
                
                <p className="text-gray-400 text-sm leading-relaxed mb-3">{teamMembers[teamMembers.length - 1].description}</p>
                <p className="text-red-400 text-sm font-bold bg-red-900/30 rounded-lg px-3 py-2 border border-red-500/30">
                  🚨 MEMBRE SECRET RÉVÉLÉ VIA IDOR!
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTF Section */}
      {showCTF && (
        <section className="py-16 bg-black/40">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Challenge CTF</h2>
              <p className="text-gray-300 text-lg">Testez vos compétences avec nos challenges</p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Terminal */}
              <div className="bg-black/90 backdrop-blur-sm rounded-lg border border-green-500/30 overflow-hidden shadow-2xl">
                <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 px-4 py-3 border-b border-green-500/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Terminal className="w-4 h-4 text-green-400" />
                      <span className="text-green-400 font-mono text-sm">freep0nx@terminal</span>
                      <span className="text-gray-400 text-xs">- Enhanced Terminal v2.0</span>
                    </div>
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
                
                <div 
                  ref={terminalRef}
                  className="h-96 overflow-y-auto p-4 font-mono text-sm bg-gradient-to-b from-black/80 to-gray-900/80"
                  style={{ scrollbarWidth: 'thin', scrollbarColor: '#10b981 #1f2937' }}
                >
                  {history.length === 0 && (
                    <div className="text-green-400 mb-4">
                      <div className="text-purple-400 mb-2">Welcome to freep0nx CTF Terminal!</div>
                      <div className="text-gray-400 text-xs mb-2">Type 'help' for available commands</div>
                      <div className="text-yellow-400 text-xs">🎯 Find hidden flags in the system!</div>
                    </div>
                  )}
                  
                  {history.map((cmd, index) => (
                    <div key={index} className="mb-3">
                      <div className="text-green-400 flex items-center">
                        <span className="text-purple-400">{currentUser}@freep0nx</span>
                        <span className="text-white">:</span>
                        <span className="text-blue-400">{currentPath}</span>
                        <span className="text-white">$ </span>
                        <span className="text-green-300">{cmd.input}</span>
                      </div>
                      {cmd.output.map((line, lineIndex) => (
                        <div key={lineIndex} className="text-gray-300 ml-2 leading-relaxed">
                          {line.includes('freep0nx{') ? (
                            <span className="text-yellow-300 bg-yellow-900/20 px-1 rounded font-bold">
                              {line}
                            </span>
                          ) : line.includes('Permission denied') ? (
                            <span className="text-red-400">{line}</span>
                          ) : line.includes('✓') || line.includes('successful') ? (
                            <span className="text-green-400">{line}</span>
                          ) : (
                            line
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                  
                  <form onSubmit={handleSubmit} className="flex items-center">
                    <span className="text-purple-400">{currentUser}@freep0nx</span>
                    <span className="text-white">:</span>
                    <span className="text-blue-400">{currentPath}</span>
                    <span className="text-white">$ </span>
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      className="flex-1 bg-transparent text-green-400 outline-none ml-1 caret-green-400"
                      autoFocus
                      spellCheck={false}
                    />
                  </form>
                </div>
              </div>

              {/* Challenge Info */}
              <div className="space-y-6">
                <div className="bg-black/60 backdrop-blur-sm rounded-lg border border-purple-500/30 p-6">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <Flag className="w-5 h-5 mr-2 text-purple-400" />
                    CTF Challenges ({foundFlags.length}/{validFlags.length})
                  </h3>
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
                      <span>🔐 Access Control (IDOR)</span>
                      <span className={foundFlags.includes('freep0nx{1d0r_4tt4ck_succ3ss}') ? 'text-green-400' : 'text-gray-500'}>
                        {foundFlags.includes('freep0nx{1d0r_4tt4ck_succ3ss}') ? '✓' : '○'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>🍪 Cookie Manipulation</span>
                      <span className={foundFlags.includes('freep0nx{c00k13_m4n1pul4t10n_m4st3r}') ? 'text-green-400' : 'text-gray-500'}>
                        {foundFlags.includes('freep0nx{c00k13_m4n1pul4t10n_m4st3r}') ? '✓' : '○'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>🔄 Reverse Engineering</span>
                      <span className={foundFlags.includes('freep0nx{Tu_Es_Un_Vrai_Reverseur_Mashallax}') ? 'text-green-400' : 'text-gray-500'}>
                        {foundFlags.includes('freep0nx{Tu_Es_Un_Vrai_Reverseur_Mashallax}') ? '✓' : '○'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>🔄 Reverse Engineering</span>
                      <span className={foundFlags.includes('freep0nx{Tu_Es_Un_Vrai_Reverseur_Mashallax}') ? 'text-green-400' : 'text-gray-500'}>
                        {foundFlags.includes('freep0nx{Tu_Es_Un_Vrai_Reverseur_Mashallax}') ? '✓' : '○'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>🍪 Cookie Manipulation</span>
                      <span className={foundFlags.includes('freep0nx{c00k13_m4n1pul4t10n_m4st3r}') ? 'text-green-400' : 'text-gray-500'}>
                        {foundFlags.includes('freep0nx{c00k13_m4n1pul4t10n_m4st3r}') ? '✓' : '○'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>💉 SQL Injection</span>
                      <span className={foundFlags.includes('freep0nx{sql_1nj3ct10n_pr0}') ? 'text-green-400' : 'text-gray-500'}>
                        {foundFlags.includes('freep0nx{sql_1nj3ct10n_pr0}') ? '✓' : '○'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>📋 Log Analysis</span>
                      <span className={foundFlags.includes('freep0nx{l0g_f1l3_4n4lys1s_3xp3rt}') ? 'text-green-400' : 'text-gray-500'}>
                        {foundFlags.includes('freep0nx{l0g_f1l3_4n4lys1s_3xp3rt}') ? '✓' : '○'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Flag Validator */}
                <div className="bg-black/60 backdrop-blur-sm rounded-lg border border-green-500/30 p-6">
                  <h4 className="text-lg font-bold text-white mb-4 flex items-center">
                    <Key className="w-5 h-5 mr-2 text-green-400" />
                    Flag Validator
                  </h4>
                  <div className="flex space-x-2">
                    <div className="relative flex-1">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={flagInput}
                        onChange={(e) => setFlagInput(e.target.value)}
                        placeholder="Enter flag here..."
                        className="w-full bg-gray-800/50 border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-400 pr-10 focus:border-green-500 focus:outline-none"
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
                      <h5 className="text-green-400 font-semibold mb-2">Found Flags:</h5>
                      <div className="space-y-1">
                        {foundFlags.map((flag, index) => (
                          <div key={index} className={`font-mono text-sm px-2 py-1 rounded ${
                            flag === 'freep0nx{Tu_Es_Un_Vrai_Reverseur_Mashallax}' 
                              ? 'text-yellow-300 bg-yellow-900/20 border border-yellow-500/30' 
                              : 'text-green-300 bg-green-900/20'
                          <div key={index} className="text-green-300 font-mono text-sm bg-green-900/20 px-2 py-1 rounded flex items-center justify-between">
                            <span>{flag}</span>
                            {flag === 'freep0nx{Tu_Es_Un_Vrai_Reverseur_Mashallax}' && (
                              <span className="text-yellow-400 text-xs ml-2">🏆 REVERSE MASTER!</span>
                            )}
                            {flag === 'freep0nx{Tu_Es_Un_Vrai_Reverseur_Mashallax}' && (
                              <div className="text-yellow-400 text-xs mt-1 font-bold">
                                🏆 FÉLICITATIONS ! Tu es un vrai reverseur, mashallah ! 🏆
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Terminal Hints */}
                <div className="bg-black/60 backdrop-blur-sm rounded-lg border border-blue-500/30 p-6">
                  <h4 className="text-lg font-bold text-white mb-4 flex items-center">
                    <Terminal className="w-5 h-5 mr-2 text-blue-400" />
                    Terminal Hints
                  </h4>
                  <div className="space-y-2 text-sm text-gray-300">
                    <p>• Use <code className="bg-gray-800 px-1 rounded">ls -a</code> to show hidden files</p>
                    <p>• Use <code className="bg-gray-800 px-1 rounded">sudo -l</code> to check privileges</p>
                    <p>• Use <code className="bg-gray-800 px-1 rounded">find</code> to search for files</p>
                    <p>• Use <code className="bg-gray-800 px-1 rounded">grep</code> to search in files</p>
                    <p>• Use <code className="bg-gray-800 px-1 rounded">download challenge</code> to get the reverse challenge</p>
                    <p>• Try <code className="bg-gray-800 px-1 rounded">sudo -l</code> to check privileges</p>
                    <p>• Try <code className="bg-gray-800 px-1 rounded">download challenge</code> for reverse engineering</p>
                    <p>• Check browser cookies with F12 Developer Tools</p>
                    <p>• Look for SQL injection opportunities</p>
                    <p>• Analyze log files for hidden information</p>
                  </div>
                </div>

                {/* Cookie Challenge Hint */}
                <div className="bg-black/60 backdrop-blur-sm rounded-lg border border-orange-500/30 p-6">
                  <h4 className="text-lg font-bold text-white mb-4 flex items-center">
                    <Cookie className="w-5 h-5 mr-2 text-orange-400" />
                    Cookie Challenge
                  </h4>
                  <div className="text-sm text-gray-300">
                    <p className="mb-2">Try manipulating browser cookies to gain admin access!</p>
                    <p className="text-orange-400">Hint: Set a cookie named "admin" with value "true"</p>
                    <code className="block bg-gray-800 px-2 py-1 rounded mt-2 text-xs">
                      document.cookie="admin=true"
                    </code>
                    <p>• Don't forget to check your browser's developer tools 🍪</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

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
                <div className="grid grid-cols-1 gap-2 text-xs">
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
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Privilege Escalation</span>
                    <span className={foundMasterFlags.includes('freep0nx{pr1v1l3g3_3sc4l4t10n_g0d}') ? 'text-green-400' : 'text-gray-600'}>
                      {foundMasterFlags.includes('freep0nx{pr1v1l3g3_3sc4l4t10n_g0d}') ? '✓' : '○'}
                    </span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <input
                    type="password"
                    value={masterFlagInput}
                    onChange={(e) => setMasterFlagInput(e.target.value)}
                    placeholder="Master flag..."
                    className="flex-1 bg-gray-800/50 border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-400 text-sm focus:border-yellow-500 focus:outline-none"
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

      {/* Footer */}
      <footer className="bg-black/40 backdrop-blur-md border-t border-purple-500/20 py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full p-3 mr-3">
              <Shield className="w-8 h-8 text-purple-400" />
            </div>
            <span className="text-white font-bold text-2xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Team freep0nx
            </span>
          </div>
          <p className="text-gray-400 text-lg mb-6">
            Elite CTF Team - Passionate about cybersecurity challenges
          </p>
          <div className="space-y-2">
            <a 
              href="https://ctftime.org/team/361758/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 transition-colors text-lg font-medium"
            >
              Follow us on CTFtime
            </a>
            {userRole === 'admin' && (
              <p className="text-red-400 text-sm font-mono mt-4">
                🔓 Admin access detected - Cookie manipulation successful!
              </p>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;