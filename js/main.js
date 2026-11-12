/**
 * Stackly Travel - Main Application Controller
 * Handles AOS initialization, sticky header, mobile navigation,
 * special offers coupon copying, newsletter validation, auth modal,
 * and global toast notification system.
 */

document.addEventListener('DOMContentLoaded', () => {
  initLenisSmoothScroll();
  initGatesPreloader();
  initAOS();
  initStickyHeader();
  initMobileNav();
  initHeroSlider();
  initSpecialOffers();
  initOffersTriDirectionAnimation();
  initNewsletter();
  initAuthModal();
  initKeyboardA11y();
  initExperiencesShuffle();
  initLetterTextAnimation();
  initFeaturesRandomArrange();

  // Initialize modular sections
  if (typeof initDestinations === 'function') initDestinations();
  if (typeof initHotels === 'function') initHotels();
  if (typeof initBookingSearch === 'function') initBookingSearch();
  if (typeof initWishlist === 'function') initWishlist();
  if (typeof initTestimonials === 'function') initTestimonials();
});

/**
 * Premium Grand Gates Opening Preloader
 */
function initGatesPreloader() {
  const preloader = document.getElementById('preloader');
  const progressBar = document.getElementById('gate-progress-bar');
  const percentageEl = document.getElementById('gate-percentage');
  if (!preloader) return;

  // Lock body scroll while gates are closed
  document.body.style.overflow = 'hidden';

  let progress = 0;
  const duration = 1100; // 1.1s loading sequence
  const startTime = performance.now();
  let hasOpened = false;

  function updateProgress(currentTime) {
    const elapsed = currentTime - startTime;
    const factor = Math.min(1, elapsed / duration);
    // Smooth easeOutQuad progress
    progress = Math.floor(factor * 100);

    if (progressBar) progressBar.style.width = `${progress}%`;
    if (percentageEl) percentageEl.textContent = `${progress}%`;

    if (factor < 1) {
      requestAnimationFrame(updateProgress);
    } else {
      setTimeout(triggerGateOpening, 120);
    }
  }

  function triggerGateOpening() {
    if (hasOpened) return;
    hasOpened = true;

    preloader.classList.add('gates-opening');

    // Trigger hero headline letter arranging animation as gates part open
    const heroHeadline = document.querySelector('.hero-headline');
    if (heroHeadline) {
      setTimeout(() => {
        heroHeadline.classList.add('is-revealed');
      }, 250);
    }

    // Complete unveiling after gates transition finishes (1.35s)
    setTimeout(() => {
      preloader.classList.add('is-loaded');
      preloader.style.display = 'none';
      document.body.style.overflow = '';

      // Refresh AOS to animate hero elements upon unveil
      if (typeof AOS !== 'undefined') {
        AOS.refresh();
      }
    }, 1400);
  }

  requestAnimationFrame(updateProgress);

  // Safety fallback: ensure gates open within 2.5s regardless of thread load
  setTimeout(() => {
    if (!hasOpened) {
      triggerGateOpening();
    }
  }, 2500);
}

let lenisInstance = null;

/**
 * Initialize Lenis Modern Smooth Scroll Animation
 */
function initLenisSmoothScroll() {
  if (typeof Lenis === 'undefined') return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  try {
    lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth exponential deceleration
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false,
    });

    window.lenis = lenisInstance;

    // Connect Lenis scroll events to AOS refresh
    lenisInstance.on('scroll', () => {
      if (typeof AOS !== 'undefined') {
        AOS.refresh();
      }
    });

    function raf(time) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Watch for modal or drawer scroll locks
    const bodyObserver = new MutationObserver(() => {
      if (document.body.style.overflow === 'hidden') {
        lenisInstance?.stop();
      } else {
        lenisInstance?.start();
      }
    });
    bodyObserver.observe(document.body, { attributes: true, attributeFilter: ['style'] });

    // Intercept in-page hash links for smooth Lenis scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (!href || href === '#' || href.length < 2) return;
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          lenisInstance.scrollTo(target, {
            offset: -75,
            duration: 1.15
          });
        }
      });
    });
  } catch (err) {
    console.warn('Lenis smooth scroll failed to initialize:', err);
  }
}

/**
 * Initialize Animate On Scroll (AOS)
 * Smooth continuous two-way animation (top-to-bottom and bottom-to-top whenever we scroll)
 */
