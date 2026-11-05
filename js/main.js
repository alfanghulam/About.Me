/* ============================================================
   main.js — membaca data.js, menyusun halaman, router antar-halaman,
   dan jendela perbesar gambar (lightbox).
   ============================================================ */
(function () {
  "use strict";
  const D = window.PORTFOLIO;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  if (!D) { document.body.innerHTML = '<p style="padding:40px;font-family:monospace">js/data.js tidak termuat. Pastikan folder js/ ikut ter-upload.</p>'; return; }

  const esc = v => String(v == null ? "" : v).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const em = s => esc(s).replace(/\*([^*]+)\*/g, "<em>$1</em>");
  const url = v => /^(https?:\/\/|mailto:)/i.test(v || "") ? v : "";
  const img = v => /^(assets\/|\.\/assets\/)[\w\-./%~]+$/i.test(v || "") ? v : "";
  const pad = n => String(n).padStart(2, "0");
  const I = D.identity, S = D.site;
  const projects = D.projects || [], certs = D.certificates || [];

  // Judul tab browser: isi site.title di data.js. Kalau kosong, dipakai "Nama — Arsip portofolio".
  document.title = S.title || I.name;
  $("#brandName").textContent = I.name;

  /* ---------- beranda: hero ---------- */
  $("#word").innerHTML = [...I.display].map(c => `<span>${esc(c)}</span>`).join("");
  $("#mTl").innerHTML = `${esc(S.archive)}<br>${esc(S.years)}`;
  $("#mTr").textContent = I.location;
  $("#mBl").textContent = I.focus;
  $("#hsub").innerHTML = em(S.heroSub);
  $("#intro").innerHTML = `<div class="m">Tentang arsip ini</div>` + S.intro.map(t => `<div class="ln">${em(t)}</div>`).join("");

  /* ---------- proyek ---------- */
  const tones = ["p1", "p2", "p3", "p4"];
  if (!projects.length) $("#hz").hidden = true;
  $("#pjTitle").innerHTML = `Proyek <sup class="m">(${pad(projects.length)})</sup>`;
  $("#trk").innerHTML = projects.map((p, i) => {
    const im = img(p.image);
    const links = [[p.demo, "Demo ↗"], [p.github, "GitHub ↗"]].filter(l => url(l[0]))
      .map(l => `<a class="m" href="${esc(url(l[0]))}" target="_blank" rel="noopener">${l[1]}</a>`).join("");
    const chips = (p.stack || []).length ? `<div class="chips">${p.stack.map(s => `<span class="m">${esc(s)}</span>`).join("")}</div>` : "";
    return `<article class="pj ${tones[i % 4]}${projects.length === 1 ? " solo" : ""}${im ? "" : " noimg"}">
      <div class="top2"><span class="m">${esc(p.category || "")}${p.year ? " · " + esc(p.year) : ""}</span><span class="m">${pad(i + 1)}</span></div>
      ${im ? `<button class="shot" type="button" data-lb="project:${i}" aria-label="Perbesar gambar ${esc(p.title)}"><img src="${esc(im)}" alt="Tampilan ${esc(p.title)}" loading="lazy" decoding="async"></button>` : `<span class="num">${pad(i + 1)}</span>`}
      <div class="bt"><div><h3>${esc(p.title)}</h3><p>${esc(p.description || "")}</p>${chips}</div>${links ? `<div class="lk">${links}</div>` : ""}</div>
    </article>`;
  }).join("");

  /* ---------- sertifikat (arsip umum) ---------- */
  if (!certs.length) $("#cert").hidden = true;
  $("#ctTitle").innerHTML = `Sertifikat <sup class="m">(${pad(certs.length)})</sup>`;
  const cols = Math.max(1, Math.min(certs.length, 3));
  const buckets = Array.from({ length: cols }, () => []);
  certs.forEach((c, i) => {
    const im = img(c.image);
    buckets[i % cols].push(`<button class="ct" type="button" data-lb="cert:${i}" aria-label="Perbesar sertifikat ${esc(c.title)}">
      <span class="im">${im ? `<img src="${esc(im)}" alt="Sertifikat ${esc(c.title)}" loading="lazy" decoding="async">` : `<b class="ph">✦</b>`}</span>
      <span class="mt"><span><h4>${esc(c.title)}</h4><small class="m">${esc(c.issuer || "")}</small></span><small class="m">${esc(c.date || "")}</small></span></button>`);
  });
  const speeds = [0.11, -0.09, 0.2];
  $("#cc").dataset.n = String(cols);
  $("#cc").innerHTML = buckets.map((b, k) => `<div class="col" data-s="${certs.length >= 3 ? speeds[k] : 0}">${b.join("")}</div>`).join("");

  $("#ft1").textContent = `© ${new Date().getFullYear()} ${I.name}`;
  $("#ft2").textContent = S.archive;

  /* ---------- tentang ---------- */
  const E = I.education || {};
  const chapters = [
    ["Cerita", `<p class="big sc">${esc(I.bio)}</p><p>${esc(I.about || "")}</p>`],
    ["Pendidikan", `<p class="big sc">${esc(E.school || "")}, ${esc(E.major || "")}.</p><p>${E.year ? "Masuk tahun " + esc(E.year) + ". " : ""}${esc(E.note || "")}</p>`],
    ["Keahlian", (D.skills || []).map(s => `<div class="sk"><span class="m">${esc(s.label)}</span><span>${esc((s.items || []).join(", "))}</span></div>`).join("")],
    ["Jejak", (D.experience || []).map(x => `<div class="xp"><span class="m">${esc(x.year)}</span><div><h5>${esc(x.role)}</h5><span class="m">${esc(x.place)}</span><p>${esc(x.desc)}</p></div></div>`).join("")]
  ];
  $("#abr").innerHTML = `<h1>About <em>Me.</em></h1>` + chapters.map((c, i) =>
    `<article><span class="m">${pad(i + 1)} — ${c[0]}</span>${c[1]}</article>`).join("");

  /* ---------- kontak ---------- */
  $("#rows").innerHTML = (D.contacts || []).filter(c => url(c.url)).map((c, i) =>
    `<li><a href="${esc(url(c.url))}"${c.url.startsWith("mailto:") ? "" : ' target="_blank" rel="noopener"'}><span class="m">${pad(i + 1)}</span><span class="l">${esc(c.label)}</span><span class="h m">${esc(c.handle)}</span><i>↗</i></a></li>`).join("");

  /* ---------- router + tirai transisi ---------- */
  const App = window.App = { page: "home" };
  const names = { home: "Home", tentang: "About", kontak: "Contact" };
  const curt = $("#curt");
  function show(p) {
    App.page = p;
    $$(".page").forEach(s => s.classList.toggle("on", s.id === "p-" + p));
    $$(".top nav a").forEach(a => a.classList.toggle("on", a.dataset.p === p));
    scrollTo(0, 0);
  }
  function go(p) {
    if (p === App.page) return;
    $("#cl").textContent = names[p];
    curt.style.transition = "transform .55s cubic-bezier(.7,0,.2,1)";
    curt.style.transform = "translateY(0)";
    setTimeout(() => {
      show(p);
      try { history.replaceState(null, "", p === "home" ? location.pathname : "#" + p); } catch (e) { /* diabaikan */ }
      curt.style.transform = "translateY(-100%)";
      setTimeout(() => { curt.style.transition = "none"; curt.style.transform = "translateY(100%)"; }, 650);
    }, 600);
  }
  document.addEventListener("click", e => {
    const a = e.target.closest("[data-p]");
    if (!a) return;
    e.preventDefault();
    go(a.dataset.p);
  });
  addEventListener("hashchange", () => { const h = location.hash.slice(1); if (names[h]) go(h); else if (!h) go("home"); });
  { const h = location.hash.slice(1); show(names[h] ? h : "home"); }

  /* ---------- lightbox ---------- */
  const lb = $("#lb");
  function openLb(kind, i) {
    const o = (kind === "cert" ? certs : projects)[i];
    if (!o || !img(o.image)) return;
    $("#lbImg").src = img(o.image);
    $("#lbImg").alt = o.title;
    let h = `<h3>${esc(o.title)}</h3>`;
    if (kind === "cert") {
      h += `<span class="m">${esc(o.issuer || "")}${o.date ? " · " + esc(o.date) : ""}</span>`;
      const d = o.details || {};
      if (Object.keys(d).length) h += `<dl>${Object.entries(d).map(([k, v]) => `<div><dt class="m">${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>`;
      if (url(o.url)) h += `<a class="lkb m" href="${esc(url(o.url))}" target="_blank" rel="noopener">Verifikasi ↗</a>`;
    } else {
      h += `<span class="m">${esc(o.category || "")}${o.year ? " · " + esc(o.year) : ""}</span><p>${esc(o.description || "")}</p>`;
      [[o.demo, "Demo ↗"], [o.github, "GitHub ↗"]].filter(l => url(l[0])).forEach(l => { h += `<a class="lkb m" href="${esc(url(l[0]))}" target="_blank" rel="noopener">${l[1]}</a> `; });
    }
    $("#lbInfo").innerHTML = h;
    if (lb.showModal) lb.showModal(); else lb.setAttribute("open", "");
  }
  document.addEventListener("click", e => {
    const b = e.target.closest("[data-lb]");
    if (b) { const [k, i] = b.dataset.lb.split(":"); openLb(k, Number(i)); }
  });
  $("#lbx").addEventListener("click", () => lb.close());
  lb.addEventListener("click", e => { if (e.target === lb) lb.close(); });
})();