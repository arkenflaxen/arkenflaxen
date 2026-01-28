document.addEventListener("DOMContentLoaded", () => {
  const galleries = document.querySelectorAll(".project-gallery");

  galleries.forEach((gallery) => {
    const images = gallery.querySelectorAll(".project-images .image");
    const prevBtn = gallery.querySelector(".project-prev");
    const nextBtn = gallery.querySelector(".project-next");

    images.forEach((img, i) => {
      if (i === 0) img.classList.add("is-active");
      else img.classList.remove("is-active");
    });

    if (images.length === 0) return;

    let index = 0;

    function show(newIndex) {
      images[index].classList.remove("is-active");
      index = (newIndex + images.length) % images.length;
      images[index].classList.add("is-active");
    }

    prevBtn.addEventListener("click", () => {
      show(index - 1);
    });

    nextBtn.addEventListener("click", () => {
      show(index + 1);
    });
  });

  const form = document.querySelector("#contact-form");
  if (!form) return;

  const nameInput = form.querySelector("#name");
  const emailInput = form.querySelector("#email");
  const messageInput = form.querySelector("#message");
  const statusEl = document.querySelector("#form-status");
  const errorEls = form.querySelectorAll(".form-error");

  function clearErrors() {
    errorEls.forEach((el) => {
      el.textContent = "";
    });
    if (statusEl) {
      statusEl.textContent = "";
    }
  }

  function setError(fieldName, message) {
    const el = form.querySelector(`.form-error[data-for="${fieldName}"]`);
    if (el) {
      el.textContent = message;
    }
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    clearErrors();

    let isValid = true;

    if (!nameInput.value.trim()) {
      setError("name", "Skriv gärna ditt namn.");
      isValid = false;
    }

    const emailValue = emailInput.value.trim();
    if (!emailValue) {
      setError("email", "Email behövs för att jag ska kunna svara.");
      isValid = false;
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailValue)) {
        setError("email", "Skriv en giltig emailadress.");
        isValid = false;
      }
    }

    if (!messageInput.value.trim()) {
      setError("message", "Skriv gärna ett kort meddelande.");
      isValid = false;
    }

    if (!isValid) return;

    statusEl.textContent = "Skickar…";

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        statusEl.textContent = "Tack! Ditt meddelande har skickats.";
        form.reset();
      } else {
        statusEl.textContent = "Något gick fel. Försök igen.";
      }
    } catch (error) {
      statusEl.textContent = "Kunde inte skicka meddelandet.";
    }
  });
});
