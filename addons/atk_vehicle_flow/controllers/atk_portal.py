from odoo import http
from odoo.http import request
from odoo.addons.portal.controllers.portal import CustomerPortal


class AtkReportPortal(CustomerPortal):

    # -----------------------------------------------------
    # PORTAL HOME — FORCE REPORT COUNTER TO LOAD
    # -----------------------------------------------------
    def home(self, **kw):
        """
        This method is REQUIRED so Odoo knows that
        'reports_count' must be computed and rendered.
        """
        response = super().home(**kw)

        # Force Odoo to request our custom counter
        self._prepare_home_portal_values(['reports_count'])

        return response

    # -----------------------------------------------------
    # SAFE: Extend portal counters (NO crash risk)
    # -----------------------------------------------------
    def _prepare_home_portal_values(self, counters):
        values = super()._prepare_home_portal_values(counters)

        if 'reports_count' in counters:
            values['reports_count'] = request.env['atk.report'].sudo().search_count([
                ('user_id', '=', request.env.user.id)
            ])

        return values

    # -----------------------------------------------------
    # 1. FORM SUBMISSION → SAVE REPORT → REDIRECT
    # -----------------------------------------------------
    @http.route('/atk/report/submit', type='http', auth="user", methods=['POST'], website=True)
    def atk_report_submit(self, **post):

        request.env['atk.report'].sudo().create({
            'status': post.get('status'),
            'key_type': post.get('key_type'),
            'make': post.get('make'),
            'model': post.get('model'),
            'year': post.get('year'),
            'vehicle_type': post.get('vehicle_type'),
            'price': float(post.get('price') or 0),
            'battery': post.get('battery'),
            'vehicle_info': post.get('vehicle_info'),
            'donation': float(post.get('donation') or 0),
            'user_id': request.env.user.id,
        })

        # Preserve original redirect behavior
        query_string = request.httprequest.query_string.decode()
        redirect_url = "/appointment/1"
        if query_string:
            redirect_url += f"?{query_string}"

        return request.redirect(redirect_url)

    # -----------------------------------------------------
    # 2. REPORT LIST — /my/atk_reports
    # -----------------------------------------------------
    @http.route(['/my/atk_reports', '/my/atk_reports/page/<int:page>'],
                type='http', auth="user", website=True)
    def portal_my_atk_reports(self, page=1, **kw):

        values = self._prepare_home_portal_values(['reports_count'])

        reports = request.env['atk.report'].sudo().search([
            ('user_id', '=', request.env.user.id)
        ])

        values.update({
            'reports': reports,
            'page_name': 'atk_reports',
        })

        return request.render(
            "atk_vehicle_flow.portal_my_atk_reports_list",
            values
        )

    # -----------------------------------------------------
    # 3. REPORT DETAIL — /my/atk_report/<id>
    # -----------------------------------------------------
    @http.route('/my/atk_report/<int:report_id>',
                type='http', auth="user", website=True)
    def portal_atk_report_detail(self, report_id, **kw):

        report = request.env['atk.report'].sudo().browse(report_id)

        # Security: user can only access own reports
        if not report.exists() or report.user_id.id != request.env.user.id:
            return request.redirect('/my')

        return request.render(
            "atk_vehicle_flow.portal_atk_report_form",
            {'report': report}
        )
