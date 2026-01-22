(function () {
  /*======================================================
     ATK – Appointment Slot Tracker (SCOPED SAFELY)
     Runs ONLY on appointment booking pages
     ====================================================== */

  const isAppointmentPage =
    window.location.pathname.startsWith("/calendar/") ||
    document.querySelector(".o_appointment_time_slot");

  //EXIT IMMEDIATELY if not appointment page
  if (!isAppointmentPage) return;

  console.log("[ATK] Appointment slot tracker active");

  const STORAGE_KEY = "atk_booked_slots";

  function getBooked() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "[]");
  }

  function saveBooked(slotText) {
    const booked = getBooked();
    if (!booked.includes(slotText)) {
      booked.push(slotText);
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(booked));
    }
  }

  function markBookedSlots() {
    const booked = getBooked();
    if (!booked.length) return;

    document.querySelectorAll(".o_appointment_time_slot").forEach(slot => {
      const text = slot.innerText.trim();
      if (booked.includes(text)) {
        slot.classList.add("atk-slot-booked");
      }
    });
  }

  // Capture click BEFORE Odoo navigates
  document.addEventListener("click", function (e) {
    const slot = e.target.closest(".o_appointment_time_slot");
    if (!slot) return;

    saveBooked(slot.innerText.trim());
  });

  // Observe only appointment DOM (not entire body)
  const calendarRoot =
    document.querySelector(".o_appointment_booking") || document.body;

  const observer = new MutationObserver(markBookedSlots);
  observer.observe(calendarRoot, {
    childList: true,
    subtree: true,
  });

})();
