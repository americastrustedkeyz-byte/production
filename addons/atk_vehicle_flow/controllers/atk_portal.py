from odoo import http
from odoo.http import request
from odoo.addons.portal.controllers.portal import CustomerPortal

class AtkReportPortal(CustomerPortal):

    # 1. HANDLE FORM SUBMISSION & REDIRECT
    @http.route('/atk/report/submit', type='http', auth="user", methods=['POST'], website=True)
    def atk_report_submit(self, **post):
        # Save the report data to the database
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

        # Replicate your original redirect logic including URL parameters
        query_string = request.httprequest.query_string.decode()
        redirect_url = "/appointment/1"
        if query_string:
            redirect_url += f"?{query_string}"
            
        return request.redirect(redirect_url)

    # 2. DISPLAY LIST OF REPORTS IN PORTAL
    @http.route(['/my/atk_reports', '/my/atk_reports/page/<int:page>'], type='http', auth="user", website=True)
    def portal_my_atk_reports(self, page=1, **kw):
        values = self._prepare_portal_layout_values()
        # Search for reports belonging to the logged-in user
        reports = request.env['atk.report'].search([('user_id', '=', request.env.user.id)])
        
        values.update({
            'reports': reports,
            'page_name': 'atk_report',
        })
        return request.render("your_module_name.portal_my_atk_reports_list", values)

    # 3. DISPLAY INDIVIDUAL REPORT DETAIL
    @http.route(['/my/atk_report/<int:report_id>'], type='http', auth="user", website=True)
    def portal_atk_report_detail(self, report_id, **kw):
        report = request.env['atk.report'].browse(report_id)
        # Security check: Ensure report exists and belongs to the user
        if not report.exists() or report.user_id != request.env.user:
            return request.redirect('/my')
            
        return request.render("your_module_name.portal_atk_report_form", {'report': report})
