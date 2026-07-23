/* ============================================================
   EMC Aviation Commerce Platform — Site JavaScript
   Nav scroll behavior, mobile menu, dropdown a11y,
   scroll reveal & Theme Toggle
   ============================================================ */

(function () {
  // 1. Synchronous setup (runs before DOMContentLoaded to avoid reveal flicker)
  //    Theme: saved preference, else OS default, else dark.
  var savedTheme = localStorage.getItem("emc_theme");
  var theme = savedTheme
    || (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.className += " js-loaded";

  function syncThemeButton(t) {
    var btn = document.getElementById("themeToggle");
    if (!btn) return;
    var isLight = t === "light";
    btn.setAttribute("aria-pressed", String(isLight));
    btn.setAttribute("aria-label", isLight ? "Switch to dark theme" : "Switch to light theme");
  }

  document.addEventListener("DOMContentLoaded", function () {
    syncThemeButton(theme);

    // 2. Theme Toggle
    var themeBtn = document.getElementById("themeToggle");
    if (themeBtn) {
      themeBtn.addEventListener("click", function () {
        var current = document.documentElement.getAttribute("data-theme") || "dark";
        var next = current === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem("emc_theme", next);
        syncThemeButton(next);
      });
    }

    // 3. Nav Scrolled Class
    var nav = document.getElementById("nav");
    if (nav) {
      window.addEventListener("scroll", function () {
        if (window.scrollY > 20) nav.classList.add("scrolled");
        else nav.classList.remove("scrolled");
      });
    }

    // 4. Mobile Menu Toggle
    var navToggle = document.getElementById("navToggle");
    var mobileMenu = document.getElementById("mobileMenu");
    if (navToggle && mobileMenu) {
      navToggle.addEventListener("click", function () {
        var open = mobileMenu.classList.toggle("open");
        navToggle.setAttribute("aria-expanded", String(open));
      });
      mobileMenu.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
          mobileMenu.classList.remove("open");
          navToggle.setAttribute("aria-expanded", "false");
        });
      });
    }

    // 5. Keyboard-operable dropdowns (Products / Resources)
    var dropdownBtns = document.querySelectorAll(".nav-item > button[aria-haspopup]");
    function closeDropdown(btn, refocus) {
      btn.setAttribute("aria-expanded", "false");
      if (refocus) btn.focus();
    }
    dropdownBtns.forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        var expanded = btn.getAttribute("aria-expanded") === "true";
        // close others
        dropdownBtns.forEach(function (b) { if (b !== btn) b.setAttribute("aria-expanded", "false"); });
        btn.setAttribute("aria-expanded", String(!expanded));
      });
      btn.addEventListener("keydown", function (e) {
        if (e.key === "Escape") closeDropdown(btn, true);
      });
      // Escape anywhere inside the open dropdown returns focus to the button
      var item = btn.closest(".nav-item");
      if (item) {
        item.addEventListener("keydown", function (e) {
          if (e.key === "Escape" && btn.getAttribute("aria-expanded") === "true") closeDropdown(btn, true);
        });
      }
    });
    // Close on outside click
    document.addEventListener("click", function (e) {
      dropdownBtns.forEach(function (btn) {
        var item = btn.closest(".nav-item");
        if (item && !item.contains(e.target)) btn.setAttribute("aria-expanded", "false");
      });
    });

    // 6. Scroll Reveal Animation
    var reveals = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.05 });
      reveals.forEach(function (el) { observer.observe(el); });
    } else {
      reveals.forEach(function (el) { el.classList.add("in"); });
    }
  });
})();
