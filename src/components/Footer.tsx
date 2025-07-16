import React from 'react';
import { Shield, Github, Twitter, Mail, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white/5 backdrop-blur-xl border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="h-8 w-8 text-emerald-400" />
              <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                freep0nx
              </h3>
            </div>
            <p className="text-slate-400 leading-relaxed mb-6">
              Équipe CTF passionnée par la cybersécurité, l'exploration de vulnérabilités 
              et les défis techniques. Nous partageons nos connaissances et repoussons 
              les limites de la sécurité informatique.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-slate-400 hover:text-emerald-400 transition-colors duration-300"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-cyan-400 transition-colors duration-300"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-slate-400 hover:text-violet-400 transition-colors duration-300"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors duration-300">
                  Accueil
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-violet-400 transition-colors duration-300">
                  Équipe
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-rose-400 transition-colors duration-300">
                  CTF Platform
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors duration-300">
                  Terminal
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-semibold mb-4">Spécialités</h4>
            <ul className="space-y-2">
              <li>
                <span className="text-slate-400">Reverse Engineering</span>
              </li>
              <li>
                <span className="text-slate-400">Web Exploitation</span>
              </li>
              <li>
                <span className="text-slate-400">Cryptographie</span>
              </li>
              <li>
                <span className="text-slate-400">OSINT</span>
              </li>
              <li>
                <span className="text-slate-400">Stéganographie</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-slate-400 text-sm">
            © 2024 freep0nx. Tous droits réservés.
          </p>
          <p className="text-slate-400 text-sm flex items-center space-x-1 mt-4 md:mt-0">
            <span>Fait avec</span>
            <Heart className="h-4 w-4 text-rose-400" />
            <span>par l'équipe freep0nx</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;