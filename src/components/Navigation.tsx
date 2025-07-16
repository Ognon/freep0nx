import React from 'react';
import { Shield, Home, Users, Flag, Terminal, Menu, X } from 'lucide-react';

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
    const baseClasses = "px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center space-x-2";
    
    if (isActive) {
      return `${baseClasses} text-${item.color}-300 bg-${item.color}-500/10 border border-${item.color}-500/20 hover:bg-${item.color}-500/20`;
    }
    
    return `${baseClasses} text-slate-300 hover:text-${item.color}-300 hover:bg-${item.color}-500/10`;
  };

  return (
    <header className="bg-white/5 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center space-x-3 group"
          >
            <div className="relative">
              <Shield className="h-8 w-8 text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              freep0nx
            </h1>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={getNavItemClasses(item)}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-300 hover:text-emerald-300 hover:bg-emerald-500/10 transition-all duration-300"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/10 pt-4">
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