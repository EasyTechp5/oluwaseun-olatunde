/* Oluwaseun Olatunde — site behaviour. No dependencies. */
(function () {
  "use strict";

  // Update these in one place; the contact/booking forms open the visitor's mail app.
  var CONFIG = {
    email: "hello@oluwaseunolatunde.com",
  };

  var doc = document.documentElement;
  doc.classList.add("js");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} },
  };

  /* ---- Theme (system-aware, saved) ---- */
  var saved = store.get("theme");
  var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  function setTheme(t) {
    doc.setAttribute("data-theme", t);
    $$(".theme-toggle").forEach(function (b) { b.setAttribute("aria-pressed", String(t === "dark")); });
  }
  var qTheme = new URLSearchParams(location.search).get("theme");
  setTheme(qTheme === "dark" || qTheme === "light" ? qTheme : (saved || (prefersDark ? "dark" : "light")));
  $$(".theme-toggle").forEach(function (b) {
    b.addEventListener("click", function () {
      var next = doc.getAttribute("data-theme") === "dark" ? "light" : "dark";
      setTheme(next);
      store.set("theme", next);
    });
  });

  /* ---- Sticky header shrink ---- */
  var header = $(".site-header");
  function onScroll() {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 24);
    updateTimeline();
  }

  /* ---- Mobile menu ---- */
  var menuBtn = $(".menu-btn");
  var menu = $("#mobile-menu");
  function setMenu(open) {
    doc.classList.toggle("menu-open", open);
    if (menuBtn) { menuBtn.setAttribute("aria-expanded", String(open)); menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu"); }
    if (menu) menu.setAttribute("aria-hidden", String(!open));
    if (menu) $$("a", menu).forEach(function (a) { a.tabIndex = open ? 0 : -1; });
  }
  if (menuBtn) {
    setMenu(false);
    menuBtn.addEventListener("click", function () { setMenu(!doc.classList.contains("menu-open")); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });
    window.addEventListener("resize", function () { if (window.innerWidth >= 1024) setMenu(false); });
  }

  /* ---- Scroll reveal ---- */
  var revealEls = $$(".reveal");
  if ("IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- Counters ---- */
  function runCount(el) {
    var to = parseFloat(el.getAttribute("data-count"));
    var dur = 1600;
    if (reduce) { el.textContent = to; return; }
    var t0 = null;
    function step(t) {
      if (t0 === null) t0 = t;
      var p = Math.min((t - t0) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 4);
      el.textContent = Math.round(to * eased);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var counters = $$("[data-count]");
  if (counters.length) {
    if ("IntersectionObserver" in window) {
      var co = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { runCount(e.target); co.unobserve(e.target); }
        });
      }, { threshold: 0.6 });
      counters.forEach(function (c) { co.observe(c); });
    } else {
      counters.forEach(function (c) { c.textContent = c.getAttribute("data-count"); });
    }
  }

  /* ---- Timeline: line draws on scroll, nodes light up ---- */
  var timeline = $(".timeline");
  var tItems = $$(".t-item");
  function updateTimeline() {
    if (!timeline) return;
    var r = timeline.getBoundingClientRect();
    var vh = window.innerHeight;
    var p = (vh * 0.62 - r.top) / r.height;
    p = Math.max(0, Math.min(1, p));
    if (reduce) p = 1;
    timeline.style.setProperty("--p", p.toFixed(3));
    tItems.forEach(function (it) {
      var ir = it.getBoundingClientRect();
      it.classList.toggle("in", reduce || ir.top < vh * 0.66);
    });
  }

  /* ---- Insights category filter ---- */
  var chips = $$(".filters .chip");
  if (chips.length) {
    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        chips.forEach(function (c) { c.setAttribute("aria-pressed", String(c === chip)); });
        var f = chip.getAttribute("data-filter");
        $$(".article-card[data-cat]").forEach(function (card) {
          card.hidden = !(f === "all" || card.getAttribute("data-cat") === f);
        });
      });
    });
  }

  /* ---- Case-study table of contents highlight ---- */
  var tocLinks = $$(".cs-toc a");
  if (tocLinks.length && "IntersectionObserver" in window) {
    var secs = tocLinks.map(function (a) { return $(a.getAttribute("href")); }).filter(Boolean);
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          tocLinks.forEach(function (a) { a.classList.toggle("on", a.getAttribute("href") === "#" + e.target.id); });
        }
      });
    }, { rootMargin: "-30% 0px -60% 0px" });
    secs.forEach(function (s) { so.observe(s); });
  }

  /* ---- Toast ---- */
  var toast = document.createElement("div");
  toast.className = "toast";
  toast.setAttribute("role", "status");
  toast.setAttribute("aria-live", "polite");
  document.body.appendChild(toast);
  var toastTimer;
  function showToast(msg, isErr) {
    toast.textContent = msg;
    toast.classList.toggle("error", !!isErr);
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove("show"); }, 5200);
  }

  /* ---- Forms: validation, honeypot, hand-off to mail app ---- */
  var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  function validateField(f) {
    var input = $("input, select, textarea", f);
    if (!input) return true;
    var ok = true;
    var v = (input.value || "").trim();
    if (input.required && !v) ok = false;
    if (ok && input.type === "email" && v && !emailRe.test(v)) ok = false;
    f.classList.toggle("invalid", !ok);
    input.setAttribute("aria-invalid", String(!ok));
    return ok;
  }
  var errN = 0;
  $$("form[data-form]").forEach(function (form) {
    $$(".field", form).forEach(function (f) {
      var input = $("input, select, textarea", f);
      var err = $(".err", f);
      if (err && input) {
        err.id = err.id || "err-" + (++errN);
        err.setAttribute("role", "alert");
        input.setAttribute("aria-describedby", ((input.getAttribute("aria-describedby") || "") + " " + err.id).trim());
      }
      if (input) input.addEventListener("blur", function () { validateField(f); });
      if (input) input.addEventListener("input", function () { if (f.classList.contains("invalid")) validateField(f); });
    });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var hp = $(".hp input", form);
      if (hp && hp.value) return; // bot
      var bad = $$(".field", form).filter(function (f) { return !validateField(f); });
      if (bad.length) {
        var first = $("input, select, textarea", bad[0]);
        if (first) first.focus();
        showToast("Please fix the highlighted fields.", true);
        return;
      }
      var kind = form.getAttribute("data-form");
      if (kind === "newsletter") {
        var em = $("input[type=email]", form).value.trim();
        showToast("Almost there — check " + em + " to confirm your subscription.");
        form.reset();
        return;
      }
      var lines = [];
      var subject = form.getAttribute("data-subject") || "Website enquiry";
      $$(".field", form).forEach(function (f) {
        var lab = $("label", f), inp = $("input, select, textarea", f);
        if (lab && inp && inp.value.trim()) lines.push(lab.textContent.replace("*", "").trim() + ": " + inp.value.trim());
      });
      var href = "mailto:" + CONFIG.email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(lines.join("\n\n"));
      showToast("Thank you — your message is ready to send in your email app. Replies come within two working days.");
      form.reset();
      window.location.href = href;
    });
  });

  /* ---- Cookie consent: non-essential tracking is off by default ---- */
  var consent = $(".consent");
  if (consent && !store.get("consent")) {
    setTimeout(function () { consent.classList.add("show"); }, 1400);
  }
  $$("[data-consent]", consent || document).forEach(function (b) {
    b.addEventListener("click", function () {
      store.set("consent", b.getAttribute("data-consent"));
      consent.classList.remove("show");
    });
  });

  /* ---- Footer year ---- */
  $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ---- Headline word-by-word reveal ---- */
  function splitWords(el) {
    var i = 0;
    (function walk(n) {
      Array.prototype.slice.call(n.childNodes).forEach(function (c) {
        if (c.nodeType === 3) {
          var frag = document.createDocumentFragment();
          c.textContent.split(/(\s+)/).forEach(function (t) {
            if (!t) return;
            if (/^\s+$/.test(t)) { frag.appendChild(document.createTextNode(" ")); return; }
            var w = document.createElement("span"); w.className = "word";
            var inner = document.createElement("span"); inner.textContent = t; inner.style.setProperty("--w", i++);
            w.appendChild(inner); frag.appendChild(w);
          });
          c.parentNode.replaceChild(frag, c);
        } else if (c.nodeType === 1) { walk(c); }
      });
    })(el);
  }
  $$(".section-head h2, .cta h2").forEach(splitWords);

  /* ---- Hero: rotating phrase + pointer tilt ---- */
  var rot = $("[data-rot]");
  if (rot && !reduce) {
    var phrases = rot.getAttribute("data-rot").split("|"), pi = 0;
    setInterval(function () {
      rot.classList.add("swap");
      setTimeout(function () { pi = (pi + 1) % phrases.length; rot.textContent = phrases[pi]; rot.classList.remove("swap"); }, 380);
    }, 3200);
  }
  var heroEl = $(".hero");
  if (heroEl && !reduce && window.matchMedia("(pointer: fine)").matches) {
    heroEl.addEventListener("pointermove", function (e) {
      var r = heroEl.getBoundingClientRect();
      heroEl.style.setProperty("--px", ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
      heroEl.style.setProperty("--py", ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
    }, { passive: true });
    heroEl.addEventListener("pointerleave", function () { heroEl.style.setProperty("--px", 0); heroEl.style.setProperty("--py", 0); });
  }

  /* ---- Scroll progress bar + back to top ---- */
  var bar = document.createElement("div");
  bar.className = "progress";
  bar.setAttribute("aria-hidden", "true");
  document.body.appendChild(bar);
  var topBtn = document.createElement("button");
  topBtn.className = "to-top";
  topBtn.type = "button";
  topBtn.setAttribute("aria-label", "Back to top");
  topBtn.innerHTML = "\u2191";
  topBtn.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" }); });
  document.body.appendChild(topBtn);
  function updateProgress() {
    var max = doc.scrollHeight - window.innerHeight;
    bar.style.setProperty("--sp", max > 0 ? (window.scrollY / max).toFixed(4) : 0);
    topBtn.classList.toggle("show", window.scrollY > 700);
  }

  /* ---- Card spotlight follows the cursor ---- */
  document.addEventListener("pointermove", function (e) {
    var card = e.target.closest ? e.target.closest(".card") : null;
    if (!card) return;
    var r = card.getBoundingClientRect();
    card.style.setProperty("--mx", (e.clientX - r.left) + "px");
    card.style.setProperty("--my", (e.clientY - r.top) + "px");
  }, { passive: true });

  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", updateTimeline);
  onScroll();
  updateProgress();
})();
