// Function to toggle visibility of project descriptions
function toggleProjectDescription() {
    const descriptions = document.querySelectorAll('.project-description');
    descriptions.forEach(description => {
        description.classList.toggle('hidden');
    });
}

// Event listener for toggling project descriptions
document.querySelectorAll('.toggle-description').forEach(button => {
    button.addEventListener('click', toggleProjectDescription);
});

// Image slider functionality for mobile
let currentSlide = 0;
const slides = document.querySelectorAll('.slider img');
const totalSlides = slides.length;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.style.display = (i === index) ? 'block' : 'none';
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
}

// Event listeners for slider
document.querySelector('.next').addEventListener('click', nextSlide);
document.querySelector('.prev').addEventListener('click', prevSlide);

// Initial display
showSlide(currentSlide);