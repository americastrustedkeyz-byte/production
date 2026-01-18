(function () {
    document.addEventListener('DOMContentLoaded', function () {

        // Only run on mobile
        if (window.innerWidth > 992) return;

        const nav = document.querySelector('.atk-navbar');
        const container = document.querySelector('.atk-nav-container');
        const links = document.querySelector('.atk-nav-links');

        if (!nav || !container || !links) return;

        // Prevent double injection
        if (document.querySelector('.atk-mobile-toggle')) return;

        // Create hamburger
        const toggle = document.createElement('div');
        toggle.className = 'atk-mobile-toggle';
        toggle.setAttribute('aria-label', 'Toggle navigation');

        toggle.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;

        container.appendChild(toggle);

        // Toggle behavior
        toggle.addEventListener('click', function () {
            document.body.classList.toggle('atk-nav-open');
            toggle.classList.toggle('active');
        });

        // Close menu on link click
        links.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                document.body.classList.remove('atk-nav-open');
                toggle.classList.remove('active');
            });
        });
    });
})();


    