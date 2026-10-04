# AI Data Foundation

The open-source AI and LLM learning, benchmarking, and tool curation platform, reimplemented in Elixir and the Phoenix web framework (matching the architecture of [kubernetesdaily.github.io](https://github.com/kubernetesdaily/kubernetesdaily.github.io)).

## Features

- **500+ Curated AI & MCP Tools**: Interactive directory loaded from upstream catalog with client-side search, category filtering, sorting, and GitHub stars.
- **Open AI Model Leaderboard**: Comprehensive benchmark scores, VRAM requirements, context window lengths, quantization status, and licenses.
- **7 Hands-on Labs**: Self-paced, terminal-first guides covering LangChain agents, Weaviate vector databases with Ollama, LLM evaluation metrics, ethical synthetic data generation, and reinforcement learning.
- **AI Engineering Blog**: In-depth architecture guides, MCP protocol specifications, and technical writeups with table-of-contents navigation.
- **1,000-Item Content Roadmap**: 4 learning tracks (LLM Architectures, Agentic Systems & MCP, RAG & Vector Data, Evaluation & AI Safety) with structured blog and lab titles.
- **Dual Deployment Model**:
  - Run as a high-performance **Phoenix web application** (`mix phx.server`)
  - Export as a **static website** (`mix aidatafoundation.export --output _site`) deployed to GitHub Pages via automated GitHub Actions (`.github/workflows/pages.yml`).

## Quick Start

### 1. Prerequisites

- Elixir 1.17+ and Erlang/OTP 27+
- Node.js (for asset compilation)

### 2. Setup & Run Locally

```bash
# Install Hex, Rebar, and project dependencies
mix setup

# Start the Phoenix server
mix phx.server
```

Open [http://localhost:4000](http://localhost:4000) in your browser.

### 3. Static Site Export (GitHub Pages)

To compile assets and export the entire platform into static HTML/assets for GitHub Pages:

```bash
# Build and digest assets
mix assets.deploy

# Export all public routes to _site
mix aidatafoundation.export --output _site
```

The output directory `_site` contains:
- `index.html` (Landing page)
- `tools/index.html` (AI Tools Directory)
- `models/index.html` (Model Leaderboard)
- `labs/index.html` and individual `/labs/:id/` pages
- `blog/index.html` and individual `/blog/:id/` pages
- `roadmap/index.html` (Editorial Roadmap)
- `about/index.html` (About ADF)
- `sitemap.xml`, `rss.xml`, `feed.xml`, `404.html`, `CNAME`, `.nojekyll`

### 4. Running Tests & Precommit

```bash
# Run tests
mix test

# Run full precommit suite (warnings-as-errors, code format, and tests)
mix precommit
```

## License

This project is open source under the [Apache 2.0 License](LICENSE).
