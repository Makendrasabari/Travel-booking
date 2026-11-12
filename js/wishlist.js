/**
 * Stackly Travel - Wishlist Module
 * LocalStorage persistence, header counter badge, drawer modal,
 * and synchronized active states across cards.
 */

const WISHLIST_STORAGE_KEY = 'stackly_wishlist';

/**
 * Retrieve wishlist array from LocalStorage
 * @returns {Array<string>} array of hotel IDs
 */
function getWishlist() {
  try {
    const raw = localStorage.getItem(WISHLIST_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Error reading wishlist from localStorage:', e);
    return [];
  }
}

/**
 * Save wishlist array to LocalStorage
 * @param {Array<string>} list 
 */
function saveWishlist(list) {
  try {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(list));
    updateWishlistBadges();
    renderWishlistDrawerItems();
  } catch (e) {
    console.error('Error writing wishlist to localStorage:', e);
  }
}

/**
 * Check if a hotel is in wishlist
 * @param {string} hotelId 
 * @returns {boolean}
 */
function isInWishlist(hotelId) {
  const list = getWishlist();
  return list.includes(hotelId);
}

/**
 * Toggle hotel in wishlist
 * @param {string} hotelId 
 * @returns {boolean} true if added, false if removed
 */
function toggleWishlist(hotelId) {
  let list = getWishlist();
  const index = list.indexOf(hotelId);
  let isAdded = false;

  if (index > -1) {
    list.splice(index, 1);
    isAdded = false;
    if (typeof showToast === 'function') {
      showToast('Hotel removed from your wishlist', 'info');
    }
  } else {
    list.push(hotelId);
    isAdded = true;
    if (typeof showToast === 'function') {
      showToast('Hotel added to your wishlist!', 'success');
    }
  }

  saveWishlist(list);
  return isAdded;
}

/**
 * Update all wishlist badges (header and drawer)
 */
function updateWishlistBadges() {
  const list = getWishlist();
  const count = list.length;

  const headerBadge = document.getElementById('header-wishlist-count');
  if (headerBadge) {
    headerBadge.textContent = count;
    if (count > 0) {
      headerBadge.classList.add('visible');
    } else {
      headerBadge.classList.remove('visible');
    }
  }

  const drawerCount = document.getElementById('drawer-wishlist-count');
  if (drawerCount) {
    drawerCount.textContent = count === 1 ? '1 Saved Property' : `${count} Saved Properties`;
  }
}

/**
 * Initialize Wishlist Module & Drawer
 */
function initWishlist() {
  updateWishlistBadges();
  setupWishlistDrawer();
}

/**
 * Setup Wishlist Drawer
 */
function setupWishlistDrawer() {
  const trigger = document.getElementById('btn-header-wishlist');
  const drawer = document.getElementById('wishlist-drawer');
  const closeBtn = document.getElementById('btn-close-wishlist');
  const overlay = document.getElementById('wishlist-drawer-overlay');
  const clearBtn = document.getElementById('btn-clear-wishlist');

  if (trigger && drawer) {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      openWishlistDrawer();
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeWishlistDrawer);
  }

  if (overlay) {
    overlay.addEventListener('click', closeWishlistDrawer);
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (getWishlist().length === 0) return;
      if (confirm('Clear all saved properties from your wishlist?')) {
        saveWishlist([]);
        if (typeof renderHotels === 'function' && typeof HOTELS_DATA !== 'undefined') {
          // Re-render hotels to reset heart icons
          applyHotelFilters();
        }
        if (typeof showToast === 'function') {
          showToast('Wishlist cleared', 'info');
        }
      }
    });
  }
}

function openWishlistDrawer() {
  const drawer = document.getElementById('wishlist-drawer');
  if (drawer) {
    renderWishlistDrawerItems();
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
}

function closeWishlistDrawer() {
  const drawer = document.getElementById('wishlist-drawer');
  if (drawer) {
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

/**
 * Render items in Wishlist Drawer
 */
function renderWishlistDrawerItems() {
  const container = document.getElementById('wishlist-items-container');
  const emptyState = document.getElementById('wishlist-empty-state');
  if (!container) return;

  const list = getWishlist();

  if (list.length === 0) {
    container.innerHTML = '';
    if (emptyState) emptyState.classList.remove('hidden');
    return;
  }

  if (emptyState) emptyState.classList.add('hidden');

  // Match IDs with HOTELS_DATA
  const savedHotels = (typeof HOTELS_DATA !== 'undefined') 
    ? HOTELS_DATA.filter(h => list.includes(h.id))
    : [];

  container.innerHTML = savedHotels.map(hotel => `
    <div class="wishlist-item-card" id="wishlist-card-${hotel.id}">
      <img src="${hotel.image}" alt="${hotel.name}" class="wishlist-item-thumb">
      <div class="wishlist-item-details">
        <h4 class="wishlist-item-title">${hotel.name}</h4>
        <span class="wishlist-item-location">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          ${hotel.destination}, ${hotel.country}
        </span>
        <div class="wishlist-item-price">
          <strong>$${hotel.pricePerNight}</strong> <span>/ night</span>
        </div>
        <div class="wishlist-item-actions">
          <button 
            type="button" 
            class="btn-wishlist-view" 
            onclick="viewHotelFromWishlist('${hotel.id}')"
          >
            Details & Book
          </button>
          <button 
            type="button" 
            class="btn-wishlist-remove" 
            onclick="removeHotelFromWishlist('${hotel.id}')"
            aria-label="Remove ${hotel.name}"
            title="Remove"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function removeHotelFromWishlist(hotelId) {
  toggleWishlist(hotelId);
  // Also update card in featured hotels if currently displayed
  const card = document.getElementById(`card-${hotelId}`);
  if (card) {
    const btn = card.querySelector('.hotel-wishlist-btn');
    if (btn) {
      btn.classList.remove('active');
      btn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
      `;
    }
  }
}

function viewHotelFromWishlist(hotelId) {
  closeWishlistDrawer();
  if (typeof openHotelDetailsModal === 'function') {
    openHotelDetailsModal(hotelId);
  }
}

