document.addEventListener("DOMContentLoaded", function () {
    const el = document.getElementById("atk-countdown");
    if (!el) return;

    const launch = new Date(el.dataset.launch).getTime();

    function tick() {
        const now = new Date().getTime();
        const diff = launch - now;

        if (diff <= 0) {
            el.innerHTML = "We are live!";
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const mins = Math.floor((diff / (1000 * 60)) % 60);
        const secs = Math.floor((diff / 1000) % 60);

        el.innerHTML = `${days}d ${hours}h ${mins}m ${secs}s`;
    }

    tick();
    setInterval(tick, 1000);
});