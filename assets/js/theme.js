// Theme management for AI Data Foundation
export function initTheme() {
  const getPreferredTheme = () => {
    try {
      const stored = localStorage.getItem("adf_theme");
      if (stored) return stored;
    } catch {}
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  };

  const applyTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Initial application
  applyTheme(getPreferredTheme());

  // Attach toggle handler
  document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById("theme-toggle");
    if (toggleBtn) {
      toggleBtn.addEventListener("click", () => {
        const current = document.documentElement.getAttribute("data-theme") || "light";
        const next = current === "dark" ? "light" : "dark";
        applyTheme(next);
        try {
          localStorage.setItem("adf_theme", next);
        } catch {}
      });
    }
  });

  // Watch for system preference changes
  if (window.matchMedia) {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
      try {
        if (!localStorage.getItem("adf_theme")) {
          applyTheme(e.matches ? "dark" : "light");
        }
      } catch {}
    });
  }
}
