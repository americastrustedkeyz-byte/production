(function () {

    const PAGE_PATH_REQUIRED = '/appointment/1';
    const STORAGE_KEY = 'atk_booked_slots';
    const TARGET_SELECTOR =
        '.o_appointment_availabilities, [data-appointments-count]';

    if (!window.location.pathname.includes(PAGE_PATH_REQUIRED)) return;

    /* ---------- STORAGE ---------- */

    function getCount() {
        try {
            const d = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
            return Object.keys(d).length;
        } catch {
            return 0;
        }
    }

    function resetData() {
        localStorage.removeItem(STORAGE_KEY);
    }

    /* ---------- ADMIN ---------- */

    function isAdmin() {
        return (
            document.body.classList.contains('o_is_admin') ||
            document.cookie.includes('admin')
        );
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

        if (isAdmin()) {
            counter.style.cursor = 'pointer';
            counter.onclick = () => {
                if (confirm('Reset booked slot counter?')) {
                    resetData();
                    location.reload();
                }
            };
        } else {
            counter.onclick = null;
            counter.style.cursor = 'default';
        }
    }

    /* ---------- SAFE POLLING ---------- */

    setInterval(() => {
        document.querySelectorAll(TARGET_SELECTOR).forEach(render);
    }, 600);

})();
