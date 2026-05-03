/**
 * Luxe Interior — Main JavaScript
 * Designed & Developed by Pritam Naskar (Rehan'Z Digital Network)
 * main.js
 */

'use strict';

/* ════════════════════════════════════════════════════════════
   UTILITY
════════════════════════════════════════════════════════════ */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ════════════════════════════════════════════════════════════
   PAGE LOADER
════════════════════════════════════════════════════════════ */
(function initLoader() {
  const loader = $('#page-loader');
  if (!loader) return;

  // Hide loader after fonts + brief pause for cinematic feel
  const hide = () => loader.classList.add('hidden');
  document.addEventListener('DOMContentLoaded', () => setTimeout(hide, 1800));
  // Hard fallback
  setTimeout(hide, 3000);
})();

/* ════════════════════════════════════════════════════════════
   CUSTOM CURSOR
════════════════════════════════════════════════════════════ */
(function initCursor() {
  const dot  = $('#cursor-dot');
  const ring = $('#cursor-ring');
  if (!dot || !ring) return;

  let mx = 0, my = 0;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    dot.style.left  = mx + 'px';
    dot.style.top   = my + 'px';
  });

  // Ring lags slightly for fluid feel
  let rx = 0, ry = 0;
  function animateRing() {
    rx += (mx - rx) * 0.14;
    ry += (my - ry) * 0.14;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Enlarge ring on interactive elements
  const hoverEls = $$('a, button, .portfolio-item, .service-card, .testi-card, .filter-btn');
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hovering'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hovering'));
  });

  document.addEventListener('mouseleave', () => {
    dot.style.opacity  = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    dot.style.opacity  = '1';
    ring.style.opacity = '1';
  });
})();

/* ════════════════════════════════════════════════════════════
   NAVBAR — scroll state + hamburger
════════════════════════════════════════════════════════════ */
(function initNavbar() {
  const navbar    = $('#navbar');
  const hamburger = $('#hamburger');
  const navLinks  = $('#nav-links');
  if (!navbar) return;

  // Scroll state
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Hamburger toggle
  hamburger?.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open);
  });

  // Close on nav link click (mobile)
  $$('.nav-link, .nav-cta-btn', navLinks).forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger?.classList.remove('open');
    });
  });

  // Smooth active link highlighting on scroll
  const sections = $$('section[id]');
  const navLinkEls = $$('.nav-link');

  const highlightNav = () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 140) current = s.id;
    });
    navLinkEls.forEach(l => {
      l.style.color = l.getAttribute('href') === `#${current}` ? 'var(--ivory)' : '';
    });
  };
  window.addEventListener('scroll', highlightNav, { passive: true });
})();

/* ════════════════════════════════════════════════════════════
   HERO PARALLAX
════════════════════════════════════════════════════════════ */
(function initParallax() {
  const img = $('#hero-parallax');
  if (!img) return;

  const onScroll = () => {
    const y = window.scrollY;
    // Shift image upward at half scroll speed for depth
    img.style.transform = `translateY(${y * 0.35}px)`;
  };

  window.addEventListener('scroll', onScroll, { passive: true });
})();

/* ════════════════════════════════════════════════════════════
   SCROLL REVEAL — IntersectionObserver
════════════════════════════════════════════════════════════ */
(function initScrollReveal() {
  const revealEls = $$('.reveal-up, .reveal-left, .reveal-right');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el    = entry.target;
      const delay = parseInt(el.dataset.delay || 0);

      setTimeout(() => el.classList.add('visible'), delay);
      observer.unobserve(el);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach(el => observer.observe(el));
})();

/* ════════════════════════════════════════════════════════════
   ANIMATED COUNTERS
════════════════════════════════════════════════════════════ */
(function initCounters() {
  const counters = $$('[data-count]');

  const animateCounter = (el) => {
    const target   = parseInt(el.dataset.count);
    const duration = 2000;
    const step     = 16;
    const increment = target / (duration / step);
    let current = 0;

    const timer = setInterval(() => {
      current = Math.min(current + increment, target);
      // Format: add '+' for % values
      const val = Math.floor(current);
      el.textContent = val >= 98 && target === 98 ? val + '%' : val;
      if (current >= target) clearInterval(timer);
    }, step);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      animateCounter(entry.target);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
})();

/* ════════════════════════════════════════════════════════════
   PORTFOLIO FILTER + LIGHTBOX
════════════════════════════════════════════════════════════ */
(function initPortfolio() {
  const filterBtns = $$('.filter-btn');
  const items      = $$('.portfolio-item');

  // ── Filtering ──────────────────────────────────────────
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      items.forEach(item => {
        const match = filter === 'all' || item.dataset.cat === filter;
        item.classList.toggle('hidden', !match);
      });
    });
  });

  // ── Lightbox ───────────────────────────────────────────
  const lightbox  = $('#lightbox');
  const lbImg     = $('#lightbox-img');
  const lbCaption = $('#lightbox-caption');
  const lbClose   = $('#lightbox-close');
  const lbPrev    = $('#lb-prev');
  const lbNext    = $('#lb-next');

  let lbImages = [];
  let lbIndex  = 0;

  const openLightbox = (src, title, allButtons, idx) => {
    lbImages = allButtons.map(b => ({ src: b.dataset.src, title: b.dataset.title }));
    lbIndex  = idx;
    updateLightbox();
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const updateLightbox = () => {
    const { src, title } = lbImages[lbIndex];
    lbImg.src           = src;
    lbImg.alt           = title;
    lbCaption.textContent = title;
  };

  const closeLightbox = () => {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => { lbImg.src = ''; }, 400);
  };

  const prevLb = () => { lbIndex = (lbIndex - 1 + lbImages.length) % lbImages.length; updateLightbox(); };
  const nextLb = () => { lbIndex = (lbIndex + 1) % lbImages.length; updateLightbox(); };

  const zoomBtns = $$('.portfolio-zoom');
  zoomBtns.forEach((btn, idx) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      openLightbox(btn.dataset.src, btn.dataset.title, zoomBtns, idx);
    });
  });

  // Also open on card click
  $$('.portfolio-item').forEach((card, idx) => {
    card.addEventListener('click', () => {
      const btn = card.querySelector('.portfolio-zoom');
      if (btn) openLightbox(btn.dataset.src, btn.dataset.title, zoomBtns, idx);
    });
  });

  lbClose?.addEventListener('click', closeLightbox);
  lbPrev?.addEventListener('click', prevLb);
  lbNext?.addEventListener('click', nextLb);

  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox?.classList.contains('open')) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowLeft')  prevLb();
    if (e.key === 'ArrowRight') nextLb();
  });
})();

