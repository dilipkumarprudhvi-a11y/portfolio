/**
 * animations.js
 * Prudhvi Dilip Kumar — Premium Full-Stack Developer Portfolio
 *
 * Handles all GSAP animations, scroll reveals, counters,
 * typewriter effect, and interactive micro-interactions.
 *
 * Dependencies: GSAP 3.x + ScrollTrigger plugin (loaded via CDN in HTML)
 */

/* =========================================================
   ENTRY POINT — wait for DOM to be fully parsed
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  initAnimations();
});

/* =========================================================
   MAIN INIT
   ========================================================= */
function initAnimations() {

  // ── 1. Register GSAP plugins ─────────────────────────────
  gsap.registerPlugin(ScrollTrigger);

  // ── 2. Respect user's motion preference globally ─────────
  const prefersReducedMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ── 3. Kick off loading screen ───────────────────────────
  initLoadingScreen(prefersReducedMotion);

  // ── 4. Scroll-driven effects ─────────────────────────────
  initScrollReveals();
  initParallaxHero();
  initScrollProgressBar();

  // ── 5. Counter & bar animations ──────────────────────────
  initCounters();
  initSkillBars();

  // ── 6. Interactive effects ────────────────────────────────
  initCardTilt();
  initMagneticButtons();
  initSkillsFilter();

  // ── 7. Decorative / ambient animations ───────────────────
  initOrbitAnimation(prefersReducedMotion);
  animateCodeSymbols();

} // end initAnimations

/* =========================================================
   LOADING SCREEN
   ========================================================= */
function initLoadingScreen(prefersReducedMotion) {
  const loader    = document.getElementById('loading-screen');
  const loaderBar = document.querySelector('.loader-bar');

  // If loading screen markup is absent, go straight to hero
  if (!loader || !loaderBar) {
    animateHeroEntrance();
    return;
  }

  // Fast-track animation for users who prefer reduced motion
  const duration = prefersReducedMotion ? 0.1 : 2;

  gsap.to(loaderBar, {
    width: '100%',
    duration,
    ease: 'power2.inOut',
    onComplete: () => {
      gsap.to(loader, {
        opacity: 0,
        y: -50,
        duration: prefersReducedMotion ? 0 : 0.8,
        ease: 'power2.inOut',
        onComplete: () => {
          loader.style.display = 'none';
          document.body.classList.add('loaded');
          animateHeroEntrance();
        }
      });
    }
  });
}

/* =========================================================
   HERO ENTRANCE
   ========================================================= */
