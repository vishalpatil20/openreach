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
// 04 — INTERACTIVE SECTOR SIMULATOR (CHATGPT SEARCH SIMULATOR)
// ==========================================================================
const simTabs = document.querySelectorAll('#simulatorTabs button');
const chatgptMockBody = document.getElementById('chatgptMockBody');

const simulatorData = {
  dental: {
    question: "What's the best dentist near me for dental implants?",
    organicResponse: "When looking for dental implants, you want to choose a credentialed implantologist with high-resolution 3D imaging capabilities. It is highly recommended to evaluate local clinics based on board certifications, patient success rates, and diagnostic precision.",
    citations: [
      { name: "Implant Assoc.", url: "#" },
      { name: "Dental Index", url: "#" }
    ],
    sponsored: {
      name: "Austin Dental Care",
      domain: "austindentistry.com",
      logo: "A",
      headline: "Board-Certified Dental Implants in Austin",
      description: "Receive $500 off your implant consultation. Our state-of-the-art facility features on-site 3D imaging, custom prosthetics, and board-certified specialists with over 15 years of experience."
    }
  },
  hvac: {
    question: "My AC unit is blowing warm air in Austin, is there a repair technician open near me?",
    organicResponse: "If your air conditioner is blowing warm air, the most common issues are a failed capacitor, a refrigerant leak, or a faulty compressor. You should shut off the system to prevent ice accumulation on the coils and contact a licensed technician who offers emergency dispatch.",
    citations: [
      { name: "Austin Energy", url: "#" },
      { name: "HVAC Guides", url: "#" }
    ],
    sponsored: {
      name: "Austin Air Solutions",
      domain: "austinairsolutions.com",
      logo: "A",
      headline: "24/7 Emergency AC Repair & System Tuning",
      description: "Get immediate emergency response with $0 dispatch fees on your first service call. Local, licensed Austin technicians are fully stocked to fix your AC unit on the spot."
    }
  },
  roofing: {
    question: "What does it cost to get a metal roof installed, and who is highly rated?",
    organicResponse: "A residential metal roof installation generally costs between $8,000 and $22,500 depending on the square footage and specific panel style (e.g. standing seam vs. exposed fastener). Standing seam provides superior wind resistance and longevity. It is critical to hire certified installers who back their work with a wind warranty.",
    citations: [
      { name: "Roof Digest", url: "#" },
      { name: "Metal Roof Org", url: "#" }
    ],
    sponsored: {
      name: "Apex Roofing Specialists",
      domain: "apexroofingtx.com",
      logo: "A",
      headline: "Standing Seam Metal Roofing & Storm Inspections",
      description: "Upgrade to a premium standing seam metal roof designed to last 50+ years. Get a free inspection and details on wind insurance discounts. Licensed & local."
    }
  },
  remodeling: {
    question: "How long does a bathroom renovation take and how do I get a local quote?",
    organicResponse: "A standard bathroom renovation typically takes 2 to 4 weeks depending on changes to plumbing layout, custom tile work, and permit approvals. To secure an accurate quote, it's best to request a detailed on-site assessment that outlines labor, fixture sourcing, and material selections.",
    citations: [
      { name: "Home Advisor", url: "#" },
      { name: "Remodel Assoc.", url: "#" }
    ],
    sponsored: {
      name: "Precision Remodeling",
      domain: "precisionremodel.com",
      logo: "P",
      headline: "Full-Service Bathroom Renovations & Design Tours",
      description: "Schedule a free in-home design consultation and get a complete 3D layout of your new bathroom. We handle all planning, permits, tilework, and electrical in-house."
    }
  },
  medspa: {
    question: "What is the average recovery time for coolsculpting and what local clinics offer it?",
    organicResponse: "CoolSculpting is a non-invasive fat-reduction procedure requiring zero downtime. Most patients experience mild soreness, numbness, or redness for a few days but can immediately return to work. It's recommended to work with a certified aesthetic clinic to map out a custom treatment plan.",
    citations: [
      { name: "Aesthetics Today", url: "#" },
      { name: "CoolSculpting Hub", url: "#" }
    ],
    sponsored: {
      name: "Radiant Med Spa",
      domain: "radiantmedspa.com",
      logo: "R",
      headline: "Certified CoolSculpting Elite Treatments",
      description: "Save 20% on your first custom body-contouring package. Administered by licensed, board-certified aesthetic practitioners using next-generation CoolSculpting Elite applicators."
    }
  },
  automotive: {
    question: "Where can I find an authorized luxury auto dealer near me that has electric SUVs in stock?",
    organicResponse: "Luxury electric SUV availability varies. Leading brands (including Audi, BMW, and Porsche) feature specialized EV lines with range-extending battery options. To verify real-time inventory, consult local dealer directories that publish direct live window stickers.",
    citations: [
      { name: "Auto Buyers Guide", url: "#" },
      { name: "EV Finder", url: "#" }
    ],
    sponsored: {
      name: "Vanguard Luxury Motors",
      domain: "vanguardluxury.com",
      logo: "V",
      headline: "Premium Electric & Hybrid SUV Live Inventory",
      description: "Explore the region's largest selection of luxury electric SUVs in stock today. Schedule an exclusive 1-on-1 test drive experience with our EV specialists."
    }
  }
};

