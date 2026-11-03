import React, { useState } from 'react';
import { Story, LightboxData } from '../types';
import { SectionError, StoryListSkeleton } from '../components/DataState';

interface StoriesPageProps {
  stories: Story[];
  isLoading: boolean;
  hasError: boolean;
  onRetry: () => void;
  onOpenLightbox: (data: LightboxData) => void;
  onNavigate?: (path: string) => void;
}

export const StoriesPage: React.FC<StoriesPageProps> = ({
  stories,
  isLoading,
  hasError,
  onRetry,
  onOpenLightbox,
  onNavigate,
}) => {
  const [activeTag, setActiveTag] = useState<string>('all');

  // Extract unique tags
  const tags = ['all', ...Array.from(new Set(stories.map((s) => s.tag).filter(Boolean)))];

  const filteredStories =
    activeTag === 'all' ? stories : stories.filter((s) => s.tag === activeTag);

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
          <span className="text-ink dark:text-paper font-semibold">Cerita</span>
        </div>
      </div>

      {/* Main Page Title Header */}
      <div className="page-gutter py-10 sm:py-16 border-b border-grid">
        <h1 className="font-display text-4xl sm:text-6xl font-extrabold uppercase tracking-tight">
          Catatan &amp; Cerita WK<span className="text-vermilion">.</span>
        </h1>
        <p className="mt-4 font-mono text-sm sm:text-base text-neutral-600 dark:text-neutral-300 max-w-3xl leading-relaxed">
          Kronologi absurd, drama gacha 90-pity, nobar marathon subuh, dan memori tongkrongan yang layak diabadikan.
        </p>

        {/* Tag Filters Row */}
        <div className="mt-8 flex flex-wrap gap-2 font-mono text-xs pt-6 border-t border-grid" role="group" aria-label="Filter cerita">
          {tags.map((tag) => {
            const isActive = activeTag === tag;
            const label = tag === 'all' ? 'Semua Catatan' : tag;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag(tag)}
                aria-pressed={isActive}
                className={`inline-flex min-h-[44px] items-center gap-2 rounded px-4 py-2 transition-colors ${
                  isActive
                    ? 'bg-ink text-paper dark:bg-paper dark:text-ink font-semibold'
                    : 'border border-grid hover:border-ink dark:hover:border-paper text-neutral-600 dark:text-neutral-400'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Stories List (Filling edge-to-edge horizontally) */}
      {isLoading ? (
        <div className="page-gutter py-10 sm:py-16">
          <StoryListSkeleton count={3} />
        </div>
      ) : hasError ? (
        <SectionError message="Cerita belum bisa dimuat dari server." onRetry={onRetry} />
      ) : filteredStories.length === 0 ? (
        <div className="page-gutter py-16 text-center">
          <p className="font-display text-xl font-bold mb-2">Belum ada cerita di kategori ini</p>
          <p className="font-mono text-xs text-neutral-500 dark:text-neutral-400">
            Pilih kategori tag lain untuk membaca catatan tongkrongan.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-grid">
          {filteredStories.map((story, idx) => {
            const displayCode = story.code || `STORY-${String(idx + 1).padStart(2, '0')}`;
            const hasImg = Boolean(story.img && story.img.trim() !== '');

            return (
              <article
                key={story.id || idx}
                className="page-gutter grid grid-cols-1 items-start gap-8 bg-paper py-10 transition-colors hover:bg-white dark:bg-[#0E0E0E] dark:hover:bg-neutral-900/60 sm:py-14 lg:grid-cols-12"
              >
                {/* Meta info */}
                <div className="space-y-3 font-mono text-xs lg:col-span-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded bg-ink px-2.5 py-1 font-bold text-paper dark:bg-paper dark:text-ink">
                      {displayCode}
                    </span>
                    <span className="font-semibold uppercase text-vermilion">
                      {story.tag || 'Catatan'}
                    </span>
                  </div>
                  <p className="pt-2 text-neutral-600 dark:text-neutral-300">
                    Oleh <strong className="font-semibold text-ink dark:text-paper">{story.author}</strong>
                  </p>
                  <p className="text-neutral-400 text-[11px]">{story.date}</p>
                </div>

                {/* Content body */}
                <div className={`${hasImg ? 'lg:col-span-6' : 'lg:col-span-9'} space-y-4`}>
                  <h2 className="break-words font-display text-2xl sm:text-3xl font-bold tracking-tight">
                    {story.title}
                  </h2>
                  <div className="whitespace-pre-line break-words text-base leading-relaxed text-neutral-700 dark:text-neutral-300 space-y-3">
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
    </div>
  );
};
