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
    ],
    "data": [
        "views/booking_page.xml",
        "views/admin_activity_views.xml",
        #"views/booking_thank_you.xml",
    ],
     'qweb': [
        'views/portal_templates.xml',
        'views/portal_activity_list.xml',
    ],
    'assets': {
        'web.assets_frontend': [
            #'atk_vehicle_flow/static/src/js/website_resource_booking.js',
            'atk_vehicle_flow/static/src/scss/booked_slot.scss',
            'atk_vehicle_flow/static/src/js/booked_slot.js',
            'atk_vehicle_flow/static/src/js/atk_hash_router.js',
            'atk_vehicle_flow/static/src/js/atk_after_booking_redirect.js',
            'atk_vehicle_flow/static/src/js/atk_vehicle_activity_log.js',
        ],
    },
    'installable': True,
}
