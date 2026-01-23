from odoo import http
from odoo.http import request


class ATKVehicleBookingPage(http.Controller):

    @http.route(
        '/vehicle-onboarding/book',
        type='http',
        auth='public',
        website=True
    )
    def vehicle_onboarding_booking(self, **kw):
        return request.render(
            'atk_vehicle_flow.atk_vehicle_booking_page',
            {}
        )
