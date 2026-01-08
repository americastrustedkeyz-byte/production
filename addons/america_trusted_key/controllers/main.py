from odoo import http
from odoo.http import request
from datetime import datetime

class ATKHome(http.Controller):

    @http.route('/', auth='public', website=True)
    def atk_home(self):
        param = request.env['ir.config_parameter'].sudo()
        launch_str = param.get_param('atk.launch_datetime')

        if not launch_str:
            return request.render('theme_atk_navy.homepage_admin')

        launch_dt = datetime.strptime(launch_str, "%Y-%m-%d %H:%M:%S")
        now = datetime.now()

        is_admin = request.env.user.has_group('base.group_system')

        if now < launch_dt and not is_admin:
            return request.render(
                'theme_atk_navy.countdown_page',
                {'launch_datetime': launch_str}
            )

        return request.render('theme_atk_navy.homepage_admin')