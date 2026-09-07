"use strict";

// Native details work without JavaScript; animation is a progressive enhancement.
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
document.querySelectorAll(".project").forEach((details) => {
  const summary = details.querySelector("summary");
  let animation;
  let expanding = details.open;
  summary.addEventListener("click", (event) => {
    if (reducedMotion.matches || typeof details.animate !== "function") {
      if (animation) {
        animation.cancel();
        animation = undefined;
        details.open = expanding;
      }
      return;
    }
    event.preventDefault();
    // Animate the visible outer row, not content hidden by native details.
    const startHeight = details.getBoundingClientRect().height;
    expanding = animation ? !expanding : !details.open;
    if (animation) animation.cancel();
    // Measure each native state synchronously, before the next paint. This
    // includes borders and wrapped summary text without guessing dimensions.
    details.open = expanding;
    const endHeight = details.getBoundingClientRect().height;
    details.open = true;
    animation = details.animate(
      [{ height: startHeight + "px" }, { height: endHeight + "px" }],
      { duration: parseFloat(getComputedStyle(details).getPropertyValue("--motion-ms")), easing: "ease-in-out" }
    );
    animation.onfinish = () => {
      details.open = expanding;
      animation = undefined;
    };
  });
});
document.querySelectorAll(".copy-email").forEach((button) => {
  if (!navigator.clipboard?.writeText) return;
  button.hidden = false;
  button.addEventListener("click", async () => {
    const status = button.parentElement.querySelector(".copy-status");
    try {
      await navigator.clipboard.writeText(button.dataset.email);
      status.textContent = "Email copied.";
    } catch {
      status.textContent = "Could not copy. Select the email address to copy it.";
    }
  });
});





