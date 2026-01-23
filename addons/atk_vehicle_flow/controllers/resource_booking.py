from odoo import http
from odoo.http import request

class ATKResourceBookingController(http.Controller):

    @http.route(
        '/book/vehicle-onboarding/slots',
        type='json',
        auth='public',
        website=True
    )
    def booking_slots(self, booking_type_id, **kw):
        BookingType = request.env['resource.booking.type'].sudo()
        booking_type = BookingType.browse(int(1))

        if not booking_type.exists():
            return {
                'error': 'Invalid booking type'
            }

        # ✅ OCA OFFICIAL SLOT GENERATOR
        slots = booking_type._slots_()

        result = []

        for slot in slots:
            result.append({
                'start': slot.get('start'),
                'end': slot.get('end'),
                'available': slot.get('available', True),
                'resource_ids': slot.get('resource_ids', []),
            })

        return {
            'booking_type': booking_type.name,
            'slot_duration': booking_type.slot_duration,
            'slots': result,
        }
