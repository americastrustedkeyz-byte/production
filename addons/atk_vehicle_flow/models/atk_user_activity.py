# models/atk_user_activity.py
from odoo import models, fields

class ATKUserActivity(models.Model):
    _name = 'atk.user.activity'
    _description = 'User / Visitor Activity'
    _order = 'create_date desc'

    user_id = fields.Many2one('res.users', string='User')
    session_id = fields.Char(string='Session ID')
    page = fields.Char(string='Page')
    payload = fields.Json(string='Report Data')
    create_date = fields.Datetime(readonly=True)
