{
    'name': 'ATK Navy Theme',
    'description': "America's Trusted Key – Navy Standard Theme",
    'version': '18.0.1.0.0',
    'category': 'Theme/Corporate',
    'author': 'ATK',
    'license': 'LGPL-3',

    # 🔴 THIS LINE FIXES THE CRASH
    'depends': ['website'],

    'data': [
        'views/theme.xml',
        'views/layout.xml',
        'views/hero.xml',
    ],

    'assets': {
        'web.assets_frontend': [
            'theme_atk_navy/static/src/scss/atk_theme.scss',
        ],
    },

    'theme': True,
    'installable': True,
    'application': True,
}