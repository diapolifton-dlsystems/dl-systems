/* =========================================================
   DL SYSTEMS — ENTERPRISE FRONTEND ENGINE
   Full replacement for assets/js/main.js
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* =========================================================
     ACTIVE NAVIGATION
  ========================================================= */

  const currentPage =
    location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".nav-links a").forEach(link => {

    const href = link.getAttribute("href");

    if (href === currentPage) {
      link.classList.add("active");
    }

    if (link.hostname && link.hostname !== location.hostname) {
      link.setAttribute("rel", "noopener noreferrer");
    }
  });

  /* =========================================================
     MOBILE NAVIGATION SYSTEM
  ========================================================= */

  const navInner = document.querySelector(".nav-inner");
  const navLinks = document.querySelector(".nav-links");

  if (navInner && navLinks && !document.querySelector(".nav-toggle")) {

    const toggle = document.createElement("button");

    toggle.className = "nav-toggle";
    toggle.setAttribute("aria-label", "Open navigation menu");
    toggle.setAttribute("aria-expanded", "false");

    toggle.innerHTML = `
      <span></span>
      <span></span>
      <span></span>
    `;

    navInner.appendChild(toggle);

    const openMenu = () => {

      navLinks.classList.add("open");
      toggle.classList.add("open");

      document.body.classList.add("menu-open");

      toggle.setAttribute("aria-expanded", "true");
    };

    const closeMenu = () => {

      navLinks.classList.remove("open");
      toggle.classList.remove("open");

      document.body.classList.remove("menu-open");

      toggle.setAttribute("aria-expanded", "false");
    };

    toggle.addEventListener("click", () => {

      const isOpen = navLinks.classList.contains("open");

      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    navLinks.querySelectorAll("a").forEach(link => {

      link.addEventListener("click", () => {
        closeMenu();
      });
    });

    document.addEventListener("click", event => {

      const clickedInsideMenu =
        navLinks.contains(event.target) ||
        toggle.contains(event.target);

      if (!clickedInsideMenu && navLinks.classList.contains("open")) {
        closeMenu();
      }
    });

    window.addEventListener("resize", () => {

      if (window.innerWidth > 900) {
        closeMenu();
      }
    });
  }

  /* =========================================================
     SCROLL REVEAL ENGINE
  ========================================================= */

  const revealTargets = document.querySelectorAll(`
    .hero-inner,
    .section,
    .card,
    .project-card,
    .market-card,
    .signal-card,
    .capability-card,
    .pricing-card,
    .system-tile,
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

    }, {
      threshold: 0.12
    });

    revealTargets.forEach(item => {
      observer.observe(item);
    });

  } else {

    revealTargets.forEach(item => {
      item.classList.add("reveal", "active");
    });
  }

  /* =========================================================
     PROJECT CARD BACKGROUND ENGINE
  ========================================================= */

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

  /* =========================================================
     BUTTON RIPPLE EFFECT
  ========================================================= */

  if (!prefersReducedMotion) {

    document.querySelectorAll(".btn").forEach(button => {

      button.addEventListener("pointerdown", event => {

        const ripple = document.createElement("span");

        ripple.className = "ripple";

        const rect = button.getBoundingClientRect();

        const size = Math.max(rect.width, rect.height) * 1.2;

        ripple.style.width = `${size}px`;
        ripple.style.height = `${size}px`;

        ripple.style.left =
          `${event.clientX - rect.left - size / 2}px`;

        ripple.style.top =
          `${event.clientY - rect.top - size / 2}px`;

        button.appendChild(ripple);

        ripple.addEventListener("animationend", () => {
          ripple.remove();
        });
      });
    });
  }

  /* =========================================================
     TOAST NOTIFICATION SYSTEM
  ========================================================= */

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

  /* =========================================================
     CONTACT BUTTON FEEDBACK
  ========================================================= */

  document.querySelectorAll(`
    .contact-3d,
    .contact-whatsapp,
    .contact-email
  `).forEach(button => {

    button.addEventListener("click", () => {

      button.classList.add("glow-pulse");

      showToast("Opening contact channel...");

      setTimeout(() => {
        button.classList.remove("glow-pulse");
      }, 900);
    });
  });

  /* =========================================================
     CALENDLY MEETING TABS
  ========================================================= */

  window.showVirtual = () => {

    const virtual = document.getElementById("virtual");
    const inperson = document.getElementById("inperson");

    const tabs = document.querySelectorAll(".meeting-tab");

    if (!virtual || !inperson || tabs.length < 2) return;

    virtual.style.display = "block";
    inperson.style.display = "none";

    tabs[0].classList.add("active");
    tabs[1].classList.remove("active");

    showToast("Virtual meeting selected");
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

    showToast("In-person meeting selected");
  };

  /* =========================================================
     PARTICLE ENGINE
  ========================================================= */

  const canvas = document.getElementById("particles");

  if (canvas && !prefersReducedMotion) {

    const ctx = canvas.getContext("2d");

    let width;
    let height;

    let particles = [];

    const resize = () => {

      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;

      const count =
        window.innerWidth < 768 ? 28 : 58;

      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.4 + 0.4,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16
      }));
    };

    resize();

    window.addEventListener("resize", resize);

    const draw = () => {

      ctx.clearRect(0, 0, width, height);

      ctx.fillStyle = "rgba(0,229,255,.34)";

      particles.forEach(particle => {

        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > width) {
          particle.vx *= -1;
        }

        if (particle.y < 0 || particle.y > height) {
          particle.vy *= -1;
        }

        ctx.beginPath();

        ctx.arc(
          particle.x,
          particle.y,
          particle.r,
          0,
          Math.PI * 2
        );

        ctx.fill();
      });

      requestAnimationFrame(draw);
    };

    draw();
  }

  /* =========================================================
     PARALLAX BACKGROUND
  ========================================================= */

  const pageBg = document.querySelector(".page-bg");

  if (pageBg && !prefersReducedMotion) {

    let ticking = false;

    window.addEventListener("scroll", () => {

      if (!ticking) {

        requestAnimationFrame(() => {

          pageBg.style.transform =
            `scale(1.04) translateY(${window.scrollY * 0.025}px)`;

          ticking = false;
        });

        ticking = true;
      }
    });
  }

  /* =========================================================
     SCROLL NAV SHADOW
  ========================================================= */

  const nav = document.querySelector(".nav");

  if (nav) {

    const handleScroll = () => {

      if (window.scrollY > 12) {

        nav.style.background =
          "rgba(5,7,13,.95)";

        nav.style.boxShadow =
          "0 10px 40px rgba(0,0,0,.22)";

      } else {

        nav.style.background =
          "rgba(5,7,13,.84)";

        nav.style.boxShadow = "none";
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
  }

});