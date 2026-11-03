import React, { useEffect, useId, useRef } from 'react';
import { LightboxData } from '../types';

interface LightboxModalProps {
  data: LightboxData | null;
  onClose: () => void;
}

const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

export const LightboxModal: React.FC<LightboxModalProps> = ({ data, onClose }) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    if (!data) return;

    previouslyFocusedRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.body.classList.add('modal-open');
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== 'Tab') return;

      const dialog = dialogRef.current;
      if (!dialog) return;

      const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(focusableSelector)).filter(
        (element) => element.offsetParent !== null
      );

      if (focusable.length === 0) {
        event.preventDefault();
        dialog.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey) {
        if (document.activeElement === first || document.activeElement === dialog) {
          event.preventDefault();
          last.focus();
        }
      } else if (document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.classList.remove('modal-open');
      previouslyFocusedRef.current?.focus();
    };
  }, [data, onClose]);

  if (!data) return null;

  return (
    <div
      className="fixed inset-0 z-50 modal-backdrop flex items-center justify-center p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        tabIndex={-1}
        className="drawer-panel flex max-h-[calc(100svh-2rem)] w-full max-w-3xl flex-col overflow-hidden rounded border border-grid bg-[#F6F5F2] shadow-2xl dark:bg-[#141414]"
      >
        <div className="flex shrink-0 items-center justify-between gap-4 border-b border-grid px-4 py-2.5 font-mono text-xs">
          <span className="font-medium text-vermilion">{data.id}</span>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Tutup dialog"
            className="inline-flex min-h-[44px] items-center justify-center rounded border border-grid px-3 py-1 transition-colors hover:bg-ink hover:text-paper dark:hover:bg-paper dark:hover:text-ink"
          >
            Tutup (Esc)
          </button>
        </div>

        {data.img && (
          <div className="flex max-h-[55vh] shrink-0 items-center justify-center overflow-hidden bg-neutral-900">
            <img
              src={data.img}
              alt={data.title}
              className="h-full max-h-[55vh] w-full object-contain"
            />
          </div>
        )}

        <div className="min-h-0 overflow-y-auto overscroll-contain p-6">
          <div className="mb-3 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <h2 id={titleId} className="break-words font-display text-xl font-bold">
              {data.title}
            </h2>
            <span className="shrink-0 font-mono text-xs text-neutral-400">{data.date}</span>
          </div>
          <p
            id={descriptionId}
            className="whitespace-pre-line break-words text-sm leading-relaxed text-neutral-700 dark:text-neutral-300"
          >
            {data.desc}
          </p>
        </div>
      </div>
    </div>
  );
};
