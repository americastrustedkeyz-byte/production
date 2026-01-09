{
    "name": "ATK Navy Theme",
    "description": "America's Trusted Key - Navy Theme",
    "category": "Theme/Corporate",
    "version": "1.0",
    "depends": ["website"],
    "application": False,
    "installable": True,
    "theme": True,
    "license": "LGPL-3",

    "assets": {
        "web.assets_frontend": [
            "theme_atk_navy/static/src/scss/atk_theme.scss",
            "theme_atk_navy/static/src/js/countdown.js",
        ],
    },

    "data": [
        "views/theme.xml",
        "views/layouts.xml",
        "views/homepage.xml",
        "views/snippets/hero.xml",
    ],
}