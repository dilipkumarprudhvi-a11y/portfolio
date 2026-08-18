/**
 * three-hero.js
 * Interactive Three.js 3D Hero Animation
 * Portfolio: Prudhvi Dilip Kumar — Full-Stack Developer
 *
 * Features:
 *  - WebGL detection with CSS fallback
 *  - Mobile & reduced-motion detection
 *  - Icosahedron (wireframe + solid) with GSAP continuous rotation
 *  - Dual torus rings with pulse animation
 *  - Particle system (two layers: indigo + cyan)
 *  - Mouse-tracking tilt with lerped damping
 *  - Scroll-based parallax camera + opacity fade
 *  - Responsive resize handler
 */

/* -----------------------------------------------------------------
   0. ENVIRONMENT CHECKS
----------------------------------------------------------------- */

/**
 * Returns true if the browser supports WebGL.
 */
function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch (e) {
    return false;
  }
}

/** True when the user prefers reduced motion. */
const prefersReducedMotion =
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** True on small / mobile viewports. */
const isMobile = window.innerWidth < 768;

/* -----------------------------------------------------------------
   1. CSS FALLBACK HELPERS
----------------------------------------------------------------- */

/**
 * Inject a beautiful animated gradient fallback into the hero canvas wrapper.
 * Used when WebGL is unavailable.
 * @param {HTMLElement} wrapper
 */
function showGradientFallback(wrapper) {
  wrapper.style.cssText += `
    background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
    background-size: 400% 400%;
    animation: heroGradientShift 8s ease infinite;
  `;

  // Inject keyframes once
  if (!document.getElementById('hero-fallback-style')) {
    const style = document.createElement('style');
    style.id = 'hero-fallback-style';
    style.textContent = `
      @keyframes heroGradientShift {
        0%   { background-position: 0% 50%; }
        50%  { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      @keyframes heroMobileFloat {
        0%, 100% { transform: translateY(0) scale(1); opacity: 0.7; }
        50%       { transform: translateY(-18px) scale(1.08); opacity: 1; }
      }
      .hero-mobile-orb {
        position: absolute;
        border-radius: 50%;
        filter: blur(60px);
        animation: heroMobileFloat 4s ease-in-out infinite;
        pointer-events: none;
      }
    `;
    document.head.appendChild(style);
  }
}

/**
 * Show a simpler mobile CSS animation (floating orbs) instead of Three.js.
 * @param {HTMLElement} wrapper
 */
function showMobileFallback(wrapper) {
  showGradientFallback(wrapper);

  const orbConfigs = [
    { size: 260, top: '10%', left: '5%',  color: 'rgba(99,102,241,0.45)', delay: '0s' },
    { size: 180, top: '50%', left: '65%', color: 'rgba(34,211,238,0.35)', delay: '1.5s' },
    { size: 120, top: '70%', left: '20%', color: 'rgba(99,102,241,0.25)', delay: '0.8s' },
  ];

  orbConfigs.forEach(cfg => {
    const orb = document.createElement('div');
    orb.className = 'hero-mobile-orb';
    orb.style.cssText = `
      width: ${cfg.size}px; height: ${cfg.size}px;
      top: ${cfg.top}; left: ${cfg.left};
      background: ${cfg.color};
      animation-delay: ${cfg.delay};
    `;
    wrapper.appendChild(orb);
  });
}

/* -----------------------------------------------------------------
   2. THREE.JS HERO INITIALISER
----------------------------------------------------------------- */

