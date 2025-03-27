const toggleButton = document.querySelector(".c-header__mobile-nav-toggle");

toggleButton?.addEventListener("click", () => {
  const navOverlay = document.querySelector(".c-mobile-nav-overlay");
  const isExpanded = toggleButton.getAttribute("aria-expanded") === "true";

  toggleButton.setAttribute("aria-expanded", !isExpanded);
  navOverlay?.classList.toggle("expanded");

  document
    .querySelector(".c-header__mobile-nav-toggle-icon--hamburger")
    ?.classList.toggle("hidden");
  document
    .querySelector(".c-header__mobile-nav-toggle-icon--close")
    ?.classList.toggle("hidden");
});
