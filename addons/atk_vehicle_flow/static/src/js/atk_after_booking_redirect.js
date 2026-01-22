(function () {
  // Run only on appointment confirmation pages
  const path = window.location.pathname;
  const params = new URLSearchParams(window.location.search);

  const isThankYouPage =
    path.startsWith("/calendar/view/") &&
    params.get("state") === "new";

  if (!isThankYouPage) return;

  // Detect track
  const track = params.get("track") || "standard";

  // Create checkout button
  const btn = document.createElement("a");
  btn.innerText =
    track === "priority"
      ? "Proceed to Priority Checkout ($125)"
      : "Proceed to Checkout ($5)";

  btn.href = `/atk/report/checkout?track=${encodeURIComponent(track)}`;
  btn.className = "btn btn-primary btn-lg mt-4";

  // Insert safely after page loads
  window.addEventListener("load", function () {
    const container =
      document.querySelector("main") ||
      document.querySelector("body");

    if (!container) return;

    const wrapper = document.createElement("div");
    wrapper.className = "text-center";
    wrapper.appendChild(btn);

    container.appendChild(wrapper);
  });
})();