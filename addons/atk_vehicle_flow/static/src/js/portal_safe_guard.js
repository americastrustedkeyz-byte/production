/** @odoo-module **/

(() => {
    'use strict';

    /**
     * Odoo portal sometimes tries to update counters that
     * are not present when portal cards are customized.
     * This guard prevents portal hard crash.
     */
    const originalSetTextContent = Object.getOwnPropertyDescriptor(
        Node.prototype,
        'textContent'
    ).set;

    Object.defineProperty(Node.prototype, 'textContent', {
        set(value) {
            if (this === null) {
                console.warn('[ATK] textContent guard prevented crash');
                return;
            }
            try {
                originalSetTextContent.call(this, value);
            } catch (e) {
                console.warn('[ATK] textContent guard prevented crash', this);
            }
        },
    });
})();
