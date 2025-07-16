import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, Users, X, Smile, Hash } from 'lucide-react';

interface Message {
  id: string;
  user: string;
  content: string;
  timestamp: Date;
  type: 'message' | 'system' | 'achievement';
}

interface LiveChatProps {
  addNotification: (notification: any) => void;
}

const LiveChat: React.FC<LiveChatProps> = ({ addNotification }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      user: 'System',
      content: 'Bienvenue dans le chat freep0nx ! 🚀',
      timestamp: new Date(),
      type: 'system'
    },
    {
      id: '2',
      user: '45exile',
      content: 'Salut tout le monde ! Qui veut faire du reverse ?',
      timestamp: new Date(Date.now() - 300000),
      type: 'message'
    },
    {
      id: '3',
      user: 'vorstag34',
      content: 'J\'ai trouvé une vuln intéressante sur le dernier challenge 👀',
      timestamp: new Date(Date.now() - 180000),
      type: 'message'
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [onlineUsers] = useState(['45exile', 'vorstag34', 'Loutre', 'Ognon', 'Tisco']);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simulate incoming messages
  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      const randomMessages = [
        { user: 'Loutre', content: 'Quelqu\'un a essayé le challenge XSS ?' },
        { user: 'Shor', content: 'Buffer overflow détecté sur le binaire ! 💥' },
        { user: 'z3d', content: 'RSA cracké en 2 minutes, trop facile 😎' },
        { user: 'H4ldir', content: 'OSINT challenge résolu, merci les métadonnées !' },
        { user: 'Blossom', content: 'Stégano dans cette image, j\'en suis sûre...' }
      ];

      if (Math.random() < 0.3) {
        const randomMsg = randomMessages[Math.floor(Math.random() * randomMessages.length)];
        const newMessage: Message = {
          id: Date.now().toString(),
          user: randomMsg.user,
          content: randomMsg.content,
          timestamp: new Date(),
          type: 'message'
        };
        setMessages(prev => [...prev, newMessage]);
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [isOpen]);

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      user: 'Vous',
      content: currentMessage,
      timestamp: new Date(),
      type: 'message'
    };

    setMessages(prev => [...prev, newMessage]);
    setCurrentMessage('');

    addNotification({
      type: 'success',
      title: 'Message envoyé',
      message: 'Votre message a été publié dans le chat',
      duration: 2000
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fr-FR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="fixed bottom-20 right-4 z-40">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-violet-500/80 to-rose-500/80 hover:from-violet-500 hover:to-rose-500 text-white p-4 rounded-full shadow-lg hover:shadow-violet-500/25 transition-all duration-300 transform hover:scale-110"
        >
          <MessageCircle className="h-6 w-6" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
        </button>
      ) : (
        <div className="bg-slate-900/95 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-2xl w-80 h-96 flex flex-col animate-in slide-in-from-bottom duration-300">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-700/50">
            <div className="flex items-center space-x-3">
              <MessageCircle className="h-5 w-5 text-violet-400" />
              <div>
                <h3 className="text-white font-semibold">Chat freep0nx</h3>
                <div className="flex items-center space-x-1 text-xs text-emerald-400">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span>{onlineUsers.length} en ligne</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-slate-600">
            {messages.map((message) => (
              <div key={message.id} className={`${
                message.type === 'system' ? 'text-center' : ''
              }`}>
                {message.type === 'system' ? (
                  <div className="text-xs text-slate-400 bg-slate-800/50 rounded-lg px-3 py-1 inline-block">
                    {message.content}
                  </div>
                ) : (
                  <div className={`${message.user === 'Vous' ? 'text-right' : ''}`}>
                    <div className={`inline-block max-w-[80%] ${
                      message.user === 'Vous' 
                        ? 'bg-gradient-to-r from-violet-500/20 to-rose-500/20 border-violet-500/30' 
                        : 'bg-slate-800/50 border-slate-700/50'
                    } border rounded-lg p-2`}>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className={`text-xs font-semibold ${
                          message.user === 'Vous' ? 'text-violet-300' : 'text-emerald-400'
                        }`}>
                          {message.user}
                        </span>
                        <span className="text-xs text-slate-400">
                          {formatTime(message.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm text-slate-200">{message.content}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-slate-700/50">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Tapez votre message..."
                className="flex-1 bg-slate-800/50 border border-slate-700/50 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-violet-500/50"
              />
              <button
                onClick={handleSendMessage}
                disabled={!currentMessage.trim()}
                className="bg-gradient-to-r from-violet-500/80 to-rose-500/80 hover:from-violet-500 hover:to-rose-500 disabled:from-slate-600/50 disabled:to-slate-700/50 text-white p-2 rounded-lg transition-all duration-300"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveChat;