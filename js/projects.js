'use strict';

// ============================================
// PROJECT DATA
// Edit this array to update all project cards.
// ============================================
const PROJECTS = [
  {
    id: 1,
    title: 'Fake News Detection System',
    description:
      'A machine-learning-based application designed to identify potentially fake and genuine news content. ' +
      'The project includes text processing and OCR-based input handling, with support for Telugu and English news articles.',
    highlight: 'Telugu + English News Detection',
    category: 'ml',
    image: 'ml',
    technologies: [
      'Python', 'Machine Learning', 'NLP', 'OCR',
      'TF-IDF', 'Logistic Regression', 'Naive Bayes', 'Google Colab',
    ],
    github: 'https://github.com/dilipkumarprudhvi-a11y/fake-news-detection',
    demo: null,
    featured: true,
    badge: 'ML / NLP',
  },
  {
    id: 2,
    title: 'Modern Interactive Calculator',
    description:
      'A responsive calculator application with a clean, modern interface, interactive button animations, ' +
      'keyboard shortcut support, and real-time calculation display.',
    category: 'web',
    image: 'calc',
    technologies: ['HTML5', 'CSS3', 'JavaScript'],
    github: 'https://github.com/dilipkumarprudhvi-a11y/interactive-calculator',
    demo: null,
    featured: true,
    badge: 'Interactive Demo',
  },
  {
    id: 3,
    title: 'Interactive Developer Portfolio',
    description:
      'A responsive personal portfolio designed to showcase skills, projects, development journey, and technical experience ' +
      'with modern animations, 3D elements, and an interactive UI.',
    category: 'web',
    image: 'portfolio',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Three.js', 'GSAP'],
    github: 'https://github.com/dilipkumarprudhvi-a11y/portfolio',
    demo: null,
    featured: true,
    badge: 'Portfolio',
  },
  {
    id: 4,
    title: 'Full-Stack Web Application',
    description:
      'A complete web application featuring a responsive frontend, RESTful backend API, database integration, ' +
      'user authentication, and full CRUD functionality.',
    category: 'fullstack',
    image: 'fullstack',
    technologies: ['React', 'Node.js', 'Express', 'MySQL'],
    github: null,
    demo: null,
    featured: true,
    comingSoon: true,
    badge: 'Coming Soon',
  },
  {
    id: 5,
    title: 'Student Management System',
    description:
      'A database-driven application for managing student information, academic records, and enrollment details. ' +
      'Supports full CRUD operations: create, read, update, and delete student records.',
    category: 'fullstack',
    image: 'sms',
    technologies: ['Java', 'MySQL', 'JDBC'],
    github: 'https://github.com/dilipkumarprudhvi-a11y/student-management',
    demo: null,
    featured: false,
    badge: 'Java + DB',
  },
  {
    id: 6,
    title: 'Task Management Application',
    description:
      'A responsive task management application that allows users to create, update, complete, prioritize, ' +
      'and organize tasks with a clean drag-and-drop interface.',
    category: 'web',
    image: 'todo',
    technologies: ['HTML5', 'CSS3', 'JavaScript'],
    github: 'https://github.com/dilipkumarprudhvi-a11y/task-manager',
    demo: null,
    featured: false,
    badge: 'Web App',
  },
];

