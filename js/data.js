/* ============================================================
   data.js — SEMUA konten situs ada di sini.
   Edit file ini, simpan, lalu refresh browser. Tidak perlu menyentuh HTML.
   Teks dengan *tanda bintang* akan dicetak miring beraksen warna.
   ============================================================ */
window.PORTFOLIO = {

  site: {
    title: "About Me",
    archive: " Arsip portofolio",
    years: "",
    heroSub: "Karya, sertifikat, dan cerita  *dikumpulkan di satu tempat.*",
    intro: [
      "Aku membangun web,",
      "mempelajari *AI,*",
      "dan merancang yang *manusiawi.*"
    ]
  },

  identity: {
    name: "About Me",
    display: "ALFAN",
    location: "",
    focus: "Web · AI · UI/UX",
    bio: "Terdorong oleh rasa ingin tahu yang tinggi terhadap dunia teknologi, aku aktif belajar dan merancang proyek digital dari konsep hingga eksekusi, serta terus mencari peluang baru untuk berkarya.",
    about: "Web, AI, dan UI/UX adalah tiga hal yang terus kupelajari. Situs ini adalah arsipnya: tempat karya, sertifikat, dan catatan proses disimpan rapi.",
    education: {
      school: "Universitas Negeri Yogyakarta",
      major: "S1 Pendidikan Teknik Informatika",
      year: "2024",
      note: "Latar belakang pendidikan membentuk cara berpikirku tentang alur, struktur, dan cara orang belajar."
    }
  },

  skills: [
    { label: "Bahasa", items: ["HTML", "CSS", "JavaScript", "PHP", "Python"] },
    { label: "Framework", items: ["React.js", "Next.js", "Tailwind CSS", "Node.js"] },
    { label: "Tools", items: ["Git & GitHub", "VS Code", "Figma", "Postman", "MySQL"] }
  ],

  experience: [
    { year: "2024", role: "Pendidikan Tinggi", place: "Universitas Negeri Yogyakarta",
      desc: "Mulai menempuh pendidikan tinggi, mendalami dasar-dasar web development, AI, serta UI/UX lewat proyek akademik dan eksplorasi mandiri." },
    { year: "2025", role: "Proyek Web & UI/UX", place: "Akademik & Mandiri",
      desc: "Merancang dan membangun berbagai proyek web dari konsep hingga implementasi, termasuk antarmuka, struktur data, dan alur pengalaman pengguna." },
    { year: "2026", role: "Web App Skala Lanjut", place: "Proyek Mandiri",
      desc: "Mengembangkan aplikasi web berskala lanjut dengan tech stack modern (React.js, Next.js) serta mengintegrasikan AI dan API." }
  ],

  /* ----------------------------------------------------------
     PROYEK — tambah objek baru di dalam array.
       title        nama proyek
       category     label singkat, mis. "Web · E-commerce"
       year         tahun (boleh "")
       image        screenshot/mockup, mis. "assets/projects/nama.webp" (boleh "")
       description  penjelasan singkat
       stack        daftar teknologi (boleh [])
       demo, github tautan (boleh "")
     Tips gambar: lebar ±1600px, format .webp/.jpg, di bawah 300 KB.
     ---------------------------------------------------------- */
  projects: [
    {
      title: "VanzStore",
      category: "Web · E-commerce",
      year: "2026",
      image: "assets/projects/vanzstore.webp",
      description: "Toko online bertema gaming untuk barang hype. Ada pencarian, katalog, keranjang, promo, indikator stok, rating, serta mode terang dan gelap.",
      stack: [],
      demo: "",
      github: ""
    },
        {
      title: "E-learning",
      category: "Web · E-learning",
      year: "2026",
      image: "assets/projects/-learning.webp",
      description: "Web Interaktif. drop tugas, monitoring siswa, input nilai praktis, gamifikasi tugas.",
      stack: [],
      demo: "",
      github: ""
    },
  ],

  /* ----------------------------------------------------------
     SERTIFIKAT — arsip umum (bukan hanya bidang web/AI/UI-UX).
       title    judul yang tampil
       issuer   penyelenggara/penerbit
       date     tanggal (teks bebas)
       image    foto/scan, mis. "assets/certificates/nama.webp"
       details  rincian di jendela perbesar: { "Label": "isi", ... }
       url      tautan verifikasi (boleh "")
     Tips gambar: lebar ±1500px, format .webp/.jpg, di bawah 300 KB.
     ---------------------------------------------------------- */
  certificates: [
    {
      title: "Peserta Techcomfest UI/UX Competition 2026",
      issuer: "Politeknik Negeri Semarang · Polytechnic Computer Club",
      date: "20 Januari 2026",
      image: "assets/certificates/techcomfest-ui-ux-2026.webp",
      details: {
        "Penerima": "Alfan Ghulam Haydar",
        "Sebagai": "Peserta Kegiatan",
        "Acara": "Techcomfest UI/UX Competition 2026",
        "Tema": "SYNC REALITY: Shaping the Future of Digital Experience",
        "Nomor": "09/PL4.7.1/KM/2026",
        "Pelaksanaan": "20 Januari 2026"
      },
      url: ""
    },
     {
      title: "Panitia Kegiatan Proyek Kemanusiaan",
      issuer: "Himanika Fakultas Teknik · Universitas Negeri Yogyakarta",
      date: "31 Mei 2026",
      image: "assets/certificates/PK.webp",
      details: {
        "Penerima": "Alfan Ghulam Haydar",
        "Sebagai": "Panitia Kegiatan",
        "Acara": "Proyek Kemanusiaan",
        "Tema": "Kebersihan dan Pemeliharaan Lingkungan di Kawasan Wisata Bukit Klangon",
        "Nomor": "007/13/C/PK_HIMANIKA/FT_UNY/VI/2026",
        "Pelaksanaan": "30 Mei 2026"
      },
      url: ""
    },
    {
      title: "Panitia Kegiatan Pengabdian Masyarakat",
      issuer: "Himanika Fakultas Teknik · Universitas Negeri Yogyakarta",
      date: "31 Mei 2026",
      image: "assets/certificates/PM.webp",
      details: {
        "Penerima": "Alfan Ghulam Haydar",
        "Sebagai": "Panitia Kegiatan",
        "Acara": "Pengabdian Masyarakat",
        "Tema": "Sosialisasi Perilaku Hidup Bersih dan Sehat ",
        "Nomor": "007/13/C/PM_HIMANIKA/FT_UNY/VI/2026",
        "Pelaksanaan": "30 Mei 2026"
      },
      url: ""
    },
    {
      title: "UPGRADING",
      issuer: "Himanika Fakultas Teknik · Universitas Negeri Yogyakarta",
      date: "2 Mei 2026",
      image: "assets/certificates/upgrading.webp",
      details: {
        "Penerima": "Alfan Ghulam Haydar",
        "Sebagai": "Panitia Kegiatan",
        "Acara": "Upgrading",
        "Tema": "Langkah Awal Membangun Kebersamaan Dalam Berorganisasi",
        "Nomor": "007/13/D/UPGRADING_HIMANIKA/FT_UNY/V/2026",
        "Pelaksanaan": "2 Mei 2026"
      },
      url: ""
    },
        {
      title: "Pembekalan Praktik Kerja Lapangan, Praktik Industri dan Magang",
      issuer: "UNIT KULIAH KERJA NYATA, PRAKTIK KEPENDIDIKAN, PRAKTIK INDUSTRI DAN MAGANG · Universitas Negeri Yogyakarta",
      date: "24 April 2026",
      image: "assets/certificates/magang.webp",
      details: {
        "Penerima": "Alfan Ghulam Haydar",
        "Sebagai": "Peserta Kegiatan",
        "Acara": "Pembekalan Praktik Kerja Lapangan, Praktik Industri dan Magang",
        "Tema": "Pembekalan Praktik Kerja Lapangan, Praktik Industri dan Magang",
        "Nomor": "14/UKKNPKPIM/TU/2026",
        "Pelaksanaan": "24 April 2026"
      },
      url: ""
    },


  ], 

  /* ----------------------------------------------------------
     KONTAK — tampil sebagai baris besar di halaman Kontak.
     Hapus tanda // di depan WhatsApp kalau mau menampilkannya.
     ---------------------------------------------------------- */
  contacts: [
    { label: "Instagram", handle: "@alfan_haydar", url: "https://instagram.com/alfan_haydar" },
    { label: "LinkedIn", handle: "/in/alfan-ghulam", url: "https://www.linkedin.com/in/alfan-ghulam/" },
    { label: "GitHub", handle: "@alfanghulam", url: "https://github.com/alfanghulam" },
    { label: "Email", handle: "haydaralfan32@gmail.com", url: "mailto:haydaralfan32@gmail.com" }
    // , { label: "WhatsApp", handle: "+62 887-4333-47278", url: "https://wa.me/62887433347278" }
  ]
};
