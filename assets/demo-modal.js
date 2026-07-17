/* EMC Cargo Suite — demo request modal.
 * Self-contained: injects its own styles and markup, and attaches to every
 * existing "Request demo" / "Request Enterprise Demo" button on the page
 * via event delegation. No changes to the app bundle required.
 * Submits to /api/demo (Vercel serverless function).
 */
(function () {
  "use strict";

  var API_URL = "/api/demo";
  var TRIGGER = /request\s+(enterprise\s+)?demo/i;

  /* ---------- styles ---------- */
  var css = [
    ".emcm-overlay{position:fixed;inset:0;z-index:2147483000;display:flex;align-items:center;justify-content:center;padding:16px;background:rgba(2,4,8,.82);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);opacity:0;transition:opacity .18s ease;font-family:Inter,system-ui,-apple-system,sans-serif}",
    ".emcm-overlay.emcm-show{opacity:1}",
    ".emcm-panel{position:relative;width:100%;max-width:440px;background:#0A0F1E;border:1px solid rgba(255,255,255,.1);border-radius:16px;box-shadow:0 0 80px rgba(37,99,235,.15);transform:translateY(20px) scale(.98);transition:transform .22s cubic-bezier(.16,1,.3,1);overflow:hidden}",
    ".emcm-overlay.emcm-show .emcm-panel{transform:translateY(0) scale(1)}",
    ".emcm-accent{height:1px;width:100%;background:linear-gradient(90deg,transparent,rgba(59,130,246,.6),transparent)}",
    ".emcm-body{padding:28px 28px 24px}",
    ".emcm-close{position:absolute;top:14px;right:14px;background:none;border:0;padding:7px;border-radius:999px;color:rgba(255,255,255,.4);cursor:pointer;line-height:0;transition:color .15s,background .15s}",
    ".emcm-close:hover{color:#fff;background:rgba(255,255,255,.1)}",
    ".emcm-close:focus-visible,.emcm-input:focus-visible,.emcm-submit:focus-visible,.emcm-ok-btn:focus-visible{outline:2px solid rgba(59,130,246,.6);outline-offset:2px}",
    ".emcm-title{margin:0;color:#fff;font-size:20px;font-weight:600;letter-spacing:-.01em}",
    ".emcm-sub{margin:6px 0 20px;color:rgba(255,255,255,.5);font-size:14px;line-height:1.5}",
    ".emcm-input{display:block;width:100%;box-sizing:border-box;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:12px;padding:12px 16px;margin-bottom:10px;color:#fff;font-size:14px;font-family:inherit;transition:border-color .15s,background .15s;outline:none}",
    ".emcm-input::placeholder{color:rgba(255,255,255,.3)}",
    ".emcm-input:focus{border-color:rgba(59,130,246,.6);background:rgba(255,255,255,.06)}",
    "textarea.emcm-input{resize:none;min-height:76px}",
    ".emcm-hp{position:absolute;left:-9999px;width:1px;height:1px;opacity:0}",
    ".emcm-error{display:none;color:rgba(248,113,113,.9);font-size:13px;margin:2px 0 0}",
    ".emcm-error.emcm-show{display:block}",
    ".emcm-submit{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;margin-top:16px;background:#2563EB;border:0;border-radius:999px;padding:13px 32px;color:#fff;font-size:15px;font-weight:600;font-family:inherit;cursor:pointer;box-shadow:0 0 30px rgba(37,99,235,.35);transition:background .15s,box-shadow .15s,opacity .15s}",
    ".emcm-submit:hover{background:#3B82F6;box-shadow:0 0 40px rgba(37,99,235,.5)}",
    ".emcm-submit:disabled{opacity:.6;cursor:not-allowed}",
    ".emcm-submit .emcm-arrow{transition:transform .15s}",
    ".emcm-submit:hover .emcm-arrow{transform:translateX(4px)}",
    ".emcm-note{margin:14px 0 0;text-align:center;color:rgba(255,255,255,.3);font-size:12px}",
    ".emcm-success{display:none;text-align:center;padding:24px 0 8px}",
    ".emcm-success.emcm-show{display:block}",
    ".emcm-form.emcm-hide{display:none}",
    ".emcm-check{width:44px;height:44px;margin:0 auto 14px;display:block;color:#60A5FA}",
    ".emcm-ok-title{margin:0 0 8px;color:#fff;font-size:17px;font-weight:600}",
    ".emcm-ok-sub{margin:0 0 22px;color:rgba(255,255,255,.5);font-size:14px;line-height:1.55}",
    ".emcm-ok-btn{background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.15);border-radius:999px;padding:10px 26px;color:#fff;font-size:14px;font-weight:600;font-family:inherit;cursor:pointer;transition:background .15s}",
    ".emcm-ok-btn:hover{background:rgba(255,255,255,.15)}",
    ".emcm-spin{animation:emcm-rot .8s linear infinite}",
    "@keyframes emcm-rot{to{transform:rotate(360deg)}}",
    "@media (prefers-reduced-motion:reduce){.emcm-overlay,.emcm-panel,.emcm-submit .emcm-arrow{transition:none}.emcm-spin{animation-duration:1.6s}}",
    "body.emcm-lock{overflow:hidden}"
  ].join("");

  /* ---------- markup ---------- */
  var ARROW =
    '<svg class="emcm-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
  var SPINNER =
    '<svg class="emcm-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M21 12a9 9 0 1 1-6.2-8.56"/></svg>';
  var CHECK =
    '<svg class="emcm-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="m8.5 12.5 2.5 2.5 4.5-5"/></svg>';
  var X =
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>';

  var overlay, lastFocused;

  function build() {
    var style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);

    overlay = document.createElement("div");
    overlay.className = "emcm-overlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-labelledby", "emcm-title");
    overlay.style.display = "none";
    overlay.innerHTML =
      '<div class="emcm-panel">' +
      '<div class="emcm-accent"></div>' +
      '<button type="button" class="emcm-close" aria-label="Close">' + X + "</button>" +
      '<div class="emcm-body">' +
      '<div class="emcm-form">' +
      '<h3 class="emcm-title" id="emcm-title">Request a demo</h3>' +
      '<p class="emcm-sub">See EMC Cargo Suite running on your routes and volumes.</p>' +
      '<input class="emcm-input" name="name" placeholder="Full name" autocomplete="name">' +
      '<input class="emcm-input" name="email" type="email" placeholder="Work email" autocomplete="email">' +
      '<input class="emcm-input" name="company" placeholder="Airline / company" autocomplete="organization">' +
      '<textarea class="emcm-input" name="message" rows="3" placeholder="Anything specific you want to see? (optional)"></textarea>' +
      '<input class="emcm-hp" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">' +
      '<p class="emcm-error" role="alert"></p>' +
      '<button type="button" class="emcm-submit">Send request ' + ARROW + "</button>" +
      '<p class="emcm-note">No spam. We only use this to schedule your demo.</p>' +
      "</div>" +
      '<div class="emcm-success">' + CHECK +
      '<h3 class="emcm-ok-title">Request received</h3>' +
      '<p class="emcm-ok-sub">Our team will reach out within one business day to schedule your walkthrough of EMC Cargo Suite.</p>' +
      '<button type="button" class="emcm-ok-btn">Close</button>' +
      "</div></div></div>";
    document.body.appendChild(overlay);

    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) close();
    });
    overlay.querySelector(".emcm-close").addEventListener("click", close);
    overlay.querySelector(".emcm-ok-btn").addEventListener("click", close);
    overlay.querySelector(".emcm-submit").addEventListener("click", submit);
    overlay.querySelectorAll(".emcm-input").forEach(function (el) {
      el.addEventListener("keydown", function (e) {
        if (e.key === "Enter" && el.tagName !== "TEXTAREA") {
          e.preventDefault();
          submit();
        }
      });
    });
  }

  function open() {
    if (!overlay) build();
    lastFocused = document.activeElement;
    overlay.querySelector(".emcm-form").classList.remove("emcm-hide");
    overlay.querySelector(".emcm-success").classList.remove("emcm-show");
    setError("");
    overlay.style.display = "flex";
    document.body.classList.add("emcm-lock");
    requestAnimationFrame(function () {
      overlay.classList.add("emcm-show");
      var first = overlay.querySelector('[name="name"]');
      if (first) first.focus();
    });
  }

  function close() {
    overlay.classList.remove("emcm-show");
    document.body.classList.remove("emcm-lock");
    setTimeout(function () {
      overlay.style.display = "none";
      if (lastFocused && lastFocused.focus) lastFocused.focus();
    }, 190);
  }

  function setError(msg) {
    var el = overlay.querySelector(".emcm-error");
    el.textContent = msg;
    el.classList.toggle("emcm-show", !!msg);
  }

  function val(name) {
    return overlay.querySelector('[name="' + name + '"]').value.trim();
  }

  var sending = false;

  function submit() {
    if (sending) return;
    var payload = {
      name: val("name"),
      email: val("email"),
      company: val("company"),
      message: val("message"),
      website: val("website")
    };
    if (!payload.name || !payload.company || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
      setError("Name, work email and company are required.");
      return;
    }
    setError("");
    sending = true;
    var btn = overlay.querySelector(".emcm-submit");
    btn.disabled = true;
    btn.innerHTML = "Sending " + SPINNER;

    fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
      .then(function (res) {
        return res.json().catch(function () { return {}; }).then(function (data) {
          if (!res.ok || !data.ok) throw new Error(data.error || "Something went wrong. Try again shortly.");
          overlay.querySelector(".emcm-form").classList.add("emcm-hide");
          overlay.querySelector(".emcm-success").classList.add("emcm-show");
          overlay.querySelectorAll(".emcm-input").forEach(function (el) { el.value = ""; });
        });
      })
      .catch(function (err) {
        setError(err && err.message ? err.message : "Network error. Try again.");
      })
      .then(function () {
        sending = false;
        btn.disabled = false;
        btn.innerHTML = "Send request " + ARROW;
      });
  }

  /* ---------- hook existing buttons (works with the React bundle) ---------- */
  document.addEventListener(
    "click",
    function (e) {
      var el = e.target && e.target.closest ? e.target.closest("button, a") : null;
      if (!el || (overlay && overlay.contains(el))) return;
      if (TRIGGER.test(el.textContent || "")) {
        e.preventDefault();
        e.stopPropagation();
        open();
      }
    },
    true
  );

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && overlay && overlay.classList.contains("emcm-show")) close();
  });

  // Optional manual hook: window.openDemoModal()
  window.openDemoModal = open;
})();
