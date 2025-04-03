function handleMobileNavToggle() {
  const toggleButton = document.querySelector(".c-header__mobile-nav-toggle");
  const navOverlay = document.querySelector(".c-mobile-nav-overlay");
  const hamburgerIcon = document.querySelector(
    ".c-header__mobile-nav-toggle-icon--hamburger",
  );
  const closeIcon = document.querySelector(
    ".c-header__mobile-nav-toggle-icon--close",
  );
  const socialIcons = document.querySelectorAll(
    ".c-header__social-icon, .c-header__social-link",
  );

  if (!toggleButton) return;

  const isExpanded = toggleButton.getAttribute("aria-expanded") === "true";
  const newState = !isExpanded;

  toggleButton.setAttribute("aria-expanded", String(newState));
  navOverlay?.classList.toggle("expanded", newState);
  hamburgerIcon?.classList.toggle("hidden", newState);
  closeIcon?.classList.toggle("hidden", !newState);
  socialIcons?.forEach((icon) =>
    icon.classList.toggle("-mobile-display", newState),
  );
  document.body.style.overflow = newState ? "hidden" : "";
}
document
  .querySelector(".c-header__mobile-nav-toggle")
  ?.addEventListener("click", handleMobileNavToggle, { passive: true });
