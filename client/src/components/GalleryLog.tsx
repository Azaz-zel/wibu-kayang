import React from 'react';
import { GalleryItem, LightboxData } from '../types';

interface GalleryLogProps {
  items: GalleryItem[];
  onOpenLightbox: (data: LightboxData) => void;
}

export const GalleryLog: React.FC<GalleryLogProps> = ({ items, onOpenLightbox }) => {
  return (
    <section id="gallery" className="border-b border-grid">
      {/* Header Bar */}
      <div className="px-6 sm:px-12 lg:px-16 py-6 sm:py-8 border-b border-grid flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="font-mono text-xs text-vermilion uppercase tracking-widest block mb-2">// INDEX 04</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight">Visual Log</h2>
        </div>
        <p className="font-mono text-xs text-neutral-500">
          KLIK FOTO UNTUK MELIHAT CATATAN ARSIP
        </p>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:gap-px bg-neutral-200 dark:bg-neutral-800">
        {items.length === 0 ? (
          <div className="col-span-full p-12 text-center font-mono text-sm text-neutral-500 bg-[#F6F5F2] dark:bg-[#0E0E0E]">
            <p className="mb-2">// BELUM ADA DOKUMENTASI FOTO //</p>
            <p className="text-xs text-neutral-400">Unggah foto dokumentasi kegiatan lewat panel admin.</p>
          </div>
        ) : (
          items.map((item, idx) => {
            const displayCode = item.code || `LOG-${String(idx + 1).padStart(2, '0')}`;
            const isWide = item.spanSize === 'wide';
            const colSpanClass = isWide ? 'md:col-span-8' : 'md:col-span-4';
            const aspectClass = isWide ? 'aspect-[16/10]' : 'aspect-square';
            const imgSrc = item.img || `https://placehold.co/800x600/121212/F6F5F2?text=${encodeURIComponent(displayCode)}`;

            return (
              <div
                key={item.id || idx}
                onClick={() => onOpenLightbox({
                  id: displayCode,
                  title: item.title,
                  desc: item.description,
                  date: item.date,
                  img: item.img,
                })}
                className={`${colSpanClass} group bg-[#F6F5F2] dark:bg-[#0E0E0E] p-4 sm:p-6 flex flex-col justify-between cursor-pointer`}
              >
                <div className={`w-full ${aspectClass} overflow-hidden rounded bg-neutral-200 dark:bg-neutral-800 mb-4 relative`}>
                  <img
                    src={imgSrc}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://placehold.co/800x600/121212/F6F5F2?text=${encodeURIComponent(displayCode)}`;
                    }}
                    className="archive-img w-full h-full object-cover group-hover:scale-102"
                  />
                  <span className="absolute top-3 left-3 px-2 py-1 rounded bg-ink/80 text-paper font-mono text-[10px] tracking-wider">
                    {displayCode}
                  </span>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <div>
                    <h3 className="font-medium text-base group-hover:text-vermilion transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-neutral-500 mt-0.5 line-clamp-1">
                      {item.description}
                    </p>
                  </div>
                  <span className="font-mono text-[11px] text-neutral-400 shrink-0">
                    {item.date}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};
