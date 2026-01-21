from odoo import http
from odoo.http import request
from werkzeug.utils import redirect
from urllib.parse import urlencode


class AtkReportController(http.Controller):

    @http.route('/atk/report/checkout', type='http', auth='public', website=True)
    def atk_checkout_standard(self, **kwargs):

        if request.env.user._is_public():
            query = urlencode({
                'redirect': '/atk/report/checkout',
                'track': 'standard',
            })
            return redirect('/web/login?' + query)

        order = request.website.sale_get_order(force_create=True)
        order.order_line.unlink()

        product = request.env.ref('theme_atk_navy.atk_processing_fee')  # $5
        order._cart_update(product_id=product.id, add_qty=1)

        return redirect('/shop/cart')


    @http.route('/atk/report/checkout-priority', type='http', auth='public', website=True)
    def atk_checkout_priority(self, **kwargs):

        if request.env.user._is_public():
            query = urlencode({
                'redirect': '/atk/report/checkout-priority',
            })
            return redirect('/web/login?' + query)

        order = request.website.sale_get_order(force_create=True)
        order.order_line.unlink()

        product = request.env.ref('theme_atk_navy.atk_priority_fee')  # $125
        order._cart_update(product_id=product.id, add_qty=1)

        return redirect('/shop/cart')
