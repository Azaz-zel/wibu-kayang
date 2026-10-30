import React, { useState } from 'react';
import { Member } from '../types';

interface MemberRosterProps {
  members: Member[];
}

export const MemberRoster: React.FC<MemberRosterProps> = ({ members }) => {
  const [filter, setFilter] = useState<'all' | 'founder' | 'gamer' | 'lore'>('all');

  const filtered = filter === 'all'
    ? members
    : members.filter(m => m.category === filter);

  return (
    <section id="members" className="border-b border-grid">
      {/* Header Bar */}
      <div className="px-6 sm:px-12 lg:px-16 py-6 sm:py-8 border-b border-grid flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="font-mono text-xs text-vermilion uppercase tracking-widest block mb-2">// INDEX 03</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight">Member Roster</h2>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-1.5 font-mono text-xs">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded transition-colors ${
              filter === 'all'
                ? 'bg-ink text-paper dark:bg-paper dark:text-ink'
                : 'border border-grid hover:border-ink dark:hover:border-paper'
            }`}
          >
            ALL [{String(members.length).padStart(2, '0')}]
          </button>
          <button
            onClick={() => setFilter('founder')}
            className={`px-3 py-1.5 rounded transition-colors ${
              filter === 'founder'
                ? 'bg-ink text-paper dark:bg-paper dark:text-ink'
                : 'border border-grid hover:border-ink dark:hover:border-paper'
            }`}
          >
            CORE
          </button>
          <button
            onClick={() => setFilter('gamer')}
            className={`px-3 py-1.5 rounded transition-colors ${
              filter === 'gamer'
                ? 'bg-ink text-paper dark:bg-paper dark:text-ink'
                : 'border border-grid hover:border-ink dark:hover:border-paper'
            }`}
          >
            DIVISI GAME
          </button>
          <button
            onClick={() => setFilter('lore')}
            className={`px-3 py-1.5 rounded transition-colors ${
              filter === 'lore'
                ? 'bg-ink text-paper dark:bg-paper dark:text-ink'
                : 'border border-grid hover:border-ink dark:hover:border-paper'
            }`}
          >
            LORE & MANGA
          </button>
        </div>
      </div>

      {/* Roster Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 divide-y sm:divide-y-0 sm:gap-px bg-neutral-200 dark:bg-neutral-800">
        {filtered.length === 0 ? (
          <div className="col-span-full p-12 text-center font-mono text-sm text-neutral-500 bg-[#F6F5F2] dark:bg-[#0E0E0E]">
            <p className="mb-2">// BELUM ADA MEMBER DI KATEGORI INI //</p>
            <p className="text-xs text-neutral-400">Tambahkan profil member baru melalui panel admin.</p>
          </div>
        ) : (
          filtered.map((member, idx) => {
            const displayCode = member.code || `WK-${String(idx + 1).padStart(2, '0')}`;
            const avatarSrc = member.avatar || `https://placehold.co/600x450/121212/F6F5F2?text=${encodeURIComponent(member.name)}`;

            return (
              <article
                key={member.id || idx}
                className="group bg-[#F6F5F2] dark:bg-[#0E0E0E] p-6 sm:p-8 flex flex-col justify-between transition-colors hover:bg-white dark:hover:bg-neutral-900"
              >
                <div>
                  <div className="flex items-center justify-between font-mono text-xs text-neutral-500 mb-6">
                    <span className="px-2 py-0.5 rounded border border-grid text-ink dark:text-paper font-medium">
                      {displayCode}
                    </span>
                    <span>{member.handle}</span>
                  </div>

                  <div className="aspect-[4/3] w-full overflow-hidden rounded bg-neutral-200 dark:bg-neutral-800 mb-6">
                    <img
                      src={avatarSrc}
                      alt={`Avatar ${member.name}`}
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://placehold.co/600x450/121212/F6F5F2?text=${encodeURIComponent(member.name)}`;
                      }}
                      className="archive-img w-full h-full object-cover group-hover:scale-105"
                    />
                  </div>

                  <div className="mb-4">
                    <h3 className="font-display text-2xl font-bold tracking-tight">{member.name}</h3>
                    <p className="font-mono text-xs text-vermilion uppercase tracking-wider mt-0.5">
                      {member.role}
                    </p>
                  </div>

                  <p className="text-sm text-neutral-600 dark:text-neutral-400 italic leading-relaxed mb-6">
                    "{member.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-grid flex items-center justify-between font-mono text-[11px] text-neutral-500">
                  <span>FAV ARCHIVE:</span>
                  <span className="text-ink dark:text-paper font-medium truncate max-w-[60%]">
                    {member.fav}
                  </span>
                </div>
              </article>
            );
          })
        )}
      </div>
    </section>
  );
};
