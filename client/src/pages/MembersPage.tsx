import React, { useState } from 'react';
import { Member } from '../types';
import { CardGridSkeleton, SectionError } from '../components/DataState';

interface MembersPageProps {
  members: Member[];
  isLoading: boolean;
  hasError: boolean;
  onRetry: () => void;
  onNavigate?: (path: string) => void;
}

const filters = [
  { key: 'all', label: 'Semua' },
  { key: 'founder', label: 'Inti / Founder' },
  { key: 'gamer', label: 'Divisi Game' },
  { key: 'lore', label: 'Lore & Manga' },
] as const;

type FilterKey = (typeof filters)[number]['key'];

export const MembersPage: React.FC<MembersPageProps> = ({
  members,
  isLoading,
  hasError,
  onRetry,
  onNavigate,
}) => {
  const [filter, setFilter] = useState<FilterKey>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Count helper
  const getFilterCount = (key: FilterKey) => {
    if (key === 'all') return members.length;
    return members.filter((m) => m.category === key).length;
  };

  // Filtered members by category and search
  const filtered = members.filter((m) => {
    const matchesCategory = filter === 'all' || m.category === filter;
    const matchesSearch =
      searchQuery.trim() === '' ||
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.fav.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.handle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
          <span className="text-ink dark:text-paper font-semibold">Anggota</span>
        </div>
      </div>

      {/* Main Page Title Header */}
      <div className="page-gutter py-10 sm:py-16 border-b border-grid">
        <h1 className="font-display text-4xl sm:text-6xl font-extrabold uppercase tracking-tight">
          Daftar Anggota WK<span className="text-vermilion">.</span>
        </h1>
        <p className="mt-4 font-mono text-sm sm:text-base text-neutral-600 dark:text-neutral-300 max-w-3xl leading-relaxed">
          Enam anggota dengan selera berbeda, disatukan oleh tawa, wacana warkop, dan rasa kantuk di Discord.
        </p>

        {/* Filters and Search Bar Row (filling horizontal space) */}
        <div className="mt-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pt-6 border-t border-grid">
          {/* Category Filter Buttons */}
          <div className="flex flex-wrap gap-2 font-mono text-xs" role="group" aria-label="Filter anggota">
            {filters.map((item) => {
              const count = getFilterCount(item.key);
              const isActive = filter === item.key;
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setFilter(item.key)}
                  aria-pressed={isActive}
                  className={`inline-flex min-h-[44px] items-center gap-2 rounded px-4 py-2 transition-colors ${
                    isActive
                      ? 'bg-ink text-paper dark:bg-paper dark:text-ink font-semibold'
                      : 'border border-grid hover:border-ink dark:hover:border-paper text-neutral-600 dark:text-neutral-400'
                  }`}
                >
                  <span>{item.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded ${
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

          {/* Search Box */}
          <div className="relative min-w-[240px]">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama / anime favorit..."
              aria-label="Cari anggota"
              className="w-full min-h-[44px] rounded border border-grid bg-white dark:bg-neutral-900 px-4 py-2 font-mono text-xs text-ink dark:text-paper placeholder-neutral-400 focus:border-vermilion focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-ink dark:hover:text-paper font-mono text-xs p-1"
                aria-label="Reset pencarian"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Member Cards Grid (Spanning edge-to-edge horizontally) */}
      {isLoading ? (
        <div className="page-gutter py-10 sm:py-16">
          <CardGridSkeleton count={6} />
        </div>
      ) : hasError ? (
        <SectionError message="Daftar anggota belum bisa dimuat dari server." onRetry={onRetry} />
      ) : filtered.length === 0 ? (
        <div className="page-gutter py-16 text-center">
          <p className="font-display text-xl font-bold mb-2">Tidak ditemukan anggota</p>
          <p className="font-mono text-xs text-neutral-500 dark:text-neutral-400">
            Coba ubah kata kunci pencarian atau ganti kategori filter.
          </p>
        </div>
      ) : (
        <div className="page-gutter py-10 sm:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((member, idx) => {
              const displayCode = member.code || `WK-${String(idx + 1).padStart(2, '0')}`;
              const avatarSrc =
                member.avatar ||
                `https://placehold.co/600x450/121212/F6F5F2?text=${encodeURIComponent(member.name)}`;

              return (
                <article
                  key={member.id || idx}
                  className="group flex flex-col justify-between rounded border border-grid bg-paper p-6 sm:p-8 transition-all hover:border-ink hover:shadow-lg dark:bg-[#0E0E0E] dark:hover:border-paper"
                >
                  <div>
                    {/* Header: Code & Handle */}
                    <div className="mb-5 flex items-center justify-between gap-4 font-mono text-xs">
                      <span className="rounded bg-ink px-2.5 py-1 font-bold text-paper dark:bg-paper dark:text-ink">
                        {displayCode}
                      </span>
                      <span className="text-neutral-500 dark:text-neutral-400">{member.handle}</span>
                    </div>

                    {/* Member Image */}
                    <div className="mb-6 aspect-[4/3] w-full overflow-hidden rounded border border-grid bg-neutral-200 dark:bg-neutral-800">
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

                    {/* Member Info */}
                    <div className="mb-4">
                      <h2 className="break-words font-display text-2xl font-bold tracking-tight">
                        {member.name}
                      </h2>
                      <p className="mt-1 font-mono text-xs uppercase tracking-wider text-vermilion font-semibold">
                        {member.role}
                      </p>
                    </div>

                    {/* Member Quote */}
                    <blockquote className="mb-6 break-words text-sm italic leading-relaxed text-neutral-600 dark:text-neutral-300 border-l-2 border-vermilion/50 pl-3">
                      “{member.quote}”
                    </blockquote>
                  </div>

                  {/* Footer Favorite Item */}
                  <div className="border-t border-grid pt-4 font-mono text-xs flex items-center justify-between gap-2 text-neutral-500 dark:text-neutral-400">
                    <span className="uppercase text-[10px] tracking-wider font-semibold">FAVORIT</span>
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
    </div>
  );
};
