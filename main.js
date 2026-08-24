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
    question: '"How much do dental implants cost and how do I find a good local dentist?"',
    intent: 'HIGH',
    stage: 'COMPARISON',
    opp: 'LOCAL PROVIDER DISCOVERY',
    action: 'Build campaign around implants pricing and surgeon experience.'
  },
  hvac: {
    question: '"My air conditioning system stopped working in Austin heat. Is there an emergency repair technician near me?"',
    intent: 'HIGH',
    stage: 'DECISION',
    opp: 'EMERGENCY REPLACEMENT',
    action: 'Route calls immediately to local technician on-call roster.'
  },
  roofing: {
    question: '"What does it cost to get a metal roof installed in Portland, and who is highly rated?"',
    intent: 'HIGH',
    stage: 'RESEARCH',
    opp: 'LOCAL PROVIDER DISCOVERY',
    action: 'Match with local metal roofing cost guides and warranty offers.'
  },
  remodeling: {
    question: '"How long does a master bathroom renovation take and how do I get a local contractor quote?"',
    intent: 'MEDIUM',
    stage: 'COMPARISON',
    opp: 'QUOTE REQUEST',
    action: 'Align with estimated renovation schedules and free audit offers.'
  },
  medspa: {
    question: '"What is the average recovery time for coolsculpting and what local cosmetic clinics offer it?"',
    intent: 'HIGH',
    stage: 'COMPARISON',
    opp: 'TREATMENT CONSULTATION',
    action: 'Target procedures research with direct online booking feeds.'
  },
  automotive: {
    question: '"Where can I find an authorized luxury auto dealer near me that has electric SUVs in stock?"',
    intent: 'HIGH',
    stage: 'DECISION',
    opp: 'VEHICLE PURCHASE',
    action: 'Integrate real-time new electric vehicle inventory feeds.'
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
        simQuestionText.textContent = data.question;
        simIntentText.textContent = data.intent;
        simStageText.textContent = data.stage;
        simOppText.textContent = data.opp;
        simActionText.textContent = data.action;
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