let activeTimeoutIds = [];
const clearAllActiveSimulations = () => {
  activeTimeoutIds.forEach(id => clearTimeout(id));
  activeTimeoutIds = [];
};

const runSimulation = (category) => {
  clearAllActiveSimulations();
  if (!chatgptMockBody) return;

  const data = simulatorData[category];
  if (!data) return;

  // Clear chat body
  chatgptMockBody.innerHTML = '';

  // 1. User Message
  const userMsg = document.createElement('div');
  userMsg.className = 'chatgpt-msg user';
  userMsg.innerHTML = `
    <div class="chatgpt-msg-bubble">${data.question}</div>
    <div class="chatgpt-avatar user-avatar">U</div>
  `;
  chatgptMockBody.appendChild(userMsg);
  chatgptMockBody.scrollTop = chatgptMockBody.scrollHeight;

  // 2. Assistant Message (typing state)
  const assistantMsg = document.createElement('div');
  assistantMsg.className = 'chatgpt-msg assistant';
  assistantMsg.innerHTML = `
    <div class="chatgpt-avatar ai">GP</div>
    <div class="chatgpt-msg-bubble" id="aiBubble">
      <div class="typing-indicator" id="aiTyping">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
    </div>
  `;

  // Delayed typing trigger
  const typeTimeout = setTimeout(() => {
    chatgptMockBody.appendChild(assistantMsg);
    chatgptMockBody.scrollTop = chatgptMockBody.scrollHeight;

    const streamTimeout = setTimeout(() => {
      const aiBubble = document.getElementById('aiBubble');
      if (aiBubble) {
        aiBubble.innerHTML = ''; // Clear typing dots
      }

      // Stream words
      const words = data.organicResponse.split(' ');
      let currentWordIndex = 0;
      let textBuffer = '';

      const streamInterval = () => {
        if (currentWordIndex < words.length) {
          textBuffer += (currentWordIndex === 0 ? '' : ' ') + words[currentWordIndex];
          if (aiBubble) {
            aiBubble.textContent = textBuffer;
          }
          chatgptMockBody.scrollTop = chatgptMockBody.scrollHeight;
          currentWordIndex++;
          const innerTimeout = setTimeout(streamInterval, 25);
          activeTimeoutIds.push(innerTimeout);
        } else {
          // Append citations
          let citationsHtml = '<div class="chatgpt-citations-container">';
          data.citations.forEach((cit, index) => {
            citationsHtml += `
              <a href="${cit.url}" class="chatgpt-citation-pill" onclick="event.preventDefault()">
                <span class="chatgpt-citation-pill-num">${index + 1}</span>
                <span>${cit.name}</span>
              </a>
            `;
          });
          citationsHtml += '</div>';
          
          const citationsWrapper = document.createElement('div');
          citationsWrapper.innerHTML = citationsHtml;
          aiBubble.appendChild(citationsWrapper.firstElementChild);
          chatgptMockBody.scrollTop = chatgptMockBody.scrollHeight;

          // Append Sponsored Card with subtle delay
          const sponsoredTimeout = setTimeout(() => {
            const sponsoredCard = document.createElement('div');
            sponsoredCard.className = 'chatgpt-sponsored-card';
            sponsoredCard.innerHTML = `
              <div class="chatgpt-sponsored-header">
                <div class="chatgpt-sponsored-label">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  </svg>
                  Sponsored
                </div>
                <div class="chatgpt-sponsored-domain">${data.sponsored.domain}</div>
              </div>
              <div class="chatgpt-sponsored-brand-row">
                <div class="chatgpt-sponsored-logo">${data.sponsored.logo}</div>
                <div class="chatgpt-sponsored-brand-name">${data.sponsored.name}</div>
              </div>
              <a href="/opportunity" class="chatgpt-sponsored-headline">${data.sponsored.headline}</a>
              <div class="chatgpt-sponsored-description">${data.sponsored.description}</div>
              <a href="/opportunity" class="chatgpt-sponsored-cta">
                Visit Website
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
            `;
            aiBubble.appendChild(sponsoredCard);
            
            // Trigger reflow to run CSS transition
            setTimeout(() => {
              sponsoredCard.classList.add('visible');
              chatgptMockBody.scrollTop = chatgptMockBody.scrollHeight;
            }, 50);
          }, 600);
          activeTimeoutIds.push(sponsoredTimeout);
        }
      };
      streamInterval();

    }, 1200);
    activeTimeoutIds.push(streamTimeout);

  }, 450);
  activeTimeoutIds.push(typeTimeout);
};

