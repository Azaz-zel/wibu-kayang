import React from 'react';
import { Story, LightboxData } from '../types';
import { SectionError, StoryListSkeleton } from './DataState';

interface StoriesArchiveProps {
  stories: Story[];
  isLoading: boolean;
  hasError: boolean;
  onRetry: () => void;
  onOpenLightbox: (data: LightboxData) => void;
}

export const StoriesArchive: React.FC<StoriesArchiveProps> = ({
  stories,
  isLoading,
  hasError,
  onRetry,
  onOpenLightbox,
}) => {
  return (
    <section id="stories" className="border-b border-grid" aria-busy={isLoading}>
      {/* Header bar */}
      <div className="page-gutter flex flex-col justify-between gap-4 border-b border-grid py-8 sm:flex-row sm:items-end sm:py-10">
        <div>
          <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight sm:text-4xl">
            Catatan &amp; Cerita WK<span className="text-vermilion">.</span>
          </h2>
          <p className="mt-2 font-mono text-xs text-neutral-500 dark:text-neutral-400">
            Kronologi absurd, drama gacha, dan memori tongkrongan yang layak diabadikan.
          </p>
        </div>
        <p className="font-mono text-xs text-neutral-500 dark:text-neutral-400">
          Total arsip: {stories.length} cerita
        </p>
      </div>

      {isLoading ? (
        <StoryListSkeleton count={Math.min(Math.max(stories.length, 2), 4)} />
      ) : hasError ? (
        <SectionError message="Cerita belum bisa dimuat dari server." onRetry={onRetry} />
      ) : stories.length === 0 ? (
        <div className="p-12 text-center">
          <p className="mb-1 text-sm font-medium text-ink dark:text-paper">
            Belum ada cerita yang ditulis.
          </p>
          <p className="font-mono text-xs text-neutral-500 dark:text-neutral-400">
            Catatan pertama akan muncul di sini.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-grid">
          {stories.map((story, idx) => {
            const displayCode = story.code || `STORY-${String(idx + 1).padStart(2, '0')}`;
            const hasImg = Boolean(story.img && story.img.trim() !== '');

            return (
              <article
                key={story.id || idx}
                className="page-gutter grid grid-cols-1 items-start gap-6 bg-paper py-8 transition-colors hover:bg-white dark:bg-[#0E0E0E] dark:hover:bg-neutral-900/60 sm:py-12 lg:grid-cols-12"
              >
                {/* Meta info */}
                <div className="space-y-2 font-mono text-xs lg:col-span-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded bg-ink px-2.5 py-0.5 font-semibold text-paper dark:bg-paper dark:text-ink">
                      {displayCode}
                    </span>
                    <span className="font-semibold uppercase text-vermilion">
                      {story.tag || 'Catatan'}
                    </span>
                  </div>
                  <p className="pt-2 text-neutral-600 dark:text-neutral-300">
                    Ditulis oleh <strong className="font-semibold text-ink dark:text-paper">{story.author}</strong>
                  </p>
                  <p className="text-neutral-400 text-[11px]">{story.date}</p>
                </div>

                {/* Content body */}
                <div className={`${hasImg ? 'lg:col-span-6' : 'lg:col-span-9'} space-y-3`}>
                  <h3 className="break-words font-display text-2xl font-bold tracking-tight">
                    {story.title}
                  </h3>
                  <div className="whitespace-pre-line break-words text-sm leading-relaxed text-neutral-700 dark:text-neutral-300 sm:text-base sm:leading-relaxed">
                    {story.content}
                  </div>
                </div>

                {/* Optional Image */}
                {hasImg && (
                  <div className="w-full lg:col-span-3">
                    <button
                      type="button"
                      onClick={() =>
                        onOpenLightbox({
                          id: displayCode,
                          title: story.title,
                          desc: story.content,
                          date: `${story.author} · ${story.date}`,
                          img: story.img!,
                        })
                      }
                      aria-label={`Buka foto cerita: ${story.title}`}
                      className="group aspect-[4/3] w-full overflow-hidden rounded border border-grid bg-neutral-200 dark:bg-neutral-800 min-h-[44px]"
                    >
                      <img
                        src={story.img!}
                        alt={`Foto: ${story.title}`}
                        loading="lazy"
                        decoding="async"
                        className="archive-img h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </button>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};
