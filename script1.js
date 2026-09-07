"use strict";

// Native details work without JavaScript; animation is a progressive enhancement.
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
document.querySelectorAll(".project").forEach((details) => {
  const summary = details.querySelector("summary");
  const body = details.querySelector(".project-body");
  let animation;
  let expanding = details.open;
  summary.addEventListener("click", (event) => {
    if (reducedMotion.matches || typeof body.animate !== "function") {
      if (animation) {
        animation.cancel();
        animation = undefined;
        details.open = expanding;
      }
      return;
    }
    event.preventDefault();
    // Closed details can retain a laid-out body in the browser. Its measured
    // height is not the visible height: an opening must start at zero.
    const startHeight = details.open ? body.getBoundingClientRect().height : 0;
    const startOpacity = details.open ? getComputedStyle(body).opacity : "0";
    expanding = animation ? !expanding : !details.open;
    if (animation) animation.cancel();
    details.open = true;
    animation = body.animate(
      [{ height: startHeight + "px", opacity: startOpacity },
       { height: (expanding ? body.querySelector(".project-content").getBoundingClientRect().height : 0) + "px", opacity: expanding ? 1 : 0 }],
      { duration: parseFloat(getComputedStyle(details).getPropertyValue("--motion-ms")), easing: "cubic-bezier(.2,.7,.2,1)" }
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