function initAOS() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 650,
      easing: 'ease-out-cubic',
      once: false, // Animates smoothly top-to-bottom and bottom-to-top whenever scrolling
      mirror: true, // Animates elements out when scrolling past and re-animates when scrolling back
      offset: 50,
      disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches
    });
  }
}

/**
 * Hero Background 5-Image Continuous Slider (2-second interval)
 */
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-bg-slide');
  const dots = document.querySelectorAll('.hero-slide-dot');
  if (!slides || slides.length === 0) return;

  let currentSlide = 0;
  const totalSlides = slides.length;
  const SLIDE_INTERVAL_MS = 2000; // 2 seconds gap of time
  let sliderTimer = null;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    dots.forEach((dot, i) => {
      if (i === index) {
        dot.classList.add('active');
        dot.setAttribute('aria-current', 'true');
      } else {
        dot.classList.remove('active');
        dot.removeAttribute('aria-current');
      }
    });

    currentSlide = index;
  }

  function nextSlide() {
    const nextIndex = (currentSlide + 1) % totalSlides;
    showSlide(nextIndex);
  }

  function startSlider() {
    if (sliderTimer) clearInterval(sliderTimer);
    sliderTimer = setInterval(nextSlide, SLIDE_INTERVAL_MS);
  }

  // Allow clicking on dots to jump directly to any slide
  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.getAttribute('data-index') || '0', 10);
      showSlide(idx);
      startSlider(); // reset 2-sec timer
    });
  });

  // Start continuous 2-second rotation immediately
  startSlider();
}

/**
 * Sticky Navigation with smooth shadow & blur on scroll
 */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  function handleScroll() {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/**
 * Mobile Navigation Drawer (Full-Width Luxury Sidebar)
 */
function initMobileNav() {
  const hamburgerBtn = document.getElementById('btn-hamburger');
  const mobileNav = document.getElementById('mobile-nav-drawer');
  const overlay = document.getElementById('mobile-nav-overlay');
  const closeBtn = document.getElementById('btn-close-mobile-nav');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  if (!hamburgerBtn || !mobileNav) return;

  function openNav() {
    mobileNav.classList.add('open');
    mobileNav.setAttribute('aria-hidden', 'false');
    if (overlay) overlay.classList.add('open');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    mobileNav.classList.remove('open');
    mobileNav.setAttribute('aria-hidden', 'true');
    if (overlay) overlay.classList.remove('open');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburgerBtn.addEventListener('click', openNav);
  if (closeBtn) closeBtn.addEventListener('click', closeNav);
  if (overlay) overlay.addEventListener('click', closeNav);

  // Close when clicking any nav link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeNav();
    });
  });

  // Close when clicking auth buttons inside mobile drawer
  mobileNav.querySelectorAll('.btn-open-auth').forEach(btn => {
    btn.addEventListener('click', closeNav);
  });

  // Close on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
      closeNav();
    }
  });
}

/**
 * Section 5: Special Offers & Coupon Code Copying
 * - JavaScript Clipboard API with fallback
 * - Visual success confirmation & button animation
 */
function initSpecialOffers() {
  const copyButtons = document.querySelectorAll('.btn-copy-coupon');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', async () => {
      const couponCode = btn.getAttribute('data-coupon');
      if (!couponCode) return;

      let copiedSuccessfully = false;

      // Clipboard API
      if (navigator.clipboard && window.isSecureContext) {
        try {
          await navigator.clipboard.writeText(couponCode);
          copiedSuccessfully = true;
        } catch (err) {
          console.warn('Clipboard API failed, trying fallback:', err);
        }
      }

      // Fallback
      if (!copiedSuccessfully) {
        try {
          const tempInput = document.createElement('input');
          tempInput.value = couponCode;
          tempInput.style.position = 'fixed';
          tempInput.style.opacity = '0';
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand('copy');
          document.body.removeChild(tempInput);
          copiedSuccessfully = true;
        } catch (err) {
          console.error('Copy fallback failed:', err);
        }
      }

      if (copiedSuccessfully) {
        const originalText = btn.innerHTML;
        btn.classList.add('copied');
        btn.innerHTML = `
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>Copied!</span>
        `;
        showToast(`Promo Code "${couponCode}" copied to clipboard! Use at checkout.`, 'success');

        setTimeout(() => {
          btn.classList.remove('copied');
          btn.innerHTML = originalText;
        }, 2500);
      } else {
        showToast(`Promo Code: ${couponCode}`, 'info');
      }
    });
  });
}

