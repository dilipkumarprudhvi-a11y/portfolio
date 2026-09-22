/**
 * animations.js
 * Prudhvi Dilip Kumar — Senior Full-Stack Developer Portfolio
 *
 * Ultra-Smooth 120fps Animation & Motion Suite
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
    document.querySelectorAll('.skill-bar-fill').forEach(el => {
      el.style.width = el.dataset.level + '%';
    });
    return;
  }

  // 2. Scroll-Driven Reveal Animations
  initScrollReveals();
  initTimelineProgressDraw();
  initTerminalAutoType();

  // 3. Stat Counters & Skill Bars
  initExponentialCounters();
  initSkillBarsWithGlow();

  // 4. Interactive Micro-Interactions
  init3DCardSpotlight();
  initMagneticElements();
  initSkillsFilter();
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

  const duration = prefersReducedMotion ? 0.05 : 1.2;

  gsap.to(loaderBar, {
    width: '100%',
    duration: duration,
    ease: 'power2.inOut',
    onComplete: () => {
      gsap.to(loader, {
        opacity: 0,
        y: -30,
        duration: prefersReducedMotion ? 0 : 0.6,
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

  // Staggered blur-fade entrance
  tl.fromTo('.availability-badge', 
    { opacity: 0, y: 20, filter: 'blur(8px)' }, 
    { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.6 }
  );

  tl.fromTo('.hero-pre', 
    { opacity: 0, y: 25, filter: 'blur(6px)' }, 
    { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.5 }, 
    '-=0.3'
  );

  tl.fromTo('.hero-name', 
    { opacity: 0, y: 40, filter: 'blur(12px)', scale: 0.96 }, 
    { opacity: 1, y: 0, filter: 'blur(0px)', scale: 1, duration: 0.8 }, 
    '-=0.3'
  );

  tl.fromTo('.hero-title', 
    { opacity: 0, y: 25, filter: 'blur(6px)' }, 
    { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.5 }, 
    '-=0.4'
  );

  tl.fromTo('.hero-subtitle', 
    { opacity: 0, y: 20 }, 
    { opacity: 1, y: 0, duration: 0.5 }, 
    '-=0.3'
  );

  tl.fromTo('.hero-description', 
    { opacity: 0, y: 20 }, 
    { opacity: 1, y: 0, duration: 0.5 }, 
    '-=0.3'
  );

  tl.fromTo('.hero-ctas .btn, .hero-ctas .copy-btn', 
    { opacity: 0, y: 20, scale: 0.95 }, 
    { opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.5 }, 
    '-=0.2'
  );

  tl.fromTo('.hero-badge', 
    { opacity: 0, y: 15, scale: 0.9 }, 
    { opacity: 1, y: 0, scale: 1, stagger: 0.05, duration: 0.4 }, 
    '-=0.2'
  );

  tl.fromTo('.hero-canvas-wrap', 
    { opacity: 0, scale: 0.85 }, 
    { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' }, 
    '-=1.0'
  );

  tl.fromTo('.scroll-indicator', 
    { opacity: 0 }, 
    { opacity: 1, duration: 0.6 }, 
    '-=0.3'
  );

  // Start typewriter effect
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

    let speed = isDeleting ? 40 : 85;

    if (!isDeleting && charIndex === currentWord.length) {
      speed      = 2200; // Pause at full word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex  = (wordIndex + 1) % words.length;
      speed      = 400;  // Pause before next word
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
      { opacity: 0, y: 40, filter: 'blur(8px)' },
      {
        opacity: 1, y: 0, filter: 'blur(0px)',
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: header,
          start: 'top 85%',
          toggleActions: 'play none none none',
          once: true
        }
      }
    );
  });

  // About Bento Cards
  gsap.fromTo('.about-bento-grid > div',
    { opacity: 0, y: 45, scale: 0.97 },
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

  // Skill Cards
  gsap.fromTo('.skill-card',
    { opacity: 0, y: 35, scale: 0.95 },
    {
      opacity: 1, y: 0, scale: 1,
      duration: 0.55,
      stagger: 0.04,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.skills-grid',
        start: 'top 85%',
        once: true
      }
    }
  );

  // Education Cards
  gsap.fromTo('.edu-card',
    { opacity: 0, y: 40, scale: 0.96 },
    {
      opacity: 1, y: 0, scale: 1,
      duration: 0.7,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.education-grid',
        start: 'top 85%',
        once: true
      }
    }
  );

  // GitHub Bento Card
  gsap.fromTo('.github-bento-card',
    { opacity: 0, y: 40, scale: 0.96 },
    {
      opacity: 1, y: 0, scale: 1,
      duration: 0.8,
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
    { opacity: 0, y: 40 },
    {
      opacity: 1, y: 0,
      duration: 0.75,
      stagger: 0.15,
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
        scrub: 0.3
      }
    });
  }
}

/* =========================================================
   4. PROGRESSIVE TIMELINE LINE DRAW
   ========================================================= */