// ============================================
// WARM ESPRESSO & AMBER IMAGE / VISUAL THEMES
// ============================================
const IMAGE_THEMES = {

  // Machine Learning: Animated Pipeline Flow (Warm Amber & Tangerine)
  ml: {
    bg: 'linear-gradient(135deg, #181310 0%, #241B16 50%, #1F150F 100%)',
    icon: `
      <div class="ml-pipeline-flow" style="width:100%;max-width:320px;padding:0.5rem;font-family:var(--font-mono);font-size:0.65rem;">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;color:#FBBF24;font-weight:700;">
          <span>&#x1F4F0; News Input (Telugu / EN)</span>
          <span style="color:#a3e635;font-size:0.6rem;">&#x25CF; Active ML</span>
        </div>
        <div style="display:grid;grid-template-columns:repeat(5, 1fr);gap:4px;text-align:center;align-items:center;">
          <div style="background:rgba(245,158,11,0.15);border:1px solid rgba(245,158,11,0.3);border-radius:4px;padding:4px 2px;color:#FFFBEB;">OCR / Text</div>
          <div style="color:#F97316;font-size:0.8rem;font-weight:bold;">&rarr;</div>
          <div style="background:rgba(245,158,11,0.15);border:1px solid rgba(245,158,11,0.3);border-radius:4px;padding:4px 2px;color:#FFFBEB;">NLP (TF-IDF)</div>
          <div style="color:#F97316;font-size:0.8rem;font-weight:bold;">&rarr;</div>
          <div style="background:rgba(251,191,36,0.22);border:1px solid rgba(251,191,36,0.45);border-radius:4px;padding:4px 2px;color:#FBBF24;font-weight:700;">Classifier</div>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:10px;padding:5px 8px;background:rgba(18,15,13,0.85);border-radius:4px;border:1px solid rgba(245,158,11,0.2);">
          <span style="color:#A89F91;">Classification Output:</span>
          <span style="color:#22c55e;font-weight:bold;">98.4% Real / Fake</span>
        </div>
      </div>`,
  },

  // Interactive Live Calculator Preview (Warm Mocha & Amber Keys)
  calc: {
    bg: 'linear-gradient(135deg, #161210 0%, #261D17 50%, #1A130E 100%)',
    icon: `
      <div class="mini-calculator" style="width:100%;max-width:210px;margin:0 auto;background:rgba(18,15,13,0.92);border:1px solid rgba(245,158,11,0.35);border-radius:10px;padding:8px;box-shadow:0 8px 24px rgba(0,0,0,0.6);" onclick="event.stopPropagation();">
        <div id="mini-calc-display" style="background:#130F0D;border:1px solid rgba(245,158,11,0.25);border-radius:6px;padding:4px 8px;text-align:right;font-family:monospace;font-size:1.1rem;color:#FBBF24;min-height:28px;margin-bottom:6px;overflow:hidden;">0</div>
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:4px;font-family:monospace;">
          <button type="button" onclick="miniCalcClear()" style="grid-column:span 2;background:rgba(239,68,68,0.2);color:#f87171;border:1px solid rgba(239,68,68,0.35);border-radius:4px;padding:3px 0;font-size:0.75rem;cursor:pointer;">C</button>
          <button type="button" onclick="miniCalcOp('/')" style="background:rgba(245,158,11,0.18);color:#FBBF24;border:1px solid rgba(245,158,11,0.3);border-radius:4px;padding:3px 0;font-size:0.75rem;cursor:pointer;">&divide;</button>
          <button type="button" onclick="miniCalcOp('*')" style="background:rgba(245,158,11,0.18);color:#FBBF24;border:1px solid rgba(245,158,11,0.3);border-radius:4px;padding:3px 0;font-size:0.75rem;cursor:pointer;">&times;</button>
          
          <button type="button" onclick="miniCalcNum('7')" style="background:rgba(255,251,235,0.06);color:#FFFBEB;border:1px solid rgba(255,251,235,0.1);border-radius:4px;padding:3px 0;font-size:0.75rem;cursor:pointer;">7</button>
          <button type="button" onclick="miniCalcNum('8')" style="background:rgba(255,251,235,0.06);color:#FFFBEB;border:1px solid rgba(255,251,235,0.1);border-radius:4px;padding:3px 0;font-size:0.75rem;cursor:pointer;">8</button>
          <button type="button" onclick="miniCalcNum('9')" style="background:rgba(255,251,235,0.06);color:#FFFBEB;border:1px solid rgba(255,251,235,0.1);border-radius:4px;padding:3px 0;font-size:0.75rem;cursor:pointer;">9</button>
          <button type="button" onclick="miniCalcOp('-')" style="background:rgba(245,158,11,0.18);color:#FBBF24;border:1px solid rgba(245,158,11,0.3);border-radius:4px;padding:3px 0;font-size:0.75rem;cursor:pointer;">-</button>
          
          <button type="button" onclick="miniCalcNum('4')" style="background:rgba(255,251,235,0.06);color:#FFFBEB;border:1px solid rgba(255,251,235,0.1);border-radius:4px;padding:3px 0;font-size:0.75rem;cursor:pointer;">4</button>
          <button type="button" onclick="miniCalcNum('5')" style="background:rgba(255,251,235,0.06);color:#FFFBEB;border:1px solid rgba(255,251,235,0.1);border-radius:4px;padding:3px 0;font-size:0.75rem;cursor:pointer;">5</button>
          <button type="button" onclick="miniCalcNum('6')" style="background:rgba(255,251,235,0.06);color:#FFFBEB;border:1px solid rgba(255,251,235,0.1);border-radius:4px;padding:3px 0;font-size:0.75rem;cursor:pointer;">6</button>
          <button type="button" onclick="miniCalcOp('+')" style="background:rgba(245,158,11,0.18);color:#FBBF24;border:1px solid rgba(245,158,11,0.3);border-radius:4px;padding:3px 0;font-size:0.75rem;cursor:pointer;">+</button>
          
          <button type="button" onclick="miniCalcNum('1')" style="background:rgba(255,251,235,0.06);color:#FFFBEB;border:1px solid rgba(255,251,235,0.1);border-radius:4px;padding:3px 0;font-size:0.75rem;cursor:pointer;">1</button>
          <button type="button" onclick="miniCalcNum('2')" style="background:rgba(255,251,235,0.06);color:#FFFBEB;border:1px solid rgba(255,251,235,0.1);border-radius:4px;padding:3px 0;font-size:0.75rem;cursor:pointer;">2</button>
          <button type="button" onclick="miniCalcNum('3')" style="background:rgba(255,251,235,0.06);color:#FFFBEB;border:1px solid rgba(255,251,235,0.1);border-radius:4px;padding:3px 0;font-size:0.75rem;cursor:pointer;">3</button>
          <button type="button" onclick="miniCalcEval()" style="background:linear-gradient(135deg, #F59E0B, #F97316);color:#120F0D;border:none;border-radius:4px;padding:3px 0;font-size:0.75rem;font-weight:bold;cursor:pointer;">=</button>
        </div>
      </div>`,
  },

  // Portfolio Preview
  portfolio: {
    bg: 'linear-gradient(135deg, #14100D 0%, #221A15 50%, #1A130F 100%)',
    icon: `
      <div style="font-family:monospace;color:#FBBF24;font-size:0.75rem;line-height:1.5;text-align:left;padding:1rem">
        <div><span style="color:#F97316">&lt;</span><span style="color:#FDE68A">div</span>
          <span style="color:#FFFBEB"> class=</span><span style="color:#FBBF24">"hero"</span>
          <span style="color:#F97316">&gt;</span></div>
        <div style="padding-left:1rem">
          <span style="color:#F97316">&lt;</span><span style="color:#FDE68A">h1</span>
          <span style="color:#F97316">&gt;</span>Prudhvi<span style="color:#F97316">&lt;/</span><span style="color:#FDE68A">h1</span><span style="color:#F97316">&gt;</span>
        </div>
        <div><span style="color:#F97316">&lt;/</span><span style="color:#FDE68A">div</span><span style="color:#F97316">&gt;</span></div>
      </div>`,
  },

  // Full-Stack App
  fullstack: {
    bg: 'linear-gradient(135deg, #18120F 0%, #251B15 50%, #1C1410 100%)',
    icon: `
      <svg viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg" width="120" height="72">
        <rect x="5" y="5" width="90" height="50" rx="4" stroke="#F59E0B" stroke-width="1.5" opacity="0.6"/>
        <rect x="5" y="5" width="90" height="12" rx="4" fill="#F59E0B" opacity="0.2"/>
        <circle cx="12" cy="11" r="2" fill="#ef4444" opacity="0.8"/>
        <circle cx="19" cy="11" r="2" fill="#FBBF24" opacity="0.8"/>
        <circle cx="26" cy="11" r="2" fill="#22c55e" opacity="0.8"/>
        <text x="10" y="30" fill="#FBBF24" font-size="7" font-family="monospace">React + Node.js</text>
        <text x="10" y="40" fill="#A89F91" font-size="6" font-family="monospace">Express + MySQL</text>
        <text x="10" y="50" fill="#F97316" font-size="6" font-family="monospace">REST API + Auth</text>
      </svg>`,
  },

  // Student Management System
  sms: {
    bg: 'linear-gradient(135deg, #16120E 0%, #231B15 50%, #1B140F 100%)',
    icon: `
      <svg viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg" width="120" height="96">
        <rect x="10" y="10" width="80" height="60" rx="4" stroke="#F59E0B" stroke-width="1.5" opacity="0.6"/>
        <rect x="10" y="10" width="80" height="10" fill="#F59E0B" opacity="0.2"/>
        <text x="15" y="18" fill="#FFFBEB" font-size="6" font-family="monospace">Students [CRUD]</text>
        <line x1="10" y1="28" x2="90" y2="28" stroke="rgba(245,158,11,0.3)" stroke-width="1"/>
        <text x="15" y="38" fill="#A89F91" font-size="5" font-family="monospace">STU001 | B.Tech AIDS</text>
        <text x="15" y="48" fill="#A89F91" font-size="5" font-family="monospace">STU002 | MySQL DB</text>
        <text x="15" y="58" fill="#A89F91" font-size="5" font-family="monospace">STU003 | JDBC Driver</text>
      </svg>`,
  },

  // Task / Todo
  todo: {
    bg: 'linear-gradient(135deg, #17130F 0%, #241C16 50%, #1A130E 100%)',
    icon: `
      <div style="font-size:0.75rem;color:#FFFBEB;font-family:monospace">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
          <span style="color:#22c55e;font-size:1rem">&#10003;</span>
          <span style="color:#A89F91">Responsive UI</span>
        </div>
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
          <span style="color:#22c55e;font-size:1rem">&#10003;</span>
          <span style="color:#A89F91">Create & Edit Tasks</span>
        </div>
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;opacity:0.85;">
          <span style="color:#F59E0B;font-size:1rem">&#9675;</span>
          <span style="color:#FFFBEB">Filter & Organize</span>
        </div>
      </div>`,
  },
};

