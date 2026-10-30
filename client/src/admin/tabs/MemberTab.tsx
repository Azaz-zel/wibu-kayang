import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Member } from '../../types';

interface MemberTabProps {
  token: string;
  showToast: (message: string, isError?: boolean) => void;
}

export const MemberTab: React.FC<MemberTabProps> = ({ token, showToast }) => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loadingList, setLoadingList] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'founder' | 'gamer' | 'lore'>('all');

  // Form State
  const [editId, setEditId] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [handle, setHandle] = useState('');
  const [role, setRole] = useState('');
  const [category, setCategory] = useState<'founder' | 'gamer' | 'lore'>('founder');
  const [fav, setFav] = useState('');
  const [quote, setQuote] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // Fetch Members
  const fetchMembers = useCallback(async () => {
    try {
      setLoadingList(true);
      const res = await fetch('/api/members');
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setMembers(json.data);
      }
    } catch {
      showToast('Gagal memuat daftar anggota dari server', true);
    } finally {
      setLoadingList(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  // Handle File Change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      if (selected.size > 5 * 1024 * 1024) {
        showToast('Ukuran file maksimal 5MB', true);
        return;
      }
      setFile(selected);
      const previewUrl = URL.createObjectURL(selected);
      setFilePreview(previewUrl);
    }
  };

  const clearFile = () => {
    setFile(null);
    if (filePreview && filePreview.startsWith('blob:')) {
      URL.revokeObjectURL(filePreview);
    }
    setFilePreview(null);
  };

  // Reset Form
  const resetForm = () => {
    setEditId(null);
    setName('');
    setHandle('');
    setRole('');
    setCategory('founder');
    setFav('');
    setQuote('');
    clearFile();
    setImageUrl('');
  };

  // Start Editing
  const handleStartEdit = (m: Member) => {
    setEditId(m.id);
    setName(m.name);
    setHandle(m.handle.startsWith('@') ? m.handle.slice(1) : m.handle);
    setRole(m.role);
    setCategory(m.category as 'founder' | 'gamer' | 'lore');
    setFav(m.fav);
    setQuote(m.quote);
    clearFile();
    setImageUrl(m.avatar);
    setFilePreview(m.avatar);

    // Scroll form into view smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Submit Form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !handle.trim() || !role.trim() || !fav.trim() || !quote.trim()) {
      showToast('Mohon lengkapi seluruh field yang wajib diisi', true);
      return;
    }

    setSubmitting(true);
    try {
      const cleanHandle = handle.trim().startsWith('@') ? handle.trim() : `@${handle.trim()}`;
      const isMultipart = Boolean(file);

      let url = '/api/members';
      let method = 'POST';

      if (editId) {
        url = `/api/members/${editId}`;
        method = 'PUT';
      }

      let res: Response;
      if (isMultipart) {
        const formData = new FormData();
        formData.append('name', name.trim());
        formData.append('handle', cleanHandle);
        formData.append('role', role.trim());
        formData.append('category', category);
        formData.append('fav', fav.trim());
        formData.append('quote', quote.trim());
        if (file) formData.append('image', file);
        if (imageUrl) formData.append('imageUrl', imageUrl.trim());

        res = await fetch(url, {
          method,
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });
      } else {
        res = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: name.trim(),
            handle: cleanHandle,
            role: role.trim(),
            category,
            fav: fav.trim(),
            quote: quote.trim(),
            imageUrl: imageUrl.trim() || undefined,
          }),
        });
      }

      const json = await res.json();
      if (json.success) {
        showToast(editId ? 'Data anggota berhasil diperbarui!' : 'Anggota baru berhasil ditambahkan!');
        resetForm();
        fetchMembers();
      } else {
        showToast(json.error || 'Gagal menyimpan data anggota', true);
      }
    } catch {
      showToast('Koneksi terputus saat menyimpan data', true);
    } finally {
      setSubmitting(false);
    }
  };

  // Delete Member
  const handleDelete = async (id: number, memberName: string) => {
    if (!window.confirm(`Yakin ingin menghapus anggota "${memberName}"? Tindakan ini tidak dapat dibatalkan.`)) {
      return;
    }

    setDeletingId(id);
    try {
      const res = await fetch(`/api/members/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (json.success) {
        showToast(`Anggota "${memberName}" berhasil dihapus.`);
        if (editId === id) resetForm();
        setMembers((prev) => prev.filter((m) => m.id !== id));
      } else {
        showToast(json.error || 'Gagal menghapus anggota', true);
      }
    } catch {
      showToast('Terjadi kesalahan jaringan saat menghapus anggota', true);
    } finally {
      setDeletingId(null);
    }
  };

  // Filtered List
  const filteredMembers = useMemo(() => {
    return members.filter((m) => {
      const matchCat = categoryFilter === 'all' || m.category === categoryFilter;
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        m.name.toLowerCase().includes(q) ||
        m.handle.toLowerCase().includes(q) ||
        m.role.toLowerCase().includes(q) ||
        m.code.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [members, categoryFilter, search]);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Action / Stats Summary */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded border border-grid bg-white dark:bg-[#141414]">
        <div>
          <h2 className="font-display text-lg font-bold">Manajemen Anggota (Roster)</h2>
          <p className="font-mono text-xs text-neutral-500">
            Total {members.length} anggota terdaftar dalam arsip database kolektif WK.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {editId && (
            <button
              onClick={resetForm}
              className="px-3 py-1.5 rounded border border-grid font-mono text-xs hover:bg-neutral-100 dark:hover:bg-[#202020] transition-colors"
            >
              ✕ Batal Edit
            </button>
          )}
          <span className="font-mono text-xs px-2.5 py-1 rounded bg-vermilion/10 text-vermilion border border-vermilion/30">
            {editId ? `MODE EDIT (#${editId})` : 'MODE TAMBAH BARU'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form (45%) */}
        <div className="lg:col-span-5 border border-grid bg-white dark:bg-[#121212] rounded p-6 shadow-sm sticky top-24">
          <div className="flex items-center justify-between border-b border-grid pb-3 mb-5">
            <h3 className="font-mono text-xs uppercase font-bold tracking-wider text-vermilion flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-vermilion"></span>
              {editId ? `Edit Anggota: ${name || '...'}` : 'Tambah Anggota Baru'}
            </h3>
            {editId && (
              <button
                type="button"
                onClick={resetForm}
                className="font-mono text-[11px] text-neutral-500 hover:text-vermilion underline"
              >
                Reset ke Form Baru
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nama & Handle */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-mono text-[11px] uppercase mb-1">Nama Anggota *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Adrian"
                  className="w-full px-3 py-2 rounded border border-grid bg-transparent font-mono text-xs focus:outline-none focus:border-vermilion"
                />
              </div>
              <div>
                <label className="block font-mono text-[11px] uppercase mb-1">Handle / Username *</label>
                <div className="relative">
                  <span className="absolute left-3 top-2 font-mono text-xs text-neutral-500">@</span>
                  <input
                    type="text"
                    required
                    value={handle}
                    onChange={(e) => setHandle(e.target.value)}
                    placeholder="adrian_wk"
                    className="w-full pl-7 pr-3 py-2 rounded border border-grid bg-transparent font-mono text-xs focus:outline-none focus:border-vermilion"
                  />
                </div>
              </div>
            </div>

            {/* Peran & Kategori */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-mono text-[11px] uppercase mb-1">Peran / Julukan *</label>
                <input
                  type="text"
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="Founder & Lead Architect"
                  className="w-full px-3 py-2 rounded border border-grid bg-transparent font-mono text-xs focus:outline-none focus:border-vermilion"
                />
              </div>
              <div>
                <label className="block font-mono text-[11px] uppercase mb-1">Kategori Divisi *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3 py-2 rounded border border-grid bg-transparent dark:bg-[#161616] font-mono text-xs focus:outline-none focus:border-vermilion"
                >
                  <option value="founder">Founder & Pioneer</option>
                  <option value="gamer">Gamer & Vanguard</option>
                  <option value="lore">Lore & Archival</option>
                </select>
              </div>
            </div>

            {/* Waifu / Fav */}
            <div>
              <label className="block font-mono text-[11px] uppercase mb-1">Waifu / Husbando / Fav Anime *</label>
              <input
                type="text"
                required
                value={fav}
                onChange={(e) => setFav(e.target.value)}
                placeholder="Contoh: Makima (Chainsaw Man)"
                className="w-full px-3 py-2 rounded border border-grid bg-transparent font-mono text-xs focus:outline-none focus:border-vermilion"
              />
            </div>

            {/* Kutipan */}
            <div>
              <label className="block font-mono text-[11px] uppercase mb-1">Kutipan / Catatan Karakter *</label>
              <textarea
                required
                rows={2}
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
                placeholder="Catatan santai atau quote ikonik anggota ini..."
                className="w-full px-3 py-2 rounded border border-grid bg-transparent font-mono text-xs focus:outline-none focus:border-vermilion resize-none"
              />
            </div>

            {/* Avatar / Foto */}
            <div className="border border-grid rounded p-3 bg-neutral-50/50 dark:bg-[#161616]/50 space-y-3">
              <label className="block font-mono text-[11px] uppercase font-bold text-neutral-700 dark:text-neutral-300">
                Foto Avatar Profil
              </label>

              {/* Preview Thumbnail */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded border border-grid overflow-hidden bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center shrink-0">
                  {filePreview ? (
                    <img src={filePreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <span className="font-mono text-[10px] text-neutral-400">NO FOTO</span>
                  )}
                </div>
                <div className="flex-1 space-y-1">
                  <label className="inline-block px-3 py-1.5 rounded border border-grid font-mono text-xs cursor-pointer hover:bg-neutral-100 dark:hover:bg-[#202020] transition-colors">
                    📁 Pilih File Gambar...
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                  {file && (
                    <div className="flex items-center gap-2 font-mono text-[10px] text-emerald-600 dark:text-emerald-400">
                      <span>✓ {file.name}</span>
                      <button type="button" onClick={clearFile} className="text-vermilion hover:underline">
                        ✕ Batal
                      </button>
                    </div>
                  )}
                  <p className="font-mono text-[10px] text-neutral-500">Maksimal 5MB (JPG, PNG, WebP)</p>
                </div>
              </div>

              {/* Atau URL Online */}
              <div>
                <span className="block font-mono text-[10px] text-neutral-500 uppercase mb-1">
                  Atau masukkan URL Gambar Langsung:
                </span>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => {
                    setImageUrl(e.target.value);
                    if (!file) setFilePreview(e.target.value);
                  }}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-2.5 py-1.5 rounded border border-grid bg-transparent font-mono text-xs focus:outline-none focus:border-vermilion"
                />
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-2.5 rounded bg-vermilion text-white font-mono text-xs uppercase tracking-wider font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <span>Menyimpan ke Database...</span>
                ) : editId ? (
                  <span>Simpan Perubahan Anggota [✓]</span>
                ) : (
                  <span>Tambahkan ke Roster WK [+]</span>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Member List (55%) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Search & Filter Bar */}
          <div className="p-4 rounded border border-grid bg-white dark:bg-[#121212] flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari anggota (nama, handle, role, kode)..."
                className="w-full px-3 py-2 rounded border border-grid bg-transparent font-mono text-xs focus:outline-none focus:border-vermilion"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-2 font-mono text-xs text-neutral-400 hover:text-ink dark:hover:text-paper"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
              {(['all', 'founder', 'gamer', 'lore'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-2.5 py-1.5 rounded font-mono text-[11px] uppercase transition-colors shrink-0 ${
                    categoryFilter === cat
                      ? 'bg-ink dark:bg-paper text-paper dark:text-ink font-bold'
                      : 'border border-grid hover:bg-neutral-100 dark:hover:bg-[#1a1a1a]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Members Table / Cards */}
          {loadingList ? (
            <div className="p-12 text-center border border-grid rounded font-mono text-xs text-neutral-500">
              Memuat data anggota...
            </div>
          ) : filteredMembers.length === 0 ? (
            <div className="p-12 text-center border border-grid rounded font-mono text-xs text-neutral-500 space-y-2">
              <p>Tidak ada anggota yang cocok dengan filter.</p>
              <button
                onClick={() => {
                  setSearch('');
                  setCategoryFilter('all');
                }}
                className="underline text-vermilion"
              >
                Reset pencarian
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredMembers.map((m) => (
                <div
                  key={m.id}
                  className={`p-4 rounded border transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-[#121212] ${
                    editId === m.id
                      ? 'border-vermilion ring-1 ring-vermilion/50'
                      : 'border-grid hover:border-neutral-400 dark:hover:border-neutral-700'
                  }`}
                >
                  {/* Left: Avatar & Info */}
                  <div className="flex items-center gap-3.5 min-w-0">
                    <img
                      src={m.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                      alt={m.name}
                      className="w-12 h-12 rounded object-cover border border-grid shrink-0 bg-neutral-200 dark:bg-neutral-800"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] text-neutral-500">{m.code}</span>
                        <h4 className="font-display font-bold text-sm truncate">{m.name}</h4>
                        <span className="font-mono text-[11px] text-vermilion truncate">{m.handle}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="font-mono text-[11px] text-neutral-600 dark:text-neutral-400 truncate">
                          {m.role}
                        </span>
                        <span className="font-mono text-[10px] px-1.5 py-0.5 rounded border border-grid bg-neutral-100 dark:bg-[#1e1e1e] uppercase">
                          {m.category}
                        </span>
                      </div>
                      <p className="font-mono text-[11px] text-neutral-400 truncate mt-1 italic">
                        "{m.quote}"
                      </p>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    <button
                      onClick={() => handleStartEdit(m)}
                      className="px-3 py-1.5 rounded border border-grid font-mono text-xs hover:border-vermilion hover:text-vermilion transition-colors"
                    >
                      Edit [✎]
                    </button>
                    <button
                      onClick={() => handleDelete(m.id, m.name)}
                      disabled={deletingId === m.id}
                      className="px-3 py-1.5 rounded border border-grid font-mono text-xs text-red-500 hover:bg-red-500/10 transition-colors disabled:opacity-50"
                    >
                      {deletingId === m.id ? '...' : 'Hapus [✕]'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
