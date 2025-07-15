import { Challenge } from '../types';

export const challenges: Challenge[] = [
  {
    id: "reverse-01",
    title: "Binary Explorer",
    category: "reverse",
    difficulty: "easy",
    description: "Télécharge ce binaire et trouve le flag caché à l'intérieur. Bonne chance !",
    flag: "freep0nx{Tu_Es_Un_Vrai_Reverseur_Mashallax}",
    files: ["challenge"],
    points: 50
  },
  {
    id: "stegano-01",
    title: "Le Voyage de Gloria",
    category: "steganography",
    difficulty: "hard",
    description: "Quelque chose se cache dans ces fichiers. Utilise la wordlist pour t'aider.",
    hint: "Monte à bord de la 9 L Gloria te tendra la main sur le quai de Resval.",
    flag: "M4st3rFl4g{c4t7l0v3r}",
    files: ["notes.pdf", "biglist.txt"],
    points: 666
  },
  {
    id: "osint-01",
    title: "L'Église Royale",
    category: "osint",
    difficulty: "medium",
    description: "Quel est le nom de l'église où le roi Louis XIV allait prier ? (exemple : freep0nx{Église_Saint-Germain-des-Prés})",
    flag: "freep0nx{Église_Saint-Louis_de_Chambord}",
    files: ["wherischurch.png"],
    points: 100
  },
  {
    id: "web-01",
    title: "Robots Secrets",
    category: "web",
    difficulty: "easy",
    description: "Les robots ont des secrets... Peut-être qu'ils cachent quelque chose dans un fichier spécial ?",
    hint: "Les robots web ont leurs propres règles et fichiers de configuration. Où regardent-ils en premier ?",
    flag: "freep0nx{r0b0ts_d0nt_h1d3_s3cr3ts}",
    points: 50
  },
  {
    id: "crypto-01",
    title: "Pika pika !",
    category: "crypto",
    difficulty: "easy",
    description: "Pika pika pi ?",
    flag: "freep0nx{p1k4chu_c1ph3r}",
    files: ["pika.txt"],
    points: 50
  },
  {
    id: "crypto-02",
    title: "Double Encodage",
    category: "crypto",
    difficulty: "easy",
    description: "ONSXE4TDGBQWW63RGBUG66JTL4ZWC4BQOEYWC5C7OB2TI6LZGNQXIM35",
    hint: "C'est la base quoi...",
    flag: "freep0nx{d0ubl3_3nc0d1ng_ch4ll3ng3}",
    points: 333
  },
  {
    id: "crypto-03",
    title: "MathFreep0nx",
    category: "crypto",
    difficulty: "hard",
    description: "Le chiffrement de freep0nx est incassable, mais heureusement, des infiltrés ont laissé fuiter quelques informations pour vous aider",
    hint: "Beaucoup de calculs sont inutiles ou peuvent être simplifiés",
    files: ["MathFreep0nx.py","output.txt"],
    flag: "freep0nx{47h_15_700_345y_f0r_y0u}",
    points: 1000
  },
  {
    id: "terminal-01",
    title: "Terminal Hacker",
    category: "osint",
    difficulty: "easy",
    description: "Explore le terminal et trouve le flag caché dans les fichiers système. Utilise les commandes disponibles pour fouiller !",
    hint: "Certains fichiers contiennent des secrets... Essaie de lire différents fichiers avec 'cat'.",
    flag: "freep0nx{t3rm1n4l_m4st3r_2024}",
    points: 1
  }
];