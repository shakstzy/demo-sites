const projects = [
  { slug: "lead-intake-os", title: "Lead Intake OS", type: "Automation", specs: "Forms, routing, CRM, alerts", media: "hero-loop-01.webm", desc: "A clean intake layer that captures every inquiry, enriches it, routes it, and starts the right follow-up without a human chasing tabs." },
  { slug: "crm-autopilot", title: "CRM Autopilot", type: "Revenue Ops", specs: "Pipeline hygiene, notes, tasks", media: "cube-loop-01.webm", desc: "A CRM that updates itself from calls, inboxes, forms, and operator decisions, keeping the team focused on selling instead of admin." },
  { slug: "ai-audit-funnels", title: "AI Audit Funnels", type: "Growth System", specs: "Scoring, reports, conversion", media: "systems-strip-loop-01.webm", desc: "A diagnostic funnel that turns prospects into structured audits, practical findings, and clear next steps." },
  { slug: "staff-copilots", title: "Staff Copilots", type: "Internal AI", specs: "SOPs, retrieval, actions", media: "archive-loop-01.webm", desc: "Role-specific copilots that answer from the company’s actual knowledge and help staff complete repeated work." },
  { slug: "revenue-ops-dashboard", title: "Revenue Ops Dashboard", type: "Control Plane", specs: "Metrics, exceptions, actions", media: "work-01.png", desc: "A leadership view that shows what needs attention now, not another passive analytics wall." },
  { slug: "client-follow-up-engine", title: "Client Follow-Up Engine", type: "Lifecycle", specs: "Sequencing, reminders, recovery", media: "archive-loop-02.webm", desc: "Follow-up that keeps moving after the first conversation, with tone, context, and timing built into the system." },
  { slug: "proposal-factory", title: "Proposal Factory", type: "Sales Enablement", specs: "Pricing, scope, docs", media: "work-02.png", desc: "A guided proposal flow that turns discovery notes into scoped offers, polished docs, and next-step messages." },
  { slug: "scheduling-relay", title: "Scheduling Relay", type: "Operations", specs: "Calendar, SMS, handoff", media: "archive-loop-03.webm", desc: "A scheduling system that handles the small coordination loops that drain operators every week." },
  { slug: "onboarding-command-center", title: "Onboarding Command Center", type: "Client Ops", specs: "Checklists, files, status", media: "work-03.png", desc: "A shared operating room for new clients, built so every document, task, and owner stays visible." },
  { slug: "knowledge-base-sync", title: "Knowledge Base Sync", type: "Internal Systems", specs: "Docs, memory, QA", media: "archive-loop-04.webm", desc: "A living knowledge system that keeps AI answers grounded in current process instead of stale docs." },
  { slug: "forecasting-desk", title: "Forecasting Desk", type: "Planning", specs: "Signals, projections, review", media: "work-04.png", desc: "A forecasting workflow that combines pipeline, capacity, and delivery signals into an operator-ready view." },
  { slug: "inbox-triage-system", title: "Inbox Triage System", type: "Comms", specs: "Classification, drafts, routing", media: "archive-loop-05.webm", desc: "Inbox automation that separates urgent, waiting, FYI, and action-required messages before the day gets noisy." },
  { slug: "fulfillment-tracker", title: "Fulfillment Tracker", type: "Delivery Ops", specs: "Milestones, blockers, alerts", media: "work-05.png", desc: "A delivery tracker designed around exceptions, so the team sees blockers before clients do." },
  { slug: "referral-loop", title: "Referral Loop", type: "Growth", specs: "Triggers, outreach, tracking", media: "archive-loop-06.webm", desc: "A referral engine that notices the right moments, drafts the ask, and tracks the relationship loop." },
  { slug: "analytics-war-room", title: "Analytics War Room", type: "Decision System", specs: "Dashboards, anomalies, briefs", media: "work-06.png", desc: "A compact decision system for leaders who need action summaries more than raw charts." },
  { slug: "internal-toolchain", title: "Internal Toolchain", type: "Tools", specs: "Apps, automations, permissions", media: "archive-loop-07.webm", desc: "Lightweight internal tools that sit on top of the software a company already uses." },
  { slug: "ops-recovery-sprint", title: "Ops Recovery Sprint", type: "Repair", specs: "Mapping, cleanup, launch", media: "archive-loop-08.webm", desc: "A focused sprint for teams whose process has outgrown spreadsheets and manual reminders." },
  { slug: "founder-control-plane", title: "Founder Control Plane", type: "Executive System", specs: "Briefs, tasks, signals", media: "archive-loop-09.webm", desc: "A private command center for founders to review the business, assign action, and keep momentum visible." }
];

