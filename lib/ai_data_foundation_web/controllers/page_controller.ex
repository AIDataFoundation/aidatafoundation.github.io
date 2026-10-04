defmodule AiDataFoundationWeb.PageController do
  use AiDataFoundationWeb, :controller

  alias AiDataFoundation.Foundation
  alias AiDataFoundation.PublicPages

  def home(conn, _params) do
    render(conn, :home,
      page_title: "AI Data Foundation · Open Tools, Benchmarks & Hands-on Labs",
      stats: Foundation.stats(),
      featured_labs: Enum.take(Foundation.labs(), 3),
      featured_posts: Enum.take(Foundation.posts(), 3),
      featured_models: Enum.take(Foundation.models(), 5),
      roadmap_tracks: Foundation.content_roadmap()
    )
  end

  def tools(conn, _params) do
    render(conn, :tools,
      page_title: "AI & LLM Tools Directory · AI Data Foundation",
      stats: Foundation.stats()
    )
  end

  def models(conn, _params) do
    models = Foundation.models()
    agents = Foundation.agents()

    render(conn, :models,
      page_title: "Open AI Models, LLM VRAM Calculator & Agent Directory · AI Data Foundation",
      models: models,
      model_count: length(models),
      agents: agents
    )
  end

  def labs(conn, _params) do
    render(conn, :labs,
      page_title: "Hands-on AI & LLM Labs · AI Data Foundation",
      labs: Foundation.labs()
    )
  end

  def lab(conn, %{"id" => id}) do
    case Foundation.lab(id) do
      nil ->
        conn
        |> put_status(:not_found)
        |> put_view(html: AiDataFoundationWeb.ErrorHTML)
        |> render(:"404")

      lab ->
        content = Foundation.lab_content(lab)

        render(conn, :lab,
          page_title: lab["title"] <> " · AI Data Foundation Labs",
          lab: lab,
          content: content.html,
          outline: content.outline,
          edit_url: Foundation.edit_url(lab)
        )
    end
  end

  def blog(conn, _params) do
    render(conn, :blog,
      page_title: "AI & LLM Engineering Blog · AI Data Foundation",
      posts: Foundation.posts()
    )
  end

  def post(conn, %{"id" => id}) do
    case Foundation.post(id) do
      nil ->
        conn
        |> put_status(:not_found)
        |> put_view(html: AiDataFoundationWeb.ErrorHTML)
        |> render(:"404")

      post ->
        content = Foundation.post_content(post)

        render(conn, :post,
          page_title: post["title"] <> " · AI Data Foundation Blog",
          post: post,
          content: content.html,
          outline: content.outline,
          edit_url: Foundation.edit_url(post)
        )
    end
  end

  def roadmap(conn, _params) do
    roadmap = Foundation.content_roadmap()

    render(conn, :roadmap,
      page_title: "AI Ecosystem Content Roadmap · AI Data Foundation",
      roadmap: roadmap,
      blog_count: roadmap |> Enum.map(& &1.blogs) |> Enum.sum(),
      lab_count: roadmap |> Enum.map(& &1.labs) |> Enum.sum()
    )
  end

  def about(conn, _params) do
    render(conn, :about,
      page_title: "About · AI Data Foundation",
      stats: Foundation.stats()
    )
  end

  def security(conn, _params) do
    render(conn, :security,
      page_title: "AI Safety & Data Security · AI Data Foundation"
    )
  end

  def sitemap(conn, _params) do
    domain = "https://aidatafoundation.github.io"
    paths = PublicPages.paths()

    urls =
      Enum.map_join(paths, "\n", fn path ->
        """
          <url>
            <loc>#{domain}#{path}</loc>
            <changefreq>weekly</changefreq>
            <priority>#{if path == "/", do: "1.0", else: "0.8"}</priority>
          </url>
        """
      end)

    xml = """
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    #{urls}</urlset>
    """

    conn
    |> put_resp_content_type("application/xml")
    |> send_resp(200, xml)
  end

  def feed(conn, _params) do
    domain = "https://aidatafoundation.github.io"
    posts = Foundation.posts()

    items =
      Enum.map_join(posts, "\n", fn post ->
        """
        <item>
          <title><![CDATA[#{post["title"]}]]></title>
          <link>#{domain}/blog/#{post["id"]}</link>
          <guid>#{domain}/blog/#{post["id"]}</guid>
          <description><![CDATA[#{post["excerpt"]}]]></description>
          <pubDate>#{post["date"]}</pubDate>
          <category>#{post["category"]}</category>
        </item>
        """
      end)

    xml = """
    <?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
        <title>AI Data Foundation Blog</title>
        <link>#{domain}/blog</link>
        <description>Practical guides, benchmarks, and architectures for AI &amp; LLM engineering.</description>
        <language>en-us</language>
        <atom:link href="#{domain}/rss.xml" rel="self" type="application/rss+xml" />
        #{items}
      </channel>
    </rss>
    """

    conn
    |> put_resp_content_type("application/xml")
    |> send_resp(200, xml)
  end
end
