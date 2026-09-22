'use strict';

// ============================================
// SENIOR DEVELOPER PROJECT REGISTRY
// ============================================
const PROJECTS = [
  {
    id: 1,
    title: 'Fake News Detection System',
    description:
      'A machine-learning system designed to detect potentially fake and authentic news articles with high confidence. ' +
      'Features custom text processing, OCR input extraction, and bilingual evaluation for Telugu and English articles.',
    highlight: 'NLP & OCR Engineering',
    category: 'ml',
    url: 'ml.fake-news.engine',
    image: 'ml',
    technologies: [
      'Python', 'Machine Learning', 'NLP', 'OCR',
      'TF-IDF', 'Logistic Regression', 'Naive Bayes', 'Google Colab',
    ],
    github: 'https://github.com/dilipkumarprudhvi-a11y/fake-news-detection',
    demo: null,
    featured: true,
    badge: 'Production ML',
  },
  {
    id: 2,
    title: 'Modern Interactive Calculator',
    description:
      'A responsive calculator application with a clean, modern interface, interactive button animations, ' +
      'keyboard shortcut support, and real-time calculation display.',
    category: 'web',
    url: 'calc.interactive.dev',
    image: 'calc',
    technologies: ['JavaScript (ES6+)', 'HTML5', 'CSS3', 'DOM Architecture'],
    github: 'https://github.com/dilipkumarprudhvi-a11y/interactive-calculator',
    demo: null,
    featured: true,
    badge: 'Live Interactive Widget',
  },
  {
    id: 3,
    title: 'Bespoke Full-Stack Developer Portfolio',
    description:
      'A high-performance personal portfolio showcasing full-stack projects, interactive developer CLI terminal, ' +
      'real-time Three.js 3D hero scene, and GSAP scroll transitions.',
    category: 'web',
    url: 'portfolio.prudhvi.dev',
    image: 'portfolio',
    technologies: ['JavaScript', 'Three.js', 'GSAP', 'Lenis Scroll', 'HTML5/CSS3'],
    github: 'https://github.com/dilipkumarprudhvi-a11y/portfolio',
    demo: null,
    featured: true,
    badge: 'Bespoke Architecture',
  },
  {
    id: 4,
    title: 'Full-Stack Web Application',
    description:
      'An end-to-end web application featuring a modern React frontend, RESTful backend API in Express & Node.js, ' +
      'secure authentication, and relational MySQL database schemas with CRUD transactions.',
    category: 'fullstack',
    url: 'app.fullstack-platform.io',
    image: 'fullstack',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MySQL', 'REST API'],
    github: null,
    demo: null,
    featured: true,
    comingSoon: true,
    badge: 'In Development',
  },
  {
    id: 5,
    title: 'Student Management System',
    description:
      'A relational database application for academic record administration, enrollment tracking, and student profiling. ' +
      'Engineered with Java OOP architecture, JDBC connectivity, and relational SQL queries.',
    category: 'fullstack',
    url: 'db.student-portal.sys',
    image: 'sms',
    technologies: ['Java', 'MySQL', 'JDBC', 'Relational Schema'],
    github: 'https://github.com/dilipkumarprudhvi-a11y/student-management',
    demo: null,
    featured: false,
    badge: 'Java + SQL',
  },
  {
    id: 6,
    title: 'Task & Workflow Management Platform',
    description:
      'A responsive task management application that allows users to create, update, complete, prioritize, ' +
      'and organize tasks with a clean drag-and-drop interface.',
    category: 'web',
    url: 'tasks.workflow-manager.app',
    image: 'todo',
    technologies: ['JavaScript', 'HTML5', 'CSS3 Grid', 'Local Storage'],
    github: 'https://github.com/dilipkumarprudhvi-a11y/task-manager',
    demo: null,
    featured: false,
    badge: 'Web App',
  },
];

