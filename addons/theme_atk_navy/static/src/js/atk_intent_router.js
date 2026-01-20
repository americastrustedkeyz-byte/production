// =====================================================
// ATK INTENT ROUTER — ODOO SAFE (POLLING)
// =====================================================
(function () {
  const params = new URLSearchParams(window.location.search);
  const intent = params.get('intent');
  const track  = params.get('track') || 'standard';

  if (!intent) return;

  console.log('[ATK] Intent detected →', intent, track);

  let attempts = 0;
  const maxAttempts = 50;

  const interval = setInterval(() => {
    attempts++;

    /* ==========================
       VEHICLE IDENTIFICATION MODAL
       ========================== */
    if (intent === 'vehicle') {
      const modal = document.querySelector('[data-atk-vehicle-modal]');
      const form  = document.getElementById('atk_vehicle_form');

      if (modal && form) {
        modal.hidden = false;

        let input = form.querySelector('[name="booking_track"]');
        if (!input) {
          input = document.createElement('input');
          input.type = 'hidden';
          input.name = 'booking_track';
          form.appendChild(input);
        }
        input.value = track;

        console.log('[ATK] Vehicle modal opened via intent:', track);

        cleanup();
        clearInterval(interval);
        return;
      }
    }

    /* ==========================
       BOOKING TRACK MODAL
       ========================== */
    if (intent === 'booking') {
      const modal = document.querySelector('[data-atk-track-modal]');

      if (modal) {
        modal.hidden = false;

        if (typeof window.applyTrackTimeLogic === 'function') {
          window.applyTrackTimeLogic();
        }

        console.log('[ATK] Booking track modal opened via intent');

        cleanup();
        clearInterval(interval);
        return;
      }
    }

    if (attempts >= maxAttempts) {
      console.error('[ATK ERROR] Intent router timeout:', intent);
      clearInterval(interval);
    }
  }, 100);

  function cleanup() {
    const cleanUrl = new URL(window.location.href);
    cleanUrl.searchParams.delete('intent');
    cleanUrl.searchParams.delete('track');
    history.replaceState({}, document.title, cleanUrl.pathname + cleanUrl.search);
  }
})();