/* ════════════════════════════════════════════════════════════
   TESTIMONIALS CAROUSEL (auto-play + dots)
════════════════════════════════════════════════════════════ */
(function initTestimonials() {
  const track  = $('#testi-track');
  const dotsEl = $('#testi-dots');
  if (!track) return;

  const cards  = $$('.testi-card', track);
  const total  = cards.length;
  let current  = 0;
  let autoTimer;

  // Create dots
  cards.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = `testi-dot${i === 0 ? ' active' : ''}`;
    dot.setAttribute('aria-label', `Testimonial ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsEl?.appendChild(dot);
  });

  const dots = $$('.testi-dot', dotsEl);

  function goTo(index) {
    current = index;
    // On smaller screens show one card at a time
    const isMobile = window.innerWidth < 980;
    const isTablet = window.innerWidth < 1180 && window.innerWidth >= 980;

    if (isMobile) {
      track.style.transform = `translateX(-${current * 100}%)`;
      track.style.display   = 'flex';
      cards.forEach((c, i) => {
        c.style.minWidth = '100%';
        c.style.opacity  = i === current ? '1' : '0.4';
      });
    } else if (isTablet) {
      track.style.transform = `translateX(-${current * 50}%)`;
      track.style.display   = 'flex';
      cards.forEach(c => { c.style.minWidth = '50%'; c.style.opacity = '1'; });
    } else {
      // Desktop: all visible in grid
      track.style.transform = '';
      track.style.display   = '';
      cards.forEach(c => { c.style.minWidth = ''; c.style.opacity = ''; });
    }

    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  function next() {
    goTo((current + 1) % total);
  }

  autoTimer = setInterval(next, 5000);

  track?.addEventListener('mouseenter', () => clearInterval(autoTimer));
  track?.addEventListener('mouseleave', () => { autoTimer = setInterval(next, 5000); });

  // Touch swipe support
  let touchStartX = 0;
  track?.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  track?.addEventListener('touchend',   e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) dx < 0 ? next() : goTo((current - 1 + total) % total);
  });

  // Re-init on resize
  window.addEventListener('resize', () => goTo(current));
  goTo(0);
})();

/* ════════════════════════════════════════════════════════════
   CONTACT FORM
════════════════════════════════════════════════════════════ */
(function initContactForm() {
  const form       = $('#contact-form');
  const submitBtn  = $('#form-submit-btn');
  const successEl  = $('#form-success');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Basic client-side validation
    const name    = $('#cf-name')?.value.trim();
    const email   = $('#cf-email')?.value.trim();
    const message = $('#cf-message')?.value.trim();

    if (!name || !email || !message) {
      // Shake invalid fields
      [['cf-name', name], ['cf-email', email], ['cf-message', message]].forEach(([id, val]) => {
        if (!val) shakeField(`#${id}`);
      });
      return;
    }

    if (!isValidEmail(email)) {
      shakeField('#cf-email');
      return;
    }

    // Simulate submission
    const btnText = submitBtn.querySelector('.btn-text');
    const origText = btnText.textContent;
    btnText.textContent = 'Sending…';
    submitBtn.disabled  = true;

    setTimeout(() => {
      form.style.display     = 'none';
      successEl.hidden        = false;
      submitBtn.disabled      = false;
      btnText.textContent     = origText;
    }, 1400);
  });

  function shakeField(selector) {
    const el = $(selector);
    if (!el) return;
    el.style.borderColor = '#c0392b';
    el.animate([
      { transform: 'translateX(-6px)' },
      { transform: 'translateX(6px)' },
      { transform: 'translateX(-4px)' },
      { transform: 'translateX(4px)' },
      { transform: 'translateX(0)' },
    ], { duration: 400, easing: 'ease-out' });
    setTimeout(() => { el.style.borderColor = ''; }, 2000);
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
})();

/* ════════════════════════════════════════════════════════════
   SMOOTH SCROLL for anchor links
════════════════════════════════════════════════════════════ */
(function initSmoothScroll() {
  $$('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = link.getAttribute('href');
      if (target === '#') return;
      const el = document.querySelector(target);
      if (!el) return;
      e.preventDefault();
      const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();

/* ════════════════════════════════════════════════════════════
   MARQUEE — pause on hover
════════════════════════════════════════════════════════════ */
(function initMarquee() {
  const content = $('.marquee-content');
  if (!content) return;
  content.addEventListener('mouseenter', () => content.style.animationPlayState = 'paused');
  content.addEventListener('mouseleave', () => content.style.animationPlayState = 'running');
})();

/* ════════════════════════════════════════════════════════════
   FOOTER reveal year
════════════════════════════════════════════════════════════ */
(function setYear() {
  const yr = document.querySelector('.footer-bottom p');
  if (yr) yr.textContent = yr.textContent.replace('2025', new Date().getFullYear());
})();
