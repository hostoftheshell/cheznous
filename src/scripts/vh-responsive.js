function setVhVariable() {
  document.documentElement.style.setProperty(
    "--vh",
    `${window.innerHeight / 100}px`,
  );
}

setVhVariable();
window.addEventListener("resize", setVhVariable);
