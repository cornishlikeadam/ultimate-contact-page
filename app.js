/**
 * ==========================================================================
 * THE ULTIMATE CONTACT LINK LANDING PAGE - APPLICATION LOGIC
 * Features: vCard Generation, Dynamic QR Code, Sound Synthesis,
 * Confetti Engine, Live Savannah Clock, In-Page Customizer, & State Persistence
 * Includes: 3Blue1Brown & ASD-STE100 Integration
 * ==========================================================================
 */

const STATE_VERSION = "2.0.0";

// Default Configuration State (Pre-populated for Kendren J. Cornish)
const DEFAULT_STATE = {
  version: STATE_VERSION,
  profile: {
    name: "Kendren J. Cornish",
    title: "Applied AI Designer & Technologist",
    badges: ["SCAD B.Des", "Google Ambassador", "U.S. Army Vet", "3Blue1Brown / Manim", "ASD-STE100"],
    bio: "Applied AI designer bridging human creativity with Gemini, LLMs, and spatial technology. Building intelligent tools for animators, designers, and filmmakers at SCAD with mathematical visual storytelling and ASD-STE100 technical precision.",
    location: "Savannah, GA",
    timezone: "America/New_York",
    email: "Kendren@proton.me",
    phone: "(817) 703-2310",
    website: "https://kendren.us",
    avatarUrl: "", // Blank uses gradient initials "KC"
    initials: "KC",
    statusText: "Open to AI projects & collaborations"
  },
  theme: "obsidian-dark",
  soundEnabled: true,
  links: [
    {
      id: "link-1",
      title: "Interactive Portfolio & Case Studies",
      subtitle: "Applied AI workflows, user experiences, and visual systems",
      url: "https://kendren.us",
      category: "projects",
      badge: "Flagship",
      icon: "globe"
    },
    {
      id: "link-3b1b",
      title: "3Blue1Brown & Manim Mathematics",
      subtitle: "Grant Sanderson's math visualization engine, neural network animations, and creative educational computing",
      url: "https://www.3blue1brown.com",
      category: "projects",
      badge: "Visual Math",
      icon: "sparkles"
    },
    {
      id: "link-ste100",
      title: "ASD-STE100 Simplified Technical English",
      subtitle: "Controlled aerospace and defense documentation standard for unambiguous, AI-ready technical communication",
      url: "https://asd-ste100.org",
      category: "projects",
      badge: "Aero Spec",
      icon: "book"
    },
    {
      id: "link-2",
      title: "Google Student Ambassador Campus Hub",
      subtitle: "Empowering artists and animators at SCAD with Gemini & Google Cloud",
      url: "https://kendren.us",
      category: "projects",
      badge: "Featured",
      icon: "sparkles"
    },
    {
      id: "link-3",
      title: "GitHub: 34+ AI Repositories & Tools",
      subtitle: "Autonomous engines, resume tooling, and generative prototypes",
      url: "https://github.com/cornishlikeadam",
      category: "projects",
      badge: "Open Source",
      icon: "github"
    },
    {
      id: "link-4",
      title: "Schedule a 1-on-1 Strategy / Coffee Chat",
      subtitle: "Book a 15-minute or 30-minute sync via Calendly",
      url: "https://calendly.com",
      category: "connect",
      badge: "Instant Sync",
      icon: "calendar"
    },
    {
      id: "link-5",
      title: "LinkedIn: Connect & Professional Journey",
      subtitle: "Military engineering, charity leadership, and applied AI at SCAD",
      url: "https://linkedin.com/in/kendren-cornish",
      category: "profiles",
      badge: "Network",
      icon: "linkedin"
    },
    {
      id: "link-6",
      title: "Direct Encrypted Email (ProtonMail)",
      subtitle: "Kendren@proton.me · High priority for speaking & collaborations",
      url: "mailto:Kendren@proton.me",
      category: "connect",
      badge: "Direct",
      icon: "mail"
    },
    {
      id: "link-7",
      title: "Direct Mobile / SMS Channel",
      subtitle: "(817) 703-2310 · Direct line for urgent project discussions",
      url: "tel:8177032310",
      category: "connect",
      badge: "Call/SMS",
      icon: "phone"
    }
  ]
};

