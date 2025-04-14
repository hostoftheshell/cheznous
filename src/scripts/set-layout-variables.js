export function setLayoutVariables() {
  const root = document.documentElement;

  root.style.setProperty("--vh", `${window.innerHeight / 100}px`);
  root.style.setProperty("--vw", `${window.innerWidth / 100}px`);

  const banner = document.querySelector(".c-banner");
  const bannerHeight = banner?.offsetHeight || 0;
  root.style.setProperty("--h-banner", `${bannerHeight}px`);
}

setLayoutVariables();

window.addEventListener("resize", setLayoutVariables);
