/**
 * Stackly Travel - Customer Testimonials Module
 * Continuous Horizontal Live Marquee / Infinite Ticker
 * Seamless non-stop streaming, hover-to-pause, directional controls,
 * speed adjustments, and touch/drag scrubbing.
 */

const TESTIMONIALS_DATA = [
  {
    id: 'test-1',
    name: 'Sophia Laurent',
    location: 'Geneva, Switzerland',
    trip: 'Santorini Caldera Getaway',
    avatar: 'assets/testimonials/avatar-1.webp',
    rating: 5,
    date: 'October 2026',
    title: 'The most effortless luxury booking I have ever experienced',
    text: 'Stackly made our anniversary in Santorini pure perfection. The private caldera suite was exactly as described, with seamless airport chauffeur service and breathtaking Aegean sunsets. Exceptional curation!'
  },
  {
    id: 'test-2',
    name: 'Marcus Vance',
    location: 'London, United Kingdom',
    trip: 'Tokyo Skyline & Cultural Discovery',
    avatar: 'assets/testimonials/avatar-2.webp',
    rating: 5,
    date: 'September 2026',
    title: 'Outstanding attention to detail and honest transparent pricing',
    text: 'What I value most about Stackly is the complete absence of hidden resort fees. The estimated total at checkout matched our bill to the penny. The Shinjuku hotel was extraordinary with its private onsen.'
  },
  {
    id: 'test-3',
    name: 'Elena Rostova',
    location: 'Milan, Italy',
    trip: 'Bali Rainforest Wellness Retreat',
    avatar: 'assets/testimonials/avatar-3.webp',
    rating: 5,
    date: 'August 2026',
    title: 'An unforgettable wellness sanctuary in the heart of Ubud',
    text: 'Booking through Stackly gave us complimentary spa credits and a private breakfast pavilion. Their 24/7 customer care assisted us in rebooking our flight within 15 minutes when weather shifted. Bravo!'
  },
  {
    id: 'test-4',
    name: 'David Chen',
    location: 'San Francisco, USA',
    trip: 'Swiss Alps Zermatt Ski Chalet',
    avatar: 'assets/testimonials/avatar-4.webp',
    rating: 5,
    date: 'July 2026',
    title: 'World-class properties with true five-star service standards',
    text: 'Finding authentic ski-in/ski-out luxury lodges can be hit or miss online. Stackly handpicks each property with surgical precision. Our Matterhorn-facing balcony will stay etched in our memories forever.'
  },
  {
    id: 'test-5',
    name: 'Amara Okafor',
    location: 'Toronto, Canada',
    trip: 'Parisian Grand Romance',
    avatar: 'assets/testimonials/avatar-5.webp',
    rating: 5,
    date: 'June 2026',
    title: 'Unmatched hospitality and VIP hotel upgrades on arrival',
    text: 'From the moment we arrived at Le Grand Marais in Paris, we were treated like royalty. The concierge greeted us by name and upgraded our suite overlooking the courtyard. Stackly has won my loyalty.'
  },
  {
    id: 'test-6',
    name: 'Lucas Sterling',
    location: 'Sydney, Australia',
    trip: 'Dubai Palm Luxury Escape',
    avatar: 'assets/testimonials/avatar-6.webp',
    rating: 5,
    date: 'May 2026',
    title: 'Flawless execution from booking search to checkout',
    text: 'The interactive search panel, instant price breakdown, and verified traveler reviews saved us hours of research. Stackly truly sets the benchmark for modern, discerning travel experiences.'
  }
];

class ContinuousTestimonialsMarquee {
  constructor() {
    this.wrapper = document.getElementById('testimonials-slider-wrapper');
    this.track = document.getElementById('testimonials-track');
    this.prevBtn = document.getElementById('testimonials-prev');
    this.nextBtn = document.getElementById('testimonials-next');
    this.playPauseBtn = document.getElementById('testimonials-play-pause');
    this.liveIndicator = document.getElementById('testimonials-live-indicator');
    this.dotsContainer = document.getElementById('testimonials-dots');

    this.isPaused = false;
    this.isReverse = false;
    this.isFast = false;
    this.activeDotIndex = 0;
    this.dotInterval = null;

    // Drag / Touch scrubbing state
    this.isDragging = false;
    this.startX = 0;
    this.scrollLeft = 0;

    this.init();
  }

  init() {
    if (!this.track) return;

    this.renderSlides();
    this.renderDots();
    this.setupListeners();
    this.startDotCycling();
  }

  /**
   * Build single card HTML
   */
  buildCardHtml(t, index) {
    const stars = Array.from({ length: t.rating }, () => `
      <svg width="15" height="15" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" stroke-width="1" aria-hidden="true">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
      </svg>
    `).join('');

    return `
      <div class="testimonial-slide" data-index="${index}">
        <article class="testimonial-card">
          <div class="testimonial-card-header">
            <div class="testimonial-stars-wrap">
              ${stars}
            </div>
            <span class="testimonial-quote-mark" aria-hidden="true">“</span>
          </div>
          
          <h3 class="testimonial-title">${t.title}</h3>
          <p class="testimonial-text">${t.text}</p>

          <div class="testimonial-footer">
            <img src="${t.avatar}" alt="${t.name}" class="testimonial-avatar" loading="lazy" width="50" height="50">
            <div class="testimonial-author-meta">
              <strong class="testimonial-author-name">${t.name}</strong>
              <span class="testimonial-author-location">${t.location}</span>
              <span class="testimonial-trip-badge">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Verified Stay: ${t.trip}
              </span>
            </div>
          </div>
        </article>
      </div>
    `;
  }

