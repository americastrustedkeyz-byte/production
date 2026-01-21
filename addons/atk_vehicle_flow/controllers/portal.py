from odoo import http
from odoo.http import request

class AtkPortalController(http.Controller):

    @http.route(['/my/vehicle-reports'], type='http', auth='user', website=True)
    def portal_vehicle_reports(self):
        reports = request.env['atk.vehicle.report'].search([
            ('user_id', '=', request.env.user.id)
        ])

        return request.render(
            'atk_vehicle_flow.portal_vehicle_reports',
            {'reports': reports}
        )

    @http.route(
        ['/my/vehicle-reports/<int:report_id>'],
        type='http',
        auth='user',
        website=True
    )
    def portal_vehicle_report_detail(self, report_id):
        report = request.env['atk.vehicle.report'].browse(report_id)

        if report.user_id.id != request.env.user.id:
            return request.redirect('/my')

        return request.render(
            'atk_vehicle_flow.portal_vehicle_report_detail',
            {'report': report}
        )
