import React from 'react';

interface FooterProps {
  isConnected: boolean;
  isLoading: boolean;
  onNavigate?: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ isConnected, isLoading, onNavigate }) => {
  const year = new Date().getFullYear();
  const archiveStatus = isLoading ? 'MENGHUBUNGKAN' : isConnected ? 'TERHUBUNG' : 'ARSIP LOKAL';

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(path);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  return (
    <footer className="page-gutter w-full border-t border-grid py-12 sm:py-16">
      {/* Top Section */}
      <div className="flex flex-col items-start justify-between gap-8 border-b border-grid pb-12 lg:flex-row lg:items-center">
        <div className="max-w-xl">
          <div className="flex items-center gap-2.5 font-mono text-sm font-bold uppercase tracking-wider">
            <span className="h-2.5 w-2.5 rounded-full bg-vermilion" aria-hidden="true" />
            <span className="text-ink dark:text-paper font-display text-lg">Wibu Kayank</span>
            <span className="text-[11px] text-neutral-400 font-mono">// 2026</span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
            Lingkaran pertemanan yang tumbuh dari anime musiman, game gacha, dan kebiasaan begadang.
            Tidak ada struktur organisasi kaku, tidak ada senioritas — cuma tempat santai untuk melenturkan pikiran.
          </p>
        </div>

        <nav
          className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs uppercase"
          aria-label="Navigasi footer"
        >
          <a
            href="/"
            onClick={(e) => handleNav(e, '/')}
            className="inline-flex min-h-[44px] items-center px-1 text-neutral-700 hover:text-vermilion dark:text-neutral-300 dark:hover:text-vermilion"
          >
            Beranda
          </a>
          <a
            href="/tentang"
            onClick={(e) => handleNav(e, '/tentang')}
            className="inline-flex min-h-[44px] items-center px-1 text-neutral-700 hover:text-vermilion dark:text-neutral-300 dark:hover:text-vermilion"
          >
            Tentang
          </a>
          <a
            href="/anggota"
            onClick={(e) => handleNav(e, '/anggota')}
            className="inline-flex min-h-[44px] items-center px-1 text-neutral-700 hover:text-vermilion dark:text-neutral-300 dark:hover:text-vermilion"
          >
            Anggota
          </a>
          <a
            href="/galeri"
            onClick={(e) => handleNav(e, '/galeri')}
            className="inline-flex min-h-[44px] items-center px-1 text-neutral-700 hover:text-vermilion dark:text-neutral-300 dark:hover:text-vermilion"
          >
            Galeri
          </a>
          <a
            href="/cerita"
            onClick={(e) => handleNav(e, '/cerita')}
            className="inline-flex min-h-[44px] items-center px-1 text-neutral-700 hover:text-vermilion dark:text-neutral-300 dark:hover:text-vermilion"
          >
            Cerita
          </a>
          <a
            href="/kanal"
            onClick={(e) => handleNav(e, '/kanal')}
            className="inline-flex min-h-[44px] items-center px-1 text-neutral-700 hover:text-vermilion dark:text-neutral-300 dark:hover:text-vermilion"
          >
            Kanal
          </a>
        </nav>
      </div>

      {/* Middle Manifesto Quote */}
      <div className="py-8 border-b border-grid flex flex-col sm:flex-row items-baseline justify-between gap-4 font-mono text-xs text-neutral-500 dark:text-neutral-400">
        <p className="italic text-ink dark:text-paper text-sm">
          “Kalau beban hidup terlalu berat untuk dihadapi tegak, lenturkan saja.”
        </p>
        <span className="text-[11px] text-neutral-400 shrink-0">
          WIBU KAYANK MANIFESTO · EST. 2026
        </span>
      </div>

      {/* Bottom Colophon Row */}
      <div className="flex flex-col items-center justify-between gap-4 pt-8 font-mono text-[11px] text-neutral-500 dark:text-neutral-400 sm:flex-row">
        <p>© {year} Wibu Kayank Collective. Semua hak dilenturkan.</p>

        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex min-h-[44px] items-center px-2 uppercase hover:text-vermilion transition-colors font-mono text-[11px]"
          >
            Kembali ke atas ↑
          </button>

          <a
            href="/admin"
            onClick={(e) => handleNav(e, '/admin')}
            className="inline-flex min-h-[44px] items-center px-2 uppercase text-neutral-400 hover:text-ink dark:hover:text-paper transition-colors font-mono text-[11px]"
          >
            Portal Admin →
          </a>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`h-2 w-2 rounded-full ${
              isConnected
                ? 'bg-emerald-500'
                : isLoading
                  ? 'bg-amber-500 animate-pulse'
                  : 'bg-neutral-400'
            }`}
            aria-hidden="true"
          />
          <span>STATUS DATA: {archiveStatus}</span>
        </div>
      </div>
    </footer>
  );
};
