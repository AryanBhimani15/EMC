# EMC Cargo Suite — site

Static site with a demo-request modal powered by EmailJS — no backend, no
env vars. Works on any static host (Vercel, GitHub Pages, GoDaddy).

```
├── index.html              site entry (modal script wired in)
├── favicon.svg
├── assets/
│   ├── index-D8kQn2vF.js   app bundle (cleaned — no fabricated data)
│   ├── index-5XO12u1U.css  app styles
│   └── demo-modal.js       demo request modal → sends via EmailJS
└── vercel.json             SPA rewrite (leaves /assets alone)
```

## How it works

Every "Request demo" / "Request Enterprise Demo" button opens a styled modal
(name, work email, company). On submit it calls the EmailJS API, which sends
your template through your connected Gmail:

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

Change the email copy anytime in the EmailJS dashboard (Email Templates) —
no redeploy needed. Free tier: 200 emails/month (1 per request with the
Bcc setup).

The public key is safe to expose in frontend code (that's what it's for).
To stop other sites from using your quota, lock it down: EmailJS dashboard →
Account → Security → enable **"Allow only from specific domains"** and add
your site's domain.

If you later rebuild the app from source and the bundle filenames change
(`index-XXXX.js`), keep the `<script defer src="/assets/demo-modal.js">` line
in the new `index.html` and everything keeps working.
