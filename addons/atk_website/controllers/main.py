from odoo import http
from odoo.http import request
from datetime import datetime
import pytz


class ATKWebsiteController(http.Controller):

    def _launch_is_open(self):
        tz = pytz.timezone("America/New_York")
        now = datetime.now(tz)
        launch = tz.localize(datetime(2026, 1, 19, 0, 1, 0))
        return now >= launch

    def _is_admin(self):
        return request.env.user.has_group("base.group_user")

    @http.route("/", type="http", auth="public", website=True, sitemap=False)
    def atk_home(self, **kw):
        if self._launch_is_open() or self._is_admin():
            return request.render("atk_website.atk_homepage")

        return request.render("atk_website.atk_countdown")
