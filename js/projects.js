'use strict';

/**
 * projects.js
 * Project filtering and interactive mini-calculator engine.
 * Author: Prudhvi Dilip Kumar
 * Enhanced with smooth motion transitions & tactile haptic micro-interactions
 */

document.addEventListener('DOMContentLoaded', () => {

  // ===============================================================
  // 1. PROJECT CATEGORY FILTER ENGINE WITH SMOOTH TRANSITIONS
  // ===============================================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const featuredCards = document.querySelectorAll('.featured-project-card');
  const systemCards = document.querySelectorAll('.system-project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active state
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      const filter = btn.dataset.filter || 'all';

      // Filter featured case studies with smooth fade
      featuredCards.forEach(card => {
        const cat = card.dataset.category;
        const matches = (filter === 'all' || cat === filter);

        if (matches) {
          card.style.display = 'block';
          requestAnimationFrame(() => {
            card.style.transition = 'opacity 0.3s cubic-bezier(0.22, 1, 0.36, 1), transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          });
        } else {
          card.style.transition = 'opacity 0.2s cubic-bezier(0.22, 1, 0.36, 1), transform 0.2s cubic-bezier(0.22, 1, 0.36, 1)';
          card.style.opacity = '0';
          card.style.transform = 'translateY(8px)';
          setTimeout(() => {
            if (card.style.opacity === '0') {
              card.style.display = 'none';
            }
          }, 200);
        }
      });

      // Filter system cards with smooth fade
      systemCards.forEach(card => {
        const cat = card.dataset.category;
        const matches = (filter === 'all' || cat === filter);

        if (matches) {
          card.style.display = 'flex';
          requestAnimationFrame(() => {
            card.style.transition = 'opacity 0.3s cubic-bezier(0.22, 1, 0.36, 1), transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          });
        } else {
          card.style.transition = 'opacity 0.2s cubic-bezier(0.22, 1, 0.36, 1), transform 0.2s cubic-bezier(0.22, 1, 0.36, 1)';
          card.style.opacity = '0';
          card.style.transform = 'translateY(8px)';
          setTimeout(() => {
            if (card.style.opacity === '0') {
              card.style.display = 'none';
            }
          }, 200);
        }
      });
    });
  });

});

// ===============================================================
// 2. LIVE INTERACTIVE CALCULATOR ENGINE
// ===============================================================
let miniCalcValue = '0';
let miniCalcReset = false;

window.miniCalcNum = function(num) {
  const display = document.getElementById('mini-calc-display');
  if (!display) return;

  if (num === '.') {
    const parts = miniCalcValue.split(/[+\-*/]/);
    const currentPart = parts[parts.length - 1];
    if (currentPart.includes('.')) return;
    if (miniCalcReset || currentPart === '') {
      miniCalcValue = miniCalcReset ? '0.' : miniCalcValue + '0.';
      miniCalcReset = false;
      display.textContent = miniCalcValue;
      return;
    }
  }

  if (miniCalcValue === '0' || miniCalcReset) {
    miniCalcValue = num === '.' ? '0.' : num;
    miniCalcReset = false;
  } else {
    if (miniCalcValue.length < 12) miniCalcValue += num;
  }
  display.textContent = miniCalcValue;
};

window.miniCalcOp = function(op) {
  const display = document.getElementById('mini-calc-display');
  if (!display) return;

  // Reset if currently showing error
  if (miniCalcReset && isNaN(Number(miniCalcValue))) {
    miniCalcValue = '0';
  }

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
    let sanitized = miniCalcValue.replace(/[^0-9+\-*/.]/g, '');
    while (['+', '-', '*', '/'].includes(sanitized.slice(-1))) {
      sanitized = sanitized.slice(0, -1);
    }
    if (!sanitized) {
      miniCalcValue = '0';
      display.textContent = '0';
      return;
    }
    const result = Function('"use strict";return (' + sanitized + ')')();
    if (!isFinite(result)) {
      display.textContent = 'Cannot ÷ 0';
      miniCalcValue = '0';
      miniCalcReset = true;
      return;
    }
    miniCalcValue = String(Math.round(result * 1000000) / 1000000);
    miniCalcReset = true;
    display.textContent = miniCalcValue;
  } catch (e) {
    display.textContent = 'Error';
    miniCalcValue = '0';
    miniCalcReset = true;
  }
};
