'use strict';

/**
 * main.js
 * Core application logic: navigation, real-time form validation, terminal CLI, and micro-interactions.
 * Author: Prudhvi Dilip Kumar
 */

document.addEventListener('DOMContentLoaded', () => {

  // ============================================
  // 1. SCROLL PROGRESS & NAVBAR SPY
  // ============================================
  const scrollProgress = document.getElementById('scroll-progress');
  const navLinks = document.querySelectorAll('.nav-link');
  const backToTop = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
    if (scrollProgress) scrollProgress.style.width = progress + '%';

    if (backToTop) {
      backToTop.classList.toggle('visible', window.scrollY > 400);
    }
  }, { passive: true });

  // IntersectionObserver for active section link highlighting
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
  }, { threshold: 0.25 });
  sections.forEach(s => sectionObserver.observe(s));

  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ============================================
  // 2. MOBILE DRAWER MENU
  // ============================================
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileOverlay = document.getElementById('mobile-overlay');
  const mobileCloseBtn = document.getElementById('mobile-close-btn');

  function openMobileMenu() {
    hamburger?.setAttribute('aria-expanded', 'true');
    mobileMenu?.classList.add('active');
    mobileOverlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    hamburger?.setAttribute('aria-expanded', 'false');
    mobileMenu?.classList.remove('active');
    mobileOverlay?.classList.remove('active');
    document.body.style.overflow = '';
  }

  hamburger?.addEventListener('click', openMobileMenu);
  mobileCloseBtn?.addEventListener('click', closeMobileMenu);
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
            const navOffset = 80;
            const targetPos = target.getBoundingClientRect().top + window.pageYOffset - navOffset;
            window.scrollTo({ top: targetPos, behavior: 'smooth' });
          }
        }, 120);
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMobileMenu();
  });

  // ============================================
  // 3. COPY EMAIL CLIPBOARD ACTIONS
  // ============================================
  const emailAddress = 'dilipkumarprudhvi@gmail.com';

  function attachCopyEmail(btnId, textId) {
    const btn = document.getElementById(btnId);
    if (!btn) return;

    btn.addEventListener('click', () => {
      navigator.clipboard.writeText(emailAddress).then(() => {
        const textEl = textId ? document.getElementById(textId) : null;
        const originalText = textEl ? textEl.textContent : btn.textContent;

        if (textEl) {
          textEl.textContent = 'Copied! ✓';
        } else {
          btn.textContent = 'Copied to clipboard! ✓';
        }

        btn.style.borderColor = '#10B981';
        btn.style.color = '#10B981';

        setTimeout(() => {
          if (textEl) {
            textEl.textContent = originalText;
          } else {
            btn.textContent = originalText;
          }
          btn.style.borderColor = '';
          btn.style.color = '';
        }, 2500);
      });
    });
  }

  attachCopyEmail('copy-email-btn', 'copy-btn-text');
  attachCopyEmail('copy-email-btn-2', null);

  // ============================================
  // 4. CONTACT FORM REAL-TIME VALIDATION
  // ============================================
  const form = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');

  if (form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');

    function validateField(input) {
      const errorEl = input.parentElement.querySelector('.form-error');
      const val = input.value.trim();
      let isValid = true;
      let msg = '';

      if (!val) {
        isValid = false;
        const label = input.parentElement.querySelector('label');
        const fieldName = label ? label.textContent.replace('*', '').trim() : 'field';
        msg = `Please enter ${fieldName.toLowerCase()}.`;
      } else if (input.type === 'email') {
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
        if (!emailRegex.test(val)) {
          isValid = false;
          msg = 'Please enter a valid email address (e.g. name@example.com).';
        }
      }

      if (!isValid) {
        input.classList.add('error');
        input.classList.remove('valid');
        input.setAttribute('aria-invalid', 'true');
        if (errorEl) errorEl.textContent = msg;
      } else {
        input.classList.remove('error');
        input.classList.add('valid');
        input.setAttribute('aria-invalid', 'false');
        if (errorEl) errorEl.textContent = '';
      }

      return isValid;
    }

    // Dynamic real-time validation
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        if (input.classList.contains('error')) {
          validateField(input);
        }
      });

      input.addEventListener('blur', () => {
        if (input.value.trim() !== '') {
          validateField(input);
        }
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      let isFormValid = true;
      let firstInvalidInput = null;

      inputs.forEach(input => {
        const valid = validateField(input);
        if (!valid) {
          isFormValid = false;
          if (!firstInvalidInput) firstInvalidInput = input;
        }
      });

      if (!isFormValid) {
        if (firstInvalidInput) firstInvalidInput.focus();
        return;
      }

      const submitBtn = form.querySelector('[type="submit"]');
      const originalHTML = submitBtn.innerHTML;
      submitBtn.innerHTML = 'Transmitting Message...';
      submitBtn.disabled = true;

      if (formFeedback) {
        formFeedback.style.display = 'none';
        formFeedback.className = 'form-feedback';
      }

      setTimeout(() => {
        submitBtn.innerHTML = '&#10003; Message Transmitted!';
        submitBtn.style.background = '#10B981';
        submitBtn.style.borderColor = '#10B981';
        submitBtn.style.color = '#FFFFFF';

        if (formFeedback) {
          formFeedback.className = 'form-feedback success';
          formFeedback.innerHTML = 'Thank you! Your message has been dispatched to Prudhvi. You can also write directly to <a href="mailto:dilipkumarprudhvi@gmail.com" style="text-decoration:underline;color:#065F46;font-weight:700;">dilipkumarprudhvi@gmail.com</a>.';
          formFeedback.style.display = 'block';
        }

        form.reset();
        inputs.forEach(input => {
          input.classList.remove('error');
          input.classList.remove('valid');
          input.removeAttribute('aria-invalid');
          const err = input.parentElement.querySelector('.form-error');
          if (err) err.textContent = '';
        });

        setTimeout(() => {
          submitBtn.innerHTML = originalHTML;
          submitBtn.style.background = '';
          submitBtn.style.borderColor = '';
          submitBtn.style.color = '';
          submitBtn.disabled = false;
        }, 3500);

        setTimeout(() => {
          if (formFeedback) formFeedback.style.display = 'none';
        }, 9000);
      }, 800);
    });
  }

});

