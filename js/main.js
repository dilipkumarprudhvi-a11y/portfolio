'use strict';

document.addEventListener('DOMContentLoaded', () => {

  // ============================================
  // 1. NATIVE SMOOTH SCROLL & NAVBAR DYNAMICS
  // ============================================
  const navbar    = document.getElementById('navbar');
  const navLinks  = document.querySelectorAll('.nav-link');
  const backToTop = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > 30) {
      navbar?.classList.add('nav-scrolled');
    } else {
      navbar?.classList.remove('nav-scrolled');
    }

    if (backToTop) {
      backToTop.classList.toggle('visible', scrollY > 400);
    }
  }, { passive: true });

  // Active section indicator on scroll
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
  }, { threshold: 0.3 });
  sections.forEach(s => sectionObserver.observe(s));

  // Smooth click scroll
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const navOffset = 80;
          const targetPos = target.getBoundingClientRect().top + window.pageYOffset - navOffset;
          window.scrollTo({ top: targetPos, behavior: 'smooth' });
        }
        closeMobileMenu();
      }
    });
  });

  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ============================================
  // 2. MOBILE DRAWER MENU
  // ============================================
  const hamburger     = document.getElementById('hamburger');
  const mobileMenu    = document.getElementById('mobile-menu');
  const mobileOverlay = document.getElementById('mobile-overlay');

  function openMobileMenu() {
    hamburger?.classList.add('open');
    hamburger?.setAttribute('aria-expanded', 'true');
    mobileMenu?.classList.add('active');
    mobileOverlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    hamburger?.classList.remove('open');
    hamburger?.setAttribute('aria-expanded', 'false');
    mobileMenu?.classList.remove('active');
    mobileOverlay?.classList.remove('active');
    document.body.style.overflow = '';
  }

  hamburger?.addEventListener('click', () => {
    if (mobileMenu?.classList.contains('active')) {
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
          if (target) {
            const navOffset = 70;
            const targetPos = target.getBoundingClientRect().top + window.pageYOffset - navOffset;
            window.scrollTo({ top: targetPos, behavior: 'smooth' });
          }
        }, 150);
      }
    });
  });

  // ============================================
  // 3. COPY EMAIL CLIPBOARD HELPER
  // ============================================
  const copyBtn = document.getElementById('copy-email-btn');
  const copyBtnText = document.getElementById('copy-btn-text');

  copyBtn?.addEventListener('click', () => {
    navigator.clipboard.writeText('dilipkumarprudhvi@gmail.com').then(() => {
      if (copyBtnText) copyBtnText.textContent = 'Copied! ✓';
      copyBtn.style.borderColor = '#22c55e';
      copyBtn.style.color = '#22c55e';

      setTimeout(() => {
        if (copyBtnText) copyBtnText.textContent = 'Copy Email';
        copyBtn.style.borderColor = '';
        copyBtn.style.color = '';
      }, 2500);
    });
  });

  // ============================================
  // 4. CUSTOM CURSOR (SUBTLE & RESPONSIVE)
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
    }, { passive: true });

    function renderCursor() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.left = ringX + 'px';
      ring.style.top  = ringY + 'px';
      requestAnimationFrame(renderCursor);
    }
    requestAnimationFrame(renderCursor);

    document.querySelectorAll('a, button, [data-tilt], .exhibition-card, .toolkit-card, input, textarea, .term-btn').forEach(el => {
      el.addEventListener('mouseenter', () => {
        dot.classList.add('cursor-hover');
        ring.classList.add('cursor-hover');
      });
      el.addEventListener('mouseleave', () => {
        dot.classList.remove('cursor-hover');
        ring.classList.remove('cursor-hover');
      });
    });
  }

  // ============================================
  // 5. CONTACT FORM VALIDATION
  // ============================================
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const btn          = form.querySelector('[type="submit"]');
      const originalHTML = btn.innerHTML;
      let valid          = true;

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

      btn.innerHTML = 'Sending...';
      btn.disabled  = true;

      setTimeout(() => {
        btn.innerHTML        = '&#10003; Message Sent!';
        btn.style.background = '#22c55e';
        btn.style.color      = '#fff';
        form.reset();

        setTimeout(() => {
          btn.innerHTML        = originalHTML;
          btn.style.background = '';
          btn.style.color      = '';
          btn.disabled         = false;
        }, 3000);
      }, 1000);
    });
  }

  // Escape closes menu
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMobileMenu();
  });

});

