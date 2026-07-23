/* ============================================================
   EMC Aviation Commerce Platform — Static Page Generator
   ------------------------------------------------------------
   Reads the `M` object out of assets/modules.js (the single
   source of truth) and writes real static HTML for every module,
   pillar, the platform, company & legal pages, a real 404, plus
   sitemap.xml / robots.txt.

   Run manually:  node scripts/build-pages.mjs
   ============================================================ */

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DOMAIN = "https://easemycargo.com";
const CONTACT = "emcnoreplynotifications@gmail.com";

/* ---- Load M + ALIASES from assets/modules.js without a browser ---- */
const modulesSrc = readFileSync(join(ROOT, "assets/modules.js"), "utf8");
const stubDoc = { getElementById: () => null, addEventListener: () => {}, title: "" };
// eslint-disable-next-line no-new-func
const { M, ALIASES } = new Function("document", modulesSrc + "\nreturn { M, ALIASES };")(stubDoc);

/* ---- Slug map: module key -> clean path slug ---- */
const SLUG = {
  commercial:    "commercial",
  capacity:      "capacity-network",
  booking:       "booking",
  awb:           "shipment-awb",
  terminal:      "terminal-operations",
  uld:           "uld",
  revenue:       "revenue-accounting",
  compliance:    "compliance-security",
  collaboration: "stakeholder-collaboration",
};
const modPath = (key) => (key === "platform" ? "/platform" : `/modules/${SLUG[key]}`);

/* ---- Pillar definitions ---- */
const PILLARS = {
  commercial: {
    slug: "commercial",
    eyebrow: "Commercial Pillar",
    title: "Commercial Management & Revenue Control",
    statement: "Capabilities that help airlines manage customer demand, price intelligently, allocate capacity strategically and streamline booking responsiveness.",
    modules: ["commercial", "capacity", "booking"],
    themes: [
      { name: "Customer & Demand Management", desc: "A unified commercial foundation for customers, products, inquiries and contracts across every sales channel." },
      { name: "Intelligent Pricing & Revenue Control", desc: "Tariffs, market rates, spot pricing and credit governance that protect yield while responding to market changes." },
      { name: "Capacity Allocation & Booking Responsiveness", desc: "Strategic capacity control across routes and partners, with a digitized booking lifecycle from request to confirmation." },
    ],
  },
  operational: {
    slug: "operational",
    eyebrow: "Operational Pillar",
    title: "Execution Visibility & Network Operations",
    statement: "Capabilities that establish execution visibility across shipment control, terminal processes and ULD lifecycle management.",
    modules: ["awb", "terminal", "uld"],
    themes: [
      { name: "Shipment Documentation Control", desc: "A single source of truth for the air waybill lifecycle, from stock and issuance through tracking and milestones." },
      { name: "Terminal & Cargo Execution", desc: "Physical cargo movement from acceptance and warehouse tasks through build-up, manifest and flight closure." },
      { name: "ULD Lifecycle Visibility", desc: "Complete inventory, tracking, rotation and maintenance control over Unit Load Devices across the network." },
    ],
  },
  financial: {
    slug: "financial",
    eyebrow: "Financial & Governance Pillar",
    title: "Revenue Integrity & Ecosystem Compliance",
    statement: "Capabilities that reinforce revenue integrity, compliance assurance and partner collaboration across the cargo ecosystem.",
    modules: ["revenue", "compliance", "collaboration"],
    themes: [
      { name: "Revenue Integrity & Assurance", desc: "Automated billing, interline settlement, proration and revenue-leakage detection with audit controls." },
      { name: "Regulatory Compliance & Security", desc: "Systematic customs, security, dangerous-goods and embargo controls with traceable audit trails." },
      { name: "Ecosystem Collaboration", desc: "Governed data sharing, shared milestones and notifications across forwarders, GSAs, handlers and partners." },
    ],
  },
};

