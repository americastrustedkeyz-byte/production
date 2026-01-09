document.addEventListener("DOMContentLoaded", () => {
    const el = document.getElementById("atk-countdown");
    if (!el) return;

    const target = new Date(el.dataset.date).getTime();

    setInterval(() => {
        const now = new Date().getTime();
        const diff = target - now;

        if (diff <= 0) {
            el.innerHTML = "Launching Now";
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        el.innerHTML = `${days} days remaining`;
    }, 1000);
});