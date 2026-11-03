import React from 'react';
import { GalleryItem, LightboxData } from '../types';
import { GalleryGridSkeleton, SectionError } from './DataState';

interface GalleryLogProps {
  items: GalleryItem[];
  isLoading: boolean;
  hasError: boolean;
  onRetry: () => void;
  onOpenLightbox: (data: LightboxData) => void;
}

export const GalleryLog: React.FC<GalleryLogProps> = ({
  items,
  isLoading,
  hasError,
  onRetry,
  onOpenLightbox,
}) => {
  return (
    <section id="gallery" className="border-b border-grid" aria-busy={isLoading}>
      {/* Header bar */}
      <div className="page-gutter flex flex-col justify-between gap-4 border-b border-grid py-8 sm:flex-row sm:items-end sm:py-10">
        <div>
          <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight sm:text-4xl">
            Galeri Dokumentasi<span className="text-vermilion">.</span>
          </h2>
          <p className="mt-2 font-mono text-xs text-neutral-500 dark:text-neutral-400">
            Kumpulan momen dari nobar, event wibu, sesi mabar, hingga warkop malam hari.
          </p>
        </div>
        <p className="font-mono text-xs text-neutral-500 dark:text-neutral-400">
          Klik foto untuk membuka detail dan catatan lengkap.
        </p>
      </div>

      {isLoading ? (
        <div className="page-gutter py-8 sm:py-12">
          <GalleryGridSkeleton />
        </div>
      ) : hasError ? (
        <SectionError message="Galeri belum bisa dimuat dari server." onRetry={onRetry} />
      ) : items.length === 0 ? (
        <div className="bg-paper p-12 text-center dark:bg-[#0E0E0E]">
          <p className="mb-1 text-sm font-medium text-ink dark:text-paper">
            Belum ada foto di galeri.
          </p>
          <p className="font-mono text-xs text-neutral-500 dark:text-neutral-400">
            Dokumentasi kegiatan akan muncul di sini.
          </p>
        </div>
      ) : (
        <div className="page-gutter py-8 sm:py-12">
          <div className="grid grid-cols-1 gap-px bg-neutral-200 dark:bg-neutral-800 md:grid-cols-12">
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
                  aria-label={`Buka arsip foto: ${item.title}`}
                  className={`${colSpanClass} group flex w-full flex-col justify-between bg-paper p-5 text-left transition-colors hover:bg-white dark:bg-[#0E0E0E] dark:hover:bg-neutral-900 sm:p-6 min-h-[44px]`}
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
                    <span className="absolute left-3 top-3 rounded bg-ink/85 px-2.5 py-1 font-mono text-[10px] tracking-wider text-paper backdrop-blur-xs">
                      {displayCode}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="break-words font-display text-base font-bold transition-colors group-hover:text-vermilion">
                        {item.title}
                      </h3>
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
    </section>
  );
};
