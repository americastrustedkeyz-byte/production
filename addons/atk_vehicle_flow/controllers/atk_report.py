from odoo import http
from odoo.http import request
from werkzeug.utils import redirect
from urllib.parse import urlencode

class AtkReportController(http.Controller):

    @http.route('/atk/report/checkout', type='http', auth='public', website=True)
    def atk_report_checkout(self, **kwargs):
        track = kwargs.get('track', 'standard')

        # 🔒 Public user → login WITH return URL preserved
        if request.env.user._is_public():
            query = urlencode({
                'redirect': '/atk/report/checkout?track=%s' % track
            })
            return redirect('/web/login?' + query)

        # ✅ Logged-in user → ensure cart exists
        order = request.website.sale_get_order(force_create=True)

        # 🔥 HARD RESET cart (guaranteed)
        order.order
        order.order_line.unlink()

        # ✅ Add ONLY the $5 product
        product = request.env.ref('theme_atk_navy.atk_processing_fee')

        order._cart_update(
            product_id=product.id,
            add_qty=1
        )

        # ✅ STABLE redirect (never 404)
        return redirect('/shop/checkout')