// ============================================
// MINI CALCULATOR STATE & LOGIC
// ============================================
let miniCalcValue = '0';
let miniCalcReset = false;

window.miniCalcNum = function(num) {
  const display = document.getElementById('mini-calc-display');
  if (!display) return;
  if (miniCalcValue === '0' || miniCalcReset) {
    miniCalcValue = num;
    miniCalcReset = false;
  } else {
    if (miniCalcValue.length < 10) miniCalcValue += num;
  }
  display.textContent = miniCalcValue;
};

window.miniCalcOp = function(op) {
  const display = document.getElementById('mini-calc-display');
  if (!display) return;
  const lastChar = miniCalcValue[miniCalcValue.length - 1];
  if (['+', '-', '*', '/'].includes(lastChar)) {
    miniCalcValue = miniCalcValue.slice(0, -1) + op;
  } else {
    miniCalcValue += op;
  }
  miniCalcReset = false;
  display.textContent = miniCalcValue;
};

window.miniCalcClear = function() {
  miniCalcValue = '0';
  miniCalcReset = false;
  const display = document.getElementById('mini-calc-display');
  if (display) display.textContent = '0';
};

window.miniCalcEval = function() {
  const display = document.getElementById('mini-calc-display');
  if (!display) return;
  try {
    const sanitized = miniCalcValue.replace(/[^0-9+\-*/.]/g, '');
    const result = Function('"use strict";return (' + sanitized + ')')();
    miniCalcValue = String(Math.round(result * 10000) / 10000);
    miniCalcReset = true;
    display.textContent = miniCalcValue;
  } catch (e) {
    display.textContent = 'Err';
    miniCalcReset = true;
  }
};

