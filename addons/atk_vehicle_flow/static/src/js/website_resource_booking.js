(function () {
  function fetchSlots(container) {
    const bookingTypeId = container.dataset.bookingTypeId;

    fetch('/book/vehicle-onboarding/slots', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'call',
        params: {
          booking_type_id: bookingTypeId,
        },
        id: Date.now(),
      }),
    })
      .then(res => res.json())
      .then(data => renderSlots(container, data.result))
      .catch(err => {
        console.error('[ATK SLOT ERROR]', err);
        container.innerHTML =
          '<div class="text-danger">Failed to load slots.</div>';
      });
  }

  function renderSlots(container, data) {
    container.innerHTML = '';

    if (!data.slots || !data.slots.length) {
      container.innerHTML =
        '<div class="text-muted">No slots available.</div>';
      return;
    }

    data.slots.forEach(slot => {
      const btn = document.createElement('button');
      btn.classList.add('atk-slot');

      if (slot.available) {
        btn.classList.add('atk-slot-available');
        btn.onclick = () => {
          console.log('[ATK SLOT SELECTED]', slot);
          alert(`Selected slot: ${slot.start}`);
        };
      } else {
        btn.classList.add('atk-slot-booked');
        btn.disabled = true;
      }

      btn.innerText = formatSlot(slot.start, slot.end);
      container.appendChild(btn);
    });
  }

  function formatSlot(start, end) {
    return `${start.slice(11, 16)} – ${end.slice(11, 16)}`;
  }

  document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('atk-slot-container');
    if (container) {
      fetchSlots(container);
    }
  });
})();
