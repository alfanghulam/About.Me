# Arsip Portofolio — Alfan Ghulam Haydar

Situs statis: **HTML + CSS + JavaScript biasa**, tanpa framework dan tanpa build step.
Semua konten ada di satu file: `js/data.js`.

## Struktur

```
portofolio-alfan/
├─ index.html          kerangka halaman (Beranda, Tentang, Kontak, lightbox)
├─ css/
│  └─ style.css        seluruh gaya; token warna & font di bagian :root
├─ js/
│  ├─ data.js          SEMUA konten (identitas, proyek, sertifikat, kontak, dll.)
│  ├─ main.js          menyusun halaman dari data, router antar-halaman, lightbox
│  ├─ character.js     mata & kepala maskot mengikuti kursor (blok TUNING di atas)
│  └─ scroll.js        koreografi scroll (hero, intro, proyek horizontal, sertifikat, dll.)
├─ assets/
│  ├─ character.webp   maskot (pupil sudah dihapus; pupil digerakkan lewat JS)
│  ├─ pupil.png        sprite pupil
│  ├─ favicon.svg
│  ├─ source-character.png  gambar asli (arsip, tidak dipakai halaman)
│  ├─ projects/        screenshot proyek
│  └─ certificates/    foto/scan sertifikat
├─ package.json        skrip opsional `npm start` / `npm run dev`
└─ README.md
```

## Jalankan di localhost

Jalankan di dalam folder ini, salah satu:

```bash
python3 -m http.server 8000      # buka http://localhost:8000
npx serve .                      # atau: npm start
```

Atau di VS Code: ekstensi **Live Server** → klik kanan `index.html` → *Open with Live Server*.
Gunakan server lokal (jangan klik dua kali `index.html`) supaya perilakunya sama dengan saat di-hosting.

## Hosting

Upload **seluruh isi folder** (bukan hanya `index.html`):

- **Netlify / Cloudflare Pages**: drag-and-drop folder. Build command kosong, publish directory `.`
- **Vercel**: Import repo, Framework Preset *Other*, tanpa build command.
- **GitHub Pages**: push ke repo → *Settings → Pages* → branch `main`, folder `/ (root)`.

Setelah mengubah CSS/JS/gambar dan sudah online, naikkan angka `?v=6` di `index.html`
(mis. `style.css?v=7`) supaya browser pengunjung tidak memakai cache lama.

> Font (Fraunces, Hanken Grotesk, IBM Plex Mono) dimuat dari Google Fonts, jadi butuh internet.
> Tanpa internet, tampil font cadangan sistem.

## Menambah proyek (dengan gambar)

1. Simpan screenshot di `assets/projects/`, mis. `nama-proyek.webp`
   (lebar ±1600px, format `.webp`/`.jpg`, di bawah 300 KB).
2. Di `js/data.js` → `projects`, tambah objek:

```js
{
  title: "Nama Proyek",
  category: "Web · E-commerce",
  year: "2026",
  image: "assets/projects/nama-proyek.webp",   // boleh "" -> tampil angka besar
  description: "Penjelasan singkat.",
  stack: ["React", "Tailwind"],                // boleh []
  demo: "https://...",                         // boleh ""
  github: "https://github.com/..."             // boleh ""
}
```

Klik gambar proyek di situs untuk memperbesar. Warna panel bergantian otomatis.

## Menambah sertifikat (arsip umum)

1. Simpan foto/scan di `assets/certificates/`, mis. `nama-sertifikat.webp`
   (lebar ±1500px, di bawah 300 KB).
2. Di `js/data.js` → `certificates`, tambah objek:

```js
{
  title: "Peserta Lomba Contoh 2026",
  issuer: "Nama Penyelenggara",
  date: "20 Januari 2026",
  image: "assets/certificates/nama-sertifikat.webp",
  details: { "Penerima": "Nama", "Nomor": "123/ABC/2026" },   // tampil saat diperbesar
  url: ""                                                     // tautan verifikasi, boleh ""
}
```

Sertifikat tidak dibatasi bidang tertentu. Tata letak menyesuaikan jumlahnya:
1 sertifikat → satu kartu besar, 2 → dua kolom, 3 atau lebih → tiga kolom dengan efek paralaks.
Kalau `certificates` kosong, bagian ini otomatis disembunyikan.

## Menyetel animasi

- **Mata maskot**: `js/character.js`, blok **TUNING** (`FALLOFF` makin kecil = makin sensitif, `OMEGA` kecepatan respons, `RX/RY` jangkauan).
- **Scroll**: `js/scroll.js`, tiap efek diberi nomor di komentar atas file.
- **Warna & font**: `css/style.css`, bagian `:root` (`--acc` oranye aksen, `--sage`, `--green`, dll.).
- `prefers-reduced-motion` mematikan efek scroll yang berat.

## Catatan

- Tidak ada API key, database, atau data rahasia di proyek ini.
- Jangan taruh nomor telepon/email yang tidak ingin dipublikasikan di `js/data.js`. Semua isi file itu terlihat oleh pengunjung.
