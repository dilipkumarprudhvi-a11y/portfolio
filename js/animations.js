/**
 * animations.js
 * Comprehensive Motion Design System
 * 
 * Philosophy:
 * - Premium • Smooth • Technical • Memorable • Fast • Accessible
 * - Strict Animation Hierarchy:
 *   MICRO INTERACTION -> SECTION TRANSITION -> CONTENT REVEAL -> PROJECT INTERACTION -> BACKGROUND ATMOSPHERE
 * - GPU-friendly transforms, zero layout shifts, full prefers-reduced-motion support.
 */

'use strict';

(function () {
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  document.addEventListener('DOMContentLoaded', () => {
    initScrollReveals();
    initHeroParallax();
    initPhotoCardHoverTilt();
    initCustomCursor();
    initMagneticElements();
    initFakeNewsPipeline();
    initTimelineProgress();
    initCalculatorTactile();
    initTerminalAutoType();
  });

  /* ══════════════════════════════════════════════════════════════════
     1. SCROLL-LINKED SECTION & CONTENT REVEALS
     ══════════════════════════════════════════════════════════════════ */
  function initScrollReveals() {
    if (isReducedMotion) {
      document.querySelectorAll('[data-reveal="true"]').forEach(el => {
        el.classList.add('reveal-visible');
      });
      return;
    }

    const revealElements = document.querySelectorAll('[data-reveal="true"]');
    if (!revealElements.length) return;

    // Set initial concealed state
    revealElements.forEach(el => {
      el.classList.add('reveal-init');
    });

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -30px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  }

  /* ══════════════════════════════════════════════════════════════════
     2. DESKTOP CUSTOM CURSOR SYSTEM (LERP TRAILING RING + BADGES)
     ══════════════════════════════════════════════════════════════════ */
  function initCustomCursor() {
    if (isReducedMotion || !isFinePointer || window.innerWidth <= 768) {
      return;
    }

    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    const badge = document.getElementById('cursor-badge');
    if (!dot || !ring) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isMoving = false;
    let currentBadgeText = '';

    const badgeMap = {
      view: 'VIEW ↗',
      open: 'OPEN ↗',
      explore: 'EXPLORE ↗',
      mail: 'MAIL ↗',
      send: 'SEND ↗',
      copy: 'COPY ↗',
      top: 'TOP ↗'
    };

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isMoving) {
        document.body.classList.add('cursor-visible');
        ringX = mouseX;
        ringY = mouseY;
        isMoving = true;
      }

      // Dot tracks immediately at 1:1 precision
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
      document.body.classList.remove('cursor-visible');
      isMoving = false;
    });

    // Fluid 60fps Lerp loop for trailing ring (~90ms damping)
    function renderCursor() {
      if (isMoving) {
        const ease = 0.16;
        ringX += (mouseX - ringX) * ease;
        ringY += (mouseY - ringY) * ease;

        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }
      requestAnimationFrame(renderCursor);
    }
    requestAnimationFrame(renderCursor);

    // Interactive element hover detection using event delegation
    document.addEventListener('mouseover', (e) => {
      const target = e.target.closest('[data-cursor], .btn, .nav-link, .system-link, .channel-link, .interactive-tab');
      if (!target) {
        if (currentBadgeText) {
          ring.classList.remove('has-badge', 'is-hovering');
          if (badge) badge.textContent = '';
          currentBadgeText = '';
        }
        return;
      }

      const cursorType = target.getAttribute('data-cursor');
      if (cursorType && badgeMap[cursorType]) {
        currentBadgeText = badgeMap[cursorType];
        if (badge) badge.textContent = currentBadgeText;
        ring.classList.add('has-badge');
        ring.classList.remove('is-hovering');
      } else {
        ring.classList.add('is-hovering');
        ring.classList.remove('has-badge');
        if (badge) badge.textContent = '';
        currentBadgeText = '';
      }
    });

    document.addEventListener('mouseout', (e) => {
      const target = e.target.closest('[data-cursor], .btn, .nav-link, .system-link, .channel-link, .interactive-tab');
      if (target) {
        ring.classList.remove('has-badge', 'is-hovering');
        if (badge) badge.textContent = '';
        currentBadgeText = '';
      }
    });
  }

  /* ══════════════════════════════════════════════════════════════════
     3. HERO VISUAL MOUSE PARALLAX (±6px DAMPED TRACKING)
     ══════════════════════════════════════════════════════════════════ */
  function initHeroParallax() {
    if (isReducedMotion || !isFinePointer || window.innerWidth <= 768) return;

    const hero = document.getElementById('home');
    const previewWrap = document.querySelector('.hero-preview-wrap');
    if (!hero || !previewWrap) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let isHoveringHero = false;

    hero.addEventListener('mousemove', (e) => {
      isHoveringHero = true;
      const rect = hero.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;

      // ±6px max controlled deflection
      targetX = relX * 12;
      targetY = relY * 12;
    }, { passive: true });

    hero.addEventListener('mouseleave', () => {
      isHoveringHero = false;
      targetX = 0;
      targetY = 0;
    });

    function renderParallax() {
      const ease = 0.08;
      currentX += (targetX - currentX) * ease;
      currentY += (targetY - currentY) * ease;

      if (Math.abs(currentX) > 0.01 || Math.abs(currentY) > 0.01 || isHoveringHero) {
        previewWrap.style.transform = `perspective(1000px) rotateX(${-currentY * 0.4}deg) rotateY(${currentX * 0.4}deg) translate3d(${currentX}px, ${currentY}px, 0)`;
      } else {
        previewWrap.style.transform = 'none';
      }

      requestAnimationFrame(renderParallax);
    }
    requestAnimationFrame(renderParallax);
  }

  /* ══════════════════════════════════════════════════════════════════
     3b. PHOTO CARDS 3D PERSPECTIVE TILT (DESKTOP ONLY)
     ══════════════════════════════════════════════════════════════════ */
  function initPhotoCardHoverTilt() {
    if (isReducedMotion || !isFinePointer || window.innerWidth <= 768) return;

    const cards = document.querySelectorAll('.hero-portrait-card, .about-focus-card');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        const tiltX = (y / (rect.height / 2)) * -4;
        const tiltY = (x / (rect.width / 2)) * 4;

        card.style.transform = `perspective(800px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) translateY(-3px)`;
      }, { passive: true });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  /* ══════════════════════════════════════════════════════════════════
     4. MAGNETIC BUTTONS (SPRING MICRO-INTERACTION)
     ══════════════════════════════════════════════════════════════════ */
  function initMagneticElements() {
    if (isReducedMotion || !isFinePointer || window.innerWidth <= 768) return;

    const magneticElements = document.querySelectorAll('.btn-magnetic, [data-magnetic="true"]');
    magneticElements.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - (rect.left + rect.width / 2);
        const y = e.clientY - (rect.top + rect.height / 2);

        // Max magnetic pull of 5px
        const pullX = Math.max(-5, Math.min(5, x * 0.18));
        const pullY = Math.max(-5, Math.min(5, y * 0.18));

        btn.style.transform = `translate3d(${pullX}px, ${pullY}px, 0)`;
      }, { passive: true });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate3d(0, 0, 0)';
      });
    });
  }

  /* ══════════════════════════════════════════════════════════════════
     5. SIGNATURE ANIMATION: FAKE NEWS DETECTION 6-STEP PIPELINE
     ══════════════════════════════════════════════════════════════════ */
  function initFakeNewsPipeline() {
    const pipeline = document.getElementById('fake-news-pipeline');
    if (!pipeline) return;

    const nodes = pipeline.querySelectorAll('.pipe-node');
    if (!nodes.length) return;

    let activeStep = 1;
    let autoTimer = null;
    let isUserInteracting = false;

    function setStep(stepNum) {
      activeStep = stepNum;
      nodes.forEach(node => {
        const num = parseInt(node.getAttribute('data-pipe-step'), 10);
        if (num === activeStep) {
          node.classList.add('pipe-active');
        } else {
          node.classList.remove('pipe-active');
        }
      });
    }

    // Interactive click and hover selection
    nodes.forEach(node => {
      node.addEventListener('click', () => {
        isUserInteracting = true;
        const num = parseInt(node.getAttribute('data-pipe-step'), 10);
        setStep(num);
      });

      node.addEventListener('mouseenter', () => {
        isUserInteracting = true;
        const num = parseInt(node.getAttribute('data-pipe-step'), 10);
        setStep(num);
      });
    });

    pipeline.addEventListener('mouseleave', () => {
      isUserInteracting = false;
    });

    // Gentle automated cyclic pulse across 6 steps
    if (!isReducedMotion) {
      autoTimer = setInterval(() => {
        if (!isUserInteracting) {
          activeStep = (activeStep % 6) + 1;
          setStep(activeStep);
        }
      }, 3200);
    }
  }

  /* ══════════════════════════════════════════════════════════════════
     6. TIMELINE PROGRESSIVE VERTICAL DRAW
     ══════════════════════════════════════════════════════════════════ */
  function initTimelineProgress() {
    const timeline = document.getElementById('experience-timeline') || document.querySelector('.timeline-container');
    if (!timeline) return;

    if (isReducedMotion) {
      timeline.classList.add('timeline-drawn');
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          timeline.classList.add('timeline-drawn');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.18
    });

    observer.observe(timeline);
  }

  /* ══════════════════════════════════════════════════════════════════
     7. CALCULATOR TACTILE FEEDBACK (CASE STUDY 02)
     ══════════════════════════════════════════════════════════════════ */
  function initCalculatorTactile() {
    const calcKeys = document.querySelectorAll('.btn-calc, .calc-key');
    const calcScreen = document.querySelector('.calc-screen');

    calcKeys.forEach(key => {
      key.addEventListener('click', () => {
        // Subtle haptic scale
        key.style.transform = 'scale(0.92)';
        setTimeout(() => {
          key.style.transform = '';
        }, 120);

        // Flash screen compute on eval key
        if ((key.classList.contains('btn-calc-eval') || key.textContent.trim() === '=') && calcScreen) {
          calcScreen.classList.remove('calc-flash');
          void calcScreen.offsetWidth; // Trigger reflow
          calcScreen.classList.add('calc-flash');
        }
      });
    });
  }

  /* ══════════════════════════════════════════════════════════════════
     8. TERMINAL AUTO-TYPE INTRO (ABOUT SECTION CLI)
     ══════════════════════════════════════════════════════════════════ */
  function initTerminalAutoType() {
    if (isReducedMotion) return;

    const terminal = document.getElementById('interactive-terminal') || document.getElementById('about-cli');
    if (!terminal) return;

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          obs.disconnect();
          const input = document.getElementById('terminal-input') || terminal.querySelector('input');
          if (!input || input.value.trim() !== '' || document.activeElement === input) return;

          const cmd = 'pdk> help';
          let idx = 0;
          function typeChar() {
            if (document.activeElement === input) return;
            if (idx < cmd.length) {
              input.value += cmd[idx];
              idx++;
              setTimeout(typeChar, 85);
            }
          }
          setTimeout(typeChar, 500);
        }
      });
    }, { threshold: 0.35 });

    observer.observe(terminal);
  }

})();
