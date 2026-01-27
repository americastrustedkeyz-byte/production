/* ======================================================
   ATK GLOBAL STATE (runs before all modals)
   ====================================================== */

(function () {
  'use strict';

  const path = window.location.pathname;

if (
  path.startsWith('/my') ||
  path.startsWith('/web') ||
  path.startsWith('/login')
) {
  return;
}


  window.ATK_STATE = {
    urlResetActive:
      new URLSearchParams(window.location.search).get('reset') === 'open_vehicle_modal',

    bookingTrack:
      new URLSearchParams(window.location.search).get('track') || null
  };

  console.log('[ATK] Global state initialized →', window.ATK_STATE);
})();
