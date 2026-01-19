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
    });
  });

})();
