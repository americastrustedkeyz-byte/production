{
    "name": "ATK Navy Theme",
    "version": "18.0.1.0.0",
    "category": "Theme/Corporate",
    "depends": ["website"],
    "data": [
        'views/layout.xml',
        'views/navbar.xml',
        'views/homepage.xml',
        'views/pagetemplate.xml',
        'views/atk_booking_page.xml',
    ],
    'assets': {
        'web.assets_frontend': [
            'theme_atk_navy/static/src/scss/atk_theme.scss',
            'theme_atk_navy/static/src/scss/atk_countdown.scss',
            'theme_atk_navy/static/src/scss/components/_buttons.scss',
            'theme_atk_navy/static/src/js/atk_countdown.js',
            'theme_atk_navy/static/src/js/atk_navbar.js',
        ],
    },
    "theme": True,
    "installable": True,
}
