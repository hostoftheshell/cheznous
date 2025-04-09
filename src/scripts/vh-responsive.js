function setVhAndLayoutVariables() {
  const root = document.documentElement;
  root.style.setProperty("--vh", `${window.innerHeight / 100}px`);

  // Grab header and banner elements

  const banner = document.querySelector(".c-banner");

  const bannerHeight = banner?.offsetHeight || 0;

  root.style.setProperty("--h-banner", `${bannerHeight}px`);
}

setVhAndLayoutVariables();
window.addEventListener("resize", setVhAndLayoutVariables);
