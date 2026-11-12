/**
 * Stackly Travel - Featured Hotels Module
 * Sample datasets, dynamic rendering, filtering, sorting, and detail modal
 */

const HOTELS_DATA = [
  {
    id: 'hotel-1',
    name: 'Le Grand Marais & Spa',
    destination: 'Paris',
    country: 'France',
    locationText: '1st Arrondissement, Paris, France',
    image: 'assets/hotels/hotel-1.webp',
    starRating: 5,
    customerRating: 4.9,
    reviewCount: 512,
    ratingText: 'Exceptional',
    pricePerNight: 340,
    shortDesc: 'Sumptuous historic Parisian palace overlooking classic boulevards with Michelin-starred dining and private hammam.',
    amenities: ['Free High-Speed WiFi', 'Michelin Dining', 'Luxury Spa & Hammam', 'Concierge Service', 'Balcony View', 'Valet Parking'],
    badge: 'Luxury Choice',
    popularScore: 98
  },
  {
    id: 'hotel-2',
    name: 'Ubud Rainforest Retreat & Villas',
    destination: 'Bali',
    country: 'Indonesia',
    locationText: 'Ubud Hills, Bali, Indonesia',
    image: 'assets/hotels/hotel-2.webp',
    starRating: 5,
    customerRating: 4.9,
    reviewCount: 468,
    ratingText: 'Exceptional',
    pricePerNight: 215,
    shortDesc: 'Secluded bamboo sanctuaries and infinity edge plunge pools enveloped by lush tropical rainforest and cascading ravines.',
    amenities: ['Private Infinity Pool', 'Holistic Spa', 'Organic Breakfast', 'Yoga Pavilion', 'Free WiFi', 'Airport Transfer'],
    badge: 'Eco Sanctuary',
    popularScore: 96
  },
  {
    id: 'hotel-3',
    name: 'Caldera Cliff Suites & Spa',
    destination: 'Santorini',
    country: 'Greece',
    locationText: 'Oia Cliffside, Santorini, Greece',
    image: 'assets/hotels/hotel-3.webp',
    starRating: 5,
    customerRating: 4.9,
    reviewCount: 389,
    ratingText: 'Exceptional',
    pricePerNight: 410,
    shortDesc: 'Unrivaled whitewashed cave suites carved into the Oia cliff with heated infinity jacuzzis overlooking Aegean sunsets.',
    amenities: ['Caldera Sea View', 'Private Jacuzzi', 'Champagne Breakfast', 'Sunset Terrace', 'Free WiFi', 'Helipad Access'],
    badge: 'Honeymoon Choice',
    popularScore: 99
  },
  {
    id: 'hotel-4',
    name: 'The Shinjuku Sky Tower Hotel',
    destination: 'Tokyo',
    country: 'Japan',
    locationText: 'Shinjuku, Tokyo, Japan',
    image: 'assets/hotels/hotel-4.webp',
    starRating: 5,
    customerRating: 4.8,
    reviewCount: 620,
    ratingText: 'Superb',
    pricePerNight: 285,
    shortDesc: 'Panoramic city vista suites towering over Tokyo neon skyline with authentic Japanese Onsen baths and tea ceremonies.',
    amenities: ['Indoor Sky Pool', 'Japanese Onsen', 'Teppanyaki Dining', 'High-Speed WiFi', 'Subway Direct Access', 'Fitness Lab'],
    badge: 'Modern Icon',
    popularScore: 94
  },
  {
    id: 'hotel-5',
    name: 'Matterhorn Alpine Grand Lodge',
    destination: 'Swiss Alps',
    country: 'Switzerland',
    locationText: 'Zermatt, Valais, Switzerland',
    image: 'assets/hotels/hotel-5.webp',
    starRating: 5,
    customerRating: 4.9,
    reviewCount: 340,
    ratingText: 'Exceptional',
    pricePerNight: 460,
    shortDesc: 'Ski-in ski-out timber masterpiece offering roaring hearths, outdoor thermal baths, and unobstructed Matterhorn views.',
    amenities: ['Ski-in / Ski-out', 'Thermal Spa & Sauna', 'Fondue Lounge', 'Free Shuttle', 'Heated Boot Room', 'Free WiFi'],
    badge: 'Alpine Luxury',
    popularScore: 95
  },
  {
    id: 'hotel-6',
    name: 'The Manhattan Grand Luxe Hotel',
    destination: 'New York',
    country: 'United States',
    locationText: 'Fifth Avenue, New York, USA',
    image: 'assets/hotels/hotel-6.webp',
    starRating: 5,
    customerRating: 4.7,
    reviewCount: 780,
    ratingText: 'Superb',
    pricePerNight: 395,
    shortDesc: 'Gilded Art Deco elegance situated directly on Fifth Avenue, steps away from Central Park and world-class flagship boutiques.',
    amenities: ['Central Park Views', 'Rooftop Cocktail Bar', '24/7 Butler Service', 'Designer Spa', 'Pet Friendly', 'Free WiFi'],
    badge: 'City Center',
    popularScore: 93
  },
  {
    id: 'hotel-7',
    name: 'Amalfi Marina Cliffside Boutique',
    destination: 'Amalfi Coast',
    country: 'Italy',
    locationText: 'Positano Coast, Amalfi, Italy',
    image: 'assets/hotels/hotel-7.webp',
    starRating: 4,
    customerRating: 4.8,
    reviewCount: 295,
    ratingText: 'Superb',
    pricePerNight: 330,
    shortDesc: 'Charming lemon-orchard terraces clinging to the limestone cliffs with private boat charters and authentic Mediterranean dining.',
    amenities: ['Private Beach Access', 'Boat Charters', 'Lemon Garden Dining', 'Sea-Facing Balcony', 'Free Breakfast', 'Free WiFi'],
    badge: 'Romantic Gem',
    popularScore: 91
  },
  {
    id: 'hotel-8',
    name: 'The Palm Royale Mirage Palace',
    destination: 'Dubai',
    country: 'United Arab Emirates',
    locationText: 'Palm Jumeirah, Dubai, UAE',
    image: 'assets/hotels/hotel-8.webp',
    starRating: 5,
    customerRating: 4.9,
    reviewCount: 840,
    ratingText: 'Exceptional',
    pricePerNight: 440,
    shortDesc: 'Palatial private island resort featuring underwater dining, temperature-controlled lagoon pools, and bespoke chauffeur service.',
    amenities: ['Private Beachfront', 'Underwater Dining', 'Lagoon Pools', 'Luxury Chauffeur', 'Waterpark Access', 'Free WiFi'],
    badge: 'Ultra Luxury',
    popularScore: 97
  },
  {
    id: 'hotel-9',
    name: 'Kyoto Arashiyama Bamboo Ryokan',
    destination: 'Tokyo',
    country: 'Japan',
    locationText: 'Arashiyama Scenic Zone, Japan',
    image: 'assets/hotels/hotel-9.webp',
    starRating: 5,
    customerRating: 4.8,
    reviewCount: 310,
    ratingText: 'Superb',
    pricePerNight: 275,
    shortDesc: 'Tranquil traditional tatami suites overlooking manicured moss rock gardens, featuring private open-air cedar mineral baths.',
    amenities: ['Private Cedar Onsen', 'Kaiseki Multi-Course', 'Zen Rock Garden', 'Yukata Robes', 'Free WiFi', 'Tea Ceremony'],
    badge: 'Authentic Heritage',
    popularScore: 89
  },
  {
    id: 'hotel-10',
    name: 'Azure Lagoon Overwater Villas',
    destination: 'Bali',
    country: 'Indonesia',
    locationText: 'Nusa Dua Private Atoll, Indonesia',
    image: 'assets/hotels/hotel-10.webp',
    starRating: 5,
    customerRating: 4.9,
    reviewCount: 425,
    ratingText: 'Exceptional',
    pricePerNight: 490,
    shortDesc: 'Architectural overwater villas with glass floor observation viewing panels, direct coral reef access, and personal butler care.',
    amenities: ['Glass Ocean Floor', 'Overwater Hammock', 'Coral Reef Snorkeling', 'Personal Butler', 'Sunset Cruise', 'Free WiFi'],
    badge: 'Overwater Villa',
    popularScore: 99
  },
  {
    id: 'hotel-11',
    name: 'Palazzo Canal Grande Suites',
    destination: 'Amalfi Coast',
    country: 'Italy',
    locationText: 'Venetian Grand Lagoon, Italy',
    image: 'assets/hotels/hotel-11.webp',
    starRating: 5,
    customerRating: 4.8,
    reviewCount: 360,
    ratingText: 'Superb',
    pricePerNight: 370,
    shortDesc: '16th-century Renaissance palace boasting hand-restored frescoes, private water taxi jetty, and prosecco terrace lounging.',
    amenities: ['Private Water Taxi Dock', 'Historic Fresco Suites', 'Canal Terrace Bar', 'Gourmet Breakfast', 'Free WiFi', 'Concierge'],
    badge: 'Historic Landmark',
    popularScore: 92
  },
  {
    id: 'hotel-12',
    name: 'Reykjavik Glass Igloo & Aurora Lodge',
    destination: 'Swiss Alps',
    country: 'Switzerland',
    locationText: 'Alpine Glacier Valley, Switzerland',
    image: 'assets/hotels/hotel-12.webp',
    starRating: 4,
    customerRating: 4.7,
    reviewCount: 215,
    ratingText: 'Superb',
    pricePerNight: 310,
    shortDesc: 'Futuristic glass dome chalets engineered for stargazing and pristine panoramic alpine wilderness from the comfort of heated beds.',
    amenities: ['Heated Glass Ceiling', 'Glacier Tours', 'Nordic Sauna', 'Hot Springs Access', 'Free WiFi', 'Breakfast Basket'],
    badge: 'Unique Stay',
    popularScore: 90
  }
];

