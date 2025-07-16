import React from 'react';
import { Shield, Home, Users, Flag, Terminal, Menu, X, Zap } from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

const Navigation: React.FC<NavigationProps> = ({ 
  currentPage, 
  onNavigate, 
  isMobileMenuOpen, 
  setIsMobileMenuOpen 
}) => {
  const navItems = [
    { id: 'home', label: 'Accueil', icon: Home, color: 'emerald' },
    { id: 'team', label: 'Équipe', icon: Users, color: 'violet' },
    { id: 'ctf', label: 'CTF Platform', icon: Flag, color: 'rose' },
    { id: 'terminal', label: 'Terminal', icon: Terminal, color: 'cyan' }
  ];

  const getNavItemClasses = (item: any) => {
    const isActive = currentPage === item.id;
    const baseClasses = "px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center space-x-2 relative overflow-hidden";
    
    if (isActive) {
      return `${baseClasses} text-white bg-gradient-to-r from-${item.color}-500/20 to-${item.color}-600/20 border border-${item.color}-500/30 shadow-lg shadow-${item.color}-500/10`;
    }
    
    return `${baseClasses} text-slate-300 hover:text-white hover:bg-gradient-to-r hover:from-${item.color}-500/10 hover:to-${item.color}-600/10 hover:border-${item.color}-500/20 border border-transparent`;
  };

  return (
    <header className="bg-slate-900/95 backdrop-blur-xl border-b border-slate-700/50 sticky top-0 z-50 shadow-xl shadow-slate-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center space-x-3 group"
          >
            <div className="relative">
              <Shield className="h-8 w-8 text-emerald-400 group-hover:scale-110 transition-transform duration-300 drop-shadow-lg" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/50"></div>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-sm">
              freep0nx
            </h1>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={getNavItemClasses(item)}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
                {currentPage === item.id && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></div>
                )}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-300 hover:text-emerald-300 hover:bg-emerald-500/10 transition-all duration-300 border border-slate-700 hover:border-emerald-500/30"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-slate-700/50 pt-4 animate-in slide-in-from-top duration-300">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={getNavItemClasses(item)}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navigation;