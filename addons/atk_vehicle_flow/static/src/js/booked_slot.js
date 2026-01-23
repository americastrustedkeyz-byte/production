(function () {

    const PAGE_PATH_REQUIRED = '/appointment/1';
    const STORAGE_KEY = 'atk_booked_slots';

    const TARGET_SELECTOR =
        '.o_appointment_availabilities, [data-appointments-count]';

    const CONFIRM_BTN_SELECTOR =
        '.btn.btn-primary.o_appointment_form_confirm_btn';

    if (!window.location.pathname.includes(PAGE_PATH_REQUIRED)) return;

    /* ---------- ADMIN FLAG (QWEB) ---------- */

    function isAdmin() {
        const flag = document.getElementById('atk-admin-flag');
        return flag && flag.dataset.atkAdmin === '1';
    }

    /* ---------- STORAGE ---------- */

    function getData() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
        } catch {
            return {};
        }
    }

    function saveData(data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }

    function resetData() {
        localStorage.removeItem(STORAGE_KEY);
    }

    function getCount() {
        return Object.keys(getData()).length;
    }

    /* ---------- FORCE REFRESH (KEY FIX) ---------- */

    function refreshCounters() {
        document.querySelectorAll(TARGET_SELECTOR).forEach(render);
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
            counter.title = 'Admin: Click to reset booked slots';

            counter.onclick = function () {
                const proceed = window.confirm(
                    'Admin action: reset booked slot counter?'
                );
                if (proceed) {
                    resetData();
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

    /* ---------- CONFIRM LISTENER (FIXED) ---------- */

    setInterval(() => {
        const btn = document.querySelector(CONFIRM_BTN_SELECTOR);
        if (!btn || btn.dataset.atkBound) return;

        btn.dataset.atkBound = '1';

        btn.addEventListener('click', () => {
            const params = new URLSearchParams(window.location.search);
            const dt = params.get('date_time');
            if (!dt) return;

            const key = decodeURIComponent(dt).replace('+', ' ');
            const data = getData();

            if (!data[key]) {
                data[key] = true;
                saveData(data);

                console.log('[ATK] Slot stored after reset-safe:', key);

                // 🔑 CRITICAL FIX
                setTimeout(refreshCounters, 300);
            }
        });
    }, 300);

})();
