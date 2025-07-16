import React, { useState, useRef, useEffect } from 'react';
import { Search, X, FileText, Users, Flag, Terminal } from 'lucide-react';
import { challenges } from '../data/challenges';
import { teamMembers } from '../data/teamMembers';

interface SearchBarProps {
  onNavigate: (page: string) => void;
  addNotification: (notification: any) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onNavigate, addNotification }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
        setTimeout(() => inputRef.current?.focus(), 100);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
        setQuery('');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const searchResults: any[] = [];

    // Search challenges
    challenges.forEach(challenge => {
      if (challenge.title.toLowerCase().includes(query.toLowerCase()) ||
          challenge.description.toLowerCase().includes(query.toLowerCase()) ||
          challenge.category.toLowerCase().includes(query.toLowerCase())) {
        searchResults.push({
          type: 'challenge',
          title: challenge.title,
          description: challenge.description,
          category: challenge.category,
          icon: Flag,
          action: () => onNavigate('ctf')
        });
      }
    });

    // Search team members
    teamMembers.forEach(member => {
      if (member.name.toLowerCase().includes(query.toLowerCase()) ||
          member.specialty.toLowerCase().includes(query.toLowerCase())) {
        searchResults.push({
          type: 'member',
          title: member.name,
          description: member.specialty,
          role: member.role,
          icon: Users,
          action: () => onNavigate('team')
        });
      }
    });

    // Search pages
    const pages = [
      { id: 'home', title: 'Accueil', description: 'Page d\'accueil freep0nx' },
      { id: 'team', title: 'Équipe', description: 'Membres de l\'équipe freep0nx' },
      { id: 'ctf', title: 'CTF Platform', description: 'Challenges de cybersécurité' },
      { id: 'terminal', title: 'Terminal', description: 'Terminal de hacking interactif' }
    ];

    pages.forEach(page => {
      if (page.title.toLowerCase().includes(query.toLowerCase()) ||
          page.description.toLowerCase().includes(query.toLowerCase())) {
        searchResults.push({
          type: 'page',
          title: page.title,
          description: page.description,
          icon: page.id === 'terminal' ? Terminal : FileText,
          action: () => onNavigate(page.id)
        });
      }
    });

    setResults(searchResults.slice(0, 8));
  }, [query, onNavigate]);

  const handleResultClick = (result: any) => {
    result.action();
    setIsOpen(false);
    setQuery('');
    addNotification({
      type: 'success',
      title: 'Navigation',
      message: `Redirection vers ${result.title}`,
      duration: 2000
    });
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center space-x-2 px-4 py-2 bg-slate-800/50 hover:bg-slate-700/50 rounded-xl border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 text-slate-400 hover:text-slate-200"
      >
        <Search className="h-4 w-4" />
        <span className="text-sm">Rechercher...</span>
        <kbd className="hidden sm:inline-flex items-center px-2 py-1 text-xs bg-slate-700/50 rounded border border-slate-600/50">
          ⌘K
        </kbd>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-start justify-center pt-20">
      <div className="bg-slate-900/95 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-2xl w-full max-w-2xl mx-4">
        <div className="flex items-center p-4 border-b border-slate-700/50">
          <Search className="h-5 w-5 text-slate-400 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher des challenges, membres, pages..."
            className="flex-1 bg-transparent outline-none text-white placeholder-slate-400"
            autoFocus
          />
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-700/50 transition-all duration-300"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {results.length > 0 && (
          <div className="max-h-96 overflow-y-auto">
            {results.map((result, index) => (
              <button
                key={index}
                onClick={() => handleResultClick(result)}
                className="w-full flex items-center space-x-3 p-4 hover:bg-slate-800/50 transition-all duration-300 text-left border-b border-slate-800/50 last:border-b-0"
              >
                <div className="flex-shrink-0">
                  <result.icon className="h-5 w-5 text-emerald-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-white font-medium truncate">{result.title}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      result.type === 'challenge' ? 'bg-rose-500/20 text-rose-300' :
                      result.type === 'member' ? 'bg-violet-500/20 text-violet-300' :
                      'bg-cyan-500/20 text-cyan-300'
                    }`}>
                      {result.type === 'challenge' ? 'Challenge' :
                       result.type === 'member' ? 'Membre' : 'Page'}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm truncate">{result.description}</p>
                </div>
              </button>
            ))}
          </div>
        )}

        {query.length >= 2 && results.length === 0 && (
          <div className="p-8 text-center text-slate-400">
            <Search className="h-8 w-8 mx-auto mb-3 opacity-50" />
            <p>Aucun résultat trouvé pour "{query}"</p>
          </div>
        )}

        {query.length < 2 && (
          <div className="p-8 text-center text-slate-400">
            <Search className="h-8 w-8 mx-auto mb-3 opacity-50" />
            <p>Tapez au moins 2 caractères pour rechercher</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;