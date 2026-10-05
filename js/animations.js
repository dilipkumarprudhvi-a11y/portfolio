/**
 * animations.js
 * Prudhvi Dilip Kumar — Senior Full-Stack Developer Portfolio
 *
 * Creative Mints (Mike) "Portfolio / Animation" Motion Suite
 * Powered by GSAP 3.x + ScrollTrigger Plugin
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  initMotionSuite();
});

function initMotionSuite() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('GSAP or ScrollTrigger not loaded. Running fallback styles.');
    document.body.classList.add('loaded');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Kick off Loading Screen & Hero Entrance
  initLoadingScreen(prefersReducedMotion);

  if (prefersReducedMotion) {
    document.querySelectorAll('.stat-number').forEach(el => {
      el.textContent = el.dataset.target + (el.dataset.suffix || '+');
    });
    return;
  }

  // 2. Scroll-Driven Reveal Animations
  initScrollReveals();
  initTimelineProgressDraw();
  initTerminalAutoType();

  // 3. Interactive Micro-Interactions
  init3DCardSpotlight();
  initMagneticElements();
}

/* =========================================================
   1. LOADING SCREEN & CINEMATIC HERO ENTRANCE
   ========================================================= */
function initLoadingScreen(prefersReducedMotion) {
  const loader    = document.getElementById('loading-screen');
  const loaderBar = document.querySelector('.loader-bar');

  if (!loader || !loaderBar) {
    document.body.classList.add('loaded');
    animateCinematicHero();
    return;
  }

  const duration = prefersReducedMotion ? 0.05 : 1.1;

  gsap.to(loaderBar, {
    width: '100%',
    duration: duration,
    ease: 'power2.inOut',
    onComplete: () => {
      gsap.to(loader, {
        opacity: 0,
        y: -25,
        duration: prefersReducedMotion ? 0 : 0.5,
        ease: 'power3.inOut',
        onComplete: () => {
          loader.style.display = 'none';
          document.body.classList.add('loaded');
          animateCinematicHero();
        }
      });
    }
  });
}

function animateCinematicHero() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  // Floating Nav Entrance
  tl.fromTo('.floating-pill-nav',
    { opacity: 0, y: -20, scale: 0.98 },
    { opacity: 1, y: 0, scale: 1, duration: 0.6 }
  );

  // Status Pill
  tl.fromTo('.hero-status-pill',
    { opacity: 0, y: 20, filter: 'blur(8px)' },
    { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.6 },
    '-=0.3'
  );

  // Kinetic Headline Lines
  tl.fromTo('.hero-headline .headline-line',
    { opacity: 0, y: 35, filter: 'blur(10px)' },
    { opacity: 1, y: 0, filter: 'blur(0px)', stagger: 0.12, duration: 0.75 },
    '-=0.3'
  );

  // Subtitle & Meta
  tl.fromTo('.hero-meta-subtitle',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.5 },
    '-=0.3'
  );

  // Editorial Narrative
  tl.fromTo('.hero-editorial-desc',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.5 },
    '-=0.3'
  );

  // Action Buttons
  tl.fromTo('.hero-actions-bar .btn, .hero-actions-bar .copy-btn',
    { opacity: 0, y: 20, scale: 0.95 },
    { opacity: 1, y: 0, scale: 1, stagger: 0.08, duration: 0.5 },
    '-=0.2'
  );

  // Metrics Ribbon
  tl.fromTo('.hero-metrics-ribbon',
    { opacity: 0, y: 15 },
    { opacity: 1, y: 0, duration: 0.4 },
    '-=0.2'
  );

  // 3D Canvas Burst
  tl.fromTo('.hero-canvas-wrap',
    { opacity: 0, scale: 0.85 },
    { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' },
    '-=1.0'
  );

  // Scroll Explorer Indicator
  tl.fromTo('.scroll-explore-indicator',
    { opacity: 0 },
    { opacity: 1, duration: 0.6 },
    '-=0.3'
  );

  // Start Typewriter
  tl.call(startTypewriter);
}

/* =========================================================
   2. TYPEWRITER EFFECT
   ========================================================= */
function startTypewriter() {
  const el = document.querySelector('.typewriter-text');
  if (!el) return;

  const words = [
    'Full-Stack Developer',
    'Software Engineer',
    'Backend API Architect',
    'React & Node Builder',
    'Problem Solver'
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

    let speed = isDeleting ? 35 : 75;

    if (!isDeleting && charIndex === currentWord.length) {
      speed      = 2200; // Full pause
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex  = (wordIndex + 1) % words.length;
      speed      = 400;
    }

    setTimeout(type, speed);
  }

  type();
}

/* =========================================================
   3. SCROLL REVEAL STAGGERS
   ========================================================= */