  /**
   * Render 3 identical groups to create an infinite continuous horizontal stream
   */
  renderSlides() {
    const singleGroupCards = TESTIMONIALS_DATA.map((t, index) => this.buildCardHtml(t, index)).join('');

    this.track.innerHTML = `
      <div class="marquee-group" id="marquee-group-1">
        ${singleGroupCards}
      </div>
      <div class="marquee-group" id="marquee-group-2" aria-hidden="true">
        ${singleGroupCards}
      </div>
      <div class="marquee-group" id="marquee-group-3" aria-hidden="true">
        ${singleGroupCards}
      </div>
    `;
  }

  /**
   * Render indicators
   */
  renderDots() {
    if (!this.dotsContainer) return;
    this.dotsContainer.innerHTML = Array.from({ length: 6 }, (_, i) => `
      <button 
        type="button" 
        class="testimonial-dot ${i === 0 ? 'active' : ''}" 
        data-slide="${i}" 
        aria-label="Stream speed segment ${i + 1}"
      ></button>
    `).join('');

    this.dotsContainer.querySelectorAll('.testimonial-dot').forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        this.setActiveDot(idx);
        this.flashNotice(`Viewing review highlight #${idx + 1}`);
      });
    });
  }

  /**
   * Cycle active dot to reflect live continuous running
   */
  startDotCycling() {
    if (this.dotInterval) clearInterval(this.dotInterval);
    this.dotInterval = setInterval(() => {
      if (!this.isPaused && !this.track.matches(':hover')) {
        this.activeDotIndex = (this.activeDotIndex + 1) % 6;
        this.setActiveDot(this.activeDotIndex);
      }
    }, 4500);
  }

  setActiveDot(idx) {
    this.activeDotIndex = idx;
    if (!this.dotsContainer) return;
    const dots = this.dotsContainer.querySelectorAll('.testimonial-dot');
    dots.forEach((d, i) => {
      if (i === idx) d.classList.add('active');
      else d.classList.remove('active');
    });
  }

  /**
   * Setup interactive listeners
   */
  setupListeners() {
    // Play/Pause button
    if (this.playPauseBtn) {
      this.playPauseBtn.addEventListener('click', () => {
        this.togglePlayPause();
      });
    }

    // Live indicator click toggles play/pause
    if (this.liveIndicator) {
      this.liveIndicator.addEventListener('click', () => {
        this.togglePlayPause();
      });
    }

    // Reverse Direction (< button)
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => {
        this.isReverse = !this.isReverse;
        if (this.isReverse) {
          this.track.classList.add('reverse');
          this.flashNotice('Stream Direction: Reversed ◀');
        } else {
          this.track.classList.remove('reverse');
          this.flashNotice('Stream Direction: Forward ▶');
        }
      });
    }

    // Advance / Speed Boost (> button)
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => {
        this.isFast = !this.isFast;
        if (this.isFast) {
          this.track.classList.add('fast');
          this.flashNotice('Stream Speed: Fast Forward ⏩');
        } else {
          this.track.classList.remove('fast');
          this.flashNotice('Stream Speed: Normal Speed ⏭');
        }
      });
    }

    // Touch & Mouse Drag interactions
    if (this.wrapper) {
      // Pause animation during hover
      this.wrapper.addEventListener('mouseenter', () => {
        this.updateLiveIndicatorText(true);
      });

      this.wrapper.addEventListener('mouseleave', () => {
        this.updateLiveIndicatorText(false);
      });
    }
  }

  togglePlayPause() {
    this.isPaused = !this.isPaused;
    const pauseIcon = document.getElementById('icon-pause');
    const playIcon = document.getElementById('icon-play');

    if (this.isPaused) {
      this.track.classList.add('is-paused');
      if (pauseIcon) pauseIcon.classList.add('hidden');
      if (playIcon) playIcon.classList.remove('hidden');
      this.flashNotice('Testimonial stream paused');
    } else {
      this.track.classList.remove('is-paused');
      if (pauseIcon) pauseIcon.classList.remove('hidden');
      if (playIcon) playIcon.classList.add('hidden');
      this.flashNotice('Testimonial stream running');
    }

    this.updateLiveIndicatorText(this.isPaused);
  }

  updateLiveIndicatorText(isHoveredOrPaused) {
    if (!this.liveIndicator) return;
    const textEl = this.liveIndicator.querySelector('.live-text');
    const subEl = this.liveIndicator.querySelector('.live-sub');
    const dotEl = this.liveIndicator.querySelector('.live-pulse-dot');

    if (this.isPaused) {
      if (textEl) textEl.textContent = 'Stream Paused';
      if (subEl) subEl.textContent = '(Click to resume)';
      if (dotEl) dotEl.style.backgroundColor = '#94a3b8';
    } else if (isHoveredOrPaused) {
      if (textEl) textEl.textContent = 'Paused on Hover';
      if (subEl) subEl.textContent = '(Move away to resume)';
      if (dotEl) dotEl.style.backgroundColor = '#f59e0b';
    } else {
      if (textEl) textEl.textContent = 'Live Continuous Stream';
      if (subEl) subEl.textContent = '(Hover any card to pause)';
      if (dotEl) dotEl.style.backgroundColor = '#eb030b';
    }
  }

  flashNotice(msg) {
    if (typeof showToast === 'function') {
      showToast(msg, 'info');
    }
  }
}

/**
 * Initialize continuous live marquee on page load
 */
function initTestimonials() {
  new ContinuousTestimonialsMarquee();
}
