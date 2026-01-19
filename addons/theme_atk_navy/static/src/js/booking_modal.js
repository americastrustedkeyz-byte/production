//console.log('[ATK] Booking modal JS FILE LOADED');

(function () {
  const modal = document.querySelector('[data-atk-track-modal]');
  if (!modal) return;

  const standardBtn = modal.querySelector('[data-track="standard"]');
  const priorityBtn = modal.querySelector('[data-track="priority"]');
  if (!standardBtn || !priorityBtn) return;

  function getUSTime() {
    const now = new Date();
    return new Date(
      now.toLocaleString('en-US', { timeZone: 'America/New_York' })
    );
  }

  function applyTrackTimeLogic() {
    const usNow = getUSTime();

    const day = usNow.getDay();     //0=Sun … 6=Sat
    const hour = usNow.getHours();
    const minute = usNow.getMinutes();

    let standardActive = false;
    let priorityActive = false;

    /*STANDARD BOOKING*/
    if (
      (day === 0 && hour >= 18) || // Sunday 18:00+
      (day >= 1 && day <= 4)       // Mon–Thu
    ) {
      standardActive = true;
    }

    /* SKIP-THE-LINE (Friday 00:01 EXACT) */
    if (
      (day === 5 && hour === 0 && minute >= 1) ||
      (day === 5 && hour > 0) ||
      day === 6 ||
      (day === 0 && hour < 18)
    ) {
      priorityActive = true;
    }

    /* MUTUAL EXCLUSIVITY */
    if (standardActive) priorityActive = false;
    if (priorityActive) standardActive = false;

    standardBtn.disabled = !standardActive;
    priorityBtn.disabled = !priorityActive;
  }

  //===========APPLY TIME LOGIC TO SELECT BOOKING MODAL ON BUTTON CLICK====== 
  document.addEventListener('click', function (e) {
    const trigger = e.target.closest('[data-open-booking-track]');
    if (!trigger) return;

    e.preventDefault();
    modal.hidden = false;
    applyTrackTimeLogic();
  });

  //====booking page buttons==================

/**
   * Helper: redirect to homepage with params
   */
// Only run on booking page
  if (!document.querySelector('.atk-booking-billing')) return;

  function goHomeWithParams(params) {
    const url = new URL('/', window.location.origin);
    Object.keys(params).forEach(k => {
      if (params[k]) {
        url.searchParams.set(k, params[k]);
      }
    });
    window.location.href = url.toString();
  }

  //========apply timming check==============
document.addEventListener('click', function (e) {
    const triggerj = e.target.closest('[open-booking-track]');
    if (!triggerj) return;

    //modal.hidden = false;

    console.log('[ATK] Select Booking modal opened');
    applyTrackTimeLogic();

       goHomeWithParams({
        reset: 'open_booking_track_modal'
      });
  });

})();
