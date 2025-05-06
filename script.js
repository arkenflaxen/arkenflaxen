document.addEventListener("DOMContentLoaded", function () {
  const themeSelector = document.getElementById("themeSelector");
  const body = document.body;

  function applyTheme(theme) {
    body.classList.remove("light-mode", "dark-mode");

    if (theme === "dark") {
      body.classList.add("dark-mode");
    } else if (theme === "light") {
      body.classList.add("light-mode");
    } else if (theme === "system") {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        body.classList.add("dark-mode");
      } else {
        body.classList.add("light-mode");
      }
    }
  }

  // Hämta lagrat tema vid sidladdning
  const savedTheme = localStorage.getItem("theme") || "system";
  themeSelector.value = savedTheme;
  applyTheme(savedTheme);

  // Lyssna på ändringar i dropdown-menyn
  themeSelector.addEventListener("change", function () {
    const selectedTheme = themeSelector.value;
    localStorage.setItem("theme", selectedTheme);
    applyTheme(selectedTheme);
  });

  // Uppdatera om systemtemat ändras (endast om system är valt)
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", function () {
      if (themeSelector.value === "system") {
        applyTheme("system");
      }
    });
});
