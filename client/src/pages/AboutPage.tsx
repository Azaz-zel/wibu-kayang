import React from 'react';

interface AboutPageProps {
  onNavigate?: (path: string) => void;
}

const pillars = [
  {
    tag: 'KULTUR',
    title: 'Kultur Pop Otaku',
    body: 'Dari anime era 90-an, shonen musiman, manga obscure yang hiatus menahun, sampai vocaloid dan konser J-Rock: semua punya tempat di obrolan harian kami.',
  },
  {
    tag: 'KESETARAAN',
    title: 'Tanpa Senioritas',
    body: 'Tidak ada kasta wibu sepuh atau wibu baru. Baru selesai satu judul atau hafal nama semua seiyuu, semua punya hak suara sama dalam debat tier list.',
  },
  {
    tag: 'SOLIDARITAS',
    title: 'Suka Duka Gacha',
    body: 'Rate 0.6% adalah musuh bersama. Kena hard pity 90 kita ratapi bersama, dapat banner rate-up di single pull wajib traktir gorengan hangat.',
  },
  {
    tag: 'TEMPAT PULANG',
    title: 'Rebahan & Nyata',
    body: 'Setelah lelah kerja kantoran, tugas kuliah, atau pusingnya hari biasa, Discord WK adalah ruang santai tempat melepas beban tanpa perlu jaim.',
  },
];

const timelineEvents = [
  {
    period: 'FASE 01',
    time: 'Awal 2026',
    title: 'Sesi Discord Jam 3 Pagi',
    desc: 'Obrolan voice Discord yang awalnya membahas rekomendasi anime berujung begadang. Celetukan tentang pinggang pegal dan posisi kayang menjadi nama abadi komunitas ini.',
  },
  {
    period: 'FASE 02',
    time: 'Pertengahan 2026',
    title: 'Nobar & Ekspedisi Event Jejepangan',
    desc: 'Lingkaran pertemanan mulai melangkah ke dunia nyata: kumpul nobar movie anime layar lebar, berburu merchandise di comic convention, dan nongkrong di warkop favorit.',
  },
  {
    period: 'FASE 03',
    time: 'Akhir 2026',
    title: 'Peluncuran Arsip Digital Resmi',
    desc: 'Membangun platform arsip web kolektif untuk mencatat profil anggota, galeri foto kegiatan, dan cerita-cerita tongkrongan yang layak diabadikan.',
  },
];

