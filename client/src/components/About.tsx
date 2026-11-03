import React from 'react';

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

export const About: React.FC = () => {
  return (
    <section id="about" className="border-b border-grid">
      {/* Top Header Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-grid">
        {/* Left column */}
        <div className="flex flex-col justify-between border-b border-grid p-6 sm:p-10 lg:col-span-4 lg:border-b-0 lg:border-r lg:p-12">
          <div>
            <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight sm:text-4xl">
              Tentang WK<span className="text-vermilion">.</span>
            </h2>
            <p className="mt-3 font-mono text-xs text-neutral-500 dark:text-neutral-400">
              Dari ruang obrolan larut malam menjadi lingkaran pertemanan lintas minat.
            </p>
          </div>

          <div className="mt-10 border-t border-grid pt-6 font-mono text-[11px] text-neutral-500 dark:text-neutral-400 space-y-1.5">
            <p><span className="text-ink dark:text-paper font-semibold">TIPE:</span> LINGKARAN TEMAN SEHOBI</p>
            <p><span className="text-ink dark:text-paper font-semibold">BASIS:</span> INDONESIA / DISCORD / WARKOP</p>
            <p><span className="text-ink dark:text-paper font-semibold">FOKUS:</span> ANIME, MANGA, GACHA, NONGKRONG</p>
            <p><span className="text-ink dark:text-paper font-semibold">STATUS:</span> NON-PROFIT / SANTUR ONLY</p>
          </div>
        </div>

        {/* Right column */}
        <div className="p-6 sm:p-10 lg:col-span-8 lg:p-12">
          <div className="mb-4 flex flex-wrap items-baseline gap-3">
            <h3 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
              wi · bu &nbsp; ka · yank
            </h3>
            <span className="font-mono text-xs text-neutral-500 dark:text-neutral-400">
              [nomina gaul / etimologi santai]
            </span>
          </div>

          <p className="text-base leading-relaxed text-neutral-700 dark:text-neutral-300 sm:text-lg">
            Wibu Kayank adalah kumpulan teman yang awalnya cuma bertukar rekomendasi anime musiman
            dan curhat sialnya roll gacha. Lambat laun, grup ini berevolusi menjadi tempat pulang paling
            nyaman setelah seharian berurusan dengan rutinitas pekerjaan, tugas kuliah, atau beban hidup.
          </p>

          <p className="mt-4 text-base leading-relaxed text-neutral-700 dark:text-neutral-300">
            Nama <strong className="font-semibold text-ink dark:text-paper">“Kayank”</strong> terinspirasi dari filosofi batang bambu: saat badai
            menerjang, bambu tidak menahan kaku hingga patah, melainkan meliuk lentur mengikuti angin.
            Ketika hidup terasa berat dan melelahkan, jangan dipaksa ambruk — <span className="text-vermilion font-medium">lenturkan saja</span>, rebahan sejenak, nikmati tontonan favoritmu, lalu bangkit lagi bersama kawan-kawanmu.
          </p>
        </div>
      </div>

      {/* Four Pillars Grid */}
      <div className="border-b border-grid">
        <div className="page-gutter py-6 sm:py-8 border-b border-grid bg-stone/20 dark:bg-neutral-900/30">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <h3 className="font-display text-xl font-bold uppercase tracking-tight">
              Pilar Lingkaran Tongkrongan
            </h3>
            <p className="font-mono text-xs text-neutral-500 dark:text-neutral-400">
              Empat nilai dasar yang menjaga suasana tetap asyik dan bebas drama.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 divide-y divide-grid sm:grid-cols-2 sm:divide-y-0 sm:divide-x lg:grid-cols-4">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="p-6 sm:p-8 flex flex-col justify-between hover:bg-white/40 dark:hover:bg-neutral-900/40 transition-colors">
              <div>
                <span className="inline-block rounded border border-grid px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-vermilion">
                  {pillar.tag}
                </span>
                <h4 className="mt-4 font-display text-lg font-bold">{pillar.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {pillar.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline / Perjalanan Section */}
      <div className="border-b border-grid">
        <div className="page-gutter py-6 sm:py-8 border-b border-grid bg-stone/20 dark:bg-neutral-900/30">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <h3 className="font-display text-xl font-bold uppercase tracking-tight">
              Kronologi Santai WK
            </h3>
            <p className="font-mono text-xs text-neutral-500 dark:text-neutral-400">
              Perjalanan dari celetukan Discord hingga website arsip ini.
            </p>
          </div>
        </div>

        <div className="page-gutter py-8 sm:py-12">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {timelineEvents.map((event) => (
              <div
                key={event.period}
                className="flex flex-col justify-between rounded border border-grid bg-paper p-6 dark:bg-[#0E0E0E]"
              >
                <div>
                  <div className="flex items-center justify-between font-mono text-xs text-neutral-500 dark:text-neutral-400">
                    <span className="font-semibold text-vermilion">{event.period}</span>
                    <span>{event.time}</span>
                  </div>
                  <h4 className="mt-4 font-display text-lg font-bold">{event.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                    {event.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Etika Meja WK (Rules of the Circle) */}
      <div className="page-gutter py-8 sm:py-12">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-grid pb-4">
          <h3 className="font-display text-xl font-bold uppercase tracking-tight">
            Etika Meja WK
          </h3>
          <span className="font-mono text-xs text-neutral-500 dark:text-neutral-400">
            Aturan tak tertulis biar tongkrongan tetap nyaman bagi semua orang
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {communityRules.map((r) => (
            <div
              key={r.rule}
              className="rounded border border-grid p-5 bg-white/50 dark:bg-neutral-900/30 flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-xs font-bold text-vermilion">
                  RULE {r.rule}
                </span>
                <h4 className="mt-2 text-base font-semibold text-ink dark:text-paper">{r.title}</h4>
                <p className="mt-2 text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {r.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
