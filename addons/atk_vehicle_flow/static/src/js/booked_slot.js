(function () {
  const STORAGE_KEY = "atk_booked_slots";

  function saveBookedSlot(slotText) {
    const booked = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "[]");
    if (!booked.includes(slotText)) {
      booked.push(slotText);
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(booked));
    }
  }

  function markBookedSlots() {
    const booked = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "[]");

    document.querySelectorAll(".o_appointment_time_slot").forEach(slot => {
      const text = slot.innerText.trim();
      if (booked.includes(text)) {
        slot.classList.add("atk-slot-booked");
      }
    });
  }

  // Capture click BEFORE booking
  document.addEventListener("click", function (e) {
    const slot = e.target.closest(".o_appointment_time_slot");
    if (!slot) return;

    const text = slot.innerText.trim();
    saveBookedSlot(text);
  });

  // Reapply after DOM updates
  const observer = new MutationObserver(markBookedSlots);
  observer.observe(document.body, { childList: true, subtree: true });

})();