const communityRules = [
  {
    rule: '01',
    title: 'Patuhi Aturan Spoiler',
    desc: 'Wajib pasang spoiler tag atau beri aba-aba 3 detik sebelum membahas episode terbaru atau chapter manga mingguan.',
  },
  {
    rule: '02',
    title: 'Hormati Selera Sesama',
    desc: 'Debat tier list adalah seni, menghina selera orang lain adalah dosa. Beda waifu/husbando tetap duduk satu meja.',
  },
  {
    rule: '03',
    title: 'Solidaritas Warkop',
    desc: 'Bebas memesan mie instan dobel atau kopi sachet, bayar tagihan masing-masing kecuali ada yang menang gacha 3 SSR berturut-turut.',
  },
  {
    rule: '04',
    title: 'Pintu Selalu Terbuka',
    desc: 'Kapan saja kamu butuh teman ngobrol, teman main bareng, atau sekadar join voice channel untuk mendengarkan sambil rebahan.',
  },
];

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="w-full">
      {/* Breadcrumb & Page Banner */}
      <div className="border-b border-grid bg-stone/20 dark:bg-neutral-900/30">
        <div className="page-gutter py-4 font-mono text-xs text-neutral-500 dark:text-neutral-400 flex items-center gap-2">
          <button
            type="button"
            onClick={() => onNavigate?.('/')}
            className="hover:text-vermilion transition-colors inline-flex items-center min-h-[32px]"
          >
            Beranda
          </button>
          <span>/</span>
          <span className="text-ink dark:text-paper font-semibold">Tentang WK</span>
        </div>
      </div>

      {/* Main Page Title Header */}
      <div className="page-gutter py-10 sm:py-16 border-b border-grid">
        <h1 className="font-display text-4xl sm:text-6xl font-extrabold uppercase tracking-tight">
          Tentang Wibu Kayank<span className="text-vermilion">.</span>
        </h1>
        <p className="mt-4 font-mono text-sm sm:text-base text-neutral-600 dark:text-neutral-300 max-w-3xl leading-relaxed">
          Arsip sejarah, filosofi pelenturan beban hidup, dan nilai-nilai dasar tongkrongan kami.
        </p>
      </div>

      {/* Overview & Philosophy (Spans Full Width across Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-grid">
        {/* Left Side: Metadata & Quick Facts */}
        <div className="p-6 sm:p-10 lg:col-span-5 lg:border-r border-b lg:border-b-0 border-grid bg-paper dark:bg-[#0E0E0E] flex flex-col justify-between">
          <div>
            <div className="font-display text-2xl font-bold tracking-tight mb-2">
              wi · bu &nbsp; ka · yank
            </div>
            <p className="font-mono text-xs text-neutral-500 dark:text-neutral-400 mb-6">
              [nomina gaul / etimologi santai]
            </p>
            <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
              Sebutan untuk lingkaran pertemanan yang awalnya cuma bertukar rekomendasi anime musiman
              dan curhat sialnya roll gacha di Discord. Lama-kelamaan jadi rumah kedua tempat melepas lelah.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-grid font-mono text-xs space-y-2 text-neutral-600 dark:text-neutral-400">
            <div className="flex justify-between py-1 border-b border-grid">
              <span>BENTUK:</span>
              <span className="font-semibold text-ink dark:text-paper">LINGKARAN TEMAN SEHOBI</span>
            </div>
            <div className="flex justify-between py-1 border-b border-grid">
              <span>BASIS:</span>
              <span className="font-semibold text-ink dark:text-paper">DISCORD &amp; WARKOP</span>
            </div>
            <div className="flex justify-between py-1 border-b border-grid">
              <span>WILAYAH:</span>
              <span className="font-semibold text-ink dark:text-paper">INDONESIA</span>
            </div>
            <div className="flex justify-between py-1">
              <span>STATUS:</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">AKTIF SETIAP MALAM</span>
            </div>
          </div>
        </div>

        {/* Right Side: Bamboo Kayang Philosophy */}
        <div className="p-6 sm:p-10 lg:col-span-7 bg-white/40 dark:bg-neutral-900/20 flex flex-col justify-center">
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight mb-4">
            Filosofi Bambu: Melenturkan Beban
          </h2>
          <div className="space-y-4 text-base leading-relaxed text-neutral-700 dark:text-neutral-300">
            <p>
              Mengapa kami memilih nama <strong className="font-semibold text-ink dark:text-paper">“Kayank”</strong>? Saat badai besar menerpa,
              pohon yang kaku dan keras berisiko patah diterjang angin. Sebaliknya, batang bambu melengkung lentur mengikuti arah badai,
              tetap bertahan di tanahnya, lalu kembali tegak begitu badai mereda.
            </p>
            <p>
              Begitu juga kami memandang kehidupan. Ketika beban kerja, tugas perkuliahan, atau rutinitas harian terasa terlalu berat untuk
              dihadapi secara kaku, kami memilih untuk <span className="text-vermilion font-semibold">melenturkan diri</span>: rebahan sejenak,
              nonton satu episode anime musiman, gacha santai bersama kawan, lalu kembali menyongsong hari dengan pikiran jernih.
            </p>
            <blockquote className="border-l-2 border-vermilion pl-4 italic text-sm text-neutral-600 dark:text-neutral-400 font-mono">
              “Tidak perlu memaksakan diri melawan badai sendirian. Lenturkan punggung, pasang headphone, dan tertawalah bareng kami.”
            </blockquote>
          </div>
        </div>
      </div>

      {/* Four Pillars Section (Spanning full width horizontally) */}
      <div className="border-b border-grid">
        <div className="page-gutter py-6 sm:py-8 border-b border-grid bg-stone/20 dark:bg-neutral-900/30">
          <h2 className="font-display text-2xl font-bold uppercase tracking-tight">
            Empat Pilar Lingkaran Kami<span className="text-vermilion">.</span>
          </h2>
          <p className="mt-1 font-mono text-xs text-neutral-500 dark:text-neutral-400">
            Fondasi yang menjaga kebersamaan kami tetap asyik, sehat, dan bebas drama.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-grid">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="p-6 sm:p-8 flex flex-col justify-between hover:bg-white/40 dark:hover:bg-neutral-900/40 transition-colors"
            >
              <div>
                <span className="inline-block rounded border border-grid px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-vermilion font-semibold">
                  {pillar.tag}
                </span>
                <h3 className="mt-4 font-display text-xl font-bold text-ink dark:text-paper">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {pillar.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Kronologi Perjalanan (Full Width Layout) */}
      <div className="border-b border-grid">
        <div className="page-gutter py-6 sm:py-8 border-b border-grid bg-stone/20 dark:bg-neutral-900/30">
          <h2 className="font-display text-2xl font-bold uppercase tracking-tight">
            Kronologi &amp; Perjalanan Tongkrongan<span className="text-vermilion">.</span>
          </h2>
          <p className="mt-1 font-mono text-xs text-neutral-500 dark:text-neutral-400">
            Dari ruang obrolan tak sengaja hingga terbitnya arsip resmi ini.
          </p>
        </div>

        <div className="page-gutter py-10 sm:py-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {timelineEvents.map((event) => (
              <div
                key={event.period}
                className="flex flex-col justify-between rounded border border-grid bg-paper p-6 dark:bg-[#0E0E0E]"
              >
                <div>
                  <div className="flex items-center justify-between font-mono text-xs text-neutral-500 dark:text-neutral-400 pb-3 border-b border-grid">
                    <span className="font-bold text-vermilion">{event.period}</span>
                    <span>{event.time}</span>
                  </div>
                  <h3 className="mt-4 font-display text-xl font-bold text-ink dark:text-paper">
                    {event.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                    {event.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Etika Meja WK */}
      <div className="page-gutter py-10 sm:py-16">
        <div className="mb-8 border-b border-grid pb-4">
          <h2 className="font-display text-2xl font-bold uppercase tracking-tight">
            Etika Meja WK (Rules of the Circle)<span className="text-vermilion">.</span>
          </h2>
          <p className="mt-1 font-mono text-xs text-neutral-500 dark:text-neutral-400">
            Aturan tak tertulis agar suasana tetap nyaman bagi siapa pun yang bergabung.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {communityRules.map((r) => (
            <div
              key={r.rule}
              className="rounded border border-grid p-6 bg-white/50 dark:bg-neutral-900/30 flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-xs font-bold text-vermilion">
                  RULE {r.rule}
                </span>
                <h3 className="mt-2 text-base font-semibold text-ink dark:text-paper">{r.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {r.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
