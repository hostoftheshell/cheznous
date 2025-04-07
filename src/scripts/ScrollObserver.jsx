import { useEffect } from "react";

export default function ScrollObserver({
  threshold = 0.1,
  scrollThreshold = 50,
}) {
  useEffect(() => {
    // Select elements when the component mounts
    const elementsToToggle = document.querySelectorAll("[data-scroll-toggle]");
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
  }, [threshold, scrollThreshold]); // Re-run if these props change

  // This component doesn't render anything visible
  return null;
}