/**
 * Special Offers Tri-Directional Convergence & Arrange Animation
 * - Card 1 (Tropical Early Bird Escape): comes from the Left side
 * - Card 2 (Presidential Suite Voucher): comes from the Downside (bottom)
 * - Card 3 (Weekend City Flash Sale): comes from the Right side
 */
function initOffersTriDirectionAnimation() {
  const offersGrid = document.querySelector('.offers-grid');
  if (!offersGrid) return;

  if (!('IntersectionObserver' in window)) {
    offersGrid.classList.add('is-revealed');
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        offersGrid.classList.add('is-revealed');
      } else {
        // Re-triggers tri-directional convergence when scrolling back in both directions
        offersGrid.classList.remove('is-revealed');
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  observer.observe(offersGrid);
}

/**
 * Section 9: Newsletter Subscription
 * - Email regex validation
 * - Success and error feedback
 * - LocalStorage persistence
 */
function initNewsletter() {
  const form = document.getElementById('newsletter-form');
  const emailInput = document.getElementById('newsletter-email');
  const feedbackEl = document.getElementById('newsletter-feedback');

  if (!form || !emailInput) return;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailVal = emailInput.value.trim();

    if (!emailVal) {
      showNewsletterFeedback('Please enter your email address.', 'error');
      emailInput.focus();
      return;
    }

    if (!emailRegex.test(emailVal)) {
      showNewsletterFeedback('Please enter a valid email address (e.g. name@example.com).', 'error');
      emailInput.focus();
      return;
    }

    // Save demo subscription in LocalStorage
    try {
      const subscribers = JSON.parse(localStorage.getItem('stackly_subscribers') || '[]');
      if (!subscribers.includes(emailVal)) {
        subscribers.push(emailVal);
        localStorage.setItem('stackly_subscribers', JSON.stringify(subscribers));
      }
    } catch (err) {
      console.warn('LocalStorage error:', err);
    }

    showNewsletterFeedback('Thank you for subscribing! Your exclusive $50 travel voucher is on its way.', 'success');
    emailInput.value = '';
    showToast('Subscription successful! Check your inbox for your welcome voucher.', 'success');
  });

  function showNewsletterFeedback(message, type) {
    if (!feedbackEl) return;
    feedbackEl.textContent = message;
    feedbackEl.className = `newsletter-feedback ${type}`;
    feedbackEl.style.display = 'block';

    if (type === 'success') {
      setTimeout(() => {
        feedbackEl.style.display = 'none';
      }, 6000);
    }
  }
}

/**
 * Authentication Modal (Sign In / Register)
 */
function initAuthModal() {
  const authModal = document.getElementById('auth-modal');
  const openBtns = document.querySelectorAll('.btn-open-auth');
  const closeBtn = document.getElementById('btn-close-auth');
  const tabSignIn = document.getElementById('tab-auth-signin');
  const tabSignUp = document.getElementById('tab-auth-signup');
  const formSignIn = document.getElementById('form-auth-signin');
  const formSignUp = document.getElementById('form-auth-signup');

  if (!authModal) return;

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openAuthModal();
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeAuthModal);
  }

  // Switch tabs
  if (tabSignIn && tabSignUp && formSignIn && formSignUp) {
    tabSignIn.addEventListener('click', () => {
      tabSignIn.classList.add('active');
      tabSignUp.classList.remove('active');
      formSignIn.classList.remove('hidden');
      formSignUp.classList.add('hidden');
    });

    tabSignUp.addEventListener('click', () => {
      tabSignUp.classList.add('active');
      tabSignIn.classList.remove('active');
      formSignUp.classList.remove('hidden');
      formSignIn.classList.add('hidden');
    });
  }

  // Handle Demo Sign In
  if (formSignIn) {
    formSignIn.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('signin-email')?.value.trim();
      const name = email ? email.split('@')[0] : 'Traveler';
      saveUserSession({ name, email });
      closeAuthModal();
      showToast(`Welcome back, ${name}! You are now signed in.`, 'success');
    });
  }

  // Handle Demo Sign Up
  if (formSignUp) {
    formSignUp.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('signup-name')?.value.trim() || 'Traveler';
      const email = document.getElementById('signup-email')?.value.trim();
      saveUserSession({ name, email });
      closeAuthModal();
      showToast(`Welcome to Stackly, ${name}! Your account has been created.`, 'success');
    });
  }

  // Check existing session
  checkExistingUserSession();
}

