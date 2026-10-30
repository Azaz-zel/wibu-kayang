import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Story } from '../../types';

interface StoryTabProps {
  token: string;
  showToast: (message: string, isError?: boolean) => void;
}

export const StoryTab: React.FC<StoryTabProps> = ({ token, showToast }) => {
  const [stories, setStories] = useState<Story[]>([]);
  const [loadingList, setLoadingList] = useState(true);
  const [search, setSearch] = useState('');

  // Form State
  const [editId, setEditId] = useState<number | null>(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [tag, setTag] = useState('');
  const [date, setDate] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // Fetch Stories
  const fetchStories = useCallback(async () => {
    try {
      setLoadingList(true);
      const res = await fetch('/api/stories');
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setStories(json.data);
      }
    } catch {
      showToast('Gagal memuat arsip cerita dari server', true);
    } finally {
      setLoadingList(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchStories();
  }, [fetchStories]);

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
    setAuthor('');
    setTag('');
    setDate('');
    setContent('');
    clearFile();
    setImageUrl('');
  };

  // Start Editing
  const handleStartEdit = (story: Story) => {
    setEditId(story.id);
    setTitle(story.title);
    setAuthor(story.author);
    setTag(story.tag);
    setDate(story.date || '');
    setContent(story.content);
    clearFile();
    setImageUrl(story.img || '');
    setFilePreview(story.img || null);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Submit Form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !author.trim() || !tag.trim() || !content.trim()) {
      showToast('Mohon lengkapi seluruh field cerita yang wajib diisi', true);
      return;
    }

    const effectiveDate = date.trim() || new Date().toLocaleDateString('id-ID', { month: 'short', year: 'numeric' });

    setSubmitting(true);
    try {
      const isMultipart = Boolean(file);
      let url = '/api/stories';
      let method = 'POST';

      if (editId) {
        url = `/api/stories/${editId}`;
        method = 'PUT';
      }

      let res: Response;
      if (isMultipart) {
        const formData = new FormData();
        formData.append('title', title.trim());
        formData.append('author', author.trim());
        formData.append('tag', tag.trim());
        formData.append('date', effectiveDate);
        formData.append('content', content.trim());
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
            author: author.trim(),
            tag: tag.trim(),
            date: effectiveDate,
            content: content.trim(),
            imageUrl: imageUrl.trim() || undefined,
          }),
        });
      }

      const json = await res.json();
      if (json.success) {
        showToast(editId ? 'Arsip cerita berhasil diperbarui!' : 'Cerita baru berhasil diterbitkan!');
        resetForm();
        fetchStories();
      } else {
        showToast(json.error || 'Gagal menyimpan cerita', true);
      }
    } catch {
      showToast('Koneksi terputus saat menyimpan arsip cerita', true);
    } finally {
      setSubmitting(false);
    }
  };

  // Delete Story
  const handleDelete = async (id: number, storyTitle: string) => {
    if (!window.confirm(`Hapus cerita "${storyTitle}" dari arsip?`)) {
      return;
    }

    setDeletingId(id);
    try {
      const res = await fetch(`/api/stories/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (json.success) {
        showToast(`Cerita "${storyTitle}" berhasil dihapus.`);
        if (editId === id) resetForm();
        setStories((prev) => prev.filter((s) => s.id !== id));
      } else {
        showToast(json.error || 'Gagal menghapus cerita', true);
      }
    } catch {
      showToast('Terjadi kesalahan jaringan saat menghapus cerita', true);
    } finally {
      setDeletingId(null);
    }
  };

  // Filtered Stories
  const filteredStories = useMemo(() => {
    if (!search.trim()) return stories;
    const q = search.toLowerCase();
    return stories.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.author.toLowerCase().includes(q) ||
        s.tag.toLowerCase().includes(q) ||
        s.content.toLowerCase().includes(q) ||
        s.code.toLowerCase().includes(q)
    );
  }, [stories, search]);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded border border-grid bg-white dark:bg-[#141414]">
        <div>
          <h2 className="font-display text-lg font-bold">Manajemen Cerita & Lore (Stories Archive)</h2>
          <p className="font-mono text-xs text-neutral-500">
            Total {stories.length} cerita kejadian dan lore tongkrongan terdokumentasi.
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
            {editId ? `MODE EDIT (#${editId})` : 'MODE TULIS CERITA'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Column (50%) */}
        <div className="lg:col-span-6 border border-grid bg-white dark:bg-[#121212] rounded p-6 shadow-sm sticky top-24">
          <div className="flex items-center justify-between border-b border-grid pb-3 mb-5">
            <h3 className="font-mono text-xs uppercase font-bold tracking-wider text-vermilion flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-vermilion"></span>
              {editId ? `Edit Cerita: ${title || '...'}` : 'Tulis Cerita / Arsip Baru'}
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
            {/* Judul Cerita */}
            <div>
              <label className="block font-mono text-[11px] uppercase mb-1">Judul Cerita / Arsip *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Contoh: Insiden Begadang 48 Jam & Perdebatan Ending AoT"
                className="w-full px-3 py-2 rounded border border-grid bg-transparent font-mono text-xs focus:outline-none focus:border-vermilion"
              />
            </div>

            {/* Penulis & Tag & Tanggal */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block font-mono text-[11px] uppercase mb-1">Penulis / Narasumber *</label>
                <input
                  type="text"
                  required
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Kolektif WK / Anonim"
                  className="w-full px-3 py-2 rounded border border-grid bg-transparent font-mono text-xs focus:outline-none focus:border-vermilion"
                />
              </div>
              <div>
                <label className="block font-mono text-[11px] uppercase mb-1">Tag / Kategori *</label>
                <input
                  type="text"
                  required
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  placeholder="INCIDENT / LORE / DEBATE"
                  className="w-full px-3 py-2 rounded border border-grid bg-transparent font-mono text-xs focus:outline-none focus:border-vermilion"
                />
              </div>
              <div>
                <label className="block font-mono text-[11px] uppercase mb-1">Tanggal (Opsional)</label>
                <input
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="Contoh: Nov 2024"
                  className="w-full px-3 py-2 rounded border border-grid bg-transparent font-mono text-xs focus:outline-none focus:border-vermilion"
                />
              </div>
            </div>

            {/* Isi Cerita */}
            <div>
              <label className="block font-mono text-[11px] uppercase mb-1">Isi Lengkap Cerita / Catatan *</label>
              <textarea
                required
                rows={6}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Tuliskan runtutan kejadian, kutipan dialog, atau kronologi yang berkesan..."
                className="w-full px-3 py-2 rounded border border-grid bg-transparent font-mono text-xs focus:outline-none focus:border-vermilion resize-y font-sans leading-relaxed"
              />
            </div>

            {/* Thumbnail Image */}
            <div className="border border-grid rounded p-3 bg-neutral-50/50 dark:bg-[#161616]/50 space-y-3">
              <label className="block font-mono text-[11px] uppercase font-bold text-neutral-700 dark:text-neutral-300">
                Gambar Banner Cerita (Opsional)
              </label>

              <div className="flex items-center gap-4">
                <div className="w-20 h-16 rounded border border-grid overflow-hidden bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center shrink-0">
                  {filePreview ? (
                    <img src={filePreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <span className="font-mono text-[10px] text-neutral-400">NO BANNER</span>
                  )}
                </div>
                <div className="flex-1 space-y-1">
                  <label className="inline-block px-3 py-1.5 rounded border border-grid font-mono text-xs cursor-pointer hover:bg-neutral-100 dark:hover:bg-[#202020] transition-colors">
                    📁 Pilih File Banner...
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
                </div>
              </div>

              <div>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => {
                    setImageUrl(e.target.value);
                    if (!file) setFilePreview(e.target.value);
                  }}
                  placeholder="Atau URL gambar eksternal (https://...)"
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
                  <span>Menyimpan Arsip...</span>
                ) : editId ? (
                  <span>Perbarui Arsip Cerita [✓]</span>
                ) : (
                  <span>Terbitkan Cerita Baru [+]</span>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Stories List (50%) */}
        <div className="lg:col-span-6 space-y-4">
          {/* Search Bar */}
          <div className="p-4 rounded border border-grid bg-white dark:bg-[#121212] flex items-center gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari cerita (judul, tag, penulis, isi)..."
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
              {filteredStories.length} cerita
            </span>
          </div>

          {loadingList ? (
            <div className="p-12 text-center border border-grid rounded font-mono text-xs text-neutral-500">
              Memuat arsip cerita...
            </div>
          ) : filteredStories.length === 0 ? (
            <div className="p-12 text-center border border-grid rounded font-mono text-xs text-neutral-500 space-y-2">
              <p>Tidak ada cerita yang cocok.</p>
              {search && (
                <button onClick={() => setSearch('')} className="underline text-vermilion">
                  Reset pencarian
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredStories.map((story) => (
                <div
                  key={story.id}
                  className={`p-4 rounded border transition-colors bg-white dark:bg-[#121212] flex flex-col justify-between ${
                    editId === story.id
                      ? 'border-vermilion ring-1 ring-vermilion/50'
                      : 'border-grid hover:border-neutral-400 dark:hover:border-neutral-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 border-b border-grid/50 pb-2 mb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] text-neutral-500">{story.code}</span>
                        <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-vermilion/10 text-vermilion border border-vermilion/30 font-bold uppercase">
                          {story.tag}
                        </span>
                      </div>
                      <span className="font-mono text-[11px] text-neutral-400">
                        {story.date || 'Arsip WK'}
                      </span>
                    </div>

                    <h4 className="font-display font-bold text-base mb-1">{story.title}</h4>
                    <span className="font-mono text-[11px] text-neutral-500 block mb-2">
                      Penulis / Sumber: <strong className="text-neutral-700 dark:text-neutral-300">{story.author}</strong>
                    </span>

                    <p className="font-sans text-xs text-neutral-600 dark:text-neutral-300 line-clamp-3 leading-relaxed mb-3">
                      {story.content}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-grid/50 pt-3">
                    <span className="font-mono text-[10px] text-neutral-400">ID: #{story.id}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleStartEdit(story)}
                        className="px-2.5 py-1 rounded border border-grid font-mono text-xs hover:border-vermilion hover:text-vermilion transition-colors"
                      >
                        Edit [✎]
                      </button>
                      <button
                        onClick={() => handleDelete(story.id, story.title)}
                        disabled={deletingId === story.id}
                        className="px-2.5 py-1 rounded border border-grid font-mono text-xs text-red-500 hover:bg-red-500/10 transition-colors disabled:opacity-50"
                      >
                        {deletingId === story.id ? '...' : 'Hapus [✕]'}
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
