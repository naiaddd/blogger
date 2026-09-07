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
    const startHeight = body.getBoundingClientRect().height;
    expanding = animation ? !expanding : !details.open;
    if (animation) animation.cancel();
    details.open = true;
    animation = body.animate(
      [{ height: startHeight + "px", opacity: startHeight ? 1 : 0 },
       { height: (expanding ? body.scrollHeight : 0) + "px", opacity: expanding ? 1 : 0 }],
      { duration: 240, easing: "cubic-bezier(.2,.7,.2,1)" }
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