// ============================================
// WARM MAC WINDOW UI THEMES
// ============================================
const IMAGE_THEMES = {

  // Machine Learning: Animated Pipeline Flow
  ml: {
    icon: `
      <div class="ml-pipeline-flow" style="width:100%;max-width:320px;margin:0 auto;padding:0.5rem;font-family:var(--font-mono);font-size:0.65rem;">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;color:#FBBF24;font-weight:700;">
          <span>&#x1F4F0; Telugu / English News Input</span>
          <span style="color:#22c55e;font-size:0.6rem;">&#x25CF; ML Active</span>
        </div>
        <div style="display:grid;grid-template-columns:repeat(5, 1fr);gap:4px;text-align:center;align-items:center;">
          <div style="background:rgba(245,158,11,0.15);border:1px solid rgba(245,158,11,0.3);border-radius:4px;padding:5px 2px;color:#FFFBEB;">OCR / Text</div>
          <div style="color:#F97316;font-size:0.8rem;font-weight:bold;">&rarr;</div>
          <div style="background:rgba(245,158,11,0.15);border:1px solid rgba(245,158,11,0.3);border-radius:4px;padding:5px 2px;color:#FFFBEB;">TF-IDF NLP</div>
          <div style="color:#F97316;font-size:0.8rem;font-weight:bold;">&rarr;</div>
          <div style="background:rgba(251,191,36,0.25);border:1px solid rgba(251,191,36,0.5);border-radius:4px;padding:5px 2px;color:#FBBF24;font-weight:700;">Classifier</div>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:10px;padding:5px 8px;background:rgba(16,13,11,0.85);border-radius:4px;border:1px solid rgba(245,158,11,0.2);">
          <span style="color:#A3998C;">Model Accuracy:</span>
          <span style="color:#22c55e;font-weight:bold;">98.4% Confidence</span>
        </div>
      </div>`,
  },

  // Live Interactive Calculator
  calc: {
    icon: `
      <div class="mini-calculator" style="width:100%;max-width:210px;margin:0 auto;background:rgba(16,13,11,0.95);border:1px solid rgba(245,158,11,0.35);border-radius:8px;padding:8px;box-shadow:0 8px 24px rgba(0,0,0,0.6);" onclick="event.stopPropagation();">
        <div id="mini-calc-display" style="background:#100D0B;border:1px solid rgba(245,158,11,0.25);border-radius:4px;padding:3px 8px;text-align:right;font-family:monospace;font-size:1.1rem;color:#FBBF24;min-height:26px;margin-bottom:6px;overflow:hidden;">0</div>
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
          <button type="button" onclick="miniCalcEval()" style="background:linear-gradient(135deg, #F59E0B, #F97316);color:#100D0B;border:none;border-radius:4px;padding:3px 0;font-size:0.75rem;font-weight:bold;cursor:pointer;">=</button>
        </div>
      </div>`,
  },

  // Portfolio Architecture
  portfolio: {
    icon: `
      <div style="font-family:var(--font-mono);font-size:0.75rem;line-height:1.6;text-align:left;padding:0.75rem;color:#E6DFD5;background:rgba(16,13,11,0.85);border-radius:6px;border:1px solid var(--border-subtle);">
        <div><span style="color:#F97316">import</span> { ThreeScene } <span style="color:#F97316">from</span> <span style="color:#a3e635">'./three-hero.js'</span>;</div>
        <div><span style="color:#F97316">import</span> { LenisScroll } <span style="color:#F97316">from</span> <span style="color:#a3e635">'./lenis.js'</span>;</div>
        <div style="color:#A3998C;margin-top:4px">// 120fps fluid momentum pipeline</div>
        <div><span style="color:#FBBF24">const</span> engine = <span style="color:#FBBF24">new</span> FullStackPortfolio();</div>
      </div>`,
  },

  // Full-Stack Architecture
  fullstack: {
    icon: `
      <div style="font-family:var(--font-mono);font-size:0.72rem;padding:0.75rem;background:rgba(16,13,11,0.85);border-radius:6px;border:1px solid var(--border-subtle);">
        <div style="display:flex;justify-content:space-between;color:#FBBF24;margin-bottom:6px;border-bottom:1px solid var(--border-subtle);padding-bottom:4px;">
          <span>React (Client)</span>
          <span>&harr;</span>
          <span>Node API</span>
          <span>&harr;</span>
          <span>MySQL DB</span>
        </div>
        <div style="color:#A3998C;font-size:0.68rem;line-height:1.5;">
          • JWT Authentication &amp; Protected Routes<br>
          • Relational CRUD Endpoints<br>
          • Express Middleware &amp; Error Handling
        </div>
      </div>`,
  },

  // Student Management System
  sms: {
    icon: `
      <div style="font-family:var(--font-mono);font-size:0.72rem;padding:0.75rem;background:rgba(16,13,11,0.85);border-radius:6px;border:1px solid var(--border-subtle);">
        <div style="color:#FBBF24;font-weight:700;margin-bottom:4px;">STUDENT_RECORDS [SQL Table]</div>
        <div style="color:#A3998C;font-size:0.68rem;line-height:1.5;">
          ID_001 | Prudhvi | B.Tech AIDS | Active<br>
          ID_002 | Student | Full-Stack  | Active<br>
          <span style="color:#22c55e;">&check; JDBC Connection: OK</span>
        </div>
      </div>`,
  },

  // Task & Workflow
  todo: {
    icon: `
      <div style="font-family:var(--font-mono);font-size:0.72rem;padding:0.75rem;background:rgba(16,13,11,0.85);border-radius:6px;border:1px solid var(--border-subtle);">
        <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;color:#22c55e;">
          <span>&check;</span> <span style="color:#FFFBEB">Responsive UI Architecture</span>
        </div>
        <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;color:#22c55e;">
          <span>&check;</span> <span style="color:#FFFBEB">State Persistence (CRUD)</span>
        </div>
        <div style="display:flex;align-items:center;gap:6px;color:#F59E0B;">
          <span>&cir;</span> <span style="color:#A3998C">Priority Filtering</span>
        </div>
      </div>`,
  },
};

