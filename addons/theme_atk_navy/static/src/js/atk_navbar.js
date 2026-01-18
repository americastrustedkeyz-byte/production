(function () {

    function injectHamburger() {

        // Only mobile
        if (window.innerWidth > 992) return;

        const container = document.querySelector('.atk-nav-container');
        const links = document.querySelector('.atk-nav-links');

        if (!container || !links) return;

        // Prevent duplicates
        if (container.querySelector('.atk-mobile-toggle')) return;

        const toggle = document.createElement('div');
        toggle.className = 'atk-mobile-toggle';
        toggle.setAttribute('aria-label', 'Toggle navigation');

        toggle.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;

        container.appendChild(toggle);

        toggle.addEventListener('click', function () {
            document.body.classList.toggle('atk-nav-open');
            toggle.classList.toggle('active');
        });

        links.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                document.body.classList.remove('atk-nav-open');
                toggle.classList.remove('active');
            });
        });

        console.log('[ATK NAV] Mobile hamburger injected');
    }

    //OBSERVE DOM CHANGES (Odoo-safe)
    const observer = new MutationObserver(() => {
        injectHamburger();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

})();
