defmodule AiDataFoundation.Foundation do
  @moduledoc """
  Core content provider for AI Data Foundation: labs, guides, benchmarks, models, and roadmap.
  """

  @roadmap_tracks [
    %{
      id: "llm-foundations",
      title: "LLM Architectures & Foundations",
      description:
        "From transformer attention mechanisms to fine-tuning, quantization, and local deployment.",
      blogs: 45,
      labs: 30,
      topics: [
        "Self-Attention and Multi-Head Attention",
        "Transformer Decoder-Only Architectures",
        "RoPE (Rotary Position Embeddings)",
        "FlashAttention & Memory Optimization",
        "LoRA and QLoRA Parameter-Efficient Fine-Tuning",
        "Quantization: GGUF, AWQ, and EXL2",
        "Local Inference with Ollama and vLLM",
        "Inference Serving & Speculative Decoding"
      ]
    },
    %{
      id: "agentic-mcp",
      title: "Agentic Systems & Model Context Protocol (MCP)",
      description:
        "Standardizing context, tool use, and multi-agent coordination across autonomous AI systems.",
      blogs: 40,
      labs: 25,
      topics: [
        "Model Context Protocol (MCP) Specification",
        "Building MCP Servers in Python & TypeScript",
        "Tool Calling & Function Orchestration",
        "ReAct Pattern & Planning Agents",
        "Multi-Agent Swarm Architectures",
        "Memory Systems: Working, Episodic & Semantic",
        "Human-in-the-Loop & Safety Guardrails"
      ]
    },
    %{
      id: "rag-vector-data",
      title: "RAG & Vector Data Engineering",
      description:
        "Production retrieval pipelines, embeddings, hybrid search, and vector databases.",
      blogs: 50,
      labs: 35,
      topics: [
        "Chunking Strategies & Semantic Splitting",
        "Embedding Models: MTEB Benchmarks & Fine-tuning",
        "Vector Indexing: HNSW, IVF-Flat, and ScaNN",
        "Hybrid Search (Dense + Sparse BM25)",
        "Reranking with Cross-Encoders",
        "GraphRAG: Knowledge Graphs for Context",
        "Weaviate, Qdrant, Milvus & pgvector",
        "Evaluation with RAGAS and TruLens"
      ]
    },
    %{
      id: "eval-safety",
      title: "Evaluation, Benchmarks & AI Safety",
      description:
        "Measuring model accuracy, hallucination detection, prompt red-teaming, and bias mitigation.",
      blogs: 35,
      labs: 20,
      topics: [
        "Open LLM Leaderboard Evaluation Metrics",
        "MMLU-Pro, GSM8K, and HumanEval Protocols",
        "LLM-as-a-Judge Design & Calibration",
        "Hallucination Detection & Groundedness Checks",
        "Automated Red-Teaming & Prompt Injection Defense",
        "Synthetic Data Validation & Quality Metrics",
        "Governance, Provenance & Watermarking"
      ]
    }
  ]

  @article_formats [
    "architecture and design guide",
    "practical hands-on tutorial",
    "production deployment playbook",
    "benchmarks and evaluation report",
    "troubleshooting and debugging field notes",
    "security and safety checklist"
  ]

  @lab_formats [
    "install, configure, and verify locally",
    "build an end-to-end pipeline from scratch",
    "debug and optimize performance under load",
    "evaluate accuracy against open benchmarks",
    "integrate with autonomous agent workflows"
  ]

  @doc "Returns all labs loaded from data/labs.json"
  def labs do
    case read_json("data/labs.json") do
      %{"labs" => labs} -> labs
      _ -> []
    end
  end

  @doc "Finds a specific lab by id"
  def lab(id) do
    Enum.find(labs(), &(&1["id"] == id))
  end

  @doc "Reads and renders a lab's markdown content with outline"
  def lab_content(lab) do
    path =
      case lab["path"] do
        "/" <> rest -> rest
        other -> other
      end

    markdown_to_content(path)
  end

  @doc "Returns all blog posts loaded from data/blog.json"
  def posts do
    case read_json("data/blog.json") do
      %{"blogs" => blogs} -> blogs
      _ -> []
    end
  end

  @doc "Finds a specific post by id"
  def post(id) do
    Enum.find(posts(), fn p ->
      to_string(p["id"]) == to_string(id)
    end)
  end

  @doc "Reads and renders a blog post's markdown content with outline"
  def post_content(post) do
    file = post["file"] || post["path"]

    path =
      case file do
        "/" <> rest -> rest
        other -> other
      end

    markdown_to_content(path)
  end

  @agents [
    %{
      "name" => "OpenClaw",
      "maintainer" => "OpenClaw Community",
      "type" => "Ready-to-Use",
      "stars" => "334,201",
      "forks" => "65,178",
      "license" => "MIT",
      "description" =>
        "Autonomous agent runtime with native tool execution and sandbox isolation.",
      "url" => "https://github.com/openclaw/openclaw"
    },
    %{
      "name" => "Hermes Agent",
      "maintainer" => "Nous Research",
      "type" => "Ready-to-Use",
      "stars" => "219,347",
      "forks" => "41,593",
      "license" => "MIT",
      "description" =>
        "Advanced tool-use and autonomous function-calling agent powered by Hermes 3.",
      "url" => "https://github.com/NousResearch/Hermes-Function-Calling"
    },
    %{
      "name" => "AutoGPT",
      "maintainer" => "Significant Gravitas",
      "type" => "Ready-to-Use",
      "stars" => "173,000",
      "forks" => "45,000",
      "license" => "Other",
      "description" =>
        "Pioneering autonomous agent architecture chaining LLM thoughts, commands, and memory.",
      "url" => "https://github.com/Significant-Gravitas/AutoGPT"
    },
    %{
      "name" => "Dify",
      "maintainer" => "LangGenius",
      "type" => "Platform",
      "stars" => "134,280",
      "forks" => "20,917",
      "license" => "Apache-2.0",
      "description" =>
        "Open-source LLM application development platform orchestrating multi-agent workflows and RAG.",
      "url" => "https://github.com/langgenius/dify"
    },
    %{
      "name" => "Gemini CLI",
      "maintainer" => "Google",
      "type" => "Ready-to-Use",
      "stars" => "106,138",
      "forks" => "14,301",
      "license" => "Apache-2.0",
      "description" =>
        "Command-line agent for intelligent code refactoring, explainability, and terminal automation.",
      "url" => "https://github.com/google/gemini-cli"
    },
    %{
      "name" => "browser-use",
      "maintainer" => "browser-use",
      "type" => "Framework",
      "stars" => "84,000",
      "forks" => "9,700",
      "license" => "MIT",
      "description" =>
        "Make websites accessible for AI agents with automated DOM navigation and data extraction.",
      "url" => "https://github.com/browser-use/browser-use"
    },
    %{
      "name" => "Flowise",
      "maintainer" => "Flowise",
      "type" => "Platform",
      "stars" => "51,044",
      "forks" => "23,976",
      "license" => "Apache-2.0",
      "description" =>
        "Drag & drop visual builder for customized LLM flows, multi-agent systems, and vector search.",
      "url" => "https://github.com/FlowiseAI/Flowise"
    },
    %{
      "name" => "Goose AI",
      "maintainer" => "Block",
      "type" => "Ready-to-Use",
      "stars" => "14,200",
      "forks" => "1,150",
      "license" => "Apache-2.0",
      "description" =>
        "Open-source, extensible developer agent that automates complex software engineering workflows.",
      "url" => "https://github.com/block/goose"
    }
  ]

  @doc "Returns popular AI agents directory inspired by LLM Explorer"
  def agents, do: @agents

  @doc "Returns model benchmark leaderboard data from data/model.json with derived tags"
  def models do
    case read_json("data/model.json") do
      list when is_list(list) ->
        Enum.map(list, &enrich_model/1)

      _ ->
        []
    end
  end

  defp enrich_model(model) do
    name = model["Model Name"] || model["name"] || ""
    vram_str = to_string(model["VRAM (GB)"] || "")
    vram_val = parse_vram(vram_str)
    quantized? = model["Quantized"] not in [nil, false, ""]
    license = to_string(model["License"] || "") |> String.downcase()

    tags =
      []
      |> then(fn acc -> if vram_val > 0 and vram_val <= 4.0, do: ["4gb" | acc], else: acc end)
      |> then(fn acc -> if vram_val > 0 and vram_val <= 8.0, do: ["8gb" | acc], else: acc end)
      |> then(fn acc -> if vram_val > 0 and vram_val <= 16.0, do: ["16gb" | acc], else: acc end)
      |> then(fn acc -> if vram_val > 0 and vram_val <= 24.0, do: ["24gb" | acc], else: acc end)
      |> then(fn acc ->
        if String.match?(name, ~r/coder|code/i), do: ["codegen" | acc], else: acc
      end)
      |> then(fn acc ->
        if String.match?(name, ~r/instruct/i), do: ["instruct" | acc], else: acc
      end)
      |> then(fn acc ->
        if String.match?(name, ~r/r1|qwq|reason|think/i), do: ["reasoning" | acc], else: acc
      end)
      |> then(fn acc -> if quantized?, do: ["gguf" | acc], else: acc end)
      |> then(fn acc ->
        if String.contains?(license, "apache") or String.contains?(license, "mit"),
          do: ["permissive" | acc],
          else: acc
      end)
      |> Enum.reverse()

    Map.merge(model, %{
      "vram_num" => vram_val,
      "tags" => tags
    })
  end

  defp parse_vram(str) do
    case Float.parse(str) do
      {num, _} ->
        num

      :error ->
        case Integer.parse(str) do
          {num, _} -> num * 1.0
          :error -> 0.0
        end
    end
  end

  @doc "Returns roadmap tracks with generated title plans"
  def content_roadmap do
    Enum.map(@roadmap_tracks, fn track ->
      blog_titles = plan_titles(track.topics, @article_formats, track.blogs)
      lab_titles = plan_titles(track.topics, @lab_formats, track.labs)

      Map.merge(track, %{
        blog_titles: blog_titles,
        lab_titles: lab_titles
      })
    end)
  end

  @doc "Summary platform statistics"
  def stats do
    %{
      tools_count: 500,
      labs_count: length(labs()),
      blog_count: length(posts()),
      models_count: length(models()),
      tracks_count: length(@roadmap_tracks)
    }
  end

  @doc "GitHub edit URL for open-source contributions"
  def edit_url(item) do
    relative_path = item["path"] || item["file"] || ""
    clean_path = String.trim_leading(relative_path, "/")

    "https://github.com/aidatafoundation/aidatafoundation.github.io/blob/main/priv/static/aidatafoundation/#{clean_path}"
  end

  # Helpers

  defp root do
    Application.app_dir(:ai_data_foundation, "priv/static/aidatafoundation")
  end

  defp read_json(relative_path) do
    path = Path.join(root(), relative_path)

    case File.read(path) do
      {:ok, content} -> Jason.decode!(content)
      _ -> nil
    end
  end

  defp markdown_to_content(relative_path) do
    path = Path.join(root(), relative_path)

    case File.read(path) do
      {:ok, markdown} ->
        # The template renders H1. Strip leading # Title if present to avoid duplication.
        cleaned = String.replace(markdown, ~r/\A\s*# [^\n]+\n/, "")

        html =
          MDEx.to_html!(cleaned,
            extension: [
              table: true,
              autolink: true,
              strikethrough: true,
              tasklist: true,
              footnotes: true
            ],
            render: [unsafe_: true]
          )

        add_heading_ids(html)

      {:error, _} ->
        %{
          html: "<p>Content is being updated. Check back shortly!</p>",
          outline: []
        }
    end
  end

  defp add_heading_ids(html) do
    {content, _used, outline} =
      ~r/<h([2-3])>(.*?)<\/h\1>/s
      |> Regex.scan(html)
      |> Enum.reduce({html, MapSet.new(), []}, fn [full, level, heading_html],
                                                  {acc_html, used, acc_outline} ->
        title =
          heading_html
          |> String.replace(~r/<[^>]+>/, "")
          |> String.trim()

        id = unique_heading_id(slugify(title), used)
        replacement = "<h#{level} id=\"#{id}\">#{heading_html}</h#{level}>"

        {
          String.replace(acc_html, full, replacement, global: false),
          MapSet.put(used, id),
          [%{id: id, level: String.to_integer(level), title: title} | acc_outline]
        }
      end)

    %{html: content, outline: Enum.reverse(outline)}
  end

  defp unique_heading_id(id, used, suffix \\ 2) do
    candidate = if suffix == 2, do: id, else: "#{id}-#{suffix}"

    if MapSet.member?(used, candidate) do
      unique_heading_id(id, used, suffix + 1)
    else
      candidate
    end
  end

  defp slugify(title) do
    title
    |> String.downcase()
    |> String.normalize(:nfd)
    |> String.replace(~r/[^\p{L}\p{N}]+/u, "-")
    |> String.trim("-")
    |> case do
      "" -> "section"
      slug -> slug
    end
  end

  defp plan_titles(topics, formats, count) do
    titles = for topic <- topics, format <- formats, do: "#{topic}: #{format}"

    titles
    |> Stream.cycle()
    |> Enum.take(count)
  end
end
