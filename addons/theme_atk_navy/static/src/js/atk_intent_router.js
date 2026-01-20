// =====================================================
// ATK INTENT ROUTER (SINGLE RESPONSIBILITY)
// =====================================================
(function () {
  const params = new URLSearchParams(window.location.search);
  const intent = params.get('intent');
  const track = params.get('track') || 'standard';

  if (!intent) return;

  console.log('[ATK] Intent detected →', intent);

  let attempts = 0;
  const maxAttempts = 40;

  const interval = setInterval(() => {
    attempts++;

    // ---------- VEHICLE MODAL ----------
    if (intent === 'vehicle') {
      const modal = document.querySelector('[data-atk-vehicle-modal]');
      const form  = document.getElementById('atk_vehicle_form');

      if (modal && form) {
        modal.hidden = false;

        // Inject booking track
        let input = document.getElementById('booking_track');
        if (!input) {
          input = document.createElement('input');
          input.type = 'hidden';
          input.id = 'booking_track';
          input.name = 'booking_track';
          form.appendChild(input);
        }
        input.value = track;

        console.log('[ATK] Vehicle modal opened via intent:', track);

        cleanupUrl();
        clearInterval(interval);
      }
    }

    // ---------- BOOKING TRACK MODAL ----------
    if (intent === 'booking') {
      const modal = document.querySelector('[data-atk-track-modal]');

      if (modal) {
        modal.hidden = false;

        console.log('[ATK] Booking track modal opened via intent');

        // Apply time logic if present
        if (typeof window.applyTrackTimeLogic === 'function') {
          window.applyTrackTimeLogic();
        }

        cleanupUrl();
        clearInterval(interval);
      }
    }

    if (attempts >= maxAttempts) {
      clearInterval(interval);
      console.error('[ATK ERROR] Intent router timeout:', intent);
    }
  }, 100);

  function cleanupUrl() {
    const clean = new URL(window.location.href);
    clean.searchParams.delete('intent');
    clean.searchParams.delete('track');
    window.history.replaceState({}, document.title, clean.pathname + clean.search);
  }
})();
