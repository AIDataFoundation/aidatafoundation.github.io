// Progressive enhancements for AI Data Foundation (matching kubedaily.com)

export function initSite() {
  // Reading-width preference persists across visits.
  const readingToggle = document.querySelector('[data-reading-toggle]');
  if (readingToggle) {
    const label = readingToggle.querySelector('span');
    readingToggle.hidden = false;
    const apply = (wide) => {
      document.body.classList.toggle('kube-wide-reading', wide);
      if (label) label.textContent = wide ? 'wide' : 'standard';
      readingToggle.setAttribute('aria-pressed', String(wide));
      try { localStorage.setItem('adf-reading-width', wide ? 'wide' : 'standard'); } catch {}
    };
    let wide = false;
    try { wide = localStorage.getItem('adf-reading-width') === 'wide'; } catch {}
    apply(wide);
    readingToggle.addEventListener('click', () => apply(!document.body.classList.contains('kube-wide-reading')));
  }

  // All cards remain available when JavaScript is disabled.
  for (const library of document.querySelectorAll('[data-content-library]')) {
    const input = library.querySelector('[data-library-search]');
    const cards = [...library.querySelectorAll('[data-library-card]')];
    const contents = cards.map(card => card.textContent.toLocaleLowerCase());
    const controls = library.querySelector('[data-library-controls]');
    if (controls) controls.hidden = false;
    if (input) {
      input.addEventListener('input', () => {
        const words = input.value.toLocaleLowerCase().trim().split(/\s+/).filter(Boolean);
        let visible = 0;
        cards.forEach((card, i) => {
          card.hidden = !words.every(word => contents[i].includes(word));
          if (!card.hidden) visible++;
        });
        const countEl = library.querySelector('[data-library-count]');
        if (countEl) countEl.textContent = `${visible} of ${cards.length} shown`;
        const emptyEl = library.querySelector('[data-library-empty]');
        if (emptyEl) emptyEl.hidden = visible !== 0;
      });
    }
  }

  // Active link highlighting in navigation
  const currentPath = location.pathname.replace(/\/$/, "") || "/";
  for (const link of document.querySelectorAll('.kube-nav-link')) {
    const target = new URL(link.href, location.origin).pathname.replace(/\/$/, "") || "/";
    if (target === currentPath || (target !== "/" && currentPath.startsWith(target + "/"))) {
      link.setAttribute("aria-current", "page");
    }
  }

  // Copy Code Button on all pre blocks in markdown
  const markdownBlocks = document.querySelectorAll('.kube-markdown pre, .adf-markdown pre');
  if (markdownBlocks.length > 0) {
    const status = document.createElement("p");
    status.className = "kube-copy-status";
    status.setAttribute("role", "status");
    status.setAttribute("aria-live", "polite");
    document.querySelector('main')?.append(status);

    for (const pre of markdownBlocks) {
      const code = pre.querySelector('code');
      if (!code || !navigator.clipboard) continue;
      const wrapper = document.createElement('div');
      wrapper.className = 'kube-code-wrapper';
      pre.before(wrapper);
      wrapper.append(pre);
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'kube-copy-code';
      button.textContent = 'Copy code';
      button.setAttribute('aria-label', 'Copy this code block');
      wrapper.prepend(button);
      button.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(code.textContent);
          button.textContent = 'Copied';
          status.textContent = 'Code copied to clipboard.';
        } catch {
          button.textContent = 'Select code to copy';
          status.textContent = 'Clipboard unavailable. Select the code and copy manually.';
        }
        setTimeout(() => { button.textContent = 'Copy code'; }, 2500);
      });
    }
  }

  // Real-time table search filter and LLM Chips
  const table = document.getElementById("models-table");
  const tableFilter = document.querySelector('[data-table-filter]');
  const chips = document.querySelectorAll('.llm-chip');

  if (table) {
    const rows = [...table.querySelectorAll('tbody tr')];
    let currentChip = "all";

    const filterRows = () => {
      const q = tableFilter ? tableFilter.value.toLowerCase().trim() : "";
      rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        const tags = (row.getAttribute("data-tags") || "").toLowerCase();
        const matchesQuery = !q || text.includes(q);
        const matchesChip = currentChip === "all" || tags.includes(currentChip);
        row.hidden = !(matchesQuery && matchesChip);
      });
    };

    if (tableFilter) {
      tableFilter.addEventListener('input', filterRows);
    }

    chips.forEach(chip => {
      chip.addEventListener('click', (e) => {
        e.preventDefault();
        chips.forEach(c => c.classList.remove('is-active'));
        chip.classList.add('is-active');
        currentChip = chip.getAttribute('data-tag') || 'all';
        filterRows();
      });
    });
  }

  // Interactive VRAM Hardware Calculator
  const vramParams = document.getElementById("vram-params");
  const vramQuant = document.getElementById("vram-quant");
  const vramContext = document.getElementById("vram-context");
  const vramKv = document.getElementById("vram-kv");

  if (vramParams && vramQuant && vramContext && vramKv) {
    const updateVramCalc = () => {
      const paramsB = parseFloat(vramParams.value) || 7.0;
      const bytesPerParam = parseFloat(vramQuant.value) || 0.55;
      const contextTokens = parseInt(vramContext.value, 10) || 8192;
      const kvMult = parseFloat(vramKv.value) || 1.0;

      // Model weight memory in GB
      const weightsGb = paramsB * bytesPerParam;

      // KV Cache memory in GB (rough standard: ~0.035 GB per 1B params per 8k context at FP16)
      const kvGb = (paramsB * 0.035) * (contextTokens / 8192) * kvMult;

      // Activation & Runtime CUDA Buffer (~12% of weights, min 0.4 GB)
      const bufferGb = Math.max(0.4, weightsGb * 0.12);

      const totalGb = weightsGb + kvGb + bufferGb;

      // Update outputs
      const totalEl = document.getElementById("vram-total-output");
      const weightsEl = document.getElementById("vram-weights-output");
      const kvEl = document.getElementById("vram-kv-output");
      const bufferEl = document.getElementById("vram-buffer-output");

      if (totalEl) totalEl.textContent = `${totalGb.toFixed(1)} GB`;
      if (weightsEl) weightsEl.textContent = `${weightsGb.toFixed(1)} GB`;
      if (kvEl) kvEl.textContent = `${kvGb.toFixed(1)} GB`;
      if (bufferEl) bufferEl.textContent = `${bufferGb.toFixed(1)} GB`;

      // Update hardware targets
      const updateHwBadge = (id, targetGb) => {
        const badge = document.getElementById(id);
        if (!badge) return;
        if (totalGb <= targetGb * 0.85) {
          badge.className = "vram-badge-ok";
          badge.textContent = "✓ Fits Easily";
        } else if (totalGb <= targetGb) {
          badge.className = "vram-badge-tight";
          badge.textContent = "! Tight Fit";
        } else {
          badge.className = "vram-badge-oom";
          badge.textContent = "✗ Out of Memory";
        }
      };

      updateHwBadge("hw-4gb", 4.0);
      updateHwBadge("hw-8gb", 8.0);
      updateHwBadge("hw-16gb", 16.0);
      updateHwBadge("hw-24gb", 24.0);
      updateHwBadge("hw-80gb", 80.0);
    };

    [vramParams, vramQuant, vramContext, vramKv].forEach(el => {
      el.addEventListener("change", updateVramCalc);
      el.addEventListener("input", updateVramCalc);
    });

    updateVramCalc();
  }

  // GitHub stars counter
  const starCounters = document.querySelectorAll("#kube-github-stars, #adf-github-stars");
  if (starCounters.length > 0) {
    fetch("https://api.github.com/repos/aidatafoundation/aidatafoundation.github.io", {
      signal: AbortSignal.timeout(5000)
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((repo) => {
        if (Number.isFinite(repo?.stargazers_count)) {
          const starsText = `${repo.stargazers_count.toLocaleString()} GitHub stars`;
          starCounters.forEach((el) => {
            el.textContent = starsText;
          });
        }
      })
      .catch(() => {});
  }
}

