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

  function applyTrackTimeLogic(modal) {
    const result = computeTrackAvailability();

      if (!modal) return;

      const standardBtn = modal.querySelector('[data-track="standard"]');
      const priorityBtn = modal.querySelector('[data-track="priority"]');

      if (standardBtn) standardBtn.disabled = !result.standardActive;
      if (priorityBtn) priorityBtn.disabled = !result.priorityActive;
  }

  /* ===================== MODAL (A) ===================== */
  document.addEventListener('click', function (e) {
    const trigger = e.target.closest('[data-open-booking-track]');
    if (!trigger) return;

    e.preventDefault();

     //set modal and call time logic
    const modal = document.querySelector('[data-atk-track-modal]');
    //if (modal) modal.hidden = false;

    //applyTrackTimeLogic(modal);

    

      const urlTrack = new URLSearchParams(window.location.search).get('page');

      if (!urlTrack) {
           modal.hidden = false;
          applyTrackTimeLogic(modal);
      }
  });

  /* ===================== SERVICES PAGE (B) ===================== */
document.addEventListener(
  'click',
  function (e) {
    const link = e.target.closest('[data-atk-booking-page-open]');
    if (!link) return;

    e.preventDefault();
    e.stopPropagation();

    console.log('[ATK] Services link intercepted');

    // store intent BEFORE navigation
    sessionStorage.setItem('atk_apply_track_logic', '1');

    window.location.href = '/atk-booking?page=services';

    const urlTrack = new URLSearchParams(window.location.search).get('page');

      if (urlTrack) {
           const modal = document.querySelector('[data-atk-track-modal]');

           modal.hidden = false;
          applyTrackTimeLogic(modal);

           console.log('[ATK] Track timing applied on Services page');
      }
    
  },
  true //capture phase
);

document.addEventListener('DOMContentLoaded', function () {
  if (!sessionStorage.getItem('atk_apply_track_logic')) return;

  sessionStorage.removeItem('atk_apply_track_logic');

  //const modal = document.querySelector('[data-atk-booking-page]');

  //if (!modal) return;
  //if (modal){
   // applyTrackTimeLogic(modal);
  //}

  const urlTrack = new URLSearchParams(window.location.search).get('page');

      if (!urlTrack) {
           modal.hidden = false;
          applyTrackTimeLogic(modal);

           console.log('[ATK] Track timing applied on Services page');
      }

 
});

  
})();
