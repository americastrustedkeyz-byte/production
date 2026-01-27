from odoo import models, fields, api

class AtkReport(models.Model):
    _name = 'atk.report'
    _description = 'Vehicle Transaction Report'
    _inherit = ['mail.thread', 'mail.activity.mixin']

    name = fields.Char(string="Reference", required=True, copy=False, readonly=True, index=True, default=lambda self: 'New')
    user_id = fields.Many2one('res.users', string='Customer', default=lambda self: self.env.user, readonly=True)
    state = fields.Selection([
        ('draft', 'Draft'),
        ('approved', 'Approved'),
    ], string='Status', default='draft', tracking=True)

    # Required Fields
    status = fields.Char("Status")
    key_type = fields.Char("Key Type")
    make = fields.Char("Make")
    model = fields.Char("Model")
    year = fields.Char("Year")
    vehicle_type = fields.Char("Vehicle Type")
    price = fields.Float("Price")
    battery = fields.Char("Battery")
    vehicle_info = fields.Text("Vehicle Info")
    donation = fields.Float("Donation")

    @api.model_create_multi
    def create(self, vals_list):
        for vals in vals_list:
            if vals.get('name', 'New') == 'New':
                vals['name'] = self.env['ir.sequence'].next_by_code('atk.report') or 'New'
        return super().create(vals_list)

    def action_approve(self):
        self.write({'state': 'approved'})

    def action_delete(self):
        self.unlink()
