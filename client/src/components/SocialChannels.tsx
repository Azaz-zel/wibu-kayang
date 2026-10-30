import React from 'react';
import { SettingsMap } from '../types';

interface SocialChannelsProps {
  settings: SettingsMap;
}

export const SocialChannels: React.FC<SocialChannelsProps> = ({ settings }) => {
  const channels = [
    { key: 'discord_url', prefix: 'DISCORD' },
    { key: 'instagram_url', prefix: 'IG' },
    { key: 'twitter_url', prefix: 'X.COM' },
    { key: 'youtube_url', prefix: 'YT' },
    { key: 'tiktok_url', prefix: 'TIKTOK' },
  ];

  const activeChannels = channels.filter(ch => settings[ch.key] && settings[ch.key].trim() !== '');

  return (
    <section id="socials" className="border-b border-grid bg-stone/20 dark:bg-neutral-900/30">
      <div className="px-6 sm:px-12 lg:px-16 py-6 sm:py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <span className="font-mono text-xs text-vermilion uppercase tracking-widest block mb-1">
            // TRANSMISSION // CHANNELS
          </span>
          <h3 className="font-display text-xl font-bold uppercase tracking-tight">
            Kanal & Jaringan WK
          </h3>
        </div>
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
          {activeChannels.length === 0 ? (
            <span className="text-neutral-400 italic">
              Kanal belum dikonfigurasi. Atur di panel admin.
            </span>
          ) : (
            activeChannels.map(ch => (
              <a
                key={ch.key}
                href={settings[ch.key]}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded border border-grid hover:border-ink dark:hover:border-paper hover:text-vermilion transition-colors"
              >
                [{ch.prefix}] ↗
              </a>
            ))
          )}
        </div>
      </div>
    </section>
  );
};
