// ==========================================================================
// 01 — MULTI-THEME TOGGLER (FOR /DESIGN PREVIEWS)
// ==========================================================================
const showcaseThemeToggle = document.getElementById('showcaseThemeToggle');
const rootElement = document.documentElement;

if (showcaseThemeToggle) {
  // Load saved theme
  const savedTheme = localStorage.getItem('theme') || 'light';
  if (savedTheme === 'dark') {
    rootElement.setAttribute('data-theme', 'dark');
  }

  showcaseThemeToggle.addEventListener('click', () => {
    const isDark = rootElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
      rootElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    } else {
      rootElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    }
  });
}

// ==========================================================================
// 02 — VIEWPORT SIMULATOR
// ==========================================================================
const simSlider = document.getElementById('simSlider');
const simContainerBox = document.getElementById('simContainerBox');
const simWidthLabel = document.getElementById('simWidthLabel');

if (simSlider && simContainerBox && simWidthLabel) {
  simSlider.addEventListener('input', (e) => {
    const width = e.target.value;
    simContainerBox.style.width = `${width}px`;
    simWidthLabel.textContent = `${width}px`;
  });
}

// ==========================================================================
// 03 — THE SIGNAL LINE DYNAMIC DOT ANIMATIONS
// ==========================================================================
const animateDotPath = (dotEl) => {
  if (!dotEl) return;
  let progress = 0;
  let direction = 1;
  
  const animateDot = () => {
    progress += 0.15 * direction;
    if (progress >= 100) {
      direction = -1;
    } else if (progress <= 0) {
      direction = 1;
    }
    dotEl.style.left = `${progress}%`;
    requestAnimationFrame(animateDot);
  };
  requestAnimationFrame(animateDot);
};

animateDotPath(document.getElementById('signalLineDot'));
animateDotPath(document.getElementById('comingSoonDot'));

// ==========================================================================
// 04 — DAMPED MAGNETIC BUTTONS
// ==========================================================================
const makeButtonMagnetic = (btnEl) => {
  if (!btnEl) return;
  let targetX = 0, targetY = 0;
  let currentX = 0, currentY = 0;
  
  btnEl.addEventListener('mousemove', (e) => {
    const rect = btnEl.getBoundingClientRect();
    const btnCenterX = rect.left + rect.width / 2;
    const btnCenterY = rect.top + rect.height / 2;
    
    const dx = e.clientX - btnCenterX;
    const dy = e.clientY - btnCenterY;
    
    targetX = dx * 0.35;
    targetY = dy * 0.35;
  });
  
  btnEl.addEventListener('mouseleave', () => {
    targetX = 0;
    targetY = 0;
  });
  
  const updateLoop = () => {
    currentX += (targetX - currentX) * 0.12;
    currentY += (targetY - currentY) * 0.12;
    btnEl.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
    requestAnimationFrame(updateLoop);
  };
  updateLoop();
};

makeButtonMagnetic(document.getElementById('heroMagneticBtn'));
makeButtonMagnetic(document.getElementById('demoMagnetic'));
makeButtonMagnetic(document.getElementById('magneticCta'));
makeButtonMagnetic(document.getElementById('comingSoonCta'));

// ==========================================================================
// 05 — STATISTICS COUNTING ANIMATOR
// ==========================================================================
const counterNum = document.getElementById('counterNum');
if (counterNum) {
  const targetValue = 247;
  const animDuration = 1800; // ms
  let start = null;
  
  const runCounter = (timestamp) => {
    if (!start) start = timestamp;
    const elapsed = timestamp - start;
    const progress = Math.min(elapsed / animDuration, 1);
    
    const ease = progress * (2 - progress);
    counterNum.textContent = Math.floor(ease * targetValue);
    
    if (progress < 1) {
      requestAnimationFrame(runCounter);
    }
  };
  requestAnimationFrame(runCounter);
}

// ==========================================================================
// 06 — SCROLL REVEALS
// ==========================================================================
const revealAnimBlock = document.getElementById('revealAnimBlock');
if (revealAnimBlock) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        revealAnimBlock.style.opacity = '1';
        revealAnimBlock.style.transform = 'translateY(0)';
      } else {
        revealAnimBlock.style.opacity = '0.5';
        revealAnimBlock.style.transform = 'translateY(8px)';
      }
    });
  }, { threshold: 0.15 });
  observer.observe(revealAnimBlock);
}
