import React, { useState } from 'react';
import { Member } from '../types';
import { CardGridSkeleton, SectionError } from './DataState';

interface MemberRosterProps {
  members: Member[];
  isLoading: boolean;
  hasError: boolean;
  onRetry: () => void;
}

const filters = [
  { key: 'all', label: 'Semua' },
  { key: 'founder', label: 'Inti / Founder' },
  { key: 'gamer', label: 'Divisi Game' },
  { key: 'lore', label: 'Lore & Manga' },
] as const;

type FilterKey = (typeof filters)[number]['key'];

export const MemberRoster: React.FC<MemberRosterProps> = ({
  members,
  isLoading,
  hasError,
  onRetry,
}) => {
  const [filter, setFilter] = useState<FilterKey>('all');

  const filtered =
    filter === 'all' ? members : members.filter((member) => member.category === filter);

  // Helper count for filters
  const getFilterCount = (key: FilterKey) => {
    if (key === 'all') return members.length;
    return members.filter((m) => m.category === key).length;
  };

  return (
    <section id="members" className="border-b border-grid" aria-busy={isLoading}>
      {/* Header bar */}
      <div className="page-gutter flex flex-col justify-between gap-6 border-b border-grid py-8 sm:flex-row sm:items-end sm:py-10">
        <div>
          <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight sm:text-4xl">
            Daftar Anggota<span className="text-vermilion">.</span>
          </h2>
          <p className="mt-2 font-mono text-xs text-neutral-500 dark:text-neutral-400">
            Enam kepala dengan selera berbeda, disatukan oleh tawa dan rasa kantuk.
          </p>
        </div>

        {/* Filter buttons */}
        <div
          className="flex flex-wrap gap-2 font-mono text-xs"
          role="group"
          aria-label="Filter anggota"
        >
          {filters.map((item) => {
            const count = getFilterCount(item.key);
            const isActive = filter === item.key;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => setFilter(item.key)}
                aria-pressed={isActive}
                disabled={isLoading || hasError}
                className={`inline-flex min-h-[44px] items-center gap-1.5 rounded px-4 py-2 transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
                  isActive
                    ? 'bg-ink text-paper dark:bg-paper dark:text-ink font-semibold'
                    : 'border border-grid hover:border-ink dark:hover:border-paper text-neutral-600 dark:text-neutral-400'
                }`}
              >
                <span>{item.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded ${
                    isActive
                      ? 'bg-vermilion text-white'
                      : 'bg-stone/50 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {isLoading ? (
        <div className="page-gutter py-8 sm:py-12">
          <CardGridSkeleton count={Math.min(Math.max(members.length, 3), 6)} />
        </div>
      ) : hasError ? (
        <SectionError message="Daftar anggota belum bisa dimuat dari server." onRetry={onRetry} />
      ) : filtered.length === 0 ? (
        <div className="bg-paper p-12 text-center dark:bg-[#0E0E0E]">
          <p className="mb-1 text-sm font-medium text-ink dark:text-paper">
            Belum ada anggota di kategori ini.
          </p>
          <p className="font-mono text-xs text-neutral-500 dark:text-neutral-400">
            {filter === 'all'
              ? 'Profil anggota akan muncul di sini.'
              : 'Coba pilih kategori filter lain di atas.'}
          </p>
        </div>
      ) : (
        <div className="page-gutter py-8 sm:py-12">
          <div className="grid grid-cols-1 gap-px bg-neutral-200 dark:bg-neutral-800 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((member, idx) => {
              const displayCode = member.code || `WK-${String(idx + 1).padStart(2, '0')}`;
              const avatarSrc =
                member.avatar ||
                `https://placehold.co/600x450/121212/F6F5F2?text=${encodeURIComponent(member.name)}`;

              return (
                <article
                  key={member.id || idx}
                  className="group flex flex-col justify-between bg-paper p-6 transition-colors hover:bg-white dark:bg-[#0E0E0E] dark:hover:bg-neutral-900 sm:p-8"
                >
                  <div>
                    {/* Member Top Identification */}
                    <div className="mb-5 flex items-center justify-between gap-4 font-mono text-xs text-neutral-500 dark:text-neutral-400">
                      <span className="rounded border border-grid px-2.5 py-0.5 font-semibold text-ink dark:text-paper">
                        {displayCode}
                      </span>
                      <span className="font-mono text-xs text-neutral-500">{member.handle}</span>
                    </div>

                    {/* Member Photo */}
                    <div className="mb-6 aspect-[4/3] w-full overflow-hidden rounded bg-neutral-200 dark:bg-neutral-800 border border-grid">
                      <img
                        src={avatarSrc}
                        alt={`Foto ${member.name}`}
                        loading="lazy"
                        decoding="async"
                        onError={(event) => {
                          (event.target as HTMLImageElement).src =
                            `https://placehold.co/600x450/121212/F6F5F2?text=${encodeURIComponent(member.name)}`;
                        }}
                        className="archive-img h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* Member Name and Role */}
                    <div className="mb-4">
                      <h3 className="break-words font-display text-2xl font-bold tracking-tight">
                        {member.name}
                      </h3>
                      <p className="mt-1 font-mono text-xs uppercase tracking-wider text-vermilion font-medium">
                        {member.role}
                      </p>
                    </div>

                    {/* Quote */}
                    <blockquote className="mb-6 break-words text-sm italic leading-relaxed text-neutral-600 dark:text-neutral-300 border-l-2 border-vermilion/40 pl-3">
                      “{member.quote}”
                    </blockquote>
                  </div>

                  {/* Favorite anime/game */}
                  <div className="border-t border-grid pt-4 font-mono text-xs flex items-center justify-between gap-2 text-neutral-500 dark:text-neutral-400">
                    <span className="uppercase text-[10px] tracking-wider">Favorit</span>
                    <span className="truncate text-right font-medium text-ink dark:text-paper">
                      {member.fav}
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};
