import { useEffect } from "react";

export default function ScrollObserver({
  threshold = 0.1,
  scrollThreshold = 50,
  excludedPages = ["mention-legales"],
}) {
  useEffect(() => {
    // Select elements when the component mounts
    const elementsToToggle = document.querySelectorAll("[data-scroll-toggle]");

    // Get the current page path
    const currentPath = window.location.pathname;
    const pageName = currentPath.split("/").pop().replace(".html", "");

    // Check if current page is in the excluded list
    const isExcludedPage = excludedPages.some(
      (page) => pageName === page || pageName.startsWith(`${page}.`),
    );

    // If we're on an excluded page, always apply the -scrolled class and skip observer
    if (isExcludedPage && elementsToToggle.length) {
      elementsToToggle.forEach((el) => {
        el.classList.add("-scrolled");
      });
      return; // Exit early, no need for observer
    }

    // Normal scroll observation behavior for non-excluded pages
    const trigger = document.querySelector(".scroll-trigger");
    if (trigger && elementsToToggle.length) {
      let isScrolled = false;
      // Create the intersection observer
      const observer = new IntersectionObserver(
        ([entry]) => {
          const newState = !entry.isIntersecting;
          if (newState !== isScrolled) {
            isScrolled = newState;
            elementsToToggle.forEach((el) => {
              el.classList.toggle("-scrolled", isScrolled);
            });
          }
        },
        {
          threshold: threshold,
          rootMargin: `${scrollThreshold}px 0px 0px 0px`,
        },
      );
      // Start observing
      observer.observe(trigger);
      // Clean up function - stop observing when component unmounts
      return () => {
        observer.disconnect();
      };
    }
  }, [threshold, scrollThreshold, excludedPages]); // Re-run if these props change

  // This component doesn't render anything visible
  return null;
}
