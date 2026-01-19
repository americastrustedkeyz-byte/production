(function () {
  const modal = document.querySelector('[data-atk-track-modal]');
  if (!modal) return;

  const standardBtn = modal.querySelector('[data-track="standard"]');
  const priorityBtn = modal.querySelector('[data-track="priority"]');

  if (!standardBtn || !priorityBtn) {
    console.warn('[ATK] Booking buttons not found');
    return;
  }

  /*=========================================
     GET AMERICA (US) TIME — NEW YORK
     =========================================*/
  function getUSTime() {
    const now = new Date();
    const usString = now.toLocaleString('en-US', {
      timeZone: 'America/New_York',
      hour12: false,
    });
    return new Date(usString);
  }

  function applyTrackTimeLogic() {
    const usNow = getUSTime();

    const day = usNow.getDay();     // 0=Sun … 6=Sat
    const hour = usNow.getHours();  // 0–23
    const minute = usNow.getMinutes();

    let standardActive = false;
    let priorityActive = false;

    /* ==============================
       STANDARD BOOKING
       ============================== */
    if (
      (day === 0 && hour >= 18) || // Sunday 18:00+
      (day >= 1 && day <= 4)       // Mon–Thu (all day)
    ) {
      standardActive = true;
    }

    /* ==============================
       SKIP-THE-LINE
       EXACTLY Friday 00:01+
       ============================== */
    if (
      (day === 5 && hour === 0 && minute >= 1) || // Fri 00:01–00:59
      (day === 5 && hour > 0) ||                  // Fri 01:00+
      day === 6 ||                                // Saturday
      (day === 0 && hour < 18)                    // Sunday before 18:00
    ) {
      priorityActive = true;
    }

    /* ==============================
       MUTUAL EXCLUSIVITY (CRITICAL)
       ============================== */
    if (standardActive) priorityActive = false;
    if (priorityActive) standardActive = false;

    /* ==============================
       APPLY STATES
       ============================== */
    standardBtn.disabled = !standardActive;
    priorityBtn.disabled = !priorityActive;

    /* ==============================
       DEBUG OUTPUT
       ============================== */
    console.group('[ATK] Booking Track Time Logic');
    console.log('US Time (NY):', usNow.toString());
    console.log('Day:', day, 'Hour:', hour, 'Minute:', minute);
    console.log('Standard Active:', standardActive);
    console.log('Skip-The-Line Active:', priorityActive);
    console.groupEnd();
  }

  /* ==============================
     APPLY timming check WHEN MODAL OPENS
     ============================== */
  document.addEventListener('click', function (e) {
    const trigger = e.target.closest('[data-open-booking-track]');
    if (!trigger) return;

    e.preventDefault();
    modal.hidden = false;

    console.log('[ATK] Select Booking modal opened');
    applyTrackTimeLogic();
  });

  //====booking page js code==================
  (function bindAtkBookingPageButtons() {

  // Only run on booking page
  if (!document.querySelector('.atk-booking-billing')) return;

  console.log('[ATK] Booking page JS loaded');

  /**
   * Helper: redirect to homepage with params
   */
  function goHomeWithParams(params) {
    const url = new URL('/', window.location.origin);
    Object.keys(params).forEach(k => {
      if (params[k]) {
        url.searchParams.set(k, params[k]);
      }
    });
    window.location.href = url.toString();
  }

  /**
   * VEHICLE IDENTIFICATION FLOW
   * (Booking Type cards)
   */
  document.querySelectorAll('[open-vehicle-modal="1"]').forEach(btn => {
    btn.addEventListener('click', function () {
      const track = this.getAttribute('data-track') || 'standard';

      console.log('[ATK] Open vehicle modal from booking page →', track);

      goHomeWithParams({
        reset: 'open_vehicle_modal',
        track: track
      });
    });
  });

  /**
   * BOOKING TRACK SELECTION FLOW
   * (Billing cards)
   */
  document.querySelectorAll('[open-booking-track="1"]').forEach(btn => {
    btn.addEventListener('click', function () {

      console.log('[ATK] Open booking track modal from booking page');

      goHomeWithParams({
        reset: 'open_booking_track_modal'
      });
        //apply timing logic
        applyTrackTimeLogic();
    });
  });
})();


})();
