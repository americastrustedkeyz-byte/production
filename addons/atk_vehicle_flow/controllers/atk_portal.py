from odoo import http
from odoo.http import request
from odoo.addons.portal.controllers.portal import CustomerPortal

class AtkReportPortal(CustomerPortal):

    # FIX: This method ensures 'reports_count' is always available in the portal layout
    def _prepare_portal_layout_values(self):
        # Call the original method to get all standard portal counts (PO count, Invoice count, etc.)
        values = super(AtkReportPortal, self)._prepare_portal_layout_values()
        
        # Calculate your specific report count safely and add it to the dictionary
        report_count = request.env['atk.report'].sudo().search_count([('user_id', '=', request.env.user.id)])
        values['reports_count'] = report_count
        return values

    # 1. HANDLE FORM SUBMISSION & REDIRECT (Saves report and redirects to appointment page)
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

    # 2. DISPLAY LIST OF REPORTS IN PORTAL (The /my/atk_reports page)
    @http.route(['/my/atk_reports', '/my/atk_reports/page/<int:page>'], type='http', auth="user", website=True)
    def portal_my_atk_reports(self, page=1, **kw):
        # This calls the _prepare_portal_layout_values method automatically via inheritance
        values = self._prepare_portal_layout_values() 
        AtkReport = request.env['atk.report']
        
        domain = [('user_id', '=', request.env.user.id)]
        reports = AtkReport.sudo().search(domain)
        
        values.update({
            'reports': reports,
            'page_name': 'atk_report',
        })
        return request.render("atk_vehicle_flow.portal_my_atk_reports_list", values)

    # 3. DISPLAY INDIVIDUAL REPORT DETAIL (The /my/atk_report/<int:report_id> page)
    @http.route(['/my/atk_report/<int:report_id>'], type='http', auth="user", website=True)
    def portal_atk_report_detail(self, report_id, **kw):
        report = request.env['atk.report'].sudo().browse(report_id)
        
        if not report.exists() or report.user_id.id != request.env.user.id:
            return request.redirect('/my')
            
        return request.render("atk_vehicle_flow.portal_atk_report_form", {'report': report})
