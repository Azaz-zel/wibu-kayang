import React from 'react';

export const About: React.FC = () => {
  return (
    <section id="about" className="border-b border-grid">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left Column: Section Header */}
        <div className="lg:col-span-4 p-6 sm:p-10 lg:p-12 border-b lg:border-b-0 lg:border-r border-grid flex flex-col justify-between">
          <div>
            <span className="font-mono text-xs text-vermilion uppercase tracking-widest block mb-2">// INDEX 02</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-tight">Tentang WK</h2>
            <p className="font-mono text-xs text-neutral-500 mt-2">DEFINISI & MANIFESTO</p>
          </div>

          <div className="mt-12 lg:mt-0 pt-6 border-t border-grid">
            <div className="font-mono text-[11px] text-neutral-500 space-y-1">
              <p>KLASIFIKASI: CIRCLE TONGKRONGAN</p>
              <p>AKTIVITAS UTAMA: DISCORD, NOBAR, DEBAT TIER LIST</p>
              <p>TINGKAT KEWARASAN: 42%</p>
            </div>
          </div>
        </div>

        {/* Right Column: Editorial Content */}
        <div className="lg:col-span-8">
          {/* Dictionary Definition Box */}
          <div className="p-6 sm:p-10 lg:p-12 border-b border-grid">
            <div className="flex flex-wrap items-baseline gap-3 mb-4">
              <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight">wi·bu ka·yank</h3>
              <span className="font-mono text-xs text-neutral-500 italic">/n, akronim: WK/</span>
            </div>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6">
              Istilah untuk mendeskripsikan sekumpulan teman yang awalnya cuma bahas anime musiman dan game gacha, tapi lama-lama jadi tempat pelarian paling waras saat tugas, kerjaan, atau hidup lagi jungkir balik. Kata <strong>"Kayank"</strong> diambil dari filosofi fleksibilitas tingkat tinggi—seberat apa pun beban hidup, kita lenturin aja.
            </p>
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-grid font-mono">
              <div>
                <span className="block text-2xl sm:text-3xl font-bold text-ink dark:text-paper">24/7</span>
                <span className="text-[11px] text-neutral-500 uppercase">Voice Channel Aktif</span>
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-bold text-ink dark:text-paper">99+</span>
                <span className="text-[11px] text-neutral-500 uppercase">Wacana Liburan</span>
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-bold text-vermilion">100%</span>
                <span className="text-[11px] text-neutral-500 uppercase">Solidaritas</span>
              </div>
            </div>
          </div>

          {/* Three Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-neutral-200 dark:divide-neutral-800">
            <div className="p-6 sm:p-8 lg:p-10">
              <span className="font-mono text-xs text-neutral-400 block mb-3">02.1</span>
              <h4 className="font-medium text-base mb-2">Apresiasi Kultur</h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Dari anime obscure tahun 90-an, manga yang hiatus bertahun-tahun, sampai musik J-Rock & doujin semua masuk radar.
              </p>
            </div>
            <div className="p-6 sm:p-8 lg:p-10">
              <span className="font-mono text-xs text-neutral-400 block mb-3">02.2</span>
              <h4 className="font-medium text-base mb-2">Anti Jaim</h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Gak ada senioritas atau adu paling sepuh. Mau baru nonton 2 judul atau udah hafal seiyuu luar kepala, semua setara.
              </p>
            </div>
            <div className="p-6 sm:p-8 lg:p-10">
              <span className="font-mono text-xs text-neutral-400 block mb-3">02.3</span>
              <h4 className="font-medium text-base mb-2">Real-Life Touch Grass</h4>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Sesekali keluar kamar buat ngopi, berburu khilaf di event jejepangan, atau sekadar makan tengah malam bareng.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
