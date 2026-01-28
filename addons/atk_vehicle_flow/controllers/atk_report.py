from odoo import http
from odoo.http import request
from werkzeug.utils import redirect

class AtkReportController(http.Controller):

    @http.route(
        '/atk/report/checkout',
        type='http',
        auth='user',          # 🔑 IMPORTANT
        website=True
    )
    def atk_report_checkout(self, **kwargs):

        # Force website sale order for logged-in user
        order = request.website.sale_get_order(force_create=True)

        # Safety: ensure order exists
        if not order:
            return redirect('/shop')

        # Clear cart (optional, but you wanted ONLY this product)
        order.order_line.unlink()

        # Fetch product SAFELY (sudo avoids portal restrictions)
        product = request.env.ref(
            'theme_atk_navy.atk_processing_fee',
            raise_if_not_found=False
        )

        if not product or not product.exists():
            return redirect('/shop')

        # Add product to cart (sudo ensures success)
        order.sudo()._cart_update(
            product_id=product.id,
            add_qty=1
        )

        # Redirect to cart
        return redirect('/shop/cart')
