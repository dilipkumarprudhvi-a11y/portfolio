# ⚡ Prudhvi Dilip Kumar — Full-Stack Developer Portfolio

A modern, high-performance, dark-themed personal portfolio website showcasing full-stack web applications, technical skillsets, and development journey.

![Portfolio Preview Banner](https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80)

---

## 🌟 Key Features

* **3D Interactive Hero Experience (`Three.js`)**: Real-time rotating dual-layer Icosahedron with particle fields, reactive mouse parallax tilt, and scroll-responsive depth transitions.
* **Custom Desktop Cursor**: Magnetic dual-layer cursor with hover states and velocity interpolation.
* **GSAP ScrollTrigger Cinematic Animations**: Staggered reveals, animated stat counters, and dynamic typewriter effects.
* **Interactive 3D Card Tilt**: Mouse proximity tilt with real-time radial light reflections on skill and project cards.
* **Live Interactive Calculator Preview**: Direct interactive widget on the calculator project card allowing real calculations.
* **Fake News Detection ML Visualizer**: Animated pipeline diagram from OCR/Text input to NLP classification.
* **Dynamic Category Filtering**: Live filtering for skills and projects.
* **Orbiting "Currently Exploring" Hub**: CSS/JS animated planetary orbit visualization of learning technologies.
* **Accessible & Mobile Responsive**: Full keyboard navigation, ARIA attributes, hamburger drawer, and `prefers-reduced-motion` compliance.

---

## 📁 Directory Structure

```
prudhvi-portfolio/
├── index.html           # Main semantic HTML5 markup
├── README.md            # Project documentation & deployment guide
├── css/
│   └── style.css        # CSS variables, glassmorphism, keyframes, and media queries
├── js/
│   ├── main.js          # Lenis smooth scroll, nav bar, custom cursor, contact form & code rain
│   ├── three-hero.js    # Three.js 3D hero canvas scene & fallback handling
│   ├── animations.js    # GSAP ScrollTrigger, typewriter, counters, and 3D tilts
│   └── projects.js      # Central project data registry & interactive project widgets
└── assets/              # Put your resume.pdf and custom images here
```

---

## 🚀 How to Preview Locally

### Option 1: Double Click
Simply open `index.html` in Chrome, Edge, Firefox, or Safari.

### Option 2: VS Code Live Server
1. Open the `prudhvi-portfolio` folder in VS Code.
2. Click **Go Live** on the bottom status bar.

---

## 🌐 1-Click Deployment Guide

### Deploy to GitHub Pages (Free)
1. Initialize a Git repository and push to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of portfolio"
   git branch -M main
   git remote add origin https://github.com/dilipkumarprudhvi-a11y/portfolio.git
   git push -u origin main
   ```
2. In your repository on GitHub, go to **Settings** $\rightarrow$ **Pages**.
3. Under **Branch**, select `main` and `/ (root)`, then click **Save**.
4. Your website is live at `https://dilipkumarprudhvi-a11y.github.io/portfolio/`!

### Deploy to Vercel / Netlify (Free)
1. Drag and drop the `prudhvi-portfolio` folder directly onto [Netlify Drop](https://app.netlify.com/drop) or import from GitHub into [Vercel](https://vercel.com).
2. It goes live instantly with SSL.

---

## 📝 Customization Cheat Sheet

To personalize this portfolio with your actual links and details:

| File | Variable / Text | What to Change |
|---|---|---|
| `index.html` | `YOUR_GITHUB_USERNAME` | Your GitHub profile username |
| `index.html` | `YOUR_LINKEDIN` | Your LinkedIn username |
| `index.html` | `YOUR_INSTAGRAM` | Your Instagram handle |
| `index.html` | `dilipkumarprudhvi@gmail.com` | Your email address |
| `index.html` | `Your Institution Name` | Your Diploma college name |
| `index.html` | `Your University Name` | Your B.Tech university name |
| `js/projects.js` | `PROJECTS` array | Add or edit projects, titles, tech stacks, or repo URLs |
| `assets/` | `resume.pdf` | Place your PDF resume in the `assets/` folder |

---

© 2026 **Prudhvi Dilip Kumar** · Full-Stack Developer