// Application State
let appState = loadState();
let activeCategory = "all";
let searchQuery = "";
let activeView = "bento"; // 'bento' | 'links' | 'vcard'

// --- Storage & Initialization ---
function loadState() {
  try {
    const saved = localStorage.getItem("ultimate_contact_state");
    if (saved) {
      const parsed = JSON.parse(saved);
      // Auto-migrate if version differs or missing 3Blue1Brown/ASD-STE100
      if (parsed.version === STATE_VERSION) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn("Could not read localStorage", e);
  }
  return JSON.parse(JSON.stringify(DEFAULT_STATE));
}

function saveState() {
  try {
    localStorage.setItem("ultimate_contact_state", JSON.stringify(appState));
  } catch (e) {
    console.warn("Could not save to localStorage", e);
  }
}

// --- Synthesized Sound Effects (Zero External Files) ---
class SoundManager {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
  }

  playPop() {
    if (!appState.soundEnabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(520, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch (e) {}
  }

  playSuccess() {
    if (!appState.soundEnabled) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      [440, 554.37, 659.25, 880].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + idx * 0.05);
        gain.gain.setValueAtTime(0.08, now + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.15);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.05);
        osc.stop(now + idx * 0.05 + 0.16);
      });
    } catch (e) {}
  }
}

const sounds = new SoundManager();

// --- Confetti Particle Engine (Zero Dependencies) ---
function fireConfetti() {
  const canvas = document.getElementById("confetti-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ["#6366f1", "#8b5cf6", "#ec4899", "#3b82f6", "#10b981", "#f59e0b"];
  const particles = [];
  const particleCount = 75;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height * 0.45,
      w: Math.random() * 8 + 4,
      h: Math.random() * 6 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 16,
      vy: (Math.random() - 0.7) * 16,
      tilt: Math.random() * 10,
      tiltAngle: Math.random() * Math.PI,
      tiltSpeed: Math.random() * 0.1 + 0.05,
      alpha: 1
    });
  }

  let animationFrame;
  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = 0;

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.45; // Gravity
      p.vx *= 0.98; // Drag
      p.tiltAngle += p.tiltSpeed;
      p.tilt = Math.sin(p.tiltAngle) * 12;
      p.alpha -= 0.012;

      if (p.alpha > 0) {
        alive++;
        ctx.save();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.tiltAngle);
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }
    });

    if (alive > 0) {
      animationFrame = requestAnimationFrame(render);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cancelAnimationFrame(animationFrame);
    }
  }

  render();
}

// --- Toast Manager ---
function showToast(message, icon = "✓") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<span style="color: var(--success); font-size: 1.1rem;">${icon}</span> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("toast-exit");
    setTimeout(() => toast.remove(), 250);
  }, 2800);
}

