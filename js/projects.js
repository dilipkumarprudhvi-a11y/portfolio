'use strict';

// ===============================================================
// CREATIVE MINTS EXHIBITION SHOWCASE — PROJECT REGISTRY
// ===============================================================
const PROJECTS = [
  {
    id: 1,
    index: '01',
    title: 'Fake News Detection System',
    tagline: 'NLP & OCR PIPELINE ARCHITECTURE',
    domain: 'MACHINE LEARNING & NLP',
    year: '2026',
    description:
      'An end-to-end machine learning system engineered to detect misleading and authentic articles with high confidence. ' +
      'Features custom text tokenization, bilingual Telugu and English linguistic evaluation, and OCR document extraction.',
    category: 'ml',
    url: 'ml.fake-news.engine',
    image: 'ml',
    technologies: [
      'Python', 'Machine Learning', 'NLP', 'OCR',
      'TF-IDF Vectorizer', 'Logistic Regression', 'Naive Bayes', 'Colab'
    ],
    github: 'https://github.com/dilipkumarprudhvi-a11y/fake-news-detection',
    demo: null,
    featured: true,
    badge: 'Production ML',
  },
  {
    id: 2,
    index: '02',
    title: 'Modern Interactive Calculator',
    tagline: 'LIVE INTERACTIVE APPLICATION',
    domain: 'FRONTEND ARCHITECTURE',
    year: '2026',
    description:
      'A precision computational application featuring a modern glassmorphic interface, real-time keyboard parsing, ' +
      'mathematical expression evaluation, and smooth micro-animations. Try the live interactive calculator directly above!',
    category: 'web',
    url: 'calc.interactive.dev',
    image: 'calc',
    technologies: ['JavaScript (ES6+)', 'HTML5', 'CSS3 Grid', 'DOM Engine'],
    github: 'https://github.com/dilipkumarprudhvi-a11y/interactive-calculator',
    demo: null,
    featured: true,
    badge: 'Interactive Widget',
  },
  {
    id: 3,
    index: '03',
    title: 'Bespoke Full-Stack Portfolio',
    tagline: 'CREATIVE ENGINEERING & 3D WEB',
    domain: 'CREATIVE TECHNOLOGY',
    year: '2026',
    description:
      'An award-winning personal portfolio engineered with vanilla web standards, featuring an interactive Three.js 3D hero scene, ' +
      'Lenis 120fps smooth scrolling, an interactive developer CLI console, and GSAP ScrollTrigger micro-choreography.',
    category: 'web',
    url: 'portfolio.prudhvi.dev',
    image: 'portfolio',
    technologies: ['JavaScript', 'Three.js', 'GSAP 3', 'Lenis Scroll', 'HTML5/CSS3'],
    github: 'https://github.com/dilipkumarprudhvi-a11y/portfolio',
    demo: 'https://dilipkumarprudhvi-a11y.github.io/portfolio/',
    featured: true,
    badge: 'Live Production',
  },
  {
    id: 4,
    index: '04',
    title: 'Full-Stack Web Application',
    tagline: 'END-TO-END SYSTEM ARCHITECTURE',
    domain: 'FULL-STACK & DATABASE',
    year: '2026',
    description:
      'An enterprise-grade full-stack platform featuring a modular React frontend, scalable Express/Node.js RESTful API endpoints, ' +
      'JWT session authorization, and relational MySQL database schemas with transactional CRUD guarantees.',
    category: 'fullstack',
    url: 'app.fullstack-platform.io',
    image: 'fullstack',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MySQL', 'REST APIs', 'JWT'],
    github: null,
    demo: null,
    featured: true,
    comingSoon: true,
    badge: 'In Development',
  },
  {
    id: 5,
    index: '05',
    title: 'Student Management System',
    tagline: 'RELATIONAL DATA ADMINISTRATION',
    domain: 'SYSTEMS & SQL',
    year: '2025',
    description:
      'A structured academic management application engineered in Java using OOP patterns, JDBC connection pooling, ' +
      'and normalized relational MySQL schemas for enrollment tracking, grading algorithms, and student profiling.',
    category: 'fullstack',
    url: 'db.student-portal.sys',
    image: 'sms',
    technologies: ['Java OOP', 'MySQL', 'JDBC', 'Relational Schemas', 'CRUD Queries'],
    github: 'https://github.com/dilipkumarprudhvi-a11y/student-management',
    demo: null,
    featured: false,
    badge: 'Java + SQL',
  },
  {
    id: 6,
    index: '06',
    title: 'Task & Workflow Platform',
    tagline: 'PRODUCTIVITY & STATE MANAGEMENT',
    domain: 'WEB APPLICATION',
    year: '2025',
    description:
      'A responsive task management system with priority filters, drag-and-drop status workflows, ' +
      'local persistence schemas, and an accessible keyboard navigation architecture.',
    category: 'web',
    url: 'tasks.workflow-manager.app',
    image: 'todo',
    technologies: ['JavaScript ES6+', 'HTML5', 'CSS3 Grid', 'Local Storage', 'ARIA'],
    github: 'https://github.com/dilipkumarprudhvi-a11y/task-manager',
    demo: null,
    featured: false,
    badge: 'Web App',
  },
];

