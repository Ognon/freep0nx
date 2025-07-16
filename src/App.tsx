import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import LoadingSpinner from './components/LoadingSpinner';
import NotificationSystem from './components/NotificationSystem';
import ParticleBackground from './components/ParticleBackground';
import ScrollToTop from './components/ScrollToTop';
import ThemeToggle from './components/ThemeToggle';
import SearchBar from './components/SearchBar';
import StatsWidget from './components/StatsWidget';
import AchievementSystem from './components/AchievementSystem';
import LiveChat from './components/LiveChat';
import ProgressTracker from './components/ProgressTracker';
import MusicPlayer from './components/MusicPlayer';
import HomePage from './components/HomePage';
import TeamMembers from './components/TeamMembers';
import CTFPlatform from './components/CTFPlatform';
import Terminal from './components/Terminal';
import { useNotifications } from './hooks/useNotifications';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { notifications, addNotification, removeNotification } = useNotifications();

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      addNotification({
        type: 'success',
        title: 'Bienvenue !',
        message: 'Plateforme freep0nx chargée avec succès',
        duration: 3000
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, [addNotification]);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
    
    // Add navigation notification
    const pageNames: { [key: string]: string } = {
      home: 'Accueil',
      team: 'Équipe',
      ctf: 'CTF Platform',
      terminal: 'Terminal'
    };
    
    addNotification({
      type: 'info',
      title: 'Navigation',
      message: `Vous êtes maintenant sur ${pageNames[page]}`,
      duration: 2000
    });
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} addNotification={addNotification} />;
      case 'team':
        return <TeamMembers onNavigate={handleNavigate} addNotification={addNotification} />;
      case 'ctf':
        return <CTFPlatform onNavigate={handleNavigate} addNotification={addNotification} />;
      case 'terminal':
        return <Terminal onNavigate={handleNavigate} addNotification={addNotification} />;
      default:
        return <HomePage onNavigate={handleNavigate} addNotification={addNotification} />;
    }
  };

  return (
    <div className="App relative">
      <ParticleBackground />
      <Navigation 
        currentPage={currentPage}
        onNavigate={handleNavigate}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      
      {/* Top Bar with Search and Theme */}
      <div className="fixed top-20 right-4 z-40 flex items-center space-x-3">
        <SearchBar onNavigate={handleNavigate} addNotification={addNotification} />
        <ThemeToggle addNotification={addNotification} />
      </div>
      
      {renderPage()}
      <ScrollToTop />
      <StatsWidget addNotification={addNotification} />
      <AchievementSystem addNotification={addNotification} />
      <LiveChat addNotification={addNotification} />
      <ProgressTracker addNotification={addNotification} />
      <MusicPlayer addNotification={addNotification} />
      <NotificationSystem 
        notifications={notifications}
        removeNotification={removeNotification}
      />
    </div>
  );
}

export default App;