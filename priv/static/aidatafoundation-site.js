// Progressive enhancements for AI Data Foundation (matching kubedaily.com)
// Reading-width preference persists across visits.
const readingToggle = document.querySelector('[data-reading-toggle]');
if (readingToggle) {
  const label = readingToggle.querySelector('span');
  readingToggle.hidden = false;
  const apply = wide => {
    document.body.classList.toggle('kube-wide-reading', wide);
    label.textContent = wide ? 'wide' : 'standard';
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
const path = location.pathname.replace(/\/$/, "") || "/";
for (const link of document.querySelectorAll('.kube-nav-link')) {
  const target = new URL(link.href).pathname.replace(/\/$/, "") || "/";
  if (target === path || (target !== "/" && path.startsWith(target + "/"))) {
    link.setAttribute("aria-current", "page");
  }
}

// Copy Code Button on all pre blocks
const status = document.createElement("p");
status.className = "kube-copy-status";
status.setAttribute("role", "status");
status.setAttribute("aria-live", "polite");
if (document.querySelector('.kube-markdown pre')) {
  document.querySelector('main')?.append(status);
}

for (const pre of document.querySelectorAll('.kube-markdown pre')) {
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
      status.textContent = 'Code copied. Review it before running in a disposable environment.';
    } catch {
      button.textContent = 'Select code to copy';
      status.textContent = 'Clipboard unavailable. Select the code and copy manually.';
    }
    setTimeout(() => { button.textContent = 'Copy code'; }, 2500);
  });
}
