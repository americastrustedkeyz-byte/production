{
    'name': 'Custom 2026 Theme',
    'summary': 'Theme with Custom Homepage and Snippets',
    'description': 'A standard Odoo 18 theme module for Odoo.sh deployment.',
    'category': 'Theme/Creative',
    'version': '18.0.1.0.2',
    'author': 'Adex1',
    'license': 'LGPL-3',
    'depends': [
        'website',  # Required to use website templates and snippet groups
    ],
    'data': [
        # Loading order matters: load the homepage structure first
        'views/homepage.xml',
        'views/snippets.xml',
    ],
    'assets': {
        'web.assets_frontend': [
            'theme_custom_2026/static/src/scss/style.scss',
        ],
    },
    'images': [
        'static/description/main_screenshot.png',
    ],
    'installable': True,
    'application': False,
}