// ============================================
// BUILD A SINGLE PROJECT CARD
// ============================================
function githubSVG() {
  return '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
    '<path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385' +
    '.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235' +
    '-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695' +
    '-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23' +
    '1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605' +
    '-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225' +
    '-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23' +
    '.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23' +
    '.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225' +
    '0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22' +
    '0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57' +
    'A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>' +
    '</svg>';
}

function buildCard(project) {
  const theme = IMAGE_THEMES[project.image] || IMAGE_THEMES.ml;

  const githubBtn = project.github
    ? '<a href="' + project.github + '" target="_blank" rel="noopener noreferrer"' +
      ' class="project-link btn btn-secondary"' +
      ' aria-label="View ' + project.title + ' on GitHub">' +
      githubSVG() + ' GitHub</a>'
    : '<span class="project-link btn btn-secondary disabled"' +
      ' style="opacity:0.4;cursor:default" title="Repository placeholder" aria-disabled="true">' +
      githubSVG() + ' GitHub</span>';

  const demoBtn = project.demo
    ? '<a href="' + project.demo + '" target="_blank" rel="noopener noreferrer"' +
      ' class="project-link btn btn-primary"' +
      ' aria-label="View live demo of ' + project.title + '">Live Demo &#8594;</a>'
    : '';

  const comingSoonOverlay = project.comingSoon
    ? '<div class="coming-soon-overlay" aria-hidden="true"><span>&#x1F680; Coming Soon</span></div>'
    : '';

  const highlightHTML = project.highlight
    ? '<div class="project-highlight">&#10022; ' + project.highlight + '</div>'
    : '';

  const techBadges = project.technologies
    .map(t => '<span class="tech-badge">' + t + '</span>')
    .join('');

  return (
    '<article' +
      ' class="project-card' + (project.comingSoon ? ' coming-soon' : '') + '"' +
      ' data-category="' + project.category + '"' +
      ' data-tilt' +
      ' tabindex="0"' +
      ' aria-label="' + project.title + ' project"' +
    '>' +
      '<div class="card-shine" aria-hidden="true"></div>' +
      '<div class="project-image" style="background: ' + theme.bg + '">' +
        '<div class="project-image-content" style="width:100%">' + theme.icon + '</div>' +
        '<div class="project-badge">' + project.badge + '</div>' +
        comingSoonOverlay +
      '</div>' +
      '<div class="project-body">' +
        highlightHTML +
        '<h3 class="project-title">' + project.title + '</h3>' +
        '<p class="project-description">' + project.description + '</p>' +
        '<div class="tech-stack" aria-label="Technologies used">' + techBadges + '</div>' +
        '<div class="project-links">' + githubBtn + demoBtn + '</div>' +
      '</div>' +
    '</article>'
  );
}

