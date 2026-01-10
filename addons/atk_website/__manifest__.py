{
    'name': 'ATK Website',
    'summary': 'Homepage, countdown, and launch logic for ATK',
    'version': '18.0.1.0.0',
    'category': 'Website',
    'author': 'ATK',
    'license': 'LGPL-3',

    'depends': [
        'website',
        'theme_atk_navy',
    ],

    'data': [
        'views/homepage.xml',
        'views/countdown.xml',
    ],

    'installable': True,
    'application': False,
}
