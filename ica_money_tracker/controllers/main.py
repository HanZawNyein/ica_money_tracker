from odoo.http import request, route, Controller


class MoneyTrackerController(Controller):
    @route("/ica_money_tracker/standalone_app", auth="public")
    def standalone_app(self):
        return request.render(
            'ica_money_tracker.standalone_app',
            {
                'session_info': request.env['ir.http'].get_frontend_session_info(),
            }
        )