// ============================================
// MINI CALCULATOR LOGIC
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
// BUILD A BESPOKE MAC WINDOW PROJECT CARD
// ============================================
function githubSVG() {
  return '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
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
      ' aria-label="View source code of ' + project.title + '">' +
      githubSVG() + ' Source</a>'
    : '<span class="project-link btn btn-secondary disabled"' +
      ' style="opacity:0.4;cursor:default" title="Source repository private" aria-disabled="true">' +
      githubSVG() + ' Source</span>';

  const demoBtn = project.demo
    ? '<a href="' + project.demo + '" target="_blank" rel="noopener noreferrer"' +
      ' class="project-link btn btn-primary"' +
      ' aria-label="View live demo of ' + project.title + '">Live Demo &#8594;</a>'
    : '';

  const comingSoonOverlay = project.comingSoon
    ? '<div class="coming-soon-overlay" aria-hidden="true"><span>&#x1F680; Coming Soon</span></div>'
    : '';

  const highlightHTML = project.highlight
    ? '<div class="project-highlight">&#9670; ' + project.highlight + '</div>'
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
      '<!-- Mac Window Chrome Bar -->' +
      '<div class="mac-titlebar">' +
        '<div class="mac-dots">' +
          '<span class="mac-dot-1"></span>' +
          '<span class="mac-dot-2"></span>' +
          '<span class="mac-dot-3"></span>' +
        '</div>' +
        '<div class="mac-address-bar">' + project.url + '</div>' +
        '<div style="width:30px"></div>' +
      '</div>' +

      '<div class="project-image">' +
        '<div class="project-image-content">' + theme.icon + '</div>' +
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
// RENDER PROJECTS & FILTERING
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
          'No projects in this category yet.' +
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
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, stagger: 0.06, duration: 0.4, ease: 'power2.out' }
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
