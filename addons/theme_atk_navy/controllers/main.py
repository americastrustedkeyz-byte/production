from odoo import http
from odoo.http import request
from datetime import datetime
import pytz


class ATKLaunchController(http.Controller):

    def _launch_is_open(self):
        """Check if launch date has passed (USA time)"""
        usa_tz = pytz.timezone("America/New_York")
        now = datetime.now(usa_tz)

        launch_dt = usa_tz.localize(
            datetime(2026, 1, 19, 0, 1, 0)
        )
        return now >= launch_dt

    def _is_admin(self):
        user = request.env.user
        return user.has_group("base.group_user")

    @http.route("/", type="http", auth="public", website=True)
    def atk_home_router(self, **kw):
        # If launch is open → everyone sees homepage
        if self._launch_is_open():
            return request.render("theme_atk_navy.atk_homepage")

        # Before launch
        if self._is_admin():
            # Logged-in admin/internal user sees full site
            return request.render("theme_atk_navy.atk_homepage")

        # Public users see countdown
        return request.render("theme_atk_navy.atk_countdown")