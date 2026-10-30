import React, { useState } from 'react';

interface AdminLoginPageProps {
  onLoginSuccess: (token: string, username: string) => void;
  onBackToPublic: () => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({
  onLoginSuccess,
  onBackToPublic,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const json = await res.json();
      if (json.success && json.data?.token) {
        onLoginSuccess(json.data.token, json.data.username);
      } else {
        setError(json.error || 'Username atau password salah.');
      }
    } catch {
      setError('Gagal menghubungi server database. Pastikan backend aktif.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-[#F6F5F2] dark:bg-[#0E0E0E] text-ink dark:text-paper selection:bg-vermilion selection:text-white">
      <div className="w-full max-w-md border border-grid bg-white dark:bg-[#121212] rounded p-6 sm:p-8 shadow-2xl space-y-6">
        {/* Brand Header */}
        <div className="flex items-center justify-between border-b border-grid pb-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded bg-ink dark:bg-paper text-paper dark:text-ink font-mono font-medium text-xs flex items-center justify-center">
              WK
            </span>
            <div>
              <h2 className="font-mono text-xs uppercase tracking-widest font-bold">
                Wibu Kayank Terminal
              </h2>
              <span className="font-mono text-[10px] text-neutral-500">
                OPERATOR ACCESS ONLY
              </span>
            </div>
          </div>
          <button
            onClick={onBackToPublic}
            className="font-mono text-xs text-neutral-500 hover:text-vermilion transition-colors"
          >
            Web Publik [↗]
          </button>
        </div>

        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight">Login CMS Operator</h1>
          <p className="text-xs text-neutral-500 font-mono mt-1">
            Masuk untuk mengelola data anggota, dokumentasi visual, dan cerita tongkrongan.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-mono text-[11px] uppercase mb-1">Username Operator</label>
            <input
              type="text"
              required
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              className="w-full px-3 py-2.5 rounded border border-grid bg-transparent font-mono text-sm focus:outline-none focus:border-vermilion"
            />
          </div>

          <div>
            <label className="block font-mono text-[11px] uppercase mb-1">Kata Sandi</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2.5 rounded border border-grid bg-transparent font-mono text-sm focus:outline-none focus:border-vermilion"
            />
          </div>

          {error && (
            <div className="p-3 rounded border border-vermilion bg-vermilion/10 text-vermilion font-mono text-xs">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded bg-vermilion text-white font-mono text-xs uppercase tracking-wider font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? 'MEMERIKSA KREDENSIAL...' : 'Masuk Dashboard Admin [→]'}
          </button>
        </form>

        <div className="pt-4 border-t border-grid flex items-center justify-between font-mono text-[11px] text-neutral-500">
          <span>PORT: 3000 // MYSQL</span>
          <button
            onClick={onBackToPublic}
            className="underline hover:text-vermilion"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    </div>
  );
};
