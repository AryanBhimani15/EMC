/* EMC demo-request modal — attaches to any button/link labelled
   "Request demo" / "Request Enterprise Demo". POSTs to /api/demo. */
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
    "#emc-demo-overlay{position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;padding:24px;background:rgba(2,4,8,.72);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);opacity:0;transition:opacity .25s ease}" +
    "#emc-demo-overlay.emc-open{opacity:1}" +
    "#emc-demo-modal{width:100%;max-width:460px;background:#0A0F1E;border:1px solid rgba(255,255,255,.12);border-radius:24px;padding:36px 32px;box-shadow:0 0 80px rgba(37,99,235,.25),0 24px 60px rgba(0,0,0,.6);font-family:Inter,system-ui,sans-serif;color:#fff;transform:translateY(16px);transition:transform .25s ease}" +
    "#emc-demo-overlay.emc-open #emc-demo-modal{transform:translateY(0)}" +
    "#emc-demo-modal h2{margin:0 0 6px;font-size:24px;font-weight:700;letter-spacing:-.02em}" +
    "#emc-demo-modal p.emc-sub{margin:0 0 24px;font-size:14px;color:rgba(255,255,255,.55);line-height:1.5}" +
    "#emc-demo-modal label{display:block;font-size:12px;font-weight:600;color:rgba(255,255,255,.6);margin:0 0 6px;text-transform:uppercase;letter-spacing:.04em}" +
    "#emc-demo-modal input,#emc-demo-modal textarea{width:100%;box-sizing:border-box;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.14);border-radius:12px;color:#fff;font:inherit;font-size:14px;padding:11px 14px;margin-bottom:16px;outline:none;transition:border-color .15s}" +
    "#emc-demo-modal input:focus,#emc-demo-modal textarea:focus{border-color:#3b82f6}" +
    "#emc-demo-modal textarea{resize:vertical;min-height:72px}" +
    "#emc-demo-submit{width:100%;background:#2563eb;color:#fff;border:0;border-radius:9999px;font:inherit;font-size:15px;font-weight:600;padding:13px 20px;cursor:pointer;transition:background .15s;box-shadow:0 0 28px rgba(37,99,235,.45)}" +
    "#emc-demo-submit:hover{background:#3b82f6}" +
    "#emc-demo-submit:disabled{opacity:.6;cursor:default}" +
    "#emc-demo-close{position:absolute;top:16px;right:16px;width:34px;height:34px;border:0;border-radius:9999px;background:rgba(255,255,255,.08);color:rgba(255,255,255,.7);font-size:16px;line-height:34px;cursor:pointer}" +
    "#emc-demo-close:hover{background:rgba(255,255,255,.16)}" +
    "#emc-demo-msg{margin:0;font-size:14px;text-align:center;line-height:1.5}" +
    "#emc-demo-msg.emc-ok{color:#4ade80}" +
    "#emc-demo-msg.emc-err{color:#f87171}" +
    ".emc-hp{position:absolute;left:-9999px;opacity:0;height:0;overflow:hidden}";

  var style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  var overlay = null;

  function close() {
    if (!overlay) return;
    overlay.classList.remove("emc-open");
    var o = overlay;
    overlay = null;
    setTimeout(function () { o.remove(); }, 250);
    document.removeEventListener("keydown", onKey);
  }

  function onKey(e) { if (e.key === "Escape") close(); }

  function open() {
    if (overlay) return;
    overlay = document.createElement("div");
    overlay.id = "emc-demo-overlay";
    overlay.innerHTML =
      '<div id="emc-demo-modal" style="position:relative" role="dialog" aria-modal="true" aria-label="Request a demo">' +
      '<button id="emc-demo-close" aria-label="Close">\u2715</button>' +
      "<h2>Request a demo</h2>" +
      '<p class="emc-sub">Leave your details and our team will reach out to schedule your demo.</p>' +
      '<form id="emc-demo-form" novalidate>' +
      '<label for="emc-f-name">Name</label>' +
      '<input id="emc-f-name" name="name" type="text" autocomplete="name" required>' +
      '<label for="emc-f-email">Work email</label>' +
      '<input id="emc-f-email" name="email" type="email" autocomplete="email" required>' +
      '<label for="emc-f-company">Company</label>' +
      '<input id="emc-f-company" name="company" type="text" autocomplete="organization" required>' +
      '<div class="emc-hp" aria-hidden="true"><label>Leave this empty<input name="website" type="text" tabindex="-1" autocomplete="off"></label></div>' +
      '<button id="emc-demo-submit" type="submit">Send request</button>' +
      "</form>" +
      '<p id="emc-demo-msg"></p>' +
      "</div>";
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
        email: f.email.value.trim(),
        company: f.company.value.trim(),
        website: f.website.value // honeypot
      };
      msg.className = "";
      if (!data.name || !data.company || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)) {
        msg.className = "emc-err";
        msg.textContent = "Please fill in your name, a valid work email, and company.";
        return;
      }
      if (data.website) { // honeypot: pretend success for bots, send nothing
        f.style.display = "none";
        msg.className = "emc-ok";
        msg.textContent = "Thanks \u2014 we\u2019ll be in touch shortly.";
        return;
      }
      btn.disabled = true;
      btn.textContent = "Sending\u2026";
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
            company: data.company
          }
        })
      })
        .then(function (r) {
          if (r.ok) {
            f.style.display = "none";
            msg.className = "emc-ok";
            msg.textContent = "Thanks " + data.name.split(" ")[0] + " \u2014 we\u2019ve sent a confirmation to " + data.email + ". Our team will be in touch shortly.";
          } else {
            return r.text().then(function (t) { throw new Error(t || "Request failed"); });
          }
        })
        .catch(function (err) {
          btn.disabled = false;
          btn.textContent = "Send request";
          msg.className = "emc-err";
          msg.textContent = err.message === "Failed to fetch"
            ? "Network error \u2014 please try again."
            : "Couldn\u2019t send your request \u2014 please try again in a moment.";
          console.error("EmailJS error:", err.message);
        });
    });

    setTimeout(function () { overlay.querySelector("#emc-f-name").focus(); }, 260);
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
