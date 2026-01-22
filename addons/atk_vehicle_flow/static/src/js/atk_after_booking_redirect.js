(function () {
  /* ==========================================
     ATK – Appointment Thank You → Checkout
     Runs ONLY on confirmation page
     ========================================== */

  const isThankYouPage =
    window.location.pathname.startsWith("/calendar/view/") &&
    new URLSearchParams(window.location.search).get("state") === "new";

  if (!isThankYouPage) return;

  console.log("[ATK] Appointment confirmation detected");

  // Prevent double execution
  if (window.__atkCheckoutRedirected) return;
  window.__atkCheckoutRedirected = true;

  // Create UI message
  const msg = document.createElement("div");
  msg.className = "alert alert-info mt-4";
  msg.innerHTML = `
    <strong>Thank you for booking.</strong><br/>
    You will be redirected to secure payment shortly…
    <br/><br/>
    <button class="btn btn-primary" id="atk-checkout-now">
      Proceed to Payment
    </button>
  `;

  // Insert message at top of page
  document.body.prepend(msg);

  // Auto redirect
  const redirect = () => {
    window.location.href = "/atk/report/checkout";
  };

  // Manual button
  document
    .getElementById("atk-checkout-now")
    .addEventListener("click", redirect);

  // Auto after delay
  setTimeout(redirect, 3000);
})();
