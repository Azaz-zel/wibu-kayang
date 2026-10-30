import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const DEFAULT_SETTINGS = [
  { key: "discord_url", value: "https://discord.gg/wibukayank" },
  { key: "instagram_url", value: "https://instagram.com/wibukayank" },
  { key: "twitter_url", value: "" },
  { key: "youtube_url", value: "" },
  { key: "tiktok_url", value: "" },
];

const DEFAULT_MEMBERS = [
  {
    code: "WK-01",
    name: "Raka",
    handle: "@raka_kayank",
    role: "Ketua Tak Tertulis",
    category: "founder",
    fav: "Neon Genesis Evangelion",
    quote: "Bilang aja dulu gas, berangkatnya urusan belakangan.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    order: 0,
  },
  {
    code: "WK-02",
    name: "Dimas",
    handle: "@dimas_pity90",
    role: "Bandar Gacha & Salt",
    category: "gamer",
    fav: "Fate/Grand Order & HSR",
    quote: "Rate up itu kebohongan publik yang paling rapi.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    order: 1,
  },
  {
    code: "WK-03",
    name: "Nadia",
    handle: "@nad_panel",
    role: "Ensiklopedia Manga",
    category: "lore",
    fav: "Oyasumi Punpun",
    quote: "Jangan tanya spoiler kalau belum siap kena mental.",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
    order: 2,
  },
  {
    code: "WK-04",
    name: "Fajar",
    handle: "@fajar_afk",
    role: "Penjaga Voice Discord",
    category: "founder",
    fav: "Gintama",
    quote: "Masuk voice jam 9 malam, sadar-sadar udah adzan subuh.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    order: 3,
  },
  {
    code: "WK-05",
    name: "Kevin",
    handle: "@kev_fps",
    role: "Carry Tongkrongan",
    category: "gamer",
    fav: "Cyberpunk: Edgerunners",
    quote: "Aim boleh kentang, skin harus tetap menyala.",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600&q=80",
    order: 4,
  },
  {
    code: "WK-06",
    name: "Alya",
    handle: "@alya_ost",
    role: "Kurator Playlist & Merch",
    category: "lore",
    fav: "Bocchi the Rock!",
    quote: "Dompet tipis bukan halangan buat pre-order khilafan.",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80",
    order: 5,
  },
];

const DEFAULT_GALLERY = [
  {
    code: "LOG-01",
    title: "Malam Nobar & Debat Akhir Musim",
    description: "Kumpul formasi lengkap bahas anime terbaik tahun ini sambil habisin kopi.",
    date: "14.08.2026",
    spanSize: "wide",
    img: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=80",
    order: 0,
  },
  {
    code: "LOG-02",
    title: "Setup Pojok Begadang",
    description: "Markas digital tempat ratusan jam dihabiskan di voice channel.",
    date: "02.09.2026",
    spanSize: "normal",
    img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
    order: 1,
  },
  {
    code: "LOG-03",
    title: "Ekspedisi Event Jejepangan",
    description: "Niat awal cuma lihat-lihat, pulang bawa totebag penuh artprint.",
    date: "21.09.2026",
    spanSize: "normal",
    img: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80",
    order: 2,
  },
  {
    code: "LOG-04",
    title: "Koleksi Bacaan & Referensi",
    description: "Tumpukan volume fisik yang dipinjam bergilir antar member WK.",
    date: "05.10.2026",
    spanSize: "normal",
    img: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80",
    order: 3,
  },
  {
    code: "LOG-05",
    title: "Kulineran Tengah Malam",
    description: "Ramen darurat setelah kalah beruntun lima match berturut-turut.",
    date: "19.10.2026",
    spanSize: "normal",
    img: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
    order: 4,
  },
];

