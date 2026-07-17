// POST /api/demo — receives demo requests from the site and emails them via Resend.
//
// Required env var (Vercel → Project → Settings → Environment Variables):
//   RESEND_API_KEY   your key from resend.com
//
// Optional env vars:
//   DEMO_TO_EMAIL    where requests land (default below)
//   DEMO_FROM_EMAIL  verified sender. Until you verify your domain in Resend,
//                    leave unset — onboarding@resend.dev works out of the box
//                    but can ONLY deliver to the email you signed up with.

const TO = process.env.DEMO_TO_EMAIL || "sales@yourdomain.com";
const FROM =
  process.env.DEMO_FROM_EMAIL || "EMC Cargo Suite <onboarding@resend.dev>";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const clean = (v, max) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const body = req.body || {};

  // Honeypot — real users never fill this hidden field. Pretend success for bots.
  if (body.website) return res.status(200).json({ ok: true });

  const name = clean(body.name, 100);
  const email = clean(body.email, 150);
  const company = clean(body.company, 150);
  const message = clean(body.message, 2000);

  if (!name || !company || !EMAIL_RE.test(email)) {
    return res
      .status(400)
      .json({ ok: false, error: "Name, work email and company are required." });
  }

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        reply_to: email,
        subject: `Demo request — ${company}`,
        text: [
          `Name:    ${name}`,
          `Email:   ${email}`,
          `Company: ${company}`,
          "",
          message || "(no message)",
          "",
          "— Sent from the EMC Cargo Suite demo form",
        ].join("\n"),
      }),
    });

    if (!r.ok) {
      const detail = await r.text().catch(() => "");
      console.error("Resend error:", r.status, detail);
      return res
        .status(502)
        .json({ ok: false, error: "Email service failed. Try again shortly." });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Demo handler error:", err);
    return res
      .status(500)
      .json({ ok: false, error: "Something went wrong. Try again shortly." });
  }
}
