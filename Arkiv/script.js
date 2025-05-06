document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById("dark-mode-toggle");
  const body = document.body;

  if (!toggleButton) {
    console.error("Kunde inte hitta dark mode-knappen!");
    return;
  }

  function updateButtonStyle() {
    if (body.classList.contains("dark-mode")) {
      toggleButton.style.backgroundColor = "#e1c16e";
      toggleButton.style.color = "#333";
    } else {
      toggleButton.style.backgroundColor = "#a0522d";
      toggleButton.style.color = "#fffaf0";
    }
  }

  // Kolla användarens preferens i localStorage
  const userPreference = localStorage.getItem("dark-mode");

  if (userPreference === "enabled") {
    body.classList.add("dark-mode");
  } else if (userPreference === "disabled") {
    body.classList.remove("dark-mode");
  } else {
    // Om ingen preference finns i localStorage, kolla systemets inställningar
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      body.classList.add("dark-mode");
    } else {
      body.classList.remove("dark-mode");
    }
  }

  updateButtonStyle();

  toggleButton.addEventListener("click", function () {
    body.classList.toggle("dark-mode");

    // Spara användarens val i localStorage
    if (body.classList.contains("dark-mode")) {
      localStorage.setItem("dark-mode", "enabled");
    } else {
      localStorage.setItem("dark-mode", "disabled");
    }

    updateButtonStyle();
  });
});