// --- Icons Helper (Pure Crisp SVG) ---
function getSvgIcon(name, size = 18) {
  const icons = {
    globe: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>`,
    sparkles: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/></svg>`,
    book: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 6h10"/><path d="M6 10h10"/></svg>`,
    github: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>`,
    linkedin: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>`,
    calendar: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>`,
    mail: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
    phone: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
    copy: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`,
    download: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>`,
    qr: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="5" height="5" x="3" y="3" rx="1"/><rect width="5" height="5" x="16" y="3" rx="1"/><rect width="5" height="5" x="3" y="16" rx="1"/><path d="M21 16h-3a2 2 0 0 0-2 2v3"/><path d="M21 21v.01"/><path d="M12 7v3a2 2 0 0 1-2 2H7"/><path d="M3 12h.01"/><path d="M12 3h.01"/><path d="M12 16v.01"/><path d="M16 12h1"/><path d="M21 12v.01"/><path d="M12 21v-1"/></svg>`,
    message: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>`,
    arrowUpRight: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>`,
    settings: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
    share: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></svg>`
  };
  return icons[name] || icons.globe;
}

// --- Live Savannah GA Clock ---
function startLiveClock() {
  const clockElem = document.getElementById("live-clock");
  if (!clockElem) return;

  function update() {
    try {
      const options = {
        timeZone: appState.profile.timezone || "America/New_York",
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
      };
      const formatter = new Intl.DateTimeFormat("en-US", options);
      const timeStr = formatter.format(new Date());
      clockElem.textContent = `${timeStr} EST · ${appState.profile.location}`;
    } catch (e) {
      clockElem.textContent = appState.profile.location;
    }
  }

  update();
  setInterval(update, 1000);
}

// --- Render Profile Details ---
function renderProfile() {
  const p = appState.profile;

  // Header Title & Meta
  document.title = `${p.name} | Ultimate Contact Link Hub`;
  const nameEl = document.getElementById("profile-name");
  if (nameEl) nameEl.childNodes[0].nodeValue = p.name + " ";

  const titleEl = document.getElementById("profile-title");
  if (titleEl) titleEl.textContent = p.title;

  const bioEl = document.getElementById("profile-bio");
  if (bioEl) bioEl.textContent = p.bio;

  const statusEl = document.getElementById("profile-status-text");
  if (statusEl) statusEl.textContent = p.statusText;

  // Badges
  const badgesEl = document.getElementById("profile-badges");
  if (badgesEl) {
    badgesEl.innerHTML = p.badges
      .map(b => `<span class="chip">${b}</span>`)
      .join("");
  }

  // Avatar
  const avatarFrame = document.getElementById("avatar-container");
  if (avatarFrame) {
    if (p.avatarUrl && p.avatarUrl.trim() !== "") {
      avatarFrame.innerHTML = `<img src="${p.avatarUrl}" class="avatar-img" alt="${p.name}">`;
    } else {
      avatarFrame.innerHTML = `<div class="avatar-fallback">${p.initials || "KC"}</div>`;
    }
  }

  // Update vCard wallet preview if visible
  renderWalletCard();
}

// --- Render Views: Bento vs Links vs vCard ---
function renderContent() {
  const bentoContainer = document.getElementById("bento-view");
  const linksContainer = document.getElementById("links-view");
  const vcardContainer = document.getElementById("vcard-view");

  if (!bentoContainer || !linksContainer || !vcardContainer) return;

  // Hide all first
  bentoContainer.style.display = "none";
  linksContainer.style.display = "none";
  vcardContainer.style.display = "none";

  // Filter links by category and search
  const filtered = appState.links.filter(item => {
    const matchesCat = activeCategory === "all" || item.category === activeCategory;
    const matchesQuery = !searchQuery ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  if (activeView === "bento") {
    bentoContainer.style.display = "grid";
    renderBentoGrid(filtered);
  } else if (activeView === "links") {
    linksContainer.style.display = "flex";
    renderLinksList(filtered);
  } else if (activeView === "vcard") {
    vcardContainer.style.display = "flex";
    renderWalletCard();
  }
}

function renderBentoGrid(items) {
  const bento = document.getElementById("bento-view");
  if (!bento) return;

  if (items.length === 0) {
    bento.innerHTML = `<div class="col-span-12" style="text-align: center; padding: 3rem; color: var(--text-muted);">No links match "${searchQuery}".</div>`;
    return;
  }

  // Define Bento grid column layouts dynamically
  const layoutColSpans = [
    "col-span-8",  // Large card
    "col-span-4",  // Small card
    "col-span-6",  // Half card (3Blue1Brown)
    "col-span-6",  // Half card (ASD-STE100)
    "col-span-4",  // Small card
    "col-span-8",  // Medium card
    "col-span-6",  // Half card
    "col-span-6",  // Half card
    "col-span-12"  // Full width
  ];

  bento.innerHTML = items.map((item, idx) => {
    const spanClass = layoutColSpans[idx % layoutColSpans.length];
    return `
      <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="bento-card ${spanClass}" onclick="sounds.playPop()">
        <div>
          <div class="bento-header">
            <div class="bento-icon-wrapper">
              ${getSvgIcon(item.icon, 22)}
            </div>
            <span class="bento-arrow">${getSvgIcon("arrowUpRight", 20)}</span>
          </div>
          <h3 class="bento-title">${item.title}</h3>
          <p class="bento-desc">${item.subtitle}</p>
        </div>
        <div class="bento-footer">
          <span class="tag-pill">${item.category.toUpperCase()}</span>
          ${item.badge ? `<span class="tag-pill" style="color: var(--accent-primary); border-color: var(--border-hover);">${item.badge}</span>` : ""}
        </div>
      </a>
    `;
  }).join("");
}

function renderLinksList(items) {
  const list = document.getElementById("links-view");
  if (!list) return;

  if (items.length === 0) {
    list.innerHTML = `<div style="text-align: center; padding: 3rem; color: var(--text-muted);">No links match "${searchQuery}".</div>`;
    return;
  }

  list.innerHTML = items.map(item => `
    <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="link-card" onclick="sounds.playPop()">
      <div class="link-left">
        <div class="link-icon-box">
          ${getSvgIcon(item.icon, 20)}
        </div>
        <div class="link-meta">
          <div class="link-title">
            <span>${item.title}</span>
            ${item.badge ? `<span class="link-badge">${item.badge}</span>` : ""}
          </div>
          <div class="link-subtitle">${item.subtitle}</div>
        </div>
      </div>
      <div class="link-arrow">
        ${getSvgIcon("arrowUpRight", 20)}
      </div>
    </a>
  `).join("");
}

function renderWalletCard() {
  const p = appState.profile;
  const container = document.getElementById("wallet-details-box");
  if (!container) return;

  document.getElementById("wallet-name").textContent = p.name;
  document.getElementById("wallet-title").textContent = p.title;

  container.innerHTML = `
    <div class="wallet-detail-item">
      <span class="wallet-label">Email</span>
      <span class="wallet-val">${p.email}</span>
    </div>
    <div class="wallet-detail-item">
      <span class="wallet-label">Phone</span>
      <span class="wallet-val">${p.phone}</span>
    </div>
    <div class="wallet-detail-item">
      <span class="wallet-label">Location</span>
      <span class="wallet-val">${p.location}</span>
    </div>
    <div class="wallet-detail-item">
      <span class="wallet-label">Website</span>
      <span class="wallet-val">${p.website}</span>
    </div>
    <div class="wallet-detail-item">
      <span class="wallet-label">Visual Math</span>
      <span class="wallet-val">3Blue1Brown / Manim</span>
    </div>
    <div class="wallet-detail-item">
      <span class="wallet-label">Spec Std</span>
      <span class="wallet-val">ASD-STE100 English</span>
    </div>
  `;
}

// --- vCard .VCF Generator ---
function downloadVCard() {
  sounds.playSuccess();
  fireConfetti();

  const p = appState.profile;
  const names = p.name.split(" ");
  const lastName = names.length > 1 ? names[names.length - 1] : "";
  const firstName = names[0] || "";
  const additional = names.length > 2 ? names.slice(1, -1).join(" ") : "";

  const vCardContent = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${lastName};${firstName};${additional};;`,
    `FN:${p.name}`,
    `ORG:Savannah College of Art and Design`,
    `TITLE:${p.title}`,
    `EMAIL;TYPE=INTERNET,PREF:${p.email}`,
    `TEL;TYPE=CELL,VOICE:${p.phone}`,
    `URL:${p.website}`,
    `ADR;TYPE=WORK:;;Savannah;GA;;USA`,
    `NOTE:${p.bio.replace(/\n/g, " ")} | 3Blue1Brown / Manim, ASD-STE100`,
    "END:VCARD"
  ].join("\r\n");

  const blob = new Blob([vCardContent], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  const cleanFileName = p.name.toLowerCase().replace(/[^a-z0-9]/g, "-") + ".vcf";
  link.download = cleanFileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  showToast(`Contact saved! Downloaded ${cleanFileName}`, "📇");
}

// --- Copy Utilities ---
function copyToClipboard(text, label = "Copied to clipboard!") {
  sounds.playSuccess();
  navigator.clipboard.writeText(text).then(() => {
    showToast(label, "📋");
  }).catch(() => {
    prompt("Copy text below:", text);
  });
}

// --- QR Code Modal ---
let qrInstance = null;
function openQrModal() {
  sounds.playPop();
  const modal = document.getElementById("qr-modal");
  const container = document.getElementById("qr-canvas-wrapper");
  const currentUrl = window.location.href.startsWith("http") ? window.location.href : appState.profile.website;

  document.getElementById("qr-url-text").textContent = currentUrl;
  container.innerHTML = "";

  if (typeof QRCode !== "undefined") {
    qrInstance = new QRCode(container, {
      text: currentUrl,
      width: 180,
      height: 180,
      colorDark: "#090b10",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H
    });
  } else {
    container.innerHTML = `<div style="padding: 2rem; color: #1e293b; text-align: center; font-size: 0.8rem;">Scan Link: <br><strong>${currentUrl}</strong></div>`;
  }

  modal.classList.add("active");
}

function closeQrModal() {
  sounds.playPop();
  document.getElementById("qr-modal").classList.remove("active");
}

function downloadQrImage() {
  sounds.playSuccess();
  const img = document.querySelector("#qr-canvas-wrapper img") || document.querySelector("#qr-canvas-wrapper canvas");
  if (!img) return;

  const link = document.createElement("a");
  link.download = "contact-qr-code.png";
  if (img.tagName.toLowerCase() === "canvas") {
    link.href = img.toDataURL("image/png");
  } else {
    link.href = img.src;
  }
  link.click();
  showToast("QR Code image downloaded!", "🖼️");
}

function shareCurrentUrl() {
  sounds.playPop();
  const currentUrl = window.location.href.startsWith("http") ? window.location.href : appState.profile.website;
  if (navigator.share) {
    navigator.share({
      title: appState.profile.name,
      text: `Connect with ${appState.profile.name} - ${appState.profile.title}`,
      url: currentUrl
    }).catch(() => {});
  } else {
    copyToClipboard(currentUrl, "Link copied to clipboard!");
  }
}

// --- Quick Message Modal ---
function openMessageModal() {
  sounds.playPop();
  document.getElementById("message-modal").classList.add("active");
}

function closeMessageModal() {
  sounds.playPop();
  document.getElementById("message-modal").classList.remove("active");
}

function handleMessageSubmit(e) {
  e.preventDefault();
  sounds.playSuccess();

  const senderName = document.getElementById("msg-sender-name").value;
  const senderEmail = document.getElementById("msg-sender-email").value;
  const topic = document.getElementById("msg-topic").value;
  const note = document.getElementById("msg-text").value;

  const subject = encodeURIComponent(`[Inquiry: ${topic}] from ${senderName}`);
  const body = encodeURIComponent(
    `Hi ${appState.profile.name},\n\n` +
    `${note}\n\n` +
    `---\n` +
    `From: ${senderName}\n` +
    `Reply Email: ${senderEmail}`
  );

  const mailtoLink = `mailto:${appState.profile.email}?subject=${subject}&body=${body}`;
  window.open(mailtoLink, "_blank");

  showToast("Opening email client...", "✉️");
  closeMessageModal();
  fireConfetti();
}

function copyMessageDraft() {
  sounds.playSuccess();
  const senderName = document.getElementById("msg-sender-name").value || "Colleague";
  const senderEmail = document.getElementById("msg-sender-email").value || "your@email.com";
  const topic = document.getElementById("msg-topic").value;
  const note = document.getElementById("msg-text").value || "(Your message here)";

  const draft = `Subject: [Inquiry: ${topic}] from ${senderName}\nTo: ${appState.profile.email}\n\nHi ${appState.profile.name},\n\n${note}\n\n---\nFrom: ${senderName} (${senderEmail})`;
  copyToClipboard(draft, "Message draft copied to clipboard!");
}

// --- Theme Switcher ---
const THEMES = ["obsidian-dark", "studio-light", "cyber-violet", "terminal-emerald"];
function cycleTheme() {
  sounds.playPop();
  const currentIdx = THEMES.indexOf(appState.theme);
  const nextIdx = (currentIdx + 1) % THEMES.length;
  setTheme(THEMES[nextIdx]);
}

function setTheme(themeName) {
  appState.theme = themeName;
  saveState();
  applyTheme();
  showToast(`Theme changed: ${themeName.replace("-", " ").toUpperCase()}`, "🎨");
}

function applyTheme() {
  if (appState.theme === "obsidian-dark") {
    document.documentElement.removeAttribute("data-theme");
  } else {
    document.documentElement.setAttribute("data-theme", appState.theme);
  }
}

// --- In-Page Customizer Drawer ---
function openCustomizer() {
  sounds.playPop();
  const p = appState.profile;
  document.getElementById("cust-name").value = p.name;
  document.getElementById("cust-title").value = p.title;
  document.getElementById("cust-bio").value = p.bio;
  document.getElementById("cust-badges").value = p.badges.join(", ");
  document.getElementById("cust-status").value = p.statusText;
  document.getElementById("cust-location").value = p.location;
  document.getElementById("cust-email").value = p.email;
  document.getElementById("cust-phone").value = p.phone;
  document.getElementById("cust-website").value = p.website;
  document.getElementById("cust-avatar").value = p.avatarUrl;
  document.getElementById("cust-theme").value = appState.theme;

  document.getElementById("customizer-drawer").classList.add("active");
}

function closeCustomizer() {
  sounds.playPop();
  document.getElementById("customizer-drawer").classList.remove("active");
}

function saveCustomizer() {
  sounds.playSuccess();
  const p = appState.profile;
  p.name = document.getElementById("cust-name").value.trim() || p.name;
  p.title = document.getElementById("cust-title").value.trim() || p.title;
  p.bio = document.getElementById("cust-bio").value.trim() || p.bio;
  p.statusText = document.getElementById("cust-status").value.trim() || p.statusText;
  p.location = document.getElementById("cust-location").value.trim() || p.location;
  p.email = document.getElementById("cust-email").value.trim() || p.email;
  p.phone = document.getElementById("cust-phone").value.trim() || p.phone;
  p.website = document.getElementById("cust-website").value.trim() || p.website;
  p.avatarUrl = document.getElementById("cust-avatar").value.trim();

  // Badges comma-separated
  const badgeRaw = document.getElementById("cust-badges").value;
  p.badges = badgeRaw.split(",").map(s => s.trim()).filter(Boolean);

  // Initials
  const names = p.name.split(" ");
  p.initials = names.length > 1 ? (names[0][0] + names[names.length - 1][0]).toUpperCase() : p.name.slice(0, 2).toUpperCase();

  // Theme
  const newTheme = document.getElementById("cust-theme").value;
  if (newTheme !== appState.theme) {
    setTheme(newTheme);
  }

  saveState();
  renderProfile();
  renderContent();
  closeCustomizer();
  showToast("Profile settings updated & saved!", "✨");
  fireConfetti();
}

function resetDefaultState() {
  if (!confirm("Reset all settings and links to the default profile?")) return;
  sounds.playPop();
  localStorage.removeItem("ultimate_contact_state");
  appState = JSON.parse(JSON.stringify(DEFAULT_STATE));
  saveState();
  applyTheme();
  renderProfile();
  renderContent();
  closeCustomizer();
  showToast("Restored default profile!", "↺");
}

// Export customized site as a single-page HTML file
function exportCustomizedHtml() {
  sounds.playSuccess();
  const currentHtml = document.documentElement.outerHTML;
  const stateInjection = `<script>window.EXPORTED_INITIAL_STATE = ${JSON.stringify(appState)};</script>`;
  const exported = currentHtml.replace("</head>", `${stateInjection}\n</head>`);

  const blob = new Blob([exported], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "index.html";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast("Downloaded customized index.html!", "🚀");
}

// --- Toggle Sound ---
function toggleSound() {
  appState.soundEnabled = !appState.soundEnabled;
  saveState();
  sounds.playPop();
  const btn = document.getElementById("sound-toggle-btn");
  if (btn) {
    btn.innerHTML = appState.soundEnabled ? "🔊" : "🔇";
    btn.title = appState.soundEnabled ? "Sound Effects Enabled" : "Sound Muted";
  }
  showToast(appState.soundEnabled ? "Sound enabled" : "Sound muted", appState.soundEnabled ? "🔊" : "🔇");
}

// --- Wire Up Event Listeners on DOM Ready ---
document.addEventListener("DOMContentLoaded", () => {
  if (window.EXPORTED_INITIAL_STATE) {
    appState = window.EXPORTED_INITIAL_STATE;
  }

  applyTheme();
  renderProfile();
  renderContent();
  startLiveClock();

  const soundBtn = document.getElementById("sound-toggle-btn");
  if (soundBtn) {
    soundBtn.innerHTML = appState.soundEnabled ? "🔊" : "🔇";
  }

  const tabBento = document.getElementById("tab-bento");
  const tabLinks = document.getElementById("tab-links");
  const tabVcard = document.getElementById("tab-vcard");

  function setView(viewName, clickedBtn) {
    sounds.playPop();
    activeView = viewName;
    document.querySelectorAll(".view-tab").forEach(t => t.classList.remove("active"));
    clickedBtn.classList.add("active");
    renderContent();
  }

  if (tabBento) tabBento.addEventListener("click", () => setView("bento", tabBento));
  if (tabLinks) tabLinks.addEventListener("click", () => setView("links", tabLinks));
  if (tabVcard) tabVcard.addEventListener("click", () => setView("vcard", tabVcard));

  document.querySelectorAll(".filter-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      sounds.playPop();
      document.querySelectorAll(".filter-chip").forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      activeCategory = chip.dataset.category || "all";
      renderContent();
    });
  });

  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value.trim();
      renderContent();
    });
  }

  const btnSaveVcard = document.getElementById("btn-save-vcard");
  if (btnSaveVcard) btnSaveVcard.addEventListener("click", downloadVCard);

  const btnWalletDownload = document.getElementById("wallet-download-btn");
  if (btnWalletDownload) btnWalletDownload.addEventListener("click", downloadVCard);

  const btnOpenMsg = document.getElementById("btn-open-msg");
  if (btnOpenMsg) btnOpenMsg.addEventListener("click", openMessageModal);

  const btnCopyEmail = document.getElementById("btn-copy-email");
  if (btnCopyEmail) btnCopyEmail.addEventListener("click", () => copyToClipboard(appState.profile.email, "Email address copied!"));

  const btnCopyPhone = document.getElementById("btn-copy-phone");
  if (btnCopyPhone) btnCopyPhone.addEventListener("click", () => copyToClipboard(appState.profile.phone, "Phone number copied!"));

  const btnQr = document.getElementById("btn-open-qr");
  if (btnQr) btnQr.addEventListener("click", openQrModal);

  document.querySelectorAll(".modal-overlay").forEach(overlay => {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        overlay.classList.remove("active");
      }
    });
  });

  const msgForm = document.getElementById("quick-message-form");
  if (msgForm) msgForm.addEventListener("submit", handleMessageSubmit);
});
