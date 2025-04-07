import { useEffect, useRef } from "react";

export default function ScrollAnimation() {
  // Use ref to track if the component is mounted
  const isMounted = useRef(false);

  useEffect(() => {
    // Only run once when the component mounts
    if (!isMounted.current) {
      const items = document.querySelectorAll(".o-layout__item");
      const itemsArray = Array.from(items);
      const animatedItems = itemsArray.filter(
        (item) => parseFloat(item.getAttribute("data-speed") || "0") !== 0,
      );

      // Cache viewport height and precalculate values
      let viewportHeight = window.innerHeight;
      let maxScroll = document.body.scrollHeight - viewportHeight;
      let maxTranslateY = -0.179407 * viewportHeight;
      let baseSpeed = maxTranslateY / maxScroll;
      let itemData = [];

      // Precalculate data for each item
      animatedItems.forEach((item) => {
        const speedFactor = parseFloat(item.getAttribute("data-speed") || "0");
        itemData.push({
          element: item,
          speed: baseSpeed * speedFactor,
        });
      });

      // Use requestAnimationFrame for smoother animations
      let ticking = false;
      let lastScrollY = window.scrollY;

      function updateTransforms(scrollY) {
        for (let i = 0; i < itemData.length; i++) {
          const { element, speed } = itemData[i];
          const translateY = scrollY * speed;
          element.style.transform = `translateY(${translateY}px)`;
        }
        ticking = false;
      }

      function onScroll() {
        lastScrollY = window.scrollY;
        if (!ticking) {
          window.requestAnimationFrame(() => {
            updateTransforms(lastScrollY);
          });
          ticking = true;
        }
      }

      // Recalculate on resize for responsive behavior
      function onResize() {
        // This check isn't needed anymore since the component won't even load on mobile
        // thanks to the client:media directive, but keeping it for safety
        if (window.innerWidth <= 768) {
          // Disable animation if resized to mobile
          window.removeEventListener("scroll", onScroll);
          itemsArray.forEach((item) => {
            item.style.transform = "";
          });
          return;
        }

        viewportHeight = window.innerHeight;
        maxScroll = document.body.scrollHeight - viewportHeight;
        maxTranslateY = -0.179407 * viewportHeight;
        baseSpeed = maxTranslateY / maxScroll;

        // Update item data with new calculations
        itemData = animatedItems.map((item) => {
          const speedFactor = parseFloat(
            item.getAttribute("data-speed") || "0",
          );
          return {
            element: item,
            speed: baseSpeed * speedFactor,
          };
        });

        // Update transforms immediately after resize
        updateTransforms(lastScrollY);
      }

      // Add event listeners
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onResize, { passive: true });

      // Initial update
      onResize();
      updateTransforms(lastScrollY);

      isMounted.current = true;

      // Cleanup function to remove event listeners when component unmounts
      return () => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onResize);
        // Reset all transforms when component unmounts
        itemsArray.forEach((item) => {
          item.style.transform = "";
        });
      };
    }
  }, []); // Empty dependency array ensures this runs only once

  // Component doesn't render anything visible
  return null;
}
