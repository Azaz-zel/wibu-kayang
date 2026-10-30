import React from 'react';
import { Story, LightboxData } from '../types';

interface StoriesArchiveProps {
  stories: Story[];
  onOpenLightbox: (data: LightboxData) => void;
}

export const StoriesArchive: React.FC<StoriesArchiveProps> = ({ stories, onOpenLightbox }) => {
  return (
    <section id="stories" className="border-b border-grid">
      {/* Header Bar */}
      <div className="px-6 sm:px-12 lg:px-16 py-6 sm:py-8 border-b border-grid flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="font-mono text-xs text-vermilion uppercase tracking-widest block mb-2">// INDEX 05</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight">Catatan & Cerita WK</h2>
        </div>
        <p className="font-mono text-xs text-neutral-500">
          ARSIP KRONOLOGI KEJADIAN ABSURD TONGKRONGAN
        </p>
      </div>

      {/* Stories List */}
      <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
        {stories.length === 0 ? (
          <div className="p-12 text-center font-mono text-sm text-neutral-500">
            <p className="mb-2">// BELUM ADA CATATAN ATAU CERITA //</p>
            <p className="text-xs text-neutral-400">Tulis kronologi atau kisah tongkrongan absurd pertama melalui panel admin.</p>
          </div>
        ) : (
          stories.map((story, idx) => {
            const displayCode = story.code || `STORY-${String(idx + 1).padStart(2, '0')}`;
            const hasImg = Boolean(story.img && story.img.trim() !== '');

            return (
              <article
                key={story.id || idx}
                className="px-6 sm:px-12 lg:px-16 py-8 sm:py-10 bg-[#F6F5F2] dark:bg-[#0E0E0E] hover:bg-white dark:hover:bg-neutral-900/60 transition-colors grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
              >
                <div className="lg:col-span-3 font-mono text-xs space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-ink text-paper dark:bg-paper dark:text-ink font-medium">
                      {displayCode}
                    </span>
                    <span className="text-vermilion uppercase font-semibold">
                      {story.tag || 'CATATAN'}
                    </span>
                  </div>
                  <p className="text-neutral-500 pt-2">OLEH: {story.author}</p>
                  <p className="text-neutral-400">{story.date}</p>
                </div>

                <div className={`${hasImg ? 'lg:col-span-6' : 'lg:col-span-9'} space-y-3`}>
                  <h3 className="font-display text-2xl font-bold tracking-tight">{story.title}</h3>
                  <p className="text-neutral-700 dark:text-neutral-300 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                    {story.content}
                  </p>
                </div>

                {hasImg && (
                  <div className="lg:col-span-3 w-full">
                    <div
                      onClick={() => onOpenLightbox({
                        id: displayCode,
                        title: story.title,
                        desc: story.content,
                        date: `${story.author} // ${story.date}`,
                        img: story.img!,
                      })}
                      className="aspect-[4/3] rounded overflow-hidden border border-grid bg-neutral-200 dark:bg-neutral-800 cursor-pointer group"
                    >
                      <img
                        src={story.img!}
                        alt={story.title}
                        loading="lazy"
                        decoding="async"
                        className="archive-img w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
              </article>
            );
          })
        )}
      </div>
    </section>
  );
};
