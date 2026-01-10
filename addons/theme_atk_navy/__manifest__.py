{
    'name': 'ATK Navy Theme',
    'version': '18.0.1.0.0',
    'category': 'Theme/Corporate',
    'author': 'ATK',
    'license': 'LGPL-3',

    'depends': ['website'],

    'qweb': [
        'views/hero.xml',
    ],

    'assets': {
        'web.assets_frontend': [
            'theme_atk_navy/static/src/scss/atk_theme.scss',
            'theme_atk_navy/static/src/js/countdown.js',
        ],
    },

    'theme': True,
    'installable': True,
}
