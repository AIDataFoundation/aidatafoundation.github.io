import { entries } from "/aidatafoundation/entries.js";

const root = document.querySelector("#kube-tools") || document.querySelector("#adf-tools");
const tags = [...new Set(entries.map(({ tag }) => tag).filter(Boolean))].sort();
const pageSize = 24;
let page = 1;

function escape(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[character]);
}

function projectUrl(value) {
  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol) ? url.href : null;
  } catch {
    return null;
  }
}

function card(entry) {
  const link = projectUrl(entry.link);
  const url = link ? new URL(link) : null;
  const parts = url?.hostname === "github.com" ? url.pathname.split("/").filter(Boolean) : [];
  const badge =
    parts.length >= 2
      ? `<img class="kube-stars-image adf-stars-image" loading="lazy" width="95" height="20" src="https://img.shields.io/github/stars/${encodeURIComponent(parts[0])}/${encodeURIComponent(parts[1].replace(/\.git$/, ""))}.svg?style=flat&label=stars&color=7c3aed" alt="GitHub stars">`
      : "";

  return `
    <article class="kube-tool-card adf-tool-card">
      <div class="kube-tool-card-meta adf-tool-card-meta">
        <span class="kube-label adf-tool-tag">${escape(entry.tag || "AI Tool")}</span>
        ${badge}
      </div>
      <h3 class="kube-tool-title adf-tool-title">${escape(entry.title)}</h3>
      <p class="kube-tool-desc adf-tool-desc">${escape(entry.description || "Explore this open-source AI project, documentation, and installation instructions.")}</p>
      <div class="kube-tool-footer adf-tool-footer">
        ${
          link
            ? `<a class="kube-tool-link adf-tool-link" href="${escape(link)}" target="_blank" rel="noopener noreferrer">Visit Project <span aria-hidden="true">&nearr;</span></a>`
            : '<span class="text-slate-400 text-xs">Link unavailable</span>'
        }
      </div>
    </article>
  `;
}

if (root) {
  root.innerHTML = `
    <form class="kube-tool-controls adf-tool-controls" role="search" aria-label="Find AI and LLM tools">
      <div class="w-full">
        <label for="tool-query" class="sr-only">Search tools</label>
        <input id="tool-query" name="q" type="search" placeholder="Search TensorFlow, LangChain, MCP servers, Ollama, Weaviate…" autocomplete="off" class="w-full">
      </div>
      <div class="flex flex-wrap items-center gap-3">
        <label for="tool-category" class="sr-only">Category</label>
        <select id="tool-category" name="category">
          <option value="">All Categories (${tags.length})</option>
          ${tags.map(tag => `<option value="${escape(tag)}">${escape(tag)}</option>`).join("")}
        </select>
        <label for="tool-sort" class="sr-only">Sort by</label>
        <select id="tool-sort" name="sort">
          <option value="az">Name: A–Z</option>
          <option value="za">Name: Z–A</option>
        </select>
        <button type="button" class="kube-button kube-button-outline kube-filter-reset adf-filter-reset text-xs py-2 px-3">Reset Filter</button>
      </div>
    </form>
    <div class="my-4">
      <p class="kube-tool-count adf-tool-count" role="status" aria-live="polite" aria-atomic="true"></p>
    </div>
    <div class="kube-tool-grid adf-tool-grid" id="tool-results"></div>
    <div class="mt-12 text-center">
      <button type="button" class="kube-button" id="tool-more">Load More Tools</button>
    </div>
  `;

  const form = root.querySelector("form");
  const input = root.querySelector("#tool-query");
  const category = root.querySelector("#tool-category");
  const sort = root.querySelector("#tool-sort");
  const results = root.querySelector("#tool-results");
  const count = root.querySelector('[role="status"]');
  const more = root.querySelector("#tool-more");
  const clear = root.querySelector(".kube-filter-reset");

  function restore() {
    const params = new URLSearchParams(location.search);
    input.value = params.get("q") || "";
    category.value = tags.includes(params.get("category")) ? params.get("category") : "";
    sort.value = params.get("sort") === "za" ? "za" : "az";
    page = 1;
  }

  function updateUrl() {
    const url = new URL(location.href);
    for (const [key, value] of [
      ["q", input.value],
      ["category", category.value],
      ["sort", sort.value === "az" ? "" : sort.value]
    ]) {
      if (value) url.searchParams.set(key, value);
      else url.searchParams.delete(key);
    }
    history.replaceState(null, "", url);
  }

  function render({ append = false } = {}) {
    const words = input.value.toLowerCase().trim().split(/\s+/).filter(Boolean);
    const visible = entries
      .filter((entry) => {
        const haystack = `${entry.title} ${entry.description || ""} ${entry.tag || ""}`.toLowerCase();
        return (
          (!category.value || entry.tag === category.value) &&
          words.every((word) => haystack.includes(word))
        );
      })
      .sort((a, b) => (sort.value === "za" ? -1 : 1) * a.title.localeCompare(b.title));

    const limit = Math.min(page * pageSize, visible.length);
    const cards = visible
      .slice(append ? (page - 1) * pageSize : 0, limit)
      .map(card)
      .join("");

    if (append) {
      results.insertAdjacentHTML("beforeend", cards);
    } else {
      results.innerHTML =
        cards ||
        `
        <div class="col-span-full py-16 text-center">
          <div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-violet-500/10 text-violet-400 mb-4 font-bold text-xl">
            ?
          </div>
          <h3 class="text-xl font-bold text-slate-900 [data-theme=dark]:text-white mb-2">No matching tools found</h3>
          <p class="text-slate-500 max-w-md mx-auto text-sm">Try broader keywords or clear your filters to browse the complete directory.</p>
        </div>
      `;
    }

    count.textContent = `Showing ${limit} of ${visible.length} tools (${entries.length} total indexed)`;
    more.hidden = limit >= visible.length;
    clear.disabled = !input.value && !category.value && sort.value === "az";
  }

  form.addEventListener("submit", (event) => event.preventDefault());
  input.addEventListener("input", () => {
    page = 1;
    updateUrl();
    render();
  });
  for (const select of [category, sort]) {
    select.addEventListener("change", () => {
      page = 1;
      updateUrl();
      render();
    });
  }
  clear.addEventListener("click", () => {
    input.value = "";
    category.value = "";
    sort.value = "az";
    page = 1;
    updateUrl();
    render();
    input.focus();
  });
  more.addEventListener("click", () => {
    page += 1;
    render({ append: true });
  });
  window.addEventListener("popstate", () => {
    restore();
    render();
  });

  restore();
  render();
}

const starCounters = document.querySelectorAll("#kube-github-stars, #adf-github-stars");
if (starCounters.length > 0) {
  fetch("https://api.github.com/repos/aidatafoundation/aidatafoundation.github.io", {
    signal: AbortSignal.timeout(5000)
  })
    .then((res) => (res.ok ? res.json() : null))
    .then((repo) => {
      if (Number.isFinite(repo?.stargazers_count)) {
        const text = `${repo.stargazers_count.toLocaleString()} GitHub stars`;
        starCounters.forEach(el => el.textContent = text);
      }
    })
    .catch(() => {});
}
