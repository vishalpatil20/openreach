// ==========================================================================
// 01 — THEME CONTROLS (FOR DESIGN SHOWCASE PREVIEWS)
// ==========================================================================
const showcaseThemeToggle = document.getElementById('showcaseThemeToggle');
const rootElement = document.documentElement;

if (showcaseThemeToggle) {
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
// 02 — DAMPED MAGNETIC BUTTONS
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

makeButtonMagnetic(document.getElementById('heroBtn1'));
makeButtonMagnetic(document.getElementById('demoMagnetic'));
makeButtonMagnetic(document.getElementById('magneticCta'));
makeButtonMagnetic(document.getElementById('comingSoonCta'));
makeButtonMagnetic(document.getElementById('navAuditBtn'));
makeButtonMagnetic(document.getElementById('footerCtaBtn'));

// ==========================================================================
// 03 — DYNAMIC SIGNAL LINE ANIMATIONS
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
// 04 — INTERACTIVE SECTOR SIMULATOR
// ==========================================================================
const simTabs = document.querySelectorAll('#simulatorTabs button');
const simQuestionText = document.getElementById('simQuestionText');
const simIntentText = document.getElementById('simIntentText');
const simStageText = document.getElementById('simStageText');
const simOppText = document.getElementById('simOppText');
const simActionText = document.getElementById('simActionText');

const simulatorData = {
  dental: {
    question: '"What are the best dentists near me for dental implants?"',
    intent: 'HIGH',
    stage: 'Comparing providers',
    opp: 'Reach people already considering a local provider.',
    action: 'Build campaign around implants pricing.'
  },
  hvac: {
    question: '"My AC unit is blowing warm air in Austin, is there a repair technician open near me?"',
    intent: 'HIGH',
    stage: 'Researching immediate repair options',
    opp: 'Position your repair services in emergency windows.',
    action: 'Target local Austin repair searches.'
  },
  roofing: {
    question: '"What does it cost to get a metal roof installed, and who is highly rated?"',
    intent: 'HIGH',
    stage: 'Researching metal roof costs and reviews',
    opp: 'Match with homeowners comparing installation budgets.',
    action: 'Map answers to roof replacement costs.'
  },
  remodeling: {
    question: '"How long does a bathroom renovation take and how do I get a local quote?"',
    intent: 'MEDIUM',
    stage: 'Comparing renovation schedules and quotes',
    opp: 'Capture high-value renovation leads before they commit.',
    action: 'Align with estimated renovation schedules.'
  },
  medspa: {
    question: '"What is the average recovery time for coolsculpting and what local clinics offer it?"',
    intent: 'HIGH',
    stage: 'Researching coolsculpting clinics and recovery times',
    opp: 'Promote consultation bookings during treatment comparisons.',
    action: 'Match with treatment options.'
  },
  automotive: {
    question: '"Where can I find an authorized luxury auto dealer near me that has electric SUVs in stock?"',
    intent: 'HIGH',
    stage: 'Looking for luxury EV inventory',
    opp: 'Route EV buyers directly to your dealership showroom.',
    action: 'Integrate electric vehicle inventory feeds.'
  }
};

if (simTabs && simQuestionText) {
  simTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      simTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      const category = tab.getAttribute('data-industry');
      const data = simulatorData[category];
      
      if (data) {
        if (simQuestionText) simQuestionText.textContent = data.question;
        if (simIntentText) simIntentText.textContent = data.intent;
        if (simStageText) simStageText.textContent = data.stage;
        if (simOppText) simOppText.textContent = data.opp;
        if (simActionText) simActionText.textContent = data.action;
      }
    });
  });
}

// ==========================================================================
// 05 — LEAD CAPTURE FORM CONTROLS
// ==========================================================================
const setupFormSubmit = (formId, successStateId) => {
  const form = document.getElementById(formId);
  const successState = document.getElementById(successStateId);
  
  if (form && successState) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      form.style.display = 'none';
      successState.style.display = 'flex';
      successState.style.flexDirection = 'column';
      successState.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }
};

setupFormSubmit('homepageAuditForm', 'formSuccessState');
setupFormSubmit('standaloneAuditForm', 'standaloneSuccessState');

// ==========================================================================
// 06 — STATISTICS COUNTING ANIMATOR
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
// 07 — VIEWPORT SIMULATOR
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