function animateHeroEntrance() {
  // Guard — elements may not exist on every page variant
  const heroElements = [
    '.hero-pre', '.hero-name', '.hero-title',
    '.hero-subtitle', '.hero-description',
    '.hero-ctas .btn', '.scroll-indicator'
  ].filter(sel => document.querySelector(sel));

  if (heroElements.length === 0) return;

  const tl = gsap.timeline();

  if (document.querySelector('.hero-pre')) {
    tl.from('.hero-pre', { opacity: 0, y: 30, duration: 0.7, ease: 'power3.out' });
  }
  if (document.querySelector('.hero-name')) {
    tl.from('.hero-name', { opacity: 0, y: 50, duration: 0.9, ease: 'power3.out' }, '-=0.3');
  }
  if (document.querySelector('.hero-title')) {
    tl.from('.hero-title', { opacity: 0, y: 30, duration: 0.7, ease: 'power3.out' }, '-=0.4');
  }
  if (document.querySelector('.hero-subtitle')) {
    tl.from('.hero-subtitle', { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out' }, '-=0.3');
  }
  if (document.querySelector('.hero-description')) {
    tl.from('.hero-description', { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out' }, '-=0.3');
  }
  if (document.querySelector('.hero-ctas .btn')) {
    tl.from('.hero-ctas .btn', {
      opacity: 0, y: 20, stagger: 0.15, duration: 0.6, ease: 'power3.out'
    }, '-=0.2');
  }
  if (document.querySelector('.scroll-indicator')) {
    tl.from('.scroll-indicator', { opacity: 0, duration: 0.5 }, '-=0.2');
  }

  // Kick off typewriter after entrance completes
  tl.call(startTypewriter);
}

/* =========================================================
   TYPEWRITER EFFECT
   ========================================================= */
function startTypewriter() {
  const el = document.querySelector('.typewriter-text');
  if (!el) return;

  const words = [
    'Full-Stack Developer',
    'Frontend Engineer',
    'Backend Developer',
    'Problem Solver',
    'Web Application Builder'
  ];

  let wordIndex  = 0;
  let charIndex  = 0;
  let isDeleting = false;

  function type() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      el.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      el.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let speed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentWord.length) {
      speed      = 2000; // pause at full word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex  = (wordIndex + 1) % words.length;
      speed      = 500;  // brief pause before next word
    }

    setTimeout(type, speed);
  }

  type();
}

/* =========================================================
   SCROLL REVEAL ANIMATIONS
   ========================================================= */
function initScrollReveals() {

  // ── Section headings ────────────────────────────────────
  gsap.utils.toArray('.section-tag, .section-title, .section-subtitle').forEach(el => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: 'power3.out'
    });
  });

  // ── About section — slide in from sides ─────────────────
  if (document.querySelector('.about-text')) {
    gsap.from('.about-text', {
      scrollTrigger: { trigger: '#about', start: 'top 70%' },
      opacity: 0,
      x: -60,
      duration: 1,
      ease: 'power3.out'
    });
  }

  if (document.querySelector('.about-visual')) {
    gsap.from('.about-visual', {
      scrollTrigger: { trigger: '#about', start: 'top 70%' },
      opacity: 0,
      x: 60,
      duration: 1,
      ease: 'power3.out'
    });
  }

  // ── Stat cards stagger ───────────────────────────────────
  if (document.querySelector('.stat-card')) {
    gsap.from('.stat-card', {
      scrollTrigger: { trigger: '#stats', start: 'top 80%' },
      opacity: 0,
      y: 50,
      stagger: 0.2,
      duration: 0.8,
      ease: 'power3.out'
    });
  }

  // ── Skill cards — pop up with scale ─────────────────────
  if (document.querySelector('.skill-card')) {
    gsap.from('.skill-card', {
      scrollTrigger: { trigger: '#skills', start: 'top 80%' },
      opacity: 0,
      y: 50,
      scale: 0.9,
      stagger: 0.05,
      duration: 0.6,
      ease: 'power3.out'
    });
  }

  // ── Project cards stagger ────────────────────────────────
  if (document.querySelector('.project-card')) {
    gsap.from('.project-card', {
      scrollTrigger: { trigger: '#projects', start: 'top 80%' },
      opacity: 0,
      y: 60,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power3.out'
    });
  }

  // ── Timeline items — alternate left / right ──────────────
  gsap.utils.toArray('.timeline-item').forEach((item) => {
    const isLeft  = item.dataset.side === 'left';
    const content = item.querySelector('.timeline-content');
    const dot     = item.querySelector('.timeline-dot');

    if (content) {
      gsap.from(content, {
        scrollTrigger: { trigger: item, start: 'top 80%' },
        opacity: 0,
        x: isLeft ? -60 : 60,
        duration: 0.9,
        ease: 'power3.out'
      });
    }

    if (dot) {
      gsap.from(dot, {
        scrollTrigger: { trigger: item, start: 'top 80%' },
        scale: 0,
        duration: 0.5,
        ease: 'back.out(2)'
      });
    }
  });

  // ── Education cards ──────────────────────────────────────
  if (document.querySelector('.edu-card')) {
    gsap.from('.edu-card', {
      scrollTrigger: { trigger: '#education', start: 'top 80%' },
      opacity: 0,
      y: 40,
      stagger: 0.2,
      duration: 0.8,
      ease: 'power3.out'
    });
  }

  // ── Contact section ──────────────────────────────────────
  if (document.querySelector('.contact-form')) {
    gsap.from('.contact-form', {
      scrollTrigger: { trigger: '#contact', start: 'top 75%' },
      opacity: 0,
      x: 60,
      duration: 1,
      ease: 'power3.out'
    });
  }

  if (document.querySelector('.contact-info')) {
    gsap.from('.contact-info', {
      scrollTrigger: { trigger: '#contact', start: 'top 75%' },
      opacity: 0,
      x: -60,
      duration: 1,
      ease: 'power3.out'
    });
  }
}

/* =========================================================
   PARALLAX — HERO CONTENT DRIFTS ON SCROLL
   ========================================================= */
function initParallaxHero() {
  if (!document.querySelector('.hero-content')) return;

  gsap.to('.hero-content', {
    scrollTrigger: {
      trigger: '#home',
      start: 'top top',
      end: 'bottom top',
      scrub: 1
    },
    y: 100,
    opacity: 0.5
  });
}

/* =========================================================
   SCROLL PROGRESS BAR (thin line at top of page)
   ========================================================= */
function initScrollProgressBar() {
  if (!document.querySelector('.scroll-progress-bar')) return;

  gsap.to('.scroll-progress-bar', {
    scaleX: 1,
    scrollTrigger: {
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.3
    },
    transformOrigin: 'left center'
  });
}

