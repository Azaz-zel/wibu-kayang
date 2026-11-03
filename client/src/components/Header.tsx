import React, { useState, useEffect } from 'react';

interface HeaderProps {
  isConnected: boolean;
  currentRoute?: string;
  onNavigate?: (path: string) => void;
}

const jakartaTime = new Intl.DateTimeFormat('id-ID', {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hourCycle: 'h23',
  timeZone: 'Asia/Jakarta',
});

const navItems = [
  { href: '/', label: 'Beranda', id: 'home' },
  { href: '/tentang', label: 'Tentang', id: 'about' },
  { href: '/anggota', label: 'Anggota', id: 'members' },
  { href: '/galeri', label: 'Galeri', id: 'gallery' },
  { href: '/cerita', label: 'Cerita', id: 'stories' },
  { href: '/kanal', label: 'Kanal', id: 'socials' },
];

export const Header: React.FC<HeaderProps> = ({ isConnected, currentRoute = 'home', onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [timeStr, setTimeStr] = useState(() => jakartaTime.format(new Date()));

  useEffect(() => {
    const updateTime = () => {
      setTimeStr(jakartaTime.format(new Date()));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileMenuOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(href);
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 border-b border-grid bg-[#F6F5F2]/90 backdrop-blur-md dark:bg-[#0E0E0E]/90">
      <div className="page-gutter flex h-16 w-full items-center justify-between gap-3">
        {/* Brand */}
        <a
          href="/"
          onClick={(e) => handleLinkClick(e, '/')}
          className="group flex min-h-[44px] shrink-0 items-center gap-2.5"
          aria-label="Wibu Kayank, kembali ke beranda"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded bg-ink font-mono text-xs font-medium text-paper transition-colors group-hover:bg-vermilion group-hover:text-white dark:bg-paper dark:text-ink dark:group-hover:bg-vermilion dark:group-hover:text-white">
            WK
          </span>
          <span className="flex flex-col justify-center leading-tight">
            <span className="whitespace-nowrap font-mono text-[11px] font-medium uppercase tracking-[0.18em] sm:text-xs">
              Wibu Kayank
            </span>
            <span className="hidden font-mono text-[10px] text-neutral-500 dark:text-neutral-400 sm:block">
              Arsip Komunitas
            </span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav
          className="hidden items-center gap-4 font-mono text-[11px] uppercase tracking-wider md:flex lg:gap-6"
          aria-label="Navigasi utama"
        >
          {navItems.map((item) => {
            const isActive = currentRoute === item.id;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                className={`inline-flex min-h-[44px] items-center whitespace-nowrap px-1 transition-colors relative ${
                  isActive
                    ? 'text-vermilion font-bold'
                    : 'text-neutral-700 hover:text-vermilion dark:text-neutral-300 dark:hover:text-[#E63946]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-1 left-1 right-1 h-0.5 bg-vermilion" aria-hidden="true" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Utilities */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="hidden items-center gap-2 whitespace-nowrap rounded border border-grid px-2.5 py-1 font-mono text-[11px] tabular-nums text-neutral-500 dark:text-neutral-400 md:flex">
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                isConnected
                  ? 'bg-emerald-600 dark:bg-emerald-400'
                  : 'bg-amber-600 dark:bg-amber-400'
              }`}
              aria-hidden="true"
            />
            <span className="sr-only">
              Status data: {isConnected ? 'terhubung' : 'arsip lokal'}.
            </span>
            <span aria-hidden="true">{timeStr} WIB</span>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            className="inline-flex min-h-[44px] items-center justify-center rounded border border-grid px-2.5 py-2 font-mono text-[11px] md:hidden"
          >
            {mobileMenuOpen ? 'TUTUP' : 'MENU'}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Navigasi seluler"
          className="page-gutter border-b border-grid bg-[#F6F5F2] pb-6 pt-2 dark:bg-[#0E0E0E] md:hidden"
        >
          <ul className="font-mono text-sm uppercase tracking-wider">
            {navItems.map((item) => {
              const isActive = currentRoute === item.id;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href)}
                    className={`flex min-h-[52px] items-center border-b border-grid py-3 transition-colors ${
                      isActive
                        ? 'text-vermilion font-bold'
                        : 'hover:text-vermilion dark:hover:text-[#E63946]'
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
};
