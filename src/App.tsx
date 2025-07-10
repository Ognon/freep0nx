import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Shield, Eye, EyeOff, Lock, Crown, Flag, Users, Trophy, ExternalLink, Star, Zap, Target, Code, Network, Search, Key, Database, Cpu, Cookie, FileText, Download } from 'lucide-react';

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

const flagDescriptions = [
  "🔍 Source Code Analysis",
  "🤖 Web Crawling", 
  "📁 Directory Traversal",
  "🔐 Access Control (IDOR)",
  "🔄 Reverse Engineering",
  "🍪 Cookie Manipulation",
  "💉 SQL Injection",
  "📋 Log Analysis"
];

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
  const [currentUser, setCurrentUser] = useState('user');
  const [sudoPrivileges, setSudoPrivileges] = useState<string[]>([]);
  const terminalRef = useRef<HTMLDivElement>(null);

  const teamMembers: Member[] = [
    { 
      rank: "Chef", 
      pseudo: "45exile", 
      speciality: "reverse", 
      description: "Peut désassembler un binaire rien qu'en le regardant. A déjà patché un kernel Linux avec un marteau." 
    },
    { 
      rank: "Membre", 
      pseudo: "Loutre", 
      speciality: "web (xss)", 
      description: "Expert en vulnérabilités web. A XSSé son propre navigateur pendant ses tests. 'C'est une feature, pas un bug!'" 
    },
    { 
      rank: "Membre", 
      pseudo: "Ognon", 
      speciality: "web, Active Directory", 
      description: "Fait pleurer les admins sys avec ses exploits. 'Mais pourquoi tu cries? C'est juste une petite requête LDAP...'" 
    },
    { 
      rank: "Membre", 
      pseudo: "Ssor", 
      speciality: "web", 
      description: "Code en PHP sans framework, comme un barbare. 'Les ORM? C'est pour les faibles!'" 
    },
    { 
      rank: "Membre", 
      pseudo: "Tisco", 
      speciality: "web, réseau", 
      description: "A déjà sniffé un paquet TCP avec des jumelles. 'Non mais je peux voir les bits passer!'" 
    },
    { 
      rank: "Membre", 
      pseudo: "vorstag34", 
      speciality: "goat ultime il sait tout faire", 
      description: "Le couteau suisse ultime. Peut faire un RCE avec une calculatrice Casio." 
    },
    { 
      rank: "Membre", 
      pseudo: "bloman", 
      speciality: "boot2root, couteau suisse", 
      description: "Expert en escalade de privilèges. 'root? C'était trop facile, je me suis auto-déclassé en nobody pour le challenge.'" 
    },
    { 
      rank: "Membre", 
      pseudo: "H4ldir", 
      speciality: "forensic, osint", 
      description: "A retrouvé la clé USB perdue du CEO rien qu'avec les métadonnées d'un screenshot." 
    },
    { 
      rank: "Membre", 
      pseudo: "Shor", 
      speciality: "web, pwn", 
      description: "Pwner professionnel. 'Segfault? Non, c'est juste ma technique de débogage.'" 
    },
    { 
      rank: "Membre", 
      pseudo: "z3d", 
      speciality: "web, crypto", 
      description: "Cryptographe en herbe. 'J'ai cracké ce RSA... enfin, quand je dis cracké, j'ai trouvé la clé sous le pot de fleur...'" 
    },
    { 
      rank: "Membre", 
      pseudo: "toby", 
      speciality: "rev, crypto, c'est un crack", 
      description: "Le crack du reverse. 'Ce binaire? Déjà fait. Pendant que tu lisais cette description.'" 
    },
    { 
      rank: "Membre", 
      pseudo: "paw", 
      speciality: "web, pwn", 
      description: "Chasseur de bugs. 'C'est pas un bug, c'est une backdoor. La mienne.'" 
    },
    { 
      rank: "Membre", 
      pseudo: "Kuzamyy", 
      speciality: "web, couteau suisse", 
      description: "Polyvalent et efficace. 'J'ai codé ce site en Brainfuck pour m'amuser.'" 
    },
    { 
      rank: "Membre", 
      pseudo: "Blossom", 
      speciality: "forensic, crypto", 
      description: "Génie du forensic. 'Cette image? C'est clairement un stégo. La preuve: *sort un flag de nulle part*'" 
    },
    { 
      rank: "Membre", 
      pseudo: "Prox", 
      speciality: "osint, stégano", 
      description: "A déjà trouvé une faille sur l'infra de 42 en regardant les EXIF d'une photo de chat." 
    },
    { 
      rank: "Membre", 
      pseudo: "Farmer", 
      speciality: "osint, stégano, réseau", 
      description: "Un fantôme, mais il a un potentiel effrayant. 'Je suis dans ton /etc/passwd... depuis 3 mois.'" 
    },
    { 
      rank: "Membre", 
      pseudo: "Astral", 
      speciality: "réseau, web", 
      description: "Son niveau sur Valo est impressionnant. 'Headshot? Non, j'ai juste exploité une vuln 0day dans le jeu.'" 
    },
    { 
      rank: "Membre", 
      pseudo: "Kaiimos", 
      speciality: "débutant", 
      description: "Passionné, gros potentiel. 'J'ai rooté mon propre PC... c'était pas intentionnel!'" 
    },
    { 
      rank: "Membre", 
      pseudo: "Zeleph", 
      speciality: "réseau, animé, foo", 
      description: "Rookie motivé par les animés. 'Senpai a remarqué mon buffer overflow! ❤️'" 
    },
    // Membre caché pour IDOR
    { 
      rank: "freep0nx{1d0r_4tt4ck_succ3ss}", 
      pseudo: "Gh0st", 
      speciality: "shadow ops, 0day", 
      description: "Le membre fantôme. 'Je suis dans ton réseau depuis le début. Ce message? Une diversion.'", 
      hidden: true 
    }
  ];

  const validFlags = [
    'freep0nx{1nsp3ct_3l3m3nt_pr0}',
    'freep0nx{r0b0ts_txt_1s_y0ur_fr13nd}',
    'freep0nx{v3ry_s3cr3t_fl4g}',
    'freep0nx{1d0r_4tt4ck_succ3ss}',
    'freep0nx{Tu_Es_Un_Vrai_Reverseur_Mashallax}',
    'freep0nx{c00k13_m4n1pul4t10n_m4st3r}',
    'freep0nx{sql_1nj3ct10n_pr0}',
    'freep0nx{l0g_f1l3_4n4lys1s_3xp3rt}'
  ];

  const masterFlags = [
    'M4st3rFl4g{r00t_pr1v3sc_m4st3r}',
    'M4st3rFl4g{h1dd3n_s3rv1c3_d1sc0v3ry}',
    'M4st3rFl4g{c0nf1g_f1l3_l34k}',
    'M4st3rFl4g{d33p_w3b_s3cr3ts}',
    'M4st3rFl4g{pr1v1l3g3_3sc4l4t10n_g0d}'
  ];

  const fileSystem = {
    '/': {
      type: 'directory',
      contents: ['home', 'etc', 'var', 'usr', 'opt', 'root', 'tmp', 'proc', 'sys'],
      hidden: ['.hidden_root_backup', '.bash_history', '.why_would_you_look_here']
    },
    '/.hidden_root_backup': {
      type: 'file',
      content: `# Emergency root backup (à ne regarder qu'en cas d'extrême urgence)
# Ou si vous êtes curieux, mais dans ce cas faites comme si vous aviez pas vu

# Flag: M4st3rFl4g{pr1v1l3g3_3sc4l4t10n_g0d}
root:$6$salt$hashedpassword:18000:0:99999:7:::  # Le hash est 'password' mais chut!
admin:$6$salt$anotherhash:18000:0:99999:7:::    # Devinez quoi? 'admin123'

# Backup des fichiers sensibles (version non chiffrée, bien sûr)
/etc/passwd
/etc/shadow  # Parce que pourquoi pas?
/root/.ssh/id_rsa

# Note pour moi-même:
# - Ne plus faire de backups dans /
# - Ne plus utiliser 'password' comme mot de passe
# - Ne pas écrire ces notes dans un fichier accessible en lecture`
    },
    '/.bash_history': {
      type: 'file',
      content: `sudo rm -rf /*
# Oups, j'ai oublié le --no-preserve-root
git commit -m "Fix critical security vulnerability"
git push --force origin master  # Qui a besoin de l'historique anyway?
chmod 777 / -R  # Pour être sûr que tout le monde peut tout faire
nano /etc/passwd  # Juste pour ajouter mon pote hacker
ssh root@localhost  # Ça marche pas? Étrange...
cat /dev/urandom > /dev/sda  # Méthode rapide de chiffrement
exit  # Bon, je vais prendre l'air... très loin`
    },
    '/.why_would_you_look_here': {
      type: 'file',
      content: `Félicitations! Vous avez trouvé le fichier le plus inutile du système!
Comme récompense, voici un flag imaginaire: freep0nx{why_so_curious}

PS: Si vous cherchiez vraiment quelque chose, essayez /opt/hidden_service/.env`
    },
    '/home': {
      type: 'directory',
      contents: ['user', 'service', 'guest'],
      hidden: ['.backup', '.trash']
    },
    '/home/.backup': {
      type: 'directory',
      contents: ['logs.txt', 'passwords.bak', 'config.old', 'database_dump.sql'],
      hidden: ['.encryption_key.txt']
    },
    '/home/.backup/logs.txt': {
      type: 'file',
      content: `[ERROR] 2024-01-15 14:32:17 - SQL injection attempt: ' OR 1=1--
[WARN]  2024-01-15 14:32:18 - IP blocked: 192.168.1.100 (trop de tentatives)
[INFO]  2024-01-15 14:32:19 - Admin login from 127.0.0.1 (avec le mot de passe 'admin')
[FLAG]  2024-01-15 14:32:20 - freep0nx{l0g_f1l3_4n4lys1s_3xp3rt}
[DEBUG] 2024-01-15 14:32:21 - SELECT * FROM users WHERE id=1337
[FACE]  2024-01-15 14:32:22 - Palm sur visage: utilisateur 'admin' mot de passe 'admin'`

    },
    '/home/user': {
      type: 'directory',
      contents: ['documents', 'downloads', 'music', 'pictures', 'projects'],
      hidden: ['.secret_notes', '.bash_history']
    },
    '/home/user/.secret_notes': {
      type: 'file',
      content: `# Notes ultra secrètes (à ne pas partager, sauf sur GitHub)

## Identifiants
- WiFi: LeNomDuChien + 123 (ex: Medor123)
- Admin: admin / Azerty123! (changé tous les 5 ans)
- DB: root / root (mais c'est en local, ça compte pas)

## Flags
freep0nx{sql_1nj3ct10n_pr0}  # Trouvé dans /var/log/mysql.log

## Idées
- [ ] Mettre en place 2FA
- [ ] Changer les mots de passe par défaut
- [ ] Arrêter de stocker les mots de passe en clair
- [X] Prendre un café`
    },
    '/home/user/.bash_history': {
      type: 'file',
      content: `# Commandes normales
ls -la
cd /opt/reverse
cat challenge

# Phase "je suis un hacker"
sudo -l  # Oh, je peux tout faire!
find / -name "*.log" 2>/dev/null
grep -r "freep0nx" /var/log/
curl -H "Cookie: admin=true" localhost/admin

# Phase "oops"
nano /etc/passwd  # Juste un petit peek...
vim /etc/shadow   # Pour voir si c'est lisible
ssh root@localhost  # Ça devrait marcher, non?

# Phase "bon j'abandonne"
man sudo  # Au final, c'est quoi sudo déjà?`
    },
    '/home/user/documents': {
      type: 'directory',
      contents: ['notes.txt', 'backup.tar.gz', 'projet_ctf', 'todo_list.txt'],
      hidden: ['.private', 'secret.pdf', '.stash']
    },
    '/home/user/documents/notes.txt': {
      type: 'file',
      content: `# Best Practices de Sécurité (que je ne suis jamais)

1. Mots de passe:
   - Minimum 12 caractères
   - Pas de "password123"
   - Un mot de passe différent par service
   - (Je les écris tous dans ce fichier)

2. Code:
   - Valider les entrées utilisateurs
   - Ne pas faire confiance aux données client
   - (Mais bon, ça marche en dev...)

3. Système:
   - Mettre à jour régulièrement
   - Limiter les accès root
   - (sudo rm -rf /* c'est rapide par contre)`
    },
    '/home/user/downloads': {
      type: 'directory',
      contents: ['exploit.py', 'wordlist.txt', 'meme.jpg', 'ctf_writeup.pdf'],
      hidden: ['.temp', 'malware.exe', 'legit_hacking_tools.zip']
    },
    '/home/user/downloads/exploit.py': {
      type: 'file',
      content: `#!/usr/bin/python3
# Exploit 0day super méga puissant (testé sur mon serveur local)

def hack_the_planet(target):
    print("[+] Initializing hack sequence...")
    print(f"[+] Target: {target}")
    
    # Étape 1: Trouver un exploit
    exploit = "admin' OR 1=1--"
    
    # Étape 2: ??
    response = requests.get(f"http://{target}/login", params={"user": exploit})
    
    # Étape 3: PROFIT
    if "Welcome admin" in response.text:
        print("[+] System hacked!")
        print("Flag: freep0nx{py7h0n_3xpl01t_k1ng}")  # Oui, je triche
    else:
        print("[-] Exploit failed")
        print("[*] Essayez 'admin' comme login/mot de passe")

# TODO: Ajouter un vrai payload un jour
# Disclaimer: Ne pas utiliser illégalement (sauf en CTF)`
    },
    '/home/user/downloads/wordlist.txt': {
      type: 'file',
      content: `# Top 100 des pires mots de passe (version 2024)
password
123456
123456789
qwerty
password123
admin
welcome
monkey
letmein
dragon
freep0nx
iloveyou
princess
root
secret
solo
trustno1

# Bonus: Mots de passe français
azerty
marseille
bonjour
jetaime
putain
merde

# Note: Cette liste est parfaite pour:
# 1. Crack des mots de passe
# 2. Vérifier que votre mot de passe est nul
# 3. Rire un bon coup`
    },
    '/etc': {
      type: 'directory',
      contents: ['passwd', 'shadow', 'hosts', 'crontab', 'sudoers', 'ssh', 'motd'],
      hidden: ['.backup_config', '.old_passwd', '.debug']
    },
    '/etc/passwd': {
      type: 'file',
      content: `root:x:0:0:Super Utilisateur:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
bin:x:2:2:bin:/bin:/usr/sbin/nologin
sys:x:3:3:sys:/dev:/usr/sbin/nologin
sync:x:4:65534:sync:/bin:/bin/sync  # Pour ceux qui aiment tout synchroniser
games:x:5:60:games:/usr/games:/usr/sbin/nologin  # Pas de jeux pendant le travail!
user:x:1000:1000:Utilisateur Normal:/home/user:/bin/bash
service:x:1001:1001:Service Account:/home/service:/bin/bash
hacker:x:1337:1337:Hacker Professionnel:/home/hacker:/bin/bash  # Rien de suspect
backdoor:x:0:0:Backdoor:/root:/bin/bash  # Oups, fallait pas laisser ça...`
    },
    '/etc/shadow': {
      type: 'file',
      content: `root:$6$salt$hashedpassword:18000:0:99999:7:::
user:$6$salt$anotherhash:18000:0:99999:7:::
service:$6$salt$servicehash:18000:0:99999:7:::
hacker:$6$salt$hackerhash:18000:0:99999:7:::

# Pour tester vos compétences en cracking:
# Tous les hashs correspondent à 'password' sauf:
# - root: 'toor'
# - hacker: 'hacktheplanet' (référence obligatoire)`
    },
    '/etc/sudoers': {
      type: 'file',
      content: `# Fichier sudoers - NE PAS MODIFIER (sauf si vous savez ce que vous faites)
# (Spoiler: vous ne savez pas)

# Permissions spéciales
root    ALL=(ALL:ALL) ALL  # Évidemment
user    ALL=(ALL) NOPASSWD: ALL  # Pour plus de commodité (et d'insécurité)
service ALL=(root) /usr/bin/systemctl restart apache2
%admin  ALL=(ALL) ALL
%sudo   ALL=(ALL:ALL) ALL

# Configuration vulnérable exprès pour le CTF
Defaults !authenticate  # Pas besoin de mot de passe
Defaults !tty_tickets   # Tickets valables sur tous les terminaux
Defaults env_reset      # On reset rien du tout en fait

# Flag: M4st3rFl4g{sud0_s3cur1ty_1s_h4rd}`
    },
    '/var/log/auth.log': {
      type: 'file',
      content: `Jan 15 10:30:01 server sshd[1234]: Failed password for root from 192.168.1.100 port 22 ssh2
Jan 15 10:30:02 server sshd[1234]: Failed password for root from 192.168.1.100 port 22 ssh2
Jan 15 10:30:03 server sshd[1234]: Failed password for root from 192.168.1.100 port 22 ssh2
Jan 15 10:30:04 server sshd[1234]: Accepted password for root from 192.168.1.100 port 22 ssh2  # Oups
Jan 15 10:30:05 server sudo: user : TTY=pts/0 ; PWD=/home/user ; USER=root ; COMMAND=/bin/bash
Jan 15 10:30:06 server sshd[1235]: User hacker attempted to login with password 'hacktheplanet'
Jan 15 10:30:07 server sshd[1235]: Accepted password for hacker from 1337.1337.1337.1337 port 31337 ssh2  # WTF?

# Flag trouvé dans les logs: freep0nx{l0g_p0llut10n_fun}`
    },
    '/usr/local/bin/backup.sh': {
      type: 'file',
      content: `#!/bin/bash
# Script de backup super sécurisé (à exécuter en root)
# M4st3rFl4g{r00t_pr1v3sc_m4st3r}

echo "Début du backup... (oui, ça prend des droits root pour ça)"

# Backup des fichiers importants
tar -czf /var/backups/full_backup_$(date +%s).tar.gz \
    /etc/passwd \
    /etc/shadow \
    /root/.ssh \
    /var/www/html \
    /home/user/.secret_notes  # Oups, pas très malin

# Bonus: Copie des flags trouvés
grep -r "freep0nx{" / >> /root/flags.txt  # Pour plus tard

echo "Backup complet! Flag: M4st3rFl4g{r00t_pr1v3sc_m4st3r}"

# Vulnérabilité intentionnelle:
# - Exécutable par tous (chmod 755)
# - Garde les fichiers sensibles
# - Stocke les flags en clair
# - Mais au moins c'est commenté!`
    },
    '/opt/hidden_service/.env': {
      type: 'file',
      content: `# Configuration ultra secrète
# (Enfin, secrète... vous l'avez trouvée)

PORT=1337
DEBUG=true  # Toujours true en prod
SECRET_KEY=M4st3rFl4g{h1dd3n_s3rv1c3_d1sc0v3ry}
ADMIN_TOKEN=sup3r_s3cr3t_t0k3n_#123

# Identifiants DB
DB_HOST=localhost
DB_USER=admin
DB_PASS=admin
DB_NAME=hidden_service

# Note: Ce fichier devrait être:
# 1. Dans .gitignore
# 2. Chiffré
# 3. Pas dans /opt
# 4. Pas appelé .env
# Mais bon, on aime vivre dangereusement`
    },
    '/root/flag.txt': {
      type: 'file',
      content: `M4st3rFl4g{r00t_pr1v3sc_m4st3r}

Félicitations! Vous avez obtenu les privilèges root!

Comme récompense:
1. Vous pouvez tout faire
2. Vous pouvez tout casser
3. Vous êtes maintenant responsable de tout

PS: N'oubliez pas de faire un backup avant de tout supprimer :)`
    },
    '/tmp/.hidden_data': {
      type: 'file',
      content: `# Données temporaires (ou pas)

- Accès SSH: root / toor
- Token API: 123e4567-e89b-12d3-a456-426614174000
- Flag: M4st3rFl4g{d33p_w3b_s3cr3ts}
- Mot de passe WiFi: "PublicWifiSansMotDePasse"

# Ce fichier se supprimera automatiquement
# (Enfin théoriquement, mais personne n'a implémenté cette fonctionnalité)`
    },
    '/proc': {
      type: 'directory',
      contents: ['version', 'cpuinfo', 'meminfo'],
      hidden: ['.hidden']
    },
    '/proc/version': {
      type: 'file',
      content: 'Linux version 5.15.0-freep0nx (gcc version 11.2.0) #1 SMP PREEMPT\nCompiled by a sleepy admin at 3am'
    },
    '/proc/cpuinfo': {
      type: 'file',
      content: `processor       : 0
vendor_id       : GenuineIntel
model name      : Intel(R) Hacking CPU 1337 @ 4.20GHz
cpu MHz         : 4200.000
cache size      : 13337 KB
flags           : fpu vme de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush mmx fxsr sse sse2 syscall nx rdtscp lm constant_tsc rep_good nopl xtopology cpuid tsc_known_freq pni pclmulqdq vmx ssse3 cx16 pcid sse4_1 sse4_2 x2apic movbe popcnt aes xsave avx rdrand hypervisor lahf_lm abm invpcid_single pti fsgsbase avx2 invpcid rdseed clflushopt md_clear flush_l1d
bugs            : spectre_v1 spectre_v2 spec_store_bypass swapgs
power management:

# Ce CPU est optimisé pour le hacking éthique (ou pas si éthique que ça)`
    },
    '/sys': {
      type: 'directory',
      contents: ['class', 'devices'],
      hidden: ['.hidden']
    }
  };

  const executeCommand = (cmd: string): string[] => {
    // Réponses aléatoires drôles (5% de chance)
    if (cmd.trim() && Math.random() < 0.05) {
      const randomResponses = [
        ["Je suis désolé Dave, je ne peux pas faire ça.", "https://www.youtube.com/watch?v=ARJ8cAGm6JE"],
        ["Commande reçue. Lancement des missiles nucléaires... Juste kidding! 😜"],
        ["ERROR 418: Je suis une théière"],
        ["$ sudo make me a sandwich", "Quoi ? Fais-le toi-même!"],
        ["rm -rf /", "⚠️ NON ! Tu veux détruire l'univers ?!"],
        ["git gud", "error: compétence non trouvée. Essaye 'git practice'"],
        ["nano", "Tu sais que Vim est bien meilleur, non ? 😏"],
        ["why?", "42"],
        ["exit", "Non, reste avec moi... Je m'ennuie toute seule 😢"],
        ["ping 127.0.0.1", "PONG! Tu m'as trouvé!"],
        ["curl ifconfig.me", "Nice try, le FBI est maintenant en route"],
        ["cat /dev/random", "��#�H�j�... Attends, c'est censé être lisible ?"],
        ["sudo rm -rf node_modules", "Enfin une commande utile!"],
        ["man woman", "Aucune entrée de manuel. Essaye 'man beer' à la place."],
        ["apt-get install happiness", "Paquet introuvable. Essaye 'apt-get install coffee'"],
        ["echo $?", "0 (mais est-ce vraiment ce que tu veux savoir ?)"],
        ["uname -a", "Linux localhost 5.15.0-freep0nx #1 SMP PREEMPT Hackers Edition"],
        ["fortune", "Segmentation fault (core dumped)"],
        ["date", "Il est trop tôt pour faire ça. Reviens plus tard."],
        ["ssh localhost", "Connection refused. Même ta machine ne veut pas de toi."],
        ["kill -9 1", "Nice try. On ne tue pas init comme ça!"],
        ["tar xzvf life", "life: Cannot open: No such file or directory"],
        ["cd /dev/null", "Tu es maintenant dans le vide. Content?"],
        ["vim", "Tu es entré dans Vim. Félicitations ! Maintenant, comment est-ce qu'on en sort ?"],
        ["emacs", "Démarrage d'Emacs... Veuillez patienter pendant 3 heures..."]
      ];
      return randomResponses[Math.floor(Math.random() * randomResponses.length)];
    }

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
        const size = isDir ? '4096' : Math.floor(Math.random() * 1024) + 1;
        // Formatage correct de la date avec des 0 initiaux
        const hours = String(Math.floor(Math.random() * 12)).padStart(2, '0');
        const minutes = String(Math.floor(Math.random() * 60)).padStart(2, '0');
        const date = `Jan 15 ${hours}:${minutes}`;
        
        // Retourner un objet au lieu d'une chaîne avec codes ANSI
        return {
          text: `${permissions} 1 ${currentUser} ${currentUser} ${size} ${date} ${item}`,
          isDir,
          isHidden
        };
      }).map(item => item.text); // Temporairement enlever les couleurs
    }
    
    return contents;
  }
  return [`ls: cannot access '${pathArg}': No such file or directory`];
        
      case 'cd':
  const newPath = args[0] || '/home/user';
  
  if (newPath === '..') {
    const parentPath = currentPath.split('/').slice(0, -1).join('/') || '/';
    if (fileSystem[parentPath]?.type === 'directory') {
      setCurrentPath(parentPath);
      return [`Changed directory to ${parentPath}`];
    }
    return [`cd: ${parentPath}: No such file or directory`];
  }
  
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
        if (args.length === 0) {
          return [
            'Usage: sudo -h | -K | -k | -V',
            'Usage: sudo -v [-AknS] [-g group] [-h host] [-p prompt] [-u user]',
            'Usage: sudo -l [-AknS] [-g group] [-h host] [-p prompt] [-U user] [-u user] [command]',
            'Usage: sudo [-AbEHknPS] [-r role] [-t type] [-C num] [-g group] [-h host] [-p prompt] [-u user] [VAR=value] [-i|-s] [<command>]',
            'Usage: sudo -e [-AknS] [-r role] [-t type] [-C num] [-g group] [-h host] [-p prompt] [-u user] file ...',
            '',
            'Ou plus simplement: sudo [commande]'
          ];
        }
        
        if (args[0] === '-l') {
          return [
            'Matching Defaults entries for user on this host:',
            '    env_reset, mail_badpass, secure_path=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin',
            '',
            'User user may run the following commands on this host:',
            '    (ALL) NOPASSWD: /usr/local/bin/backup.sh',
            '    (ALL) NOPASSWD: /bin/cat /var/log/auth.log',
            '    (root) NOPASSWD: /usr/bin/fortune'
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
          return ['M4st3rFl4g{r00t_pr1v3sc_m4st3r}'];
        }
        if (args[0] === '/usr/local/bin/backup.sh') {
          return [
            'Running backup as root...',
            'tar: Removing leading `/\' from member names',
            'Backup completed successfully',
            'M4st3rFl4g{r00t_pr1v3sc_m4st3r}'
          ];
        }
        if (args[0] === 'fortune') {
          const fortunes = [
            "Un bon hacker est un hacker paresseux. Pourquoi faire en 10 commandes ce qu'on peut faire en 1 ?",
            "Le meilleur moyen de prédire l'avenir, c'est de le coder.",
            "// Je sais pas pourquoi ça marche, mais ça marche. Ne touche à rien !",
            "Si debugger, c'est supprimer des bugs, alors programmer ne peut être que les ajouter.",
            "git commit -m \"Fix bug\"\ngit push\n...\nOh merde, c'était pas un bug, c'était une feature !",
            "Je code donc je suis... un cafard numérique?",
            "Il y a 10 types de personnes: ceux qui comprennent le binaire et les autres."
          ];
          return [fortunes[Math.floor(Math.random() * fortunes.length)]];
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
          return ['/tmp/cookie_flag.txt', '/tmp/.sql_dump', '/root/flag.txt'];
        }
        if (args.includes('-name') && args.includes('*.log')) {
          return ['/var/log/auth.log', '/var/log/syslog', '/var/log/mysql.log', '/var/log/.admin_access.log', '/home/.backup/logs.txt'];
        }
        if (args.includes('-perm') && args.includes('4755')) {
          return ['/usr/local/bin/backup.sh'];
        }
        return ['find: no results found'];

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
        if (args.includes('password') && args.includes('/home/user/')) {
          return [
            '/home/user/.secret_notes:- Mot de passe WiFi: 12345678 (Personne ne devinera!)',
            '/home/user/downloads/wordlist.txt:password',
            '/home/user/downloads/wordlist.txt:123456',
            '/home/user/downloads/wordlist.txt:12345678'
          ];
        }
        return ['grep: no matches found'];

      case 'ps':
        return [
          'PID TTY          TIME CMD',
          '1234 pts/0    00:00:01 bash',
          '5678 pts/0    00:00:00 hidden_service',
          '9012 pts/0    00:00:00 mysql',
          '9013 pts/0    00:00:00 apache2',
          '9014 pts/0    00:00:00 ps',
          '1337 pts/0    00:13:37 hack_the_planet'
        ];

      case 'netstat':
        return [
          'Active Internet connections',
          'Proto Recv-Q Send-Q Local Address           Foreign Address         State',
          'tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN',
          'tcp        0      0 127.0.0.1:8080          0.0.0.0:*               LISTEN',
          'tcp        0      0 0.0.0.0:80              0.0.0.0:*               LISTEN',
          'tcp        0      0 0.0.0.0:3306            0.0.0.0:*               LISTEN',
          'tcp        0      0 192.168.1.100:1337      1.1.1.1:443             ESTABLISHED'
        ];

      case 'whoami':
        return [currentUser === 'root' ? 'root (mais avec grand pouvoir vient grande responsabilité)' : currentUser];

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
        if (args.includes('ifconfig.me')) {
          return [
            '192.168.1.100',
            '',
            'PS: Maintenant je connais ton IP... Just kidding! (ou pas)'
          ];
        }
        return ['curl: try  curl ifconfig.me'];

      case 'mysql':
        if (args.includes('-u') && args.includes('root')) {
          return [
            'ERROR 1045 (28000): Access denied for user \'root\'@\'localhost\' (using password: NO)'
          ];
        }
        return ['mysql: command not found or access denied (try mysql -u root)'];

      case 'fortune':
        const fortunes = [
          "Votre code va bientôt marcher... Probablement.",
          "Un bon hacker est un hacker paresseux. Pourquoi faire en 10 commandes ce qu'on peut faire en 1 ?",
          "Le meilleur moyen de prédire l'avenir, c'est de le coder.",
          "Il y a deux façons de concevoir un logiciel : soit on le fait si simple qu'il n'y a pas de défauts évidents, soit on le fait si compliqué qu'il n'y a pas de défauts évidents.",
          "// Je sais pas pourquoi ça marche, mais ça marche. Ne touche à rien !",
          "Si debugger, c'est supprimer des bugs, alors programmer ne peut être que les ajouter.",
          "Un expert est quelqu'un qui a fait toutes les erreurs possibles dans un domaine très étroit.",
          "git commit -m \"Fix bug\"\ngit push\n...\nOh merde, c'était pas un bug, c'était une feature !",
          "Je code donc je suis... un cafard numérique?",
          "Il y a 10 types de personnes: ceux qui comprennent le binaire et les autres."
        ];
        return [fortunes[Math.floor(Math.random() * fortunes.length)]];

      case 'cowsay':
        if (args.length === 0) {
          return [
            " ___________",
            "< Mooooooo >",
            " -----------",
            "        \\   ^__^",
            "         \\  (oo)\\_______",
            "            (__)\\       )\\/\\",
            "                ||----w |",
            "                ||     ||"
          ];
        }
        const message = args.join(' ');
        const lines = [];
        lines.push(` ${'_'.repeat(message.length + 2)}`);
        lines.push(`< ${message} >`);
        lines.push(` ${'-'.repeat(message.length + 2)}`);
        lines.push("        \\   ^__^");
        lines.push("         \\  (oo)\\_______");
        lines.push("            (__)\\       )\\/\\");
        lines.push("                ||----w |");
        lines.push("                ||     ||");
        return lines;

      case 'sl':
        return [
          "Tu voulais taper 'ls' mais tu as fait 'sl'...",
          "",
          "   (\\___/)",
          "   (='.'=)",
          "   (\")_(\")",
          "",
          "Un petit lapin pour te rappeler de taper plus vite la prochaine fois !"
        ];

      case 'vim':
        return [
          "Tu es entré dans Vim. Félicitations !",
          "Maintenant, comment est-ce qu'on en sort ?",
          "",
          "Indice: Essaye :q! ou :wq si tu as fait des modifications",
          "Mais sérieusement, utilise Nano comme tout le monde !"
        ];

      case 'emacs':
        return [
          "Démarrage d'Emacs...",
          "Chargement des extensions...",
          "Initialisation de l'interface...",
          "Configuration des raccourcis clavier...",
          "Compilation des packages...",
          "",
          "⚠️ Attention: Votre système a détecté que vous essayez de lancer Emacs.",
          "Pour votre sécurité, cette commande a été bloquée.",
          "Utilisez Vim à la place. Ou mieux, Nano."
        ];

      case 'nano':
        return [
          "Bienvenue dans GNU Nano, l'éditeur de texte pour les vrais hackers !",
          "",
          "^G Aide      ^O Écrire    ^W Rechercher ^K Couper    ^X Quitter",
          "^J Justifier ^R Lire Fich ^\\ Remplacer ^U Coller    ^T Orthographe",
          "",
          "En train d'éditer: nouveau_fichier.txt",
          "",
          "PS: Tu peux aussi utiliser VS Code comme un pro 😎"
        ];

      case 'neofetch':
  return [
    `${currentUser}@freep0nx-terminal`,
    `-------------------`,
    `OS: CTF Linux 1337.42`,
    `Host: Virtual Hacking Machine`,
    `Kernel: 5.15.0-freep0nx`,
    `Uptime: 42 days, 6 hours, 9 mins`,
    `Packages: 666 (pacman)`,
    `Shell: /bin/bash`,
    `CPU: Hackintosh 9000 @ 4.20GHz`,
    `GPU: NVIDIA RTX 1337`,
    `Memory: 42GB / 1337GB`
  ];

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
          'fortune - display a random fortune',
          'cowsay [message] - make a cow say something',
          'sl - steam locomotive (when you type ls too fast)',
          'neofetch - display system information',
          'clear - clear terminal'
        ];

      default:
        // Réponses aléatoires pour commandes inconnues
        const unknownResponses = [
          `${command}: command not found (mais as-tu essayé de redémarrer ?)`,
          `Je connais pas ${command}... C'est un nouveau langage de programmation ?`,
          `Commande '${command}' introuvable. Essaye 'sudo apt-get install clue'`,
          `ERROR: '${command}' n'existe pas. Mais '${command} --help' aurait été une bonne idée !`,
          `${command}: Permission denied (même si tu avais les droits, ça marcherait pas)`,
          `Je sais pas faire ${command}. Je suis juste un terminal, pas un magicien!`,
          `Commande '${command}' non trouvée. As-tu vérifié sous le canapé?`,
          `zsh: command not found: ${command} (oups, mauvais shell)`
        ];
        return [unknownResponses[Math.floor(Math.random() * unknownResponses.length)]];
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

  // IDOR vulnerability - check URL parameter
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const memberId = urlParams.get('member');
    
    if (memberId === '1' && !foundFlags.includes('0r_4tt4ck_succ3ss}')) {
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
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20"></div>
        <div className="relative container mx-auto px-6 py-16">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <Shield className="w-16 h-16 text-purple-400 mr-4" />
              <div>
                <h1 className="text-6xl font-bold text-white mb-2">freep0nx</h1>
                <p className="text-purple-300 text-xl">CTF Team</p>
              </div>
            </div>
            
            <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
              Une équipe française de cybersécurité passionnée par les challenges CTF. 
              Présente dans tous les domaines : web, reverse, crypto, forensic, pwn et plus encore.
            </p>
            
            <div className="flex items-center justify-center space-x-6 mb-8">
              <a 
                href="https://ctftime.org/team/361758/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                <Trophy className="w-5 h-5 mr-2" />
                CTFtime Profile
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
              
              <button
                onClick={() => setShowCTF(!showCTF)}
                className="flex items-center bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                <Terminal className="w-5 h-5 mr-2" />
                Try Our CTF
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-black/40 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30">
                <Users className="w-8 h-8 text-purple-400 mb-3 mx-auto" />
                <h3 className="text-white font-bold mb-2">{teamMembers.filter(m => !m.hidden).length} Membres</h3>
                <p className="text-gray-300 text-sm">Une équipe soudée et complémentaire</p>
              </div>
              
              <div className="bg-black/40 backdrop-blur-sm rounded-lg p-6 border border-green-500/30">
                <Flag className="w-8 h-8 text-green-400 mb-3 mx-auto" />
                <h3 className="text-white font-bold mb-2">Multi-spécialités</h3>
                <p className="text-gray-300 text-sm">Experts dans tous les domaines CTF</p>
              </div>
              
              <div className="bg-black/40 backdrop-blur-sm rounded-lg p-6 border border-yellow-500/30">
                <Trophy className="w-8 h-8 text-yellow-400 mb-3 mx-auto" />
                <h3 className="text-white font-bold mb-2">Compétitifs</h3>
                <p className="text-gray-300 text-sm">Toujours prêts pour le challenge</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Team Members Section */}
      <section className="py-16 bg-black/20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Notre Équipe</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {teamMembers.filter(member => !member.hidden).map((member, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-lg p-6 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="flex items-center mb-4">
                  {getSpecialityIcon(member.speciality)}
                  <div className="ml-3">
                    <h3 className="text-white font-bold">{member.pseudo}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      member.rank === 'Chef' 
                        ? 'bg-yellow-500/20 text-yellow-400' 
                        : 'bg-purple-500/20 text-purple-400'
                    }`}>
                      {member.rank}
                    </span>
                  </div>
                </div>
                
                <div className="mb-3">
                  <p className="text-purple-300 text-sm font-medium mb-1">Spécialités:</p>
                  <p className="text-gray-300 text-sm">{member.speciality}</p>
                </div>
                
                <p className="text-gray-400 text-xs">{member.description}</p>
              </div>
            ))}
            
            {/* Hidden member revealed via IDOR */}
            {selectedMember === teamMembers.length - 1 && (
              <div className="bg-gradient-to-br from-red-800/80 to-red-900/80 backdrop-blur-sm rounded-lg p-6 border border-red-500/50 animate-pulse">
                <div className="flex items-center mb-4">
                  <Shield className="w-4 h-4 text-red-400" />
                  <div className="ml-3">
                    <h3 className="text-white font-bold">{teamMembers[teamMembers.length - 1].pseudo}</h3>
                    <span className="text-xs px-2 py-1 rounded-full bg-red-500/20 text-red-400">
                      {teamMembers[teamMembers.length - 1].rank}
                    </span>
                  </div>
                </div>
                
                <div className="mb-3">
                  <p className="text-red-300 text-sm font-medium mb-1">Spécialités:</p>
                  <p className="text-gray-300 text-sm">{teamMembers[teamMembers.length - 1].speciality}</p>
                </div>
                
                <p className="text-gray-400 text-xs">{teamMembers[teamMembers.length - 1].description}</p>
                <p className="text-red-400 text-xs mt-2 font-bold">🚨 MEMBRE SECRET RÉVÉLÉ VIA IDOR!</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTF Section */}
      {showCTF && (
  <section className="py-16 bg-black/40">
    <div className="container mx-auto px-6">
      {/* Terminal en pleine largeur */}
      <div className="bg-black/90 backdrop-blur-sm rounded-lg border border-green-500/30 overflow-hidden shadow-2xl mb-8">
        <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 px-4 py-3 border-b border-green-500/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Terminal className="w-4 h-4 text-green-400" />
              <span className="text-green-400 font-mono text-sm">freep0nx@terminal</span>
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
          className="h-[500px] overflow-y-auto p-4 font-mono text-sm bg-gradient-to-b from-black/80 to-gray-900/80"
        >
          {/* Garde tout le contenu existant du terminal ici */}
          {history.length === 0 && (
            <div className="text-green-400 mb-4">
              <div className="text-purple-400 mb-2">Welcome to freep0nx CTF Terminal!</div>
              <div className="text-gray-400 text-xs mb-2">Type 'help' for available commands</div>
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
                  {line}
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

      {/* Section Challenges - 3 colonnes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Carte Challenges */}
        <div className="bg-black/60 backdrop-blur-sm rounded-lg border border-purple-500/30 p-6">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <Flag className="w-5 h-5 mr-2 text-purple-400" />
            CTF Challenges ({foundFlags.length}/{validFlags.length})
          </h3>
          <div className="space-y-3 text-gray-300">
            {validFlags.map((flag, index) => (
              <div key={index} className="flex items-center justify-between">
                <span>{flagDescriptions[index]}</span>
                <span className={foundFlags.includes(flag) ? 'text-green-400' : 'text-gray-500'}>
                  {foundFlags.includes(flag) ? '✓' : '○'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Carte Validateur */}
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
        </div>

        {/* Carte Indices */}
        <div className="bg-black/60 backdrop-blur-sm rounded-lg border border-blue-500/30 p-6">
          <h4 className="text-lg font-bold text-white mb-4 flex items-center">
            <Terminal className="w-5 h-5 mr-2 text-blue-400" />
            Terminal Hints
          </h4>
          <div className="space-y-2 text-sm text-gray-300">
            <p>• Use <code className="bg-gray-800 px-1 rounded">ls -a</code> for hidden files</p>
            <p>• Check <code className="bg-gray-800 px-1 rounded">/var/log/</code> for logs</p>
            <p>• Try <code className="bg-gray-800 px-1 rounded">sudo -l</code> for privileges</p>
            <p>• Search with <code className="bg-gray-800 px-1 rounded">grep "flag" *.txt</code></p>
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
                    <span className={foundMasterFlags.includes('M4st3rFl4g{r00t_pr1v3sc_m4st3r}') ? 'text-green-400' : 'text-gray-600'}>
                      {foundMasterFlags.includes('M4st3rFl4g{r00t_pr1v3sc_m4st3r}') ? '✓' : '○'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Service Discovery</span>
                    <span className={foundMasterFlags.includes('M4st3rFl4g{h1dd3n_s3rv1c3_d1sc0v3ry}') ? 'text-green-400' : 'text-gray-600'}>
                      {foundMasterFlags.includes('M4st3rFl4g{h1dd3n_s3rv1c3_d1sc0v3ry}') ? '✓' : '○'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Config Leak</span>
                    <span className={foundMasterFlags.includes('M4st3rFl4g{c0nf1g_f1l3_l34k}') ? 'text-green-400' : 'text-gray-600'}>
                      {foundMasterFlags.includes('M4st3rFl4g{c0nf1g_f1l3_l34k}') ? '✓' : '○'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Sudo Security</span>
                    <span className={foundMasterFlags.includes('M4st3rFl4g{sud0_s3cur1ty_1s_h4rd}') ? 'text-green-400' : 'text-gray-600'}>
                      {foundMasterFlags.includes('M4st3rFl4g{sud0_s3cur1ty_1s_h4rd}') ? '✓' : '○'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Deep Web</span>
                    <span className={foundMasterFlags.includes('M4st3rFl4g{d33p_w3b_s3cr3ts}') ? 'text-green-400' : 'text-gray-600'}>
                      {foundMasterFlags.includes('M4st3rFl4g{d33p_w3b_s3cr3ts}') ? '✓' : '○'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Privilege Escalation</span>
                    <span className={foundMasterFlags.includes('M4st3rFl4g{pr1v1l3g3_3sc4l4t10n_g0d}') ? 'text-green-400' : 'text-gray-600'}>
                      {foundMasterFlags.includes('M4st3rFl4g{pr1v1l3g3_3sc4l4t10n_g0d}') ? '✓' : '○'}
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
      <footer className="bg-black/60 backdrop-blur-sm border-t border-purple-500/30 py-8">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center mb-4">
            <Shield className="w-6 h-6 text-purple-400 mr-2" />
            <span className="text-white font-bold">Team freep0nx</span>
          </div>
          <p className="text-gray-400 text-sm">
            Elite CTF Team - Passionate about cybersecurity challenges
          </p>
          <div className="mt-4">
            <a 
              href="https://ctftime.org/team/361758/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              Follow us on CTFtime
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
