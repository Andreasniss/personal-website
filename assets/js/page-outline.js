(() => {
  const outline = document.querySelector(".page-outline details");
  if (!outline) return;
  const narrow = window.matchMedia("(max-width: 900px)");
  const setDefault = () => { outline.open = !narrow.matches; };
  setDefault();
  narrow.addEventListener("change", setDefault);
})();
