import React, { useState, useEffect } from 'react';

interface HeaderProps {
  isDark: boolean;
  toggleTheme: () => void;
  isConnected: boolean;
}

export const Header: React.FC<HeaderProps> = ({ isDark, toggleTheme, isConnected }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [timeStr, setTimeStr] = useState('00:00:00 WIB');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(`${now.toLocaleTimeString('id-ID', { hour12: false })} WIB`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#F6F5F2]/90 dark:bg-[#0E0E0E]/90 backdrop-blur-md border-b border-grid">
      <div className="w-full px-4 sm:px-8 lg:px-12 h-16 flex items-center justify-between">
        {/* Brand */}
        <a href="#home" className="flex items-center gap-3 group">
          <span className="w-8 h-8 rounded bg-ink dark:bg-paper text-paper dark:text-ink font-mono font-medium text-xs flex items-center justify-center group-hover:bg-vermilion dark:group-hover:bg-vermilion dark:group-hover:text-white transition-colors">
            WK
          </span>
          <div className="flex flex-col">
            <span className="font-mono text-xs tracking-widest uppercase font-medium">Wibu Kayank</span>
            <span className="font-mono text-[10px] text-neutral-500 dark:text-neutral-400">EST. ARCHIVE // IDN</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 font-mono text-xs uppercase tracking-wider">
          <a href="#home" className="hover:text-vermilion transition-colors">[01] Home</a>
          <a href="#about" className="hover:text-vermilion transition-colors">[02] About</a>
          <a href="#members" className="hover:text-vermilion transition-colors">[03] Roster</a>
          <a href="#gallery" className="hover:text-vermilion transition-colors">[04] Log</a>
          <a href="#stories" className="hover:text-vermilion transition-colors">[05] Cerita</a>
        </nav>

        {/* Right Utilities */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-2 font-mono text-[11px] text-neutral-500 border border-grid px-2.5 py-1 rounded">
            <span
              className={`w-1.5 h-1.5 rounded-full ${isConnected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}
              title={isConnected ? 'Database Connected' : 'Connecting...'}
            />
            <span>{timeStr}</span>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Dark Mode"
            className="p-2 rounded border border-grid hover:border-ink dark:hover:border-paper transition-colors font-mono text-xs"
          >
            <span>{isDark ? 'LIGHT' : 'DARK'}</span>
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            aria-label="Menu"
            className="md:hidden p-2 rounded border border-grid font-mono text-xs"
          >
            MENU
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-grid bg-[#F6F5F2] dark:bg-[#0E0E0E] px-4 py-6">
          <div className="flex flex-col gap-4 font-mono text-sm uppercase">
            <a
              href="#home"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-grid flex justify-between"
            >
              <span>Home</span><span className="text-neutral-400">01</span>
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-grid flex justify-between"
            >
              <span>About</span><span className="text-neutral-400">02</span>
            </a>
            <a
              href="#members"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-grid flex justify-between"
            >
              <span>Member Roster</span><span className="text-neutral-400">03</span>
            </a>
            <a
              href="#gallery"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-grid flex justify-between"
            >
              <span>Gallery Log</span><span className="text-neutral-400">04</span>
            </a>
            <a
              href="#stories"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 flex justify-between"
            >
              <span>Cerita & Lore</span><span className="text-neutral-400">05</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
