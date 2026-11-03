import React from 'react';
import { SettingsMap } from '../types';
import { ChannelChipsSkeleton, InlineError } from './DataState';
import { DEFAULT_SETTINGS } from '../defaultData';

interface SocialChannelsProps {
  settings: SettingsMap;
  isLoading: boolean;
  hasError: boolean;
  onRetry: () => void;
}

const channels = [
  { key: 'discord_url', label: 'Discord Server', desc: 'Sesi voice harian & nobar' },
  { key: 'instagram_url', label: 'Instagram', desc: 'Dokumentasi & cuplikan' },
  { key: 'twitter_url', label: 'X (Twitter)', desc: 'Celoteh & live tweet' },
  { key: 'youtube_url', label: 'YouTube', desc: 'VOD & highlight nobar' },
  { key: 'tiktok_url', label: 'TikTok', desc: 'Klip pendek santai' },
];

export const SocialChannels: React.FC<SocialChannelsProps> = ({
  settings,
  isLoading,
  hasError,
  onRetry,
}) => {
  // Use settings or fallback to default settings so channels are never empty
  const effectiveSettings = Object.keys(settings).length > 0 ? settings : DEFAULT_SETTINGS;

  const activeChannels = channels.filter(
    (channel) => effectiveSettings[channel.key] && effectiveSettings[channel.key].trim() !== ''
  );

  return (
    <section
      id="socials"
      className="border-b border-grid bg-stone/20 dark:bg-neutral-900/30"
      aria-busy={isLoading}
    >
      <div className="page-gutter flex flex-col items-start justify-between gap-6 py-8 sm:flex-row sm:items-center sm:py-10">
        <div>
          <h2 className="font-display text-xl font-bold uppercase tracking-tight sm:text-2xl">
            Kanal Komunitas WK<span className="text-vermilion">.</span>
          </h2>
          <p className="mt-1 font-mono text-xs text-neutral-500 dark:text-neutral-400">
            Terhubung ke server Discord utama dan media sosial lingkaran kami.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
          {isLoading ? (
            <ChannelChipsSkeleton count={3} />
          ) : hasError ? (
            <InlineError onRetry={onRetry} />
          ) : activeChannels.length === 0 ? (
            <span className="italic text-neutral-500 dark:text-neutral-400">
              Kanal sosial belum tersedia.
            </span>
          ) : (
            activeChannels.map((channel) => (
              <a
                key={channel.key}
                href={effectiveSettings[channel.key]}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 rounded border border-grid bg-paper px-4 py-2.5 transition-colors hover:border-ink hover:text-vermilion dark:bg-[#0E0E0E] dark:hover:border-paper dark:hover:text-vermilion"
              >
                <span className="font-medium">{channel.label}</span>
                <span aria-hidden="true" className="text-vermilion">↗</span>
                <span className="sr-only">(buka di tab baru)</span>
              </a>
            ))
          )}
        </div>
      </div>
    </section>
  );
};
