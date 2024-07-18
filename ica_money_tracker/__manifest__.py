{
    "name": "Money Tracker",
    "version": "1.0",
    "depends": ["base", "web"],
    "data": [
        "views/ica_money_tracker.xml",
        "views/templates.xml",
        "views/menus.xml"
    ],
    'assets': {
        'ica_money_tracker.assets_standalone_app': [
            ('include', 'web._assets_helpers'),
            'web/static/src/scss/pre_variables.scss',
            'web/static/lib/bootstrap/scss/_variables.scss',
            ('include', 'web._assets_bootstrap'),
            ('include', 'web._assets_core'),
            'ica_money_tracker/static/src/**/*',
        ],
    },
    "license": "LGPL-3"
}
