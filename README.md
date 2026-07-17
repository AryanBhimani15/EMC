# EMC Cargo Suite — site

Static site + serverless demo-request form, ready for Vercel.

```
├── index.html              site entry (meta tags fixed, modal script wired in)
├── favicon.svg
├── assets/
│   ├── index-CyqSC429.js   app bundle
│   ├── index-5XO12u1U.css  app styles
│   └── demo-modal.js       demo request modal (auto-attaches to the buttons)
├── api/
│   └── demo.js             POST /api/demo → sends email via Resend
├── vercel.json             SPA rewrite (leaves /api and /assets alone)
└── package.json
```

## Deploy

1. Push this folder to a GitHub repo.
2. Vercel → **Add New → Project** → import the repo.
   Framework preset: **Other**. Build command: leave **empty**.
   Output directory: leave default.
3. Before deploying, add Environment Variables (Settings → Environment Variables):

| Name             | Value                                            |
|------------------|--------------------------------------------------|
| `RESEND_API_KEY` | your key from resend.com (free, 100 emails/day)  |
| `DEMO_TO_EMAIL`  | the inbox where demo requests should land        |

4. Deploy. Done — every "Request demo" / "Request Enterprise Demo" button on
   the site now opens the form, and submissions arrive by email.

## Resend notes

- Until you verify a domain in Resend, emails send from
  `onboarding@resend.dev` and can only be delivered to **the email you signed
  up to Resend with** — set `DEMO_TO_EMAIL` to that address to test.
- To send from your own domain: Resend → Domains → add domain → add their
  SPF/DKIM DNS records → then add a third env var
  `DEMO_FROM_EMAIL` = `EMC Cargo Suite <demo@yourdomain.com>` and redeploy.
- Env var changes only apply to **new** deployments — redeploy after editing.

## How the modal works

The site bundle is a compiled build, so instead of rebuilding it,
`assets/demo-modal.js` listens for clicks on any button/link whose label
matches "Request demo" or "Request Enterprise Demo" and opens a styled modal
(dark navy, blue glow — matches the site). It POSTs to `/api/demo`, which
validates the input (plus a honeypot spam trap) and emails you via Resend.

If you later rebuild the app from source and the bundle filenames change
(`index-XXXX.js`), keep the `<script defer src="/assets/demo-modal.js">` line
in the new `index.html` and everything keeps working.
