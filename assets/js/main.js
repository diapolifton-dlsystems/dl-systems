/* =========================================================
   DL SYSTEMS — MAIN FRONTEND ENGINE
   Visible mobile tabs. No hamburger menu.
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const currentPage = location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".nav-links a").forEach(link => {
    const href = link.getAttribute("href");

    if (href === currentPage) {
      link.classList.add("active");
    }

    if (link.hostname && link.hostname !== location.hostname) {
      link.setAttribute("rel", "noopener noreferrer");
    }
  });

  document.querySelectorAll(".nav-toggle").forEach(toggle => toggle.remove());

  const activeNav = document.querySelector(".nav-links a.active");

  if (activeNav && window.innerWidth <= 900) {
    activeNav.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      inline: "center",
      block: "nearest"
    });
  }

  document.querySelectorAll(".project-card").forEach(card => {
    const bg = card.getAttribute("data-bg");

    if (!bg) return;

    if (!card.querySelector(".project-bg")) {
      const bgDiv = document.createElement("div");
      bgDiv.className = "project-bg";
      bgDiv.style.backgroundImage = `url("${bg}")`;
      card.prepend(bgDiv);
    }
  });

  const revealTargets = document.querySelectorAll(`
    .hero-inner,
    .section,
    .card,
    .project-card,
    .signal-card,
    .capability-card,
    .pricing-card,
    .system-tile,
    .service-band,
    .cta-section
  `);

  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal", "active");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealTargets.forEach(item => observer.observe(item));
  } else {
    revealTargets.forEach(item => item.classList.add("reveal", "active"));
  }

  if (!prefersReducedMotion) {
    document.querySelectorAll(".btn").forEach(button => {
      button.addEventListener("pointerdown", event => {
        const ripple = document.createElement("span");
        ripple.className = "ripple";

        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height) * 1.2;

        ripple.style.width = `${size}px`;
        ripple.style.height = `${size}px`;
        ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
        ripple.style.top = `${event.clientY - rect.top - size / 2}px`;

        button.appendChild(ripple);
        ripple.addEventListener("animationend", () => ripple.remove());
      });
    });
  }

  let toast = document.getElementById("toast");

  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast";
    document.body.appendChild(toast);
  }

  window.showToast = message => {
    if (!message) return;

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(window.toastTimeout);

    window.toastTimeout = setTimeout(() => {
      toast.classList.remove("show");
    }, 2600);
  };

  document.querySelectorAll(".contact-3d, .contact-whatsapp, .contact-email").forEach(button => {
    button.addEventListener("click", () => {
      button.classList.add("glow-pulse");

      if (typeof window.showToast === "function") {
        window.showToast("Opening contact channel...");
      }

      setTimeout(() => {
        button.classList.remove("glow-pulse");
      }, 900);
    });
  });

  window.showVirtual = () => {
    const virtual = document.getElementById("virtual");
    const inperson = document.getElementById("inperson");
    const tabs = document.querySelectorAll(".meeting-tab");

    if (!virtual || !inperson || tabs.length < 2) return;

    virtual.style.display = "block";
    inperson.style.display = "none";

    tabs[0].classList.add("active");
    tabs[1].classList.remove("active");

    if (typeof window.showToast === "function") {
      window.showToast("Virtual meeting selected");
    }
  };

  window.showInPerson = () => {
    const virtual = document.getElementById("virtual");
    const inperson = document.getElementById("inperson");
    const tabs = document.querySelectorAll(".meeting-tab");

    if (!virtual || !inperson || tabs.length < 2) return;

    virtual.style.display = "none";
    inperson.style.display = "block";

    tabs[1].classList.add("active");
    tabs[0].classList.remove("active");

    if (typeof window.showToast === "function") {
      window.showToast("In-person meeting selected");
    }
  };

  const canvas = document.getElementById("particles");

  if (canvas && !prefersReducedMotion) {
    const ctx = canvas.getContext("2d");

    let width;
    let height;
    let particles = [];

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;

      const count = window.innerWidth < 768 ? 24 : 52;

      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.3 + 0.4,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15
      }));
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "rgba(0,229,255,.32)";

      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(draw);
    };

    draw();
  }

  const pageBg = document.querySelector(".page-bg");

  if (pageBg && !prefersReducedMotion) {
    let ticking = false;

    window.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          pageBg.style.transform = `scale(1.04) translateY(${window.scrollY * 0.025}px)`;
          ticking = false;
        });

        ticking = true;
      }
    });
  }

  const nav = document.querySelector(".nav");

  if (nav) {
    const handleScroll = () => {
      if (window.scrollY > 12) {
        nav.classList.add("nav-scrolled");
      } else {
        nav.classList.remove("nav-scrolled");
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
  }
});