/* =========================================================
   ANIMATED COUNTERS
   ========================================================= */
function initCounters() {
  const counters = document.querySelectorAll('.stat-number');
  if (!counters.length) return;

  counters.forEach(counter => {
    const target = parseInt(counter.dataset.target, 10) || 0;
    const suffix = counter.dataset.suffix !== undefined ? counter.dataset.suffix : '+';

    ScrollTrigger.create({
      trigger: counter,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        let current     = 0;
        const increment = target / 60; // spread over ~60 ticks at 16ms ≈ 1 s

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          counter.textContent = Math.floor(current) + suffix;
        }, 16);
      }
    });
  });
}

/* =========================================================
   SKILL BAR FILL ANIMATIONS
   ========================================================= */
function initSkillBars() {
  const bars = document.querySelectorAll('.skill-bar');
  if (!bars.length) return;

  bars.forEach(bar => {
    const level = bar.dataset.level || 80;
    const fill  = bar.querySelector('.skill-bar-fill');
    if (!fill) return;

    ScrollTrigger.create({
      trigger: bar,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(fill, {
          width: level + '%',
          duration: 1.5,
          ease: 'power2.out'
        });
      }
    });
  });
}

/* =========================================================
   3-D CARD TILT EFFECT
   ========================================================= */
function initCardTilt() {
  document.querySelectorAll('[data-tilt]').forEach(card => {

    card.addEventListener('mousemove', (e) => {
      const rect    = card.getBoundingClientRect();
      const x       = e.clientX - rect.left;
      const y       = e.clientY - rect.top;
      const centerX = rect.width  / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -12;
      const rotateY = ((x - centerX) / centerX) *  12;

      card.style.transform  = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
      card.style.transition = 'transform 0.1s ease';

      // Move the shine highlight to follow cursor
      const shine = card.querySelector('.card-shine');
      if (shine) {
        shine.style.background =
          `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.08) 0%, transparent 60%)`;
      }
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform  = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
      card.style.transition = 'transform 0.5s ease';
    });
  });
}

/* =========================================================
   MAGNETIC BUTTONS
   ========================================================= */
function initMagneticButtons() {
  document.querySelectorAll('.magnetic-btn').forEach(btn => {

    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x    = e.clientX - rect.left - rect.width  / 2;
      const y    = e.clientY - rect.top  - rect.height / 2;
      gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.4, ease: 'power2.out' });
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    });
  });
}

/* =========================================================
   SKILLS FILTER (All / Frontend / Backend / Tools …)
   ========================================================= */
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');
  if (!filterBtns.length || !skillCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      skillCards.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        gsap.to(card, {
          opacity: match ? 1 : 0.2,
          scale:   match ? 1 : 0.95,
          duration: 0.3
        });
        card.style.pointerEvents = match ? 'auto' : 'none';
      });
    });
  });
}

/* =========================================================
   ORBIT ANIMATION (Exploring / About decorative rings)
   ========================================================= */
function initOrbitAnimation(prefersReducedMotion) {
  const orbit1 = document.querySelector('.orbit-1');
  const orbit2 = document.querySelector('.orbit-2');
  if (!orbit1 || !orbit2) return;
  if (prefersReducedMotion) return;

  // Rotate the orbit rings
  gsap.to(orbit1, {
    rotation: 360,
    duration: 20,
    repeat: -1,
    ease: 'none',
    transformOrigin: 'center center'
  });

  gsap.to(orbit2, {
    rotation: -360,
    duration: 30,
    repeat: -1,
    ease: 'none',
    transformOrigin: 'center center'
  });

  // Counter-rotate items so their labels stay upright
  document.querySelectorAll('.orbit-1 .orbit-item').forEach(item => {
    gsap.to(item, {
      rotation: -360,
      duration: 20,
      repeat: -1,
      ease: 'none',
      transformOrigin: 'center center'
    });
  });

  document.querySelectorAll('.orbit-2 .orbit-item').forEach(item => {
    gsap.to(item, {
      rotation: 360,
      duration: 30,
      repeat: -1,
      ease: 'none',
      transformOrigin: 'center center'
    });
  });
}

/* =========================================================
   FLOATING CODE SYMBOLS (About section ambient decoration)
   ========================================================= */
function animateCodeSymbols() {
  document.querySelectorAll('.code-symbol').forEach((sym, i) => {
    gsap.to(sym, {
      y:        -20 + Math.random() * 40,
      x:        -10 + Math.random() * 20,
      rotation: -15 + Math.random() * 30,
      duration:   2 + Math.random() * 2,
      repeat:  -1,
      yoyo:   true,
      ease:   'sine.inOut',
      delay:   i * 0.3
    });
  });
}