// Current filter state
const hotelFilterState = {
  destination: 'all',
  maxPrice: 600,
  minRating: 0,
  sortBy: 'popular'
};

/**
 * Initialize Hotels Section
 */
function initHotels() {
  const container = document.getElementById('hotels-grid');
  if (!container) return;

  renderHotels(HOTELS_DATA);
  setupHotelFilterControls();
  setupHotelsArrangeObserver();
}

/**
 * Render Hotel Cards
 * @param {Array} hotels 
 */
function renderHotels(hotels) {
  const container = document.getElementById('hotels-grid');
  const emptyState = document.getElementById('hotels-empty-state');
  const countBadge = document.getElementById('hotels-count-badge');
  if (!container) return;

  if (countBadge) {
    countBadge.textContent = `${hotels.length} Properties Found`;
  }

  if (!hotels || hotels.length === 0) {
    container.innerHTML = '';
    if (emptyState) emptyState.classList.remove('hidden');
    return;
  }

  if (emptyState) emptyState.classList.add('hidden');

  container.innerHTML = hotels.map((hotel, index) => {
    const isSaved = typeof isInWishlist === 'function' ? isInWishlist(hotel.id) : false;

    // Star rating display
    const starsHtml = Array.from({ length: 5 }, (_, i) => {
      const fill = i < hotel.starRating ? '#f59e0b' : '#e2e8f0';
      return `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="${fill}" stroke="${fill}" stroke-width="1" aria-hidden="true">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
        </svg>
      `;
    }).join('');

    const amenitiesHtml = hotel.amenities.slice(0, 3).map(a => `
      <span class="hotel-amenity-tag">${a}</span>
    `).join('');

    return `
      <article class="hotel-card" style="--card-index: ${index};" id="card-${hotel.id}">
        <div class="hotel-image-wrapper">
          <img 
            src="${hotel.image}" 
            alt="${hotel.name} - Luxury Hotel in ${hotel.destination}" 
            class="hotel-image" 
            loading="lazy" 
            width="800" 
            height="560"
          >
          <span class="hotel-badge">${hotel.badge}</span>
          <button 
            type="button" 
            class="hotel-wishlist-btn ${isSaved ? 'active' : ''}" 
            onclick="handleWishlistClick('${hotel.id}', event)"
            aria-label="${isSaved ? 'Remove from wishlist' : 'Save to wishlist'}"
            title="${isSaved ? 'Remove from wishlist' : 'Save to wishlist'}"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="${isSaved ? '#eb030b' : 'none'}" stroke="${isSaved ? '#eb030b' : 'currentColor'}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
        </div>

        <div class="hotel-content">
          <div class="hotel-location-row">
            <span class="hotel-location">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              ${hotel.locationText}
            </span>
            <div class="hotel-stars" aria-label="${hotel.starRating} Star Hotel">
              ${starsHtml}
            </div>
          </div>

          <h3 class="hotel-name">${hotel.name}</h3>
          
          <div class="hotel-rating-row">
            <span class="hotel-rating-score">${hotel.customerRating}</span>
            <div class="hotel-rating-info">
              <span class="hotel-rating-label">${hotel.ratingText}</span>
              <span class="hotel-review-count">(${hotel.reviewCount} reviews)</span>
            </div>
          </div>

          <p class="hotel-desc">${hotel.shortDesc}</p>

          <div class="hotel-amenities-row">
            ${amenitiesHtml}
          </div>

          <div class="hotel-card-divider"></div>

          <div class="hotel-pricing-action">
            <div class="hotel-price-box">
              <span class="price-prefix">From</span>
              <div class="price-value-row">
                <span class="price-currency">$</span>
                <span class="price-number">${hotel.pricePerNight}</span>
                <span class="price-suffix">/ night</span>
              </div>
              <span class="price-note">Taxes & fees calculated at checkout</span>
            </div>
            <button 
              type="button" 
              class="btn-hotel-details" 
              onclick="openHotelDetailsModal('${hotel.id}')"
              aria-label="View details and book ${hotel.name}"
            >
              <span>View Details</span>
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
 * Handle wishlist button click
 */
function handleWishlistClick(hotelId, event) {
  if (event) event.stopPropagation();
  if (typeof toggleWishlist === 'function') {
    const isNowSaved = toggleWishlist(hotelId);
    
    // Update button in the card immediately
    const card = document.getElementById(`card-${hotelId}`);
    if (card) {
      const btn = card.querySelector('.hotel-wishlist-btn');
      if (btn) {
        if (isNowSaved) {
          btn.classList.add('active');
          btn.setAttribute('aria-label', 'Remove from wishlist');
          btn.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#eb030b" stroke="#eb030b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          `;
        } else {
          btn.classList.remove('active');
          btn.setAttribute('aria-label', 'Save to wishlist');
          btn.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          `;
        }
      }
    }
  }
}

/**
 * Setup Controls for Hotel Filtering and Sorting
 */
function setupHotelFilterControls() {
  const destSelect = document.getElementById('hotel-filter-destination');
  const priceRange = document.getElementById('hotel-filter-price');
  const priceValueLabel = document.getElementById('hotel-price-val');
  const ratingSelect = document.getElementById('hotel-filter-rating');
  const sortSelect = document.getElementById('hotel-sort-by');
  const resetBtn = document.getElementById('hotels-reset-filters');
  const emptyResetBtn = document.getElementById('hotels-empty-reset-btn');

  if (destSelect) {
    destSelect.addEventListener('change', (e) => {
      hotelFilterState.destination = e.target.value;
      applyHotelFilters();
    });
  }

  if (priceRange && priceValueLabel) {
    priceRange.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      hotelFilterState.maxPrice = val;
      priceValueLabel.textContent = `$${val}`;
      applyHotelFilters();
    });
  }

  if (ratingSelect) {
    ratingSelect.addEventListener('change', (e) => {
      hotelFilterState.minRating = parseFloat(e.target.value) || 0;
      applyHotelFilters();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      hotelFilterState.sortBy = e.target.value;
      applyHotelFilters();
    });
  }

  const shuffleBtn = document.getElementById('btn-shuffle-hotels');
  if (shuffleBtn) {
    shuffleBtn.addEventListener('click', shuffleAndArrangeHotels);
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', resetHotelFilters);
  }

  if (emptyResetBtn) {
    emptyResetBtn.addEventListener('click', resetHotelFilters);
  }
}

/**
 * Apply Hotel Filtering & Sorting
 */
function applyHotelFilters() {
  let filtered = HOTELS_DATA.filter(hotel => {
    // Destination filter
    const matchesDest = (hotelFilterState.destination === 'all') || 
      (hotel.destination.toLowerCase() === hotelFilterState.destination.toLowerCase());

    // Price filter
    const matchesPrice = hotel.pricePerNight <= hotelFilterState.maxPrice;

    // Rating filter
    const matchesRating = hotel.customerRating >= hotelFilterState.minRating;

    return matchesDest && matchesPrice && matchesRating;
  });

  // Sorting
  switch (hotelFilterState.sortBy) {
    case 'price-asc':
      filtered.sort((a, b) => a.pricePerNight - b.pricePerNight);
      break;
    case 'price-desc':
      filtered.sort((a, b) => b.pricePerNight - a.pricePerNight);
      break;
    case 'rating-desc':
      filtered.sort((a, b) => b.customerRating - a.customerRating);
      break;
    case 'popular':
    default:
      filtered.sort((a, b) => b.popularScore - a.popularScore);
      break;
  }

  const container = document.getElementById('hotels-grid');
  if (container && container.classList.contains('is-revealed')) {
    container.classList.remove('is-revealed');
    renderHotels(filtered);
    void container.offsetHeight; // force reflow
    requestAnimationFrame(() => {
      container.classList.add('is-revealed');
    });
  } else {
    renderHotels(filtered);
  }
}

/**
 * Interactive FLIP Card Deck Shuffle & Arranging Animation for Featured Hotels
 */
function shuffleAndArrangeHotels() {
  const grid = document.getElementById('hotels-grid');
  const shuffleBtn = document.getElementById('btn-shuffle-hotels');
  if (!grid) return;

  const cards = Array.from(grid.querySelectorAll('.hotel-card'));
  if (cards.length < 2) return;

  if (grid.dataset.isShuffling === 'true') return;
  grid.dataset.isShuffling = 'true';

  if (shuffleBtn) {
    shuffleBtn.classList.add('is-active');
    const span = shuffleBtn.querySelector('span');
    if (span) span.textContent = 'Arranging...';
  }

  // 1. Measure initial screen positions (First)
  const firstRects = cards.map(c => c.getBoundingClientRect());
  const gridRect = grid.getBoundingClientRect();
  const gridCenterX = gridRect.left + gridRect.width / 2;

  // 2. Stage 1: 3D Deck Lift & Gather towards center
  cards.forEach((card, i) => {
    const cardRect = firstRects[i];
    const cardCenterX = cardRect.left + cardRect.width / 2;
    const pullX = (gridCenterX - cardCenterX) * 0.28;
    const tilt = ((i % 5) - 2) * 3; // subtle fanning tilt
    const liftY = -22;

    card.style.transition = 'transform 0.35s cubic-bezier(0.2, 0.9, 0.4, 1.1), box-shadow 0.35s ease';
    card.style.zIndex = 10 + i;
    card.style.transform = `translate3d(${pullX}px, ${liftY}px, 30px) rotate(${tilt}deg) scale(1.03)`;
    card.style.boxShadow = '0 25px 50px -10px rgba(0,0,0,0.35), 0 0 25px rgba(235,3,11,0.2)';
  });

  // 3. Stage 2: Riffle & Re-order DOM nodes
  setTimeout(() => {
    const shuffled = [...cards];
    const shift = Math.floor(Math.random() * (cards.length - 1)) + 1;
    for (let s = 0; s < shift; s++) {
      shuffled.push(shuffled.shift());
    }

    // Re-append cards in their new order
    shuffled.forEach(c => grid.appendChild(c));

    // 4. Measure new positions (Last)
    const lastRects = cards.map(c => c.getBoundingClientRect());

    // 5. Invert: position cards back at previous visual coords with cross angle
    cards.forEach((card, i) => {
      const dx = firstRects[i].left - lastRects[i].left;
      const dy = firstRects[i].top - lastRects[i].top;
      const crossAngle = (i % 2 === 0 ? 5 : -5);

      card.style.transition = 'none';
      card.style.transform = `translate3d(${dx}px, ${dy - 10}px, 20px) rotate(${crossAngle}deg) scale(1.02)`;
    });

    // Force layout reflow
    void grid.offsetHeight;

    // 6. Stage 3: Play - Deal & Arrange smoothly into their new slots
    setTimeout(() => {
      cards.forEach((card, i) => {
        const stagger = (i % 6) * 65; // Staggered dealing feel
        card.style.transition = `transform 0.7s cubic-bezier(0.34, 1.45, 0.64, 1) ${stagger}ms, box-shadow 0.5s ease ${stagger}ms`;
        card.style.transform = 'translate3d(0, 0, 0) rotate(0deg) scale(1)';
        card.style.boxShadow = '';
      });

      // Cleanup
      setTimeout(() => {
        cards.forEach(card => {
          card.style.transition = '';
          card.style.transform = '';
          card.style.zIndex = '';
          card.style.boxShadow = '';
        });
        grid.dataset.isShuffling = 'false';
        if (shuffleBtn) {
          shuffleBtn.classList.remove('is-active');
          const span = shuffleBtn.querySelector('span');
          if (span) span.textContent = 'Shuffle & Arrange';
        }
      }, 850);
    }, 40);
  }, 340);
}

/**
 * IntersectionObserver for Featured Luxury Hotels
 * Arranges hotel cards smoothly one by one as they scroll into view
 */
function setupHotelsArrangeObserver() {
  const section = document.getElementById('hotels');
  const container = document.getElementById('hotels-grid');
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
 * Reset all hotel filters to default
 */
function resetHotelFilters() {
  hotelFilterState.destination = 'all';
  hotelFilterState.maxPrice = 600;
  hotelFilterState.minRating = 0;
  hotelFilterState.sortBy = 'popular';

  const destSelect = document.getElementById('hotel-filter-destination');
  const priceRange = document.getElementById('hotel-filter-price');
  const priceValueLabel = document.getElementById('hotel-price-val');
  const ratingSelect = document.getElementById('hotel-filter-rating');
  const sortSelect = document.getElementById('hotel-sort-by');

  if (destSelect) destSelect.value = 'all';
  if (priceRange) priceRange.value = 600;
  if (priceValueLabel) priceValueLabel.textContent = '$600';
  if (ratingSelect) ratingSelect.value = '0';
  if (sortSelect) sortSelect.value = 'popular';

  renderHotels(HOTELS_DATA);

  if (typeof showToast === 'function') {
    showToast('Hotel filters have been reset', 'info');
  }
}

/**
 * Open Hotel Details & Booking Price Estimation Modal
 */
function openHotelDetailsModal(hotelId) {
  const hotel = HOTELS_DATA.find(h => h.id === hotelId);
  if (!hotel) return;

  const modal = document.getElementById('hotel-modal');
  const content = document.getElementById('hotel-modal-body');
  if (!modal || !content) return;

  // Read current dates or set defaults (tomorrow and 4 nights later)
  let checkInVal = document.getElementById('search-checkin')?.value;
  let checkOutVal = document.getElementById('search-checkout')?.value;
  let roomsCount = parseInt(document.getElementById('rooms-count-val')?.textContent || '1', 10);
  let adultsCount = parseInt(document.getElementById('adults-count-val')?.textContent || '2', 10);

  if (!checkInVal) {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    checkInVal = tomorrow.toISOString().split('T')[0];
  }
  if (!checkOutVal) {
    const d = new Date(checkInVal);
    d.setDate(d.getDate() + 4);
    checkOutVal = d.toISOString().split('T')[0];
  }

  const isSaved = typeof isInWishlist === 'function' ? isInWishlist(hotel.id) : false;

  content.innerHTML = `
    <div class="hotel-modal-grid">
      <div class="hotel-modal-media">
        <div class="hotel-modal-img-container">
          <img src="${hotel.image}" alt="${hotel.name}" class="hotel-modal-image">
          <span class="hotel-modal-badge">${hotel.badge}</span>
        </div>
        <div class="hotel-modal-gallery-thumbs">
          <div class="thumb active"><img src="${hotel.image}" alt="View 1"></div>
          <div class="thumb"><img src="assets/destinations/paris.webp" alt="View 2"></div>
          <div class="thumb"><img src="assets/experiences/luxury.webp" alt="View 3"></div>
        </div>
        <div class="hotel-modal-amenities-section">
          <h4 class="modal-section-title">Included Amenities & Services</h4>
          <div class="modal-amenities-grid">
            ${hotel.amenities.map(a => `
              <div class="modal-amenity-item">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#eb030b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>${a}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <div class="hotel-modal-details">
        <div class="modal-header-row">
          <div class="modal-meta-tag">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            ${hotel.locationText}
          </div>
          <button 
            type="button" 
            class="modal-wishlist-toggle ${isSaved ? 'active' : ''}" 
            onclick="handleModalWishlistToggle('${hotel.id}', this)"
            aria-label="Wishlist"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="${isSaved ? '#eb030b' : 'none'}" stroke="${isSaved ? '#eb030b' : 'currentColor'}" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
        </div>

        <h2 class="modal-hotel-title">${hotel.name}</h2>

        <div class="modal-rating-banner">
          <span class="modal-score">${hotel.customerRating}</span>
          <div class="modal-rating-text">
            <span class="badge-status">${hotel.ratingText}</span>
            <span class="badge-count">${hotel.reviewCount} verified guest reviews</span>
          </div>
        </div>

        <p class="modal-hotel-desc">${hotel.shortDesc} Guests enjoy round-the-clock bespoke concierge support, priority reservation privileges, and complimentary luxury toiletries.</p>

        <!-- Dynamic Booking Price Estimator Section -->
        <div class="modal-estimator-card">
          <div class="estimator-header">
            <h4>Booking Price Breakdown</h4>
            <span class="live-calc-badge">Live Estimate</span>
          </div>

          <div class="estimator-form-grid">
            <div class="estimator-field">
              <label for="modal-checkin">Check-in Date</label>
              <input type="date" id="modal-checkin" value="${checkInVal}" onchange="recalculateModalPrice('${hotel.id}')">
            </div>
            <div class="estimator-field">
              <label for="modal-checkout">Check-out Date</label>
              <input type="date" id="modal-checkout" value="${checkOutVal}" onchange="recalculateModalPrice('${hotel.id}')">
            </div>
            <div class="estimator-field">
              <label for="modal-rooms">Rooms</label>
              <select id="modal-rooms" onchange="recalculateModalPrice('${hotel.id}')">
                <option value="1" ${roomsCount === 1 ? 'selected' : ''}>1 Room</option>
                <option value="2" ${roomsCount === 2 ? 'selected' : ''}>2 Rooms</option>
                <option value="3" ${roomsCount === 3 ? 'selected' : ''}>3 Rooms</option>
                <option value="4" ${roomsCount === 4 ? 'selected' : ''}>4 Rooms</option>
              </select>
            </div>
            <div class="estimator-field">
              <label for="modal-room-type">Room Type</label>
              <select id="modal-room-type" onchange="recalculateModalPrice('${hotel.id}')">
                <option value="1.0" selected>Deluxe King Room (Standard)</option>
                <option value="1.35">Executive Panoramic Suite (+35%)</option>
                <option value="1.8">Presidential Luxury Villa (+80%)</option>
              </select>
            </div>
          </div>

          <!-- Price Calculation Breakdown Table -->
          <div id="modal-price-breakdown-container">
            <!-- Populated by recalculateModalPrice() -->
          </div>

          <div class="modal-action-row">
            <button 
              type="button" 
              class="btn-confirm-reserve" 
              onclick="executeDemoBooking('${hotel.id}')"
            >
              <span>Confirm Demo Reservation</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </button>
            <span class="guarantee-text">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              Best Price Guarantee • Free cancellation up to 48h prior
            </span>
          </div>
        </div>
      </div>
    </div>
  `;

  // Calculate initial price breakdown
  recalculateModalPrice(hotel.id);

  // Show modal
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

/**
 * Handle Wishlist toggle inside details modal
 */
function handleModalWishlistToggle(hotelId, btn) {
  if (typeof toggleWishlist === 'function') {
    const isNowSaved = toggleWishlist(hotelId);
    if (isNowSaved) {
      btn.classList.add('active');
      btn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="#eb030b" stroke="#eb030b" stroke-width="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
      `;
    } else {
      btn.classList.remove('active');
      btn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
      `;
    }
  }
}

/**
 * Dynamic Calculation of Nights and Total Price with Taxes
 */
function recalculateModalPrice(hotelId) {
  const hotel = HOTELS_DATA.find(h => h.id === hotelId);
  const container = document.getElementById('modal-price-breakdown-container');
  if (!hotel || !container) return;

  const inInput = document.getElementById('modal-checkin');
  const outInput = document.getElementById('modal-checkout');
  const roomsInput = document.getElementById('modal-rooms');
  const typeInput = document.getElementById('modal-room-type');

  let checkIn = new Date(inInput?.value);
  let checkOut = new Date(outInput?.value);
  const rooms = parseInt(roomsInput?.value || '1', 10);
  const multiplier = parseFloat(typeInput?.value || '1.0');

  // Validate dates
  const today = new Date();
  today.setHours(0,0,0,0);

  if (isNaN(checkIn.getTime()) || checkIn < today) {
    checkIn = new Date(today);
    checkIn.setDate(checkIn.getDate() + 1);
    if (inInput) inInput.value = checkIn.toISOString().split('T')[0];
  }

  if (isNaN(checkOut.getTime()) || checkOut <= checkIn) {
    checkOut = new Date(checkIn);
    checkOut.setDate(checkOut.getDate() + 1);
    if (outInput) outInput.value = checkOut.toISOString().split('T')[0];
  }

  // Calculate nights
  const diffTime = Math.abs(checkOut - checkIn);
  const nights = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  // Calculate pricing components
  const adjustedNightlyRate = Math.round(hotel.pricePerNight * multiplier);
  const baseSubtotal = adjustedNightlyRate * nights * rooms;
  const taxes = Math.round(baseSubtotal * 0.12); // 12% government hotel tax
  const serviceFee = 25 * rooms; // $25 hospitality service charge
  const estimatedTotal = baseSubtotal + taxes + serviceFee;

  container.innerHTML = `
    <div class="price-breakdown-table">
      <div class="breakdown-row">
        <span>$${adjustedNightlyRate} × ${nights} night${nights > 1 ? 's' : ''} × ${rooms} room${rooms > 1 ? 's' : ''}</span>
        <span class="breakdown-val">$${baseSubtotal.toLocaleString()}</span>
      </div>
      <div class="breakdown-row">
        <span>Estimated Taxes & Tourism Duty (12%)</span>
        <span class="breakdown-val">$${taxes.toLocaleString()}</span>
      </div>
      <div class="breakdown-row">
        <span>Hospitality & Booking Service Fee</span>
        <span class="breakdown-val">$${serviceFee.toLocaleString()}</span>
      </div>
      <div class="breakdown-divider"></div>
      <div class="breakdown-row total-row">
        <div class="total-label-group">
          <strong>Estimated Total Price</strong>
          <span class="total-caption">(All mandatory taxes & fees included)</span>
        </div>
        <strong class="total-final-val">$${estimatedTotal.toLocaleString()}</strong>
      </div>
    </div>
  `;
}

/**
 * Execute demo reservation confirmation
 */
function executeDemoBooking(hotelId) {
  const hotel = HOTELS_DATA.find(h => h.id === hotelId);
  if (!hotel) return;

  const inInput = document.getElementById('modal-checkin')?.value;
  const outInput = document.getElementById('modal-checkout')?.value;
  const rooms = document.getElementById('modal-rooms')?.value || '1';
  const totalVal = document.querySelector('.total-final-val')?.textContent || `$${hotel.pricePerNight * 3}`;

  const bookingRef = 'STK-' + Math.floor(100000 + Math.random() * 900000);

  // Close hotel modal
  closeHotelDetailsModal();

  // Save demo booking to localStorage
  try {
    const existing = JSON.parse(localStorage.getItem('stackly_bookings') || '[]');
    existing.unshift({
      ref: bookingRef,
      hotelName: hotel.name,
      hotelId: hotel.id,
      destination: hotel.destination,
      checkIn: inInput,
      checkOut: outInput,
      rooms: rooms,
      total: totalVal,
      dateBooked: new Date().toLocaleDateString()
    });
    localStorage.setItem('stackly_bookings', JSON.stringify(existing.slice(0, 10)));
  } catch (e) {
    console.warn('Booking localStorage error:', e);
  }

  // Open confirmation modal
  const confirmModal = document.getElementById('booking-confirm-modal');
  const confirmBody = document.getElementById('booking-confirm-body');
  if (confirmModal && confirmBody) {
    confirmBody.innerHTML = `
      <div class="confirmation-success-icon">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#eb030b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
      <h3 class="confirm-title">Demo Reservation Confirmed!</h3>
      <p class="confirm-subtitle">Your stay at <strong>${hotel.name}</strong> is reserved.</p>
      
      <div class="confirm-details-card">
        <div class="confirm-row">
          <span>Booking Reference:</span>
          <strong>${bookingRef}</strong>
        </div>
        <div class="confirm-row">
          <span>Destination:</span>
          <span>${hotel.destination}, ${hotel.country}</span>
        </div>
        <div class="confirm-row">
          <span>Dates:</span>
          <span>${inInput} to ${outInput}</span>
        </div>
        <div class="confirm-row">
          <span>Rooms:</span>
          <span>${rooms} Room(s)</span>
        </div>
        <div class="confirm-row highlight">
          <span>Estimated Total:</span>
          <strong class="confirm-price">${totalVal}</strong>
        </div>
      </div>
      <p class="confirm-disclaimer">This is a demonstration booking confirmation. No payment was charged.</p>
      <button type="button" class="btn-primary-block" onclick="closeConfirmModal()">Done & Continue Exploring</button>
    `;

    confirmModal.classList.add('open');
    confirmModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  } else {
    alert(`Reservation Confirmed! Reference: ${bookingRef}`);
  }
}

function closeHotelDetailsModal() {
  const modal = document.getElementById('hotel-modal');
  if (modal) {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

function closeConfirmModal() {
  const modal = document.getElementById('booking-confirm-modal');
  if (modal) {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