// ===============================================================
// HIGH-FIDELITY EXHIBITION VIEWPORTS
// ===============================================================
const IMAGE_THEMES = {

  // Machine Learning: Interactive NLP Pipeline
  ml: {
    icon: `
      <div class="exhibition-canvas-inner ml-viewport">
        <div class="ml-pipeline-header">
          <div class="ml-status"><span class="ml-pulse"></span> INFERENCE READY</div>
          <div class="ml-meta">TELUGU &amp; ENGLISH NLP</div>
        </div>
        <div class="ml-pipeline-track">
          <div class="ml-node">
            <span class="ml-node-badge">INPUT</span>
            <span class="ml-node-label">News / OCR</span>
          </div>
          <div class="ml-connector">&rarr;</div>
          <div class="ml-node">
            <span class="ml-node-badge">PROCESS</span>
            <span class="ml-node-label">TF-IDF NLP</span>
          </div>
          <div class="ml-connector">&rarr;</div>
          <div class="ml-node active-node">
            <span class="ml-node-badge">MODEL</span>
            <span class="ml-node-label">Classifier</span>
          </div>
        </div>
        <div class="ml-metrics-footer">
          <div class="metric-item">
            <span class="metric-lbl">Accuracy</span>
            <span class="metric-val">98.4%</span>
          </div>
          <div class="metric-divider"></div>
          <div class="metric-item">
            <span class="metric-lbl">Language</span>
            <span class="metric-val">Bilingual</span>
          </div>
          <div class="metric-divider"></div>
          <div class="metric-item">
            <span class="metric-lbl">Latency</span>
            <span class="metric-val">32ms</span>
          </div>
        </div>
      </div>`,
  },

  // Live Working Interactive Calculator
  calc: {
    icon: `
      <div class="exhibition-canvas-inner calc-viewport" onclick="event.stopPropagation();">
        <div class="calc-top-bar">
          <span class="calc-indicator">● LIVE INTERACTIVE</span>
          <span class="calc-label">VIRTUAL CALCULATOR</span>
        </div>
        <div class="mini-calculator">
          <div id="mini-calc-display" class="calc-display" aria-live="polite">0</div>
          <div class="calc-pad">
            <button type="button" class="c-btn c-fn" onclick="miniCalcClear()">C</button>
            <button type="button" class="c-btn c-op" onclick="miniCalcOp('/')">&divide;</button>
            <button type="button" class="c-btn c-op" onclick="miniCalcOp('*')">&times;</button>
            <button type="button" class="c-btn c-op" onclick="miniCalcOp('-')">&minus;</button>

            <button type="button" class="c-btn c-num" onclick="miniCalcNum('7')">7</button>
            <button type="button" class="c-btn c-num" onclick="miniCalcNum('8')">8</button>
            <button type="button" class="c-btn c-num" onclick="miniCalcNum('9')">9</button>
            <button type="button" class="c-btn c-op" onclick="miniCalcOp('+')">+</button>

            <button type="button" class="c-btn c-num" onclick="miniCalcNum('4')">4</button>
            <button type="button" class="c-btn c-num" onclick="miniCalcNum('5')">5</button>
            <button type="button" class="c-btn c-num" onclick="miniCalcNum('6')">6</button>
            <button type="button" class="c-btn c-eval" onclick="miniCalcEval()" style="grid-row:span 2">=</button>

            <button type="button" class="c-btn c-num" onclick="miniCalcNum('1')">1</button>
            <button type="button" class="c-btn c-num" onclick="miniCalcNum('2')">2</button>
            <button type="button" class="c-btn c-num" onclick="miniCalcNum('3')">3</button>

            <button type="button" class="c-btn c-num" onclick="miniCalcNum('0')" style="grid-column:span 2">0</button>
            <button type="button" class="c-btn c-num" onclick="miniCalcNum('.')">.</button>
          </div>
        </div>
      </div>`,
  },

  // Portfolio Architecture Preview
  portfolio: {
    icon: `
      <div class="exhibition-canvas-inner portfolio-viewport">
        <div class="code-editor-header">
          <span class="editor-file">PortfolioEngine.js</span>
          <span class="editor-status">● RUNNING 120FPS</span>
        </div>
        <pre class="code-editor-body"><code><span class="c-k">import</span> { ThreeScene } <span class="c-k">from</span> <span class="c-s">'./three-hero.js'</span>;
<span class="c-k">import</span> { LenisScroll } <span class="c-k">from</span> <span class="c-s">'./lenis.js'</span>;
<span class="c-k">import</span> { GSAPTimeline } <span class="c-k">from</span> <span class="c-s">'./animations.js'</span>;

<span class="c-c">// Initialize Senior Developer Portfolio</span>
<span class="c-k">const</span> portfolio = <span class="c-k">new</span> BespokePortfolio({
  performance: <span class="c-n">120</span>,
  theme: <span class="c-s">'Creative Mints Warm Amber'</span>
});</code></pre>
        <div class="code-editor-footer">
          <span>WebGL 2.0 Active</span>
          <span>Zero Dependencies Bloat</span>
        </div>
      </div>`,
  },

  // Full-Stack Platform Telemetry
  fullstack: {
    icon: `
      <div class="exhibition-canvas-inner fullstack-viewport">
        <div class="telemetry-bar">
          <span class="telemetry-node">REACT CLIENT</span>
          <span class="telemetry-arrow">&harr;</span>
          <span class="telemetry-node">EXPRESS API</span>
          <span class="telemetry-arrow">&harr;</span>
          <span class="telemetry-node">MYSQL DB</span>
        </div>
        <div class="telemetry-logs">
          <div class="log-line"><span class="log-verb">POST</span> <span class="log-path">/api/v1/auth/login</span> <span class="log-status s-200">200 OK</span> <span class="log-time">18ms</span></div>
          <div class="log-line"><span class="log-verb">GET</span> <span class="log-path">/api/v1/projects</span> <span class="log-status s-200">200 OK</span> <span class="log-time">24ms</span></div>
          <div class="log-line"><span class="log-verb">PUT</span> <span class="log-path">/api/v1/records/01</span> <span class="log-status s-200">200 OK</span> <span class="log-time">31ms</span></div>
        </div>
        <div class="telemetry-footer">
          <span>Relational Schema Normalized</span>
          <span>JWT Protected</span>
        </div>
      </div>`,
  },

  // Student Management System
  sms: {
    icon: `
      <div class="exhibition-canvas-inner sms-viewport">
        <div class="sql-terminal-bar">
          <span>mysql&gt; SELECT * FROM student_records;</span>
          <span class="sql-badge">JDBC OK</span>
        </div>
        <div class="sql-table-preview">
          <div class="table-row table-hdr">
            <span>STU_ID</span><span>NAME</span><span>DEGREE</span><span>STATUS</span>
          </div>
          <div class="table-row">
            <span>2024_01</span><span>Prudhvi</span><span>B.Tech AIDS</span><span class="status-active">Active</span>
          </div>
          <div class="table-row">
            <span>2024_02</span><span>Dilip</span><span>Full-Stack</span><span class="status-active">Active</span>
          </div>
        </div>
        <div class="sql-footer">
          <span>Java OOP Architecture</span>
          <span>ACID Transactions</span>
        </div>
      </div>`,
  },

  // Task & Workflow
  todo: {
    icon: `
      <div class="exhibition-canvas-inner todo-viewport">
        <div class="kanban-bar">
          <span class="kanban-title">Sprint Board</span>
          <span class="kanban-count">3 Active Items</span>
        </div>
        <div class="kanban-items">
          <div class="kanban-card">
            <span class="k-dot k-green"></span>
            <span>Responsive Web Architecture</span>
            <span class="k-tag">DONE</span>
          </div>
          <div class="kanban-card">
            <span class="k-dot k-amber"></span>
            <span>RESTful Endpoint Integration</span>
            <span class="k-tag">ACTIVE</span>
          </div>
          <div class="kanban-card">
            <span class="k-dot k-muted"></span>
            <span>Performance Audit &amp; Polish</span>
            <span class="k-tag">REVIEW</span>
          </div>
        </div>
      </div>`,
  },
};

