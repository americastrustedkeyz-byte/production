from odoo import http
from odoo.http import request
from odoo.addons.portal.controllers.portal import CustomerPortal


class AtkReportPortal(CustomerPortal):

    # ---------------------------------------------------------
    # UTIL — SAFE FLOAT PARSER ($195 → 195.0)
    # ---------------------------------------------------------
    def _safe_float(self, value):
        try:
            if not value:
                return 0.0
            return float(
                str(value)
                .replace('$', '')
                .replace(',', '')
                .strip()
            )
        except (ValueError, TypeError):
            return 0.0

    # ---------------------------------------------------------
    # PORTAL COUNTER (Dashboard)
    # ---------------------------------------------------------
    def _prepare_home_portal_values(self, counters):
        values = super()._prepare_home_portal_values(counters)

        if 'reports_count' in counters:
            values['reports_count'] = request.env['atk.report'].sudo().search_count([
                ('user_id', '=', request.env.user.id)
            ])

        return values

    # ---------------------------------------------------------
    # FORM SUBMIT → CREATE REPORT → REDIRECT
    # ---------------------------------------------------------
    @http.route('/atk/report/submit', type='http', auth='user', methods=['POST'], website=True)
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
        redirect_url = '/appointment/1'
        if query_string:
            redirect_url += f'?{query_string}'

        return request.redirect(redirect_url)

    # ---------------------------------------------------------
    # REPORT LIST
    # ---------------------------------------------------------
    @http.route('/my/atk_reports', type='http', auth='user', website=True)
    def portal_my_atk_reports(self, **kw):

        values = self._prepare_home_portal_values(['reports_count'])

        reports = request.env['atk.report'].sudo().search([
            ('user_id', '=', request.env.user.id)
        ])

        values.update({
            'reports': reports,
            'page_name': 'atk_reports',
        })

        return request.render(
            'atk_vehicle_flow.portal_my_atk_reports_list',
            values
        )

    # ---------------------------------------------------------
    #REPORT DETAIL — THIS FIXES THE 404
    # ---------------------------------------------------------
    @http.route('/my/atk_report/<int:report_id>', type='http', auth='user', website=True)
    def portal_atk_report_detail(self, report_id, **kw):

        report = request.env['atk.report'].sudo().browse(report_id)

        if not report.exists():
            return request.redirect('/my')

        if report.user_id.id != request.env.user.id:
            return request.redirect('/my')

        return request.render(
            'atk_vehicle_flow.portal_atk_report_form',
            {
                'report': report,
                'page_name': 'atk_report_detail',
            }
        )
