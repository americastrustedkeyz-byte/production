(function () {
  'use strict';

  function getUSTime() {
    const now = new Date();
    return new Date(
      now.toLocaleString('en-US', { timeZone: 'America/New_York' })
    );
  }

  function computeTrackAvailability() {
    const usNow = getUSTime();
    const day = usNow.getDay();
    const hour = usNow.getHours();
    const minute = usNow.getMinutes();

    let standardActive = false;
    let priorityActive = false;

    if ((day === 0 && hour >= 18) || (day >= 1 && day <= 4)) {
      standardActive = true;
    }

    if (
      (day === 5 && hour === 0 && minute >= 1) ||
      (day === 5 && hour > 0) ||
      day === 6 ||
      (day === 0 && hour < 18)
    ) {
      priorityActive = true;
    }

    if (standardActive) priorityActive = false;
    if (priorityActive) standardActive = false;

    return { standardActive, priorityActive };
  }

  function applyTrackTimeLogic(context = 'modal') {
    const result = computeTrackAvailability();

    console.log('[ATK TIME LOGIC]', result, 'context=', context);

    if (context === 'modal') {
      const modal = document.querySelector('[data-atk-track-modal]');
      if (!modal) return;

      const standardBtn = modal.querySelector('[data-track="standard"]');
      const priorityBtn = modal.querySelector('[data-track="priority"]');

      if (standardBtn) standardBtn.disabled = !result.standardActive;
      if (priorityBtn) priorityBtn.disabled = !result.priorityActive;
    }

    // Page-based logic can go here later if needed
  }

  /* ===================== MODAL (A) ===================== */
  document.addEventListener('click', function (e) {
    const trigger = e.target.closest('[data-open-booking-track]');
    if (!trigger) return;

    e.preventDefault();
    const modal = document.querySelector('[data-atk-track-modal]');
    if (modal) modal.hidden = false;

    applyTrackTimeLogic('modal');
  });

  /* ===================== SERVICES PAGE (B) ===================== */
  document.addEventListener('click', function (e) {
    const link = e.target.closest('[data-atk-booking-page]');
    if (!link) return;

    e.preventDefault();
    e.stopImmediatePropagation();

    console.log('[ATK] Services navigation handled by JS');

    applyTrackTimeLogic('page');

    window.location.href = '/atk-booking?page=services';
  }, true);

})();