function initTimelineProgressDraw() {
  const timeline = document.querySelector('.timeline');
  if (!timeline) return;

  const items = gsap.utils.toArray('.timeline-item');

  items.forEach((item, index) => {
    const dot     = item.querySelector('.timeline-dot');
    const content = item.querySelector('.timeline-content');
    const side    = item.dataset.side || 'left';
    const xOffset = side === 'left' ? -35 : 35;

    // Reveal item content
    gsap.fromTo(content,
      { opacity: 0, x: xOffset, filter: 'blur(6px)' },
      {
        opacity: 1, x: 0, filter: 'blur(0px)',
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 80%',
          once: true
        }
      }
    );

    // Pulse dot when reached
    if (dot) {
      gsap.fromTo(dot,
        { scale: 0, opacity: 0 },
        {
          scale: 1, opacity: 1,
          duration: 0.5,
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

      // Small delay then type 'bio' command
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
            }, 300);
          }
        }
        simulateTyping();
      }, 600);
    }
  });
}

/* =========================================================
   6. EXPONENTIALLY EASED NUMBER COUNTERS
   ========================================================= */
function initExponentialCounters() {
  const counters = document.querySelectorAll('.stat-number');
  if (!counters.length) return;

  counters.forEach(counter => {
    const target = parseInt(counter.dataset.target, 10) || 0;
    const suffix = counter.dataset.suffix !== undefined ? counter.dataset.suffix : '+';

    ScrollTrigger.create({
      trigger: counter,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 1.8,
          ease: 'power3.out',
          onUpdate: () => {
            counter.textContent = Math.floor(obj.val) + suffix;
          },
          onComplete: () => {
            counter.textContent = target + suffix;
            gsap.fromTo(counter, 
              { scale: 1.1 }, 
              { scale: 1, duration: 0.3, ease: 'power1.out' }
            );
          }
        });
      }
    });
  });
}

/* =========================================================
   7. SKILL BARS WITH GLOWING HEAD
   ========================================================= */
function initSkillBarsWithGlow() {
  const bars = document.querySelectorAll('.skill-bar');
  if (!bars.length) return;

  bars.forEach(bar => {
    const fill = bar.querySelector('.skill-bar-fill');
    if (!fill) return;
    const level = fill.dataset.level || 80;

    ScrollTrigger.create({
      trigger: bar,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        gsap.to(fill, {
          width: level + '%',
          duration: 1.4,
          ease: 'power2.out'
        });
      }
    });
  });
}

/* =========================================================
   8. 3D PROXIMITY SPOTLIGHT & CARD TILT
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
      const rotateX = ((y - centerY) / centerY) * -9;
      const rotateY = ((x - centerX) / centerX) *  9;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(8px)`;

      const shine = card.querySelector('.card-shine');
      if (shine) {
        shine.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(245, 158, 11, 0.16) 0%, transparent 60%)`;
      }
    }

    function onMouseLeave() {
      card.style.transform  = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
      card.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
      const shine = card.querySelector('.card-shine');
      if (shine) shine.style.background = 'transparent';
      setTimeout(() => { card.style.transition = ''; card.style.willChange = 'auto'; }, 400);
    }

    card.addEventListener('mouseenter', onMouseEnter);
    card.addEventListener('mousemove', onMouseMove);
    card.addEventListener('mouseleave', onMouseLeave);
  });
}

/* =========================================================
   9. MAGNETIC BUTTONS (SPRING PHYSICS)
   ========================================================= */
function initMagneticElements() {
  if (window.matchMedia('(hover: none)').matches) return;

  document.querySelectorAll('.magnetic-btn, .term-btn, .copy-btn').forEach(btn => {
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

/* =========================================================
   10. SKILLS FILTER INTERACTION
   ========================================================= */
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');
  if (!filterBtns.length || !skillCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      const filter = btn.dataset.filter;

      skillCards.forEach(card => {
        const category = card.dataset.category;
        const matches  = filter === 'all' || category === filter;

        if (matches) {
          gsap.to(card, {
            display: 'block',
            opacity: 1,
            scale: 1,
            duration: 0.35,
            ease: 'power2.out'
          });
        } else {
          gsap.to(card, {
            opacity: 0,
            scale: 0.95,
            duration: 0.25,
            ease: 'power2.in',
            onComplete: () => { card.style.display = 'none'; }
          });
        }
      });
    });
  });
}
