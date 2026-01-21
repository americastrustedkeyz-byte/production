# atk_vehicle_flow/models/vehicle_report.py
from odoo import models, fields

class AtkVehicleReport(models.Model):
    _name = 'atk.vehicle.report'
    _description = 'ATK Vehicle Report'
    _order = 'create_date desc'

    user_id = fields.Many2one(
        'res.users',
        string='Customer',
        required=True,
        ondelete='cascade'
    )

    booking_track = fields.Selection(
        [('standard', 'Standard'), ('priority', 'Skip-The-Line')],
        required=True
    )

    key_type = fields.Char()
    vehicle_make = fields.Char()
    vehicle_model = fields.Char()
    vehicle_year = fields.Char()
    vehicle_type = fields.Char()
    price = fields.Char()

    battery_health = fields.Boolean()
    vehicle_info = fields.Boolean()

    create_date = fields.Datetime(readonly=True)
