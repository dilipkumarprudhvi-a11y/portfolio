/**
 * animations.js
 * Lightweight, Non-Destructive Interactive Polish
 * Ensures 100% visibility of all content at all times.
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  // Start typewriter effect in hero
  startTypewriter();

  // Interactive 3D Card Hover Tilt
  init3DCardTilt();

  // Magnetic Button Hover
  initMagneticButtons();

  // Terminal auto-prompt preview
  initTerminalQuickPreview();
});

/* ─── 1. TYPEWRITER EFFECT ───────────────────────────────────── */
function startTypewriter() {
  const el = document.querySelector('.typewriter-text');
  if (!el) return;

  const phrases = [
    'Full-Stack Developer',
    'Backend API Architect',
    'React & Node.js Builder',
    'Relational SQL Engineer',
    'AI & Data Science Student'
  ];

  let phraseIdx = 0;
  let charIdx   = 0;
  let isDeleting = false;

  function tick() {
    const current = phrases[phraseIdx];

    if (isDeleting) {
      el.textContent = current.substring(0, charIdx - 1);
      charIdx--;
    } else {
      el.textContent = current.substring(0, charIdx + 1);
      charIdx++;
    }

    let speed = isDeleting ? 30 : 65;

    if (!isDeleting && charIdx === current.length) {
      speed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      speed = 350;
    }

    setTimeout(tick, speed);
  }

  tick();
}

/* ─── 2. 3D CARD TILT ON HOVER (DESKTOP ONLY) ────────────────── */
function init3DCardTilt() {
  if (window.matchMedia('(hover: none)').matches) return;

  document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect    = card.getBoundingClientRect();
      const x       = e.clientX - rect.left;
      const y       = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotX    = ((y - centerY) / centerY) * -5;
      const rotY    = ((x - centerX) / centerX) *  5;

      card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });
}

/* ─── 3. MAGNETIC BUTTONS (SPRING MICRO-INTERACTION) ─────────── */
function initMagneticButtons() {
  if (window.matchMedia('(hover: none)').matches) return;

  document.querySelectorAll('.magnetic-btn, .btn-pill-resume').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x    = e.clientX - (rect.left + rect.width / 2);
      const y    = e.clientY - (rect.top + rect.height / 2);
      btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px)';
    });
  });
}

/* ─── 4. TERMINAL AUTO PREVIEW ───────────────────────────────── */
function initTerminalQuickPreview() {
  const terminal = document.getElementById('interactive-terminal');
  if (!terminal) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        observer.disconnect();
        const input = document.getElementById('terminal-input');
        if (!input) return;
        if (input.value.trim() !== '' || document.activeElement === input) return;
        const cmd = 'bio';
        let i = 0;
        function typeChar() {
          if (document.activeElement === input && input.value !== cmd.substring(0, i)) return;
          if (i < cmd.length) {
            input.value += cmd[i];
            i++;
            setTimeout(typeChar, 100);
          } else {
            setTimeout(() => {
              if (typeof window.runTermCmd === 'function' && input.value === cmd) {
                window.runTermCmd('bio');
              }
            }, 300);
          }
        }
        setTimeout(typeChar, 400);
      }
    });
  }, { threshold: 0.4 });

  observer.observe(terminal);
}
