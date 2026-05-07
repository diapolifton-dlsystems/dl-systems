/* =========================================================
   DL SYSTEMS — PROJECTS PAGE LOGIC
   Makes project backgrounds load from data-bg on all devices.
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".project-card").forEach(card => {
    const bg = card.getAttribute("data-bg");

    if (!bg) return;

    if (!card.querySelector(".project-bg")) {
      const background = document.createElement("div");
      background.className = "project-bg";
      background.style.backgroundImage = `url("${bg}")`;
      card.prepend(background);
    }
  });
});