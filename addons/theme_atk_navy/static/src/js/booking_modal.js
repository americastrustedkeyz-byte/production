(function () {
  'use strict';

  /* ======================================================
     HARD STOP — NEVER RUN ON PORTAL / BACKEND
     ====================================================== */
  const path = window.location.pathname;
  if (
    path.startsWith('/my') ||
    path.startsWith('/web') ||
    path.startsWith('/login')
  ) {
    console.log('[ATK] Booking JS skipped on portal/backend page:', path);
    return;
  }

  console.log('[ATK] Booking JS loaded on:', path);

  /* ======================================================
     TIME UTILITIES
     ====================================================== */
  function getUSTime() {
    const now = new Date();
    return new Date(
      now.toLocaleString('en-US', { timeZone: 'America/New_York' })
    );
  }

  function computeTrackAvailability() {
    const usNow = getUSTime();
    const day = usNow.getDay(); // 0=Sun … 6=Sat
    const hour = usNow.getHours();
    const minute = usNow.getMinutes();

    let standardActive = false;
    let priorityActive = false;

    // STANDARD BOOKING
    if (
      (day === 0 && hour >= 18) || // Sunday after 6pm
      (day >= 1 && day <= 4)       // Monday–Thursday
    ) {
      standardActive = true;
    }

    // SKIP-THE-LINE
    if (
      (day === 5 && hour === 0 && minute >= 1) ||
      (day === 5 && hour > 0) ||
      day === 6 ||
      (day === 0 && hour < 18)
    ) {
      priorityActive = true;
    }

    // Mutual exclusivity
    if (standardActive) priorityActive = false;
    if (priorityActive) standardActive = false;

    return { standardActive, priorityActive };
  }

  /* ======================================================
     CORE APPLY FUNCTION — NO MODAL ASSUMPTION
     ====================================================== */
  function applyTrackTimeLogic(context) {
    const { standardActive, priorityActive } = computeTrackAvailability();

    const root = context || document;

    const standardBtn = root.querySelector('[data-track="standard"]');
    const priorityBtn = root.querySelector('[data-track="priority"]');

    if (!standardBtn && !priorityBtn) {
      console.warn('[ATK] Track buttons not found in this context');
      return;
    }

    if (standardBtn) {
      standardBtn.toggleAttribute('disabled', !standardActive);
      standardBtn.classList.toggle('is-disabled', !standardActive);
    }

    if (priorityBtn) {
      priorityBtn.toggleAttribute('disabled', !priorityActive);
      priorityBtn.classList.toggle('is-disabled', !priorityActive);
    }

    console.log('[ATK] Track logic applied', {
      standardActive,
      priorityActive,
      time: new Date().toISOString(),
    });
  }

  /* ======================================================
     MODAL FLOW (A)
     ====================================================== */
  document.addEventListener('click', function (e) {
    const trigger = e.target.closest('[data-open-booking-track]');
    if (!trigger) return;

    e.preventDefault();

    const modal = document.querySelector('[data-atk-track-modal]');
    if (!modal) {
      console.warn('[ATK] Booking modal not found');
      return;
    }

    modal.hidden = false;
    applyTrackTimeLogic(modal);
  });

  /* ======================================================
     SERVICES PAGE FLOW (B)
     ====================================================== */
  document.addEventListener(
    'click',
    function (e) {
      const link = e.target.closest('[data-atk-booking-page-open]');
      if (!link) return;

      e.preventDefault();
      e.stopImmediatePropagation();

      console.log('[ATK] Services navigation handled by JS');

      // apply logic to page buttons (no modal needed)
      applyTrackTimeLogic(document);

      // navigate manually
      window.location.href = '/atk-booking?page=services';
    },
    true // capture phase to beat theme JS
  );

})();
