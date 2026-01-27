/** @odoo-module **/
import publicWidget from "@web/legacy/js/public/public_widget";

publicWidget.registry.AtkReport = publicWidget.Widget.extend({
    selector: '#atk_report_form',
    events: {
        'submit': '_onFormSubmit',
    },

    _onFormSubmit: function (ev) {
        const form = ev.currentTarget;
        const btn = form.querySelector('#atk_report_proceed');
        
        // 1. UI Feedback
        if (btn) {
            btn.disabled = true;
            btn.innerHTML = '<i class="fa fa-spinner fa-spin me-2"></i> Processing...';
        }

        // 2. Prepare the action URL
        // We append the current URL parameters (query_string) 
        // so the Python controller receives them in the URL.
        const currentParams = window.location.search;
        if (currentParams && !form.action.includes('?')) {
            form.action = form.action + currentParams;
        }
        
        // Form submits naturally to the Python Controller now
    },
});
