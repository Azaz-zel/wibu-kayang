import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { GalleryItem } from '../../types';

interface GalleryTabProps {
  token: string;
  showToast: (message: string, isError?: boolean) => void;
}

export const GalleryTab: React.FC<GalleryTabProps> = ({ token, showToast }) => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loadingList, setLoadingList] = useState(true);
  const [search, setSearch] = useState('');

  // Form State
  const [editId, setEditId] = useState<number | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [spanSize, setSpanSize] = useState<'normal' | 'wide'>('normal');
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // Fetch Gallery Items
  const fetchGallery = useCallback(async () => {
    try {
      setLoadingList(true);
      const res = await fetch('/api/gallery');
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setItems(json.data);
      }
    } catch {
      showToast('Gagal memuat galeri dari server', true);
    } finally {
      setLoadingList(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchGallery();
  }, [fetchGallery]);

  // Handle File Change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      if (selected.size > 10 * 1024 * 1024) {
        showToast('Ukuran file maksimal 10MB', true);
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
    setTitle('');
    setDescription('');
    setDate('');
    setSpanSize('normal');
    clearFile();
    setImageUrl('');
  };

  // Start Editing
  const handleStartEdit = (item: GalleryItem) => {
    setEditId(item.id);
    setTitle(item.title);
    setDescription(item.description);
    setDate(item.date || '');
    setSpanSize((item.spanSize as 'normal' | 'wide') || 'normal');
    clearFile();
    setImageUrl(item.img || '');
    setFilePreview(item.img || '');

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Submit Form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      showToast('Mohon lengkapi judul dan deskripsi foto', true);
      return;
    }

    if (!editId && !file && !imageUrl.trim()) {
      showToast('Mohon unggah file foto atau sertakan URL gambar', true);
      return;
    }

    const effectiveDate = date.trim() || new Date().toLocaleDateString('id-ID', { month: 'short', year: 'numeric' });

    setSubmitting(true);
    try {
      const isMultipart = Boolean(file);
      let url = '/api/gallery';
      let method = 'POST';

      if (editId) {
        url = `/api/gallery/${editId}`;
        method = 'PUT';
      }

      let res: Response;
      if (isMultipart) {
        const formData = new FormData();
        formData.append('title', title.trim());
        formData.append('description', description.trim());
        formData.append('date', effectiveDate);
        formData.append('spanSize', spanSize);
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
            title: title.trim(),
            description: description.trim(),
            date: effectiveDate,
            spanSize,
            imageUrl: imageUrl.trim() || undefined,
          }),
        });
      }

      const json = await res.json();
      if (json.success) {
        showToast(editId ? 'Dokumentasi galeri berhasil diperbarui!' : 'Foto berhasil ditambahkan ke galeri!');
        resetForm();
        fetchGallery();
      } else {
        showToast(json.error || 'Gagal menyimpan item galeri', true);
      }
    } catch {
      showToast('Koneksi terputus saat menyimpan foto', true);
    } finally {
      setSubmitting(false);
    }
  };

  // Delete Item
  const handleDelete = async (id: number, itemTitle: string) => {
    if (!window.confirm(`Hapus dokumentasi "${itemTitle}" dari galeri?`)) {
      return;
    }

    setDeletingId(id);
    try {
      const res = await fetch(`/api/gallery/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (json.success) {
        showToast(`Dokumentasi "${itemTitle}" berhasil dihapus.`);
        if (editId === id) resetForm();
        setItems((prev) => prev.filter((item) => item.id !== id));
      } else {
        showToast(json.error || 'Gagal menghapus item galeri', true);
      }
    } catch {
      showToast('Terjadi kesalahan jaringan saat menghapus item', true);
    } finally {
      setDeletingId(null);
    }
  };

  // Filtered Items
  const filteredItems = useMemo(() => {
    if (!search.trim()) return items;
    const q = search.toLowerCase();
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.code.toLowerCase().includes(q)
    );
  }, [items, search]);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded border border-grid bg-white dark:bg-[#141414]">
        <div>
          <h2 className="font-display text-lg font-bold">Manajemen Galeri Visual (Visual Log)</h2>
          <p className="font-mono text-xs text-neutral-500">
            Total {items.length} arsip foto terdokumentasi dalam grid kolektif WK.
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
            {editId ? `MODE EDIT (#${editId})` : 'MODE UNGGAH FOTO'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Column (45%) */}
        <div className="lg:col-span-5 border border-grid bg-white dark:bg-[#121212] rounded p-6 shadow-sm sticky top-24">
          <div className="flex items-center justify-between border-b border-grid pb-3 mb-5">
            <h3 className="font-mono text-xs uppercase font-bold tracking-wider text-vermilion flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-vermilion"></span>
              {editId ? `Edit Foto: ${title || '...'}` : 'Unggah Dokumentasi Foto'}
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
            {/* Judul & Tanggal */}
            <div>
              <label className="block font-mono text-[11px] uppercase mb-1">Judul / Catatan Foto *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Contoh: Diskusi Santai Teori Evakuasi Evangelion"
                className="w-full px-3 py-2 rounded border border-grid bg-transparent font-mono text-xs focus:outline-none focus:border-vermilion"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-mono text-[11px] uppercase mb-1">Tanggal / Musim (Opsional)</label>
                <input
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="Contoh: Okt 2026 / Spring 2024"
                  className="w-full px-3 py-2 rounded border border-grid bg-transparent font-mono text-xs focus:outline-none focus:border-vermilion"
                />
              </div>
              <div>
                <label className="block font-mono text-[11px] uppercase mb-1">Layout Grid Span *</label>
                <select
                  value={spanSize}
                  onChange={(e) => setSpanSize(e.target.value as any)}
                  className="w-full px-3 py-2 rounded border border-grid bg-transparent dark:bg-[#161616] font-mono text-xs focus:outline-none focus:border-vermilion"
                >
                  <option value="normal">Standar (1 Kolom)</option>
                  <option value="wide">Lebar Sinematik (2 Kolom)</option>
                </select>
              </div>
            </div>

            {/* Deskripsi */}
            <div>
              <label className="block font-mono text-[11px] uppercase mb-1">Deskripsi / Konteks *</label>
              <textarea
                required
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Cerita atau konteks di balik foto ini..."
                className="w-full px-3 py-2 rounded border border-grid bg-transparent font-mono text-xs focus:outline-none focus:border-vermilion resize-none"
              />
            </div>

            {/* Unggah Gambar */}
            <div className="border border-grid rounded p-3 bg-neutral-50/50 dark:bg-[#161616]/50 space-y-3">
              <label className="block font-mono text-[11px] uppercase font-bold text-neutral-700 dark:text-neutral-300">
                File Gambar Dokumentasi
              </label>

              {/* Preview Box */}
              <div className="w-full h-40 rounded border border-grid overflow-hidden bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center relative">
                {filePreview ? (
                  <>
                    <img src={filePreview} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={clearFile}
                      className="absolute top-2 right-2 bg-black/70 hover:bg-black text-white px-2 py-1 rounded font-mono text-[10px]"
                    >
                      ✕ Hapus Gambar
                    </button>
                  </>
                ) : (
                  <div className="text-center font-mono text-xs text-neutral-500">
                    <p>Belum ada gambar terpilih</p>
                    <p className="text-[10px] text-neutral-400 mt-1">Pilih file atau masukkan URL di bawah</p>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <label className="inline-block px-3 py-2 rounded border border-grid font-mono text-xs cursor-pointer hover:bg-neutral-100 dark:hover:bg-[#202020] transition-colors">
                  📁 Pilih File dari Perangkat...
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
                {file && (
                  <span className="font-mono text-[11px] text-emerald-600 dark:text-emerald-400 truncate">
                    ✓ {file.name}
                  </span>
                )}
              </div>

              <div>
                <span className="block font-mono text-[10px] text-neutral-500 uppercase mb-1">
                  Atau masukkan URL Gambar Eksternal:
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

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-2.5 rounded bg-vermilion text-white font-mono text-xs uppercase tracking-wider font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <span>Menyimpan ke Galeri...</span>
                ) : editId ? (
                  <span>Perbarui Item Galeri [✓]</span>
                ) : (
                  <span>Tambahkan ke Galeri [+]</span>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Gallery Grid List (55%) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Search Bar */}
          <div className="p-4 rounded border border-grid bg-white dark:bg-[#121212] flex items-center gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari dokumentasi foto..."
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
            <span className="font-mono text-xs text-neutral-500 shrink-0">
              {filteredItems.length} foto
            </span>
          </div>

          {loadingList ? (
            <div className="p-12 text-center border border-grid rounded font-mono text-xs text-neutral-500">
              Memuat galeri foto...
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="p-12 text-center border border-grid rounded font-mono text-xs text-neutral-500 space-y-2">
              <p>Tidak ada foto yang ditemukan.</p>
              {search && (
                <button onClick={() => setSearch('')} className="underline text-vermilion">
                  Reset pencarian
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className={`rounded border overflow-hidden bg-white dark:bg-[#121212] transition-colors flex flex-col justify-between ${
                    editId === item.id
                      ? 'border-vermilion ring-1 ring-vermilion/50'
                      : 'border-grid hover:border-neutral-400 dark:hover:border-neutral-700'
                  }`}
                >
                  <div>
                    {/* Thumbnail */}
                    <div className="w-full h-44 bg-neutral-200 dark:bg-neutral-800 relative overflow-hidden">
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 left-2 flex items-center gap-1.5">
                        <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-black/70 text-white backdrop-blur-none">
                          {item.code}
                        </span>
                        {item.spanSize === 'wide' && (
                          <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-vermilion text-white font-bold">
                            WIDE 2X
                          </span>
                        )}
                      </div>
                      {item.date && (
                        <span className="absolute bottom-2 right-2 font-mono text-[10px] px-2 py-0.5 rounded bg-black/70 text-white">
                          {item.date}
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-3.5 space-y-1">
                      <h4 className="font-display font-bold text-sm line-clamp-1">{item.title}</h4>
                      <p className="font-mono text-xs text-neutral-500 line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="p-3.5 pt-0 border-t border-grid/50 mt-2 flex items-center justify-between">
                    <span className="font-mono text-[10px] text-neutral-400">ID: #{item.id}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleStartEdit(item)}
                        className="px-2.5 py-1 rounded border border-grid font-mono text-xs hover:border-vermilion hover:text-vermilion transition-colors"
                      >
                        Edit [✎]
                      </button>
                      <button
                        onClick={() => handleDelete(item.id, item.title)}
                        disabled={deletingId === item.id}
                        className="px-2.5 py-1 rounded border border-grid font-mono text-xs text-red-500 hover:bg-red-500/10 transition-colors disabled:opacity-50"
                      >
                        {deletingId === item.id ? '...' : 'Hapus [✕]'}
                      </button>
                    </div>
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
