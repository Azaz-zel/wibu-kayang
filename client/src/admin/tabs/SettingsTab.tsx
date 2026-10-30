import React, { useState, useEffect, useCallback } from 'react';

interface SettingsTabProps {
  token: string;
  showToast: (message: string, isError?: boolean) => void;
}

export const SettingsTab: React.FC<SettingsTabProps> = ({ token, showToast }) => {
  // Social Channels Form State
  const [discord, setDiscord] = useState('');
  const [instagram, setInstagram] = useState('');
  const [twitter, setTwitter] = useState('');
  const [youtube, setYoutube] = useState('');
  const [tiktok, setTiktok] = useState('');
  const [loadingSocial, setLoadingSocial] = useState(false);
  const [savingSocial, setSavingSocial] = useState(false);

  // Password Change Form State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [savingPassword, setSavingPassword] = useState(false);

  // Fetch Settings
  const fetchSettings = useCallback(async () => {
    try {
      setLoadingSocial(true);
      const res = await fetch('/api/settings');
      const json = await res.json();
      if (json.success && json.data) {
        setDiscord(json.data.discord_url || '');
        setInstagram(json.data.instagram_url || '');
        setTwitter(json.data.twitter_url || '');
        setYoutube(json.data.youtube_url || '');
        setTiktok(json.data.tiktok_url || '');
      }
    } catch {
      showToast('Gagal memuat pengaturan kanal sosial', true);
    } finally {
      setLoadingSocial(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  // Handle Save Social Links
  const handleSaveSocial = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSocial(true);

    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          discord_url: discord.trim(),
          instagram_url: instagram.trim(),
          twitter_url: twitter.trim(),
          youtube_url: youtube.trim(),
          tiktok_url: tiktok.trim(),
        }),
      });

      const json = await res.json();
      if (json.success) {
        showToast('Kanal sosial media berhasil diperbarui!');
      } else {
        showToast(json.error || 'Gagal menyimpan kanal sosial', true);
      }
    } catch {
      showToast('Koneksi terputus saat menyimpan pengaturan', true);
    } finally {
      setSavingSocial(false);
    }
  };

  // Handle Change Password
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) {
      showToast('Mohon isi password saat ini dan password baru', true);
      return;
    }

    if (newPassword.length < 6) {
      showToast('Password baru minimal 6 karakter', true);
      return;
    }

    if (newPassword !== confirmPassword) {
      showToast('Konfirmasi password tidak cocok dengan password baru', true);
      return;
    }

    setSavingPassword(true);
    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      const json = await res.json();
      if (json.success) {
        showToast('Password operator berhasil diubah!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        showToast(json.error || 'Gagal mengubah password', true);
      }
    } catch {
      showToast('Koneksi terputus saat menghubungi server', true);
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="p-4 rounded border border-grid bg-white dark:bg-[#141414]">
        <h2 className="font-display text-lg font-bold">Pengaturan Sistem & Keamanan Akun</h2>
        <p className="font-mono text-xs text-neutral-500">
          Konfigurasi link komunitas publik dan kredensial akses operator.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Section 1: Social Media Channels */}
        <div className="border border-grid bg-white dark:bg-[#121212] rounded p-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-grid pb-3 mb-5">
            <h3 className="font-mono text-xs uppercase font-bold tracking-wider text-vermilion flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-vermilion"></span>
              Kanal Komunitas Publik (Social Links)
            </h3>
            {loadingSocial && <span className="font-mono text-[10px] text-neutral-400">Memuat...</span>}
          </div>

          <form onSubmit={handleSaveSocial} className="space-y-4">
            <div>
              <label className="block font-mono text-[11px] uppercase mb-1 flex items-center justify-between">
                <span>Discord Invite URL</span>
                <span className="text-neutral-400 font-normal">discord.gg/...</span>
              </label>
              <input
                type="text"
                value={discord}
                onChange={(e) => setDiscord(e.target.value)}
                placeholder="https://discord.gg/wibukayank"
                className="w-full px-3 py-2 rounded border border-grid bg-transparent font-mono text-xs focus:outline-none focus:border-vermilion"
              />
            </div>

            <div>
              <label className="block font-mono text-[11px] uppercase mb-1 flex items-center justify-between">
                <span>Instagram Profile URL</span>
                <span className="text-neutral-400 font-normal">instagram.com/...</span>
              </label>
              <input
                type="text"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                placeholder="https://instagram.com/wibukayank"
                className="w-full px-3 py-2 rounded border border-grid bg-transparent font-mono text-xs focus:outline-none focus:border-vermilion"
              />
            </div>

            <div>
              <label className="block font-mono text-[11px] uppercase mb-1 flex items-center justify-between">
                <span>Twitter / X Profile URL</span>
                <span className="text-neutral-400 font-normal">x.com/...</span>
              </label>
              <input
                type="text"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
                placeholder="https://x.com/wibukayank"
                className="w-full px-3 py-2 rounded border border-grid bg-transparent font-mono text-xs focus:outline-none focus:border-vermilion"
              />
            </div>

            <div>
              <label className="block font-mono text-[11px] uppercase mb-1 flex items-center justify-between">
                <span>YouTube Channel URL</span>
                <span className="text-neutral-400 font-normal">youtube.com/@...</span>
              </label>
              <input
                type="text"
                value={youtube}
                onChange={(e) => setYoutube(e.target.value)}
                placeholder="https://youtube.com/@wibukayank"
                className="w-full px-3 py-2 rounded border border-grid bg-transparent font-mono text-xs focus:outline-none focus:border-vermilion"
              />
            </div>

            <div>
              <label className="block font-mono text-[11px] uppercase mb-1 flex items-center justify-between">
                <span>TikTok Profile URL</span>
                <span className="text-neutral-400 font-normal">tiktok.com/@...</span>
              </label>
              <input
                type="text"
                value={tiktok}
                onChange={(e) => setTiktok(e.target.value)}
                placeholder="https://tiktok.com/@wibukayank"
                className="w-full px-3 py-2 rounded border border-grid bg-transparent font-mono text-xs focus:outline-none focus:border-vermilion"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={savingSocial}
                className="w-full py-2.5 rounded bg-vermilion text-white font-mono text-xs uppercase tracking-wider font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {savingSocial ? 'Menyimpan ke Database...' : 'Simpan Perubahan Link [✓]'}
              </button>
            </div>
          </form>
        </div>

        {/* Section 2: Account Security */}
        <div className="border border-grid bg-white dark:bg-[#121212] rounded p-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-grid pb-3 mb-5">
            <h3 className="font-mono text-xs uppercase font-bold tracking-wider text-vermilion flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-vermilion"></span>
              Keamanan Kredensial (Ganti Password)
            </h3>
            <span className="font-mono text-[10px] text-neutral-500">OPERATOR: ADMIN</span>
          </div>

          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label className="block font-mono text-[11px] uppercase mb-1">Password Saat Ini *</label>
              <input
                type="password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2 rounded border border-grid bg-transparent font-mono text-xs focus:outline-none focus:border-vermilion"
              />
              <p className="font-mono text-[10px] text-neutral-400 mt-1">Default sistem sebelumnya: wk2026</p>
            </div>

            <div>
              <label className="block font-mono text-[11px] uppercase mb-1">Password Baru *</label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Minimal 6 karakter"
                className="w-full px-3 py-2 rounded border border-grid bg-transparent font-mono text-xs focus:outline-none focus:border-vermilion"
              />
            </div>

            <div>
              <label className="block font-mono text-[11px] uppercase mb-1">Konfirmasi Password Baru *</label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Ketik ulang password baru"
                className="w-full px-3 py-2 rounded border border-grid bg-transparent font-mono text-xs focus:outline-none focus:border-vermilion"
              />
            </div>

            <div className="p-3 rounded border border-grid bg-neutral-50/50 dark:bg-[#161616]/50 font-mono text-[11px] text-neutral-500 space-y-1">
              <p className="font-bold text-neutral-700 dark:text-neutral-300">Catatan Keamanan:</p>
              <p>Password dienkripsi secara aman menggunakan bcrypt salt 10 rounds di database MySQL.</p>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={savingPassword}
                className="w-full py-2.5 rounded bg-ink dark:bg-paper text-paper dark:text-ink font-mono text-xs uppercase tracking-wider font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {savingPassword ? 'Memperbarui Password...' : 'Update Password Operator [🔒]'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
