// ==========================================================================
// 01 — THEME TOGGLE (DARK-FIRST SYSTEM)
// ==========================================================================
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;

// Read current theme state from localStorage
const currentTheme = localStorage.getItem('theme') || 'dark';
if (currentTheme === 'light') {
  root.setAttribute('data-theme', 'light');
}

themeToggle.addEventListener('click', () => {
  const isLight = root.getAttribute('data-theme') === 'light';
  if (isLight) {
    root.removeAttribute('data-theme');
    localStorage.setItem('theme', 'dark');
  } else {
    root.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  }
});

// ==========================================================================
// 02 — VIEWPORT SIMULATOR
// ==========================================================================
const viewportSlider = document.getElementById('viewportSlider');
const simContainer = document.getElementById('simContainer');
const viewportWidthLabel = document.getElementById('viewportWidthLabel');

if (viewportSlider && simContainer && viewportWidthLabel) {
  viewportSlider.addEventListener('input', (e) => {
    const width = e.target.value;
    simContainer.style.width = `${width}px`;
    viewportWidthLabel.textContent = `${width}px`;
  });
}

// ==========================================================================
// 03 — BACKGROUND ENVIRONMENT TOGGLES
// ==========================================================================
const toggleDots = document.getElementById('toggleDots');
const toggleLines = document.getElementById('toggleLines');
const toggleNoise = document.getElementById('toggleNoise');
const toggleSpotlight = document.getElementById('toggleSpotlight');

const dotGrid = document.getElementById('dotGrid');
const lineGrid = document.getElementById('lineGrid');
const noiseGrain = document.getElementById('noiseGrain');
const spotlightGlow = document.getElementById('spotlightGlow');

const toggleElement = (btn, el) => {
  if (!el) return;
  const isHidden = el.style.display === 'none';
  el.style.display = isHidden ? 'block' : 'none';
  btn.classList.toggle('active', !isHidden);
};

if (toggleDots) toggleDots.addEventListener('click', () => toggleElement(toggleDots, dotGrid));
if (toggleLines) toggleLines.addEventListener('click', () => toggleElement(toggleLines, lineGrid));
if (toggleNoise) toggleNoise.addEventListener('click', () => toggleElement(toggleNoise, noiseGrain));
if (toggleSpotlight) toggleSpotlight.addEventListener('click', () => toggleElement(toggleSpotlight, spotlightGlow));

// ==========================================================================
// 04 — OVERLAYS (MODAL, DRAWER & COMMAND BAR)
// ==========================================================================
const modalOverlay = document.getElementById('modalOverlay');
const drawerOverlay = document.getElementById('drawerOverlay');
const cmdOverlay = document.getElementById('cmdOverlay');

const triggerModal = document.getElementById('triggerModal');
const triggerDrawer = document.getElementById('triggerDrawer');
const triggerCommand = document.getElementById('triggerCommand');

const closeModal = document.getElementById('closeModal');
const confirmModal = document.getElementById('confirmModal');
const closeDrawer = document.getElementById('closeDrawer');

const openOverlay = (overlay) => {
  if (overlay) overlay.classList.add('open');
};

const closeOverlay = (overlay) => {
  if (overlay) overlay.classList.remove('open');
};

if (triggerModal) triggerModal.addEventListener('click', () => openOverlay(modalOverlay));
if (triggerDrawer) triggerDrawer.addEventListener('click', () => openOverlay(drawerOverlay));
if (triggerCommand) triggerCommand.addEventListener('click', () => openOverlay(cmdOverlay));

if (closeModal) closeModal.addEventListener('click', () => closeOverlay(modalOverlay));
if (confirmModal) confirmModal.addEventListener('click', () => closeOverlay(modalOverlay));
if (closeDrawer) closeDrawer.addEventListener('click', () => closeOverlay(drawerOverlay));

// Global Close for Overlays
[modalOverlay, drawerOverlay, cmdOverlay].forEach(overlay => {
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeOverlay(overlay);
      }
    });
  }
});

// Keyboard listeners (ESC to close, CMD+K or CTRL+K to open Command Bar)
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeOverlay(modalOverlay);
    closeOverlay(drawerOverlay);
    closeOverlay(cmdOverlay);
  }
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault();
    openOverlay(cmdOverlay);
    document.getElementById('cmdSearchInput')?.focus();
  }
});

// ==========================================================================
// 05 — PREMIUM MOTION & HOVER MICRO-INTERACTIONS
// ==========================================================================

// A. Magnetic Button Physics (Critically Damped Simulation)
const magneticBtn = document.getElementById('magneticButton');
if (magneticBtn) {
  let targetX = 0, targetY = 0;
  let currentX = 0, currentY = 0;
  
  magneticBtn.addEventListener('mousemove', (e) => {
    const rect = magneticBtn.getBoundingClientRect();
    const btnCenterX = rect.left + rect.width / 2;
    const btnCenterY = rect.top + rect.height / 2;
    
    // Calculate distance from center
    const dx = e.clientX - btnCenterX;
    const dy = e.clientY - btnCenterY;
    
    // Magnetic pull threshold
    targetX = dx * 0.35;
    targetY = dy * 0.35;
  });
  
  magneticBtn.addEventListener('mouseleave', () => {
    targetX = 0;
    targetY = 0;
  });
  
  // Animation Loop for Smooth Critically Damped Motion
  const updateMagnetic = () => {
    // Basic linear interpolation to simulate damping
    currentX += (targetX - currentX) * 0.12;
    currentY += (targetY - currentY) * 0.12;
    
    magneticBtn.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
    requestAnimationFrame(updateMagnetic);
  };
  updateMagnetic();
}

// B. Card Cursor Spotlight tracking
const spotlightCard = document.getElementById('spotlightCard');
if (spotlightCard) {
  spotlightCard.addEventListener('mousemove', (e) => {
    const rect = spotlightCard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Update inline spotlight gradient coordinates
    spotlightCard.style.backgroundImage = `radial-gradient(circle 120px at ${x}px ${y}px, var(--color-accent-soft) 0%, transparent 100%)`;
    spotlightCard.style.borderColor = 'var(--color-accent)';
  });
  
  spotlightCard.addEventListener('mouseleave', () => {
    spotlightCard.style.backgroundImage = 'none';
    spotlightCard.style.borderColor = 'var(--color-border-subtle)';
  });
}

// C. Number Counting animation for KPIs
const countingStat = document.getElementById('countingStat');
if (countingStat) {
  const targetVal = 247;
  const duration = 1500; // ms
  let startTimestamp = null;
  
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    
    // Easing out quadratic function
    const easeProgress = progress * (2 - progress);
    countingStat.textContent = Math.floor(easeProgress * targetVal);
    
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  
  // Trigger counting animation on page load
  window.requestAnimationFrame(step);
}

// D. Scroll Reveal transition
const scrollRevealDemo = document.getElementById('scrollRevealDemo');
if (scrollRevealDemo) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        scrollRevealDemo.style.opacity = '1';
        scrollRevealDemo.style.transform = 'translateY(0)';
      } else {
        scrollRevealDemo.style.opacity = '0.4';
        scrollRevealDemo.style.transform = 'translateY(8px)';
      }
    });
  }, { threshold: 0.1 });
  
  observer.observe(scrollRevealDemo);
}
