{
    'name': 'ATK Website',
    'summary': 'Homepage & launch countdown for ATK',
    'version': '18.0.1.0.0',
    'category': 'Website',
    'author': 'ATK',
    'license': 'LGPL-3',

    'depends': [
        'website',
        'theme_atk_navy',
    ],

    'data': [
        'views/homepage_page.xml',
        'views/countdown_page.xml',
        'views/launch_cron.xml',
    ],

    'installable': True,
    'application': False,
}
