import { useEffect } from "react";

export default function BannerAnimationController() {
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    if (!mediaQuery.matches) return;

    const banner = document.querySelector(".c-banner");
    const footer = document.querySelector("footer");
    const header = document.querySelector("header");

    if (!banner || !footer || !header) {
      console.warn(
        "Banner, footer or header element not found. Animation disabled.",
      );
      return;
    }

    const bannerHeight = banner.offsetHeight;
    const footerMargin = bannerHeight;

    if (!bannerHeight) {
      console.warn(
        "Banner has zero height, animation might behave unexpectedly.",
      );
    }

    let isScrolling = false;
    let scrollTimeout;

    const handleScroll = () => {
      if (!isScrolling) {
        window.requestAnimationFrame(() => {
          updateBannerPosition();
          isScrolling = false;
        });

        isScrolling = true;
      }

      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      scrollTimeout = setTimeout(() => {
        updateBannerPosition();
      }, 50);
    };

    const updateBannerPosition = () => {
      const footerRect = footer.getBoundingClientRect();
      const currentHeaderHeight = header.offsetHeight;
      const windowHeight = window.innerHeight;

      if (footerRect.top < windowHeight + bannerHeight) {
        banner.classList.add("is-unfixed");

        const calculatedBannerTop =
          footerRect.top - footerMargin - bannerHeight;

        if (calculatedBannerTop <= currentHeaderHeight) {
          banner.classList.add("is-fixed-at-header");
          banner.style.top = `${currentHeaderHeight}px`;
          banner.style.bottom = "auto";
        } else {
          banner.classList.remove("is-fixed-at-header");
          banner.style.top = `${calculatedBannerTop}px`;
          banner.style.bottom = "auto";
        }
      } else {
        banner.classList.remove("is-unfixed", "is-fixed-at-header");
        banner.style.top = "auto";
        banner.style.bottom = "0";
      }
    };

    const handleResize = () => {
      updateBannerPosition();
    };

    const resizeObserver = new ResizeObserver(() => {
      updateBannerPosition();
    });

    resizeObserver.observe(header);

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    updateBannerPosition();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      resizeObserver.disconnect();
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, []);

  return null;
}
