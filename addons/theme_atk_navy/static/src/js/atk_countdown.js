odoo.define('theme_atk_navy.countdown', function (require) {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {

        const launchDate = new Date('2026-01-19T00:01:00-05:00').getTime();

        const tick = () => {
            const now = new Date().getTime();
            const distance = launchDate - now;

            if (distance < 0) return;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((distance / (1000 * 60)) % 60);
            const seconds = Math.floor((distance / 1000) % 60);

            const set = (id, val) => {
                const el = document.getElementById(id);
                if (el) el.textContent = String(val).padStart(2, '0');
            };

            set('atk-days', days);
            set('atk-hours', hours);
            set('atk-minutes', minutes);
            set('atk-seconds', seconds);
        };

        tick();
        setInterval(tick, 1000);
    });
});
