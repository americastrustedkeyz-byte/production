from odoo import http
from odoo.http import request

class ATKResourceBookingDebug(http.Controller):

    @http.route(
        '/book/vehicle-onboarding/slots',
        type='json',
        auth='public',
        website=True
    )
    def booking_slots(self, booking_type_id, **kw):
        booking_type = request.env['resource.booking.type'].sudo().browse(int(1))

        # DEBUG: expose model capabilities safely
        return {
            'id': booking_type.id,
            'name': booking_type.name,
            'methods': [
                m for m in dir(booking_type)
                if 'slot' in m or 'avail' in m or 'calendar' in m
            ],
        }
