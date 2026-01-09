{
    'name': 'Custom 2026 Theme',
    'description': 'A sleek custom theme for Odoo 18',
    'category': 'Theme/Creative',
    'version': '18.0.1.0.0',
    'author': 'adex',
    'depends': ['website'],
    'data': [
        'views/snippets.xml',
    ],
    'assets': {
        'web.assets_frontend': [
            'theme_custom_2026/static/src/scss/style.scss',
        ],
    },
    'license': 'LGPL-3',
}