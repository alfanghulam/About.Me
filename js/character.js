/* ============================================================
   character.js — mata & kepala maskot mengikuti kursor.
   Tiap mata menghitung ARAH ke kursor; jarak menentukan seberapa jauh
   pupil bergeser (jenuh cepat = sensitif). Spring kritis tanpa overshoot.
   ============================================================ */
(function () {
  "use strict";
  const eyes = [...document.querySelectorAll(".eye")];
  if (!eyes.length) return;
  const pup = eyes.map(e => e.firstElementChild);
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const Char = window.Char = { x: 0 };               // kemiringan kepala (-1..1), dibaca scroll.js

  /* ---------------- TUNING ---------------- */
  const RX = 18, RY = 6.5;      // jangkauan pupil (px pada gambar 982px)
  const FALLOFF = 110;          // makin kecil = makin sensitif
  const OMEGA = 32;             // kecepatan respons mata
  const IDLE_MS = 5000;         // diam sekian ms -> mata melirik sendiri
  /* ---------------------------------------- */

  let px = null, py = null, last = 0;
  addEventListener("pointermove", e => { px = e.clientX; py = e.clientY; last = performance.now(); }, { passive: true });
  const spring = (s, t, w, dt) => { const x = s.x - t, e = Math.exp(-w * dt), j = s.v + w * x; s.x = t + (x + j * dt) * e; s.v = (s.v - w * j * dt) * e; };
  const S = eyes.map(() => [{ x: 0, v: 0 }, { x: 0, v: 0 }]);
  const head = { x: 0, v: 0 };
  let t0 = performance.now(), ly = scrollY, sv = 0;

  function frame(n) {
    const dt = Math.min(0.05, (n - t0) / 1000 || 0.016); t0 = n;
    sv += ((scrollY - ly) / 8 - sv) * 0.14; ly = scrollY;           // melirik ke arah scroll
    const idle = px == null || n - last > IDLE_MS;
    eyes.forEach((el, i) => {
      if (!el.offsetParent) return;                                  // halaman tersembunyi
      let tx = Math.sin(n / 3100 + i * 0.2) * 0.5, ty = Math.cos(n / 2300) * 0.25;
      if (!idle) {
        const r = el.getBoundingClientRect();
        const dx = px - r.left - r.width / 2, dy = py - r.top - r.height / 2;
        const d = Math.hypot(dx, dy) || 1, s = 1 - Math.exp(-d / FALLOFF);
        tx = dx / d * s; ty = dy / d * s;
      }
      ty = Math.max(-1, Math.min(1, ty + sv * 0.03));
      spring(S[i][0], tx, OMEGA, dt); spring(S[i][1], ty, OMEGA, dt);
      const k = el.parentElement.clientWidth / 982;
      pup[i].style.translate = (S[i][0].x * RX * k).toFixed(2) + "px " + (S[i][1].x * RY * k).toFixed(2) + "px";
    });
    spring(head, idle ? 0 : Math.max(-1, Math.min(1, (px / innerWidth - 0.5) * 2)), 8, dt);
    Char.x = head.x;
    requestAnimationFrame(frame);
  }
  if (!reduce) requestAnimationFrame(frame);
})();
