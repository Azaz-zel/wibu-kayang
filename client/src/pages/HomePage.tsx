import React from 'react';
import { Hero } from '../components/Hero';
import { Member, GalleryItem, Story, SettingsMap, LightboxData } from '../types';

interface HomePageProps {
  members: Member[];
  gallery: GalleryItem[];
  stories: Story[];
  settings: SettingsMap;
  onNavigate: (path: string) => void;
  onOpenLightbox: (data: LightboxData) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  members,
  gallery,
  stories,
  settings,
  onNavigate,
  onOpenLightbox,
}) => {
  const featuredMembers = members.slice(0, 3);
  const featuredGallery = gallery.slice(0, 2);
  const featuredStory = stories[0];

  return (
    <div className="w-full">
      {/* 1. Hero Section (Cleaned, No Right Table) */}
      <Hero onNavigate={onNavigate} />

      {/* 2. Jelajahi Arsip WK (Feature Hub to Dedicated Pages) */}
      <section className="border-b border-grid">
        <div className="page-gutter py-10 sm:py-16 border-b border-grid bg-stone/20 dark:bg-neutral-900/30">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold uppercase tracking-tight">
                Jelajahi Arsip WK<span className="text-vermilion">.</span>
              </h2>
              <p className="mt-3 font-mono text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed">
                Pilih halaman untuk menyelami lebih dalam tentang lingkaran kami, profil anggota, rekaman foto, hingga catatan cerita.
              </p>
            </div>
            <span className="font-mono text-xs text-neutral-500 dark:text-neutral-400">
              5 HALAMAN ARSIP
            </span>
          </div>
        </div>

        {/* Feature Cards Grid (filling the width edge to edge) */}
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-grid border-b border-grid">
          {/* Card 1: Halaman Tentang */}
          <div className="p-8 sm:p-12 flex flex-col justify-between bg-paper dark:bg-[#0E0E0E] hover:bg-white/50 dark:hover:bg-neutral-900/50 transition-colors">
            <div>
              <div className="flex items-center justify-between mb-4 font-mono text-xs text-neutral-500">
                <span className="font-bold text-vermilion">HALAMAN 01</span>
                <span>FILOSOFI &amp; ASAL USUL</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight mb-3">
                Tentang Wibu Kayank
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-neutral-600 dark:text-neutral-400 mb-6">
                Mengapa bernama "Kayank"? Pelajari filosofi bambu yang melengkung lentur menghadapi badai kehidupan,
                4 pilar komunitas, kronologi dari obrolan Discord larut malam, hingga etika meja tongkrongan.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('/tentang')}
              className="inline-flex min-h-[44px] items-center gap-2 font-mono text-xs uppercase tracking-wider text-ink dark:text-paper hover:text-vermilion font-bold"
            >
              <span>Buka Halaman Tentang</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>

          {/* Card 2: Halaman Anggota */}
          <div className="p-8 sm:p-12 flex flex-col justify-between bg-paper dark:bg-[#0E0E0E] hover:bg-white/50 dark:hover:bg-neutral-900/50 transition-colors">
            <div>
              <div className="flex items-center justify-between mb-4 font-mono text-xs text-neutral-500">
                <span className="font-bold text-vermilion">HALAMAN 02</span>
                <span>ROSTER ENAM ANGGOTA</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight mb-3">
                Daftar Anggota ({members.length})
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-neutral-600 dark:text-neutral-400 mb-6">
                Kenali para founder, divisi gamer gacha, kurator playlist, dan pengarsip manga. Lengkap dengan peran, kutipan khas, dan anime favorit.
              </p>

              {/* Mini avatar roster */}
              <div className="flex flex-wrap gap-3 mb-6">
                {featuredMembers.map((m) => (
                  <div key={m.id} className="flex items-center gap-2 rounded border border-grid px-3 py-1.5 font-mono text-xs bg-white/40 dark:bg-neutral-900/40">
                    <span className="w-2 h-2 rounded-full bg-vermilion" />
                    <span className="font-semibold">{m.name}</span>
                    <span className="text-neutral-400 text-[10px]">// {m.role}</span>
                  </div>
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('/anggota')}
              className="inline-flex min-h-[44px] items-center gap-2 font-mono text-xs uppercase tracking-wider text-ink dark:text-paper hover:text-vermilion font-bold"
            >
              <span>Lihat Semua Anggota</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>

        {/* Feature Cards Grid Lower Row (Galeri & Cerita) */}
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-grid border-b border-grid">
          {/* Card 3: Galeri Dokumentasi */}
          <div className="p-8 sm:p-12 flex flex-col justify-between bg-paper dark:bg-[#0E0E0E] hover:bg-white/50 dark:hover:bg-neutral-900/50 transition-colors">
            <div>
              <div className="flex items-center justify-between mb-4 font-mono text-xs text-neutral-500">
                <span className="font-bold text-vermilion">HALAMAN 03</span>
                <span>DOKUMENTASI KEGIATAN</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight mb-3">
                Galeri Foto ({gallery.length} Log)
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-neutral-600 dark:text-neutral-400 mb-6">
                Rekaman visual dari malam nobar marathon, berburu merchandise di event jejepangan, hingga sesi makan ramen darurat setelah kalah ranked.
              </p>

              {/* Gallery Mini Previews */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {featuredGallery.map((item) => (
                  <div key={item.id} className="aspect-[16/10] overflow-hidden rounded border border-grid bg-neutral-200 dark:bg-neutral-800">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('/galeri')}
              className="inline-flex min-h-[44px] items-center gap-2 font-mono text-xs uppercase tracking-wider text-ink dark:text-paper hover:text-vermilion font-bold"
            >
              <span>Buka Galeri Lengkap</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>

          {/* Card 4: Catatan & Cerita */}
          <div className="p-8 sm:p-12 flex flex-col justify-between bg-paper dark:bg-[#0E0E0E] hover:bg-white/50 dark:hover:bg-neutral-900/50 transition-colors">
            <div>
              <div className="flex items-center justify-between mb-4 font-mono text-xs text-neutral-500">
                <span className="font-bold text-vermilion">HALAMAN 04</span>
                <span>CATATAN &amp; KISAH</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight mb-3">
                Cerita Tongkrongan ({stories.length} Catatan)
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-neutral-600 dark:text-neutral-400 mb-6">
                Kisah absurd dan kejadian berharga yang dialami bersama: wacana ke Akihabara, drama rate-off 90-pity, dan begadang marathon 26 episode.
              </p>

              {featuredStory && (
                <div className="p-4 rounded border border-grid bg-white/40 dark:bg-neutral-900/40 mb-6">
                  <div className="flex items-center gap-2 font-mono text-[10px] text-vermilion font-bold mb-1 uppercase">
                    <span>{featuredStory.code}</span>
                    <span>•</span>
                    <span>{featuredStory.tag}</span>
                  </div>
                  <h4 className="font-display text-base font-bold text-ink dark:text-paper line-clamp-1">
                    {featuredStory.title}
                  </h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 mt-1">
                    {featuredStory.content}
                  </p>
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={() => onNavigate('/cerita')}
              className="inline-flex min-h-[44px] items-center gap-2 font-mono text-xs uppercase tracking-wider text-ink dark:text-paper hover:text-vermilion font-bold"
            >
              <span>Baca Semua Cerita</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>

        {/* Card 5: Kanal Komunitas Banner */}
        <div className="page-gutter py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-stone/20 dark:bg-neutral-900/30">
          <div>
            <div className="font-mono text-xs text-vermilion font-bold mb-1">
              HALAMAN 05 // KANAL KOMUNITAS
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold">
              Siap Nongkrong Bareng Kami?
            </h3>
            <p className="mt-2 font-mono text-xs text-neutral-600 dark:text-neutral-400 max-w-xl">
              Server Discord selalu terbuka bagi siapa saja yang ingin bersantai, menonton anime musiman, atau sekadar join voice channel untuk rebahan.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('/kanal')}
            className="inline-flex min-h-[48px] items-center justify-center rounded bg-ink px-6 py-3 font-mono text-xs uppercase tracking-wider text-paper hover:bg-vermilion transition-all font-semibold shrink-0"
          >
            Buka Halaman Kanal →
          </button>
        </div>
      </section>
    </div>
  );
};
