# EMC Aviation Commerce Platform — site

Hand-authored static marketing site for the **EMC Aviation Commerce Platform**
and its **Airline Cargo Suite**. No build step, no backend, no env vars — plain
HTML/CSS/JS that works on any static host (Vercel, GitHub Pages, GoDaddy).

```
├── index.html              lean homepage (the 20% — orient & excite)
├── module.html             legacy redirect shim (?m=<id> → clean path, noindex)
├── favicon.svg
├── scripts/
│   └── build-pages.mjs     static page generator (reads assets/modules.js)
├── modules/<slug>/         generated module pages (index.html each)
├── pillars/<slug>/         generated pillar pages
├── platform/               generated Digital Platform page
├── company/                generated company page
├── legal/privacy|terms/    generated legal pages
├── 404.html, sitemap.xml, robots.txt   generated
├── assets/
│   ├── site.css            design system + all section styles
│   ├── site.js             nav, mobile menu, dropdown a11y, theme, scroll reveal
│   ├── modules.js          module content data (the 80%) — single source of truth
│   ├── demo-modal.js       [data-demo] panel → sends via EmailJS
│   ├── og.jpg              1200×630 social share image
│   └── hero-*.jpg/.avif    responsive hero srcset variants
├── vercel.json             cleanUrls + /module.html redirect (unknown paths 404)
└── _legacy-react-bundle/   previous compiled React build (kept for reference)
```

## Static page generation

Module, pillar, platform, company, legal and 404 pages are **generated** from the
`M` object in `assets/modules.js` — the single source of truth. Do **not** hand-edit
the generated `index.html` files under `modules/`, `pillars/`, etc.; they are
overwritten. Edit content in `assets/modules.js` (or the data tables in
`scripts/build-pages.mjs` for pillar/company/legal copy), then rebuild:

```
node scripts/build-pages.mjs
```

This also writes `sitemap.xml`, `robots.txt`, `404.html`, and the responsive
hero/OG images are prebuilt in `assets/`. Routing uses Vercel `cleanUrls`, so a
file at `modules/uld/index.html` serves at `/modules/uld` and unknown paths 404.

## 80 / 20 content model

The **homepage** carries ~20% of the information — just enough to orient and
excite. Each module is a compact card (name · one-line value prop · three
capability bullets · **Learn more →**). No full feature lists on the homepage.

The **module pages** carry the other 80%. Every card links to
`/module.html?m=<id>`, which `modules.js` renders from a single content object
(hero, full capability grid, an in-practice visual, CTA) using the same
`site.css`. To edit or add a module's deep content, edit the `M` object at the
top of `assets/modules.js` — no new HTML file needed.

Homepage sections: Hero · Trusted By · Platform Overview · Cargo Journey ·
Commercial · Operations · Financial · Digital Platform · Integrations · CTA.

## Page structure (information architecture)

Positioned as **EMC Aviation Commerce Platform → Products → Airline Cargo Suite**.

1. **Nav** — Products (Airline Cargo Suite + GSA/Forwarder/Warehouse roadmap),
   Platform, Resources, Company, Sign in, Request demo.
2. **Hero** — "Transforming cargo operations through connected aviation commerce."
3. **Cargo Lifecycle** — the 9-stage journey: Inquiry → Quotation → Booking →
   Air Waybill → Acceptance → Manifest → Flight Ops → Tracking → Revenue.
4. **Stats** — business-value framing (40% faster booking, 100% digital AWB,
   real-time visibility, no-code, IATA-compliant, multi-airline).
5. **Modules** — tabbed by domain: Commercial / Operations / Financial / Platform.
6. **Deep dives** — Inquiry Management, Rate & Tariff, Booking, Air Waybill,
   Shipment Acceptance & Manifest, Tracking, Broadcasting.
7. **Platform** — the low-code / configurable story (dynamic forms, workflows,
   rules, API gateway, OneRecord, Cargo XML/IMP, AI services, analytics).
8. **Standards & connectivity**, **stakeholders**, **product family**, CTA, footer.

No fabricated metrics, customer names or testimonials — mock UI cards show
generic, illustrative states only.

## Demo modal (EmailJS)

Any button/link labelled "Request demo" / "Request Enterprise Demo" opens a
two-panel enterprise contact panel (name, job title, work email, company,
segment, optional message). On submit it calls the EmailJS API, which sends the
template through the connected Gmail:

- **To Email** `{{email}}` → the visitor gets the branded confirmation
- **Bcc** your inbox → you get a copy of every request
- **Reply To** your inbox → visitor replies come to you

EmailJS settings live at the top of `assets/demo-modal.js`:

```js
var EMAILJS = {
  serviceId: "service_latp17q",
  templateId: "template_i7cw395",
  publicKey: "h4opC1LV8uTO5XPjs"
};
```

Extra fields (`role`, `segment`, `message`) are passed as template params too —
add `{{role}}`, `{{segment}}`, `{{message}}` to your EmailJS template to include
them in the email. The core `{{name}}` / `{{email}}` / `{{company}}` params are
unchanged, so existing templates keep working.

The public key is safe to expose in frontend code. To stop other sites using
your quota: EmailJS dashboard → Account → Security → enable "Allow only from
specific domains" and add your site's domain.

## Local preview

```
python3 -m http.server 8899
# open http://localhost:8899/
```