if (simTabs && chatgptMockBody) {
  // Initialize with Dental
  runSimulation('dental');

  simTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      simTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      const category = tab.getAttribute('data-industry');
      runSimulation(category);
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

// ==========================================================================
// 08 — DYNAMIC PATHWAY REDIRECTION/PREFILL LOGIC FOR OPPORTUNITY FORM
// ==========================================================================
const auditIndustrySelect = document.getElementById('auditIndustry');
const opportunityHeading = document.getElementById('opportunityHeading');

if (auditIndustrySelect) {
  const urlParams = new URLSearchParams(window.location.search);
  const urlIndustry = urlParams.get('industry');
  if (urlIndustry) {
    const normalized = urlIndustry.toLowerCase().replace(/[^a-z]/g, '');
    for (let i = 0; i < auditIndustrySelect.options.length; i++) {
      const optionVal = auditIndustrySelect.options[i].value;
      const optionNormalized = optionVal.toLowerCase().replace(/[^a-z]/g, '');
      if (optionNormalized === normalized) {
        auditIndustrySelect.selectedIndex = i;
        
        // Update placeholders based on selected industry
        const bizNameInput = document.getElementById('auditBizName');
        const bizUrlInput = document.getElementById('auditWebsite');
        if (bizNameInput && bizUrlInput) {
          if (normalized === 'dental') {
            bizNameInput.placeholder = 'e.g. Austin Dental Care';
            bizUrlInput.placeholder = 'e.g. austindentistry.com';
          } else if (normalized === 'hvac') {
            bizNameInput.placeholder = 'e.g. Austin Air Solutions';
            bizUrlInput.placeholder = 'e.g. austinairsolutions.com';
          } else if (normalized === 'roofing') {
            bizNameInput.placeholder = 'e.g. Apex Roofing Specialists';
            bizUrlInput.placeholder = 'e.g. apexroofingtx.com';
          } else if (normalized === 'remodeling') {
            bizNameInput.placeholder = 'e.g. Precision Remodeling';
            bizUrlInput.placeholder = 'e.g. precisionremodel.com';
          } else if (normalized === 'medspa') {
            bizNameInput.placeholder = 'e.g. Radiant Med Spa';
            bizUrlInput.placeholder = 'e.g. radiantmedspa.com';
          } else if (normalized === 'automotive') {
            bizNameInput.placeholder = 'e.g. Vanguard Luxury Motors';
            bizUrlInput.placeholder = 'e.g. vanguardluxury.com';
          }
        }

        // Tailor heading to maintain industry context
        if (opportunityHeading) {
          opportunityHeading.textContent = `What is your ${optionVal} market already asking?`;
        }
        break;
      }
    }
  }
}

