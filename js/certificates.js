/* ============================================================
   certificates.js — seksi Sertifikat
   Animasi:
   1. Tumpukan kertas yang "dikipas" menjadi grid saat seksi terlihat
   2. Stempel segel emas menghantam kartu setelah mendarat
   3. Foil holografis + kilau yang mengikuti kursor, kartu miring 3D
   4. Filter ala "spotlight": kartu lain meredup, bukan menghilang
   5. Hitung naik pada statistik, ticker judul yang berjalan
   6. Detail dalam modal: kartu berputar masuk, navigasi ← →
   Data: js/data.js -> certificates
   ============================================================ */
(function () {
  "use strict";

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = v => String(v == null ? "" : v).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const safeUrl = v => /^(https?:\/\/)/i.test(v || "") ? v : "";
  const safeImg = v => /^(assets\/|\.\/|https?:\/\/)[\w\-./%~:@?=&+]+$/i.test(v || "") ? v : "";
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = matchMedia("(pointer: fine)").matches;

  const section = $("#sertifikat");
  const data = window.PORTFOLIO;
  if (!section || !data) return;
  const certs = Array.isArray(data.certificates) ? data.certificates.filter(c => c && c.title) : [];

  // Tidak ada sertifikat -> sembunyikan seksi & tautan navigasinya.
  if (!certs.length) {
    section.hidden = true;
    $$('a[href="#sertifikat"]').forEach(a => { a.hidden = true; });
    return;
  }

  const owner = (data.identity && data.identity.name) || "";
  const CAT = {
    web: { label: "WEB", acc: "#62e6ff" },
    ai: { label: "AI", acc: "#b69cff" },
    uiux: { label: "UI/UX", acc: "#ffb38a" },
    lainnya: { label: "LAINNYA", acc: "#8fb0ff" }
  };
  const cat = c => CAT[c.category] || CAT.lainnya;
  const pad = n => String(n).padStart(2, "0");

  /* ---------------- kertas sertifikat (dipakai kartu & modal) ---------------- */
  function paperHTML(c, i) {
    const k = cat(c);
    const img = safeImg(c.image);
    const sealId = "seal-" + esc(c.id || i) + "-" + Math.random().toString(36).slice(2, 6);
    const seal = `
      <div class="cert-seal" aria-hidden="true">
        <svg viewBox="0 0 100 100"><defs><path id="${sealId}" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0"/></defs>
          <text><textPath href="#${sealId}" startOffset="0" textLength="226" lengthAdjust="spacing">VERIFIED ✦ CERTIFIED ✦ AUTHENTIC ✦ </textPath></text></svg>
        <span>✦</span>
      </div>`;
    const body = img
      ? `<img class="cert-img" src="${esc(img)}" alt="Sertifikat ${esc(c.title)}" loading="lazy" decoding="async">`
      : `
        <div class="cert-guilloche"></div>
        <div class="cert-top"><span class="cert-issuer">${esc(c.issuer || "")}</span><span class="cert-no">N° ${pad(i + 1)}</span></div>
        <div class="cert-kicker">SERTIFIKAT · ${esc(k.label)}</div>
        <h4 class="cert-title">${esc(c.title)}</h4>
        <p class="cert-to">Diberikan kepada <b>${esc(owner)}</b></p>
        <div class="cert-bottom">
          <div><small>TANGGAL</small><b>${esc(c.date || c.year || "")}</b></div>
          <div><small>ID</small><b>${esc(c.credentialId || "—")}</b></div>
        </div>`;
    return `
      <div class="cert-paper${img ? " has-img" : ""}" style="--acc:${k.acc}">
        <span class="cert-frame"></span><span class="cert-corner tl"></span><span class="cert-corner tr"></span><span class="cert-corner bl"></span><span class="cert-corner br"></span>
        ${body}
        ${seal}
        ${c.anon ? '<span class="cert-sample">DATA CONTOH</span>' : ""}
        <div class="cert-foil"></div><div class="cert-glare"></div>
      </div>`;
  }

  /* ---------------- statistik ---------------- */
  const issuers = new Set(certs.map(c => c.issuer).filter(Boolean));
  const cats = new Set(certs.map(c => c.category || "lainnya"));
  const years = certs.map(c => Number(c.year)).filter(Boolean);
  const stats = [
    { n: certs.length, label: "SERTIFIKAT" },
    { n: issuers.size, label: "PENERBIT" },
    { n: cats.size, label: "BIDANG" },
    { n: years.length ? Math.max(...years) : "—", label: "TERBARU", plain: true }
  ];
  $("#certStats").innerHTML = stats.map(s => `
    <div class="cert-stat"><b ${s.plain ? "" : `data-count="${s.n}"`}>${s.plain ? esc(s.n) : "00"}</b><small>${s.label}</small></div>`).join("");

  /* ---------------- filter ---------------- */
  const order = ["web", "ai", "uiux", "lainnya"].filter(k => cats.has(k));
  const filterBox = $("#certFilters");
  filterBox.innerHTML = [`<button class="filter-btn active" type="button" data-f="all">SEMUA <i>${pad(certs.length)}</i></button>`]
    .concat(order.map(k => `<button class="filter-btn" type="button" data-f="${k}">${CAT[k].label} <i>${pad(certs.filter(c => (c.category || "lainnya") === k).length)}</i></button>`)).join("");

  /* ---------------- kartu ---------------- */
  const deck = $("#certDeck");
  deck.innerHTML = certs.map((c, i) => `
    <article class="cert-card" style="--i:${i}" data-i="${i}" data-cat="${esc(c.category || "lainnya")}" tabindex="0" role="button"
             aria-label="Buka detail sertifikat ${esc(c.title)}">
      <div class="cert-tilt">${paperHTML(c, i)}</div>
    </article>`).join("");
  const cards = $$(".cert-card", deck);

  /* ticker judul */
  const tick = certs.map(c => `<span>${esc(c.title)}</span><i>✦</i>`).join("");
  $("#certTicker").innerHTML = `<div class="ticker-track">${tick}${tick}${tick}${tick}</div>`;
  $("#certNote").innerHTML = certs.some(c => c.anon)
    ? '<i aria-hidden="true"></i> SEBAGIAN SERTIFIKAT MASIH DATA CONTOH · EDIT DI js/data.js → certificates'
    : "";
  if (!certs.some(c => c.anon)) $("#certNote").hidden = true;

  /* ---------------- 1) tumpukan -> kipas ---------------- */
  function layoutStack() {
    const w = deck.clientWidth, h = deck.clientHeight;
    const n = cards.length;
    cards.forEach((el, i) => {
      const dx = w / 2 - (el.offsetLeft + el.offsetWidth / 2);
      const dy = Math.min(h / 2, 220) - (el.offsetTop + el.offsetHeight / 2);
      const rot = (i - (n - 1) / 2) * 5.5;
      el.style.setProperty("--dx", dx.toFixed(1) + "px");
      el.style.setProperty("--dy", dy.toFixed(1) + "px");
      el.style.setProperty("--rot", rot.toFixed(1) + "deg");
      el.style.setProperty("--z", String(n - i));
    });
  }
  layoutStack();
  let revealed = false;
  addEventListener("resize", () => { if (!revealed) layoutStack(); }, { passive: true });
  // gambar sertifikat bisa mengubah tinggi grid setelah dimuat
  addEventListener("load", () => { if (!revealed) layoutStack(); });

  function countUp() {
    $$("[data-count]", section).forEach(el => {
      const to = Number(el.dataset.count) || 0;
      if (reduce || to === 0) { el.textContent = pad(to); return; }
      const t0 = performance.now(), dur = 1100;
      (function step(now) {
        const p = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - p, 3);
        el.textContent = pad(Math.round(to * e));
        if (p < 1) requestAnimationFrame(step);
      })(t0);
    });
  }

  function reveal() {
    if (revealed) return;
    revealed = true;
    layoutStack();
    requestAnimationFrame(() => requestAnimationFrame(() => {
      section.classList.add("in");
      countUp();
      setTimeout(() => deck.classList.add("settled"), reduce ? 0 : 700 + cards.length * 110 + 900);
    }));
  }
  if (reduce || !("IntersectionObserver" in window)) {
    revealed = true; section.classList.add("in"); deck.classList.add("settled"); countUp();
  } else {
    new IntersectionObserver((en, io) => {
      if (en.some(e => e.isIntersecting)) { reveal(); io.disconnect(); }
    }, { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }).observe(deck);
  }

  /* ---------------- 4) filter spotlight ---------------- */
  filterBox.addEventListener("click", e => {
    const b = e.target.closest(".filter-btn");
    if (!b) return;
    $$(".filter-btn", filterBox).forEach(x => x.classList.toggle("active", x === b));
    const f = b.dataset.f;
    cards.forEach(el => {
      const off = f !== "all" && el.dataset.cat !== f;
      el.classList.toggle("is-off", off);
      el.tabIndex = off ? -1 : 0;
    });
  });

  /* ---------------- 3) foil + tilt mengikuti kursor ---------------- */
  function bindTilt(host, target, max) {
    if (!fine || reduce) return;
    let raf = 0, px = 0.5, py = 0.5;
    const apply = () => {
      raf = 0;
      target.style.setProperty("--rx", ((0.5 - py) * max).toFixed(2) + "deg");
      target.style.setProperty("--ry", ((px - 0.5) * max * 1.3).toFixed(2) + "deg");
      target.style.setProperty("--mx", (px * 100).toFixed(1) + "%");
      target.style.setProperty("--my", (py * 100).toFixed(1) + "%");
    };
    host.addEventListener("pointermove", e => {
      const r = host.getBoundingClientRect();
      px = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
      py = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
      host.classList.add("is-hover");
      if (!raf) raf = requestAnimationFrame(apply);
    }, { passive: true });
    host.addEventListener("pointerleave", () => {
      host.classList.remove("is-hover");
      px = 0.5; py = 0.5;
      if (!raf) raf = requestAnimationFrame(apply);
    });
  }
  cards.forEach(el => bindTilt(el, el, 14));

  /* ---------------- 6) modal ---------------- */
  const modal = $("#certModal");
  const stage = $("#certStage");
  let cur = 0, opener = null;

  function fill(i) {
    cur = (i + certs.length) % certs.length;
    const c = certs[cur], k = cat(c);
    stage.innerHTML = `<div class="cm-tilt">${paperHTML(c, cur)}</div>`;
    stage.classList.remove("swap"); void stage.offsetWidth; stage.classList.add("swap");
    $("#certEyebrow").textContent = `SERTIFIKAT ${pad(cur + 1)} · ${k.label}`;
    $("#certModalTitle").textContent = c.title;
    $("#certDesc").textContent = c.description || "";
    $("#certMeta").innerHTML = [
      ["PENERBIT", c.issuer], ["TANGGAL", c.date || c.year], ["ID KREDENSIAL", c.credentialId]
    ].filter(r => r[1]).map(r => `<div><dt>${r[0]}</dt><dd>${esc(r[1])}</dd></div>`).join("");
    $("#certSkills").innerHTML = (c.skills || []).map(s => `<span class="interest">${esc(s)}</span>`).join("");
    const link = $("#certLink"), url = safeUrl(c.url);
    link.hidden = !url;
    if (url) link.href = url;
    $("#certCount").textContent = `${cur + 1} / ${certs.length}`;
    $("#certModalNote").textContent = c.anon ? "Sertifikat contoh. Ganti datanya di js/data.js saat sudah siap." : "";
  }
  bindTilt(stage, stage, 12); // dipasang sekali; isi stage diganti-ganti oleh fill()

  function open(i, from) {
    opener = from || null;
    fill(i);
    if (typeof modal.showModal === "function") modal.showModal(); else modal.setAttribute("open", "");
  }
  function close() {
    if (typeof modal.close === "function") modal.close(); else modal.removeAttribute("open");
    if (opener) opener.focus({ preventScroll: true });
  }
  deck.addEventListener("click", e => {
    const el = e.target.closest(".cert-card");
    if (el && !el.classList.contains("is-off")) open(Number(el.dataset.i), el);
  });
  deck.addEventListener("keydown", e => {
    if (e.key !== "Enter" && e.key !== " ") return;
    const el = e.target.closest(".cert-card");
    if (el) { e.preventDefault(); open(Number(el.dataset.i), el); }
  });
  $("#certClose").addEventListener("click", close);
  $("#certPrev").addEventListener("click", () => fill(cur - 1));
  $("#certNext").addEventListener("click", () => fill(cur + 1));
  modal.addEventListener("click", e => { if (e.target === modal) close(); });
  modal.addEventListener("keydown", e => {
    if (e.key === "ArrowLeft") fill(cur - 1);
    else if (e.key === "ArrowRight") fill(cur + 1);
  });
})();
