(function () {
  /* ==========================================
     ATK — Appointment Thank-You Enhancement
     JS-ONLY, Owl-safe, no auto-redirect
     ========================================== */

  function isAppointmentConfirmation() {
    const params = new URLSearchParams(window.location.search);
    return (
      window.location.pathname.startsWith("/calendar/view/") &&
      params.get("state") === "new"
    );
  }

  if (!isAppointmentConfirmation()) return;

  // Prevent double execution
  if (window.__atkThankYouHandled) return;
  window.__atkThankYouHandled = true;

  console.log("[ATK] Appointment confirmation detected");

  let attempts = 0;
  const MAX_ATTEMPTS = 25;

  const waitForThankYouDOM = setInterval(() => {
    attempts++;

    /* ==========================================
       STRONG container detection (future-proof)
       ========================================== */
    const container =
      document.querySelector(
        '.o_appointment_validation_details.o_wappointment_type_options'
      ) ||
      document.querySelector(
        '[data-appointment-type-id][data-event-access-token]'
      ) ||
      document.querySelector(
        '[data-event-start][data-event-access-token]'
      );

    if (!container) {
      if (attempts >= MAX_ATTEMPTS) {
        clearInterval(waitForThankYouDOM);
        console.warn("[ATK] Thank-you container not found");
      }
      return;
    }

    clearInterval(waitForThankYouDOM);

    console.log("[ATK] Thank-you container found");

    /* ==========================================
       Append to FIRST child div only
       ========================================== */
    const firstChildDiv = container.querySelector("div");
    if (!firstChildDiv) return;

    // Avoid duplicate injection
    if (firstChildDiv.querySelector("#atk-checkout-box")) return;

    /* ==========================================
       Detect booking track (safe default)
       ========================================== */
    const params = new URLSearchParams(window.location.search);
    const track = params.get("track") || "standard";

    const checkoutUrl =
      track === "priority"
        ? "/atk/report/checkout?track=priority"
        : "/atk/report/checkout?track=standard";

    /*==========================================
       Inject UI
       ========================================== */
    const wrapper = document.createElement("div");
    wrapper.id = "atk-checkout-box";
    wrapper.style.marginTop = "16px";

    wrapper.innerHTML = `
      <div class="alert alert-info">
        <strong>Thank you for booking.</strong><br/>
        Please proceed to payment to confirm your appointment.
      </div>

      <button
        type="button"
        class="btn btn-primary"
        id="atk-checkout-btn"
      >
        Proceed to Checkout
      </button>
    `;

    firstChildDiv.appendChild(wrapper);

    document
      .getElementById("atk-checkout-btn")
      .addEventListener("click", function () {
        window.location.href = checkoutUrl;
      });

    console.log("[ATK] Checkout button injected successfully");

  }, 300);
})();
