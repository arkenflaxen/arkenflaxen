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

// Image Modal Functionality
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("image-modal");
  const modalImage = document.getElementById("modal-image");
  const modalTitle = document.getElementById("modal-title");
  const modalDescription = document.getElementById("modal-description-text");
  const closeButton = document.getElementById("modal-close");
  const modalOverlay = document.querySelector(".modal-overlay");
  const gridItems = document.querySelectorAll(".grid-item");
  
  // Project descriptions - can be extended with more projects
  const projectDescriptions = {
    "Fjärilsdalen": "This project explores the natural beauty of Fjärilsdalen, showcasing the unique landscape and biodiversity of the area. The design emphasizes sustainable development while preserving the ecological balance of the valley.",
    "Tamnougalt": "Tamnougalt is an architectural study of traditional Moroccan building techniques adapted to modern needs. The project investigates how ancient knowledge can inform contemporary sustainable design practices.",
    "Santa Fé": "This night render of Santa Fé demonstrates advanced lighting techniques and atmosphere creation. The project focuses on creating an immersive urban environment that balances historical elements with modern infrastructure.",
    "Malmöhus": "The Malmöhus project reimagines historical spaces for contemporary use, with particular attention to public accessibility and cultural preservation. The architectural approach respects the building's heritage while adding functional modern elements.",
    "Hamburgsund": "The Sauna Raft project at Hamburgsund combines traditional Swedish sauna culture with innovative floating architecture. This sustainable design creates a unique experience connecting users with the surrounding natural environment."
  };
  
  // Store the element that had focus before opening modal
  let lastFocusedElement;

  // Open modal with image
  function openModal(imageSrc, title, altText) {
    // Save current focus for later restoration
    lastFocusedElement = document.activeElement;
    
    // Set image source and alt text
    modalImage.src = imageSrc;
    modalImage.alt = altText;
    
    // Set the title and description
    modalTitle.textContent = title;
    
    // Get description from our project descriptions object, or use a default message
    const description = projectDescriptions[title] || 
                       "This is an example project showcasing architectural and design work.";
    modalDescription.textContent = description;
    
    // Show modal with transition
    modal.classList.add("active");
    
    // Focus the close button for keyboard accessibility
    setTimeout(() => {
      closeButton.focus();
    }, 50);
    
    // Prevent background scrolling
    document.body.style.overflow = "hidden";
  }

  // Close modal function
  function closeModal() {
    // Hide modal with transition
    modal.classList.remove("active");
    
    // Restore scroll
    document.body.style.overflow = "";
    
    // Restore focus to the element that was focused before opening the modal
    if (lastFocusedElement) {
      setTimeout(() => {
        lastFocusedElement.focus();
      }, 300); // Match transition timing
    }
  }

  // Add click event to each grid item
  gridItems.forEach(item => {
    const img = item.querySelector("img");
    const caption = item.querySelector(".grid-caption").textContent;
    
    // Make the grid item clickable
    item.addEventListener("click", function(e) {
      e.preventDefault();
      openModal(img.src, caption, img.alt);
    });
    
    // Add keyboard support for grid items
    item.addEventListener("keydown", function(e) {
      // Enter or Space key
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModal(img.src, caption, img.alt);
      }
    });
  });

  // Close on X button click
  closeButton.addEventListener("click", closeModal);
  
  // Close on overlay click (outside the image)
  modalOverlay.addEventListener("click", closeModal);
  
  // Prevent closing when clicking the modal content (image or description)
  modalImage.addEventListener("click", function(e) {
    e.stopPropagation();
  });
  
  document.querySelector(".modal-description").addEventListener("click", function(e) {
    e.stopPropagation();
  });

  // Close on ESC key
  window.addEventListener("keydown", function(e) {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });
});
