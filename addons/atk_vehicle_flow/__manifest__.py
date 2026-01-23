{
    'name': 'ATK Vehicle Flow',
    'version': '1.0',
    "depends": [
        "website",
        "appointment",
        "website_appointment",
        "website_appointment_sale",
        "website_sale",
        "sale"
    ],
    "data": [
        "views/website_resource_booking.xml",
        #"views/appointment_templates.xml",
        #"views/appointment_thank_you_redirect.xml",
    ],
    'assets': {
        'web.assets_frontend': [
            'atk_vehicle_flow/static/src/scss/booked_slot.scss',
            'atk_vehicle_flow/static/src/js/booked_slot.js',
            'atk_vehicle_flow/static/src/js/atk_hash_router.js',
            'atk_vehicle_flow/static/src/js/atk_after_booking_redirect.js',
            'atk_vehicle_flow/static/src/js/website_resource_booking.js',
        ],
    },
    'installable': True,
}
