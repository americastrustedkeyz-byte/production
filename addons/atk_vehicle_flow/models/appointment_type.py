from odoo import models

class AppointmentType(models.Model):
    _inherit = "appointment.type"

    def _get_available_slots(self, *args, **kwargs):
        slots = super()._get_available_slots(*args, **kwargs)

        for slot in slots:
            # If already booked, mark but DO NOT remove
            if slot.get("is_booked"):
                slot["available"] = False
                slot["disabled"] = True
            else:
                slot["available"] = True

        return slots