// ============================================
// RENDER PROJECTS
// ============================================
function renderProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  let showingAll = false;

  function render(filter, showAll) {
    filter  = filter  === undefined ? 'all'  : filter;
    showAll = showAll === undefined ? false  : showAll;

    var filtered = filter === 'all'
      ? PROJECTS
      : PROJECTS.filter(function(p) { return p.category === filter; });

    if (!showAll) {
      filtered = filtered.filter(function(p) { return p.featured !== false; });
    }

    grid.innerHTML = filtered.length
      ? filtered.map(buildCard).join('')
      : '<p class="no-projects-msg" style="color:var(--text-muted);grid-column:1/-1;text-align:center;padding:3rem 0">' +
          'No projects in this category yet. &#x1F680;' +
        '</p>';

    if (typeof initCardTilt === 'function') initCardTilt();

    var dot  = document.getElementById('cursor-dot');
    var ring = document.getElementById('cursor-ring');
    if (dot && ring) {
      grid.querySelectorAll('.project-card').forEach(function(card) {
        card.addEventListener('mouseenter', function() {
          dot.classList.add('cursor-hover');
          ring.classList.add('cursor-hover');
        });
        card.addEventListener('mouseleave', function() {
          dot.classList.remove('cursor-hover');
          ring.classList.remove('cursor-hover');
        });
      });
    }
  }

  render('all', false);

  var filterBtns = document.querySelectorAll('.project-filter-btn');

  filterBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      filterBtns.forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      render(btn.dataset.filter || 'all', showingAll);
      animateCards();
    });
  });

  var showMoreBtn = document.getElementById('show-more-btn');

  if (showMoreBtn) {
    showMoreBtn.addEventListener('click', function() {
      showingAll = !showingAll;

      var activeFilter =
        (document.querySelector('.project-filter-btn.active') || {}).dataset
          ? document.querySelector('.project-filter-btn.active').dataset.filter
          : 'all';

      render(activeFilter || 'all', showingAll);
      animateCards();

      showMoreBtn.textContent = showingAll ? 'Show Less \u2191' : 'Show More Projects \u2193';
    });
  }

  function animateCards() {
    if (typeof gsap !== 'undefined') {
      gsap.fromTo(
        '#projects-grid .project-card',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.08, duration: 0.45, ease: 'power2.out' }
      );
    } else {
      grid.querySelectorAll('.project-card').forEach(function(card) {
        card.style.opacity   = '1';
        card.style.transform = 'none';
      });
    }
  }
}

document.addEventListener('DOMContentLoaded', renderProjects);
