(function () {
  // Run ONLY on appointment confirmation page
  if (!document.querySelector('.o_appointment_confirmation')) return;

  console.log('[ATK] Appointment confirmation detected');

  const params = new URLSearchParams(window.location.search);

  // Track is passed earlier in your flow (standard / priority)
  const track = params.get('track') || 'standard';

  // Delay slightly so user sees confirmation
  setTimeout(function () {
    if (track === 'priority') {
      window.location.href = '/atk/report/checkout-priority';
    } else {
      window.location.href = '/atk/report/checkout?track=standard';
    }
  }, 1500);
})();
