// ======================================================
// ATK SELECT BOOKING TRACK MODAL LOGIC (FINAL, STABLE)
// ======================================================

(function () {
  const modal = document.querySelector('[data-atk-track-modal]');
  if (!modal) return;

  function getUSTime() {
    const now = new Date();
    return new Date(
      now.toLocaleString('en-US', { timeZone: 'America/New_York' })
    );
  }

  function applyTrackTimeLogic() {
    // 🔑 CRITICAL FIX:
    // Always re-query buttons AFTER modal is visible
    const standardBtn = modal.querySelector('[data-track="standard"]');
    const priorityBtn = modal.querySelector('[data-track="priority"]');

    if (!standardBtn || !priorityBtn) {
      console.warn('[ATK] Booking buttons not found');
      return;
    }

    const usNow = getUSTime();
    const day = usNow.getDay();     // 0 = Sun … 6 = Sat
    const hour = usNow.getHours();
    const minute = usNow.getMinutes();

    let standardActive = false;
    let priorityActive = false;

    // ---------- STANDARD ----------
    if (
      (day === 0 && hour >= 18) || // Sunday 6pm+
      (day >= 1 && day <= 4)       // Mon–Thu
    ) {
      standardActive = true;
    }

    // ---------- PRIORITY ----------
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

    standardBtn.disabled = !standardActive;
    priorityBtn.disabled = !priorityActive;

    console.log('[ATK] Booking button state updated', {
      standardActive,
      priorityActive
    });
  }

  document.addEventListener('click', function (e) {
    const trigger = e.target.closest('[data-open-booking-track]');
    if (!trigger) return;

    e.preventDefault();
    modal.hidden = false;
    applyTrackTimeLogic();
  });

  //url param
  /* =====================================================
   CAPTURE BOOKING TRACK FROM BUTTON CLICK
   ===================================================== */
document.addEventListener('click', function (e) {
  const trigger = e.target.closest('[data-open-vehicle-modal]');
  if (!trigger) return;

  const track = trigger.dataset.track || 'standard';

  console.log('[ATK] Booking track captured:', track);

  const url = new URL(window.location.href);

  //THESE TWO PARAMS ARE THE CONTRACT
  url.searchParams.set('reset', 'open_vehicle_modal');
  url.searchParams.set('track', track);

  console.log('[ATK] Redirecting →', url.toString());

  //HARD reload so Odoo cannot block it
  window.location.href = url.toString();
});

})();
