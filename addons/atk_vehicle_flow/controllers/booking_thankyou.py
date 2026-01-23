from odoo import http
from odoo.http import request


class ATKBookingThankYou(http.Controller):

    @http.route(
        '/vehicle-booking/thank-you/<int:booking_id>',
        type='http',
        auth='public',
        website=True
    )
    def booking_thank_you(self, booking_id, **kw):
        booking = request.env['resource.booking'].sudo().browse(booking_id)

        if not booking.exists():
            return request.not_found()

        return request.render(
            'atk_vehicle_flow.atk_vehicle_booking_thank_you',
            {
                'booking': booking,
            }
        )
