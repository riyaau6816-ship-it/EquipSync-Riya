import './index.css';
import { equipmentData, Equipment } from './data';

// --- State Management ---
interface BookingState {
  equipmentId: number | null;
  startDate: string | null;
  endDate: string | null;
  deliveryType: 'pickup' | 'delivery';
  totalAmount: number;
}

let currentBooking: BookingState = {
  equipmentId: null,
  startDate: null,
  endDate: null,
  deliveryType: 'pickup',
  totalAmount: 0
};

let currentCategory = 'All';

// --- Navigation ---
function showSection(sectionId: string) {
  // Hide all sections
  document.querySelectorAll('.page-section').forEach(el => {
    el.classList.add('hidden');
  });
  
  // Show target section
  const target = document.getElementById(sectionId);
  if (target) {
    target.classList.remove('hidden');
  }

  // Navbar visibility logic
  const navbar = document.getElementById('navbar');
  if (navbar) {
    if (sectionId === 'landing-page') {
      navbar.classList.add('hidden');
    } else {
      navbar.classList.remove('hidden');
    }
  }

  // Back button logic in navbar
  const navBackBtn = document.getElementById('nav-back-btn');
  if (navBackBtn) {
    if (sectionId === 'listing-page' || sectionId === 'landing-page') {
      navBackBtn.classList.add('hidden');
    } else {
      navBackBtn.classList.remove('hidden');
    }
  }

  // Footer warning visibility
  const footerWarning = document.getElementById('footer-warning');
  if (footerWarning) {
    if (sectionId === 'landing-page') {
      footerWarning.classList.add('hidden');
    } else {
      footerWarning.classList.remove('hidden');
    }
  }
  
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Global navigation helper
(window as any).navigateTo = (page: string) => {
  if (page === 'landing') showSection('landing-page');
  if (page === 'listing') showSection('listing-page');
  if (page === 'signin') showSection('signin-page');
  if (page === 'add-equipment') showSection('add-equipment-page');
  if (page === 'history') showSection('booking-history-page');
};

// --- Render Functions ---

function renderEquipmentList(category: string, searchTerm: string = '') {
  const grid = document.getElementById('equipment-grid');
  if (!grid) return;

  grid.innerHTML = '';

  let filtered = category === 'All' 
    ? equipmentData 
    : equipmentData.filter(item => item.category === category);

  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    filtered = filtered.filter(item => item.name.toLowerCase().includes(term));
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full text-center py-12">
        <div class="inline-flex p-4 bg-gray-50 rounded-full mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900">No equipment found</h3>
        <p class="text-gray-500 mt-1">Try adjusting your search or category filter.</p>
      </div>
    `;
    return;
  }

  filtered.forEach(item => {
    const card = document.createElement('div');
    card.className = 'bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col group';
    card.innerHTML = `
      <div class="h-48 overflow-hidden relative">
        <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
        <div class="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg text-xs font-bold text-teal-600 shadow-sm">
          ₹${item.price}/day
        </div>
      </div>
      <div class="p-5 flex flex-col flex-1">
        <div class="text-xs text-gray-500 mb-2 uppercase tracking-wide font-semibold">${item.category}</div>
        <h3 class="font-bold text-gray-900 mb-2 text-lg leading-tight group-hover:text-teal-600 transition-colors">${item.name}</h3>
        <p class="text-gray-500 text-sm line-clamp-2 mb-5 flex-1 leading-relaxed">${item.description}</p>
        <button class="view-details-btn w-full py-3 rounded-xl border border-teal-100 text-teal-600 font-semibold hover:bg-teal-50 transition-colors" data-id="${item.id}">
          View Details
        </button>
      </div>
    `;
    grid.appendChild(card);
  });

  // Attach listeners to new buttons
  document.querySelectorAll('.view-details-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt((e.target as HTMLElement).dataset.id || '0');
      openDetail(id);
    });
  });
}

function openDetail(id: number) {
  const item = equipmentData.find(e => e.id === id);
  if (!item) return;

  currentBooking.equipmentId = id;

  // Populate detail page
  (document.getElementById('detail-image') as HTMLImageElement).src = item.image;
  (document.getElementById('detail-name') as HTMLElement).textContent = item.name;
  (document.getElementById('detail-price') as HTMLElement).textContent = `₹${item.price}`;
  (document.getElementById('detail-description') as HTMLElement).textContent = item.description;
  (document.getElementById('detail-category') as HTMLElement).textContent = item.category;

  showSection('detail-page');
}

function openBooking() {
  const item = equipmentData.find(e => e.id === currentBooking.equipmentId);
  if (!item) return;

  // Populate booking summary top
  (document.getElementById('booking-item-image') as HTMLImageElement).src = item.image;
  (document.getElementById('booking-item-name') as HTMLElement).textContent = item.name;
  (document.getElementById('booking-item-price') as HTMLElement).textContent = `₹${item.price}/day`;

  // Reset form
  (document.getElementById('start-date') as HTMLInputElement).value = '';
  (document.getElementById('end-date') as HTMLInputElement).value = '';
  (document.getElementById('date-conflict-msg') as HTMLElement).classList.add('hidden');
  
  // Reset state
  currentBooking.startDate = null;
  currentBooking.endDate = null;
  currentBooking.deliveryType = 'pickup';
  currentBooking.totalAmount = 0;
  
  // Reset radio
  const pickupRadio = document.querySelector('input[value="pickup"]') as HTMLInputElement;
  if (pickupRadio) pickupRadio.checked = true;

  // Reset distance input
  const distanceContainer = document.getElementById('delivery-distance-container');
  const distanceInput = document.getElementById('delivery-distance') as HTMLInputElement;
  if (distanceContainer) distanceContainer.classList.add('hidden');
  if (distanceInput) distanceInput.value = '';

  updateBookingSummary();
  showSection('booking-page');
}

function updateBookingSummary() {
  const item = equipmentData.find(e => e.id === currentBooking.equipmentId);
  if (!item) return;

  const startDateInput = document.getElementById('start-date') as HTMLInputElement;
  const endDateInput = document.getElementById('end-date') as HTMLInputElement;
  const deliveryRadios = document.getElementsByName('delivery');
  const distanceInput = document.getElementById('delivery-distance') as HTMLInputElement;
  const distanceContainer = document.getElementById('delivery-distance-container');
  
  let deliveryType = 'pickup';
  deliveryRadios.forEach((r: any) => { if (r.checked) deliveryType = r.value; });

  // Toggle distance input
  if (deliveryType === 'delivery') {
    distanceContainer?.classList.remove('hidden');
  } else {
    distanceContainer?.classList.add('hidden');
  }

  const start = startDateInput.value ? new Date(startDateInput.value) : null;
  const end = endDateInput.value ? new Date(endDateInput.value) : null;

  // Conflict Check Logic
  const conflictDate = '2026-03-02';
  const conflictMsg = document.getElementById('date-conflict-msg');
  
  let isConflict = false;
  if (startDateInput.value === conflictDate || endDateInput.value === conflictDate) {
    isConflict = true;
    conflictMsg?.classList.remove('hidden');
  } else {
    conflictMsg?.classList.add('hidden');
  }

  let days = 0;
  let rentalCost = 0;
  let deliveryFee = 0;

  if (deliveryType === 'delivery') {
    const distance = parseFloat(distanceInput.value) || 0;
    if (distance > 0) {
       deliveryFee = distance < 4 ? 0 : 100;
    }
  }

  if (start && end && !isConflict && end >= start) {
    const diffTime = Math.abs(end.getTime() - start.getTime());
    days = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // Inclusive
    rentalCost = days * item.price;
  }

  const total = rentalCost + deliveryFee;

  // Update UI
  (document.getElementById('summary-days') as HTMLElement).textContent = `${days} days`;
  (document.getElementById('summary-rental') as HTMLElement).textContent = `₹${rentalCost}`;
  (document.getElementById('summary-delivery') as HTMLElement).textContent = deliveryFee === 0 ? 'Free' : `₹${deliveryFee}`;
  (document.getElementById('summary-total') as HTMLElement).textContent = `₹${total}`;

  // Update State
  currentBooking.startDate = startDateInput.value;
  currentBooking.endDate = endDateInput.value;
  currentBooking.deliveryType = deliveryType as 'pickup' | 'delivery';
  currentBooking.totalAmount = total;

  // Enable/Disable Button
  const proceedBtn = document.getElementById('proceed-details-btn') as HTMLButtonElement;
  // Require distance if delivery is selected
  const isDistanceValid = deliveryType === 'pickup' || (deliveryType === 'delivery' && parseFloat(distanceInput.value) > 0);
  
  if (days > 0 && !isConflict && isDistanceValid) {
    proceedBtn.disabled = false;
  } else {
    proceedBtn.disabled = true;
  }
}

function confirmBooking() {
  // Gather user details
  const name = (document.getElementById('user-name') as HTMLInputElement).value;
  const email = (document.getElementById('user-email') as HTMLInputElement).value;
  const phone = (document.getElementById('user-phone') as HTMLInputElement).value;
  const address = (document.getElementById('user-address') as HTMLInputElement).value;
  
  if (!name || !email || !phone || !address) {
    alert("Please fill in all required fields.");
    return;
  }

  const item = equipmentData.find(e => e.id === currentBooking.equipmentId);
  
  // Generate Booking ID
  const bookingId = 'BK-' + Math.floor(1000 + Math.random() * 9000);

  // Populate Confirmation
  (document.getElementById('conf-id') as HTMLElement).textContent = bookingId;
  (document.getElementById('conf-item') as HTMLElement).textContent = item?.name || '';
  (document.getElementById('conf-dates') as HTMLElement).textContent = `${currentBooking.startDate} to ${currentBooking.endDate}`;
  (document.getElementById('conf-delivery') as HTMLElement).textContent = currentBooking.deliveryType === 'delivery' ? 'Doorstep Delivery' : 'Pickup';
  (document.getElementById('conf-name') as HTMLElement).textContent = name;
  (document.getElementById('conf-total') as HTMLElement).textContent = `₹${currentBooking.totalAmount}`;

  showSection('confirmation-page');
}

// --- Event Listeners ---

document.addEventListener('DOMContentLoaded', () => {
  // Initial Render
  renderEquipmentList('All');

  // Landing Page
  document.getElementById('browse-btn')?.addEventListener('click', () => {
    showSection('listing-page');
  });

  // Sign In Logic
  document.getElementById('signin-submit-btn')?.addEventListener('click', () => {
    const emailInput = document.querySelector('#signin-form input[type="email"]') as HTMLInputElement;
    const passInput = document.querySelector('#signin-form input[type="password"]') as HTMLInputElement;
    
    if (emailInput?.value && passInput?.value) {
      // Mock success
      const signinBtn = document.getElementById('nav-signin-btn');
      if (signinBtn) {
        signinBtn.textContent = 'My Account';
        signinBtn.onclick = () => alert('Profile page coming soon!');
        signinBtn.className = 'text-teal-600 font-semibold hover:text-teal-800 transition-colors cursor-pointer';
      }
      showSection('landing-page');
    } else {
      alert('Please enter any email and password to demo sign in.');
    }
  });

  // Add Equipment Logic
  document.getElementById('submit-equipment-btn')?.addEventListener('click', () => {
    const name = (document.getElementById('add-name') as HTMLInputElement).value;
    const price = (document.getElementById('add-price') as HTMLInputElement).value;
    const category = (document.getElementById('add-category') as HTMLSelectElement).value;
    const desc = (document.getElementById('add-description') as HTMLTextAreaElement).value;

    if (name && price && desc) {
      // Add to data (mock)
      const newItem = {
        id: equipmentData.length + 1,
        name: name,
        category: category,
        price: parseInt(price),
        image: 'https://images.unsplash.com/photo-1504198458649-3128b932f49e?auto=format&fit=crop&q=80&w=800', // Placeholder
        description: desc
      };
      equipmentData.unshift(newItem); // Add to top
      renderEquipmentList('All');
      
      alert('Equipment listed successfully!');
      (document.getElementById('add-equipment-form') as HTMLFormElement).reset();
      showSection('listing-page');
    } else {
      alert('Please fill in all fields.');
    }
  });

  document.getElementById('add-back-btn')?.addEventListener('click', () => {
    showSection('landing-page');
  });

  // History Page Logic
  document.getElementById('history-back-btn')?.addEventListener('click', () => {
    showSection('landing-page');
  });

  document.querySelectorAll('.download-receipt-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      alert('Receipt downloaded successfully!');
    });
  });
  
  // Distance Input Change
  document.getElementById('delivery-distance')?.addEventListener('input', updateBookingSummary);

  // Navbar Back Button
  document.getElementById('nav-back-btn')?.addEventListener('click', () => {
    // Simple history logic: if on detail, go to listing. If on booking, go to detail.
    const detailPage = document.getElementById('detail-page');
    const bookingPage = document.getElementById('booking-page');
    const userPage = document.getElementById('user-details-page');
    const signinPage = document.getElementById('signin-page');
    
    if (!detailPage?.classList.contains('hidden')) {
      showSection('listing-page');
    } else if (!bookingPage?.classList.contains('hidden')) {
      showSection('detail-page');
    } else if (!userPage?.classList.contains('hidden')) {
      showSection('booking-page');
    } else if (!signinPage?.classList.contains('hidden')) {
      showSection('landing-page');
    }
  });

  // Category Filters
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Remove active class from all
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      // Add to clicked
      const target = e.target as HTMLElement;
      target.classList.add('active');
      
      const category = target.dataset.category || 'All';
      currentCategory = category;
      const searchTerm = (document.getElementById('search-equipment') as HTMLInputElement).value;
      renderEquipmentList(category, searchTerm);
    });
  });

  // Search Input
  document.getElementById('search-equipment')?.addEventListener('input', (e) => {
    const term = (e.target as HTMLInputElement).value;
    renderEquipmentList(currentCategory, term);
  });

  // Detail Page Back
  document.getElementById('detail-back-btn')?.addEventListener('click', () => {
    showSection('listing-page');
  });

  // Select Dates Button
  document.getElementById('select-dates-btn')?.addEventListener('click', () => {
    openBooking();
  });

  // Booking Page Logic
  document.getElementById('start-date')?.addEventListener('change', updateBookingSummary);
  document.getElementById('end-date')?.addEventListener('change', updateBookingSummary);
  document.querySelectorAll('input[name="delivery"]').forEach(el => {
    el.addEventListener('change', updateBookingSummary);
  });

  // Suggest Date Button
  document.getElementById('suggest-date-btn')?.addEventListener('click', () => {
    const startDateInput = document.getElementById('start-date') as HTMLInputElement;
    const endDateInput = document.getElementById('end-date') as HTMLInputElement;
    
    // Simple logic: just move the conflicting date + 1
    if (startDateInput.value === '2026-03-02') {
      startDateInput.value = '2026-03-03';
    }
    if (endDateInput.value === '2026-03-02') {
      endDateInput.value = '2026-03-03';
    }
    updateBookingSummary();
  });

  // Proceed to Details
  document.getElementById('proceed-details-btn')?.addEventListener('click', () => {
    showSection('user-details-page');
  });

  document.getElementById('booking-back-btn')?.addEventListener('click', () => {
    showSection('detail-page');
  });

  // Confirm Booking
  document.getElementById('confirm-booking-btn')?.addEventListener('click', confirmBooking);
  
  document.getElementById('details-back-btn')?.addEventListener('click', () => {
    showSection('booking-page');
  });

  // Home Button
  document.getElementById('home-btn')?.addEventListener('click', () => {
    // Reset everything
    (document.getElementById('user-form') as HTMLFormElement).reset();
    (document.getElementById('booking-form') as HTMLFormElement).reset();
    showSection('landing-page');
  });
});
