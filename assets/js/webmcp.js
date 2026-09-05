(() => {
  const outline = document.querySelector(".page-outline details");
  if (!outline) return;
  const narrow = window.matchMedia("(max-width: 900px)");
  const setDefault = () => { outline.open = !narrow.matches; };
  setDefault();
  narrow.addEventListener("change", setDefault);
})();

(function () {
  "use strict";

  if (!("modelContext" in document) || typeof document.modelContext.registerTool !== "function") {
    return;
  }

  var indexUrl = document.documentElement.getAttribute("data-index-url");
  if (!indexUrl) {
    return;
  }

  var lifecycle = new AbortController();
  var cachedIndex = null;

  function loadIndex() {
    if (cachedIndex) {
      return Promise.resolve(cachedIndex);
    }
    return fetch(indexUrl, { signal: lifecycle.signal })
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Site index request failed: " + response.status);
        }
        return response.json();
      })
      .then(function (data) {
        cachedIndex = data;
        return data;
      });
  }

  function matches(entry, needle) {
    var haystack = [entry.title, entry.description, entry.section]
      .concat(entry.tags || [])
      .join(" ")
      .toLowerCase();
    return haystack.indexOf(needle) !== -1;
  }

  document.modelContext.registerTool(
    {
      name: "search_site",
      description:
        "Search Andreas Nissen's writing, projects, workshops, and reading list by keyword or topic. Read-only: returns matching titles, URLs, descriptions, and Markdown source links; it does not change page state.",
      inputSchema: {
        type: "object",
        properties: {
          query: {
            type: "string",
            description: "Free-text search across titles, descriptions, and tags.",
          },
          section: {
            type: "string",
            enum: ["writing", "projects", "talks", "impact", "work-i-love"],
            description: "Optional: restrict results to one section of the site.",
          },
        },
        required: ["query"],
      },
      annotations: {
        readOnlyHint: true,
        untrustedContentHint: false,
      },
      execute: function (input, context) {
        var query = (input && input.query ? String(input.query) : "").trim().toLowerCase();
        var section = input && input.section;
        return loadIndex().then(function (entries) {
          var results = entries.filter(function (entry) {
            if (section && entry.section !== section) {
              return false;
            }
            return query === "" || matches(entry, query);
          });
          return {
            count: results.length,
            results: results.slice(0, 10),
          };
        });
      },
    },
    { signal: lifecycle.signal }
  );

  window.addEventListener("pagehide", function (event) {
    if (event.persisted) {
      return;
    }
    lifecycle.abort();
  });
})();
