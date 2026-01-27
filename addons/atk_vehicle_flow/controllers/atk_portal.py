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

        # Replicate original redirect logic including URL parameters
        query_string = request.httprequest.query_string.decode()
        redirect_url = "/appointment/1"
        if query_string:
            redirect_url += f"?{query_string}"
            
        return request.redirect(redirect_url)

    # 2. DISPLAY LIST OF REPORTS IN PORTAL
    @http.route(['/my/atk_reports', '/my/atk_reports/page/<int:page>'], type='http', auth="user", website=True)
    def portal_my_atk_reports(self, page=1, **kw):
        values = self._prepare_portal_layout_values()
        AtkReport = request.env['atk.report']
        
        # Domain to restrict to the logged-in user
        domain = [('user_id', '=', request.env.user.id)]
        
        # REQUIRED: Count for the portal sidebar/layout
        reports_count = AtkReport.sudo().search_count(domain)
       
        # Fetch the records
        reports = AtkReport.sudo().search(domain)
        
        values.update({
            'reports': reports,
            'reports_count': reports_count, # Added to prevent 500 error
            'page_name': 'atk_report',
        })
        return request.render("atk_vehicle_flow.portal_my_atk_reports_list", values)

    # 3. DISPLAY INDIVIDUAL REPORT DETAIL
    @http.route(['/my/atk_report/<int:report_id>'], type='http', auth="user", website=True)
    def portal_atk_report_detail(self, report_id, **kw):
        # Security check: Ensure report exists and belongs to the user
        report = request.env['atk.report'].sudo().browse(report_id)
        
        if not report.exists() or report.user_id.id != request.env.user.id:
            return request.redirect('/my')
            
        return request.render("atk_vehicle_flow.portal_atk_report_form", {'report': report})
