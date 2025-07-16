import React from 'react';
import { Shield } from 'lucide-react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
      <div className="text-center">
        <div className="relative mb-8">
          <Shield className="h-16 w-16 text-emerald-400 mx-auto animate-pulse" />
          <div className="absolute inset-0 rounded-full border-4 border-emerald-400/20 border-t-emerald-400 animate-spin"></div>
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-4">
          freep0nx
        </h2>
        <p className="text-slate-400">Chargement en cours...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;