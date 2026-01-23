document.addEventListener('DOMContentLoaded', () => {
  setTimeout(loadSlots, 300);
});

function loadSlots() {
  fetch('/book/vehicle-onboarding/slots', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      method: 'call',
      params: { booking_type_id: 1 },
      id: Date.now(),
    }),
  })
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById('atk-slots');
      document.getElementById('atk-slots-loader').remove();
      container.classList.remove('d-none');

      if (!data.result || !data.result.length) {
        container.innerHTML = '<p>No slots available.</p>';
        return;
      }

      data.result.forEach(slot => {
        const div = document.createElement('div');
        div.className = 'col-md-3 mb-3';

        const btn = document.createElement('button');
        btn.className = 'btn w-100';
        btn.textContent = slot.label;

        if (slot.available) {
          btn.classList.add('btn-success');
          btn.onclick = () => selectSlot(slot);
        } else {
          btn.classList.add('btn-secondary');
          btn.disabled = true;
        }

        div.appendChild(btn);
        container.appendChild(div);
      });
    });
}

function selectSlot(slot) {
  console.log('Selected slot:', slot);
  alert(`Slot selected: ${slot.label}`);
}