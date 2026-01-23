(function () {

    /* ==========================
       CONFIG
    ========================== */

    const PAGE_PATH_REQUIRED = '/appointment/1';
    const STORAGE_KEY = 'atk_booked_slots';
    const SLOT_PARENT_SELECTOR = '.o_slots_list.row.px-0';
    const CONFIRM_BTN_SELECTOR = '.btn.btn-primary.o_appointment_form_confirm_btn';

    /* ==========================
       SAFETY CHECK
    ========================== */

    if (!window.location.pathname.includes(PAGE_PATH_REQUIRED)) {
        console.log('[ATK] Not on appointment page, script ignored.');
        return;
    }

    console.log('[ATK] Appointment page detected.');

    /* ==========================
       UTILS
    ========================== */

    function getStoredBookings() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
        } catch (e) {
            return {};
        }
    }

    function saveStoredBookings(data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }

    function getDateTimeFromURL() {
        const params = new URLSearchParams(window.location.search);
        const dt = params.get('date_time');
        if (!dt) return null;
        return decodeURIComponent(dt).replace('+', ' ');
    }

    /* ==========================
       UI
    ========================== */

    function renderCounter() {
        const slotParent = document.querySelector(SLOT_PARENT_SELECTOR);
        if (!slotParent) return;

        let counter = slotParent.querySelector('.atk-slot-counter');
        if (!counter) {
            counter = document.createElement('div');
            counter.className = 'atk-slot-counter';
            slotParent.appendChild(counter);
        }

        const data = getStoredBookings();
        const count = Object.keys(data).length;

        if (count === 0) {
            counter.style.display = 'none';
            return;
        }

        counter.style.display = 'block';
        counter.innerHTML = count === 1
            ? '<strong>1 slot is booked</strong>'
            : `<strong>${count} slots are booked</strong>`;

        console.log('[ATK] Counter updated:', count);
    }

    /* ==========================
       CONFIRM LISTENER
    ========================== */

    function attachConfirmListener() {
        const btn = document.querySelector(CONFIRM_BTN_SELECTOR);
        if (!btn) return false;

        btn.addEventListener('click', function () {

            const dateTime = getDateTimeFromURL();

            console.log('[ATK] Confirm button clicked');
            console.log('[ATK] URL date_time:', dateTime);

            if (!dateTime) {
                console.warn('[ATK] No date_time in URL. Booking not stored.');
                return;
            }

            const data = getStoredBookings();

            if (data[dateTime]) {
                console.log('[ATK] Slot already recorded:', dateTime);
                return;
            }

            // STORE
            data[dateTime] = true;
            saveStoredBookings(data);

            console.log('[ATK] Slot stored in localStorage:', dateTime);
            console.log('[ATK] Current storage:', data);

            // update UI
            setTimeout(renderCounter, 500);

        }, { once: true });

        console.log('[ATK] Confirm listener attached.');
        return true;
    }

    /* ==========================
       INIT
    ========================== */

    function init() {

        console.log('[ATK] Initializing booking counter system...');

        // Render existing count on load
        setTimeout(renderCounter, 500);

        // Wait for confirm button (async render)
        const confirmWatcher = setInterval(() => {
            if (attachConfirmListener()) {
                clearInterval(confirmWatcher);
            }
        }, 300);
    }

    init();
})();
