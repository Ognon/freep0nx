import React, { useState } from 'react';
import HomePage from './components/HomePage';
import TeamMembers from './components/TeamMembers';
import CTFPlatform from './components/CTFPlatform';
import Terminal from './components/Terminal';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'team':
        return <TeamMembers onNavigate={setCurrentPage} />;
      case 'ctf':
        return <CTFPlatform onNavigate={setCurrentPage} />;
      case 'terminal':
        return <Terminal onNavigate={setCurrentPage} />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="App">
      {renderPage()}
    </div>
  );
}

export default App;