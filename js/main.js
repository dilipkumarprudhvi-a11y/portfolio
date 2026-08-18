'use strict';

document.addEventListener('DOMContentLoaded', () => {

  // ============================================
  // 1. LENIS SMOOTH SCROLL
  // ============================================
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
    smoothTouch: false,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Connect Lenis to GSAP ScrollTrigger if available
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);
  }

  // ============================================
  // 2. NAVIGATION
  // ============================================
  const navbar   = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');

  // Scroll behavior: shrink nav + back-to-top visibility
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('nav-scrolled');
    } else {
      navbar.classList.remove('nav-scrolled');
    }

    // Back to top visibility toggle
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
      backToTop.classList.toggle('visible', window.scrollY > 500);
    }
  });

  // Active nav link based on scroll position using IntersectionObserver
  const sections       = document.querySelectorAll('section[id]');
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
  }, { threshold: 0.4 });

  sections.forEach(section => sectionObserver.observe(section));

  // Smooth scroll on desktop nav link click
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) lenis.scrollTo(target, { offset: -80, duration: 1.5 });
        // Close mobile menu if open (safety call)
        closeMobileMenu();
      }
    });
  });

  // Back to top button click
  document.getElementById('back-to-top')?.addEventListener('click', () => {
    lenis.scrollTo(0, { duration: 1.5 });
  });

  // ============================================
  // 3. MOBILE HAMBURGER MENU
  // ============================================
  const hamburger     = document.getElementById('hamburger');
  const mobileMenu    = document.getElementById('mobile-menu');
  const mobileOverlay = document.getElementById('mobile-overlay');

  /**
   * Opens the mobile slide-out nav menu.
   * Locks body scroll while menu is open.
   */
  function openMobileMenu() {
    hamburger?.classList.add('open');
    mobileMenu?.classList.add('open');
    mobileOverlay?.classList.add('visible');
    document.body.style.overflow = 'hidden';
  }

  /**
   * Closes the mobile slide-out nav menu.
   * Restores body scroll.
   */
  function closeMobileMenu() {
    hamburger?.classList.remove('open');
    mobileMenu?.classList.remove('open');
    mobileOverlay?.classList.remove('visible');
    document.body.style.overflow = '';
  }

  // Toggle hamburger
  hamburger?.addEventListener('click', () => {
    if (hamburger.classList.contains('open')) closeMobileMenu();
    else openMobileMenu();
  });

  // Clicking the backdrop closes the menu
  mobileOverlay?.addEventListener('click', closeMobileMenu);

  // Mobile nav links: close menu then smooth-scroll to target
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        closeMobileMenu();
        // Small delay lets the menu slide out before scrolling
        setTimeout(() => {
          if (target) lenis.scrollTo(target, { offset: -80, duration: 1.5 });
        }, 300);
      }
    });
  });

  // ============================================
  // 4. CUSTOM CURSOR  (desktop / hover devices only)
  // ============================================
  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');

  if (dot && ring && window.matchMedia('(hover: hover)').matches) {
    let mouseX = 0, mouseY = 0;
    let ringX  = 0, ringY  = 0;

    // Dot tracks the mouse instantly
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + 'px';
      dot.style.top  = mouseY + 'px';
    });

    // Ring follows with a lerp lag for a trailing effect
    function animateCursor() {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.left = ringX + 'px';
      ring.style.top  = ringY + 'px';
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Scale-up cursor on interactive elements
    const hoverTargets = document.querySelectorAll('a, button, [data-tilt], .project-card');
    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', () => {
        dot.classList.add('cursor-hover');
        ring.classList.add('cursor-hover');
      });
      el.addEventListener('mouseleave', () => {
        dot.classList.remove('cursor-hover');
        ring.classList.remove('cursor-hover');
      });
    });

    // Hide cursor when it leaves the viewport
    document.addEventListener('mouseleave', () => {
      dot.style.opacity  = '0';
      ring.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      dot.style.opacity  = '1';
      ring.style.opacity = '1';
    });
  }

  // ============================================
  // 5. CONTACT FORM
  // ============================================
  const form = document.getElementById('contact-form');

  if (form) {
    // Submit handler
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const btn          = form.querySelector('[type="submit"]');
      const originalHTML = btn.innerHTML;

      // --- Client-side validation ---
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

      // --- Simulate async send ---
      btn.innerHTML = '<span class="spinner"></span> Sending...';
      btn.disabled  = true;

      setTimeout(() => {
        btn.innerHTML        = '&#10003; Message Sent!';
        btn.style.background = '#22c55e';
        btn.style.color      = '#fff';
        form.reset();

        // Clear all has-value classes after reset
        form.querySelectorAll('input, textarea').forEach(el => {
          el.classList.remove('has-value');
        });

        // Restore button after 3 s
        setTimeout(() => {
          btn.innerHTML        = originalHTML;
          btn.style.background = '';
          btn.style.color      = '';
          btn.disabled         = false;
        }, 3000);
      }, 1500);
    });

    // Per-field live validation clear
    form.querySelectorAll('input, textarea').forEach(input => {
      input.addEventListener('input', () => {
        const errorEl = input.parentElement.querySelector('.form-error');
        if (errorEl) errorEl.textContent = '';
        input.classList.remove('error');

        // Floating label helper class
        input.classList.toggle('has-value', input.value.length > 0);
      });
    });
  }

  // ============================================
  // 6. GITHUB SECTION CODE-RAIN ANIMATION
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
      ctx.fillStyle = 'rgba(5, 5, 16, 0.08)';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = 'rgba(99, 102, 241, 0.35)';
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

    let rainInterval = setInterval(drawCodeRain, 45);

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