const DEFAULT_STORIES = [
  {
    code: "STORY-01",
    title: "Asal Muasal Nama 'Wibu Kayank' Jam 3 Pagi",
    author: "Raka & Fajar",
    tag: "SEJARAH WK",
    date: "12.01.2026",
    content: "Semua berawal dari sesi voice Discord yang harusnya bubar jam 11 malam, tapi bablas sampai jam 3 pagi. Waktu itu pinggang udah pada encok gara-gara kelamaan duduk depan layar, terus salah satu member nyeletuk kalau satu-satunya cara biar tulang punggung kembali normal adalah dengan kayang sambil nonton anime. Sejak malam absurd itu, nama grup resmi berganti jadi Wibu Kayank (WK).",
    img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80",
    order: 0,
  },
  {
    code: "STORY-02",
    title: "Wacana Liburan ke Jepang vs Realita Warung Kopi",
    author: "Dimas",
    tag: "TONGKRONGAN",
    date: "28.06.2026",
    content: "Setiap bulan pasti ada minimal satu malam di mana kita buka Google Maps terus nyusun itinerary ke Akihabara seolah-olah besok langsung berangkat. Tapi begitu lihat saldo tabungan yang habis buat khilaf gacha dan beli merchandise, ujung-ujungnya kita cuma kumpul di warkop dekat perempatan sambil pesan mie instan dobel.",
    img: null,
    order: 1,
  },
];

async function main() {
  console.log("🌱 Menjalankan Seeder Database Wibu Kayank...\n");

  // 1. Admin User
  const adminUsername = process.env.ADMIN_USERNAME || "admin";
  const adminPassword = process.env.ADMIN_PASSWORD || "wk2026";

  const existingAdmin = await prisma.admin.findUnique({
    where: { username: adminUsername },
  });

  if (existingAdmin) {
    console.log(`✅ Admin "${adminUsername}" sudah terdaftar.`);
  } else {
    const hashedPassword = await bcrypt.hash(adminPassword, 12);
    await prisma.admin.create({
      data: {
        username: adminUsername,
        password: hashedPassword,
      },
    });
    console.log(`✅ Akun Admin dibuat: username="${adminUsername}", password="${adminPassword}"`);
  }

  // 2. Default Settings
  for (const s of DEFAULT_SETTINGS) {
    await prisma.setting.upsert({
      where: { key: s.key },
      update: {},
      create: { key: s.key, value: s.value },
    });
  }
  console.log(`✅ Default Settings (${DEFAULT_SETTINGS.length} keys) siap.`);

  // 3. Stock Members (Jika kosong)
  const memberCount = await prisma.member.count();
  if (memberCount === 0) {
    for (const m of DEFAULT_MEMBERS) {
      await prisma.member.create({ data: m });
    }
    console.log(`✅ ${DEFAULT_MEMBERS.length} Stock Member berhasil di-seed (siap diedit di Admin).`);
  } else {
    console.log(`ℹ️ Tabel Member sudah berisi ${memberCount} data — seeding di-skip.`);
  }

  // 4. Stock Gallery (Jika kosong)
  const galleryCount = await prisma.gallery.count();
  if (galleryCount === 0) {
    for (const g of DEFAULT_GALLERY) {
      await prisma.gallery.create({ data: g });
    }
    console.log(`✅ ${DEFAULT_GALLERY.length} Stock Gallery berhasil di-seed.`);
  } else {
    console.log(`ℹ️ Tabel Gallery sudah berisi ${galleryCount} data — seeding di-skip.`);
  }

  // 5. Stock Stories (Jika kosong)
  const storyCount = await prisma.story.count();
  if (storyCount === 0) {
    for (const st of DEFAULT_STORIES) {
      await prisma.story.create({ data: st });
    }
    console.log(`✅ ${DEFAULT_STORIES.length} Stock Story berhasil di-seed.`);
  } else {
    console.log(`ℹ️ Tabel Stories sudah berisi ${storyCount} data — seeding di-skip.`);
  }

  console.log("\n🎉 Seeding selesai dengan sukses!");
}

main()
  .catch((e) => {
    console.error("❌ Gagal seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
