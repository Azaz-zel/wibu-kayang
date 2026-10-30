import React, { useState, useCallback } from 'react';
import { MemberTab } from './tabs/MemberTab';
import { GalleryTab } from './tabs/GalleryTab';
import { StoryTab } from './tabs/StoryTab';
import { SettingsTab } from './tabs/SettingsTab';

interface AdminDashboardProps {
  token: string;
  username: string;
  onLogout: () => void;
  onNavigatePublic: () => void;
  isDark: boolean;
  toggleTheme: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  token,
  username,
  onLogout,
  onNavigatePublic,
  isDark,
  toggleTheme,
}) => {
  const [activeTab, setActiveTab] = useState<'members' | 'gallery' | 'stories' | 'settings'>('members');
  const [toast, setToast] = useState<{ message: string; isError?: boolean } | null>(null);

  const showToast = useCallback((message: string, isError = false) => {
    setToast({ message, isError });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col bg-[#F6F5F2] dark:bg-[#0E0E0E] text-ink dark:text-paper selection:bg-vermilion selection:text-white">
      {/* Top Fixed Control Bar */}
      <header className="sticky top-0 z-40 w-full border-b border-grid bg-white/95 dark:bg-[#121212]/95 backdrop-blur-none px-4 sm:px-8 py-3">
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Brand & Terminal Info */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded bg-ink dark:bg-paper text-paper dark:text-ink font-mono font-medium text-xs flex items-center justify-center font-bold">
                WK
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-mono text-xs uppercase tracking-widest font-bold">
                    Wibu Kayank CMS
                  </h1>
                  <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold">
                    ONLINE
                  </span>
                </div>
                <span className="font-mono text-[10px] text-neutral-500">
                  OPERATOR: @{username} // STANDALONE TERMINAL
                </span>
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={onNavigatePublic}
                className="font-mono text-xs px-2.5 py-1.5 rounded border border-grid hover:border-vermilion hover:text-vermilion"
              >
                Web Publik ↗
              </button>
              <button
                onClick={onLogout}
                className="font-mono text-xs px-2.5 py-1.5 rounded border border-grid text-red-500 hover:bg-red-500/10"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Desktop Right Tools */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="px-3 py-1.5 rounded border border-grid font-mono text-xs hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors flex items-center gap-1.5"
              title="Ganti Tema (Gelap / Terang)"
            >
              <span>{isDark ? '🌙 DARK' : '☀️ LIGHT'}</span>
            </button>

            {/* View Public Site */}
            <button
              onClick={onNavigatePublic}
              className="px-3.5 py-1.5 rounded border border-grid font-mono text-xs hover:border-vermilion hover:text-vermilion transition-colors flex items-center gap-1.5"
            >
              <span>Lihat Web Publik</span>
              <span>↗</span>
            </button>

            {/* Logout */}
            <button
              onClick={onLogout}
              className="px-3.5 py-1.5 rounded border border-grid font-mono text-xs text-red-500 hover:bg-red-500/10 transition-colors flex items-center gap-1.5"
            >
              <span>Keluar (Logout)</span>
              <span>⏻</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-2 mt-3 overflow-x-auto pt-2 border-t border-grid/50 scrollbar-none">
          <button
            onClick={() => setActiveTab('members')}
            className={`px-4 py-2 rounded font-mono text-xs uppercase tracking-wider transition-all shrink-0 flex items-center gap-2 ${
              activeTab === 'members'
                ? 'bg-vermilion text-white font-bold shadow-sm'
                : 'border border-grid hover:bg-neutral-100 dark:hover:bg-[#1a1a1a] text-neutral-600 dark:text-neutral-400'
            }`}
          >
            <span>👥</span>
            <span>Anggota Roster</span>
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`px-4 py-2 rounded font-mono text-xs uppercase tracking-wider transition-all shrink-0 flex items-center gap-2 ${
              activeTab === 'gallery'
                ? 'bg-vermilion text-white font-bold shadow-sm'
                : 'border border-grid hover:bg-neutral-100 dark:hover:bg-[#1a1a1a] text-neutral-600 dark:text-neutral-400'
            }`}
          >
            <span>🖼️</span>
            <span>Galeri Visual Log</span>
          </button>

          <button
            onClick={() => setActiveTab('stories')}
            className={`px-4 py-2 rounded font-mono text-xs uppercase tracking-wider transition-all shrink-0 flex items-center gap-2 ${
              activeTab === 'stories'
                ? 'bg-vermilion text-white font-bold shadow-sm'
                : 'border border-grid hover:bg-neutral-100 dark:hover:bg-[#1a1a1a] text-neutral-600 dark:text-neutral-400'
            }`}
          >
            <span>📜</span>
            <span>Cerita & Lore</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded font-mono text-xs uppercase tracking-wider transition-all shrink-0 flex items-center gap-2 ${
              activeTab === 'settings'
                ? 'bg-vermilion text-white font-bold shadow-sm'
                : 'border border-grid hover:bg-neutral-100 dark:hover:bg-[#1a1a1a] text-neutral-600 dark:text-neutral-400'
            }`}
          >
            <span>⚙️</span>
            <span>Pengaturan & Akun</span>
          </button>
        </div>
      </header>

      {/* Main Tab Workspace Content */}
      <main className="flex-1 w-full p-4 sm:p-8">
        {activeTab === 'members' && <MemberTab token={token} showToast={showToast} />}
        {activeTab === 'gallery' && <GalleryTab token={token} showToast={showToast} />}
        {activeTab === 'stories' && <StoryTab token={token} showToast={showToast} />}
        {activeTab === 'settings' && <SettingsTab token={token} showToast={showToast} />}
      </main>

      {/* Toast Notification Container */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded shadow-xl border font-mono text-xs flex items-center gap-3 transition-transform duration-200 ${
            toast.isError
              ? 'bg-red-950 text-red-200 border-red-800'
              : 'bg-emerald-950 text-emerald-200 border-emerald-800'
          }`}
        >
          <span>{toast.isError ? '✕' : '✓'}</span>
          <span>{toast.message}</span>
          <button
            onClick={() => setToast(null)}
            className="ml-2 text-neutral-400 hover:text-white"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};
