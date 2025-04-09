import { useEffect, useState } from "react";

export default function MobileNavToggle() {
  // Use state to track menu open/closed
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the menu
  const toggleMenu = () => {
    setIsOpen((prevState) => !prevState);
  };

  // Function to close the menu
  const closeMenu = () => {
    setIsOpen(false);
  };

  // Use effect to handle DOM updates when state changes
  useEffect(() => {
    // Find all the elements we need to manipulate
    const header = document.querySelector(".c-header");
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

    // Bail if elements not found
    if (!toggleButton) return;

    // Update the DOM based on isOpen state
    toggleButton.setAttribute("aria-expanded", String(isOpen));
    header.classList.toggle("is-mobile-menu-open", isOpen);
    navOverlay?.classList.toggle("expanded", isOpen);
    hamburgerIcon?.classList.toggle("hidden", isOpen);
    closeIcon?.classList.toggle("hidden", !isOpen);
    socialIcons?.forEach((icon) =>
      icon.classList.toggle("-mobile-display", isOpen),
    );
    document.body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]); // Re-run effect whenever isOpen changes

  // Set up the click handlers when component mounts
  useEffect(() => {
    const toggleButton = document.querySelector(".c-header__mobile-nav-toggle");
    const navLinks = document.querySelectorAll(".c-header__mobile-nav_link");

    if (!toggleButton) return;

    // Add click event listener to toggle button
    toggleButton.addEventListener("click", toggleMenu, { passive: true });

    // Add click event listeners to all nav links
    navLinks.forEach((link) => {
      link.addEventListener("click", closeMenu, { passive: true });
    });

    // Clean up when component unmounts
    return () => {
      toggleButton.removeEventListener("click", toggleMenu);
      navLinks.forEach((link) => {
        link.removeEventListener("click", closeMenu);
      });
    };
  }, []); // Empty array ensures this only runs once on mount
  return null;
}
