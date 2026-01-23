(function () {
    const SLOT_PARENT_SELECTOR = '.o_slots_list.row.px-0';

    // CHANGE THIS if Odoo uses a different class for booked slots
    const BOOKED_SLOT_SELECTOR = '.o_slot.booked, .o_slot.o_booked';

    function updateSlotCounter() {
        const slotParent = document.querySelector(SLOT_PARENT_SELECTOR);
        if (!slotParent) return;

        // Remove old counter if exists
        let counter = slotParent.querySelector('.atk-slot-counter');
        if (!counter) {
            counter = document.createElement('div');
            counter.className = 'atk-slot-counter';
            slotParent.appendChild(counter);
        }

        const bookedSlots = slotParent.querySelectorAll(BOOKED_SLOT_SELECTOR).length;

        if (bookedSlots === 0) {
            counter.style.display = 'none';
            return;
        }

        counter.style.display = 'block';
        counter.innerHTML =
            bookedSlots === 1
                ? '<strong>1 slot is booked</strong>'
                : `<strong>${bookedSlots} slots are booked</strong>`;
    }

    // Observe slot changes (day selection, refresh, re-render)
    const observer = new MutationObserver(() => {
        updateSlotCounter();
    });

    function startObserver() {
        const slotParent = document.querySelector(SLOT_PARENT_SELECTOR);
        if (!slotParent) return;

        observer.disconnect();
        observer.observe(slotParent, {
            childList: true,
            subtree: true,
        });

        updateSlotCounter();
    }

    // Retry until slots exist (Odoo renders async)
    const initInterval = setInterval(() => {
        const slotParent = document.querySelector(SLOT_PARENT_SELECTOR);
        if (slotParent) {
            clearInterval(initInterval);
            startObserver();
        }
    }, 300);
})();