function openAuthModal() {
  const modal = document.getElementById('auth-modal');
  if (modal) {
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
}

function closeAuthModal() {
  const modal = document.getElementById('auth-modal');
  if (modal) {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

function saveUserSession(user) {
  try {
    localStorage.setItem('stackly_current_user', JSON.stringify(user));
    updateUserNavUI(user);
  } catch (e) {
    console.error(e);
  }
}

function checkExistingUserSession() {
  try {
    const raw = localStorage.getItem('stackly_current_user');
    if (raw) {
      const user = JSON.parse(raw);
      updateUserNavUI(user);
    }
  } catch (e) {
    console.error(e);
  }
}

function updateUserNavUI(user) {
  const authNavContainers = document.querySelectorAll('.nav-auth-container');
  authNavContainers.forEach(container => {
    const isMobileDrawer = container.closest('.mobile-nav-footer');

    if (user && user.name) {
      container.innerHTML = `
        <div class="user-profile-menu ${isMobileDrawer ? 'user-profile-mobile' : ''}">
          <div style="display:flex;align-items:center;gap:10px;">
            <span class="user-avatar-badge">${user.name.charAt(0).toUpperCase()}</span>
            <span class="user-greeting">Hi, ${user.name}</span>
          </div>
          <button type="button" class="btn-logout" onclick="logoutUser()" title="Sign Out">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </button>
        </div>
      `;
    } else {
      const btnClass = isMobileDrawer ? 'btn-primary-block btn-open-auth' : 'btn-primary-nav btn-open-auth';
      container.innerHTML = `
        <button type="button" class="${btnClass}">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          <span>Login</span>
        </button>
      `;

      // Re-attach listener
      container.querySelector('.btn-open-auth')?.addEventListener('click', () => {
        if (isMobileDrawer) {
          const mobileNav = document.getElementById('mobile-nav-drawer');
          const overlay = document.getElementById('mobile-nav-overlay');
          const hamburgerBtn = document.getElementById('btn-hamburger');
          if (mobileNav && mobileNav.classList.contains('open')) {
            mobileNav.classList.remove('open');
            mobileNav.setAttribute('aria-hidden', 'true');
            if (overlay) overlay.classList.remove('open');
            if (hamburgerBtn) hamburgerBtn.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
          }
        }
        openAuthModal();
      });
    }
  });
}

function logoutUser() {
  localStorage.removeItem('stackly_current_user');
  updateUserNavUI(null);
  showToast('You have been signed out.', 'info');
}

/**
 * Global Toast Notification System
 * @param {string} message 
 * @param {'success'|'error'|'info'|'warning'} type 
 */
function showToast(message, type = 'success') {
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = `toast-item toast-${type}`;

  let iconSvg = '';
  if (type === 'success') {
    iconSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#eb030b" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>';
  } else if (type === 'warning') {
    iconSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>';
  } else {
    iconSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>';
  }

  toast.innerHTML = `
    <span class="toast-icon">${iconSvg}</span>
    <span class="toast-message">${message}</span>
    <button type="button" class="toast-close" aria-label="Dismiss notification">&times;</button>
  `;

  toastContainer.appendChild(toast);

  const dismiss = () => {
    toast.classList.add('hiding');
    setTimeout(() => {
      toast.remove();
    }, 300);
  };

  toast.querySelector('.toast-close').addEventListener('click', dismiss);
  setTimeout(dismiss, 4500);
}

/**
 * Keyboard Accessibility (ESC closes modals & drawers)
 */
function initKeyboardA11y() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (typeof closeHotelDetailsModal === 'function') closeHotelDetailsModal();
      if (typeof closeConfirmModal === 'function') closeConfirmModal();
      if (typeof closeWishlistDrawer === 'function') closeWishlistDrawer();
      closeAuthModal();
      const mobileNav = document.getElementById('mobile-nav-drawer');
      const overlay = document.getElementById('mobile-nav-overlay');
      if (mobileNav && mobileNav.classList.contains('open')) {
        mobileNav.classList.remove('open');
        if (overlay) overlay.classList.remove('open');
        document.body.style.overflow = '';
      }
    }
  });
}

/**
 * Interactive & Periodic Card Deck Shuffle & Arrange Animation
 * for Section 7: Travel Experiences
 */
