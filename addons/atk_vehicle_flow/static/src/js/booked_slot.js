(function () {

    /* ==========================
       CONFIG
    ========================== */

    const PAGE_PATH_REQUIRED = '/appointment/1';
    const STORAGE_KEY = 'atk_booked_slots';

    const AVAILABILITY_SELECTOR =
        '.o_appointment_availabilities, [data-appointments-count="1"]';

    const CONFIRM_BTN_SELECTOR =
        '.btn.btn-primary.o_appointment_form_confirm_btn';

    /* ==========================
       PAGE GUARD
    ========================== */

    if (!window.location.pathname.includes(PAGE_PATH_REQUIRED)) {
        return;
    }

    console.log('[ATK] Appointment page active');

    /* ==========================
       STORAGE
    ========================== */

    function getBookings() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
        } catch {
            return {};
        }
    }

    function saveBookings(data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }

    function resetBookings() {
        localStorage.removeItem(STORAGE_KEY);
    }

    function getBookedCount() {
        return Object.keys(getBookings()).length;
    }

    /* ==========================
       USER ROLE DETECTION
       (safe frontend-only check)
    ========================== */

    function isAdminUser() {
        return (
            document.body.classList.contains('o_is_admin') ||
            document.querySelector('[data-oe-model="res.users"]') ||
            document.cookie.includes('admin')
        );
    }

    /* ==========================
       DATE_TIME FROM URL
    ========================== */

    function getDateTimeFromURL() {
        const params = new URLSearchParams(window.location.search);
        const dt = params.get('date_time');
        return dt ? decodeURIComponent(dt).replace('+', ' ') : null;
    }

    /* ==========================
       COUNTER RENDER
    ========================== */

    function renderCounter(target) {
        if (!target) return;

        let counter = target.querySelector('.atk-slot-counter');

        if (!counter) {
            counter = document.createElement('div');
            counter.className = 'atk-slot-counter';
            target.appendChild(counter);
        }

        const count = getBookedCount();

        if (count === 0) {
            counter.remove();
            return;
        }

        counter.innerHTML =
            count === 1
                ? `<strong>1 slot is booked</strong>`
                : `<strong>${count} slots are booked</strong>`;

        if (isAdminUser()) {
            counter.style.cursor = 'pointer';
            counter.title = 'Click to reset slot counter';

            counter.onclick = function () {
                const confirmReset = window.confirm(
                    'Admin action: Reset booked slot counter?'
                );

                if (confirmReset) {
                    resetBookings();
                    console.log('[ATK] Slot counter reset by admin');
                    window.location.reload();
                }
            };
        } else {
            counter.onclick = null;
            counter.style.cursor = 'default';
        }
    }

    /* ==========================
       OBSERVER (KEY FIX)
    ========================== */

    const observer = new MutationObserver(() => {
        document.querySelectorAll(AVAILABILITY_SELECTOR).forEach(renderCounter);
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });

    /* ==========================
       CONFIRM BUTTON LISTENER
    ========================== */

    function attachConfirmListener() {
        const btn = document.querySelector(CONFIRM_BTN_SELECTOR);
        if (!btn || btn.dataset.atkBound) return;

        btn.dataset.atkBound = 'true';

        btn.addEventListener('click', () => {
            const dateTime = getDateTimeFromURL();
            if (!dateTime) return;

            const data = getBookings();

            if (!data[dateTime]) {
                data[dateTime] = true;
                saveBookings(data);
                console.log('[ATK] Slot confirmed:', dateTime);
            }
        });
    }

    /* ==========================
       INIT
    ========================== */

    setInterval(() => {
        attachConfirmListener();
    }, 300);

})();
