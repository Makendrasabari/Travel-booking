/**
 * Stackly Travel - Booking Search & Estimator Module
 * Handles Destination Autocomplete, Date Validation, Guest & Room Counter,
 * and Hero Search actions.
 */

// Guest counts state
const bookingSearchState = {
  adults: 2,
  children: 0,
  rooms: 1
};

/**
 * Initialize Booking Bar functionalities
 */
function initBookingSearch() {
  setupDateValidation();
  setupGuestRoomSelector();
  setupDestinationAutocomplete();
  setupHeroSearchButton();
}

/**
 * B. Date Validation
 * - Check-in date cannot be in the past.
 * - Check-out date must be later than check-in.
 * - Update minimum checkout date dynamically when check-in changes.
 */
function setupDateValidation() {
  const checkInInput = document.getElementById('search-checkin');
  const checkOutInput = document.getElementById('search-checkout');
  if (!checkInInput || !checkOutInput) return;

  const today = new Date();
  const todayStr = formatDateISO(today);

  // Set minimum check-in to today
  checkInInput.min = todayStr;

  // Set default check-in to tomorrow
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = formatDateISO(tomorrow);
  if (!checkInInput.value) {
    checkInInput.value = tomorrowStr;
  }

  // Set default check-out to 4 days after check-in
  const defaultCheckout = new Date(tomorrow);
  defaultCheckout.setDate(defaultCheckout.getDate() + 3);
  const defaultCheckoutStr = formatDateISO(defaultCheckout);
  if (!checkOutInput.value) {
    checkOutInput.value = defaultCheckoutStr;
  }

  // Update check-out min whenever check-in changes
  function updateCheckoutMin() {
    const checkInDate = new Date(checkInInput.value);
    if (!isNaN(checkInDate.getTime())) {
      const minCheckOut = new Date(checkInDate);
      minCheckOut.setDate(minCheckOut.getDate() + 1);
      const minCheckOutStr = formatDateISO(minCheckOut);
      checkOutInput.min = minCheckOutStr;

      // If current check-out is before or equal to check-in, auto advance
      const currentCheckOut = new Date(checkOutInput.value);
      if (isNaN(currentCheckOut.getTime()) || currentCheckOut <= checkInDate) {
        checkOutInput.value = minCheckOutStr;
      }
    }
  }

  updateCheckoutMin();
  checkInInput.addEventListener('change', updateCheckoutMin);

  // Manual check-out change validation
  checkOutInput.addEventListener('change', () => {
    const inDate = new Date(checkInInput.value);
    const outDate = new Date(checkOutInput.value);
    if (outDate <= inDate) {
      if (typeof showToast === 'function') {
        showToast('Check-out date must be after check-in date', 'warning');
      }
      updateCheckoutMin();
    }
  });
}

function formatDateISO(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * C. Guest and Room Selection
 * - Increment / decrement adults, children, rooms
 * - Maintain valid minimums
 * - Update trigger text
 */
function setupGuestRoomSelector() {
  const trigger = document.getElementById('guests-rooms-trigger');
  const dropdown = document.getElementById('guests-rooms-dropdown');
  if (!trigger || !dropdown) return;

  // Toggle dropdown
  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('active');
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target) && !trigger.contains(e.target)) {
      dropdown.classList.remove('active');
    }
  });

  // Counter buttons
  const counterConfigs = [
    { type: 'adults', min: 1, max: 10, valEl: 'adults-count-val' },
    { type: 'children', min: 0, max: 8, valEl: 'children-count-val' },
    { type: 'rooms', min: 1, max: 5, valEl: 'rooms-count-val' }
  ];

  counterConfigs.forEach(cfg => {
    const decBtn = document.querySelector(`.btn-counter[data-target="${cfg.type}"][data-action="dec"]`);
    const incBtn = document.querySelector(`.btn-counter[data-target="${cfg.type}"][data-action="inc"]`);
    const valEl = document.getElementById(cfg.valEl);

    if (decBtn) {
      decBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (bookingSearchState[cfg.type] > cfg.min) {
          bookingSearchState[cfg.type]--;
          if (valEl) valEl.textContent = bookingSearchState[cfg.type];
          updateGuestRoomLabel();
        }
      });
    }

    if (incBtn) {
      incBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (bookingSearchState[cfg.type] < cfg.max) {
          bookingSearchState[cfg.type]++;
          if (valEl) valEl.textContent = bookingSearchState[cfg.type];
          updateGuestRoomLabel();
        }
      });
    }
  });

  const applyBtn = document.getElementById('btn-apply-guests');
  if (applyBtn) {
    applyBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.remove('active');
    });
  }

  updateGuestRoomLabel();
}

