import React, { useState, useRef, useEffect } from 'react';
import { Music, Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Shuffle, Repeat } from 'lucide-react';

interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
  genre: string;
}

interface MusicPlayerProps {
  addNotification: (notification: any) => void;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ addNotification }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [isRepeating, setIsRepeating] = useState(false);
  const [progress, setProgress] = useState(0);

  const tracks: Track[] = [
    { id: '1', title: 'Cyberpunk Hacking', artist: 'freep0nx', duration: '3:42', genre: 'Electronic' },
    { id: '2', title: 'Terminal Dreams', artist: 'Digital Phantom', duration: '4:15', genre: 'Synthwave' },
    { id: '3', title: 'Binary Beats', artist: 'Code Runner', duration: '3:28', genre: 'Techno' },
    { id: '4', title: 'Exploit Symphony', artist: 'Hack3r', duration: '5:03', genre: 'Ambient' },
    { id: '5', title: 'Reverse Engineering', artist: 'Assembly', duration: '4:37', genre: 'Industrial' }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            handleNext();
            return 0;
          }
          return prev + 0.5;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    addNotification({
      type: 'info',
      title: isPlaying ? 'Musique en pause' : 'Lecture en cours',
      message: `${tracks[currentTrack].title} - ${tracks[currentTrack].artist}`,
      duration: 2000
    });
  };

  const handleNext = () => {
    const nextTrack = isShuffled 
      ? Math.floor(Math.random() * tracks.length)
      : (currentTrack + 1) % tracks.length;
    setCurrentTrack(nextTrack);
    setProgress(0);
  };

  const handlePrevious = () => {
    const prevTrack = currentTrack === 0 ? tracks.length - 1 : currentTrack - 1;
    setCurrentTrack(prevTrack);
    setProgress(0);
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const formatTime = (percentage: number, duration: string) => {
    const [minutes, seconds] = duration.split(':').map(Number);
    const totalSeconds = minutes * 60 + seconds;
    const currentSeconds = Math.floor((percentage / 100) * totalSeconds);
    const currentMinutes = Math.floor(currentSeconds / 60);
    const remainingSeconds = currentSeconds % 60;
    return `${currentMinutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-4 left-96 z-40">
      <div className={`bg-slate-900/95 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-2xl transition-all duration-500 ${
        isVisible ? 'w-80' : 'w-16'
      }`}>
        <button
          onClick={() => setIsVisible(!isVisible)}
          className="w-full p-4 flex items-center justify-center hover:bg-slate-800/50 rounded-2xl transition-all duration-300"
        >
          <Music className="h-6 w-6 text-violet-400" />
          {isVisible && (
            <span className="ml-3 text-white font-medium">Music Player</span>
          )}
        </button>

        {isVisible && (
          <div className="p-4 pt-0 space-y-4 animate-in slide-in-from-left duration-300">
            {/* Current Track */}
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
              <div className="text-center mb-3">
                <h3 className="text-white font-semibold text-sm truncate">
                  {tracks[currentTrack].title}
                </h3>
                <p className="text-slate-400 text-xs">
                  {tracks[currentTrack].artist}
                </p>
                <span className="text-xs text-violet-400 bg-violet-500/20 px-2 py-1 rounded-full">
                  {tracks[currentTrack].genre}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="mb-3">
                <div className="w-full bg-slate-700 rounded-full h-1 mb-1">
                  <div 
                    className="bg-gradient-to-r from-violet-500 to-rose-500 h-1 rounded-full transition-all duration-100"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>{formatTime(progress, tracks[currentTrack].duration)}</span>
                  <span>{tracks[currentTrack].duration}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={() => setIsShuffled(!isShuffled)}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    isShuffled ? 'text-violet-400 bg-violet-500/20' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Shuffle className="h-4 w-4" />
                </button>

                <button
                  onClick={handlePrevious}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <SkipBack className="h-5 w-5" />
                </button>

                <button
                  onClick={handlePlayPause}
                  className="bg-gradient-to-r from-violet-500 to-rose-500 hover:from-violet-600 hover:to-rose-600 text-white p-3 rounded-full transition-all duration-300 transform hover:scale-105"
                >
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </button>

                <button
                  onClick={handleNext}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <SkipForward className="h-5 w-5" />
                </button>

                <button
                  onClick={() => setIsRepeating(!isRepeating)}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    isRepeating ? 'text-violet-400 bg-violet-500/20' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Repeat className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Volume Control */}
            <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/50">
              <div className="flex items-center space-x-3">
                <button
                  onClick={toggleMute}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  {isMuted || volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </button>
                <div className="flex-1">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => handleVolumeChange(Number(e.target.value))}
                    className="w-full h-1 bg-slate-700 rounded-full appearance-none cursor-pointer slider"
                  />
                </div>
                <span className="text-xs text-slate-400 w-8 text-right">
                  {isMuted ? 0 : volume}
                </span>
              </div>
            </div>

            {/* Playlist */}
            <div className="bg-slate-800/50 rounded-xl border border-slate-700/50 max-h-32 overflow-y-auto">
              {tracks.map((track, index) => (
                <button
                  key={track.id}
                  onClick={() => {
                    setCurrentTrack(index);
                    setProgress(0);
                  }}
                  className={`w-full p-2 text-left hover:bg-slate-700/50 transition-colors first:rounded-t-xl last:rounded-b-xl ${
                    index === currentTrack ? 'bg-violet-500/20 border-l-2 border-violet-500' : ''
                  }`}
                >
                  <div className="text-sm text-white truncate">{track.title}</div>
                  <div className="text-xs text-slate-400">{track.artist} • {track.duration}</div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MusicPlayer;