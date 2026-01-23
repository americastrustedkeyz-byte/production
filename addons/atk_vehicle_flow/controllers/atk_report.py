from odoo import http
from odoo.http import request
from werkzeug.utils import redirect
from urllib.parse import urlencode

class AtkReportController(http.Controller):

    @http.route('/atk/report/checkout', type='http', auth='public', website=True)
    def atk_report_checkout(self, **kwargs):

        #If public → redirect to login WITH return URL
        if request.env.user._is_public():
            query = urlencode({
                'redirect': '/shop/cart',
                'track': kwargs.get('track', ''),
            })
            return redirect('/web/login?' + query)

        #Logged-in user
        order = request.website.sale_get_order(force_create=True)

        #Clean cart
        order.order_line.unlink()

        #Add ONLY the $5 product
        product = request.env.ref('theme_atk_navy.atk_processing_fee')

        order._cart_update(
            product_id=product.id,
            add_qty=1
        )

        #Redirect directly to cart
        return redirect('/shop/cart')
