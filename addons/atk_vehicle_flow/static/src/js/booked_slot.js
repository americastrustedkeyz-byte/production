/** @odoo-module **/

document.addEventListener("click", function (e) {
    const slot = e.target.closest(".o_appointment_slot");
    if (!slot) return;

    if (slot.dataset.available === "false") {
        e.preventDefault();
        e.stopPropagation();
    }
});
