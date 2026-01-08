document.addEventListener("DOMContentLoaded", function () {
    const el = document.getElementById("countdown");
    if (!el) return;

    const launch = new Date(el.dataset.launch.replace(" ", "T"));

    function tick() {
        const now = new Date();
        const diff = launch - now;

        if (diff <= 0) {
            location.reload();
            return;
        }

        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const m = Math.floor((diff / (1000 * 60)) % 60);
        const s = Math.floor((diff / 1000) % 60);

        el.innerHTML = `
            <strong>${d}</strong>d
            <strong>${h}</strong>h
            <strong>${m}</strong>m
            <strong>${s}</strong>s
        `;
    }

    tick();
    setInterval(tick, 1000);
});
