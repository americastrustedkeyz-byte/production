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
        """
        Backend-aware slot fetcher using OCA resource_booking.
        Returns computed slots exactly as Odoo sees them.
        """

        BookingType = request.env['resource.booking.type'].sudo()
        booking_type = BookingType.browse(int(1))

        if not booking_type.exists():
            return {
                "error": "Booking type not found"
            }

        # OCA core slot computation (calendar + duration + holidays + bookings)
        slots = booking_type._get_available_slots()

        # Return RAW slots first (important for debugging)
        return {
            "booking_type": booking_type.name,
            "total_slots": len(slots),
            "slots": slots,
        }
