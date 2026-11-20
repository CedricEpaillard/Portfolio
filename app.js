// ============================================================================
// INTERACTIONS DU PORTFOLIO — CÉDRIC EPAILLARD
// ============================================================================

(function () {
  const projects = window.PORTFOLIO_PROJECTS || [];
  const mediaItems = window.PORTFOLIO_MEDIA || [];

  const gridEl = document.getElementById("projectsGrid");
  const studioEl = document.getElementById("studioGrid");
  const modal = document.getElementById("projectModal");
  const modalKicker = document.getElementById("modalKicker");
  const modalTitle = document.getElementById("modalTitle");
  const modalRole = document.getElementById("modalRole");
  const modalBody = document.getElementById("modalBody");
  const modalClose = document.getElementById("modalClose");
  const toastEl = document.getElementById("toast");

  function showToast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add("visible");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => toastEl.classList.remove("visible"), 2200);
  }

  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  // Visuels SVG éditoriaux uniques par projet (hommage à l'univers PAO / architecture)
  function renderProjectSvg(project) {
    switch (project.visualType) {
      case "backrooms":
        return `
          <svg viewBox="0 0 640 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Couverture éditoriale Les Backrooms">
            <rect width="640" height="400" fill="#09090b"/>
            <g stroke="#2a2a33" stroke-width="1" fill="none">
              <rect x="30" y="25" width="580" height="350"/>
              <path d="M30 120 H250 V25 M390 25 V150 H610 M110 120 V375 M250 180 H450 V375 M450 250 H610"/>
              <path d="M180 210 H360 M280 120 V310" stroke-dasharray="4 4"/>
            </g>
            <!-- Emblème aile / hexagone inspiré de la couverture -->
            <g transform="translate(320 190)" fill="none" stroke="#52525b" stroke-width="2">
              <polygon points="-95,-32 -45,-10 -45,22 -95,4" fill="#27272a" stroke="none"/>
              <polygon points="95,-32 45,-10 45,22 95,4" fill="#27272a" stroke="none"/>
              <polygon points="0,-48 42,-24 42,24 0,48 -42,24 -42,-24" stroke="#71717a" stroke-width="3"/>
              <polygon points="0,-28 24,-14 24,14 0,28 -24,14 -24,-14" stroke="#f0b400" stroke-width="2"/>
            </g>
            <text x="320" y="198" text-anchor="middle" fill="#f3efe6" font-family="Cinzel, Georgia, serif" font-size="36" font-weight="700" letter-spacing="5">LES BACKROOMS</text>
            <text x="320" y="226" text-anchor="middle" fill="#f0b400" font-family="JetBrains Mono, monospace" font-size="11" letter-spacing="3">VOUS AVEZ DÉJÀ ÉTÉ ICI AUPARAVANT · 12 PAGES</text>
            <text x="580" y="54" text-anchor="end" fill="#a1a1aa" font-family="JetBrains Mono, monospace" font-size="10">ÉDITION 2024</text>
          </svg>`;
      case "delafosse":
        return `
          <svg viewBox="0 0 600 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Supports campagne presse et social media">
            <rect width="600" height="360" fill="#101218"/>
            <g stroke="#272c38" stroke-width="1">
              <line x1="200" y1="0" x2="200" y2="360"/><line x1="400" y1="0" x2="400" y2="360"/>
              <line x1="0" y1="120" x2="600" y2="120"/><line x1="0" y1="240" x2="600" y2="240"/>
            </g>
            <rect x="65" y="45" width="210" height="270" fill="#181b24" stroke="#3f4656"/>
            <rect x="85" y="68" width="170" height="16" fill="#f0b400"/>
            <rect x="85" y="96" width="120" height="8" fill="#e2e8f0" opacity="0.8"/>
            <rect x="85" y="114" width="170" height="90" fill="#232836"/>
            <rect x="85" y="218" width="170" height="6" fill="#94a3b8" opacity="0.5"/>
            <rect x="85" y="232" width="145" height="6" fill="#94a3b8" opacity="0.5"/>
            <rect x="85" y="246" width="160" height="6" fill="#94a3b8" opacity="0.5"/>
            <rect x="315" y="75" width="210" height="210" fill="#151821" stroke="#f0b400" stroke-width="1.5"/>
            <circle cx="420" cy="160" r="46" fill="none" stroke="#f3efe6" stroke-width="1.5"/>
            <text x="420" y="165" text-anchor="middle" fill="#f3efe6" font-family="Space Grotesk, sans-serif" font-size="14" font-weight="700">PRESSE &amp; IG</text>
            <text x="420" y="255" text-anchor="middle" fill="#f0b400" font-family="JetBrains Mono, monospace" font-size="11">CHARTE · FLUX TENDU</text>
          </svg>`;
      case "opera":
        return `
          <svg viewBox="0 0 600 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Intranet et emailing Opéra Orchestre national Montpellier">
            <rect width="600" height="360" fill="#121010"/>
            <rect x="55" y="45" width="490" height="270" rx="4" fill="#1a1716" stroke="#3c342e"/>
            <rect x="55" y="45" width="490" height="34" fill="#241f1c"/>
            <circle cx="78" cy="62" r="5" fill="#f0b400"/><circle cx="96" cy="62" r="5" fill="#57534e"/><circle cx="114" cy="62" r="5" fill="#57534e"/>
            <rect x="80" y="102" width="145" height="185" fill="#221e1c" stroke="#3f3732"/>
            <rect x="245" y="102" width="275" height="82" fill="#26211d" stroke="#f0b400" stroke-opacity="0.6"/>
            <text x="382" y="142" text-anchor="middle" fill="#f3efe6" font-family="Cinzel, serif" font-size="18" font-weight="700">INTRANET 416</text>
            <text x="382" y="164" text-anchor="middle" fill="#f0b400" font-family="JetBrains Mono, monospace" font-size="10">35 000 CONTACTS · &gt;40% OUVERTURE</text>
            <rect x="245" y="202" width="130" height="85" fill="#221e1c" stroke="#3f3732"/>
            <rect x="390" y="202" width="130" height="85" fill="#221e1c" stroke="#3f3732"/>
            <text x="310" y="248" text-anchor="middle" fill="#d6d3d1" font-family="JetBrains Mono, monospace" font-size="11">10 NEWSLETTERS</text>
            <text x="455" y="248" text-anchor="middle" fill="#d6d3d1" font-family="JetBrains Mono, monospace" font-size="11">PRINT A3 / WEB</text>
          </svg>`;
      case "agent":
        return `
          <svg viewBox="0 0 600 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Architecture Python et IA AgentCedric">
            <rect width="600" height="360" fill="#090d14"/>
            <g stroke="#1e293b" stroke-width="1">
              <circle cx="300" cy="180" r="55" fill="none"/><circle cx="300" cy="180" r="110" fill="none" stroke-dasharray="4 4"/>
              <circle cx="300" cy="180" r="165" fill="none" stroke-dasharray="2 6"/>
            </g>
            <rect x="55" y="65" width="145" height="60" fill="#0f172a" stroke="#38bdf8"/>
            <text x="127" y="99" text-anchor="middle" fill="#e0f2fe" font-family="JetBrains Mono, monospace" font-size="11">RADAR INSEE</text>
            <rect x="400" y="65" width="145" height="60" fill="#0f172a" stroke="#f0b400"/>
            <text x="472" y="99" text-anchor="middle" fill="#fef3c7" font-family="JetBrains Mono, monospace" font-size="11">AUDIT SITE &amp; RS</text>
            <rect x="220" y="150" width="160" height="60" fill="#0f172a" stroke="#f3efe6"/>
            <text x="300" y="184" text-anchor="middle" fill="#f3efe6" font-family="JetBrains Mono, monospace" font-size="12" font-weight="700">GEMINI / GROQ</text>
            <rect x="200" y="255" width="200" height="55" fill="#0f172a" stroke="#38bdf8"/>
            <text x="300" y="287" text-anchor="middle" fill="#38bdf8" font-family="JetBrains Mono, monospace" font-size="11">PLAYWRIGHT PDF A4</text>
            <path d="M200 95 L250 150 M400 95 L350 150 M300 210 V255" stroke="#64748b" stroke-width="1.5"/>
          </svg>`;
      default:
        return `
          <svg viewBox="0 0 600 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="UX, Figma et développement web">
            <rect width="600" height="360" fill="#0e0c14"/>
            <rect x="75" y="55" width="200" height="250" fill="#171422" stroke="#a78bfa"/>
            <rect x="315" y="55" width="210" height="115" fill="#171422" stroke="#f0b400"/>
            <rect x="315" y="190" width="210" height="115" fill="#171422" stroke="#3f3a52"/>
            <text x="175" y="185" text-anchor="middle" fill="#f3efe6" font-family="JetBrains Mono, monospace" font-size="13">FIGMA · UX/UI</text>
            <text x="420" y="117" text-anchor="middle" fill="#f0b400" font-family="JetBrains Mono, monospace" font-size="12">SEO &amp; E-COMMERCE</text>
            <text x="420" y="252" text-anchor="middle" fill="#d4d4d8" font-family="JetBrains Mono, monospace" font-size="12">WEB &amp; CRM</text>
          </svg>`;
    }
  }

  function renderProjects(filter = "all") {
    const list = filter === "all" ? projects : projects.filter((p) => p.category === filter);
    gridEl.innerHTML = list
      .map((p) => {
        const deliverables = p.deliverables || p.metrics || [];
        const deliverablesHtml = deliverables
          .slice(0, 3)
          .map((d) => `<span class="deliverable-pill">${escapeHtml(d)}</span>`)
          .join("");
        const tags = (p.tools || []).slice(0, 4).map((t) => `<span class="tag">${escapeHtml(t)}</span>`).join("");
        const visualMarkup = p.coverImage
          ? `<img class="cover-img" src="${escapeHtml(p.coverImage)}" alt="${escapeHtml(p.title)}" loading="lazy" />`
          : renderProjectSvg(p);
        return `
          <article class="project-card" data-id="${escapeHtml(p.id)}" tabindex="0" role="button" aria-label="Ouvrir le projet ${escapeHtml(p.title)}">
            <div class="project-visual">
              <span class="project-num-badge">N° ${escapeHtml(p.num)}</span>
              ${visualMarkup}
            </div>
            <div class="project-body">
              <div>
                <div class="project-kicker">
                  <span>${escapeHtml(p.categoryLabel)}</span>
                  <span class="year">${escapeHtml(p.year)}</span>
                </div>
                <h3 class="project-title">${escapeHtml(p.title)}</h3>
                <div class="project-role">${escapeHtml(p.role)}</div>
              </div>
              <p class="project-summary">${escapeHtml(p.summary)}</p>
              <div class="card-meta-group">
                <span class="card-meta-label">Livrables</span>
                <div class="deliverables-row">${deliverablesHtml}</div>
              </div>
              <div class="card-meta-group">
                <span class="card-meta-label">Logiciels</span>
                <div class="tag-row">${tags}</div>
              </div>
              <div class="project-footer">
                <span class="open-hint">Ouvrir le dossier →</span>
              </div>
            </div>
          </article>
        `;
      })
      .join("");

    gridEl.querySelectorAll(".project-card").forEach((card) => {
      const open = () => openProjectModal(card.dataset.id);
      card.addEventListener("click", open);
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open();
        }
      });
    });
  }

  function openProjectModal(projectId) {
    const p = projects.find((x) => x.id === projectId);
    if (!p) return;

    modalKicker.innerHTML = `<span>${escapeHtml(p.num)} · ${escapeHtml(p.categoryLabel)}</span><span class="year">${escapeHtml(p.year)}</span>`;
    modalTitle.textContent = p.title;
    modalRole.textContent = p.role;

    const deliverablesList = p.deliverables || p.metrics || [];
    const metricsHtml = deliverablesList
      .map((m) => `<span class="modal-metric-pill">${escapeHtml(m)}</span>`)
      .join("");
    const highlightsHtml = (p.highlights || [])
      .map((h) => `<li>${escapeHtml(h)}</li>`)
      .join("");
    const toolsHtml = (p.tools || [])
      .map((t) => `<span class="tag">${escapeHtml(t)}</span>`)
      .join("");

    let galleryBlock = "";
    if (p.gallery && p.gallery.length) {
      const first = p.gallery[0];
      const thumbs = p.gallery
        .map(
          (g, idx) => `
          <button class="modal-thumb ${idx === 0 ? "active" : ""}" type="button" data-idx="${idx}" title="${escapeHtml(g.caption || "")}">
            <img src="${escapeHtml(g.src)}" alt="${escapeHtml(g.caption || p.title)}" />
          </button>`
        )
        .join("");
      galleryBlock = `
        <div class="modal-gallery">
          <div class="modal-stage">
            <img id="modalStageImg" src="${escapeHtml(first.src)}" alt="${escapeHtml(first.caption || p.title)}" />
          </div>
          <div id="modalStageCaption" class="modal-stage-caption">${escapeHtml(first.caption || "")}</div>
          ${p.gallery.length > 1 ? `<div class="modal-thumbs">${thumbs}</div>` : ""}
        </div>
      `;
    }

    let extraBlock = "";
    if (p.calameoCode) {
      extraBlock = `
        <div>
          <div style="display:flex; gap:0.75rem; flex-wrap:wrap; margin-bottom:0.9rem;">
            <button id="toggleCalameoEmbed" class="btn btn-primary" type="button">Afficher le lecteur Calaméo ici</button>
            <a href="${escapeHtml(p.externalUrl)}" target="_blank" rel="noopener" class="btn">${escapeHtml(p.externalLabel)} ↗</a>
          </div>
          <div id="calameoEmbedSlot"></div>
        </div>
      `;
    } else if (p.links && p.links.length) {
      const linksHtml = p.links
        .map((l) => `<a href="${escapeHtml(l.url)}" target="_blank" rel="noopener" class="btn ${l.primary ? "btn-primary" : ""}">${escapeHtml(l.label)} ↗</a>`)
        .join("");
      extraBlock = `<div style="display:flex; gap:0.75rem; flex-wrap:wrap;">${linksHtml}</div>`;
    } else if (p.externalUrl) {
      extraBlock = `<a href="${escapeHtml(p.externalUrl)}" target="_blank" rel="noopener" class="btn btn-primary">${escapeHtml(p.externalLabel || "Voir")} ↗</a>`;
    }

    modalBody.innerHTML = `
      ${galleryBlock}
      <div class="modal-metrics">${metricsHtml}</div>
      <p>${escapeHtml(p.summary)}</p>
      <div>
        <h4 style="font-family:var(--font-mono); font-size:0.78rem; text-transform:uppercase; letter-spacing:0.08em; color:var(--accent); margin-bottom:0.6rem;">Réalisations clés</h4>
        <ul class="modal-highlights">${highlightsHtml}</ul>
      </div>
      <div>
        <h4 style="font-family:var(--font-mono); font-size:0.78rem; text-transform:uppercase; letter-spacing:0.08em; color:var(--accent); margin-bottom:0.6rem;">Outils &amp; Compétences</h4>
        <div class="tag-row">${toolsHtml}</div>
      </div>
      ${extraBlock}
    `;

    modalBody.querySelectorAll(".modal-thumb").forEach((btn) => {
      btn.addEventListener("click", () => {
        const g = p.gallery[Number(btn.dataset.idx)];
        if (!g) return;
        document.getElementById("modalStageImg").src = g.src;
        document.getElementById("modalStageImg").alt = g.caption || p.title;
        document.getElementById("modalStageCaption").textContent = g.caption || "";
        modalBody.querySelectorAll(".modal-thumb").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
      });
    });

    const embedBtn = document.getElementById("toggleCalameoEmbed");
    if (embedBtn) {
      embedBtn.addEventListener("click", () => {
        const slot = document.getElementById("calameoEmbedSlot");
        slot.innerHTML = `
          <div class="calameo-embed-wrap">
            <iframe src="https://v.calameo.com/?bkcode=${encodeURIComponent(p.calameoCode)}" allowfullscreen loading="lazy" title="Lecteur Calaméo Les Backrooms"></iframe>
          </div>`;
        embedBtn.remove();
      });
    }

    modal.showModal();
    modal.scrollTop = 0;
    modalClose.focus({ preventScroll: true });
    requestAnimationFrame(() => {
      modal.scrollTop = 0;
    });
  }

  function openMediaModal(item) {
    if (!item) return;
    modalKicker.innerHTML = `<span>${item.type === "video" ? "ATELIER · VIDÉO" : "ATELIER · VISUEL"}</span><span class="year">ÉDITION</span>`;
    modalTitle.textContent = item.title;
    modalRole.textContent = item.caption || "";

    if (item.type === "video") {
      const posterAttr = item.poster ? `poster="${escapeHtml(item.poster)}"` : "";
      modalBody.innerHTML = `
        <div class="modal-video-stage">
          <video controls autoplay playsinline ${posterAttr} src="${escapeHtml(item.src)}"></video>
        </div>
      `;
    } else {
      modalBody.innerHTML = `
        <div class="modal-stage" style="max-height:72vh;">
          <img src="${escapeHtml(item.src)}" alt="${escapeHtml(item.title)}" style="max-height:70vh;" />
        </div>
      `;
    }

    modal.showModal();
    modal.scrollTop = 0;
    modalClose.focus({ preventScroll: true });
    requestAnimationFrame(() => {
      modal.scrollTop = 0;
    });
  }

  function renderStudio() {
    const cards = mediaItems
      .map((item) => {
        let visual = "";
        let isInteractive = false;
        if (item.type === "calameo") {
          visual = `
            <div class="calameo-poster">
              <div style="display:flex; justify-content:space-between; font-family:var(--font-mono); font-size:0.7rem; color:#a1a1aa;">
                <span>CALAMÉO · 12 PAGES</span>
                <span>ÉDITION 2024</span>
              </div>
              <div>
                <h4>LES BACKROOMS</h4>
                <p>VOUS AVEZ DÉJÀ ÉTÉ ICI AUPARAVANT.</p>
              </div>
              <div style="display:flex; justify-content:center; gap:0.65rem;">
                <button class="btn btn-primary load-calameo-inline" data-code="${escapeHtml(item.calameoCode)}" type="button">Lire ici</button>
                <a class="btn" style="color:#f3efe6; border-color:rgba(243,239,230,0.35);" href="${escapeHtml(item.url)}" target="_blank" rel="noopener">Calaméo ↗</a>
              </div>
            </div>`;
        } else if (item.type === "image") {
          isInteractive = true;
          visual = `<img src="${escapeHtml(item.src)}" alt="${escapeHtml(item.title)}" loading="lazy" />`;
        } else if (item.type === "video") {
          isInteractive = true;
          const posterSrc = item.poster || "";
          visual = `
            <img src="${escapeHtml(posterSrc)}" alt="${escapeHtml(item.title)}" loading="lazy" />
            <div class="video-play-overlay">
              <span class="video-play-badge">▶ Lire la vidéo</span>
            </div>`;
        } else if (item.type === "youtube") {
          visual = `<iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(item.youtubeId)}" allowfullscreen loading="lazy" title="${escapeHtml(item.title)}"></iframe>`;
        }

        const interactiveAttrs = isInteractive
          ? `data-media-id="${escapeHtml(item.id)}" tabindex="0" role="button" aria-label="Ouvrir ${escapeHtml(item.title)}"`
          : "";

        return `
          <article class="media-card ${isInteractive ? "is-interactive" : ""} reveal in-view" ${interactiveAttrs}>
            <div class="media-frame">${visual}</div>
            <div>
              <h3 style="font-size:1.05rem; font-weight:700;">${escapeHtml(item.title)}</h3>
              <p style="font-size:0.88rem; color:var(--ink-muted); margin-top:0.25rem;">${escapeHtml(item.caption)}</p>
            </div>
          </article>`;
      })
      .join("");

    const customTestCard = `
      <article class="media-card atelier-cta-card reveal in-view">
        <span class="eyebrow" style="margin-bottom:0.4rem;">Sur mesure · Visuel &amp; Vidéo</span>
        <h3>Une proposition créative sur votre sujet ?</h3>
        <div style="display:flex; gap:0.75rem; flex-wrap:wrap; margin-top:0.6rem;">
          <a href="#contact" class="btn btn-primary">Demander un test créatif</a>
          <a href="https://www.calameo.com/read/00761721382a6f4dbdc6d" target="_blank" rel="noopener" class="btn">Feuilleter « Les Backrooms » (12 pages) ↗</a>
        </div>
      </article>`;

    studioEl.innerHTML = cards + customTestCard;

    studioEl.querySelectorAll(".media-card.is-interactive").forEach((card) => {
      const item = mediaItems.find((m) => m.id === card.dataset.mediaId);
      const open = () => openMediaModal(item);
      card.addEventListener("click", open);
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open();
        }
      });
    });

    studioEl.querySelectorAll(".load-calameo-inline").forEach((btn) => {
      btn.addEventListener("click", () => {
        const frame = btn.closest(".media-frame");
        const code = btn.dataset.code;
        frame.innerHTML = `<iframe src="https://v.calameo.com/?bkcode=${encodeURIComponent(code)}" allowfullscreen title="Lecteur Calaméo"></iframe>`;
      });
    });
  }

  // Filtres projets
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderProjects(btn.dataset.filter);
    });
  });

  // Fermeture modale (uniquement sur clic réel sur le backdrop, jamais depuis un enfant ou clic clavier)
  modalClose.addEventListener("click", () => modal.close());
  modal.addEventListener("close", () => {
    modalBody.querySelectorAll("video").forEach((v) => {
      v.pause();
      v.removeAttribute("src");
    });
  });
  modal.addEventListener("click", (e) => {
    if (e.target !== modal) return;
    if (e.clientX === 0 && e.clientY === 0) return;
    const rect = modal.getBoundingClientRect();
    const inside =
      rect.top <= e.clientY && e.clientY <= rect.bottom &&
      rect.left <= e.clientX && e.clientX <= rect.right;
    if (!inside) modal.close();
  });

  // Bascule thème Studio Sombre <-> Papier
  const themeBtn = document.getElementById("themeToggle");
  if (localStorage.getItem("ce_theme") === "paper") {
    document.body.classList.add("theme-paper");
  }
  themeBtn.addEventListener("click", () => {
    const isPaper = document.body.classList.toggle("theme-paper");
    localStorage.setItem("ce_theme", isPaper ? "paper" : "studio");
    showToast(isPaper ? "Mode Papier activé" : "Mode Studio Sombre activé");
  });

  // Copie presse-papier
  document.querySelectorAll("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const val = btn.getAttribute("data-copy");
      try {
        await navigator.clipboard.writeText(val);
        showToast(`Copié : ${val}`);
      } catch {
        showToast(val);
      }
    });
  });

  // Parallaxe léger sur le plan architectural
  const blueprintSvg = document.getElementById("blueprintSvg");
  if (blueprintSvg && window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
    window.addEventListener("mousemove", (e) => {
      const dx = (e.clientX / window.innerWidth - 0.5) * 16;
      const dy = (e.clientY / window.innerHeight - 0.5) * 16;
      blueprintSvg.style.transform = `translate(${dx}px, ${dy}px)`;
    });
  }

  // Apparition progressive au scroll (avec garde-fou si scroll rapide)
  const revealEls = Array.from(document.querySelectorAll(".reveal"));
  const revealVisible = () => {
    revealEls.forEach((el) => {
      if (el.classList.contains("in-view")) return;
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight + 120) {
        el.classList.add("in-view");
      }
    });
  };
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.02, rootMargin: "80px 0px" }
  );
  revealEls.forEach((el) => io.observe(el));
  window.addEventListener("scroll", revealVisible, { passive: true });
  window.addEventListener("hashchange", () => setTimeout(revealVisible, 250));
  revealVisible();

  renderProjects("all");
  renderStudio();
})();
