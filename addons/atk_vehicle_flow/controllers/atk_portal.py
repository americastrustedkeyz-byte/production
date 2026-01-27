from odoo import http
from odoo.http import request
from odoo.addons.portal.controllers.portal import CustomerPortal


class AtkReportPortal(CustomerPortal):

    # -----------------------------------------------------
    # Portal dashboard counters (SAFE)
    # -----------------------------------------------------
    def _prepare_home_portal_values(self, counters):
        values = super()._prepare_home_portal_values(counters)

        if 'reports_count' in counters:
            values['reports_count'] = request.env['atk.report'].sudo().search_count([
                ('user_id', '=', request.env.user.id)
            ])

        return values

    # -----------------------------------------------------
    # SAFE FLOAT PARSER (FIXES $195 CRASH)
    # -----------------------------------------------------
    def _safe_float(self, value):
        try:
            return float(
                str(value)
                .replace('$', '')
                .replace(',', '')
                .strip()
            )
        except (ValueError, TypeError):
            return 0.0

    # -----------------------------------------------------
    # FORM SUBMISSION
    # -----------------------------------------------------
    @http.route('/atk/report/submit', type='http', auth="user", methods=['POST'], website=True)
    def atk_report_submit(self, **post):

        if not request.env.user or request.env.user._is_public():
            return request.redirect('/web/login')

        request.env['atk.report'].sudo().create({
            'status': post.get('status') or '',
            'key_type': post.get('key_type') or '',
            'make': post.get('make') or '',
            'model': post.get('model') or '',
            'year': post.get('year') or '',
            'vehicle_type': post.get('vehicle_type') or '',
            'price': self._safe_float(post.get('price')),
            'battery': post.get('battery') or '',
            'vehicle_info': post.get('vehicle_info') or '',
            'donation': self._safe_float(post.get('donation')),
            'user_id': request.env.user.id,
        })

        query_string = request.httprequest.query_string.decode()
        redirect_url = "/appointment/1"
        if query_string:
            redirect_url += f"?{query_string}"

        return request.redirect(redirect_url)
