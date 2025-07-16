import React, { useState, useEffect } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';

interface ThemeToggleProps {
  addNotification: (notification: any) => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ addNotification }) => {
  const [theme, setTheme] = useState<'dark' | 'light' | 'auto'>('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('freep0nx-theme') as 'dark' | 'light' | 'auto' || 'dark';
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (newTheme: 'dark' | 'light' | 'auto') => {
    const root = document.documentElement;
    
    if (newTheme === 'light') {
      root.classList.add('light-theme');
      root.classList.remove('dark-theme');
    } else {
      root.classList.add('dark-theme');
      root.classList.remove('light-theme');
    }
  };

  const handleThemeChange = (newTheme: 'dark' | 'light' | 'auto') => {
    setTheme(newTheme);
    localStorage.setItem('freep0nx-theme', newTheme);
    applyTheme(newTheme);
    
    const themeNames = {
      dark: 'Mode sombre',
      light: 'Mode clair',
      auto: 'Mode automatique'
    };
    
    addNotification({
      type: 'info',
      title: 'Thème changé',
      message: `${themeNames[newTheme]} activé`,
      duration: 2000
    });
  };

  const themes = [
    { id: 'dark', icon: Moon, label: 'Sombre' },
    { id: 'light', icon: Sun, label: 'Clair' },
    { id: 'auto', icon: Monitor, label: 'Auto' }
  ];

  return (
    <div className="flex items-center space-x-1 bg-slate-800/50 rounded-xl p-1 border border-slate-700/50">
      {themes.map((themeOption) => (
        <button
          key={themeOption.id}
          onClick={() => handleThemeChange(themeOption.id as any)}
          className={`p-2 rounded-lg transition-all duration-300 flex items-center space-x-1 ${
            theme === themeOption.id
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
          }`}
          title={themeOption.label}
        >
          <themeOption.icon className="h-4 w-4" />
          <span className="text-xs hidden sm:inline">{themeOption.label}</span>
        </button>
      ))}
    </div>
  );
};

export default ThemeToggle;