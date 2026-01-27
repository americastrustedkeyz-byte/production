console.log('[ATK] JS loaded');

(function () {
  'use strict';
  
 const path = window.location.pathname;
  // 🚫 HARD STOP on portal & auth pages
  if (
    path.startsWith('/my') ||
    path.startsWith('/web/login') ||
    path.startsWith('/web/signup')
  ) {
    console.log('[ATK] Booking JS fully disabled on:', path);
    return;
  }

  // =========================
  // PAGE GUARD (VERY IMPORTANT)
  // =========================
  function isBookingPage() {
    return document.querySelector('#atk_continue_btn');
  }

  if (!isBookingPage()) {
    console.log('[ATK] Not booking page → JS skipped safely');
    return;
  }

  console.log('[ATK] Booking page detected → JS active');

  document.addEventListener('click', function (e) {
    const btn = e.target.closest('#atk_continue_btn');
    if (!btn) return;

    const makeEl  = document.getElementById('vehicle_make');
    const modelEl = document.getElementById('vehicle_model');
    const yearEl  = document.getElementById('vehicle_year');
    const priceEl = document.getElementById('price');

    if (!makeEl || !modelEl || !yearEl || !priceEl) {
      console.warn('[ATK] Required vehicle inputs not found');
      return;
    }

    const payload = {
      page: window.location.pathname,
      make: makeEl.value,
      model: modelEl.value,
      year: yearEl.value,
      price: priceEl.value,
    };

    fetch('/atk/activity/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    console.log('[ATK] Activity saved', payload);
  });

})();