function initScrollReveals() {
  // Section Headers
  gsap.utils.toArray('.section-header').forEach(header => {
    gsap.fromTo(header,
      { opacity: 0, y: 35, filter: 'blur(8px)' },
      {
        opacity: 1, y: 0, filter: 'blur(0px)',
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: header,
          start: 'top 85%',
          once: true
        }
      }
    );
  });

  // About Bento Cards
  gsap.fromTo('.about-bento-grid > div',
    { opacity: 0, y: 40, scale: 0.98 },
    {
      opacity: 1, y: 0, scale: 1,
      duration: 0.75,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.about-bento-grid',
        start: 'top 80%',
        once: true
      }
    }
  );

  // Exhibition Project Cards
  gsap.fromTo('.exhibition-card',
    { opacity: 0, y: 45, scale: 0.97 },
    {
      opacity: 1, y: 0, scale: 1,
      duration: 0.65,
      stagger: 0.12,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.exhibition-grid',
        start: 'top 85%',
        once: true
      }
    }
  );

  // Toolkit Bento Cards
  gsap.fromTo('.toolkit-card',
    { opacity: 0, y: 35, scale: 0.96 },
    {
      opacity: 1, y: 0, scale: 1,
      duration: 0.6,
      stagger: 0.08,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.toolkit-bento-grid',
        start: 'top 85%',
        once: true
      }
    }
  );

  // Education Cards
  gsap.fromTo('.edu-card',
    { opacity: 0, y: 35, scale: 0.97 },
    {
      opacity: 1, y: 0, scale: 1,
      duration: 0.65,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.education-grid',
        start: 'top 85%',
        once: true
      }
    }
  );

  // GitHub Spotlight
  gsap.fromTo('.github-bento-card',
    { opacity: 0, y: 40, scale: 0.97 },
    {
      opacity: 1, y: 0, scale: 1,
      duration: 0.75,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.github-section',
        start: 'top 85%',
        once: true
      }
    }
  );

  // Contact Grid
  gsap.fromTo('.contact-grid > div',
    { opacity: 0, y: 35 },
    {
      opacity: 1, y: 0,
      duration: 0.7,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.contact-section',
        start: 'top 85%',
        once: true
      }
    }
  );

  // Scroll Progress Bar
  const progressBar = document.querySelector('.scroll-progress-bar');
  if (progressBar) {
    gsap.to(progressBar, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.2
      }
    });
  }
}

/* =========================================================
   4. PROGRESSIVE TIMELINE LINE DRAW
   ========================================================= */
function initTimelineProgressDraw() {
  const timeline = document.querySelector('.timeline');
  const progressBar = document.getElementById('timeline-progress-bar');
  if (!timeline) return;

  if (progressBar) {
    gsap.to(progressBar, {
      height: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: timeline,
        start: 'top 70%',
        end: 'bottom 85%',
        scrub: 0.4
      }
    });
  }

  const items = gsap.utils.toArray('.timeline-item');
  items.forEach((item) => {
    const dot     = item.querySelector('.timeline-dot');
    const content = item.querySelector('.timeline-content');
    const side    = item.dataset.side || 'left';
    const xOffset = side === 'left' ? -30 : 30;

    // Reveal item content
    gsap.fromTo(content,
      { opacity: 0, x: xOffset, filter: 'blur(5px)' },
      {
        opacity: 1, x: 0, filter: 'blur(0px)',
        duration: 0.65,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 80%',
          once: true
        }
      }
    );

    if (dot) {
      gsap.fromTo(dot,
        { scale: 0, opacity: 0 },
        {
          scale: 1, opacity: 1,
          duration: 0.4,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            once: true,
            onEnter: () => dot.classList.add('active')
          }
        }
      );
    }
  });
}

/* =========================================================
   5. TERMINAL AUTO-TYPE ON SCROLL
   ========================================================= */
function initTerminalAutoType() {
  const terminal = document.getElementById('interactive-terminal');
  if (!terminal) return;

  let hasTyped = false;

  ScrollTrigger.create({
    trigger: terminal,
    start: 'top 75%',
    once: true,
    onEnter: () => {
      if (hasTyped) return;
      hasTyped = true;

      setTimeout(() => {
        const input = document.getElementById('terminal-input');
        if (!input) return;

        const cmd = 'bio';
        let i = 0;

        function simulateTyping() {
          if (i < cmd.length) {
            input.value += cmd.charAt(i);
            i++;
            setTimeout(simulateTyping, 120);
          } else {
            setTimeout(() => {
              if (typeof window.runTermCmd === 'function') {
                window.runTermCmd('bio');
              }
            }, 250);
          }
        }
        simulateTyping();
      }, 500);
    }
  });
}

/* =========================================================
   6. 3D PROXIMITY SPOTLIGHT & CARD TILT
   ========================================================= */
function init3DCardSpotlight() {
  if (window.matchMedia('(hover: none)').matches) return;

  document.querySelectorAll('[data-tilt]').forEach(card => {
    let bounds;

    function onMouseEnter() {
      bounds = card.getBoundingClientRect();
      card.style.willChange = 'transform';
    }

    function onMouseMove(e) {
      if (!bounds) bounds = card.getBoundingClientRect();
      const x = e.clientX - bounds.left;
      const y = e.clientY - bounds.top;
      const centerX = bounds.width / 2;
      const centerY = bounds.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) *  6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(6px)`;
    }

    function onMouseLeave() {
      card.style.transform  = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
      card.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
      setTimeout(() => { card.style.transition = ''; card.style.willChange = 'auto'; }, 400);
    }

    card.addEventListener('mouseenter', onMouseEnter);
    card.addEventListener('mousemove', onMouseMove);
    card.addEventListener('mouseleave', onMouseLeave);
  });
}

/* =========================================================
   7. MAGNETIC BUTTONS (SPRING PHYSICS)
   ========================================================= */
function initMagneticElements() {
  if (window.matchMedia('(hover: none)').matches) return;

  document.querySelectorAll('.magnetic-btn, .term-btn, .copy-btn, .btn-pill-resume').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);

      gsap.to(btn, {
        x: x * 0.28,
        y: y * 0.28,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1.2, 0.4)'
      });
    });
  });
}
