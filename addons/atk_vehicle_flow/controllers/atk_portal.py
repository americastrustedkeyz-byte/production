from odoo import http
from odoo.http import request
from odoo.addons.portal.controllers.portal import CustomerPortal


class AtkReportPortal(CustomerPortal):

    # -----------------------------------------------------
    # SAFE: Portal dashboard counters (NO crash possible)
    # -----------------------------------------------------
    def _prepare_home_portal_values(self, counters):
        values = super()._prepare_home_portal_values(counters)

        # Only compute if requested by portal template
        if 'reports_count' in counters:
            values['reports_count'] = request.env['atk.report'].sudo().search_count([
                ('user_id', '=', request.env.user.id)
            ])

        return values

    # -----------------------------------------------------
    # SAFE FLOAT PARSER (handles $195, 1,250, etc.)
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
    # 1. FORM SUBMISSION → SAVE REPORT → REDIRECT
    # -----------------------------------------------------
    @http.route('/atk/report/submit', type='http', auth="user", methods=['POST'], website=True)
    def atk_report_submit(self, **post):

        # HARD FAIL SAFETY: user must be logged in
        if not request.env.user or request.env.user._is_public():
            return request.redirect('/web/login')

        # Create report
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

        # Preserve existing URL params (track, reset, etc.)
        query_string = request.httprequest.query_string.decode()
        redirect_url = "/appointment/1"
        if query_string:
            redirect_url += f"?{query_string}"

        return request.redirect(redirect_url)

    # -----------------------------------------------------
    # 2. PORTAL LIST VIEW (/my/atk_reports)
    # -----------------------------------------------------
    @http.route(
        ['/my/atk_reports', '/my/atk_reports/page/<int:page>'],
        type='http',
        auth="user",
        website=True
    )
    def portal_my_atk_reports(self, page=1, **kw):

        values = self._prepare_home_portal_values(['reports_count'])

        reports = request.env['atk.report'].sudo().search([
            ('user_id', '=', request.env.user.id)
        ], order='create_date desc')

        values.update({
            'reports': reports,
            'page_name': 'atk_reports',
        })

        return request.render(
            "atk_vehicle_flow.portal_my_atk_reports_list",
            values
        )

    # -----------------------------------------------------
    # 3. PORTAL DETAIL VIEW (/my/atk_report/<id>)
    # -----------------------------------------------------
    @http.route(
        '/my/atk_report/<int:report_id>',
        type='http',
        auth="user",
        website=True
    )
    def portal_atk_report_detail(self, report_id, **kw):

        report = request.env['atk.report'].sudo().browse(report_id)

        # SECURITY: user can only view own report
        if not report.exists() or report.user_id.id != request.env.user.id:
            return request.redirect('/my')

        return request.render(
            "atk_vehicle_flow.portal_atk_report_form",
            {'report': report}
        )
