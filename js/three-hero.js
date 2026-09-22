/**
 * three-hero.js
 * Interactive Three.js 3D Hero Animation
 * Portfolio: Prudhvi Dilip Kumar — Full-Stack Developer
 * Theme: Warm Espresso & Amber Gold
 */

/* -----------------------------------------------------------------
   0. ENVIRONMENT CHECKS
----------------------------------------------------------------- */

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

const prefersReducedMotion =
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const isMobile = window.innerWidth < 768;

/* -----------------------------------------------------------------
   1. CSS FALLBACK HELPERS
----------------------------------------------------------------- */

function showGradientFallback(wrapper) {
  wrapper.style.cssText += `
    background: radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.25), rgba(249, 115, 22, 0.1), transparent 70%);
  `;

  const fallbackEl = wrapper.querySelector('.hero-canvas-fallback');
  if (fallbackEl) fallbackEl.classList.add('visible');
}

/* -----------------------------------------------------------------
   2. MAIN 3-D HERO SCENE
----------------------------------------------------------------- */

function initHero3D() {
  const canvas  = document.getElementById('hero-canvas');
  if (!canvas) return;

  const wrapper = canvas.parentElement;

  if (!supportsWebGL()) {
    showGradientFallback(wrapper);
    return;
  }

  if (isMobile) {
    showGradientFallback(wrapper);
    return;
  }

  // --- RENDERER ---
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
  } catch (e) {
    showGradientFallback(wrapper);
    return;
  }

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  renderer.setPixelRatio(dpr);

  let width  = wrapper.clientWidth  || 500;
  let height = wrapper.clientHeight || 500;
  renderer.setSize(width, height);
  renderer.setClearColor(0x000000, 0);

  // --- SCENE & CAMERA ---
  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(70, width / height, 0.1, 100);
  camera.position.set(0, 0, 4.2);

  // Groups
  const outerGroup = new THREE.Group();
  scene.add(outerGroup);

  const mainGroup = new THREE.Group();
  outerGroup.add(mainGroup);

  // --- GEOMETRY: AMBER GOLD ICOSAHEDRON ---
  // 1. Outer wireframe (Amber Gold)
  const wireGeom = new THREE.IcosahedronGeometry(1.45, 1);
  const wireMat  = new THREE.MeshBasicMaterial({
    color: 0xF59E0B, // Vibrant Amber Gold
    wireframe: true,
    transparent: true,
    opacity: 0.35,
  });
  const wireMesh = new THREE.Mesh(wireGeom, wireMat);
  mainGroup.add(wireMesh);

  // 2. Inner glowing core (Sunset Orange / Amber)
  const solidGeom = new THREE.IcosahedronGeometry(1.15, 0);
  const solidMat  = new THREE.MeshPhongMaterial({
    color: 0xF97316, // Sunset Orange
    emissive: 0xD97706,
    emissiveIntensity: 0.25,
    transparent: true,
    opacity: 0.22,
    shininess: 90,
    flatShading: true,
  });
  const solidMesh = new THREE.Mesh(solidGeom, solidMat);
  mainGroup.add(solidMesh);

  // --- DUAL TORUS ORBITS (SUNSET GOLD & TANGERINE) ---
  const torusGeom1 = new THREE.TorusGeometry(1.9, 0.01, 8, 100);
  const torusMat1  = new THREE.MeshBasicMaterial({
    color: 0xFBBF24, // Warm Sunlight Gold
    transparent: true,
    opacity: 0.55,
  });
  const torus1 = new THREE.Mesh(torusGeom1, torusMat1);
  torus1.rotation.x = Math.PI / 2.2;
  torus1.rotation.y = Math.PI / 8;
  mainGroup.add(torus1);

  const torusGeom2 = new THREE.TorusGeometry(1.75, 0.008, 8, 100);
  const torusMat2  = new THREE.MeshBasicMaterial({
    color: 0xF97316, // Sunset Tangerine
    transparent: true,
    opacity: 0.45,
  });
  const torus2 = new THREE.Mesh(torusGeom2, torusMat2);
  torus2.rotation.x = Math.PI / 3.2;
  torus2.rotation.y = -Math.PI / 5;
  mainGroup.add(torus2);

  // --- WARM PARTICLES FIELD ---
  function createParticleLayer(count, color, size, opacity) {
    const geom = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const radius = 2.2 + Math.random() * 2.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3]     = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }

    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({
      color,
      size,
      transparent: true,
      opacity,
      blending: THREE.AdditiveBlending,
    });
    return new THREE.Points(geom, mat);
  }

  const particlesGold   = createParticleLayer(150, 0xFBBF24, 0.035, 0.7);
  const particlesSunset = createParticleLayer(90, 0xF97316, 0.04, 0.6);
  mainGroup.add(particlesGold);
  mainGroup.add(particlesSunset);

  // --- LIGHTING ---
  const ambientLight = new THREE.AmbientLight(0xFFFBEB, 0.4);
  scene.add(ambientLight);

  const pointLightAmber = new THREE.PointLight(0xF59E0B, 2.5, 12);
  pointLightAmber.position.set(3, 3, 3);
  scene.add(pointLightAmber);

  const pointLightOrange = new THREE.PointLight(0xF97316, 1.8, 10);
  pointLightOrange.position.set(-3, -2, 2);
  scene.add(pointLightOrange);

  const cursorLight = new THREE.PointLight(0xFDE68A, 1.2, 8);
  scene.add(cursorLight);

  // --- MOUSE TRACKING ---
  let targetRotX = 0;
  let targetRotY = 0;
  let currentRotX = 0;
  let currentRotY = 0;

  window.addEventListener('mousemove', (e) => {
    const nx = (e.clientX / window.innerWidth) * 2 - 1;
    const ny = -(e.clientY / window.innerHeight) * 2 + 1;

    targetRotX = ny * 0.28;
    targetRotY = nx * 0.45;

    cursorLight.position.set(nx * 3, ny * 3, 2.5);
  });

  // --- RESIZE HANDLER ---
  function onResize() {
    width  = wrapper.clientWidth  || 500;
    height = wrapper.clientHeight || 500;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }
  window.addEventListener('resize', onResize);

  // --- ANIMATION LOOP ---
  if (prefersReducedMotion) {
    renderer.render(scene, camera);
    return;
  }

  function animate() {
    requestAnimationFrame(animate);

    // Auto-rotations
    mainGroup.rotation.y += 0.0035;
    mainGroup.rotation.x += 0.0012;

    // Orbit rotations
    torus1.rotation.z += 0.006;
    torus2.rotation.z -= 0.005;

    // Particles slow counter-rotation
    particlesGold.rotation.y   += 0.0008;
    particlesSunset.rotation.y -= 0.0006;

    // Lerped mouse tilt
    currentRotX += (targetRotX - currentRotX) * 0.05;
    currentRotY += (targetRotY - currentRotY) * 0.05;
    outerGroup.rotation.x = currentRotX;
    outerGroup.rotation.y = currentRotY;

    renderer.render(scene, camera);
  }
  animate();
}

document.addEventListener('DOMContentLoaded', initHero3D);
