{
    "name": "ATK Navy Theme",
    "summary": "America's Trusted Key – Secure Navy Standard Theme",
    "version": "1.0.0",
    "category": "Website/Theme",
    "author": "ATK",
    "depends": ["website"],
    "data": [
        "views/assets.xml",
        "views/website_templates.xml",
        "views/countdown_page.xml",
    ],
    "assets": {
        "web.assets_frontend": [
            "theme_atk_navy/static/src/css/atk_theme.css",
            "theme_atk_navy/static/src/js/countdown.js",
        ],
    },
    "installable": True,
    "application": True,
    'auto_install': False,
}
