/* ===============================
   DL SYSTEMS — ENTERPRISE JS CORE
================================ */

/* -------------------------------
   SCROLL REVEAL (SUBTLE)
-------------------------------- */
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
      }
    });
  },
  { threshold: 0.15 }
);

document
  .querySelectorAll(".card, .section h2, .hero-inner, .project-card, .project-wrapper")
  .forEach(el => observer.observe(el));

/* -------------------------------
   ACTIVE NAV LINK
-------------------------------- */
const currentPage = location.pathname.split("/").pop() || "index.html";

document.querySelectorAll(".nav-links a").forEach(link => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
  }
});

/* -------------------------------
   BUTTON MICRO‑INTERACTION
-------------------------------- */
document.querySelectorAll(".btn").forEach(btn => {
  btn.addEventListener("mouseenter", () => {
    btn.style.boxShadow = "0 0 28px rgba(0,255,240,0.6)";
  });
  btn.addEventListener("mouseleave", () => {
    btn.style.boxShadow = "none";
  });
});

/* ===============================
   PARTICLE CANVAS (ENTERPRISE SAFE)
================================ */
const canvas = document.getElementById("particles");
if (canvas) {
  const ctx = canvas.getContext("2d");

  let w, h, particles;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  window.addEventListener("resize", resize);
  resize();

  particles = Array.from({ length: 70 }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 1.6 + 0.6,
    vx: (Math.random() - 0.5) * 0.25,
    vy: (Math.random() - 0.5) * 0.25
  }));

  function draw() {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "rgba(0,255,240,0.6)";

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }

  draw();
}

console.log("⚡ DL SYSTEMS — Enterprise JS loaded");

/* ===============================
   HOVER GLOW PHYSICS ENGINE
================================ */

const interactiveElements = document.querySelectorAll(
  ".card, .btn, .contact-action"
);

interactiveElements.forEach(el => {
  el.classList.add("interactive");

  el.addEventListener("mousemove", e => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    el.style.setProperty("--x", `${x}px`);
    el.style.setProperty("--y", `${y}px`);
  });

  el.addEventListener("mouseleave", () => {
    el.style.setProperty("--x", `50%`);
    el.style.setProperty("--y", `50%`);
  });
});

interactiveElements.forEach(el => {
  el.addEventListener("mousemove", e => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = ((y / rect.height) - 0.5) * -6;
    const rotateY = ((x / rect.width) - 0.5) * 6;

    el.style.transform =
      `translateY(-6px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  el.addEventListener("mouseleave", () => {
    el.style.transform = "translateY(0)";
  });
});

/* ===============================
   MICRO‑INTERACTIONS — FEEDBACK
================================ */

const toast = document.getElementById("toast");

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2600);
}

/* CONTACT BUTTON FEEDBACK */
document.querySelectorAll(".contact-whatsapp, .contact-email").forEach(btn => {
  btn.addEventListener("click", () => {
    btn.classList.add("glow-pulse");
    showToast("Opening secure channel…");
    setTimeout(() => btn.classList.remove("glow-pulse"), 1200);
  });
});

/* FORM SUBMIT FEEDBACK */
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", e => {
    e.preventDefault();
    contactForm.classList.add("glow-pulse");
    showToast("Message delivered successfully");
    setTimeout(() => contactForm.classList.remove("glow-pulse"), 1400);
    contactForm.reset();
  });
}

/* ===============================
   MAGNETIC BUTTON INTERACTION
   Cursor Gravity Effect
================================ */

document.querySelectorAll(".btn").forEach(btn => {
  const strength = 0.35; // magnetic pull strength

  btn.addEventListener("mousemove", e => {
    const rect = btn.getBoundingClientRect();

    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    btn.classList.add("magnetic-active");

    btn.style.transform = `
      translate(${x * strength}px, ${y * strength}px)
    `;
  });

  btn.addEventListener("mouseleave", () => {
    btn.classList.remove("magnetic-active");
    btn.style.transform = "translate(0, 0)";
  });
});

/* ===============================
   PRESS RIPPLE — ENERGY SHOCKWAVE
================================ */

document.querySelectorAll(".btn").forEach(btn => {
  btn.addEventListener("pointerdown", e => {
    const ripple = document.createElement("span");
    ripple.className = "ripple";

    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 1.2;

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
    ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

    btn.appendChild(ripple);

    ripple.addEventListener("animationend", () => {
      ripple.remove();
    });
  });
});

/* ===============================
   PROJECT CARD BACKGROUND ENGINE
================================ */

document.querySelectorAll(".project-card").forEach(card => {
  const bg = card.getAttribute("data-bg");

  if (bg) {
    card.classList.add("has-bg");

    const bgDiv = document.createElement("div");
    bgDiv.classList.add("project-bg");
    bgDiv.style.backgroundImage = `url('${bg}')`;

    card.prepend(bgDiv);
  }
});

window.addEventListener("scroll", () => {
  const bg = document.querySelector(".page-bg");
  if(bg){
    bg.style.transform = `scale(1.05) translateY(${window.scrollY * 0.05}px)`;
  }
});
