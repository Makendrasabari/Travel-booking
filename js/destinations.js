/**
 * Stackly Travel - Destinations Module
 * Sample datasets and dynamic rendering for Popular Destinations
 */

const DESTINATIONS_DATA = [
  {
    id: 'paris',
    name: 'Paris',
    country: 'France',
    region: 'europe',
    image: 'assets/destinations/paris.webp',
    shortDesc: 'The City of Light with iconic boulevards, Michelin gastronomy, and timeless romance.',
    startingPrice: 320,
    rating: 4.9,
    hotelsCount: 84,
    badge: 'Popular'
  },
  {
    id: 'bali',
    name: 'Bali',
    country: 'Indonesia',
    region: 'asia',
    image: 'assets/destinations/bali.webp',
    shortDesc: 'Tropical paradise of emerald rice terraces, sacred sea temples, and serene wellness retreats.',
    startingPrice: 195,
    rating: 4.9,
    hotelsCount: 112,
    badge: 'Tropical'
  },
  {
    id: 'santorini',
    name: 'Santorini',
    country: 'Greece',
    region: 'europe',
    image: 'assets/destinations/santorini.webp',
    shortDesc: 'Dramatic volcanic caldera vistas, iconic whitewashed cliffside suites, and Aegean sunsets.',
    startingPrice: 380,
    rating: 4.9,
    hotelsCount: 65,
    badge: 'Top Rated'
  },
  {
    id: 'tokyo',
    name: 'Tokyo',
    country: 'Japan',
    region: 'asia',
    image: 'assets/destinations/tokyo.webp',
    shortDesc: 'Futuristic neon skyscrapers alongside ancient Shinto shrines and unparalleled culinary culture.',
    startingPrice: 260,
    rating: 4.8,
    hotelsCount: 140,
    badge: 'Cultural'
  },
  {
    id: 'swiss-alps',
    name: 'Swiss Alps',
    country: 'Switzerland',
    region: 'europe',
    image: 'assets/destinations/swiss-alps.webp',
    shortDesc: 'Majestic snow-capped alpine peaks, crystal-clear glacial lakes, and world-class luxury chalets.',
    startingPrice: 420,
    rating: 4.9,
    hotelsCount: 48,
    badge: 'Adventure'
  },
  {
    id: 'new-york',
    name: 'New York',
    country: 'United States',
    region: 'americas',
    image: 'assets/destinations/new-york.webp',
    shortDesc: 'The pulsating capital of culture, Broadway theater, high-end shopping, and iconic skylines.',
    startingPrice: 310,
    rating: 4.7,
    hotelsCount: 175,
    badge: 'Trending'
  },
  {
    id: 'amalfi',
    name: 'Amalfi Coast',
    country: 'Italy',
    region: 'europe',
    image: 'assets/destinations/amalfi.webp',
    shortDesc: 'Pastel cliffside villages, fragrant lemon groves, and sparkling turquoise Mediterranean waters.',
    startingPrice: 350,
    rating: 4.9,
    hotelsCount: 52,
    badge: 'Romantic'
  },
  {
    id: 'dubai',
    name: 'Dubai',
    country: 'United Arab Emirates',
    region: 'middle-east',
    image: 'assets/destinations/dubai.webp',
    shortDesc: 'Ultra-modern architectural marvels, opulent desert sanctuaries, and premier luxury shopping.',
    startingPrice: 290,
    rating: 4.8,
    hotelsCount: 120,
    badge: 'Luxury'
  }
];

// Active filter state for destinations
let currentDestinationFilter = 'all';
let currentDestinationSearchTerm = '';

/**
 * Initialize Destinations Section
 */
function initDestinations() {
  const container = document.getElementById('destinations-grid');
  if (!container) return;

  renderDestinations(DESTINATIONS_DATA);
  setupDestinationFilterButtons();
  setupDestinationLiveSearch();
  setupDestinationsArrangeObserver();
}

/**
 * Render Destination Cards
 * @param {Array} destinations 
 */
