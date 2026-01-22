from odoo import http
from odoo.addons.appointment.controllers.main import AppointmentController
from odoo.http import request


class ATKAppointmentController(AppointmentController):

    @http.route('/appointment/slots', type='json', auth='public', website=True)
    def appointment_slots(self, **kwargs):
        response = super().appointment_slots(**kwargs)

        # response["slots"] is what populates the right-hand column
        for slot in response.get("slots", []):
            if slot.get("booked"):
                slot["atk_state"] = "booked"
                slot["disabled"] = True
            else:
                slot["atk_state"] = "available"

        return response