function initExperiencesShuffle() {
  const section = document.getElementById('experiences');
  const grid = document.querySelector('.experiences-grid');
  const shuffleBtn = document.getElementById('btn-shuffle-experiences');
  const statusText = document.getElementById('shuffle-status-text');
  const pulseDot = document.querySelector('.shuffle-status-pill .pulse-dot');
  if (!section || !grid) return;

  let isShuffling = false;
  let isHovered = false;
  let autoShuffleInterval = null;
  const AUTO_INTERVAL_MS = 6000;

  // Track hover to pause automatic shuffling so user can read/interact comfortably
  section.addEventListener('mouseenter', () => {
    isHovered = true;
    if (statusText) statusText.textContent = 'Paused (Interacting)';
    if (pulseDot) pulseDot.style.background = '#f59e0b';
  });

  section.addEventListener('mouseleave', () => {
    isHovered = false;
    if (statusText) statusText.textContent = 'Auto-Arranging Every 6s';
    if (pulseDot) pulseDot.style.background = '#10b981';
  });

  // Touch device handling
  section.addEventListener('touchstart', () => {
    isHovered = true;
  }, { passive: true });

  /**
   * Performs the deck gather, 3D riffle shuffle, and animated deal/arrange
   */
  function shuffleAndArrange() {
    if (isShuffling) return;
    const cards = Array.from(grid.querySelectorAll('.experience-card'));
    if (cards.length < 2) return;

    isShuffling = true;
    grid.classList.add('is-shuffling');
    if (shuffleBtn) {
      shuffleBtn.classList.add('is-active');
      const btnSpan = shuffleBtn.querySelector('span');
      if (btnSpan) btnSpan.textContent = 'Arranging...';
    }

    // 1. Measure initial positions (First)
    const firstRects = cards.map(c => c.getBoundingClientRect());
    const gridRect = grid.getBoundingClientRect();
    const gridCenterX = gridRect.left + gridRect.width / 2;

    // 2. Stage 1: Deck Gather & Fan (lift and gather towards center)
    cards.forEach((card, i) => {
      const cardRect = firstRects[i];
      const cardCenterX = cardRect.left + cardRect.width / 2;
      const pullX = (gridCenterX - cardCenterX) * 0.4;
      const fanAngle = (i - 1.5) * 5; // -7.5, -2.5, +2.5, +7.5 deg
      const liftY = -24;

      card.style.transition = 'transform 0.32s cubic-bezier(0.2, 0.9, 0.4, 1.1), box-shadow 0.32s ease';
      card.style.zIndex = 10 + i;
      card.style.transform = `translate3d(${pullX}px, ${liftY}px, 40px) rotate(${fanAngle}deg) scale(1.04)`;
      card.style.boxShadow = '0 30px 60px -10px rgba(0,0,0,0.5), 0 0 25px rgba(235,3,11,0.25)';
    });

    // 3. Stage 2: Riffle Swap & Reorder DOM after gathering
    setTimeout(() => {
      const reorderedCards = [...cards];
      const shiftCount = Math.floor(Math.random() * (cards.length - 1)) + 1;
      for (let s = 0; s < shiftCount; s++) {
        reorderedCards.push(reorderedCards.shift());
      }

      // Re-append to DOM in new order
      reorderedCards.forEach(c => grid.appendChild(c));

      // 4. Measure new positions (Last)
      const lastRects = cards.map(c => c.getBoundingClientRect());

      // 5. Invert: instantly position at previous location with crossing angle
      cards.forEach((card, i) => {
        const dx = firstRects[i].left - lastRects[i].left;
        const dy = firstRects[i].top - lastRects[i].top;
        const crossingAngle = (i % 2 === 0 ? 6 : -6);

        card.style.transition = 'none';
        card.style.transform = `translate3d(${dx}px, ${dy - 12}px, 30px) rotate(${crossingAngle}deg) scale(1.03)`;
      });

      // Force reflow
      grid.offsetHeight;

      // 6. Stage 3: Deal & Arrange back into slots (Play)
      setTimeout(() => {
        cards.forEach((card, i) => {
          const stagger = i * 75;
          card.style.transition = `transform 0.65s cubic-bezier(0.34, 1.45, 0.64, 1) ${stagger}ms, box-shadow 0.5s ease ${stagger}ms`;
          card.style.transform = 'translate3d(0, 0, 0) rotate(0deg) scale(1)';
          card.style.boxShadow = '';
        });

        // Clean up when animation finishes
        setTimeout(() => {
          cards.forEach(card => {
            card.style.transition = '';
            card.style.transform = '';
            card.style.zIndex = '';
            card.style.boxShadow = '';
          });
          grid.classList.remove('is-shuffling');
          if (shuffleBtn) {
            shuffleBtn.classList.remove('is-active');
            const btnSpan = shuffleBtn.querySelector('span');
            if (btnSpan) btnSpan.textContent = 'Shuffle & Arrange';
          }
          isShuffling = false;
        }, 850);
      }, 35);
    }, 320);
  }

  // Button click trigger
  if (shuffleBtn) {
    shuffleBtn.addEventListener('click', () => {
      shuffleAndArrange();
    });
  }

  // Auto-shuffle interval
  function startAutoShuffle() {
    stopAutoShuffle();
    autoShuffleInterval = setInterval(() => {
      if (!isHovered && !isShuffling && isElementInViewport(section)) {
        shuffleAndArrange();
      }
    }, AUTO_INTERVAL_MS);
  }

  function stopAutoShuffle() {
    if (autoShuffleInterval) {
      clearInterval(autoShuffleInterval);
      autoShuffleInterval = null;
    }
  }

  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom > 0
    );
  }

  startAutoShuffle();

  // Scroll Entrance Trigger: when section first scrolls into view, flourish after 800ms
  let hasTriggeredOnScroll = false;
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (!hasTriggeredOnScroll) {
            hasTriggeredOnScroll = true;
            setTimeout(() => {
              if (!isHovered && !isShuffling) {
                shuffleAndArrange();
              }
            }, 600);
          }
        } else {
          // Reset so entrance animation can trigger when scrolling back
          hasTriggeredOnScroll = false;
        }
      });
    }, { threshold: 0.25 });
    observer.observe(section);
  }
}