/* ---- Digital Platform: four layers, thirteen components ---- */
const PLATFORM_LAYERS = [
  { name: "Low-Code Platform", blurb: "Configure without software development.",
    items: ["Dynamic Form Designer", "Dynamic Workflow Engine", "Dynamic Rules Engine"] },
  { name: "Enterprise Platform", blurb: "Governance and administrative structure.",
    items: ["Organization Management", "Stakeholder Management", "Identity & Access Management"] },
  { name: "Connectivity Platform", blurb: "Seamless data exchange and messaging.",
    items: ["API Gateway", "Cargo IMP", "Cargo XML", "OneRecord"] },
  { name: "Intelligence Platform", blurb: "Data-driven decision support across channels.",
    items: ["Analytics", "Reporting", "AI Services"] },
];

/* ============================================================
   Small helpers
   ============================================================ */
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const attr = (s) => esc(s).replace(/"/g, "&quot;");

function clip(str, n = 155) {
  const s = String(str).replace(/\s+/g, " ").trim();
  if (s.length <= n) return s;
  const cut = s.slice(0, n - 1);
  return cut.slice(0, cut.lastIndexOf(" ")).trim() + "…";
}

const ICON = {
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/>',
  chart: '<path d="M3 3v18h18"/><path d="M7 15l3-4 3 2 5-7"/>',
  cal:   '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18M9 16l2 2 4-4"/>',
  doc:   '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/>',
  box:   '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="m9 12 2 2 4-4"/>',
  grid:  '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>',
  shield:'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
  layers:'<path d="M12 2 2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>',
  cog:   '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
};
const MODICON = {
  commercial: ICON.users, capacity: ICON.chart, booking: ICON.cal, awb: ICON.doc,
  terminal: ICON.box, uld: ICON.grid, revenue: ICON.chart, compliance: ICON.shield,
  collaboration: ICON.users, platform: ICON.cog,
};
const svg = (paths) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7">${paths}</svg>`;

/* ============================================================
   Shared shell: <head>, nav, footer, scripts
   ============================================================ */
function head({ title, description, path, jsonld, ogType = "website" }) {
  const url = DOMAIN + path;
  const parts = [
    '<meta charset="UTF-8" />',
    '<meta name="viewport" content="width=device-width, initial-scale=1.0" />',
    '<meta name="color-scheme" content="dark light" />',
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${attr(description)}" />`,
    '<meta name="robots" content="index, follow" />',
    `<link rel="canonical" href="${attr(url)}" />`,
    `<meta property="og:title" content="${attr(title)}" />`,
    `<meta property="og:description" content="${attr(description)}" />`,
    `<meta property="og:url" content="${attr(url)}" />`,
    `<meta property="og:image" content="${DOMAIN}/assets/og.jpg" />`,
    `<meta property="og:type" content="${ogType}" />`,
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:image" content="${DOMAIN}/assets/og.jpg" />`,
    '<link rel="icon" type="image/svg+xml" href="/favicon.svg" />',
    '<link rel="preconnect" href="https://fonts.googleapis.com">',
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
    '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">',
    '<link rel="stylesheet" href="/assets/site.css?v=10">',
  ];
  if (jsonld) parts.push(`<script type="application/ld+json">${JSON.stringify(jsonld)}</script>`);
  return parts.join("\n  ");
}

const NAV = `<header class="nav" id="nav">
  <div class="container nav-inner">
    <a class="brand" href="/" aria-label="EMC home">
      <span class="logo" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12l19-8-4 9 4 9z"/></svg>
      </span>
      <span>EMC<small>Ease My Cargo</small></span>
    </a>

    <nav class="nav-links" aria-label="Primary">
      <div class="nav-item mega">
        <button aria-haspopup="true" aria-expanded="false" aria-controls="dd-products">Products <svg class="caret" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M6 9l6 6 6-6"/></svg></button>
        <div class="dropdown mega" id="dd-products">
          <div class="mega-grid">
            <div class="mega-col">
              <h6>Commercial Pillar</h6>
              <a class="mega-link" href="/modules/commercial">Commercial Management</a>
              <a class="mega-link" href="/modules/capacity-network">Capacity &amp; Network</a>
              <a class="mega-link" href="/modules/booking">Booking Management</a>
            </div>
            <div class="mega-col">
              <h6>Operational Pillar</h6>
              <a class="mega-link" href="/modules/shipment-awb">Shipment &amp; AWB</a>
              <a class="mega-link" href="/modules/terminal-operations">Terminal &amp; Cargo Ops</a>
              <a class="mega-link" href="/modules/uld">ULD Management</a>
            </div>
            <div class="mega-col">
              <h6>Financial Pillar</h6>
              <a class="mega-link" href="/modules/revenue-accounting">Revenue Accounting</a>
              <a class="mega-link" href="/modules/compliance-security">Compliance &amp; Security</a>
              <a class="mega-link" href="/modules/stakeholder-collaboration">Stakeholder Collaboration</a>
            </div>
            <div class="mega-col">
              <h6>Platform Layer</h6>
              <a class="mega-link" href="/platform">Digital Platform</a>
            </div>
          </div>
        </div>
      </div>

      <a href="/platform">Platform</a>

      <div class="nav-item">
        <button aria-haspopup="true" aria-expanded="false" aria-controls="dd-resources">Resources <svg class="caret" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M6 9l6 6 6-6"/></svg></button>
        <div class="dropdown" id="dd-resources">
          <a class="dd-link" href="/#lifecycle">
            <span class="dd-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M4 4h16v16H4z"/><path d="M8 9h8M8 13h5"/></svg></span>
            <span><span class="dd-title">Cargo Lifecycle</span><span class="dd-desc">9 integrated stages from demand to settlement</span></span>
          </a>
          <a class="dd-link" href="/#integrations">
            <span class="dd-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 2l3 6 6 .9-4.5 4.3 1 6.3L12 17l-5.5 2.5 1-6.3L3 8.9 9 8z"/></svg></span>
            <span><span class="dd-title">Connectivity &amp; Standards</span><span class="dd-desc">OneRecord, Cargo XML, Cargo IMP &amp; APIs</span></span>
          </a>
        </div>
      </div>

      <a href="/company">Company</a>
    </nav>

    <div class="nav-cta">
      <button class="theme-toggle" id="themeToggle" aria-label="Switch to light theme" aria-pressed="false" title="Toggle color theme">
        <svg class="sun-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
        <svg class="moon-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
      </button>

      <button class="btn btn-primary" data-demo>Request demo</button>
      <button class="nav-toggle" id="navToggle" aria-label="Menu" aria-expanded="false" aria-controls="mobileMenu">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
      </button>
    </div>
  </div>
</header>

<div class="mobile-menu" id="mobileMenu">
  <div class="mm-group">Commercial Pillar</div>
  <a href="/modules/commercial">Commercial Management</a>
  <a href="/modules/capacity-network">Capacity &amp; Network Management</a>
  <a href="/modules/booking">Booking Management</a>
  <div class="mm-group">Operational Pillar</div>
  <a href="/modules/shipment-awb">Shipment &amp; Air Waybill Management</a>
  <a href="/modules/terminal-operations">Terminal &amp; Cargo Operations</a>
  <a href="/modules/uld">ULD Management</a>
  <div class="mm-group">Financial &amp; Governance Pillar</div>
  <a href="/modules/revenue-accounting">Revenue Accounting</a>
  <a href="/modules/compliance-security">Compliance &amp; Security</a>
  <a href="/modules/stakeholder-collaboration">Stakeholder Collaboration</a>
  <div class="mm-group">Platform</div>
  <a href="/platform">Digital Platform</a>
  <a href="/#integrations">Integrations</a>
  <a href="/company">Company</a>
  <button class="btn btn-primary" data-demo>Request demo</button>
</div>`;

const FOOTER = `<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div>
        <a class="brand" href="/">
          <span class="logo" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12l19-8-4 9 4 9z"/></svg></span>
          <span>EMC<small>Ease My Cargo</small></span>
        </a>
        <p class="footer-blurb">A configurable, cloud-native airline cargo management platform that digitizes commercial, operational, financial and compliance processes across the entire air cargo ecosystem.</p>
      </div>
      <div>
        <h5>Commercial</h5>
        <ul>
          <li><a href="/modules/commercial">Commercial Mgmt</a></li>
          <li><a href="/modules/capacity-network">Capacity &amp; Network</a></li>
          <li><a href="/modules/booking">Booking Management</a></li>
        </ul>
      </div>
      <div>
        <h5>Operational</h5>
        <ul>
          <li><a href="/modules/shipment-awb">Shipment &amp; AWB</a></li>
          <li><a href="/modules/terminal-operations">Terminal Operations</a></li>
          <li><a href="/modules/uld">ULD Management</a></li>
        </ul>
      </div>
      <div>
        <h5>Financial &amp; Platform</h5>
        <ul>
          <li><a href="/modules/revenue-accounting">Revenue Accounting</a></li>
          <li><a href="/modules/compliance-security">Compliance &amp; Security</a></li>
          <li><a href="/modules/stakeholder-collaboration">Stakeholder Collab</a></li>
          <li><a href="/platform">Digital Platform</a></li>
        </ul>
      </div>
      <div>
        <h5>Company</h5>
        <ul>
          <li><a href="/company">About EMC</a></li>
          <li><a href="/legal/privacy">Privacy Policy</a></li>
          <li><a href="/legal/terms">Terms of Service</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 EMC Aviation Commerce Platform. All rights reserved.</span>
      <span class="fb-links"><a href="/legal/privacy">Privacy Policy</a><a href="/legal/terms">Terms of Service</a></span>
    </div>
  </div>
</footer>`;

const SCRIPTS = `<script src="/assets/site.js?v=10"></script>
<script defer src="/assets/demo-modal.js?v=10"></script>`;

function page({ title, description, path, main, jsonld, ogType }) {
  return `<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  ${head({ title, description, path, jsonld, ogType })}
</head>
<body>

${NAV}

${main}

${FOOTER}

${SCRIPTS}
</body>
</html>
`;
}

/* ============================================================
   Reusable card markup
   ============================================================ */
function moduleCard(key) {
  const m = M[key];
  const caps = m.capabilities.slice(0, 3).map((c) => `<li>${esc(c.name)}</li>`).join("");
  return `<a class="mcard" href="${modPath(key)}">
    <div class="mc-ico">${svg(MODICON[key])}</div>
    <h4>${esc(m.title)}</h4>
    <p>${esc(clip(m.lead, 150))}</p>
    <ul class="mc-caps">${caps}</ul>
    <span class="mc-more">Learn more <svg class="arrow" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>
  </a>`;
}

function ctaSection(heading, sub) {
  return `<section class="section">
    <div class="container">
      <div class="cta">
        <h2>${heading}</h2>
        <p>${sub}</p>
        <div class="cta-actions">
          <button class="btn btn-primary btn-lg" data-demo>Request demo <svg class="arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>
          <a class="btn btn-ghost btn-lg" href="/">Back to platform overview</a>
        </div>
      </div>
    </div>
  </section>`;
}

/* ============================================================
   Page builders
   ============================================================ */
function modulePageMain(key) {
  const m = M[key];
  const caps = m.capabilities.map((c) => `
        <div class="cap">
          <div class="cap-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></div>
          <h4>${esc(c.name)}</h4>
          <p>${esc(c.desc)}</p>
        </div>`).join("");
  const benefits = m.benefits.map((b) => `
          <li>
            <span class="chk"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg></span>
            <span>${esc(b)}</span>
          </li>`).join("");

  return `<main>
  <section class="mod-hero">
    <div class="container">
      <a class="mod-back" href="/"><svg class="arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg> Back to platform overview</a>
      <div style="margin-top:24px;">
        <span class="hero-badge"><span class="pill">${esc(m.pillar)}</span> EMC Airline Cargo Suite</span>
        <h1 class="mod-title">${esc(m.title)}</h1>
        <p class="mod-lead">${esc(m.overview)}</p>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="split">
        <div class="split-copy">
          <span class="eyebrow no-line">${esc(m.eyebrow)}</span>
          <h2 class="section-title">Key Business Benefits</h2>
          <ul class="feature-list" style="margin-top:24px;">${benefits}
          </ul>
        </div>
        <div class="mock">
          <div class="mock-head">
            <span class="mock-dot"></span>
            <span class="mock-title">${esc(m.title)} — Overview</span>
          </div>
          <div class="mock-body">
            <div class="mrow"><span class="lbl">Module Status</span><span class="badge ok">Core Capability</span></div>
            <div class="mrow"><span class="lbl">Pillar</span><span class="val">${esc(m.pillar)}</span></div>
            <div class="mrow"><span class="lbl">Architecture</span><span class="val">Cloud-Native / Low-Code</span></div>
            <div class="mrow"><span class="lbl">Deployment</span><span class="val">EMC Digital Platform</span></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section" style="background:var(--bg-panel)">
    <div class="container">
      <div class="center">
        <span class="eyebrow no-line" style="justify-content:center">Business Capabilities</span>
        <h2 class="section-title">Functional Building Blocks</h2>
        <p class="section-lead">Designed for commercial, operational and financial clarity across the cargo lifecycle.</p>
      </div>
      <div class="grid cols-3" style="margin-top:40px;">${caps}
      </div>
    </div>
  </section>

  ${ctaSection(`Transform Cargo Operations with <span class="gradient-text">EMC</span>`, `Request a personalized walkthrough of the ${esc(m.title)} module and complete cargo lifecycle.`)}
</main>`;
}

function pillarPageMain(p) {
  const themes = p.themes.map((t) => `
        <div class="panel">
          <h3>${esc(t.name)}</h3>
          <p>${esc(t.desc)}</p>
        </div>`).join("");
  const cards = p.modules.map(moduleCard).join("\n      ");
  return `<main>
  <section class="mod-hero">
    <div class="container">
      <a class="mod-back" href="/"><svg class="arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg> Back to platform overview</a>
      <div style="margin-top:24px;">
        <span class="hero-badge"><span class="pill">${esc(p.eyebrow)}</span> EMC Airline Cargo Suite</span>
        <h1 class="mod-title">${esc(p.title)}</h1>
        <p class="mod-lead">${esc(p.statement)}</p>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="center">
        <span class="eyebrow no-line" style="justify-content:center">Focus Areas</span>
        <h2 class="section-title">Three Themes</h2>
      </div>
      <div class="grid cols-3" style="margin-top:40px">${themes}
      </div>
    </div>
  </section>

  <section class="section" style="background:var(--bg-panel)">
    <div class="container">
      <div class="center">
        <span class="eyebrow no-line" style="justify-content:center">Modules</span>
        <h2 class="section-title">Capabilities in this Pillar</h2>
      </div>
      <div class="grid cols-3" style="margin-top:40px">
      ${cards}
      </div>
    </div>
  </section>

  ${ctaSection(`Explore the Full <span class="gradient-text">Cargo Suite</span>`, `See how the ${esc(p.eyebrow)} connects with the complete EMC Airline Cargo Suite.`)}
</main>`;
}

function platformPageMain() {
  const p = M.platform;
  const layers = PLATFORM_LAYERS.map((l) => `
        <div class="mcard">
          <div class="mc-ico">${svg(ICON.cog)}</div>
          <h4>${esc(l.name)}</h4>
          <p>${esc(l.blurb)}</p>
          <ul class="mc-caps">${l.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>
        </div>`).join("");
  return `<main>
  <section class="mod-hero">
    <div class="container">
      <a class="mod-back" href="/"><svg class="arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg> Back to platform overview</a>
      <div style="margin-top:24px;">
        <span class="hero-badge"><span class="pill">Platform Foundation</span> EMC Airline Cargo Suite</span>
        <h1 class="mod-title">${esc(p.title)}</h1>
        <p class="mod-lead">${esc(p.overview)}</p>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="center">
        <span class="eyebrow no-line" style="justify-content:center">Digital Platform Foundation</span>
        <h2 class="section-title">Four Layers, Thirteen Components</h2>
        <p class="section-lead">A configurable digital foundation that enables EMC Airline Cargo Suite to adapt faster, integrate cleanly and support smarter decision-making.</p>
      </div>
      <div class="grid cols-4" style="margin-top:40px">${layers}
      </div>
      <div class="center" style="margin-top:32px">
        <p style="font-size:18px;font-weight:700;color:var(--accent-3);">Configure Faster. Collaborate Better. Grow Smarter.</p>
      </div>
    </div>
  </section>

  ${ctaSection(`Build on the <span class="gradient-text">EMC Digital Platform</span>`, `Request a walkthrough of the low-code, connectivity and intelligence foundation behind the Airline Cargo Suite.`)}
</main>`;
}

function companyPageMain() {
  return `<main>
  <section class="mod-hero">
    <div class="container">
      <a class="mod-back" href="/"><svg class="arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg> Back to platform overview</a>
      <div style="margin-top:24px;">
        <span class="hero-badge"><span class="pill">Company</span> EMC Aviation Commerce Platform</span>
        <h1 class="mod-title">EMC | Ease My Cargo</h1>
        <p class="mod-lead">EMC (Ease My Cargo) builds the EMC Aviation Commerce Platform and its Airline Cargo Suite — a configurable, cloud-native platform for the air cargo industry.</p>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="split">
        <div class="split-copy">
          <span class="eyebrow no-line">What we do</span>
          <h2 class="section-title">Connected Aviation Commerce</h2>
          <p class="section-lead">EMC Airline Cargo Suite digitizes and orchestrates the entire air cargo lifecycle — from commercial engagement and capacity planning through operational execution, regulatory compliance and financial settlement.</p>
          <p class="section-lead">The suite is built on the EMC Digital Platform, a low-code foundation that lets airlines and their partners configure screens, workflows and business rules without extensive software development.</p>
        </div>
        <div class="mock">
          <div class="mock-head"><span class="mock-dot"></span><span class="mock-title">Company Details</span></div>
          <div class="mock-body">
            <div class="mrow"><span class="lbl">Trading name</span><span class="val">EMC | Ease My Cargo</span></div>
            <div class="mrow"><span class="lbl">Product</span><span class="val">Airline Cargo Suite</span></div>
            <div class="mrow"><span class="lbl">Platform</span><span class="val">EMC Aviation Commerce Platform</span></div>
            <div class="mrow"><span class="lbl">Location</span><span class="val">India</span></div>
            <div class="mrow"><span class="lbl">Contact</span><span class="val"><a href="mailto:${CONTACT}">${CONTACT}</a></span></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section" style="background:var(--bg-panel)">
    <div class="container">
      <div class="center">
        <span class="eyebrow no-line" style="justify-content:center">Get in touch</span>
        <h2 class="section-title">Talk to EMC</h2>
        <p class="section-lead">For product enquiries, partnerships or a walkthrough of the Airline Cargo Suite, reach us at <a href="mailto:${CONTACT}">${CONTACT}</a> or request a demo below.</p>
      </div>
      <div class="cta-actions" style="margin-top:30px;justify-content:center">
        <button class="btn btn-primary btn-lg" data-demo>Request demo <svg class="arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>
        <a class="btn btn-ghost btn-lg" href="/legal/privacy">How we handle your data</a>
      </div>
    </div>
  </section>
</main>`;
}

function legalShell(heading, updated, bodyHtml) {
  return `<main>
  <section class="mod-hero">
    <div class="container">
      <a class="mod-back" href="/"><svg class="arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg> Back to platform overview</a>
      <div style="margin-top:24px;">
        <h1 class="mod-title">${heading}</h1>
        <p class="mod-lead">Last updated: ${updated}</p>
      </div>
    </div>
  </section>
  <section class="section">
    <div class="container">
      <div class="legal-copy">${bodyHtml}</div>
    </div>
  </section>
</main>`;
}

function privacyBody() {
  return `
    <p>This Privacy Policy explains how EMC (Ease My Cargo) — operator of the EMC Aviation Commerce Platform and this website — collects and uses personal information when you request a demo or otherwise contact us. It is written to align with India's Digital Personal Data Protection Act, 2023 (DPDP Act) and the EU General Data Protection Regulation (GDPR) where applicable.</p>

    <h2>Who we are</h2>
    <p>EMC | Ease My Cargo, operating from India, is the data fiduciary/controller responsible for the information described here. You can reach us at <a href="mailto:${CONTACT}">${CONTACT}</a>.</p>

    <h2>What we collect</h2>
    <p>When you submit the “Request a demo” form we collect the details you provide: your full name, job title, work email address, company name, your stakeholder segment, and any optional message. We do not collect payment information, and we do not knowingly collect sensitive personal data through this site.</p>

    <h2>Why we collect it</h2>
    <p>We use these details for one purpose: to respond to your enquiry and arrange the demo you requested. Your work email is also used to send you a confirmation of your request. We do not sell your data, and we do not use it for unrelated marketing.</p>

    <h2>Who processes it</h2>
    <p>Demo requests are transmitted using <strong>EmailJS</strong>, a third-party email delivery service that acts as our processor to route the form submission to our inbox and send your confirmation. The data you submit passes through EmailJS solely for that delivery. No advertising or analytics trackers are used to process this form.</p>

    <h2>How long we keep it</h2>
    <p>We retain demo-request details only as long as needed to handle your enquiry and any resulting conversation, and no longer than 24 months from your last contact, after which the information is deleted unless you have become a customer and a longer contractual retention applies.</p>

    <h2>Your rights</h2>
    <p>You may ask us to access, correct, or delete the personal information we hold about you, or to withdraw consent for its use, at any time. To make a request, email <a href="mailto:${CONTACT}">${CONTACT}</a> and we will action it within the timeframes required by applicable law.</p>

    <h2>Changes</h2>
    <p>We may update this policy from time to time. The “last updated” date at the top reflects the current version.</p>

    <h2>Contact</h2>
    <p>Questions about this policy or your data can be sent to <a href="mailto:${CONTACT}">${CONTACT}</a>.</p>
  `;
}

function termsBody() {
  return `
    <p>These Terms of Service govern your use of this website operated by EMC (Ease My Cargo). By accessing or using the site, you agree to these terms. If you do not agree, please do not use the site.</p>

    <h2>About the site</h2>
    <p>This website provides information about the EMC Aviation Commerce Platform and its Airline Cargo Suite. Content is provided for general informational purposes and may describe capabilities, roadmaps or configurations that vary by deployment. Nothing on this site constitutes a binding offer, warranty, or contractual commitment.</p>

    <h2>Acceptable use</h2>
    <p>You agree to use the site lawfully and not to misuse it — including no attempts to disrupt the site, gain unauthorized access, scrape at a scale that degrades service, or submit false information through the demo-request form.</p>

    <h2>Intellectual property</h2>
    <p>The EMC name, “Ease My Cargo”, the site design, text and graphics are the property of EMC or its licensors and are protected by applicable intellectual-property laws. You may not reproduce or redistribute them without permission, except for personal, non-commercial reference.</p>

    <h2>Demo requests</h2>
    <p>Submitting the demo-request form does not create any obligation on either party beyond our commitment to handle your enquiry as described in our <a href="/legal/privacy">Privacy Policy</a>. Please provide accurate details so we can respond appropriately.</p>

    <h2>Disclaimer &amp; liability</h2>
    <p>The site is provided “as is” without warranties of any kind, to the fullest extent permitted by law. EMC is not liable for any indirect or consequential loss arising from your use of, or inability to use, the site or reliance on its content.</p>

    <h2>Third-party services</h2>
    <p>The demo-request form is delivered via EmailJS. Your use of that feature is also subject to how we describe processing in the <a href="/legal/privacy">Privacy Policy</a>.</p>

    <h2>Changes</h2>
    <p>We may revise these terms at any time by updating this page. Continued use of the site after changes take effect constitutes acceptance of the revised terms.</p>

    <h2>Contact</h2>
    <p>Questions about these terms can be sent to <a href="mailto:${CONTACT}">${CONTACT}</a>.</p>
  `;
}

function notFoundMain() {
  return `<main>
  <section class="section" style="padding-top:160px;text-align:center">
    <div class="container">
      <span class="hero-badge"><span class="pill">404</span> Page not found</span>
      <h1 class="mod-title" style="margin-top:20px">This page could not be found</h1>
      <p class="section-lead" style="margin-left:auto;margin-right:auto">The page you’re looking for doesn’t exist or may have moved. Explore the EMC Airline Cargo Suite from the platform overview.</p>
      <div class="cta-actions" style="justify-content:center;margin-top:30px">
        <a class="btn btn-primary btn-lg" href="/">Back to home <svg class="arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a>
        <a class="btn btn-ghost btn-lg" href="/platform">Explore the platform</a>
      </div>
    </div>
  </section>
</main>`;
}

/* ============================================================
   Write everything
   ============================================================ */
const pagesForSitemap = ["/"];
function write(relPath, contents) {
  const abs = join(ROOT, relPath);
  mkdirSync(dirname(abs), { recursive: true });
  writeFileSync(abs, contents);
  console.log("  wrote", relPath);
}

// Modules
for (const key of Object.keys(SLUG)) {
  const m = M[key];
  const path = modPath(key);
  write(`modules/${SLUG[key]}/index.html`, page({
    title: `${m.title} — EMC Airline Cargo Suite`,
    description: clip(m.lead, 155),
    path,
    main: modulePageMain(key),
  }));
  pagesForSitemap.push(path);
}

// Platform
write("platform/index.html", page({
  title: "EMC Digital Platform — Airline Cargo Suite",
  description: clip(M.platform.lead, 155),
  path: "/platform",
  main: platformPageMain(),
}));
pagesForSitemap.push("/platform");

// Pillars
for (const p of Object.values(PILLARS)) {
  write(`pillars/${p.slug}/index.html`, page({
    title: `${p.title} — EMC Airline Cargo Suite`,
    description: clip(p.statement, 155),
    path: `/pillars/${p.slug}`,
    main: pillarPageMain(p),
  }));
  pagesForSitemap.push(`/pillars/${p.slug}`);
}

// Company
write("company/index.html", page({
  title: "About EMC | Ease My Cargo — Airline Cargo Suite",
  description: "EMC (Ease My Cargo) builds the EMC Aviation Commerce Platform and its Airline Cargo Suite — a configurable, cloud-native platform for the air cargo industry.",
  path: "/company",
  main: companyPageMain(),
  jsonld: {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "EMC | Ease My Cargo",
    legalName: "EMC | Ease My Cargo",
    alternateName: "Ease My Cargo",
    url: DOMAIN,
    logo: `${DOMAIN}/favicon.svg`,
    email: CONTACT,
    description: "Builder of the EMC Aviation Commerce Platform and its Airline Cargo Suite, a configurable cloud-native airline cargo management platform.",
    address: { "@type": "PostalAddress", addressCountry: "IN" },
    contactPoint: { "@type": "ContactPoint", email: CONTACT, contactType: "sales" },
  },
}));
pagesForSitemap.push("/company");

// Legal
write("legal/privacy/index.html", page({
  title: "Privacy Policy — EMC | Ease My Cargo",
  description: "How EMC (Ease My Cargo) collects and uses the details you submit when requesting a demo, aligned with India's DPDP Act and GDPR.",
  path: "/legal/privacy",
  main: legalShell("Privacy Policy", "23 July 2026", privacyBody()),
}));
pagesForSitemap.push("/legal/privacy");

write("legal/terms/index.html", page({
  title: "Terms of Service — EMC | Ease My Cargo",
  description: "The terms that govern your use of the EMC Aviation Commerce Platform marketing website.",
  path: "/legal/terms",
  main: legalShell("Terms of Service", "23 July 2026", termsBody()),
}));
pagesForSitemap.push("/legal/terms");

// 404 (not in sitemap)
write("404.html", page({
  title: "Page not found — EMC Airline Cargo Suite",
  description: "The page you’re looking for doesn’t exist or may have moved.",
  path: "/404",
  main: notFoundMain(),
}));

// robots.txt + sitemap.xml
write("robots.txt", `User-agent: *
Allow: /
Disallow: /module.html

Sitemap: ${DOMAIN}/sitemap.xml
`);

const today = "2026-07-23";
const urls = pagesForSitemap.map((p) => {
  const loc = DOMAIN + (p === "/" ? "/" : p);
  const priority = p === "/" ? "1.0" : "0.7";
  return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
}).join("\n");
write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`);

console.log(`\nDone. ${pagesForSitemap.length} pages in sitemap.`);