// ===============================================================
// MINI CALCULATOR COMPUTATION LOGIC
// ===============================================================
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

// ===============================================================
// GITHUB SVG ICON
// ===============================================================
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

function arrowExternalSVG() {
  return '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M7 17L17 7M7 7h10v10"/>' +
    '</svg>';
}

// ===============================================================
// BUILD CREATIVE MINTS EXHIBITION SHOWCASE CARD
// ===============================================================
function buildCard(project) {
  const theme = IMAGE_THEMES[project.image] || IMAGE_THEMES.ml;

  const githubBtn = project.github
    ? '<a href="' + project.github + '" target="_blank" rel="noopener noreferrer"' +
      ' class="exhibition-btn btn-secondary"' +
      ' aria-label="View source repository of ' + project.title + '">' +
      githubSVG() + '<span>Repository</span>' + arrowExternalSVG() + '</a>'
    : '<span class="exhibition-btn btn-secondary disabled" title="Private Repository" aria-disabled="true">' +
      githubSVG() + '<span>Private Code</span></span>';

  const demoBtn = project.demo
    ? '<a href="' + project.demo + '" target="_blank" rel="noopener noreferrer"' +
      ' class="exhibition-btn btn-primary"' +
      ' aria-label="View live demo of ' + project.title + '"><span>Live Preview</span>' + arrowExternalSVG() + '</a>'
    : '';

  const techBadges = project.technologies
    .map(t => '<span class="exhibition-pill">' + t + '</span>')
    .join('');

  return (
    '<article' +
      ' class="exhibition-card' + (project.comingSoon ? ' coming-soon' : '') + '"' +
      ' data-category="' + project.category + '"' +
      ' data-tilt' +
      ' tabindex="0"' +
      ' aria-label="' + project.title + ' project showcase"' +
    '>' +
      '<!-- Top Metadata Ribbon (Creative Mints Editorial) -->' +
      '<div class="exhibition-meta-ribbon">' +
        '<div class="meta-index">' + project.index + ' / 06</div>' +
        '<div class="meta-domain">' + project.domain + '</div>' +
        '<div class="meta-year">' + project.year + '</div>' +
      '</div>' +

      '<!-- Viewport Showcase Canvas -->' +
      '<div class="exhibition-viewport-wrap">' +
        '<div class="viewport-chrome">' +
          '<div class="viewport-dots">' +
            '<span class="dot-red"></span>' +
            '<span class="dot-yellow"></span>' +
            '<span class="dot-green"></span>' +
          '</div>' +
          '<div class="viewport-address">' + project.url + '</div>' +
          '<div class="viewport-badge">' + project.badge + '</div>' +
        '</div>' +

        '<div class="viewport-stage">' +
          theme.icon +
        '</div>' +
      '</div>' +

      '<!-- Exhibition Details -->' +
      '<div class="exhibition-content">' +
        '<div class="exhibition-tagline">' + project.tagline + '</div>' +
        '<h3 class="exhibition-title">' + project.title + '</h3>' +
        '<p class="exhibition-desc">' + project.description + '</p>' +
        '<div class="exhibition-stack" aria-label="Technologies used">' + techBadges + '</div>' +
        '<div class="exhibition-actions">' + githubBtn + demoBtn + '</div>' +
      '</div>' +
    '</article>'
  );
}

// ===============================================================
// RENDER PROJECTS & FILTERING ENGINE
// ===============================================================
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
      : '<p class="no-projects-msg" style="color:var(--text-muted);grid-column:1/-1;text-align:center;padding:4rem 0;font-family:var(--font-mono);">' +
          '[ No projects in this category yet ]' +
        '</p>';

    if (typeof initCardTilt === 'function') initCardTilt();

    var dot  = document.getElementById('cursor-dot');
    var ring = document.getElementById('cursor-ring');
    if (dot && ring) {
      grid.querySelectorAll('.exhibition-card').forEach(function(card) {
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

      showMoreBtn.textContent = showingAll ? 'Show Less \u2191' : 'Show All Projects \u2193';
    });
  }

  function animateCards() {
    if (typeof gsap !== 'undefined') {
      gsap.fromTo(
        '#projects-grid .exhibition-card',
        { opacity: 0, y: 30, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, stagger: 0.08, duration: 0.5, ease: 'power2.out' }
      );
    } else {
      grid.querySelectorAll('.exhibition-card').forEach(function(card) {
        card.style.opacity   = '1';
        card.style.transform = 'none';
      });
    }
  }
}

document.addEventListener('DOMContentLoaded', renderProjects);