/**
 * Letter-by-Letter Text Reveal Animation
 * Arranges letters one by one from the right side into their position
 * Applied to .hero-headline, .section-title, and .newsletter-title throughout the home page.
 */
function initLetterTextAnimation() {
  const targetSelectors = [
    '.hero-headline',
    '.section-title',
    '.newsletter-title'
  ];

  const headings = document.querySelectorAll(targetSelectors.join(', '));
  if (!headings.length) return;

  headings.forEach(heading => {
    if (heading.dataset.letterAnimInit === 'true') return;
    heading.dataset.letterAnimInit = 'true';

    // Preserve full text for screen reader accessibility
    const fullText = heading.textContent.replace(/\s+/g, ' ').trim();
    if (!heading.getAttribute('aria-label')) {
      heading.setAttribute('aria-label', fullText);
    }

    let globalCharIndex = 0;

    function processNode(node) {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent;
        if (!text) return document.createDocumentFragment();

        const fragment = document.createDocumentFragment();
        const tokens = text.match(/\S+|\s+/g) || [];

        tokens.forEach(token => {
          if (/^\s+$/.test(token)) {
            // Space token
            const spaceSpan = document.createElement('span');
            spaceSpan.className = 'char-space';
            spaceSpan.textContent = ' ';
            spaceSpan.setAttribute('aria-hidden', 'true');
            fragment.appendChild(spaceSpan);
          } else {
            // Word token: wrap in .char-word to preserve normal line breaks
            const wordSpan = document.createElement('span');
            wordSpan.className = 'char-word';
            wordSpan.setAttribute('aria-hidden', 'true');

            for (let i = 0; i < token.length; i++) {
              const char = token[i];
              const charSpan = document.createElement('span');
              charSpan.className = 'char-anim';
              charSpan.textContent = char;
              charSpan.style.setProperty('--char-delay', globalCharIndex);
              globalCharIndex++;
              wordSpan.appendChild(charSpan);
            }
            fragment.appendChild(wordSpan);
          }
        });
        return fragment;
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const tagName = node.tagName.toLowerCase();
        if (tagName === 'br') {
          return document.createElement('br');
        }
        const clone = node.cloneNode(false);
        clone.setAttribute('aria-hidden', 'true');
        Array.from(node.childNodes).forEach(child => {
          clone.appendChild(processNode(child));
        });
        return clone;
      }
      return document.createDocumentFragment();
    }

    const fragment = document.createDocumentFragment();
    Array.from(heading.childNodes).forEach(child => {
      fragment.appendChild(processNode(child));
    });

    heading.innerHTML = '';
    heading.appendChild(fragment);
    heading.classList.add('heading-letter-animate');
  });

  if (!('IntersectionObserver' in window)) {
    headings.forEach(heading => heading.classList.add('is-revealed'));
    return;
  }

  // Reveal observer for on-scroll arranging (two-way: top-to-bottom and bottom-to-top)
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
      } else {
        // Reset so letters re-arrange smoothly whenever scrolling in either direction
        entry.target.classList.remove('is-revealed');
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -30px 0px'
  });

  headings.forEach(heading => {
    if (heading.classList.contains('hero-headline')) {
      // Coordinated with preloader opening
      const preloader = document.getElementById('preloader');
      if (!preloader || preloader.classList.contains('is-loaded') || preloader.classList.contains('gates-opening')) {
        setTimeout(() => heading.classList.add('is-revealed'), 350);
      } else {
        setTimeout(() => heading.classList.add('is-revealed'), 1400);
      }
    } else {
      revealObserver.observe(heading);
    }
  });
}

