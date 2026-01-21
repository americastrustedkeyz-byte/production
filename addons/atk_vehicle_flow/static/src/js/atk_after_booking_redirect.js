document.addEventListener('DOMContentLoaded', function () {
  const marker = document.getElementById('atk-appointment-confirmed');
  if (!marker) return;

  // Prevent repeat execution
  if (marker.dataset.redirected) return;
  marker.dataset.redirected = '1';

  // Extract track safely (if any)
  const params = new URLSearchParams(window.location.search);
  const track = params.get('track') || 'standard';

  setTimeout(function () {
    window.location.href =
      `/atk/report/checkout?track=${encodeURIComponent(track)}`;
  }, 1500);
});