function updateGuestRoomLabel() {
  const label = document.getElementById('guests-rooms-label');
  if (!label) return;
  const totalGuests = bookingSearchState.adults + bookingSearchState.children;
  const guestStr = totalGuests === 1 ? '1 Guest' : `${totalGuests} Guests`;
  const roomStr = bookingSearchState.rooms === 1 ? '1 Room' : `${bookingSearchState.rooms} Rooms`;
  label.textContent = `${guestStr}, ${roomStr}`;
}

/**
 * A. Destination Search & Autocomplete
 * - Autocomplete suggestions from destinations dataset
 */
function setupDestinationAutocomplete() {
  const destInput = document.getElementById('search-destination');
  const suggestionsBox = document.getElementById('destination-suggestions');
  if (!destInput || !suggestionsBox) return;

  // Build searchable database from DESTINATIONS_DATA and HOTELS_DATA
  const searchableList = [];
  if (typeof DESTINATIONS_DATA !== 'undefined') {
    DESTINATIONS_DATA.forEach(d => {
      searchableList.push({
        type: 'destination',
        title: d.name,
        subtitle: `${d.country} • Popular Destination`,
        matchKey: `${d.name} ${d.country}`.toLowerCase()
      });
    });
  }
  if (typeof HOTELS_DATA !== 'undefined') {
    HOTELS_DATA.forEach(h => {
      searchableList.push({
        type: 'hotel',
        title: h.name,
        subtitle: `${h.destination}, ${h.country} • Luxury Hotel`,
        matchKey: `${h.name} ${h.destination} ${h.country}`.toLowerCase()
      });
    });
  }

  function showSuggestions(query) {
    const term = query.trim().toLowerCase();
    if (!term) {
      // Show default popular destinations
      renderSuggestionsHtml(searchableList.slice(0, 5));
      suggestionsBox.classList.add('active');
      return;
    }

    const matches = searchableList.filter(item => item.matchKey.includes(term));
    if (matches.length === 0) {
      suggestionsBox.innerHTML = `
        <div class="suggestion-no-match">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <span>No destinations found for "${query}"</span>
        </div>
      `;
      suggestionsBox.classList.add('active');
      return;
    }

    renderSuggestionsHtml(matches.slice(0, 6));
    suggestionsBox.classList.add('active');
  }

  function renderSuggestionsHtml(items) {
    suggestionsBox.innerHTML = items.map(item => `
      <div class="suggestion-item" data-title="${item.title}" data-type="${item.type}">
        <div class="suggestion-icon">
          ${item.type === 'destination' ? `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          ` : `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 21h18"></path>
              <path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"></path>
            </svg>
          `}
        </div>
        <div class="suggestion-texts">
          <strong class="suggestion-name">${item.title}</strong>
          <span class="suggestion-meta">${item.subtitle}</span>
        </div>
      </div>
    `).join('');

    // Attach click events
    suggestionsBox.querySelectorAll('.suggestion-item').forEach(el => {
      el.addEventListener('click', () => {
        destInput.value = el.dataset.title;
        suggestionsBox.classList.remove('active');
      });
    });
  }

  destInput.addEventListener('focus', () => {
    showSuggestions(destInput.value);
  });

  destInput.addEventListener('input', (e) => {
    showSuggestions(e.target.value);
  });

  document.addEventListener('click', (e) => {
    if (!suggestionsBox.contains(e.target) && e.target !== destInput) {
      suggestionsBox.classList.remove('active');
    }
  });
}

/**
 * Hero Search Button Handler
 */
function setupHeroSearchButton() {
  const searchBtn = document.getElementById('btn-hero-search');
  if (!searchBtn) return;

  searchBtn.addEventListener('click', () => {
    const dest = document.getElementById('search-destination')?.value.trim();
    const checkIn = document.getElementById('search-checkin')?.value;
    const checkOut = document.getElementById('search-checkout')?.value;

    if (!checkIn || !checkOut) {
      if (typeof showToast === 'function') {
        showToast('Please select valid check-in and check-out dates', 'warning');
      }
      return;
    }

    // Apply destination to hotels filter
    const hotelDestSelect = document.getElementById('hotel-filter-destination');
    if (hotelDestSelect && dest) {
      let matched = false;
      for (let opt of hotelDestSelect.options) {
        if (opt.value.toLowerCase().includes(dest.toLowerCase()) || 
            opt.text.toLowerCase().includes(dest.toLowerCase())) {
          hotelDestSelect.value = opt.value;
          matched = true;
          break;
        }
      }
      if (!matched) {
        hotelDestSelect.value = 'all';
      }
      if (typeof applyHotelFilters === 'function') {
        applyHotelFilters();
      }
    }

    // Smooth scroll down to Featured Hotels
    const hotelSection = document.getElementById('hotels');
    if (hotelSection) {
      hotelSection.scrollIntoView({ behavior: 'smooth' });
    }

    if (typeof showToast === 'function') {
      const destText = dest ? ` in "${dest}"` : '';
      showToast(`Showing hotels matching your travel dates${destText}`, 'success');
    }
  });
}

