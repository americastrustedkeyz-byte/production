(function () {
  'use strict';

  /* ======================================================
     UTIL: GET SELECT BOOKING MODAL
     ====================================================== */
  function getBookingModal() {
    return document.querySelector('[data-atk-track-modal]');
  }

  /* ======================================================
     OPEN SELECT BOOKING MODAL
     ====================================================== */
  document.addEventListener('click', function (e) {
    const trigger = e.target.closest('[data-open-booking-track]');
    if (!trigger) return;

      //BLOCK if URL reset is active
      if (window.ATK_STATE?.urlResetActive) {
        console.log('[ATK] Booking modal suppressed due to URL reset');
        return;
      }

          e.preventDefault();

          const modal = getBookingModal();
          if (!modal) {
            console.error('[ATK] Select Booking modal not found in DOM');
            return;
          }

          modal.hidden = false;

          console.log('[ATK] Select Booking modal OPENED');

        //applyTrackTimeLogic(modal);
    
  });

  /* ======================================================
     CLOSE SELECT BOOKING MODAL (BACK BUTTON)
     ====================================================== */
  document.addEventListener('click', function (e) {
    const closeBtn = e.target.closest('[data-atk-track-close]');
    if (!closeBtn) return;

    const modal = getBookingModal();
    if (modal) {
      modal.hidden = true;
      console.log('[ATK] Select Booking modal CLOSED (Back button)');
    }
  });

})();
