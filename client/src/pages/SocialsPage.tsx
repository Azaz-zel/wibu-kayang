import React from 'react';
import { SettingsMap } from '../types';
import { DEFAULT_SETTINGS } from '../defaultData';

interface SocialsPageProps {
  settings: SettingsMap;
  isLoading: boolean;
  onNavigate?: (path: string) => void;
}

const socialList = [
  {
    key: 'discord_url',
    name: 'Discord Server',
    desc: 'Markas digital utama tempat voice channel buka 24/7, stream anime, debat tier list, dan mabar.',
    badge: 'Kanal Utama',
    featured: true,
  },
  {
    key: 'instagram_url',
    name: 'Instagram',
    desc: 'Dokumentasi foto event jejepangan, momen kulineran warkop, dan pengumuman jadwal nobar.',
    badge: 'Visual Log',
    featured: false,
  },
  {
    key: 'twitter_url',
    name: 'X (Twitter)',
    desc: 'Celotehan spontan tengah malam, live-tweet reaksi episode puncak anime, dan curhat salt gacha.',
    badge: 'Live Tweet',
    featured: false,
  },
  {
    key: 'youtube_url',
    name: 'YouTube',
    desc: 'VOD rekaman nobar anime lawas, video highlight momen kocak mabar, dan bedah soundtrack.',
    badge: 'Video & VOD',
    featured: false,
  },
  {
    key: 'tiktok_url',
    name: 'TikTok',
    desc: 'Klip pendek kompilasi kegagalan gacha, potongan voice channel absurd, dan meme santai.',
    badge: 'Klip Pendek',
    featured: false,
  },
];

const faqs = [
  {
    q: 'Apakah harus wibu sepuh atau hafal banyak anime untuk gabung?',
    a: 'Sama sekali tidak. Mau baru nonton satu anime atau baru mau mulai eksplorasi, semua orang diterima tanpa perlu merasa diintimidasi.',
  },
  {
    q: 'Kapan jadwal rutin nobar dan kumpul Discord diadakan?',
    a: 'Biasanya setiap akhir pekan (Jumat & Sabtu malam) untuk nobar marathon. Tapi voice channel santai hampir selalu ada yang nongkrong setiap malam.',
  },
  {
    q: 'Apakah anggota sering bertemu di dunia nyata (offline)?',
    a: 'Tentu saja. Sering kali ada wacana ngopi di warkop perempatan, nonton bioskop bareng kalau ada film anime layar lebar, atau hunting artprint di comic convention.',
  },
  {
    q: 'Bagaimana etika bersosialisasi di Discord Wibu Kayank?',
    a: 'Santai, jaga etika dasar, jangan menyebarkan spoiler tanpa tanda peringatan, dan hormati selera masing-masing anggota.',
  },
];

