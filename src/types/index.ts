export interface Challenge {
  id: string;
  title: string;
  category: 'reverse' | 'steganography' | 'osint' | 'misc' | 'web' | 'crypto';
  difficulty: 'easy' | 'medium' | 'hard';
  description: string;
  hint?: string;
  flag: string;
  files?: string[];
  solved?: boolean;
  points: number;
}

export interface TeamMember {
  name: string;
  role: 'Chef' | 'Membre';
  specialty: string;
  quote: string;
}

export interface TerminalLine {
  type: 'command' | 'output' | 'error';
  content: string;
  timestamp?: string;
}