// ============================================
// 6. INTERACTIVE DEVELOPER TERMINAL CLI
// ============================================
const TERMINAL_COMMANDS = {
  help: () => 'Available commands: <span class="cmd-highlight">bio</span>, <span class="cmd-highlight">skills</span>, <span class="cmd-highlight">projects</span>, <span class="cmd-highlight">contact</span>, <span class="cmd-highlight">clear</span>',
  bio: () => `
    <div><strong>Prudhvi Dilip Kumar</strong> — Full-Stack Developer & Software Builder</div>
    <div style="color:var(--text-muted);margin-top:4px">🎓 B.Tech in Artificial Intelligence & Data Science (2024-Present)</div>
    <div style="color:var(--text-muted)">📐 Diploma in Engineering (2021-2024)</div>
    <div style="color:var(--text-secondary);margin-top:4px">Passionate about building scalable web applications with clean architecture, REST APIs, and modern databases.</div>
  `,
  skills: () => `
    <div><strong>Technical Stack:</strong></div>
    <div>• <span style="color:var(--accent-light)">Frontend:</span> React.js, JavaScript (ES6+), HTML5, CSS3, Responsive UI</div>
    <div>• <span style="color:var(--accent-light)">Backend:</span> Node.js, Express.js, RESTful APIs, Middleware</div>
    <div>• <span style="color:var(--accent-light)">Databases:</span> MySQL, Relational Schema Design, JDBC</div>
    <div>• <span style="color:var(--accent-light)">Languages:</span> Python, Java, C, JavaScript</div>
  `,
  projects: () => `
    <div><strong>Featured Projects:</strong></div>
    <div>1. <span style="color:var(--accent-light)">Fake News Detection System</span> — ML/NLP with OCR & Telugu/English detection.</div>
    <div>2. <span style="color:var(--accent-light)">Modern Interactive Calculator</span> — Responsive JS calculator with real-time math engine.</div>
    <div>3. <span style="color:var(--accent-light)">Developer Portfolio</span> — Modern full-stack showcase.</div>
    <div>4. <span style="color:var(--accent-light)">Full-Stack Web App</span> — React + Node + Express + MySQL.</div>
    <div style="color:var(--text-muted);margin-top:4px">Scroll to the Exhibition section to test live demos!</div>
  `,
  contact: () => `
    <div><strong>Get In Touch:</strong></div>
    <div>• Email: <a href="mailto:dilipkumarprudhvi@gmail.com" style="color:var(--accent-light);text-decoration:underline">dilipkumarprudhvi@gmail.com</a></div>
    <div>• GitHub: <a href="https://github.com/dilipkumarprudhvi-a11y" target="_blank" style="color:var(--accent-light);text-decoration:underline">github.com/dilipkumarprudhvi-a11y</a></div>
    <div>• Status: Open to Full-Stack Engineering roles</div>
  `,
};

window.runTermCmd = function(cmd) {
  const terminalBody = document.getElementById('terminal-output');
  const inputEl      = document.getElementById('terminal-input');
  if (!terminalBody) return;

  const cleanCmd = cmd.trim().toLowerCase();

  if (cleanCmd === 'clear') {
    terminalBody.innerHTML = `
      <div class="term-line welcome-line">Terminal screen cleared. Type <span class="cmd-highlight">help</span> for commands.</div>
    `;
    if (inputEl) inputEl.value = '';
    return;
  }

  const promptLine = document.createElement('div');
  promptLine.className = 'term-line prompt-line';
  promptLine.innerHTML = `<span class="term-prompt">pdk&gt;</span> <span class="term-text">${cmd}</span>`;
  terminalBody.appendChild(promptLine);

  const responseLine = document.createElement('div');
  responseLine.className = 'term-response';

  if (TERMINAL_COMMANDS[cleanCmd]) {
    responseLine.innerHTML = TERMINAL_COMMANDS[cleanCmd]();
  } else {
    responseLine.innerHTML = `Command not recognized: '<span style="color:#ef4444">${cmd}</span>'. Type <span class="cmd-highlight">help</span> for available commands.`;
  }

  terminalBody.appendChild(responseLine);
  terminalBody.scrollTop = terminalBody.scrollHeight;

  if (inputEl) inputEl.value = '';
};

document.addEventListener('DOMContentLoaded', () => {
  const inputEl = document.getElementById('terminal-input');
  inputEl?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = inputEl.value.trim();
      if (val) window.runTermCmd(val);
    }
  });
});
