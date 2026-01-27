// =====================================================
// ATK HASH ROUTER (ODOO-SAFE, ZERO RACE CONDITIONS)
// =====================================================
(function () {

const pathCheck = window.location.pathname;

if (
  pathCheck.startsWith('/my') ||
  pathCheck.startsWith('/web') ||
  pathCheck.startsWith('/login')
) {
  return;
}
  
  if (!window.location.hash) return;

  const hash = window.location.hash.replace('#', '');
  console.log('[ATK] Hash detected:', hash);

  function click(selector) {
    const el = document.querySelector(selector);
    if (el) {
      el.click();
      console.log('[ATK] Triggered:', selector);
    } else {
      console.warn('[ATK] Target not found:', selector);
    }
  }

  // VEHICLE MODAL
  if (hash === 'open-vehicle-standard') {
    click('[data-open-vehicle-modal][data-track="standard"]');
  }

  if (hash === 'open-vehicle-priority') {
    click('[data-open-vehicle-modal][data-track="priority"]');
  }

  // BOOKING TRACK MODAL
  if (hash === 'open-booking-track') {
    click('[data-open-booking-track]');
  }

  // CLEAN HASH (OPTIONAL)
  history.replaceState(null, '', window.location.pathname);
})();
