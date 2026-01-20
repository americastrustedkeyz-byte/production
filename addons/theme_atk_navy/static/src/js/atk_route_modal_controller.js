(function () {
  const params = new URLSearchParams(window.location.search);
  const intent = params.get('intent');
  const track  = params.get('track');

  if (!intent) return;

  console.log('[ATK] Route intent detected:', intent, track);

  /* ============================
     VEHICLE IDENTIFICATION MODAL
     ============================ */
  if (intent === 'vehicle') {
    const modal = document.querySelector('[data-atk-vehicle-modal]');
    const form  = document.getElementById('atk_vehicle_form');

    if (!modal || !form) {
      console.warn('[ATK] Vehicle modal or form not found');
      return;
    }

    modal.hidden = false;

    // inject track
    let input = form.querySelector('[name="booking_track"]');
    if (!input) {
      input = document.createElement('input');
      input.type = 'hidden';
      input.name = 'booking_track';
      form.appendChild(input);
    }
    input.value = track || 'standard';

    console.log('[ATK] Vehicle modal opened with track:', input.value);
  }

  /* ============================
     BOOKING TRACK MODAL
     ============================ */
  if (intent === 'booking') {
    const modal = document.querySelector('[data-atk-track-modal]');
    if (!modal) {
      console.warn('[ATK] Booking track modal not found');
      return;
    }

    modal.hidden = false;

    // apply time logic if available
    if (typeof applyTrackTimeLogic === 'function') {
      applyTrackTimeLogic();
    }

    console.log('[ATK] Booking track modal opened');
  }

  /* ============================
     CLEAN URL (ONCE)
     ============================ */
  const cleanUrl = new URL(window.location.href);
  cleanUrl.searchParams.delete('intent');
  cleanUrl.searchParams.delete('track');
  history.replaceState({}, document.title, cleanUrl.pathname + cleanUrl.search);

})();
