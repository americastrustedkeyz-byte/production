{
    'name': 'ATK Vehicle Flow',
    'version': '1.0',
    "depends": [
        "website",
        "website_appointment",
        "website_appointment_sale",
        "website_sale",
        "sale"
    ],
    "data": [
        "views/appointment_thank_you_redirect.xml",
        #"views/assets.xml",
    ],
    'assets': {
        'web.assets_frontend': [
            'atk_vehicle_flow/static/src/js/atk_hash_router.js',
            'atk_vehicle_flow/static/src/js/atk_after_booking_redirect.js',
        ],
    },
    'installable': True,
}
