from odoo import http
from odoo.http import request
from datetime import datetime
import pytz


class ATKLaunchController(http.Controller):

    def _launch_is_open(self):
        usa_tz = pytz.timezone("America/New_York")
        now = datetime.now(usa_tz)
        launch_dt = usa_tz.localize(datetime(2026, 1, 19, 0, 1, 0))
        return now >= launch_dt

    def _is_admin(self):
        return request.env.user.has_group("base.group_user")

    @http.route('/', type='http', auth='public', website=True, sitemap=False)
    def atk_home_router(self, **kw):

        if self._launch_is_open():
            return request.render("theme_atk_navy.atk_homepage")

        if self._is_admin():
            return request.render("theme_atk_navy.atk_homepage")

        return request.render("theme_atk_navy.atk_countdown")
    
    # restart trigger