// ============================================
// 5. INTERACTIVE DEVELOPER TERMINAL CLI
// ============================================
const cmdHistory = [];
let historyIndex = -1;

const TERMINAL_COMMANDS = {
  help: () => `
    <div><strong>Available CLI Commands:</strong></div>
    <div>• <span class="cmd-highlight">bio</span> / <span class="cmd-highlight">about</span> — Profile background &amp; philosophy</div>
    <div>• <span class="cmd-highlight">skills</span> / <span class="cmd-highlight">stack</span> — Engineering stack &amp; capabilities</div>
    <div>• <span class="cmd-highlight">projects</span> / <span class="cmd-highlight">works</span> — Selected works &amp; case studies</div>
    <div>• <span class="cmd-highlight">education</span> / <span class="cmd-highlight">edu</span> — Academic degrees &amp; diploma</div>
    <div>• <span class="cmd-highlight">journey</span> / <span class="cmd-highlight">roadmap</span> — Chronological experience path</div>
    <div>• <span class="cmd-highlight">github</span> / <span class="cmd-highlight">repo</span> — Public code repositories</div>
    <div>• <span class="cmd-highlight">contact</span> / <span class="cmd-highlight">email</span> — Direct contact channels</div>
    <div>• <span class="cmd-highlight">clear</span> / <span class="cmd-highlight">cls</span> — Clear terminal output</div>
  `,
  bio: () => `
    <div><strong>Prudhvi Dilip Kumar</strong> — Full-Stack Developer &amp; Systems Builder</div>
    <div style="color:var(--text-muted);margin-top:4px">🎓 B.Tech in Artificial Intelligence &amp; Data Science (2024–Present)</div>
    <div style="color:var(--text-muted)">📐 Diploma in Engineering (2021–2024)</div>
    <div style="color:var(--text-secondary);margin-top:4px">Engineering scalable web applications with clean architecture, relational SQL databases, and responsive client experiences.</div>
  `,
  skills: () => `
    <div><strong>Production Technical Toolkit:</strong></div>
    <div>• <span style="color:#38BDF8">Frontend:</span> React.js, JavaScript (ES6+ Modern), Semantic HTML5, CSS3 Grid/Flexbox</div>
    <div>• <span style="color:#38BDF8">Backend:</span> Node.js, Express.js, RESTful APIs, Middleware, JWT Session Auth</div>
    <div>• <span style="color:#38BDF8">Databases:</span> MySQL, Relational Schema Design, Complex CRUD, JDBC</div>
    <div>• <span style="color:#38BDF8">Languages:</span> Python 3 (ML/NLP), Java, C, JavaScript</div>
    <div>• <span style="color:#38BDF8">Tooling:</span> Git, GitHub, VS Code, Linux CLI, Google Colab</div>
  `,
  projects: () => `
    <div><strong>Featured Works:</strong></div>
    <div>1. <span style="color:#38BDF8">Fake News Detection System</span> — ML/NLP with OCR &amp; Telugu/English evaluation.</div>
    <div>2. <span style="color:#38BDF8">Modern Interactive Calculator</span> — Responsive glassmorphic computational engine.</div>
    <div>3. <span style="color:#38BDF8">Senior Developer Portfolio</span> — High-performance 120fps architecture.</div>
    <div>4. <span style="color:#38BDF8">Full-Stack Web App</span> — React + Express + MySQL full-lifecycle system.</div>
    <div>5. <span style="color:#38BDF8">Student Management System</span> — Java OOP + Relational Database Management.</div>
    <div style="color:var(--text-muted);margin-top:4px">Scroll down to the Projects section to test live demos!</div>
  `,
  education: () => `
    <div><strong>Academic Foundation:</strong></div>
    <div>• <span style="color:#38BDF8">B.Tech in Artificial Intelligence &amp; Data Science</span> (2024–Present)</div>
    <div>• <span style="color:#38BDF8">Diploma in Engineering</span> (2021–2024) — Technical Engineering Foundations</div>
  `,
  journey: () => `
    <div><strong>Engineering Roadmap:</strong></div>
    <div>• 2021–2024: Diploma in Engineering (Applied Math &amp; Logic)</div>
    <div>• 2024–Present: B.Tech AI &amp; Data Science</div>
    <div>• 2024–Present: Full-Stack Web Development (React, Node, MySQL)</div>
    <div>• Target: Full-Stack Software Engineer building scalable products</div>
  `,
  github: () => `
    <div><strong>GitHub Profile &amp; Repositories:</strong></div>
    <div>• Profile: <a href="https://github.com/dilipkumarprudhvi-a11y" target="_blank" rel="noopener noreferrer" style="color:#38BDF8;text-decoration:underline">github.com/dilipkumarprudhvi-a11y</a></div>
    <div>• Public Repositories: 6+ Active Builds (JavaScript, Python, Java)</div>
  `,
  contact: () => `
    <div><strong>Direct Contact Channels:</strong></div>
    <div>• Email: <a href="mailto:dilipkumarprudhvi@gmail.com" style="color:#38BDF8;text-decoration:underline">dilipkumarprudhvi@gmail.com</a></div>
    <div>• GitHub: <a href="https://github.com/dilipkumarprudhvi-a11y" target="_blank" rel="noopener noreferrer" style="color:#38BDF8;text-decoration:underline">github.com/dilipkumarprudhvi-a11y</a></div>
    <div>• Location: Chirala, Andhra Pradesh, India</div>
    <div>• Status: Available for Full-Stack Roles &amp; Collaborations</div>
  `,
  hi: () => `<div>Hello! 👋 Welcome to Prudhvi Dilip Kumar's developer console. Type <span class="cmd-highlight">help</span> to explore commands.</div>`,
  hello: () => `<div>Greetings! 👋 Ready to explore software systems. Type <span class="cmd-highlight">projects</span> or <span class="cmd-highlight">skills</span>.</div>`,
  sudo: () => `<div style="color:#38BDF8">Developer credentials already active. Full system permissions granted! 🚀</div>`,
  date: () => `<div>Studio Time: ${new Date().toLocaleString()}</div>`,
};

