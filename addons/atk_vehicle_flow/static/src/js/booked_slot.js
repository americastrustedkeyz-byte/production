/** @odoo-module **/

import { registry } from "@web/core/registry";

registry.category("appointment.slot").add("atk_slot_renderer", {
    apply(slotEl, slotData) {
        if (slotData.atk_state === "booked") {
            slotEl.classList.add("atk-slot-booked");
            slotEl.setAttribute("aria-disabled", "true");
            slotEl.style.pointerEvents = "none";
        }

        if (slotData.atk_state === "available") {
            slotEl.classList.add("atk-slot-available");
        }
    },
});
