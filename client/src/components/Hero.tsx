import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section id="home" className="relative border-b border-grid">
      {/* Top Meta Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 border-b border-grid font-mono text-[11px] text-neutral-500 dark:text-neutral-400">
        <div className="p-3 sm:px-8 lg:px-12 border-r border-grid truncate">COLLECTIVE: WIBU KAYANK</div>
        <div className="p-3 sm:px-8 lg:px-12 sm:border-r border-grid truncate">CODE: WK-00</div>
        <div className="p-3 sm:px-8 lg:px-12 border-t sm:border-t-0 border-r border-grid truncate">STATUS: REBAHAN / KAYANG</div>
        <div className="p-3 sm:px-8 lg:px-12 border-t sm:border-t-0 truncate text-right sm:text-left">ウィブ・カヤン</div>
      </div>

      {/* Main Hero Content */}
      <div className="px-6 sm:px-12 lg:px-16 py-16 sm:py-24 lg:py-32">
        <div className="max-w-6xl">
          <p className="font-mono text-xs uppercase tracking-widest text-vermilion mb-4 flex items-center gap-2">
            <span>// INDEX 01</span>
            <span>—</span>
            <span>UNOFFICIAL SUBCULTURE SYNDICATE</span>
          </p>
          <h1 className="font-display text-5xl sm:text-7xl lg:text-9xl font-extrabold tracking-tight leading-[0.9] uppercase">
            Wibu<br />
            <span className="inline-flex items-baseline gap-4">
              Kayank<span className="text-vermilion">.</span>
            </span>
          </h1>
        </div>

        <div className="mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7">
            <p className="text-base sm:text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed font-normal">
              Bukan organisasi resmi, bukan pula sekte sesat. Hanya sekumpulan manusia yang disatukan oleh kultur pop Jepang, begadang tanpa alasan jelas, dan mentalitas yang sudah lentur sampai bisa kayang menghadapi realita.
            </p>
          </div>
          <div className="lg:col-span-5 flex flex-wrap gap-3 lg:justify-end">
            <a
              href="#members"
              className="px-6 py-3.5 rounded bg-ink dark:bg-paper text-paper dark:text-ink font-mono text-xs uppercase tracking-wider hover:bg-vermilion dark:hover:bg-vermilion dark:hover:text-white transition-colors"
            >
              Lihat Member [↓]
            </a>
            <a
              href="#gallery"
              className="px-6 py-3.5 rounded border border-grid hover:border-ink dark:hover:border-paper font-mono text-xs uppercase tracking-wider transition-colors"
            >
              Buka Arsip Foto
            </a>
          </div>
        </div>
      </div>

      {/* Running Ticker Strip */}
      <div className="border-t border-grid py-3 overflow-hidden bg-stone/40 dark:bg-neutral-900/50 font-mono text-xs uppercase tracking-widest text-neutral-600 dark:text-neutral-400">
        <div className="animate-marquee flex gap-8 items-center">
          <span>WIBU KAYANK (WK)</span><span>•</span>
          <span>NO SLEEP CLUB</span><span>•</span>
          <span>GACHA AMPAS SOLIDARITY</span><span>•</span>
          <span>TONGKONGAN DIGITAL & REALITA</span><span>•</span>
          <span>MENTAL KAYANG FISIK JOMPO</span><span>•</span>
          <span>WIBU KAYANK (WK)</span><span>•</span>
          <span>NO SLEEP CLUB</span><span>•</span>
          <span>GACHA AMPAS SOLIDARITY</span><span>•</span>
          <span>TONGKONGAN DIGITAL & REALITA</span><span>•</span>
          <span>MENTAL KAYANG FISIK JOMPO</span><span>•</span>
        </div>
      </div>
    </section>
  );
};