/**
 * Section 6: Why Choose Stackly - Random Scattering Entrance Animation,
 * Interactive Dynamic Rearrange, and Touch Toggle for Background Reveal
 */
function initFeaturesRandomArrange() {
  const grid = document.querySelector('.features-grid');
  if (!grid) return;

  const cards = Array.from(grid.querySelectorAll('.feature-card'));
  if (cards.length === 0) return;

  const rearrangeBtn = document.getElementById('rearrange-features-btn');

  // Generate dynamic, randomized scatter offsets and rotation angles for each card
  function assignRandomScatterProperties() {
    const baseAngles = [-6.5, 5.5, -4.5, 7.5, -5.5];
    const baseOffsetsX = [-45, 38, -25, 42, -35];
    const baseOffsetsY = [70, 95, 60, 100, 80];

    cards.forEach((card, index) => {
      // Add subtle dynamic jitter so each rearrangement feels organic and unique
      const angleJitter = (Math.random() * 4 - 2);
      const xJitter = (Math.random() * 24 - 12);
      const yJitter = (Math.random() * 26 - 13);

      const rot = (baseAngles[index % baseAngles.length] + angleJitter).toFixed(1);
      const x = (baseOffsetsX[index % baseOffsetsX.length] + xJitter).toFixed(1);
      const y = (baseOffsetsY[index % baseOffsetsY.length] + yJitter).toFixed(1);
      const delay = (index * 85 + Math.random() * 45).toFixed(0);

      card.style.setProperty('--rand-x', `${x}px`);
      card.style.setProperty('--rand-y', `${y}px`);
      card.style.setProperty('--rand-rot', `${rot}deg`);
      card.style.setProperty('--rand-delay', `${delay}ms`);
    });
  }

  // Pre-seed initial random values
  assignRandomScatterProperties();

  // Scroll reveal with IntersectionObserver (two-way: top-to-bottom and bottom-to-top)
  if (!('IntersectionObserver' in window)) {
    grid.classList.add('is-revealed');
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          grid.classList.add('is-revealed');
        } else {
          // Re-triggers random scatter and smooth arrangement whenever scrolling back
          grid.classList.remove('is-revealed');
          assignRandomScatterProperties();
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    observer.observe(grid);
  }

  // Interactive re-arrange trigger
  if (rearrangeBtn) {
    rearrangeBtn.addEventListener('click', () => {
      rearrangeBtn.classList.add('is-animating');

      // Temporarily scatter cards
      grid.classList.remove('is-revealed');
      assignRandomScatterProperties();

      // Smoothly snap back into orderly arranged grid
      setTimeout(() => {
        grid.classList.add('is-revealed');
        setTimeout(() => {
          rearrangeBtn.classList.remove('is-animating');
        }, 850);
      }, 100);
    });
  }

  // Mobile / touch support: toggle active state on tap
  cards.forEach(card => {
    card.addEventListener('click', (e) => {
      // Toggle card active state
      const wasActive = card.classList.contains('is-active');
      cards.forEach(c => c.classList.remove('is-active'));
      if (!wasActive) {
        card.classList.add('is-active');
      }
    });
  });

  // Clicking outside deactivates cards on touch screens
  document.addEventListener('click', (e) => {
    if (!grid.contains(e.target) && (!rearrangeBtn || !rearrangeBtn.contains(e.target))) {
      cards.forEach(c => c.classList.remove('is-active'));
    }
  });
}



