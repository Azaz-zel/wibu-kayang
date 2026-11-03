import React, { useState } from 'react';
import { GalleryItem, LightboxData } from '../types';
import { GalleryGridSkeleton, SectionError } from '../components/DataState';

interface GalleryPageProps {
  items: GalleryItem[];
  isLoading: boolean;
  hasError: boolean;
  onRetry: () => void;
  onOpenLightbox: (data: LightboxData) => void;
  onNavigate?: (path: string) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({
  items,
  isLoading,
  hasError,
  onRetry,
  onOpenLightbox,
  onNavigate,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

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
          <span className="text-ink dark:text-paper font-semibold">Galeri</span>
        </div>
      </div>

      {/* Main Page Title Header */}
      <div className="page-gutter py-10 sm:py-16 border-b border-grid">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="font-display text-4xl sm:text-6xl font-extrabold uppercase tracking-tight">
              Galeri Dokumentasi<span className="text-vermilion">.</span>
            </h1>
            <p className="mt-4 font-mono text-sm sm:text-base text-neutral-600 dark:text-neutral-300 max-w-3xl leading-relaxed">
              Arsip visual dari momen nobar, hunting event jejepangan, sesi mabar larut malam, hingga kulineran darurat warkop.
            </p>
          </div>
          <span className="font-mono text-xs text-neutral-500 dark:text-neutral-400 whitespace-nowrap">
            TOTAL FOTO: {items.length} LOG
          </span>
        </div>
      </div>

      {/* Gallery Grid (Filling edge-to-edge horizontally) */}
      {isLoading ? (
        <div className="page-gutter py-10 sm:py-16">
          <GalleryGridSkeleton />
        </div>
      ) : hasError ? (
        <SectionError message="Galeri belum bisa dimuat dari server." onRetry={onRetry} />
      ) : items.length === 0 ? (
        <div className="page-gutter py-16 text-center">
          <p className="font-display text-xl font-bold mb-2">Belum ada foto</p>
          <p className="font-mono text-xs text-neutral-500 dark:text-neutral-400">
            Dokumentasi kegiatan akan segera diarsipkan di sini.
          </p>
        </div>
      ) : (
        <div className="page-gutter py-10 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {items.map((item, idx) => {
              const displayCode = item.code || `LOG-${String(idx + 1).padStart(2, '0')}`;
              const isWide = item.spanSize === 'wide';
              const colSpanClass = isWide ? 'md:col-span-8' : 'md:col-span-4';
              const aspectClass = isWide ? 'aspect-[16/10]' : 'aspect-square';
              const imgSrc =
                item.img ||
                `https://placehold.co/800x600/121212/F6F5F2?text=${encodeURIComponent(displayCode)}`;

              return (
                <button
                  key={item.id || idx}
                  type="button"
                  onClick={() =>
                    onOpenLightbox({
                      id: displayCode,
                      title: item.title,
                      desc: item.description,
                      date: item.date,
                      img: item.img,
                    })
                  }
                  aria-label={`Buka foto arsip: ${item.title}`}
                  className={`${colSpanClass} group flex w-full flex-col justify-between rounded border border-grid bg-paper p-5 sm:p-6 text-left transition-all hover:border-ink hover:shadow-lg dark:bg-[#0E0E0E] dark:hover:border-paper min-h-[44px]`}
                >
                  <div
                    className={`relative mb-4 w-full overflow-hidden rounded bg-neutral-200 dark:bg-neutral-800 border border-grid ${aspectClass}`}
                  >
                    <img
                      src={imgSrc}
                      alt={`Foto: ${item.title}`}
                      loading="lazy"
                      decoding="async"
                      onError={(event) => {
                        (event.target as HTMLImageElement).src =
                          `https://placehold.co/800x600/121212/F6F5F2?text=${encodeURIComponent(displayCode)}`;
                      }}
                      className="archive-img h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute left-3 top-3 rounded bg-ink/90 px-2.5 py-1 font-mono text-[10px] tracking-wider text-paper backdrop-blur-xs font-semibold">
                      {displayCode}
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between gap-4 w-full">
                    <div className="min-w-0 flex-1">
                      <h2 className="break-words font-display text-lg font-bold transition-colors group-hover:text-vermilion">
                        {item.title}
                      </h2>
                      <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
                        {item.description}
                      </p>
                    </div>
                    <span className="shrink-0 font-mono text-[11px] text-neutral-400">
                      {item.date}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
