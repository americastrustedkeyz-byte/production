from odoo.addons.appointment.controllers.appointment import AppointmentController
from odoo.http import request

class CustomAppointmentController(AppointmentController):
    def _get_appointment_slots(self, appointment_type, **kwargs):
        # Call the original method to get standard slots
        res = super(CustomAppointmentController, self)._get_appointment_slots(appointment_type, **kwargs)
        
        # Modify the slot data to include "booked" information
        # Note: You may need to fetch calendar events that overlap with these slots
        for day in res.get('slots', []):
            for slot in day.get('slots', []):
                # Custom logic to check if this slot is actually booked
                # If Odoo's super() removed it, you may need to re-add it 
                # here with a flag like slot['is_booked'] = True
                pass
        return res