export const SocialsPage: React.FC<SocialsPageProps> = ({ settings, isLoading, onNavigate }) => {
  const effectiveSettings = Object.keys(settings).length > 0 ? settings : DEFAULT_SETTINGS;

  return (
    <div className="w-full">
      {/* Breadcrumb */}
      <div className="border-b border-grid bg-stone/20 dark:bg-neutral-900/30">
        <div className="page-gutter py-4 font-mono text-xs text-neutral-500 dark:text-neutral-400 flex items-center gap-2">
          <button
            type="button"
            onClick={() => onNavigate?.('/')}
            className="hover:text-vermilion transition-colors inline-flex items-center min-h-[32px]"
          >
            Beranda
          </button>
          <span>/</span>
          <span className="text-ink dark:text-paper font-semibold">Kanal</span>
        </div>
      </div>

      {/* Main Page Title Header */}
      <div className="page-gutter py-10 sm:py-16 border-b border-grid">
        <h1 className="font-display text-4xl sm:text-6xl font-extrabold uppercase tracking-tight">
          Kanal &amp; Komunitas WK<span className="text-vermilion">.</span>
        </h1>
        <p className="mt-4 font-mono text-sm sm:text-base text-neutral-600 dark:text-neutral-300 max-w-3xl leading-relaxed">
          Pintu masuk ke markas digital Discord, cuplikan kegiatan di media sosial, dan ruang berkumpul tanpa sekat.
        </p>
      </div>

      {/* Featured Discord Banner (Spanning full width horizontally) */}
      <div className="page-gutter py-10 sm:py-14 border-b border-grid">
        <div className="rounded border border-grid bg-gradient-to-r from-stone/40 to-stone/10 p-8 sm:p-12 dark:from-neutral-900/80 dark:to-neutral-900/20 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 font-mono text-xs font-semibold text-vermilion mb-3 uppercase tracking-wider">
              <span className="h-2 w-2 rounded-full bg-vermilion animate-pulse" />
              <span>MARKAS UTAMA KAMI</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-3">
              Server Discord Wibu Kayank
            </h2>
            <p className="text-base leading-relaxed text-neutral-700 dark:text-neutral-300">
              Tempat segala obrolan terjadi. Dari sesi voice sampai adzan subuh, stream nobar anime beresolusi tinggi,
              debat waifu/husbando, sampai ruang curhat saat roll gacha berdarah. Pintu selalu terbuka untuk kawan baru.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <a
              href={effectiveSettings.discord_url || 'https://discord.gg/wibukayank'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[50px] items-center justify-center rounded bg-ink px-8 py-3.5 font-mono text-sm uppercase tracking-wider text-paper transition-all hover:bg-vermilion hover:text-white dark:bg-paper dark:text-ink dark:hover:bg-vermilion dark:hover:text-white font-semibold"
            >
              Gabung Discord Sekarang ↗
            </a>
          </div>
        </div>
      </div>

      {/* Social Media Grid (Spanning edge-to-edge horizontally) */}
      <div className="page-gutter py-10 sm:py-16 border-b border-grid">
        <div className="mb-8 border-b border-grid pb-4">
          <h2 className="font-display text-2xl font-bold uppercase tracking-tight">
            Media Sosial &amp; Publikasi<span className="text-vermilion">.</span>
          </h2>
          <p className="mt-1 font-mono text-xs text-neutral-500 dark:text-neutral-400">
            Ikuti kabar, dokumentasi kegiatan, dan meme mingguan di kanal favoritmu.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {socialList.map((item) => {
            const url = effectiveSettings[item.key];
            const hasUrl = Boolean(url && url.trim() !== '');

            return (
              <div
                key={item.key}
                className="flex flex-col justify-between rounded border border-grid bg-paper p-6 sm:p-8 dark:bg-[#0E0E0E] hover:border-ink dark:hover:border-paper transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="rounded border border-grid px-2.5 py-0.5 font-mono text-[10px] uppercase font-semibold text-vermilion">
                      {item.badge}
                    </span>
                    {hasUrl && (
                      <span className="font-mono text-xs text-neutral-400">Aktif</span>
                    )}
                  </div>
                  <h3 className="font-display text-xl font-bold mb-2">{item.name}</h3>
                  <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 mb-6">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-grid">
                  {hasUrl ? (
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] items-center gap-2 font-mono text-xs uppercase tracking-wider text-ink dark:text-paper hover:text-vermilion transition-colors font-semibold"
                    >
                      <span>Buka Profil</span>
                      <span aria-hidden="true">↗</span>
                    </a>
                  ) : (
                    <span className="font-mono text-xs text-neutral-400 italic">
                      Tautan belum dikonfigurasi
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Community FAQ Section */}
      <div className="page-gutter py-10 sm:py-16">
        <div className="mb-8 border-b border-grid pb-4">
          <h2 className="font-display text-2xl font-bold uppercase tracking-tight">
            Tanya Jawab Seputar Tongkrongan (FAQ)<span className="text-vermilion">.</span>
          </h2>
          <p className="mt-1 font-mono text-xs text-neutral-500 dark:text-neutral-400">
            Hal-hal yang sering ditanyakan sebelum bergabung nongkrong bersama kami.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded border border-grid bg-white/50 dark:bg-neutral-900/30 p-6 sm:p-8"
            >
              <h3 className="font-display text-lg font-bold mb-3 text-ink dark:text-paper">
                {faq.q}
              </h3>
              <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