const assetBase = document.body.dataset.assetBase || "assets/outerscope/";

function asset(path) {
  return `${assetBase}${path}`;
}

function mediaElement(project, label = "") {
  const src = asset(project.media);
  if (/\.(mp4|webm)$/i.test(project.media)) {
    return `<video src="${src}" muted autoplay loop playsinline preload="auto" aria-label="${project.title} ${label}"></video>`;
  }
  return `<img src="${src}" alt="${project.title} ${label}" loading="lazy">`;
}

function renderHomeFeed() {
  const feed = document.querySelector("[data-project-feed]");
  if (!feed) return;
  feed.innerHTML = projects.map((project, index) => {
    const variant = index % 5 === 2 ? "wide" : index % 2 === 0 ? "left" : "right";
    return `
      <article class="project-block ${variant} reveal">
        <a class="project-media" href="projects/${project.slug}/">
          ${mediaElement(project, "preview")}
          <span class="project-caption"><span>${project.title}</span><span>/</span><span>${project.type}</span></span>
        </a>
        <div class="project-copy">
          <p>${project.desc}</p>
          <a href="projects/${project.slug}/">Open system</a>
        </div>
      </article>
    `;
  }).join("");
}

function projectRows(base = "projects/") {
  return projects.map((project, index) => `
    <a class="project-row" href="${base}${project.slug}/">
      <span>${String(index + 1).padStart(2, "0")}</span>
      <strong>${project.title}</strong>
      <span>${project.type}</span>
    </a>
  `).join("");
}

function renderLists() {
  const list = document.querySelector("[data-project-list]");
  if (list) list.innerHTML = projectRows("");
  const popin = document.querySelector("[data-popin-list]");
  if (popin) popin.innerHTML = projectRows("projects/");
}

function renderCase() {
  const mount = document.querySelector("[data-case]");
  if (!mount) return;
  const slug = location.pathname.split("/").filter(Boolean).at(-1);
  const project = projects.find((item) => item.slug === slug) || projects[0];
  document.title = `${project.title} | Outer Scope`;
  mount.innerHTML = `
    <section class="case-title reveal">
      <div>
        <p class="eyebrow">${project.type}</p>
        <h1>${project.title}</h1>
      </div>
      <div class="case-meta">
        <span>${project.specs}</span>
        <span>Outer Scope system study</span>
      </div>
    </section>
    <section class="case-visual reveal">${mediaElement(project, "case study")}</section>
    <section class="case-copy reveal">
      <p class="eyebrow">System</p>
      <div>
        <p>${project.desc}</p>
        <p>The build pattern follows the same operating loop: intake the signal, structure the context, take the next action, then surface exceptions to the team.</p>
      </div>
    </section>
  `;
}

function setupPopin() {
  const popin = document.querySelector("[data-project-popin]");
  const openers = document.querySelectorAll("[data-open-projects]");
  const closers = document.querySelectorAll("[data-close-projects]");
  if (!popin) return;
  openers.forEach((button) => button.addEventListener("click", () => {
    popin.hidden = false;
    document.body.style.overflow = "hidden";
  }));
  closers.forEach((button) => button.addEventListener("click", () => {
    popin.hidden = true;
    document.body.style.overflow = "";
  }));
  popin.addEventListener("click", (event) => {
    if (event.target === popin) {
      popin.hidden = true;
      document.body.style.overflow = "";
    }
  });
}

function setupReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("is-visible");
    });
  }, { threshold: 0.16 });
  items.forEach((item) => observer.observe(item));
}

function setupVideoPlayback() {
  document.querySelectorAll("video").forEach((video) => {
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = "auto";
    const play = () => video.play().catch(() => {});
    video.addEventListener("loadeddata", play, { once: true });
    video.addEventListener("canplay", play, { once: true });
    video.load();
    play();
  });
}

function setupPreloader() {
  const preloader = document.querySelector(".preloader");
  if (!preloader) return;
  window.setTimeout(() => preloader.classList.add("is-hidden"), 950);
}

