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
    errorEls.forEach((el) => (el.textContent = ""));
    statusEl.textContent = "";
  }

  function setError(fieldName, message) {
    const el = form.querySelector(`.form-error[data-for="${fieldName}"]`);
    if (el) el.textContent = message;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    clearErrors();

    let isValid = true;

    if (!nameInput.value.trim()) {
      setError("name", "Please provide your name.");
      isValid = false;
    }

    const emailValue = emailInput.value.trim();
    if (!emailValue || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
      setError("email", "Please provide a valid email address.");
      isValid = false;
    }

    if (!messageInput.value.trim()) {
      setError("message", "Please provide a message.");
      isValid = false;
    }

    if (!isValid) return;

    statusEl.textContent = "Sending…";

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        statusEl.textContent = "Thank you! Your message has been sent.";
        form.reset();
      } else {
        statusEl.textContent = "An error occurred. Please try again.";
      }
    } catch {
      statusEl.textContent = "Could not send message.";
    }
  });
});
