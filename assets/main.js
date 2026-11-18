/* Progressive enhancement only: the page reads fine without this file. */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- current year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- scroll spy ---------- */
  var sections = Array.prototype.slice.call(document.querySelectorAll('main .sec'));
  var spyLinks = Array.prototype.slice.call(document.querySelectorAll('[data-spy]'));
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav a'));
  var ticking = false;
  var clickLock = null;

  function setCurrent(id) {
    spyLinks.concat(navLinks).forEach(function (link) {
      var target = (link.getAttribute('href') || '').replace('#', '');
      if (target === id) {
        link.setAttribute('aria-current', 'true');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  // A clicked anchor wins over the spy while the page is still settling.
  spyLinks.concat(navLinks).forEach(function (link) {
    link.addEventListener('click', function () {
      var id = (link.getAttribute('href') || '').replace('#', '');
      if (!id || !document.getElementById(id)) return;
      clickLock = { id: id, until: Date.now() + 1500 };
      setCurrent(id);
    });
  });

  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      ticking = false;
      if (!sections.length) return;
      if (clickLock && Date.now() < clickLock.until) return;

      var line = window.scrollY + window.innerHeight * 0.35;
      var current = sections[0].id;

      for (var i = 0; i < sections.length; i++) {
        if (sections[i].offsetTop <= line) current = sections[i].id;
      }

      // The final section can never reach the spy line, so claim it at the bottom.
      var docHeight = document.documentElement.scrollHeight;
      if (docHeight > window.innerHeight + 8 &&
          window.innerHeight + window.scrollY >= docHeight - 2) {
        current = sections[sections.length - 1].id;
      }

      setCurrent(current);
    });
  }

  if (sections.length) {
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
  }

  /* ---------- copy email ---------- */
  var emailBtn = document.querySelector('.email');
  var copiedEl = emailBtn && emailBtn.querySelector('.copied');
  var copyTimer = null;

  function announceCopied() {
    if (!copiedEl) return;
    copiedEl.textContent = 'Copied to clipboard';
    copiedEl.classList.add('show');
    window.clearTimeout(copyTimer);
    copyTimer = window.setTimeout(function () {
      copiedEl.classList.remove('show');
    }, 1800);
  }

  function fallbackCopy(text) {
    var area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    try { document.execCommand('copy'); } catch (err) { /* no-op */ }
    document.body.removeChild(area);
  }

  if (emailBtn) {
    emailBtn.addEventListener('click', function () {
      var email = emailBtn.getAttribute('data-email');
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(announceCopied, function () {
          fallbackCopy(email);
          announceCopied();
        });
      } else {
        fallbackCopy(email);
        announceCopied();
      }
    });
  }

  /* Smooth scrolling is handled in CSS; this keeps focus behaviour sane. */
  if (reduceMotion) {
    document.documentElement.style.scrollBehavior = 'auto';
  }
})();
