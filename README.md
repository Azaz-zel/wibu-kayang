# 🎌 WIBU KAYANK (WK) — Collective Archive

Website Profile & Arsip Resmi Wibu Kayank (WK). Dibangun dengan arsitektur fullstack modern menggunakan **React 18**, **Vite**, **TypeScript**, **Tailwind CSS**, **Node.js (Express)**, **Prisma ORM**, dan **MySQL**.

---

## ⚡ Fitur Utama

- **Frontend React + Vite (Zero Lag)**: Menggunakan React 18 dengan Tailwind CSS yang dikompilasi (bukan runtime CDN). Render super cepat, ringan, dan 60 FPS mulus.
- **Design Editorial & Minimalis**: Identik dengan referensi desain, tipografi editorial (*Syne*, *Inter*, *JetBrains Mono*), palet warna *paper*, *ink*, dan *vermilion*.
- **Tampilan Penuh (Full Width 100%)**: Edge-to-edge tanpa rongga kanan-kiri yang mengganggu.
- **Dark / Light Mode**: Toggle tema gelap dan terang dengan preferensi tersimpan di local storage.
- **Marquee Ticker & Live WIB Clock**: Running ticker tongkrongan dan jam live Waktu Indonesia Barat.
- **REST API + Prisma ORM + MySQL**: Seluruh data (Member, Galeri Foto, Cerita Lore, Kanal Sosmed) tersimpan dinamis di database MySQL.
- **Admin CMS Terproteksi Password (Akses Link Manual)**:
  - Tombol admin disembunyikan dari web publik.
  - Masuk melalui link manual: `/admin` atau `#admin`.
  - Tab CRUD Member, Galeri Foto, Cerita Lore, dan Pengaturan Kanal Medsos.
  - Fitur Ganti Password Admin langsung dari panel.
- **Self-Hosted Ready**: Dapat dideploy langsung di server Linux/Windows VPS sendiri.

---

## 📂 Struktur Project

```
D:\Project\Wibu Kayank/
├── .env                  # Konfigurasi database, JWT, port, dan kredensial admin
├── .env.example          # Template konfigurasi environment
├── package.json          # Script dan dependensi root
├── tsconfig.json         # Konfigurasi compiler TypeScript server
├── prisma/
│   └── schema.prisma     # Definisi skema tabel database (MySQL)
├── client/               # FRONTEND REACT (Vite + TypeScript + Tailwind)
│   ├── src/
│   │   ├── components/   # Komponen React (Header, Hero, MemberRoster, dll)
│   │   ├── App.tsx       # State manajemen utama & routing modal
│   │   ├── main.tsx      # Entrypoint React
│   │   ├── types.ts      # TypeScript interfaces
│   │   └── index.css     # Tailwind CSS styles
│   ├── vite.config.ts    # Konfigurasi Vite & proxy backend
│   └── package.json      # Dependensi frontend
├── server/               # BACKEND EXPRESS (TypeScript + Prisma)
│   ├── index.ts          # Server Express entrypoint & SPA fallback
│   ├── prisma.ts         # Prisma Client singleton
│   ├── seed.ts           # Seeder data awal stock
│   ├── middleware/auth.ts# Verifikasi token JWT
│   ├── routes/           # REST API endpoints (auth, members, gallery, stories, settings)
│   └── utils/upload.ts   # Multer file upload
├── public/               # Direktori hasil build React & static uploads
└── dist/                 # Hasil kompilasi TypeScript server
```

---

## 🚀 Panduan Menjalankan

### 1. Nyalakan MySQL di Laragon / XAMPP
Pastikan service MySQL menyala di port 3306 dan database `wibu_kayank` sudah dibuat.

### 2. Push Skema & Seed Data Awal
```bash
npm run db:push
npm run db:seed
```

### 3. Jalankan Aplikasi

#### Pilihan A: Mode Standar (Fullstack Terintegrasi)
```bash
# Jalankan backend (yang langsung melayani React dari folder public)
npm run dev
```
Buka browser di: **`http://localhost:3000`**

#### Pilihan B: Mode Vite Dev Server (Hot Module Replacement)
Jika kamu ingin ngoding frontend dengan auto-refresh super instan:
- Terminal 1: `npm run dev` (Backend di port 3000)
- Terminal 2: `npm run client` (Frontend Vite di `http://localhost:5173`)

### 5. Jalankan Seeder Data Awal (Opsional tapi Direkomendasikan)
Perintah ini akan membuat akun admin default serta mengisi member, galeri, dan cerita stock (sama persis seperti referensi) sehingga web tidak kosong saat pertama dibuka:
```bash
npm run db:seed
```

### 6. Jalankan Server

#### Mode Development (Auto-Reload):
```bash
npm run dev
```

#### Mode Production:
```bash
npm run build
npm start
```

Buka browser kamu di: **`http://localhost:3000`**

---

## 🔐 Mengelola Web Lewat Panel Admin (Akses Link Manual)

Tombol admin sengaja disembunyikan dari halaman publik. Untuk masuk ke terminal CMS Admin:

1. Buka browser dan akses URL manual:
   - **`http://localhost:3000/admin`**
   - Atau ketik **`#admin`** di belakang URL: **`http://localhost:3000/#admin`**
2. Modal login admin akan otomatis muncul.
3. Masukkan kredensial admin:
   - **Username**: `admin`
   - **Password**: `wk2026` *(atau sesuai yang kamu atur di `.env`)*
4. Setelah login berhasil, drawer Admin CMS akan terbuka dari sisi kanan:
   - **+ Member**: Tambah member baru dengan upload foto atau link URL, pilih kategori (*CORE / DIVISI GAME / LORE & MANGA*), atau klik tombol **Edit** / **Hapus** pada daftar member yang sudah ada.
   - **+ Foto**: Upload foto dokumentasi tongkrongan ke Visual Log.
   - **+ Cerita**: Tulis catatan kejadian absurd atau cerita tongkrongan.
   - **⚙ Setting**: Masukkan link Discord, Instagram, TikTok, dll., serta ganti password admin kapan saja.

---

## 🌐 Deployment di Server Sendiri

Jika ingin menjalankan web ini di server VPS Linux/Windows:
1. Pastikan port `3000` dibuka di firewall, atau gunakan **Nginx reverse proxy**:
   ```nginx
   server {
       listen 80;
       server_name wibukayank.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```
2. Jalankan server dengan **PM2** agar tetap hidup di background:
   ```bash
   npm run build
   npx pm2 start dist/index.js --name "wibu-kayank"
   ```

---

*© 2026 WIBU KAYANK (WK). All rights reserved.*
