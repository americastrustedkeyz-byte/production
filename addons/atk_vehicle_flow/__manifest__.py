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
        "resource_booking",
        "web_calendar_slot_duration",
    ],
    "data": [
        "views/booking_page.xml",
        "views/booking_thank_you.xml",
    ],
    'assets': {
        'web.assets_frontend': [
            'atk_vehicle_flow/static/src/js/website_resource_booking.js',
            'atk_vehicle_flow/static/src/scss/booked_slot.scss',
            #'atk_vehicle_flow/static/src/js/booked_slot.js',
            'atk_vehicle_flow/static/src/js/atk_hash_router.js',
            'atk_vehicle_flow/static/src/js/atk_after_booking_redirect.js',
        ],
    },
    'installable': True,
}
