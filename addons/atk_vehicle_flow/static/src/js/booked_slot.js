(function () {

    const PAGE_PATH_REQUIRED = '/appointment/1';
    const STORAGE_KEY = 'atk_booked_slots';

    const TARGET_SELECTOR =
        '.o_appointment_availabilities, [data-appointments-count]';

    if (!window.location.pathname.includes(PAGE_PATH_REQUIRED)) return;

    /* ---------- ADMIN FLAG (QWEB) ---------- */

    function isAdmin() {
        const flag = document.getElementById('atk-admin-flag');
        return flag && flag.dataset.atkAdmin === '1';
    }

    /* ---------- STORAGE ---------- */

    function getCount() {
        try {
            const d = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
            return Object.keys(d).length;
        } catch {
            return 0;
        }
    }

    function resetStorage() {
        localStorage.removeItem(STORAGE_KEY);
    }

    /* ---------- COUNTER ---------- */

    function render(target) {
        if (!target) return;

        let counter = target.querySelector('.atk-slot-counter');
        const count = getCount();

        if (count === 0) {
            if (counter) counter.remove();
            return;
        }

        if (!counter) {
            counter = document.createElement('div');
            counter.className = 'atk-slot-counter';
            target.appendChild(counter);
        }

        counter.innerHTML =
            count === 1
                ? '<strong>1 slot is booked</strong>'
                : `<strong>${count} slots are booked</strong>`;

        /* ---------- ADMIN ONLY ACTION ---------- */

        if (isAdmin()) {
            counter.style.cursor = 'pointer';
            counter.title = 'Admin: Click to reset booked slots';

            counter.onclick = function () {
                const proceed = window.confirm(
                    'Admin action: reset booked slot counter?'
                );
                if (proceed) {
                    resetStorage();
                    window.location.reload();
                }
            };
        } else {
            counter.onclick = null;
            counter.style.cursor = 'default';
        }
    }

    /* ---------- SAFE POLLING (UNCHANGED) ---------- */

    setInterval(() => {
        document.querySelectorAll(TARGET_SELECTOR).forEach(render);
    }, 600);

})();
