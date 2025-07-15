// Scroll effects for header and main title
window.addEventListener("scroll", function () {
  const mainTitle = document.querySelector(".centered-title");
  const firstSection = document.getElementById("grid-section");
  if (!mainTitle || !firstSection) return;

  const scrollPosition = window.scrollY;
  const sectionTop = firstSection.offsetTop;

  if (scrollPosition > 50) {
    const fadeRatio = Math.min(scrollPosition / (sectionTop * 0.5), 1);
    mainTitle.style.opacity = 1 - fadeRatio;
    mainTitle.style.transform = `translateY(-${fadeRatio * 70}px)`;
  } else {
    mainTitle.style.opacity = 1;
    mainTitle.style.transform = "translateY(0)";
  }
});

// Scroll to top when clicking header title (without smooth scroll)
document
  .getElementById("header-title")
  ?.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({ top: 0 });
  });

// Hamburger menu functionality
document.addEventListener("DOMContentLoaded", function () {
  const hamburgerBtn = document.querySelector(".hamburger-btn");
  const navOverlay = document.querySelector(".nav-overlay");

  if (!hamburgerBtn || !navOverlay) return;

  function toggleMenu(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    hamburgerBtn.classList.toggle("active");
    navOverlay.classList.toggle("active");
  }

  hamburgerBtn.addEventListener("click", toggleMenu);
  hamburgerBtn.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleMenu(e);
    }
  });

  hamburgerBtn.setAttribute("tabindex", "0");

  document.addEventListener("click", function (e) {
    if (
      !navOverlay.contains(e.target) &&
      !hamburgerBtn.contains(e.target) &&
      navOverlay.classList.contains("active")
    ) {
      toggleMenu();
    }
  });

  window.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && navOverlay.classList.contains("active")) {
      toggleMenu();
    }
  });
});

// Contact form modal functionality
document.addEventListener("DOMContentLoaded", function () {
  const contactBtn = document.querySelector(".contact-btn");
  const contactModal = document.getElementById("contact-modal");
  const contactForm = document.getElementById("contact-modal-form");

  if (!contactBtn || !contactModal) return;

  function toggleContactModal() {
    contactModal.classList.toggle("active");
    contactBtn.classList.toggle("active");

    if (contactModal.classList.contains("active")) {
      setTimeout(() => {
        document.getElementById("modal-name")?.focus();
      }, 300);
    }
  }

  contactBtn.addEventListener("click", toggleContactModal);
  contactBtn.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleContactModal();
    }
  });

  contactModal.addEventListener("click", function (e) {
    if (e.target === contactModal) {
      toggleContactModal();
    }
  });

  if (contactForm) {
    contactForm.addEventListener("click", function (e) {
      e.stopPropagation();
    });

    contactForm.addEventListener("submit", function () {
      setTimeout(toggleContactModal, 100);
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && contactModal.classList.contains("active")) {
      toggleContactModal();
    }
  });
});
