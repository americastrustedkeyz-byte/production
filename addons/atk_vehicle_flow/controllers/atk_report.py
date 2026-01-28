from odoo import http
from odoo.http import request
from werkzeug.utils import redirect

class AtkReportController(http.Controller):

    @http.route(
        '/atk/report/checkout',
        type='http',
        auth='user',
        website=True
    )
    def atk_report_checkout(self, **kwargs):

        # Ensure website order
        order = request.website.sale_get_order(force_create=True)
        if not order:
            return redirect('/shop')

        # Clear cart (optional)
        order.order_line.unlink()

        # 🔑 FETCH PRODUCT TEMPLATE (NOT product.product)
        product_tmpl = request.env.ref(
            'theme_atk_navy.atk_processing_fee',
            raise_if_not_found=False
        )

        if not product_tmpl:
            return redirect('/shop')

        # Convert to template if record is product.product
        if product_tmpl._name == 'product.product':
            product_tmpl = product_tmpl.product_tmpl_id

        # Safety checks (portal-safe)
        if not product_tmpl.sale_ok:
            return redirect('/shop')

        # Add to cart using TEMPLATE
        order.sudo()._cart_update(
            product_id=product_tmpl.product_variant_id.id,
            add_qty=1
        )

        return redirect('/shop/cart')
