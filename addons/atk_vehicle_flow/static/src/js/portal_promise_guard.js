/** @odoo-module **/

(() => {
    'use strict';

    // Only guard portal pages
    if (!window.location.pathname.startsWith('/my')) {
        return;
    }

    /**
     * Prevent Odoo portal from crashing on unhandled async promises
     * when portal blocks/counters are customized.
     */
    window.addEventListener('unhandledrejection', function (event) {
        console.warn('[ATK] Unhandled promise prevented:', event.reason);
        event.preventDefault();
    });

})();