function renderDestinations(destinations) {
  const container = document.getElementById('destinations-grid');
  const emptyState = document.getElementById('destinations-empty-state');
  if (!container) return;

  if (!destinations || destinations.length === 0) {
    container.innerHTML = '';
    if (emptyState) emptyState.classList.remove('hidden');
    return;
  }

  if (emptyState) emptyState.classList.add('hidden');

  container.innerHTML = destinations.map((dest, index) => {
    return `
      <article class="destination-card" style="--card-index: ${index};" onclick="selectDestinationForBooking('${dest.name}')" tabindex="0" role="button" aria-label="Explore luxury stays in ${dest.name}, ${dest.country}">
        <div class="destination-image-wrapper">
          <img 
            src="${dest.image}" 
            alt="${dest.name}, ${dest.country} - Stackly Travel" 
            class="destination-image" 
            loading="lazy" 
            width="800" 
            height="600"
          >
          <span class="destination-badge">${dest.badge}</span>
          <div class="destination-price-tag">
            <span class="price-from">From</span>
            <span class="price-amount">$${dest.startingPrice}</span>
            <span class="price-period">/night</span>
          </div>
        </div>
        <div class="destination-content">
          <div class="destination-meta">
            <span class="destination-country">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              ${dest.country}
            </span>
            <span class="destination-rating" aria-label="Rating ${dest.rating} out of 5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" stroke-width="1" aria-hidden="true">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
              ${dest.rating}
            </span>
          </div>
          <h3 class="destination-title">${dest.name}</h3>
          <p class="destination-desc">${dest.shortDesc}</p>
          <div class="destination-footer">
            <span class="destination-hotels-count">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M3 21h18"></path>
                <path d="M9 8h1"></path>
                <path d="M9 12h1"></path>
                <path d="M9 16h1"></path>
                <path d="M14 8h1"></path>
                <path d="M14 12h1"></path>
                <path d="M14 16h1"></path>
                <path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"></path>
              </svg>
              ${dest.hotelsCount} Accommodations
            </span>
            <button 
              type="button" 
              class="btn-text-explore" 
              onclick="selectDestinationForBooking('${dest.name}')"
              aria-label="Explore hotels in ${dest.name}"
            >
              <span>Explore</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

/**
 * Setup Destination Filter Pills
 */
function setupDestinationFilterButtons() {
  const buttons = document.querySelectorAll('.dest-filter-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentDestinationFilter = btn.dataset.region || 'all';
      applyDestinationFilters();
    });
  });
}

/**
 * Setup Real-time Destination Search
 */
function setupDestinationLiveSearch() {
  const searchInput = document.getElementById('destinations-search-input');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    currentDestinationSearchTerm = e.target.value.trim().toLowerCase();
    applyDestinationFilters();
  });

  const clearBtn = document.getElementById('destinations-clear-search');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      currentDestinationSearchTerm = '';
      applyDestinationFilters();
    });
  }
}

/**
 * Filter destinations by region and search term
 */
function applyDestinationFilters() {
  const filtered = DESTINATIONS_DATA.filter(dest => {
    const matchesRegion = (currentDestinationFilter === 'all') || (dest.region === currentDestinationFilter);
    const matchesSearch = !currentDestinationSearchTerm ||
      dest.name.toLowerCase().includes(currentDestinationSearchTerm) ||
      dest.country.toLowerCase().includes(currentDestinationSearchTerm);
    return matchesRegion && matchesSearch;
  });

  const container = document.getElementById('destinations-grid');
  if (container && container.classList.contains('is-revealed')) {
    container.classList.remove('is-revealed');
    renderDestinations(filtered);
    // Force layout reflow before triggering smooth one-by-one re-arrangement
    void container.offsetHeight;
    requestAnimationFrame(() => {
      container.classList.add('is-revealed');
    });
  } else {
    renderDestinations(filtered);
  }
}

/**
 * IntersectionObserver for Popular Destinations
 * Arranges the 8 destination cards one by one smoothly as they scroll into view
 */
function setupDestinationsArrangeObserver() {
  const section = document.getElementById('destinations');
  const container = document.getElementById('destinations-grid');
  if (!container) return;

  if (!('IntersectionObserver' in window)) {
    container.classList.add('is-revealed');
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        container.classList.add('is-revealed');
      } else {
        // Re-triggers smooth arrange animation when scrolling back in both directions
        container.classList.remove('is-revealed');
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  observer.observe(section || container);
}

/**
 * When user clicks "Explore" on a destination card,
 * auto-fill the hero destination search input, filter hotels, and smoothly scroll.
 */
function selectDestinationForBooking(destinationName) {
  const heroDestInput = document.getElementById('search-destination');
  if (heroDestInput) {
    heroDestInput.value = destinationName;
  }

  // Also apply to hotel filter if available
  const hotelDestSelect = document.getElementById('hotel-filter-destination');
  if (hotelDestSelect) {
    // Find matching option
    for (let opt of hotelDestSelect.options) {
      if (opt.value.toLowerCase().includes(destinationName.toLowerCase()) || 
          opt.text.toLowerCase().includes(destinationName.toLowerCase())) {
        hotelDestSelect.value = opt.value;
        break;
      }
    }
    if (typeof applyHotelFilters === 'function') {
      applyHotelFilters();
    }
  }

  // Smooth scroll to hotels section
  const hotelsSection = document.getElementById('hotels');
  if (hotelsSection) {
    hotelsSection.scrollIntoView({ behavior: 'smooth' });
  }

  if (typeof showToast === 'function') {
    showToast(`Showing luxury accommodations in ${destinationName}`, 'info');
  }
}

// Reset destination filters helper
function resetDestinationFilters() {
  currentDestinationFilter = 'all';
  currentDestinationSearchTerm = '';
  
  const searchInput = document.getElementById('destinations-search-input');
  if (searchInput) searchInput.value = '';

  const buttons = document.querySelectorAll('.dest-filter-btn');
  buttons.forEach(btn => {
    if (btn.dataset.region === 'all') btn.classList.add('active');
    else btn.classList.remove('active');
  });

  renderDestinations(DESTINATIONS_DATA);
}

