/* ======================================================
   ATK GLOBAL STATE (runs before all modals)
   ====================================================== */

(function () {
  'use strict';

  const _setText = Object.getOwnPropertyDescriptor(
    HTMLElement.prototype,
    'textContent'
  );

  Object.defineProperty(HTMLElement.prototype, 'textContent', {
    set(value) {
      if (this == null) return;
      try {
        _setText.set.call(this, value);
      } catch (e) {
        console.warn('[ATK] textContent guard prevented crash', this);
      }
    },
    get() {
      return _setText.get.call(this);
    }
  });

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
