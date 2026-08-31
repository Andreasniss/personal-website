(() => {
  const tools = document.querySelector("[data-writing-tools]");
  const list = document.querySelector("[data-writing-list]");
  if (!tools || !list) return;

  const search = tools.querySelector("[data-writing-search]");
  const count = tools.querySelector("[data-writing-count]");
  const buttons = [...tools.querySelectorAll("[data-topic-filter]")];
  const cards = [...list.querySelectorAll(".writing-card")];
  let activeTopic = "all";

  const applyFilters = () => {
    const query = search.value.trim().toLowerCase();
    let visible = 0;
    for (const card of cards) {
      const matchesQuery = !query || card.dataset.search.includes(query);
      const matchesTopic = activeTopic === "all" || card.dataset.topic === activeTopic;
      const show = matchesQuery && matchesTopic;
      card.hidden = !show;
      if (show) visible += 1;
    }
    count.textContent = `${visible} ${visible === 1 ? "article" : "articles"}`;
  };

  search.addEventListener("input", applyFilters);
  for (const button of buttons) {
    button.addEventListener("click", () => {
      activeTopic = button.dataset.topicFilter;
      for (const candidate of buttons) {
        const selected = candidate === button;
        candidate.classList.toggle("is-active", selected);
        candidate.setAttribute("aria-pressed", String(selected));
      }
      applyFilters();
    });
  }

  applyFilters();
})();
