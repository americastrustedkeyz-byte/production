from odoo import http
from odoo.http import request
from odoo.addons.portal.controllers.portal import CustomerPortal


# =========================================
# ACTIVITY SAVE (PUBLIC + AUTHENTICATED)
# =========================================
class ATKActivityController(http.Controller):

    @http.route('/atk/activity/save', type='json', auth='public', website=True)
    def save_activity(self, **data):
        user = request.env.user
        is_public = user._is_public()

        request.env['atk.user.activity'].sudo().create({
            'user_id': False if is_public else user.id,
            'session_id': request.session.sid,
            'page': data.get('page'),
            'payload': data,
        })

        return {'status': 'ok'}


# =========================================
# PORTAL EXTENSION
# =========================================
class ATKPortal(CustomerPortal):

    def _prepare_home_portal_values(self, counters):
        values = super()._prepare_home_portal_values(counters)

        values['atk_activity_count'] = request.env['atk.user.activity'].sudo().search_count([
            ('user_id', '=', request.uid)
        ])

        return values

    @http.route('/my/activity', auth='user', website=True)
    def portal_activity(self):
        records = request.env['atk.user.activity'].sudo().search([
            ('user_id', '=', request.uid)
        ])

        return request.render(
            'atk_user_activity.portal_my_activity',
            {'records': records}
        )
