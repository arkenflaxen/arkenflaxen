// Initialize header in hidden state
document.addEventListener("DOMContentLoaded", function () {
  const header = document.getElementById("main-header");
  header.classList.add("hidden-header");
});

// Scroll effects for header and main title with smoother transitions
window.addEventListener("scroll", function () {
  const header = document.getElementById("main-header");
  const mainTitle = document.querySelector(".centered-title");
  const scrollPosition = window.scrollY;
  const firstSection = document.getElementById("grid-section");
  const sectionTop = firstSection.offsetTop;

  // Start title fade out earlier and progressively
  if (scrollPosition > 50) {
    // Calculate fade based on scroll position
    const fadeRatio = Math.min(scrollPosition / (sectionTop * 0.5), 1);
    mainTitle.style.opacity = 1 - fadeRatio;
    mainTitle.style.transform = `translateY(-${fadeRatio * 70}px)`;

    // Show header when approaching the next section
    if (scrollPosition >= sectionTop - 150) {
      header.classList.remove("hidden-header");
      header.classList.add("visible-header");
    }
  } else {
    // Reset when at the top
    mainTitle.style.opacity = 1;
    mainTitle.style.transform = "translateY(0)";
    header.classList.remove("visible-header");
    header.classList.add("hidden-header");
  }
});

// Smooth scroll to top when clicking the header title
document.getElementById("header-title").addEventListener("click", function (e) {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
