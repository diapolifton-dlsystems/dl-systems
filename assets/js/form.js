/* =========================================================
   DL SYSTEMS — FORM SUPPORT
   Safe even when no form exists.
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const forms = document.querySelectorAll("form[data-dl-form]");

  if (!forms.length) return;

  forms.forEach(form => {
    form.addEventListener("submit", event => {
      const requiredFields = form.querySelectorAll("[required]");
      let valid = true;

      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          valid = false;
          field.classList.add("field-error");
        } else {
          field.classList.remove("field-error");
        }
      });

      if (!valid) {
        event.preventDefault();

        if (typeof window.showToast === "function") {
          window.showToast("Please complete all required fields.");
        }

        return;
      }

      if (typeof window.showToast === "function") {
        window.showToast("Submitting your request...");
      }
    });
  });
});