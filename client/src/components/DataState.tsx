import React from 'react';

interface SectionErrorProps {
  onRetry: () => void;
  message: string;
}

export const SectionError: React.FC<SectionErrorProps> = ({ onRetry, message }) => (
  <div className="px-6 py-12 text-center font-mono text-sm sm:py-16">
    <p className="mb-2 font-medium text-ink dark:text-paper">Data belum bisa dimuat</p>
    <p className="mx-auto mb-5 max-w-md text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
      {message} Periksa koneksi, lalu coba lagi.
    </p>
    <button
      type="button"
      onClick={onRetry}
      className="inline-flex min-h-[44px] items-center justify-center rounded border border-grid px-5 py-2.5 text-xs uppercase tracking-wider transition-colors hover:border-ink dark:hover:border-paper"
    >
      Coba lagi
    </button>
  </div>
);

export const InlineError: React.FC<{ onRetry: () => void }> = ({ onRetry }) => (
  <div className="flex flex-wrap items-center gap-3">
    <span className="text-neutral-500 dark:text-neutral-400">Kanal belum bisa dimuat.</span>
    <button
      type="button"
      onClick={onRetry}
      className="inline-flex min-h-[44px] items-center justify-center rounded border border-grid px-4 py-2 text-xs uppercase tracking-wider transition-colors hover:border-ink dark:hover:border-paper"
    >
      Coba lagi
    </button>
  </div>
);

export const CardGridSkeleton: React.FC<{ count?: number }> = ({ count = 3 }) => (
  <div
    className="grid grid-cols-1 gap-px bg-neutral-200 dark:bg-neutral-800 sm:grid-cols-2 lg:grid-cols-3"
    aria-hidden="true"
  >
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="bg-paper p-6 dark:bg-[#0E0E0E] sm:p-8">
        <div className="mb-6 flex items-center justify-between">
          <div className="h-6 w-16 animate-pulse rounded bg-stone dark:bg-neutral-800" />
          <div className="h-4 w-20 animate-pulse rounded bg-stone dark:bg-neutral-800" />
        </div>
        <div className="mb-6 aspect-[4/3] w-full animate-pulse rounded bg-stone dark:bg-neutral-800" />
        <div className="mb-3 h-6 w-1/2 animate-pulse rounded bg-stone dark:bg-neutral-800" />
        <div className="mb-4 h-3 w-1/3 animate-pulse rounded bg-stone dark:bg-neutral-800" />
        <div className="mb-2 h-3 w-full animate-pulse rounded bg-stone dark:bg-neutral-800" />
        <div className="h-3 w-4/5 animate-pulse rounded bg-stone dark:bg-neutral-800" />
      </div>
    ))}
  </div>
);

export const GalleryGridSkeleton: React.FC = () => {
  const blocks = [
    { span: 'md:col-span-8', aspect: 'aspect-[16/10]' },
    { span: 'md:col-span-4', aspect: 'aspect-square' },
    { span: 'md:col-span-4', aspect: 'aspect-square' },
    { span: 'md:col-span-8', aspect: 'aspect-[16/10]' },
  ];

  return (
    <div
      className="grid grid-cols-1 gap-px bg-neutral-200 dark:bg-neutral-800 md:grid-cols-12"
      aria-hidden="true"
    >
      {blocks.map((block, i) => (
        <div
          key={i}
          className={`${block.span} bg-paper p-4 dark:bg-[#0E0E0E] sm:p-6`}
        >
          <div className={`mb-4 w-full animate-pulse rounded bg-stone dark:bg-neutral-800 ${block.aspect}`} />
          <div className="mb-2 h-5 w-1/2 animate-pulse rounded bg-stone dark:bg-neutral-800" />
          <div className="h-3 w-2/3 animate-pulse rounded bg-stone dark:bg-neutral-800" />
        </div>
      ))}
    </div>
  );
};

export const StoryListSkeleton: React.FC<{ count?: number }> = ({ count = 2 }) => (
  <div className="divide-y divide-neutral-200 dark:divide-neutral-800" aria-hidden="true">
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className="page-gutter grid grid-cols-1 gap-6 py-8 sm:py-10 lg:grid-cols-12"
      >
        <div className="space-y-2 lg:col-span-3">
          <div className="h-5 w-24 animate-pulse rounded bg-stone dark:bg-neutral-800" />
          <div className="h-3 w-20 animate-pulse rounded bg-stone dark:bg-neutral-800" />
        </div>
        <div className="space-y-3 lg:col-span-9">
          <div className="h-7 w-2/3 animate-pulse rounded bg-stone dark:bg-neutral-800" />
          <div className="h-3 w-full animate-pulse rounded bg-stone dark:bg-neutral-800" />
          <div className="h-3 w-11/12 animate-pulse rounded bg-stone dark:bg-neutral-800" />
          <div className="h-3 w-3/4 animate-pulse rounded bg-stone dark:bg-neutral-800" />
        </div>
      </div>
    ))}
  </div>
);

export const ChannelChipsSkeleton: React.FC<{ count?: number }> = ({ count = 3 }) => (
  <div className="flex flex-wrap gap-3" aria-hidden="true">
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className="h-11 w-24 animate-pulse rounded border border-grid bg-stone/40 dark:bg-neutral-800"
      />
    ))}
  </div>
);
