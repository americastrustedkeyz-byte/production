{
    'name': 'ATK Vehicle Flow',
    'version': '1.0',
    "depends": [
        "website",
        "appointment",
        "website_appointment",
        "website_appointment_sale",
        "website_sale",
        "sale",
        "base",
        "portal",
        "mail",
    ],
    "data": [
        "views/booking_page.xml",
        #"views/admin_activity_views.xml",
        "views/booking_thank_you.xml",
        'security/atk_report_rules.xml',
        'security/ir.model.access.csv',
        'data/sequence.xml', # Add an ir.sequence for the report name
        'views/atk_report_views.xml', # Standard backend form/list
        'views/atk_portal_templates.xml',
    ],
    #'qweb': [
        #'views/portal_templates.xml',
        #'views/portal_activity_list.xml',
        #'views/portal_spinner_override.xml',
    #],
    'assets': {
        'web.assets_frontend': [
            #'atk_vehicle_flow/static/src/js/website_resource_booking.js',
            'atk_vehicle_flow/static/src/scss/booked_slot.scss',
            'atk_vehicle_flow/static/src/scss/atk_portal.scss',
            #'atk_vehicle_flow/static/src/scss/portal_fix.css',
            'atk_vehicle_flow/static/src/js/booked_slot.js',
            'atk_vehicle_flow/static/src/js/atk_hash_router.js',
            'atk_vehicle_flow/static/src/js/atk_after_booking_redirect.js',
            #'atk_vehicle_flow/static/src/js/atk_vehicle_activity_log.js',
            #'atk_vehicle_flow/static/src/js/portal_safe_guard.js',
            #'atk_vehicle_flow/static/src/js/portal_promise_guard.js',
            'atk_vehicle_flow/static/src/js/atk_report.js',
        ],
    },
    'installable': True,
}
