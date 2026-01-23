document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('atk-booking-calendar');
  if (!container) return;

  const bookingTypeId = container.dataset.bookingTypeId;

  fetch('/book/vehicle-onboarding/slots', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ booking_type_id: bookingTypeId }),
  })
  .then(r => r.json())
  .then(slots => {
    slots.forEach(slot => {
      const btn = document.createElement('button');
      btn.textContent = slot.display;
      btn.disabled = slot.booked;

      btn.className = slot.booked
        ? 'btn btn-secondary m-1'
        : 'btn btn-success m-1';

      container.appendChild(btn);
    });
  });
});
