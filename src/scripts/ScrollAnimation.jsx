import { useEffect, useRef } from "react";

export default function ScrollAnimation() {
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      const items = document.querySelectorAll(".o-layout__item");
      const containers = document.querySelectorAll(".o-container");
      const itemsArray = Array.from(items);
      const animatedItems = itemsArray.filter(
        (item) => parseFloat(item.getAttribute("data-speed") || "0") !== 0,
      );

      let viewportHeight = window.innerHeight;
      let maxScroll = document.body.scrollHeight - viewportHeight;
      let maxTranslateY = -0.179407 * viewportHeight;
      let baseSpeed = maxTranslateY / maxScroll;
      let maxMarginTop = 260; // Maximum margin-top in pixels for container
      let containerMarginSpeed = maxMarginTop / maxScroll;
      let itemData = [];

      animatedItems.forEach((item) => {
        const speedFactor = parseFloat(item.getAttribute("data-speed") || "0");
        itemData.push({
          element: item,
          speed: baseSpeed * speedFactor,
        });
      });

      let ticking = false;
      let lastScrollY = window.scrollY;

      function updateTransforms(scrollY) {
        for (let i = 0; i < itemData.length; i++) {
          const { element, speed } = itemData[i];
          const translateY = scrollY * speed;
          element.style.transform = `translateY(${translateY}px)`;
        }

        if (containers && containers.length > 0) {
          const marginTop = Math.min(
            scrollY * containerMarginSpeed,
            maxMarginTop,
          );
          containers.forEach((container) => {
            container.style.marginTop = `${marginTop}px`;
            container.style.marginBottom = `-${marginTop}px`;
          });
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

      function onResize() {
        if (window.innerWidth <= 768) {
          window.removeEventListener("scroll", onScroll);
          itemsArray.forEach((item) => {
            item.style.transform = "";
          });
          if (containers && containers.length > 0) {
            containers.forEach((container) => {
              container.style.marginTop = "";
              container.style.marginBottom = "";
            });
          }
          return;
        }

        viewportHeight = window.innerHeight;
        maxScroll = document.body.scrollHeight - viewportHeight;
        maxTranslateY = -0.179407 * viewportHeight;
        baseSpeed = maxTranslateY / maxScroll;
        containerMarginSpeed = maxMarginTop / maxScroll;

        itemData = animatedItems.map((item) => {
          const speedFactor = parseFloat(
            item.getAttribute("data-speed") || "0",
          );
          return {
            element: item,
            speed: baseSpeed * speedFactor,
          };
        });

        updateTransforms(lastScrollY);
      }

      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onResize, { passive: true });

      onResize();
      updateTransforms(lastScrollY);
      isMounted.current = true;

      return () => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onResize);

        itemsArray.forEach((item) => {
          item.style.transform = "";
        });

        if (containers && containers.length > 0) {
          containers.forEach((container) => {
            container.style.marginTop = "";
            container.style.marginBottom = "";
          });
        }
      };
    }
  }, []);

  return null;
}
