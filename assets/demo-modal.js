/* EMC demo-request modal — attaches to any button/link labelled
   "Request demo" / "Request Enterprise Demo". Sends via EmailJS.
   Redesigned as a two-panel enterprise contact panel. */
(function () {
  "use strict";

  var MATCH = /^(request\s+(enterprise\s+)?demo)$/i;

  // EmailJS configuration
  var EMAILJS = {
    serviceId: "service_latp17q",
    templateId: "template_i7cw395",
    publicKey: "h4opC1LV8uTO5XPjs"
  };

  var css =
    "#emc-demo-overlay{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;padding:24px;background:rgba(3,5,11,.74);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);opacity:0;transition:opacity .28s ease;font-family:Inter,system-ui,sans-serif}" +
    "#emc-demo-overlay.emc-open{opacity:1}" +
    "#emc-demo-modal{position:relative;width:100%;max-width:820px;display:grid;grid-template-columns:1fr 1.15fr;background:#0a0f1e;border:1px solid rgba(255,255,255,.12);border-radius:22px;overflow:hidden;box-shadow:0 40px 120px rgba(0,0,0,.6),0 0 0 1px rgba(37, 99, 235,.10);color:#f3f6fc;transform:translateY(18px) scale(.985);transition:transform .28s cubic-bezier(.2,.7,.3,1)}" +
    "#emc-demo-overlay.emc-open #emc-demo-modal{transform:none}" +
    // left aside
    "#emc-demo-aside{position:relative;padding:34px 30px;background:radial-gradient(420px 300px at 20% 0%,rgba(37, 99, 235,.16),transparent 65%),linear-gradient(180deg,#0d1424,#0a0f1e);border-right:1px solid rgba(255,255,255,.08);display:flex;flex-direction:column}" +
    "#emc-demo-aside .emc-brand{display:flex;align-items:center;gap:10px;font-weight:700;font-size:16px;letter-spacing:-.02em}" +
    "#emc-demo-aside .emc-logo{width:30px;height:30px;border-radius:8px;display:grid;place-items:center;background:linear-gradient(135deg,#2563eb,#3b82f6);box-shadow:0 6px 18px rgba(37, 99, 235,.35)}" +
    "#emc-demo-aside h2{margin:26px 0 10px;font-size:23px;font-weight:700;letter-spacing:-.02em;line-height:1.2}" +
    "#emc-demo-aside p.emc-lead{margin:0;font-size:13.5px;line-height:1.6;color:#b7c0d4}" +
    "#emc-demo-aside ul{list-style:none;padding:0;margin:24px 0 0;display:grid;gap:13px}" +
    "#emc-demo-aside li{display:flex;gap:10px;align-items:flex-start;font-size:13px;color:#cdd5e6}" +
    "#emc-demo-aside li svg{flex:none;width:16px;height:16px;margin-top:1px;color:#60a5fa}" +
    "#emc-demo-aside .emc-aside-foot{margin-top:auto;padding-top:24px;font-size:12px;color:#7c869c;line-height:1.5}" +
    // right form
    "#emc-demo-main{padding:34px 32px}" +
    "#emc-demo-main .emc-eyebrow{font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#60a5fa;margin:0 0 6px}" +
    "#emc-demo-main h3{margin:0 0 4px;font-size:21px;font-weight:700;letter-spacing:-.02em}" +
    "#emc-demo-main p.emc-sub{margin:0 0 22px;font-size:13.5px;color:#8a93a8;line-height:1.5}" +
    "#emc-demo-form .emc-row{display:grid;grid-template-columns:1fr 1fr;gap:14px}" +
    "#emc-demo-modal label{display:block;font-size:11.5px;font-weight:600;color:#9aa4ba;margin:0 0 6px;letter-spacing:.02em}" +
    "#emc-demo-modal label .req{color:#60a5fa}" +
    "#emc-demo-modal .emc-field{margin-bottom:15px}" +
    "#emc-demo-modal input,#emc-demo-modal select,#emc-demo-modal textarea{width:100%;box-sizing:border-box;background:rgba(255,255,255,.045);border:1px solid rgba(255,255,255,.13);border-radius:11px;color:#fff;font:inherit;font-size:14px;padding:11px 13px;outline:none;transition:border-color .15s,box-shadow .15s}" +
    "#emc-demo-modal input::placeholder,#emc-demo-modal textarea::placeholder{color:#5c6478}" +
    "#emc-demo-modal input:focus,#emc-demo-modal select:focus,#emc-demo-modal textarea:focus{border-color:#3b82f6;box-shadow:0 0 0 3px rgba(37, 99, 235,.16)}" +
    "#emc-demo-modal select{appearance:none;-webkit-appearance:none;background-image:url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%237c869c' stroke-width='2.4'><path d='M6 9l6 6 6-6'/></svg>\");background-repeat:no-repeat;background-position:right 13px center;padding-right:36px}" +
    "#emc-demo-modal textarea{resize:vertical;min-height:64px}" +
    "#emc-demo-submit{width:100%;margin-top:6px;background:#2563eb;color:#fff;border:0;border-radius:11px;font:inherit;font-size:15px;font-weight:600;padding:13px 20px;cursor:pointer;transition:background .15s,box-shadow .15s;box-shadow:none}" +
    "#emc-demo-submit:hover{background:#3b82f6;box-shadow:0 12px 38px rgba(37, 99, 235,.4)}" +
    "#emc-demo-submit:disabled{opacity:.65;cursor:default}" +
    "#emc-demo-privacy{margin:14px 0 0;font-size:11.5px;color:#6b7488;line-height:1.5;text-align:center}" +
    "#emc-demo-close{position:absolute;top:14px;right:14px;width:34px;height:34px;border:0;border-radius:9px;background:rgba(255,255,255,.07);color:rgba(255,255,255,.7);font-size:15px;line-height:34px;cursor:pointer;z-index:3;transition:background .15s}" +
    "#emc-demo-close:hover{background:rgba(255,255,255,.16)}" +
    "#emc-demo-msg{margin:16px 0 0;font-size:13.5px;text-align:center;line-height:1.5}" +
    "#emc-demo-msg.emc-err{color:#f87171}" +
    // success state
    "#emc-demo-success{display:none;padding:20px 6px 6px;text-align:center}" +
    "#emc-demo-success .emc-tick{width:60px;height:60px;margin:0 auto 18px;border-radius:50%;display:grid;place-items:center;background:rgba(37, 99, 235,.12);border:1px solid rgba(37, 99, 235,.3);color:#60a5fa}" +
    "#emc-demo-success h3{font-size:20px;margin:0 0 8px}" +
    "#emc-demo-success p{font-size:14px;color:#b7c0d4;line-height:1.6;margin:0 auto;max-width:34ch}" +
    ".emc-hp{position:absolute;left:-9999px;opacity:0;height:0;overflow:hidden}" +
    "@media(max-width:720px){#emc-demo-modal{grid-template-columns:1fr;max-width:440px}#emc-demo-aside{display:none}#emc-demo-form .emc-row{grid-template-columns:1fr}}";

  var style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  var overlay = null;

  function close() {
    if (!overlay) return;
    overlay.classList.remove("emc-open");
    var o = overlay;
    overlay = null;
    setTimeout(function () { o.remove(); }, 280);
    document.removeEventListener("keydown", onKey);
  }

  function onKey(e) { if (e.key === "Escape") close(); }

  var CHECK = "<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2.6'><path d='M20 6 9 17l-5-5'/></svg>";

  function open() {
    if (overlay) return;
    overlay = document.createElement("div");
    overlay.id = "emc-demo-overlay";
    overlay.innerHTML =
      '<div id="emc-demo-modal" role="dialog" aria-modal="true" aria-label="Request a demo">' +
        '<button id="emc-demo-close" aria-label="Close">✕</button>' +

        '<aside id="emc-demo-aside">' +
          '<div class="emc-brand"><span class="emc-logo"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="17" height="17"><path d="M2 12l19-8-4 9 4 9z"/></svg></span>EMC</div>' +
          '<h2>See the Airline Cargo Suite on your operation.</h2>' +
          '<p class="emc-lead">A member of our team will walk you through the complete cargo lifecycle and answer questions specific to your network.</p>' +
          '<ul>' +
            '<li>' + CHECK + '<span>A tailored walkthrough, not a generic pitch</span></li>' +
            '<li>' + CHECK + '<span>Mapped to your cargo lifecycle end to end</span></li>' +
            '<li>' + CHECK + '<span>Discussion of standards &amp; integrations</span></li>' +
          '</ul>' +
          '<div class="emc-aside-foot">Prefer email? We’ll follow up at the address you provide.</div>' +
        '</aside>' +

        '<div id="emc-demo-main">' +
          '<div id="emc-demo-formwrap">' +
            '<p class="emc-eyebrow">Request a demo</p>' +
            '<h3>Tell us about you</h3>' +
            '<p class="emc-sub">We’ll be in touch within one business day.</p>' +
            '<form id="emc-demo-form" novalidate>' +
              '<div class="emc-row">' +
                '<div class="emc-field"><label for="emc-f-name">Full name <span class="req">*</span></label><input id="emc-f-name" name="name" type="text" autocomplete="name" placeholder="Jane Doe" required></div>' +
                '<div class="emc-field"><label for="emc-f-role">Job title</label><input id="emc-f-role" name="role" type="text" autocomplete="organization-title" placeholder="Cargo Director"></div>' +
              '</div>' +
              '<div class="emc-field"><label for="emc-f-email">Work email <span class="req">*</span></label><input id="emc-f-email" name="email" type="email" autocomplete="email" placeholder="jane@airline.com" required></div>' +
              '<div class="emc-row">' +
                '<div class="emc-field"><label for="emc-f-company">Company <span class="req">*</span></label><input id="emc-f-company" name="company" type="text" autocomplete="organization" placeholder="Airline / organization" required></div>' +
                '<div class="emc-field"><label for="emc-f-role-type">I am a…</label><select id="emc-f-role-type" name="segment"><option value="">Select</option><option>Airline / carrier</option><option>Ground handler</option><option>GSA</option><option>Freight forwarder</option><option>Airport community</option><option>Other</option></select></div>' +
              '</div>' +
              '<div class="emc-field"><label for="emc-f-msg">What would you like to see? <span style="color:#5c6478;font-weight:500">(optional)</span></label><textarea id="emc-f-msg" name="message" placeholder="Modules of interest, timelines, current systems…"></textarea></div>' +
              '<div class="emc-hp" aria-hidden="true"><label>Leave this empty<input name="website" type="text" tabindex="-1" autocomplete="off"></label></div>' +
              '<button id="emc-demo-submit" type="submit">Request my demo</button>' +
              '<p id="emc-demo-privacy">We’ll only use your details to arrange your demo. No spam, ever.</p>' +
            '</form>' +
            '<p id="emc-demo-msg"></p>' +
          '</div>' +
          '<div id="emc-demo-success">' +
            '<div class="emc-tick"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" width="28" height="28"><path d="M20 6 9 17l-5-5"/></svg></div>' +
            '<h3 id="emc-demo-success-h">Request received</h3>' +
            '<p id="emc-demo-success-p"></p>' +
          '</div>' +
        '</div>' +
      '</div>';

    document.body.appendChild(overlay);
    requestAnimationFrame(function () { overlay.classList.add("emc-open"); });

    overlay.addEventListener("click", function (e) { if (e.target === overlay) close(); });
    overlay.querySelector("#emc-demo-close").addEventListener("click", close);
    document.addEventListener("keydown", onKey);

    overlay.querySelector("#emc-demo-form").addEventListener("submit", function (e) {
      e.preventDefault();
      var f = e.target;
      var msg = overlay.querySelector("#emc-demo-msg");
      var btn = overlay.querySelector("#emc-demo-submit");
      var data = {
        name: f.name.value.trim(),
        role: f.role.value.trim(),
        email: f.email.value.trim(),
        company: f.company.value.trim(),
        segment: f.segment.value,
        message: f.message.value.trim(),
        website: f.website.value // honeypot
      };
      msg.className = "";
      if (!data.name || !data.company || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)) {
        msg.className = "emc-err";
        msg.textContent = "Please add your name, a valid work email, and company.";
        return;
      }

      function showSuccess() {
        overlay.querySelector("#emc-demo-formwrap").style.display = "none";
        var s = overlay.querySelector("#emc-demo-success");
        overlay.querySelector("#emc-demo-success-p").textContent =
          "Thanks " + data.name.split(" ")[0] + " — we’ve sent a confirmation to " + data.email +
          " and our team will reach out within one business day to arrange your demo.";
        s.style.display = "block";
      }

      if (data.website) { showSuccess(); return; } // honeypot: swallow bots

      btn.disabled = true;
      btn.textContent = "Sending…";
      fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: EMAILJS.serviceId,
          template_id: EMAILJS.templateId,
          user_id: EMAILJS.publicKey,
          template_params: {
            name: data.name,
            email: data.email,
            company: data.company,
            role: data.role,
            segment: data.segment,
            message: data.message
          }
        })
      })
        .then(function (r) {
          if (r.ok) { showSuccess(); }
          else { return r.text().then(function (t) { throw new Error(t || "Request failed"); }); }
        })
        .catch(function (err) {
          btn.disabled = false;
          btn.textContent = "Request my demo";
          msg.className = "emc-err";
          msg.textContent = err.message === "Failed to fetch"
            ? "Network error — please try again."
            : "Couldn’t send your request — please try again in a moment.";
          console.error("EmailJS error:", err.message);
        });
    });

    setTimeout(function () { overlay.querySelector("#emc-f-name").focus(); }, 300);
  }

  document.addEventListener("click", function (e) {
    var el = e.target.closest("button, a");
    if (!el) return;
    var label = (el.textContent || "").replace(/\s+/g, " ").trim();
    if (MATCH.test(label)) {
      e.preventDefault();
      e.stopPropagation();
      open();
    }
  }, true);
})();