const CMD_ALIASES = {
  about: 'bio',
  whoami: 'bio',
  me: 'bio',
  stack: 'skills',
  toolkit: 'skills',
  tech: 'skills',
  works: 'projects',
  portfolio: 'projects',
  work: 'projects',
  email: 'contact',
  social: 'contact',
  reach: 'contact',
  edu: 'education',
  degree: 'education',
  exp: 'journey',
  timeline: 'journey',
  roadmap: 'journey',
  repo: 'github',
  code: 'github',
  repos: 'github',
  cls: 'clear',
  hey: 'hi',
};

window.runTermCmd = function(cmd) {
  const terminalBody = document.getElementById('terminal-output');
  const inputEl = document.getElementById('terminal-input');
  if (!terminalBody) return;

  const rawCmd = (cmd || '').trim();
  const cleanCmd = rawCmd.toLowerCase();

  if (!cleanCmd) return;

  cmdHistory.push(rawCmd);
  historyIndex = cmdHistory.length;

  if (cleanCmd === 'clear' || cleanCmd === 'cls') {
    terminalBody.innerHTML = `
      <div class="term-line welcome-line">Terminal screen cleared. Type <span class="cmd-highlight">help</span> for commands.</div>
    `;
    if (inputEl) {
      inputEl.value = '';
      inputEl.focus();
    }
    return;
  }

  const promptLine = document.createElement('div');
  promptLine.className = 'term-line prompt-line';
  promptLine.innerHTML = `<span class="term-prompt">pdk&gt;</span> <span class="term-text">${rawCmd}</span>`;
  terminalBody.appendChild(promptLine);

  const responseLine = document.createElement('div');
  responseLine.className = 'term-response';

  const resolvedCmd = CMD_ALIASES[cleanCmd] || cleanCmd;

  if (TERMINAL_COMMANDS[resolvedCmd]) {
    responseLine.innerHTML = TERMINAL_COMMANDS[resolvedCmd]();
  } else {
    responseLine.innerHTML = `Command not recognized: '<span style="color:#EF4444">${rawCmd}</span>'. Type <span class="cmd-highlight">help</span> to view all available commands.`;
  }

  terminalBody.appendChild(responseLine);
  terminalBody.scrollTop = terminalBody.scrollHeight;

  if (inputEl) {
    inputEl.value = '';
    inputEl.focus();
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const inputEl = document.getElementById('terminal-input');
  if (!inputEl) return;

  inputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = inputEl.value.trim();
      if (val) window.runTermCmd(val);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length > 0 && historyIndex > 0) {
        historyIndex--;
        inputEl.value = cmdHistory[historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex < cmdHistory.length - 1) {
        historyIndex++;
        inputEl.value = cmdHistory[historyIndex];
      } else {
        historyIndex = cmdHistory.length;
        inputEl.value = '';
      }
    }
  });
});