function setupReliefCanvas() {
  const canvas = document.getElementById("reliefCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const state = { w: 0, h: 0, dpr: 1, x: 0.5, y: 0.5, scroll: 0 };
  const objects = [
    { x: 0.11, y: 0.49, w: 0.16, h: 0.10, r: -18, t: "intake" },
    { x: 0.36, y: 0.28, w: 0.24, h: 0.11, r: 8, t: "crm" },
    { x: 0.68, y: 0.36, w: 0.22, h: 0.12, r: -11, t: "audit" },
    { x: 0.82, y: 0.62, w: 0.19, h: 0.10, r: 16, t: "copilot" },
    { x: 0.24, y: 0.72, w: 0.19, h: 0.09, r: 12, t: "ops" },
    { x: 0.55, y: 0.78, w: 0.18, h: 0.08, r: -9, t: "signals" }
  ];

  function resize() {
    state.dpr = Math.min(window.devicePixelRatio || 1, 2);
    state.w = canvas.clientWidth;
    state.h = canvas.clientHeight;
    canvas.width = Math.floor(state.w * state.dpr);
    canvas.height = Math.floor(state.h * state.dpr);
    ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
    draw();
  }

  function roundedRect(x, y, w, h, r) {
    const radius = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + w, y, x + w, y + h, radius);
    ctx.arcTo(x + w, y + h, x, y + h, radius);
    ctx.arcTo(x, y + h, x, y, radius);
    ctx.arcTo(x, y, x + w, y, radius);
    ctx.closePath();
  }

  function reliefPanel(item, index) {
    const drift = Math.sin(state.scroll * 3 + index) * 18;
    const px = item.x * state.w + (state.x - 0.5) * 18;
    const py = item.y * state.h + drift + (state.y - 0.5) * 14;
    const w = item.w * state.w;
    const h = item.h * state.h;
    ctx.save();
    ctx.translate(px, py);
    ctx.rotate(item.r * Math.PI / 180);
    ctx.shadowColor = "rgba(105,105,99,0.34)";
    ctx.shadowBlur = 28;
    ctx.shadowOffsetX = 18;
    ctx.shadowOffsetY = 24;
    roundedRect(-w / 2, -h / 2, w, h, 18);
    ctx.fillStyle = "#ecebe7";
    ctx.fill();
    ctx.shadowColor = "rgba(255,255,255,0.88)";
    ctx.shadowBlur = 20;
    ctx.shadowOffsetX = -13;
    ctx.shadowOffsetY = -16;
    roundedRect(-w / 2 + 7, -h / 2 + 7, w - 14, h - 14, 14);
    ctx.strokeStyle = "rgba(255,255,255,0.55)";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.shadowColor = "transparent";
    ctx.strokeStyle = "rgba(95,95,88,0.18)";
    ctx.lineWidth = 1;
    const rows = Math.max(3, Math.floor(h / 22));
    for (let i = 0; i < rows; i++) {
      const yy = -h * 0.24 + i * (h * 0.48 / Math.max(1, rows - 1));
      ctx.beginPath();
      ctx.moveTo(-w * 0.32, yy);
      ctx.lineTo(w * (0.12 + 0.08 * Math.sin(index + i)), yy);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(w * 0.25, yy, 3.2, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(8,8,7,0.16)";
      ctx.fill();
    }
    ctx.font = "10px Helvetica, Arial, sans-serif";
    ctx.fillStyle = "rgba(8,8,7,0.34)";
    ctx.fillText(item.t.toUpperCase(), -w * 0.34, h * 0.31);
    ctx.restore();
  }

  function drawTexture() {
    ctx.save();
    ctx.globalAlpha = 0.16;
    ctx.strokeStyle = "rgba(80,80,75,0.22)";
    for (let i = 0; i < 22; i++) {
      const sx = (i * 137 + state.scroll * 90) % state.w;
      const sy = (i * 79) % state.h;
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      ctx.bezierCurveTo(sx + 65, sy - 42, sx + 130, sy + 44, sx + 210, sy - 8);
      ctx.stroke();
    }
    ctx.restore();
  }

  function draw() {
    ctx.clearRect(0, 0, state.w, state.h);
    const grad = ctx.createRadialGradient(state.w * 0.45, state.h * 0.38, 40, state.w * 0.5, state.h * 0.5, Math.max(state.w, state.h) * 0.8);
    grad.addColorStop(0, "#f3f2ee");
    grad.addColorStop(0.62, "#e1e0dc");
    grad.addColorStop(1, "#d4d3ce");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, state.w, state.h);
    drawTexture();
    objects.forEach(reliefPanel);
  }

  window.addEventListener("resize", resize);
  window.addEventListener("scroll", () => {
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    state.scroll = window.scrollY / max;
    requestAnimationFrame(draw);
  }, { passive: true });
  window.addEventListener("pointermove", (event) => {
    state.x = event.clientX / window.innerWidth;
    state.y = event.clientY / window.innerHeight;
    requestAnimationFrame(draw);
  }, { passive: true });
  resize();
}

renderHomeFeed();
renderLists();
renderCase();
setupPopin();
setupReveal();
setupVideoPlayback();
setupReliefCanvas();
setupPreloader();

window.addEventListener("load", setupVideoPlayback);
window.setTimeout(setupVideoPlayback, 1600);
window.setTimeout(setupVideoPlayback, 3600);
