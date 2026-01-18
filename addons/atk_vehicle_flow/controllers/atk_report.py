from odoo import http
from odoo.http import request
from werkzeug.utils import redirect
from urllib.parse import urlencode


class AtkReportController(http.Controller):

    @http.route(
        '/atk/report/checkout',
        type='http',
        auth='public',
        website=True
    )
    def atk_report_checkout(self, **kwargs):
        """
        FLOW RULES:
        - Preserve ?track until checkout
        - Public users go to login and RETURN to vehicle page
        - Cart is created ONLY after authentication
        - Once cart is reached, track is discarded
        """

        track = kwargs.get('track', 'standard')

        #PUBLIC USER → LOGIN FIRST, RETURN TO VEHICLE PAGE
        if request.website.is_public_user():
            return redirect(
                '/web/login?' + urlencode({
                    #Return to the SAME page user came from
                    'redirect': request.httprequest.full_path
                })
            )

        #AUTHENTICATED USER → NOW CREATE CART
        order = request.website.sale_get_order(force_create=True)

        # Clean cart completely
        if order.order_line:
            order.order_line.unlink()

        # Add ONLY the $5 product
        product = request.env.ref(
            'theme_atk_navy.atk_processing_fee',
            raise_if_not_found=True
        )

        order._cart_update(
            product_id=product.id,
            add_qty=1,
            set_qty=1
        )

        #FLOW CONSUMED → NO TRACK PAST THIS POINT
        return redirect('/shop/cart')
