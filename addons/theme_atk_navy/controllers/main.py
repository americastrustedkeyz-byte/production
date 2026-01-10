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

    def _view_exists(self, xml_id):
        return bool(
            request.env["ir.ui.view"].sudo().search(
                [("key", "=", xml_id)], limit=1
            )
        )

    @http.route("/", type="http", auth="public", website=True, sitemap=False)
    def atk_home_router(self, **kw):
        website = request.website or request.env["website"].get_current_website()

        # 🚨 SAFETY GUARD: during theme install
        if not self._view_exists("theme_atk_navy.atk_homepage"):
            # Fall back to default Odoo homepage
            return request.redirect("/website")

        if self._launch_is_open() or self._is_admin():
            return request.render(
                "theme_atk_navy.atk_homepage",
                {"website": website},
            )

        return request.render(
            "theme_atk_navy.atk_countdown",
            {"website": website},
        )
