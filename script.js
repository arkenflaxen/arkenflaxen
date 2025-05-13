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
    Fjärilsdalen: `This project was part of an elective bachelor course
    that mostly focused on extensive use of digital tools
    like subdivision and grasshopper.
    The site, on the outskirts of eastern Helsingborg,
    already had a planned development that involved turning
    top grade arable land into predominantly suburbs.
    We were tasked with creating a new twist of the swedish
    concept “Naturum”, making it more focused on the
    conservation and appreciation of agricultural sites
    like this. The biggest challenge in creating this
    blobby and organic architecture was how to convey
    its spaces through two dimensional drawings.
    The final proposal is a very sculptural building meant
    to symbolise the merge between nature and structure as
    a dichotomy yet with a symbiotic relationship.
    `,
    Tamnougalt: `In this course we were tasked with
    developing architecture through
    biomimicry and parametric design.
    The site was in a small rural town in
    the Moroccan country side and for
    our concept we chose to make new
    roofs for an old abandoned kasbah,
    making it livable again. Our biggest
    concern was shading from the sun
    and to have minimal impact on the
    rammed earth walls. We experimented
    with knitting to make a fabric that
    could have variable density and the
    final proposal was a knitted fabric
    thet shades in accordance with sun
    hours and wind. It is suspended with
    a skeleton of metal that uses the
    existing constructional holes and
    does not require any extra means of
    mounting.`,
    "Santa Fé": `The final project of my exchange to
    Colombia was set in eastern Bogotá, tasked with
    designing a recreational facility with a
    strong emphasis on gender equality and accessability.
    Knowing that many Colombians suffer from different
    kinds of physical impairments due to a long
    history of violence in the region we decided to create
    a paralympic sports arena. It houses all of the
    paralympic summer games that could be performed indoors
    and is fully accessible with specific attention to the
    requirements of the impairments of each individual sport.`,
    Malmöhus: `This was a renovation proposal for the western wing of the Malmö
    Museum comlpex and it focuses on creating a clearer separation between
    the art museum and the castle to enhance the flow through the property.
    By establishing a space between these functions, a gathering place with
    unique qualities for expression and experiences is formed. The site’s former
    prison building served as inspiration for the project’s overall expression,
    this intermediate time and space becomes a dynamic and versatile area that
    contrasts with the current structure and yet ties everything together.`,
    Hamburgsund: `In an attempt to broaden my horizons and
    qualifications as an architect my thesis project
    treats architecture as a total process from initial
    sketch to finished building, aiming to highlight
    what kinds of problems and opportunities arise
    from overseeing the complete construction of
    a project. My goal was to design and construct
    a sauna that could seamlessly integrate into
    the existing, saltwater-sprayed, and rocky
    bathing culture of the Swedish west coast of the
    Bohuslän archipelago. The design is therefor
    meant to mimic a very local typology called a
    “vadbod” and a lot of the materials are reused
    or upcycled, minimising costs and climate
    impact.`,
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
    const description =
      projectDescriptions[title] ||
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
  gridItems.forEach((item) => {
    const img = item.querySelector("img");
    const caption = item.querySelector(".grid-caption").textContent;

    // Make the grid item clickable
    item.addEventListener("click", function (e) {
      e.preventDefault();
      openModal(img.src, caption, img.alt);
    });

    // Add keyboard support for grid items
    item.addEventListener("keydown", function (e) {
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
  modalImage.addEventListener("click", function (e) {
    e.stopPropagation();
  });

  document
    .querySelector(".modal-description")
    .addEventListener("click", function (e) {
      e.stopPropagation();
    });

  // Close on ESC key
  window.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });
});

// Hamburger menu functionality
document.addEventListener("DOMContentLoaded", function() {
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const navOverlay = document.querySelector('.nav-overlay');
  const navLinks = document.querySelectorAll('.nav-overlay .nav-link');
  const sections = document.querySelectorAll('section[id]');
  
  function toggleMenu() {
    hamburgerBtn.classList.toggle('active');
    navOverlay.classList.toggle('active');
    
    // Toggle body scroll
    if (navOverlay.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }
  
  // Update active section in the menu
  function setActiveSection() {
    const scrollPosition = window.scrollY + 100; // Offset for better detection

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      const menuLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
      
      if (menuLink && scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => link.classList.remove('active'));
        menuLink.classList.add('active');
      }
    });
  }

  hamburgerBtn.addEventListener('click', toggleMenu);

  // Close menu when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburgerBtn.classList.remove('active');
      navOverlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
  
  // Close on ESC key
  window.addEventListener("keydown", function(e) {
    if (e.key === "Escape" && navOverlay.classList.contains("active")) {
      hamburgerBtn.classList.remove('active');
      navOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
  
  // Update active section on scroll
  window.addEventListener('scroll', setActiveSection);
  
  // Set initial active section
  setActiveSection();
});

// Contact form modal functionality
document.addEventListener('DOMContentLoaded', function() {
    const contactBtn = document.querySelector('.contact-btn');
    const contactModal = document.getElementById('contact-modal');
    const contactForm = document.getElementById('contact-modal-form');
    
    if (contactBtn && contactModal) {
        function toggleContactModal() {
            contactModal.classList.toggle('active');
            contactBtn.classList.toggle('active');
            
            // Toggle body scroll
            if (contactModal.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
                // Focus first input after animation
                setTimeout(() => {
                    document.getElementById('modal-name').focus();
                }, 300);
            } else {
                document.body.style.overflow = '';
            }
        }

        // Open/close modal
        contactBtn.addEventListener('click', toggleContactModal);
        
        // Open modal with keyboard
        contactBtn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleContactModal();
            }
        });

        // Close on background click
        contactModal.addEventListener('click', function(e) {
            if (e.target === contactModal) {
                toggleContactModal();
            }
        });

        // Stop propagation on form click
        if (contactForm) {
            contactForm.addEventListener('click', function(e) {
                e.stopPropagation();
            });
            
            // Handle form submission
            contactForm.addEventListener('submit', function(e) {
                // Form will submit normally
                setTimeout(toggleContactModal, 100);
            });
        }

        // Close on ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && contactModal.classList.contains('active')) {
                toggleContactModal();
            }
        });
    }
});
