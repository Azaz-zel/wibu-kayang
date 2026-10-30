import React from 'react';

interface FooterProps {
  isConnected: boolean;
}

export const Footer: React.FC<FooterProps> = ({ isConnected }) => {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-grid px-6 sm:px-12 lg:px-16 py-12">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-grid">
        <div>
          <div className="flex items-center gap-2 font-mono text-sm font-semibold uppercase">
            <span className="w-2 h-2 rounded-full bg-vermilion"></span>
            <span>Wibu Kayank (WK) Collective</span>
          </div>
          <p className="text-xs text-neutral-500 mt-1 font-mono">
            Dibuat tanpa template berisik. Murni tongkrongan.
          </p>
        </div>

        <div className="flex flex-wrap gap-6 font-mono text-xs uppercase">
          <a href="#home" className="hover:text-vermilion transition-colors">Top ↑</a>
          <a href="#about" className="hover:text-vermilion transition-colors">About</a>
          <a href="#members" className="hover:text-vermilion transition-colors">Roster</a>
          <a href="#gallery" className="hover:text-vermilion transition-colors">Gallery</a>
          <a href="#stories" className="hover:text-vermilion transition-colors">Cerita</a>
        </div>
      </div>

      <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 font-mono text-[11px] text-neutral-500">
        <p>© {year} WIBU KAYANK. ALL RIGHTS RESERVED.</p>
        <p>MODE: {isConnected ? 'REACT + MYSQL DATABASE CONNECTED' : 'STANDBY'}</p>
      </div>
    </footer>
  );
};