function initHero3D() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const wrapper = canvas.parentElement;

  // -- 2a. Fallback gates ---------------------------------------------------
  if (!supportsWebGL()) {
    showGradientFallback(wrapper);
    return;
  }

  if (isMobile) {
    showMobileFallback(wrapper);
    return;
  }

  // -- 2b. Renderer ---------------------------------------------------------
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(wrapper.clientWidth, wrapper.clientHeight);
  renderer.setClearColor(0x000000, 0);

  // -- 2c. Scene & Camera ---------------------------------------------------
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    75,
    wrapper.clientWidth / wrapper.clientHeight,
    0.1,
    100
  );
  camera.position.z = 4;

  // -- 2d. Group hierarchy --------------------------------------------------
  // outerGroup  -> receives mouse-tilt rotation
  //   |-- mainGroup -> receives auto-rotation + contains icosahedra & tori
  const outerGroup = new THREE.Group();
  const mainGroup  = new THREE.Group();
  outerGroup.add(mainGroup);
  scene.add(outerGroup);

  // -- 2e. Icosahedra -------------------------------------------------------
  // Outer wireframe
  const icoWireGeo = new THREE.IcosahedronGeometry(1.5, 1);
  const icoWireMat = new THREE.MeshBasicMaterial({
    color: 0x6366f1,
    wireframe: true,
    transparent: true,
    opacity: 0.3,
  });
  const icoWire = new THREE.Mesh(icoWireGeo, icoWireMat);
  mainGroup.add(icoWire);

  // Inner solid
  const icoSolidGeo = new THREE.IcosahedronGeometry(1.2, 0);
  const icoSolidMat = new THREE.MeshPhongMaterial({
    color: 0x6366f1,
    emissive: 0x6366f1,
    emissiveIntensity: 0.2,
    transparent: true,
    opacity: 0.15,
    shininess: 100,
  });
  const icoSolid = new THREE.Mesh(icoSolidGeo, icoSolidMat);
  mainGroup.add(icoSolid);

  // GSAP continuous Y-rotation (12 s loop)
  if (window.gsap && !prefersReducedMotion) {
    gsap.to(mainGroup.rotation, {
      y: Math.PI * 2,
      duration: 12,
      repeat: -1,
      ease: 'none',
    });
  }

  // -- 2f. Torus rings ------------------------------------------------------
  const torus1Geo = new THREE.TorusGeometry(1.8, 0.008, 8, 100);
  const torus1Mat = new THREE.MeshBasicMaterial({
    color: 0x22d3ee,
    transparent: true,
    opacity: 0.5,
  });
  const torus1 = new THREE.Mesh(torus1Geo, torus1Mat);
  torus1.rotation.x = Math.PI / 2; // lay flat
  mainGroup.add(torus1);

  const torus2Geo = new THREE.TorusGeometry(2.0, 0.006, 8, 100);
  const torus2Mat = new THREE.MeshBasicMaterial({
    color: 0xa855f7, // accent violet
    transparent: true,
    opacity: 0.35,
  });
  const torus2 = new THREE.Mesh(torus2Geo, torus2Mat);
  torus2.rotation.x = Math.PI / 3;
  torus2.rotation.y = Math.PI / 6;
  mainGroup.add(torus2);

  // -- 2g. Particle Systems -------------------------------------------------
  const particleCount = (window.navigator.hardwareConcurrency || 4) > 4 ? 200 : 80;

  /**
   * Build a Points mesh scattered uniformly inside a sphere.
   * @param {number} count   Number of points
   * @param {number} radius  Sphere radius
   * @param {number} color   Hex colour
   * @returns {THREE.Points}
   */
  function buildParticles(count, radius, color) {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const r     = radius * Math.cbrt(Math.random()); // volume-uniform distribution

      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const mat = new THREE.PointsMaterial({
      color,
      size: 0.03,
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true,
    });

    return new THREE.Points(geo, mat);
  }

  // Primary indigo particles
  const particlesMesh = buildParticles(particleCount, 4, 0x6366f1);
  scene.add(particlesMesh);

  // Cyan accent particles (fewer, tighter radius)
  const particlesCyan = buildParticles(Math.floor(particleCount * 0.4), 3.5, 0x22d3ee);
  scene.add(particlesCyan);

  // -- 2h. Lighting ---------------------------------------------------------
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
  scene.add(ambientLight);

  // Indigo accent
  const pointLightIndigo = new THREE.PointLight(0x6366f1, 2, 10);
  pointLightIndigo.position.set(2, 2, 2);
  scene.add(pointLightIndigo);

  // Cyan fill
  const pointLightCyan = new THREE.PointLight(0x22d3ee, 1, 8);
  pointLightCyan.position.set(-2, -1, 1);
  scene.add(pointLightCyan);

  // Key directional
  const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
  dirLight.position.set(0, 5, 5);
  scene.add(dirLight);

  // Mouse-tracking fill light
  const mouseSpotlight = new THREE.PointLight(0xffffff, 0.4, 12);
  mouseSpotlight.position.set(0, 0, 5);
  scene.add(mouseSpotlight);

  // -- 2i. Mouse Interaction ------------------------------------------------
  let targetRotX  = 0, targetRotY  = 0;
  let currentRotX = 0, currentRotY = 0;
  const mouse = { x: 0, y: 0 };

  window.addEventListener('mousemove', (e) => {
    // Normalise to -1 .. +1
    mouse.x = (e.clientX / window.innerWidth)  *  2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) *  2 + 1;

    targetRotX = mouse.y * 0.3;
    targetRotY = mouse.x * 0.5;

    // Slide spotlight with cursor
    mouseSpotlight.position.set(mouse.x * 4, mouse.y * 3, 5);
  });

  // -- 2j. Scroll Interaction -----------------------------------------------
  // Cache original material opacities before any scroll mutation
  const originalOpacities = new Map();
  scene.traverse((child) => {
    if (child.material) {
      originalOpacities.set(child.uuid, child.material.opacity);
    }
  });

  window.addEventListener('scroll', () => {
    const progress = Math.min(window.scrollY / window.innerHeight, 1);

    // Camera pulls back as user scrolls
    camera.position.z = 4 + progress * 3;

    // Fade all materials relative to their original opacity
    scene.traverse((child) => {
      if (child.material) {
        const orig = originalOpacities.get(child.uuid) ?? child.material.opacity;
        child.material.opacity = orig * (1 - progress);
      }
    });
  });

  // -- 2k. Resize Handler ---------------------------------------------------
  window.addEventListener('resize', () => {
    const w = wrapper.clientWidth;
    const h = wrapper.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  // -- 2l. Animation Loop ---------------------------------------------------
  function animate() {
    requestAnimationFrame(animate);

    // Honour prefers-reduced-motion: render static frame only
    if (prefersReducedMotion) {
      renderer.render(scene, camera);
      return;
    }

    // Auto-rotation (GSAP drives Y when available; fallback here)
    if (!window.gsap) {
      mainGroup.rotation.y += 0.003;
    }
    mainGroup.rotation.x += 0.001;

    // Mouse-based tilt with lerped damping applied to outerGroup
    currentRotX += (targetRotX - currentRotX) * 0.05;
    currentRotY += (targetRotY - currentRotY) * 0.05;
    outerGroup.rotation.x = currentRotX;
    outerGroup.rotation.y = currentRotY;

    // Particle drift (counter-rotating for visual depth)
    particlesMesh.rotation.y += 0.0005;
    particlesMesh.rotation.x += 0.0002;
    particlesCyan.rotation.y -= 0.0004;
    particlesCyan.rotation.x += 0.0003;

    // Torus counter-rotation pulse
    torus1.rotation.z += 0.008;
    torus2.rotation.z -= 0.005;

    renderer.render(scene, camera);
  }

  animate();
}

/* -----------------------------------------------------------------
   3. ENTRY POINT
----------------------------------------------------------------- */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHero3D);
} else {
  initHero3D();
}
