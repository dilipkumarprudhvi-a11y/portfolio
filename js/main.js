'use strict';

document.addEventListener('DOMContentLoaded', () => {

  // ============================================
  // 1. LENIS SMOOTH SCROLL (SINGLE RAF LOOP FIX)
  // ============================================
  const lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 0.9,
    touchMultiplier: 1.5,
  });

  // Connect Lenis to GSAP ScrollTrigger correctly without duplicate RAF
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
  } else {
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  // ============================================
  // 2. NAVIGATION
  // ============================================
  const navbar   = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const backToTop = document.getElementById('back-to-top');

  // Scroll behavior: shrink nav + back-to-top visibility via Lenis scroll
  lenis.on('scroll', (e) => {
    const scrollY = e.scroll;
    if (scrollY > 40) {
      navbar?.classList.add('nav-scrolled');
    } else {
      navbar?.classList.remove('nav-scrolled');
    }

    if (backToTop) {
      backToTop.classList.toggle('visible', scrollY > 400);
    }
  });

  // Active nav link based on scroll position using IntersectionObserver
  const sections = document.querySelectorAll('section[id]');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { threshold: 0.35 });
  sections.forEach(s => sectionObserver.observe(s));

  // Smooth scroll on nav link click
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          lenis.scrollTo(target, { offset: -70, duration: 1.2 });
        }
        closeMobileMenu();
      }
    });
  });

  // Back to top button click
  backToTop?.addEventListener('click', () => {
    lenis.scrollTo(0, { duration: 1.2 });
  });

  // ============================================
  // 3. MOBILE HAMBURGER MENU
  // ============================================
  const hamburger     = document.getElementById('hamburger');
  const mobileMenu    = document.getElementById('mobile-menu');
  const mobileOverlay = document.getElementById('mobile-overlay');

  function openMobileMenu() {
    hamburger?.classList.add('open');
    hamburger?.setAttribute('aria-expanded', 'true');
    mobileMenu?.classList.add('open');
    mobileOverlay?.classList.add('visible');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    hamburger?.classList.remove('open');
    hamburger?.setAttribute('aria-expanded', 'false');
    mobileMenu?.classList.remove('open');
    mobileOverlay?.classList.remove('visible');
    document.body.style.overflow = '';
  }

  hamburger?.addEventListener('click', () => {
    if (hamburger.classList.contains('open')) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  mobileOverlay?.addEventListener('click', closeMobileMenu);

  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        closeMobileMenu();
        setTimeout(() => {
          if (target) lenis.scrollTo(target, { offset: -70, duration: 1.2 });
        }, 200);
      }
    });
  });

  // ============================================
  // 4. CUSTOM CURSOR (DESKTOP ONLY)
  // ============================================
  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');

  if (dot && ring && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX  = mouseX;
    let ringY  = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + 'px';
      dot.style.top  = mouseY + 'px';
    });

    function renderCursor() {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.left = ringX + 'px';
      ring.style.top  = ringY + 'px';
      requestAnimationFrame(renderCursor);
    }
    requestAnimationFrame(renderCursor);

    // Hover reactions
    const attachHoverStates = () => {
      document.querySelectorAll('a, button, [data-tilt], .project-card, .skill-card, input, textarea').forEach(el => {
        el.addEventListener('mouseenter', () => {
          dot.classList.add('cursor-hover');
          ring.classList.add('cursor-hover');
        });
        el.addEventListener('mouseleave', () => {
          dot.classList.remove('cursor-hover');
          ring.classList.remove('cursor-hover');
        });
      });
    };
    attachHoverStates();
  }

  // ============================================
  // 5. CONTACT FORM
  // ============================================
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const btn          = form.querySelector('[type="submit"]');
      const originalHTML = btn.innerHTML;

      let valid = true;

      form.querySelectorAll('[required]').forEach(input => {
        const errorEl    = input.parentElement.querySelector('.form-error');
        const isEmpty    = !input.value.trim();
        const isBadEmail = (
          input.type === 'email' &&
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)
        );

        if (isEmpty) {
          valid = false;
          if (errorEl) errorEl.textContent = 'This field is required.';
          input.classList.add('error');
        } else if (isBadEmail) {
          valid = false;
          if (errorEl) errorEl.textContent = 'Please enter a valid email address.';
          input.classList.add('error');
        } else {
          if (errorEl) errorEl.textContent = '';
          input.classList.remove('error');
        }
      });

      if (!valid) return;

      // Simulate async send
      btn.innerHTML = 'Sending...';
      btn.disabled  = true;

      setTimeout(() => {
        btn.innerHTML        = '&#10003; Message Sent!';
        btn.style.background = '#22c55e';
        btn.style.color      = '#fff';
        form.reset();

        form.querySelectorAll('input, textarea').forEach(el => {
          el.classList.remove('has-value');
        });

        setTimeout(() => {
          btn.innerHTML        = originalHTML;
          btn.style.background = '';
          btn.style.color      = '';
          btn.disabled         = false;
        }, 3000);
      }, 1200);
    });

    form.querySelectorAll('input, textarea').forEach(input => {
      input.addEventListener('input', () => {
        const errorEl = input.parentElement.querySelector('.form-error');
        if (errorEl) errorEl.textContent = '';
        input.classList.remove('error');
        input.classList.toggle('has-value', input.value.length > 0);
      });
    });
  }

  // ============================================
  // 6. GITHUB SECTION AMBER CODE-RAIN ANIMATION
  // ============================================
  const codeCanvas = document.getElementById('code-rain-canvas');
  if (codeCanvas && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const ctx = codeCanvas.getContext('2d');
    let width = (codeCanvas.width = codeCanvas.offsetWidth || window.innerWidth);
    let height = (codeCanvas.height = codeCanvas.offsetHeight || 400);

    const chars = '0123456789ABCDEF{}[]()<>/=+:;*~#$&_';
    const fontSize = 14;
    let columns = Math.floor(width / fontSize);
    let drops = Array(columns).fill(1);

    function drawCodeRain() {
      ctx.fillStyle = 'rgba(18, 15, 13, 0.08)';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = 'rgba(245, 158, 11, 0.35)'; // Amber gold characters
      ctx.font = `${fontSize}px JetBrains Mono, monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    setInterval(drawCodeRain, 45);

    window.addEventListener('resize', () => {
      width = codeCanvas.width = codeCanvas.offsetWidth || window.innerWidth;
      height = codeCanvas.height = codeCanvas.offsetHeight || 400;
      columns = Math.floor(width / fontSize);
      drops = Array(columns).fill(1);
    });
  }

  // ============================================
  // 7. KEYBOARD ACCESSIBILITY - ESC closes menu
  // ============================================
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMobileMenu();
  });

});
