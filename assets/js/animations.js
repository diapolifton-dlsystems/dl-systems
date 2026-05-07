/* =========================================================
   DL SYSTEMS — ANIMATION HELPERS
   Lightweight and safe across all pages.
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) {
    document.documentElement.classList.add("reduced-motion");
    return;
  }

  document.querySelectorAll("[data-tilt]").forEach(card => {
    card.addEventListener("mousemove", event => {
      const rect = card.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const rotateX = ((y / rect.height) - 0.5) * -5;
      const rotateY = ((x / rect.width) - 0.5) * 5;

      card.style.transform =
        `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
});