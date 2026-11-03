import React from 'react';

interface HeroProps {
  onNavigate?: (path: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(path);
    }
  };

  return (
    <section id="home" className="relative flex min-h-[calc(100svh-4rem)] flex-col border-b border-grid overflow-hidden">
      {/* Background Decorative Watermark (Japanese Katakana) */}
      <div
        className="pointer-events-none absolute -right-6 top-1/2 -translate-y-1/2 select-none font-display text-[18vw] font-black uppercase tracking-tighter text-neutral-900/[0.03] dark:text-white/[0.03] hidden sm:block leading-none"
        aria-hidden="true"
        lang="ja"
      >
        ウィブ・カヤン
      </div>

      {/* Top Meta Strip */}
      <div className="grid grid-cols-2 border-b border-grid font-mono text-[11px] text-neutral-500 dark:text-neutral-400 sm:grid-cols-4 w-full">
        <div className="flex items-center gap-2 truncate border-r border-grid py-3 px-4 sm:px-8 lg:px-12">
          <span className="h-1.5 w-1.5 rounded-full bg-vermilion" aria-hidden="true" />
          <span className="font-semibold text-ink dark:text-paper">WK-ARCHIVE</span>
          <span className="text-neutral-400">// 2026</span>
        </div>
        <div className="truncate border-grid px-4 sm:px-6 py-3 sm:border-r">
          ANIME · MANGA · GACHA
        </div>
        <div className="truncate border-r border-t border-grid py-3 px-4 sm:px-6 sm:border-t-0">
          FILOSOFI: LENTURKAN BEBAN
        </div>
        <div
          className="truncate border-t border-grid py-3 px-4 sm:px-8 lg:px-12 text-right sm:border-t-0"
          lang="ja"
        >
          ウィブ・カヤン · 自由
        </div>
      </div>

      {/* Main Hero Content (Clean, Spacious, No Right Table) */}
      <div className="page-gutter flex flex-1 flex-col justify-between py-12 sm:py-16 lg:py-20">
        <div className="max-w-4xl">
          <h1 className="font-display text-5xl/[0.9] font-extrabold uppercase tracking-tight sm:text-6xl/[0.9] md:text-7xl/[0.9] lg:text-8xl/[0.9]">
            <span className="block text-ink dark:text-paper">Wibu</span>
            <span className="block text-ink dark:text-paper">
              Kayank<span className="text-vermilion">.</span>
            </span>
          </h1>

          {/* Tag Pills */}
          <div className="mt-6 flex flex-wrap gap-2 font-mono text-xs text-neutral-600 dark:text-neutral-400">
            <span className="rounded border border-grid px-3 py-1">#LenturkanBeban</span>
            <span className="rounded border border-grid px-3 py-1">#AntiGengsi</span>
            <span className="rounded border border-grid px-3 py-1">#WacanaAkiba</span>
            <span className="rounded border border-grid px-3 py-1">#VoiceSampaiSubuh</span>
          </div>

          <p className="mt-8 text-base font-normal leading-relaxed text-neutral-700 dark:text-neutral-300 sm:text-xl sm:leading-relaxed">
            Bukan organisasi kaku, cuma lingkaran pertemanan yang terbentuk dari anime musiman,
            game gacha, dan kebiasaan begadang di Discord. Nama <strong className="font-semibold text-ink dark:text-paper">“Kayank”</strong> datang
            dari satu filosofi sederhana menghadapi hidup: <em className="italic text-vermilion not-italic font-medium">kalau berat, lenturkan saja.</em>
          </p>

          {/* Call to Actions to Dedicated Pages */}
          <div className="mt-10 flex flex-wrap items-center gap-3 sm:gap-4">
            <a
              href="/anggota"
              onClick={(e) => handleNav(e, '/anggota')}
              className="inline-flex min-h-[44px] items-center justify-center rounded bg-ink px-6 py-3 font-mono text-xs uppercase tracking-wider text-paper transition-all hover:bg-vermilion hover:text-white dark:bg-paper dark:text-ink dark:hover:bg-vermilion dark:hover:text-white"
            >
              Daftar Anggota →
            </a>
            <a
              href="/galeri"
              onClick={(e) => handleNav(e, '/galeri')}
              className="inline-flex min-h-[44px] items-center justify-center rounded border border-grid px-6 py-3 font-mono text-xs uppercase tracking-wider text-ink transition-colors hover:border-ink hover:text-vermilion dark:text-paper dark:hover:border-paper dark:hover:text-vermilion"
            >
              Galeri Dokumentasi →
            </a>
            <a
              href="/tentang"
              onClick={(e) => handleNav(e, '/tentang')}
              className="inline-flex min-h-[44px] items-center justify-center rounded border border-grid px-6 py-3 font-mono text-xs uppercase tracking-wider text-neutral-600 hover:text-ink hover:border-ink dark:text-neutral-300 dark:hover:text-paper dark:hover:border-paper"
            >
              Tentang Komunitas →
            </a>
          </div>
        </div>

        {/* Quick Features Row filling the bottom horizontal space */}
        <div className="mt-12 pt-8 border-t border-grid grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs text-neutral-600 dark:text-neutral-400">
          <div>
            <span className="text-[10px] text-neutral-400 uppercase block mb-1">BASIS UTAMA</span>
            <span className="font-semibold text-ink dark:text-paper">Discord &amp; Warkop</span>
          </div>
          <div>
            <span className="text-[10px] text-neutral-400 uppercase block mb-1">AGENDA RUTIN</span>
            <span className="font-semibold text-ink dark:text-paper">Nobar Musiman</span>
          </div>
          <div>
            <span className="text-[10px] text-neutral-400 uppercase block mb-1">GACHA PITY</span>
            <span className="font-semibold text-ink dark:text-paper">Solidaritas Martabak</span>
          </div>
          <div>
            <span className="text-[10px] text-neutral-400 uppercase block mb-1">STATUS SERVER</span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">● Voice Terbuka</span>
          </div>
        </div>
      </div>

      {/* Running Marquee Ticker Strip */}
      <div
        className="overflow-hidden border-t border-grid bg-stone/40 py-3.5 font-mono text-xs uppercase tracking-widest text-neutral-700 dark:bg-neutral-900/60 dark:text-neutral-300 w-full"
        aria-hidden="true"
      >
        <div className="animate-marquee flex items-center gap-8">
          <span>ANIME MUSIMAN</span><span>•</span>
          <span>GAME GACHA &amp; SALT</span><span>•</span>
          <span>NOBAR MARATHON</span><span>•</span>
          <span>DEBAT TIER LIST</span><span>•</span>
          <span>NGOPI TENGAH MALAM</span><span>•</span>
          <span>WACANA KE AKIBA</span><span>•</span>
          <span>VOICE SAMPAI SUBUH</span><span>•</span>
          <span>ANIME MUSIMAN</span><span>•</span>
          <span>GAME GACHA &amp; SALT</span><span>•</span>
          <span>NOBAR MARATHON</span><span>•</span>
          <span>DEBAT TIER LIST</span><span>•</span>
          <span>NGOPI TENGAH MALAM</span><span>•</span>
          <span>WACANA KE AKIBA</span><span>•</span>
          <span>VOICE SAMPAI SUBUH</span><span>•</span>
        </div>
      </div>
    </section>
  );
};
