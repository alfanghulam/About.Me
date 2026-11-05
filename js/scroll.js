/* ============================================================
   scroll.js — koreografi scroll.
   1. Hero dipaku: huruf nama terpecah, maskot membesar, latar berganti warna
   2. Kalimat intro masuk bergantian kiri/kanan
   3. Proyek: scroll vertikal -> horizontal + angka paralaks
   4. Sertifikat: kolom bergerak dengan kecepatan berbeda
   5. Tentang: teks muncul kata-per-kata + indeks bab
   6. Kontak: baris naik bertahap
   ============================================================ */
(function () {
  "use strict";
  const $ = (q, r = document) => r.querySelector(q), $$ = (q, r = document) => [...r.querySelectorAll(q)];
  const cl = x => Math.max(0, Math.min(1, x));
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const App = window.App || { page: "home" };
  const Wd = () => innerWidth, Ht = () => innerHeight;

  /* pecah teks jadi kata untuk efek scrub */
  function split(n) {
    [...n.childNodes].forEach(c => {
      if (c.nodeType === 3) {
        const f = document.createDocumentFragment();
        c.textContent.split(/(\s+)/).forEach(t => {
          if (!t.trim()) { f.append(t); return; }
          const s = document.createElement("span"); s.className = "wd"; s.textContent = t; f.append(s);
        });
        c.replaceWith(f);
      } else split(c);
    });
  }
  $$(".sc").forEach(split);

  const hero = $("#hero"), hs = $("#hs"), hf = $("#hf"), hsub = $("#hsub"), hz = $("#hz"), trk = $("#trk"), pg = $("#pg"), cc = $("#cc");
  const bar = $("#bar");
  const letters = $$("#word span"), metas = $$(".meta"), lns = $$(".ln"), pjs = $$(".pj"), cols = $$(".col"), words = $$(".sc .wd");
  const arts = $$(".abr article"), idx = $$("#idx li"), rows = $$(".rows li");

  function frame() {
    const y = scrollY, vw = Wd(), vh = Ht();
    bar.style.transform = "scaleX(" + cl(y / Math.max(1, document.documentElement.scrollHeight - vh)) + ")";

    if (App.page === "home" && !reduce) {
      /* 1. hero */
      const p = cl(-hero.getBoundingClientRect().top / (hero.offsetHeight - vh));
      letters.forEach((s, i) => {
        const o = i - (letters.length - 1) / 2;
        s.style.transform = "translate3d(" + (o * p * vw * 0.36) + "px," + (-Math.abs(o) * p * vh * 0.05) + "px,0) rotate(" + (o * p * 7) + "deg)";
        s.style.opacity = 1 - p * 0.8;
      });
      hf.style.transform = "translateX(-50%) translateX(" + ((window.Char ? window.Char.x : 0) * 10) + "px) scale(" + (1 + p * 0.32) + ") translateY(" + (p * 3) + "%)";
      hs.style.background = "rgb(" + [246 + (207 - 246) * p, 245 + (220 - 245) * p, 240 + (200 - 240) * p].map(Math.round) + ")";
      metas.forEach(m => m.style.opacity = 1 - cl(p * 3));
      const q = cl((p - 0.5) / 0.25); hsub.style.opacity = q; hsub.style.transform = "translateY(" + (1 - q) * 40 + "px)";

      /* 2. intro */
      lns.forEach((l, i) => {
        const q2 = cl((vh - l.getBoundingClientRect().top) / (vh * 0.7)), d = i % 2 ? 1 : -1;
        l.style.transform = "translateX(" + d * (1 - q2) * vw * 0.5 + "px)"; l.style.opacity = 0.15 + 0.85 * q2;
      });

      /* 3. proyek horizontal */
      if (!hz.hidden) {
        const dist = trk.scrollWidth - vw;
        if (dist > 4) {
          hz.style.height = (dist + vh) + "px";
          const hp = cl(-hz.getBoundingClientRect().top / dist);
          trk.style.transform = "translateX(" + (-hp * dist) + "px)"; pg.style.transform = "scaleX(" + hp + ")";
        } else { hz.style.height = vh + "px"; pg.style.transform = "scaleX(1)"; }
        pjs.forEach(el => {
          const n = el.querySelector(".num"); if (!n) return;
          const b = el.getBoundingClientRect(); n.style.transform = "translateX(" + (-(b.left + b.width / 2 - vw / 2) * 0.22) + "px)";
        });
      }

      /* 4. sertifikat */
      if (cols.length) {
        const r = cc.getBoundingClientRect(), t = vh / 2 - (r.top + r.height / 2);
        cols.forEach(c => { const s = parseFloat(c.dataset.s) || 0; if (s) c.style.transform = "translateY(" + t * s + "px)"; });
      }
    } else if (App.page === "tentang") {
      /* 5. tentang */
      words.forEach(w => { const q = cl((vh * 0.92 - w.getBoundingClientRect().top) / (vh * 0.34)); w.style.opacity = 0.14 + 0.86 * q; });
      let cur = 0; arts.forEach((a, i) => { if (a.getBoundingClientRect().top < vh * 0.5) cur = i; });
      idx.forEach((l, i) => l.classList.toggle("on", i === cur));
    } else if (App.page === "kontak") {
      /* 6. kontak */
      rows.forEach(l => { const q = cl((vh * 1.02 - l.getBoundingClientRect().top) / (vh * 0.3)); l.style.opacity = q; l.style.transform = "translateY(" + (1 - q) * 50 + "px)"; });
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
