import React, { useEffect } from 'react';
import { LightboxData } from '../types';

interface LightboxModalProps {
  data: LightboxData | null;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ data, onClose }) => {
  useEffect(() => {
    if (!data) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [data, onClose]);

  if (!data) return null;

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 modal-backdrop flex items-center justify-center p-4"
    >
      <div className="bg-[#F6F5F2] dark:bg-[#141414] border border-grid max-w-3xl w-full rounded overflow-hidden shadow-2xl max-h-[90vh] flex flex-col drawer-panel">
        <div className="px-4 py-3 border-b border-grid flex items-center justify-between font-mono text-xs shrink-0">
          <span className="text-vermilion font-medium">{data.id}</span>
          <button
            onClick={onClose}
            className="px-2.5 py-1 rounded border border-grid hover:bg-ink hover:text-paper dark:hover:bg-paper dark:hover:text-ink transition-colors"
          >
            TUTUP [ESC]
          </button>
        </div>

        {data.img && (
          <div className="bg-neutral-900 max-h-[55vh] overflow-hidden flex items-center justify-center shrink-0">
            <img
              src={data.img}
              alt={data.title}
              className="w-full h-full object-contain max-h-[55vh]"
            />
          </div>
        )}

        <div className="p-6 overflow-y-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <h4 className="font-display font-bold text-xl">{data.title}</h4>
            <span className="font-mono text-xs text-neutral-400 shrink-0">{data.date}</span>
          </div>
          <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed whitespace-pre-line">
            {data.desc}
          </p>
        </div>
      </div>
    </div>
  );
};
