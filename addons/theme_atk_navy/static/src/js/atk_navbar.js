
document.querySelectorAll('.atk-nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.body.classList.remove('atk-nav-open');
    });
});