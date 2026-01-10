{
    'name': 'ATK Website',
    'version': '18.0.1.0.0',
    'category': 'Website',
    'depends': [
        'website',
        'theme_atk_navy',
    ],
    'data': [
        'views/homepage_view.xml',   # MUST load first
        'views/pages.xml',
    ],
    'installable': True,
    'application': False,
}
