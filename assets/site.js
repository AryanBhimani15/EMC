/* ============================================================
   EMC Aviation Commerce Platform — Site JavaScript
   Nav scroll behavior, mobile menu, scroll reveal & Theme Toggle
   ============================================================ */

   (function() {
    // 1. Immediately restore saved theme from localStorage
    var savedTheme = localStorage.getItem("emc_theme") || "dark";
    document.documentElement.setAttribute("data-theme", savedTheme);
  
    document.addEventListener("DOMContentLoaded", function() {
      // Enable JS reveal animations safely
      document.body.classList.add("js-loaded");
  
      // 2. Theme Toggle Event
      var themeBtn = document.getElementById("themeToggle");
      if (themeBtn) {
        themeBtn.addEventListener("click", function() {
          var current = document.documentElement.getAttribute("data-theme") || "dark";
          var next = current === "dark" ? "light" : "dark";
          document.documentElement.setAttribute("data-theme", next);
          localStorage.setItem("emc_theme", next);
        });
      }
  
      // 3. Nav Scrolled Class
      var nav = document.getElementById("nav");
      if (nav) {
        window.addEventListener("scroll", function() {
          if (window.scrollY > 20) {
            nav.classList.add("scrolled");
          } else {
            nav.classList.remove("scrolled");
          }
        });
      }
  
      // 4. Mobile Menu Toggle
      var navToggle = document.getElementById("navToggle");
      var mobileMenu = document.getElementById("mobileMenu");
      if (navToggle && mobileMenu) {
        navToggle.addEventListener("click", function() {
          mobileMenu.classList.toggle("open");
        });
        mobileMenu.querySelectorAll("a").forEach(function(link) {
          link.addEventListener("click", function() {
            mobileMenu.classList.remove("open");
          });
        });
      }
  
      // 5. Scroll Reveal Animation
      var reveals = document.querySelectorAll(".reveal");
      if ("IntersectionObserver" in window) {
        var observer = new IntersectionObserver(function(entries) {
          entries.forEach(function(entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("in");
            }
          });
        }, { threshold: 0.05 });
  
        reveals.forEach(function(el) {
          observer.observe(el);
        });
      } else {
        reveals.forEach(function(el) {
          el.classList.add("in");
        });
      }
    });
  })();